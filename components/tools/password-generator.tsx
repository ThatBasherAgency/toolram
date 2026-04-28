"use client";
import { useEffect, useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}<>?/.,:;"
};
const AMBIGUOUS = "0Ol1I|`'\"";

export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ lower: true, upper: true, digits: true, symbols: true, noAmbig: true });
  const [pw, setPw] = useState("");
  const [copied, setCopied] = useState(false);

  function generate() {
    let pool = "";
    for (const k of Object.keys(SETS) as (keyof typeof SETS)[]) if (opts[k]) pool += SETS[k];
    if (opts.noAmbig) pool = pool.split("").filter((c) => !AMBIGUOUS.includes(c)).join("");
    if (!pool) return setPw("");
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    setPw(Array.from(arr, (n) => pool[n % pool.length]).join(""));
  }

  useEffect(() => {
    generate();
  }, []);

  async function copy() {
    await navigator.clipboard.writeText(pw);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  const strength = pw.length >= 16 ? "Fuerte" : pw.length >= 12 ? "Media" : pw.length > 0 ? "Débil" : "—";
  const strengthColor =
    strength === "Fuerte" ? "var(--color-success)" : strength === "Media" ? "var(--color-warning)" : "var(--color-danger)";

  return (
    <div className="space-y-4">
      <div className="card !p-3 flex items-center gap-2">
        <code className="flex-1 break-all font-mono text-sm">{pw}</code>
        <button onClick={generate} className="btn btn-ghost !p-2" aria-label="Regenerar">
          <RefreshCw className="w-4 h-4" />
        </button>
        <button onClick={copy} className="btn btn-primary !py-2">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? "Copiada" : "Copiar"}
        </button>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span>Fortaleza:</span>
        <span className="font-bold" style={{ color: strengthColor }}>{strength}</span>
      </div>
      <div>
        <label className="block text-sm mb-1">Longitud: <strong>{length}</strong></label>
        <input type="range" min={6} max={64} value={length} onChange={(e) => setLength(parseInt(e.target.value))} className="w-full" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-sm">
        {(Object.keys(opts) as (keyof typeof opts)[]).map((k) => (
          <label key={k} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={opts[k]} onChange={(e) => setOpts({ ...opts, [k]: e.target.checked })} />
            {k === "lower" ? "abc" : k === "upper" ? "ABC" : k === "digits" ? "123" : k === "symbols" ? "!@#" : "Sin ambiguos"}
          </label>
        ))}
      </div>
    </div>
  );
}
