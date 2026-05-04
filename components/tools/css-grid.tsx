"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 200)";

export function CssGrid() {
  const [cols, setCols] = useState("repeat(3, 1fr)");
  const [rows, setRows] = useState("repeat(3, 100px)");
  const [gap, setGap] = useState(12);
  const [items, setItems] = useState(9);
  const [copied, setCopied] = useState(false);

  const css = `display: grid;
grid-template-columns: ${cols};
grid-template-rows: ${rows};
gap: ${gap}px;`;

  async function copy() {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  const PRESETS = [
    { name: "3 columnas", c: "repeat(3, 1fr)" },
    { name: "4 columnas", c: "repeat(4, 1fr)" },
    { name: "Sidebar + main", c: "200px 1fr" },
    { name: "Holy grail", c: "200px 1fr 200px" },
    { name: "Auto-fit 200px", c: "repeat(auto-fit, minmax(200px, 1fr))" },
    { name: "Auto-fill 100px", c: "repeat(auto-fill, minmax(100px, 1fr))" }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>CSS Grid Generator</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Generador visual de CSS Grid · Templates auto-fit/fill · Layouts complejos en segundos.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="rounded-3xl border-2 border-dashed border-[color:var(--color-brand)] bg-[color:var(--color-bg-soft)] p-6 min-h-[400px]" style={{ display: "grid", gridTemplateColumns: cols, gridTemplateRows: rows, gap: gap + "px" }}>
          {Array.from({ length: items }, (_, i) => (
            <div key={i} className="rounded-xl text-white font-bold flex items-center justify-center text-xl" style={{ background: ACCENT, minHeight: 60 }}>{i + 1}</div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4 space-y-3">
            <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] font-mono">grid-template-columns</span>
              <input className="w-full mt-1 px-2 py-2 rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-xs font-mono" value={cols} onChange={(e) => setCols(e.target.value)} /></label>
            <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] font-mono">grid-template-rows</span>
              <input className="w-full mt-1 px-2 py-2 rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-xs font-mono" value={rows} onChange={(e) => setRows(e.target.value)} /></label>
            <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">gap: {gap}px</span>
              <input type="range" min="0" max="40" value={gap} onChange={(e) => setGap(+e.target.value)} className="w-full" /></label>
            <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">items: {items}</span>
              <input type="range" min="1" max="20" value={items} onChange={(e) => setItems(+e.target.value)} className="w-full" /></label>
          </div>

          <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4">
            <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] mb-2">Presets</div>
            <div className="space-y-1">
              {PRESETS.map((p) => (
                <button key={p.name} onClick={() => setCols(p.c)} className="block w-full text-left px-2 py-1.5 rounded text-xs hover:bg-[color:var(--color-bg-soft)]"><strong>{p.name}</strong><br /><span className="font-mono text-[10px] opacity-70">{p.c}</span></button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-black/95 text-green-300 p-5 font-mono text-sm relative">
        <button onClick={copy} className="absolute top-3 right-3 px-3 py-1.5 rounded-md bg-white/10 text-xs text-white inline-flex items-center gap-1">{copied ? <><Check className="w-3 h-3" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar</>}</button>
        <pre className="whitespace-pre pr-20">{css}</pre>
      </div>

      <AdSlot slot="grid_inline" format="auto" minHeight={180} className="mt-6" />
    </div>
  );
}
