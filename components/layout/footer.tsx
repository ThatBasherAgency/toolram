import Link from "next/link";
import { CATEGORIES } from "@/lib/tools-registry";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t mt-16 bg-[color:var(--color-bg-soft)]">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        <div className="col-span-2">
          <div className="font-bold text-lg mb-2">{SITE.name}</div>
          <p className="text-[color:var(--color-fg-soft)] text-sm leading-relaxed">{SITE.description}</p>
        </div>
        <div>
          <div className="font-semibold mb-3">Categorías</div>
          <ul className="space-y-2 text-[color:var(--color-fg-soft)]">
            {Object.entries(CATEGORIES)
              .slice(0, 6)
              .map(([k, c]) => (
                <li key={k}>
                  <Link href={`/categoria/${c.slug}`} className="hover:text-[color:var(--color-brand)]">
                    {c.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Más</div>
          <ul className="space-y-2 text-[color:var(--color-fg-soft)]">
            {Object.entries(CATEGORIES)
              .slice(6)
              .map(([k, c]) => (
                <li key={k}>
                  <Link href={`/categoria/${c.slug}`} className="hover:text-[color:var(--color-brand)]">
                    {c.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Sitio</div>
          <ul className="space-y-2 text-[color:var(--color-fg-soft)]">
            <li><Link href="/herramientas" className="hover:text-[color:var(--color-brand)]">Todas las tools</Link></li>
            <li><Link href="/sobre" className="hover:text-[color:var(--color-brand)]">Sobre</Link></li>
            <li><Link href="/privacidad" className="hover:text-[color:var(--color-brand)]">Privacidad</Link></li>
            <li><Link href="/contacto" className="hover:text-[color:var(--color-brand)]">Contacto</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-[color:var(--color-fg-soft)]">
        © {new Date().getFullYear()} {SITE.name}. Todas las herramientas son gratis y procesadas localmente cuando es posible.
      </div>
    </footer>
  );
}
