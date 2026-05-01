"use client";
import { useMemo, useState } from "react";

type Field = { ok: boolean; value: string; note?: string };

function analyze(html: string) {
  if (!html.trim()) return null;
  let doc: Document | null = null;
  try {
    doc = new DOMParser().parseFromString(html, "text/html");
  } catch {
    return null;
  }
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
    "Title": { ok: !!title && title.length <= 60, value: title || "(falta)", note: title ? `${title.length} chars` : "Crítico — falta el title" },
    "Meta description": { ok: !!desc && desc.length >= 80 && desc.length <= 160, value: desc || "(falta)", note: desc ? `${desc.length} chars` : "Recomendado 80-160 chars" },
    "Canonical": { ok: !!canonical, value: canonical || "(falta)" },
    "Robots": { ok: true, value: robots || "(no especificado, default index,follow)" },
    "Viewport": { ok: !!viewport, value: viewport || "(falta — móvil roto)" },
    "Charset": { ok: !!charset, value: charset || "(falta)" },
    "Lang HTML": { ok: !!lang, value: lang || "(falta — declarar es/en/etc)" },
    "Open Graph title": { ok: !!ogTitle, value: ogTitle || "(falta)" },
    "Open Graph description": { ok: !!ogDesc, value: ogDesc || "(falta)" },
    "Open Graph image": { ok: !!ogImage, value: ogImage || "(falta — sin preview en redes)" },
    "Open Graph URL": { ok: !!ogUrl, value: ogUrl || "(falta)" },
    "Open Graph type": { ok: !!ogType, value: ogType || "(falta)" },
    "Twitter card": { ok: !!twCard, value: twCard || "(falta)" },
    "Twitter title": { ok: !!twTitle || !!ogTitle, value: twTitle || "(usa OG)" },
    "Twitter image": { ok: !!twImage || !!ogImage, value: twImage || "(usa OG)" }
  };
  const okCount = Object.values(fields).filter((f) => f.ok).length;
  const total = Object.keys(fields).length;

  return { fields, h1, h2, images: images.length, imagesNoAlt, internal, external, schema, score: Math.round((okCount / total) * 100) };
}

export function MetaAnalyzer() {
  const [html, setHtml] = useState(`<html lang="es">\n<head>\n  <title>Ejemplo — Página de prueba</title>\n  <meta name="description" content="Una descripción de ejemplo para mostrar cómo funciona el analizador.">\n  <meta property="og:title" content="Ejemplo">\n  <link rel="canonical" href="https://ejemplo.com/">\n</head>\n<body><h1>Hola</h1><img src="x.jpg"></body></html>`);
  const result = useMemo(() => analyze(html), [html]);

  return (
    <div className="space-y-4">
      <div className="card !p-3 text-xs">📋 Pegá el HTML completo de una página (View Source / Ctrl+U) para auditar sus meta tags. Por restricciones CORS no podemos hacer fetch directo desde el navegador a otros dominios.</div>
      <textarea className="input font-mono text-xs" rows={8} value={html} onChange={(e) => setHtml(e.target.value)} placeholder="Pegá el HTML..." />
      {result && (
        <>
          <div className="card !p-4 text-center">
            <div className={`text-5xl font-bold ${result.score >= 80 ? "text-[color:var(--color-success)]" : result.score >= 50 ? "text-[color:var(--color-warning)]" : "text-[color:var(--color-danger)]"}`}>{result.score}</div>
            <div className="text-xs uppercase">Score SEO básico</div>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="card !p-3">
              <div className="text-xs uppercase text-[color:var(--color-fg-soft)] mb-2">Meta tags ({Object.keys(result.fields).length})</div>
              <ul className="space-y-1 text-xs">
                {Object.entries(result.fields).map(([k, f]) => (
                  <li key={k} className="flex items-start gap-2">
                    <span className={f.ok ? "text-[color:var(--color-success)]" : "text-[color:var(--color-danger)]"}>{f.ok ? "✓" : "✗"}</span>
                    <div>
                      <div className="font-medium">{k}</div>
                      <div className="text-[color:var(--color-fg-soft)] break-all">{f.value}</div>
                      {f.note && <div className="text-[color:var(--color-fg-soft)] italic">{f.note}</div>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card !p-3 space-y-3">
              <div>
                <div className="text-xs uppercase text-[color:var(--color-fg-soft)] mb-1">Estructura</div>
                <div className="text-sm">H1: {result.h1.length} {result.h1.length === 1 ? "✓" : result.h1.length === 0 ? "✗ (falta)" : "⚠️ múltiples"}</div>
                <div className="text-sm">H2: {result.h2.length}</div>
                <div className="text-sm">Imágenes: {result.images} {result.imagesNoAlt > 0 ? `(${result.imagesNoAlt} sin alt ⚠️)` : "✓"}</div>
                <div className="text-sm">Enlaces internos: {result.internal} · externos: {result.external}</div>
              </div>
              <div>
                <div className="text-xs uppercase text-[color:var(--color-fg-soft)] mb-1">Schema.org JSON-LD</div>
                {result.schema.length === 0 ? (
                  <div className="text-sm text-[color:var(--color-fg-soft)]">Sin structured data ⚠️</div>
                ) : (
                  <ul className="text-sm">
                    {result.schema.map((s, i) => (
                      <li key={i}>✓ {(s as Record<string, string>)["@type"] || "Schema"}</li>
                    ))}
                  </ul>
                )}
              </div>
              {result.h1.length > 0 && (
                <div>
                  <div className="text-xs uppercase text-[color:var(--color-fg-soft)] mb-1">H1 detectados</div>
                  {result.h1.map((h, i) => <div key={i} className="text-xs italic">"{h}"</div>)}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
