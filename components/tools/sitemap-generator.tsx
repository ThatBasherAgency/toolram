"use client";
import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";

export function SitemapGenerator() {
  const [urls, setUrls] = useState("https://ejemplo.com/\nhttps://ejemplo.com/blog/\nhttps://ejemplo.com/sobre/\nhttps://ejemplo.com/contacto/");
  const [freq, setFreq] = useState("monthly");
  const [priority, setPriority] = useState("0.7");
  const [copied, setCopied] = useState(false);

  const xml = useMemo(() => {
    const list = urls.split("\n").map((u) => u.trim()).filter(Boolean);
    const today = new Date().toISOString().slice(0, 10);
    const entries = list.map((u) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`).join("\n");
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
  }, [urls, freq, priority]);

  const count = urls.split("\n").map((u) => u.trim()).filter(Boolean).length;

  async function copy() {
    await navigator.clipboard.writeText(xml);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }
  function download() {
    const blob = new Blob([xml], { type: "application/xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "sitemap.xml";
    a.click();
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm">
        URLs (una por línea) · <span className="text-xs text-[color:var(--color-fg-soft)]">{count} URLs</span>
        <textarea className="input mt-1 font-mono" rows={8} value={urls} onChange={(e) => setUrls(e.target.value)} />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm">Frecuencia
          <select className="input mt-1" value={freq} onChange={(e) => setFreq(e.target.value)}>
            <option value="always">always</option>
            <option value="hourly">hourly</option>
            <option value="daily">daily</option>
            <option value="weekly">weekly</option>
            <option value="monthly">monthly</option>
            <option value="yearly">yearly</option>
            <option value="never">never</option>
          </select>
        </label>
        <label className="block text-sm">Prioridad
          <select className="input mt-1" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="1.0">1.0 (home)</option>
            <option value="0.9">0.9</option>
            <option value="0.8">0.8</option>
            <option value="0.7">0.7 (estándar)</option>
            <option value="0.5">0.5</option>
            <option value="0.3">0.3</option>
          </select>
        </label>
      </div>
      <div className="card !p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase text-[color:var(--color-fg-soft)]">sitemap.xml</span>
          <div className="flex gap-2">
            <button onClick={copy} className="btn btn-ghost h-7 !px-2 text-xs">{copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}{copied ? "Copiado" : "Copiar"}</button>
            <button onClick={download} className="btn btn-ghost h-7 !px-2 text-xs">⬇ Descargar</button>
          </div>
        </div>
        <pre className="text-xs font-mono whitespace-pre-wrap max-h-80 overflow-auto">{xml}</pre>
      </div>
    </div>
  );
}
