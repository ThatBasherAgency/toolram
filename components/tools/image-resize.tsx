"use client";
import { useState } from "react";
import { Download } from "lucide-react";

export function ImageResize() {
  const [src, setSrc] = useState<string | null>(null);
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [w, setW] = useState(800);
  const [h, setH] = useState(600);
  const [keepAspect, setKeepAspect] = useState(true);
  const [format, setFormat] = useState<"image/jpeg" | "image/png" | "image/webp">("image/jpeg");
  const [quality, setQuality] = useState(0.9);
  const [out, setOut] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const [origSize, setOrigSize] = useState(0);

  function load(file: File) {
    setOrigSize(file.size);
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setSrc(url);
      setOrigW(img.width);
      setOrigH(img.height);
      setW(img.width);
      setH(img.height);
    };
    img.src = url;
  }

  function changeW(v: number) {
    setW(v);
    if (keepAspect && origW) setH(Math.round((v / origW) * origH));
  }
  function changeH(v: number) {
    setH(v);
    if (keepAspect && origH) setW(Math.round((v / origH) * origW));
  }

  async function process() {
    if (!src) return;
    const img = new Image();
    img.src = src;
    await new Promise((r) => (img.onload = r));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, w, h);
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, format, quality));
    if (!blob) return;
    setOut(URL.createObjectURL(blob));
    setOutSize(blob.size);
  }

  function download() {
    if (!out) return;
    const a = document.createElement("a");
    a.href = out;
    const ext = format.split("/")[1];
    a.download = `redimensionada.${ext === "jpeg" ? "jpg" : ext}`;
    a.click();
  }

  return (
    <div className="space-y-4">
      <div className="card !p-3 text-xs">🔒 Tu imagen nunca sale de tu navegador. Procesamiento 100% local con Canvas.</div>
      <input type="file" accept="image/*" className="input" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])} />
      {src && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm">
              Ancho (px)
              <input type="number" className="input mt-1" value={w} onChange={(e) => changeW(+e.target.value || 0)} />
            </label>
            <label className="block text-sm">
              Alto (px)
              <input type="number" className="input mt-1" value={h} onChange={(e) => changeH(+e.target.value || 0)} />
            </label>
          </div>
          <label className="flex gap-2 items-center text-sm">
            <input type="checkbox" checked={keepAspect} onChange={(e) => setKeepAspect(e.target.checked)} />
            Mantener proporción ({origW}×{origH} original)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm">
              Formato
              <select className="input mt-1" value={format} onChange={(e) => setFormat(e.target.value as typeof format)}>
                <option value="image/jpeg">JPG</option>
                <option value="image/png">PNG</option>
                <option value="image/webp">WebP</option>
              </select>
            </label>
            <label className="block text-sm">
              Calidad ({Math.round(quality * 100)}%)
              <input type="range" min="0.3" max="1" step="0.05" className="w-full mt-3" value={quality} onChange={(e) => setQuality(+e.target.value)} />
            </label>
          </div>
          <button onClick={process} className="btn btn-primary w-full">Redimensionar</button>
        </>
      )}
      {out && (
        <div className="space-y-2">
          <img src={out} alt="resultado" className="max-w-full rounded border border-[color:var(--color-border)]" />
          <div className="flex flex-wrap gap-3 text-xs text-[color:var(--color-fg-soft)]">
            <span>Original: {(origSize / 1024).toFixed(1)} KB</span>
            <span>Resultado: {(outSize / 1024).toFixed(1)} KB</span>
            <span>Reducción: {origSize ? Math.max(0, 100 - Math.round((outSize / origSize) * 100)) : 0}%</span>
          </div>
          <button onClick={download} className="btn btn-primary w-full"><Download className="w-4 h-4" /> Descargar</button>
        </div>
      )}
    </div>
  );
}
