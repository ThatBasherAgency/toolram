"use client";
import { useMemo, useState } from "react";
import { Maximize2 } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 200)";

const RATIOS = [
  { l: "16:9 (HD video)", w: 16, h: 9 }, { l: "9:16 (TikTok/Reels)", w: 9, h: 16 },
  { l: "1:1 (Instagram)", w: 1, h: 1 }, { l: "4:5 (Insta retrato)", w: 4, h: 5 },
  { l: "4:3 (TV antigua)", w: 4, h: 3 }, { l: "3:2 (cámara DSLR)", w: 3, h: 2 },
  { l: "21:9 (cinemascope)", w: 21, h: 9 }, { l: "2:3 (Pinterest)", w: 2, h: 3 }
];

export function AspectRatio() {
  const [width, setWidth] = useState("1920");
  const [height, setHeight] = useState("1080");
  const [targetW, setTargetW] = useState("1280");

  const result = useMemo(() => {
    const w = parseFloat(width); const h = parseFloat(height);
    if (!w || !h) return null;
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const g = gcd(w, h);
    const ratio = `${w / g}:${h / g}`;
    const decimal = (w / h).toFixed(4);
    const tw = parseFloat(targetW);
    const calculatedH = tw ? Math.round((tw * h) / w) : 0;
    return { ratio, decimal, calculatedH, w, h };
  }, [width, height, targetW]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Calculadora de Aspect Ratio</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Relación de aspecto de imágenes/videos · Calcula dimensiones manteniendo proporción · Presets RRSS.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6 grid md:grid-cols-2 gap-3">
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Ancho original</span>
          <input type="number" className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-2xl font-mono tabular-nums" value={width} onChange={(e) => setWidth(e.target.value)} /></label>
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Alto original</span>
          <input type="number" className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-2xl font-mono tabular-nums" value={height} onChange={(e) => setHeight(e.target.value)} /></label>
        <label className="block md:col-span-2"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Nuevo ancho (calcula alto manteniendo ratio)</span>
          <input type="number" className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-2xl font-mono tabular-nums" value={targetW} onChange={(e) => setTargetW(e.target.value)} /></label>
      </div>

      {result && (
        <>
          <div className="rounded-3xl p-8 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
            <div className="text-xs uppercase opacity-80 tracking-widest mb-2 inline-flex items-center gap-1.5"><Maximize2 className="w-3 h-3" /> Aspect Ratio</div>
            <div className="text-7xl md:text-8xl font-black tabular-nums">{result.ratio}</div>
            <div className="mt-2 text-base opacity-90">decimal: {result.decimal}</div>
            <div className="mt-6 rounded-xl bg-white/15 backdrop-blur p-4 max-w-md mx-auto">
              <div className="text-xs opacity-80 uppercase">Nuevas dimensiones</div>
              <div className="text-3xl font-extrabold">{targetW} × {result.calculatedH} px</div>
            </div>
          </div>

          <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5 mb-6">
            <div className="font-bold mb-3">📐 Aspect ratios comunes</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {RATIOS.map((r) => (
                <button key={r.l} onClick={() => { setWidth(String(r.w * 100)); setHeight(String(r.h * 100)); }} className="rounded-lg bg-[color:var(--color-bg-soft)] hover:bg-[color:var(--color-fg)]/10 p-2 text-left">
                  <div className="aspect-[var(--w)/var(--h)] bg-[color:var(--color-brand)]/20 rounded mb-1" style={{ "--w": r.w, "--h": r.h } as React.CSSProperties}></div>
                  <div className="text-xs font-bold">{r.l}</div>
                </button>
              ))}
            </div>
          </div>

          <AdSlot slot="ratio_inline" format="auto" minHeight={180} className="mb-6" />
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">📱 Por plataforma</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">Instagram feed:</strong> 1:1 o 4:5 vertical</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Instagram Stories/Reels:</strong> 9:16 (1080×1920)</li>
          <li>• <strong className="text-[color:var(--color-fg)]">YouTube:</strong> 16:9 (1920×1080)</li>
          <li>• <strong className="text-[color:var(--color-fg)]">YouTube Shorts/TikTok:</strong> 9:16</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Twitter/X:</strong> 16:9 o 1:1</li>
        </ul>
      </div>
    </div>
  );
}
