import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

function isPrivateHost(hostname: string): boolean {
  const lower = hostname.toLowerCase();
  if (lower === "localhost" || lower.endsWith(".local")) return true;
  const ipv4 = lower.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (ipv4) {
    const a = +ipv4[1], b = +ipv4[2];
    if (a === 10) return true;
    if (a === 127) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 0) return true;
  }
  return false;
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "Falta el parámetro url" }, { status: 400 });
  let target: URL;
  try {
    target = new URL(url.startsWith("http") ? url : `https://${url}`);
  } catch {
    return NextResponse.json({ error: "URL inválida" }, { status: 400 });
  }
  if (target.protocol !== "http:" && target.protocol !== "https:") {
    return NextResponse.json({ error: "Solo HTTP/HTTPS" }, { status: 400 });
  }
  if (isPrivateHost(target.hostname)) {
    return NextResponse.json({ error: "Hostnames internos no permitidos" }, { status: 400 });
  }

  const chain: { url: string; status: number; statusText: string; headers: Record<string, string> }[] = [];
  let current = target.toString();
  let redirects = 0;
  const start = Date.now();

  try {
    while (redirects < 10) {
      const r = await fetch(current, {
        method: "GET",
        redirect: "manual",
        headers: { "User-Agent": "Mozilla/5.0 Toolram/1.0", Accept: "*/*" },
        signal: AbortSignal.timeout(15000)
      });
      const headers: Record<string, string> = {};
      r.headers.forEach((v, k) => { headers[k] = v; });
      chain.push({ url: current, status: r.status, statusText: r.statusText, headers });
      if (r.status >= 300 && r.status < 400 && headers["location"]) {
        current = new URL(headers["location"], current).toString();
        redirects++;
        continue;
      }
      break;
    }
    const time = Date.now() - start;
    return NextResponse.json({ chain, time });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e), chain }, { status: 500 });
  }
}
