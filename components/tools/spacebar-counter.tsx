"use client";
import { useEffect, useRef, useState } from "react";

const MODES = [0, 10, 30, 60]; // 0 = libre (sin límite)

export function SpacebarCounter() {
  const [mode, setMode] = useState(10);
  const [presses, setPresses] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [remaining, setRemaining] = useState(10);
  const [best, setBest] = useState<Record<number, number>>({});
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const padRef = useRef<HTMLButtonElement | null>(null);
  // Refs espejo para leer estado dentro del listener global de teclado
  const stateRef = useRef({ mode: 10, running: false, done: false });
  stateRef.current = { mode, running, done };

  useEffect(() => {
    try {
      setBest(JSON.parse(localStorage.getItem("toolram_spacebar_best") || "{}"));
    } catch {}
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.code !== "Space") return;
      const el = document.activeElement;
      if (el && ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName)) return;
      e.preventDefault();
      if (e.repeat) return;
      press();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function tick() {
    if (!startRef.current) return;
    const { mode: m } = stateRef.current;
    const elapsed = (performance.now() - startRef.current) / 1000;
    if (m > 0 && elapsed >= m) {
      setRemaining(0);
      finish();
      return;
    }
    setRemaining(m > 0 ? Math.max(0, m - elapsed) : elapsed);
    rafRef.current = requestAnimationFrame(tick);
  }

  function press() {
    const s = stateRef.current;
    if (s.done) return;
    if (!s.running) {
      setRunning(true);
      stateRef.current.running = true;
      startRef.current = performance.now();
      rafRef.current = requestAnimationFrame(tick);
    }
    setPresses((p) => p + 1);
  }

  function finish() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setRunning(false);
    setDone(true);
    setPresses((p) => {
      const m = stateRef.current.mode;
      setBest((b) => {
        if (p > (b[m] || 0)) {
          const next = { ...b, [m]: p };
          try { localStorage.setItem("toolram_spacebar_best", JSON.stringify(next)); } catch {}
          return next;
        }
        return b;
      });
      return p;
    });
  }

  function reset(newMode = mode) {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setMode(newMode);
    setPresses(0);
    setRunning(false);
    setDone(false);
    setRemaining(newMode > 0 ? newMode : 0);
    startRef.current = null;
  }

  const elapsed = mode > 0 ? mode - remaining : remaining;
  const rate = running || done ? presses / Math.max(0.01, mode > 0 ? (done ? mode : elapsed) : remaining) : 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm">Modo:</span>
        {MODES.map((m) => (
          <button
            key={m}
            onClick={() => reset(m)}
            disabled={running}
            className={`btn !py-1.5 !px-3 text-sm ${mode === m ? "btn-primary" : "btn-ghost"}`}
          >
            {m === 0 ? "Libre" : `${m}s`}
          </button>
        ))}
      </div>
      <button
        ref={padRef}
        onClick={press}
        className="card w-full h-64 md:h-80 select-none cursor-pointer flex flex-col items-center justify-center text-center !p-4 hover:!bg-[color:var(--color-brand-soft)] active:!bg-[color:var(--color-brand-soft)] transition"
      >
        {!running && !done && (
          <div className="text-xl font-semibold">Presioná la barra espaciadora para empezar</div>
        )}
        {running && (
          <>
            <div className="text-6xl font-bold text-[color:var(--color-brand)]">{presses}</div>
            <div className="text-sm text-[color:var(--color-fg-soft)]">
              {mode > 0 ? `${remaining.toFixed(1)}s restantes` : `${remaining.toFixed(1)}s`} · {rate.toFixed(2)} pulsaciones/s
            </div>
          </>
        )}
        {done && (
          <>
            <div className="text-sm">Resultado:</div>
            <div className="text-5xl font-bold text-[color:var(--color-brand)]">{presses} pulsaciones</div>
            <div className="mt-1 text-sm text-[color:var(--color-fg-soft)]">{rate.toFixed(2)} por segundo en {mode}s</div>
            <div className="mt-3 text-xs text-[color:var(--color-fg-soft)]">Récord en {mode}s: {best[mode] || presses}</div>
          </>
        )}
      </button>
      {done && (
        <button onClick={() => reset()} className="btn btn-primary">Reintentar</button>
      )}
      <p className="text-xs text-[color:var(--color-fg-soft)]">También podés tocar el panel (útil en móvil, donde no hay barra espaciadora física).</p>
    </div>
  );
}
