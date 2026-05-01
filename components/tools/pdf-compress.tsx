"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Download, Zap } from "lucide-react";
import { DropZone, PrimaryAction, ProcessingBar, StepBar, SuccessPanel } from "./ui/drop-zone";

const ACCENT = "oklch(0.6 0.2 145)";

export function PdfCompress() {
  const [file, setFile] = useState<File | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const [processing, setProcessing] = useState(false);

  function load(f: File) { setFile(f); setOut(null); }
  function reset() { setFile(null); setOut(null); setOutSize(0); }

  async function process() {
    if (!file) return;
    setProcessing(true);
    try {
      const src = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const dst = await PDFDocument.create();
      dst.setProducer(""); dst.setCreator(""); dst.setTitle(""); dst.setAuthor(""); dst.setSubject(""); dst.setKeywords([]);
      const pages = await dst.copyPages(src, src.getPageIndices());
      pages.forEach((p) => dst.addPage(p));
      const bytes = await dst.save({ useObjectStreams: true });
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      setOut(URL.createObjectURL(blob));
      setOutSize(blob.size);
    } finally { setProcessing(false); }
  }

  function download() {
    if (!out) return;
    const a = document.createElement("a");
    a.href = out;
    a.download = (file?.name.replace(/\.pdf$/i, "") || "documento") + "-comprimido.pdf";
    a.click();
  }

  const pct = file && outSize ? Math.max(0, 100 - Math.round((outSize / file.size) * 100)) : 0;

  if (out && file) {
    return (
      <SuccessPanel onReset={reset}>
        <div className="card !p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
              <div className="text-xs uppercase text-[color:var(--color-fg-soft)] mt-1">Original</div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: ACCENT }}>{(outSize / 1024 / 1024).toFixed(2)} MB</div>
              <div className="text-xs uppercase text-[color:var(--color-fg-soft)] mt-1">Comprimido</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[color:var(--color-success)]">−{pct}%</div>
              <div className="text-xs uppercase text-[color:var(--color-fg-soft)] mt-1">Ahorrado</div>
            </div>
          </div>
        </div>
        <button onClick={download} className="w-full py-4 rounded-2xl font-bold text-white text-lg shadow-xl flex items-center justify-center gap-2" style={{ background: ACCENT }}>
          <Download className="w-5 h-5" /> Descargar PDF comprimido
        </button>
      </SuccessPanel>
    );
  }

  return (
    <div className="space-y-6">
      <StepBar step={file ? 2 : 1} total={2} />
      {!file ? (
        <DropZone accept="application/pdf" onFile={load} illustration="pdf" accentColor={ACCENT} buttonLabel="Seleccionar PDF" helpText="🔒 Optimización 100% local sin pérdida de calidad" />
      ) : (
        <>
          <DropZone accept="application/pdf" onFile={load} loaded={{ name: file.name, size: file.size }} onClear={reset} illustration="pdf" accentColor={ACCENT} />
          {processing ? (
            <ProcessingBar label="Comprimiendo PDF…" />
          ) : (
            <PrimaryAction onClick={process} color={ACCENT}>
              <Zap className="w-5 h-5" /> Comprimir PDF
            </PrimaryAction>
          )}
        </>
      )}
    </div>
  );
}
