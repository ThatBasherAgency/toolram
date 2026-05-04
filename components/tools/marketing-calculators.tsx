"use client";
import { useMemo, useState } from "react";
import { TrendingUp, Target } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 280)";

type Mode = "roi" | "ctr" | "cpc" | "cpm" | "roas" | "convr";

export function MarketingCalculators() {
  const [mode, setMode] = useState<Mode>("roi");

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Calculadoras de Marketing Digital</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">ROI · CTR · CPC · CPM · ROAS · Conversión · Las 6 métricas que importan en performance.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1 mb-5">
          {(["roi", "ctr", "cpc", "cpm", "roas", "convr"] as Mode[]).map((m) => (
            <button key={m} onClick={() => setMode(m)} className="px-2 py-2 rounded-md text-xs font-bold uppercase transition" style={mode === m ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>
              {m === "convr" ? "Conv%" : m}
            </button>
          ))}
        </div>

        {mode === "roi" && <ROICalc />}
        {mode === "ctr" && <CTRCalc />}
        {mode === "cpc" && <CPCCalc />}
        {mode === "cpm" && <CPMCalc />}
        {mode === "roas" && <ROASCalc />}
        {mode === "convr" && <ConvCalc />}
      </div>

      <AdSlot slot="mkt_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">📊 Glosario rápido</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">ROI:</strong> Return on Investment · ((Ganancia − Inversión) / Inversión) × 100</li>
          <li>• <strong className="text-[color:var(--color-fg)]">CTR:</strong> Click Through Rate · (Clicks / Impresiones) × 100. Bueno: 2-5%.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">CPC:</strong> Costo Por Click · Inversión / Clicks. Bajo es mejor.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">CPM:</strong> Costo Por Mil impresiones · (Inversión / Impresiones) × 1000.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">ROAS:</strong> Return on Ad Spend · Revenue / Inversión. {">"}3x es bueno; {">"}5x excelente.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Conversión:</strong> (Conversiones / Clicks) × 100. E-commerce: 2-3% es típico.</li>
        </ul>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, prefix }: { label: string; value: string; onChange: (v: string) => void; prefix?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">{label}</span>
      <div className="flex gap-1 mt-1">
        {prefix && <span className="px-3 py-2 rounded-md bg-[color:var(--color-bg-soft)] font-bold">{prefix}</span>}
        <input type="number" className="flex-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-lg font-mono tabular-nums" value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    </label>
  );
}

function Result({ label, value, subtitle }: { label: string; value: string; subtitle?: string }) {
  return (
    <div className="rounded-2xl p-6 text-white text-center mt-4" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
      <div className="text-xs uppercase opacity-80 tracking-widest mb-1 inline-flex items-center gap-1.5"><Target className="w-3 h-3" /> {label}</div>
      <div className="text-5xl md:text-6xl font-black tabular-nums">{value}</div>
      {subtitle && <div className="mt-2 text-sm opacity-90">{subtitle}</div>}
    </div>
  );
}

function ROICalc() {
  const [inv, setInv] = useState("1000"); const [rev, setRev] = useState("3500");
  const v = parseFloat(inv); const r = parseFloat(rev);
  const roi = v > 0 ? ((r - v) / v) * 100 : 0;
  return <><div className="grid grid-cols-2 gap-3"><Field label="Inversión" value={inv} onChange={setInv} prefix="$" /><Field label="Ganancia (revenue)" value={rev} onChange={setRev} prefix="$" /></div><Result label="ROI" value={`${roi.toFixed(1)}%`} subtitle={roi > 100 ? "Excelente, duplicaste lo invertido" : roi > 0 ? "Positivo" : "Negativo, ajustá estrategia"} /></>;
}
function CTRCalc() {
  const [imp, setImp] = useState("10000"); const [clicks, setClicks] = useState("250");
  const i = parseFloat(imp); const c = parseFloat(clicks);
  const ctr = i > 0 ? (c / i) * 100 : 0;
  return <><div className="grid grid-cols-2 gap-3"><Field label="Impresiones" value={imp} onChange={setImp} /><Field label="Clicks" value={clicks} onChange={setClicks} /></div><Result label="CTR" value={`${ctr.toFixed(2)}%`} subtitle={ctr > 5 ? "Excelente CTR" : ctr > 2 ? "CTR aceptable" : "CTR bajo, mejorá creativo o targeting"} /></>;
}
function CPCCalc() {
  const [inv, setInv] = useState("500"); const [clicks, setClicks] = useState("250");
  const i = parseFloat(inv); const c = parseFloat(clicks);
  const cpc = c > 0 ? i / c : 0;
  return <><div className="grid grid-cols-2 gap-3"><Field label="Inversión" value={inv} onChange={setInv} prefix="$" /><Field label="Clicks recibidos" value={clicks} onChange={setClicks} /></div><Result label="CPC" value={`$${cpc.toFixed(2)}`} subtitle="Costo por click promedio" /></>;
}
function CPMCalc() {
  const [inv, setInv] = useState("500"); const [imp, setImp] = useState("100000");
  const i = parseFloat(inv); const m = parseFloat(imp);
  const cpm = m > 0 ? (i / m) * 1000 : 0;
  return <><div className="grid grid-cols-2 gap-3"><Field label="Inversión" value={inv} onChange={setInv} prefix="$" /><Field label="Impresiones" value={imp} onChange={setImp} /></div><Result label="CPM" value={`$${cpm.toFixed(2)}`} subtitle="Costo por cada 1,000 impresiones" /></>;
}
function ROASCalc() {
  const [inv, setInv] = useState("1000"); const [rev, setRev] = useState("4500");
  const v = parseFloat(inv); const r = parseFloat(rev);
  const roas = v > 0 ? r / v : 0;
  return <><div className="grid grid-cols-2 gap-3"><Field label="Inversión en ads" value={inv} onChange={setInv} prefix="$" /><Field label="Revenue generado" value={rev} onChange={setRev} prefix="$" /></div><Result label="ROAS" value={`${roas.toFixed(2)}x`} subtitle={roas > 5 ? "🔥 Excelente" : roas > 3 ? "✅ Bueno" : roas > 1 ? "⚠️ Apenas rentable" : "❌ Pérdida"} /></>;
}
function ConvCalc() {
  const [clicks, setClicks] = useState("500"); const [conv, setConv] = useState("12");
  const c = parseFloat(clicks); const v = parseFloat(conv);
  const rate = c > 0 ? (v / c) * 100 : 0;
  return <><div className="grid grid-cols-2 gap-3"><Field label="Clicks / Visitas" value={clicks} onChange={setClicks} /><Field label="Conversiones" value={conv} onChange={setConv} /></div><Result label="Conversión" value={`${rate.toFixed(2)}%`} subtitle={rate > 5 ? "🔥 Excelente" : rate > 2 ? "✅ Estándar e-commerce" : "⚠️ Optimizá CTAs / landing"} /></>;
}
