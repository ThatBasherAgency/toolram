"use client";
import { useMemo, useState } from "react";
import { Copy, Check, ArrowRightLeft } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 200)";

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function mdToHtml(md: string): string {
  let h = md;
  h = h.replace(/```([a-z]*)\n([\s\S]*?)```/g, (_, lang, code) => `<pre><code class="lang-${lang}">${escapeHtml(code)}</code></pre>`);
  h = h.replace(/`([^`]+)`/g, "<code>$1</code>");
  h = h.replace(/^###### (.+)$/gm, "<h6>$1</h6>");
  h = h.replace(/^##### (.+)$/gm, "<h5>$1</h5>");
  h = h.replace(/^#### (.+)$/gm, "<h4>$1</h4>");
  h = h.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  h = h.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  h = h.replace(/^# (.+)$/gm, "<h1>$1</h1>");
  h = h.replace(/^---$/gm, "<hr>");
  h = h.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
  h = h.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  h = h.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  h = h.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  h = h.replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>");
  h = h.replace(/^(\s*)[*\-] (.+)$/gm, "$1<li>$2</li>");
  h = h.replace(/^(\s*)\d+\. (.+)$/gm, "$1<li>$2</li>");
  h = h.replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>\n${m}</ul>\n`);
  const lines = h.split("\n").map((l) => {
    const t = l.trim();
    if (!t) return "";
    if (/^<(h[1-6]|ul|ol|li|pre|code|blockquote|hr|img|p|div)/.test(t)) return l;
    if (/^<\/(h[1-6]|ul|ol|li|pre|code|blockquote|p|div)>/.test(t)) return l;
    return `<p>${l}</p>`;
  });
  return lines.join("\n").replace(/<p><\/p>/g, "");
}

function htmlToMd(html: string): string {
  let m = html;
  m = m.replace(/<h([1-6])>(.*?)<\/h\1>/gi, (_, n, t) => "#".repeat(+n) + " " + t);
  m = m.replace(/<strong>(.*?)<\/strong>/gi, "**$1**");
  m = m.replace(/<b>(.*?)<\/b>/gi, "**$1**");
  m = m.replace(/<em>(.*?)<\/em>/gi, "*$1*");
  m = m.replace(/<i>(.*?)<\/i>/gi, "*$1*");
  m = m.replace(/<a href="([^"]+)">(.*?)<\/a>/gi, "[$2]($1)");
  m = m.replace(/<img src="([^"]+)" alt="([^"]*)"\s*\/?>/gi, "![$2]($1)");
  m = m.replace(/<img alt="([^"]*)" src="([^"]+)"\s*\/?>/gi, "![$1]($2)");
  m = m.replace(/<code>(.*?)<\/code>/gi, "`$1`");
  m = m.replace(/<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, "```\n$1\n```");
  m = m.replace(/<blockquote>(.*?)<\/blockquote>/gi, "> $1");
  m = m.replace(/<li>(.*?)<\/li>/gi, "- $1");
  m = m.replace(/<\/?(ul|ol)>/gi, "");
  m = m.replace(/<hr\s*\/?>/gi, "---");
  m = m.replace(/<br\s*\/?>/gi, "\n");
  m = m.replace(/<p>(.*?)<\/p>/gi, "$1\n");
  m = m.replace(/<[^>]+>/g, "");
  m = m.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
  return m.replace(/\n{3,}/g, "\n\n").trim();
}

export function MarkdownHtmlConverter() {
  const [mode, setMode] = useState<"to" | "from">("to");
  const [input, setInput] = useState(`# Hola Mundo

Esto es **negrita** y *cursiva*. Aquí un [enlace](https://toolram.com).

## Lista
- Item 1
- Item 2

\`\`\`js
const x = 42;
\`\`\``);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => mode === "to" ? mdToHtml(input) : htmlToMd(input), [input, mode]);

  async function copy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Markdown ↔ HTML</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Conversor bidireccional + preview en vivo · Headings, listas, links, código, citas.</p>
      </div>

      <div className="flex items-center justify-center gap-3 mb-4">
        <button onClick={() => setMode("to")} className="px-4 py-2 rounded-lg text-sm font-bold transition" style={mode === "to" ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>MD → HTML</button>
        <button onClick={() => setMode(mode === "to" ? "from" : "to")} className="w-10 h-10 rounded-lg bg-[color:var(--color-bg-soft)] flex items-center justify-center"><ArrowRightLeft className="w-4 h-4" /></button>
        <button onClick={() => setMode("from")} className="px-4 py-2 rounded-lg text-sm font-bold transition" style={mode === "from" ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>HTML → MD</button>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)]">
          <div className="px-4 py-2.5 border-b border-[color:var(--color-border)] text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">{mode === "to" ? "Markdown" : "HTML"}</div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-[400px] p-4 bg-transparent font-mono text-sm focus:outline-none resize-none" />
        </div>
        <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)]">
          <div className="px-4 py-2.5 border-b border-[color:var(--color-border)] flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">{mode === "to" ? "HTML / Preview" : "Markdown"}</span>
            <button onClick={copy} className="px-3 py-1 rounded-md bg-[color:var(--color-bg-soft)] text-xs font-bold inline-flex items-center gap-1">
              {copied ? <><Check className="w-3 h-3" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar</>}
            </button>
          </div>
          {mode === "to" ? (
            <div className="grid grid-rows-2 h-[400px]">
              <pre className="p-4 overflow-auto font-mono text-xs border-b border-[color:var(--color-border)] whitespace-pre-wrap">{output}</pre>
              <div className="p-4 overflow-auto prose prose-sm max-w-none [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-bold [&_pre]:bg-black [&_pre]:text-green-300 [&_pre]:p-3 [&_pre]:rounded [&_code]:bg-[color:var(--color-bg-soft)] [&_code]:px-1 [&_code]:rounded [&_a]:text-blue-500 [&_a]:underline" dangerouslySetInnerHTML={{ __html: output }} />
            </div>
          ) : (
            <pre className="h-[400px] p-4 overflow-auto font-mono text-sm whitespace-pre-wrap">{output}</pre>
          )}
        </div>
      </div>

      <AdSlot slot="mdhtml_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">📝 Sintaxis Markdown soportada</strong>
        <div className="grid md:grid-cols-2 gap-2 font-mono text-xs">
          <div>• <code># H1</code> a <code>###### H6</code></div>
          <div>• <code>**negrita**</code> y <code>*cursiva*</code></div>
          <div>• <code>[texto](url)</code></div>
          <div>• <code>![alt](imagen.jpg)</code></div>
          <div>• <code>- lista</code> y <code>1. numerada</code></div>
          <div>• <code>{"```code```"}</code> y <code>`inline`</code></div>
          <div>• <code>{"> cita"}</code></div>
          <div>• <code>---</code> separador</div>
        </div>
      </div>
    </div>
  );
}
