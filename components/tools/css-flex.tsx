"use client";
import { useState } from "react";
import { Copy, Check, Plus, Minus } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 320)";

export function CssFlex() {
  const [direction, setDirection] = useState("row");
  const [justify, setJustify] = useState("flex-start");
  const [align, setAlign] = useState("stretch");
  const [wrap, setWrap] = useState("nowrap");
  const [gap, setGap] = useState(8);
  const [items, setItems] = useState(4);
  const [copied, setCopied] = useState(false);

  const css = `display: flex;
flex-direction: ${direction};
justify-content: ${justify};
align-items: ${align};
flex-wrap: ${wrap};
gap: ${gap}px;`;

  async function copy() {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>CSS Flexbox Generator</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Visualizador interactivo de Flexbox · Ajusta valores y copia el CSS · Aprende viendo.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div>
          <div className="rounded-3xl border-2 border-dashed border-[color:var(--color-brand)] bg-[color:var(--color-bg-soft)] p-6 mb-4 min-h-[400px]" style={{ display: "flex", flexDirection: direction as "row" | "column" | "row-reverse" | "column-reverse", justifyContent: justify, alignItems: align, flexWrap: wrap as "nowrap" | "wrap", gap: gap + "px" }}>
            {Array.from({ length: items }, (_, i) => (
              <div key={i} className="rounded-xl text-white font-bold flex items-center justify-center text-2xl" style={{ background: ACCENT, width: 80, height: 80, minWidth: 80 }}>{i + 1}</div>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setItems(Math.max(1, items - 1))} className="px-4 py-2 rounded-lg bg-[color:var(--color-bg-soft)] inline-flex items-center gap-1"><Minus className="w-4 h-4" /> Quitar</button>
            <button onClick={() => setItems(Math.min(20, items + 1))} className="px-4 py-2 rounded-lg bg-[color:var(--color-bg-soft)] inline-flex items-center gap-1"><Plus className="w-4 h-4" /> Agregar</button>
            <span className="px-4 py-2 text-sm text-[color:var(--color-fg-soft)]">{items} items</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4">
            {[
              { label: "flex-direction", val: direction, set: setDirection, opts: ["row", "row-reverse", "column", "column-reverse"] },
              { label: "justify-content", val: justify, set: setJustify, opts: ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"] },
              { label: "align-items", val: align, set: setAlign, opts: ["stretch", "flex-start", "flex-end", "center", "baseline"] },
              { label: "flex-wrap", val: wrap, set: setWrap, opts: ["nowrap", "wrap", "wrap-reverse"] }
            ].map((c) => (
              <div key={c.label} className="mb-3">
                <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] block mb-1 font-mono">{c.label}</span>
                <select value={c.val} onChange={(e) => c.set(e.target.value)} className="w-full px-2 py-1.5 rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm font-mono">
                  {c.opts.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <label className="block">
              <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] font-mono">gap: {gap}px</span>
              <input type="range" min="0" max="40" value={gap} onChange={(e) => setGap(+e.target.value)} className="w-full mt-1" />
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-black/95 text-green-300 p-5 font-mono text-sm relative">
        <button onClick={copy} className="absolute top-3 right-3 px-3 py-1.5 rounded-md bg-white/10 text-xs text-white inline-flex items-center gap-1">{copied ? <><Check className="w-3 h-3" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar</>}</button>
        <pre className="whitespace-pre pr-20">{css}</pre>
      </div>

      <AdSlot slot="flex_inline" format="auto" minHeight={180} className="mt-6" />
    </div>
  );
}
