"use client";
import { useState } from "react";
import { Download } from "lucide-react";

export function ImageConvert() {
  const [src, setSrc] = useState<string | null>(null);
  const [origMime, setOrigMime] = useState("");
  const [target, setTarget] = useState<"image/jpeg" | "image/png" | "image/webp">("image/webp");
  const [quality, setQuality] = useState(0.9);
  const [out, setOut] = useState<string | null>(null);
  const [name, setName] = useState("imagen");

  function load(file: File) {
    setSrc(URL.createObjectURL(file));
    setOrigMime(file.type);
    setName(file.name.replace(/\.[^.]+$/, "") || "imagen");
    setOut(null);
  }

  async function process() {
    if (!src) return;
    const img = new Image();
    img.src = src;
    await new Promise((r) => (img.onload = r));
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0);
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, target, quality));
    if (!blob) return;
    setOut(URL.createObjectURL(blob));
  }

  function download() {
    if (!out) return;
    const a = document.createElement("a");
    a.href = out;
    const ext = target === "image/jpeg" ? "jpg" : target.split("/")[1];
    a.download = `${name}.${ext}`;
    a.click();
  }

  return (
    <div className="space-y-4">
      <div className="card !p-3 text-xs">🔒 Conversión local. Convertí JPG ↔ PNG ↔ WebP sin uploads.</div>
      <input type="file" accept="image/*" className="input" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])} />
      {src && (
        <>
          <div className="text-xs text-[color:var(--color-fg-soft)]">Original: {origMime}</div>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm">
              Convertir a
              <select className="input mt-1" value={target} onChange={(e) => setTarget(e.target.value as typeof target)}>
                <option value="image/webp">WebP (recomendado)</option>
                <option value="image/jpeg">JPG</option>
                <option value="image/png">PNG (sin pérdida)</option>
              </select>
            </label>
            <label className="block text-sm">
              Calidad ({Math.round(quality * 100)}%)
              <input type="range" min="0.3" max="1" step="0.05" className="w-full mt-3" value={quality} onChange={(e) => setQuality(+e.target.value)} disabled={target === "image/png"} />
            </label>
          </div>
          <button onClick={process} className="btn btn-primary w-full">Convertir</button>
        </>
      )}
      {out && (
        <div className="space-y-2">
          <img src={out} alt="resultado" className="max-w-full rounded border border-[color:var(--color-border)]" />
          <button onClick={download} className="btn btn-primary w-full"><Download className="w-4 h-4" /> Descargar {target.split("/")[1].toUpperCase()}</button>
        </div>
      )}
    </div>
  );
}
