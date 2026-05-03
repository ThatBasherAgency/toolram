"use client";
import { useEffect, useRef, useState } from "react";
import { BarChart3, Download } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 165)";

const PATTERNS_LEFT_ODD = ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"];
const PATTERNS_LEFT_EVEN = ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"];
const PATTERNS_RIGHT = ["1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100"];
const FIRST_DIGIT_ENCODING = ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"];

function calcEAN13Check(code12: string): number {
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += parseInt(code12[i]) * (i % 2 === 0 ? 1 : 3);
  return (10 - (sum % 10)) % 10;
}

function encodeEAN13(code: string): string {
  let bits = "101";
  const pattern = FIRST_DIGIT_ENCODING[parseInt(code[0])];
  for (let i = 0; i < 6; i++) {
    const digit = parseInt(code[i + 1]);
    bits += pattern[i] === "L" ? PATTERNS_LEFT_ODD[digit] : PATTERNS_LEFT_EVEN[digit];
  }
  bits += "01010";
  for (let i = 0; i < 6; i++) bits += PATTERNS_RIGHT[parseInt(code[i + 7])];
  bits += "101";
  return bits;
}

export function BarcodeGenerator() {
  const [code, setCode] = useState("123456789012");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fullCode = code.padEnd(12, "0").slice(0, 12);
  const checkDigit = calcEAN13Check(fullCode);
  const ean13 = fullCode + checkDigit;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const bits = encodeEAN13(ean13);
    const moduleW = 3;
    const padding = 30;
    canvas.width = bits.length * moduleW + padding * 2;
    canvas.height = 220;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = fgColor;
    for (let i = 0; i < bits.length; i++) {
      if (bits[i] === "1") {
        const isLong = i < 3 || (i >= 45 && i < 50) || i >= 92;
        ctx.fillRect(padding + i * moduleW, 20, moduleW, isLong ? 170 : 150);
      }
    }
    ctx.font = "bold 18px monospace";
    ctx.textBaseline = "bottom";
    ctx.fillText(ean13[0], 5, 200);
    let x = padding + 3 * moduleW + 4;
    for (let i = 1; i < 7; i++) { ctx.fillText(ean13[i], x, 218); x += 7 * moduleW; }
    x = padding + 50 * moduleW + 4;
    for (let i = 7; i < 13; i++) { ctx.fillText(ean13[i], x, 218); x += 7 * moduleW; }
  }, [ean13, bgColor, fgColor]);

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `barcode-${ean13}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador de Código de Barras EAN-13</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Crea códigos de barras EAN-13 estándar con dígito verificador automático · Descarga PNG.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6 space-y-4">
        <label className="block">
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Código (12 dígitos · el 13º se calcula)</span>
          <input type="text" inputMode="numeric" maxLength={12} className="w-full mt-1.5 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-2xl font-mono tabular-nums text-center font-bold tracking-widest focus:outline-none focus:border-[color:var(--color-brand)]" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} />
          <div className="text-xs text-[color:var(--color-fg-soft)] mt-1">EAN-13 final: <strong className="text-[color:var(--color-fg)] font-mono">{ean13}</strong></div>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block"><span className="text-xs text-[color:var(--color-fg-soft)]">Fondo</span><input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-10 rounded mt-1 cursor-pointer" /></label>
          <label className="block"><span className="text-xs text-[color:var(--color-fg-soft)]">Barras</span><input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-full h-10 rounded mt-1 cursor-pointer" /></label>
        </div>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-white p-6 mb-6 text-center overflow-x-auto">
        <canvas ref={canvasRef} className="mx-auto" />
      </div>

      <button onClick={download} className="w-full px-4 py-3 rounded-xl text-white font-bold inline-flex items-center justify-center gap-2 mb-6" style={{ background: ACCENT }}>
        <Download className="w-4 h-4" /> Descargar PNG
      </button>

      <AdSlot slot="barcode_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2"><BarChart3 className="w-4 h-4 inline mr-1" /> Sobre EAN-13</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">Estándar mundial</strong> para productos retail desde 1977.</li>
          <li>• Primeros 3 dígitos = país (México 750, España 84, USA 0-1).</li>
          <li>• Para uso comercial real necesitás registrar tu prefijo en GS1.</li>
          <li>• Para tests/etiquetas internas podés usar cualquier código.</li>
        </ul>
      </div>
    </div>
  );
}
