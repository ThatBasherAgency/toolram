"use client";
import { useEffect, useRef, useState } from "react";

export function Timer() {
  const [h, setH] = useState(0);
  const [m, setM] = useState(5);
  const [s, setS] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    const tick = () => {
      setRemaining((r) => {
        if (r <= 1000) {
          setRunning(false);
          setDone(true);
          try {
            const ctx = new AudioContext();
            const o = ctx.createOscillator();
            o.frequency.value = 880;
            o.connect(ctx.destination);
            o.start();
            setTimeout(() => { o.stop(); ctx.close(); }, 600);
          } catch {}
          return 0;
        }
        return r - 100;
      });
    };
    ref.current = window.setInterval(tick, 100);
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [running]);

  function start() {
    const total = (h * 3600 + m * 60 + s) * 1000;
    if (total <= 0) return;
    setRemaining(total);
    setDone(false);
    setRunning(true);
  }
  function pause() { setRunning(false); }
  function reset() { setRunning(false); setRemaining(0); setDone(false); }

  const display = remaining > 0 || running ? remaining : (h * 3600 + m * 60 + s) * 1000;
  const hh = Math.floor(display / 3600000);
  const mm = Math.floor((display % 3600000) / 60000);
  const ss = Math.floor((display % 60000) / 1000);
  const fmt = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;

  return (
    <div className="space-y-4">
      <div className={`card text-center !py-8 transition ${done ? "ring-4 ring-[color:var(--color-success)]" : ""}`}>
        <div className="text-6xl md:text-7xl font-bold tabular-nums text-[color:var(--color-brand)]">{fmt}</div>
        {done && <div className="text-lg text-[color:var(--color-success)] font-bold mt-2">⏰ ¡Tiempo!</div>}
      </div>
      {!running && remaining === 0 && (
        <div className="grid grid-cols-3 gap-3">
          <label className="block text-sm">Horas<input type="number" min="0" max="23" className="input mt-1" value={h} onChange={(e) => setH(Math.max(0, +e.target.value || 0))} /></label>
          <label className="block text-sm">Minutos<input type="number" min="0" max="59" className="input mt-1" value={m} onChange={(e) => setM(Math.max(0, +e.target.value || 0))} /></label>
          <label className="block text-sm">Segundos<input type="number" min="0" max="59" className="input mt-1" value={s} onChange={(e) => setS(Math.max(0, +e.target.value || 0))} /></label>
        </div>
      )}
      <div className="flex gap-2">
        {!running ? (
          <button onClick={start} className="btn btn-primary flex-1">▶ Iniciar</button>
        ) : (
          <button onClick={pause} className="btn btn-primary flex-1">⏸ Pausar</button>
        )}
        <button onClick={reset} className="btn btn-ghost">🔁 Reiniciar</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {[1, 3, 5, 10, 15, 25, 30, 60].map((min) => (
          <button key={min} onClick={() => { setH(0); setM(min); setS(0); reset(); }} className="btn btn-ghost h-8 text-xs">{min} min</button>
        ))}
      </div>
    </div>
  );
}
