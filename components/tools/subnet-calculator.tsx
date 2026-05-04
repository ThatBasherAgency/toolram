"use client";
import { useMemo, useState } from "react";
import { Network } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 200)";

function ipToInt(ip: string): number | null {
  const p = ip.split(".").map(Number);
  if (p.length !== 4 || p.some((n) => isNaN(n) || n < 0 || n > 255)) return null;
  return ((p[0] << 24) | (p[1] << 16) | (p[2] << 8) | p[3]) >>> 0;
}
function intToIp(n: number): string {
  return [(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff].join(".");
}

export function SubnetCalculator() {
  const [ip, setIp] = useState("192.168.1.0");
  const [cidr, setCidr] = useState(24);

  const result = useMemo(() => {
    const ipNum = ipToInt(ip);
    if (ipNum === null) return null;
    const mask = cidr === 0 ? 0 : (0xffffffff << (32 - cidr)) >>> 0;
    const network = ipNum & mask;
    const broadcast = network | (~mask >>> 0);
    const total = Math.pow(2, 32 - cidr);
    const usable = Math.max(0, total - 2);
    return {
      network: intToIp(network),
      broadcast: intToIp(broadcast),
      mask: intToIp(mask),
      first: total > 2 ? intToIp(network + 1) : "—",
      last: total > 2 ? intToIp(broadcast - 1) : "—",
      total, usable,
      wildcard: intToIp((~mask) >>> 0),
      cidrFull: `${ip}/${cidr}`
    };
  }, [ip, cidr]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Calculadora de Subred CIDR</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Subneteo IPv4 · Network, broadcast, máscara, hosts disponibles · Para administradores de red.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 mb-6 grid md:grid-cols-2 gap-3">
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Dirección IP</span>
          <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-lg font-mono tabular-nums" value={ip} onChange={(e) => setIp(e.target.value)} /></label>
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Prefix CIDR: /{cidr}</span>
          <input type="range" min="1" max="32" value={cidr} onChange={(e) => setCidr(+e.target.value)} className="w-full mt-2" /></label>
      </div>

      {result && (
        <>
          <div className="rounded-3xl p-6 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
            <div className="text-xs uppercase opacity-80 tracking-widest mb-2 inline-flex items-center gap-1.5"><Network className="w-3 h-3" /> Subred</div>
            <div className="text-3xl md:text-4xl font-black font-mono">{result.cidrFull}</div>
            <div className="mt-4 text-base">{result.usable.toLocaleString()} hosts utilizables</div>
          </div>

          <div className="grid md:grid-cols-2 gap-3 mb-6">
            {[
              { l: "Network", v: result.network }, { l: "Broadcast", v: result.broadcast },
              { l: "Máscara subnet", v: result.mask }, { l: "Wildcard", v: result.wildcard },
              { l: "Primer host", v: result.first }, { l: "Último host", v: result.last },
              { l: "Total IPs", v: result.total.toLocaleString() }, { l: "IPs utilizables", v: result.usable.toLocaleString() }
            ].map((m) => (
              <div key={m.l} className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-3">
                <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">{m.l}</div>
                <div className="font-mono text-lg font-bold">{m.v}</div>
              </div>
            ))}
          </div>

          <AdSlot slot="subnet_inline" format="auto" minHeight={180} className="mb-6" />
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">🌐 Subredes comunes</strong>
        <ul className="space-y-1 font-mono text-xs">
          <li>• <strong className="text-[color:var(--color-fg)] not-italic font-sans">/24</strong> — 256 IPs (red doméstica/oficina)</li>
          <li>• <strong className="text-[color:var(--color-fg)] not-italic font-sans">/16</strong> — 65,536 IPs (empresa grande)</li>
          <li>• <strong className="text-[color:var(--color-fg)] not-italic font-sans">/30</strong> — 4 IPs (enlace punto-a-punto)</li>
        </ul>
      </div>
    </div>
  );
}
