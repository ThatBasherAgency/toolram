"use client";
import { useMemo, useState } from "react";
import { Building2, CheckCircle2, XCircle } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 145)";

const MX_BANKS: Record<string, string> = {
  "002": "Banamex / Citibanamex", "012": "BBVA", "014": "Santander", "021": "HSBC", "030": "Bajío", "032": "IXE", "036": "Inbursa", "037": "Interacciones", "044": "Scotiabank", "058": "Banregio", "059": "Invex", "060": "Bansi", "062": "Afirme", "072": "Banorte", "102": "ABN-AMRO", "103": "American Express", "106": "Bank of America", "108": "MUFG", "110": "JP Morgan", "112": "BMonex", "113": "Ve por Más", "126": "Credit Suisse", "127": "Azteca", "128": "Autofin", "129": "Barclays", "130": "Compartamos", "131": "BANCOPPEL", "132": "ABC", "133": "ACTINVER", "135": "NAFIN", "136": "Interbanco", "137": "Bansefi", "138": "ABC Capital", "140": "Consubanco", "143": "CIBANCO", "145": "BBASE", "147": "Bankaool", "148": "PAGATODO", "150": "Inmobiliario Mexicano", "151": "Donde", "152": "Bancrea", "154": "Banco Forjadores", "155": "ICBC", "156": "Sabadell", "157": "Shinhan", "158": "Mizuho Bank", "159": "Bancomext", "166": "Banco Base", "168": "Banco Inmobiliario Mexicano", "600": "Mony Money", "601": "MasterCard", "634": "Fincomun", "638": "Asea", "646": "STP", "652": "Credicapital", "653": "Kuspit", "655": "Sofiexpress", "656": "UNAGRA", "659": "Opciones Empresariales del Noreste"
};

function validCLABE(clabe: string): { ok: boolean; bank: string | null; msg: string } {
  const c = clabe.replace(/\s/g, "");
  if (!/^\d{18}$/.test(c)) return { ok: false, bank: null, msg: "CLABE debe tener 18 dígitos" };
  const weights = [3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7];
  let sum = 0;
  for (let i = 0; i < 17; i++) sum += (parseInt(c[i]) * weights[i]) % 10;
  const expectedDigit = (10 - (sum % 10)) % 10;
  const actualDigit = parseInt(c[17]);
  if (expectedDigit !== actualDigit) return { ok: false, bank: null, msg: "Dígito verificador incorrecto" };
  const bankCode = c.slice(0, 3);
  return { ok: true, bank: MX_BANKS[bankCode] || `Código ${bankCode}`, msg: "CLABE válida" };
}

function validCBU(cbu: string): { ok: boolean; msg: string } {
  const c = cbu.replace(/\s/g, "");
  if (!/^\d{22}$/.test(c)) return { ok: false, msg: "CBU debe tener 22 dígitos" };
  const block1 = c.slice(0, 8);
  const block2 = c.slice(8, 22);
  const weights = [7, 1, 3, 9, 7, 1, 3];
  let sum1 = 0;
  for (let i = 0; i < 7; i++) sum1 += parseInt(block1[i]) * weights[i];
  const dv1 = (10 - (sum1 % 10)) % 10;
  if (dv1 !== parseInt(block1[7])) return { ok: false, msg: "Dígito verificador 1 incorrecto" };
  const w2 = [3, 9, 7, 1, 3, 9, 7, 1, 3, 9, 7, 1, 3];
  let sum2 = 0;
  for (let i = 0; i < 13; i++) sum2 += parseInt(block2[i]) * w2[i];
  const dv2 = (10 - (sum2 % 10)) % 10;
  if (dv2 !== parseInt(block2[13])) return { ok: false, msg: "Dígito verificador 2 incorrecto" };
  return { ok: true, msg: "CBU válido" };
}

export function ClabeCbuValidator() {
  const [mode, setMode] = useState<"clabe" | "cbu">("clabe");
  const [val, setVal] = useState("");

  const clabeResult = useMemo(() => mode === "clabe" ? validCLABE(val) : null, [val, mode]);
  const cbuResult = useMemo(() => mode === "cbu" ? validCBU(val) : null, [val, mode]);
  const ok = clabeResult?.ok || cbuResult?.ok;
  const showResult = val.replace(/\s/g, "").length === (mode === "clabe" ? 18 : 22);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Validador CLABE · CBU Bancario</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Verifica CLABE (México 18 dígitos) o CBU (Argentina 22 dígitos) · Identifica banco emisor.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6">
        <div className="inline-flex rounded-xl bg-[color:var(--color-bg-soft)] p-1 mb-4">
          <button onClick={() => { setMode("clabe"); setVal(""); }} className="px-4 py-2 rounded-lg text-sm font-bold transition" style={mode === "clabe" ? { background: ACCENT, color: "white" } : {}}>🇲🇽 CLABE (18 dígitos)</button>
          <button onClick={() => { setMode("cbu"); setVal(""); }} className="px-4 py-2 rounded-lg text-sm font-bold transition" style={mode === "cbu" ? { background: ACCENT, color: "white" } : {}}>🇦🇷 CBU (22 dígitos)</button>
        </div>

        <input type="text" inputMode="numeric" className="w-full px-4 py-4 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-xl md:text-2xl font-mono tabular-nums text-center font-bold tracking-wider focus:outline-none focus:border-[color:var(--color-brand)]" value={val} onChange={(e) => setVal(e.target.value.replace(/\D/g, ""))} placeholder={mode === "clabe" ? "002180001234567893" : "0140017801235678901224"} maxLength={mode === "clabe" ? 18 : 22} />
      </div>

      {showResult && (
        <>
          <div className="rounded-3xl p-6 md:p-8 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${ok ? "oklch(0.65 0.18 145)" : "oklch(0.6 0.22 35)"}, color-mix(in oklch, ${ok ? "oklch(0.65 0.18 145)" : "oklch(0.6 0.22 35)"} 55%, black))` }}>
            <div className="inline-flex items-center gap-2 mb-2">{ok ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}</div>
            <div className="text-4xl md:text-5xl font-black mb-2">{ok ? "Válido" : "Inválido"}</div>
            <div className="text-base opacity-90">{clabeResult?.msg || cbuResult?.msg}</div>
          </div>

          {mode === "clabe" && clabeResult?.ok && clabeResult.bank && (
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5 mb-6">
              <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] inline-flex items-center gap-1"><Building2 className="w-3 h-3" /> Banco emisor</div>
              <div className="text-2xl font-bold mt-1">{clabeResult.bank}</div>
            </div>
          )}

          <AdSlot slot="clabe_inline" format="auto" minHeight={180} className="mb-6" />
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">🏦 Estructura</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">CLABE (México):</strong> 3 dígitos banco + 3 plaza + 11 cuenta + 1 verificador.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">CBU (Argentina):</strong> 8 dígitos banco+sucursal+verif1 + 14 cuenta+verif2.</li>
          <li>• Esta validación es estructural. Para confirmar la titularidad, hacé una transferencia de prueba mínima.</li>
        </ul>
      </div>
    </div>
  );
}
