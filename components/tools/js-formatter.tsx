"use client";
import { useMemo, useState } from "react";
import { Copy, Check, Code2 } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.7 0.18 75)";

function beautifyJs(code: string, indent: string): string {
  let out = "";
  let depth = 0;
  let inStr: string | false = false;
  let inLineComment = false;
  let inBlockComment = false;
  let prev = "";
  for (let i = 0; i < code.length; i++) {
    const c = code[i];
    const next = code[i + 1];
    if (inLineComment) {
      out += c;
      if (c === "\n") inLineComment = false;
      continue;
    }
    if (inBlockComment) {
      out += c;
      if (c === "*" && next === "/") { out += next; i++; inBlockComment = false; }
      continue;
    }
    if (inStr) {
      out += c;
      if (c === inStr && prev !== "\\") inStr = false;
      prev = c;
      continue;
    }
    if (c === "/" && next === "/") { inLineComment = true; out += c; continue; }
    if (c === "/" && next === "*") { inBlockComment = true; out += c; continue; }
    if (c === '"' || c === "'" || c === "`") { inStr = c; out += c; prev = c; continue; }
    if (c === "{") { out += c + "\n" + indent.repeat(++depth); }
    else if (c === "}") {
      depth = Math.max(0, depth - 1);
      out = out.replace(/[\s]*$/, "");
      out += "\n" + indent.repeat(depth) + c;
      if (next && next !== ";" && next !== "," && next !== ")" && next !== "}") out += "\n" + indent.repeat(depth);
    }
    else if (c === ";") {
      out += c;
      if (next && next !== "\n") out += "\n" + indent.repeat(depth);
    }
    else if (c === "\n") {
      if (!out.endsWith("\n") && !out.endsWith("\n" + indent.repeat(depth))) out += "\n" + indent.repeat(depth);
    }
    else out += c;
    prev = c;
  }
  return out.replace(/\n\s+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

function minifyJs(code: string): string {
  let out = "";
  let inStr: string | false = false;
  let inLineComment = false;
  let inBlockComment = false;
  let prev = "";
  for (let i = 0; i < code.length; i++) {
    const c = code[i];
    const next = code[i + 1];
    if (inLineComment) {
      if (c === "\n") inLineComment = false;
      continue;
    }
    if (inBlockComment) {
      if (c === "*" && next === "/") { i++; inBlockComment = false; }
      continue;
    }
    if (inStr) {
      out += c;
      if (c === inStr && prev !== "\\") inStr = false;
      prev = c;
      continue;
    }
    if (c === "/" && next === "/") { inLineComment = true; continue; }
    if (c === "/" && next === "*") { inBlockComment = true; continue; }
    if (c === '"' || c === "'" || c === "`") { inStr = c; out += c; prev = c; continue; }
    if (/\s/.test(c)) {
      const last = out[out.length - 1];
      if (/[a-zA-Z0-9_$]/.test(last) && /[a-zA-Z0-9_$]/.test(next || "")) out += " ";
      continue;
    }
    out += c;
    prev = c;
  }
  return out;
}

export function JsFormatter() {
  const [mode, setMode] = useState<"beautify" | "minify">("beautify");
  const [indent, setIndent] = useState("  ");
  const [input, setInput] = useState(`function fibonacci(n){if(n<2)return n;return fibonacci(n-1)+fibonacci(n-2);}const result=fibonacci(10);console.log("Fibonacci 10:",result);`);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => mode === "beautify" ? beautifyJs(input, indent) : minifyJs(input), [input, mode, indent]);

  async function copy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  const reduction = input.length > 0 ? ((1 - output.length / input.length) * 100).toFixed(1) : "0";

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>JavaScript Beautifier / Minifier</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Formatea o comprime código JavaScript · Respeta strings, comentarios, template literals.</p>
      </div>

      <div className="flex items-center justify-center gap-3 mb-4">
        <button onClick={() => setMode("beautify")} className="px-4 py-2 rounded-lg text-sm font-bold transition" style={mode === "beautify" ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>Beautify</button>
        <button onClick={() => setMode("minify")} className="px-4 py-2 rounded-lg text-sm font-bold transition" style={mode === "minify" ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>Minify</button>
        {mode === "beautify" && (
          <select value={indent} onChange={(e) => setIndent(e.target.value)} className="px-3 py-2 rounded-lg bg-[color:var(--color-bg-soft)] text-sm font-bold">
            <option value="  ">2 espacios</option>
            <option value="    ">4 espacios</option>
            <option value="\t">Tab</option>
          </select>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)]">
          <div className="px-4 py-2.5 border-b border-[color:var(--color-border)] text-xs font-bold uppercase text-[color:var(--color-fg-soft)] flex items-center justify-between">
            <span>JS input</span>
            <span className="tabular-nums">{input.length} chars</span>
          </div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-[400px] p-4 bg-transparent font-mono text-sm focus:outline-none resize-none" />
        </div>
        <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)]">
          <div className="px-4 py-2.5 border-b border-[color:var(--color-border)] flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] inline-flex items-center gap-2"><Code2 className="w-3 h-3" /> Output {mode === "minify" && <span className="text-[color:var(--color-success)]">−{reduction}%</span>}</span>
            <button onClick={copy} className="px-3 py-1 rounded-md bg-[color:var(--color-bg-soft)] text-xs font-bold inline-flex items-center gap-1">
              {copied ? <><Check className="w-3 h-3" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar</>}
            </button>
          </div>
          <pre className="h-[400px] p-4 overflow-auto font-mono text-sm whitespace-pre-wrap">{output}</pre>
        </div>
      </div>

      <AdSlot slot="jsfmt_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">⚡ Cuándo usar cada modo</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">Beautify:</strong> debugging, code review, entender librerías.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Minify:</strong> deploy directo a producción sin bundler. Para builds reales usá esbuild/terser/swc que minifican mejor.</li>
        </ul>
      </div>
    </div>
  );
}
