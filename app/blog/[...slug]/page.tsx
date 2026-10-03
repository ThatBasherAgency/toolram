import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Home, Clock } from "lucide-react";
import { ALL_POSTS as POSTS, POSTS_BY_SLUG } from "@/data/blog";
import { BlogBody } from "@/components/blog/blog-renderer";
import { clampTitle } from "@/lib/seo-meta";
import { SITE } from "@/lib/site";

export const dynamicParams = true;

// Prerender de todos los posts: sin esto el <title> y el canonical salían fuera del <head>.
export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug.replace(/^blog\//, "").split("/") }));
}
export const revalidate = 86400;

const TOP_TOOLS = [
  { href: "/cps-test", name: "Test de clicks por segundo", desc: "Mide tu CPS en 1, 5, 10, 30 o 60 segundos." },
  { href: "/numero-a-letras", name: "Número a letras", desc: "Montos con letra para cheques, pagarés y facturas." },
  { href: "/buscador-emojis", name: "Buscador de emojis", desc: "Encuentra cualquier emoji y cópialo con un clic." },
  { href: "/convertir-mayusculas", name: "Mayúsculas a minúsculas", desc: "Cambia el texto de mayúsculas a minúsculas y al revés." },
  { href: "/calculadora-regla-tres", name: "Calculadora de regla de tres", desc: "Simple, inversa y compuesta, con el procedimiento." },
  { href: "/contador-tokens", name: "Contador de tokens", desc: "Cuenta tokens y estima el costo antes de usar una IA." }
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const fullSlug = `blog/${slug.join("/")}`;
  const post = POSTS_BY_SLUG[fullSlug];
  if (!post) return {};
  return {
    title: clampTitle(post.title),
    description: post.excerpt,
    alternates: { canonical: `/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${SITE.url}/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author]
    }
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const fullSlug = `blog/${slug.join("/")}`;
  const post = POSTS_BY_SLUG[fullSlug];
  if (!post) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      author: { "@type": "Person", name: post.author, url: "https://josegaspard.dev" },
      publisher: { "@type": "Organization", name: SITE.name, url: SITE.url, logo: `${SITE.url}/icon-512.png` },
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/${post.slug}` },
      url: `${SITE.url}/${post.slug}`,
      keywords: post.keywords.join(", "),
      inLanguage: "es"
    }
  ];
  if (post.faqs && post.faqs.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
    } as never);
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="max-w-3xl mx-auto px-4 py-8">
        <nav className="flex items-center gap-1.5 text-xs text-[color:var(--color-fg-soft)] mb-4">
          <Link href="/" className="hover:text-[color:var(--color-brand)] inline-flex items-center gap-1"><Home className="w-3 h-3" /> Inicio</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/blog" className="hover:text-[color:var(--color-brand)]">Blog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[color:var(--color-fg)] truncate">{post.category}</span>
        </nav>
        <header className="mb-8">
          <span className="text-xs px-2 py-0.5 rounded-full bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)] inline-block mb-3">{post.category}</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">{post.title}</h1>
          <p className="text-lg text-[color:var(--color-fg-soft)] mb-4">{post.excerpt}</p>
          <div className="flex items-center gap-3 text-xs text-[color:var(--color-fg-soft)]">
            <span>Por <Link href="/sobre/jose-gaspard" className="hover:text-[color:var(--color-brand)] font-medium">{post.author}</Link></span>
            <span>·</span>
            <span>{new Date(post.publishedAt).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {post.estimatedReadMinutes} min</span>
          </div>
        </header>
        <div className="prose-sm">
          <BlogBody body={post.body} />
        </div>
        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Preguntas frecuentes</h2>
            <div className="space-y-2">
              {post.faqs.map((f, i) => (
                <details key={i} className="card !p-3">
                  <summary className="font-medium cursor-pointer">{f.q}</summary>
                  <p className="text-sm text-[color:var(--color-fg-soft)] mt-2">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}
        {/* 3-oct-2026: enlazado interno fijo hacia las herramientas con más impresiones en Bing (90 d). */}
        <nav aria-label="Herramientas más usadas" className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Herramientas más usadas</h2>
          <ul className="grid sm:grid-cols-2 gap-2">
            {TOP_TOOLS.filter((t) => !post.body.includes(`](${t.href})`)).map((t) => (
              <li key={t.href}>
                <Link href={t.href} className="card !p-3 block hover:border-[color:var(--color-brand)]">
                  <span className="font-medium">{t.name}</span>
                  <span className="block text-sm text-[color:var(--color-fg-soft)]">{t.desc}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </article>
    </>
  );
}
