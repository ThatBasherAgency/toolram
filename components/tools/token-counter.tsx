"use client";
import { useMemo, useState } from "react";

const MODELS = [
  { id: "gpt-4o", name: "GPT-4o / GPT-4 Turbo", ctx: 128000, costIn: 2.5, costOut: 10, charsPerToken: 4 },
  { id: "gpt-4-mini", name: "GPT-4o mini", ctx: 128000, costIn: 0.15, costOut: 0.6, charsPerToken: 4 },
  { id: "claude-opus", name: "Claude Opus 4.x", ctx: 200000, costIn: 15, costOut: 75, charsPerToken: 3.6 },
  { id: "claude-sonnet", name: "Claude Sonnet 4.x", ctx: 200000, costIn: 3, costOut: 15, charsPerToken: 3.6 },
  { id: "claude-haiku", name: "Claude Haiku 4.5", ctx: 200000, costIn: 1, costOut: 5, charsPerToken: 3.6 },
  { id: "gemini-15-pro", name: "Gemini 1.5 Pro", ctx: 2000000, costIn: 1.25, costOut: 5, charsPerToken: 4 }
];

export function TokenCounter() {
  const [text, setText] = useState("Toolram es un portal de herramientas online gratis. Procesa todo en tu navegador, sin uploads ni registro.");
  const [model, setModel] = useState(MODELS[0]);

  const stats = useMemo(() => {
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const tokens = Math.ceil(chars / model.charsPerToken);
    const ctxPct = (tokens / model.ctx) * 100;
    const costInUsd = (tokens / 1_000_000) * model.costIn;
    const costOutUsd = (tokens / 1_000_000) * model.costOut;
    return { chars, words, tokens, ctxPct, costInUsd, costOutUsd };
  }, [text, model]);

  return (
    <div className="space-y-4">
      <div className="card !p-3 text-xs">📊 Estimación basada en chars/token promedio. La tokenización real depende del modelo (BPE para GPT, sentencepiece para Gemini).</div>
      <textarea className="input" rows={6} placeholder="Pegá tu texto…" value={text} onChange={(e) => setText(e.target.value)} />
      <label className="block text-sm">Modelo
        <select className="input mt-1" value={model.id} onChange={(e) => setModel(MODELS.find((m) => m.id === e.target.value) ?? MODELS[0])}>
          {MODELS.map((m) => <option key={m.id} value={m.id}>{m.name} ({m.ctx.toLocaleString()} ctx)</option>)}
        </select>
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="card !p-3 text-center"><div className="text-2xl font-bold text-[color:var(--color-brand)]">{stats.tokens.toLocaleString()}</div><div className="text-xs uppercase">Tokens (est)</div></div>
        <div className="card !p-3 text-center"><div className="text-2xl font-bold text-[color:var(--color-brand)]">{stats.words.toLocaleString()}</div><div className="text-xs uppercase">Palabras</div></div>
        <div className="card !p-3 text-center"><div className="text-2xl font-bold text-[color:var(--color-brand)]">{stats.chars.toLocaleString()}</div><div className="text-xs uppercase">Caracteres</div></div>
        <div className="card !p-3 text-center"><div className={`text-2xl font-bold ${stats.ctxPct > 90 ? "text-[color:var(--color-danger)]" : stats.ctxPct > 50 ? "text-[color:var(--color-warning)]" : "text-[color:var(--color-success)]"}`}>{stats.ctxPct.toFixed(2)}%</div><div className="text-xs uppercase">Del context</div></div>
      </div>
      <div className="card !p-3">
        <div className="text-xs uppercase text-[color:var(--color-fg-soft)] mb-2">Costo estimado</div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>📥 <strong>Como input:</strong> ${stats.costInUsd.toFixed(6)} USD <span className="text-[color:var(--color-fg-soft)]">(${model.costIn}/M)</span></div>
          <div>📤 <strong>Como output:</strong> ${stats.costOutUsd.toFixed(6)} USD <span className="text-[color:var(--color-fg-soft)]">(${model.costOut}/M)</span></div>
        </div>
      </div>
    </div>
  );
}
