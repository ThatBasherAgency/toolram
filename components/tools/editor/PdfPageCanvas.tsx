"use client";
import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

type Props = {
  file: File;
  pageNumber: number;
  zoom: number;
  onSize?: (w: number, h: number) => void;
};

const docCache = new WeakMap<File, Promise<PDFDocumentProxy>>();

async function loadDoc(file: File) {
  const cached = docCache.get(file);
  if (cached) return cached;
  const promise = (async () => {
    const pdfjs = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
    return pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  })();
  docCache.set(file, promise);
  return promise;
}

export function PdfPageCanvas({ file, pageNumber, zoom, onSize }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const renderTaskRef = useRef<{ cancel: () => void } | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const doc = await loadDoc(file);
        if (cancelled) return;
        const page = await doc.getPage(pageNumber);
        if (cancelled) return;

        renderTaskRef.current?.cancel();

        const dpr = window.devicePixelRatio || 1;
        const oversample = 1.5;
        const renderScale = zoom * dpr * oversample;
        const viewport = page.getViewport({ scale: renderScale });

        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);

        const displayW = viewport.width / (dpr * oversample);
        const displayH = viewport.height / (dpr * oversample);
        canvas.style.width = `${displayW}px`;
        canvas.style.height = `${displayH}px`;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const task = page.render({ canvasContext: ctx, viewport, canvas } as Parameters<typeof page.render>[0]);
        renderTaskRef.current = task as unknown as { cancel: () => void };
        await task.promise;
        if (cancelled) return;

        setSize({ w: displayW, h: displayH });
        setLoading(false);
        onSize?.(displayW, displayH);
      } catch (e) {
        if (!cancelled && (e as Error).name !== "RenderingCancelledException") {
          console.error("PDF render error:", e);
        }
      }
    })();
    return () => { cancelled = true; renderTaskRef.current?.cancel(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, pageNumber, zoom]);

  return (
    <div className="relative" style={size ? { width: size.w, height: size.h } : { minWidth: 400, minHeight: 500 }}>
      <canvas ref={canvasRef} className="block" style={{ imageRendering: "auto" }} />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <div className="w-8 h-8 rounded-full border-3 border-[color:var(--color-brand)] border-t-transparent animate-spin" />
        </div>
      )}
    </div>
  );
}
