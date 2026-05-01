"use client";
import { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Download, Plus, Trash } from "lucide-react";

type TextItem = {
  id: number;
  page: number;
  text: string;
  x: number;
  y: number;
  size: number;
  color: string;
};

let nid = 1;

export function PdfEdit() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState(0);
  const [items, setItems] = useState<TextItem[]>([]);
  const [out, setOut] = useState<string | null>(null);

  async function load(f: File) {
    setFile(f);
    setOut(null);
    const doc = await PDFDocument.load(await f.arrayBuffer());
    setPages(doc.getPageCount());
    setItems([{ id: nid++, page: 1, text: "Texto agregado", x: 50, y: 50, size: 14, color: "#000000" }]);
  }

  function update(id: number, patch: Partial<TextItem>) {
    setItems((xs) => xs.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }
  function add() {
    setItems((xs) => [...xs, { id: nid++, page: 1, text: "", x: 50, y: 50, size: 14, color: "#000000" }]);
  }
  function remove(id: number) {
    setItems((xs) => xs.filter((x) => x.id !== id));
  }

  async function apply() {
    if (!file) return;
    const doc = await PDFDocument.load(await file.arrayBuffer());
    const font = await doc.embedFont(StandardFonts.Helvetica);
    for (const it of items) {
      if (!it.text.trim()) continue;
      const page = doc.getPage(Math.min(pages, Math.max(1, it.page)) - 1);
      const { width, height } = page.getSize();
      const r = parseInt(it.color.slice(1, 3), 16) / 255;
      const g = parseInt(it.color.slice(3, 5), 16) / 255;
      const b = parseInt(it.color.slice(5, 7), 16) / 255;
      page.drawText(it.text, {
        x: (it.x / 100) * width,
        y: height - (it.y / 100) * height - it.size,
        size: it.size,
        font,
        color: rgb(r, g, b)
      });
    }
    const bytes = await doc.save();
    const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
    setOut(URL.createObjectURL(blob));
  }

  function download() {
    if (!out) return;
    const a = document.createElement("a");
    a.href = out;
    a.download = (file?.name.replace(/\.pdf$/i, "") || "documento") + "-editado.pdf";
    a.click();
  }

  return (
    <div className="space-y-4">
      <div className="card !p-3 text-xs">🔒 Edición client-side con pdf-lib. Agregá texto en cualquier posición y página, luego descargá el PDF modificado.</div>
      <input type="file" accept="application/pdf" className="input" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])} />
      {file && (
        <>
          <div className="space-y-2">
            {items.map((it) => (
              <div key={it.id} className="card !p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase text-[color:var(--color-fg-soft)]">Texto #{it.id}</span>
                  <button onClick={() => remove(it.id)} className="text-xs text-[color:var(--color-danger)]"><Trash className="w-3 h-3 inline" /></button>
                </div>
                <input className="input" value={it.text} onChange={(e) => update(it.id, { text: e.target.value })} placeholder="Texto a agregar" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <label className="text-xs">Página<input type="number" min={1} max={pages} className="input mt-1" value={it.page} onChange={(e) => update(it.id, { page: +e.target.value || 1 })} /></label>
                  <label className="text-xs">X (%)<input type="number" min={0} max={100} className="input mt-1" value={it.x} onChange={(e) => update(it.id, { x: +e.target.value || 0 })} /></label>
                  <label className="text-xs">Y (%)<input type="number" min={0} max={100} className="input mt-1" value={it.y} onChange={(e) => update(it.id, { y: +e.target.value || 0 })} /></label>
                  <label className="text-xs">Tamaño<input type="number" min={6} max={72} className="input mt-1" value={it.size} onChange={(e) => update(it.id, { size: +e.target.value || 14 })} /></label>
                </div>
                <label className="text-xs flex items-center gap-2">Color<input type="color" value={it.color} onChange={(e) => update(it.id, { color: e.target.value })} /></label>
              </div>
            ))}
            <button onClick={add} className="btn btn-ghost"><Plus className="w-4 h-4" /> Agregar texto</button>
          </div>
          <button onClick={apply} className="btn btn-primary w-full !py-3">✏️ Aplicar cambios</button>
        </>
      )}
      {out && (
        <div className="card !p-3 text-center space-y-2">
          <div className="text-sm text-[color:var(--color-success)]">✓ PDF editado</div>
          <button onClick={download} className="btn btn-primary w-full"><Download className="w-4 h-4" /> Descargar PDF</button>
        </div>
      )}
    </div>
  );
}
