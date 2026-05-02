"use client";
import { useEffect, useState } from "react";
import { Globe, Copy, Check, MapPin, Server, Wifi, Shield } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.2 260)";

type IpInfo = {
  ip: string;
  version?: string;
  country_name?: string;
  country_code?: string;
  region?: string;
  city?: string;
  postal?: string;
  latitude?: number;
  longitude?: number;
  org?: string;
  asn?: string;
  timezone?: string;
  utc_offset?: string;
};

export function MyIp() {
  const [data, setData] = useState<IpInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [userAgent, setUserAgent] = useState("");

  useEffect(() => {
    setUserAgent(navigator.userAgent);
    (async () => {
      try {
        const r = await fetch("https://ipapi.co/json/");
        if (!r.ok) throw new Error(`Error ${r.status}`);
        const json = await r.json();
        if (json.error) throw new Error(json.reason || "Error de servicio");
        setData(json);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    })();
  }, []);

  async function copy(k: string, v: string) {
    await navigator.clipboard.writeText(v);
    setCopied(k);
    setTimeout(() => setCopied(null), 1200);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>¿Cuál es mi IP?</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Tu dirección IP pública, ubicación aproximada, ISP, navegador y zona horaria.</p>
      </div>

      {!data && !error && (
        <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-12 text-center">
          <div className="w-12 h-12 rounded-full border-4 border-[color:var(--color-brand)] border-t-transparent animate-spin mx-auto" />
          <p className="text-sm mt-4 text-[color:var(--color-fg-soft)]">Detectando tu IP…</p>
        </div>
      )}

      {error && (
        <div className="rounded-2xl bg-[color:var(--color-danger)]/10 border border-[color:var(--color-danger)]/30 p-4 text-sm">⚠️ {error}</div>
      )}

      {data && (
        <>
          <div className="rounded-3xl p-8 md:p-10 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 60%, black))` }}>
            <div className="text-xs uppercase opacity-80 tracking-widest mb-2">Tu dirección IP {data.version || "v4"}</div>
            <div className="text-4xl md:text-6xl font-extrabold tabular-nums tracking-tight break-all">{data.ip}</div>
            <button onClick={() => copy("ip", data.ip)} className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur text-sm font-bold transition">
              {copied === "ip" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied === "ip" ? "Copiado" : "Copiar IP"}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-3 mb-6">
            <Card icon={<MapPin className="w-5 h-5" />} label="Ubicación" value={[data.city, data.region, data.country_name].filter(Boolean).join(", ") || "—"} sub={data.postal ? `CP: ${data.postal}` : undefined} accent={ACCENT} />
            <Card icon={<Globe className="w-5 h-5" />} label="País" value={data.country_name || "—"} sub={data.country_code} accent={ACCENT} />
            <Card icon={<Server className="w-5 h-5" />} label="ISP / Organización" value={data.org || "—"} sub={data.asn} accent={ACCENT} />
            <Card icon={<Wifi className="w-5 h-5" />} label="Zona horaria" value={data.timezone || "—"} sub={data.utc_offset ? `UTC ${data.utc_offset}` : undefined} accent={ACCENT} />
          </div>

          {data.latitude && data.longitude && (
            <div className="rounded-2xl border border-[color:var(--color-border)] overflow-hidden mb-6">
              <iframe
                title="Ubicación aproximada"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${data.longitude - 0.05},${data.latitude - 0.05},${data.longitude + 0.05},${data.latitude + 0.05}&layer=mapnik&marker=${data.latitude},${data.longitude}`}
                className="w-full h-64 border-0"
                loading="lazy"
              />
              <div className="px-4 py-2 bg-[color:var(--color-bg-soft)] text-xs text-[color:var(--color-fg-soft)]">
                Lat {data.latitude.toFixed(4)} · Lon {data.longitude.toFixed(4)} · ubicación aproximada (precisión ciudad/provincia)
              </div>
            </div>
          )}

          <AdSlot slot="myip_results" format="auto" minHeight={180} className="mb-6" />

          <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5 mb-6">
            <div className="flex items-center gap-2 mb-3"><Shield className="w-4 h-4" style={{ color: ACCENT }} /><div className="font-bold">Tu navegador</div></div>
            <code className="block text-xs font-mono break-all p-3 rounded-lg bg-[color:var(--color-bg-soft)]">{userAgent}</code>
            <button onClick={() => copy("ua", userAgent)} className="mt-2 text-xs font-semibold inline-flex items-center gap-1" style={{ color: ACCENT }}>
              {copied === "ua" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              Copiar User-Agent
            </button>
          </div>

          <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
            <strong className="text-[color:var(--color-fg)] block mb-2">¿Qué es una dirección IP pública?</strong>
            Es el identificador único que tu proveedor de internet (ISP) asigna a tu conexión. Cualquier sitio web que visitás puede verla. La precisión geográfica es aproximada (a nivel ciudad/provincia, no calle), basada en bases de datos públicas de bloques IP por región.
          </div>
        </>
      )}
    </div>
  );
}

function Card({ icon, label, value, sub, accent }: { icon: React.ReactNode; label: string; value: string; sub?: string; accent: string }) {
  return (
    <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4">
      <div className="flex items-center gap-2 text-xs font-bold uppercase text-[color:var(--color-fg-soft)] mb-2"><span style={{ color: accent }}>{icon}</span> {label}</div>
      <div className="text-base font-bold break-words">{value}</div>
      {sub && <div className="text-xs text-[color:var(--color-fg-soft)] mt-0.5">{sub}</div>}
    </div>
  );
}
