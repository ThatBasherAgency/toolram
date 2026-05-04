"use client";
import { useMemo, useState } from "react";
import { Palette, Copy, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 35)";

function rgbToCmyk(r: number, g: number, b: number) {
  const rf = r / 255, gf = g / 255, bf = b / 255;
  const k = 1 - Math.max(rf, gf, bf);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  const c = ((1 - rf - k) / (1 - k)) * 100;
  const m = ((1 - gf - k) / (1 - k)) * 100;
  const y = ((1 - bf - k) / (1 - k)) * 100;
  return { c: Math.round(c), m: Math.round(m), y: Math.round(y), k: Math.round(k * 100) };
}

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

export function RgbCmyk() {
  const [hex, setHex] = useState("#3b82f6");
  const [copied, setCopied] = useState<string | null>(null);

  const rgb = useMemo(() => hexToRgb(hex), [hex]);
  const cmyk = useMemo(() => rgbToCmyk(rgb.r, rgb.g, rgb.b), [rgb]);
  const hsl = useMemo(() => {
    const r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) { case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break; case g: h = ((b - r) / d + 2) / 6; break; case b: h = ((r - g) / d + 4) / 6; break; }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }, [rgb]);

  async function copy(text: string, key: string) {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1000);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Conversor RGB · HEX · CMYK · HSL</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Para diseñadores web e impresión · CMYK profesional para offset.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 mb-6 grid md:grid-cols-2 gap-4 items-center">
        <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="w-full h-40 rounded-2xl cursor-pointer" />
        <input className="px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-2xl font-mono uppercase text-center font-bold" value={hex} onChange={(e) => setHex(e.target.value)} />
      </div>

      <div className="grid md:grid-cols-2 gap-3 mb-6">
        {[
          { l: "HEX", v: hex.toUpperCase(), k: "hex" },
          { l: "RGB", v: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, k: "rgb" },
          { l: "CMYK (impresión)", v: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`, k: "cmyk" },
          { l: "HSL", v: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, k: "hsl" }
        ].map((c) => (
          <button key={c.k} onClick={() => copy(c.v, c.k)} className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4 text-left hover:border-[color:var(--color-brand)] transition group">
            <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] mb-1">{c.l}</div>
            <div className="font-mono text-base font-bold flex items-center justify-between">{c.v}{copied === c.k ? <Check className="w-4 h-4 text-[color:var(--color-success)]" /> : <Copy className="w-4 h-4 text-[color:var(--color-fg-soft)]" />}</div>
          </button>
        ))}
      </div>

      <AdSlot slot="rgbcmyk_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2"><Palette className="w-4 h-4 inline mr-1" /> Cuándo usar cada uno</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">HEX/RGB:</strong> web, apps, pantallas</li>
          <li>• <strong className="text-[color:var(--color-fg)]">CMYK:</strong> impresión offset, flyers, libros (no monitor)</li>
          <li>• <strong className="text-[color:var(--color-fg)]">HSL:</strong> tweaks (más saturado, más oscuro) sin cambiar tono</li>
        </ul>
      </div>
    </div>
  );
}
