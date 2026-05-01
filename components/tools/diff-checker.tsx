"use client";
import { useMemo, useState } from "react";

function diffLines(a: string, b: string) {
  const al = a.split("\n");
  const bl = b.split("\n");
  const m = al.length, n = bl.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] = al[i] === bl[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const out: { type: "eq" | "del" | "add"; line: string }[] = [];
  let i = 0, j = 0;
  while (i < m && j < n) {
    if (al[i] === bl[j]) { out.push({ type: "eq", line: al[i] }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { out.push({ type: "del", line: al[i] }); i++; }
    else { out.push({ type: "add", line: bl[j] }); j++; }
  }
  while (i < m) out.push({ type: "del", line: al[i++] });
  while (j < n) out.push({ type: "add", line: bl[j++] });
  return out;
}

export function DiffChecker() {
  const [a, setA] = useState("línea 1\nlínea 2\nlínea 3 original\nlínea 4");
  const [b, setB] = useState("línea 1\nlínea 2\nlínea 3 modificada\nlínea 4\nlínea 5 nueva");

  const diff = useMemo(() => diffLines(a, b), [a, b]);
  const adds = diff.filter((d) => d.type === "add").length;
  const dels = diff.filter((d) => d.type === "del").length;

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-3">
        <label className="block text-sm">Texto original<textarea className="input font-mono mt-1" rows={8} value={a} onChange={(e) => setA(e.target.value)} /></label>
        <label className="block text-sm">Texto modificado<textarea className="input font-mono mt-1" rows={8} value={b} onChange={(e) => setB(e.target.value)} /></label>
      </div>
      <div className="flex gap-3 text-sm">
        <span className="text-[color:var(--color-success)]">+{adds} agregadas</span>
        <span className="text-[color:var(--color-danger)]">−{dels} eliminadas</span>
      </div>
      <div className="card !p-3 font-mono text-xs space-y-0.5 max-h-96 overflow-auto">
        {diff.map((d, i) => (
          <div key={i} className={d.type === "add" ? "bg-green-500/10 text-[color:var(--color-success)]" : d.type === "del" ? "bg-red-500/10 text-[color:var(--color-danger)] line-through" : "text-[color:var(--color-fg-soft)]"}>
            <span className="select-none mr-2 opacity-60">{d.type === "add" ? "+" : d.type === "del" ? "−" : " "}</span>
            {d.line || " "}
          </div>
        ))}
      </div>
    </div>
  );
}
