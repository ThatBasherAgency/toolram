"use client";
import { useState } from "react";
import { Globe, Search, Server, AlertTriangle, Copy, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.2 200)";

const TYPES = [
  { id: "A", desc: "Dirección IPv4" },
  { id: "AAAA", desc: "Dirección IPv6" },
  { id: "CNAME", desc: "Alias canónico" },
  { id: "MX", desc: "Servidores de correo" },
  { id: "TXT", desc: "Texto (SPF, DKIM, verificaciones)" },
  { id: "NS", desc: "Servidores DNS" },
  { id: "SOA", desc: "Autoridad" },
  { id: "CAA", desc: "Autoridad de certificación" }
] as const;

type DohAnswer = { name: string; type: number; TTL: number; data: string };
type DohResponse = { Status: number; Answer?: DohAnswer[] };

const TYPE_NAMES: Record<number, string> = { 1: "A", 28: "AAAA", 5: "CNAME", 15: "MX", 16: "TXT", 2: "NS", 6: "SOA", 257: "CAA" };

function parseDomain(input: string): string {
  let d = input.trim().toLowerCase();
  d = d.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0].split("?")[0];
  return d;
}

export function DnsLookup() {
  const [input, setInput] = useState("");
  const [domain, setDomain] = useState("");
  const [results, setResults] = useState<Record<string, DohAnswer[] | string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  async function lookup() {
    const d = parseDomain(input);
    if (!d || !d.includes(".")) { setError("Ingresá un dominio válido (ej: ejemplo.com)"); return; }
    setLoading(true); setError(null); setResults({});
    setDomain(d);
    try {
      const out: Record<string, DohAnswer[] | string> = {};
      await Promise.all(TYPES.map(async ({ id }) => {
        try {
          const r = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(d)}&type=${id}`);
          const json: DohResponse = await r.json();
          out[id] = json.Answer || (json.Status === 0 ? [] : "Sin registros");
        } catch {
          out[id] = "Error";
        }
      }));
      setResults(out);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally { setLoading(false); }
  }

  async function copy(k: string, v: string) {
    await navigator.clipboard.writeText(v);
    setCopiedKey(k);
    setTimeout(() => setCopiedKey(null), 1200);
  }

  const hasResults = Object.keys(results).length > 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>DNS Lookup</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Consulta registros DNS de cualquier dominio: A, AAAA, MX, TXT, NS, CNAME, SOA, CAA. Vía Google DNS-over-HTTPS.</p>
      </div>

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-2 md:p-3 mb-6 flex flex-col md:flex-row gap-2 shadow-sm">
        <div className="flex items-center gap-2 px-3 py-2 flex-1 min-w-0">
          <Globe className="w-5 h-5 text-[color:var(--color-fg-soft)] flex-shrink-0" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && lookup()}
            placeholder="ejemplo.com"
            className="flex-1 bg-transparent text-base md:text-lg outline-none min-w-0"
            autoFocus
          />
        </div>
        <button onClick={lookup} disabled={loading} className="px-6 md:px-8 py-3 rounded-xl text-white font-bold shadow disabled:opacity-50 enabled:hover:scale-[1.02] transition flex items-center justify-center gap-2" style={{ background: ACCENT }}>
          {loading ? <><div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> Consultando…</> : <><Search className="w-5 h-5" /> Consultar DNS</>}
        </button>
      </div>

      {error && (
        <div className="rounded-2xl bg-[color:var(--color-danger)]/10 border border-[color:var(--color-danger)]/30 p-4 flex items-start gap-3 mb-6">
          <AlertTriangle className="w-5 h-5 text-[color:var(--color-danger)] flex-shrink-0 mt-0.5" />
          <div className="text-sm">{error}</div>
        </div>
      )}

      {!hasResults && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-6">
            {[
              { i: "🔎", t: "8 tipos de registros", d: "A, AAAA, CNAME, MX, TXT, NS, SOA, CAA" },
              { i: "⚡", t: "Vía Google DNS", d: "Servidor 8.8.8.8 con DoH (DNS over HTTPS)" },
              { i: "🔒", t: "100% privado", d: "Consulta directa desde tu navegador" }
            ].map((b, i) => (
              <div key={i} className="rounded-xl bg-[color:var(--color-bg-soft)] p-5">
                <div className="text-3xl mb-2">{b.i}</div>
                <div className="font-bold mb-1">{b.t}</div>
                <div className="text-sm text-[color:var(--color-fg-soft)]">{b.d}</div>
              </div>
            ))}
          </div>
          <AdSlot slot="dns_intro" format="auto" minHeight={180} />
        </>
      )}

      {hasResults && (
        <>
          <div className="rounded-2xl p-5 text-white shadow-xl mb-5" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 60%, black))` }}>
            <div className="flex items-center gap-2 mb-1"><Server className="w-5 h-5" /><div className="text-xs uppercase opacity-80">Resultado para</div></div>
            <div className="text-2xl md:text-3xl font-extrabold tracking-tight break-all">{domain}</div>
          </div>

          <div className="space-y-3">
            {TYPES.map(({ id, desc }) => {
              const v = results[id];
              const arr = Array.isArray(v) ? v : [];
              const isString = typeof v === "string";
              return (
                <div key={id} className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[color:var(--color-border)] bg-[color:var(--color-bg-soft)]">
                    <div>
                      <span className="font-bold text-base mr-2" style={{ color: ACCENT }}>{id}</span>
                      <span className="text-xs text-[color:var(--color-fg-soft)]">{desc}</span>
                    </div>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-[color:var(--color-bg)] border border-[color:var(--color-border)]">
                      {isString ? "—" : `${arr.length} ${arr.length === 1 ? "registro" : "registros"}`}
                    </span>
                  </div>
                  <div className="p-4">
                    {isString ? (
                      <div className="text-sm text-[color:var(--color-fg-soft)] italic">{v}</div>
                    ) : arr.length === 0 ? (
                      <div className="text-sm text-[color:var(--color-fg-soft)] italic">Sin registros</div>
                    ) : (
                      <ul className="space-y-1.5">
                        {arr.map((a, i) => {
                          const k = `${id}-${i}`;
                          return (
                            <li key={i} className="flex items-center gap-2 group">
                              <code className="flex-1 text-sm font-mono px-3 py-2 rounded-lg bg-[color:var(--color-bg-soft)] break-all">{a.data}</code>
                              <span className="text-xs text-[color:var(--color-fg-soft)] tabular-nums whitespace-nowrap">TTL {a.TTL}s</span>
                              <button onClick={() => copy(k, a.data)} className="w-8 h-8 rounded-lg hover:bg-[color:var(--color-bg-soft)] flex items-center justify-center" aria-label="Copiar">
                                {copiedKey === k ? <Check className="w-4 h-4 text-[color:var(--color-success)]" /> : <Copy className="w-4 h-4 text-[color:var(--color-fg-soft)]" />}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <AdSlot slot="dns_results" format="auto" minHeight={250} className="my-8" />
        </>
      )}
    </div>
  );
}
