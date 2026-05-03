"use client";
import { useEffect, useRef, useState } from "react";
import { Volume2, Pause, Play, Square, Download } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 280)";

export function TextToSpeech() {
  const [text, setText] = useState("Hola, esta es una demostración del lector de voz. Podés probar con cualquier texto en español, inglés o más de 30 idiomas.");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voice, setVoice] = useState<string>("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    function load() {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
      if (v.length > 0 && !voice) {
        const es = v.find((x) => x.lang.startsWith("es"));
        setVoice((es || v[0]).name);
      }
    }
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, [voice]);

  function play() {
    if (paused) {
      window.speechSynthesis.resume();
      setPaused(false);
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = voices.find((x) => x.name === voice);
    if (v) u.voice = v;
    u.rate = rate;
    u.pitch = pitch;
    u.volume = volume;
    u.onend = () => { setPlaying(false); setPaused(false); };
    u.onstart = () => setPlaying(true);
    utterRef.current = u;
    window.speechSynthesis.speak(u);
  }
  function pause() { window.speechSynthesis.pause(); setPaused(true); }
  function stop() { window.speechSynthesis.cancel(); setPlaying(false); setPaused(false); }

  const langs = Array.from(new Set(voices.map((v) => v.lang.split("-")[0]))).sort();
  const filteredVoices = voices.filter((v) => v.lang.startsWith(voice.split("-")[0] || "es"));

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Texto a Voz Online</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Convierte texto en audio con voces nativas del navegador · Español + 40 idiomas · 100% gratis sin límite.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6">
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-40 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-base focus:outline-none focus:border-[color:var(--color-brand)] resize-none" placeholder="Escribí o pegá tu texto aquí..." />
        <div className="text-xs text-[color:var(--color-fg-soft)] mt-1 text-right">{text.length} caracteres</div>

        <div className="grid md:grid-cols-2 gap-3 mt-4">
          <label className="block">
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Voz ({voices.length} disponibles)</span>
            <select value={voice} onChange={(e) => setVoice(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm">
              {voices.map((v) => <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>)}
            </select>
          </label>
          <div>
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Idioma rápido</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {langs.slice(0, 8).map((l) => (
                <button key={l} onClick={() => { const v = voices.find((x) => x.lang.startsWith(l)); if (v) setVoice(v.name); }} className="px-2 py-1 rounded-md bg-[color:var(--color-bg-soft)] text-xs font-bold uppercase">{l}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3 mt-4">
          <label className="block">
            <span className="text-xs font-bold text-[color:var(--color-fg-soft)]">Velocidad: {rate.toFixed(1)}x</span>
            <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full" />
          </label>
          <label className="block">
            <span className="text-xs font-bold text-[color:var(--color-fg-soft)]">Tono: {pitch.toFixed(1)}</span>
            <input type="range" min="0" max="2" step="0.1" value={pitch} onChange={(e) => setPitch(+e.target.value)} className="w-full" />
          </label>
          <label className="block">
            <span className="text-xs font-bold text-[color:var(--color-fg-soft)]">Volumen: {(volume * 100).toFixed(0)}%</span>
            <input type="range" min="0" max="1" step="0.05" value={volume} onChange={(e) => setVolume(+e.target.value)} className="w-full" />
          </label>
        </div>

        <div className="flex gap-2 mt-5">
          {!playing || paused ? (
            <button onClick={play} className="flex-1 px-6 py-3 rounded-xl text-white font-bold inline-flex items-center justify-center gap-2" style={{ background: ACCENT }}>
              <Play className="w-4 h-4 fill-current" /> {paused ? "Continuar" : "Reproducir"}
            </button>
          ) : (
            <button onClick={pause} className="flex-1 px-6 py-3 rounded-xl text-white font-bold inline-flex items-center justify-center gap-2 bg-[color:var(--color-warning)]">
              <Pause className="w-4 h-4" /> Pausar
            </button>
          )}
          <button onClick={stop} disabled={!playing} className="px-6 py-3 rounded-xl bg-[color:var(--color-danger)]/15 text-[color:var(--color-danger)] font-bold disabled:opacity-40 inline-flex items-center gap-2">
            <Square className="w-4 h-4 fill-current" /> Detener
          </button>
        </div>
      </div>

      <AdSlot slot="tts_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">🔊 Sobre el text-to-speech</strong>
        <ul className="space-y-1">
          <li>• Usa la <strong className="text-[color:var(--color-fg)]">Web Speech API nativa del navegador</strong> — no envía texto a ningún servidor.</li>
          <li>• Las voces dependen del sistema operativo. Chrome y Edge suelen tener voces neuronales de alta calidad.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Para descargar audio</strong>, necesitás un grabador de pantalla o navegador con soporte (no es estándar).</li>
          <li>• Útil para audiolibros caseros, accesibilidad, aprender pronunciación.</li>
        </ul>
      </div>
    </div>
  );
}
