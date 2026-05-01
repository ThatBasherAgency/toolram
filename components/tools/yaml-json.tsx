"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

function parseYaml(text: string): unknown {
  const lines = text.split("\n").filter((l) => l.trim() && !l.trim().startsWith("#"));
  const root: Record<string, unknown> = {};
  const stack: { obj: Record<string, unknown> | unknown[]; indent: number }[] = [{ obj: root, indent: -1 }];
  for (const line of lines) {
    const indent = line.match(/^ */)?.[0].length ?? 0;
    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) stack.pop();
    const content = line.trim();
    if (content.startsWith("- ")) {
      const parent = stack[stack.length - 1].obj;
      if (!Array.isArray(parent)) throw new Error("YAML inválido: lista sobre objeto");
      const v = content.slice(2).trim();
      if (v.includes(":")) {
        const [k, ...rest] = v.split(":");
        const o: Record<string, unknown> = {};
        if (rest.join(":").trim()) o[k.trim()] = parseValue(rest.join(":").trim());
        parent.push(o);
        stack.push({ obj: o, indent });
      } else {
        parent.push(parseValue(v));
      }
    } else if (content.includes(":")) {
      const [k, ...rest] = content.split(":");
      const value = rest.join(":").trim();
      const parent = stack[stack.length - 1].obj as Record<string, unknown>;
      if (!value) {
        const next: Record<string, unknown> | unknown[] = {};
        parent[k.trim()] = next;
        stack.push({ obj: next, indent });
      } else if (value === "[]") {
        const arr: unknown[] = [];
        parent[k.trim()] = arr;
        stack.push({ obj: arr, indent });
      } else {
        parent[k.trim()] = parseValue(value);
      }
    }
  }
  return root;
}

function parseValue(v: string): unknown {
  if (v === "true") return true;
  if (v === "false") return false;
  if (v === "null" || v === "~") return null;
  if (/^-?\d+$/.test(v)) return parseInt(v, 10);
  if (/^-?\d*\.\d+$/.test(v)) return parseFloat(v);
  return v.replace(/^["']|["']$/g, "");
}

function jsonToYaml(obj: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);
  if (obj === null) return "null";
  if (typeof obj !== "object") return String(obj);
  if (Array.isArray(obj)) {
    return obj.map((v) => `${pad}- ${typeof v === "object" && v !== null ? "\n" + jsonToYaml(v, indent + 1) : jsonToYaml(v, 0)}`).join("\n");
  }
  return Object.entries(obj as Record<string, unknown>).map(([k, v]) => {
    if (typeof v === "object" && v !== null) return `${pad}${k}:\n${jsonToYaml(v, indent + 1)}`;
    return `${pad}${k}: ${jsonToYaml(v, 0)}`;
  }).join("\n");
}

export function YamlJsonConverter() {
  const [yaml, setYaml] = useState("nombre: Toolram\nversion: 1.0\nfeatures:\n  - tools\n  - calculadoras\n  - simbolos\nprivacy:\n  client_side: true\n  uploads: false");
  const [json, setJson] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<"yaml" | "json" | null>(null);

  function yamlToJson() {
    setError("");
    try {
      const obj = parseYaml(yaml);
      setJson(JSON.stringify(obj, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }
  function reverseTo() {
    setError("");
    try {
      const obj = JSON.parse(json);
      setYaml(jsonToYaml(obj));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }
  async function copy(k: "yaml" | "json", v: string) {
    await navigator.clipboard.writeText(v);
    setCopied(k);
    setTimeout(() => setCopied(null), 1200);
  }

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-3">
        <div className="card !p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase text-[color:var(--color-fg-soft)]">YAML</span>
            <button onClick={() => copy("yaml", yaml)} className="btn btn-ghost h-6 !px-2 text-xs">{copied === "yaml" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}</button>
          </div>
          <textarea className="input font-mono text-xs" rows={10} value={yaml} onChange={(e) => setYaml(e.target.value)} />
        </div>
        <div className="card !p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase text-[color:var(--color-fg-soft)]">JSON</span>
            <button onClick={() => copy("json", json)} className="btn btn-ghost h-6 !px-2 text-xs">{copied === "json" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}</button>
          </div>
          <textarea className="input font-mono text-xs" rows={10} value={json} onChange={(e) => setJson(e.target.value)} />
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={yamlToJson} className="btn btn-primary flex-1">YAML → JSON</button>
        <button onClick={reverseTo} className="btn btn-primary flex-1">JSON → YAML</button>
      </div>
      {error && <div className="card !p-3 text-sm text-[color:var(--color-danger)]">⚠️ {error}</div>}
      <div className="card !p-3 text-xs text-[color:var(--color-fg-soft)]">El parser YAML soporta tipos básicos, listas y objetos anidados. Para sintaxis avanzada (anchors, multi-line strings) se recomienda un parser server-side.</div>
    </div>
  );
}
