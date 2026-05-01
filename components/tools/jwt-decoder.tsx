"use client";
import { useMemo, useState } from "react";

function b64urlDecode(s: string) {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const std = (s + pad).replace(/-/g, "+").replace(/_/g, "/");
  try {
    const text = atob(std);
    return decodeURIComponent(escape(text));
  } catch {
    return null;
  }
}

export function JwtDecoder() {
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");

  const parsed = useMemo(() => {
    const parts = token.split(".");
    if (parts.length !== 3) return { error: "Un JWT debe tener 3 partes separadas por punto" };
    const [h, p] = parts;
    const headerStr = b64urlDecode(h);
    const payloadStr = b64urlDecode(p);
    if (!headerStr || !payloadStr) return { error: "Base64 inválido en header o payload" };
    try {
      const header = JSON.parse(headerStr);
      const payload = JSON.parse(payloadStr);
      const exp = payload.exp ? new Date(payload.exp * 1000) : null;
      const iat = payload.iat ? new Date(payload.iat * 1000) : null;
      const expired = exp ? exp.getTime() < Date.now() : null;
      return { header, payload, exp, iat, expired };
    } catch {
      return { error: "JSON inválido tras decodificar Base64" };
    }
  }, [token]);

  return (
    <div className="space-y-4">
      <div className="card !p-3 text-xs">🔒 Decodificación local. No verificamos firma — para eso necesitás la clave secreta del servidor.</div>
      <textarea className="input font-mono text-xs" rows={4} value={token} onChange={(e) => setToken(e.target.value.trim())} placeholder="Pegá tu JWT aquí…" />
      {"error" in parsed && parsed.error ? (
        <div className="card !p-3 text-sm text-[color:var(--color-danger)]">⚠️ {parsed.error}</div>
      ) : "header" in parsed && parsed.header ? (
        <div className="space-y-3">
          <div className="card !p-3">
            <div className="text-xs uppercase text-[color:var(--color-fg-soft)] mb-1">Header</div>
            <pre className="text-xs font-mono whitespace-pre-wrap">{JSON.stringify(parsed.header, null, 2)}</pre>
          </div>
          <div className="card !p-3">
            <div className="text-xs uppercase text-[color:var(--color-fg-soft)] mb-1">Payload</div>
            <pre className="text-xs font-mono whitespace-pre-wrap">{JSON.stringify(parsed.payload, null, 2)}</pre>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {parsed.iat && <div className="card !p-3"><div className="text-xs uppercase text-[color:var(--color-fg-soft)]">Emitido (iat)</div><div>{parsed.iat.toLocaleString("es-MX")}</div></div>}
            {parsed.exp && <div className={`card !p-3 ${parsed.expired ? "border-[color:var(--color-danger)]" : ""}`}><div className="text-xs uppercase text-[color:var(--color-fg-soft)]">Expira (exp)</div><div>{parsed.exp.toLocaleString("es-MX")} {parsed.expired ? "⚠️ Expirado" : "✓ Vigente"}</div></div>}
          </div>
        </div>
      ) : null}
    </div>
  );
}
