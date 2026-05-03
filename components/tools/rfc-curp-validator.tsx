"use client";
import { useMemo, useState } from "react";
import { CheckCircle2, XCircle, FileText } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 25)";

function validRFC(rfc: string): { ok: boolean; type: "fisica" | "moral" | null; msg: string } {
  const r = rfc.toUpperCase().trim().replace(/\s/g, "");
  const fisica = /^[A-ZÑ&]{4}\d{6}[A-Z0-9]{3}$/;
  const moral = /^[A-ZÑ&]{3}\d{6}[A-Z0-9]{3}$/;
  if (fisica.test(r)) return { ok: true, type: "fisica", msg: "RFC de persona física válido" };
  if (moral.test(r)) return { ok: true, type: "moral", msg: "RFC de persona moral válido" };
  return { ok: false, type: null, msg: "Formato RFC no válido" };
}

function validCURP(curp: string): { ok: boolean; sex: string | null; state: string | null; msg: string } {
  const c = curp.toUpperCase().trim().replace(/\s/g, "");
  if (!/^[A-Z][AEIOUX][A-Z]{2}\d{6}[HM][A-Z]{2}[BCDFGHJKLMNÑPQRSTVWXYZ]{3}[0-9A-Z]\d$/.test(c)) {
    return { ok: false, sex: null, state: null, msg: "Formato CURP no válido" };
  }
  const sex = c[10] === "H" ? "Hombre" : c[10] === "M" ? "Mujer" : null;
  const states: Record<string, string> = {
    AS: "Aguascalientes", BC: "Baja California", BS: "Baja California Sur", CC: "Campeche", CL: "Coahuila", CM: "Colima", CS: "Chiapas", CH: "Chihuahua", DF: "CDMX", DG: "Durango", GT: "Guanajuato", GR: "Guerrero", HG: "Hidalgo", JC: "Jalisco", MC: "México (Edo)", MN: "Michoacán", MS: "Morelos", NT: "Nayarit", NL: "Nuevo León", OC: "Oaxaca", PL: "Puebla", QT: "Querétaro", QR: "Quintana Roo", SP: "San Luis Potosí", SL: "Sinaloa", SR: "Sonora", TC: "Tabasco", TS: "Tamaulipas", TL: "Tlaxcala", VZ: "Veracruz", YN: "Yucatán", ZS: "Zacatecas", NE: "Extranjero"
  };
  const stateCode = c.slice(11, 13);
  return { ok: true, sex, state: states[stateCode] || stateCode, msg: "CURP válido" };
}

export function RfcCurpValidator() {
  const [mode, setMode] = useState<"rfc" | "curp">("rfc");
  const [val, setVal] = useState("");

  const rfcResult = useMemo(() => mode === "rfc" ? validRFC(val) : null, [val, mode]);
  const curpResult = useMemo(() => mode === "curp" ? validCURP(val) : null, [val, mode]);
  const valid = mode === "rfc" ? rfcResult?.ok : curpResult?.ok;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Validador RFC · CURP México</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Verifica si un RFC (persona física/moral) o CURP es válido · Detecta sexo y estado de nacimiento.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6">
        <div className="inline-flex rounded-xl bg-[color:var(--color-bg-soft)] p-1 mb-4">
          <button onClick={() => { setMode("rfc"); setVal(""); }} className="px-4 py-2 rounded-lg text-sm font-bold transition" style={mode === "rfc" ? { background: ACCENT, color: "white" } : {}}>RFC</button>
          <button onClick={() => { setMode("curp"); setVal(""); }} className="px-4 py-2 rounded-lg text-sm font-bold transition" style={mode === "curp" ? { background: ACCENT, color: "white" } : {}}>CURP</button>
        </div>

        <input type="text" className="w-full px-4 py-4 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-2xl font-mono tabular-nums text-center font-bold uppercase tracking-wider focus:outline-none focus:border-[color:var(--color-brand)]" value={val} onChange={(e) => setVal(e.target.value)} placeholder={mode === "rfc" ? "GARC901214AB7" : "GARC901214HDFRNS09"} maxLength={mode === "rfc" ? 13 : 18} />
      </div>

      {val && (
        <>
          <div className="rounded-3xl p-6 md:p-8 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${valid ? "oklch(0.65 0.18 145)" : "oklch(0.6 0.22 35)"}, color-mix(in oklch, ${valid ? "oklch(0.65 0.18 145)" : "oklch(0.6 0.22 35)"} 55%, black))` }}>
            <div className="inline-flex items-center gap-2 mb-2">
              {valid ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
            </div>
            <div className="text-4xl md:text-5xl font-black mb-2">{valid ? "Válido" : "Inválido"}</div>
            <div className="text-base opacity-90">{rfcResult?.msg || curpResult?.msg}</div>
          </div>

          {mode === "rfc" && rfcResult?.ok && (
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5 mb-6">
              <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] mb-1">Tipo</div>
              <div className="text-lg font-bold">Persona {rfcResult.type === "fisica" ? "Física" : "Moral"}</div>
              <div className="text-xs text-[color:var(--color-fg-soft)] mt-1">{rfcResult.type === "fisica" ? "Personas individuales: 4 letras (apellidos+nombre) + 6 fecha + 3 homoclave" : "Empresas/AC/SC: 3 letras razón social + 6 fecha + 3 homoclave"}</div>
            </div>
          )}
          {mode === "curp" && curpResult?.ok && (
            <div className="grid md:grid-cols-2 gap-3 mb-6">
              <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4"><div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Sexo</div><div className="text-2xl font-extrabold">{curpResult.sex}</div></div>
              <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4"><div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Estado de nacimiento</div><div className="text-xl font-bold">{curpResult.state}</div></div>
            </div>
          )}

          <AdSlot slot="rfccurp_inline" format="auto" minHeight={180} className="mb-6" />
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">📋 Estructura</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">RFC física (13 chars):</strong> 4 letras (apellidos + 1er nombre) + AAMMDD + homoclave 3 chars.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">RFC moral (12 chars):</strong> 3 letras razón social + AAMMDD + homoclave 3 chars.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">CURP (18 chars):</strong> 4 letras + AAMMDD + sexo (H/M) + 2 letras estado + 3 consonantes + homoclave + 1 dígito.</li>
          <li>• Esta validación verifica la estructura. Para confirmación oficial usá el portal del SAT o RENAPO.</li>
        </ul>
      </div>
    </div>
  );
}
