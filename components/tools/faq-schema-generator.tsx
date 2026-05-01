"use client";
import { useMemo, useState } from "react";
import { Copy, Check, Plus, Trash } from "lucide-react";

type QA = { q: string; a: string };

export function FaqSchemaGenerator() {
  const [items, setItems] = useState<QA[]>([
    { q: "¿Es gratis Toolram?", a: "Sí, todas las herramientas son 100% gratis sin registro ni marca de agua." },
    { q: "¿Sube mis archivos a un servidor?", a: "No. La mayoría de las herramientas procesan los datos en tu navegador." }
  ]);
  const [copied, setCopied] = useState(false);

  const json = useMemo(() => {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.filter((i) => i.q && i.a).map((i) => ({
        "@type": "Question",
        name: i.q,
        acceptedAnswer: { "@type": "Answer", text: i.a }
      }))
    }, null, 2);
  }, [items]);

  const html = `<script type="application/ld+json">\n${json}\n</script>`;

  function update(i: number, k: keyof QA, v: string) {
    setItems((xs) => xs.map((x, idx) => idx === i ? { ...x, [k]: v } : x));
  }
  function add() { setItems((xs) => [...xs, { q: "", a: "" }]); }
  function remove(i: number) { setItems((xs) => xs.filter((_, idx) => idx !== i)); }

  async function copy() {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className="card !p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase text-[color:var(--color-fg-soft)]">Pregunta #{i + 1}</span>
              {items.length > 1 && <button onClick={() => remove(i)} className="text-xs text-[color:var(--color-danger)]"><Trash className="w-3 h-3 inline" /> Eliminar</button>}
            </div>
            <input className="input" placeholder="Pregunta" value={it.q} onChange={(e) => update(i, "q", e.target.value)} />
            <textarea className="input" rows={2} placeholder="Respuesta" value={it.a} onChange={(e) => update(i, "a", e.target.value)} />
          </div>
        ))}
        <button onClick={add} className="btn btn-ghost"><Plus className="w-4 h-4" /> Agregar pregunta</button>
      </div>
      <div className="card !p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase text-[color:var(--color-fg-soft)]">JSON-LD listo para pegar en &lt;head&gt;</span>
          <button onClick={copy} className="btn btn-ghost h-7 !px-2 text-xs">{copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}{copied ? "Copiado" : "Copiar"}</button>
        </div>
        <pre className="text-xs font-mono whitespace-pre-wrap break-all max-h-80 overflow-auto">{html}</pre>
      </div>
    </div>
  );
}
