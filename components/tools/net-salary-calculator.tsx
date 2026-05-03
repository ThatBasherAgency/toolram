"use client";
import { useMemo, useState } from "react";
import { Wallet, Info } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 145)";

const COUNTRIES = {
  mx: {
    name: "🇲🇽 México",
    currency: "MX$",
    calc: (gross: number) => {
      const annual = gross * 12;
      let isr = 0;
      if (annual <= 8952.49) isr = annual * 0.0192;
      else if (annual <= 75984.55) isr = 171.88 + (annual - 8952.49) * 0.064;
      else if (annual <= 133536.07) isr = 4461.94 + (annual - 75984.55) * 0.1088;
      else if (annual <= 155229.80) isr = 10723.55 + (annual - 133536.07) * 0.16;
      else if (annual <= 185852.57) isr = 14194.54 + (annual - 155229.80) * 0.1792;
      else if (annual <= 374837.88) isr = 19682.13 + (annual - 185852.57) * 0.2136;
      else if (annual <= 590795.99) isr = 60049.40 + (annual - 374837.88) * 0.2352;
      else if (annual <= 1127926.84) isr = 110842.74 + (annual - 590795.99) * 0.30;
      else if (annual <= 1503902.46) isr = 271981.99 + (annual - 1127926.84) * 0.32;
      else if (annual <= 4511707.37) isr = 392294.17 + (annual - 1503902.46) * 0.34;
      else isr = 1414947.85 + (annual - 4511707.37) * 0.35;
      const isrMonthly = isr / 12;
      const imss = gross * 0.025;
      return { isr: isrMonthly, social: imss, otherLabel: "IMSS" };
    }
  },
  ar: {
    name: "🇦🇷 Argentina",
    currency: "AR$",
    calc: (gross: number) => {
      const social = gross * 0.17;
      const taxable = gross - social;
      let ganancias = 0;
      if (taxable > 200000) ganancias = (taxable - 200000) * 0.15;
      return { isr: ganancias, social, otherLabel: "Aportes (jub+OS+sind)" };
    }
  },
  cl: {
    name: "🇨🇱 Chile",
    currency: "CLP$",
    calc: (gross: number) => {
      const afp = gross * 0.10;
      const salud = gross * 0.07;
      const social = afp + salud;
      const annual = gross * 12;
      let impuesto = 0;
      if (annual > 9_000_000) impuesto = (annual - 9_000_000) * 0.04 / 12;
      return { isr: impuesto, social, otherLabel: "AFP + Salud" };
    }
  },
  pe: {
    name: "🇵🇪 Perú",
    currency: "S/",
    calc: (gross: number) => {
      const afp = gross * 0.13;
      const annual = gross * 14;
      const uit = 5350;
      const taxable = Math.max(0, annual - 7 * uit);
      let impuesto = 0;
      if (taxable <= 5 * uit) impuesto = taxable * 0.08;
      else if (taxable <= 20 * uit) impuesto = 5 * uit * 0.08 + (taxable - 5 * uit) * 0.14;
      else impuesto = 5 * uit * 0.08 + 15 * uit * 0.14 + (taxable - 20 * uit) * 0.17;
      return { isr: impuesto / 14, social: afp, otherLabel: "AFP / ONP" };
    }
  },
  co: {
    name: "🇨🇴 Colombia",
    currency: "COL$",
    calc: (gross: number) => {
      const salud = gross * 0.04;
      const pension = gross * 0.04;
      const social = salud + pension;
      const taxable = gross - social;
      let impuesto = 0;
      const uvt = 49799;
      if (taxable > 95 * uvt) impuesto = (taxable - 95 * uvt) * 0.19;
      return { isr: impuesto, social, otherLabel: "Salud + Pensión" };
    }
  },
  es: {
    name: "🇪🇸 España",
    currency: "€",
    calc: (gross: number) => {
      const ss = gross * 0.0635;
      const annual = gross * 12;
      let irpf = 0;
      if (annual <= 12450) irpf = annual * 0.19;
      else if (annual <= 20200) irpf = 2365.50 + (annual - 12450) * 0.24;
      else if (annual <= 35200) irpf = 4225.50 + (annual - 20200) * 0.30;
      else if (annual <= 60000) irpf = 8725.50 + (annual - 35200) * 0.37;
      else if (annual <= 300000) irpf = 17901.50 + (annual - 60000) * 0.45;
      else irpf = 125901.50 + (annual - 300000) * 0.47;
      return { isr: irpf / 12, social: ss, otherLabel: "Seguridad Social" };
    }
  }
};

type CountryKey = keyof typeof COUNTRIES;

export function NetSalaryCalculator() {
  const [country, setCountry] = useState<CountryKey>("mx");
  const [gross, setGross] = useState("30000");

  const result = useMemo(() => {
    const g = parseFloat(gross);
    if (!g || g <= 0) return null;
    const c = COUNTRIES[country];
    const { isr, social, otherLabel } = c.calc(g);
    const net = g - isr - social;
    const totalTax = isr + social;
    const taxPct = (totalTax / g) * 100;
    return { gross: g, isr, social, net, totalTax, taxPct, currency: c.currency, otherLabel };
  }, [gross, country]);

  const fmt = (n: number) => n.toLocaleString("es", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Calculadora de Sueldo Neto</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Cuánto cobrás "en mano" después de impuestos · 6 países · Aproximación sin deducciones especiales.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6 space-y-4">
        <div>
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] block mb-2">País</span>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
            {(Object.keys(COUNTRIES) as CountryKey[]).map((c) => (
              <button key={c} onClick={() => setCountry(c)} className="px-2 py-2 rounded-md text-xs font-bold transition" style={country === c ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>{COUNTRIES[c].name}</button>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Sueldo bruto mensual</span>
          <div className="flex gap-2 mt-1.5">
            <span className="px-3 py-3 rounded-xl bg-[color:var(--color-bg-soft)] font-bold text-lg">{COUNTRIES[country].currency}</span>
            <input type="number" className="flex-1 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-2xl font-mono tabular-nums focus:outline-none focus:border-[color:var(--color-brand)]" value={gross} onChange={(e) => setGross(e.target.value)} />
          </div>
        </label>
      </div>

      {result && (
        <>
          <div className="rounded-3xl p-8 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
            <div className="text-xs uppercase opacity-80 tracking-widest mb-2 inline-flex items-center gap-1.5"><Wallet className="w-3 h-3" /> Sueldo neto</div>
            <div className="text-6xl md:text-7xl font-black tabular-nums">{result.currency}{fmt(result.net)}</div>
            <div className="mt-2 text-base opacity-90">por mes · te quitan {result.taxPct.toFixed(1)}%</div>
          </div>

          <div className="grid md:grid-cols-3 gap-3 mb-6">
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4 text-center">
              <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Bruto</div>
              <div className="text-xl font-bold mt-1">{result.currency}{fmt(result.gross)}</div>
            </div>
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4 text-center">
              <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Impuesto sobre renta</div>
              <div className="text-xl font-bold mt-1 text-[color:var(--color-danger)]">−{result.currency}{fmt(result.isr)}</div>
            </div>
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4 text-center">
              <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">{result.otherLabel}</div>
              <div className="text-xl font-bold mt-1 text-[color:var(--color-warning)]">−{result.currency}{fmt(result.social)}</div>
            </div>
          </div>

          <AdSlot slot="netsalary_inline" format="auto" minHeight={180} className="mb-6" />
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-warning)]/10 border border-[color:var(--color-warning)] p-5 text-sm flex gap-3">
        <Info className="w-5 h-5 text-[color:var(--color-warning)] flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-[color:var(--color-fg)] block mb-1">⚠️ Aproximación 2026</strong>
          <span className="text-[color:var(--color-fg-soft)]">Esta calculadora usa tablas oficiales aproximadas y NO considera deducciones especiales (cargas familiares, deducciones autorizadas, contribuciones voluntarias, créditos fiscales, aguinaldo). Para cálculo exacto consultá tu recibo de sueldo o un contador.</span>
        </div>
      </div>
    </div>
  );
}
