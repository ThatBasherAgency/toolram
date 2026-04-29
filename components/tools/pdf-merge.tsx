"use client";
import { useState } from "react";
import { Upload, Download, X, FileText } from "lucide-react";

export function PdfMerge() {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function add(list: FileList | null) {
    if (!list) return;
    const arr = Array.from(list).filter((f) => f.type === "application/pdf");
    setFiles((prev) => [...prev, ...arr]);
  }
  function remove(i: number) {
    setFiles((f) => f.filter((_, idx) => idx !== i));
  }
  function move(i: number, dir: -1 | 1) {
    setFiles((f) => {
      const next = [...f];
      const j = i + dir;
      if (j < 0 || j >= next.length) return next;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }
  async function merge() {
    if (files.length < 2) return setError("Necesitas al menos 2 PDFs.");
    setError("");
    setBusy(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const out = await PDFDocument.create();
      for (const f of files) {
        const buf = await f.arrayBuffer();
        const src = await PDFDocument.load(buf);
        const pages = await out.copyPages(src, src.getPageIndices());
        pages.forEach((p) => out.addPage(p));
      }
      const bytes = await out.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "toolram-merged.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      setError(e.message || "No se pudo unir los PDFs.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <label className="card flex flex-col items-center !py-8 cursor-pointer hover:!border-[color:var(--color-brand)] transition">
        <Upload className="w-8 h-8 text-[color:var(--color-fg-soft)] mb-2" />
        <div className="font-medium">Selecciona o arrastra tus PDFs</div>
        <div className="text-xs text-[color:var(--color-fg-soft)]">Procesado 100% local en tu navegador</div>
        <input type="file" multiple accept="application/pdf" className="hidden" onChange={(e) => add(e.target.files)} />
      </label>
      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((f, i) => (
            <li key={i} className="card !p-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[color:var(--color-brand)]" />
              <div className="flex-1 truncate">
                <div className="text-sm font-medium truncate">{f.name}</div>
                <div className="text-xs text-[color:var(--color-fg-soft)]">{(f.size / 1024).toFixed(1)} KB</div>
              </div>
              <button onClick={() => move(i, -1)} disabled={i === 0} className="btn btn-ghost h-8 !px-2 text-xs">↑</button>
              <button onClick={() => move(i, 1)} disabled={i === files.length - 1} className="btn btn-ghost h-8 !px-2 text-xs">↓</button>
              <button onClick={() => remove(i)} className="btn btn-ghost h-8 !p-1.5 !text-[color:var(--color-danger)]"><X className="w-4 h-4" /></button>
            </li>
          ))}
        </ul>
      )}
      {error && <div className="card !p-3 text-sm text-[color:var(--color-danger)] !border-[color:var(--color-danger)]">{error}</div>}
      <button onClick={merge} disabled={busy || files.length < 2} className="btn btn-primary w-full !py-3">
        <Download className="w-4 h-4" /> {busy ? "Uniendo…" : "Unir PDFs y descargar"}
      </button>
    </div>
  );
}
