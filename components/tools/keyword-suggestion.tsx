"use client";
import { useMemo, useState } from "react";
import { Search, Copy, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 200)";

const MODIFIERS = {
  "Comercial": ["mejor", "comprar", "precio", "oferta", "barato", "online", "tienda", "donde comprar"],
  "Informacional": ["qué es", "cómo", "por qué", "guía", "tutorial", "ejemplos", "tipos de"],
  "Comparativa": ["vs", "comparativa", "alternativas a", "diferencia entre", "ventajas y desventajas"],
  "Local": ["cerca de mí", "en CDMX", "en Madrid", "en Buenos Aires", "en Lima", "españa", "méxico"],
  "Long-tail": ["paso a paso", "para principiantes", "fácil", "rápido", "gratis", "sin registrarse", "2026", "actualizado"],
  "Pregunta": ["cuánto cuesta", "cuándo", "dónde", "cuáles son", "cómo elegir"]
};

export function KeywordSuggestion() {
  const [seed, setSeed] = useState("calculadora online");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const keywords = useMemo(() => {
    const s = seed.trim();
    if (!s) return [];
    const out: { kw: string; intent: string }[] = [];
    Object.entries(MODIFIERS).forEach(([intent, mods]) => {
      mods.forEach((m) => {
        if (intent === "Pregunta" || intent === "Informacional") out.push({ kw: `${m} ${s}`, intent });
        else out.push({ kw: `${s} ${m}`, intent });
      });
    });
    return out;
  }, [seed]);

  async function copy(text: string, i: number) {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 1000);
  }
  async function copyAll() {
    await navigator.clipboard.writeText(keywords.map((k) => k.kw).join("\n"));
    setCopiedIdx(-1);
    setTimeout(() => setCopiedIdx(null), 1000);
  }

  const COLORS: Record<string, string> = {
    "Comercial": "oklch(0.6 0.22 145)", "Informacional": "oklch(0.55 0.22 200)",
    "Comparativa": "oklch(0.6 0.22 280)", "Local": "oklch(0.65 0.2 50)",
    "Long-tail": "oklch(0.6 0.22 320)", "Pregunta": "oklch(0.65 0.2 145)"
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador de Palabras Clave SEO</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">+40 variaciones por intent · Comercial, informacional, comparativa, long-tail, preguntas, geo · Para keyword research.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 mb-6">
        <input className="w-full px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-xl font-bold text-center" value={seed} onChange={(e) => setSeed(e.target.value)} placeholder="palabra raíz: ej. yoga, vino tinto, marketing digital" />
        <button onClick={copyAll} className="w-full mt-3 px-4 py-2 rounded-xl bg-[color:var(--color-bg-soft)] text-sm font-bold inline-flex items-center justify-center gap-2">{copiedIdx === -1 ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} Copiar todas las {keywords.length} keywords</button>
      </div>

      <div className="grid md:grid-cols-2 gap-2 mb-6">
        {keywords.map((k, i) => (
          <button key={i} onClick={() => copy(k.kw, i)} className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-3 text-left flex items-center justify-between gap-2 hover:border-[color:var(--color-brand)] transition group">
            <div>
              <span className="text-[10px] uppercase tracking-wide font-bold px-1.5 py-0.5 rounded mb-1 inline-block" style={{ background: COLORS[k.intent], color: "white" }}>{k.intent}</span>
              <div className="font-semibold text-sm">{k.kw}</div>
            </div>
            {copiedIdx === i ? <Check className="w-4 h-4 text-[color:var(--color-success)]" /> : <Copy className="w-4 h-4 text-[color:var(--color-fg-soft)]" />}
          </button>
        ))}
      </div>

      <AdSlot slot="kwsugg_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2"><Search className="w-4 h-4 inline mr-1" /> Cómo usar este listado</strong>
        Pegá las keywords en Google Keyword Planner, Ubersuggest o Ahrefs para ver volumen y dificultad. Las "long-tail" suelen tener menos volumen pero MUCHO menos competencia y más alta intención de compra/conversión.
      </div>
    </div>
  );
}
