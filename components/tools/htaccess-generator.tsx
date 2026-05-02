"use client";
import { useMemo, useState } from "react";
import { Copy, Check, FileCode2, Plus, Trash2 } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.2 50)";

type Redirect = { from: string; to: string; code: 301 | 302 };

export function HtaccessGenerator() {
  const [forceHttps, setForceHttps] = useState(true);
  const [forceWww, setForceWww] = useState<"none" | "with" | "without">("without");
  const [removeIndex, setRemoveIndex] = useState(true);
  const [removeTrailing, setRemoveTrailing] = useState(false);
  const [block, setBlock] = useState<Set<string>>(new Set([".env", ".git"]));
  const [hotlinkProtect, setHotlinkProtect] = useState(false);
  const [hotlinkDomain, setHotlinkDomain] = useState("ejemplo.com");
  const [gzip, setGzip] = useState(true);
  const [browserCache, setBrowserCache] = useState(true);
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [customError, setCustomError] = useState(true);
  const [copied, setCopied] = useState(false);

  function toggleBlock(item: string) {
    setBlock((s) => {
      const next = new Set(s);
      next.has(item) ? next.delete(item) : next.add(item);
      return next;
    });
  }

  const code = useMemo(() => {
    const lines: string[] = ["# .htaccess generado por toolram.com", ""];

    if (forceHttps || forceWww !== "none" || removeIndex || removeTrailing || redirects.length) {
      lines.push("RewriteEngine On", "");
      if (forceHttps) {
        lines.push("# Forzar HTTPS");
        lines.push("RewriteCond %{HTTPS} off");
        lines.push("RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]", "");
      }
      if (forceWww === "without") {
        lines.push("# Quitar www (canonical sin www)");
        lines.push("RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]");
        lines.push("RewriteRule ^(.*)$ https://%1/$1 [L,R=301]", "");
      }
      if (forceWww === "with") {
        lines.push("# Forzar www");
        lines.push("RewriteCond %{HTTP_HOST} !^www\\. [NC]");
        lines.push("RewriteRule ^(.*)$ https://www.%{HTTP_HOST}/$1 [L,R=301]", "");
      }
      if (removeIndex) {
        lines.push("# Remover index.html / index.php de URLs");
        lines.push("RewriteCond %{THE_REQUEST} /index\\.(html|php)\\sHTTP/");
        lines.push("RewriteRule ^(.*)index\\.(html|php)$ /$1 [R=301,L]", "");
      }
      if (removeTrailing) {
        lines.push("# Quitar / final");
        lines.push("RewriteCond %{REQUEST_FILENAME} !-d");
        lines.push("RewriteRule ^(.+)/$ /$1 [R=301,L]", "");
      }
      redirects.filter((r) => r.from.trim() && r.to.trim()).forEach((r) => {
        lines.push(`Redirect ${r.code} ${r.from.trim()} ${r.to.trim()}`);
      });
      if (redirects.length) lines.push("");
    }

    if (block.size > 0) {
      lines.push("# Bloquear archivos sensibles");
      lines.push("<FilesMatch \"^(" + Array.from(block).map((f) => f.replace(/^\./, "\\.")).join("|") + ")\">");
      lines.push("    Require all denied");
      lines.push("</FilesMatch>", "");
    }

    if (hotlinkProtect && hotlinkDomain.trim()) {
      const dom = hotlinkDomain.trim().replace(/[^\w.-]/g, "");
      lines.push("# Anti-hotlinking de imágenes");
      lines.push("RewriteEngine On");
      lines.push("RewriteCond %{HTTP_REFERER} !^$");
      lines.push(`RewriteCond %{HTTP_REFERER} !^https?://(www\\.)?${dom.replace(/\./g, "\\.")} [NC]`);
      lines.push("RewriteRule \\.(jpg|jpeg|png|gif|webp|svg)$ - [F,NC,L]", "");
    }

    if (gzip) {
      lines.push("# Compresión Gzip");
      lines.push("<IfModule mod_deflate.c>");
      lines.push("    AddOutputFilterByType DEFLATE text/html text/css text/javascript text/xml text/plain");
      lines.push("    AddOutputFilterByType DEFLATE application/javascript application/xml application/json");
      lines.push("    AddOutputFilterByType DEFLATE image/svg+xml");
      lines.push("</IfModule>", "");
    }

    if (browserCache) {
      lines.push("# Cache del navegador (mejora Core Web Vitals)");
      lines.push("<IfModule mod_expires.c>");
      lines.push("    ExpiresActive On");
      lines.push("    ExpiresByType image/jpg \"access plus 1 year\"");
      lines.push("    ExpiresByType image/jpeg \"access plus 1 year\"");
      lines.push("    ExpiresByType image/png \"access plus 1 year\"");
      lines.push("    ExpiresByType image/webp \"access plus 1 year\"");
      lines.push("    ExpiresByType image/svg+xml \"access plus 1 year\"");
      lines.push("    ExpiresByType text/css \"access plus 1 month\"");
      lines.push("    ExpiresByType application/javascript \"access plus 1 month\"");
      lines.push("    ExpiresByType text/html \"access plus 1 hour\"");
      lines.push("</IfModule>", "");
    }

    if (customError) {
      lines.push("# Páginas de error custom");
      lines.push("ErrorDocument 404 /404.html");
      lines.push("ErrorDocument 500 /500.html", "");
    }

    return lines.join("\n");
  }, [forceHttps, forceWww, removeIndex, removeTrailing, block, hotlinkProtect, hotlinkDomain, gzip, browserCache, redirects, customError]);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }
  function download() {
    const blob = new Blob([code], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = ".htaccess";
    a.click();
  }

  function addRedirect() { setRedirects((r) => [...r, { from: "/old-page", to: "/new-page", code: 301 }]); }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador .htaccess</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Configura redirects, HTTPS, cache, gzip y seguridad para tu Apache. Toggles visuales, código copiable.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-5">
        <div className="space-y-5">
          <Section title="Redirects HTTPS / WWW" accent={ACCENT}>
            <Toggle label="Forzar HTTPS (redirect 301 desde HTTP)" checked={forceHttps} onChange={setForceHttps} />
            <div className="space-y-1">
              <div className="text-xs font-medium">Versión canónica del dominio</div>
              {([{ v: "without" as const, l: "Sin www (ejemplo.com)" }, { v: "with" as const, l: "Con www (www.ejemplo.com)" }, { v: "none" as const, l: "No forzar" }]).map((o) => (
                <label key={o.v} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" checked={forceWww === o.v} onChange={() => setForceWww(o.v)} className="accent-[oklch(0.55_0.2_50)]" />
                  {o.l}
                </label>
              ))}
            </div>
          </Section>

          <Section title="URLs limpias" accent={ACCENT}>
            <Toggle label="Quitar /index.html y /index.php de URLs" checked={removeIndex} onChange={setRemoveIndex} />
            <Toggle label="Quitar slash final (/)" checked={removeTrailing} onChange={setRemoveTrailing} />
          </Section>

          <Section title="Redirects 301 personalizados" accent={ACCENT}>
            {redirects.map((r, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr_auto_auto] gap-2 items-center">
                <input value={r.from} onChange={(e) => setRedirects((arr) => arr.map((x, idx) => idx === i ? { ...x, from: e.target.value } : x))} placeholder="/old" className="px-2 py-1.5 rounded border border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm font-mono" />
                <input value={r.to} onChange={(e) => setRedirects((arr) => arr.map((x, idx) => idx === i ? { ...x, to: e.target.value } : x))} placeholder="/new" className="px-2 py-1.5 rounded border border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm font-mono" />
                <select value={r.code} onChange={(e) => setRedirects((arr) => arr.map((x, idx) => idx === i ? { ...x, code: +e.target.value as 301 | 302 } : x))} className="px-2 py-1.5 rounded border border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm">
                  <option value={301}>301</option>
                  <option value={302}>302</option>
                </select>
                <button onClick={() => setRedirects((arr) => arr.filter((_, idx) => idx !== i))} className="text-[color:var(--color-danger)]"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            <button onClick={addRedirect} className="text-sm font-semibold inline-flex items-center gap-1" style={{ color: ACCENT }}><Plus className="w-4 h-4" /> Agregar redirect</button>
          </Section>

          <Section title="Performance" accent={ACCENT}>
            <Toggle label="Compresión Gzip" checked={gzip} onChange={setGzip} />
            <Toggle label="Cache del navegador (1 año imágenes)" checked={browserCache} onChange={setBrowserCache} />
          </Section>

          <Section title="Seguridad" accent={ACCENT}>
            <div className="text-xs font-medium mb-1">Bloquear archivos:</div>
            <div className="flex flex-wrap gap-1.5">
              {[".env", ".git", ".svn", ".DS_Store", ".gitignore", "wp-config.php", "config.php", ".htpasswd"].map((f) => (
                <button key={f} onClick={() => toggleBlock(f)} className="text-xs px-2.5 py-1 rounded-md font-medium transition" style={block.has(f) ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>{f}</button>
              ))}
            </div>
            <Toggle label="Anti-hotlinking de imágenes" checked={hotlinkProtect} onChange={setHotlinkProtect} />
            {hotlinkProtect && (
              <input value={hotlinkDomain} onChange={(e) => setHotlinkDomain(e.target.value)} placeholder="ejemplo.com" className="w-full px-3 py-2 rounded border border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm font-mono" />
            )}
          </Section>

          <Section title="Errores custom" accent={ACCENT}>
            <Toggle label="ErrorDocument 404 → /404.html" checked={customError} onChange={setCustomError} />
          </Section>
        </div>

        <div className="lg:sticky lg:top-4 self-start space-y-3">
          <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[color:var(--color-border)] bg-[color:var(--color-bg-soft)]">
              <div className="font-bold inline-flex items-center gap-2"><FileCode2 className="w-4 h-4" style={{ color: ACCENT }} /> .htaccess</div>
              <div className="flex gap-2">
                <button onClick={copy} className="text-sm font-semibold inline-flex items-center gap-1 px-3 py-1 rounded-lg text-white" style={{ background: ACCENT }}>
                  {copied ? <><Check className="w-3.5 h-3.5" /> Copiado</> : <><Copy className="w-3.5 h-3.5" /> Copiar</>}
                </button>
                <button onClick={download} className="text-sm font-semibold px-3 py-1 rounded-lg border border-[color:var(--color-border)] hover:bg-[color:var(--color-bg-soft)]">⬇ Descargar</button>
              </div>
            </div>
            <pre className="text-xs font-mono p-4 overflow-auto max-h-[600px] whitespace-pre-wrap">{code}</pre>
          </div>

          <AdSlot slot="htaccess_inline" format="auto" minHeight={250} />
        </div>
      </div>
    </div>
  );
}

function Section({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5 space-y-3">
      <div className="font-bold text-sm uppercase tracking-wide" style={{ color: accent }}>{title}</div>
      {children}
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <button type="button" onClick={() => onChange(!checked)} className="relative w-10 h-6 rounded-full transition flex-shrink-0" style={{ background: checked ? ACCENT : "var(--color-border)" }}>
        <span className={`absolute top-0.5 ${checked ? "left-[18px]" : "left-0.5"} w-5 h-5 rounded-full bg-white shadow transition-all`} />
      </button>
      <span className="text-sm">{label}</span>
    </label>
  );
}
