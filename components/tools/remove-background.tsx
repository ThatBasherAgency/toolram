"use client";
import { useState } from "react";
import { Download } from "lucide-react";

export function RemoveBackground() {
  const [src, setSrc] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");

  async function process(file: File) {
    setSrc(URL.createObjectURL(file));
    setOut(null);
    setError("");
    setProcessing(true);
    setProgress("Cargando modelo (~13 MB la primera vez, luego cacheado)…");
    try {
      const { removeBackground } = await import("@imgly/background-removal");
      setProgress("Procesando imagen…");
      const blob = await removeBackground(file, {
        progress: (key: string, current: number, total: number) => {
          setProgress(`${key}: ${current}/${total}`);
        }
      });
      setOut(URL.createObjectURL(blob));
      setProgress("");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setProcessing(false);
    }
  }

  function download() {
    if (!out) return;
    const a = document.createElement("a");
    a.href = out;
    a.download = "sin-fondo.png";
    a.click();
  }

  return (
    <div className="space-y-4">
      <div className="card !p-3 text-xs space-y-1">
        <div>🔒 <strong>100% local.</strong> El modelo de IA corre en tu navegador (~13 MB la primera vez, después cacheado). Tu imagen jamás se sube a un servidor.</div>
        <div>⚡ Mejor en imágenes nítidas con sujeto claro (personas, productos, objetos sobre fondo contrastante).</div>
      </div>
      <input type="file" accept="image/*" className="input" onChange={(e) => e.target.files?.[0] && process(e.target.files[0])} disabled={processing} />
      {processing && <div className="card !p-3 text-sm">⏳ {progress}</div>}
      {error && <div className="card !p-3 text-sm text-[color:var(--color-danger)]">⚠️ {error}</div>}
      {(src || out) && (
        <div className="grid md:grid-cols-2 gap-3">
          {src && (
            <div className="card !p-3">
              <div className="text-xs uppercase text-[color:var(--color-fg-soft)] mb-2">Original</div>
              <img src={src} alt="original" className="w-full rounded" />
            </div>
          )}
          {out && (
            <div className="card !p-3" style={{ background: "repeating-conic-gradient(#e5e7eb 0% 25%, #f9fafb 0% 50%) 50% / 20px 20px" }}>
              <div className="text-xs uppercase text-[color:var(--color-fg-soft)] mb-2">Sin fondo (PNG transparente)</div>
              <img src={out} alt="sin fondo" className="w-full rounded" />
            </div>
          )}
        </div>
      )}
      {out && <button onClick={download} className="btn btn-primary w-full"><Download className="w-4 h-4" /> Descargar PNG transparente</button>}
    </div>
  );
}
