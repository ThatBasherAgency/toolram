"use client";

let pdfjsRef: typeof import("pdfjs-dist") | null = null;

async function getPdfjs() {
  if (pdfjsRef) return pdfjsRef;
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  pdfjsRef = pdfjs;
  return pdfjs;
}

export async function renderPdfThumbnails(file: File, scale = 0.5, onProgress?: (i: number, total: number) => void): Promise<string[]> {
  const pdfjs = await getPdfjs();
  const buf = await file.arrayBuffer();
  const doc = await pdfjs.getDocument({ data: buf }).promise;
  const out: string[] = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d")!;
    await page.render({ canvasContext: ctx, viewport, canvas } as Parameters<typeof page.render>[0]).promise;
    out.push(canvas.toDataURL("image/jpeg", 0.7));
    onProgress?.(i, doc.numPages);
  }
  return out;
}

export async function renderPdfFirstPage(file: File, scale = 0.4): Promise<string> {
  const pdfjs = await getPdfjs();
  const buf = await file.arrayBuffer();
  const doc = await pdfjs.getDocument({ data: buf }).promise;
  const page = await doc.getPage(1);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  const ctx = canvas.getContext("2d")!;
  await page.render({ canvasContext: ctx, viewport, canvas } as Parameters<typeof page.render>[0]).promise;
  return canvas.toDataURL("image/jpeg", 0.8);
}
