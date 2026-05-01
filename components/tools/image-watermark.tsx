"use client";
import { useEffect, useRef, useState } from "react";
import { Download, Droplet } from "lucide-react";
import { DropZone, PrimaryAction, StepBar, SuccessPanel } from "./ui/drop-zone";

const ACCENT = "oklch(0.6 0.18 200)";

type Position = "tile" | "br" | "bl" | "tl" | "tr" | "center";

export function ImageWatermark() {
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [text, setText] = useState("© Toolram");
  const [size, setSize] = useState(48);
  const [opacity, setOpacity] = useState(0.5);
  const [color, setColor] = useState("#ffffff");
  const [position, setPosition] = useState<Position>("br");
  const [angle, setAngle] = useState(0);
  const [out, setOut] = useState<string | null>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);

  function load(f: File) {
    setFile(f);
    setSrc(URL.createObjectURL(f));
    setOut(null);
  }
  function reset() { setFile(null); setSrc(null); setOut(null); }

  useEffect(() => {
    if (!src || !previewRef.current) return;
    const canvas = previewRef.current;
    const img = new Image();
    img.onload = () => drawWatermark(canvas, img, text, size, opacity, color, position, angle);
    img.src = src;
  }, [src, text, size, opacity, color, position, angle]);

  async function apply() {
    if (!src) return;
    const img = new Image();
    img.src = src;
    await new Promise((r) => (img.onload = r));
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    drawWatermark(canvas, img, text, size, opacity, color, position, angle);
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/jpeg", 0.92));
    if (blob) setOut(URL.createObjectURL(blob));
  }

  function download() {
    if (!out) return;
    const a = document.createElement("a");
    a.href = out;
    a.download = "con-marca-agua.jpg";
    a.click();
  }

  if (out) {
    return (
      <SuccessPanel onReset={reset}>
        <img src={out} alt="resultado" className="max-w-full mx-auto rounded-lg shadow-2xl" />
        <button onClick={download} className="w-full py-4 rounded-2xl font-bold text-white text-lg shadow-xl flex items-center justify-center gap-2" style={{ background: ACCENT }}>
          <Download className="w-5 h-5" /> Descargar imagen
        </button>
      </SuccessPanel>
    );
  }

  return (
    <div className="space-y-6">
      <StepBar step={file ? 2 : 1} total={2} />
      {!file ? (
        <DropZone accept="image/*" onFile={load} illustration="image" accentColor={ACCENT} buttonLabel="Seleccionar imagen" />
      ) : (
        <>
          <DropZone accept="image/*" onFile={load} loaded={{ name: file.name, size: file.size, thumbnail: src ?? undefined }} onClear={reset} illustration="image" accentColor={ACCENT} />

          <div className="card !p-0 overflow-hidden">
            <div className="bg-[color:var(--color-bg-soft)] flex items-center justify-center p-4">
              <canvas ref={previewRef} className="max-w-full max-h-[420px] block rounded-lg shadow-md" />
            </div>
            <div className="p-4 border-t border-[color:var(--color-border)] space-y-4">
              <input className="input text-base" value={text} onChange={(e) => setText(e.target.value)} placeholder="Texto de marca de agua" />

              <div>
                <div className="text-xs font-semibold uppercase text-[color:var(--color-fg-soft)] mb-2">Posición</div>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { v: "tl" as const, l: "↖ Sup. izq" },
                    { v: "tr" as const, l: "↗ Sup. der" },
                    { v: "center" as const, l: "● Centro" },
                    { v: "bl" as const, l: "↙ Inf. izq" },
                    { v: "br" as const, l: "↘ Inf. der" },
                    { v: "tile" as const, l: "▦ Mosaico" }
                  ]).map((o) => (
                    <button key={o.v} onClick={() => setPosition(o.v)} className="rounded-lg border-2 py-2 text-xs font-medium transition" style={{ borderColor: position === o.v ? ACCENT : "var(--color-border)", background: position === o.v ? `${ACCENT}10` : "" }}>{o.l}</button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label className="text-xs">Tamaño<input type="range" min={12} max={200} className="w-full mt-1" value={size} onChange={(e) => setSize(+e.target.value)} /><span className="text-[color:var(--color-fg-soft)]">{size}px</span></label>
                <label className="text-xs">Opacidad<input type="range" min={0.1} max={1} step={0.05} className="w-full mt-1" value={opacity} onChange={(e) => setOpacity(+e.target.value)} /><span className="text-[color:var(--color-fg-soft)]">{Math.round(opacity * 100)}%</span></label>
                <label className="text-xs">Color<input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="block w-full h-8 mt-1 rounded cursor-pointer" /></label>
                <label className="text-xs">Rotación<input type="range" min={-90} max={90} className="w-full mt-1" value={angle} onChange={(e) => setAngle(+e.target.value)} /><span className="text-[color:var(--color-fg-soft)]">{angle}°</span></label>
              </div>
            </div>
          </div>

          <PrimaryAction onClick={apply} color={ACCENT}>
            <Droplet className="w-5 h-5" /> Aplicar marca de agua
          </PrimaryAction>
        </>
      )}
    </div>
  );
}

function drawWatermark(canvas: HTMLCanvasElement, img: HTMLImageElement, text: string, size: number, opacity: number, color: string, position: Position, angle: number) {
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  ctx.font = `bold ${size}px sans-serif`;
  ctx.fillStyle = color;
  ctx.globalAlpha = opacity;
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.4)";
  ctx.shadowBlur = 4;
  const tw = ctx.measureText(text).width;
  const margin = 30;
  if (position === "tile") {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((angle * Math.PI) / 180);
    const span = Math.max(canvas.width, canvas.height) * 1.5;
    const stepX = tw + 80;
    const stepY = size * 2;
    for (let y = -span; y < span; y += stepY) for (let x = -span; x < span; x += stepX) ctx.fillText(text, x, y);
    ctx.restore();
  } else {
    let x = margin, y = margin + size / 2;
    if (position === "tr") { x = canvas.width - tw - margin; }
    else if (position === "bl") { y = canvas.height - margin - size / 2; }
    else if (position === "br") { x = canvas.width - tw - margin; y = canvas.height - margin - size / 2; }
    else if (position === "center") { x = (canvas.width - tw) / 2; y = canvas.height / 2; }
    ctx.save();
    ctx.translate(x + tw / 2, y);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.fillText(text, -tw / 2, 0);
    ctx.restore();
  }
}
