"use client";
import { useMemo, useState } from "react";

export function WordCounter() {
  const [text, setText] = useState("");
  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const sentences = trimmed ? (trimmed.match(/[.!?]+/g)?.length ?? 1) : 0;
    const paragraphs = trimmed ? trimmed.split(/\n+/).filter(Boolean).length : 0;
    const readMinutes = Math.max(1, Math.ceil(words / 225));
    return { words, chars, charsNoSpaces, sentences, paragraphs, readMinutes };
  }, [text]);

  return (
    <div className="space-y-4">
      <textarea
        className="input"
        rows={10}
        placeholder="Pegá o escribí tu texto aquí…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Stat label="Palabras" value={stats.words} />
        <Stat label="Caracteres" value={stats.chars} />
        <Stat label="Sin espacios" value={stats.charsNoSpaces} />
        <Stat label="Oraciones" value={stats.sentences} />
        <Stat label="Párrafos" value={stats.paragraphs} />
        <Stat label="Lectura" value={`${stats.readMinutes} min`} />
      </div>
    </div>
  );
}
function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="card !p-3 text-center">
      <div className="text-2xl font-bold text-[color:var(--color-brand)]">{value}</div>
      <div className="text-xs text-[color:var(--color-fg-soft)] uppercase tracking-wide">{label}</div>
    </div>
  );
}
