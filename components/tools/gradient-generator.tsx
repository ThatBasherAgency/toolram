"use client";
import { useMemo, useState } from "react";
import { Copy, Check, Plus, Trash2, Shuffle } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.65 0.22 200)";

type Stop = { color: string; position: number };
type GradType = "linear" | "radial" | "conic";

const PRESETS: Record<string, Stop[]> = {
  Sunset: [{ color: "#ff6b6b", position: 0 }, { color: "#ffd93d", position: 100 }],
  Ocean: [{ color: "#0093E9", position: 0 }, { color: "#80D0C7", position: 100 }],
  Purple: [{ color: "#8E2DE2", position: 0 }, { color: "#4A00E0", position: 100 }],
  Rainbow: [{ color: "#ff0000", position: 0 }, { color: "#ffff00", position: 25 }, { color: "#00ff00", position: 50 }, { color: "#00ffff", position: 75 }, { color: "#ff00ff", position: 100 }],
  Mint: [{ color: "#00b09b", position: 0 }, { color: "#96c93d", position: 100 }],
  Pink: [{ color: "#fc466b", position: 0 }, { color: "#3f5efb", position: 100 }],
  Gold: [{ color: "#f6d365", position: 0 }, { color: "#fda085", position: 100 }],
  Dark: [{ color: "#000000", position: 0 }, { color: "#434343", position: 100 }],
  Neon: [{ color: "#00f260", position: 0 }, { color: "#0575e6", position: 100 }],
  Fire: [{ color: "#ff416c", position: 0 }, { color: "#ff4b2b", position: 100 }]
};

function randomColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 80%, 60%)`;
}
function hslToHex(hsl: string) {
  const m = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!m) return hsl;
  const [h, s, l] = [+m[1], +m[2] / 100, +m[3] / 100];
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const c = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(255 * c).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function GradientGenerator() {
  const [type, setType] = useState<GradType>("linear");
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<Stop[]>(PRESETS.Ocean);
  const [copied, setCopied] = useState(false);

  const css = useMemo(() => {
    const sorted = [...stops].sort((a, b) => a.position - b.position);
    const stopsCss = sorted.map((s) => `${s.color} ${s.position}%`).join(", ");
    if (type === "linear") return `linear-gradient(${angle}deg, ${stopsCss})`;
    if (type === "radial") return `radial-gradient(circle, ${stopsCss})`;
    return `conic-gradient(from ${angle}deg, ${stopsCss})`;
  }, [type, angle, stops]);

  function update(i: number, patch: Partial<Stop>) {
    setStops((p) => p.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  }
  function add() {
    const last = stops[stops.length - 1].position;
    setStops((p) => [...p, { color: randomColor(), position: Math.min(100, last + 10) }]);
  }
  function remove(i: number) {
    if (stops.length > 2) setStops((p) => p.filter((_, idx) => idx !== i));
  }
  function shuffle() {
    setStops((p) => p.map((s) => ({ ...s, color: hslToHex(randomColor()) })));
  }
  async function copy() {
    await navigator.clipboard.writeText(`background: ${css};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Gradient Generator</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Crea gradientes CSS lineales, radiales o cónicos con múltiples color stops.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_420px] gap-6">
        <div className="rounded-3xl min-h-[400px] shadow-2xl" style={{ background: css }} />

        <div className="space-y-4">
          <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5">
            <div className="grid grid-cols-3 gap-2 mb-4">
              {(["linear", "radial", "conic"] as GradType[]).map((t) => (
                <button key={t} onClick={() => setType(t)} className="px-3 py-2 rounded-lg text-xs font-bold transition" style={type === t ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>{t}</button>
              ))}
            </div>
            {type !== "radial" && (
              <label className="block mb-4">
                <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Ángulo: {angle}°</span>
                <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(+e.target.value)} className="w-full mt-1" />
              </label>
            )}
            <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] mb-2">Presets</div>
            <div className="flex flex-wrap gap-2 mb-3">
              {Object.entries(PRESETS).map(([k, v]) => (
                <button key={k} onClick={() => setStops(v)} className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: `linear-gradient(135deg, ${v.map((s) => s.color).join(", ")})`, color: "white" }}>{k}</button>
              ))}
            </div>
            <button onClick={shuffle} className="w-full px-4 py-2 rounded-xl bg-[color:var(--color-bg-soft)] text-sm font-bold inline-flex items-center justify-center gap-1.5"><Shuffle className="w-4 h-4" /> Aleatorio</button>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {stops.map((s, i) => (
              <div key={i} className="rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-3 flex items-center gap-3">
                <input type="color" value={s.color.startsWith("#") ? s.color : "#000000"} onChange={(e) => update(i, { color: e.target.value })} className="w-12 h-10 rounded cursor-pointer" />
                <div className="flex-1">
                  <input type="text" value={s.color} onChange={(e) => update(i, { color: e.target.value })} className="w-full px-2 py-1 rounded border border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-xs font-mono" />
                  <input type="range" min="0" max="100" value={s.position} onChange={(e) => update(i, { position: +e.target.value })} className="w-full mt-1" />
                </div>
                <span className="text-xs tabular-nums w-10 text-right">{s.position}%</span>
                {stops.length > 2 && <button onClick={() => remove(i)} className="text-[color:var(--color-danger)]"><Trash2 className="w-4 h-4" /></button>}
              </div>
            ))}
            <button onClick={add} className="w-full px-4 py-2 rounded-xl bg-[color:var(--color-bg-soft)] text-sm font-bold inline-flex items-center justify-center gap-1.5"><Plus className="w-4 h-4" /> Añadir stop</button>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-black/95 text-green-300 p-5 font-mono text-sm relative">
        <button onClick={copy} className="absolute top-3 right-3 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-xs inline-flex items-center gap-1 text-white">
          {copied ? <><Check className="w-3 h-3" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar</>}
        </button>
        <pre className="whitespace-pre-wrap break-all pr-20">background: {css};</pre>
      </div>

      <AdSlot slot="gradient_inline" format="auto" minHeight={180} className="mt-6" />
    </div>
  );
}
