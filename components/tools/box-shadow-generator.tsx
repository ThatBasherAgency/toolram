"use client";
import { useMemo, useState } from "react";
import { Copy, Check, Plus, Trash2 } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 280)";

type Shadow = {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
};

const PRESETS: Record<string, Shadow[]> = {
  Suave: [{ x: 0, y: 4, blur: 6, spread: -1, color: "rgba(0,0,0,0.1)", inset: false }],
  Card: [
    { x: 0, y: 1, blur: 3, spread: 0, color: "rgba(0,0,0,0.12)", inset: false },
    { x: 0, y: 1, blur: 2, spread: 0, color: "rgba(0,0,0,0.08)", inset: false }
  ],
  Material: [
    { x: 0, y: 10, blur: 20, spread: 0, color: "rgba(0,0,0,0.19)", inset: false },
    { x: 0, y: 6, blur: 6, spread: 0, color: "rgba(0,0,0,0.23)", inset: false }
  ],
  Neumorfo: [
    { x: 9, y: 9, blur: 18, spread: 0, color: "rgba(166,168,180,0.55)", inset: false },
    { x: -9, y: -9, blur: 18, spread: 0, color: "rgba(255,255,255,0.85)", inset: false }
  ],
  Glow: [{ x: 0, y: 0, blur: 30, spread: 8, color: "rgba(99,102,241,0.6)", inset: false }],
  Sunken: [{ x: 0, y: 4, blur: 8, spread: 2, color: "rgba(0,0,0,0.18)", inset: true }],
  Larga: [{ x: 14, y: 14, blur: 0, spread: 0, color: "rgba(0,0,0,0.85)", inset: false }]
};

export function BoxShadowGenerator() {
  const [shadows, setShadows] = useState<Shadow[]>(PRESETS.Material);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [boxColor, setBoxColor] = useState("#3b82f6");
  const [radius, setRadius] = useState(16);
  const [copied, setCopied] = useState(false);

  const css = useMemo(() => shadows.map((s) => `${s.inset ? "inset " : ""}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`).join(",\n  "), [shadows]);

  function update(i: number, patch: Partial<Shadow>) {
    setShadows((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  }
  function add() {
    setShadows((prev) => [...prev, { x: 0, y: 4, blur: 6, spread: 0, color: "rgba(0,0,0,0.15)", inset: false }]);
  }
  function remove(i: number) {
    setShadows((prev) => prev.filter((_, idx) => idx !== i));
  }
  async function copy() {
    await navigator.clipboard.writeText(`box-shadow: ${css};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Box Shadow Generator</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">CSS box-shadow visual con multi-shadow + insets · 7 presets · copia el código.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_420px] gap-6">
        <div className="rounded-3xl flex items-center justify-center p-12 md:p-16 min-h-[400px]" style={{ background: bgColor }}>
          <div style={{ width: 200, height: 200, background: boxColor, borderRadius: radius, boxShadow: css }} />
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5">
            <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] mb-2">Presets</div>
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(PRESETS).map(([k, v]) => (
                <button key={k} onClick={() => setShadows(v)} className="px-3 py-1.5 rounded-lg bg-[color:var(--color-bg-soft)] text-xs font-bold hover:bg-[color:var(--color-fg)]/10">{k}</button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs text-[color:var(--color-fg-soft)]">Fondo</span>
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-10 rounded-lg cursor-pointer mt-1" />
              </label>
              <label className="block">
                <span className="text-xs text-[color:var(--color-fg-soft)]">Caja</span>
                <input type="color" value={boxColor} onChange={(e) => setBoxColor(e.target.value)} className="w-full h-10 rounded-lg cursor-pointer mt-1" />
              </label>
            </div>
            <label className="block mt-3">
              <span className="text-xs text-[color:var(--color-fg-soft)]">Border-radius: {radius}px</span>
              <input type="range" min="0" max="100" value={radius} onChange={(e) => setRadius(+e.target.value)} className="w-full mt-1" />
            </label>
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {shadows.map((s, i) => (
              <div key={i} className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-bold uppercase">Sombra {i + 1}</div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs inline-flex items-center gap-1"><input type="checkbox" checked={s.inset} onChange={(e) => update(i, { inset: e.target.checked })} /> inset</label>
                    {shadows.length > 1 && <button onClick={() => remove(i)} className="text-[color:var(--color-danger)]"><Trash2 className="w-4 h-4" /></button>}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {(["x", "y", "blur", "spread"] as const).map((k) => (
                    <label key={k} className="block">
                      <span className="text-[color:var(--color-fg-soft)]">{k}: {s[k]}px</span>
                      <input type="range" min={k === "blur" ? 0 : -50} max={k === "blur" ? 100 : 50} value={s[k]} onChange={(e) => update(i, { [k]: +e.target.value })} className="w-full" />
                    </label>
                  ))}
                </div>
                <input type="text" value={s.color} onChange={(e) => update(i, { color: e.target.value })} className="w-full mt-2 px-2 py-1 rounded border border-[color:var(--color-border)] text-xs font-mono" />
              </div>
            ))}
            <button onClick={add} className="w-full px-4 py-3 rounded-xl bg-[color:var(--color-bg-soft)] hover:bg-[color:var(--color-fg)]/10 text-sm font-bold inline-flex items-center justify-center gap-1.5"><Plus className="w-4 h-4" /> Añadir sombra</button>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-black/95 text-green-300 p-5 font-mono text-sm relative">
        <button onClick={copy} className="absolute top-3 right-3 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-xs inline-flex items-center gap-1 text-white">
          {copied ? <><Check className="w-3 h-3" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar</>}
        </button>
        <pre className="whitespace-pre-wrap pr-20">box-shadow: {css};</pre>
      </div>

      <AdSlot slot="boxshadow_inline" format="auto" minHeight={180} className="mt-6" />
    </div>
  );
}
