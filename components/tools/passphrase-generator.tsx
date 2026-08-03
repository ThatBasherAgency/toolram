"use client";
import { useEffect, useMemo, useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

/** Palabras cortas, comunes y sin acentos: fáciles de recordar y de teclear. */
const WORDS = [
  "ancla", "arena", "avion", "banco", "barco", "bosque", "brisa", "cabra", "campo", "canela",
  "carta", "cebra", "cielo", "cobre", "coral", "cuervo", "delta", "duna", "faro", "fresa",
  "fuego", "gato", "globo", "grillo", "hielo", "hoja", "humo", "isla", "jaguar", "jarra",
  "lago", "lanza", "leon", "libro", "lima", "lince", "llave", "lluvia", "loma", "luna",
  "mango", "mapa", "marea", "menta", "miel", "monte", "nido", "niebla", "nieve", "nube",
  "olivo", "onda", "oro", "oso", "palma", "panal", "pato", "perla", "pino", "playa",
  "pluma", "puente", "puerto", "rama", "remo", "rio", "roble", "roca", "rueda", "sal",
  "sauce", "selva", "sol", "sombra", "tigre", "tinta", "torre", "trigo", "trueno", "tuna",
  "valle", "vela", "viento", "vidrio", "zorro", "zumo"
];

const SEPARATORS = [
  { key: "-", label: "guion  -" },
  { key: ".", label: "punto  ." },
  { key: "_", label: "guion bajo  _" },
  { key: " ", label: "espacio" }
];

/** Entero aleatorio criptográficamente seguro y sin sesgo de módulo. */
function secureInt(max: number): number {
  const limit = Math.floor(0xffffffff / max) * max;
  const buf = new Uint32Array(1);
  let n = 0;
  do {
    crypto.getRandomValues(buf);
    n = buf[0];
  } while (n >= limit);
  return n % max;
}

export function PassphraseGenerator() {
  const [count, setCount] = useState(4);
  const [sep, setSep] = useState("-");
  const [capitalize, setCapitalize] = useState(true);
  const [addNumber, setAddNumber] = useState(true);
  const [phrase, setPhrase] = useState("");
  const [copied, setCopied] = useState(false);

  function generate() {
    const picked = Array.from({ length: count }, () => WORDS[secureInt(WORDS.length)]);
    const shaped = capitalize ? picked.map((w) => w[0].toUpperCase() + w.slice(1)) : picked;
    const base = shaped.join(sep);
    setPhrase(addNumber ? `${base}${sep}${secureInt(100)}` : base);
  }

  // Genera una al montar para que la herramienta nunca se vea vacía.
  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Entropía real: log2(diccionario^palabras) + los 2 dígitos opcionales. */
  const bits = useMemo(() => {
    const wordBits = count * Math.log2(WORDS.length);
    return Math.round(wordBits + (addNumber ? Math.log2(100) : 0));
  }, [count, addNumber]);

  const strength = bits >= 77 ? "Muy fuerte" : bits >= 60 ? "Fuerte" : bits >= 45 ? "Aceptable" : "Débil";

  async function copy() {
    await navigator.clipboard.writeText(phrase);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="space-y-4">
      <div className="card !p-4">
        <div className="font-mono text-lg break-all">{phrase || "…"}</div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={generate} className="btn btn-primary">
          <RefreshCw className="w-4 h-4" /> Generar otra
        </button>
        <button onClick={copy} disabled={!phrase} className="btn btn-ghost">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? "Copiada" : "Copiar"}
        </button>
      </div>

      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label htmlFor="pp-count" className="block text-xs uppercase mb-1">
            Palabras
          </label>
          <input
            id="pp-count"
            type="number"
            min={3}
            max={8}
            className="input w-24"
            value={count}
            onChange={(e) => setCount(Math.min(8, Math.max(3, parseInt(e.target.value || "4", 10))))}
          />
        </div>
        <div>
          <label htmlFor="pp-sep" className="block text-xs uppercase mb-1">
            Separador
          </label>
          <select id="pp-sep" className="input" value={sep} onChange={(e) => setSep(e.target.value)}>
            {SEPARATORS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={capitalize} onChange={(e) => setCapitalize(e.target.checked)} />
          Mayúscula inicial
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={addNumber} onChange={(e) => setAddNumber(e.target.checked)} />
          Añadir número
        </label>
      </div>

      <div className="card !p-3">
        <div className="text-sm">
          <span className="text-[color:var(--color-fg-soft)]">Entropía:</span> ~{bits} bits · {strength}
        </div>
        <div className="text-sm text-[color:var(--color-fg-soft)] mt-1">
          Una frase de 4 palabras es más difícil de romper y mucho más fácil de recordar que algo como
          «Xk9!p2$». Se genera con <span className="font-mono">crypto.getRandomValues</span> en tu navegador y
          no viaja a ningún servidor.
        </div>
      </div>
    </div>
  );
}
