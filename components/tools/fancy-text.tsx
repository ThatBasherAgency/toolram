"use client";
import { useState } from "react";
import Link from "next/link";
import { Copy, Check } from "lucide-react";
import { transformAll, FANCY_BY_SLUG } from "@/lib/fancy-text";

export function FancyTextGenerator({ initialStyle }: { initialStyle?: string } = {}) {
  const [text, setText] = useState("Toolram");
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(slug: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(slug);
    setTimeout(() => setCopied(null), 1100);
  }

  const all = transformAll(text || "");
  const list = initialStyle ? all.filter((s) => s.slug === initialStyle).concat(all.filter((s) => s.slug !== initialStyle)) : all;

  return (
    <div className="space-y-4">
      <input
        className="input !text-lg"
        placeholder="Escribe tu texto aquí…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
      />
      <div className="grid sm:grid-cols-2 gap-3">
        {list.map((s) => (
          <div key={s.slug} className="card !p-3">
            <div className="flex items-center justify-between mb-1">
              <Link href={`/texto-decorado/${s.slug}`} className="text-xs uppercase tracking-wide text-[color:var(--color-fg-soft)] hover:text-[color:var(--color-brand)]">
                {s.name}
              </Link>
              <button onClick={() => copy(s.slug, s.output)} className="btn btn-ghost h-7 !px-2 text-xs">
                {copied === s.slug ? <><Check className="w-3 h-3" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar</>}
              </button>
            </div>
            <div className="text-base md:text-lg break-words min-h-[1.5em] select-all">{s.output}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
