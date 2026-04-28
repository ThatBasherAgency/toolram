"use client";
import { useRef, useState } from "react";

type Phase = "idle" | "wait" | "go" | "early" | "result";

export function ReactionTest() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [time, setTime] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const startRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function arm() {
    setPhase("wait");
    const delay = 1000 + Math.random() * 3500;
    timeoutRef.current = setTimeout(() => {
      setPhase("go");
      startRef.current = performance.now();
    }, delay);
  }
  function click() {
    if (phase === "idle" || phase === "result" || phase === "early") return arm();
    if (phase === "wait") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setPhase("early");
      return;
    }
    if (phase === "go") {
      const t = performance.now() - startRef.current;
      setTime(t);
      setHistory((h) => [...h, t].slice(-5));
      setPhase("result");
    }
  }

  const avg = history.length ? history.reduce((a, b) => a + b, 0) / history.length : 0;
  const bg =
    phase === "wait" ? "var(--color-danger)" :
    phase === "go" ? "var(--color-success)" :
    phase === "early" ? "var(--color-warning)" :
    "var(--color-bg-soft)";

  return (
    <div className="space-y-4">
      <button
        onClick={click}
        className="w-full h-72 rounded-xl text-center text-2xl font-bold transition"
        style={{ background: bg, color: phase === "idle" || phase === "result" ? "var(--color-fg)" : "white" }}
      >
        {phase === "idle" && "Click para empezar"}
        {phase === "wait" && "Esperá al verde…"}
        {phase === "go" && "¡CLICK YA!"}
        {phase === "early" && "Muy temprano! Click para reintentar"}
        {phase === "result" && (
          <>
            <div>{time.toFixed(0)} ms</div>
            <div className="text-sm font-normal mt-1">Click para otro intento</div>
          </>
        )}
      </button>
      {history.length > 0 && (
        <div className="text-sm text-center text-[color:var(--color-fg-soft)]">
          Promedio últimos {history.length}: <strong className="text-[color:var(--color-fg)]">{avg.toFixed(0)} ms</strong>
        </div>
      )}
    </div>
  );
}
