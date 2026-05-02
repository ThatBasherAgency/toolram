"use client";
import { useState } from "react";
import { Globe, Search, Calendar, Server, Shield, Building, AlertTriangle, ExternalLink } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.2 220)";

type RdapResult = {
  ldhName?: string;
  status?: string[];
  events?: { eventAction: string; eventDate: string }[];
  entities?: { roles: string[]; vcardArray?: unknown[] }[];
  nameservers?: { ldhName: string }[];
  notices?: { title?: string; description?: string[] }[];
};

function parseDomain(input: string): string {
  let d = input.trim().toLowerCase();
  d = d.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0].split("?")[0];
  return d;
}

function vcardName(vcard: unknown[] | undefined): string {
  if (!vcard || !Array.isArray(vcard) || vcard.length < 2) return "";
  const props = vcard[1] as unknown[];
  if (!Array.isArray(props)) return "";
  for (const prop of props) {
    if (Array.isArray(prop) && prop[0] === "fn" && typeof prop[3] === "string") return prop[3];
  }
  return "";
}

function fmtDate(s?: string): string {
  if (!s) return "—";
  try { return new Date(s).toLocaleDateString("es", { year: "numeric", month: "long", day: "numeric" }); } catch { return s; }
}

function daysFromNow(s?: string): number {
  if (!s) return 0;
  return Math.round((new Date(s).getTime() - Date.now()) / 86400000);
}

export function WhoisDomain() {
  const [input, setInput] = useState("");
  const [data, setData] = useState<RdapResult | null>(null);
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function lookup() {
    const d = parseDomain(input);
    if (!d || !d.includes(".")) { setError("Ingresá un dominio válido (ej: ejemplo.com)"); return; }
    setLoading(true); setError(null); setData(null);
    try {
      const r = await fetch(`https://rdap.org/domain/${d}`);
      if (r.status === 404) throw new Error("Dominio no encontrado o no soportado por RDAP");
      if (!r.ok) throw new Error(`Error ${r.status}: ${r.statusText}`);
      const json = await r.json();
      setData(json);
      setDomain(d);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally { setLoading(false); }
  }

  const registration = data?.events?.find((e) => e.eventAction === "registration")?.eventDate;
  const expiration = data?.events?.find((e) => e.eventAction === "expiration")?.eventDate;
  const lastChanged = data?.events?.find((e) => e.eventAction === "last changed")?.eventDate;
  const ageDays = registration ? Math.floor((Date.now() - new Date(registration).getTime()) / 86400000) : 0;
  const ageYears = (ageDays / 365.25).toFixed(1);
  const expDays = expiration ? daysFromNow(expiration) : 0;
  const registrar = data?.entities?.find((e) => e.roles?.includes("registrar"));

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>WHOIS Lookup</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Consulta gratis quién es dueño de un dominio, cuándo se registró, cuándo expira y sus DNS · vía RDAP oficial</p>
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
        <button
          onClick={lookup}
          disabled={loading}
          className="px-6 md:px-8 py-3 rounded-xl text-white font-bold shadow disabled:opacity-50 enabled:hover:scale-[1.02] transition flex items-center justify-center gap-2"
          style={{ background: ACCENT }}
        >
          {loading ? <><div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> Consultando…</> : <><Search className="w-5 h-5" /> Consultar</>}
        </button>
      </div>

      {error && (
        <div className="rounded-2xl bg-[color:var(--color-danger)]/10 border border-[color:var(--color-danger)]/30 p-4 flex items-start gap-3 mb-6">
          <AlertTriangle className="w-5 h-5 text-[color:var(--color-danger)] flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-sm">No se pudo consultar</div>
            <div className="text-sm text-[color:var(--color-fg-soft)] mt-0.5">{error}</div>
          </div>
        </div>
      )}

      {!data && !error && (
        <div className="space-y-6 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { i: "🌐", t: "Datos oficiales", d: "Vía RDAP, el sucesor moderno de WHOIS" },
              { i: "📅", t: "Edad del dominio", d: "Cuándo se registró, cuándo expira" },
              { i: "🔒", t: "100% privado", d: "Consulta directa desde tu navegador" }
            ].map((b, i) => (
              <div key={i} className="rounded-xl bg-[color:var(--color-bg-soft)] p-5">
                <div className="text-3xl mb-2">{b.i}</div>
                <div className="font-bold mb-1">{b.t}</div>
                <div className="text-sm text-[color:var(--color-fg-soft)]">{b.d}</div>
              </div>
            ))}
          </div>
          <AdSlot slot="whois_intro" format="auto" minHeight={180} />
        </div>
      )}

      {data && (
        <div className="space-y-5">
          <div className="rounded-2xl p-6 md:p-8 text-white shadow-2xl" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 60%, black))` }}>
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-6 h-6" />
              <div className="text-sm opacity-80 uppercase tracking-wide">Dominio consultado</div>
            </div>
            <div className="text-3xl md:text-4xl font-extrabold tracking-tight break-all">{domain}</div>
            {ageYears && <div className="text-sm opacity-90 mt-2">Edad: {ageYears} años · {ageDays} días</div>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card icon={<Calendar className="w-5 h-5" />} label="Fecha de registro" value={fmtDate(registration)} sub={ageDays > 0 ? `${ageDays.toLocaleString()} días atrás` : undefined} />
            <Card icon={<Calendar className="w-5 h-5" />} label="Expira" value={fmtDate(expiration)} sub={expDays !== 0 ? (expDays > 0 ? `En ${expDays.toLocaleString()} días` : `Expiró hace ${Math.abs(expDays)} días`) : undefined} status={expDays < 30 && expDays > 0 ? "warn" : expDays <= 0 && expiration ? "err" : "ok"} />
            <Card icon={<Building className="w-5 h-5" />} label="Registrar" value={vcardName(registrar?.vcardArray) || "—"} />
            <Card icon={<Calendar className="w-5 h-5" />} label="Última modificación" value={fmtDate(lastChanged)} />
          </div>

          {data.status && data.status.length > 0 && (
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5">
              <div className="flex items-center gap-2 mb-3"><Shield className="w-5 h-5" style={{ color: ACCENT }} /><div className="font-bold">Estado del dominio</div></div>
              <div className="flex flex-wrap gap-2">
                {data.status.map((s, i) => (
                  <span key={i} className="text-xs font-medium px-2 py-1 rounded-md bg-[color:var(--color-bg-soft)] border border-[color:var(--color-border)]">{s}</span>
                ))}
              </div>
            </div>
          )}

          {data.nameservers && data.nameservers.length > 0 && (
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5">
              <div className="flex items-center gap-2 mb-3"><Server className="w-5 h-5" style={{ color: ACCENT }} /><div className="font-bold">Servidores DNS</div></div>
              <ul className="space-y-1.5">
                {data.nameservers.map((ns, i) => (
                  <li key={i} className="text-sm font-mono px-3 py-2 rounded-lg bg-[color:var(--color-bg-soft)]">{ns.ldhName?.toLowerCase()}</li>
                ))}
              </ul>
            </div>
          )}

          <AdSlot slot="whois_results" format="auto" minHeight={250} className="my-8" />

          <div className="rounded-2xl p-6 bg-[color:var(--color-bg-soft)] text-center">
            <div className="font-bold mb-2">Más herramientas de dominio</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
              {[
                { slug: "dns-lookup", name: "DNS Lookup", emoji: "🔎" },
                { slug: "ssl-checker", name: "SSL Checker", emoji: "🔒" },
                { slug: "headers-checker", name: "HTTP Headers", emoji: "📡" },
                { slug: "seo-quick-audit", name: "SEO Quick Audit", emoji: "📊" },
                { slug: "analizador-meta", name: "Meta Tags", emoji: "🏷️" },
                { slug: "previsualizador-serp", name: "SERP Preview", emoji: "👀" }
              ].map((t) => (
                <a key={t.slug} href={`/${t.slug}`} className="rounded-lg p-3 bg-[color:var(--color-bg)] hover:shadow-md transition flex items-center gap-2 text-left">
                  <span className="text-xl">{t.emoji}</span>
                  <span className="text-sm font-semibold">{t.name}</span>
                  <ExternalLink className="w-3 h-3 ml-auto text-[color:var(--color-fg-soft)]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Card({ icon, label, value, sub, status }: { icon: React.ReactNode; label: string; value: string; sub?: string; status?: "ok" | "warn" | "err" }) {
  const color = status === "warn" ? "var(--color-warning)" : status === "err" ? "var(--color-danger)" : undefined;
  return (
    <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4">
      <div className="flex items-center gap-2 text-xs font-bold uppercase text-[color:var(--color-fg-soft)] mb-2">{icon} {label}</div>
      <div className="text-base font-bold break-words" style={color ? { color } : undefined}>{value}</div>
      {sub && <div className="text-xs text-[color:var(--color-fg-soft)] mt-0.5" style={color ? { color } : undefined}>{sub}</div>}
    </div>
  );
}
