"use client";
import { useState } from "react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 280)";

const KEYS_SCI = [
  ["sin", "cos", "tan", "π", "e"],
  ["asin", "acos", "atan", "ln", "log"],
  ["x²", "x³", "xʸ", "√", "∛"],
  ["(", ")", "%", "!", "1/x"]
];
const KEYS_NUM = [
  ["7", "8", "9", "÷"],
  ["4", "5", "6", "×"],
  ["1", "2", "3", "−"],
  ["0", ".", "Ans", "+"]
];

function safeEval(expr: string): number | string {
  try {
    let e = expr
      .replace(/π/g, "Math.PI")
      .replace(/(?<![a-z])e(?![a-z])/g, "Math.E")
      .replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-")
      .replace(/\^/g, "**")
      .replace(/sin\(/g, "Math.sin(")
      .replace(/cos\(/g, "Math.cos(")
      .replace(/tan\(/g, "Math.tan(")
      .replace(/asin\(/g, "Math.asin(")
      .replace(/acos\(/g, "Math.acos(")
      .replace(/atan\(/g, "Math.atan(")
      .replace(/ln\(/g, "Math.log(")
      .replace(/log\(/g, "Math.log10(")
      .replace(/√\(/g, "Math.sqrt(")
      .replace(/∛\(/g, "Math.cbrt(")
      .replace(/(\d+(?:\.\d+)?)!/g, (_, n) => {
        let r = 1;
        for (let i = 2; i <= +n; i++) r *= i;
        return r.toString();
      });
    if (!/^[\d\s+\-*/().,**MathPIeEloglnsqrtcbrtinasoact]+$/.test(e)) return "Error";
    const r = Function(`"use strict";return (${e})`)();
    if (typeof r !== "number" || !isFinite(r)) return "Error";
    return Math.abs(r) < 1e-12 ? 0 : r;
  } catch {
    return "Error";
  }
}

export function ScientificCalculator() {
  const [display, setDisplay] = useState("0");
  const [expr, setExpr] = useState("");
  const [ans, setAns] = useState("0");
  const [deg, setDeg] = useState(true);

  function input(k: string) {
    if (display === "Error" || display === "0") {
      if (["+", "−", "×", "÷", ")", "%", "!"].includes(k)) {
        setDisplay(display === "0" ? "0" + k : k);
        return;
      }
      setDisplay(k);
      return;
    }
    if (k === "x²") { setDisplay(display + "**2"); return; }
    if (k === "x³") { setDisplay(display + "**3"); return; }
    if (k === "xʸ") { setDisplay(display + "^"); return; }
    if (k === "√") { setDisplay(display + "√("); return; }
    if (k === "∛") { setDisplay(display + "∛("); return; }
    if (k === "1/x") { setDisplay("1/(" + display + ")"); return; }
    if (["sin", "cos", "tan", "asin", "acos", "atan", "ln", "log"].includes(k)) {
      setDisplay(display + k + "(");
      return;
    }
    if (k === "Ans") { setDisplay(display + ans); return; }
    setDisplay(display + k);
  }

  function clear() { setDisplay("0"); setExpr(""); }
  function back() { setDisplay(display.length > 1 ? display.slice(0, -1) : "0"); }
  function equals() {
    let e = display;
    if (deg) {
      e = e.replace(/(?<!a)(sin|cos|tan)\(([^)]+)\)/g, (_, fn, arg) => `${fn}((${arg})*Math.PI/180)`);
    }
    const r = safeEval(e);
    if (typeof r === "number") {
      setExpr(display);
      const formatted = r.toString();
      setDisplay(formatted);
      setAns(formatted);
    } else {
      setDisplay("Error");
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Calculadora Científica</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Trigonometría, logaritmos, potencias, raíces, factoriales, π y e.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4 md:p-6 mb-6">
        <div className="rounded-2xl bg-black text-white p-5 mb-4">
          <div className="text-xs opacity-60 h-4 font-mono">{expr}</div>
          <div className="text-4xl md:text-5xl font-mono font-bold text-right tabular-nums break-all min-h-[60px] flex items-end justify-end">{display}</div>
          <div className="flex justify-between text-xs opacity-60 mt-2">
            <span>Ans: {ans}</span>
            <button onClick={() => setDeg(!deg)} className="font-bold">{deg ? "DEG" : "RAD"}</button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-1.5 mb-1.5">
          {KEYS_SCI.flat().map((k) => (
            <button key={k} onClick={() => input(k)} className="px-2 py-2.5 rounded-lg text-xs font-bold bg-[color:var(--color-bg-soft)] hover:bg-[color:var(--color-fg)]/10">{k}</button>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-1.5">
          <button onClick={clear} className="col-span-2 px-3 py-3 rounded-lg text-sm font-bold bg-[color:var(--color-danger)]/15 text-[color:var(--color-danger)]">AC</button>
          <button onClick={back} className="px-3 py-3 rounded-lg text-sm font-bold bg-[color:var(--color-fg-soft)]/15">⌫</button>
          <button onClick={() => input("÷")} className="px-3 py-3 rounded-lg text-sm font-bold bg-[color:var(--color-bg-soft)] hover:bg-[color:var(--color-fg)]/10">÷</button>
          {KEYS_NUM.flat().map((k, i) => (
            <button key={i} onClick={() => k === "Ans" ? input("Ans") : input(k)} className="px-3 py-3 rounded-lg text-sm font-bold bg-[color:var(--color-bg-soft)] hover:bg-[color:var(--color-fg)]/10">{k}</button>
          ))}
          <button onClick={equals} className="col-span-4 px-3 py-3 rounded-lg text-sm font-bold text-white" style={{ background: ACCENT }}>=</button>
        </div>
      </div>

      <AdSlot slot="scicalc_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">📊 Funciones disponibles</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">Trigonometría:</strong> sin, cos, tan + sus inversas (asin, acos, atan).</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Logaritmos:</strong> ln (natural, base e), log (base 10).</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Potencias:</strong> x², x³, xʸ (cualquier potencia).</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Raíces:</strong> √ (cuadrada), ∛ (cúbica).</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Constantes:</strong> π (3.14159...), e (2.71828...).</li>
          <li>• <strong className="text-[color:var(--color-fg)]">DEG/RAD:</strong> alterna unidades para funciones trigonométricas.</li>
        </ul>
      </div>
    </div>
  );
}
