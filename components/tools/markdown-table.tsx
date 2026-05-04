"use client";
import { useMemo, useState } from "react";
import { Copy, Check, Plus, Minus } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 200)";

export function MarkdownTable() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [data, setData] = useState<string[][]>([
    ["Producto", "Precio", "Stock"],
    ["Manzana", "$10", "50"],
    ["Pera", "$15", "30"]
  ]);
  const [align, setAlign] = useState<("left" | "center" | "right")[]>(["left", "left", "left"]);
  const [copied, setCopied] = useState(false);

  const md = useMemo(() => {
    if (rows === 0 || cols === 0) return "";
    const widths = Array.from({ length: cols }, (_, c) => Math.max(...data.map((r) => (r[c] || "").length), 3));
    let out = "| ";
    for (let c = 0; c < cols; c++) out += (data[0][c] || "").padEnd(widths[c]) + " | ";
    out += "\n| ";
    for (let c = 0; c < cols; c++) {
      const a = align[c] || "left";
      const dashes = "-".repeat(widths[c]);
      if (a === "center") out += ":" + dashes.slice(1, -1) + ": | ";
      else if (a === "right") out += dashes.slice(1) + ": | ";
      else out += ":" + dashes.slice(1) + " | ";
    }
    for (let r = 1; r < rows; r++) {
      out += "\n| ";
      for (let c = 0; c < cols; c++) out += (data[r]?.[c] || "").padEnd(widths[c]) + " | ";
    }
    return out;
  }, [data, rows, cols, align]);

  function update(r: number, c: number, v: string) {
    const nd = data.map((row) => [...row]);
    if (!nd[r]) nd[r] = [];
    nd[r][c] = v;
    setData(nd);
  }

  function setSize(newR: number, newC: number) {
    setRows(newR); setCols(newC);
    const nd: string[][] = [];
    for (let r = 0; r < newR; r++) { nd[r] = []; for (let c = 0; c < newC; c++) nd[r][c] = data[r]?.[c] || ""; }
    setData(nd);
    setAlign(Array.from({ length: newC }, (_, i) => align[i] || "left"));
  }

  async function copy() {
    await navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador de Tabla Markdown</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Editá la tabla visualmente y copiá el Markdown · Para README, GitHub, blog posts.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <button onClick={() => setSize(rows, cols + 1)} className="px-3 py-1.5 rounded-md bg-[color:var(--color-bg-soft)] text-xs font-bold inline-flex items-center gap-1"><Plus className="w-3 h-3" /> Columna</button>
          <button onClick={() => setSize(rows, Math.max(1, cols - 1))} className="px-3 py-1.5 rounded-md bg-[color:var(--color-bg-soft)] text-xs font-bold inline-flex items-center gap-1"><Minus className="w-3 h-3" /> Columna</button>
          <button onClick={() => setSize(rows + 1, cols)} className="px-3 py-1.5 rounded-md bg-[color:var(--color-bg-soft)] text-xs font-bold inline-flex items-center gap-1"><Plus className="w-3 h-3" /> Fila</button>
          <button onClick={() => setSize(Math.max(2, rows - 1), cols)} className="px-3 py-1.5 rounded-md bg-[color:var(--color-bg-soft)] text-xs font-bold inline-flex items-center gap-1"><Minus className="w-3 h-3" /> Fila</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              {Array.from({ length: rows }, (_, r) => (
                <tr key={r}>
                  {Array.from({ length: cols }, (_, c) => (
                    <td key={c} className="border border-[color:var(--color-border)] p-0">
                      <input className="w-full px-2 py-1.5 bg-transparent text-sm focus:outline-none focus:bg-[color:var(--color-brand-soft)]" style={r === 0 ? { fontWeight: 700 } : {}} value={data[r]?.[c] || ""} onChange={(e) => update(r, c, e.target.value)} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex gap-2 mt-3">
          {Array.from({ length: cols }, (_, c) => (
            <select key={c} value={align[c] || "left"} onChange={(e) => { const na = [...align]; na[c] = e.target.value as "left" | "center" | "right"; setAlign(na); }} className="px-2 py-1 rounded bg-[color:var(--color-bg-soft)] text-xs">
              <option value="left">⊢ izq</option><option value="center">↔ centro</option><option value="right">⊣ der</option>
            </select>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-black/95 text-green-300 p-5 font-mono text-sm relative mb-6">
        <button onClick={copy} className="absolute top-3 right-3 px-3 py-1.5 rounded-md bg-white/10 text-xs text-white inline-flex items-center gap-1">{copied ? <><Check className="w-3 h-3" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar</>}</button>
        <pre className="whitespace-pre pr-20 overflow-x-auto">{md}</pre>
      </div>

      <AdSlot slot="mdtable_inline" format="auto" minHeight={180} className="mb-6" />
    </div>
  );
}
