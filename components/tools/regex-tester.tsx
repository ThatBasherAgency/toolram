"use client";
import { useMemo, useState } from "react";

export function RegexTester() {
  const [pattern, setPattern] = useState("\\b\\w{4,}\\b");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("Toolram es un portal de herramientas online gratis para texto, PDF y código.");

  const result = useMemo(() => {
    try {
      const re = new RegExp(pattern, flags);
      const matches: { match: string; index: number }[] = [];
      if (flags.includes("g")) {
        let m: RegExpExecArray | null;
        let safety = 0;
        while ((m = re.exec(text)) && safety++ < 10000) {
          matches.push({ match: m[0], index: m.index });
          if (m.index === re.lastIndex) re.lastIndex++;
        }
      } else {
        const m = re.exec(text);
        if (m) matches.push({ match: m[0], index: m.index });
      }
      return { matches, error: null as string | null };
    } catch (e) {
      return { matches: [], error: e instanceof Error ? e.message : String(e) };
    }
  }, [pattern, flags, text]);

  const highlighted = useMemo(() => {
    if (result.error || !result.matches.length) return [<span key="0">{text}</span>];
    const parts: React.ReactNode[] = [];
    let last = 0;
    result.matches.forEach((m, i) => {
      if (m.index > last) parts.push(<span key={`t-${i}`}>{text.slice(last, m.index)}</span>);
      parts.push(<mark key={`m-${i}`} className="bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)] rounded px-0.5">{m.match}</mark>);
      last = m.index + m.match.length;
    });
    if (last < text.length) parts.push(<span key="tail">{text.slice(last)}</span>);
    return parts;
  }, [result, text]);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <input className="input font-mono" value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="Patrón regex" />
        <input className="input font-mono w-24" value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="gimsuy" />
      </div>
      <textarea className="input font-mono" rows={5} value={text} onChange={(e) => setText(e.target.value)} placeholder="Texto a probar…" />
      {result.error ? (
        <div className="card !p-3 text-sm text-[color:var(--color-danger)]">⚠️ {result.error}</div>
      ) : (
        <>
          <div className="card !p-3 text-sm leading-relaxed whitespace-pre-wrap">{highlighted}</div>
          <div className="text-xs text-[color:var(--color-fg-soft)]">{result.matches.length} {result.matches.length === 1 ? "coincidencia" : "coincidencias"}</div>
        </>
      )}
      <details className="card !p-3 text-xs">
        <summary className="cursor-pointer font-medium">Cheatsheet rápido</summary>
        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[color:var(--color-fg-soft)]">
          <div>\d — dígito</div><div>\w — palabra</div>
          <div>\s — espacio</div><div>. — cualquiera</div>
          <div>^ — inicio</div><div>$ — fin</div>
          <div>* — 0 o más</div><div>+ — 1 o más</div>
          <div>? — opcional</div><div>{`{n,m}`} — rango</div>
          <div>[abc] — set</div><div>(a|b) — alt</div>
        </div>
      </details>
    </div>
  );
}
