import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Zap, TrendingUp, Star, FileText, Image as ImageIcon, Search, Calculator, Code2, Heart, Smile } from "lucide-react";
import { CATEGORIES, popularTools, TOOLS, toolsByCategory } from "@/lib/tools-registry";
import { ToolCard } from "@/components/tools/tool-card";
import { SearchBox } from "@/components/tools/search-box";

const FEATURED_SLUGS = ["creador-backlinks", "firmar-pdf", "calculadora-imc", "quitar-fondo-imagen", "calculadora-embarazo", "youtube-thumbnail", "escaner-qr", "ocr-imagen-texto"];

const NEW_SLUGS = ["calculadora-calorias", "calculadora-embarazo", "calculadora-ovulacion", "validador-rfc-curp", "validador-clabe-cbu", "calculadora-sueldo-neto", "escaner-qr", "buscador-emojis", "generador-bio-instagram", "firma-email", "calculadora-edad-mascota", "barcode-generator"];

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
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.98_0.05_220),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,oklch(0.25_0.1_240/.4),transparent_60%)]" />
        <div className="px-4 pt-16 pb-12 md:pt-24 md:pb-16 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)] font-bold mb-5 border border-[color:var(--color-brand)]/30">
            <Sparkles className="w-3.5 h-3.5" /> {TOOLS.length}+ herramientas gratis · sin registro · sin ads invasivos
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-5 leading-[1.05]">
            Las herramientas online que <span className="bg-gradient-to-r from-[color:var(--color-brand)] to-purple-500 bg-clip-text text-transparent">realmente funcionan</span>.
          </h1>
          <p className="text-lg md:text-xl text-[color:var(--color-fg-soft)] max-w-2xl mx-auto mb-8">
            PDF, SEO, calculadoras, IA, conversores, generadores. Todo gratis, en tu navegador. Sin uploads que tarden 5 minutos.
          </p>
          <SearchBox />
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {[
              { slug: "creador-backlinks", emoji: "🔗", label: "Crear backlinks" },
              { slug: "firmar-pdf", emoji: "✍️", label: "Firmar PDF" },
              { slug: "calculadora-imc", emoji: "💪", label: "Calcular IMC" },
              { slug: "calculadora-embarazo", emoji: "🤰", label: "Embarazo" },
              { slug: "quitar-fondo-imagen", emoji: "🪄", label: "Quitar fondo" },
              { slug: "youtube-thumbnail", emoji: "📺", label: "Thumbnail YT" },
              { slug: "escaner-qr", emoji: "📱", label: "Leer QR" }
            ].map((t) => (
              <Link key={t.slug} href={`/${t.slug}`} className="px-4 py-2 rounded-full text-sm font-bold border-2 border-[color:var(--color-border)] hover:border-[color:var(--color-brand)] hover:bg-[color:var(--color-brand-soft)] hover:text-[color:var(--color-brand)] transition">
                {t.emoji} {t.label}
              </Link>
            ))}
          </div>
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
