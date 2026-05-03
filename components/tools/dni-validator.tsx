"use client";
import { useMemo, useState } from "react";
import { CheckCircle2, XCircle, FileCheck } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 25)";

const DNI_LETTERS = "TRWAGMYFPDXBNJZSQVHLCKE";

function validDNI(input: string): { ok: boolean; type: "DNI" | "NIE" | null; calculatedLetter?: string; msg: string } {
  const v = input.toUpperCase().replace(/[\s-]/g, "");
  if (/^\d{8}[A-Z]$/.test(v)) {
    const num = parseInt(v.slice(0, 8));
    const expected = DNI_LETTERS[num % 23];
    if (v[8] === expected) return { ok: true, type: "DNI", calculatedLetter: expected, msg: "DNI español válido" };
    return { ok: false, type: "DNI", calculatedLetter: expected, msg: `Letra incorrecta (debería ser ${expected})` };
  }
  if (/^[XYZ]\d{7}[A-Z]$/.test(v)) {
    const prefix = v[0] === "X" ? "0" : v[0] === "Y" ? "1" : "2";
    const num = parseInt(prefix + v.slice(1, 8));
    const expected = DNI_LETTERS[num % 23];
    if (v[8] === expected) return { ok: true, type: "NIE", calculatedLetter: expected, msg: "NIE español válido" };
    return { ok: false, type: "NIE", calculatedLetter: expected, msg: `Letra incorrecta (debería ser ${expected})` };
  }
  return { ok: false, type: null, msg: "Formato no reconocido (debe ser 8 dígitos + letra para DNI, o X/Y/Z + 7 dígitos + letra para NIE)" };
}

export function DniValidator() {
  const [val, setVal] = useState("");
  const result = useMemo(() => val ? validDNI(val) : null, [val]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Validador DNI · NIE España</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Verifica si un DNI o NIE español tiene formato y letra correcta · Calcula la letra correcta del NIF.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6">
        <input type="text" maxLength={9} className="w-full px-4 py-4 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-3xl font-mono tabular-nums text-center font-bold uppercase tracking-wider focus:outline-none focus:border-[color:var(--color-brand)]" value={val} onChange={(e) => setVal(e.target.value.toUpperCase().replace(/[^0-9A-Z]/g, ""))} placeholder="12345678Z" />
        <div className="text-xs text-[color:var(--color-fg-soft)] text-center mt-2">DNI: 8 dígitos + letra · NIE: X/Y/Z + 7 dígitos + letra</div>
      </div>

      {result && (
        <>
          <div className="rounded-3xl p-6 md:p-8 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${result.ok ? "oklch(0.65 0.18 145)" : "oklch(0.6 0.22 35)"}, color-mix(in oklch, ${result.ok ? "oklch(0.65 0.18 145)" : "oklch(0.6 0.22 35)"} 55%, black))` }}>
            <div className="inline-flex items-center gap-2 mb-2">{result.ok ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}</div>
            <div className="text-4xl md:text-5xl font-black mb-2">{result.ok ? "Válido" : "Inválido"}</div>
            <div className="text-base opacity-90">{result.msg}</div>
          </div>

          {result.type && (
            <div className="grid md:grid-cols-2 gap-3 mb-6">
              <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4">
                <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Tipo</div>
                <div className="text-2xl font-extrabold">{result.type}</div>
                <div className="text-xs text-[color:var(--color-fg-soft)] mt-1">{result.type === "DNI" ? "Documento Nacional de Identidad (ciudadanos)" : "Número de Identificación de Extranjero"}</div>
              </div>
              {result.calculatedLetter && (
                <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4">
                  <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Letra correcta</div>
                  <div className="text-2xl font-extrabold font-mono">{result.calculatedLetter}</div>
                  <div className="text-xs text-[color:var(--color-fg-soft)] mt-1">Calculada según número módulo 23</div>
                </div>
              )}
            </div>
          )}

          <AdSlot slot="dni_inline" format="auto" minHeight={180} className="mb-6" />
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2"><FileCheck className="w-4 h-4 inline mr-1" /> Cómo se calcula la letra</strong>
        <ul className="space-y-1">
          <li>• Tomá los 8 dígitos del DNI (o convertí X→0, Y→1, Z→2 para NIE).</li>
          <li>• Calculá <strong className="text-[color:var(--color-fg)]">número mod 23</strong>.</li>
          <li>• Buscá la letra en la tabla: <code className="bg-[color:var(--color-bg)] px-1 rounded text-[10px]">{DNI_LETTERS}</code></li>
          <li>• Esta validación es estructural. Para confirmación oficial usá el sistema de la DGP.</li>
        </ul>
      </div>
    </div>
  );
}
