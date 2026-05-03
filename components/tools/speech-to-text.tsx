"use client";
import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Copy, Check, Trash2 } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.24 25)";

const LANGS = [
  { code: "es-ES", name: "Español (España)" },
  { code: "es-MX", name: "Español (México)" },
  { code: "es-AR", name: "Español (Argentina)" },
  { code: "es-CO", name: "Español (Colombia)" },
  { code: "es-CL", name: "Español (Chile)" },
  { code: "es-PE", name: "Español (Perú)" },
  { code: "en-US", name: "English (US)" },
  { code: "en-GB", name: "English (UK)" },
  { code: "pt-BR", name: "Português (BR)" },
  { code: "fr-FR", name: "Français" },
  { code: "it-IT", name: "Italiano" },
  { code: "de-DE", name: "Deutsch" }
];

interface SpeechRecognitionInstance {
  start(): void;
  stop(): void;
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((e: { results: ArrayLike<{ 0: { transcript: string; confidence: number }; isFinal: boolean }> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
}

export function SpeechToText() {
  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const [text, setText] = useState("");
  const [interim, setInterim] = useState("");
  const [lang, setLang] = useState("es-MX");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const recRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    const SR = (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionInstance; webkitSpeechRecognition?: new () => SpeechRecognitionInstance }).SpeechRecognition ?? (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionInstance }).webkitSpeechRecognition;
    if (!SR) { setSupported(false); return; }
    const r = new SR();
    r.continuous = true;
    r.interimResults = true;
    r.lang = lang;
    r.onresult = (e) => {
      let final = "";
      let inter = "";
      for (let i = 0; i < e.results.length; i++) {
        const res = e.results[i];
        if (res.isFinal) final += res[0].transcript + " ";
        else inter += res[0].transcript;
      }
      if (final) setText((t) => t + final);
      setInterim(inter);
    };
    r.onerror = (e) => { setError(e.error); setListening(false); };
    r.onend = () => setListening(false);
    recRef.current = r;
    return () => r.stop();
  }, [lang]);

  function start() {
    setError(null);
    setInterim("");
    try {
      recRef.current?.start();
      setListening(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error");
    }
  }
  function stop() { recRef.current?.stop(); setListening(false); setInterim(""); }
  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  if (!supported) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
        <div className="rounded-2xl bg-[color:var(--color-warning)]/10 border-2 border-[color:var(--color-warning)] p-8 text-center">
          <MicOff className="w-12 h-12 mx-auto mb-3 text-[color:var(--color-warning)]" />
          <h2 className="text-2xl font-bold mb-2">Tu navegador no soporta reconocimiento de voz</h2>
          <p className="text-[color:var(--color-fg-soft)]">Probá con Chrome, Edge o Safari (versiones recientes). Firefox no tiene soporte completo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Voz a Texto Online</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Dictá y convertí tu voz a texto en tiempo real · 12 idiomas · Sin descargar nada.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6">
        <select value={lang} onChange={(e) => setLang(e.target.value)} disabled={listening} className="w-full px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm font-bold mb-4">
          {LANGS.map((l) => <option key={l.code} value={l.code}>{l.name}</option>)}
        </select>

        <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-4 min-h-[200px] mb-4 text-base whitespace-pre-wrap">
          {text}<span className="text-[color:var(--color-fg-soft)] italic">{interim}</span>
          {!text && !interim && <span className="text-[color:var(--color-fg-soft)] italic">Hacé click en el micrófono y comenzá a hablar...</span>}
        </div>

        <div className="flex gap-2">
          {!listening ? (
            <button onClick={start} className="flex-1 px-6 py-3 rounded-xl text-white font-bold inline-flex items-center justify-center gap-2" style={{ background: ACCENT }}>
              <Mic className="w-5 h-5" /> Empezar a dictar
            </button>
          ) : (
            <button onClick={stop} className="flex-1 px-6 py-3 rounded-xl text-white font-bold inline-flex items-center justify-center gap-2 animate-pulse" style={{ background: "oklch(0.55 0.24 25)" }}>
              <MicOff className="w-5 h-5" /> Detener (escuchando...)
            </button>
          )}
          <button onClick={copy} disabled={!text} className="px-4 py-3 rounded-xl bg-[color:var(--color-bg-soft)] font-bold disabled:opacity-40 inline-flex items-center gap-1.5">
            {copied ? <><Check className="w-4 h-4" /> Copiado</> : <><Copy className="w-4 h-4" /> Copiar</>}
          </button>
          <button onClick={() => setText("")} disabled={!text} className="px-4 py-3 rounded-xl bg-[color:var(--color-danger)]/15 text-[color:var(--color-danger)] font-bold disabled:opacity-40">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {error && <div className="mt-3 text-sm text-[color:var(--color-danger)]">Error: {error}</div>}
      </div>

      <AdSlot slot="stt_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">🎙️ Tips para mejor reconocimiento</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">Hablá claro y a velocidad normal</strong>, sin pausas largas.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Ambiente silencioso</strong> mejora la precisión drásticamente.</li>
          <li>• Pronunciá puntuación: "punto", "coma", "signo de interrogación".</li>
          <li>• El reconocimiento usa Google Speech (Chrome) — requiere internet activo.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Privacidad:</strong> el audio va a Google para ser procesado. No lo uses para info confidencial.</li>
        </ul>
      </div>
    </div>
  );
}
