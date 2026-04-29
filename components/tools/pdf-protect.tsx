"use client";
import { useState } from "react";
import { Upload, Download } from "lucide-react";

export function PdfProtect() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info] = useState("Esta herramienta agrega un mensaje de propiedad y protección visible. Para encriptación con contraseña real (AES-256) necesitamos enviar al servidor; estamos trabajando en eso para fase 2.");

  async function protect() {
    if (!file || !password) return;
    setBusy(true);
    setError("");
    try {
      const { PDFDocument, rgb, StandardFonts } = await import("pdf-lib");
      const doc = await PDFDocument.load(await file.arrayBuffer());
      doc.setTitle(`Protected - ${file.name}`);
      doc.setSubject("Protected document");
      doc.setKeywords([`password-hash:${btoa(password).slice(0, 8)}`]);
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      doc.getPages().forEach((p) => {
        const { width } = p.getSize();
        p.drawText("⚠ Documento marcado como confidencial", {
          x: 30, y: 10, size: 8, font, color: rgb(0.7, 0, 0)
        });
      });
      const bytes = await doc.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `toolram-protected-${file.name}`;
      a.click();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="card !p-3 text-xs text-[color:var(--color-warning)] !border-[color:var(--color-warning)]">
        ⚠ {info}
      </div>
      <label className="card flex flex-col items-center !py-8 cursor-pointer hover:!border-[color:var(--color-brand)]">
        <Upload className="w-8 h-8 text-[color:var(--color-fg-soft)] mb-2" />
        <div className="font-medium">{file ? file.name : "Selecciona un PDF"}</div>
        <input type="file" accept="application/pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      </label>
      <div>
        <label className="block text-xs uppercase mb-1">Contraseña / clave</label>
        <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {error && <div className="text-sm text-[color:var(--color-danger)]">{error}</div>}
      <button onClick={protect} disabled={busy || !file || !password} className="btn btn-primary w-full">
        <Download className="w-4 h-4" /> {busy ? "Procesando…" : "Marcar y descargar"}
      </button>
    </div>
  );
}
