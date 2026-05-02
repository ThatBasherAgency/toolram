import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

function isPrivateHost(hostname: string): boolean {
  const lower = hostname.toLowerCase();
  if (lower === "localhost" || lower.endsWith(".local")) return true;
  const ipv4 = lower.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (ipv4) {
    const a = +ipv4[1], b = +ipv4[2];
    if (a === 10 || a === 127 || a === 0) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
  }
  return false;
}

function extract(html: string, regex: RegExp): string {
  const m = html.match(regex);
  return m ? (m[1] || "").trim() : "";
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "Falta el parámetro url" }, { status: 400 });
  let target: URL;
  try { target = new URL(url.startsWith("http") ? url : `https://${url}`); }
  catch { return NextResponse.json({ error: "URL inválida" }, { status: 400 }); }
  if (target.protocol !== "http:" && target.protocol !== "https:") return NextResponse.json({ error: "Solo HTTP/HTTPS" }, { status: 400 });
  if (isPrivateHost(target.hostname)) return NextResponse.json({ error: "Hostnames internos no permitidos" }, { status: 400 });

  const start = Date.now();
  try {
    const r = await fetch(target.toString(), {
      method: "GET",
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Toolram-Audit/1.0)", Accept: "text/html,*/*" },
      signal: AbortSignal.timeout(15000),
      redirect: "follow"
    });
    const time = Date.now() - start;
    const headers: Record<string, string> = {};
    r.headers.forEach((v, k) => { headers[k] = v; });
    const html = await r.text();
    const sizeBytes = new Blob([html]).size;

    // Extraction (case-insensitive)
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim().replace(/\s+/g, " ") : "";
    const description = extract(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) || extract(html, /<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i);
    const canonical = extract(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
    const robots = extract(html, /<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i);
    const viewport = extract(html, /<meta\s+name=["']viewport["']\s+content=["']([^"']*)["']/i);
    const ogTitle = extract(html, /<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i);
    const ogImage = extract(html, /<meta\s+property=["']og:image["']\s+content=["']([^"']*)["']/i);
    const ogDescription = extract(html, /<meta\s+property=["']og:description["']\s+content=["']([^"']*)["']/i);
    const twCard = extract(html, /<meta\s+name=["']twitter:card["']\s+content=["']([^"']*)["']/i);
    const lang = extract(html, /<html[^>]*\slang=["']([^"']*)["']/i);

    const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
    const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)];
    const h1s = h1Matches.map((m) => m[1].replace(/<[^>]*>/g, "").trim()).filter(Boolean);
    const h2Count = h2Matches.length;

    const imgs = [...html.matchAll(/<img[^>]*>/gi)];
    const imgsNoAlt = imgs.filter((m) => !/\salt=["'][^"']*["']/i.test(m[0])).length;

    const links = [...html.matchAll(/<a[^>]*href=["']([^"']*)["'][^>]*>/gi)].map((m) => m[1]);
    const internal = links.filter((h) => h.startsWith("/") || h.startsWith("#") || h.startsWith("?") || h.startsWith(target.origin)).length;
    const external = links.length - internal;

    const schemaScripts = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    const schemas: string[] = [];
    schemaScripts.forEach((m) => {
      try {
        const obj = JSON.parse(m[1].trim());
        if (Array.isArray(obj)) obj.forEach((o) => o["@type"] && schemas.push(String(o["@type"])));
        else if (obj["@type"]) schemas.push(String(obj["@type"]));
      } catch { /* ignore */ }
    });

    const isHttps = target.protocol === "https:";
    const hasHsts = !!headers["strict-transport-security"];
    const hasCsp = !!headers["content-security-policy"];

    return NextResponse.json({
      url: r.url,
      finalUrl: r.url,
      status: r.status,
      time,
      sizeBytes,
      lang,
      title,
      description,
      canonical,
      robots,
      viewport,
      og: { title: ogTitle, description: ogDescription, image: ogImage },
      twitter: { card: twCard },
      headings: { h1: h1s, h2Count },
      images: { total: imgs.length, withoutAlt: imgsNoAlt },
      links: { total: links.length, internal, external },
      schemas,
      security: {
        https: isHttps,
        hsts: hasHsts,
        csp: hasCsp,
        contentType: headers["content-type"] || "",
        server: headers["server"] || ""
      }
    });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
