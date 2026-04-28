"use client";
import { useEffect, useRef, useState } from "react";

const DURATIONS = [5, 10, 30, 60, 100];

export function CpsTest() {
  const [duration, setDuration] = useState(10);
  const [clicks, setClicks] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [remaining, setRemaining] = useState(10);
  const [best, setBest] = useState<Record<number, number>>({});
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("toolram_cps_best") || "{}");
      setBest(saved);
    } catch {}
  }, []);

  function tick() {
    if (!startRef.current) return;
    const elapsed = (performance.now() - startRef.current) / 1000;
    if (elapsed >= duration) {
      setRemaining(0);
      finish();
      return;
    }
    setRemaining(Math.max(0, duration - elapsed));
    rafRef.current = requestAnimationFrame(tick);
  }

  function start() {
    setClicks(0);
    setDone(false);
    setRemaining(duration);
  }
  function clickPad() {
    if (done) return;
    if (!running) {
      setRunning(true);
      startRef.current = performance.now();
      rafRef.current = requestAnimationFrame(tick);
    }
    setClicks((c) => c + 1);
  }
  function finish() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setRunning(false);
    setDone(true);
    const cps = clicks / duration;
    if (!best[duration] || cps > best[duration]) {
      const next = { ...best, [duration]: cps };
      setBest(next);
      try { localStorage.setItem("toolram_cps_best", JSON.stringify(next)); } catch {}
    }
  }

  const cps = running ? clicks / Math.max(0.01, duration - remaining) : done ? clicks / duration : 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm">Duración:</span>
        {DURATIONS.map((d) => (
          <button
            key={d}
            onClick={() => { setDuration(d); setRemaining(d); setClicks(0); setDone(false); setRunning(false); }}
            disabled={running}
            className={`btn !py-1.5 !px-3 text-sm ${duration === d ? "btn-primary" : "btn-ghost"}`}
          >
            {d}s
          </button>
        ))}
      </div>
      <button
        onClick={clickPad}
        className="card w-full h-64 md:h-80 select-none cursor-pointer flex flex-col items-center justify-center text-center !p-4 hover:!bg-[color:var(--color-brand-soft)] active:!bg-[color:var(--color-brand-soft)] transition"
      >
        {!running && !done && <div className="text-xl font-semibold">Hacé click acá para empezar</div>}
        {running && (
          <>
            <div className="text-6xl font-bold text-[color:var(--color-brand)]">{clicks}</div>
            <div className="text-sm text-[color:var(--color-fg-soft)]">{remaining.toFixed(1)}s restantes · {cps.toFixed(2)} CPS</div>
          </>
        )}
        {done && (
          <>
            <div className="text-sm">Resultado:</div>
            <div className="text-5xl font-bold text-[color:var(--color-brand)]">{cps.toFixed(2)} CPS</div>
            <div className="mt-1 text-sm text-[color:var(--color-fg-soft)]">{clicks} clicks en {duration}s</div>
            <div className="mt-3 text-xs text-[color:var(--color-fg-soft)]">Récord en {duration}s: {(best[duration] || cps).toFixed(2)} CPS</div>
          </>
        )}
      </button>
      {done && (
        <button onClick={start} className="btn btn-primary">Reintentar</button>
      )}
    </div>
  );
}
