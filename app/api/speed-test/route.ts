export const runtime = "edge";

function isPrivateHost(host: string): boolean {
  if (!host) return true;
  const lower = host.toLowerCase();
  if (lower === "localhost" || lower.endsWith(".local") || lower.endsWith(".localhost")) return true;
  const ipMatch = host.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (ipMatch) {
    const [a, b] = [+ipMatch[1], +ipMatch[2]];
    if (a === 10 || a === 127 || (a === 192 && b === 168) || (a === 172 && b >= 16 && b <= 31) || a === 0 || a >= 224) return true;
  }
  return false;
}

export async function GET(req: Request) {
  const url = new URL(req.url).searchParams.get("url") || "";
  let target: URL;
  try {
    target = new URL(url.startsWith("http") ? url : "https://" + url);
  } catch {
    return Response.json({ error: "URL inválida" }, { status: 400 });
  }
  if (!["http:", "https:"].includes(target.protocol)) {
    return Response.json({ error: "Solo HTTP/HTTPS" }, { status: 400 });
  }
  if (isPrivateHost(target.hostname)) {
    return Response.json({ error: "Host privado no permitido" }, { status: 400 });
  }

  const start = Date.now();
  let ttfb = 0;
  try {
    const r = await fetch(target.toString(), {
      signal: AbortSignal.timeout(15000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; ToolramSpeedBot/1.0)" }
    });
    ttfb = Date.now() - start;
    const body = await r.text();
    const total = Date.now() - start;
    return Response.json({
      url: target.toString(),
      ttfb,
      total,
      status: r.status,
      size: body.length
    });
  } catch (e: unknown) {
    return Response.json({ error: e instanceof Error ? e.message : "Error" }, { status: 500 });
  }
}
