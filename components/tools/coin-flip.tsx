"use client";
import { useState } from "react";

export function CoinFlip() {
  const [face, setFace] = useState<"cara" | "cruz">("cara");
  const [flipping, setFlipping] = useState(false);
  const [history, setHistory] = useState<("cara" | "cruz")[]>([]);

  function flip() {
    if (flipping) return;
    setFlipping(true);
    const result: "cara" | "cruz" = Math.random() < 0.5 ? "cara" : "cruz";
    setTimeout(() => {
      setFace(result);
      setHistory((h) => [result, ...h].slice(0, 20));
      setFlipping(false);
    }, 1100);
  }

  const caras = history.filter((h) => h === "cara").length;
  const cruces = history.filter((h) => h === "cruz").length;

  return (
    <div className="space-y-5 text-center">
      <div className="flex justify-center py-4">
        <div className={`w-40 h-40 rounded-full flex items-center justify-center text-6xl font-bold transition-transform shadow-2xl ${flipping ? "animate-spin" : ""}`}
          style={{ background: face === "cara" ? "linear-gradient(135deg,#fde047,#facc15)" : "linear-gradient(135deg,#cbd5e1,#94a3b8)" }}>
          {flipping ? "🪙" : face === "cara" ? "👤" : "✦"}
        </div>
      </div>
      {!flipping && <div className="text-3xl font-bold text-[color:var(--color-brand)] uppercase">{face}</div>}
      <button onClick={flip} disabled={flipping} className="btn btn-primary !py-3 px-8">{flipping ? "Lanzando…" : "🪙 Lanzar moneda"}</button>
      {history.length > 0 && (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
            <div className="card !p-3"><div className="text-xl font-bold">{caras}</div><div className="text-xs uppercase">Caras</div></div>
            <div className="card !p-3"><div className="text-xl font-bold">{cruces}</div><div className="text-xs uppercase">Cruces</div></div>
          </div>
          <div className="flex flex-wrap justify-center gap-1 max-w-md mx-auto">
            {history.map((r, i) => <span key={i} className="text-2xl">{r === "cara" ? "👤" : "✦"}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}
