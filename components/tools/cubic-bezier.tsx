"use client";
import { useEffect, useRef, useState } from "react";
import { Copy, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 280)";

const PRESETS: Record<string, [number, number, number, number]> = {
  ease: [0.25, 0.1, 0.25, 1],
  linear: [0, 0, 1, 1],
  "ease-in": [0.42, 0, 1, 1],
  "ease-out": [0, 0, 0.58, 1],
  "ease-in-out": [0.42, 0, 0.58, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  "in-back": [0.6, -0.28, 0.735, 0.045],
  "out-back": [0.175, 0.885, 0.32, 1.275],
  "in-out-back": [0.68, -0.55, 0.265, 1.55],
  swift: [0.4, 0, 0.2, 1]
};

export function CubicBezier() {
  const [p, setP] = useState<[number, number, number, number]>([0.25, 0.1, 0.25, 1]);
  const [duration, setDuration] = useState(1);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width = 280;
    const h = canvas.height = 280;
    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(128,128,128,0.2)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      ctx.beginPath();
      ctx.moveTo((w / 4) * i, 0); ctx.lineTo((w / 4) * i, h);
      ctx.moveTo(0, (h / 4) * i); ctx.lineTo(w, (h / 4) * i);
      ctx.stroke();
    }

    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, h);
    for (let t = 0; t <= 1; t += 0.01) {
      const x = 3 * (1 - t) * (1 - t) * t * p[0] + 3 * (1 - t) * t * t * p[2] + t * t * t;
      const y = 3 * (1 - t) * (1 - t) * t * p[1] + 3 * (1 - t) * t * t * p[3] + t * t * t;
      ctx.lineTo(x * w, h - y * h);
    }
    ctx.stroke();

    ctx.fillStyle = "#3b82f6";
    ctx.beginPath(); ctx.arc(p[0] * w, h - p[1] * h, 8, 0, 2 * Math.PI); ctx.fill();
    ctx.fillStyle = "#ef4444";
    ctx.beginPath(); ctx.arc(p[2] * w, h - p[3] * h, 8, 0, 2 * Math.PI); ctx.fill();

    ctx.strokeStyle = "rgba(128,128,128,0.4)";
    ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(p[0] * w, h - p[1] * h); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(w, 0); ctx.lineTo(p[2] * w, h - p[3] * h); ctx.stroke();
  }, [p]);

  const cubic = `cubic-bezier(${p.map((v) => v.toFixed(2)).join(", ")})`;
  const css = `transition: all ${duration}s ${cubic};`;

  function update(idx: 0 | 1 | 2 | 3, val: number) {
    const np = [...p] as [number, number, number, number];
    np[idx] = val;
    setP(np);
  }

  async function copy() {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  function animate() {
    const ball = ballRef.current;
    if (!ball) return;
    ball.style.transition = "none";
    ball.style.transform = "translateX(0)";
    void ball.offsetWidth;
    ball.style.transition = `transform ${duration}s ${cubic}`;
    ball.style.transform = "translateX(280px)";
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Cubic Bezier Generator</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Curvas de animación CSS personalizadas · Visualización gráfica + preview · 10 presets.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 text-center">
          <canvas ref={canvasRef} className="mx-auto" />
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            {(["x1", "y1", "x2", "y2"] as const).map((n, i) => (
              <label key={n} className="block">
                <span className="text-[color:var(--color-fg-soft)]">{n}: {p[i].toFixed(2)}</span>
                <input type="range" min={i % 2 === 1 ? "-0.5" : "0"} max={i % 2 === 1 ? "1.5" : "1"} step="0.01" value={p[i]} onChange={(e) => update(i as 0 | 1 | 2 | 3, parseFloat(e.target.value))} className="w-full" />
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4">
            <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] mb-2">Presets</div>
            <div className="grid grid-cols-2 gap-1">
              {Object.entries(PRESETS).map(([n, v]) => (
                <button key={n} onClick={() => setP(v)} className="px-2 py-1.5 rounded text-xs font-bold bg-[color:var(--color-bg-soft)] hover:bg-[color:var(--color-fg)]/10">{n}</button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4">
            <label className="block mb-3"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Duración: {duration}s</span>
              <input type="range" min="0.2" max="3" step="0.1" value={duration} onChange={(e) => setDuration(+e.target.value)} className="w-full" /></label>
            <button onClick={animate} className="w-full px-4 py-2 rounded-xl text-white font-bold mb-3" style={{ background: ACCENT }}>▶ Probar animación</button>
            <div className="rounded-lg bg-[color:var(--color-bg-soft)] p-2 overflow-hidden">
              <div ref={ballRef} className="w-12 h-12 rounded-full" style={{ background: ACCENT, transform: "translateX(0)" }} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-black/95 text-green-300 p-5 font-mono text-sm relative">
        <button onClick={copy} className="absolute top-3 right-3 px-3 py-1.5 rounded-md bg-white/10 text-xs text-white inline-flex items-center gap-1">{copied ? <><Check className="w-3 h-3" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar</>}</button>
        <pre className="whitespace-pre-wrap pr-20">{css}</pre>
      </div>

      <AdSlot slot="bezier_inline" format="auto" minHeight={180} className="mt-6" />
    </div>
  );
}
