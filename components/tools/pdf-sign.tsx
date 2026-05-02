"use client";
import { useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Download, PenTool, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { renderPdfThumbnails } from "./ui/pdf-thumb";
import { UploadHero } from "./editor/UploadHero";
import { PdfEditor } from "./editor/PdfEditor";
import { DraggableElement } from "./editor/DraggableElement";
import { SignatureModal } from "./editor/SignatureModal";
import type { EditorElement, SignatureData } from "./editor/types";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 30)";

export function PdfSign() {
  const [file, setFile] = useState<File | null>(null);
  const [thumbs, setThumbs] = useState<string[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [elements, setElements] = useState<EditorElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [savedSignatures, setSavedSignatures] = useState<string[]>([]);
  const [out, setOut] = useState<string | null>(null);
  const [outFileName, setOutFileName] = useState("");
  const [loading, setLoading] = useState<string | null>(null);
  const [signModalOpen, setSignModalOpen] = useState(false);
  const pageContainerRef = useRef<HTMLDivElement | null>(null);

  async function loadFile(f: File) {
    setFile(f); setOut(null); setElements([]);
    setLoading("Generando preview de páginas…");
    try {
      const t = await renderPdfThumbnails(f, 0.5);
      setThumbs(t); setActivePage(1);
    } finally { setLoading(null); }
  }
  function reset() { setFile(null); setThumbs([]); setElements([]); setOut(null); setSavedSignatures([]); setSelectedId(null); }

  function handleSaveSignature(dataUrl: string) {
    setSavedSignatures((arr) => [...arr, dataUrl]);
    placeSignatureOnPage(dataUrl);
    setSignModalOpen(false);
  }

  function placeSignatureOnPage(dataUrl: string) {
    const id = `sig-${Date.now()}`;
    setElements((arr) => [...arr, {
      id, page: activePage, type: "signature",
      xPct: 35, yPct: 75,
      wPct: 30, hPct: 12,
      data: { kind: "signature", dataUrl } satisfies SignatureData
    }]);
    setSelectedId(id);
  }

  function updateEl(id: string, patch: Partial<EditorElement>) {
    setElements((arr) => arr.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }

  async function apply() {
    if (!file || elements.length === 0) return;
    setLoading("Firmando PDF…");
    try {
      const buf = await file.arrayBuffer();
      const doc = await PDFDocument.load(buf);
      for (const el of elements) {
        if (el.type !== "signature") continue;
        const sig = el.data as SignatureData;
        const pngBytes = Uint8Array.from(atob(sig.dataUrl.split(",")[1]), (c) => c.charCodeAt(0));
        const png = await doc.embedPng(pngBytes);
        const page = doc.getPage(el.page - 1);
        const { width, height } = page.getSize();
        const w = (el.wPct / 100) * width;
        const h = (el.hPct / 100) * height;
        const x = (el.xPct / 100) * width;
        const y = height - (el.yPct / 100) * height - h;
        page.drawImage(png, { x, y, width: w, height: h });
      }
      const bytes = await doc.save();
      const fileName = (file?.name.replace(/\.pdf$/i, "") || "documento") + "-firmado.pdf";
      setOut(URL.createObjectURL(new Blob([bytes as BlobPart], { type: "application/pdf" })));
      setOutFileName(fileName);
    } finally { setLoading(null); }
  }

  function download() {
    if (!out) return;
    const a = document.createElement("a");
    a.href = out;
    a.download = outFileName;
    a.click();
  }

  if (!file) {
    return <UploadHero toolName="Firmar PDF" subtitle="Subí tu PDF, firmá una vez (dibujar, subir imagen o escribir tu nombre) y arrastrá la firma a donde quieras." accept="application/pdf" onFile={loadFile} buttonLabel="Seleccionar PDF" accent={ACCENT} illustration="pdf" />;
  }

  if (out) {
    return <SuccessPage onDownload={download} onReset={reset} fileName={outFileName} signaturesCount={elements.length} />;
  }

  const sidebar = (
    <div className="space-y-5">
      <button
        onClick={() => setSignModalOpen(true)}
        className="w-full py-4 rounded-xl text-white font-bold shadow-md hover:shadow-lg hover:scale-[1.02] transition flex items-center justify-center gap-2"
        style={{ background: ACCENT }}
      >
        <PenTool className="w-5 h-5" /> {savedSignatures.length === 0 ? "Crear firma" : "Crear nueva firma"}
      </button>

      {savedSignatures.length > 0 && (
        <div>
          <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] mb-2">Tus firmas guardadas</div>
          <div className="space-y-2">
            {savedSignatures.map((url, i) => (
              <button
                key={i}
                onClick={() => placeSignatureOnPage(url)}
                className="w-full rounded-lg border-2 border-[color:var(--color-border)] bg-white p-2 hover:border-[oklch(0.55_0.22_30)] hover:shadow transition flex items-center gap-2"
              >
                <img src={url} alt={`firma ${i + 1}`} className="h-10 flex-1 object-contain" />
                <Plus className="w-4 h-4 text-[color:var(--color-fg-soft)]" />
              </button>
            ))}
          </div>
          <p className="text-[10px] text-[color:var(--color-fg-soft)] mt-2 text-center">Click para colocar otra copia en la página actual</p>
        </div>
      )}

      <div className="rounded-xl p-4 border" style={{ background: `${ACCENT}08`, borderColor: `${ACCENT}30` }}>
        <div className="text-xs font-bold mb-2" style={{ color: ACCENT }}>
          {elements.length === 0 ? "1 · Crear tu firma" : "Arrastrá la firma"}
        </div>
        <div className="text-xs text-[color:var(--color-fg-soft)] leading-relaxed">
          {elements.length === 0
            ? "Tocá el botón rojo de arriba. Podés dibujar, subir un PNG o escribir tu nombre con tipografía manuscrita."
            : "Arrastrá la firma con el mouse. Esquina inferior derecha para cambiar tamaño. Usá el zoom (esquina superior derecha del visor) para precisión."}
        </div>
      </div>

      {elements.length > 0 && (
        <div className="text-xs text-[color:var(--color-fg-soft)] text-center pt-2 border-t border-[color:var(--color-border)]">
          {elements.length} firma{elements.length === 1 ? "" : "s"} colocada{elements.length === 1 ? "" : "s"} en {new Set(elements.map((e) => e.page)).size} página{new Set(elements.map((e) => e.page)).size === 1 ? "" : "s"}
        </div>
      )}
    </div>
  );

  const elementsThisPage = elements.filter((e) => e.page === activePage);

  const pageContent = thumbs[activePage - 1] ? (
    <>
      <img src={thumbs[activePage - 1]} alt={`Página ${activePage}`} className="block max-h-[80vh] w-auto" draggable={false} />
      {elementsThisPage.map((el) => (
        <DraggableElement
          key={el.id}
          xPct={el.xPct} yPct={el.yPct} wPct={el.wPct} hPct={el.hPct}
          selected={selectedId === el.id}
          containerRef={pageContainerRef}
          onSelect={() => setSelectedId(el.id)}
          onMove={(x, y) => updateEl(el.id, { xPct: x, yPct: y })}
          onResize={(w, h) => updateEl(el.id, { wPct: w, hPct: h })}
          onDelete={() => setElements((arr) => arr.filter((e) => e.id !== el.id))}
          accent={ACCENT}
        >
          {el.type === "signature" && <img src={(el.data as SignatureData).dataUrl} alt="firma" className="w-full h-full object-contain" draggable={false} />}
        </DraggableElement>
      ))}
    </>
  ) : null;

  return (
    <>
      <PdfEditor
        toolName="Firmar PDF"
        fileName={file.name}
        thumbs={thumbs}
        activePage={activePage}
        onActivePageChange={setActivePage}
        pageContent={pageContent}
        pageContainerRef={pageContainerRef}
        sidebar={sidebar}
        actionLabel={`Firmar y descargar${elements.length > 0 ? ` (${elements.length})` : ""}`}
        onAction={apply}
        actionDisabled={elements.length === 0}
        accent={ACCENT}
        loading={loading}
        onClose={reset}
      />

      <SignatureModal open={signModalOpen} onClose={() => setSignModalOpen(false)} onSave={handleSaveSignature} accent={ACCENT} />
    </>
  );
}

function SuccessPage({ onDownload, onReset, fileName, signaturesCount }: { onDownload: () => void; onReset: () => void; fileName: string; signaturesCount: number }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto rounded-full bg-[color:var(--color-success)] text-white flex items-center justify-center text-4xl font-bold shadow-xl mb-5">✓</div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">¡PDF firmado!</h1>
        <p className="text-base text-[color:var(--color-fg-soft)]">Tu PDF se firmó con {signaturesCount} firma{signaturesCount === 1 ? "" : "s"} y está listo para descargar.</p>
      </div>

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-6 md:p-8 border border-[color:var(--color-border)] mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-16 rounded-lg flex items-center justify-center text-white shadow flex-shrink-0" style={{ background: ACCENT }}>
            <span className="text-xs font-bold">PDF</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold truncate">{fileName}</div>
            <div className="text-xs text-[color:var(--color-fg-soft)]">Firmado · listo para descargar</div>
          </div>
        </div>
        <button onClick={onDownload} className="w-full py-4 rounded-2xl font-bold text-white text-lg shadow-2xl flex items-center justify-center gap-2 hover:scale-[1.01] transition" style={{ background: ACCENT }}>
          <Download className="w-5 h-5" /> Descargar PDF firmado
        </button>
        <button onClick={onReset} className="block mx-auto mt-3 text-sm font-semibold text-[color:var(--color-fg-soft)] hover:underline">↻ Firmar otro PDF</button>
      </div>

      <AdSlot slot="signature_success_inline" format="auto" minHeight={250} className="mb-10" />

      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4">Continuá con otra herramienta</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { slug: "editar-pdf", name: "Editar PDF", desc: "Agregá texto a tu PDF", emoji: "✏️" },
            { slug: "comprimir-pdf", name: "Comprimir PDF", desc: "Reduce el peso", emoji: "🗜️" },
            { slug: "unir-pdf", name: "Unir PDF", desc: "Combiná varios PDFs", emoji: "🔗" },
            { slug: "dividir-pdf", name: "Dividir PDF", desc: "Extraé páginas", emoji: "✂️" },
            { slug: "pdf-a-jpg", name: "PDF a JPG", desc: "Cada página como imagen", emoji: "🖼️" },
            { slug: "marca-agua-pdf", name: "Marca de agua", desc: "Estampá tu marca", emoji: "💧" }
          ].map((t) => (
            <Link key={t.slug} href={`/${t.slug}`} className="group rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] hover:border-[oklch(0.55_0.22_30)] hover:shadow-md transition p-4 flex items-center gap-3">
              <div className="text-3xl">{t.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm">{t.name}</div>
                <div className="text-xs text-[color:var(--color-fg-soft)]">{t.desc}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-[color:var(--color-fg-soft)] group-hover:translate-x-1 transition" />
            </Link>
          ))}
        </div>
      </div>

      <AdSlot slot="signature_success_bottom" format="auto" minHeight={120} className="mb-8" />
    </div>
  );
}
