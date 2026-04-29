"use client";
import { useState } from "react";
import { Upload, Download, FileText } from "lucide-react";

export function PdfSplit() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState(0);
  const [range, setRange] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function load(f: File) {
    setError("");
    setFile(f);
    const { PDFDocument } = await import("pdf-lib");
    const doc = await PDFDocument.load(await f.arrayBuffer());
    setPages(doc.getPageCount());
  }

  function parseRange(input: string, total: number): number[] {
    const out = new Set<number>();
    for (const part of input.split(",").map((s) => s.trim()).filter(Boolean)) {
      if (part.includes("-")) {
        const [a, b] = part.split("-").map((n) => parseInt(n));
        for (let i = Math.max(1, a); i <= Math.min(total, b); i++) out.add(i - 1);
      } else {
        const n = parseInt(part);
        if (n >= 1 && n <= total) out.add(n - 1);
      }
    }
    return [...out].sort((a, b) => a - b);
  }

  async function extract() {
    if (!file) return;
    const indices = parseRange(range, pages);
    if (!indices.length) return setError("Indica páginas válidas (ej: 1-3,5,7-9)");
    setError("");
    setBusy(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const src = await PDFDocument.load(await file.arrayBuffer());
      const out = await PDFDocument.create();
      const copied = await out.copyPages(src, indices);
      copied.forEach((p) => out.addPage(p));
      const bytes = await out.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `toolram-extract-${file.name}`;
      a.click();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <label className="card flex flex-col items-center !py-8 cursor-pointer hover:!border-[color:var(--color-brand)]">
        <Upload className="w-8 h-8 text-[color:var(--color-fg-soft)] mb-2" />
        <div className="font-medium">{file ? file.name : "Selecciona un PDF"}</div>
        {file && <div className="text-xs text-[color:var(--color-fg-soft)]">{pages} páginas</div>}
        <input type="file" accept="application/pdf" className="hidden" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])} />
      </label>
      {file && (
        <>
          <div>
            <label className="block text-xs uppercase mb-1">Páginas a extraer</label>
            <input
              className="input"
              placeholder="ej: 1-3, 5, 7-9"
              value={range}
              onChange={(e) => setRange(e.target.value)}
            />
            <div className="text-xs text-[color:var(--color-fg-soft)] mt-1">
              Total: {pages} páginas. Usa coma para separar y guion para rangos.
            </div>
          </div>
          {error && <div className="text-sm text-[color:var(--color-danger)]">{error}</div>}
          <button onClick={extract} disabled={busy || !range} className="btn btn-primary w-full">
            <Download className="w-4 h-4" /> {busy ? "Procesando…" : "Extraer páginas y descargar"}
          </button>
        </>
      )}
    </div>
  );
}
