"use client";
import { useState } from "react";

export function Base64Tool() {
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");
  const [error, setError] = useState("");

  function encode() {
    try {
      setEncoded(btoa(unescape(encodeURIComponent(text))));
      setError("");
    } catch (e: any) {
      setError(e.message);
    }
  }
  function decode() {
    try {
      setText(decodeURIComponent(escape(atob(encoded))));
      setError("");
    } catch (e: any) {
      setError("Base64 inválido");
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs uppercase mb-1">Texto plano</label>
          <textarea rows={8} className="input" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs uppercase mb-1">Base64</label>
          <textarea rows={8} className="input" value={encoded} onChange={(e) => setEncoded(e.target.value)} />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={encode} className="btn btn-primary">Texto → Base64</button>
        <button onClick={decode} className="btn btn-primary">Base64 → Texto</button>
      </div>
      {error && <div className="text-sm text-[color:var(--color-danger)]">{error}</div>}
    </div>
  );
}
