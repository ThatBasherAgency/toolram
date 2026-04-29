"use client";
import { useState } from "react";
import { Upload, Download } from "lucide-react";

export function PdfPageNumbers() {
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState<"bottom-center" | "bottom-right" | "top-right">("bottom-center");
  const [busy, setBusy] = useState(false);

  async function apply() {
    if (!file) return;
    setBusy(true);
    try {
      const { PDFDocument, rgb, StandardFonts } = await import("pdf-lib");
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const pages = doc.getPages();
      pages.forEach((p, i) => {
        const { width, height } = p.getSize();
        const text = `${i + 1} / ${pages.length}`;
        const size = 10;
        const w = font.widthOfTextAtSize(text, size);
        let x = width / 2 - w / 2;
        let y = 20;
        if (position === "bottom-right") { x = width - w - 30; y = 20; }
        if (position === "top-right") { x = width - w - 30; y = height - 25; }
        p.drawText(text, { x, y, size, font, color: rgb(0.3, 0.3, 0.3) });
      });
      const bytes = await doc.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `toolram-numbered-${file.name}`;
      a.click();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <label className="card flex flex-col items-center !py-8 cursor-pointer hover:!border-[color:var(--color-brand)]">
        <Upload className="w-8 h-8 text-[color:var(--color-fg-soft)] mb-2" />
        <div className="font-medium">{file ? file.name : "Selecciona un PDF"}</div>
        <input type="file" accept="application/pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      </label>
      <div>
        <label className="block text-xs uppercase mb-1">Posición</label>
        <select className="input" value={position} onChange={(e) => setPosition(e.target.value as never)}>
          <option value="bottom-center">Abajo centro</option>
          <option value="bottom-right">Abajo derecha</option>
          <option value="top-right">Arriba derecha</option>
        </select>
      </div>
      <button onClick={apply} disabled={busy || !file} className="btn btn-primary w-full">
        <Download className="w-4 h-4" /> {busy ? "Procesando…" : "Agregar números y descargar"}
      </button>
    </div>
  );
}
