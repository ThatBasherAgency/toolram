"use client";
import { useMemo, useState } from "react";
import { Eye, CheckCircle2, XCircle } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 145)";

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return null;
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}
function relativeLuminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb.map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(c1: string, c2: string): number {
  const r1 = hexToRgb(c1); const r2 = hexToRgb(c2);
  if (!r1 || !r2) return 0;
  const l1 = relativeLuminance(r1); const l2 = relativeLuminance(r2);
  const [light, dark] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (light + 0.05) / (dark + 0.05);
}

export function ContrastChecker() {
  const [fg, setFg] = useState("#000000");
  const [bg, setBg] = useState("#ffffff");

  const ratio = useMemo(() => contrast(fg, bg), [fg, bg]);

  const tests = [
    { name: "Texto normal AA", req: 4.5, desc: "≥ 4.5:1" },
    { name: "Texto normal AAA", req: 7, desc: "≥ 7:1 (estricto)" },
    { name: "Texto grande AA", req: 3, desc: "≥ 3:1 (18pt+)" },
    { name: "Texto grande AAA", req: 4.5, desc: "≥ 4.5:1" },
    { name: "UI / iconos", req: 3, desc: "≥ 3:1" }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Verificador de Contraste WCAG</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Accesibilidad de colores · Cumplimiento WCAG AA y AAA · Testeo en tiempo real.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6 grid md:grid-cols-2 gap-4">
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Color texto</span>
          <div className="flex gap-2 mt-1.5"><input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-12 w-16 rounded cursor-pointer" /><input type="text" value={fg} onChange={(e) => setFg(e.target.value)} className="flex-1 px-3 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] font-mono uppercase" /></div></label>
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Color fondo</span>
          <div className="flex gap-2 mt-1.5"><input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-12 w-16 rounded cursor-pointer" /><input type="text" value={bg} onChange={(e) => setBg(e.target.value)} className="flex-1 px-3 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] font-mono uppercase" /></div></label>
      </div>

      <div className="rounded-3xl p-12 mb-6 text-center" style={{ background: bg, color: fg }}>
        <div className="text-4xl font-bold mb-3">Texto de ejemplo</div>
        <div className="text-base mb-3">El zorro marrón salta sobre el perro perezoso.</div>
        <div className="text-sm">Texto pequeño · 14px regular · Lorem ipsum dolor sit amet.</div>
      </div>

      <div className="rounded-3xl p-8 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
        <div className="text-xs uppercase opacity-80 tracking-widest mb-2 inline-flex items-center gap-1.5"><Eye className="w-3 h-3" /> Ratio de contraste</div>
        <div className="text-7xl md:text-8xl font-black tabular-nums">{ratio.toFixed(2)}<span className="text-3xl">:1</span></div>
      </div>

      <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5 mb-6">
        <div className="font-bold mb-3">Cumplimiento WCAG</div>
        <div className="space-y-2">
          {tests.map((t) => {
            const passes = ratio >= t.req;
            return (
              <div key={t.name} className="flex items-center gap-3 p-2 rounded-lg" style={{ background: passes ? "color-mix(in oklch, var(--color-success) 10%, transparent)" : "color-mix(in oklch, var(--color-danger) 10%, transparent)" }}>
                {passes ? <CheckCircle2 className="w-5 h-5 text-[color:var(--color-success)]" /> : <XCircle className="w-5 h-5 text-[color:var(--color-danger)]" />}
                <div className="flex-1"><div className="font-bold text-sm">{t.name}</div><div className="text-xs text-[color:var(--color-fg-soft)]">{t.desc}</div></div>
                <div className={`font-mono font-bold ${passes ? "text-[color:var(--color-success)]" : "text-[color:var(--color-danger)]"}`}>{passes ? "PASA" : "FALLA"}</div>
              </div>
            );
          })}
        </div>
      </div>

      <AdSlot slot="contrast_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">♿ Por qué importa</strong>
        WCAG 2.1 (Web Content Accessibility Guidelines) define 3 niveles. AA es el estándar legal en muchos países (Europa, USA Section 508). AAA es para sitios con alta accesibilidad (gobierno, salud). Texto grande = 18pt+ o 14pt+ bold.
      </div>
    </div>
  );
}
