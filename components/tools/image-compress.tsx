"use client";
import { useState } from "react";
import { Download } from "lucide-react";

export function ImageCompress() {
  const [src, setSrc] = useState<string | null>(null);
  const [origSize, setOrigSize] = useState(0);
  const [origMime, setOrigMime] = useState("");
  const [quality, setQuality] = useState(0.7);
  const [out, setOut] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const [processing, setProcessing] = useState(false);

  function load(file: File) {
    setOrigSize(file.size);
    setOrigMime(file.type);
    setSrc(URL.createObjectURL(file));
    setOut(null);
  }

  async function process() {
    if (!src) return;
    setProcessing(true);
    const img = new Image();
    img.src = src;
    await new Promise((r) => (img.onload = r));
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return setProcessing(false);
    ctx.drawImage(img, 0, 0);
    const mime = origMime === "image/png" ? "image/png" : "image/jpeg";
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, mime, quality));
    setProcessing(false);
    if (!blob) return;
    setOut(URL.createObjectURL(blob));
    setOutSize(blob.size);
  }

  function download() {
    if (!out) return;
    const a = document.createElement("a");
    a.href = out;
    a.download = `comprimida.${origMime === "image/png" ? "png" : "jpg"}`;
    a.click();
  }

  return (
    <div className="space-y-4">
      <div className="card !p-3 text-xs">🔒 Compresión 100% en tu navegador. La imagen jamás se sube a un servidor.</div>
      <input type="file" accept="image/*" className="input" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])} />
      {src && (
        <>
          <label className="block text-sm">
            Calidad ({Math.round(quality * 100)}%) · más bajo = menor tamaño
            <input type="range" min="0.2" max="0.95" step="0.05" className="w-full mt-2" value={quality} onChange={(e) => setQuality(+e.target.value)} />
          </label>
          <button onClick={process} disabled={processing} className="btn btn-primary w-full">{processing ? "Comprimiendo…" : "Comprimir"}</button>
          <div className="text-xs text-[color:var(--color-fg-soft)]">Original: {(origSize / 1024).toFixed(1)} KB — {origMime}</div>
        </>
      )}
      {out && (
        <div className="space-y-2">
          <img src={out} alt="resultado" className="max-w-full rounded border border-[color:var(--color-border)]" />
          <div className="card !p-3">
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div><div className="text-lg font-bold">{(origSize / 1024).toFixed(1)} KB</div><div>Original</div></div>
              <div><div className="text-lg font-bold text-[color:var(--color-brand)]">{(outSize / 1024).toFixed(1)} KB</div><div>Comprimida</div></div>
              <div><div className="text-lg font-bold text-[color:var(--color-success)]">−{Math.max(0, 100 - Math.round((outSize / origSize) * 100))}%</div><div>Ahorrado</div></div>
            </div>
          </div>
          <button onClick={download} className="btn btn-primary w-full"><Download className="w-4 h-4" /> Descargar</button>
        </div>
      )}
    </div>
  );
}
