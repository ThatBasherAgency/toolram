"use client";
import { useMemo, useState } from "react";
import { Network, RefreshCw, Copy, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 280)";

const VENDORS: Record<string, string> = {
  "00:1A:11": "Google", "00:50:56": "VMware", "08:00:27": "VirtualBox", "00:0C:29": "VMware",
  "DE:AD:BE": "Locally administered", "00:16:3E": "Xen", "52:54:00": "QEMU/KVM"
};

function randHex() { return Math.floor(Math.random() * 256).toString(16).padStart(2, "0").toUpperCase(); }

export function MacGenerator() {
  const [count, setCount] = useState(5);
  const [format, setFormat] = useState<":" | "-" | ".">(":");
  const [seed, setSeed] = useState(0);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [vendor, setVendor] = useState("any");

  const macs = useMemo(() => {
    void seed;
    return Array.from({ length: count }, () => {
      let bytes: string[];
      if (vendor !== "any" && VENDORS[vendor]) {
        bytes = [...vendor.split(":"), randHex(), randHex(), randHex()];
      } else {
        bytes = [randHex(), randHex(), randHex(), randHex(), randHex(), randHex()];
      }
      if (format === ".") return bytes.join("").match(/.{4}/g)!.join(".");
      return bytes.join(format);
    });
  }, [count, format, seed, vendor]);

  async function copy(m: string, i: number) {
    await navigator.clipboard.writeText(m);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 1000);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador de Direcciones MAC</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Direcciones MAC aleatorias · Vendor prefix opcional · Para tests de red, VMs, dispositivos virtuales.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 mb-6 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Cantidad: {count}</span>
            <input type="range" min="1" max="50" value={count} onChange={(e) => setCount(+e.target.value)} className="w-full mt-2" /></label>
          <div><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] block mb-1">Formato</span>
            <div className="grid grid-cols-3 gap-1">{([":", "-", "."] as const).map((f) => <button key={f} onClick={() => setFormat(f)} className="px-3 py-2 rounded-md font-mono text-sm font-bold transition" style={format === f ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>{f === "." ? "AAAA.BBBB" : `AA${f}BB`}</button>)}</div></div>
        </div>
        <select value={vendor} onChange={(e) => setVendor(e.target.value)} className="w-full px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm">
          <option value="any">Cualquier vendor (random)</option>
          {Object.entries(VENDORS).map(([k, v]) => <option key={k} value={k}>{v} ({k})</option>)}
        </select>
        <button onClick={() => setSeed((s) => s + 1)} className="w-full px-4 py-3 rounded-xl text-white font-bold inline-flex items-center justify-center gap-2" style={{ background: ACCENT }}><RefreshCw className="w-4 h-4" /> Regenerar</button>
      </div>

      <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] divide-y divide-[color:var(--color-border)] mb-6">
        {macs.map((m, i) => (
          <button key={i} onClick={() => copy(m, i)} className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-[color:var(--color-bg-soft)] transition">
            <span className="font-mono font-bold tabular-nums">{m}</span>
            {copiedIdx === i ? <Check className="w-4 h-4 text-[color:var(--color-success)]" /> : <Copy className="w-4 h-4 text-[color:var(--color-fg-soft)]" />}
          </button>
        ))}
      </div>

      <AdSlot slot="mac_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2"><Network className="w-4 h-4 inline mr-1" /> Sobre direcciones MAC</strong>
        48 bits, 6 bytes. Los primeros 3 bytes (OUI) identifican el fabricante. Las MACs aleatorias deben tener bit local-administered set (segundo bit del primer byte) para no colisionar con dispositivos reales.
      </div>
    </div>
  );
}
