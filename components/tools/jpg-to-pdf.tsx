"use client";
import { useState } from "react";
import { Upload, Download, X } from "lucide-react";

export function JpgToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);

  function add(list: FileList | null) {
    if (!list) return;
    setFiles((p) => [...p, ...Array.from(list).filter((f) => /^image\/(jpeg|png)$/.test(f.type))]);
  }
  function remove(i: number) { setFiles((f) => f.filter((_, idx) => idx !== i)); }

  async function convert() {
    if (!files.length) return;
    setBusy(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.create();
      for (const f of files) {
        const buf = await f.arrayBuffer();
        const img = f.type === "image/jpeg" ? await doc.embedJpg(buf) : await doc.embedPng(buf);
        const page = doc.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      const bytes = await doc.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "toolram-images.pdf";
      a.click();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <label className="card flex flex-col items-center !py-8 cursor-pointer hover:!border-[color:var(--color-brand)]">
        <Upload className="w-8 h-8 text-[color:var(--color-fg-soft)] mb-2" />
        <div className="font-medium">Selecciona JPG o PNG</div>
        <input type="file" multiple accept="image/jpeg,image/png" className="hidden" onChange={(e) => add(e.target.files)} />
      </label>
      {files.length > 0 && (
        <ul className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {files.map((f, i) => (
            <li key={i} className="card !p-2 relative">
              <img src={URL.createObjectURL(f)} alt={f.name} className="w-full h-20 object-cover rounded" />
              <button onClick={() => remove(i)} className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center">
                <X className="w-3 h-3" />
              </button>
              <div className="text-xs truncate mt-1">{f.name}</div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={convert} disabled={busy || !files.length} className="btn btn-primary w-full">
        <Download className="w-4 h-4" /> {busy ? "Convirtiendo…" : `Crear PDF con ${files.length} imagen(es)`}
      </button>
    </div>
  );
}
