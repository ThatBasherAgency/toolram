"use client";
import { useState } from "react";
import { Upload, FileText } from "lucide-react";

export function PdfInfo() {
  const [info, setInfo] = useState<{ pages: number; size: string; title?: string; author?: string; created?: string; producer?: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function inspect(f: File) {
    setBusy(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.load(await f.arrayBuffer());
      setInfo({
        pages: doc.getPageCount(),
        size: `${(f.size / 1024).toFixed(1)} KB`,
        title: doc.getTitle() || undefined,
        author: doc.getAuthor() || undefined,
        created: doc.getCreationDate()?.toLocaleString("es-MX"),
        producer: doc.getProducer() || undefined
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <label className="card flex flex-col items-center !py-8 cursor-pointer hover:!border-[color:var(--color-brand)]">
        <Upload className="w-8 h-8 text-[color:var(--color-fg-soft)] mb-2" />
        <div className="font-medium">Selecciona un PDF para inspeccionar</div>
        <input type="file" accept="application/pdf" className="hidden" onChange={(e) => e.target.files?.[0] && inspect(e.target.files[0])} />
      </label>
      {busy && <div className="text-center text-sm text-[color:var(--color-fg-soft)]">Analizando…</div>}
      {info && (
        <div className="grid sm:grid-cols-2 gap-2 text-sm">
          <div className="card !p-3"><span className="text-xs uppercase text-[color:var(--color-fg-soft)] block">Páginas</span><strong className="text-2xl text-[color:var(--color-brand)]">{info.pages}</strong></div>
          <div className="card !p-3"><span className="text-xs uppercase text-[color:var(--color-fg-soft)] block">Tamaño</span><strong>{info.size}</strong></div>
          {info.title && <div className="card !p-3"><span className="text-xs uppercase text-[color:var(--color-fg-soft)] block">Título</span><strong>{info.title}</strong></div>}
          {info.author && <div className="card !p-3"><span className="text-xs uppercase text-[color:var(--color-fg-soft)] block">Autor</span><strong>{info.author}</strong></div>}
          {info.created && <div className="card !p-3"><span className="text-xs uppercase text-[color:var(--color-fg-soft)] block">Creado</span><strong>{info.created}</strong></div>}
          {info.producer && <div className="card !p-3"><span className="text-xs uppercase text-[color:var(--color-fg-soft)] block">Producido por</span><strong>{info.producer}</strong></div>}
        </div>
      )}
    </div>
  );
}
