"use client";
import { useMemo, useState } from "react";

function shingles(text: string, k = 5): Set<string> {
  const words = text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").match(/\b[a-z0-9ñ]+\b/g) || [];
  const set = new Set<string>();
  for (let i = 0; i <= words.length - k; i++) {
    set.add(words.slice(i, i + k).join(" "));
  }
  return set;
}

function jaccard(a: Set<string>, b: Set<string>) {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  a.forEach((x) => { if (b.has(x)) inter++; });
  const union = a.size + b.size - inter;
  return inter / union;
}

function findMatches(textA: string, textB: string, minWords = 5) {
  const sA = textA.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const sB = textB.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const wordsA = textA.split(/(\s+)/);
  const matches: { startA: number; endA: number; phrase: string }[] = [];
  const sentencesA: { idx: number; words: string[]; raw: string }[] = [];

  let cur: string[] = [];
  let curStart = 0;
  let i = 0;
  for (const tok of wordsA) {
    if (/^\s+$/.test(tok)) { i += tok.length; continue; }
    if (cur.length === 0) curStart = i;
    cur.push(tok);
    i += tok.length;
    if (/[.!?]$/.test(tok) && cur.length >= minWords) {
      sentencesA.push({ idx: curStart, words: cur.slice(), raw: cur.join(" ") });
      cur = [];
    }
  }
  if (cur.length >= minWords) sentencesA.push({ idx: curStart, words: cur.slice(), raw: cur.join(" ") });

  for (const s of sentencesA) {
    const norm = s.raw.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    if (norm.length > 20 && sB.includes(norm)) {
      matches.push({ startA: s.idx, endA: s.idx + s.raw.length, phrase: s.raw });
    }
  }

  void sA;
  return matches;
}

export function PlagioComparador() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const stats = useMemo(() => {
    if (!a.trim() || !b.trim()) return null;
    const sA = shingles(a);
    const sB = shingles(b);
    const sim = jaccard(sA, sB);
    const matches = findMatches(a, b);
    return { similarity: sim, matches, shinglesA: sA.size, shinglesB: sB.size };
  }, [a, b]);

  const highlighted = useMemo(() => {
    if (!stats || stats.matches.length === 0) return [<span key="0">{a}</span>];
    const sorted = [...stats.matches].sort((x, y) => x.startA - y.startA);
    const parts: React.ReactNode[] = [];
    let last = 0;
    sorted.forEach((m, i) => {
      if (m.startA > last) parts.push(<span key={`t-${i}`}>{a.slice(last, m.startA)}</span>);
      parts.push(<mark key={`m-${i}`} className="bg-[color:var(--color-warning)]/30 rounded px-0.5">{a.slice(m.startA, m.endA)}</mark>);
      last = m.endA;
    });
    if (last < a.length) parts.push(<span key="tail">{a.slice(last)}</span>);
    return parts;
  }, [a, stats]);

  return (
    <div className="space-y-4">
      <div className="card !p-3 text-xs">📋 Compará dos textos para detectar similitudes y frases idénticas. Útil para revisar plagio interno, contenido reutilizado o paráfrasis defectuosa. Algoritmo: shingles de 5 palabras + Jaccard similarity + búsqueda de oraciones idénticas.</div>
      <div className="grid md:grid-cols-2 gap-3">
        <label className="block text-sm">Texto A (original)<textarea className="input mt-1" rows={8} value={a} onChange={(e) => setA(e.target.value)} placeholder="Pegá el texto original…" /></label>
        <label className="block text-sm">Texto B (sospechoso)<textarea className="input mt-1" rows={8} value={b} onChange={(e) => setB(e.target.value)} placeholder="Pegá el texto a comparar…" /></label>
      </div>
      {stats && (
        <>
          <div className="grid grid-cols-3 gap-3">
            <div className="card !p-3 text-center">
              <div className={`text-3xl font-bold ${stats.similarity > 0.4 ? "text-[color:var(--color-danger)]" : stats.similarity > 0.15 ? "text-[color:var(--color-warning)]" : "text-[color:var(--color-success)]"}`}>{(stats.similarity * 100).toFixed(1)}%</div>
              <div className="text-xs uppercase">Similitud Jaccard</div>
            </div>
            <div className="card !p-3 text-center">
              <div className="text-3xl font-bold text-[color:var(--color-brand)]">{stats.matches.length}</div>
              <div className="text-xs uppercase">Frases idénticas</div>
            </div>
            <div className="card !p-3 text-center">
              <div className="text-3xl font-bold text-[color:var(--color-brand)]">{stats.shinglesA + stats.shinglesB}</div>
              <div className="text-xs uppercase">Shingles totales</div>
            </div>
          </div>
          <div className="card !p-3">
            <div className="text-xs uppercase text-[color:var(--color-fg-soft)] mb-2">Texto A con frases coincidentes resaltadas</div>
            <div className="text-sm whitespace-pre-wrap leading-relaxed">{highlighted}</div>
          </div>
          {stats.matches.length > 0 && (
            <div className="card !p-3">
              <div className="text-xs uppercase text-[color:var(--color-fg-soft)] mb-2">Frases en común</div>
              <ul className="space-y-1 text-sm">
                {stats.matches.slice(0, 20).map((m, i) => (
                  <li key={i} className="text-[color:var(--color-fg-soft)] italic">"{m.phrase}"</li>
                ))}
              </ul>
            </div>
          )}
          <div className="card !p-3 text-xs">
            <strong>Interpretación:</strong>
            <ul className="mt-1 space-y-0.5 text-[color:var(--color-fg-soft)]">
              <li>• &lt;15%: Textos distintos, paráfrasis razonable.</li>
              <li>• 15-40%: Reutilización notable, revisar fuentes.</li>
              <li>• &gt;40%: Posible plagio o paráfrasis muy débil.</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
