"use client";
import { useMemo, useState } from "react";
import { Hash, Copy, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.2 265)";

const UNIDADES = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
const ESPECIALES = ["diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];
const DECENAS = ["", "diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
const CENTENAS = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];

function decenas(n: number): string {
  if (n < 10) return UNIDADES[n];
  if (n < 20) return ESPECIALES[n - 10];
  if (n < 30) {
    if (n === 20) return "veinte";
    return "veinti" + UNIDADES[n - 20];
  }
  const d = Math.floor(n / 10);
  const u = n % 10;
  return DECENAS[d] + (u ? " y " + UNIDADES[u] : "");
}

function centenas(n: number): string {
  if (n < 100) return decenas(n);
  if (n === 100) return "cien";
  const c = Math.floor(n / 100);
  const r = n % 100;
  return CENTENAS[c] + (r ? " " + decenas(r) : "");
}

function miles(n: number): string {
  if (n < 1000) return centenas(n);
  const m = Math.floor(n / 1000);
  const r = n % 1000;
  let pre: string;
  if (m === 1) pre = "mil";
  else pre = centenas(m) + " mil";
  pre = pre.replace("uno mil", "un mil");
  return pre + (r ? " " + centenas(r) : "");
}

function millones(n: number): string {
  if (n < 1_000_000) return miles(n);
  const m = Math.floor(n / 1_000_000);
  const r = n % 1_000_000;
  const pre = m === 1 ? "un millón" : miles(m) + " millones";
  return pre + (r ? " " + miles(r) : "");
}

function millardos(n: number): string {
  if (n < 1_000_000_000) return millones(n);
  const m = Math.floor(n / 1_000_000_000);
  const r = n % 1_000_000_000;
  const pre = m === 1 ? "mil millones" : miles(m) + " mil millones";
  return pre + (r ? " " + millones(r) : "");
}

function numToWords(input: string): string {
  const cleaned = input.replace(/\s/g, "").replace(",", ".");
  const num = parseFloat(cleaned);
  if (isNaN(num)) return "—";
  if (num === 0) return "cero";
  if (Math.abs(num) >= 1_000_000_000_000) return "Número fuera de rango";
  const sign = num < 0 ? "menos " : "";
  const abs = Math.abs(num);
  const intPart = Math.floor(abs);
  const decPart = Math.round((abs - intPart) * 100);
  let words = sign + millardos(intPart);
  if (decPart > 0) {
    words += ` con ${decenas(decPart) || decPart} centavos`;
  }
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function moneda(input: string, code: string, plural: string, centavos: string): string {
  const cleaned = input.replace(/\s/g, "").replace(",", ".");
  const num = parseFloat(cleaned);
  if (isNaN(num) || num < 0) return "—";
  const intPart = Math.floor(num);
  const decPart = Math.round((num - intPart) * 100);
  const main = intPart === 1 ? `un ${code}` : `${millardos(intPart)} ${plural}`;
  if (decPart === 0) return main + " con 00/100";
  return `${main} con ${decPart.toString().padStart(2, "0")}/100`;
}

export function NumberToWords() {
  const [input, setInput] = useState("1234.56");
  const [copied, setCopied] = useState<string | null>(null);

  const variants = useMemo(() => ({
    "Texto general": numToWords(input),
    "Pesos mexicanos": moneda(input, "peso mexicano", "pesos mexicanos", "centavos"),
    "Pesos argentinos": moneda(input, "peso argentino", "pesos argentinos", "centavos"),
    "Dólares": moneda(input, "dólar", "dólares", "centavos"),
    "Euros": moneda(input, "euro", "euros", "céntimos")
  }), [input]);

  async function copy(k: string, v: string) {
    await navigator.clipboard.writeText(v);
    setCopied(k);
    setTimeout(() => setCopied(null), 1200);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Número a Letras</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Convierte cualquier número a texto en español. Ideal para cheques, facturas, contratos.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6">
        <label className="block">
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Número</span>
          <input type="text" inputMode="decimal" className="w-full mt-1.5 px-4 py-4 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-3xl md:text-4xl font-bold tabular-nums focus:outline-none focus:border-[color:var(--color-brand)]" value={input} onChange={(e) => setInput(e.target.value)} placeholder="1234.56" />
        </label>
        <div className="flex flex-wrap gap-2 mt-4">
          {[100, 1500, 25000, 1000000, 1234567.89].map((n) => (
            <button key={n} onClick={() => setInput(String(n))} className="text-xs px-3 py-1.5 rounded-md bg-[color:var(--color-bg-soft)] hover:shadow-sm font-medium">{n.toLocaleString("es")}</button>
          ))}
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {Object.entries(variants).map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] flex items-center gap-1.5"><Hash className="w-3.5 h-3.5" style={{ color: ACCENT }} /> {k}</div>
              <button onClick={() => copy(k, v)} className="text-xs font-semibold inline-flex items-center gap-1 hover:opacity-80" style={{ color: ACCENT }}>
                {copied === k ? <><Check className="w-3.5 h-3.5" /> Copiado</> : <><Copy className="w-3.5 h-3.5" /> Copiar</>}
              </button>
            </div>
            <div className="text-base md:text-lg font-medium leading-relaxed first-letter:capitalize">{v}</div>
          </div>
        ))}
      </div>

      <AdSlot slot="numwords_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">Casos de uso comunes</strong>
        Cheques bancarios (donde el monto debe escribirse en letras), facturas y recibos formales, contratos legales, declaraciones juradas. El formato &ldquo;XX/100&rdquo; al final de los centavos es estándar mexicano y latinoamericano para documentos formales.
      </div>
    </div>
  );
}
