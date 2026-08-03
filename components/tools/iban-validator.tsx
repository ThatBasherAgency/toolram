"use client";
import { useMemo, useState } from "react";
import { Check, X } from "lucide-react";

/** Longitud oficial del IBAN por país (ISO 13616). */
const IBAN_LENGTH: Record<string, number> = {
  AD: 24, AT: 20, BE: 16, BG: 22, CH: 21, CY: 28, CZ: 24, DE: 22, DK: 18, EE: 20,
  ES: 24, FI: 18, FR: 27, GB: 22, GI: 23, GR: 27, HR: 21, HU: 28, IE: 22, IS: 26,
  IT: 27, LI: 21, LT: 20, LU: 20, LV: 21, MC: 27, MT: 31, NL: 18, NO: 15, PL: 28,
  PT: 25, RO: 24, SE: 24, SI: 19, SK: 24, SM: 27, TR: 26, VA: 22
};

const COUNTRY_NAME: Record<string, string> = {
  AD: "Andorra", AT: "Austria", BE: "Bélgica", BG: "Bulgaria", CH: "Suiza", CY: "Chipre",
  CZ: "Chequia", DE: "Alemania", DK: "Dinamarca", EE: "Estonia", ES: "España", FI: "Finlandia",
  FR: "Francia", GB: "Reino Unido", GI: "Gibraltar", GR: "Grecia", HR: "Croacia", HU: "Hungría",
  IE: "Irlanda", IS: "Islandia", IT: "Italia", LI: "Liechtenstein", LT: "Lituania", LU: "Luxemburgo",
  LV: "Letonia", MC: "Mónaco", MT: "Malta", NL: "Países Bajos", NO: "Noruega", PL: "Polonia",
  PT: "Portugal", RO: "Rumanía", SE: "Suecia", SI: "Eslovenia", SK: "Eslovaquia", SM: "San Marino",
  TR: "Turquía", VA: "Ciudad del Vaticano"
};

/** Módulo 97 sobre cadena larga (ISO 7064), sin BigInt para máxima compatibilidad. */
function mod97(numeric: string): number {
  let remainder = 0;
  for (const ch of numeric) {
    remainder = (remainder * 10 + (ch.charCodeAt(0) - 48)) % 97;
  }
  return remainder;
}

type Result =
  | { ok: true; country: string; length: number; formatted: string }
  | { ok: false; reason: string };

function validate(input: string): Result | null {
  const clean = input.replace(/[\s-]/g, "").toUpperCase();
  if (!clean) return null;
  if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(clean)) {
    return { ok: false, reason: "Formato inválido: debe empezar por 2 letras de país y 2 dígitos de control." };
  }
  const country = clean.slice(0, 2);
  const expected = IBAN_LENGTH[country];
  if (!expected) return { ok: false, reason: `El país "${country}" no está en la lista de países IBAN soportados.` };
  if (clean.length !== expected) {
    return { ok: false, reason: `Longitud incorrecta para ${COUNTRY_NAME[country] ?? country}: tiene ${clean.length} caracteres y debe tener ${expected}.` };
  }
  // Mueve los 4 primeros al final y convierte letras a números (A=10 ... Z=35).
  const rearranged = clean.slice(4) + clean.slice(0, 4);
  const numeric = rearranged.replace(/[A-Z]/g, (c) => String(c.charCodeAt(0) - 55));
  if (mod97(numeric) !== 1) {
    return { ok: false, reason: "Los dígitos de control no cuadran (módulo 97). Revisa si hay algún número mal copiado." };
  }
  return {
    ok: true,
    country,
    length: clean.length,
    formatted: clean.replace(/(.{4})/g, "$1 ").trim()
  };
}

export function IbanValidator() {
  const [value, setValue] = useState("");
  const result = useMemo(() => validate(value), [value]);

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="iban" className="block text-xs uppercase mb-1">
          IBAN
        </label>
        <input
          id="iban"
          className="input w-full font-mono uppercase"
          placeholder="ES91 2100 0418 4502 0005 1332"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      {result && (
        <div className="card !p-3">
          {result.ok ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Check className="w-4 h-4" /> IBAN válido
              </div>
              <ul className="text-sm space-y-1">
                <li>
                  <span className="text-[color:var(--color-fg-soft)]">País:</span>{" "}
                  {COUNTRY_NAME[result.country] ?? result.country} ({result.country})
                </li>
                <li>
                  <span className="text-[color:var(--color-fg-soft)]">Longitud:</span> {result.length} caracteres
                </li>
                <li className="font-mono break-all">
                  <span className="text-[color:var(--color-fg-soft)] font-sans">Formato impreso:</span> {result.formatted}
                </li>
              </ul>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-medium">
                <X className="w-4 h-4" /> IBAN no válido
              </div>
              <div className="text-sm text-[color:var(--color-fg-soft)]">{result.reason}</div>
            </div>
          )}
        </div>
      )}

      <div className="card !p-3 text-sm text-[color:var(--color-fg-soft)]">
        La validación es matemática (norma ISO 13616 con módulo 97): comprueba que el IBAN esté bien escrito, no
        que la cuenta exista ni que tenga saldo. El cálculo ocurre en tu navegador — el número no se envía a
        ningún servidor.
      </div>
    </div>
  );
}
