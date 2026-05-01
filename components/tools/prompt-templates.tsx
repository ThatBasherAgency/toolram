"use client";
import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";

const TEMPLATES = [
  { cat: "SEO", title: "Outline de pillar post", body: "Actuá como estratega SEO. Generá el outline completo (H1, H2 y H3) de un pillar post sobre [TEMA] dirigido a [AUDIENCIA]. El outline debe cubrir las 10 sub-keywords más buscadas y tener entre 2500 y 3500 palabras. Mostralo en formato markdown." },
  { cat: "SEO", title: "Reescribir título y description", body: "Reescribí 5 versiones del siguiente título y meta description para mejorar CTR sin pasar 60 chars el title y 160 chars la description. Mantené el keyword principal. Tema:\n[PEGAR TÍTULO ACTUAL]\n[PEGAR DESCRIPTION ACTUAL]" },
  { cat: "SEO", title: "Análisis de intención de búsqueda", body: "Para la keyword \"[KEYWORD]\", indicame:\n1. Intención de búsqueda dominante (informacional, comercial, transaccional, navegacional)\n2. 5 sub-intenciones secundarias\n3. 10 preguntas que el usuario probablemente quiere resolver\n4. Tipo de contenido ideal (artículo, comparativa, tutorial, listado, calculadora)" },
  { cat: "Redacción", title: "Reescribir párrafo más claro", body: "Reescribí el siguiente párrafo para que sea más claro, más corto y más útil para un lector que no es experto. Mantené el significado original.\n\n[PEGAR PÁRRAFO]" },
  { cat: "Redacción", title: "Resumen ejecutivo", body: "Generá un resumen ejecutivo de 150 palabras del siguiente texto, manteniendo los 3 puntos clave y eliminando todo lo accesorio.\n\n[PEGAR TEXTO]" },
  { cat: "Redacción", title: "Adaptar tono a audiencia", body: "Reescribí el siguiente texto adaptándolo a una audiencia de [AUDIENCIA, ej: gerentes técnicos / madres millennials / adolescentes]. Cambiá vocabulario, ejemplos y referencias culturales acordes.\n\n[PEGAR TEXTO]" },
  { cat: "Programación", title: "Code review", body: "Revisá el siguiente código y dame:\n1. 3 problemas potenciales (seguridad, performance, mantenibilidad)\n2. Sugerencias de mejora con ejemplos\n3. Si hay edge cases no manejados\n\n```\n[PEGAR CÓDIGO]\n```" },
  { cat: "Programación", title: "Convertir entre lenguajes", body: "Convertí el siguiente código de [LENGUAJE ORIGEN] a [LENGUAJE DESTINO]. Mantené la lógica idéntica y aplicá idioms del lenguaje destino.\n\n```\n[PEGAR CÓDIGO]\n```" },
  { cat: "Programación", title: "Generar test", body: "Generá tests unitarios completos para la siguiente función usando [FRAMEWORK ej: Jest / pytest / RSpec]. Incluí happy path, edge cases y errores.\n\n```\n[PEGAR FUNCIÓN]\n```" },
  { cat: "Marketing", title: "Email de outreach", body: "Escribí un email de outreach para [TIPO DE PROSPECT, ej: dueño de startup B2B SaaS] ofreciendo [SERVICIO/PRODUCTO]. Tono profesional pero cercano, máximo 100 palabras, una sola CTA clara." },
  { cat: "Marketing", title: "10 ideas de posts", body: "Dame 10 ideas de posts para LinkedIn sobre [TEMA] dirigido a [AUDIENCIA]. Cada idea con un hook de primera línea y un punto clave a desarrollar." },
  { cat: "Marketing", title: "Plan de contenido 30 días", body: "Diseñá un calendario editorial de 30 días para una marca de [INDUSTRIA] en [PLATAFORMA]. Incluí formato (carrusel, video, texto), tema y CTA por día." },
  { cat: "Análisis", title: "DAFO/FODA", body: "Hacé un análisis FODA de [PROYECTO/EMPRESA/IDEA]. Estructurá en 4 columnas con 4-6 puntos cada una. Sé específico, no genérico." },
  { cat: "Análisis", title: "Pros y contras", body: "Lista los pros y contras de [DECISIÓN/HERRAMIENTA/ESTRATEGIA] desde la perspectiva de [QUIÉN]. Al final dame una recomendación con justificación." },
  { cat: "Análisis", title: "Comparativa honesta", body: "Compará [OPCIÓN A] vs [OPCIÓN B] en una tabla con 8 criterios relevantes. Sé objetivamente honesto: si una es mejor en algo, decilo. Cerrá con \"cuándo elegir cada una\"." },
  { cat: "Aprender", title: "Explicar como a un niño", body: "Explicame [CONCEPTO COMPLEJO] como si tuviera 10 años. Usá analogías cotidianas y evitá jerga técnica." },
  { cat: "Aprender", title: "Plan de estudio", body: "Diseñá un plan de estudio de [DURACIÓN, ej: 30 días] para aprender [TEMA] desde cero. Incluí recursos, hitos semanales y un proyecto final." },
  { cat: "Aprender", title: "Resumir libro", body: "Hacé un resumen de [TÍTULO DEL LIBRO] de [AUTOR]: 5 ideas centrales, 3 ejemplos memorables, y a quién le sirve más leerlo." }
];

export function PromptTemplates() {
  const [filter, setFilter] = useState("");
  const [cat, setCat] = useState("Todas");
  const [copied, setCopied] = useState<number | null>(null);

  const cats = ["Todas", ...Array.from(new Set(TEMPLATES.map((t) => t.cat)))];
  const filtered = useMemo(() => {
    return TEMPLATES.filter((t) => {
      if (cat !== "Todas" && t.cat !== cat) return false;
      if (!filter) return true;
      const f = filter.toLowerCase();
      return t.title.toLowerCase().includes(f) || t.body.toLowerCase().includes(f);
    });
  }, [filter, cat]);

  async function copy(i: number, body: string) {
    await navigator.clipboard.writeText(body);
    setCopied(i);
    setTimeout(() => setCopied(null), 1200);
  }

  return (
    <div className="space-y-4">
      <input className="input" placeholder="Buscar plantilla…" value={filter} onChange={(e) => setFilter(e.target.value)} />
      <div className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`btn ${cat === c ? "btn-primary" : "btn-ghost"} h-8 text-xs`}>{c}</button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map((t, i) => (
          <div key={i} className="card !p-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-xs px-2 py-0.5 rounded bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)] mr-2">{t.cat}</span>
                <span className="font-medium text-sm">{t.title}</span>
              </div>
              <button onClick={() => copy(i, t.body)} className="btn btn-ghost h-7 !px-2 text-xs">{copied === i ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}{copied === i ? "Copiado" : "Copiar"}</button>
            </div>
            <pre className="text-xs font-mono whitespace-pre-wrap text-[color:var(--color-fg-soft)] max-h-32 overflow-auto">{t.body}</pre>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-center text-sm text-[color:var(--color-fg-soft)] py-8">No hay plantillas con ese filtro.</div>}
      </div>
    </div>
  );
}
