"use client";
import { useEffect, useRef, useState } from "react";

const PHRASES = [
  "El veloz murciélago hindú comía feliz cardillo y kiwi en su jaula. La cigüeña tocaba el saxofón detrás del palenque de paja.",
  "Programar es la forma moderna de escribir poesía: cada función bien nombrada vale más que mil comentarios apurados al margen.",
  "Hoy probaré mi velocidad de tipeo con esta frase aleatoria que mide cuántas palabras por minuto puedo escribir sin equivocarme.",
  "La privacidad importa más cuando los datos viajan menos. Un buen software respeta tu información y trabaja en tu navegador.",
  "Las herramientas online deberían ser rápidas, claras y honestas. Sin pop-ups, sin uploads sospechosos y sin marca de agua."
];

function pick() {
  return PHRASES[Math.floor(Math.random() * PHRASES.length)];
}

export function TypingTest() {
  const [target, setTarget] = useState(pick);
  const [typed, setTyped] = useState("");
  const [start, setStart] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [acc, setAcc] = useState(100);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => { ref.current?.focus(); }, [target]);

  function handle(v: string) {
    if (done) return;
    if (!start && v.length === 1) setStart(Date.now());
    setTyped(v);
    if (v.length >= target.length) {
      const elapsed = (Date.now() - (start ?? Date.now())) / 1000;
      const words = target.split(" ").length;
      const correct = v.split("").filter((c, i) => c === target[i]).length;
      setWpm(Math.round((words / elapsed) * 60));
      setAcc(Math.round((correct / target.length) * 100));
      setDone(true);
    }
  }

  function reset() {
    setTarget(pick());
    setTyped("");
    setStart(null);
    setDone(false);
    setTimeout(() => ref.current?.focus(), 50);
  }

  return (
    <div className="space-y-4">
      <div className="card !p-4 leading-relaxed text-base font-mono">
        {target.split("").map((ch, i) => {
          const t = typed[i];
          const cls = t == null ? "text-[color:var(--color-fg-soft)]" : t === ch ? "text-[color:var(--color-success)]" : "text-[color:var(--color-danger)] underline";
          return <span key={i} className={cls}>{ch}</span>;
        })}
      </div>
      <input ref={ref} className="input font-mono" value={typed} onChange={(e) => handle(e.target.value)} disabled={done} placeholder="Empezá a escribir aquí…" />
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="card !p-3"><div className="text-2xl font-bold text-[color:var(--color-brand)]">{wpm || "—"}</div><div className="text-xs uppercase">WPM</div></div>
        <div className="card !p-3"><div className="text-2xl font-bold text-[color:var(--color-brand)]">{acc}%</div><div className="text-xs uppercase">Precisión</div></div>
        <div className="card !p-3"><div className="text-2xl font-bold text-[color:var(--color-brand)]">{typed.length}/{target.length}</div><div className="text-xs uppercase">Caracteres</div></div>
      </div>
      <button onClick={reset} className="btn btn-primary w-full">{done ? "🔁 Otra frase" : "Reiniciar"}</button>
    </div>
  );
}
