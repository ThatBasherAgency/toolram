"use client";
import { useEffect, useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Download, Eraser } from "lucide-react";

export function PdfSign() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(50);
  const [size, setSize] = useState(150);
  const [out, setOut] = useState<string | null>(null);
  const [signed, setSigned] = useState(false);
  const sigRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const c = sigRef.current;
    if (!c) return;
    c.width = c.offsetWidth * 2;
    c.height = c.offsetHeight * 2;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.scale(2, 2);
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.offsetWidth, c.offsetHeight);
  }, []);

  function pos(e: React.PointerEvent) {
    const r = sigRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }
  function start(e: React.PointerEvent) {
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
  function end() {
    drawing.current = false;
    last.current = null;
  }
  function clearSig() {
    const c = sigRef.current!;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);
    setSigned(false);
  }

  async function loadPdf(f: File) {
    setFile(f);
    setOut(null);
    const buf = await f.arrayBuffer();
    const doc = await PDFDocument.load(buf);
    setPageCount(doc.getPageCount());
    setPageIndex(1);
  }

  async function apply() {
    if (!file || !signed) return;
    const buf = await file.arrayBuffer();
    const doc = await PDFDocument.load(buf);

    const sigCanvas = sigRef.current!;
    const tmp = document.createElement("canvas");
    tmp.width = sigCanvas.width;
    tmp.height = sigCanvas.height;
    const tctx = tmp.getContext("2d")!;
    tctx.drawImage(sigCanvas, 0, 0);
    const imgData = tmp.toDataURL("image/png");
    const pngBytes = Uint8Array.from(atob(imgData.split(",")[1]), (c) => c.charCodeAt(0));
    const png = await doc.embedPng(pngBytes);

    const page = doc.getPage(pageIndex - 1);
    const { width, height } = page.getSize();
    const scaledW = size;
    const scaledH = size * (png.height / png.width);
    const xPx = (posX / 100) * (width - scaledW);
    const yPx = height - ((posY / 100) * (height - scaledH)) - scaledH;
    page.drawImage(png, { x: xPx, y: yPx, width: scaledW, height: scaledH });

    const bytes = await doc.save();
    const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
    setOut(URL.createObjectURL(blob));
  }

  function download() {
    if (!out) return;
    const a = document.createElement("a");
    a.href = out;
    a.download = (file?.name.replace(/\.pdf$/i, "") || "documento") + "-firmado.pdf";
    a.click();
  }

  return (
    <div className="space-y-4">
      <div className="card !p-3 text-xs">🔒 Firma 100% local. El PDF y tu firma jamás se suben a internet — pdf-lib procesa todo en tu navegador.</div>
      <input type="file" accept="application/pdf" className="input" onChange={(e) => e.target.files?.[0] && loadPdf(e.target.files[0])} />
      {file && (
        <>
          <div className="card !p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase text-[color:var(--color-fg-soft)]">Dibujá tu firma</span>
              <button onClick={clearSig} className="btn btn-ghost h-7 !px-2 text-xs"><Eraser className="w-3 h-3" /> Limpiar</button>
            </div>
            <canvas
              ref={sigRef}
              className="w-full h-40 bg-white rounded border border-[color:var(--color-border)] cursor-crosshair touch-none"
              onPointerDown={start}
              onPointerMove={move}
              onPointerUp={end}
              onPointerLeave={end}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <label className="block text-sm">Página ({pageCount} disponibles)<input type="number" min={1} max={pageCount} className="input mt-1" value={pageIndex} onChange={(e) => setPageIndex(Math.max(1, Math.min(pageCount, +e.target.value || 1)))} /></label>
            <label className="block text-sm">Tamaño firma (px)<input type="range" min={50} max={400} step={10} className="w-full mt-3" value={size} onChange={(e) => setSize(+e.target.value)} /><div className="text-xs text-[color:var(--color-fg-soft)]">{size}px de ancho</div></label>
            <label className="block text-sm">Posición horizontal ({posX}%)<input type="range" min={0} max={100} className="w-full mt-3" value={posX} onChange={(e) => setPosX(+e.target.value)} /></label>
            <label className="block text-sm">Posición vertical ({posY}%)<input type="range" min={0} max={100} className="w-full mt-3" value={posY} onChange={(e) => setPosY(+e.target.value)} /></label>
          </div>
          <button onClick={apply} disabled={!signed} className="btn btn-primary w-full !py-3">✍️ Aplicar firma al PDF</button>
        </>
      )}
      {out && (
        <div className="card !p-3 text-center space-y-2">
          <div className="text-sm text-[color:var(--color-success)]">✓ PDF firmado correctamente</div>
          <button onClick={download} className="btn btn-primary w-full"><Download className="w-4 h-4" /> Descargar PDF firmado</button>
        </div>
      )}
    </div>
  );
}
