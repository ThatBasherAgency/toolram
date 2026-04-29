"use client";
import { useState } from "react";
import { Upload, Download } from "lucide-react";

export function PdfWatermark() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("CONFIDENCIAL");
  const [opacity, setOpacity] = useState(0.3);
  const [size, setSize] = useState(60);
  const [busy, setBusy] = useState(false);

  async function apply() {
    if (!file) return;
    setBusy(true);
    try {
      const { PDFDocument, rgb, StandardFonts, degrees } = await import("pdf-lib");
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      doc.getPages().forEach((p) => {
        const { width, height } = p.getSize();
        p.drawText(text, {
          x: width / 2 - (text.length * size) / 4,
          y: height / 2,
          size,
          font,
          color: rgb(0.7, 0.1, 0.1),
          opacity,
          rotate: degrees(-30)
        });
      });
      const bytes = await doc.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `toolram-watermark-${file.name}`;
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
        <label className="block text-xs uppercase mb-1">Texto del marca de agua</label>
        <input className="input" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs uppercase mb-1">Opacidad: {Math.round(opacity * 100)}%</label>
          <input type="range" min={0.1} max={1} step={0.05} value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="block text-xs uppercase mb-1">Tamaño: {size}pt</label>
          <input type="range" min={20} max={120} step={2} value={size} onChange={(e) => setSize(parseInt(e.target.value))} className="w-full" />
        </div>
      </div>
      <button onClick={apply} disabled={busy || !file || !text} className="btn btn-primary w-full">
        <Download className="w-4 h-4" /> {busy ? "Aplicando…" : "Aplicar marca y descargar"}
      </button>
    </div>
  );
}
