"use client";
import { useEffect, useRef, useState } from "react";
import { Download, Upload, Sparkles } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 320)";

const PRESETS = {
  Original: { gray: 0, sepia: 0, blur: 0, brightness: 100, contrast: 100, saturate: 100, hue: 0, invert: 0 },
  "B&N": { gray: 100, sepia: 0, blur: 0, brightness: 100, contrast: 110, saturate: 100, hue: 0, invert: 0 },
  Sepia: { gray: 0, sepia: 100, blur: 0, brightness: 100, contrast: 95, saturate: 100, hue: 0, invert: 0 },
  Vintage: { gray: 0, sepia: 60, blur: 0, brightness: 95, contrast: 110, saturate: 80, hue: -10, invert: 0 },
  Polaroid: { gray: 0, sepia: 30, blur: 0, brightness: 110, contrast: 95, saturate: 130, hue: 0, invert: 0 },
  Frío: { gray: 0, sepia: 0, blur: 0, brightness: 100, contrast: 100, saturate: 90, hue: 180, invert: 0 },
  Cálido: { gray: 0, sepia: 30, blur: 0, brightness: 105, contrast: 100, saturate: 120, hue: 15, invert: 0 },
  Drama: { gray: 0, sepia: 0, blur: 0, brightness: 90, contrast: 150, saturate: 130, hue: 0, invert: 0 },
  Dreamy: { gray: 0, sepia: 0, blur: 2, brightness: 110, contrast: 90, saturate: 110, hue: 0, invert: 0 },
  Negativo: { gray: 0, sepia: 0, blur: 0, brightness: 100, contrast: 100, saturate: 100, hue: 0, invert: 100 }
};

type Filter = typeof PRESETS.Original;

export function ImageFilters() {
  const [src, setSrc] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>(PRESETS.Original);
  const [name, setName] = useState("imagen");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const cssFilter = `grayscale(${filter.gray}%) sepia(${filter.sepia}%) blur(${filter.blur}px) brightness(${filter.brightness}%) contrast(${filter.contrast}%) saturate(${filter.saturate}%) hue-rotate(${filter.hue}deg) invert(${filter.invert}%)`;

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.filter = cssFilter;
      ctx.drawImage(img, 0, 0);
    };
    img.src = src;
  }, [src, cssFilter]);

  function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setName(f.name.replace(/\.[^.]+$/, ""));
    const r = new FileReader();
    r.onload = () => setSrc(r.result as string);
    r.readAsDataURL(f);
  }
  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${name}-filtered.jpg`;
    link.href = canvas.toDataURL("image/jpeg", 0.92);
    link.click();
  }

  function update(k: keyof Filter, v: number) {
    setFilter({ ...filter, [k]: v });
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Filtros de Imagen Online</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">10 presets (B&N, sepia, vintage, polaroid, drama...) + ajustes manuales · Procesado en tu navegador.</p>
      </div>

      {!src ? (
        <label className="block rounded-3xl border-2 border-dashed border-[color:var(--color-border)] bg-[color:var(--color-bg-soft)] p-12 text-center cursor-pointer hover:border-[color:var(--color-brand)] mb-6">
          <Upload className="w-12 h-12 mx-auto mb-3 text-[color:var(--color-fg-soft)]" />
          <div className="text-lg font-bold mb-1">Subir foto</div>
          <div className="text-sm text-[color:var(--color-fg-soft)]">JPG, PNG, WebP</div>
          <input type="file" accept="image/*" onChange={upload} className="hidden" />
        </label>
      ) : (
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg-soft)] p-6 text-center">
            <canvas ref={canvasRef} className="max-w-full max-h-[60vh] mx-auto rounded-xl shadow-lg" />
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4">
              <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] mb-2">Presets</div>
              <div className="grid grid-cols-2 gap-1">
                {(Object.keys(PRESETS) as (keyof typeof PRESETS)[]).map((k) => (
                  <button key={k} onClick={() => setFilter(PRESETS[k])} className="px-2 py-1.5 rounded-md text-xs font-bold transition" style={JSON.stringify(filter) === JSON.stringify(PRESETS[k]) ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>{k}</button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4 space-y-2 text-xs">
              {([
                ["brightness", "Brillo", 0, 200, "%"],
                ["contrast", "Contraste", 0, 200, "%"],
                ["saturate", "Saturación", 0, 200, "%"],
                ["gray", "Gris", 0, 100, "%"],
                ["sepia", "Sepia", 0, 100, "%"],
                ["blur", "Blur", 0, 20, "px"],
                ["hue", "Tono", -180, 180, "°"],
                ["invert", "Invertir", 0, 100, "%"]
              ] as const).map(([k, label, min, max, unit]) => (
                <label key={k} className="block">
                  <span className="text-[color:var(--color-fg-soft)]">{label}: <strong className="text-[color:var(--color-fg)]">{filter[k as keyof Filter]}{unit}</strong></span>
                  <input type="range" min={min} max={max} value={filter[k as keyof Filter]} onChange={(e) => update(k as keyof Filter, +e.target.value)} className="w-full" />
                </label>
              ))}
            </div>

            <button onClick={download} className="w-full px-4 py-3 rounded-xl text-white font-bold inline-flex items-center justify-center gap-2" style={{ background: ACCENT }}>
              <Download className="w-4 h-4" /> Descargar
            </button>
            <button onClick={() => { setSrc(null); setFilter(PRESETS.Original); }} className="w-full px-4 py-2 rounded-xl bg-[color:var(--color-bg-soft)] font-bold text-sm">Subir otra foto</button>
          </div>
        </div>
      )}

      <AdSlot slot="filters_inline" format="auto" minHeight={180} className="mt-6" />
    </div>
  );
}
