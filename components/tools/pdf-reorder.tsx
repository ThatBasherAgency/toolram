"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Download, ArrowUp, ArrowDown, Trash, Layers } from "lucide-react";
import { DropZone, PrimaryAction, ProcessingBar, StepBar, SuccessPanel } from "./ui/drop-zone";
import { renderPdfThumbnails } from "./ui/pdf-thumb";

const ACCENT = "oklch(0.55 0.2 280)";

export function PdfReorder() {
  const [file, setFile] = useState<File | null>(null);
  const [thumbs, setThumbs] = useState<string[]>([]);
  const [order, setOrder] = useState<number[]>([]);
  const [out, setOut] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  async function load(f: File) {
    setFile(f);
    setOut(null);
    const t = await renderPdfThumbnails(f, 0.45);
    setThumbs(t);
    setOrder(t.map((_, i) => i));
  }
  function reset() { setFile(null); setThumbs([]); setOrder([]); setOut(null); }

  function move(from: number, dir: -1 | 1) {
    const to = from + dir;
    if (to < 0 || to >= order.length) return;
    const next = [...order];
    [next[from], next[to]] = [next[to], next[from]];
    setOrder(next);
  }
  function remove(i: number) { setOrder((o) => o.filter((_, idx) => idx !== i)); }

  async function apply() {
    if (!file || order.length === 0) return;
    setProcessing(true);
    try {
      const src = await PDFDocument.load(await file.arrayBuffer());
      const dst = await PDFDocument.create();
      const copied = await dst.copyPages(src, order);
      copied.forEach((p) => dst.addPage(p));
      const bytes = await dst.save();
      setOut(URL.createObjectURL(new Blob([bytes as BlobPart], { type: "application/pdf" })));
    } finally { setProcessing(false); }
  }

  function download() {
    if (!out) return;
    const a = document.createElement("a");
    a.href = out;
    a.download = (file?.name.replace(/\.pdf$/i, "") || "documento") + "-reordenado.pdf";
    a.click();
  }

  if (out) {
    return (
      <SuccessPanel onReset={reset}>
        <p className="text-sm text-[color:var(--color-fg-soft)]">PDF generado con {order.length} páginas en el nuevo orden.</p>
        <button onClick={download} className="w-full py-4 rounded-2xl font-bold text-white text-lg shadow-xl flex items-center justify-center gap-2" style={{ background: ACCENT }}>
          <Download className="w-5 h-5" /> Descargar PDF reordenado
        </button>
      </SuccessPanel>
    );
  }

  return (
    <div className="space-y-6">
      <StepBar step={file ? 2 : 1} />
      {!file ? (
        <DropZone accept="application/pdf" onFile={load} icon="pdf" accentColor={ACCENT} buttonLabel="Seleccionar PDF" />
      ) : (
        <>
          <DropZone accept="application/pdf" onFile={load} loaded={{ name: file.name, size: file.size, thumbnail: thumbs[0] }} onClear={reset} icon="pdf" accentColor={ACCENT} />

          {thumbs.length > 0 && (
            <>
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold flex items-center gap-2"><Layers className="w-4 h-4" /> {order.length} de {thumbs.length} páginas</div>
                {order.length !== thumbs.length && <button onClick={() => setOrder(thumbs.map((_, i) => i))} className="text-sm font-medium underline hover:text-[color:var(--color-brand)]">Restaurar todas</button>}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {order.map((p, i) => (
                  <div key={`${p}-${i}`} className="rounded-xl border-2 bg-[color:var(--color-bg-soft)] overflow-hidden shadow-sm hover:shadow-lg transition" style={{ borderColor: "var(--color-border)" }}>
                    <div className="relative">
                      <img src={thumbs[p]} alt="" className="block w-full" />
                      <div className="absolute top-2 left-2 w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold shadow-lg" style={{ background: ACCENT }}>{i + 1}</div>
                      <div className="absolute top-2 right-2 text-xs bg-black/70 text-white px-2 py-0.5 rounded">orig p.{p + 1}</div>
                    </div>
                    <div className="flex items-center justify-center gap-1 p-2 bg-white border-t border-[color:var(--color-border)]">
                      <button onClick={() => move(i, -1)} disabled={i === 0} className="w-8 h-8 rounded-lg hover:bg-[color:var(--color-bg-soft)] disabled:opacity-30 flex items-center justify-center"><ArrowUp className="w-4 h-4" /></button>
                      <button onClick={() => move(i, 1)} disabled={i === order.length - 1} className="w-8 h-8 rounded-lg hover:bg-[color:var(--color-bg-soft)] disabled:opacity-30 flex items-center justify-center"><ArrowDown className="w-4 h-4" /></button>
                      <button onClick={() => remove(i)} className="w-8 h-8 rounded-lg hover:bg-[color:var(--color-danger)] hover:text-white flex items-center justify-center"><Trash className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>

              {processing && <ProcessingBar label="Generando PDF…" />}
              <PrimaryAction onClick={apply} disabled={order.length === 0 || processing} color={ACCENT}>
                <Layers className="w-5 h-5" /> Generar PDF reordenado
              </PrimaryAction>
            </>
          )}
        </>
      )}
    </div>
  );
}
