"use client";
import { useRef, useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Download, Type, Trash2 } from "lucide-react";
import { renderPdfThumbnails } from "./ui/pdf-thumb";
import { UploadHero } from "./editor/UploadHero";
import { PdfEditor } from "./editor/PdfEditor";
import { DraggableElement } from "./editor/DraggableElement";
import type { EditorElement, TextData } from "./editor/types";

const ACCENT = "oklch(0.6 0.2 240)";

export function PdfEdit() {
  const [file, setFile] = useState<File | null>(null);
  const [thumbs, setThumbs] = useState<string[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [elements, setElements] = useState<EditorElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [out, setOut] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const pageContainerRef = useRef<HTMLDivElement | null>(null);

  async function loadFile(f: File) {
    setFile(f); setOut(null); setElements([]);
    setLoading("Generando preview…");
    try {
      const t = await renderPdfThumbnails(f, 0.5);
      setThumbs(t); setActivePage(1);
    } finally { setLoading(null); }
  }
  function reset() { setFile(null); setThumbs([]); setElements([]); setOut(null); }

  function placeText(xPct: number, yPct: number) {
    const id = `txt-${Date.now()}`;
    setElements((arr) => [...arr, {
      id, page: activePage, type: "text",
      xPct: Math.max(0, xPct - 5), yPct: Math.max(0, yPct - 1.5),
      wPct: 25, hPct: 4,
      data: { kind: "text", text: "Tu texto", fontSize: 16, color: "#000000" }
    }]);
    setSelectedId(id);
  }

  function updateEl(id: string, patch: Partial<EditorElement>) {
    setElements((arr) => arr.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }
  function updateData(id: string, patch: Partial<TextData>) {
    setElements((arr) => arr.map((e) => (e.id === id ? { ...e, data: { ...(e.data as TextData), ...patch } } : e)));
  }

  async function apply() {
    if (!file) return;
    const valid = elements.filter((e) => e.type === "text" && (e.data as TextData).text.trim());
    if (valid.length === 0) return;
    setLoading("Aplicando cambios…");
    try {
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const font = await doc.embedFont(StandardFonts.Helvetica);
      for (const el of valid) {
        const td = el.data as TextData;
        const page = doc.getPage(el.page - 1);
        const { width, height } = page.getSize();
        const r = parseInt(td.color.slice(1, 3), 16) / 255;
        const g = parseInt(td.color.slice(3, 5), 16) / 255;
        const b = parseInt(td.color.slice(5, 7), 16) / 255;
        page.drawText(td.text, { x: (el.xPct / 100) * width, y: height - (el.yPct / 100) * height - td.fontSize, size: td.fontSize, font, color: rgb(r, g, b) });
      }
      const bytes = await doc.save();
      setOut(URL.createObjectURL(new Blob([bytes as BlobPart], { type: "application/pdf" })));
    } finally { setLoading(null); }
  }

  function download() {
    if (!out) return;
    const a = document.createElement("a");
    a.href = out;
    a.download = (file?.name.replace(/\.pdf$/i, "") || "documento") + "-editado.pdf";
    a.click();
  }

  if (!file) return <UploadHero toolName="Editar PDF" subtitle="Subí tu PDF y clickeá en cualquier lugar de la página para agregar texto." accept="application/pdf" onFile={loadFile} buttonLabel="Seleccionar PDF" accent={ACCENT} illustration="pdf" />;

  if (out) {
    return (
      <div className="fixed inset-0 z-50 bg-[color:var(--color-bg)] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-[color:var(--color-success)] text-white flex items-center justify-center text-5xl shadow-2xl">✓</div>
          <div><h2 className="text-3xl font-bold tracking-tight">¡PDF editado!</h2><p className="text-[color:var(--color-fg-soft)] mt-2">{elements.length} elemento{elements.length === 1 ? "" : "s"} agregado{elements.length === 1 ? "" : "s"}.</p></div>
          <button onClick={download} className="w-full py-4 rounded-2xl font-bold text-white text-lg shadow-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition" style={{ background: ACCENT }}>
            <Download className="w-5 h-5" /> Descargar PDF editado
          </button>
          <button onClick={reset} className="text-sm font-semibold text-[color:var(--color-fg-soft)] hover:underline">↻ Editar otro PDF</button>
        </div>
      </div>
    );
  }

  const selected = elements.find((e) => e.id === selectedId);
  const elementsThisPage = elements.filter((e) => e.page === activePage);

  const sidebar = (
    <div className="space-y-5">
      <div className="rounded-xl p-3 border" style={{ background: `${ACCENT}08`, borderColor: `${ACCENT}30` }}>
        <div className="text-xs font-bold mb-1" style={{ color: ACCENT }}>→ Click en la página</div>
        <div className="text-xs text-[color:var(--color-fg-soft)] leading-relaxed">Hacé click en cualquier punto de la página para agregar un bloque de texto. Después arrastralo o redimensionalo.</div>
      </div>

      {selected && selected.type === "text" && (
        <div className="space-y-3 p-4 rounded-xl bg-[color:var(--color-bg-soft)]">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Texto seleccionado</div>
            <button onClick={() => { setElements((a) => a.filter((e) => e.id !== selected.id)); setSelectedId(null); }} className="text-[color:var(--color-danger)]"><Trash2 className="w-4 h-4" /></button>
          </div>
          <textarea
            className="w-full px-3 py-2 rounded-lg border border-[color:var(--color-border)] bg-white text-sm resize-none"
            rows={3}
            value={(selected.data as TextData).text}
            onChange={(e) => updateData(selected.id, { text: e.target.value })}
          />
          <div>
            <div className="text-xs font-medium mb-1">Tamaño · {(selected.data as TextData).fontSize}px</div>
            <input type="range" min={8} max={72} className="w-full" value={(selected.data as TextData).fontSize} onChange={(e) => { const fs = +e.target.value; updateData(selected.id, { fontSize: fs }); updateEl(selected.id, { hPct: Math.max(2, fs / 5) }); }} />
          </div>
          <div>
            <div className="text-xs font-medium mb-1">Color</div>
            <div className="flex gap-2">
              {["#000000", "#dc2626", "#2563eb", "#16a34a", "#9333ea", "#ea580c"].map((c) => (
                <button key={c} onClick={() => updateData(selected.id, { color: c })} className={`w-7 h-7 rounded-full border-2 transition ${(selected.data as TextData).color === c ? "scale-110" : ""}`} style={{ background: c, borderColor: (selected.data as TextData).color === c ? ACCENT : "transparent" }} />
              ))}
              <input type="color" value={(selected.data as TextData).color} onChange={(e) => updateData(selected.id, { color: e.target.value })} className="w-7 h-7 rounded-full cursor-pointer border-2 border-[color:var(--color-border)]" />
            </div>
          </div>
        </div>
      )}

      {elements.length > 0 && (
        <div className="text-xs text-[color:var(--color-fg-soft)] text-center pt-2 border-t border-[color:var(--color-border)]">
          {elements.length} texto{elements.length === 1 ? "" : "s"} agregado{elements.length === 1 ? "" : "s"} en {new Set(elements.map((e) => e.page)).size} página{new Set(elements.map((e) => e.page)).size === 1 ? "" : "s"}
        </div>
      )}
    </div>
  );

  const renderOverlay = () => (
    <>
      {elementsThisPage.map((el) => {
        const td = el.data as TextData;
        return (
          <DraggableElement key={el.id} xPct={el.xPct} yPct={el.yPct} wPct={el.wPct} hPct={el.hPct} selected={selectedId === el.id} containerRef={pageContainerRef} onSelect={() => setSelectedId(el.id)} onMove={(x, y) => updateEl(el.id, { xPct: x, yPct: y })} onResize={(w, h) => updateEl(el.id, { wPct: w, hPct: h })} onDelete={() => setElements((a) => a.filter((e) => e.id !== el.id))} accent={ACCENT}>
            <div className="w-full h-full flex items-center px-1 select-none" style={{ color: td.color, fontSize: `${Math.max(8, td.fontSize / 2)}px`, fontWeight: 500, whiteSpace: "pre-wrap", overflow: "hidden" }}>
              {td.text || "(vacío)"}
            </div>
          </DraggableElement>
        );
      })}
    </>
  );

  return (
    <PdfEditor
      toolName="Editar PDF"
      file={file}
      thumbs={thumbs}
      activePage={activePage}
      onActivePageChange={setActivePage}
      renderOverlay={renderOverlay}
      onPageClick={placeText}
      pageContainerRef={pageContainerRef}
      sidebar={sidebar}
      actionLabel={`Aplicar y descargar${elements.length > 0 ? ` (${elements.length})` : ""}`}
      onAction={apply}
      actionDisabled={elements.filter((e) => e.type === "text" && (e.data as TextData).text.trim()).length === 0}
      accent={ACCENT}
      loading={loading}
      onClose={reset}
    />
  );
}
