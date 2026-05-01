"use client";
import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";

const PRESETS = [
  { id: "all", label: "Todo permitido", lines: ["User-agent: *", "Allow: /"] },
  { id: "block", label: "Bloquear todo", lines: ["User-agent: *", "Disallow: /"] },
  { id: "wp", label: "WordPress estándar", lines: ["User-agent: *", "Disallow: /wp-admin/", "Disallow: /wp-login.php", "Allow: /wp-admin/admin-ajax.php"] },
  { id: "shop", label: "E-commerce", lines: ["User-agent: *", "Disallow: /carrito", "Disallow: /checkout", "Disallow: /cuenta", "Disallow: /*?orderby=", "Disallow: /*?filter="] },
  { id: "ai-block", label: "Bloquear IA scrapers", lines: ["User-agent: GPTBot", "Disallow: /", "", "User-agent: Google-Extended", "Disallow: /", "", "User-agent: CCBot", "Disallow: /", "", "User-agent: anthropic-ai", "Disallow: /"] }
];

export function RobotsGenerator() {
  const [content, setContent] = useState("User-agent: *\nAllow: /\n");
  const [sitemap, setSitemap] = useState("https://ejemplo.com/sitemap.xml");
  const [copied, setCopied] = useState(false);

  const final = useMemo(() => content.trimEnd() + (sitemap ? `\n\nSitemap: ${sitemap}` : "") + "\n", [content, sitemap]);

  function applyPreset(id: string) {
    const p = PRESETS.find((x) => x.id === id);
    if (!p) return;
    setContent(p.lines.join("\n") + "\n");
  }

  async function copy() {
    await navigator.clipboard.writeText(final);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  function download() {
    const blob = new Blob([final], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "robots.txt";
    a.click();
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button key={p.id} onClick={() => applyPreset(p.id)} className="btn btn-ghost h-8 text-xs">{p.label}</button>
        ))}
      </div>
      <textarea className="input font-mono" rows={8} value={content} onChange={(e) => setContent(e.target.value)} />
      <label className="block text-sm">
        Sitemap (URL completa)
        <input className="input mt-1" value={sitemap} onChange={(e) => setSitemap(e.target.value)} placeholder="https://ejemplo.com/sitemap.xml" />
      </label>
      <div className="card !p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase text-[color:var(--color-fg-soft)]">robots.txt final</span>
          <div className="flex gap-2">
            <button onClick={copy} className="btn btn-ghost h-7 !px-2 text-xs">{copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}{copied ? "Copiado" : "Copiar"}</button>
            <button onClick={download} className="btn btn-ghost h-7 !px-2 text-xs">⬇ Descargar</button>
          </div>
        </div>
        <pre className="text-xs font-mono whitespace-pre-wrap">{final}</pre>
      </div>
    </div>
  );
}
