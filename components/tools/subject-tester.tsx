"use client";
import { useMemo, useState } from "react";
import { Mail, AlertTriangle, CheckCircle2 } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 35)";

const SPAM_WORDS = ["gratis", "100%", "$$$", "ganar dinero", "urgente", "click aquí", "compra ahora", "oferta limitada", "descuento", "promoción", "garantía", "no es spam"];
const POWER_WORDS = ["nuevo", "exclusivo", "secreto", "comprobado", "instantáneo", "fácil", "rápido", "ahorra", "descubre", "guía"];

export function SubjectTester() {
  const [subject, setSubject] = useState("Descubre cómo duplicar tus ventas en 2026");

  const analysis = useMemo(() => {
    const s = subject.trim();
    const lower = s.toLowerCase();
    const words = s.split(/\s+/).filter(Boolean);
    const chars = s.length;
    const hasEmoji = /[\u{1F300}-\u{1FAFF}]/u.test(s);
    const upperWords = words.filter((w) => w.length > 1 && w === w.toUpperCase());
    const hasNumbers = /\d/.test(s);
    const spamFound = SPAM_WORDS.filter((sp) => lower.includes(sp));
    const powerFound = POWER_WORDS.filter((p) => lower.includes(p));
    const exclamations = (s.match(/!/g) || []).length;
    const questions = (s.match(/\?/g) || []).length;

    let score = 50;
    if (chars >= 30 && chars <= 60) score += 20; else if (chars > 60) score -= 10;
    if (hasNumbers) score += 5;
    if (powerFound.length > 0) score += 10;
    if (hasEmoji) score += 5;
    score -= spamFound.length * 8;
    score -= upperWords.length * 5;
    score -= Math.max(0, exclamations - 1) * 5;
    score = Math.max(0, Math.min(100, score));

    return { chars, words: words.length, hasEmoji, upperWords, hasNumbers, spamFound, powerFound, exclamations, questions, score };
  }, [subject]);

  const color = analysis.score >= 70 ? "oklch(0.65 0.18 145)" : analysis.score >= 40 ? "oklch(0.7 0.18 75)" : "oklch(0.6 0.22 35)";
  const label = analysis.score >= 70 ? "Excelente" : analysis.score >= 40 ? "Mejorable" : "Riesgo de spam";

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Tester de Asunto de Email</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Score de tu subject line · Detecta palabras spam · Mejora open rate.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 mb-6">
        <input className="w-full px-4 py-4 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-lg" value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={100} />
        <div className="text-right text-xs text-[color:var(--color-fg-soft)] mt-1 tabular-nums">{analysis.chars}/100 chars · {analysis.words} palabras</div>
      </div>

      <div className="rounded-3xl p-8 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${color}, color-mix(in oklch, ${color} 55%, black))` }}>
        <div className="text-xs uppercase opacity-80 tracking-widest mb-2 inline-flex items-center gap-1.5"><Mail className="w-3 h-3" /> Score del subject</div>
        <div className="text-7xl md:text-8xl font-black tabular-nums">{analysis.score}<span className="text-3xl">/100</span></div>
        <div className="mt-2 text-xl font-bold">{label}</div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mb-6">
        {analysis.spamFound.length > 0 && <div className="rounded-xl bg-[color:var(--color-danger)]/15 border border-[color:var(--color-danger)] p-3"><div className="font-bold text-sm inline-flex items-center gap-1"><AlertTriangle className="w-4 h-4 text-[color:var(--color-danger)]" /> Palabras spam</div><div className="text-xs mt-1">{analysis.spamFound.join(", ")}</div></div>}
        {analysis.powerFound.length > 0 && <div className="rounded-xl bg-[color:var(--color-success)]/15 border border-[color:var(--color-success)] p-3"><div className="font-bold text-sm inline-flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-[color:var(--color-success)]" /> Power words</div><div className="text-xs mt-1">{analysis.powerFound.join(", ")}</div></div>}
        {analysis.upperWords.length > 0 && <div className="rounded-xl bg-[color:var(--color-warning)]/15 border border-[color:var(--color-warning)] p-3"><div className="font-bold text-sm">⚠️ MAYÚSCULAS detectadas</div><div className="text-xs mt-1">{analysis.upperWords.join(", ")}</div></div>}
        {analysis.exclamations > 1 && <div className="rounded-xl bg-[color:var(--color-warning)]/15 border border-[color:var(--color-warning)] p-3"><div className="font-bold text-sm">⚠️ Demasiados signos !</div><div className="text-xs mt-1">{analysis.exclamations} signos · usa máximo 1</div></div>}
      </div>

      <AdSlot slot="subject_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">📈 Mejores prácticas</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">30-60 caracteres</strong> = no se trunca en mobile</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Personalización</strong> ({"{{nombre}}"}) sube open rate 26%</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Números</strong> generan curiosidad ("5 trucos para...")</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Sin GRITAR</strong> (NO MAYÚSCULAS, NO 3+ signos !)</li>
        </ul>
      </div>
    </div>
  );
}
