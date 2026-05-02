"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";

type Props = {
  xPct: number;
  yPct: number;
  wPct: number;
  hPct: number;
  selected: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onSelect: () => void;
  onMove: (xPct: number, yPct: number) => void;
  onResize: (wPct: number, hPct: number) => void;
  onDelete: () => void;
  accent: string;
  children: ReactNode;
};

export function DraggableElement({ xPct, yPct, wPct, hPct, selected, containerRef, onSelect, onMove, onResize, onDelete, accent, children }: Props) {
  const dragRef = useRef<{ kind: "move" | "resize"; startX: number; startY: number; ox: number; oy: number; ow: number; oh: number } | null>(null);
  const [, force] = useState(0);

  useEffect(() => {
    function onPointerMove(e: PointerEvent) {
      const d = dragRef.current;
      const c = containerRef.current;
      if (!d || !c) return;
      const rect = c.getBoundingClientRect();
      const dxPct = ((e.clientX - d.startX) / rect.width) * 100;
      const dyPct = ((e.clientY - d.startY) / rect.height) * 100;
      if (d.kind === "move") {
        onMove(clamp(d.ox + dxPct, 0, 100 - wPct), clamp(d.oy + dyPct, 0, 100 - hPct));
      } else {
        onResize(clamp(d.ow + dxPct, 5, 100 - xPct), clamp(d.oh + dyPct, 3, 100 - yPct));
      }
      force((n) => n + 1);
    }
    function onPointerUp() { dragRef.current = null; }
    if (dragRef.current) {
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      return () => {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
      };
    }
  });

  function startMove(e: React.PointerEvent) {
    e.stopPropagation();
    onSelect();
    dragRef.current = { kind: "move", startX: e.clientX, startY: e.clientY, ox: xPct, oy: yPct, ow: wPct, oh: hPct };
    force((n) => n + 1);
  }
  function startResize(e: React.PointerEvent) {
    e.stopPropagation();
    dragRef.current = { kind: "resize", startX: e.clientX, startY: e.clientY, ox: xPct, oy: yPct, ow: wPct, oh: hPct };
    force((n) => n + 1);
  }

  return (
    <div
      onPointerDown={startMove}
      className="absolute group cursor-move"
      style={{
        left: `${xPct}%`,
        top: `${yPct}%`,
        width: `${wPct}%`,
        height: `${hPct}%`,
        outline: selected ? `2px solid ${accent}` : "2px dashed transparent",
        outlineOffset: 2,
        background: selected ? `${accent}10` : "transparent",
        transition: "outline-color 0.1s, background 0.1s"
      }}
    >
      <div className="w-full h-full pointer-events-none">{children}</div>

      {selected && (
        <>
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="absolute -top-3 -right-3 w-6 h-6 rounded-full text-white flex items-center justify-center shadow-lg z-10"
            style={{ background: accent }}
            aria-label="Eliminar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <span
            onPointerDown={startResize}
            className="absolute -bottom-1.5 -right-1.5 w-4 h-4 bg-white border-2 rounded-sm cursor-nwse-resize z-10 shadow"
            style={{ borderColor: accent }}
          />
        </>
      )}
    </div>
  );
}

function clamp(n: number, min: number, max: number) { return Math.max(min, Math.min(max, n)); }
