"use client";
import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";

type Box = { x: number; y: number; w: number; h: number };

export function ImageCrop() {
  const [src, setSrc] = useState<string | null>(null);
  const [box, setBox] = useState<Box>({ x: 10, y: 10, w: 80, h: 80 });
  const [out, setOut] = useState<string | null>(null);
  const [imgSize, setImgSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ kind: "move" | "tl" | "tr" | "bl" | "br"; startX: number; startY: number; orig: Box } | null>(null);

  function load(file: File) {
    setSrc(URL.createObjectURL(file));
    setOut(null);
    const img = new Image();
    img.onload = () => setImgSize({ w: img.width, h: img.height });
    img.src = URL.createObjectURL(file);
  }

  useEffect(() => {
    function onMove(e: PointerEvent) {
      if (!drag.current || !wrapRef.current) return;
      const r = wrapRef.current.getBoundingClientRect();
      const dx = ((e.clientX - drag.current.startX) / r.width) * 100;
      const dy = ((e.clientY - drag.current.startY) / r.height) * 100;
      const o = drag.current.orig;
      let next: Box = { ...o };
      if (drag.current.kind === "move") {
        next = { ...o, x: clamp(o.x + dx, 0, 100 - o.w), y: clamp(o.y + dy, 0, 100 - o.h) };
      } else if (drag.current.kind === "br") {
        next = { ...o, w: clamp(o.w + dx, 5, 100 - o.x), h: clamp(o.h + dy, 5, 100 - o.y) };
      } else if (drag.current.kind === "tl") {
        next = { x: clamp(o.x + dx, 0, o.x + o.w - 5), y: clamp(o.y + dy, 0, o.y + o.h - 5), w: o.w - dx, h: o.h - dy };
      } else if (drag.current.kind === "tr") {
        next = { ...o, y: clamp(o.y + dy, 0, o.y + o.h - 5), w: clamp(o.w + dx, 5, 100 - o.x), h: o.h - dy };
      } else if (drag.current.kind === "bl") {
        next = { ...o, x: clamp(o.x + dx, 0, o.x + o.w - 5), w: o.w - dx, h: clamp(o.h + dy, 5, 100 - o.y) };
      }
      setBox(next);
    }
    function onUp() { drag.current = null; }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  function startDrag(kind: "move" | "tl" | "tr" | "bl" | "br", e: React.PointerEvent) {
    drag.current = { kind, startX: e.clientX, startY: e.clientY, orig: { ...box } };
    e.stopPropagation();
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

  return (
    <div className="space-y-4">
      <div className="card !p-3 text-xs">🔒 Recorte 100% local. Arrastrá la caja o las esquinas.</div>
      <input type="file" accept="image/*" className="input" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])} />
      {src && (
        <>
          <div ref={wrapRef} className="relative inline-block max-w-full select-none">
            <img src={src} alt="src" className="block max-w-full" draggable={false} />
            <div
              className="absolute border-2 border-[color:var(--color-brand)] cursor-move"
              style={{ left: `${box.x}%`, top: `${box.y}%`, width: `${box.w}%`, height: `${box.h}%`, boxShadow: "0 0 0 9999px rgba(0,0,0,0.5)" }}
              onPointerDown={(e) => startDrag("move", e)}
            >
              {(["tl", "tr", "bl", "br"] as const).map((c) => (
                <span
                  key={c}
                  onPointerDown={(e) => startDrag(c, e)}
                  className="absolute w-3 h-3 bg-white border-2 border-[color:var(--color-brand)] rounded-sm"
                  style={{
                    left: c.includes("l") ? -6 : "auto",
                    right: c.includes("r") ? -6 : "auto",
                    top: c.includes("t") ? -6 : "auto",
                    bottom: c.includes("b") ? -6 : "auto",
                    cursor: c === "tl" || c === "br" ? "nwse-resize" : "nesw-resize"
                  }}
                />
              ))}
            </div>
          </div>
          <div className="text-xs text-[color:var(--color-fg-soft)]">Recorte: {Math.round((box.w / 100) * imgSize.w)} × {Math.round((box.h / 100) * imgSize.h)} px</div>
          <button onClick={apply} className="btn btn-primary w-full">✂️ Aplicar recorte</button>
        </>
      )}
      {out && (
        <div className="space-y-2">
          <img src={out} alt="recortada" className="max-w-full rounded border border-[color:var(--color-border)]" />
          <button onClick={download} className="btn btn-primary w-full"><Download className="w-4 h-4" /> Descargar</button>
        </div>
      )}
    </div>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
