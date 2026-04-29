"use client";
import { useMemo, useState } from "react";
import { CALCS_BY_SLUG } from "@/lib/calculators";

export function CalculatorRunner({ slug }: { slug: string }) {
  const calc = CALCS_BY_SLUG[slug];

  const [vals, setVals] = useState<Record<string, string | number>>(() => {
    if (!calc) return {};
    const init: Record<string, string | number> = {};
    for (const f of calc.fields) {
      if (f.type === "number") init[f.key] = f.default ?? 0;
      else if (f.type === "select") init[f.key] = f.default ?? f.options[0].value;
      else init[f.key] = "";
    }
    return init;
  });

  const results = useMemo(() => {
    if (!calc) return [];
    try {
      return calc.compute(vals);
    } catch {
      return [];
    }
  }, [vals, calc]);

  if (!calc) return <div className="text-sm text-[color:var(--color-fg-soft)]">Calculadora no encontrada.</div>;

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        {calc.fields.map((f) => (
          <div key={f.key}>
            <label className="block text-xs uppercase tracking-wide mb-1 text-[color:var(--color-fg-soft)]">
              {f.label}{f.type === "number" && f.suffix ? ` (${f.suffix})` : ""}
            </label>
            {f.type === "number" && (
              <input
                type="number"
                className="input"
                value={vals[f.key] as number}
                step={f.step ?? 1}
                min={f.min}
                max={f.max}
                onChange={(e) => setVals({ ...vals, [f.key]: parseFloat(e.target.value || "0") })}
              />
            )}
            {f.type === "select" && (
              <select className="input" value={vals[f.key] as string} onChange={(e) => setVals({ ...vals, [f.key]: e.target.value })}>
                {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            )}
            {f.type === "date" && (
              <input type="date" className="input" value={vals[f.key] as string} onChange={(e) => setVals({ ...vals, [f.key]: e.target.value })} />
            )}
          </div>
        ))}
      </div>
      <div className="grid gap-2">
        {results.map((r, i) => (
          <div key={i} className={`card !py-3 flex items-center justify-between ${r.emphasized ? "!border-[color:var(--color-brand)] !bg-[color:var(--color-brand-soft)]" : ""}`}>
            <span className="text-sm text-[color:var(--color-fg-soft)]">{r.label}</span>
            <span className={`font-bold ${r.emphasized ? "text-2xl text-[color:var(--color-brand)]" : "text-lg"}`}>{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
