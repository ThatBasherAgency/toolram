"use client";
import { useMemo, useState } from "react";
import { FileSearch, AlertTriangle } from "lucide-react";

const COMBINING = /[̀-ͯ]/g;

function shingles(text: string, k = 5): Set<string> {
  const words = text.toLowerCase().normalize("NFD").replace(COMBINING, "").match(/\b[a-z0-9ñ]+\b/g) || [];
  const set = new Set<string>();
  for (let i = 0; i <= words.length - k; i++) set.add(words.slice(i, i + k).join(" "));
  return set;
}
function jaccard(a: Set<string>, b: Set<string>) {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  a.forEach((x) => { if (b.has(x)) inter++; });
  return inter / (a.size + b.size - inter);
}
function findMatches(textA: string, textB: string, minWords = 5) {
  const sB = textB.toLowerCase().normalize("NFD").replace(COMBINING, "");
  const wordsA = textA.split(/(\s+)/);
  const matches: { startA: number; endA: number; phrase: string }[] = [];
  const sentencesA: { idx: number; raw: string }[] = [];
  let cur: string[] = [];
  let curStart = 0;
  let i = 0;
  for (const tok of wordsA) {
    if (/^\s+$/.test(tok)) { i += tok.length; continue; }
    if (cur.length === 0) curStart = i;
    cur.push(tok);
    i += tok.length;
    if (/[.!?]$/.test(tok) && cur.length >= minWords) { sentencesA.push({ idx: curStart, raw: cur.join(" ") }); cur = []; }
  }
  if (cur.length >= minWords) sentencesA.push({ idx: curStart, raw: cur.join(" ") });
  for (const s of sentencesA) {
    const norm = s.raw.toLowerCase().normalize("NFD").replace(COMBINING, "");
    if (norm.length > 20 && sB.includes(norm)) matches.push({ startA: s.idx, endA: s.idx + s.raw.length, phrase: s.raw });
  }
  return matches;
}

export function PlagioComparador() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const stats = useMemo(() => {
    if (!a.trim() || !b.trim()) return null;
    const sA = shingles(a);
    const sB = shingles(b);
    return { similarity: jaccard(sA, sB), matches: findMatches(a, b), shinglesA: sA.size, shinglesB: sB.size };
  }, [a, b]);

  const highlighted = useMemo(() => {
    if (!stats || stats.matches.length === 0) return [<span key="0">{a}</span>];
    const sorted = [...stats.matches].sort((x, y) => x.startA - y.startA);
    const parts: React.ReactNode[] = [];
    let last = 0;
    sorted.forEach((m, i) => {
      if (m.startA > last) parts.push(<span key={`t-${i}`}>{a.slice(last, m.startA)}</span>);
      parts.push(<mark key={`m-${i}`} className="bg-[color:var(--color-warning)]/40 rounded px-1 font-semibold">{a.slice(m.startA, m.endA)}</mark>);
      last = m.endA;
    });
    if (last < a.length) parts.push(<span key="tail">{a.slice(last)}</span>);
    return parts;
  }, [a, stats]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-br from-[oklch(0.95_0.05_30)] to-[oklch(0.94_0.04_60)] dark:from-[oklch(0.25_0.05_30)] dark:to-[oklch(0.22_0.04_60)] p-6 border border-[color:var(--color-border)]">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-[oklch(0.6_0.22_30)] text-white flex items-center justify-center flex-shrink-0"><FileSearch className="w-6 h-6" /></div>
          <div>
            <h3 className="font-bold mb-1">Detector de plagio y similitud</h3>
            <p className="text-sm text-[color:var(--color-fg-soft)]">Pegá dos textos y detectamos similitud Jaccard + frases idénticas. Útil para revisar paráfrasis débiles, contenido duplicado o reutilizado.</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card !p-4 space-y-2">
          <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Texto A · Original</div>
          <textarea className="input min-h-[180px]" rows={8} value={a} onChange={(e) => setA(e.target.value)} placeholder="Pegá el texto original…" />
          <div className="text-xs text-[color:var(--color-fg-soft)]">{a.split(/\s+/).filter(Boolean).length} palabras</div>
        </div>
        <div className="card !p-4 space-y-2">
          <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Texto B · Sospechoso</div>
          <textarea className="input min-h-[180px]" rows={8} value={b} onChange={(e) => setB(e.target.value)} placeholder="Pegá el texto a comparar…" />
          <div className="text-xs text-[color:var(--color-fg-soft)]">{b.split(/\s+/).filter(Boolean).length} palabras</div>
        </div>
      </div>

      {stats && (
        <>
          <div className="rounded-2xl p-8 text-center text-white shadow-2xl" style={{ background: stats.similarity > 0.4 ? "linear-gradient(135deg, oklch(0.6 0.22 25), oklch(0.55 0.24 10))" : stats.similarity > 0.15 ? "linear-gradient(135deg, oklch(0.7 0.18 75), oklch(0.6 0.2 50))" : "linear-gradient(135deg, oklch(0.6 0.18 145), oklch(0.5 0.2 165))" }}>
            <div className="text-6xl md:text-8xl font-bold tabular-nums">{(stats.similarity * 100).toFixed(1)}%</div>
            <div className="text-sm uppercase tracking-widest opacity-90 mt-2">Similitud Jaccard</div>
            <div className="text-xs opacity-75 mt-2">
              {stats.similarity > 0.4 ? "⚠️ Alta — posible plagio o paráfrasis muy débil" : stats.similarity > 0.15 ? "Moderada — reutilización notable" : "Baja — textos distintos"}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="card !p-4 text-center"><div className="text-3xl font-bold text-[oklch(0.6_0.22_25)]">{stats.matches.length}</div><div className="text-xs uppercase mt-1">Frases idénticas</div></div>
            <div className="card !p-4 text-center"><div className="text-3xl font-bold">{stats.shinglesA}</div><div className="text-xs uppercase mt-1">Shingles A</div></div>
            <div className="card !p-4 text-center"><div className="text-3xl font-bold">{stats.shinglesB}</div><div className="text-xs uppercase mt-1">Shingles B</div></div>
          </div>

          {stats.matches.length > 0 && (
            <>
              <div className="card !p-4">
                <div className="text-sm font-bold uppercase text-[color:var(--color-fg-soft)] mb-3">Texto A con coincidencias resaltadas</div>
                <div className="text-sm whitespace-pre-wrap leading-relaxed">{highlighted}</div>
              </div>
              <div className="card !p-4">
                <div className="text-sm font-bold uppercase text-[color:var(--color-fg-soft)] mb-3">Frases en común ({stats.matches.length})</div>
                <ul className="space-y-2">
                  {stats.matches.slice(0, 20).map((m, i) => (
                    <li key={i} className="rounded-lg bg-[color:var(--color-warning)]/10 border border-[color:var(--color-warning)]/30 p-2.5 text-sm italic flex gap-2"><AlertTriangle className="w-4 h-4 text-[color:var(--color-warning)] flex-shrink-0 mt-0.5" /><span>"{m.phrase}"</span></li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
