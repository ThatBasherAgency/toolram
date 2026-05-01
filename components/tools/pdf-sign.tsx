"use client";
import { useEffect, useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Download, Eraser, PenTool } from "lucide-react";
import { DropZone, PrimaryAction, ProcessingBar, StepBar, SuccessPanel } from "./ui/drop-zone";
import { renderPdfThumbnails } from "./ui/pdf-thumb";

const ACCENT = "oklch(0.55 0.22 30)";

export function PdfSign() {
  const [file, setFile] = useState<File | null>(null);
  const [thumbs, setThumbs] = useState<string[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [posX, setPosX] = useState(60);
  const [posY, setPosY] = useState(80);
  const [size, setSize] = useState(150);
  const [out, setOut] = useState<string | null>(null);
  const [signed, setSigned] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [loadingThumbs, setLoadingThumbs] = useState(false);
  const sigRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const c = sigRef.current;
    if (!c || !file) return;
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

  function pos(e: React.PointerEvent) {
    const r = sigRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }
  function start(e: React.PointerEvent) {
    sigRef.current?.setPointerCapture(e.pointerId);
    drawing.current = true;
    last.current = pos(e);
    setSigned(true);
  }
  function move(e: React.PointerEvent) {
    if (!drawing.current || !last.current) return;
    const p = pos(e);
    const ctx = sigRef.current!.getContext("2d")!;
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
  }
  function end() { drawing.current = false; last.current = null; }
  function clearSig() {
    const c = sigRef.current!;
    const ctx = c.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width / dpr, c.height / dpr);
    setSigned(false);
  }

  async function loadFile(f: File) {
    setFile(f);
    setOut(null);
    setSigned(false);
    setLoadingThumbs(true);
    try {
      const t = await renderPdfThumbnails(f, 0.4);
      setThumbs(t);
      setPageIndex(1);
    } finally {
      setLoadingThumbs(false);
    }
  }

  function reset() {
    setFile(null);
    setThumbs([]);
    setOut(null);
    setSigned(false);
  }

  async function apply() {
    if (!file || !signed) return;
    setProcessing(true);
    try {
      const buf = await file.arrayBuffer();
      const doc = await PDFDocument.load(buf);
      const sigCanvas = sigRef.current!;
      const tmp = document.createElement("canvas");
      tmp.width = sigCanvas.width;
      tmp.height = sigCanvas.height;
      tmp.getContext("2d")!.drawImage(sigCanvas, 0, 0);
      const imgData = tmp.toDataURL("image/png");
      const pngBytes = Uint8Array.from(atob(imgData.split(",")[1]), (c) => c.charCodeAt(0));
      const png = await doc.embedPng(pngBytes);
      const page = doc.getPage(pageIndex - 1);
      const { width, height } = page.getSize();
      const scaledW = size;
      const scaledH = size * (png.height / png.width);
      const xPx = (posX / 100) * (width - scaledW);
      const yPx = height - (posY / 100) * (height - scaledH) - scaledH;
      page.drawImage(png, { x: xPx, y: yPx, width: scaledW, height: scaledH });
      const bytes = await doc.save();
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      setOut(URL.createObjectURL(blob));
    } finally {
      setProcessing(false);
    }
  }

  function download() {
    if (!out) return;
    const a = document.createElement("a");
    a.href = out;
    a.download = (file?.name.replace(/\.pdf$/i, "") || "documento") + "-firmado.pdf";
    a.click();
  }

  if (out) {
    return (
      <SuccessPanel onReset={reset}>
        <div className="flex justify-center">
          {thumbs[pageIndex - 1] && (
            <div className="relative inline-block">
              <img src={thumbs[pageIndex - 1]} alt="" className="max-h-72 rounded-lg shadow-2xl" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="rounded-full bg-[color:var(--color-success)] text-white px-4 py-2 font-bold shadow-lg">✓ Firmado</div>
              </div>
            </div>
          )}
        </div>
        <button onClick={download} className="w-full py-4 rounded-2xl font-bold text-white text-lg shadow-xl flex items-center justify-center gap-2" style={{ background: ACCENT }}>
          <Download className="w-5 h-5" /> Descargar PDF firmado
        </button>
      </SuccessPanel>
    );
  }

  return (
    <div className="space-y-6">
      <StepBar step={file ? 2 : 1} />

      {!file ? (
        <DropZone accept="application/pdf" onFile={loadFile} illustration="pdf" accentColor={ACCENT} buttonLabel="Seleccionar PDF" helpText="🔒 100% privado · pdf-lib + Canvas en tu navegador" />
      ) : (
        <>
          <DropZone accept="application/pdf" onFile={loadFile} loaded={{ name: file.name, size: file.size, thumbnail: thumbs[0] }} onClear={reset} illustration="pdf" accentColor={ACCENT} />

          {loadingThumbs && <ProcessingBar label="Generando preview de páginas…" />}

          {thumbs.length > 0 && (
            <>
              <div className="space-y-3">
                <div className="text-sm font-semibold flex items-center gap-2"><PenTool className="w-4 h-4" /> 1 · Dibujá tu firma</div>
                <div className="rounded-2xl border-2 bg-white p-1 shadow-inner" style={{ borderColor: signed ? ACCENT : "var(--color-border)" }}>
                  <canvas
                    ref={sigRef}
                    className="block w-full h-44 rounded-xl cursor-crosshair touch-none"
                    style={{ background: "white" }}
                    onPointerDown={start}
                    onPointerMove={move}
                    onPointerUp={end}
                    onPointerCancel={end}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-[color:var(--color-fg-soft)]">{signed ? "✓ Firma lista" : "Firmá con mouse, dedo o stylus"}</div>
                  <button onClick={clearSig} className="text-sm font-medium hover:text-[color:var(--color-danger)] inline-flex items-center gap-1"><Eraser className="w-4 h-4" /> Limpiar</button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-semibold">2 · Elegí la página</div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {thumbs.map((t, i) => (
                    <button key={i} onClick={() => setPageIndex(i + 1)} className={`relative rounded-lg overflow-hidden border-2 transition shadow-sm hover:shadow-md ${pageIndex === i + 1 ? "ring-4" : ""}`} style={{ borderColor: pageIndex === i + 1 ? ACCENT : "var(--color-border)" }}>
                      <img src={t} alt={`p${i + 1}`} className="w-full block" />
                      <div className="absolute bottom-0 left-0 right-0 text-xs font-semibold py-0.5 text-center text-white" style={{ background: pageIndex === i + 1 ? ACCENT : "rgba(0,0,0,0.6)" }}>{i + 1}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-semibold">3 · Posicioná la firma en la página</div>
                <div className="card !p-0 overflow-hidden">
                  <div className="relative inline-block w-full bg-[color:var(--color-bg-soft)] flex justify-center p-4">
                    <div className="relative">
                      <img src={thumbs[pageIndex - 1]} alt="" className="block max-h-96 max-w-full" />
                      <div
                        className="absolute border-2 border-dashed pointer-events-none flex items-center justify-center text-xs font-bold"
                        style={{
                          borderColor: ACCENT,
                          background: `${ACCENT}25`,
                          left: `${(posX / 100) * 80}%`,
                          top: `${posY}%`,
                          width: `${(size / 4)}%`,
                          height: `${(size / 6)}%`,
                          color: ACCENT
                        }}
                      >FIRMA</div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-[color:var(--color-border)] grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <label className="block text-sm">Tamaño<input type="range" min={50} max={400} step={10} className="w-full mt-2 accent-[oklch(0.55_0.22_30)]" value={size} onChange={(e) => setSize(+e.target.value)} /><span className="text-xs text-[color:var(--color-fg-soft)]">{size}px</span></label>
                    <label className="block text-sm">Horizontal<input type="range" min={0} max={100} className="w-full mt-2 accent-[oklch(0.55_0.22_30)]" value={posX} onChange={(e) => setPosX(+e.target.value)} /><span className="text-xs text-[color:var(--color-fg-soft)]">{posX}%</span></label>
                    <label className="block text-sm">Vertical<input type="range" min={0} max={100} className="w-full mt-2 accent-[oklch(0.55_0.22_30)]" value={posY} onChange={(e) => setPosY(+e.target.value)} /><span className="text-xs text-[color:var(--color-fg-soft)]">{posY}%</span></label>
                  </div>
                </div>
              </div>

              {processing && <ProcessingBar label="Aplicando firma al PDF…" />}

              <PrimaryAction onClick={apply} disabled={!signed || processing} color={ACCENT}>
                <PenTool className="w-5 h-5" /> Firmar PDF
              </PrimaryAction>
            </>
          )}
        </>
      )}
    </div>
  );
}
