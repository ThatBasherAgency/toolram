/**
 * Avisa a IndexNow (Bing, Yandex y socios) después de cada build de producción.
 *
 * POR QUÉ EXISTE (16-ago-2026):
 * `lib/indexnow.ts` llevaba meses en el repo con un `submitToIndexNow()` que
 * NO LLAMABA NADIE. El sitio publicaba herramientas y contenido y ningún
 * buscador se enteraba hasta que pasaba a rastrear por su cuenta.
 *
 * Y aquí eso no es un detalle: en toolram.com **Bing es la fuente real de
 * tráfico** — 31 clics y 4.069 impresiones en 30 días, frente a 6 clics de
 * Google. IndexNow no tiene cuota y es justo el canal de Bing.
 *
 * Reglas de la casa:
 *  · NUNCA tumba el build. Pase lo que pase, sale con 0.
 *  · Solo en producción: un preview de Vercel no debe avisar a nadie.
 *  · Lee el sitemap YA PUBLICADO. Durante el build el nuevo aún no está en
 *    vivo, y no pasa nada: el ping le dice a Bing «vuelve», y cuando vuelva
 *    ya estará la versión nueva.
 */

const KEY = "toolram2026key9x4qb7m";           // debe existir /public/{KEY}.txt
const HOST = "toolram.com";
const SITEMAP = `https://${HOST}/sitemap.xml`;
const ENDPOINTS = [
  "https://api.indexnow.org/IndexNow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow"
];

const salir = (msg) => { console.log(`[indexnow] ${msg}`); process.exit(0); };

// Vercel expone VERCEL_ENV; en local no hay nada que avisar.
const entorno = process.env.VERCEL_ENV || "local";
if (entorno !== "production") salir(`entorno «${entorno}»: no se avisa a nadie`);

try {
  const res = await fetch(SITEMAP, { headers: { "User-Agent": "toolram-indexnow/1.0" } });
  if (!res.ok) salir(`no se pudo leer el sitemap (HTTP ${res.status})`);
  const xml = await res.text();

  const urls = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()))];
  if (urls.length === 0) salir("el sitemap no traía URLs");

  const body = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls
  });

  for (const ep of ENDPOINTS) {
    try {
      const r = await fetch(ep, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body
      });
      console.log(`[indexnow] ${new URL(ep).host}: HTTP ${r.status} (${urls.length} URLs)`);
    } catch (e) {
      console.log(`[indexnow] ${new URL(ep).host}: falló — ${String(e).slice(0, 80)}`);
    }
  }
} catch (e) {
  console.log(`[indexnow] no se pudo avisar: ${String(e).slice(0, 120)}`);
}

process.exit(0);
