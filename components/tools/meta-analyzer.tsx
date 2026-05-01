"use client";
import { useMemo, useState } from "react";
import { Check, X, AlertTriangle, Search } from "lucide-react";

type Field = { ok: boolean; value: string; note?: string };

function analyze(html: string) {
  if (!html.trim()) return null;
  let doc: Document | null = null;
  try { doc = new DOMParser().parseFromString(html, "text/html"); } catch { return null; }
  const get = (sel: string, attr = "content") => doc?.querySelector(sel)?.getAttribute(attr) || "";
  const title = doc.querySelector("title")?.textContent?.trim() || "";
  const desc = get('meta[name="description"]');
  const canonical = get('link[rel="canonical"]', "href");
  const robots = get('meta[name="robots"]');
  const viewport = get('meta[name="viewport"]');
  const charset = doc.querySelector("meta[charset]")?.getAttribute("charset") || "";
  const ogTitle = get('meta[property="og:title"]');
  const ogDesc = get('meta[property="og:description"]');
  const ogImage = get('meta[property="og:image"]');
  const ogUrl = get('meta[property="og:url"]');
  const ogType = get('meta[property="og:type"]');
  const twCard = get('meta[name="twitter:card"]');
  const twTitle = get('meta[name="twitter:title"]');
  const twImage = get('meta[name="twitter:image"]');
  const lang = doc.documentElement.getAttribute("lang") || "";

  const h1 = Array.from(doc.querySelectorAll("h1")).map((h) => h.textContent?.trim() || "");
  const h2 = Array.from(doc.querySelectorAll("h2")).map((h) => h.textContent?.trim() || "");
  const images = doc.querySelectorAll("img");
  const imagesNoAlt = Array.from(images).filter((i) => !i.getAttribute("alt")).length;
  const links = doc.querySelectorAll("a[href]");
  const internal = Array.from(links).filter((l) => {
    const h = l.getAttribute("href") || "";
    return h.startsWith("/") || h.startsWith("#") || h.startsWith("?");
  }).length;
  const external = links.length - internal;

  const schema = Array.from(doc.querySelectorAll('script[type="application/ld+json"]')).map((s) => {
    try { return JSON.parse(s.textContent || "{}"); } catch { return null; }
  }).filter(Boolean);

  const fields: Record<string, Field> = {
    "Title tag": { ok: !!title && title.length <= 60, value: title || "—", note: title ? `${title.length}/60 chars` : "Crítico — falta el title" },
    "Meta description": { ok: !!desc && desc.length >= 80 && desc.length <= 160, value: desc || "—", note: desc ? `${desc.length}/160 chars` : "Recomendado 80-160 chars" },
    "Canonical URL": { ok: !!canonical, value: canonical || "—" },
    "Robots": { ok: true, value: robots || "default index,follow" },
    "Viewport (móvil)": { ok: !!viewport, value: viewport || "—" },
    "Charset": { ok: !!charset, value: charset || "—" },
    "Lang HTML": { ok: !!lang, value: lang || "—" },
    "Open Graph title": { ok: !!ogTitle, value: ogTitle || "—" },
    "Open Graph description": { ok: !!ogDesc, value: ogDesc || "—" },
    "Open Graph image": { ok: !!ogImage, value: ogImage || "—" },
    "Open Graph URL": { ok: !!ogUrl, value: ogUrl || "—" },
    "Open Graph type": { ok: !!ogType, value: ogType || "—" },
    "Twitter card": { ok: !!twCard, value: twCard || "—" },
    "Twitter title": { ok: !!twTitle || !!ogTitle, value: twTitle || (ogTitle ? "(usa OG)" : "—") },
    "Twitter image": { ok: !!twImage || !!ogImage, value: twImage || (ogImage ? "(usa OG)" : "—") }
  };
  const okCount = Object.values(fields).filter((f) => f.ok).length;
  const total = Object.keys(fields).length;

  return { fields, h1, h2, images: images.length, imagesNoAlt, internal, external, schema, score: Math.round((okCount / total) * 100) };
}

export function MetaAnalyzer() {
  const [html, setHtml] = useState("");
  const result = useMemo(() => analyze(html), [html]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-br from-[oklch(0.95_0.05_220)] to-[oklch(0.94_0.04_280)] dark:from-[oklch(0.25_0.05_220)] dark:to-[oklch(0.22_0.04_280)] p-6 border border-[color:var(--color-border)]">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-[oklch(0.5_0.2_220)] text-white flex items-center justify-center flex-shrink-0"><Search className="w-6 h-6" /></div>
          <div>
            <h3 className="font-bold mb-1">Pegá el HTML completo</h3>
            <p className="text-sm text-[color:var(--color-fg-soft)]">Abrí cualquier página, hacé Ctrl+U (Cmd+U en Mac) y copiá todo el código fuente. Por restricciones CORS no podemos hacer fetch directo.</p>
          </div>
        </div>
      </div>

      <textarea className="input font-mono text-xs min-h-[200px]" rows={10} value={html} onChange={(e) => setHtml(e.target.value)} placeholder="<!DOCTYPE html>&#10;<html>...&#10;</html>" />

      {result && (
        <>
          <div className="rounded-2xl p-8 text-center text-white shadow-2xl" style={{ background: result.score >= 80 ? "linear-gradient(135deg, oklch(0.6 0.18 145), oklch(0.5 0.2 165))" : result.score >= 50 ? "linear-gradient(135deg, oklch(0.7 0.18 75), oklch(0.6 0.2 50))" : "linear-gradient(135deg, oklch(0.6 0.22 25), oklch(0.55 0.24 10))" }}>
            <div className="text-6xl md:text-8xl font-bold tabular-nums">{result.score}</div>
            <div className="text-sm uppercase tracking-widest opacity-90 mt-2">Score SEO On-Page</div>
            <div className="text-xs opacity-75 mt-1">{Object.values(result.fields).filter((f) => f.ok).length} de {Object.keys(result.fields).length} checks pasan</div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-bold uppercase tracking-wide text-[color:var(--color-fg-soft)]">Meta tags</div>
              {Object.entries(result.fields).map(([k, f]) => (
                <div key={k} className={`rounded-xl border p-3 flex items-start gap-3 ${f.ok ? "bg-[color:var(--color-success)]/5 border-[color:var(--color-success)]/30" : "bg-[color:var(--color-danger)]/5 border-[color:var(--color-danger)]/30"}`}>
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white ${f.ok ? "bg-[color:var(--color-success)]" : "bg-[color:var(--color-danger)]"}`}>
                    {f.ok ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">{k}</div>
                    <div className="text-xs text-[color:var(--color-fg-soft)] truncate">{f.value}</div>
                    {f.note && <div className="text-[10px] mt-0.5 italic text-[color:var(--color-fg-soft)]">{f.note}</div>}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="text-sm font-bold uppercase tracking-wide text-[color:var(--color-fg-soft)]">Estructura</div>
              <Stat label="Encabezados H1" value={result.h1.length} status={result.h1.length === 1 ? "ok" : result.h1.length === 0 ? "err" : "warn"} note={result.h1.length === 0 ? "Falta H1" : result.h1.length > 1 ? "Múltiples H1 (mala práctica)" : "Perfecto"} />
              <Stat label="Encabezados H2" value={result.h2.length} status={result.h2.length >= 1 ? "ok" : "warn"} />
              <Stat label="Imágenes" value={`${result.images} (${result.imagesNoAlt} sin alt)`} status={result.imagesNoAlt === 0 ? "ok" : "warn"} note={result.imagesNoAlt > 0 ? "Imágenes sin atributo alt afectan SEO y accesibilidad" : ""} />
              <Stat label="Enlaces internos" value={result.internal} status={result.internal >= 3 ? "ok" : "warn"} />
              <Stat label="Enlaces externos" value={result.external} status="ok" />

              <div className="text-sm font-bold uppercase tracking-wide text-[color:var(--color-fg-soft)] pt-2">Schema.org</div>
              {result.schema.length === 0 ? (
                <div className="rounded-xl border border-[color:var(--color-warning)]/40 bg-[color:var(--color-warning)]/5 p-3 text-sm flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-[color:var(--color-warning)]" /> Sin structured data — perdiendo rich results</div>
              ) : (
                <div className="rounded-xl border border-[color:var(--color-success)]/40 bg-[color:var(--color-success)]/5 p-3">
                  <div className="text-sm font-semibold mb-1 text-[color:var(--color-success)]">✓ {result.schema.length} schema{result.schema.length === 1 ? "" : "s"} detectado{result.schema.length === 1 ? "" : "s"}</div>
                  <ul className="text-xs space-y-0.5">
                    {result.schema.map((s, i) => <li key={i}>• {(s as Record<string, string>)["@type"] || "Schema"}</li>)}
                  </ul>
                </div>
              )}

              {result.h1.length > 0 && (
                <>
                  <div className="text-sm font-bold uppercase tracking-wide text-[color:var(--color-fg-soft)] pt-2">H1 detectados</div>
                  {result.h1.map((h, i) => <div key={i} className="rounded-lg bg-[color:var(--color-bg-soft)] p-2 text-sm italic">"{h}"</div>)}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Stat({ label, value, status, note }: { label: string; value: string | number; status: "ok" | "warn" | "err"; note?: string }) {
  const color = status === "ok" ? "var(--color-success)" : status === "warn" ? "var(--color-warning)" : "var(--color-danger)";
  return (
    <div className="rounded-xl border p-3 flex items-center justify-between" style={{ borderColor: `color-mix(in oklch, ${color} 30%, transparent)`, background: `color-mix(in oklch, ${color} 5%, transparent)` }}>
      <div>
        <div className="text-sm font-semibold">{label}</div>
        {note && <div className="text-xs text-[color:var(--color-fg-soft)] italic">{note}</div>}
      </div>
      <div className="text-xl font-bold tabular-nums" style={{ color }}>{value}</div>
    </div>
  );
}
