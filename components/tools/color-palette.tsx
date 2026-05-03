"use client";
import { useEffect, useMemo, useState } from "react";
import { Copy, Check, Shuffle, Lock, Unlock } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 240)";

type Mode = "random" | "monochromatic" | "analogous" | "complementary" | "triadic" | "tetradic";

function hslToHex(h: number, s: number, l: number) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const c = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(255 * c).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function generatePalette(mode: Mode, baseHue: number, locked: (string | null)[]): string[] {
  const out: string[] = [];
  for (let i = 0; i < 5; i++) {
    if (locked[i]) { out.push(locked[i]!); continue; }
    let h = baseHue, s = 65, l = 55;
    if (mode === "monochromatic") {
      h = baseHue;
      l = 25 + i * 13;
    } else if (mode === "analogous") {
      h = (baseHue + (i - 2) * 25 + 360) % 360;
    } else if (mode === "complementary") {
      h = i % 2 === 0 ? baseHue : (baseHue + 180) % 360;
      l = 35 + (i % 3) * 15;
    } else if (mode === "triadic") {
      h = (baseHue + i * 120) % 360;
    } else if (mode === "tetradic") {
      h = (baseHue + i * 90) % 360;
    } else {
      h = (baseHue + i * 73) % 360;
      s = 55 + (i * 17) % 30;
      l = 40 + (i * 13) % 30;
    }
    out.push(hslToHex(h, s, l));
  }
  return out;
}

function getLuminance(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

export function ColorPalette() {
  const [mode, setMode] = useState<Mode>("random");
  const [baseHue, setBaseHue] = useState(200);
  const [locked, setLocked] = useState<(string | null)[]>([null, null, null, null, null]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const palette = useMemo(() => generatePalette(mode, baseHue, locked), [mode, baseHue, locked]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" && !(e.target as HTMLElement)?.matches("input,textarea")) {
        e.preventDefault();
        setBaseHue(Math.floor(Math.random() * 360));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function toggleLock(i: number) {
    setLocked((prev) => prev.map((v, idx) => idx === i ? (v ? null : palette[i]) : v));
  }
  async function copy(hex: string, i: number) {
    await navigator.clipboard.writeText(hex);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 1200);
  }
  async function copyAll() {
    await navigator.clipboard.writeText(palette.join(", "));
    setCopiedIdx(-1);
    setTimeout(() => setCopiedIdx(null), 1200);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador de Paleta de Colores</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Genera paletas armónicas: monocromática, análoga, complementaria, triádica, tetrádica · <span className="font-mono bg-[color:var(--color-bg-soft)] px-1.5 py-0.5 rounded text-xs">Espacio</span> = nueva paleta.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5 mb-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          {(["random", "monochromatic", "analogous", "complementary", "triadic", "tetradic"] as Mode[]).map((m) => (
            <button key={m} onClick={() => setMode(m)} className="px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition" style={mode === m ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>{m}</button>
          ))}
        </div>

        <label className="block">
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Tono base: {baseHue}°</span>
          <input type="range" min="0" max="360" value={baseHue} onChange={(e) => setBaseHue(+e.target.value)} className="w-full mt-1" style={{ background: "linear-gradient(90deg, hsl(0,80%,60%), hsl(60,80%,60%), hsl(120,80%,60%), hsl(180,80%,60%), hsl(240,80%,60%), hsl(300,80%,60%), hsl(360,80%,60%))" }} />
        </label>

        <div className="flex gap-2">
          <button onClick={() => setBaseHue(Math.floor(Math.random() * 360))} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold inline-flex items-center justify-center gap-2" style={{ background: ACCENT, color: "white" }}>
            <Shuffle className="w-4 h-4" /> Generar paleta
          </button>
          <button onClick={copyAll} className="px-4 py-2.5 rounded-xl bg-[color:var(--color-bg-soft)] text-sm font-bold inline-flex items-center gap-2">
            {copiedIdx === -1 ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} Copiar todos
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 mb-6 h-[280px] md:h-[400px]">
        {palette.map((hex, i) => {
          const dark = getLuminance(hex) < 0.5;
          const txt = dark ? "white" : "black";
          return (
            <div key={i} className="relative rounded-2xl flex flex-col justify-end p-3 group cursor-pointer" style={{ background: hex }} onClick={() => copy(hex, i)}>
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                <button onClick={(e) => { e.stopPropagation(); toggleLock(i); }} className="w-7 h-7 rounded-md backdrop-blur flex items-center justify-center" style={{ background: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)", color: txt }}>
                  {locked[i] ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                </button>
              </div>
              {locked[i] && (
                <div className="absolute top-3 left-3 w-6 h-6 rounded-md flex items-center justify-center" style={{ background: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)", color: txt }}><Lock className="w-3 h-3" /></div>
              )}
              <div className="font-mono font-bold uppercase text-sm md:text-base tracking-wide" style={{ color: txt }}>{hex}</div>
              <div className="text-[10px] opacity-75 inline-flex items-center gap-1" style={{ color: txt }}>
                {copiedIdx === i ? <><Check className="w-3 h-3" /> ¡Copiado!</> : <><Copy className="w-3 h-3" /> click para copiar</>}
              </div>
            </div>
          );
        })}
      </div>

      <AdSlot slot="palette_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">🎨 Tipos de paleta</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">Monocromática:</strong> mismo tono, distinta luminosidad — elegante y profesional.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Análoga:</strong> tonos vecinos en el círculo cromático — armoniosa y natural.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Complementaria:</strong> tonos opuestos — alto contraste y dinamismo.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Triádica:</strong> 3 tonos equidistantes — vibrante y balanceada.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Tetrádica:</strong> 4 tonos en cuadrado — variedad sin perder armonía.</li>
        </ul>
      </div>
    </div>
  );
}
