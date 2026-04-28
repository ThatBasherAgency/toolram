"use client";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { TOOLS } from "@/lib/tools-registry";

export function SearchBox() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(TOOLS, {
        keys: ["name", "shortDesc", "keywords", "category"],
        threshold: 0.4,
        includeScore: true
      }),
    []
  );

  const results = q.trim() ? fuse.search(q).slice(0, 8).map((r) => r.item) : [];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative max-w-xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[color:var(--color-fg-soft)]" />
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Buscar herramienta… (ej: PDF a Word, contador, QR)"
          className="input !pl-12 !py-3 !text-base shadow-sm"
        />
      </div>
      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-[color:var(--color-bg)] border rounded-lg shadow-xl overflow-hidden z-30 text-left">
          {results.map((t) => (
            <Link
              key={t.slug}
              href={`/${t.slug}`}
              className="flex items-start gap-3 px-4 py-3 hover:bg-[color:var(--color-bg-soft)] border-b last:border-0"
              onClick={() => setOpen(false)}
            >
              <div className="flex-1">
                <div className="font-medium">{t.name}</div>
                <div className="text-xs text-[color:var(--color-fg-soft)]">{t.shortDesc}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
