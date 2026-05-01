"use client";
import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";

function format(css: string) {
  const minified = css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").trim();
  let out = "";
  let indent = 0;
  for (let i = 0; i < minified.length; i++) {
    const c = minified[i];
    if (c === "{") {
      out += " {\n" + "  ".repeat(++indent);
    } else if (c === "}") {
      indent = Math.max(0, indent - 1);
      out = out.replace(/[ \n]+$/, "") + "\n" + "  ".repeat(indent) + "}\n" + "  ".repeat(indent);
    } else if (c === ";") {
      out += ";\n" + "  ".repeat(indent);
    } else {
      out += c;
    }
  }
  return out.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

function minify(css: string) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,>])\s*/g, "$1").replace(/;}/g, "}").trim();
}

export function CssFormatter() {
  const [input, setInput] = useState(".btn{display:inline-flex;align-items:center;gap:.5rem;padding:.5rem 1rem;border-radius:.5rem;background:#6366f1;color:#fff;}.btn:hover{background:#4f46e5;}");
  const [mode, setMode] = useState<"format" | "minify">("format");
  const [copied, setCopied] = useState(false);

  const out = useMemo(() => mode === "format" ? format(input) : minify(input), [input, mode]);

  async function copy() {
    await navigator.clipboard.writeText(out);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="space-y-4">
      <textarea className="input font-mono text-xs" rows={6} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Pegá tu CSS aquí…" />
      <div className="flex gap-2">
        <button onClick={() => setMode("format")} className={`btn ${mode === "format" ? "btn-primary" : "btn-ghost"} flex-1`}>✨ Formatear</button>
        <button onClick={() => setMode("minify")} className={`btn ${mode === "minify" ? "btn-primary" : "btn-ghost"} flex-1`}>📦 Minificar</button>
      </div>
      <div className="card !p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase text-[color:var(--color-fg-soft)]">Resultado · {out.length} chars</span>
          <button onClick={copy} className="btn btn-ghost h-7 !px-2 text-xs">{copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}{copied ? "Copiado" : "Copiar"}</button>
        </div>
        <pre className="text-xs font-mono whitespace-pre-wrap break-all max-h-80 overflow-auto">{out}</pre>
      </div>
      {mode === "minify" && input.length > 0 && (
        <div className="text-xs text-[color:var(--color-fg-soft)]">Reducción: −{Math.max(0, 100 - Math.round((out.length / input.length) * 100))}%</div>
      )}
    </div>
  );
}
