"use client";
import { useEffect, useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Download, Eraser, PenTool, Plus } from "lucide-react";
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
  const [signaturePngs, setSignaturePngs] = useState<string[]>([]);
  const [out, setOut] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const sigRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const pageContainerRef = useRef<HTMLDivElement | null>(null);

  async function loadFile(f: File) {
    setFile(f);
    setOut(null);
    setElements([]);
    setLoading("Generando preview de páginas…");
    try {
      const t = await renderPdfThumbnails(f, 0.5);
      setThumbs(t);
      setActivePage(1);
    } finally { setLoading(null); }
  }

  function reset() { setFile(null); setThumbs([]); setElements([]); setOut(null); setSignaturePngs([]); }

  useEffect(() => {
    const c = sigRef.current;
    if (!c) return;
    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      c.width = c.offsetWidth * dpr;
      c.height = c.offsetHeight * dpr;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#0f172a";
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, c.offsetWidth, c.offsetHeight);
    };
    setup();
    window.addEventListener("resize", setup);
    return () => window.removeEventListener("resize", setup);
  }, [file]);

  function pos(e: React.PointerEvent) { const r = sigRef.current!.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  function start(e: React.PointerEvent) { sigRef.current?.setPointerCapture(e.pointerId); drawing.current = true; last.current = pos(e); }
  function move(e: React.PointerEvent) {
    if (!drawing.current || !last.current) return;
    const p = pos(e);
    const ctx = sigRef.current!.getContext("2d")!;
    ctx.beginPath(); ctx.moveTo(last.current.x, last.current.y); ctx.lineTo(p.x, p.y); ctx.stroke();
    last.current = p;
  }
  function end() { drawing.current = false; last.current = null; }
  function clearSig() {
    const c = sigRef.current!;
    const ctx = c.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width / dpr, c.height / dpr);
  }

  function saveSignature() {
    const c = sigRef.current!;
    const tmp = document.createElement("canvas");
    tmp.width = c.width; tmp.height = c.height;
    tmp.getContext("2d")!.drawImage(c, 0, 0);
    const dataUrl = tmp.toDataURL("image/png");
    setSignaturePngs((arr) => [...arr, dataUrl]);
    clearSig();
  }

  function placeOnPage(xPct: number, yPct: number) {
    const sig = signaturePngs[signaturePngs.length - 1];
    if (!sig) return;
    const id = `sig-${Date.now()}`;
    setElements((arr) => [...arr, {
      id, page: activePage, type: "signature",
      xPct: Math.max(0, xPct - 12), yPct: Math.max(0, yPct - 6),
      wPct: 24, hPct: 12,
      data: { kind: "signature", dataUrl: sig } satisfies SignatureData
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
    return <UploadHero toolName="Firmar PDF" subtitle="Subí tu PDF, dibujá tu firma y arrastrala a donde quieras. 100% en tu navegador." accept="application/pdf" onFile={loadFile} buttonLabel="Seleccionar PDF" accent={ACCENT} illustration="pdf" />;
  }

  if (out) {
    return (
      <div className="fixed inset-0 z-50 bg-[color:var(--color-bg)] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-[color:var(--color-success)] text-white flex items-center justify-center text-5xl font-bold shadow-2xl">✓</div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">¡PDF firmado!</h2>
            <p className="text-[color:var(--color-fg-soft)] mt-2">Tu PDF se firmó correctamente con {elements.length} firma{elements.length === 1 ? "" : "s"}.</p>
          </div>
          <button onClick={download} className="w-full py-4 rounded-2xl font-bold text-white text-lg shadow-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition" style={{ background: ACCENT }}>
            <Download className="w-5 h-5" /> Descargar PDF firmado
          </button>
          <button onClick={reset} className="text-sm font-semibold text-[color:var(--color-fg-soft)] hover:underline">↻ Firmar otro PDF</button>
        </div>
      </div>
    );
  }

  const lastSig = signaturePngs[signaturePngs.length - 1];

  const sidebar = (
    <div className="space-y-5">
      <div>
        <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] mb-2 flex items-center gap-2"><PenTool className="w-3.5 h-3.5" /> Tu firma</div>
        <div className="rounded-xl border-2 bg-white p-1 shadow-inner" style={{ borderColor: "var(--color-border)" }}>
          <canvas ref={sigRef} className="block w-full h-32 rounded-lg cursor-crosshair touch-none" style={{ background: "white" }} onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end} />
        </div>
        <div className="flex justify-between gap-2 mt-2">
          <button onClick={clearSig} className="text-xs font-medium hover:text-[color:var(--color-danger)] inline-flex items-center gap-1"><Eraser className="w-3.5 h-3.5" /> Limpiar</button>
          <button onClick={saveSignature} className="text-xs font-bold inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-white" style={{ background: ACCENT }}><Plus className="w-3.5 h-3.5" /> Guardar firma</button>
        </div>
      </div>

      {signaturePngs.length > 0 && (
        <div>
          <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] mb-2">Tus firmas guardadas</div>
          <div className="grid grid-cols-2 gap-2">
            {signaturePngs.map((url, i) => (
              <div key={i} className={`rounded-lg border-2 bg-white p-1 ${i === signaturePngs.length - 1 ? "shadow-md" : ""}`} style={{ borderColor: i === signaturePngs.length - 1 ? ACCENT : "var(--color-border)" }}>
                <img src={url} alt={`firma ${i + 1}`} className="w-full h-12 object-contain" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl p-3 border" style={{ background: `${ACCENT}08`, borderColor: `${ACCENT}30` }}>
        <div className="text-xs font-bold mb-1" style={{ color: ACCENT }}>{lastSig ? "→ Click en la página" : "1. Dibujá tu firma"}</div>
        <div className="text-xs text-[color:var(--color-fg-soft)] leading-relaxed">
          {lastSig ? "Hacé click en la página donde querés colocar la firma. Después arrastrala o cambiá de tamaño con la esquina." : "Dibujá tu firma arriba con mouse, dedo o stylus, después tocá \"Guardar firma\"."}
        </div>
      </div>

      {elements.length > 0 && (
        <div className="text-xs text-[color:var(--color-fg-soft)] text-center pt-2 border-t border-[color:var(--color-border)]">{elements.length} firma{elements.length === 1 ? "" : "s"} colocada{elements.length === 1 ? "" : "s"}</div>
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
    <PdfEditor
      toolName="Firmar PDF"
      fileName={file.name}
      thumbs={thumbs}
      activePage={activePage}
      onActivePageChange={setActivePage}
      pageContent={pageContent}
      onPageClick={lastSig ? placeOnPage : undefined}
      pageContainerRef={pageContainerRef}
      sidebar={sidebar}
      actionLabel={`Firmar y descargar${elements.length > 0 ? ` (${elements.length})` : ""}`}
      onAction={apply}
      actionDisabled={elements.length === 0}
      accent={ACCENT}
      loading={loading}
      onClose={reset}
    />
  );
}
