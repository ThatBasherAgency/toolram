"use client";
import { useState } from "react";

export function UrlEncodeTool() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  return (
    <div className="space-y-3">
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs uppercase mb-1">Texto</label>
          <textarea rows={6} className="input" value={a} onChange={(e) => setA(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs uppercase mb-1">URL Encoded</label>
          <textarea rows={6} className="input" value={b} onChange={(e) => setB(e.target.value)} />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setB(encodeURIComponent(a))} className="btn btn-primary">Codificar →</button>
        <button onClick={() => { try { setA(decodeURIComponent(b)); } catch {} }} className="btn btn-primary">← Decodificar</button>
      </div>
    </div>
  );
}
