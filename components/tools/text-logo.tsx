"use client";
import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 200)";

const FONTS = [
  { name: "Bold Sans", v: "900 system-ui, sans-serif" },
  { name: "Serif", v: "900 Georgia, serif" },
  { name: "Mono", v: "700 'SF Mono', Menlo, monospace" },
  { name: "Italic", v: "italic 700 Georgia, serif" },
  { name: "Light", v: "300 system-ui, sans-serif" },
  { name: "Black", v: "900 'Helvetica Neue', sans-serif" }
];

const STYLES = ["Solid", "Gradient", "Outline", "Shadow", "Neon", "Retro"] as const;
type Style = typeof STYLES[number];

export function TextLogo() {
  const [text, setText] = useState("Toolram");
  const [font, setFont] = useState(FONTS[0].v);
  const [style, setStyle] = useState<Style>("Gradient");
  const [color1, setColor1] = useState("#0093E9");
  const [color2, setColor2] = useState("#80D0C7");
  const [size, setSize] = useState(120);
  const [bg, setBg] = useState("#ffffff");
  const [transparent, setTransparent] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = 1200;
    canvas.height = 400;
    if (!transparent) { ctx.fillStyle = bg; ctx.fillRect(0, 0, canvas.width, canvas.height); }
    else { ctx.clearRect(0, 0, canvas.width, canvas.height); }

    ctx.font = font.replace(/\b\d+\b/, String(size * 2));
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    if (style === "Gradient") {
      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, color1);
      grad.addColorStop(1, color2);
      ctx.fillStyle = grad;
      ctx.fillText(text, cx, cy);
    } else if (style === "Outline") {
      ctx.lineWidth = 6;
      ctx.strokeStyle = color1;
      ctx.strokeText(text, cx, cy);
    } else if (style === "Shadow") {
      ctx.shadowColor = color2;
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 8;
      ctx.shadowOffsetY = 8;
      ctx.fillStyle = color1;
      ctx.fillText(text, cx, cy);
    } else if (style === "Neon") {
      ctx.shadowColor = color1;
      ctx.shadowBlur = 30;
      ctx.fillStyle = color1;
      ctx.fillText(text, cx, cy);
      ctx.shadowBlur = 60;
      ctx.fillText(text, cx, cy);
      ctx.shadowBlur = 0;
      ctx.fillStyle = "white";
      ctx.fillText(text, cx, cy);
    } else if (style === "Retro") {
      ctx.fillStyle = color2;
      ctx.fillText(text, cx + 4, cy + 4);
      ctx.fillStyle = color1;
      ctx.fillText(text, cx, cy);
    } else {
      ctx.fillStyle = color1;
      ctx.fillText(text, cx, cy);
    }
  }, [text, font, style, color1, color2, size, bg, transparent]);

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${text.replace(/\s/g, "_")}-logo.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador de Logo de Texto</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Crea logos tipográficos en segundos · 6 estilos (gradient, neon, retro, outline, sombra) · Descarga PNG transparente.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg-soft)] p-6 flex items-center justify-center min-h-[300px]">
          <canvas ref={canvasRef} className={`max-w-full max-h-[400px] rounded-xl ${transparent ? "bg-checker" : ""}`} />
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4 space-y-3">
            <label className="block">
              <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Texto</span>
              <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-base font-bold" />
            </label>

            <div>
              <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] block mb-1">Estilo</span>
              <div className="grid grid-cols-3 gap-1">
                {STYLES.map((s) => (
                  <button key={s} onClick={() => setStyle(s)} className="px-2 py-1.5 rounded-md text-xs font-bold transition" style={style === s ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>{s}</button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] block mb-1">Fuente</span>
              <select value={font} onChange={(e) => setFont(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[color:var(--color-bg-soft)] text-sm font-bold">
                {FONTS.map((f) => <option key={f.name} value={f.v}>{f.name}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <label className="block">
                <span className="text-xs text-[color:var(--color-fg-soft)]">Color 1</span>
                <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-full h-9 rounded mt-1 cursor-pointer" />
              </label>
              <label className="block">
                <span className="text-xs text-[color:var(--color-fg-soft)]">Color 2</span>
                <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-full h-9 rounded mt-1 cursor-pointer" />
              </label>
            </div>

            <label className="block">
              <span className="text-xs text-[color:var(--color-fg-soft)]">Tamaño: {size}px</span>
              <input type="range" min="40" max="200" value={size} onChange={(e) => setSize(+e.target.value)} className="w-full" />
            </label>

            <div className="flex gap-2">
              <label className="block flex-1">
                <span className="text-xs text-[color:var(--color-fg-soft)]">Fondo</span>
                <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} disabled={transparent} className="w-full h-9 rounded mt-1 cursor-pointer disabled:opacity-40" />
              </label>
              <label className="inline-flex items-end gap-1 cursor-pointer pb-2 text-xs">
                <input type="checkbox" checked={transparent} onChange={(e) => setTransparent(e.target.checked)} /> transparente
              </label>
            </div>
          </div>

          <button onClick={download} className="w-full px-4 py-3 rounded-xl text-white font-bold inline-flex items-center justify-center gap-2" style={{ background: ACCENT }}>
            <Download className="w-4 h-4" /> Descargar PNG
          </button>
        </div>
      </div>

      <AdSlot slot="logo_inline" format="auto" minHeight={180} className="mt-6" />
    </div>
  );
}
