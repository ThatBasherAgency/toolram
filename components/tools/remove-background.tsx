"use client";
import { useState } from "react";
import { Download, Sparkles } from "lucide-react";
import { DropZone, PrimaryAction, ProcessingBar, StepBar, SuccessPanel } from "./ui/drop-zone";

const ACCENT = "oklch(0.6 0.22 320)";

export function RemoveBackground() {
  const [src, setSrc] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState("");
  const [percent, setPercent] = useState<number | undefined>(undefined);
  const [error, setError] = useState("");

  function load(f: File) {
    setFile(f);
    setSrc(URL.createObjectURL(f));
    setOut(null);
    setError("");
  }
  function reset() { setFile(null); setSrc(null); setOut(null); setError(""); }

  async function process() {
    if (!file) return;
    setProcessing(true);
    setError("");
    setProgress("Descargando modelo de IA (~13 MB la primera vez, después cacheado)…");
    setPercent(0);
    try {
      const { removeBackground } = await import("@imgly/background-removal");
      const blob = await removeBackground(file, {
        progress: (key: string, current: number, total: number) => {
          const p = total > 0 ? Math.round((current / total) * 100) : undefined;
          setPercent(p);
          if (key.includes("download")) setProgress(`Cargando modelo… ${p ?? ""}%`);
          else if (key.includes("compute")) setProgress(`Procesando con IA…${p != null ? ` ${p}%` : ""}`);
          else setProgress(key);
        }
      });
      setOut(URL.createObjectURL(blob));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setProcessing(false);
      setProgress("");
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
    <div className="space-y-6">
      <StepBar step={out ? 3 : file ? 2 : 1} />

      {!file ? (
        <DropZone accept="image/*" onFile={load} icon="image" accentColor={ACCENT} buttonLabel="Seleccionar imagen" helpText="🤖 IA U²-Net en tu navegador · privado · sin API" />
      ) : (
        <>
          <DropZone accept="image/*" onFile={load} loaded={{ name: file.name, size: file.size, thumbnail: src ?? undefined }} onClear={reset} icon="image" accentColor={ACCENT} />

          {!out && !processing && (
            <PrimaryAction onClick={process} color={ACCENT}>
              <Sparkles className="w-5 h-5" /> Quitar fondo con IA
            </PrimaryAction>
          )}

          {processing && <ProcessingBar label={progress || "Procesando…"} percent={percent} />}
          {error && <div className="card !p-4 text-sm text-[color:var(--color-danger)] bg-[color:var(--color-danger)]/5 border-[color:var(--color-danger)]">⚠️ {error}</div>}

          {(src || out) && (
            <div className="grid md:grid-cols-2 gap-4">
              {src && (
                <div className="card !p-3">
                  <div className="text-xs uppercase font-semibold text-[color:var(--color-fg-soft)] mb-2">Original</div>
                  <img src={src} alt="original" className="w-full rounded-lg" />
                </div>
              )}
              {out && (
                <div className="card !p-3">
                  <div className="text-xs uppercase font-semibold text-[color:var(--color-fg-soft)] mb-2 flex items-center gap-2">
                    Sin fondo <span className="text-[color:var(--color-success)]">✓</span>
                  </div>
                  <div className="rounded-lg p-2" style={{ background: "repeating-conic-gradient(#e5e7eb 0% 25%, #f9fafb 0% 50%) 50% / 20px 20px" }}>
                    <img src={out} alt="sin fondo" className="w-full rounded" />
                  </div>
                </div>
              )}
            </div>
          )}

          {out && (
            <button onClick={download} className="w-full py-4 rounded-2xl font-bold text-white text-lg shadow-xl flex items-center justify-center gap-2" style={{ background: ACCENT }}>
              <Download className="w-5 h-5" /> Descargar PNG transparente
            </button>
          )}
        </>
      )}
    </div>
  );
}
