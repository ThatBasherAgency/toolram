"use client";
import { useState } from "react";
import { Download } from "lucide-react";

export function PdfToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scale, setScale] = useState(2);

  async function process(f: File) {
    setFile(f);
    setProcessing(true);
    setProgress(0);
    setPages([]);
    const pdfjs = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

    const buf = await f.arrayBuffer();
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
      out.push(canvas.toDataURL("image/jpeg", 0.9));
      setProgress(Math.round((i / doc.numPages) * 100));
    }
    setPages(out);
    setProcessing(false);
  }

  function downloadOne(src: string, i: number) {
    const a = document.createElement("a");
    a.href = src;
    a.download = `${file?.name.replace(/\.pdf$/i, "") || "pdf"}-pagina-${i + 1}.jpg`;
    a.click();
  }

  function downloadAll() {
    pages.forEach((src, i) => setTimeout(() => downloadOne(src, i), i * 200));
  }

  return (
    <div className="space-y-4">
      <div className="card !p-3 text-xs">🔒 Conversión 100% local con pdf.js. Cada página del PDF se renderiza como JPG en alta resolución.</div>
      <label className="block text-sm">Calidad / resolución
        <select className="input mt-1" value={scale} onChange={(e) => setScale(+e.target.value)}>
          <option value={1}>Estándar (72 DPI)</option>
          <option value={2}>Alta (144 DPI) — recomendado</option>
          <option value={3}>Ultra (216 DPI)</option>
          <option value={4}>Print-ready (288 DPI) — más lento</option>
        </select>
      </label>
      <input type="file" accept="application/pdf" className="input" onChange={(e) => e.target.files?.[0] && process(e.target.files[0])} disabled={processing} />
      {processing && (
        <div className="card !p-3">
          <div className="text-xs mb-2">Procesando… {progress}%</div>
          <div className="h-2 bg-[color:var(--color-border)] rounded overflow-hidden">
            <div className="h-full bg-[color:var(--color-brand)] transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}
      {pages.length > 0 && (
        <>
          <button onClick={downloadAll} className="btn btn-primary w-full"><Download className="w-4 h-4" /> Descargar las {pages.length} imágenes</button>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {pages.map((src, i) => (
              <div key={i} className="card !p-2">
                <img src={src} alt={`Página ${i + 1}`} className="w-full rounded mb-2" />
                <div className="flex items-center justify-between text-xs">
                  <span>Página {i + 1}</span>
                  <button onClick={() => downloadOne(src, i)} className="btn btn-ghost h-6 !px-2"><Download className="w-3 h-3" /></button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
