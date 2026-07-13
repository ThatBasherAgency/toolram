"use client";
import { useEffect, useRef, useState } from "react";

export function ClickCounter() {
  const [clicks, setClicks] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [best, setBest] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      setBest(Number(localStorage.getItem("toolram_click_counter_best") || 0));
    } catch {}
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function tick(start: number) {
    setElapsed((performance.now() - start) / 1000);
    rafRef.current = requestAnimationFrame(() => tick(start));
  }

  function clickPad() {
    if (startedAt === null) {
      const now = performance.now();
      setStartedAt(now);
      rafRef.current = requestAnimationFrame(() => tick(now));
    }
    setClicks((c) => {
      const next = c + 1;
      if (next > best) {
        setBest(next);
        try { localStorage.setItem("toolram_click_counter_best", String(next)); } catch {}
      }
      return next;
    });
  }

  function reset() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setClicks(0);
    setStartedAt(null);
    setElapsed(0);
  }

  const avg = elapsed > 0.2 ? clicks / elapsed : 0;

  return (
    <div className="space-y-4">
      <button
        onClick={clickPad}
        className="card w-full h-64 md:h-80 select-none cursor-pointer flex flex-col items-center justify-center text-center !p-4 hover:!bg-[color:var(--color-brand-soft)] active:!bg-[color:var(--color-brand-soft)] transition"
      >
        {clicks === 0 && <div className="text-xl font-semibold">Hacé click acá para empezar a contar</div>}
        {clicks > 0 && (
          <>
            <div className="text-6xl font-bold text-[color:var(--color-brand)]">{clicks}</div>
            <div className="text-sm text-[color:var(--color-fg-soft)]">
              {elapsed.toFixed(1)}s · promedio {avg.toFixed(2)} clicks/s
            </div>
          </>
        )}
      </button>
      <div className="flex items-center gap-3">
        <button onClick={reset} className="btn btn-ghost">Reiniciar</button>
        <span className="text-xs text-[color:var(--color-fg-soft)]">Récord de la sesión: {best} clicks</span>
      </div>
    </div>
  );
}
