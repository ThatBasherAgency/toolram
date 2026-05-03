"use client";
import { useEffect, useRef, useState } from "react";
import { ScanLine, Upload, Camera, Copy, Check, ExternalLink } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 280)";

interface JsQRResult { data: string; location: { topLeftCorner: { x: number; y: number }; topRightCorner: { x: number; y: number }; bottomLeftCorner: { x: number; y: number }; bottomRightCorner: { x: number; y: number } } }
type JsQRFn = (data: Uint8ClampedArray, w: number, h: number) => JsQRResult | null;

export function QrScanner() {
  const [mode, setMode] = useState<"upload" | "camera">("upload");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const jsQRRef = useRef<JsQRFn | null>(null);

  async function loadJsQR(): Promise<JsQRFn> {
    if (jsQRRef.current) return jsQRRef.current;
    const mod = await import("jsqr");
    jsQRRef.current = mod.default as JsQRFn;
    return jsQRRef.current;
  }

  async function scanImage(file: File) {
    setError(null);
    setResult(null);
    try {
      const jsQR = await loadJsQR();
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current!;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, img.width, img.height);
        const code = jsQR(data.data, data.width, data.height);
        if (code) setResult(code.data);
        else setError("No se detectó código QR en la imagen");
        URL.revokeObjectURL(url);
      };
      img.src = url;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error escaneando");
    }
  }

  async function startCamera() {
    setError(null);
    setResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      const video = videoRef.current!;
      video.srcObject = stream;
      await video.play();
      setScanning(true);
      const jsQR = await loadJsQR();
      const tick = () => {
        if (!scanning && !streamRef.current) return;
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          const canvas = canvasRef.current!;
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(video, 0, 0);
          const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(data.data, data.width, data.height);
          if (code && code.data) {
            setResult(code.data);
            stopCamera();
            return;
          }
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "No se pudo acceder a la cámara");
    }
  }

  function stopCamera() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setScanning(false);
  }

  useEffect(() => () => stopCamera(), []);

  async function copy() {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  const isUrl = result?.match(/^https?:\/\//);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Lector / Escáner de Códigos QR</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Escanea QR desde la cámara o subiendo una imagen · 100% en tu navegador.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button onClick={() => { stopCamera(); setMode("upload"); }} className="px-4 py-3 rounded-xl text-sm font-bold inline-flex items-center justify-center gap-2 transition" style={mode === "upload" ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}><Upload className="w-4 h-4" /> Subir imagen</button>
          <button onClick={() => setMode("camera")} className="px-4 py-3 rounded-xl text-sm font-bold inline-flex items-center justify-center gap-2 transition" style={mode === "camera" ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}><Camera className="w-4 h-4" /> Usar cámara</button>
        </div>

        {mode === "upload" && (
          <label className="block rounded-2xl border-2 border-dashed border-[color:var(--color-border)] bg-[color:var(--color-bg-soft)] p-8 text-center cursor-pointer hover:border-[color:var(--color-brand)]">
            <Upload className="w-10 h-10 mx-auto mb-2 text-[color:var(--color-fg-soft)]" />
            <div className="font-bold mb-1">Subir QR de imagen</div>
            <div className="text-xs text-[color:var(--color-fg-soft)]">JPG, PNG, WebP</div>
            <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && scanImage(e.target.files[0])} className="hidden" />
          </label>
        )}

        {mode === "camera" && (
          <div>
            <div className="rounded-2xl bg-black overflow-hidden mb-3" style={{ aspectRatio: "1/1" }}>
              <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
            </div>
            {!scanning ? (
              <button onClick={startCamera} className="w-full px-4 py-3 rounded-xl text-white font-bold" style={{ background: ACCENT }}>Iniciar cámara</button>
            ) : (
              <button onClick={stopCamera} className="w-full px-4 py-3 rounded-xl bg-[color:var(--color-danger)]/15 text-[color:var(--color-danger)] font-bold">Detener cámara</button>
            )}
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {result && (
        <div className="rounded-3xl p-6 text-white shadow-2xl mb-6" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
          <div className="text-xs uppercase opacity-80 tracking-widest mb-2 inline-flex items-center gap-1.5"><ScanLine className="w-3 h-3" /> Contenido decodificado</div>
          <div className="font-mono text-base md:text-lg break-all bg-white/15 backdrop-blur p-3 rounded-lg">{result}</div>
          <div className="flex gap-2 mt-3">
            <button onClick={copy} className="px-3 py-1.5 rounded-md bg-white/20 text-xs font-bold inline-flex items-center gap-1">{copied ? <><Check className="w-3 h-3" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar</>}</button>
            {isUrl && <a href={result} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-md bg-white/20 text-xs font-bold inline-flex items-center gap-1">Abrir <ExternalLink className="w-3 h-3" /></a>}
          </div>
        </div>
      )}
      {error && <div className="rounded-2xl bg-[color:var(--color-danger)]/10 border border-[color:var(--color-danger)] p-4 mb-6 text-[color:var(--color-danger)] text-sm">{error}</div>}

      <AdSlot slot="qrscan_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">🔒 Privacidad</strong>
        Todo el escaneo ocurre en tu navegador con jsQR (~50KB). La imagen y el contenido del QR NUNCA se envían a ningún servidor. Para usar la cámara, tu navegador te pedirá permiso explícito.
      </div>
    </div>
  );
}
