"use client";
import { useState } from "react";

export function DecisionWheel() {
  const [opts, setOpts] = useState<string[]>(["Pizza", "Sushi", "Hamburguesa", "Tacos"]);
  const [input, setInput] = useState("");
  const [angle, setAngle] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);

  function add() {
    const v = input.trim();
    if (!v) return;
    setOpts((o) => [...o, v]);
    setInput("");
  }
  function remove(i: number) {
    setOpts((o) => o.filter((_, idx) => idx !== i));
  }
  function spin() {
    if (opts.length < 2 || spinning) return;
    const turns = 5 + Math.random() * 5;
    const target = Math.random() * 360;
    const final = angle + turns * 360 + target;
    setAngle(final);
    setSpinning(true);
    setWinner(null);
    setTimeout(() => {
      const norm = (360 - (final % 360)) % 360;
      const idx = Math.floor((norm / 360) * opts.length) % opts.length;
      setWinner(opts[idx]);
      setSpinning(false);
    }, 4100);
  }

  const segAngle = 360 / opts.length;
  const colors = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#06b6d4", "#8b5cf6", "#ef4444", "#84cc16"];

  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <div className="space-y-3">
        <div className="flex gap-2">
          <input className="input" placeholder="Agregar opción…" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} />
          <button onClick={add} className="btn btn-primary">Agregar</button>
        </div>
        <ul className="space-y-1 max-h-60 overflow-auto">
          {opts.map((o, i) => (
            <li key={i} className="flex items-center justify-between card !p-2 !rounded-md text-sm">
              <span><span className="inline-block w-3 h-3 rounded-full mr-2" style={{ background: colors[i % colors.length] }} />{o}</span>
              <button onClick={() => remove(i)} className="text-xs text-[color:var(--color-danger)]">×</button>
            </li>
          ))}
        </ul>
        <button onClick={spin} disabled={spinning || opts.length < 2} className="btn btn-primary w-full !py-3">
          {spinning ? "Girando…" : "🎯 Girar la ruleta"}
        </button>
        {winner && <div className="card text-center !py-4"><div className="text-xs uppercase mb-1">Ganador</div><div className="text-2xl font-bold text-[color:var(--color-brand)]">{winner}</div></div>}
      </div>
      <div className="flex items-center justify-center relative">
        <div className="relative w-72 h-72 md:w-96 md:h-96">
          <div
            className="absolute inset-0 rounded-full border-4 border-[color:var(--color-fg)] overflow-hidden transition-transform"
            style={{ transform: `rotate(${angle}deg)`, transitionDuration: "4s", transitionTimingFunction: "cubic-bezier(0.17, 0.67, 0.05, 1)" }}
          >
            <svg viewBox="-100 -100 200 200" className="w-full h-full">
              {opts.map((o, i) => {
                const a1 = (i * segAngle - 90) * (Math.PI / 180);
                const a2 = ((i + 1) * segAngle - 90) * (Math.PI / 180);
                const x1 = 100 * Math.cos(a1), y1 = 100 * Math.sin(a1);
                const x2 = 100 * Math.cos(a2), y2 = 100 * Math.sin(a2);
                const large = segAngle > 180 ? 1 : 0;
                const am = ((i + 0.5) * segAngle - 90) * (Math.PI / 180);
                const tx = 60 * Math.cos(am), ty = 60 * Math.sin(am);
                return (
                  <g key={i}>
                    <path d={`M0,0 L${x1},${y1} A100,100 0 ${large} 1 ${x2},${y2} Z`} fill={colors[i % colors.length]} />
                    <text x={tx} y={ty} fill="white" fontSize="9" textAnchor="middle" dominantBaseline="middle" transform={`rotate(${(i + 0.5) * segAngle - 90} ${tx} ${ty})`}>
                      {o.length > 14 ? o.slice(0, 13) + "…" : o}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-[color:var(--color-fg)]" />
        </div>
      </div>
    </div>
  );
}
