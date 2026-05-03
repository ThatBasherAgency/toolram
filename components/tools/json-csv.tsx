"use client";
import { useMemo, useState } from "react";
import { Copy, Check, ArrowRightLeft } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.65 0.2 145)";

function jsonToCsv(json: string, sep: string): string {
  const data = JSON.parse(json);
  const arr = Array.isArray(data) ? data : [data];
  if (arr.length === 0) return "";
  const keys = Array.from(new Set(arr.flatMap((r) => Object.keys(r))));
  const escape = (v: unknown) => {
    if (v === null || v === undefined) return "";
    const s = typeof v === "object" ? JSON.stringify(v) : String(v);
    if (s.includes(sep) || s.includes('"') || s.includes("\n")) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  return [keys.join(sep), ...arr.map((r) => keys.map((k) => escape(r[k])).join(sep))].join("\n");
}

function parseCsvLine(line: string, sep: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuote = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQuote) {
      if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') inQuote = false;
      else cur += c;
    } else {
      if (c === '"') inQuote = true;
      else if (c === sep) { out.push(cur); cur = ""; }
      else cur += c;
    }
  }
  out.push(cur);
  return out;
}

function csvToJson(csv: string, sep: string): string {
  const lines = csv.split(/\r?\n/).filter((l) => l.length > 0);
  if (lines.length === 0) return "[]";
  const headers = parseCsvLine(lines[0], sep);
  const rows = lines.slice(1).map((line) => {
    const fields = parseCsvLine(line, sep);
    const obj: Record<string, unknown> = {};
    headers.forEach((h, i) => {
      const v = fields[i] ?? "";
      if (v === "") obj[h] = null;
      else if (!isNaN(Number(v)) && v.trim() !== "") obj[h] = Number(v);
      else if (v === "true") obj[h] = true;
      else if (v === "false") obj[h] = false;
      else obj[h] = v;
    });
    return obj;
  });
  return JSON.stringify(rows, null, 2);
}

export function JsonCsvConverter() {
  const [mode, setMode] = useState<"to" | "from">("to");
  const [sep, setSep] = useState(",");
  const [input, setInput] = useState(`[
  {"nombre": "Juan", "edad": 30, "ciudad": "CDMX"},
  {"nombre": "Ana", "edad": 25, "ciudad": "Lima"},
  {"nombre": "Luis", "edad": 35, "ciudad": "Madrid"}
]`);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    try {
      setError(null);
      return mode === "to" ? jsonToCsv(input, sep) : csvToJson(input, sep);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error de parseo");
      return "";
    }
  }, [input, mode, sep]);

  async function copy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  function swap() {
    setMode(mode === "to" ? "from" : "to");
    setInput(output || input);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Conversor JSON ↔ CSV</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Convierte entre JSON y CSV en ambas direcciones · Soporta separadores , ; \t · Detección de tipos automática.</p>
      </div>

      <div className="flex items-center justify-center gap-3 mb-4">
        <button onClick={() => setMode("to")} className="px-4 py-2 rounded-lg text-sm font-bold transition" style={mode === "to" ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>JSON → CSV</button>
        <button onClick={swap} className="w-10 h-10 rounded-lg bg-[color:var(--color-bg-soft)] flex items-center justify-center"><ArrowRightLeft className="w-4 h-4" /></button>
        <button onClick={() => setMode("from")} className="px-4 py-2 rounded-lg text-sm font-bold transition" style={mode === "from" ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>CSV → JSON</button>
        <select value={sep} onChange={(e) => setSep(e.target.value)} className="px-3 py-2 rounded-lg bg-[color:var(--color-bg-soft)] text-sm font-bold">
          <option value=",">coma ,</option>
          <option value=";">punto y coma ;</option>
          <option value="\t">tab</option>
          <option value="|">pipe |</option>
        </select>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)]">
          <div className="px-4 py-2.5 border-b border-[color:var(--color-border)] text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">{mode === "to" ? "JSON" : "CSV"}</div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-[400px] p-4 bg-transparent font-mono text-sm focus:outline-none resize-none" />
        </div>
        <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)]">
          <div className="px-4 py-2.5 border-b border-[color:var(--color-border)] flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">{mode === "to" ? "CSV" : "JSON"}</span>
            <button onClick={copy} className="px-3 py-1 rounded-md bg-[color:var(--color-bg-soft)] text-xs font-bold inline-flex items-center gap-1">
              {copied ? <><Check className="w-3 h-3" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar</>}
            </button>
          </div>
          <pre className="h-[400px] p-4 overflow-auto font-mono text-sm whitespace-pre-wrap">{error ? `❌ ${error}` : output}</pre>
        </div>
      </div>

      <AdSlot slot="jsoncsv_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">📋 Casos de uso</strong>
        <ul className="space-y-1">
          <li>• Exportar datos de API JSON a Excel/Google Sheets (CSV).</li>
          <li>• Importar CSVs de exportaciones (WooCommerce, Shopify) a JSON para procesar.</li>
          <li>• Migrar datos entre sistemas con formatos distintos.</li>
        </ul>
      </div>
    </div>
  );
}
