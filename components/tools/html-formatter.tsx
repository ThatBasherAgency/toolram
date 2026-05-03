"use client";
import { useMemo, useState } from "react";
import { Copy, Check, Code2 } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 35)";

const VOID_TAGS = new Set(["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"]);
const INLINE_TAGS = new Set(["a","span","b","i","em","strong","u","small","sub","sup","code","kbd","mark","abbr"]);

function beautifyHtml(html: string, indent: string): string {
  const tokens = html.replace(/>\s*</g, "><").trim().split(/(<[^>]+>)/g).filter((t) => t.length > 0);
  let depth = 0;
  let out = "";
  let lastWasOpenInline = false;
  for (const t of tokens) {
    if (t.startsWith("<!")) { out += t + "\n"; continue; }
    if (t.startsWith("</")) {
      const tag = t.slice(2, -1).toLowerCase();
      if (INLINE_TAGS.has(tag)) { out += t; continue; }
      depth = Math.max(0, depth - 1);
      out += "\n" + indent.repeat(depth) + t;
    } else if (t.startsWith("<")) {
      const m = t.match(/<\s*([a-zA-Z0-9]+)/);
      const tag = m ? m[1].toLowerCase() : "";
      const isVoid = VOID_TAGS.has(tag) || t.endsWith("/>");
      const isInline = INLINE_TAGS.has(tag);
      if (isInline) { out += t; lastWasOpenInline = true; continue; }
      if (out && !out.endsWith("\n")) out += "\n";
      out += indent.repeat(depth) + t;
      if (!isVoid) depth++;
      lastWasOpenInline = false;
    } else {
      const text = t.trim();
      if (!text) continue;
      if (lastWasOpenInline) out += text;
      else out += "\n" + indent.repeat(depth) + text;
      lastWasOpenInline = false;
    }
  }
  return out.replace(/\n{2,}/g, "\n").trim();
}

function minifyHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/>\s+</g, "><")
    .replace(/\s+/g, " ")
    .replace(/<(\w+)\s+>/g, "<$1>")
    .trim();
}

export function HtmlFormatter() {
  const [mode, setMode] = useState<"beautify" | "minify">("beautify");
  const [indent, setIndent] = useState("  ");
  const [input, setInput] = useState(`<div class="hero"><h1>Hola mundo</h1><p>Esto es <strong>HTML</strong> con <a href="#">links</a> y muchas etiquetas.</p><ul><li>Item 1</li><li>Item 2</li></ul></div>`);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    try {
      return mode === "beautify" ? beautifyHtml(input, indent) : minifyHtml(input);
    } catch {
      return input;
    }
  }, [input, mode, indent]);

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
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>HTML Beautifier / Minifier</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Formatea HTML legible o minifícalo para producción · Indent personalizable · Stats en vivo.</p>
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
            <span>HTML input</span>
            <span className="text-[color:var(--color-fg-soft)] tabular-nums">{input.length} chars</span>
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

      <AdSlot slot="htmlfmt_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">⚡ Beautify vs Minify</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">Beautify:</strong> uso en desarrollo, debugging, leer código de terceros.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Minify:</strong> producción, reduce 20-40% del tamaño, mejora carga.</li>
          <li>• Con CDN + gzip/brotli el ahorro real es menor (~5%) pero igual vale para inline HTML.</li>
        </ul>
      </div>
    </div>
  );
}
