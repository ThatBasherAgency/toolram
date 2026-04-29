"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { LOCALES, LOCALE_FLAG, LOCALE_LABEL, type Locale } from "@/lib/i18n";

export function LangSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname() || "/";
  const stripped = pathname.replace(/^\/en(\/|$)/, "/");
  const target = (loc: Locale) => loc === "en" ? `/en${stripped === "/" ? "" : stripped}` : stripped;

  return (
    <div className="relative group">
      <button className="btn btn-ghost h-9 w-9 !p-0" aria-label="Language">
        <Globe className="w-4 h-4" />
      </button>
      <div className="absolute right-0 top-full mt-1 w-32 bg-[color:var(--color-bg)] border rounded-lg shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-50">
        {LOCALES.map((loc) => (
          <Link
            key={loc}
            href={target(loc)}
            className={`flex items-center gap-2 px-3 py-2 text-sm hover:bg-[color:var(--color-bg-soft)] ${current === loc ? "font-bold text-[color:var(--color-brand)]" : ""}`}
          >
            <span>{LOCALE_FLAG[loc]}</span>
            <span>{LOCALE_LABEL[loc]}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
