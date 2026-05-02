"use client";
import { useMemo, useState } from "react";
import { Cake, Calendar, Clock, Star } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.2 320)";

const ZODIAC = [
  { sign: "Capricornio", emoji: "♑", from: [12, 22], to: [1, 19] },
  { sign: "Acuario", emoji: "♒", from: [1, 20], to: [2, 18] },
  { sign: "Piscis", emoji: "♓", from: [2, 19], to: [3, 20] },
  { sign: "Aries", emoji: "♈", from: [3, 21], to: [4, 19] },
  { sign: "Tauro", emoji: "♉", from: [4, 20], to: [5, 20] },
  { sign: "Géminis", emoji: "♊", from: [5, 21], to: [6, 20] },
  { sign: "Cáncer", emoji: "♋", from: [6, 21], to: [7, 22] },
  { sign: "Leo", emoji: "♌", from: [7, 23], to: [8, 22] },
  { sign: "Virgo", emoji: "♍", from: [8, 23], to: [9, 22] },
  { sign: "Libra", emoji: "♎", from: [9, 23], to: [10, 22] },
  { sign: "Escorpio", emoji: "♏", from: [10, 23], to: [11, 21] },
  { sign: "Sagitario", emoji: "♐", from: [11, 22], to: [12, 21] }
];

function getZodiac(month: number, day: number) {
  for (const z of ZODIAC) {
    if (z.from[0] === z.to[0]) continue;
    if ((month === z.from[0] && day >= z.from[1]) || (month === z.to[0] && day <= z.to[1])) return z;
  }
  return ZODIAC[0];
}

const CHINESE = ["Mono", "Gallo", "Perro", "Cerdo", "Rata", "Buey", "Tigre", "Conejo", "Dragón", "Serpiente", "Caballo", "Cabra"];
function getChineseZodiac(year: number) {
  return CHINESE[year % 12];
}

export function AgeCalculator() {
  const [birth, setBirth] = useState("");
  const [target, setTarget] = useState(new Date().toISOString().slice(0, 10));

  const result = useMemo(() => {
    if (!birth) return null;
    const b = new Date(birth);
    const t = new Date(target);
    if (isNaN(b.getTime()) || isNaN(t.getTime()) || b > t) return null;

    let years = t.getFullYear() - b.getFullYear();
    let months = t.getMonth() - b.getMonth();
    let days = t.getDate() - b.getDate();
    if (days < 0) {
      months--;
      const lastMonth = new Date(t.getFullYear(), t.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) { years--; months += 12; }

    const totalMs = t.getTime() - b.getTime();
    const totalDays = Math.floor(totalMs / 86400000);
    const totalHours = Math.floor(totalMs / 3600000);
    const totalMinutes = Math.floor(totalMs / 60000);
    const totalSeconds = Math.floor(totalMs / 1000);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    const z = getZodiac(b.getMonth() + 1, b.getDate());
    const chinese = getChineseZodiac(b.getFullYear());

    // Next birthday
    const nextBday = new Date(t.getFullYear(), b.getMonth(), b.getDate());
    if (nextBday < t) nextBday.setFullYear(t.getFullYear() + 1);
    const daysToBirthday = Math.ceil((nextBday.getTime() - t.getTime()) / 86400000);

    return { years, months, days, totalDays, totalHours, totalMinutes, totalSeconds, totalWeeks, totalMonths, zodiac: z, chinese, daysToBirthday, nextBday, weekday: b.toLocaleDateString("es", { weekday: "long" }) };
  }, [birth, target]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Calculadora de Edad</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Tu edad exacta en años, meses, días, horas y segundos. Más signo zodiacal, día de la semana en que naciste y cuántos días faltan para tu cumpleaños.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6">
        <div className="grid md:grid-cols-2 gap-5">
          <label className="block">
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] flex items-center gap-1.5"><Cake className="w-3.5 h-3.5" /> Fecha de nacimiento</span>
            <input type="date" className="w-full mt-1.5 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-base focus:outline-none focus:border-[color:var(--color-brand)]" value={birth} onChange={(e) => setBirth(e.target.value)} max={target} />
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Calcular hasta</span>
            <input type="date" className="w-full mt-1.5 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-base focus:outline-none focus:border-[color:var(--color-brand)]" value={target} onChange={(e) => setTarget(e.target.value)} />
          </label>
        </div>
      </div>

      {!result && (
        <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-12 text-center text-[color:var(--color-fg-soft)]">
          <Cake className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Ingresá tu fecha de nacimiento para ver tu edad detallada</p>
        </div>
      )}

      {result && (
        <>
          <div className="rounded-3xl p-8 md:p-10 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 60%, black))` }}>
            <div className="text-xs uppercase opacity-80 tracking-widest mb-2">Tu edad exacta</div>
            <div className="text-5xl md:text-7xl font-extrabold tabular-nums tracking-tight">{result.years} años</div>
            <div className="text-lg md:text-xl opacity-90 mt-2">{result.months} meses · {result.days} días</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            <Stat label="Meses totales" value={result.totalMonths.toLocaleString("es")} />
            <Stat label="Semanas totales" value={result.totalWeeks.toLocaleString("es")} />
            <Stat label="Días vividos" value={result.totalDays.toLocaleString("es")} />
            <Stat label="Horas" value={result.totalHours.toLocaleString("es")} />
            <Stat label="Minutos" value={result.totalMinutes.toLocaleString("es")} />
            <Stat label="Segundos" value={result.totalSeconds.toLocaleString("es")} />
          </div>

          <AdSlot slot="age_inline" format="auto" minHeight={180} className="mb-6" />

          <div className="grid md:grid-cols-2 gap-3 mb-6">
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5">
              <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] mb-2 flex items-center gap-1.5"><Star className="w-3.5 h-3.5" /> Signo zodiacal</div>
              <div className="text-3xl md:text-4xl font-extrabold flex items-center gap-3">
                <span>{result.zodiac.emoji}</span>
                <span>{result.zodiac.sign}</span>
              </div>
              <div className="text-xs text-[color:var(--color-fg-soft)] mt-1">Horóscopo chino: <strong>{result.chinese}</strong></div>
            </div>
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5">
              <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] mb-2 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Día de la semana</div>
              <div className="text-2xl md:text-3xl font-extrabold capitalize">{result.weekday}</div>
              <div className="text-xs text-[color:var(--color-fg-soft)] mt-1">Día en que naciste</div>
            </div>
          </div>

          <div className="rounded-2xl p-5 text-white text-center" style={{ background: ACCENT }}>
            <div className="text-xs uppercase opacity-80 tracking-widest mb-1">🎂 Próximo cumpleaños</div>
            <div className="text-3xl md:text-4xl font-extrabold">
              {result.daysToBirthday === 0 ? "¡Hoy!" : `Faltan ${result.daysToBirthday} días`}
            </div>
            <div className="text-sm opacity-90 mt-1">{result.nextBday.toLocaleDateString("es", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
          </div>
        </>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[color:var(--color-bg-soft)] p-4 text-center">
      <div className="text-2xl md:text-3xl font-extrabold tabular-nums">{value}</div>
      <div className="text-xs text-[color:var(--color-fg-soft)] uppercase mt-1">{label}</div>
    </div>
  );
}
