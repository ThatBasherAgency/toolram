"use client";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeftRight, TrendingUp, AlertTriangle } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.2 145)";

const CURRENCIES = [
  { code: "USD", name: "Dólar estadounidense", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "Libra esterlina", flag: "🇬🇧" },
  { code: "MXN", name: "Peso mexicano", flag: "🇲🇽" },
  { code: "ARS", name: "Peso argentino", flag: "🇦🇷" },
  { code: "BRL", name: "Real brasileño", flag: "🇧🇷" },
  { code: "CLP", name: "Peso chileno", flag: "🇨🇱" },
  { code: "COP", name: "Peso colombiano", flag: "🇨🇴" },
  { code: "PEN", name: "Sol peruano", flag: "🇵🇪" },
  { code: "UYU", name: "Peso uruguayo", flag: "🇺🇾" },
  { code: "CAD", name: "Dólar canadiense", flag: "🇨🇦" },
  { code: "JPY", name: "Yen japonés", flag: "🇯🇵" },
  { code: "CNY", name: "Yuan chino", flag: "🇨🇳" },
  { code: "AUD", name: "Dólar australiano", flag: "🇦🇺" },
  { code: "CHF", name: "Franco suizo", flag: "🇨🇭" }
];

function flag(code: string) { return CURRENCIES.find((c) => c.code === code)?.flag || "💱"; }
function name(code: string) { return CURRENCIES.find((c) => c.code === code)?.name || code; }

export function CurrencyConverter() {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("MXN");
  const [rate, setRate] = useState<number | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true); setError(null);
    (async () => {
      try {
        const r = await fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`);
        if (!r.ok) throw new Error(`Error ${r.status}`);
        const json = await r.json();
        if (cancelled) return;
        if (!json.rates?.[to]) throw new Error("Tasa no disponible para esta combinación");
        setRate(json.rates[to]);
        setDate(json.date);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [from, to]);

  const num = parseFloat(amount.replace(/,/g, "")) || 0;
  const result = rate !== null ? num * rate : null;

  const popularPairs = useMemo(() => {
    if (rate === null) return [];
    return [10, 50, 100, 500, 1000, 5000].map((n) => ({ from: n, to: n * rate }));
  }, [rate]);

  function swap() { setFrom(to); setTo(from); }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Conversor de Divisas</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Tasas de cambio actualizadas diariamente con datos del Banco Central Europeo · 30+ monedas.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6">
        <label className="block mb-5">
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Monto</span>
          <input type="text" inputMode="decimal" className="w-full mt-1.5 px-4 py-4 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-3xl md:text-4xl font-bold tabular-nums focus:outline-none focus:border-[color:var(--color-brand)]" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-end">
          <CurrencyPicker label="De" value={from} onChange={setFrom} accent={ACCENT} />
          <button onClick={swap} className="self-center md:self-end mb-1 w-12 h-12 mx-auto rounded-full bg-[color:var(--color-bg-soft)] hover:bg-[color:var(--color-bg)] hover:shadow flex items-center justify-center transition" aria-label="Intercambiar">
            <ArrowLeftRight className="w-5 h-5" />
          </button>
          <CurrencyPicker label="A" value={to} onChange={setTo} accent={ACCENT} />
        </div>
      </div>

      {error && (
        <div className="rounded-2xl bg-[color:var(--color-danger)]/10 border border-[color:var(--color-danger)]/30 p-4 text-sm flex items-start gap-2 mb-6">
          <AlertTriangle className="w-4 h-4 text-[color:var(--color-danger)] flex-shrink-0 mt-0.5" />
          <div>{error}</div>
        </div>
      )}

      {result !== null && rate !== null && (
        <>
          <div className="rounded-3xl p-8 md:p-10 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 60%, black))` }}>
            <div className="text-sm opacity-80 mb-2">{flag(from)} {num.toLocaleString("es", { maximumFractionDigits: 4 })} {from} =</div>
            <div className="text-5xl md:text-7xl font-extrabold tabular-nums tracking-tight">{result.toLocaleString("es", { maximumFractionDigits: 4 })}</div>
            <div className="text-xl mt-2 opacity-90">{flag(to)} {to}</div>
            <div className="text-xs opacity-70 mt-3">1 {from} = {rate.toFixed(6)} {to} {date && `· ${date}`}</div>
          </div>

          <AdSlot slot="currency_inline" format="auto" minHeight={180} className="mb-6" />

          <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5 mb-6">
            <div className="font-bold mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4" style={{ color: ACCENT }} /> Conversiones populares</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {popularPairs.map((p, i) => (
                <button key={i} onClick={() => setAmount(String(p.from))} className="rounded-lg border border-[color:var(--color-border)] p-3 text-left hover:shadow transition">
                  <div className="text-xs text-[color:var(--color-fg-soft)]">{p.from.toLocaleString("es")} {from}</div>
                  <div className="font-bold tabular-nums">{p.to.toLocaleString("es", { maximumFractionDigits: 2 })} {to}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
            <strong className="text-[color:var(--color-fg)]">Sobre las tasas:</strong> los datos provienen del Banco Central Europeo (ECB) vía Frankfurter API y se actualizan los días hábiles. Las tasas son referenciales — para transacciones reales tu banco/casa de cambio aplica un spread (típicamente 2-5%).
          </div>
        </>
      )}

      {loading && !rate && (
        <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-8 text-center text-sm text-[color:var(--color-fg-soft)]">
          <div className="w-6 h-6 mx-auto rounded-full border-3 border-[color:var(--color-brand)] border-t-transparent animate-spin mb-2" />
          Consultando tasa…
        </div>
      )}
    </div>
  );
}

function CurrencyPicker({ label, value, onChange, accent }: { label: string; value: string; onChange: (v: string) => void; accent: string }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">{label}</span>
      <div className="mt-1.5 relative">
        <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full appearance-none px-4 py-4 pl-14 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-base font-bold focus:outline-none focus:border-[color:var(--color-brand)] cursor-pointer" style={{ borderColor: accent }}>
          {CURRENCIES.map((c) => <option key={c.code} value={c.code}>{c.code} — {c.name}</option>)}
        </select>
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl pointer-events-none">{flag(value)}</span>
      </div>
      <div className="text-xs text-[color:var(--color-fg-soft)] mt-1">{name(value)}</div>
    </label>
  );
}
