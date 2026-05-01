"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Download } from "lucide-react";

export function PdfCompress() {
  const [file, setFile] = useState<File | null>(null);
  const [origSize, setOrigSize] = useState(0);
  const [out, setOut] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const [processing, setProcessing] = useState(false);

  async function process(f: File) {
    setFile(f);
    setOrigSize(f.size);
    setProcessing(true);
    setOut(null);
    const src = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
    const dst = await PDFDocument.create();
    dst.setProducer("");
    dst.setCreator("");
    dst.setTitle("");
    dst.setAuthor("");
    dst.setSubject("");
    dst.setKeywords([]);
    const pages = await dst.copyPages(src, src.getPageIndices());
    pages.forEach((p) => dst.addPage(p));
    const bytes = await dst.save({ useObjectStreams: true });
    const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
    setOut(URL.createObjectURL(blob));
    setOutSize(blob.size);
    setProcessing(false);
  }

  function download() {
    if (!out) return;
    const a = document.createElement("a");
    a.href = out;
    a.download = (file?.name.replace(/\.pdf$/i, "") || "documento") + "-comprimido.pdf";
    a.click();
  }

  const pct = origSize ? Math.max(0, 100 - Math.round((outSize / origSize) * 100)) : 0;

  return (
    <div className="space-y-4">
      <div className="card !p-3 text-xs">🔒 Compresión client-side. Optimiza streams, elimina metadata y minimiza overhead. Para imágenes muy pesadas embebidas, se recomienda complementar con compresión de imágenes previa.</div>
      <input type="file" accept="application/pdf" className="input" onChange={(e) => e.target.files?.[0] && process(e.target.files[0])} disabled={processing} />
      {processing && <div className="card !p-3 text-sm text-center">⏳ Comprimiendo PDF…</div>}
      {out && (
        <div className="space-y-3">
          <div className="card !p-3">
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div><div className="text-lg font-bold">{(origSize / 1024).toFixed(1)} KB</div><div>Original</div></div>
              <div><div className="text-lg font-bold text-[color:var(--color-brand)]">{(outSize / 1024).toFixed(1)} KB</div><div>Comprimido</div></div>
              <div><div className="text-lg font-bold text-[color:var(--color-success)]">−{pct}%</div><div>Ahorrado</div></div>
            </div>
          </div>
          <button onClick={download} className="btn btn-primary w-full"><Download className="w-4 h-4" /> Descargar PDF comprimido</button>
        </div>
      )}
    </div>
  );
}
