import Link from "next/link";
import { CATEGORIES } from "@/lib/tools-registry";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t mt-16 bg-[color:var(--color-bg-soft)]">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-sm">
        <div className="col-span-2 lg:col-span-2">
          <div className="font-bold text-lg mb-2">{SITE.name}</div>
          <p className="text-[color:var(--color-fg-soft)] text-sm leading-relaxed mb-3">{SITE.description}</p>
          <p className="text-xs text-[color:var(--color-fg-soft)]">Por <Link href="/sobre/jose-gaspard" className="hover:text-[color:var(--color-brand)]">José Gaspard</Link></p>
          <p className="text-xs text-[color:var(--color-fg-soft)] mt-2">
            <Link href="/blog" className="hover:text-[color:var(--color-brand)]">📝 Blog</Link>
            {" · "}
            <Link href="/herramientas" className="hover:text-[color:var(--color-brand)]">155+ tools</Link>
            {" · "}
            <a href="https://github.com/ThatBasherAgency/toolram" target="_blank" rel="noopener" className="hover:text-[color:var(--color-brand)]">⭐ GitHub</a>
          </p>
        </div>

        <div>
          <div className="font-semibold mb-3">PDF</div>
          <ul className="space-y-1.5 text-[color:var(--color-fg-soft)] text-xs">
            <li><Link href="/unir-pdf" className="hover:text-[color:var(--color-brand)]">Unir PDF</Link></li>
            <li><Link href="/dividir-pdf" className="hover:text-[color:var(--color-brand)]">Dividir PDF</Link></li>
            <li><Link href="/firmar-pdf" className="hover:text-[color:var(--color-brand)]">Firmar PDF</Link></li>
            <li><Link href="/comprimir-pdf" className="hover:text-[color:var(--color-brand)]">Comprimir PDF</Link></li>
            <li><Link href="/rotar-pdf" className="hover:text-[color:var(--color-brand)]">Rotar PDF</Link></li>
            <li><Link href="/marca-agua-pdf" className="hover:text-[color:var(--color-brand)]">Marca agua PDF</Link></li>
            <li><Link href="/pdf-a-jpg" className="hover:text-[color:var(--color-brand)]">PDF a JPG</Link></li>
            <li><Link href="/imagenes-a-pdf" className="hover:text-[color:var(--color-brand)]">Imágenes a PDF</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-3">Calculadoras</div>
          <ul className="space-y-1.5 text-[color:var(--color-fg-soft)] text-xs">
            <li><Link href="/calculadora-imc" className="hover:text-[color:var(--color-brand)]">IMC</Link></li>
            <li><Link href="/calculadora-edad" className="hover:text-[color:var(--color-brand)]">Edad exacta</Link></li>
            <li><Link href="/calculadora-embarazo" className="hover:text-[color:var(--color-brand)]">Embarazo</Link></li>
            <li><Link href="/calculadora-propina" className="hover:text-[color:var(--color-brand)]">Propina</Link></li>
            <li><Link href="/calculadora-regla-tres" className="hover:text-[color:var(--color-brand)]">Regla de tres</Link></li>
            <li><Link href="/calculadora-iva" className="hover:text-[color:var(--color-brand)]">IVA</Link></li>
            <li><Link href="/calculadora-iva-mexico" className="hover:text-[color:var(--color-brand)]">IVA México</Link></li>
            <li><Link href="/interes-compuesto" className="hover:text-[color:var(--color-brand)]">Interés compuesto</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-3">SEO &amp; Dev</div>
          <ul className="space-y-1.5 text-[color:var(--color-fg-soft)] text-xs">
            <li><Link href="/creador-backlinks" className="hover:text-[color:var(--color-brand)]">Backlinks</Link></li>
            <li><Link href="/generador-meta-tags" className="hover:text-[color:var(--color-brand)]">Meta tags</Link></li>
            <li><Link href="/densidad-keywords" className="hover:text-[color:var(--color-brand)]">Densidad keywords</Link></li>
            <li><Link href="/previsualizador-serp" className="hover:text-[color:var(--color-brand)]">SERP preview</Link></li>
            <li><Link href="/json-formatter" className="hover:text-[color:var(--color-brand)]">JSON formatter</Link></li>
            <li><Link href="/base64-encode" className="hover:text-[color:var(--color-brand)]">Base64</Link></li>
            <li><Link href="/hash-md5-sha" className="hover:text-[color:var(--color-brand)]">Hash MD5/SHA</Link></li>
            <li><Link href="/jwt-decoder" className="hover:text-[color:var(--color-brand)]">JWT decoder</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-3">Otras tools</div>
          <ul className="space-y-1.5 text-[color:var(--color-fg-soft)] text-xs">
            <li><Link href="/cps-test" className="hover:text-[color:var(--color-brand)]">CPS Test</Link></li>
            <li><Link href="/contador-palabras" className="hover:text-[color:var(--color-brand)]">Contador palabras</Link></li>
            <li><Link href="/convertir-mayusculas" className="hover:text-[color:var(--color-brand)]">Mayúsculas</Link></li>
            <li><Link href="/generador-qr" className="hover:text-[color:var(--color-brand)]">QR generator</Link></li>
            <li><Link href="/escaner-qr" className="hover:text-[color:var(--color-brand)]">Escáner QR</Link></li>
            <li><Link href="/quitar-fondo-imagen" className="hover:text-[color:var(--color-brand)]">Quitar fondo</Link></li>
            <li><Link href="/youtube-thumbnail" className="hover:text-[color:var(--color-brand)]">YT Thumbnail</Link></li>
            <li><Link href="/generador-passwords" className="hover:text-[color:var(--color-brand)]">Passwords</Link></li>
          </ul>
        </div>
      </div>

      {/* Segunda fila: símbolos + fancy text + guías + alternativas */}
      <div className="border-t border-[color:var(--color-border)] max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div>
          <div className="font-semibold mb-3">Símbolos</div>
          <ul className="space-y-1.5 text-[color:var(--color-fg-soft)] text-xs">
            <li><Link href="/simbolos" className="hover:text-[color:var(--color-brand)]">Todas las categorías</Link></li>
            <li><Link href="/simbolos/corazones" className="hover:text-[color:var(--color-brand)]">❤ Corazones</Link></li>
            <li><Link href="/simbolos/estrellas" className="hover:text-[color:var(--color-brand)]">⭐ Estrellas</Link></li>
            <li><Link href="/simbolos/flechas" className="hover:text-[color:var(--color-brand)]">➡ Flechas</Link></li>
            <li><Link href="/simbolos/matematicos" className="hover:text-[color:var(--color-brand)]">∑ Matemáticos</Link></li>
            <li><Link href="/simbolos/moneda" className="hover:text-[color:var(--color-brand)]">💲 Moneda</Link></li>
            <li><Link href="/simbolos/check-cross" className="hover:text-[color:var(--color-brand)]">✓ Check / cruz</Link></li>
            <li><Link href="/simbolos/lenny-faces" className="hover:text-[color:var(--color-brand)]">ʕ•ᴥ•ʔ Lenny faces</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-3">Texto decorado</div>
          <ul className="space-y-1.5 text-[color:var(--color-fg-soft)] text-xs">
            <li><Link href="/texto-decorado" className="hover:text-[color:var(--color-brand)]">Generador completo</Link></li>
            <li><Link href="/texto-decorado/negrita" className="hover:text-[color:var(--color-brand)]">𝐍𝐞𝐠𝐫𝐢𝐭𝐚</Link></li>
            <li><Link href="/texto-decorado/cursiva" className="hover:text-[color:var(--color-brand)]">𝒞𝓊𝓇𝓈𝒾𝓋𝒶</Link></li>
            <li><Link href="/texto-decorado/negrita-italica" className="hover:text-[color:var(--color-brand)]">𝓝𝓮𝓰𝓻𝓲𝓽𝓪 𝒾𝓉</Link></li>
            <li><Link href="/texto-decorado/tachado" className="hover:text-[color:var(--color-brand)]">T̶a̶c̶h̶a̶d̶o̶</Link></li>
            <li><Link href="/texto-decorado/zalgo" className="hover:text-[color:var(--color-brand)]">Z̸a̷l̵g̸o̷</Link></li>
            <li><Link href="/texto-decorado/subrayado" className="hover:text-[color:var(--color-brand)]">S̲u̲b̲r̲a̲y̲a̲d̲o̲</Link></li>
            <li><Link href="/texto-decorado/aesthetic" className="hover:text-[color:var(--color-brand)]">Ａｅｓｔｈｅｔｉｃ</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-3">Glosario</div>
          <ul className="space-y-1.5 text-[color:var(--color-fg-soft)] text-xs">
            <li><Link href="/glosario" className="hover:text-[color:var(--color-brand)]">Todos los términos</Link></li>
            <li><Link href="/que-es-base64" className="hover:text-[color:var(--color-brand)]">¿Qué es Base64?</Link></li>
            <li><Link href="/que-es-md5" className="hover:text-[color:var(--color-brand)]">¿Qué es MD5?</Link></li>
            <li><Link href="/que-es-uuid" className="hover:text-[color:var(--color-brand)]">¿Qué es UUID?</Link></li>
            <li><Link href="/que-es-jwt" className="hover:text-[color:var(--color-brand)]">¿Qué es JWT?</Link></li>
            <li><Link href="/que-es-pdf" className="hover:text-[color:var(--color-brand)]">¿Qué es PDF?</Link></li>
            <li><Link href="/que-es-imc" className="hover:text-[color:var(--color-brand)]">¿Qué es IMC?</Link></li>
            <li><Link href="/que-es-tdee" className="hover:text-[color:var(--color-brand)]">¿Qué es TDEE?</Link></li>
            <li><Link href="/que-es-cps-test" className="hover:text-[color:var(--color-brand)]">¿Qué es CPS Test?</Link></li>
            <li><Link href="/que-es-canonical-url" className="hover:text-[color:var(--color-brand)]">¿Qué es canonical?</Link></li>
            <li><Link href="/que-es-cors" className="hover:text-[color:var(--color-brand)]">¿Qué es CORS?</Link></li>
            <li><Link href="/que-es-iva" className="hover:text-[color:var(--color-brand)]">¿Qué es IVA?</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-3">Comparativas</div>
          <ul className="space-y-1.5 text-[color:var(--color-fg-soft)] text-xs">
            <li><Link href="/alternativas" className="hover:text-[color:var(--color-brand)]">Todas las alternativas</Link></li>
            <li><Link href="/alternativas-a-ilovepdf" className="hover:text-[color:var(--color-brand)]">vs iLovePDF</Link></li>
            <li><Link href="/alternativas-a-smallpdf" className="hover:text-[color:var(--color-brand)]">vs SmallPDF</Link></li>
            <li><Link href="/alternativas-a-smallseotools" className="hover:text-[color:var(--color-brand)]">vs SmallSEOTools</Link></li>
            <li><Link href="/alternativas-a-piliapp" className="hover:text-[color:var(--color-brand)]">vs PiliApp</Link></li>
            <li><Link href="/alternativas-a-canva-pdf" className="hover:text-[color:var(--color-brand)]">vs Canva PDF</Link></li>
            <li><Link href="/alternativas-a-tinywow" className="hover:text-[color:var(--color-brand)]">vs TinyWow</Link></li>
            <li><Link href="/alternativas-a-pdf24" className="hover:text-[color:var(--color-brand)]">vs PDF24</Link></li>
            <li><Link href="/alternativas-a-sejda" className="hover:text-[color:var(--color-brand)]">vs Sejda</Link></li>
            <li><Link href="/alternativas-a-freepik-tools" className="hover:text-[color:var(--color-brand)]">vs Freepik Tools</Link></li>
            <li><Link href="/alternativas-a-adobe-acrobat-online" className="hover:text-[color:var(--color-brand)]">vs Adobe Acrobat</Link></li>
          </ul>
        </div>
      </div>

      {/* Tercera fila: blog + categorías + sitio */}
      <div className="border-t border-[color:var(--color-border)] max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div>
          <div className="font-semibold mb-3">Blog &amp; guías</div>
          <ul className="space-y-1.5 text-[color:var(--color-fg-soft)] text-xs">
            <li><Link href="/blog" className="hover:text-[color:var(--color-brand)]">Todos los posts</Link></li>
            <li><Link href="/blog/guia-completa-pdf-online-2026" className="hover:text-[color:var(--color-brand)]">Guía PDF online 2026</Link></li>
            <li><Link href="/blog/auditoria-seo-tecnica-gratis-2026" className="hover:text-[color:var(--color-brand)]">Auditoría SEO técnica 2026</Link></li>
            <li><Link href="/blog/herramientas-desarrolladores-online-2026" className="hover:text-[color:var(--color-brand)]">20 dev tools 2026</Link></li>
            <li><Link href="/blog/calculadoras-financieras-imc-imc-2026" className="hover:text-[color:var(--color-brand)]">15 calculadoras 2026</Link></li>
            <li><Link href="/blog/simbolos-copiar-pegar-unicode-2026" className="hover:text-[color:var(--color-brand)]">Símbolos Unicode 2026</Link></li>
            <li><Link href="/blog/edicion-imagenes-online-gratis-2026" className="hover:text-[color:var(--color-brand)]">Edición imágenes 2026</Link></li>
            <li><Link href="/blog/generadores-online-utiles-2026" className="hover:text-[color:var(--color-brand)]">15 generadores 2026</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-3">Guías cortas</div>
          <ul className="space-y-1.5 text-[color:var(--color-fg-soft)] text-xs">
            <li><Link href="/blog/como-comprimir-pdf-sin-perder-calidad-2026" className="hover:text-[color:var(--color-brand)]">Comprimir PDF</Link></li>
            <li><Link href="/blog/como-mejorar-core-web-vitals-2026" className="hover:text-[color:var(--color-brand)]">Core Web Vitals 2026</Link></li>
            <li><Link href="/blog/jwt-decoder-explicado-2026" className="hover:text-[color:var(--color-brand)]">JWT explicado</Link></li>
            <li><Link href="/blog/calculadora-imc-formula-rangos-explicados-2026" className="hover:text-[color:var(--color-brand)]">IMC: fórmula y rangos</Link></li>
            <li><Link href="/blog/como-poner-emojis-y-simbolos-instagram-bio-2026" className="hover:text-[color:var(--color-brand)]">Símbolos Instagram bio</Link></li>
            <li><Link href="/blog/como-quitar-fondo-imagen-gratis-2026" className="hover:text-[color:var(--color-brand)]">Quitar fondo imagen</Link></li>
            <li><Link href="/blog/que-es-un-uuid-cuando-usar-2026" className="hover:text-[color:var(--color-brand)]">UUID v4 vs v7</Link></li>
            <li><Link href="/blog/firmar-pdf-online-gratis-guia-2026" className="hover:text-[color:var(--color-brand)]">Firmar PDF online</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-3">Categorías</div>
          <ul className="space-y-1.5 text-[color:var(--color-fg-soft)] text-xs">
            {Object.entries(CATEGORIES).map(([k, c]) => (
              <li key={k}>
                <Link href={`/categoria/${c.slug}`} className="hover:text-[color:var(--color-brand)]">
                  {c.emoji} {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-semibold mb-3">English</div>
          <ul className="space-y-1.5 text-[color:var(--color-fg-soft)] text-xs">
            <li><Link href="/en" className="hover:text-[color:var(--color-brand)]">English site</Link></li>
            <li><Link href="/en/all-tools" className="hover:text-[color:var(--color-brand)]">All tools (EN)</Link></li>
            <li><Link href="/en/unir-pdf" className="hover:text-[color:var(--color-brand)]">Merge PDF</Link></li>
            <li><Link href="/en/dividir-pdf" className="hover:text-[color:var(--color-brand)]">Split PDF</Link></li>
            <li><Link href="/en/firmar-pdf" className="hover:text-[color:var(--color-brand)]">Sign PDF</Link></li>
            <li><Link href="/en/generador-qr" className="hover:text-[color:var(--color-brand)]">QR generator</Link></li>
            <li><Link href="/en/contador-palabras" className="hover:text-[color:var(--color-brand)]">Word counter</Link></li>
            <li><Link href="/en/cps-test" className="hover:text-[color:var(--color-brand)]">CPS test</Link></li>
            <li><Link href="/en/rotar-pdf" className="hover:text-[color:var(--color-brand)]">Rotate PDF</Link></li>
          </ul>
          <div className="font-semibold mt-4 mb-2">Sitio</div>
          <ul className="space-y-1.5 text-[color:var(--color-fg-soft)] text-xs">
            <li><Link href="/sobre" className="hover:text-[color:var(--color-brand)]">Sobre Toolram</Link></li>
            <li><Link href="/sobre/jose-gaspard" className="hover:text-[color:var(--color-brand)]">Autor</Link></li>
            <li><Link href="/privacidad" className="hover:text-[color:var(--color-brand)]">Privacidad</Link></li>
            <li><Link href="/contacto" className="hover:text-[color:var(--color-brand)]">Contacto</Link></li>
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
