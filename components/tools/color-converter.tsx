"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace("#", "").match(/^([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
}
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

export function ColorConverter() {
  const [hex, setHex] = useState("#6366f1");
  const [copied, setCopied] = useState<string | null>(null);
  const rgb = hexToRgb(hex);
  const r = rgb?.[0] ?? 0, g = rgb?.[1] ?? 0, b = rgb?.[2] ?? 0;
  const [hH, sS, lL] = rgbToHsl(r, g, b);

  const formats = rgb ? {
    HEX: hex.toUpperCase(),
    RGB: `rgb(${r}, ${g}, ${b})`,
    HSL: `hsl(${hH}, ${sS}%, ${lL}%)`,
    "RGB CSS var": `${r} ${g} ${b}`,
    Tailwind: `bg-[${hex}]`
  } : null;

  async function copy(k: string, v: string) {
    await navigator.clipboard.writeText(v);
    setCopied(k);
    setTimeout(() => setCopied(null), 1200);
  }

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-[200px_1fr] gap-4">
        <div className="space-y-2">
          <div className="w-full h-32 rounded-lg border border-[color:var(--color-border)]" style={{ background: hex }} />
          <input type="color" className="w-full h-10 rounded cursor-pointer" value={rgb ? hex : "#000000"} onChange={(e) => setHex(e.target.value)} />
          <input className="input font-mono" value={hex} onChange={(e) => setHex(e.target.value)} placeholder="#6366f1" />
        </div>
        <div className="space-y-2">
          {!rgb && <div className="card !p-3 text-sm text-[color:var(--color-danger)]">HEX inválido</div>}
          {formats && Object.entries(formats).map(([k, v]) => (
            <div key={k} className="card !p-3 flex items-center justify-between gap-2">
              <div>
                <div className="text-xs uppercase text-[color:var(--color-fg-soft)]">{k}</div>
                <div className="font-mono text-sm">{v}</div>
              </div>
              <button onClick={() => copy(k, v)} className="btn btn-ghost h-8 !px-2 text-xs">
                {copied === k ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
