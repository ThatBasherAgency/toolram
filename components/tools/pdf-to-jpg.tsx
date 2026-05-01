"use client";
import { useState } from "react";
import { Download, ImageIcon } from "lucide-react";
import { DropZone, PrimaryAction, ProcessingBar, StepBar, SuccessPanel } from "./ui/drop-zone";

const ACCENT = "oklch(0.65 0.2 50)";

export function PdfToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scale, setScale] = useState(2);
  const [done, setDone] = useState(false);

  async function load(f: File) {
    setFile(f);
    setPages([]);
    setDone(false);
  }
  function reset() { setFile(null); setPages([]); setDone(false); setProgress(0); }

  async function process() {
    if (!file) return;
    setProcessing(true);
    setProgress(0);
    setPages([]);
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      const buf = await file.arrayBuffer();
      const doc = await pdfjs.getDocument({ data: buf }).promise;
      const out: string[] = [];
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({ canvasContext: ctx, viewport, canvas } as Parameters<typeof page.render>[0]).promise;
        out.push(canvas.toDataURL("image/jpeg", 0.92));
        setProgress(Math.round((i / doc.numPages) * 100));
      }
      setPages(out);
      setDone(true);
    } finally { setProcessing(false); }
  }

  function downloadOne(src: string, i: number) {
    const a = document.createElement("a");
    a.href = src;
    a.download = `${file?.name.replace(/\.pdf$/i, "") || "pdf"}-pagina-${i + 1}.jpg`;
    a.click();
  }
  function downloadAll() { pages.forEach((src, i) => setTimeout(() => downloadOne(src, i), i * 200)); }

  return (
    <div className="space-y-6">
      <StepBar step={done ? 3 : file ? 2 : 1} />

      {!file ? (
        <DropZone accept="application/pdf" onFile={load} icon="pdf" accentColor={ACCENT} buttonLabel="Seleccionar PDF" helpText="🔒 Conversión 100% local con pdf.js" />
      ) : (
        <>
          <DropZone accept="application/pdf" onFile={load} loaded={{ name: file.name, size: file.size }} onClear={reset} icon="pdf" accentColor={ACCENT} />

          {!done && (
            <>
              <div className="card !p-4">
                <div className="text-sm font-semibold mb-3 flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Calidad de imagen</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { v: 1, l: "72 DPI", n: "Web rápido" },
                    { v: 2, l: "144 DPI", n: "Recomendado" },
                    { v: 3, l: "216 DPI", n: "Alta resolución" },
                    { v: 4, l: "288 DPI", n: "Print-ready" }
                  ].map((o) => (
                    <button key={o.v} onClick={() => setScale(o.v)} className={`rounded-xl border-2 p-3 text-center transition ${scale === o.v ? "shadow-md" : "hover:bg-[color:var(--color-bg-soft)]"}`} style={{ borderColor: scale === o.v ? ACCENT : "var(--color-border)", background: scale === o.v ? `${ACCENT}10` : "" }}>
                      <div className="font-bold text-sm">{o.l}</div>
                      <div className="text-xs text-[color:var(--color-fg-soft)]">{o.n}</div>
                    </button>
                  ))}
                </div>
              </div>

              {processing && <ProcessingBar label={`Renderizando páginas… ${progress}%`} percent={progress} />}

              <PrimaryAction onClick={process} disabled={processing} color={ACCENT}>
                <ImageIcon className="w-5 h-5" /> Convertir a JPG
              </PrimaryAction>
            </>
          )}

          {done && (
            <>
              <SuccessPanel>
                <p className="text-sm text-[color:var(--color-fg-soft)]">{pages.length} página{pages.length === 1 ? "" : "s"} convertida{pages.length === 1 ? "" : "s"} a JPG.</p>
                <button onClick={downloadAll} className="w-full py-4 rounded-2xl font-bold text-white text-lg shadow-xl flex items-center justify-center gap-2" style={{ background: ACCENT }}>
                  <Download className="w-5 h-5" /> Descargar todas ({pages.length})
                </button>
                <button onClick={reset} className="text-sm text-[color:var(--color-fg-soft)] hover:underline">Procesar otro PDF</button>
              </SuccessPanel>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {pages.map((src, i) => (
                  <div key={i} className="rounded-xl border border-[color:var(--color-border)] overflow-hidden shadow hover:shadow-xl transition group">
                    <div className="relative">
                      <img src={src} alt={`Página ${i + 1}`} className="block w-full" />
                      <button onClick={() => downloadOne(src, i)} className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition">
                        <span className="opacity-0 group-hover:opacity-100 transition px-3 py-2 rounded-lg bg-white text-black text-sm font-semibold inline-flex items-center gap-1"><Download className="w-4 h-4" /> Descargar</span>
                      </button>
                    </div>
                    <div className="px-3 py-2 text-center text-sm font-semibold">Página {i + 1}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
