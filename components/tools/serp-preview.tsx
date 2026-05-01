"use client";
import { useState } from "react";

export function SerpPreview() {
  const [title, setTitle] = useState("Toolram — Herramientas online gratis");
  const [url, setUrl] = useState("https://toolram.com/herramientas");
  const [desc, setDesc] = useState("Más de 30 herramientas privacy-first sin instalar nada: PDF, símbolos, calculadoras, tests, generadores y mucho más.");

  const titleLen = title.length;
  const descLen = desc.length;
  const titlePxApprox = title.length * 7.5;
  const truncTitle = titlePxApprox > 600 ? title.slice(0, 60) + "…" : title;
  const truncDesc = desc.length > 160 ? desc.slice(0, 160) + "…" : desc;
  let host = "";
  try { host = new URL(url).hostname; } catch {}
  const path = (() => { try { return new URL(url).pathname; } catch { return ""; } })();

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-3">
        <label className="block text-sm md:col-span-2">
          Título <span className={`text-xs ${titleLen > 60 ? "text-[color:var(--color-danger)]" : titleLen < 30 ? "text-[color:var(--color-warning)]" : "text-[color:var(--color-success)]"}`}>{titleLen}/60</span>
          <input className="input mt-1" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label className="block text-sm">URL<input className="input mt-1" value={url} onChange={(e) => setUrl(e.target.value)} /></label>
      </div>
      <label className="block text-sm">
        Descripción <span className={`text-xs ${descLen > 160 ? "text-[color:var(--color-danger)]" : descLen < 80 ? "text-[color:var(--color-warning)]" : "text-[color:var(--color-success)]"}`}>{descLen}/160</span>
        <textarea className="input mt-1" rows={3} value={desc} onChange={(e) => setDesc(e.target.value)} />
      </label>
      <div className="card !p-4 bg-white text-black">
        <div className="text-xs uppercase text-gray-500 mb-3">Vista previa Google (escritorio)</div>
        <div className="border-l-2 border-gray-200 pl-3">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">🌐</div>
            <div>
              <div className="text-[#202124] text-sm font-normal">{host}</div>
              <div className="text-xs text-[#5f6368]">{host}{path}</div>
            </div>
          </div>
          <div className="mt-1 text-[#1a0dab] text-xl leading-snug font-normal hover:underline cursor-pointer">{truncTitle}</div>
          <div className="text-sm text-[#4d5156] leading-relaxed mt-1">{truncDesc}</div>
        </div>
      </div>
      <div className="card !p-3 text-xs space-y-1 text-[color:var(--color-fg-soft)]">
        <div>📏 <strong>Título óptimo:</strong> 50-60 caracteres (~600px)</div>
        <div>📏 <strong>Description óptima:</strong> 140-160 caracteres</div>
        <div>📏 <strong>Móvil:</strong> Google trunca antes — apuntá a 78 chars en title móvil</div>
      </div>
    </div>
  );
}
