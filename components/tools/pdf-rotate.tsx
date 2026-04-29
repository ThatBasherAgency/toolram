"use client";
import { useState } from "react";
import { Upload, Download, RotateCw } from "lucide-react";

export function PdfRotate() {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState<90 | 180 | 270>(90);
  const [busy, setBusy] = useState(false);

  async function rotate() {
    if (!file) return;
    setBusy(true);
    try {
      const { PDFDocument, degrees } = await import("pdf-lib");
      const doc = await PDFDocument.load(await file.arrayBuffer());
      doc.getPages().forEach((p) => p.setRotation(degrees(angle)));
      const bytes = await doc.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `toolram-rotated-${file.name}`;
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
        <label className="block text-xs uppercase mb-1">Grados de rotación</label>
        <div className="flex gap-2">
          {[90, 180, 270].map((deg) => (
            <button key={deg} onClick={() => setAngle(deg as never)} className={`btn flex-1 ${angle === deg ? "btn-primary" : "btn-ghost"}`}>
              <RotateCw className="w-4 h-4" /> {deg}°
            </button>
          ))}
        </div>
      </div>
      <button onClick={rotate} disabled={busy || !file} className="btn btn-primary w-full">
        <Download className="w-4 h-4" /> {busy ? "Procesando…" : "Rotar y descargar"}
      </button>
    </div>
  );
}
