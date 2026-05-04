"use client";
import { useMemo, useState } from "react";
import { Sparkles, RefreshCw, Copy, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.65 0.2 50)";

const TEMPLATES = [
  (b: string, p: string) => `${b}. ${p}, sin compromisos.`,
  (b: string, p: string) => `${p} con ${b}.`,
  (b: string, p: string) => `Más que ${p}. Es ${b}.`,
  (b: string, p: string) => `${b}: hecho para ${p}.`,
  (b: string, p: string) => `Pensá en ${p}. Pensá en ${b}.`,
  (b: string, p: string) => `${b}, donde ${p} sucede.`,
  (b: string, p: string) => `Tu ${p} con ${b}.`,
  (b: string, p: string) => `${b}. Simple. ${p}.`,
  (b: string, p: string) => `Elegí ${b}. Elegí ${p}.`,
  (b: string, p: string) => `${p} reinventado por ${b}.`,
  (b: string, p: string) => `Hacé ${p} mejor con ${b}.`,
  (b: string, p: string) => `${b} ❤️ ${p}.`
];

export function TaglineGenerator() {
  const [brand, setBrand] = useState("Toolram");
  const [promise, setPromise] = useState("herramientas online gratis");
  const [seed, setSeed] = useState(0);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const taglines = useMemo(() => {
    void seed;
    return TEMPLATES.map((t) => t(brand, promise));
  }, [brand, promise, seed]);

  async function copy(t: string, i: number) {
    await navigator.clipboard.writeText(t);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 1000);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador de Slogan / Tagline</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">12 fórmulas de slogan probadas · Para campañas, perfiles, signatures.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 mb-6 grid md:grid-cols-2 gap-3">
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Marca</span>
          <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-base font-bold" value={brand} onChange={(e) => setBrand(e.target.value)} /></label>
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Promesa / Beneficio</span>
          <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-base" value={promise} onChange={(e) => setPromise(e.target.value)} /></label>
      </div>

      <div className="grid md:grid-cols-2 gap-2 mb-6">
        {taglines.map((t, i) => (
          <button key={i} onClick={() => copy(t, i)} className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-3 text-left hover:border-[color:var(--color-brand)] flex items-center justify-between gap-2 group">
            <span className="font-semibold text-sm">{t}</span>
            {copiedIdx === i ? <Check className="w-4 h-4 text-[color:var(--color-success)]" /> : <Copy className="w-4 h-4 text-[color:var(--color-fg-soft)]" />}
          </button>
        ))}
      </div>

      <AdSlot slot="tagline_inline" format="auto" minHeight={180} className="mb-6" />
    </div>
  );
}
