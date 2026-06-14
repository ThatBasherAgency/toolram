"use client";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { TOOLS } from "@/lib/tools-registry";
import { trackSearchSelect } from "@/lib/track";

export function SearchBox() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Global "/" shortcut to jump straight into search (ignored while typing elsewhere).
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = document.activeElement as HTMLElement | null;
      const tag = el?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA" || el?.isContentEditable;
      if (typing) return;
      e.preventDefault();
      inputRef.current?.focus();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function go(slug: string) {
    trackSearchSelect(q.trim(), slug);
    setOpen(false);
    router.push(`/${slug}`);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const t = results[active] ?? results[0];
      if (t) go(t.slug);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div ref={ref} className="relative max-w-xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[color:var(--color-fg-soft)]" />
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-controls="search-suggestions"
          aria-autocomplete="list"
          aria-label="Buscar herramienta"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Buscar herramienta… (ej: PDF a Word, contador, QR)"
          className="input !pl-12 !pr-12 !py-3 !text-base shadow-sm"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center h-6 px-2 rounded border border-[color:var(--color-border)] text-xs font-mono text-[color:var(--color-fg-soft)] bg-[color:var(--color-bg-soft)]">
          /
        </kbd>
      </div>
      {open && results.length > 0 && (
        <div
          id="search-suggestions"
          role="listbox"
          className="absolute left-0 right-0 mt-2 bg-[color:var(--color-bg)] border rounded-lg shadow-xl overflow-hidden z-30 text-left"
        >
          {results.map((t, i) => (
            <button
              key={t.slug}
              type="button"
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onClick={() => go(t.slug)}
              className={`w-full flex items-start gap-3 px-4 py-3 border-b last:border-0 text-left ${i === active ? "bg-[color:var(--color-bg-soft)]" : "hover:bg-[color:var(--color-bg-soft)]"}`}
            >
              <div className="flex-1">
                <div className="font-medium">{t.name}</div>
                <div className="text-xs text-[color:var(--color-fg-soft)]">{t.shortDesc}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
