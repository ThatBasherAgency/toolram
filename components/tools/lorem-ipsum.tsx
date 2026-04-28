"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(" ");

function randomSentence() {
  const len = 8 + Math.floor(Math.random() * 12);
  const ws = Array.from({ length: len }, () => WORDS[Math.floor(Math.random() * WORDS.length)]);
  ws[0] = ws[0][0].toUpperCase() + ws[0].slice(1);
  return ws.join(" ") + ".";
}
function randomParagraph() {
  const sentences = 4 + Math.floor(Math.random() * 4);
  return Array.from({ length: sentences }, randomSentence).join(" ");
}

export function LoremIpsum() {
  const [count, setCount] = useState(3);
  const [unit, setUnit] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  function generate() {
    let out = "";
    if (unit === "paragraphs") out = Array.from({ length: count }, randomParagraph).join("\n\n");
    else if (unit === "sentences") out = Array.from({ length: count }, randomSentence).join(" ");
    else out = Array.from({ length: count }, () => WORDS[Math.floor(Math.random() * WORDS.length)]).join(" ");
    setOutput(out);
  }

  async function copy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-end">
        <div>
          <label className="text-xs uppercase block mb-1">Cantidad</label>
          <input type="number" min={1} max={50} className="input w-24" value={count} onChange={(e) => setCount(Math.max(1, parseInt(e.target.value || "1")))} />
        </div>
        <div>
          <label className="text-xs uppercase block mb-1">Unidad</label>
          <select className="input w-40" value={unit} onChange={(e) => setUnit(e.target.value as never)}>
            <option value="paragraphs">Párrafos</option>
            <option value="sentences">Oraciones</option>
            <option value="words">Palabras</option>
          </select>
        </div>
        <button onClick={generate} className="btn btn-primary">Generar</button>
        <button onClick={copy} disabled={!output} className="btn btn-ghost">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <textarea className="input" rows={10} value={output} readOnly placeholder="El texto generado aparecerá aquí…" />
    </div>
  );
}
