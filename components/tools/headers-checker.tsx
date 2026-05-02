"use client";
import { useState } from "react";
import { Globe, Search, AlertTriangle, ArrowRight, Shield, Clock, Copy, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.2 165)";

type Hop = { url: string; status: number; statusText: string; headers: Record<string, string> };

const SECURITY_HEADERS = [
  { key: "strict-transport-security", name: "HSTS", desc: "Fuerza HTTPS" },
  { key: "content-security-policy", name: "CSP", desc: "Política de contenido" },
  { key: "x-content-type-options", name: "X-Content-Type-Options", desc: "Bloquea MIME sniffing" },
  { key: "x-frame-options", name: "X-Frame-Options", desc: "Anti-clickjacking" },
  { key: "referrer-policy", name: "Referrer-Policy", desc: "Control de referer" },
  { key: "permissions-policy", name: "Permissions-Policy", desc: "Permisos del navegador" }
];

export function HeadersChecker() {
  const [input, setInput] = useState("");
  const [data, setData] = useState<{ chain: Hop[]; time: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  async function check() {
    if (!input.trim()) return;
    setLoading(true); setError(null); setData(null);
    try {
      const r = await fetch(`/api/headers?url=${encodeURIComponent(input.trim())}`);
      const json = await r.json();
      if (!r.ok) throw new Error(json.error || "Error de servidor");
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally { setLoading(false); }
  }

  async function copyJson() {
    if (!data) return;
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopiedKey("json");
    setTimeout(() => setCopiedKey(null), 1200);
  }

  const final = data?.chain[data.chain.length - 1];
  const securityScore = final
    ? SECURITY_HEADERS.filter((h) => final.headers[h.key]).length
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>HTTP Headers Checker</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Inspecciona headers HTTP, redirects y headers de seguridad de cualquier URL.</p>
      </div>

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-2 md:p-3 mb-6 flex flex-col md:flex-row gap-2 shadow-sm">
        <div className="flex items-center gap-2 px-3 py-2 flex-1 min-w-0">
          <Globe className="w-5 h-5 text-[color:var(--color-fg-soft)] flex-shrink-0" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && check()}
            placeholder="https://ejemplo.com"
            className="flex-1 bg-transparent text-base md:text-lg outline-none min-w-0"
            autoFocus
          />
        </div>
        <button onClick={check} disabled={loading} className="px-6 md:px-8 py-3 rounded-xl text-white font-bold shadow disabled:opacity-50 enabled:hover:scale-[1.02] transition flex items-center justify-center gap-2" style={{ background: ACCENT }}>
          {loading ? <><div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> Consultando…</> : <><Search className="w-5 h-5" /> Inspeccionar</>}
        </button>
      </div>

      {error && (
        <div className="rounded-2xl bg-[color:var(--color-danger)]/10 border border-[color:var(--color-danger)]/30 p-4 flex items-start gap-3 mb-6">
          <AlertTriangle className="w-5 h-5 text-[color:var(--color-danger)] flex-shrink-0 mt-0.5" />
          <div className="text-sm">{error}</div>
        </div>
      )}

      {!data && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-6">
            {[
              { i: "🔁", t: "Cadena de redirects", d: "Cada paso 301/302/307 con status" },
              { i: "🛡️", t: "Headers de seguridad", d: "HSTS, CSP, X-Frame, Referrer Policy" },
              { i: "📡", t: "Server response", d: "Status, server, content-type, cache" }
            ].map((b, i) => (
              <div key={i} className="rounded-xl bg-[color:var(--color-bg-soft)] p-5">
                <div className="text-3xl mb-2">{b.i}</div>
                <div className="font-bold mb-1">{b.t}</div>
                <div className="text-sm text-[color:var(--color-fg-soft)]">{b.d}</div>
              </div>
            ))}
          </div>
          <AdSlot slot="headers_intro" format="auto" minHeight={180} />
        </>
      )}

      {data && final && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
            <div className="rounded-2xl p-5 text-white shadow-xl" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 60%, black))` }}>
              <div className="text-xs uppercase opacity-80 mb-1">Status final</div>
              <div className="text-3xl font-extrabold">{final.status}</div>
              <div className="text-xs opacity-80 mt-1">{final.statusText}</div>
            </div>
            <div className="rounded-2xl p-5 bg-[color:var(--color-bg-soft)] border border-[color:var(--color-border)]">
              <div className="flex items-center gap-2 text-xs uppercase text-[color:var(--color-fg-soft)] mb-1"><ArrowRight className="w-3.5 h-3.5" /> Redirects</div>
              <div className="text-3xl font-extrabold">{data.chain.length - 1}</div>
              <div className="text-xs text-[color:var(--color-fg-soft)] mt-1">{data.chain.length === 1 ? "Sin redirects" : "Cadena de saltos"}</div>
            </div>
            <div className="rounded-2xl p-5 bg-[color:var(--color-bg-soft)] border border-[color:var(--color-border)]">
              <div className="flex items-center gap-2 text-xs uppercase text-[color:var(--color-fg-soft)] mb-1"><Clock className="w-3.5 h-3.5" /> Latencia</div>
              <div className="text-3xl font-extrabold">{data.time}<span className="text-base">ms</span></div>
              <div className="text-xs text-[color:var(--color-fg-soft)] mt-1">Tiempo total</div>
            </div>
          </div>

          {data.chain.length > 1 && (
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4 mb-5">
              <div className="font-bold mb-3 flex items-center gap-2"><ArrowRight className="w-4 h-4" style={{ color: ACCENT }} /> Cadena de redirects</div>
              <ol className="space-y-2">
                {data.chain.map((h, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0" style={{ background: ACCENT }}>{i + 1}</span>
                    <span className={`px-2 py-0.5 rounded font-mono text-xs ${h.status >= 200 && h.status < 300 ? "bg-[color:var(--color-success)]/20 text-[color:var(--color-success)]" : h.status >= 300 && h.status < 400 ? "bg-[color:var(--color-warning)]/20 text-[color:var(--color-warning)]" : "bg-[color:var(--color-danger)]/20 text-[color:var(--color-danger)]"}`}>{h.status}</span>
                    <code className="text-xs font-mono break-all flex-1">{h.url}</code>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5 mb-5">
            <div className="flex items-center justify-between mb-3">
              <div className="font-bold flex items-center gap-2"><Shield className="w-4 h-4" style={{ color: ACCENT }} /> Headers de seguridad ({securityScore}/{SECURITY_HEADERS.length})</div>
            </div>
            <div className="grid md:grid-cols-2 gap-2">
              {SECURITY_HEADERS.map((h) => {
                const present = !!final.headers[h.key];
                return (
                  <div key={h.key} className={`rounded-lg border p-3 ${present ? "border-[color:var(--color-success)]/40 bg-[color:var(--color-success)]/5" : "border-[color:var(--color-danger)]/30 bg-[color:var(--color-danger)]/5"}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs ${present ? "bg-[color:var(--color-success)]" : "bg-[color:var(--color-danger)]"}`}>{present ? "✓" : "✗"}</span>
                      <span className="font-bold text-sm">{h.name}</span>
                    </div>
                    <div className="text-xs text-[color:var(--color-fg-soft)] mb-1">{h.desc}</div>
                    {present && <code className="text-[10px] font-mono break-all text-[color:var(--color-fg-soft)] block mt-1">{final.headers[h.key]}</code>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5 mb-5">
            <div className="flex items-center justify-between mb-3">
              <div className="font-bold">Todos los response headers</div>
              <button onClick={copyJson} className="text-sm font-medium inline-flex items-center gap-1 hover:text-[color:var(--color-brand)]">
                {copiedKey === "json" ? <><Check className="w-4 h-4" /> Copiado</> : <><Copy className="w-4 h-4" /> Copiar JSON</>}
              </button>
            </div>
            <div className="overflow-x-auto rounded-lg bg-[color:var(--color-bg-soft)]">
              <table className="w-full text-xs font-mono">
                <tbody>
                  {Object.entries(final.headers).map(([k, v]) => (
                    <tr key={k} className="border-b border-[color:var(--color-border)] last:border-0">
                      <td className="px-3 py-2 font-bold align-top whitespace-nowrap" style={{ color: ACCENT }}>{k}</td>
                      <td className="px-3 py-2 break-all">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <AdSlot slot="headers_results" format="auto" minHeight={250} className="my-8" />
        </>
      )}
    </div>
  );
}
