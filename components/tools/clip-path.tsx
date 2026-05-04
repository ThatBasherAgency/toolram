"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 320)";

const SHAPES: Record<string, string> = {
  Triángulo: "polygon(50% 0%, 0% 100%, 100% 100%)",
  Rombo: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  Pentágono: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
  Hexágono: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
  Estrella: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
  Corazón: "polygon(50% 100%, 0% 50%, 0% 25%, 25% 0%, 50% 25%, 75% 0%, 100% 25%, 100% 50%)",
  Flecha: "polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)",
  "Bocadillo chat": "polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)",
  Círculo: "circle(50% at 50% 50%)",
  Elipse: "ellipse(50% 30% at 50% 50%)",
  Diagonal: "polygon(0 0, 100% 0, 100% 80%, 0 100%)",
  Onda: "polygon(0% 0%, 100% 0%, 100% 80%, 75% 90%, 50% 80%, 25% 90%, 0% 80%)"
};

export function ClipPath() {
  const [shape, setShape] = useState(SHAPES.Estrella);
  const [bgColor, setBgColor] = useState("#3b82f6");
  const [copied, setCopied] = useState(false);

  const css = `clip-path: ${shape};`;

  async function copy() {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>CSS Clip-Path Generator</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">12 formas listas (estrella, corazón, hexágono, onda...) · Sin SVG · Animable.</p>
      </div>

      <div className="grid md:grid-cols-[1fr_300px] gap-6">
        <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg-soft)] p-12 flex items-center justify-center">
          <div style={{ width: 280, height: 280, background: bgColor, clipPath: shape }} />
        </div>
        <div className="space-y-3">
          <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4">
            <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] mb-2">Forma</div>
            <div className="grid grid-cols-2 gap-1">
              {Object.entries(SHAPES).map(([n, v]) => (
                <button key={n} onClick={() => setShape(v)} className="px-2 py-1.5 rounded text-xs font-bold transition" style={shape === v ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>{n}</button>
              ))}
            </div>
            <label className="block mt-3"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Color</span>
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-10 rounded mt-1 cursor-pointer" /></label>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-black/95 text-green-300 p-5 font-mono text-sm relative">
        <button onClick={copy} className="absolute top-3 right-3 px-3 py-1.5 rounded-md bg-white/10 text-xs text-white inline-flex items-center gap-1">{copied ? <><Check className="w-3 h-3" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar</>}</button>
        <pre className="whitespace-pre-wrap pr-20 break-all">{css}</pre>
      </div>

      <AdSlot slot="clip_inline" format="auto" minHeight={180} className="mt-6" />
    </div>
  );
}
