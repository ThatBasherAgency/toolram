"use client";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, SkipForward, Volume2, VolumeX } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 25)";

type Phase = "work" | "short" | "long";

const DURATIONS: Record<Phase, number> = {
  work: 25 * 60,
  short: 5 * 60,
  long: 15 * 60
};

const LABELS: Record<Phase, string> = {
  work: "Trabajo",
  short: "Pausa corta",
  long: "Pausa larga"
};

export function PomodoroTimer() {
  const [phase, setPhase] = useState<Phase>("work");
  const [seconds, setSeconds] = useState(DURATIONS.work);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [sound, setSound] = useState(true);
  const [customWork, setCustomWork] = useState(25);
  const [customShort, setCustomShort] = useState(5);
  const [customLong, setCustomLong] = useState(15);
  const audioCtxRef = useRef<AudioContext | null>(null);

  function beep() {
    if (!sound) return;
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 800;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
      setTimeout(beep2, 600);
    } catch {}
  }
  function beep2() {
    try {
      if (!audioCtxRef.current) return;
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = 1000; osc.type = "sine";
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start(); osc.stop(ctx.currentTime + 0.5);
    } catch {}
  }

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          beep();
          setRunning(false);
          if (phase === "work") {
            const newCount = completed + 1;
            setCompleted(newCount);
            const next: Phase = newCount % 4 === 0 ? "long" : "short";
            setPhase(next);
            return next === "long" ? customLong * 60 : customShort * 60;
          }
          setPhase("work");
          return customWork * 60;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, phase, completed, customWork, customShort, customLong]);

  function reset() {
    setRunning(false);
    setSeconds(phase === "work" ? customWork * 60 : phase === "short" ? customShort * 60 : customLong * 60);
  }
  function skip() {
    setRunning(false);
    if (phase === "work") {
      const newCount = completed + 1;
      setCompleted(newCount);
      const next: Phase = newCount % 4 === 0 ? "long" : "short";
      setPhase(next);
      setSeconds(next === "long" ? customLong * 60 : customShort * 60);
    } else {
      setPhase("work");
      setSeconds(customWork * 60);
    }
  }

  function setCustom(p: Phase, val: number) {
    if (p === "work") { setCustomWork(val); if (phase === "work" && !running) setSeconds(val * 60); }
    if (p === "short") { setCustomShort(val); if (phase === "short" && !running) setSeconds(val * 60); }
    if (p === "long") { setCustomLong(val); if (phase === "long" && !running) setSeconds(val * 60); }
  }

  const totalForPhase = phase === "work" ? customWork * 60 : phase === "short" ? customShort * 60 : customLong * 60;
  const progress = ((totalForPhase - seconds) / totalForPhase) * 100;
  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");

  const phaseColor = phase === "work" ? ACCENT : phase === "short" ? "oklch(0.65 0.18 145)" : "oklch(0.65 0.2 240)";

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Temporizador Pomodoro</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Técnica Pomodoro: 25 min trabajo + 5 min pausa · cada 4 ciclos pausa larga de 15 min.</p>
      </div>

      <div className="rounded-3xl p-8 md:p-12 text-white shadow-2xl mb-6 text-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${phaseColor}, color-mix(in oklch, ${phaseColor} 55%, black))` }}>
        <div className="absolute inset-0 opacity-20" style={{ background: `linear-gradient(90deg, white ${progress}%, transparent ${progress}%)` }} />
        <div className="relative">
          <div className="inline-flex bg-white/20 rounded-full p-1 mb-6 backdrop-blur">
            {(["work", "short", "long"] as Phase[]).map((p) => (
              <button key={p} onClick={() => { setPhase(p); setSeconds(DURATIONS[p]); setRunning(false); }} className="px-4 py-1.5 rounded-full text-xs font-bold transition" style={phase === p ? { background: "white", color: phaseColor } : { color: "white" }}>
                {LABELS[p]}
              </button>
            ))}
          </div>
          <div className="text-9xl md:text-[12rem] font-black tabular-nums leading-none my-6 tracking-tight">{mins}:{secs}</div>
          <div className="flex items-center justify-center gap-3">
            <button onClick={() => setRunning(!running)} className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-105 transition">
              {running ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
            </button>
            <button onClick={reset} className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"><RotateCcw className="w-5 h-5" /></button>
            <button onClick={skip} className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"><SkipForward className="w-5 h-5" /></button>
            <button onClick={() => setSound(!sound)} className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">{sound ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}</button>
          </div>
          <div className="mt-6 text-sm opacity-90">Pomodoros completados: <strong className="text-2xl">{completed}</strong></div>
        </div>
      </div>

      <AdSlot slot="pomodoro_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5 mb-6">
        <div className="font-bold mb-3">⚙️ Personalizar duraciones (minutos)</div>
        <div className="grid grid-cols-3 gap-3">
          {(["work", "short", "long"] as Phase[]).map((p) => {
            const val = p === "work" ? customWork : p === "short" ? customShort : customLong;
            return (
              <label key={p} className="block">
                <span className="text-xs font-bold text-[color:var(--color-fg-soft)]">{LABELS[p]}</span>
                <input type="number" min="1" max="120" value={val} onChange={(e) => setCustom(p, +e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-center font-mono tabular-nums" />
              </label>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">🍅 La técnica Pomodoro</strong>
        Creada por Francesco Cirillo en los 80s. Trabajas 25 minutos enfocado (un "pomodoro"), descansas 5 minutos, y cada 4 ciclos haces una pausa larga de 15-30 minutos. Ideal para mantener concentración, evitar burnout y medir productividad real.
      </div>
    </div>
  );
}
