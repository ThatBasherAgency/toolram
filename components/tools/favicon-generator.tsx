"use client";
import { useEffect, useRef, useState } from "react";
import { Download, Type, ImageIcon } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 100)";

const SHAPES = ["rounded", "circle", "square", "squircle"] as const;
type Shape = typeof SHAPES[number];

const FONTS = [
  { name: "Bold", v: "900 system-ui, -apple-system, sans-serif" },
  { name: "Sans", v: "700 system-ui, -apple-system, sans-serif" },
  { name: "Serif", v: "700 Georgia, serif" },
  { name: "Mono", v: "700 'SF Mono', Menlo, monospace" }
];

export function FaviconGenerator() {
  const [text, setText] = useState("T");
  const [bg, setBg] = useState("#3b82f6");
  const [fg, setFg] = useState("#ffffff");
  const [shape, setShape] = useState<Shape>("rounded");
  const [font, setFont] = useState(FONTS[0].v);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const size = 512;
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, size, size);

    ctx.fillStyle = bg;
    if (shape === "circle") {
      ctx.beginPath(); ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI); ctx.fill();
    } else if (shape === "rounded") {
      const r = size * 0.22;
      ctx.beginPath();
      ctx.roundRect(0, 0, size, size, r);
      ctx.fill();
    } else if (shape === "squircle") {
      const r = size * 0.35;
      ctx.beginPath();
      ctx.roundRect(0, 0, size, size, r);
      ctx.fill();
    } else {
      ctx.fillRect(0, 0, size, size);
    }

    if (imageSrc) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const inset = size * 0.15;
        ctx.drawImage(img, inset, inset, size - inset * 2, size - inset * 2);
      };
      img.src = imageSrc;
    } else {
      ctx.fillStyle = fg;
      ctx.font = font.replace(/\b\d+\b/, (Math.floor(size * 0.5)).toString());
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text.slice(0, 2).toUpperCase(), size / 2, size / 2 + size * 0.04);
    }
  }, [text, bg, fg, shape, font, imageSrc]);

  function download(size: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const out = document.createElement("canvas");
    out.width = size; out.height = size;
    out.getContext("2d")!.drawImage(canvas, 0, 0, size, size);
    const link = document.createElement("a");
    link.download = `favicon-${size}.png`;
    link.href = out.toDataURL("image/png");
    link.click();
  }

  function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(f);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador de Favicon</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Crea favicons en 16, 32, 64, 128, 256 y 512 px desde texto o imagen propia.</p>
      </div>

      <div className="grid md:grid-cols-[1fr_320px] gap-6">
        <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg-soft)] p-8 flex items-center justify-center">
          <div className="grid gap-6 text-center">
            <canvas ref={canvasRef} className="w-64 h-64 mx-auto rounded-2xl shadow-2xl" />
            <div className="flex items-end justify-center gap-3">
              {[16, 32, 64].map((s) => (
                <div key={s} className="flex flex-col items-center gap-1">
                  <canvas width={s} height={s} ref={(el) => {
                    if (el && canvasRef.current) {
                      el.getContext("2d")?.drawImage(canvasRef.current, 0, 0, s, s);
                    }
                  }} key={`${text}-${bg}-${fg}-${shape}-${font}-${imageSrc}-${s}`} />
                  <span className="text-[10px] text-[color:var(--color-fg-soft)]">{s}px</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4">
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button onClick={() => setImageSrc(null)} className="px-3 py-2 rounded-lg text-xs font-bold inline-flex items-center justify-center gap-1.5" style={!imageSrc ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>
                <Type className="w-3.5 h-3.5" /> Texto
              </button>
              <label className="px-3 py-2 rounded-lg text-xs font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer" style={imageSrc ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>
                <ImageIcon className="w-3.5 h-3.5" /> Imagen
                <input type="file" accept="image/*" onChange={uploadImage} className="hidden" />
              </label>
            </div>

            {!imageSrc && (
              <>
                <label className="block mb-3">
                  <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Texto (1-2 letras)</span>
                  <input type="text" value={text} onChange={(e) => setText(e.target.value.slice(0, 2))} maxLength={2} className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-2xl font-bold text-center uppercase" />
                </label>
                <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] mb-1">Fuente</div>
                <div className="grid grid-cols-2 gap-1 mb-3">
                  {FONTS.map((f) => (
                    <button key={f.name} onClick={() => setFont(f.v)} className="px-2 py-1.5 rounded-md text-xs font-bold transition" style={font === f.v ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>{f.name}</button>
                  ))}
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-2 mb-3">
              <label className="block">
                <span className="text-xs text-[color:var(--color-fg-soft)]">Fondo</span>
                <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-full h-9 rounded mt-1 cursor-pointer" />
              </label>
              <label className="block">
                <span className="text-xs text-[color:var(--color-fg-soft)]">Texto</span>
                <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="w-full h-9 rounded mt-1 cursor-pointer" />
              </label>
            </div>

            <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] mb-1">Forma</div>
            <div className="grid grid-cols-2 gap-1">
              {SHAPES.map((s) => (
                <button key={s} onClick={() => setShape(s)} className="px-2 py-1.5 rounded-md text-xs font-bold capitalize transition" style={shape === s ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>{s}</button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4">
            <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] mb-2">Descargar PNG</div>
            <div className="grid grid-cols-3 gap-1.5">
              {[16, 32, 64, 128, 256, 512].map((s) => (
                <button key={s} onClick={() => download(s)} className="px-2 py-1.5 rounded-md bg-[color:var(--color-bg-soft)] hover:bg-[color:var(--color-fg)]/10 text-xs font-bold inline-flex items-center justify-center gap-1">
                  <Download className="w-3 h-3" /> {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AdSlot slot="favicon_inline" format="auto" minHeight={180} className="mt-6" />

      <div className="mt-6 rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">📦 Cómo usar tu favicon</strong>
        <ol className="space-y-1 list-decimal list-inside">
          <li>Descarga el PNG de 32x32 (favicon principal) y 192x192 (Android).</li>
          <li>Súbelos a la raíz de tu sitio.</li>
          <li>En el <code className="bg-[color:var(--color-bg)] px-1 rounded">{"<head>"}</code> añade: <code className="bg-[color:var(--color-bg)] px-1 rounded text-[10px]">{`<link rel="icon" href="/favicon-32.png" sizes="32x32">`}</code></li>
        </ol>
      </div>
    </div>
  );
}
