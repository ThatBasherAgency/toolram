"use client";
import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";

export function MetaTagsGenerator() {
  const [title, setTitle] = useState("Mi increíble página");
  const [desc, setDesc] = useState("La descripción más relevante en 150-160 caracteres explicando claramente qué encontrará el usuario.");
  const [url, setUrl] = useState("https://ejemplo.com/");
  const [image, setImage] = useState("https://ejemplo.com/og-image.jpg");
  const [type, setType] = useState("website");
  const [twitter, setTwitter] = useState("@usuario");
  const [locale, setLocale] = useState("es_MX");
  const [copied, setCopied] = useState(false);

  const html = useMemo(() => {
    const lines = [
      `<!-- Meta básicos -->`,
      `<title>${title}</title>`,
      `<meta name="description" content="${desc}">`,
      `<link rel="canonical" href="${url}">`,
      ``,
      `<!-- Open Graph (Facebook / LinkedIn) -->`,
      `<meta property="og:type" content="${type}">`,
      `<meta property="og:title" content="${title}">`,
      `<meta property="og:description" content="${desc}">`,
      `<meta property="og:url" content="${url}">`,
      `<meta property="og:image" content="${image}">`,
      `<meta property="og:locale" content="${locale}">`,
      ``,
      `<!-- Twitter Card -->`,
      `<meta name="twitter:card" content="summary_large_image">`,
      `<meta name="twitter:title" content="${title}">`,
      `<meta name="twitter:description" content="${desc}">`,
      `<meta name="twitter:image" content="${image}">`,
      ...(twitter ? [`<meta name="twitter:site" content="${twitter}">`] : [])
    ];
    return lines.join("\n");
  }, [title, desc, url, image, type, twitter, locale]);

  async function copy() {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  const titleLen = title.length;
  const descLen = desc.length;

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-3">
        <label className="block text-sm">
          Título <span className={`text-xs ${titleLen > 60 ? "text-[color:var(--color-danger)]" : "text-[color:var(--color-fg-soft)]"}`}>{titleLen}/60</span>
          <input className="input mt-1" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label className="block text-sm">
          URL canónica
          <input className="input mt-1" value={url} onChange={(e) => setUrl(e.target.value)} />
        </label>
      </div>
      <label className="block text-sm">
        Meta description <span className={`text-xs ${descLen > 160 ? "text-[color:var(--color-danger)]" : "text-[color:var(--color-fg-soft)]"}`}>{descLen}/160</span>
        <textarea className="input mt-1" rows={2} value={desc} onChange={(e) => setDesc(e.target.value)} />
      </label>
      <div className="grid md:grid-cols-2 gap-3">
        <label className="block text-sm">Imagen OG (1200×630)<input className="input mt-1" value={image} onChange={(e) => setImage(e.target.value)} /></label>
        <label className="block text-sm">@Twitter (opcional)<input className="input mt-1" value={twitter} onChange={(e) => setTwitter(e.target.value)} /></label>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <label className="block text-sm">Tipo OG
          <select className="input mt-1" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="website">website</option>
            <option value="article">article</option>
            <option value="product">product</option>
            <option value="profile">profile</option>
          </select>
        </label>
        <label className="block text-sm">Locale
          <select className="input mt-1" value={locale} onChange={(e) => setLocale(e.target.value)}>
            <option value="es_MX">es_MX</option>
            <option value="es_ES">es_ES</option>
            <option value="es_AR">es_AR</option>
            <option value="en_US">en_US</option>
            <option value="en_GB">en_GB</option>
          </select>
        </label>
      </div>
      <div className="card !p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase text-[color:var(--color-fg-soft)]">HTML generado</span>
          <button onClick={copy} className="btn btn-ghost h-7 !px-2 text-xs">
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? "Copiado" : "Copiar"}
          </button>
        </div>
        <pre className="text-xs font-mono whitespace-pre-wrap break-all">{html}</pre>
      </div>
    </div>
  );
}
