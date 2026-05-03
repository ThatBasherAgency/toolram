"use client";
import { useEffect, useRef, useState } from "react";
import { RotateCw, RotateCcw, FlipHorizontal, FlipVertical, Download, Upload } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.65 0.2 145)";

export function ImageRotate() {
  const [src, setSrc] = useState<string | null>(null);
  const [angle, setAngle] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [name, setName] = useState("imagen");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const swap = angle === 90 || angle === 270;
      canvas.width = swap ? img.height : img.width;
      canvas.height = swap ? img.width : img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      ctx.restore();
    };
    img.src = src;
  }, [src, angle, flipH, flipV]);

  function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setName(f.name.replace(/\.[^.]+$/, ""));
    const r = new FileReader();
    r.onload = () => setSrc(r.result as string);
    r.readAsDataURL(f);
  }
  function download(format: "png" | "jpg") {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${name}-rotated.${format}`;
    link.href = canvas.toDataURL(`image/${format === "jpg" ? "jpeg" : "png"}`, 0.92);
    link.click();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Rotar y Voltear Imagen</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Rotación 90/180/270° + flip horizontal/vertical · Sin servidor, 100% en tu navegador.</p>
      </div>

      {!src ? (
        <label className="block rounded-3xl border-2 border-dashed border-[color:var(--color-border)] bg-[color:var(--color-bg-soft)] p-12 text-center cursor-pointer hover:border-[color:var(--color-brand)] mb-6">
          <Upload className="w-12 h-12 mx-auto mb-3 text-[color:var(--color-fg-soft)]" />
          <div className="text-lg font-bold mb-1">Subir imagen</div>
          <div className="text-sm text-[color:var(--color-fg-soft)]">PNG, JPG, WebP · sin límite de tamaño</div>
          <input type="file" accept="image/*" onChange={upload} className="hidden" />
        </label>
      ) : (
        <>
          <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg-soft)] p-6 mb-6 text-center">
            <canvas ref={canvasRef} className="max-w-full max-h-[60vh] mx-auto rounded-xl shadow-lg" />
          </div>

          <div className="grid md:grid-cols-2 gap-3 mb-6">
            <button onClick={() => setAngle((angle - 90 + 360) % 360)} className="px-4 py-3 rounded-xl bg-[color:var(--color-bg-soft)] font-bold inline-flex items-center justify-center gap-2"><RotateCcw className="w-4 h-4" /> Rotar -90°</button>
            <button onClick={() => setAngle((angle + 90) % 360)} className="px-4 py-3 rounded-xl bg-[color:var(--color-bg-soft)] font-bold inline-flex items-center justify-center gap-2"><RotateCw className="w-4 h-4" /> Rotar +90°</button>
            <button onClick={() => setFlipH(!flipH)} className="px-4 py-3 rounded-xl font-bold inline-flex items-center justify-center gap-2" style={flipH ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}><FlipHorizontal className="w-4 h-4" /> Flip horizontal</button>
            <button onClick={() => setFlipV(!flipV)} className="px-4 py-3 rounded-xl font-bold inline-flex items-center justify-center gap-2" style={flipV ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}><FlipVertical className="w-4 h-4" /> Flip vertical</button>
          </div>

          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] block mb-2">Ángulo actual: {angle}°</span>
            <input type="range" min="0" max="360" step="90" value={angle} onChange={(e) => setAngle(+e.target.value)} className="w-full max-w-md" />
          </div>

          <div className="grid md:grid-cols-3 gap-2 mb-6">
            <button onClick={() => download("png")} className="px-4 py-3 rounded-xl text-white font-bold inline-flex items-center justify-center gap-2" style={{ background: ACCENT }}><Download className="w-4 h-4" /> Descargar PNG</button>
            <button onClick={() => download("jpg")} className="px-4 py-3 rounded-xl text-white font-bold inline-flex items-center justify-center gap-2" style={{ background: ACCENT }}><Download className="w-4 h-4" /> Descargar JPG</button>
            <button onClick={() => { setSrc(null); setAngle(0); setFlipH(false); setFlipV(false); }} className="px-4 py-3 rounded-xl bg-[color:var(--color-bg-soft)] font-bold">Subir otra</button>
          </div>

          <AdSlot slot="rotate_inline" format="auto" minHeight={180} className="mb-6" />
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">🔄 Casos de uso</strong>
        <ul className="space-y-1">
          <li>• Fotos del celular en orientación incorrecta (sin metadata EXIF rotation).</li>
          <li>• Selfies que necesitan flip horizontal para verse "normal".</li>
          <li>• Documentos escaneados al revés.</li>
          <li>• Editar imágenes para que matcheen layout (logo invertido, etc).</li>
        </ul>
      </div>
    </div>
  );
}
