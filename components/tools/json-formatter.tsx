"use client";
import { useState } from "react";

export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function format(min = false) {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, min ? 0 : 2));
      setError("");
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs uppercase mb-1">Entrada</label>
          <textarea rows={14} className="input" value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"hello":"world"}' />
        </div>
        <div>
          <label className="block text-xs uppercase mb-1">Salida</label>
          <textarea rows={14} className="input" value={output} readOnly placeholder="Resultado…" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => format(false)} className="btn btn-primary">Formatear (pretty)</button>
        <button onClick={() => format(true)} className="btn btn-ghost">Minificar</button>
        <button onClick={() => { setInput(""); setOutput(""); setError(""); }} className="btn btn-ghost">Limpiar</button>
      </div>
      {error && <div className="card !p-3 text-sm text-[color:var(--color-danger)] border-[color:var(--color-danger)]">⚠ {error}</div>}
    </div>
  );
}
