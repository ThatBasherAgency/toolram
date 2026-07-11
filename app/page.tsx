import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Zap, TrendingUp, Star, FileText, Image as ImageIcon, Search, Calculator, Code2, Heart, Smile } from "lucide-react";
import { CATEGORIES, popularTools, TOOLS, toolsByCategory } from "@/lib/tools-registry";
import { ToolCard } from "@/components/tools/tool-card";
import { SearchBox } from "@/components/tools/search-box";

export const revalidate = 3600;

const FEATURED_SLUGS = ["creador-backlinks", "firmar-pdf", "calculadora-imc", "quitar-fondo-imagen", "calculadora-embarazo", "youtube-thumbnail", "escaner-qr", "ocr-imagen-texto"];

const NEW_SLUGS = ["interes-compuesto", "calculadoras-marketing", "conversor-zonas-horarias", "wifi-qr", "css-flex-generator", "cubic-bezier-generator", "contraste-color-wcag", "subnet-calculator", "generador-keywords-seo", "caption-generator", "youtube-tags-generator", "cuenta-regresiva"];

/**
 * "Lo más buscado" — enlazado interno DESDE la home (la página con más autoridad
 * del sitio) hacia las URLs que GSC ya premia con impresiones/posición. Antes la
 * home solo destacaba tools elegidas a mano; estas páginas-señal (glossary, calcs,
 * alternativas) no recibían ningún enlace interno desde la home. Anchors descriptivos
 * y keyword-rich para concentrar autoridad interna en lo que está cerca de rankear.
 */
const MOST_SEARCHED = [
  { href: "/cps-test", label: "CPS Test", note: "Mide tus clics por segundo: 1, 5, 10, 30 y 60 s" },
  { href: "/que-es-cps-test", label: "¿Qué es el CPS Test?", note: "Significado, buen CPS y récords mundiales" },
  { href: "/calculadora-propina", label: "Calculadora de propina", note: "Reparte la cuenta entre amigos" },
  { href: "/calculadora-regla-tres", label: "Calculadora de regla de tres", note: "Simple, inversa y compuesta" },
  { href: "/calculadora-iva-mexico", label: "Calculadora de IVA en México", note: "16% nacional y 8% frontera norte" },
  { href: "/contador-palabras", label: "Contador de palabras", note: "Palabras, caracteres y tiempo de lectura" },
  { href: "/convertir-mayusculas", label: "Convertir a mayúsculas", note: "MAYÚSCULAS, minúsculas y Title Case" },
  { href: "/generador-qr", label: "Generador de códigos QR", note: "URL, WiFi, vCard y texto" },
  { href: "/unir-pdf", label: "Unir PDF", note: "Combina varios PDF sin subirlos" },
  { href: "/alternativas-a-ilovepdf", label: "Alternativas a iLovePDF", note: "Comparativa honesta, privacidad primero" },
  { href: "/alternativas-a-piliapp", label: "Alternativas a PiliApp", note: "Símbolos y texto sin anuncios" },
  { href: "/que-es-jwt", label: "¿Qué es un JWT?", note: "Estructura, firma y ejemplos" }
];

const CAT_ICONS: Record<string, typeof FileText> = {
  text: FileText, seo: Search, pdf: FileText, image: ImageIcon, developer: Code2, converter: Zap,
  generator: Sparkles, calculator: Calculator, symbols: Heart, "fancy-text": Smile, test: Zap, random: Sparkles, ai: Star
};

export default function HomePage() {
  const popular = popularTools(12);
  const featured = FEATURED_SLUGS.map((s) => TOOLS.find((t) => t.slug === s)).filter(Boolean) as typeof TOOLS;
  const news = NEW_SLUGS.map((s) => TOOLS.find((t) => t.slug === s)).filter(Boolean) as typeof TOOLS;

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="px-4 pt-16 pb-12 md:pt-24 md:pb-16 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)] font-bold mb-5 border border-[color:var(--color-brand)]/30">
            <Sparkles className="w-3.5 h-3.5" /> {TOOLS.length}+ herramientas gratis · sin registro · sin ads invasivos
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-5 leading-[1.05]">
            Las herramientas online que <span className="text-[color:var(--color-brand)]">realmente funcionan</span>.
          </h1>
          <p className="text-lg md:text-xl text-[color:var(--color-fg-soft)] max-w-2xl mx-auto mb-8">
            PDF, SEO, calculadoras, IA, conversores, generadores. Todo gratis, en tu navegador. Sin uploads que tarden 5 minutos.
          </p>
          <SearchBox />
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {[
              { slug: "creador-backlinks", label: "Crear backlinks" },
              { slug: "firmar-pdf", label: "Firmar PDF" },
              { slug: "calculadora-imc", label: "Calcular IMC" },
              { slug: "calculadora-embarazo", label: "Embarazo" },
              { slug: "quitar-fondo-imagen", label: "Quitar fondo" },
              { slug: "youtube-thumbnail", label: "Thumbnail YT" },
              { slug: "escaner-qr", label: "Leer QR" }
            ].map((t) => (
              <Link key={t.slug} href={`/${t.slug}`} className="px-4 py-2 rounded-full text-sm font-bold border border-[color:var(--color-border)] hover:border-[color:var(--color-brand)] hover:bg-[color:var(--color-brand-soft)] hover:text-[color:var(--color-brand)] transition">
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight inline-flex items-center gap-2">
            <Search className="w-7 h-7 text-[color:var(--color-brand)]" /> Lo más buscado
          </h2>
          <Link href="/herramientas" className="text-sm text-[color:var(--color-brand)] inline-flex items-center gap-1 hover:underline font-bold">Ver todas <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {MOST_SEARCHED.map((t) => (
            <Link key={t.href} href={t.href} className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4 hover:border-[color:var(--color-brand)] hover:bg-[color:var(--color-brand-soft)]/30 transition group">
              <div className="font-bold text-sm leading-tight mb-1 group-hover:text-[color:var(--color-brand)]">{t.label}</div>
              <div className="text-xs text-[color:var(--color-fg-soft)]">{t.note}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight inline-flex items-center gap-2">
            <Star className="w-7 h-7 text-yellow-500 fill-yellow-500" /> Destacadas
          </h2>
          <Link href="/herramientas" className="text-sm text-[color:var(--color-brand)] inline-flex items-center gap-1 hover:underline font-bold">Ver todas <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {featured.slice(0, 8).map((t) => (
            <Link key={t.slug} href={`/${t.slug}`} className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5 hover:border-[color:var(--color-brand)] hover:scale-[1.02] hover:shadow-lg transition group">
              <div className="text-3xl mb-2">{CATEGORIES[t.category].emoji}</div>
              <div className="font-bold text-base leading-tight mb-1 group-hover:text-[color:var(--color-brand)]">{t.name}</div>
              <div className="text-xs text-[color:var(--color-fg-soft)] line-clamp-2">{t.shortDesc}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight inline-flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-purple-500" /> Novedades
            <span className="px-2 py-0.5 rounded-full text-xs bg-purple-500/15 text-purple-500 font-bold">{news.length}</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {news.slice(0, 12).map((t) => (
            <Link key={t.slug} href={`/${t.slug}`} className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4 hover:border-[color:var(--color-brand)] transition group">
              <div className="text-xs font-bold uppercase text-purple-500 mb-1">Nuevo</div>
              <div className="font-bold text-sm leading-tight mb-1 group-hover:text-[color:var(--color-brand)]">{t.name}</div>
              <div className="text-xs text-[color:var(--color-fg-soft)] line-clamp-1">{t.shortDesc}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight inline-flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-[color:var(--color-brand)]" /> Más populares
          </h2>
          <Link href="/herramientas" className="text-sm text-[color:var(--color-brand)] inline-flex items-center gap-1 hover:underline font-bold">Ver todas <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {popular.map((t) => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </section>

      {/* Sección "Nuevo en Toolram" — internal linking masivo a wave 14 URLs no indexadas */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight inline-flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-purple-500" /> Nuevo en Toolram
          </h2>
          <Link href="/blog" className="text-sm text-[color:var(--color-brand)] inline-flex items-center gap-1 hover:underline font-bold">Ver blog completo <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <p className="text-[color:var(--color-fg-soft)] mb-6">Guías recién publicadas + nuevas comparativas. Si trabajás con PDF, SEO, calculadoras o dev tools, empezá por acá.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {[
            { href: "/blog/guia-completa-pdf-online-2026", title: "Guía completa para trabajar con PDF online en 2026", tag: "PDF", time: "14 min" },
            { href: "/blog/auditoria-seo-tecnica-gratis-2026", title: "Cómo hacer una auditoría SEO técnica sin pagar herramientas", tag: "SEO", time: "16 min" },
            { href: "/blog/herramientas-desarrolladores-online-2026", title: "20 herramientas online imprescindibles para devs", tag: "Dev", time: "12 min" },
            { href: "/blog/calculadoras-financieras-imc-imc-2026", title: "15 calculadoras útiles que vas a necesitar en 2026", tag: "Calc", time: "11 min" },
            { href: "/blog/simbolos-copiar-pegar-unicode-2026", title: "Símbolos Unicode para copiar y pegar (200+)", tag: "Símbolos", time: "8 min" },
            { href: "/blog/edicion-imagenes-online-gratis-2026", title: "Edición de imágenes online gratis: 10 operaciones", tag: "Imágenes", time: "9 min" },
          ].map((p) => (
            <Link key={p.href} href={p.href} className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4 hover:border-[color:var(--color-brand)] transition group">
              <div className="flex gap-2 mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-500 font-bold">{p.tag}</span>
                <span className="text-xs text-[color:var(--color-fg-soft)]">⏱ {p.time}</span>
              </div>
              <div className="font-bold text-sm leading-tight group-hover:text-[color:var(--color-brand)]">{p.title}</div>
            </Link>
          ))}
        </div>

        <div className="rounded-2xl border-2 border-dashed border-[color:var(--color-border)] p-5">
          <div className="text-sm font-bold mb-3">Comparativas honestas con alternativas:</div>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/alternativas-a-ilovepdf", label: "vs iLovePDF" },
              { href: "/alternativas-a-smallpdf", label: "vs SmallPDF" },
              { href: "/alternativas-a-smallseotools", label: "vs SmallSEOTools" },
              { href: "/alternativas-a-piliapp", label: "vs PiliApp" },
              { href: "/alternativas-a-canva-pdf", label: "vs Canva PDF" },
              { href: "/alternativas-a-tinywow", label: "vs TinyWow" },
              { href: "/alternativas-a-pdf24", label: "vs PDF24" },
              { href: "/alternativas-a-sejda", label: "vs Sejda" },
              { href: "/alternativas-a-freepik-tools", label: "vs Freepik Tools" },
              { href: "/alternativas-a-adobe-acrobat-online", label: "vs Adobe Acrobat" },
            ].map((a) => (
              <Link key={a.href} href={a.href} className="px-3 py-1.5 rounded-full text-xs font-medium border border-[color:var(--color-border)] hover:border-[color:var(--color-brand)] hover:bg-[color:var(--color-brand-soft)] hover:text-[color:var(--color-brand)] transition">
                {a.label}
              </Link>
            ))}
          </div>
          <div className="text-xs text-[color:var(--color-fg-soft)] mt-3">10 comparativas con tablas detalladas, pros/contras reales y FAQs.</div>
        </div>
      </section>

      {/* Sección "Guías rápidas" — más blog post links + glossary */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4">Guías rápidas (4-7 min)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: "/blog/como-comprimir-pdf-sin-perder-calidad-2026", title: "Comprimir PDF sin perder calidad" },
            { href: "/blog/como-mejorar-core-web-vitals-2026", title: "Mejorar Core Web Vitals" },
            { href: "/blog/jwt-decoder-explicado-2026", title: "JWT decoder explicado" },
            { href: "/blog/calculadora-imc-formula-rangos-explicados-2026", title: "IMC: fórmula y rangos" },
            { href: "/blog/como-poner-emojis-y-simbolos-instagram-bio-2026", title: "Símbolos en Instagram bio" },
            { href: "/blog/como-quitar-fondo-imagen-gratis-2026", title: "Quitar fondo gratis" },
            { href: "/blog/que-es-un-uuid-cuando-usar-2026", title: "Qué es un UUID" },
            { href: "/blog/firmar-pdf-online-gratis-guia-2026", title: "Firmar PDF online gratis" },
          ].map((g) => (
            <Link key={g.href} href={g.href} className="rounded-lg border border-[color:var(--color-border)] p-3 hover:border-[color:var(--color-brand)] transition group">
              <div className="text-xs font-bold mb-1 group-hover:text-[color:var(--color-brand)]">{g.title}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Todas las categorías</h2>
        <p className="text-[color:var(--color-fg-soft)] mb-6">{TOOLS.length} herramientas organizadas en {Object.keys(CATEGORIES).length} categorías</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.entries(CATEGORIES).map(([k, c]) => {
            const count = toolsByCategory(k as keyof typeof CATEGORIES).length;
            const Icon = CAT_ICONS[k] || FileText;
            return (
              <Link key={k} href={`/categoria/${c.slug}`} className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5 hover:border-[color:var(--color-brand)] hover:bg-[color:var(--color-brand-soft)]/30 transition group">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{c.emoji}</div>
                  <div className="text-xs font-bold px-2 py-0.5 rounded-full bg-[color:var(--color-bg-soft)] text-[color:var(--color-fg-soft)] inline-flex items-center gap-1">
                    <Icon className="w-3 h-3" /> {count}
                  </div>
                </div>
                <div className="font-bold text-base mb-1 group-hover:text-[color:var(--color-brand)]">{c.name}</div>
                <div className="text-xs text-[color:var(--color-fg-soft)] line-clamp-2">{c.description}</div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-gradient-to-br from-[color:var(--color-bg)] to-[color:var(--color-brand-soft)]/30 p-6">
          <div className="w-12 h-12 rounded-xl bg-[color:var(--color-brand-soft)] flex items-center justify-center mb-3">
            <Shield className="w-6 h-6 text-[color:var(--color-brand)]" />
          </div>
          <h3 className="text-lg font-bold mb-1">100% privado</h3>
          <p className="text-sm text-[color:var(--color-fg-soft)]">La mayoría de tools procesa todo en tu navegador con WebAssembly. Tus archivos NUNCA se suben.</p>
        </div>
        <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-gradient-to-br from-[color:var(--color-bg)] to-yellow-500/10 p-6">
          <div className="w-12 h-12 rounded-xl bg-yellow-500/15 flex items-center justify-center mb-3">
            <Zap className="w-6 h-6 text-yellow-500" />
          </div>
          <h3 className="text-lg font-bold mb-1">Instantáneo</h3>
          <p className="text-sm text-[color:var(--color-fg-soft)]">Sin esperar uploads ni colas. Resultados al instante. Muchas tools funcionan offline después de la 1ra carga.</p>
        </div>
        <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-gradient-to-br from-[color:var(--color-bg)] to-purple-500/10 p-6">
          <div className="w-12 h-12 rounded-xl bg-purple-500/15 flex items-center justify-center mb-3">
            <Sparkles className="w-6 h-6 text-purple-500" />
          </div>
          <h3 className="text-lg font-bold mb-1">Sin registro</h3>
          <p className="text-sm text-[color:var(--color-fg-soft)]">No pedimos email, ni te llenamos de pop-ups. Empezá a usar cualquier tool al instante.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 mb-8">
        <div className="rounded-3xl bg-gradient-to-br from-[color:var(--color-brand)] to-purple-600 p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">¿Qué tool necesitás?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-6">Si no la tenemos, escribinos. Agregamos las más pedidas en menos de 48hs.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/herramientas" className="px-6 py-3 rounded-xl bg-white text-[color:var(--color-brand)] font-bold hover:scale-105 transition inline-flex items-center gap-2">Ver todas las {TOOLS.length} <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/contacto" className="px-6 py-3 rounded-xl bg-white/15 backdrop-blur text-white font-bold hover:bg-white/25 transition border border-white/30">Pedir una nueva</Link>
          </div>
        </div>
      </section>
    </>
  );
}
