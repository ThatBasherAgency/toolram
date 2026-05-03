"use client";
import { useMemo, useState } from "react";
import { Link2, Copy, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 280)";

export function AnchorText() {
  const [keyword, setKeyword] = useState("calculadora de IMC");
  const [brand, setBrand] = useState("Toolram");
  const [url, setUrl] = useState("toolram.com/calculadora-imc");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const variations = useMemo(() => {
    const k = keyword.trim();
    const b = brand.trim();
    const u = url.trim();
    if (!k) return [];
    const cap = k.charAt(0).toUpperCase() + k.slice(1);
    return [
      { type: "Exact match (RIESGO ALTO si abusa)", text: k, weight: "alto", color: "oklch(0.6 0.22 35)" },
      { type: "Exact match capitalizado", text: cap, weight: "alto", color: "oklch(0.6 0.22 35)" },
      { type: "Phrase match", text: `mejor ${k}`, weight: "alto" },
      { type: "Phrase match", text: `${k} gratis`, weight: "alto" },
      { type: "Phrase match", text: `${k} online`, weight: "alto" },
      { type: "Phrase match", text: `${k} 2026`, weight: "alto" },
      { type: "Branded", text: b, weight: "medio", color: "oklch(0.65 0.18 145)" },
      { type: "Branded", text: `${b} ${k}`, weight: "medio", color: "oklch(0.65 0.18 145)" },
      { type: "Branded", text: `${k} en ${b}`, weight: "medio", color: "oklch(0.65 0.18 145)" },
      { type: "Naked URL", text: u, weight: "medio" },
      { type: "Naked URL https", text: `https://${u}`, weight: "medio" },
      { type: "Generic", text: "click acá", weight: "bajo", color: "oklch(0.55 0.18 200)" },
      { type: "Generic", text: "leer más", weight: "bajo", color: "oklch(0.55 0.18 200)" },
      { type: "Generic", text: "ver herramienta", weight: "bajo", color: "oklch(0.55 0.18 200)" },
      { type: "Generic", text: "más info", weight: "bajo", color: "oklch(0.55 0.18 200)" },
      { type: "LSI / sinónimo", text: `herramienta de ${k.split(" ").slice(-2).join(" ")}`, weight: "medio" },
      { type: "Long-tail", text: `cómo usar ${k} paso a paso`, weight: "medio" },
      { type: "Long-tail", text: `${k} para principiantes`, weight: "medio" },
      { type: "Pregunta", text: `¿qué es ${k}?`, weight: "medio" },
      { type: "Pregunta", text: `¿cómo calcular ${k}?`, weight: "medio" },
      { type: "Image alt (sugerencia)", text: `imagen de ${k}`, weight: "medio" }
    ];
  }, [keyword, brand, url]);

  async function copy(text: string, i: number) {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 1200);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador de Anchor Text SEO</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Variaciones naturales de anchor text para link building seguro · Mix exact + phrase + branded + generic.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6 grid md:grid-cols-3 gap-3">
        <label className="block">
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Keyword principal</span>
          <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Marca</span>
          <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm" value={brand} onChange={(e) => setBrand(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">URL (sin https)</span>
          <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm font-mono" value={url} onChange={(e) => setUrl(e.target.value)} />
        </label>
      </div>

      <div className="space-y-2 mb-6">
        {variations.map((v, i) => (
          <button key={i} onClick={() => copy(v.text, i)} className="w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-3 text-left flex items-center justify-between gap-3 hover:border-[color:var(--color-brand)] transition group">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className="text-[10px] uppercase tracking-wide font-bold px-1.5 py-0.5 rounded" style={{ background: v.color || "oklch(0.7 0.18 75)", color: "white" }}>{v.type}</span>
                <span className="text-[10px] uppercase font-bold text-[color:var(--color-fg-soft)]">peso: {v.weight}</span>
              </div>
              <div className="font-semibold truncate">{v.text}</div>
            </div>
            {copiedIdx === i ? <Check className="w-4 h-4 text-[color:var(--color-success)] flex-shrink-0" /> : <Copy className="w-4 h-4 text-[color:var(--color-fg-soft)] flex-shrink-0 group-hover:text-[color:var(--color-brand)]" />}
          </button>
        ))}
      </div>

      <AdSlot slot="anchor_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">⚠️ Distribución natural recomendada (perfil seguro)</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">Branded:</strong> 40-50% (más seguros, refuerzan marca).</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Generic / Naked URL:</strong> 25-30% (natural en mayoría de blogs).</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Phrase match / LSI:</strong> 15-20% (refuerzan tema sin ser spam).</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Exact match:</strong> 5-10% MÁXIMO (Google penaliza si abusa — ver Penguin).</li>
        </ul>
      </div>
    </div>
  );
}
