import { getContentBoost } from "@/lib/seo-content-boost";

type Props = { slug: string };

/**
 * Render bloques de contenido SEO extendido para slugs priorizados.
 * Devuelve null si el slug no tiene boost configurado.
 */
export function ContentBoost({ slug }: Props) {
  const boost = getContentBoost(slug);
  if (!boost) return null;

  return (
    <div className="mb-8">
      {boost.intro && (
        <section className="mb-8">
          <p className="text-base text-[color:var(--color-fg-soft)] leading-relaxed">{boost.intro}</p>
        </section>
      )}

      {boost.sections.map((section, i) => (
        <section key={i} className="mb-8">
          <h2 className="text-xl font-bold mb-3" data-passage={section.citableSummary ? "summary" : undefined}>
            {section.heading}
          </h2>
          {section.citableSummary && (
            <p className="mb-3 text-sm font-medium tldr-citable" style={{
              padding: "10px 14px",
              borderLeft: "3px solid var(--color-brand)",
              background: "var(--color-brand-soft)",
              borderRadius: "4px"
            }}>
              <span dangerouslySetInnerHTML={{ __html: section.citableSummary }} />
            </p>
          )}
          {section.paragraphs.map((p, j) => (
            <p key={j} className="text-[color:var(--color-fg-soft)] leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: p }} />
          ))}
          {section.bullets && section.bullets.length > 0 && (
            <ul className="space-y-1.5 text-sm mt-2">
              {section.bullets.map((b, j) => (
                <li key={j} className="flex gap-2">
                  <span className="text-[color:var(--color-brand)]">▸</span>
                  <span dangerouslySetInnerHTML={{ __html: b }} />
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {boost.steps && boost.steps.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Cómo funciona — paso a paso</h2>
          <ol className="space-y-3">
            {boost.steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[color:var(--color-brand)] text-white font-bold text-sm flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <div className="font-semibold">{step.title}</div>
                  <div className="text-sm text-[color:var(--color-fg-soft)]">{step.description}</div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
