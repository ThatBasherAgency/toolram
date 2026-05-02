"use client";
import { useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import Link from "next/link";
import { PdfPageCanvas } from "./PdfPageCanvas";
import { AdSlot } from "@/components/ads/ad-slot";

type Props = {
  toolName: string;
  file: File;
  thumbs: string[];
  activePage: number;
  onActivePageChange: (n: number) => void;
  renderOverlay?: () => ReactNode;
  onPageClick?: (xPct: number, yPct: number) => void;
  sidebar: ReactNode;
  actionLabel: string;
  onAction: () => void;
  actionDisabled?: boolean;
  accent: string;
  loading?: string | null;
  onClose?: () => void;
  pageContainerRef?: React.RefObject<HTMLDivElement | null>;
};

export function PdfEditor({ toolName, file, thumbs, activePage, onActivePageChange, renderOverlay, onPageClick, sidebar, actionLabel, onAction, actionDisabled, accent, loading, onClose, pageContainerRef }: Props) {
  const internalRef = useRef<HTMLDivElement>(null);
  const containerRef = pageContainerRef || internalRef;
  const [zoom, setZoom] = useState(1);

  function handlePageClick(e: React.MouseEvent) {
    if (!onPageClick) return;
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    const xPct = ((e.clientX - r.left) / r.width) * 100;
    const yPct = ((e.clientY - r.top) / r.height) * 100;
    onPageClick(xPct, yPct);
  }

  const zoomIn = () => setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(0.5, +(z - 0.25).toFixed(2)));
  const resetZoom = () => setZoom(1);

  return (
    <div className="fixed inset-0 z-50 bg-[color:var(--color-bg)] flex flex-col">
      <header className="flex items-center justify-between px-3 md:px-5 h-14 border-b border-[color:var(--color-border)] bg-white dark:bg-[color:var(--color-bg-soft)] flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/" className="text-sm font-medium hover:opacity-70 inline-flex items-center gap-1 flex-shrink-0">
            <ChevronLeft className="w-4 h-4" /> Toolram
          </Link>
          <span className="text-[color:var(--color-fg-soft)] hidden md:inline">·</span>
          <span className="font-bold text-base hidden md:inline" style={{ color: accent }}>{toolName}</span>
        </div>
        <div className="text-sm truncate max-w-[40%] text-[color:var(--color-fg-soft)] mx-2">{file.name}</div>
        {onClose && <button onClick={onClose} className="text-sm font-medium px-3 py-1 rounded-lg hover:bg-[color:var(--color-bg-soft)]">Cerrar</button>}
      </header>

      <div className="flex-1 flex overflow-hidden min-h-0">
        <aside className="hidden md:flex flex-col w-[140px] lg:w-[180px] bg-[color:var(--color-bg-soft)] border-r border-[color:var(--color-border)] overflow-y-auto p-3 gap-2 flex-shrink-0">
          {thumbs.map((t, i) => (
            <button
              key={i}
              onClick={() => onActivePageChange(i + 1)}
              className="relative rounded-lg overflow-hidden border-2 transition shadow-sm hover:shadow-md flex-shrink-0"
              style={{ borderColor: activePage === i + 1 ? accent : "transparent" }}
            >
              <img src={t} alt={`Página ${i + 1}`} className="block w-full bg-white" />
              <div className="absolute bottom-1 right-1 text-[10px] font-bold px-1.5 py-0.5 rounded text-white shadow" style={{ background: activePage === i + 1 ? accent : "rgba(0,0,0,0.7)" }}>
                {i + 1}
              </div>
            </button>
          ))}
        </aside>

        <main className="flex-1 overflow-auto bg-[oklch(0.94_0_0)] dark:bg-[oklch(0.12_0_0)] flex items-start justify-center p-4 md:p-8 min-w-0 relative">
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full bg-white/95 dark:bg-[color:var(--color-bg-soft)]/95 shadow-md backdrop-blur px-1.5 py-1 border border-[color:var(--color-border)]">
            <button onClick={zoomOut} disabled={zoom <= 0.5} className="w-8 h-8 rounded-full hover:bg-[color:var(--color-bg-soft)] disabled:opacity-30 flex items-center justify-center" aria-label="Reducir zoom">
              <ZoomOut className="w-4 h-4" />
            </button>
            <button onClick={resetZoom} className="text-xs font-bold tabular-nums px-2 min-w-[3rem]" aria-label="Reset zoom">
              {Math.round(zoom * 100)}%
            </button>
            <button onClick={zoomIn} disabled={zoom >= 3} className="w-8 h-8 rounded-full hover:bg-[color:var(--color-bg-soft)] disabled:opacity-30 flex items-center justify-center" aria-label="Aumentar zoom">
              <ZoomIn className="w-4 h-4" />
            </button>
            <span className="w-px h-5 bg-[color:var(--color-border)] mx-0.5" />
            <button onClick={resetZoom} className="w-8 h-8 rounded-full hover:bg-[color:var(--color-bg-soft)] flex items-center justify-center" aria-label="Ajustar">
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div
            ref={containerRef}
            className="relative inline-block shadow-2xl bg-white max-w-full"
            onClick={handlePageClick}
            style={{ cursor: onPageClick ? "crosshair" : "default" }}
          >
            <PdfPageCanvas file={file} pageNumber={activePage} zoom={zoom} />
            {renderOverlay?.()}
          </div>
        </main>

        <aside className="hidden lg:flex flex-col w-[300px] bg-white dark:bg-[color:var(--color-bg-soft)] border-l border-[color:var(--color-border)] overflow-y-auto flex-shrink-0">
          <div className="p-5 flex-1">{sidebar}</div>
          <div className="p-3 border-t border-[color:var(--color-border)]">
            <AdSlot slot="editor_sidebar" format="auto" minHeight={250} />
          </div>
        </aside>
      </div>

      <div className="md:hidden border-t border-[color:var(--color-border)] bg-[color:var(--color-bg-soft)] overflow-x-auto p-2 flex gap-2 flex-shrink-0">
        {thumbs.map((t, i) => (
          <button key={i} onClick={() => onActivePageChange(i + 1)} className="relative rounded overflow-hidden border-2 flex-shrink-0 w-14" style={{ borderColor: activePage === i + 1 ? accent : "transparent" }}>
            <img src={t} alt="" className="block w-full bg-white" />
            <div className="absolute bottom-0 right-0 text-[9px] font-bold px-1 text-white" style={{ background: activePage === i + 1 ? accent : "rgba(0,0,0,0.7)" }}>{i + 1}</div>
          </button>
        ))}
      </div>

      <details className="lg:hidden border-t border-[color:var(--color-border)] bg-white dark:bg-[color:var(--color-bg-soft)]">
        <summary className="px-4 h-12 flex items-center justify-between font-semibold cursor-pointer">Opciones <span className="text-xl">⌃</span></summary>
        <div className="px-4 pb-4 max-h-[40vh] overflow-y-auto">{sidebar}</div>
      </details>

      <footer className="border-t border-[color:var(--color-border)] bg-white dark:bg-[color:var(--color-bg-soft)] px-3 md:px-5 py-3 flex items-center justify-between gap-3 flex-shrink-0">
        <div className="text-xs text-[color:var(--color-fg-soft)] hidden md:block">
          Página {activePage} de {thumbs.length} · zoom {Math.round(zoom * 100)}%
        </div>
        {loading ? (
          <div className="flex-1 md:flex-initial flex items-center justify-end gap-2 text-sm font-medium">
            <div className="w-4 h-4 rounded-full border-2 border-[color:var(--color-fg)] border-t-transparent animate-spin" />
            {loading}
          </div>
        ) : (
          <button
            onClick={onAction}
            disabled={actionDisabled}
            className="px-6 md:px-10 py-3 md:py-3.5 rounded-xl text-white font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:scale-[1.02] enabled:hover:shadow-xl transition flex-1 md:flex-initial text-base"
            style={{ background: actionDisabled ? "var(--color-fg-soft)" : accent }}
          >
            {actionLabel}
          </button>
        )}
      </footer>
    </div>
  );
}
