export type CalcField =
  | { type: "number"; key: string; label: string; suffix?: string; default?: number; step?: number; min?: number; max?: number }
  | { type: "select"; key: string; label: string; options: { value: string; label: string }[]; default?: string }
  | { type: "date"; key: string; label: string };

export type CalcResult = { label: string; value: string; emphasized?: boolean };

export type Calculator = {
  slug: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  keywords: string[];
  fields: CalcField[];
  compute: (vals: Record<string, string | number>) => CalcResult[];
  faqs?: { q: string; a: string }[];
};

const fmt = (n: number, d = 2) => new Intl.NumberFormat("es-MX", { maximumFractionDigits: d, minimumFractionDigits: d }).format(n);
const money = (n: number, c = "MXN") => new Intl.NumberFormat("es-MX", { style: "currency", currency: c }).format(n);

export const CALCULATORS: Calculator[] = [
  {
    slug: "calculadora-imc",
    name: "Calculadora de IMC",
    shortDesc: "Calcula tu Índice de Masa Corporal y nivel saludable.",
    longDesc: "El IMC (Índice de Masa Corporal) es una medida de la relación entre tu peso y tu altura. Es un primer indicador para detectar bajo peso, normalidad, sobrepeso u obesidad. Recordá: el IMC no distingue masa muscular de grasa, así que es solo orientativo.",
    keywords: ["calculadora imc", "indice masa corporal", "bmi calculator"],
    fields: [
      { type: "number", key: "peso", label: "Peso", suffix: "kg", default: 70, step: 0.1 },
      { type: "number", key: "altura", label: "Altura", suffix: "cm", default: 170, step: 0.5 }
    ],
    compute: (v) => {
      const peso = +v.peso, alt = +v.altura / 100;
      const imc = peso / (alt * alt);
      let cat = "";
      if (imc < 18.5) cat = "Bajo peso";
      else if (imc < 25) cat = "Normal";
      else if (imc < 30) cat = "Sobrepeso";
      else if (imc < 35) cat = "Obesidad I";
      else if (imc < 40) cat = "Obesidad II";
      else cat = "Obesidad III";
      return [
        { label: "IMC", value: fmt(imc, 1), emphasized: true },
        { label: "Categoría", value: cat }
      ];
    }
  },
  {
    slug: "calculadora-edad",
    name: "Calculadora de edad",
    shortDesc: "Calcula tu edad exacta en años, meses, días, horas y minutos.",
    longDesc: "Ingresá tu fecha de nacimiento y obtené tu edad descompuesta en años, meses, días, total de días vividos y total de horas y minutos.",
    keywords: ["calculadora edad", "age calculator", "calcular edad"],
    fields: [
      { type: "date", key: "nacimiento", label: "Fecha de nacimiento" }
    ],
    compute: (v) => {
      const d = new Date(String(v.nacimiento));
      const now = new Date();
      if (isNaN(d.getTime()) || d > now) return [{ label: "Error", value: "Fecha inválida" }];
      let years = now.getFullYear() - d.getFullYear();
      let months = now.getMonth() - d.getMonth();
      let days = now.getDate() - d.getDate();
      if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
      if (months < 0) { years--; months += 12; }
      const totalDays = Math.floor((+now - +d) / 86400000);
      const totalHours = Math.floor((+now - +d) / 3600000);
      return [
        { label: "Edad", value: `${years} años, ${months} meses, ${days} días`, emphasized: true },
        { label: "Total de días vividos", value: fmt(totalDays, 0) },
        { label: "Total de horas", value: fmt(totalHours, 0) },
        { label: "Total de minutos", value: fmt(Math.floor((+now - +d) / 60000), 0) }
      ];
    }
  },
  {
    slug: "calculadora-prestamo",
    name: "Calculadora de préstamo",
    shortDesc: "Calcula la cuota mensual, total a pagar y intereses de un préstamo.",
    longDesc: "Simulación de préstamo a tasa fija con cuota nivelada (sistema francés). Ingresá monto, plazo en meses y tasa anual nominal.",
    keywords: ["calculadora prestamo", "loan calculator", "cuota mensual"],
    fields: [
      { type: "number", key: "monto", label: "Monto del préstamo", suffix: "$", default: 100000, step: 1000 },
      { type: "number", key: "plazo", label: "Plazo", suffix: "meses", default: 24, step: 1, min: 1 },
      { type: "number", key: "tasa", label: "Tasa anual", suffix: "%", default: 12, step: 0.1 }
    ],
    compute: (v) => {
      const P = +v.monto, n = +v.plazo, i = +v.tasa / 100 / 12;
      if (i === 0) return [{ label: "Cuota mensual", value: money(P / n), emphasized: true }];
      const cuota = (P * i) / (1 - Math.pow(1 + i, -n));
      const total = cuota * n;
      return [
        { label: "Cuota mensual", value: money(cuota), emphasized: true },
        { label: "Total a pagar", value: money(total) },
        { label: "Intereses totales", value: money(total - P) }
      ];
    }
  },
  {
    slug: "calculadora-descuento",
    name: "Calculadora de descuento",
    shortDesc: "Calcula el precio final después de un descuento porcentual.",
    longDesc: "Ingresá precio original y porcentaje de descuento. Te muestra el precio final, cuánto ahorrás y precio de descuentos múltiples (escalonados).",
    keywords: ["calculadora descuento", "discount calculator", "calcular descuento"],
    fields: [
      { type: "number", key: "precio", label: "Precio original", suffix: "$", default: 1000, step: 0.01 },
      { type: "number", key: "porcentaje", label: "Descuento", suffix: "%", default: 20, step: 1, min: 0, max: 100 }
    ],
    compute: (v) => {
      const p = +v.precio, d = +v.porcentaje;
      const ahorro = (p * d) / 100;
      return [
        { label: "Precio final", value: money(p - ahorro), emphasized: true },
        { label: "Ahorro", value: money(ahorro) },
        { label: "Descuento aplicado", value: `${d}%` }
      ];
    }
  },
  {
    slug: "calculadora-porcentaje",
    name: "Calculadora de porcentaje",
    shortDesc: "Calcula porcentajes, aumentos, disminuciones y diferencias.",
    longDesc: "Resuelve tres tipos de cálculo: ¿qué es X% de Y?, ¿X es qué porcentaje de Y? y ¿qué porcentaje de cambio hay entre X e Y?",
    keywords: ["calculadora porcentaje", "percentage calculator", "calcular porcentaje"],
    fields: [
      { type: "number", key: "a", label: "Valor A", default: 50, step: 0.01 },
      { type: "number", key: "b", label: "Valor B", default: 200, step: 0.01 }
    ],
    compute: (v) => {
      const a = +v.a, b = +v.b;
      return [
        { label: `${a}% de ${b}`, value: fmt((a * b) / 100), emphasized: true },
        { label: `${a} es qué % de ${b}`, value: `${fmt((a / b) * 100)}%` },
        { label: `Cambio de ${a} a ${b}`, value: `${fmt(((b - a) / a) * 100)}%` }
      ];
    }
  },
  {
    slug: "calculadora-tdee",
    name: "Calculadora TDEE / calorías diarias",
    shortDesc: "Calcula tu gasto calórico total según edad, peso, sexo y actividad.",
    longDesc: "TDEE (Total Daily Energy Expenditure) estima cuántas calorías quemás por día. Usa la fórmula Mifflin-St Jeor para BMR y multiplica por tu nivel de actividad.",
    keywords: ["tdee calculator", "calorias diarias", "bmr calculator"],
    fields: [
      { type: "number", key: "edad", label: "Edad", suffix: "años", default: 30, step: 1, min: 1 },
      { type: "number", key: "peso", label: "Peso", suffix: "kg", default: 70, step: 0.1 },
      { type: "number", key: "altura", label: "Altura", suffix: "cm", default: 170, step: 0.5 },
      { type: "select", key: "sexo", label: "Sexo", options: [{ value: "m", label: "Hombre" }, { value: "f", label: "Mujer" }], default: "m" },
      { type: "select", key: "act", label: "Nivel de actividad", default: "1.55", options: [
        { value: "1.2", label: "Sedentario" }, { value: "1.375", label: "Ligero (1-3x/sem)" },
        { value: "1.55", label: "Moderado (3-5x/sem)" }, { value: "1.725", label: "Activo (6-7x/sem)" },
        { value: "1.9", label: "Muy activo (atleta)" }
      ] }
    ],
    compute: (v) => {
      const edad = +v.edad, peso = +v.peso, alt = +v.altura;
      const bmr = v.sexo === "m" ? 10 * peso + 6.25 * alt - 5 * edad + 5 : 10 * peso + 6.25 * alt - 5 * edad - 161;
      const tdee = bmr * +v.act;
      return [
        { label: "BMR (metabolismo basal)", value: `${fmt(bmr, 0)} kcal/día` },
        { label: "TDEE (mantenimiento)", value: `${fmt(tdee, 0)} kcal/día`, emphasized: true },
        { label: "Bajar peso (déficit 500)", value: `${fmt(tdee - 500, 0)} kcal/día` },
        { label: "Subir peso (superávit 300)", value: `${fmt(tdee + 300, 0)} kcal/día` }
      ];
    }
  },
  {
    slug: "calculadora-propina",
    name: "Calculadora de propina",
    shortDesc: "Divide la cuenta del restaurante con propina entre varias personas.",
    longDesc: "Ingresá total de la cuenta, % de propina y cantidad de personas. Te calcula propina total, total con propina, y monto por persona.",
    keywords: ["calculadora propina", "tip calculator", "dividir cuenta"],
    fields: [
      { type: "number", key: "cuenta", label: "Total de la cuenta", suffix: "$", default: 500, step: 0.01 },
      { type: "number", key: "tip", label: "Propina", suffix: "%", default: 10, step: 1 },
      { type: "number", key: "personas", label: "Personas", default: 2, step: 1, min: 1 }
    ],
    compute: (v) => {
      const c = +v.cuenta, t = +v.tip, p = +v.personas;
      const propina = (c * t) / 100;
      const total = c + propina;
      return [
        { label: "Propina", value: money(propina) },
        { label: "Total con propina", value: money(total), emphasized: true },
        { label: "Por persona", value: money(total / p) }
      ];
    }
  },
  {
    slug: "calculadora-interes-compuesto",
    name: "Interés compuesto",
    shortDesc: "Simula el crecimiento de tu inversión con interés compuesto.",
    longDesc: "Calcula cuánto será tu inversión inicial + aportes mensuales después de N años, con una tasa anual de interés compuesto.",
    keywords: ["interes compuesto", "compound interest", "inversion calculator"],
    fields: [
      { type: "number", key: "inicial", label: "Capital inicial", suffix: "$", default: 10000, step: 100 },
      { type: "number", key: "aporte", label: "Aporte mensual", suffix: "$", default: 1000, step: 100 },
      { type: "number", key: "tasa", label: "Tasa anual", suffix: "%", default: 8, step: 0.1 },
      { type: "number", key: "anos", label: "Años", default: 10, step: 1, min: 1 }
    ],
    compute: (v) => {
      const P = +v.inicial, PMT = +v.aporte, r = +v.tasa / 100 / 12, n = +v.anos * 12;
      const fv = P * Math.pow(1 + r, n) + PMT * ((Math.pow(1 + r, n) - 1) / r);
      const aportado = P + PMT * n;
      return [
        { label: "Valor final", value: money(fv), emphasized: true },
        { label: "Total aportado", value: money(aportado) },
        { label: "Ganancia por intereses", value: money(fv - aportado) }
      ];
    }
  },
  {
    slug: "calculadora-regla-tres",
    name: "Regla de tres simple",
    shortDesc: "Resuelve la regla de tres directa: si A es B, entonces C es ¿X?",
    longDesc: "Si A=B, ¿cuánto vale C? La calculadora resuelve regla de tres directa al instante.",
    keywords: ["regla de tres", "regla 3 simple", "rule of three"],
    fields: [
      { type: "number", key: "a", label: "A", default: 100 },
      { type: "number", key: "b", label: "B", default: 50 },
      { type: "number", key: "c", label: "C", default: 30 }
    ],
    compute: (v) => {
      const x = (+v.b * +v.c) / +v.a;
      return [{ label: `Si ${v.a} es ${v.b}, entonces ${v.c} es`, value: fmt(x, 4), emphasized: true }];
    }
  },
  {
    slug: "calculadora-conversion-temperatura",
    name: "Conversor de temperatura",
    shortDesc: "Convierte entre Celsius, Fahrenheit y Kelvin.",
    longDesc: "Ingresa una temperatura en Celsius y obtené el equivalente en Fahrenheit y Kelvin. Útil para recetas, viajes y ciencia.",
    keywords: ["celsius a fahrenheit", "temperatura converter"],
    fields: [{ type: "number", key: "c", label: "Celsius", suffix: "°C", default: 25, step: 0.1 }],
    compute: (v) => {
      const c = +v.c;
      return [
        { label: "Fahrenheit", value: `${fmt((c * 9) / 5 + 32, 2)} °F`, emphasized: true },
        { label: "Kelvin", value: `${fmt(c + 273.15, 2)} K` }
      ];
    }
  },
  {
    slug: "calculadora-velocidad-lectura",
    name: "Tiempo de lectura",
    shortDesc: "Calcula cuánto tarda en leerse un texto.",
    longDesc: "Estima el tiempo de lectura según cantidad de palabras y velocidad promedio (225 palabras/min para adulto promedio).",
    keywords: ["tiempo de lectura", "reading time calculator"],
    fields: [
      { type: "number", key: "palabras", label: "Cantidad de palabras", default: 1000, step: 100 },
      { type: "number", key: "wpm", label: "Velocidad", suffix: "ppm", default: 225, step: 5 }
    ],
    compute: (v) => {
      const min = +v.palabras / +v.wpm;
      const m = Math.floor(min);
      const s = Math.round((min - m) * 60);
      return [{ label: "Tiempo de lectura", value: `${m} min ${s} s`, emphasized: true }];
    }
  },
  {
    slug: "calculadora-fecha-diferencia",
    name: "Diferencia entre fechas",
    shortDesc: "Calcula días, semanas y meses entre dos fechas.",
    longDesc: "Ingresá dos fechas y te muestra la diferencia en años, meses, semanas, días y horas.",
    keywords: ["dias entre fechas", "date difference"],
    fields: [
      { type: "date", key: "inicio", label: "Fecha inicial" },
      { type: "date", key: "fin", label: "Fecha final" }
    ],
    compute: (v) => {
      const d1 = new Date(String(v.inicio));
      const d2 = new Date(String(v.fin));
      if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return [{ label: "Error", value: "Fechas inválidas" }];
      const ms = Math.abs(+d2 - +d1);
      const days = Math.floor(ms / 86400000);
      const weeks = Math.floor(days / 7);
      const months = Math.floor(days / 30.44);
      const years = Math.floor(days / 365.25);
      return [
        { label: "Días", value: fmt(days, 0), emphasized: true },
        { label: "Semanas", value: fmt(weeks, 0) },
        { label: "Meses (aprox)", value: fmt(months, 0) },
        { label: "Años (aprox)", value: fmt(years, 0) }
      ];
    }
  },
  {
    slug: "calculadora-iva-mexico",
    name: "Calculadora de IVA México",
    shortDesc: "Suma o resta IVA 16% (o 8% frontera) a un monto.",
    longDesc: "IVA es el Impuesto al Valor Agregado en México (16% general, 8% en zona fronteriza norte y sur, 0% en alimentos básicos). Calculá rápido cualquiera de los tres.",
    keywords: ["calculadora iva", "iva mexico", "calcular iva 16"],
    fields: [
      { type: "number", key: "monto", label: "Monto", suffix: "$", default: 1000, step: 0.01 },
      { type: "select", key: "iva", label: "Tasa IVA", default: "16", options: [{ value: "16", label: "16% (general)" }, { value: "8", label: "8% (frontera)" }, { value: "0", label: "0%" }] },
      { type: "select", key: "modo", label: "Modo", default: "agregar", options: [{ value: "agregar", label: "Agregar IVA al monto" }, { value: "extraer", label: "El monto ya incluye IVA" }] }
    ],
    compute: (v) => {
      const m = +v.monto, t = +v.iva / 100;
      if (v.modo === "agregar") {
        const iva = m * t;
        return [
          { label: "Subtotal (sin IVA)", value: money(m) },
          { label: "IVA", value: money(iva) },
          { label: "Total con IVA", value: money(m + iva), emphasized: true }
        ];
      } else {
        const sub = m / (1 + t);
        const iva = m - sub;
        return [
          { label: "Total (con IVA)", value: money(m) },
          { label: "IVA incluido", value: money(iva) },
          { label: "Subtotal (sin IVA)", value: money(sub), emphasized: true }
        ];
      }
    }
  },
  {
    slug: "calculadora-bmi-pulgadas-libras",
    name: "BMI calculator (lb / inches)",
    shortDesc: "Calcula tu BMI usando libras y pulgadas (US/UK system).",
    longDesc: "Same as IMC, but using imperial units. Enter weight in pounds and height in inches.",
    keywords: ["bmi calculator", "bmi pounds", "bmi inches"],
    fields: [
      { type: "number", key: "peso", label: "Weight", suffix: "lb", default: 154, step: 0.1 },
      { type: "number", key: "altura", label: "Height", suffix: "in", default: 67, step: 0.1 }
    ],
    compute: (v) => {
      const bmi = (703 * +v.peso) / Math.pow(+v.altura, 2);
      let cat = "";
      if (bmi < 18.5) cat = "Underweight";
      else if (bmi < 25) cat = "Normal";
      else if (bmi < 30) cat = "Overweight";
      else cat = "Obese";
      return [
        { label: "BMI", value: fmt(bmi, 1), emphasized: true },
        { label: "Category", value: cat }
      ];
    }
  },
  {
    slug: "calculadora-ovulacion",
    name: "Calculadora de ovulación",
    shortDesc: "Estima el día de ovulación y los días fértiles del ciclo.",
    longDesc: "Estimación basada en la fecha de tu última menstruación y duración del ciclo. La ovulación normalmente ocurre 14 días antes del próximo período. Es orientativa, no reemplaza consulta médica.",
    keywords: ["calculadora ovulacion", "dias fertiles"],
    fields: [
      { type: "date", key: "ultimo", label: "Primer día del último período" },
      { type: "number", key: "ciclo", label: "Duración del ciclo", suffix: "días", default: 28, step: 1, min: 21, max: 35 }
    ],
    compute: (v) => {
      const d = new Date(String(v.ultimo));
      if (isNaN(d.getTime())) return [{ label: "Error", value: "Fecha inválida" }];
      const ciclo = +v.ciclo;
      const ovulacion = new Date(+d + (ciclo - 14) * 86400000);
      const fertilStart = new Date(+ovulacion - 5 * 86400000);
      const fertilEnd = new Date(+ovulacion + 1 * 86400000);
      const proximo = new Date(+d + ciclo * 86400000);
      const f = (x: Date) => x.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
      return [
        { label: "Día de ovulación", value: f(ovulacion), emphasized: true },
        { label: "Ventana fértil", value: `${f(fertilStart)} – ${f(fertilEnd)}` },
        { label: "Próximo período", value: f(proximo) }
      ];
    }
  }
];

export const CALCS_BY_SLUG = Object.fromEntries(CALCULATORS.map((c) => [c.slug, c]));
