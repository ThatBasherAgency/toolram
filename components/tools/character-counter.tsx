"use client";
import { useState } from "react";

const LIMITS = [
  { name: "Twitter / X", limit: 280 },
  { name: "Meta Description", limit: 155 },
  { name: "Title Tag", limit: 60 },
  { name: "SMS", limit: 160 },
  { name: "Instagram caption", limit: 2200 },
  { name: "LinkedIn post", limit: 3000 }
];

export function CharacterCounter() {
  const [text, setText] = useState("");
  return (
    <div className="space-y-4">
      <textarea className="input" rows={8} placeholder="Pegá tu texto…" value={text} onChange={(e) => setText(e.target.value)} />
      <div className="grid sm:grid-cols-2 gap-2">
        {LIMITS.map((l) => {
          const remaining = l.limit - text.length;
          const ok = remaining >= 0;
          return (
            <div key={l.name} className="card !p-3 flex items-center justify-between">
              <span className="text-sm">{l.name}</span>
              <span className={`text-sm font-bold ${ok ? "text-[color:var(--color-success)]" : "text-[color:var(--color-danger)]"}`}>
                {text.length} / {l.limit} ({remaining >= 0 ? `${remaining} restantes` : `${-remaining} de más`})
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
