"use client";
import { useState } from "react";
import { Globe, Search, Check, X, AlertTriangle, Zap, Shield, FileCode, Image as ImageIcon, Link2, Hash } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.2 145)";

type AuditResult = {
  url: string;
  status: number;
  time: number;
  sizeBytes: number;
  lang: string;
  title: string;
  description: string;
  canonical: string;
  robots: string;
  viewport: string;
  og: { title: string; description: string; image: string };
  twitter: { card: string };
  headings: { h1: string[]; h2Count: number };
  images: { total: number; withoutAlt: number };
  links: { total: number; internal: number; external: number };
  schemas: string[];
  security: { https: boolean; hsts: boolean; csp: boolean; contentType: string; server: string };
};

type Check = { label: string; ok: boolean; warn?: boolean; detail?: string };

function buildChecks(d: AuditResult): { critical: Check[]; recommended: Check[] } {
  const critical: Check[] = [
    { label: "HTTPS", ok: d.security.https, detail: d.security.https ? "Sitio servido por HTTPS" : "Migrar a HTTPS es prioritario para SEO y Chrome" },
    { label: "Title tag", ok: !!d.title && d.title.length >= 10 && d.title.length <= 65, warn: !!d.title && (d.title.length < 30 || d.title.length > 60), detail: d.title ? `${d.title.length} chars · "${d.title.slice(0, 80)}"` : "Falta el title" },
    { label: "Meta description", ok: !!d.description && d.description.length >= 80 && d.description.length <= 160, warn: !!d.description && (d.description.length < 80 || d.description.length > 160), detail: d.description ? `${d.description.length} chars` : "Falta la meta description" },
    { label: "Encabezado H1 único", ok: d.headings.h1.length === 1, warn: d.headings.h1.length > 1, detail: d.headings.h1.length === 0 ? "Falta H1" : d.headings.h1.length === 1 ? `"${d.headings.h1[0].slice(0, 80)}"` : `${d.headings.h1.length} H1 (debería ser 1)` },
    { label: "Viewport mobile", ok: !!d.viewport, detail: d.viewport || "Falta meta viewport — sitio no responsive" },
    { label: "Canonical URL", ok: !!d.canonical, detail: d.canonical || "Falta canonical — duplicate content risk" }
  ];
  const recommended: Check[] = [
    { label: "Lang en HTML", ok: !!d.lang, detail: d.lang || "<html lang=...> ausente" },
    { label: "Open Graph title", ok: !!d.og.title, detail: d.og.title || "Sin OG title" },
    { label: "Open Graph image", ok: !!d.og.image, detail: d.og.image ? "Imagen para preview en redes" : "Sin OG image" },
    { label: "Twitter card", ok: !!d.twitter.card, detail: d.twitter.card || "Sin twitter:card" },
    { label: "Schema.org JSON-LD", ok: d.schemas.length > 0, detail: d.schemas.length ? d.schemas.join(", ") : "Sin structured data" },
    { label: "Imágenes con alt", ok: d.images.total === 0 ? true : d.images.withoutAlt === 0, warn: d.images.withoutAlt > 0 && d.images.withoutAlt < d.images.total, detail: d.images.total > 0 ? `${d.images.total - d.images.withoutAlt}/${d.images.total} con alt` : "Sin imágenes" },
    { label: "Encabezados H2", ok: d.headings.h2Count >= 2, warn: d.headings.h2Count === 1, detail: `${d.headings.h2Count} H2` },
    { label: "Enlaces internos", ok: d.links.internal >= 5, warn: d.links.internal > 0, detail: `${d.links.internal} internos · ${d.links.external} externos` },
    { label: "HSTS", ok: d.security.hsts, detail: d.security.hsts ? "Strict-Transport-Security activo" : "Sin HSTS — reactivable downgrade attacks" },
    { label: "CSP", ok: d.security.csp, detail: d.security.csp ? "Content-Security-Policy activo" : "Sin CSP — exposición XSS" }
  ];
  return { critical, recommended };
}

function score(checks: { critical: Check[]; recommended: Check[] }): number {
  const cw = 7, rw = 3;
  let total = 0, pass = 0;
  checks.critical.forEach((c) => { total += cw; if (c.ok) pass += cw; else if (c.warn) pass += cw * 0.5; });
  checks.recommended.forEach((c) => { total += rw; if (c.ok) pass += rw; else if (c.warn) pass += rw * 0.5; });
  return Math.round((pass / total) * 100);
}

export function SeoQuickAudit() {
  const [input, setInput] = useState("");
  const [data, setData] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function audit() {
    if (!input.trim()) return;
    setLoading(true); setError(null); setData(null);
    try {
      const r = await fetch(`/api/seo-audit?url=${encodeURIComponent(input.trim())}`);
      const json = await r.json();
      if (!r.ok) throw new Error(json.error || "Error de servidor");
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally { setLoading(false); }
  }

  const checks = data ? buildChecks(data) : null;
  const total = checks ? score(checks) : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>SEO Quick Audit</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Análisis SEO instantáneo de cualquier URL: meta tags, headings, schema, seguridad, performance básica.</p>
      </div>

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-2 md:p-3 mb-6 flex flex-col md:flex-row gap-2 shadow-sm">
        <div className="flex items-center gap-2 px-3 py-2 flex-1 min-w-0">
          <Globe className="w-5 h-5 text-[color:var(--color-fg-soft)] flex-shrink-0" />
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && audit()} placeholder="https://ejemplo.com" className="flex-1 bg-transparent text-base md:text-lg outline-none min-w-0" autoFocus />
        </div>
        <button onClick={audit} disabled={loading} className="px-6 md:px-8 py-3 rounded-xl text-white font-bold shadow disabled:opacity-50 enabled:hover:scale-[1.02] transition flex items-center justify-center gap-2" style={{ background: ACCENT }}>
          {loading ? <><div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> Auditando…</> : <><Search className="w-5 h-5" /> Auditar</>}
        </button>
      </div>

      {error && (
        <div className="rounded-2xl bg-[color:var(--color-danger)]/10 border border-[color:var(--color-danger)]/30 p-4 flex items-start gap-3 mb-6">
          <AlertTriangle className="w-5 h-5 text-[color:var(--color-danger)] flex-shrink-0 mt-0.5" />
          <div className="text-sm">{error}</div>
        </div>
      )}

      {!data && !error && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 mb-6">
            {[
              { i: <Hash className="w-5 h-5" />, t: "Meta + headings" },
              { i: <Shield className="w-5 h-5" />, t: "Seguridad HTTPS" },
              { i: <FileCode className="w-5 h-5" />, t: "Schema.org" },
              { i: <Zap className="w-5 h-5" />, t: "Performance" }
            ].map((b, i) => (
              <div key={i} className="rounded-xl bg-[color:var(--color-bg-soft)] p-4 text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center text-white" style={{ background: ACCENT }}>{b.i}</div>
                <div className="text-sm font-semibold">{b.t}</div>
              </div>
            ))}
          </div>
          <AdSlot slot="audit_intro" format="auto" minHeight={180} />
        </>
      )}

      {data && checks && (
        <div className="space-y-5">
          <div className="rounded-2xl p-8 text-white shadow-2xl text-center" style={{ background: total >= 80 ? "linear-gradient(135deg, oklch(0.6 0.18 145), oklch(0.5 0.2 165))" : total >= 50 ? "linear-gradient(135deg, oklch(0.7 0.18 75), oklch(0.6 0.2 50))" : "linear-gradient(135deg, oklch(0.6 0.22 25), oklch(0.55 0.24 10))" }}>
            <div className="text-6xl md:text-8xl font-extrabold tabular-nums">{total}</div>
            <div className="text-sm uppercase tracking-widest opacity-90 mt-2">Score SEO</div>
            <div className="text-xs opacity-75 mt-2 break-all">{data.url}</div>
            <div className="mt-3 flex flex-wrap justify-center gap-3 text-xs">
              <span>⏱ {data.time}ms</span>
              <span>📦 {(data.sizeBytes / 1024).toFixed(0)} KB</span>
              <span>📡 HTTP {data.status}</span>
            </div>
          </div>

          <Section title="Críticos" items={checks.critical} icon={<Shield className="w-4 h-4" />} accent={ACCENT} />

          <AdSlot slot="audit_mid" format="auto" minHeight={180} />

          <Section title="Recomendados" items={checks.recommended} icon={<Hash className="w-4 h-4" />} accent={ACCENT} />

          <div className="grid md:grid-cols-3 gap-3">
            <MiniCard icon={<ImageIcon className="w-4 h-4" />} label="Imágenes" value={data.images.total} sub={data.images.withoutAlt > 0 ? `${data.images.withoutAlt} sin alt` : "Todas con alt"} status={data.images.withoutAlt === 0 ? "ok" : "warn"} />
            <MiniCard icon={<Link2 className="w-4 h-4" />} label="Enlaces" value={data.links.total} sub={`${data.links.internal} int · ${data.links.external} ext`} status={data.links.internal >= 5 ? "ok" : "warn"} />
            <MiniCard icon={<FileCode className="w-4 h-4" />} label="Schemas" value={data.schemas.length} sub={data.schemas.length ? data.schemas.slice(0, 2).join(", ") : "Sin structured data"} status={data.schemas.length > 0 ? "ok" : "warn"} />
          </div>

          <AdSlot slot="audit_results" format="auto" minHeight={250} />
        </div>
      )}
    </div>
  );
}

function Section({ title, items, icon, accent }: { title: string; items: Check[]; icon: React.ReactNode; accent: string }) {
  return (
    <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5">
      <div className="font-bold mb-3 flex items-center gap-2"><span style={{ color: accent }}>{icon}</span> {title}</div>
      <div className="grid md:grid-cols-2 gap-2">
        {items.map((c, i) => {
          const color = c.ok ? "var(--color-success)" : c.warn ? "var(--color-warning)" : "var(--color-danger)";
          const Ico = c.ok ? Check : c.warn ? AlertTriangle : X;
          return (
            <div key={i} className="rounded-lg border p-3 flex items-start gap-3" style={{ borderColor: `color-mix(in oklch, ${color} 30%, transparent)`, background: `color-mix(in oklch, ${color} 5%, transparent)` }}>
              <span className="w-6 h-6 rounded-full text-white flex items-center justify-center flex-shrink-0" style={{ background: color }}>
                <Ico className="w-3.5 h-3.5" />
              </span>
              <div className="min-w-0">
                <div className="font-semibold text-sm">{c.label}</div>
                {c.detail && <div className="text-xs text-[color:var(--color-fg-soft)] mt-0.5 break-words">{c.detail}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MiniCard({ icon, label, value, sub, status }: { icon: React.ReactNode; label: string; value: number; sub: string; status: "ok" | "warn" | "err" }) {
  const color = status === "ok" ? "var(--color-success)" : status === "warn" ? "var(--color-warning)" : "var(--color-danger)";
  return (
    <div className="rounded-xl border p-4" style={{ borderColor: `color-mix(in oklch, ${color} 30%, transparent)`, background: `color-mix(in oklch, ${color} 5%, transparent)` }}>
      <div className="flex items-center gap-2 text-xs font-bold uppercase mb-2" style={{ color }}>{icon} {label}</div>
      <div className="text-3xl font-extrabold tabular-nums">{value}</div>
      <div className="text-xs text-[color:var(--color-fg-soft)] mt-1">{sub}</div>
    </div>
  );
}
