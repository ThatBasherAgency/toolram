"use client";
import { useMemo, useState } from "react";
import { Link2, Copy, Check, AlertTriangle, Sparkles } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 35)";

const SOURCES = ["google", "facebook", "instagram", "twitter", "linkedin", "tiktok", "youtube", "newsletter", "email", "direct"];
const MEDIUMS = ["cpc", "cpm", "social", "email", "organic", "referral", "display", "video", "affiliate", "banner"];

export function UtmBuilder() {
  const [base, setBase] = useState("https://ejemplo.com/landing");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);

  const final = useMemo(() => {
    if (!base.trim()) return "";
    try {
      const u = new URL(base.startsWith("http") ? base : `https://${base}`);
      const set = (k: string, v: string) => { if (v.trim()) u.searchParams.set(k, v.trim().toLowerCase().replace(/\s+/g, "-")); };
      set("utm_source", source);
      set("utm_medium", medium);
      set("utm_campaign", campaign);
      set("utm_term", term);
      set("utm_content", content);
      return u.toString();
    } catch {
      return "";
    }
  }, [base, source, medium, campaign, term, content]);

  const valid = !!final && !!source && !!medium && !!campaign;

  async function copy() {
    if (!final) return;
    await navigator.clipboard.writeText(final);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador UTM</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Crea URLs con parámetros UTM para Google Analytics y Meta Ads. Trackea el origen exacto de cada visita.</p>
      </div>

      <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 space-y-5 mb-6">
        <Field label="URL de destino *" value={base} onChange={setBase} placeholder="https://ejemplo.com/landing" />
        <div className="grid md:grid-cols-2 gap-5">
          <FieldWithSuggestions label="Source (utm_source) *" value={source} onChange={setSource} placeholder="google, facebook, newsletter…" suggestions={SOURCES} accent={ACCENT} />
          <FieldWithSuggestions label="Medium (utm_medium) *" value={medium} onChange={setMedium} placeholder="cpc, social, email…" suggestions={MEDIUMS} accent={ACCENT} />
        </div>
        <Field label="Campaign (utm_campaign) *" value={campaign} onChange={setCampaign} placeholder="black-friday-2026" />
        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Term (utm_term) — opcional" value={term} onChange={setTerm} placeholder="zapatillas-running" />
          <Field label="Content (utm_content) — opcional" value={content} onChange={setContent} placeholder="banner-superior" />
        </div>
      </div>

      {!valid && (base || source || medium || campaign) && (
        <div className="rounded-xl bg-[color:var(--color-warning)]/10 border border-[color:var(--color-warning)]/40 p-3 text-sm flex items-start gap-2 mb-4">
          <AlertTriangle className="w-4 h-4 text-[color:var(--color-warning)] flex-shrink-0 mt-0.5" />
          <span>Los 3 campos marcados con * son obligatorios para que GA reconozca la campaña.</span>
        </div>
      )}

      {valid && (
        <div className="rounded-3xl p-6 md:p-8 text-white shadow-2xl mb-6" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 60%, black))` }}>
          <div className="text-xs uppercase opacity-80 tracking-widest mb-2 flex items-center gap-2"><Sparkles className="w-4 h-4" /> URL final con UTM</div>
          <code className="block text-sm md:text-base font-mono break-all bg-white/15 p-4 rounded-xl mb-4 leading-relaxed">{final}</code>
          <div className="flex flex-wrap gap-2">
            <button onClick={copy} className="px-5 py-2.5 rounded-xl bg-white text-black font-bold inline-flex items-center gap-2 hover:scale-[1.02] transition">
              {copied ? <><Check className="w-4 h-4" /> Copiado</> : <><Copy className="w-4 h-4" /> Copiar URL</>}
            </button>
            <a href={final} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-xl bg-white/15 backdrop-blur text-white font-bold inline-flex items-center gap-2 hover:bg-white/25 transition">
              <Link2 className="w-4 h-4" /> Probar
            </a>
          </div>
        </div>
      )}

      <AdSlot slot="utm_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-6">
        <div className="font-bold mb-3">📚 Cómo se interpreta cada parámetro en GA4</div>
        <ul className="text-sm space-y-2 text-[color:var(--color-fg-soft)]">
          <li><strong className="text-[color:var(--color-fg)]">utm_source</strong> → Adquisición → Tráfico → "Origen de la sesión" (ej: google, facebook).</li>
          <li><strong className="text-[color:var(--color-fg)]">utm_medium</strong> → "Medio de la sesión" (ej: cpc=pago, organic=orgánico, email).</li>
          <li><strong className="text-[color:var(--color-fg)]">utm_campaign</strong> → "Campaña". Usá nombre único por campaña activa.</li>
          <li><strong className="text-[color:var(--color-fg)]">utm_term</strong> → keyword (útil para Search Ads).</li>
          <li><strong className="text-[color:var(--color-fg)]">utm_content</strong> → versión del creativo (A/B testing).</li>
        </ul>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">{label}</span>
      <input className="w-full mt-1.5 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-base focus:outline-none focus:border-[color:var(--color-brand)]" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </label>
  );
}

function FieldWithSuggestions({ label, value, onChange, placeholder, suggestions, accent }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; suggestions: string[]; accent: string }) {
  return (
    <div>
      <Field label={label} value={value} onChange={onChange} placeholder={placeholder} />
      <div className="flex flex-wrap gap-1.5 mt-2">
        {suggestions.slice(0, 6).map((s) => (
          <button key={s} onClick={() => onChange(s)} className="text-[11px] font-medium px-2 py-1 rounded-md bg-[color:var(--color-bg-soft)] hover:bg-[color:var(--color-bg)] hover:shadow-sm transition" style={value === s ? { background: accent, color: "white" } : undefined}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
