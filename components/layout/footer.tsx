import Link from "next/link";
import { CATEGORIES } from "@/lib/tools-registry";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t mt-16 bg-[color:var(--color-bg-soft)]">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-6 gap-6 text-sm">
        <div className="col-span-2">
          <div className="font-bold text-lg mb-2">{SITE.name}</div>
          <p className="text-[color:var(--color-fg-soft)] text-sm leading-relaxed mb-3">{SITE.description}</p>
          <p className="text-xs text-[color:var(--color-fg-soft)]">Por <Link href="/sobre/jose-gaspard" className="hover:text-[color:var(--color-brand)]">José Gaspard</Link></p>
        </div>
        <div>
          <div className="font-semibold mb-3">Top tools</div>
          <ul className="space-y-2 text-[color:var(--color-fg-soft)]">
            <li><Link href="/unir-pdf" className="hover:text-[color:var(--color-brand)]">Unir PDF</Link></li>
            <li><Link href="/dividir-pdf" className="hover:text-[color:var(--color-brand)]">Dividir PDF</Link></li>
            <li><Link href="/contador-palabras" className="hover:text-[color:var(--color-brand)]">Contador palabras</Link></li>
            <li><Link href="/generador-qr" className="hover:text-[color:var(--color-brand)]">Generador QR</Link></li>
            <li><Link href="/cps-test" className="hover:text-[color:var(--color-brand)]">CPS Test</Link></li>
            <li><Link href="/calculadora-imc" className="hover:text-[color:var(--color-brand)]">Calculadora IMC</Link></li>
          </ul>
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
          <div className="font-semibold mb-3">Recursos</div>
          <ul className="space-y-2 text-[color:var(--color-fg-soft)]">
            <li><Link href="/simbolos" className="hover:text-[color:var(--color-brand)]">Símbolos</Link></li>
            <li><Link href="/texto-decorado" className="hover:text-[color:var(--color-brand)]">Texto decorado</Link></li>
            <li><Link href="/calculadoras" className="hover:text-[color:var(--color-brand)]">Calculadoras</Link></li>
            <li><Link href="/glosario" className="hover:text-[color:var(--color-brand)]">Glosario</Link></li>
            <li><Link href="/alternativas" className="hover:text-[color:var(--color-brand)]">Alternativas</Link></li>
            <li><Link href="/herramientas" className="hover:text-[color:var(--color-brand)]">Todas las tools</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Sitio</div>
          <ul className="space-y-2 text-[color:var(--color-fg-soft)]">
            <li><Link href="/sobre" className="hover:text-[color:var(--color-brand)]">Sobre</Link></li>
            <li><Link href="/sobre/jose-gaspard" className="hover:text-[color:var(--color-brand)]">Autor</Link></li>
            <li><Link href="/privacidad" className="hover:text-[color:var(--color-brand)]">Privacidad</Link></li>
            <li><Link href="/contacto" className="hover:text-[color:var(--color-brand)]">Contacto</Link></li>
            <li><a href="https://github.com/ThatBasherAgency/toolram" target="_blank" rel="noopener" className="hover:text-[color:var(--color-brand)]">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 px-4 max-w-7xl mx-auto flex flex-wrap justify-between gap-2 text-xs text-[color:var(--color-fg-soft)]">
        <span>© {new Date().getFullYear()} {SITE.name}. Open source · MIT License.</span>
        <span>Procesamiento local cuando es posible · Spanish-first</span>
      </div>
    </footer>
  );
}
