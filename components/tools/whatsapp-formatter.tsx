"use client";
import { useMemo, useState } from "react";
import { Copy, Check, Eraser } from "lucide-react";

type Mark = { key: string; label: string; wrap: string; hint: string };

const MARKS: Mark[] = [
  { key: "bold", label: "Negrita", wrap: "*", hint: "*texto*" },
  { key: "italic", label: "Cursiva", wrap: "_", hint: "_texto_" },
  { key: "strike", label: "Tachado", wrap: "~", hint: "~texto~" },
  { key: "mono", label: "Monoespaciado", wrap: "```", hint: "```texto```" }
];

/** Envuelve el texto con el marcador de WhatsApp, respetando saltos de línea. */
function applyMark(text: string, wrap: string): string {
  if (!text.trim()) return text;
  return text
    .split("\n")
    .map((line) => (line.trim() ? `${wrap}${line}${wrap}` : line))
    .join("\n");
}

/** Renderiza el marcado de WhatsApp a HTML para la vista previa. */
function toPreviewHtml(raw: string): string {
  const escaped = raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped
    .replace(/```([^`]+)```/g, "<code>$1</code>")
    .replace(/(^|\s)\*([^*\n]+)\*/g, "$1<strong>$2</strong>")
    .replace(/(^|\s)_([^_\n]+)_/g, "$1<em>$2</em>")
    .replace(/(^|\s)~([^~\n]+)~/g, "$1<s>$2</s>")
    .replace(/\n/g, "<br/>");
}

export function WhatsappFormatter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const preview = useMemo(() => toPreviewHtml(text), [text]);
  const chars = text.length;

  function mark(wrap: string) {
    const el = document.getElementById("wa-input") as HTMLTextAreaElement | null;
    // Si hay selección, marcamos solo eso; si no, el texto completo.
    if (el && el.selectionStart !== el.selectionEnd) {
      const { selectionStart: s, selectionEnd: e } = el;
      setText(text.slice(0, s) + applyMark(text.slice(s, e), wrap) + text.slice(e));
      return;
    }
    setText(applyMark(text, wrap));
  }

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="wa-input" className="block text-xs uppercase mb-1">
          Tu mensaje
        </label>
        <textarea
          id="wa-input"
          className="input w-full min-h-[140px] font-mono text-sm"
          placeholder="Escribe o pega tu mensaje. Selecciona una parte y pulsa un formato para aplicarlo solo a esa parte."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {MARKS.map((m) => (
          <button key={m.key} onClick={() => mark(m.wrap)} className="btn btn-primary" title={m.hint}>
            {m.label}
          </button>
        ))}
        <button onClick={copy} disabled={!text} className="btn btn-ghost">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? "Copiado" : "Copiar"}
        </button>
        <button onClick={() => setText("")} disabled={!text} className="btn btn-ghost">
          <Eraser className="w-4 h-4" /> Limpiar
        </button>
      </div>

      <div>
        <div className="text-xs uppercase mb-1">Vista previa (como se ve en WhatsApp)</div>
        <div className="card !p-3 min-h-[64px]">
          {text ? (
            <div className="text-sm whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: preview }} />
          ) : (
            <div className="text-sm text-[color:var(--color-fg-soft)]">La vista previa aparecerá aquí.</div>
          )}
        </div>
        <div className="text-xs text-[color:var(--color-fg-soft)] mt-1">{chars} caracteres</div>
      </div>

      <div className="card !p-3">
        <div className="text-xs uppercase mb-2">Cómo funciona el formato de WhatsApp</div>
        <ul className="text-sm space-y-1 font-mono">
          {MARKS.map((m) => (
            <li key={m.key}>
              <span className="text-[color:var(--color-fg-soft)]">{m.label}:</span> {m.hint}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
