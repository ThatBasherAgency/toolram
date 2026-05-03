"use client";
import { useState } from "react";
import { Upload, Loader2, Copy, Check, FileText } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 200)";

const LANGS = [
  { code: "spa", name: "Español" },
  { code: "eng", name: "English" },
  { code: "por", name: "Português" },
  { code: "fra", name: "Français" },
  { code: "ita", name: "Italiano" },
  { code: "deu", name: "Deutsch" }
];

interface TesseractWorker {
  recognize: (img: string) => Promise<{ data: { text: string; confidence: number } }>;
  terminate: () => Promise<void>;
}

export function ImageToText() {
  const [src, setSrc] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lang, setLang] = useState("spa");
  const [copied, setCopied] = useState(false);

  function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setSrc(r.result as string);
    r.readAsDataURL(f);
  }

  async function recognize() {
    if (!src) return;
    setLoading(true);
    setText("");
    setProgress(0);
    try {
      const Tesseract = await import("tesseract.js");
      const result = await Tesseract.recognize(src, lang, {
        logger: (m: { status: string; progress: number }) => {
          if (m.status === "recognizing text") setProgress(Math.round(m.progress * 100));
        }
      });
      setText(result.data.text);
      setConfidence(Math.round(result.data.confidence));
    } catch (e: unknown) {
      setText(`Error: ${e instanceof Error ? e.message : "no se pudo procesar la imagen"}`);
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>OCR · Imagen a Texto</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Extrae texto de fotos, capturas y documentos escaneados · Tesseract.js client-side · 6 idiomas.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          {!src ? (
            <label className="block rounded-3xl border-2 border-dashed border-[color:var(--color-border)] bg-[color:var(--color-bg-soft)] p-12 text-center cursor-pointer hover:border-[color:var(--color-brand)] h-full">
              <Upload className="w-12 h-12 mx-auto mb-3 text-[color:var(--color-fg-soft)]" />
              <div className="text-base font-bold mb-1">Subir imagen</div>
              <div className="text-xs text-[color:var(--color-fg-soft)]">JPG, PNG · texto claro = mejor resultado</div>
              <input type="file" accept="image/*" onChange={upload} className="hidden" />
            </label>
          ) : (
            <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg-soft)] p-3 h-full flex flex-col">
              <img src={src} alt="" className="max-h-[400px] mx-auto rounded-lg" />
              <button onClick={() => { setSrc(null); setText(""); }} className="mt-3 w-full px-4 py-2 rounded-lg bg-[color:var(--color-bg)] text-sm font-bold">Subir otra</button>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4">
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] block mb-1">Idioma del texto</span>
            <div className="grid grid-cols-3 gap-1">
              {LANGS.map((l) => (
                <button key={l.code} onClick={() => setLang(l.code)} className="px-2 py-1.5 rounded-md text-xs font-bold transition" style={lang === l.code ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>{l.name}</button>
              ))}
            </div>
          </div>
          <button onClick={recognize} disabled={!src || loading} className="w-full px-4 py-3 rounded-xl text-white font-bold disabled:opacity-40 inline-flex items-center justify-center gap-2" style={{ background: ACCENT }}>
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Reconociendo... {progress}%</> : <><FileText className="w-4 h-4" /> Extraer texto</>}
          </button>
          <div className="text-[10px] text-[color:var(--color-fg-soft)] text-center">⏱️ Primera vez tarda ~10s en cargar el modelo (~3MB). Después es instantáneo.</div>
        </div>
      </div>

      {text && (
        <>
          <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] mb-6">
            <div className="px-4 py-2.5 border-b border-[color:var(--color-border)] flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Texto extraído · Confianza {confidence}%</span>
              <button onClick={copy} className="px-3 py-1 rounded-md bg-[color:var(--color-bg-soft)] text-xs font-bold inline-flex items-center gap-1">
                {copied ? <><Check className="w-3 h-3" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar</>}
              </button>
            </div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full p-4 bg-transparent font-mono text-sm focus:outline-none resize-y min-h-[200px]" />
          </div>

          <AdSlot slot="ocr_inline" format="auto" minHeight={180} className="mb-6" />
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">📝 Tips para mejor OCR</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">Iluminación uniforme</strong>, sin sombras ni reflejos.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Texto recto</strong> — si la imagen está rotada, usá nuestro <a href="/rotar-imagen" className="text-[color:var(--color-brand)] underline">rotador</a> primero.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Resolución media-alta</strong> — muy chica pierde definición, muy grande tarda más.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Privacidad:</strong> el OCR corre 100% en tu navegador. La imagen NO se sube a ningún servidor.</li>
        </ul>
      </div>
    </div>
  );
}
