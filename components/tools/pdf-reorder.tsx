"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Download, ArrowUp, ArrowDown, Trash } from "lucide-react";

export function PdfReorder() {
  const [file, setFile] = useState<File | null>(null);
  const [order, setOrder] = useState<number[]>([]);
  const [out, setOut] = useState<string | null>(null);

  async function load(f: File) {
    setFile(f);
    setOut(null);
    const doc = await PDFDocument.load(await f.arrayBuffer());
    const total = doc.getPageCount();
    setOrder(Array.from({ length: total }, (_, i) => i));
  }

  function move(from: number, dir: -1 | 1) {
    const to = from + dir;
    if (to < 0 || to >= order.length) return;
    const next = [...order];
    [next[from], next[to]] = [next[to], next[from]];
    setOrder(next);
  }
  function remove(i: number) {
    setOrder((o) => o.filter((_, idx) => idx !== i));
  }

  async function apply() {
    if (!file || order.length === 0) return;
    const src = await PDFDocument.load(await file.arrayBuffer());
    const dst = await PDFDocument.create();
    const copied = await dst.copyPages(src, order);
    copied.forEach((p) => dst.addPage(p));
    const bytes = await dst.save();
    const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
    setOut(URL.createObjectURL(blob));
  }

  function download() {
    if (!out) return;
    const a = document.createElement("a");
    a.href = out;
    a.download = (file?.name.replace(/\.pdf$/i, "") || "documento") + "-reordenado.pdf";
    a.click();
  }

  return (
    <div className="space-y-4">
      <div className="card !p-3 text-xs">🔒 Reordená y eliminá páginas client-side. Originales quedan intactos hasta que descargues.</div>
      <input type="file" accept="application/pdf" className="input" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])} />
      {order.length > 0 && (
        <>
          <div className="card !p-3 max-h-96 overflow-auto">
            <div className="text-xs uppercase text-[color:var(--color-fg-soft)] mb-2">Orden de páginas ({order.length} de {file ? "?" : 0})</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {order.map((p, i) => (
                <div key={`${p}-${i}`} className="card !p-2 text-center text-sm">
                  <div className="font-bold">#{i + 1}</div>
                  <div className="text-xs text-[color:var(--color-fg-soft)]">Original p.{p + 1}</div>
                  <div className="flex justify-center gap-1 mt-1">
                    <button onClick={() => move(i, -1)} disabled={i === 0} className="btn btn-ghost h-6 !px-1"><ArrowUp className="w-3 h-3" /></button>
                    <button onClick={() => move(i, 1)} disabled={i === order.length - 1} className="btn btn-ghost h-6 !px-1"><ArrowDown className="w-3 h-3" /></button>
                    <button onClick={() => remove(i)} className="btn btn-ghost h-6 !px-1 text-[color:var(--color-danger)]"><Trash className="w-3 h-3" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={apply} className="btn btn-primary w-full !py-3">📄 Generar PDF reordenado</button>
        </>
      )}
      {out && (
        <div className="card !p-3 text-center space-y-2">
          <div className="text-sm text-[color:var(--color-success)]">✓ PDF reordenado</div>
          <button onClick={download} className="btn btn-primary w-full"><Download className="w-4 h-4" /> Descargar</button>
        </div>
      )}
    </div>
  );
}
