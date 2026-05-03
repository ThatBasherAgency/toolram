"use client";
import { useMemo, useState } from "react";
import { User, RefreshCw, Copy, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 25)";

const NAMES_M = ["Mateo","Santiago","Sebastián","Lucas","Diego","Daniel","Nicolás","Joaquín","Tomás","Benjamín","Emilio","Martín","Alejandro","Gabriel","Ignacio","Maximiliano","Bruno","Felipe","Andrés","Pablo","Carlos","Ricardo","Roberto","Fernando","Javier","Cristóbal","Leonardo","Eduardo","Antonio","Luis","Gonzalo","Esteban","Adrián","Hugo","Manuel","Rodrigo","Vicente","Agustín","Iván","Camilo"];
const NAMES_F = ["Sofía","Valentina","Camila","Isabella","Lucía","Mariana","Martina","Emilia","Renata","Antonella","Victoria","Catalina","Florencia","Constanza","Macarena","Daniela","Andrea","Carolina","Paula","Ana","María","Laura","Patricia","Mónica","Verónica","Silvia","Rosa","Beatriz","Elena","Natalia","Adriana","Gabriela","Fernanda","Luciana","Belén","Camila","Inés","Pilar","Alba","Clara"];
const SURNAMES = ["García","Rodríguez","González","Fernández","López","Martínez","Sánchez","Pérez","Gómez","Martín","Jiménez","Ruiz","Hernández","Díaz","Moreno","Álvarez","Romero","Alonso","Gutiérrez","Navarro","Torres","Domínguez","Vázquez","Ramos","Gil","Ramírez","Serrano","Blanco","Molina","Morales","Suárez","Ortega","Delgado","Castro","Ortiz","Rubio","Sanz","Núñez","Iglesias","Medina","Cortés","Castillo","Garrido","Soto","Vargas","Aguilar","Marín","Reyes","Cruz","Cabrera"];
const TITLES = ["Lic.","Ing.","Dr.","Mtro.","Arq.","Cdr."];

function rand<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

type Gender = "m" | "f" | "any";

export function NameGenerator() {
  const [gender, setGender] = useState<Gender>("any");
  const [count, setCount] = useState(10);
  const [withTitle, setWithTitle] = useState(false);
  const [withSecond, setWithSecond] = useState(true);
  const [seed, setSeed] = useState(0);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const names = useMemo(() => {
    void seed;
    return Array.from({ length: count }, () => {
      const g = gender === "any" ? (Math.random() < 0.5 ? "m" : "f") : gender;
      const first = rand(g === "m" ? NAMES_M : NAMES_F);
      const second = withSecond ? rand(g === "m" ? NAMES_M : NAMES_F) : "";
      const sur1 = rand(SURNAMES);
      const sur2 = rand(SURNAMES);
      const title = withTitle ? rand(TITLES) + " " : "";
      return `${title}${first}${second ? " " + second : ""} ${sur1} ${sur2}`;
    });
  }, [gender, count, withTitle, withSecond, seed]);

  async function copy(name: string, i: number) {
    await navigator.clipboard.writeText(name);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 1200);
  }
  async function copyAll() {
    await navigator.clipboard.writeText(names.join("\n"));
    setCopiedIdx(-1);
    setTimeout(() => setCopiedIdx(null), 1200);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador de Nombres LATAM</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Nombres y apellidos hispanos aleatorios · Para personajes, testing, datos demo.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] block mb-1.5">Género</span>
            <div className="grid grid-cols-3 gap-1">
              {(["any", "m", "f"] as Gender[]).map((g) => (
                <button key={g} onClick={() => setGender(g)} className="px-2 py-2 rounded-md text-xs font-bold transition" style={gender === g ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>
                  {g === "any" ? "Cualquiera" : g === "m" ? "Hombre" : "Mujer"}
                </button>
              ))}
            </div>
          </div>
          <label className="block">
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Cantidad: {count}</span>
            <input type="range" min="1" max="50" value={count} onChange={(e) => setCount(+e.target.value)} className="w-full mt-2" />
          </label>
        </div>

        <div className="flex gap-2">
          <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-bg-soft)] cursor-pointer text-sm">
            <input type="checkbox" checked={withSecond} onChange={(e) => setWithSecond(e.target.checked)} /> Segundo nombre
          </label>
          <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-bg-soft)] cursor-pointer text-sm">
            <input type="checkbox" checked={withTitle} onChange={(e) => setWithTitle(e.target.checked)} /> Título profesional
          </label>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setSeed((s) => s + 1)} className="flex-1 px-6 py-3 rounded-xl text-white font-bold inline-flex items-center justify-center gap-2" style={{ background: ACCENT }}>
            <RefreshCw className="w-4 h-4" /> Generar
          </button>
          <button onClick={copyAll} className="px-4 py-3 rounded-xl bg-[color:var(--color-bg-soft)] font-bold inline-flex items-center gap-2">
            {copiedIdx === -1 ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} Copiar todos
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] divide-y divide-[color:var(--color-border)] mb-6">
        {names.map((name, i) => (
          <button key={i + name} onClick={() => copy(name, i)} className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-[color:var(--color-bg-soft)] transition">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-[color:var(--color-fg-soft)]" />
              <span className="font-semibold">{name}</span>
            </div>
            {copiedIdx === i ? <Check className="w-4 h-4 text-[color:var(--color-success)]" /> : <Copy className="w-4 h-4 text-[color:var(--color-fg-soft)]" />}
          </button>
        ))}
      </div>

      <AdSlot slot="namegen_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">📚 Casos de uso</strong>
        <ul className="space-y-1">
          <li>• Personajes para libros, guiones, juegos de rol.</li>
          <li>• Datos demo en bases de datos de prueba (NUNCA datos reales).</li>
          <li>• Testimonios de stock para mockups de diseño.</li>
          <li>• Nombres para NPCs en videojuegos.</li>
        </ul>
      </div>
    </div>
  );
}
