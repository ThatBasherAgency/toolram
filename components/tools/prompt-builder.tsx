"use client";
import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";

const TONES = ["profesional", "casual", "técnico", "creativo", "persuasivo", "didáctico", "directo"];
const LENGTHS = ["breve (~100 palabras)", "medio (~300 palabras)", "extenso (~800 palabras)", "exhaustivo (1500+ palabras)"];

export function PromptBuilder() {
  const [role, setRole] = useState("redactor SEO con 10 años de experiencia");
  const [task, setTask] = useState("escribir un artículo sobre energías renovables");
  const [audience, setAudience] = useState("emprendedores latinoamericanos sin conocimiento técnico");
  const [tone, setTone] = useState("profesional");
  const [length, setLength] = useState("medio (~300 palabras)");
  const [format, setFormat] = useState("markdown con H2 cada 250 palabras y bullet points");
  const [examples, setExamples] = useState("");
  const [constraints, setConstraints] = useState("evitar tecnicismos, incluir 1 ejemplo concreto por sección");
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(() => {
    const parts = [
      `# Rol`,
      `Actuá como un ${role}.`,
      ``,
      `# Tarea`,
      task,
      ``,
      `# Audiencia objetivo`,
      audience,
      ``,
      `# Tono y estilo`,
      `Tono: ${tone}.`,
      `Largo deseado: ${length}.`,
      `Formato de salida: ${format}.`,
      ``,
      ...(examples ? [`# Ejemplos de referencia`, examples, ``] : []),
      `# Restricciones`,
      constraints,
      ``,
      `# Antes de empezar`,
      `Si te falta información clave, hacéme 1-3 preguntas. Si todo está claro, comenzá directamente con la tarea.`
    ];
    return parts.filter((p) => p !== undefined).join("\n");
  }, [role, task, audience, tone, length, format, examples, constraints]);

  async function copy() {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="space-y-4">
      <div className="card !p-3 text-xs">🔒 Construcción local. Listo para pegar en ChatGPT, Claude, Gemini, Mistral u otra IA.</div>
      <div className="grid md:grid-cols-2 gap-3">
        <label className="block text-sm md:col-span-2">Rol que asume la IA<input className="input mt-1" value={role} onChange={(e) => setRole(e.target.value)} placeholder="ej. abogado especialista en…" /></label>
        <label className="block text-sm md:col-span-2">Tarea principal<textarea className="input mt-1" rows={2} value={task} onChange={(e) => setTask(e.target.value)} placeholder="ej. resumir el siguiente texto…" /></label>
        <label className="block text-sm md:col-span-2">Audiencia objetivo<input className="input mt-1" value={audience} onChange={(e) => setAudience(e.target.value)} /></label>
        <label className="block text-sm">Tono
          <select className="input mt-1" value={tone} onChange={(e) => setTone(e.target.value)}>
            {TONES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
        <label className="block text-sm">Largo
          <select className="input mt-1" value={length} onChange={(e) => setLength(e.target.value)}>
            {LENGTHS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </label>
        <label className="block text-sm md:col-span-2">Formato de salida<input className="input mt-1" value={format} onChange={(e) => setFormat(e.target.value)} placeholder="markdown, JSON, lista, tabla…" /></label>
        <label className="block text-sm md:col-span-2">Ejemplos few-shot (opcional)<textarea className="input mt-1" rows={2} value={examples} onChange={(e) => setExamples(e.target.value)} placeholder="Pegá 1-2 ejemplos para guiar el estilo" /></label>
        <label className="block text-sm md:col-span-2">Restricciones / requisitos<textarea className="input mt-1" rows={2} value={constraints} onChange={(e) => setConstraints(e.target.value)} /></label>
      </div>
      <div className="card !p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase text-[color:var(--color-fg-soft)]">Prompt generado · {prompt.length} chars</span>
          <button onClick={copy} className="btn btn-ghost h-7 !px-2 text-xs">{copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}{copied ? "Copiado" : "Copiar"}</button>
        </div>
        <pre className="text-xs font-mono whitespace-pre-wrap max-h-80 overflow-auto">{prompt}</pre>
      </div>
    </div>
  );
}
