"use client";
import { useMemo, useState } from "react";

const STOPWORDS_ES = new Set("a al algo algunas algunos ante antes bajo bien cada como con contra cual cuando de del desde donde dos el ella ellas ellos en entre era eran eres es esa esas ese eso esos esta estas este estos fue fui ha han hay hasta la las le les lo los más me mi mis mucho muchos muy nada ni no nos nosotros o os otra otras otro otros para pero poco por porque que qué se sea sean si sí sin sobre solo son su sus también te tiene tienen toda todas todo todos tu tus un una unas uno unos y ya yo".split(" "));

export function KeywordDensity() {
  const [text, setText] = useState("");
  const [excludeStop, setExcludeStop] = useState(true);

  const stats = useMemo(() => {
    const words = text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").match(/\b[a-z0-9ñ]+\b/g) || [];
    const filtered = excludeStop ? words.filter((w) => !STOPWORDS_ES.has(w) && w.length > 2) : words;
    const total = words.length;
    const filteredTotal = filtered.length;
    const counts = new Map<string, number>();
    filtered.forEach((w) => counts.set(w, (counts.get(w) || 0) + 1));
    const top = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 30);

    const bigrams = new Map<string, number>();
    for (let i = 0; i < filtered.length - 1; i++) {
      const k = `${filtered[i]} ${filtered[i + 1]}`;
      bigrams.set(k, (bigrams.get(k) || 0) + 1);
    }
    const topBig = Array.from(bigrams.entries()).filter(([, c]) => c > 1).sort((a, b) => b[1] - a[1]).slice(0, 15);
    return { total, filteredTotal, top, topBig, unique: counts.size };
  }, [text, excludeStop]);

  return (
    <div className="space-y-4">
      <textarea className="input" rows={6} placeholder="Pegá el contenido de tu página o artículo…" value={text} onChange={(e) => setText(e.target.value)} />
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={excludeStop} onChange={(e) => setExcludeStop(e.target.checked)} /> Excluir stopwords (artículos, preposiciones)</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="card !p-3 text-center"><div className="text-2xl font-bold text-[color:var(--color-brand)]">{stats.total}</div><div className="text-xs uppercase">Palabras</div></div>
        <div className="card !p-3 text-center"><div className="text-2xl font-bold text-[color:var(--color-brand)]">{stats.unique}</div><div className="text-xs uppercase">Únicas</div></div>
        <div className="card !p-3 text-center"><div className="text-2xl font-bold text-[color:var(--color-brand)]">{stats.filteredTotal}</div><div className="text-xs uppercase">Tras filtros</div></div>
        <div className="card !p-3 text-center"><div className="text-2xl font-bold text-[color:var(--color-brand)]">{stats.unique && stats.filteredTotal ? ((stats.unique / stats.filteredTotal) * 100).toFixed(0) : 0}%</div><div className="text-xs uppercase">Diversidad</div></div>
      </div>
      {stats.top.length > 0 && (
        <div className="grid md:grid-cols-2 gap-3">
          <div className="card !p-3">
            <div className="text-xs uppercase text-[color:var(--color-fg-soft)] mb-2">Top palabras</div>
            <ul className="space-y-1 text-sm">
              {stats.top.map(([w, c]) => (
                <li key={w} className="flex justify-between gap-2">
                  <span className="font-medium">{w}</span>
                  <span className="text-[color:var(--color-fg-soft)] tabular-nums">{c} · {((c / stats.filteredTotal) * 100).toFixed(1)}%</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card !p-3">
            <div className="text-xs uppercase text-[color:var(--color-fg-soft)] mb-2">Bigramas frecuentes</div>
            {stats.topBig.length === 0 ? (
              <div className="text-xs text-[color:var(--color-fg-soft)]">Necesitás más texto para detectar frases repetidas.</div>
            ) : (
              <ul className="space-y-1 text-sm">
                {stats.topBig.map(([w, c]) => (
                  <li key={w} className="flex justify-between gap-2"><span className="font-medium">{w}</span><span className="text-[color:var(--color-fg-soft)] tabular-nums">{c}×</span></li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
