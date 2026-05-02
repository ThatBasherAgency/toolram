"use client";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Download, Trash2, RotateCcw, Plus, GripVertical } from "lucide-react";
import { renderPdfThumbnails } from "./ui/pdf-thumb";
import { UploadHero } from "./editor/UploadHero";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const ACCENT = "oklch(0.55 0.2 280)";

export function PdfReorder() {
  const [file, setFile] = useState<File | null>(null);
  const [thumbs, setThumbs] = useState<string[]>([]);
  const [order, setOrder] = useState<number[]>([]);
  const [out, setOut] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  async function loadFile(f: File) {
    setFile(f); setOut(null);
    setLoading("Generando preview…");
    try {
      const t = await renderPdfThumbnails(f, 0.6);
      setThumbs(t);
      setOrder(t.map((_, i) => i));
    } finally { setLoading(null); }
  }
  function reset() { setFile(null); setThumbs([]); setOrder([]); setOut(null); }

  function onDragStart(e: React.DragEvent, idx: number) {
    setDraggingIdx(idx);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(idx));
  }
  function onDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault();
    setHoverIdx(idx);
  }
  function onDrop(e: React.DragEvent, idx: number) {
    e.preventDefault();
    if (draggingIdx === null || draggingIdx === idx) return;
    const next = [...order];
    const [moved] = next.splice(draggingIdx, 1);
    next.splice(idx, 0, moved);
    setOrder(next);
    setDraggingIdx(null);
    setHoverIdx(null);
  }
  function onDragEnd() { setDraggingIdx(null); setHoverIdx(null); }

  function remove(i: number) { setOrder((o) => o.filter((_, idx) => idx !== i)); }
  function restore() { setOrder(thumbs.map((_, i) => i)); }

  async function apply() {
    if (!file || order.length === 0) return;
    setLoading("Generando PDF…");
    try {
      const src = await PDFDocument.load(await file.arrayBuffer());
      const dst = await PDFDocument.create();
      const copied = await dst.copyPages(src, order);
      copied.forEach((p) => dst.addPage(p));
      const bytes = await dst.save();
      setOut(URL.createObjectURL(new Blob([bytes as BlobPart], { type: "application/pdf" })));
    } finally { setLoading(null); }
  }

  function download() {
    if (!out) return;
    const a = document.createElement("a");
    a.href = out;
    a.download = (file?.name.replace(/\.pdf$/i, "") || "documento") + "-reordenado.pdf";
    a.click();
  }

  if (!file) return <UploadHero toolName="Reordenar PDF" subtitle="Subí tu PDF y arrastrá las páginas para cambiar el orden o eliminarlas." accept="application/pdf" onFile={loadFile} buttonLabel="Seleccionar PDF" accent={ACCENT} illustration="pdf" />;

  if (out) {
    return (
      <div className="fixed inset-0 z-50 bg-[color:var(--color-bg)] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-[color:var(--color-success)] text-white flex items-center justify-center text-5xl shadow-2xl">✓</div>
          <div><h2 className="text-3xl font-bold tracking-tight">¡PDF reordenado!</h2><p className="text-[color:var(--color-fg-soft)] mt-2">{order.length} página{order.length === 1 ? "" : "s"} en el nuevo orden.</p></div>
          <button onClick={download} className="w-full py-4 rounded-2xl font-bold text-white text-lg shadow-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition" style={{ background: ACCENT }}>
            <Download className="w-5 h-5" /> Descargar PDF
          </button>
          <button onClick={reset} className="text-sm font-semibold text-[color:var(--color-fg-soft)] hover:underline">↻ Procesar otro PDF</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[color:var(--color-bg)] flex flex-col">
      <header className="flex items-center justify-between px-3 md:px-5 h-14 border-b border-[color:var(--color-border)] bg-white dark:bg-[color:var(--color-bg-soft)] flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/" className="text-sm font-medium hover:opacity-70 inline-flex items-center gap-1 flex-shrink-0"><ChevronLeft className="w-4 h-4" /> Toolram</Link>
          <span className="text-[color:var(--color-fg-soft)] hidden md:inline">·</span>
          <span className="font-bold text-base hidden md:inline" style={{ color: ACCENT }}>Reordenar PDF</span>
        </div>
        <div className="text-sm truncate max-w-[40%] text-[color:var(--color-fg-soft)] mx-2">{file.name}</div>
        <button onClick={reset} className="text-sm font-medium px-3 py-1 rounded-lg hover:bg-[color:var(--color-bg-soft)]">Cerrar</button>
      </header>

      <div className="flex-1 overflow-auto p-4 md:p-8 bg-[oklch(0.94_0_0)] dark:bg-[oklch(0.12_0_0)]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <div className="text-sm font-semibold">{order.length} de {thumbs.length} páginas {order.length !== thumbs.length && "(modificado)"}</div>
            {order.length !== thumbs.length && <button onClick={restore} className="text-sm font-medium underline inline-flex items-center gap-1" style={{ color: ACCENT }}><RotateCcw className="w-3.5 h-3.5" /> Restaurar todas</button>}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {order.map((p, i) => (
              <div
                key={`${p}-${i}`}
                draggable
                onDragStart={(e) => onDragStart(e, i)}
                onDragOver={(e) => onDragOver(e, i)}
                onDrop={(e) => onDrop(e, i)}
                onDragEnd={onDragEnd}
                className={`relative rounded-xl border-2 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-grab active:cursor-grabbing ${draggingIdx === i ? "opacity-30" : ""} ${hoverIdx === i && draggingIdx !== i ? "scale-105" : ""}`}
                style={{ borderColor: hoverIdx === i && draggingIdx !== null && draggingIdx !== i ? ACCENT : "var(--color-border)" }}
              >
                <div className="absolute top-2 left-2 w-9 h-9 rounded-full text-white flex items-center justify-center text-sm font-extrabold shadow-lg z-10" style={{ background: ACCENT }}>
                  {i + 1}
                </div>
                <button onClick={() => remove(i)} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 hover:bg-[color:var(--color-danger)] hover:text-white flex items-center justify-center shadow-lg z-10 transition" aria-label="Eliminar">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="absolute inset-x-0 bottom-0 h-7 bg-gradient-to-t from-black/40 to-transparent flex items-center justify-center pointer-events-none">
                  <GripVertical className="w-4 h-4 text-white opacity-80" />
                </div>
                <img src={thumbs[p]} alt={`Página ${p + 1}`} className="block w-full" draggable={false} />
              </div>
            ))}
            <button onClick={restore} className="rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[180px] text-[color:var(--color-fg-soft)] hover:bg-white transition" style={{ borderColor: "var(--color-border)" }}>
              <Plus className="w-8 h-8 mb-1" />
              <span className="text-xs font-medium">Restaurar páginas eliminadas</span>
            </button>
          </div>
        </div>
      </div>

      <footer className="border-t border-[color:var(--color-border)] bg-white dark:bg-[color:var(--color-bg-soft)] px-3 md:px-5 py-3 flex items-center justify-between gap-3 flex-shrink-0">
        <div className="text-xs text-[color:var(--color-fg-soft)] hidden md:block">Arrastrá una página para reordenarla, hacé click en 🗑 para eliminar</div>
        {loading ? (
          <div className="flex-1 md:flex-initial flex items-center justify-end gap-2 text-sm font-medium"><div className="w-4 h-4 rounded-full border-2 border-[color:var(--color-fg)] border-t-transparent animate-spin" />{loading}</div>
        ) : (
          <button onClick={apply} disabled={order.length === 0} className="px-6 md:px-10 py-3 md:py-3.5 rounded-xl text-white font-bold shadow-lg disabled:opacity-50 enabled:hover:scale-[1.02] transition flex-1 md:flex-initial text-base" style={{ background: order.length === 0 ? "var(--color-fg-soft)" : ACCENT }}>
            Generar PDF reordenado
          </button>
        )}
      </footer>
    </div>
  );
}
