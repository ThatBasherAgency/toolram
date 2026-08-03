"use client";
import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";

const PRESETS: { label: string; expr: string }[] = [
  { label: "Cada minuto", expr: "* * * * *" },
  { label: "Cada 5 minutos", expr: "*/5 * * * *" },
  { label: "Cada hora en punto", expr: "0 * * * *" },
  { label: "Todos los días 00:00", expr: "0 0 * * *" },
  { label: "Todos los días 03:30", expr: "30 3 * * *" },
  { label: "Lunes a viernes 09:00", expr: "0 9 * * 1-5" },
  { label: "Cada lunes 08:00", expr: "0 8 * * 1" },
  { label: "Día 1 de cada mes", expr: "0 0 1 * *" }
];

const DOW = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

/** Traduce un campo cron a lenguaje natural en español. */
function describeField(value: string, unit: "min" | "hour" | "dom" | "month" | "dow"): string {
  if (value === "*") return "";
  const names = unit === "dow" ? DOW : unit === "month" ? MONTHS : null;
  const label = (n: string) => {
    const i = parseInt(n, 10);
    if (!names || Number.isNaN(i)) return n;
    return unit === "month" ? names[i - 1] ?? n : names[i % 7] ?? n;
  };
  if (value.startsWith("*/")) return `cada ${value.slice(2)}`;
  if (value.includes("-")) {
    const [a, b] = value.split("-");
    return `de ${label(a)} a ${label(b)}`;
  }
  if (value.includes(",")) return value.split(",").map(label).join(", ");
  return label(value);
}

function humanize(expr: string): string {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return "Expresión incompleta: se esperan 5 campos (minuto hora día-mes mes día-semana).";
  const [min, hour, dom, month, dow] = parts;

  let when: string;
  if (min === "*" && hour === "*") when = "Cada minuto";
  else if (min.startsWith("*/") && hour === "*") when = `Cada ${min.slice(2)} minutos`;
  else if (hour === "*") when = `En el minuto ${min} de cada hora`;
  else if (min === "*") when = `Cada minuto de las ${hour}`;
  else when = `A las ${hour.padStart(2, "0")}:${min.padStart(2, "0")}`;

  const bits: string[] = [];
  if (dow !== "*") bits.push(`los ${describeField(dow, "dow")}`);
  if (dom !== "*") bits.push(`el día ${describeField(dom, "dom")} del mes`);
  if (month !== "*") bits.push(`en ${describeField(month, "month")}`);
  if (!bits.length) bits.push("todos los días");

  return `${when}, ${bits.join(", ")}.`;
}

function isValid(expr: string): boolean {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return false;
  return parts.every((p) => /^(\*|\d+|\*\/\d+|\d+-\d+|\d+(,\d+)*)$/.test(p));
}

export function CronGenerator() {
  const [expr, setExpr] = useState("0 9 * * 1-5");
  const [copied, setCopied] = useState(false);

  const valid = useMemo(() => isValid(expr), [expr]);
  const human = useMemo(() => (valid ? humanize(expr) : "Expresión no válida."), [expr, valid]);

  async function copy() {
    await navigator.clipboard.writeText(expr);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="cron-expr" className="block text-xs uppercase mb-1">
          Expresión cron
        </label>
        <input
          id="cron-expr"
          className="input w-full font-mono"
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          placeholder="0 9 * * 1-5"
        />
        <div className="text-xs text-[color:var(--color-fg-soft)] mt-1 font-mono">minuto hora día-del-mes mes día-de-la-semana</div>
      </div>

      <div className={`card !p-3 ${valid ? "" : "opacity-70"}`}>
        <div className="text-xs uppercase mb-1">Qué significa</div>
        <div className="text-sm">{human}</div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={copy} disabled={!valid} className="btn btn-primary">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? "Copiado" : "Copiar expresión"}
        </button>
      </div>

      <div>
        <div className="text-xs uppercase mb-2">Presets frecuentes</div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button key={p.expr} onClick={() => setExpr(p.expr)} className="btn btn-ghost text-xs">
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="card !p-3">
        <div className="text-xs uppercase mb-2">Referencia de campos</div>
        <ul className="text-sm space-y-1">
          <li><span className="font-mono">minuto</span> — 0 a 59</li>
          <li><span className="font-mono">hora</span> — 0 a 23</li>
          <li><span className="font-mono">día del mes</span> — 1 a 31</li>
          <li><span className="font-mono">mes</span> — 1 a 12</li>
          <li><span className="font-mono">día de la semana</span> — 0 a 6 (0 = domingo)</li>
        </ul>
        <div className="text-sm mt-2 text-[color:var(--color-fg-soft)]">
          Comodines: <span className="font-mono">*</span> cualquiera · <span className="font-mono">*/n</span> cada n ·{" "}
          <span className="font-mono">a-b</span> rango · <span className="font-mono">a,b</span> lista
        </div>
      </div>
    </div>
  );
}
