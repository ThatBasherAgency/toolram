"use client";
import { useMemo, useState } from "react";
import { Link2, ExternalLink, CheckCircle2, AlertTriangle } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 200)";

type Service = { name: string; url: (u: string, d: string) => string; category: "seo" | "speed" | "cache" | "schema" | "social" | "security"; da?: number };

const SERVICES: Service[] = [
  { name: "Wayback Machine (archivar)", url: (u) => `https://web.archive.org/save/${u}`, category: "cache", da: 93 },
  { name: "Wayback Machine (ver)", url: (u) => `https://web.archive.org/web/*/${u}`, category: "cache", da: 93 },
  { name: "Google Cache", url: (u) => `https://webcache.googleusercontent.com/search?q=cache:${u}`, category: "cache", da: 100 },
  { name: "CachedView", url: (u) => `https://cachedview.com/cgi-bin/google.cgi?q=${encodeURIComponent(u)}`, category: "cache", da: 50 },
  { name: "Google PageSpeed Insights", url: (u) => `https://pagespeed.web.dev/report?url=${encodeURIComponent(u)}`, category: "speed", da: 100 },
  { name: "GTmetrix", url: (u) => `https://gtmetrix.com/?url=${encodeURIComponent(u)}`, category: "speed", da: 80 },
  { name: "WebPageTest", url: (u) => `https://www.webpagetest.org/?url=${encodeURIComponent(u)}`, category: "speed", da: 88 },
  { name: "Pingdom Tools", url: (u) => `https://tools.pingdom.com/?url=${encodeURIComponent(u)}`, category: "speed", da: 85 },
  { name: "WhoIs.com", url: (_, d) => `https://www.whois.com/whois/${d}`, category: "seo", da: 79 },
  { name: "WhoIsXMLAPI", url: (_, d) => `https://main.whoisxmlapi.com/whois-domain-search?domainName=${d}`, category: "seo", da: 64 },
  { name: "BuiltWith", url: (_, d) => `https://builtwith.com/${d}`, category: "seo", da: 88 },
  { name: "SEMrush Site Overview", url: (_, d) => `https://www.semrush.com/website/${d}/overview/`, category: "seo", da: 92 },
  { name: "Similarweb", url: (_, d) => `https://www.similarweb.com/website/${d}/`, category: "seo", da: 91 },
  { name: "Ahrefs Site Explorer", url: (_, d) => `https://ahrefs.com/site-explorer/overview/v2/exact/recent?target=${encodeURIComponent(d)}`, category: "seo", da: 92 },
  { name: "SiteWorth", url: (_, d) => `https://www.siteprice.org/website-worth-of/${d}`, category: "seo", da: 38 },
  { name: "WooRank", url: (_, d) => `https://www.woorank.com/en/www/${d}`, category: "seo", da: 79 },
  { name: "SEOptimer", url: (u) => `https://www.seoptimer.com/${encodeURIComponent(u)}`, category: "seo", da: 70 },
  { name: "Nibbler (Silktide)", url: (_, d) => `https://nibbler.silktide.com/en_US/reports/${d}`, category: "seo", da: 82 },
  { name: "Sitechecker", url: (u) => `https://sitechecker.pro/site-audit/?utm_source=app&domain=${encodeURIComponent(u)}`, category: "seo", da: 65 },
  { name: "SEOSiteCheckup", url: (_, d) => `https://seositecheckup.com/seo-audit/${d}`, category: "seo", da: 67 },
  { name: "Hubspot Website Grader", url: (_, d) => `https://website.grader.com/tests/${d}`, category: "seo", da: 92 },
  { name: "DNSChecker", url: (_, d) => `https://dnschecker.org/all-dns-records-of-domain.php?query=${d}&rtype=ALL`, category: "seo", da: 73 },
  { name: "MXToolbox", url: (_, d) => `https://mxtoolbox.com/SuperTool.aspx?action=mx%3a${d}`, category: "seo", da: 78 },
  { name: "Schema.org Validator", url: (u) => `https://validator.schema.org/#url=${encodeURIComponent(u)}`, category: "schema", da: 96 },
  { name: "Google Rich Results Test", url: (u) => `https://search.google.com/test/rich-results?url=${encodeURIComponent(u)}`, category: "schema", da: 100 },
  { name: "Google Mobile-Friendly Test", url: (u) => `https://search.google.com/test/mobile-friendly?url=${encodeURIComponent(u)}`, category: "schema", da: 100 },
  { name: "Google AMP Test", url: (u) => `https://search.google.com/test/amp?url=${encodeURIComponent(u)}`, category: "schema", da: 100 },
  { name: "LinkedIn Post Inspector", url: (u) => `https://www.linkedin.com/post-inspector/inspect/${encodeURIComponent(u)}`, category: "social", da: 98 },
  { name: "Facebook Debugger", url: (u) => `https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(u)}`, category: "social", da: 98 },
  { name: "Twitter Card Validator", url: () => `https://cards-dev.twitter.com/validator`, category: "social", da: 96 },
  { name: "Sucuri SiteCheck", url: (u) => `https://sitecheck.sucuri.net/results/${encodeURIComponent(u)}`, category: "security", da: 76 },
  { name: "URLVoid", url: (_, d) => `https://www.urlvoid.com/scan/${d}/`, category: "security", da: 65 },
  { name: "SSL Labs Test", url: (_, d) => `https://www.ssllabs.com/ssltest/analyze.html?d=${d}`, category: "security", da: 86 },
  { name: "SecurityHeaders.com", url: (u) => `https://securityheaders.com/?q=${encodeURIComponent(u)}&followRedirects=on`, category: "security", da: 67 },
  { name: "Internet Archive Add", url: (u) => `https://web.archive.org/save?url=${encodeURIComponent(u)}&capture_all=on`, category: "cache", da: 93 },
  { name: "Robots.txt Tester (Google)", url: (_, d) => `https://www.google.com/webmasters/tools/robots-testing-tool?siteUrl=${encodeURIComponent("https://" + d + "/")}`, category: "seo", da: 100 },
  { name: "Spyfu", url: (_, d) => `https://www.spyfu.com/overview/domain?query=${d}`, category: "seo", da: 76 },
  { name: "OpenLinkProfiler", url: (_, d) => `https://www.openlinkprofiler.org/r/${d}`, category: "seo", da: 65 },
  { name: "BacklinkCheck", url: (_, d) => `https://www.backlinkcheck.org/${d}`, category: "seo", da: 35 },
  { name: "SmallSEOTools Domain Authority", url: (_, d) => `https://smallseotools.com/domain-authority-checker/?domains=${d}`, category: "seo", da: 75 }
];

const CATEGORIES = {
  seo: { label: "SEO / Análisis", color: "oklch(0.55 0.22 200)" },
  speed: { label: "Velocidad", color: "oklch(0.65 0.2 145)" },
  cache: { label: "Cache / Archivos", color: "oklch(0.6 0.22 35)" },
  schema: { label: "Schema / Tests Google", color: "oklch(0.55 0.22 280)" },
  social: { label: "Social Media", color: "oklch(0.6 0.22 320)" },
  security: { label: "Seguridad / SSL", color: "oklch(0.6 0.22 25)" }
};

function parseDomain(u: string): string {
  try {
    return new URL(u.startsWith("http") ? u : "https://" + u).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function BacklinkMaker() {
  const [url, setUrl] = useState("");
  const [opened, setOpened] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<"all" | keyof typeof CATEGORIES>("all");

  const normalizedUrl = useMemo(() => {
    const u = url.trim();
    if (!u) return "";
    return u.startsWith("http") ? u : "https://" + u;
  }, [url]);
  const domain = useMemo(() => parseDomain(normalizedUrl), [normalizedUrl]);

  const filtered = useMemo(() => filter === "all" ? SERVICES : SERVICES.filter((s) => s.category === filter), [filter]);

  function open(idx: number, s: Service) {
    if (!normalizedUrl) return;
    const link = s.url(normalizedUrl, domain);
    window.open(link, "_blank", "noopener,noreferrer");
    setOpened((prev) => new Set(prev).add(idx));
  }

  function openAll() {
    if (!normalizedUrl) return;
    if (!confirm(`¿Abrir ${filtered.length} pestañas? Tu navegador puede pedir permiso para popups.`)) return;
    filtered.forEach((s, i) => {
      setTimeout(() => {
        const link = s.url(normalizedUrl, domain);
        window.open(link, "_blank", "noopener,noreferrer");
        setOpened((prev) => new Set(prev).add(SERVICES.indexOf(s)));
      }, i * 200);
    });
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Creador de Backlinks Gratis</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Envía tu URL a {SERVICES.length}+ herramientas SEO públicas. Cuando consultan tu sitio dejan tu URL indexada en sus reportes públicos = backlinks naturales y legítimos.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6">
        <label className="block">
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Tu URL</span>
          <div className="flex gap-2 mt-1.5">
            <input type="url" className="flex-1 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-base font-mono focus:outline-none focus:border-[color:var(--color-brand)]" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://tudominio.com" />
            <button onClick={openAll} disabled={!normalizedUrl} className="px-6 py-3 rounded-xl text-white font-bold text-sm whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-2" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 60%, black))` }}>
              <Link2 className="w-4 h-4" /> Crear todos ({filtered.length})
            </button>
          </div>
          {domain && <div className="text-xs text-[color:var(--color-fg-soft)] mt-2">Dominio detectado: <strong className="text-[color:var(--color-fg)]">{domain}</strong></div>}
        </label>

        <div className="flex flex-wrap gap-2 mt-4">
          <button onClick={() => setFilter("all")} className="px-3 py-1.5 rounded-md text-xs font-bold transition" style={filter === "all" ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>Todos ({SERVICES.length})</button>
          {(Object.keys(CATEGORIES) as (keyof typeof CATEGORIES)[]).map((k) => (
            <button key={k} onClick={() => setFilter(k)} className="px-3 py-1.5 rounded-md text-xs font-bold transition" style={filter === k ? { background: CATEGORIES[k].color, color: "white" } : { background: "var(--color-bg-soft)" }}>
              {CATEGORIES[k].label} ({SERVICES.filter((s) => s.category === k).length})
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-[color:var(--color-warning)]/10 border border-[color:var(--color-warning)] p-4 mb-6 flex gap-3">
        <AlertTriangle className="w-5 h-5 text-[color:var(--color-warning)] flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <strong className="text-[color:var(--color-fg)] block mb-1">Cómo funciona</strong>
          Estas herramientas SEO públicas (PageSpeed, WhoIs, BuiltWith, Wayback Machine, etc) generan reportes públicos que incluyen tu URL. Esos reportes son <strong>indexables por Google</strong> = backlinks reales aunque sean de baja autoridad. <strong>NO es spam</strong> — son consultas reales a tu sitio que beneficia tu indexación + diagnostica problemas.
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mb-6">
        {filtered.map((s) => {
          const idx = SERVICES.indexOf(s);
          const isOpened = opened.has(idx);
          const cat = CATEGORIES[s.category];
          return (
            <button key={s.name} onClick={() => open(idx, s)} disabled={!normalizedUrl} className="rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4 text-left hover:border-[color:var(--color-brand)] disabled:opacity-50 disabled:cursor-not-allowed transition group">
              <div className="flex items-start justify-between gap-3 mb-1">
                <div className="font-bold text-sm leading-tight">{s.name}</div>
                {isOpened ? <CheckCircle2 className="w-4 h-4 text-[color:var(--color-success)] flex-shrink-0" /> : <ExternalLink className="w-4 h-4 text-[color:var(--color-fg-soft)] group-hover:text-[color:var(--color-brand)] flex-shrink-0" />}
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded-md font-bold" style={{ background: cat.color, color: "white" }}>{cat.label}</span>
                {s.da && <span className="text-[color:var(--color-fg-soft)]">DA <strong className="text-[color:var(--color-fg)]">{s.da}</strong></span>}
              </div>
            </button>
          );
        })}
      </div>

      <AdSlot slot="backlink_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">💡 Estrategia recomendada</strong>
        <ol className="space-y-1 list-decimal list-inside">
          <li><strong className="text-[color:var(--color-fg)]">Empieza por categoría "Cache"</strong> (Wayback Machine, archive.org) — son los más estables y útiles para SEO histórico.</li>
          <li><strong className="text-[color:var(--color-fg)]">"Velocidad"</strong> deja reportes públicos visibles + te da insights reales para mejorar tu Core Web Vitals.</li>
          <li><strong className="text-[color:var(--color-fg)]">"SEO"</strong> son los más buscados pero algunos requieren login (Ahrefs, SEMrush) — se generan igual al consultar.</li>
          <li><strong className="text-[color:var(--color-fg)]">Repetí mensualmente</strong> — los caches expiran y los rankings cambian.</li>
          <li><strong className="text-[color:var(--color-fg)]">Combiná con contenido real</strong>: backlinks de tools no reemplazan estrategia editorial. Son complemento, no estrategia única.</li>
        </ol>
      </div>
    </div>
  );
}
