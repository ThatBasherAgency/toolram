"use client";
import { useEffect, useRef, useState } from "react";
import { X, PenTool, Upload, Type, Eraser } from "lucide-react";

type Tab = "draw" | "upload" | "type";

const FONTS = [
  { id: "Caveat", name: "Caveat", style: "'Caveat', cursive" },
  { id: "Dancing", name: "Dancing", style: "'Dancing Script', cursive" },
  { id: "GreatVibes", name: "Great Vibes", style: "'Great Vibes', cursive" },
  { id: "Sacramento", name: "Sacramento", style: "'Sacramento', cursive" },
  { id: "Pacifico", name: "Pacifico", style: "'Pacifico', cursive" },
  { id: "Allura", name: "Allura", style: "'Allura', cursive" }
];

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (dataUrl: string) => void;
  accent: string;
};

export function SignatureModal({ open, onClose, onSave, accent }: Props) {
  const [tab, setTab] = useState<Tab>("draw");
  const [hasInk, setHasInk] = useState(false);
  const [name, setName] = useState("Tu Nombre");
  const [font, setFont] = useState(FONTS[0]);
  const [color, setColor] = useState("#0f172a");
  const [uploadDataUrl, setUploadDataUrl] = useState<string | null>(null);
  const sigRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const lastRef = useRef<{ x: number; y: number } | null>(null);
  const hasInkRef = useRef(false);
  const colorRef = useRef(color);

  useEffect(() => { colorRef.current = color; }, [color]);

  useEffect(() => {
    if (!open || tab !== "draw") return;
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
      ctx.strokeStyle = colorRef.current;
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, w, h);
      hasInkRef.current = false;
      setHasInk(false);
    };
    setup();
    return () => cancelAnimationFrame(raf);
  }, [open, tab]);

  useEffect(() => {
    if (!open || tab !== "draw") return;
    const c = sigRef.current;
    if (!c) return;

    const getPos = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== undefined && e.button !== 0 && e.pointerType === "mouse") return;
      e.preventDefault();
      try { c.setPointerCapture(e.pointerId); } catch { /* ignore */ }
      drawingRef.current = true;
      lastRef.current = getPos(e);
      const ctx = c.getContext("2d")!;
      ctx.strokeStyle = colorRef.current;
      ctx.fillStyle = colorRef.current;
      ctx.beginPath();
      ctx.arc(lastRef.current.x, lastRef.current.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
      if (!hasInkRef.current) { hasInkRef.current = true; setHasInk(true); }
    };
    const onMove = (e: PointerEvent) => {
      if (!drawingRef.current || !lastRef.current) return;
      e.preventDefault();
      const p = getPos(e);
      const ctx = c.getContext("2d")!;
      ctx.beginPath();
      ctx.moveTo(lastRef.current.x, lastRef.current.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      lastRef.current = p;
    };
    const onUp = () => { drawingRef.current = false; lastRef.current = null; };

    c.addEventListener("pointerdown", onDown, { passive: false });
    c.addEventListener("pointermove", onMove, { passive: false });
    c.addEventListener("pointerup", onUp);
    c.addEventListener("pointercancel", onUp);
    c.addEventListener("pointerleave", onUp);
    return () => {
      c.removeEventListener("pointerdown", onDown);
      c.removeEventListener("pointermove", onMove);
      c.removeEventListener("pointerup", onUp);
      c.removeEventListener("pointercancel", onUp);
      c.removeEventListener("pointerleave", onUp);
    };
  }, [open, tab]);

  function clearDraw() {
    const c = sigRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width / dpr, c.height / dpr);
    hasInkRef.current = false;
    setHasInk(false);
  }

  function onUploadFile(file: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setUploadDataUrl(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSave() {
    if (tab === "draw") {
      const c = sigRef.current!;
      onSave(c.toDataURL("image/png"));
    } else if (tab === "upload" && uploadDataUrl) {
      onSave(uploadDataUrl);
    } else if (tab === "type") {
      const dataUrl = await renderTextSignature(name, font.style, color);
      onSave(dataUrl);
    }
    setHasInk(false);
    setUploadDataUrl(null);
  }

  const canSave =
    (tab === "draw" && hasInk) ||
    (tab === "upload" && !!uploadDataUrl) ||
    (tab === "type" && name.trim().length > 0);

  if (!open) return null;

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Dancing+Script:wght@600;700&family=Great+Vibes&family=Sacramento&family=Pacifico&family=Allura&display=swap" rel="stylesheet" />

      <div className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4" onPointerDown={(e) => e.target === e.currentTarget && onClose()}>
        <div className="bg-white dark:bg-[color:var(--color-bg-soft)] rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
          <div className="px-6 py-4 border-b border-[color:var(--color-border)] flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <PenTool className="w-5 h-5" style={{ color: accent }} /> Crear tu firma
            </h3>
            <button onClick={onClose} className="w-9 h-9 rounded-full hover:bg-[color:var(--color-bg-soft)] flex items-center justify-center"><X className="w-5 h-5" /></button>
          </div>

          <div className="px-6 pt-4">
            <div className="inline-flex rounded-xl bg-[color:var(--color-bg-soft)] p-1 gap-1">
              {([
                { id: "draw" as Tab, label: "Dibujar", icon: PenTool },
                { id: "upload" as Tab, label: "Subir imagen", icon: Upload },
                { id: "type" as Tab, label: "Escribir", icon: Type }
              ]).map((t) => {
                const Ico = t.icon;
                return (
                  <button key={t.id} onClick={() => setTab(t.id)} className={`px-3 md:px-4 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-1.5 transition ${tab === t.id ? "bg-white shadow text-[color:var(--color-fg)]" : "text-[color:var(--color-fg-soft)] hover:text-[color:var(--color-fg)]"}`} style={tab === t.id ? { color: accent } : undefined}>
                    <Ico className="w-4 h-4" /> {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6 space-y-4">
            {tab === "draw" && (
              <>
                <div className="rounded-xl border-2 bg-white shadow-inner overflow-hidden" style={{ borderColor: hasInk ? accent : "var(--color-border)" }}>
                  <canvas
                    ref={sigRef}
                    className="block w-full cursor-crosshair touch-none"
                    style={{ background: "white", height: "240px", touchAction: "none" }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium">Color:</span>
                    <div className="flex gap-1.5">
                      {["#0f172a", "#1e3a8a", "#7c2d12"].map((c) => (
                        <button key={c} onClick={() => setColor(c)} className={`w-7 h-7 rounded-full border-2 transition ${color === c ? "scale-110" : ""}`} style={{ background: c, borderColor: color === c ? accent : "transparent" }} />
                      ))}
                    </div>
                  </div>
                  <button onClick={clearDraw} disabled={!hasInk} className="text-sm font-medium hover:text-[color:var(--color-danger)] inline-flex items-center gap-1.5 disabled:opacity-40"><Eraser className="w-4 h-4" /> Limpiar</button>
                </div>
              </>
            )}

            {tab === "upload" && (
              <UploadSignature uploadDataUrl={uploadDataUrl} onFile={onUploadFile} onClear={() => setUploadDataUrl(null)} accent={accent} />
            )}

            {tab === "type" && (
              <>
                <input
                  className="w-full px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-white text-base focus:outline-none focus:border-[color:var(--color-brand)]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                />
                <div className="rounded-xl border-2 border-[color:var(--color-border)] bg-white p-6 flex items-center justify-center min-h-[140px] overflow-hidden">
                  <span style={{ fontFamily: font.style, color, fontSize: "56px", lineHeight: 1 }}>{name || "Tu Nombre"}</span>
                </div>
                <div>
                  <div className="text-xs font-medium mb-2 text-[color:var(--color-fg-soft)]">Estilo de letra</div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {FONTS.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFont(f)}
                        className={`rounded-lg border-2 px-3 py-2 text-center transition ${font.id === f.id ? "shadow-md" : "hover:bg-[color:var(--color-bg-soft)]"}`}
                        style={{ borderColor: font.id === f.id ? accent : "var(--color-border)", background: font.id === f.id ? `${accent}10` : undefined }}
                      >
                        <div style={{ fontFamily: f.style, fontSize: "28px", lineHeight: 1, color }}>{name || "Firma"}</div>
                        <div className="text-[10px] text-[color:var(--color-fg-soft)] mt-1 uppercase tracking-wide">{f.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium">Color:</span>
                  <div className="flex gap-1.5">
                    {["#0f172a", "#1e3a8a", "#7c2d12"].map((c) => (
                      <button key={c} onClick={() => setColor(c)} className={`w-7 h-7 rounded-full border-2 transition ${color === c ? "scale-110" : ""}`} style={{ background: c, borderColor: color === c ? accent : "transparent" }} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="px-6 py-4 bg-[color:var(--color-bg-soft)] flex gap-3 justify-end">
            <button onClick={onClose} className="px-5 py-2.5 rounded-lg font-medium hover:bg-white">Cancelar</button>
            <button
              onClick={handleSave}
              disabled={!canSave}
              className="px-6 py-2.5 rounded-lg font-bold text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:scale-[1.02] transition"
              style={{ background: canSave ? accent : "var(--color-fg-soft)" }}
            >
              Guardar y colocar firma
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function UploadSignature({ uploadDataUrl, onFile, onClear, accent }: { uploadDataUrl: string | null; onFile: (f: File) => void; onClear: () => void; accent: string }) {
  const ref = useRef<HTMLInputElement>(null);

  if (uploadDataUrl) {
    return (
      <div className="space-y-3">
        <div className="rounded-xl border-2 bg-white p-4 flex items-center justify-center min-h-[200px]" style={{ background: "repeating-conic-gradient(#e5e7eb 0% 25%, #f9fafb 0% 50%) 50% / 16px 16px", borderColor: accent }}>
          <img src={uploadDataUrl} alt="firma" className="max-h-44 max-w-full" />
        </div>
        <div className="flex justify-between items-center">
          <button onClick={() => ref.current?.click()} className="text-sm font-medium" style={{ color: accent }}>↻ Cambiar imagen</button>
          <button onClick={onClear} className="text-sm font-medium text-[color:var(--color-danger)]">Quitar</button>
          <input ref={ref} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => ref.current?.click()}
      className="w-full rounded-xl border-2 border-dashed bg-[color:var(--color-bg-soft)] hover:bg-white py-12 px-4 flex flex-col items-center gap-2 transition"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="w-14 h-14 rounded-full flex items-center justify-center text-white" style={{ background: accent }}>
        <Upload className="w-6 h-6" />
      </div>
      <div className="font-bold">Subí una imagen de tu firma</div>
      <div className="text-xs text-[color:var(--color-fg-soft)]">PNG transparente recomendado · JPG y WebP también funcionan</div>
      <input ref={ref} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
    </button>
  );
}

async function renderTextSignature(text: string, fontStyle: string, color: string): Promise<string> {
  if (typeof document !== "undefined" && "fonts" in document) {
    try {
      await (document as Document & { fonts: { ready: Promise<unknown> } }).fonts.ready;
    } catch { /* ignore */ }
  }
  const canvas = document.createElement("canvas");
  const dpr = 2;
  canvas.width = 800 * dpr;
  canvas.height = 200 * dpr;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);
  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.fillRect(0, 0, 800, 200);
  ctx.font = `120px ${fontStyle}`;
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(text, 400, 100);
  return canvas.toDataURL("image/png");
}
