"use client";
import { useState } from "react";
import { Download } from "lucide-react";

export function ImageWatermark() {
  const [src, setSrc] = useState<string | null>(null);
  const [text, setText] = useState("© Toolram");
  const [size, setSize] = useState(48);
  const [opacity, setOpacity] = useState(0.5);
  const [color, setColor] = useState("#ffffff");
  const [position, setPosition] = useState<"tile" | "br" | "bl" | "tl" | "tr" | "center">("br");
  const [angle, setAngle] = useState(0);
  const [out, setOut] = useState<string | null>(null);

  function load(file: File) {
    setSrc(URL.createObjectURL(file));
    setOut(null);
  }

  async function apply() {
    if (!src) return;
    const img = new Image();
    img.src = src;
    await new Promise((r) => (img.onload = r));
    const canvas = document.createElement("canvas");
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
      for (let y = -span; y < span; y += stepY) {
        for (let x = -span; x < span; x += stepX) {
          ctx.fillText(text, x, y);
        }
      }
      ctx.restore();
    } else {
      let x = margin, y = margin + size / 2;
      if (position === "tr") { x = canvas.width - tw - margin; y = margin + size / 2; }
      else if (position === "bl") { x = margin; y = canvas.height - margin - size / 2; }
      else if (position === "br") { x = canvas.width - tw - margin; y = canvas.height - margin - size / 2; }
      else if (position === "center") { x = (canvas.width - tw) / 2; y = canvas.height / 2; }
      ctx.save();
      ctx.translate(x + tw / 2, y);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.fillText(text, -tw / 2, 0);
      ctx.restore();
    }

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

  return (
    <div className="space-y-4">
      <div className="card !p-3 text-xs">🔒 Marca de agua client-side. Posiciones fijas o patrón en mosaico (tile) anti-screenshot.</div>
      <input type="file" accept="image/*" className="input" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])} />
      {src && (
        <>
          <div className="grid md:grid-cols-2 gap-3">
            <label className="block text-sm md:col-span-2">Texto<input className="input mt-1" value={text} onChange={(e) => setText(e.target.value)} /></label>
            <label className="block text-sm">Tamaño ({size}px)<input type="range" min={12} max={200} className="w-full mt-3" value={size} onChange={(e) => setSize(+e.target.value)} /></label>
            <label className="block text-sm">Opacidad ({Math.round(opacity * 100)}%)<input type="range" min={0.1} max={1} step={0.05} className="w-full mt-3" value={opacity} onChange={(e) => setOpacity(+e.target.value)} /></label>
            <label className="block text-sm">Color<input type="color" className="w-full h-10 mt-1 rounded" value={color} onChange={(e) => setColor(e.target.value)} /></label>
            <label className="block text-sm">Rotación ({angle}°)<input type="range" min={-90} max={90} className="w-full mt-3" value={angle} onChange={(e) => setAngle(+e.target.value)} /></label>
            <label className="block text-sm md:col-span-2">Posición
              <select className="input mt-1" value={position} onChange={(e) => setPosition(e.target.value as typeof position)}>
                <option value="tile">Mosaico (tile, anti-screenshot)</option>
                <option value="center">Centrada</option>
                <option value="tl">Esquina superior izquierda</option>
                <option value="tr">Esquina superior derecha</option>
                <option value="bl">Esquina inferior izquierda</option>
                <option value="br">Esquina inferior derecha</option>
              </select>
            </label>
          </div>
          <button onClick={apply} className="btn btn-primary w-full">💧 Aplicar marca de agua</button>
        </>
      )}
      {out && (
        <div className="space-y-2">
          <img src={out} alt="resultado" className="max-w-full rounded border border-[color:var(--color-border)]" />
          <button onClick={download} className="btn btn-primary w-full"><Download className="w-4 h-4" /> Descargar</button>
        </div>
      )}
    </div>
  );
}
