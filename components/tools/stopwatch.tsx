"use client";
import { useEffect, useRef, useState } from "react";

function fmt(ms: number) {
  const cs = Math.floor(ms / 10) % 100;
  const s = Math.floor(ms / 1000) % 60;
  const m = Math.floor(ms / 60000) % 60;
  const h = Math.floor(ms / 3600000);
  return `${h ? `${h.toString().padStart(2, "0")}:` : ""}${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}.${cs.toString().padStart(2, "0")}`;
}

export function Stopwatch() {
  const [running, setRunning] = useState(false);
  const [ms, setMs] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const startRef = useRef<number>(0);
  const baseRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    function tick() {
      setMs(baseRef.current + (performance.now() - startRef.current));
      rafRef.current = requestAnimationFrame(tick);
    }
    if (running) {
      startRef.current = performance.now();
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running]);

  function toggle() {
    if (running) {
      baseRef.current = ms;
      setRunning(false);
    } else {
      setRunning(true);
    }
  }
  function reset() {
    setRunning(false);
    baseRef.current = 0;
    setMs(0);
    setLaps([]);
  }
  function lap() {
    setLaps((l) => [ms, ...l]);
  }

  return (
    <div className="space-y-4">
      <div className="card text-center !py-12">
        <div className="text-6xl md:text-8xl font-mono font-bold tabular-nums">{fmt(ms)}</div>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        <button onClick={toggle} className="btn btn-primary">{running ? "Pausar" : "Iniciar"}</button>
        <button onClick={lap} disabled={!running} className="btn btn-ghost">Vuelta</button>
        <button onClick={reset} className="btn btn-ghost">Reset</button>
      </div>
      {laps.length > 0 && (
        <div className="card !p-3">
          <div className="text-xs uppercase mb-2 text-[color:var(--color-fg-soft)]">Vueltas</div>
          <ul className="space-y-1 font-mono text-sm">
            {laps.map((l, i) => (
              <li key={i} className="flex justify-between"><span>#{laps.length - i}</span><span>{fmt(l)}</span></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
