"use client";
import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";

const TEMPLATES = [
  (kw: string, year: number) => `${kw}: guía completa ${year}`,
  (kw: string, year: number) => `Cómo ${kw} paso a paso (${year})`,
  (kw: string) => `${kw} — todo lo que necesitás saber`,
  (kw: string, year: number) => `10 mejores herramientas para ${kw} en ${year}`,
  (kw: string) => `${kw}: errores comunes y cómo evitarlos`,
  (kw: string) => `¿Qué es ${kw}? Definición y ejemplos`,
  (kw: string, year: number) => `${kw} para principiantes: tutorial ${year}`,
  (kw: string) => `${kw} vs alternativas: comparativa honesta`,
  (kw: string) => `${kw} en 5 minutos`,
  (kw: string) => `La verdad sobre ${kw}`,
  (kw: string, year: number) => `${kw}: tendencias ${year} que debés conocer`,
  (kw: string) => `Por qué ${kw} es más importante de lo que crees`,
  (kw: string) => `${kw}: 7 secretos que nadie te cuenta`,
  (kw: string, year: number) => `Mi experiencia con ${kw} en ${year}`,
  (kw: string) => `Guía rápida de ${kw} para no expertos`
];

export function TitleGenerator() {
  const [keyword, setKeyword] = useState("redes sociales");
  const [copied, setCopied] = useState<number | null>(null);

  const titles = useMemo(() => {
    const year = new Date().getFullYear();
    return TEMPLATES.map((tpl) => {
      const out = tpl(keyword.trim() || "tu tema", year);
      return out.charAt(0).toUpperCase() + out.slice(1);
    });
  }, [keyword]);

  async function copy(i: number) {
    await navigator.clipboard.writeText(titles[i]);
    setCopied(i);
    setTimeout(() => setCopied(null), 1200);
  }

  return (
    <div className="space-y-4">
      <div className="card !p-3 text-xs">💡 Plantillas SEO probadas. Editá el keyword y obtené 15 variantes inspiradas en CTR alto.</div>
      <label className="block text-sm">Keyword principal<input className="input mt-1" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="ej. dieta keto, cómo dormir mejor, marketing digital" /></label>
      <div className="space-y-2">
        {titles.map((t, i) => (
          <div key={i} className="card !p-3 flex items-center gap-2">
            <span className={`text-xs font-mono w-6 text-[color:var(--color-fg-soft)]`}>{i + 1}.</span>
            <span className={`flex-1 text-sm ${t.length > 60 ? "text-[color:var(--color-warning)]" : ""}`}>{t}</span>
            <span className="text-xs text-[color:var(--color-fg-soft)] tabular-nums whitespace-nowrap">{t.length}/60</span>
            <button onClick={() => copy(i)} className="btn btn-ghost h-7 !px-2 text-xs">{copied === i ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
