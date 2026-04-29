"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Moon, Sun, Search, Wrench } from "lucide-react";
import { CATEGORIES } from "@/lib/tools-registry";
import { LangSwitcher } from "./lang-switcher";

export function Header() {
  const [dark, setDark] = useState(false);
  const pathname = usePathname() || "/";
  const isEn = pathname.startsWith("/en");
  const locale = isEn ? "en" : "es";
  const homeHref = isEn ? "/en" : "/";

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-[color:var(--color-bg)]/80 border-b">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
        <Link href={homeHref} className="flex items-center gap-2 font-bold text-lg">
          <Wrench className="w-5 h-5 text-[color:var(--color-brand)]" />
          <span>Toolram</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {isEn ? (
            <>
              <Link href="/en/all-tools" className="px-3 py-1.5 rounded hover:bg-[color:var(--color-bg-soft)]">All tools</Link>
              <Link href="/en/cps-test" className="px-3 py-1.5 rounded hover:bg-[color:var(--color-bg-soft)]">CPS Test</Link>
              <Link href="/en/json-formatter" className="px-3 py-1.5 rounded hover:bg-[color:var(--color-bg-soft)]">JSON</Link>
              <Link href="/en/unir-pdf" className="px-3 py-1.5 rounded hover:bg-[color:var(--color-bg-soft)]">PDF tools</Link>
            </>
          ) : (
            <>
              <Link href="/herramientas" className="px-3 py-1.5 rounded hover:bg-[color:var(--color-bg-soft)]">Todas</Link>
              <Link href="/simbolos" className="px-3 py-1.5 rounded hover:bg-[color:var(--color-bg-soft)]">Símbolos</Link>
              <Link href="/texto-decorado" className="px-3 py-1.5 rounded hover:bg-[color:var(--color-bg-soft)]">Texto decorado</Link>
              <Link href="/calculadoras" className="px-3 py-1.5 rounded hover:bg-[color:var(--color-bg-soft)]">Calculadoras</Link>
              <Link href="/blog" className="px-3 py-1.5 rounded hover:bg-[color:var(--color-bg-soft)]">Blog</Link>
              {Object.entries(CATEGORIES)
                .slice(0, 2)
                .map(([key, cat]) => (
                  <Link key={key} href={`/categoria/${cat.slug}`} className="px-3 py-1.5 rounded hover:bg-[color:var(--color-bg-soft)]">
                    {cat.name}
                  </Link>
                ))}
            </>
          )}
        </nav>
        <div className="flex-1" />
        <Link href={isEn ? "/en/all-tools" : "/buscar"} className="btn btn-ghost h-9 text-sm" aria-label="Search">
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">{isEn ? "Search" : "Buscar"}</span>
        </Link>
        <LangSwitcher current={locale} />
        <button onClick={toggleTheme} className="btn btn-ghost h-9 w-9 !p-0" aria-label="Toggle theme">
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
