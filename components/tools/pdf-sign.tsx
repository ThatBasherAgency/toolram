"use client";
import { useEffect, useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Download, Eraser, PenTool, Plus, X } from "lucide-react";
import { renderPdfThumbnails } from "./ui/pdf-thumb";
import { UploadHero } from "./editor/UploadHero";
import { PdfEditor } from "./editor/PdfEditor";
import { DraggableElement } from "./editor/DraggableElement";
import type { EditorElement, SignatureData } from "./editor/types";

const ACCENT = "oklch(0.55 0.22 30)";

export function PdfSign() {
  const [file, setFile] = useState<File | null>(null);
  const [thumbs, setThumbs] = useState<string[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [elements, setElements] = useState<EditorElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [savedSignatures, setSavedSignatures] = useState<string[]>([]);
  const [out, setOut] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [signModalOpen, setSignModalOpen] = useState(false);
  const [hasInk, setHasInk] = useState(false);
  const sigRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
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

  useEffect(() => {
    if (!signModalOpen) return;
    let raf = 0;
    const setup = () => {
      const c = sigRef.current;
      if (!c) { raf = requestAnimationFrame(setup); return; }
      const w = c.offsetWidth, h = c.offsetHeight;
      if (w === 0 || h === 0) { raf = requestAnimationFrame(setup); return; }
      const dpr = window.devicePixelRatio || 1;
      c.width = w * dpr;
      c.height = h * dpr;
      const ctx = c.getContext("2d")!;
      ctx.scale(dpr, dpr);
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#0f172a";
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, w, h);
      setHasInk(false);
    };
    setup();
    return () => cancelAnimationFrame(raf);
  }, [signModalOpen]);

  function pos(e: React.PointerEvent) { const r = sigRef.current!.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  function start(e: React.PointerEvent) { e.preventDefault(); sigRef.current?.setPointerCapture(e.pointerId); drawing.current = true; last.current = pos(e); setHasInk(true); }
  function move(e: React.PointerEvent) {
    if (!drawing.current || !last.current) return;
    e.preventDefault();
    const p = pos(e);
    const ctx = sigRef.current!.getContext("2d")!;
    ctx.beginPath(); ctx.moveTo(last.current.x, last.current.y); ctx.lineTo(p.x, p.y); ctx.stroke();
    last.current = p;
  }
  function end() { drawing.current = false; last.current = null; }

  function clearCanvas() {
    const c = sigRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width / dpr, c.height / dpr);
    setHasInk(false);
  }

  function openSignModal() {
    setSignModalOpen(true);
  }

  function cancelSignModal() {
    setSignModalOpen(false);
    setHasInk(false);
  }

  function saveAndPlace() {
    const c = sigRef.current;
    if (!c) return;
    const dataUrl = c.toDataURL("image/png");
    setSavedSignatures((arr) => [...arr, dataUrl]);
    placeSignatureOnPage(dataUrl);
    setSignModalOpen(false);
    setHasInk(false);
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

  function reuseSignature(dataUrl: string) {
    placeSignatureOnPage(dataUrl);
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
      setOut(URL.createObjectURL(new Blob([bytes as BlobPart], { type: "application/pdf" })));
    } finally { setLoading(null); }
  }

  function download() {
    if (!out) return;
    const a = document.createElement("a");
    a.href = out;
    a.download = (file?.name.replace(/\.pdf$/i, "") || "documento") + "-firmado.pdf";
    a.click();
  }

  if (!file) {
    return <UploadHero toolName="Firmar PDF" subtitle="Subí tu PDF, dibujá tu firma una vez y arrastrala donde quieras. 100% en tu navegador." accept="application/pdf" onFile={loadFile} buttonLabel="Seleccionar PDF" accent={ACCENT} illustration="pdf" />;
  }

  if (out) {
    return (
      <div className="fixed inset-0 z-50 bg-[color:var(--color-bg)] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-[color:var(--color-success)] text-white flex items-center justify-center text-5xl font-bold shadow-2xl">✓</div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">¡PDF firmado!</h2>
            <p className="text-[color:var(--color-fg-soft)] mt-2">Tu PDF se firmó con {elements.length} firma{elements.length === 1 ? "" : "s"}.</p>
          </div>
          <button onClick={download} className="w-full py-4 rounded-2xl font-bold text-white text-lg shadow-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition" style={{ background: ACCENT }}>
            <Download className="w-5 h-5" /> Descargar PDF firmado
          </button>
          <button onClick={reset} className="text-sm font-semibold text-[color:var(--color-fg-soft)] hover:underline">↻ Firmar otro PDF</button>
        </div>
      </div>
    );
  }

  const sidebar = (
    <div className="space-y-5">
      <button
        onClick={openSignModal}
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
                onClick={() => reuseSignature(url)}
                className="w-full rounded-lg border-2 border-[color:var(--color-border)] bg-white p-2 hover:border-[oklch(0.55_0.22_30)] hover:shadow transition flex items-center gap-2"
              >
                <img src={url} alt={`firma ${i + 1}`} className="h-10 flex-1 object-contain" />
                <Plus className="w-4 h-4 text-[color:var(--color-fg-soft)]" />
              </button>
            ))}
          </div>
          <p className="text-[10px] text-[color:var(--color-fg-soft)] mt-2 text-center">Click para colocar otra copia</p>
        </div>
      )}

      <div className="rounded-xl p-4 border" style={{ background: `${ACCENT}08`, borderColor: `${ACCENT}30` }}>
        <div className="text-xs font-bold mb-2" style={{ color: ACCENT }}>
          {elements.length === 0 ? "1 · Crear tu firma" : "Arrastrá la firma"}
        </div>
        <div className="text-xs text-[color:var(--color-fg-soft)] leading-relaxed">
          {elements.length === 0
            ? "Tocá el botón rojo para abrir el panel de firma. Dibujá con mouse, dedo o stylus."
            : "Mové la firma con el mouse a donde quieras. Usá la esquina inferior derecha para cambiar el tamaño."}
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

      {signModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in" onPointerDown={(e) => e.target === e.currentTarget && cancelSignModal()}>
          <div className="bg-white dark:bg-[color:var(--color-bg-soft)] rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-[color:var(--color-border)] flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2"><PenTool className="w-5 h-5" style={{ color: ACCENT }} /> Dibujá tu firma</h3>
              <button onClick={cancelSignModal} className="w-9 h-9 rounded-full hover:bg-[color:var(--color-bg-soft)] flex items-center justify-center"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="rounded-xl border-2 bg-white shadow-inner overflow-hidden" style={{ borderColor: hasInk ? ACCENT : "var(--color-border)" }}>
                <canvas
                  ref={sigRef}
                  className="block w-full cursor-crosshair touch-none"
                  style={{ background: "white", height: "240px" }}
                  onPointerDown={start}
                  onPointerMove={move}
                  onPointerUp={end}
                  onPointerCancel={end}
                  onPointerLeave={end}
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <button onClick={clearCanvas} disabled={!hasInk} className="font-medium hover:text-[color:var(--color-danger)] inline-flex items-center gap-1.5 disabled:opacity-40"><Eraser className="w-4 h-4" /> Limpiar</button>
                <span className="text-xs text-[color:var(--color-fg-soft)]">{hasInk ? "✓ Firma lista" : "Mouse, dedo o stylus"}</span>
              </div>
            </div>
            <div className="px-6 py-4 bg-[color:var(--color-bg-soft)] flex gap-3 justify-end">
              <button onClick={cancelSignModal} className="px-5 py-2.5 rounded-lg font-medium hover:bg-white">Cancelar</button>
              <button
                onClick={saveAndPlace}
                disabled={!hasInk}
                className="px-6 py-2.5 rounded-lg font-bold text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:scale-[1.02] transition"
                style={{ background: hasInk ? ACCENT : "var(--color-fg-soft)" }}
              >
                Guardar y colocar firma
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
