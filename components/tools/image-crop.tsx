"use client";
import { useEffect, useRef, useState } from "react";
import { Download, Crop } from "lucide-react";
import { DropZone, PrimaryAction, StepBar, SuccessPanel } from "./ui/drop-zone";

const ACCENT = "oklch(0.65 0.2 130)";

type Box = { x: number; y: number; w: number; h: number };

export function ImageCrop() {
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [imgSize, setImgSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [box, setBox] = useState<Box>({ x: 10, y: 10, w: 80, h: 80 });
  const [out, setOut] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ kind: "move" | "tl" | "tr" | "bl" | "br"; startX: number; startY: number; orig: Box } | null>(null);

  function load(f: File) {
    setFile(f);
    const url = URL.createObjectURL(f);
    setSrc(url);
    setOut(null);
    setBox({ x: 10, y: 10, w: 80, h: 80 });
    const img = new Image();
    img.onload = () => setImgSize({ w: img.width, h: img.height });
    img.src = url;
  }
  function reset() { setFile(null); setSrc(null); setOut(null); }

  useEffect(() => {
    function onMove(e: PointerEvent) {
      if (!drag.current || !wrapRef.current) return;
      const r = wrapRef.current.getBoundingClientRect();
      const dx = ((e.clientX - drag.current.startX) / r.width) * 100;
      const dy = ((e.clientY - drag.current.startY) / r.height) * 100;
      const o = drag.current.orig;
      let next: Box = { ...o };
      if (drag.current.kind === "move") next = { ...o, x: clamp(o.x + dx, 0, 100 - o.w), y: clamp(o.y + dy, 0, 100 - o.h) };
      else if (drag.current.kind === "br") next = { ...o, w: clamp(o.w + dx, 5, 100 - o.x), h: clamp(o.h + dy, 5, 100 - o.y) };
      else if (drag.current.kind === "tl") next = { x: clamp(o.x + dx, 0, o.x + o.w - 5), y: clamp(o.y + dy, 0, o.y + o.h - 5), w: o.w - dx, h: o.h - dy };
      else if (drag.current.kind === "tr") next = { ...o, y: clamp(o.y + dy, 0, o.y + o.h - 5), w: clamp(o.w + dx, 5, 100 - o.x), h: o.h - dy };
      else if (drag.current.kind === "bl") next = { ...o, x: clamp(o.x + dx, 0, o.x + o.w - 5), w: o.w - dx, h: clamp(o.h + dy, 5, 100 - o.y) };
      setBox(next);
    }
    function onUp() { drag.current = null; }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); };
  }, []);

  function startDrag(kind: "move" | "tl" | "tr" | "bl" | "br", e: React.PointerEvent) {
    drag.current = { kind, startX: e.clientX, startY: e.clientY, orig: { ...box } };
    e.stopPropagation();
  }

  function setRatio(ratio: number | null) {
    if (!ratio) return;
    const cur = box.w / box.h;
    if (cur > ratio) {
      const newW = box.h * ratio;
      setBox({ ...box, w: newW });
    } else {
      const newH = box.w / ratio;
      setBox({ ...box, h: newH });
    }
  }

  async function apply() {
    if (!src) return;
    const img = new Image();
    img.src = src;
    await new Promise((r) => (img.onload = r));
    const cx = (box.x / 100) * img.width;
    const cy = (box.y / 100) * img.height;
    const cw = (box.w / 100) * img.width;
    const ch = (box.h / 100) * img.height;
    const canvas = document.createElement("canvas");
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, cx, cy, cw, ch, 0, 0, cw, ch);
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/png"));
    if (blob) setOut(URL.createObjectURL(blob));
  }

  function download() {
    if (!out) return;
    const a = document.createElement("a");
    a.href = out;
    a.download = "recortada.png";
    a.click();
  }

  if (out) {
    return (
      <SuccessPanel onReset={reset}>
        <img src={out} alt="recortada" className="max-w-full mx-auto rounded-lg shadow-2xl" />
        <button onClick={download} className="w-full py-4 rounded-2xl font-bold text-white text-lg shadow-xl flex items-center justify-center gap-2" style={{ background: ACCENT }}>
          <Download className="w-5 h-5" /> Descargar PNG
        </button>
      </SuccessPanel>
    );
  }

  return (
    <div className="space-y-6">
      <StepBar step={file ? 2 : 1} total={2} />
      {!file ? (
        <DropZone accept="image/*" onFile={load} icon="image" accentColor={ACCENT} buttonLabel="Seleccionar imagen" />
      ) : (
        <>
          <DropZone accept="image/*" onFile={load} loaded={{ name: file.name, size: file.size, thumbnail: src ?? undefined }} onClear={reset} icon="image" accentColor={ACCENT} />

          <div className="card !p-4 space-y-3">
            <div className="text-sm font-semibold">Proporción rápida</div>
            <div className="flex flex-wrap gap-2">
              {[{ l: "Libre", r: null }, { l: "1:1", r: 1 }, { l: "4:3", r: 4 / 3 }, { l: "16:9", r: 16 / 9 }, { l: "3:4", r: 3 / 4 }, { l: "9:16", r: 9 / 16 }].map((o) => (
                <button key={o.l} onClick={() => setRatio(o.r)} className="px-3 py-1.5 rounded-lg border-2 border-[color:var(--color-border)] text-sm font-medium hover:border-[oklch(0.65_0.2_130)] transition">{o.l}</button>
              ))}
            </div>
          </div>

          <div className="card !p-0 overflow-hidden">
            <div ref={wrapRef} className="relative inline-block max-w-full select-none mx-auto block bg-[color:var(--color-bg-soft)]">
              {src && <img src={src} alt="src" className="block max-w-full mx-auto" draggable={false} />}
              <div
                className="absolute border-2 cursor-move"
                style={{ borderColor: ACCENT, left: `${box.x}%`, top: `${box.y}%`, width: `${box.w}%`, height: `${box.h}%`, boxShadow: "0 0 0 9999px rgba(0,0,0,0.55)" }}
                onPointerDown={(e) => startDrag("move", e)}
              >
                {(["tl", "tr", "bl", "br"] as const).map((c) => (
                  <span key={c} onPointerDown={(e) => startDrag(c, e)} className="absolute w-4 h-4 bg-white border-2 rounded-full" style={{ borderColor: ACCENT, left: c.includes("l") ? -8 : "auto", right: c.includes("r") ? -8 : "auto", top: c.includes("t") ? -8 : "auto", bottom: c.includes("b") ? -8 : "auto", cursor: c === "tl" || c === "br" ? "nwse-resize" : "nesw-resize" }} />
                ))}
              </div>
            </div>
            <div className="px-4 py-3 border-t border-[color:var(--color-border)] text-center text-sm">
              Recorte: <strong>{Math.round((box.w / 100) * imgSize.w)} × {Math.round((box.h / 100) * imgSize.h)} px</strong>
            </div>
          </div>

          <PrimaryAction onClick={apply} color={ACCENT}>
            <Crop className="w-5 h-5" /> Aplicar recorte
          </PrimaryAction>
        </>
      )}
    </div>
  );
}

function clamp(n: number, min: number, max: number) { return Math.max(min, Math.min(max, n)); }
