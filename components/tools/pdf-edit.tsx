"use client";
import { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Download, Plus, Trash, Type } from "lucide-react";
import { DropZone, PrimaryAction, ProcessingBar, StepBar, SuccessPanel } from "./ui/drop-zone";
import { renderPdfThumbnails } from "./ui/pdf-thumb";

const ACCENT = "oklch(0.6 0.2 240)";

type TextItem = { id: number; page: number; text: string; x: number; y: number; size: number; color: string };
let nid = 1;

export function PdfEdit() {
  const [file, setFile] = useState<File | null>(null);
  const [thumbs, setThumbs] = useState<string[]>([]);
  const [items, setItems] = useState<TextItem[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [out, setOut] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  async function load(f: File) {
    setFile(f);
    setOut(null);
    setItems([{ id: nid++, page: 1, text: "Texto agregado", x: 50, y: 50, size: 16, color: "#000000" }]);
    const t = await renderPdfThumbnails(f, 0.4);
    setThumbs(t);
  }

  function reset() { setFile(null); setThumbs([]); setItems([]); setOut(null); }
  function update(id: number, patch: Partial<TextItem>) { setItems((xs) => xs.map((x) => (x.id === id ? { ...x, ...patch } : x))); }
  function add() { setItems((xs) => [...xs, { id: nid++, page: activePage, text: "", x: 50, y: 50, size: 16, color: "#000000" }]); }
  function remove(id: number) { setItems((xs) => xs.filter((x) => x.id !== id)); }

  async function apply() {
    if (!file) return;
    setProcessing(true);
    try {
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const font = await doc.embedFont(StandardFonts.Helvetica);
      for (const it of items) {
        if (!it.text.trim()) continue;
        const page = doc.getPage(Math.min(thumbs.length, Math.max(1, it.page)) - 1);
        const { width, height } = page.getSize();
        const r = parseInt(it.color.slice(1, 3), 16) / 255;
        const g = parseInt(it.color.slice(3, 5), 16) / 255;
        const b = parseInt(it.color.slice(5, 7), 16) / 255;
        page.drawText(it.text, { x: (it.x / 100) * width, y: height - (it.y / 100) * height - it.size, size: it.size, font, color: rgb(r, g, b) });
      }
      const bytes = await doc.save();
      setOut(URL.createObjectURL(new Blob([bytes as BlobPart], { type: "application/pdf" })));
    } finally { setProcessing(false); }
  }

  function download() {
    if (!out) return;
    const a = document.createElement("a");
    a.href = out;
    a.download = (file?.name.replace(/\.pdf$/i, "") || "documento") + "-editado.pdf";
    a.click();
  }

  if (out) {
    return (
      <SuccessPanel onReset={reset}>
        <p className="text-sm text-[color:var(--color-fg-soft)]">Tu PDF fue editado con {items.filter((i) => i.text.trim()).length} texto(s) agregado(s).</p>
        <button onClick={download} className="w-full py-4 rounded-2xl font-bold text-white text-lg shadow-xl flex items-center justify-center gap-2" style={{ background: ACCENT }}>
          <Download className="w-5 h-5" /> Descargar PDF editado
        </button>
      </SuccessPanel>
    );
  }

  const itemsThisPage = items.filter((i) => i.page === activePage);

  return (
    <div className="space-y-6">
      <StepBar step={file ? 2 : 1} />
      {!file ? (
        <DropZone accept="application/pdf" onFile={load} illustration="pdf" accentColor={ACCENT} buttonLabel="Seleccionar PDF" />
      ) : (
        <>
          <DropZone accept="application/pdf" onFile={load} loaded={{ name: file.name, size: file.size, thumbnail: thumbs[0] }} onClear={reset} illustration="pdf" accentColor={ACCENT} />

          {thumbs.length > 0 && (
            <>
              <div className="space-y-3">
                <div className="text-sm font-semibold">Página activa</div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {thumbs.map((t, i) => (
                    <button key={i} onClick={() => setActivePage(i + 1)} className={`flex-shrink-0 relative rounded-lg overflow-hidden border-2 transition`} style={{ borderColor: activePage === i + 1 ? ACCENT : "var(--color-border)", width: 90 }}>
                      <img src={t} alt="" className="block w-full" />
                      <div className="absolute bottom-0 left-0 right-0 text-xs py-0.5 text-center text-white" style={{ background: activePage === i + 1 ? ACCENT : "rgba(0,0,0,0.6)" }}>p.{i + 1}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="card !p-0 overflow-hidden">
                <div className="bg-[color:var(--color-bg-soft)] p-4 flex justify-center relative">
                  <div className="relative">
                    <img src={thumbs[activePage - 1]} alt="" className="block max-h-[480px] max-w-full" />
                    {itemsThisPage.map((it) => (
                      <div key={it.id} className="absolute pointer-events-none border-2 border-dashed" style={{ borderColor: ACCENT, color: it.color, fontSize: `${Math.max(8, it.size / 2)}px`, left: `${it.x}%`, top: `${it.y}%`, padding: "2px 4px", background: `${ACCENT}10` }}>
                        {it.text || "(vacío)"}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold flex items-center gap-2"><Type className="w-4 h-4" /> Textos en página {activePage}</div>
                  <button onClick={add} className="text-sm font-medium inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-white" style={{ background: ACCENT }}><Plus className="w-4 h-4" /> Agregar</button>
                </div>
                {itemsThisPage.length === 0 && <div className="text-sm text-[color:var(--color-fg-soft)] text-center py-4">Sin textos en esta página. Hacé click en "Agregar" para empezar.</div>}
                {itemsThisPage.map((it) => (
                  <div key={it.id} className="card !p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <input className="input flex-1" value={it.text} onChange={(e) => update(it.id, { text: e.target.value })} placeholder="Tu texto…" />
                      <button onClick={() => remove(it.id)} className="w-9 h-9 rounded-lg bg-[color:var(--color-bg-soft)] hover:bg-[color:var(--color-danger)] hover:text-white flex items-center justify-center"><Trash className="w-4 h-4" /></button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <label className="text-xs">X (%)<input type="number" min={0} max={100} className="input mt-1" value={it.x} onChange={(e) => update(it.id, { x: +e.target.value || 0 })} /></label>
                      <label className="text-xs">Y (%)<input type="number" min={0} max={100} className="input mt-1" value={it.y} onChange={(e) => update(it.id, { y: +e.target.value || 0 })} /></label>
                      <label className="text-xs">Tamaño<input type="number" min={6} max={72} className="input mt-1" value={it.size} onChange={(e) => update(it.id, { size: +e.target.value || 14 })} /></label>
                      <label className="text-xs">Color<input type="color" value={it.color} onChange={(e) => update(it.id, { color: e.target.value })} className="block w-full h-10 rounded-lg cursor-pointer" /></label>
                    </div>
                  </div>
                ))}
              </div>

              {processing && <ProcessingBar label="Aplicando cambios…" />}
              <PrimaryAction onClick={apply} disabled={items.filter((i) => i.text.trim()).length === 0 || processing} color={ACCENT}>
                <Type className="w-5 h-5" /> Aplicar cambios
              </PrimaryAction>
            </>
          )}
        </>
      )}
    </div>
  );
}
