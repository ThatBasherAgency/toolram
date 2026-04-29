import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Home, Clock } from "lucide-react";
import { POSTS, POSTS_BY_SLUG } from "@/data/blog";
import { BlogBody } from "@/components/blog/blog-renderer";
import { SITE } from "@/lib/site";

export const dynamicParams = true;
export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const fullSlug = `blog/${slug.join("/")}`;
  const post = POSTS_BY_SLUG[fullSlug];
  if (!post) return {};
  return {
    title: post.title,
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
      publisher: { "@type": "Organization", name: SITE.name, url: SITE.url, logo: `${SITE.url}/og/default.png` },
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
      </article>
    </>
  );
}
