/**
 * Content Boost — bloques de contenido SEO extendido para slugs prioritarios.
 *
 * Cada slug en el registry recibe secciones adicionales debajo de su tool:
 * casos de uso, mini-guías, ejemplos, comparativas rápidas. El objetivo es
 * subir el word count, agregar entity-coverage y dar respuestas citables
 * para AI Overviews + Perplexity.
 *
 * Activación: cualquier slug listado aquí renderiza `<ContentBoost slug=... />`
 * (ver `components/seo/content-boost.tsx`).
 */
import { CONTENT_BOOST_AUTO } from "./seo-content-boost-auto";

export type ContentSection = {
  /** H2 visible */
  heading: string;
  /** Párrafos (HTML básico, p/strong/em/a permitidos en JSX seguros). */
  paragraphs: string[];
  /** Opcional: lista bullets. */
  bullets?: string[];
  /** Opcional: snippet citable corto (para Speakable schema). */
  citableSummary?: string;
};

export type ContentBoost = {
  /** Subheader bajo el H1 (descripción extendida). */
  intro?: string;
  /** Bloques H2 con párrafos. */
  sections: ContentSection[];
  /** "Pasos rápidos" para snippets HowTo. */
  steps?: { title: string; description: string }[];
};

export const CONTENT_BOOST: Record<string, ContentBoost> = {
  // ============================================================
  // que-es-cps-test (30 impr, pos 15.1 — MAX prioridad)
  // ============================================================
  "que-es-cps-test": {
    intro:
      "El CPS Test (Clicks Per Second) mide cuántos clicks del ratón puedes hacer en un intervalo dado. Es usado por gamers de Minecraft PvP, Fortnite, Roblox y League of Legends para entrenar dedos y mejorar reflejos.",
    sections: [
      {
        heading: "¿Por qué los gamers entrenan su CPS?",
        paragraphs: [
          "En juegos con combate basado en hits por segundo (Minecraft PvP, MMOs, fighting games), el jugador con mayor CPS suele tener ventaja. Entrenar a 8-12 CPS sostenidos durante 5 segundos te coloca en el rango competitivo.",
          "Las técnicas más usadas son <strong>regular clicking</strong> (4-7 CPS), <strong>jitter clicking</strong> (8-13 CPS) y <strong>butterfly clicking</strong> (10-16 CPS). Los récords mundiales en Jitter superan los 16 CPS sostenidos.",
        ],
        citableSummary:
          "CPS Test mide los clicks por segundo. Rango promedio: 4-7 CPS. Gamers entrenados: 8-12 CPS. Récords mundiales: 14-16+ CPS sostenidos.",
      },
      {
        heading: "Récords mundiales y benchmarks de CPS",
        paragraphs: [
          "Los récords mundiales registrados públicamente en CPS Test sites son:",
        ],
        bullets: [
          "<strong>1 segundo</strong> · Récord ≈ 17.3 CPS (jitter extremo)",
          "<strong>5 segundos</strong> · Récord ≈ 14.6 CPS",
          "<strong>10 segundos</strong> · Récord ≈ 13.4 CPS",
          "<strong>30 segundos</strong> · Récord ≈ 11.8 CPS",
          "<strong>60 segundos</strong> · Récord ≈ 10.5 CPS",
          "<strong>Promedio mundial</strong> · 6.5 CPS en test de 10 segundos",
        ],
      },
      {
        heading: "Técnicas de clicking",
        paragraphs: [
          "<strong>Regular clicking</strong>: usar el dedo índice de forma natural. Tope ~7 CPS.",
          "<strong>Jitter clicking</strong>: tensar el brazo para vibrar el dedo. Permite 8-13 CPS pero puede causar fatiga.",
          "<strong>Butterfly clicking</strong>: alternar dedos índice y medio. 10-16 CPS, polémico en algunos servidores que lo banean.",
          "<strong>Drag clicking</strong>: arrastrar el dedo sobre el botón. 20+ CPS pero baneado en casi todos los torneos competitivos.",
        ],
      },
    ],
  },

  // ============================================================
  // cps-test (la tool en sí)
  // ============================================================
  "cps-test": {
    intro:
      "Mide tu velocidad de clicks por segundo (CPS) con tests de 1, 5, 10, 30, 60 segundos y modo Jitter de 100 ms. Compara con récords mundiales y promedios de gamers.",
    sections: [
      {
        heading: "Modos disponibles",
        paragraphs: [
          "Toolram CPS Test ofrece 6 duraciones distintas para que entrenes diferentes aspectos:",
        ],
        bullets: [
          "<strong>1 segundo</strong> · burst máximo, ideal para PvP de spike",
          "<strong>5 segundos</strong> · estándar competitivo Minecraft PvP",
          "<strong>10 segundos</strong> · benchmark más usado mundialmente",
          "<strong>30 segundos</strong> · resistencia muscular",
          "<strong>60 segundos</strong> · stamina total",
          "<strong>100 ms (Jitter)</strong> · prueba la frecuencia instantánea máxima",
        ],
      },
      {
        heading: "Tips para mejorar tu CPS",
        paragraphs: [
          "1. Usa un ratón con switches mecánicos de baja actuación (Razer Optical, Logitech HERO).",
          "2. Mantén el codo apoyado en una superficie firme.",
          "3. Practica intervalos cortos (5s) antes de pasar a tests largos.",
          "4. Hidratá las manos: la sudoración baja CPS hasta 20%.",
          "5. No clickees con fuerza — la fuerza ralentiza. Velocidad > presión.",
        ],
      },
    ],
  },

  // ============================================================
  // Cluster CPS — variantes de duración y técnica
  // ============================================================
  "cps-test-1-segundo": {
    intro:
      "El test de 1 segundo mide tu pico de velocidad de click (burst): el máximo absoluto que consigues en la ventana más corta, antes de que la resistencia entre en juego.",
    sections: [
      {
        heading: "Burst vs velocidad sostenida",
        citableSummary: "El test de 1 segundo mide el pico (burst); el de 5-10 segundos mide la velocidad sostenida. Por eso el CPS de 1s siempre es más alto: no incluye la fatiga muscular.",
        paragraphs: [
          "Hay dos formas de medir velocidad de click: el <strong>pico</strong> (cuántos clicks logras en el mejor instante) y la <strong>velocidad sostenida</strong> (cuánto mantienes durante varios segundos). El test de 1 segundo aísla el pico.",
          "Por eso un mismo jugador puede marcar 16 CPS en 1 segundo y 9 CPS en 10 segundos: ambos son correctos, miden cosas distintas.",
        ],
      },
      {
        heading: "Cómo medir tu pico real",
        paragraphs: [
          "Haz 3-5 intentos seguidos y quédate con el mejor: el burst depende mucho del instante exacto en que sincronizas el músculo. Técnicas como drag o butterfly clicking disparan el pico de 1 segundo muy por encima del click normal.",
        ],
      },
    ],
  },
  "cps-test-5-segundos": {
    intro:
      "El test de 5 segundos es el estándar competitivo de Minecraft PvP: equilibra burst y resistencia, así que refleja la velocidad real que puedes mantener en un intercambio de golpes.",
    sections: [
      {
        heading: "Por qué 5 segundos manda en PvP",
        citableSummary: "El test de 5 segundos es el estándar en Minecraft PvP porque mide la velocidad que de verdad puedes sostener en combate, no un pico puntual de 1 segundo.",
        paragraphs: [
          "En un intercambio real de golpes no clickeas un instante: clickeas varios segundos. El test de 5s captura justo esa ventana, por eso la comunidad competitiva lo usa como referencia.",
        ],
      },
      {
        heading: "Rutina para subir tu CPS de 5 segundos",
        paragraphs: [
          "Practica en bloques cortos y mide el progreso semana a semana, no día a día.",
        ],
        bullets: [
          "Calienta 30 segundos con clicks suaves antes de medir.",
          "Apoya el codo: la estabilidad del brazo sube el CPS sostenido.",
          "Alterna 5s rápido / 10s de descanso, x10 series.",
          "Cambia a un mouse con switches ligeros si te frena el hardware.",
        ],
      },
    ],
  },
  "cps-test-10-segundos": {
    intro:
      "El test de 10 segundos —el famoso Kohi click test— es el benchmark más usado del mundo para comparar CPS. Mide velocidad sostenida: el número que la mayoría reporta cuando dice 'mi CPS'.",
    sections: [
      {
        heading: "Origen del Kohi click test",
        citableSummary: "El Kohi click test es el test de 10 segundos, llamado así por el servidor Kohi de Minecraft. Es el estándar de facto para comparar clicks por segundo entre jugadores.",
        paragraphs: [
          "El nombre viene del servidor <strong>Kohi</strong> de Minecraft, donde la velocidad de click definía el combate. La duración de 10 segundos se volvió el estándar para comparar a cualquier jugador en igualdad de condiciones.",
        ],
      },
      {
        heading: "Tabla de benchmarks de CPS (10 segundos)",
        paragraphs: ["Dónde caes según tu CPS sostenido en 10 segundos:"],
        bullets: [
          "<strong>0-5 CPS</strong> · principiante",
          "<strong>6-8 CPS</strong> · promedio humano",
          "<strong>8-10 CPS</strong> · buen jugador",
          "<strong>10-12 CPS</strong> · avanzado / competitivo",
          "<strong>12+ CPS</strong> · excepcional (con técnica)",
        ],
      },
    ],
  },
  "cps-test-60-segundos": {
    intro:
      "El test de 60 segundos mide resistencia: cuánto mantienes tu velocidad de click durante un minuto entero antes de que la fatiga muscular la baje. Es el más exigente físicamente.",
    sections: [
      {
        heading: "Resistencia: la prueba de fuego",
        citableSummary: "El test de 60 segundos mide consistencia, no pico: el reto es minimizar la caída de CPS a lo largo de un minuto completo de click continuo.",
        paragraphs: [
          "Casi todos empiezan rápido y se desinflan. El test de 1 minuto revela si tu técnica es <strong>sostenible</strong> o si te quemas a los 20 segundos.",
        ],
      },
      {
        heading: "Cómo no quemarte en 1 minuto",
        paragraphs: [
          "No salgas a tu máximo desde el segundo cero: marca un ritmo que puedas sostener, relaja el antebrazo entre ráfagas y respira de forma constante. La consistencia gana al sprint.",
        ],
      },
    ],
  },
  "jitter-click-test": {
    intro:
      "El jitter click test mide tu CPS con la técnica de jitter clicking: tensar el brazo para hacerlo vibrar y disparar clicks a alta frecuencia, con picos de hasta ~14 CPS.",
    sections: [
      {
        heading: "Cómo funciona el jitter clicking",
        citableSummary: "El jitter clicking consiste en tensar el antebrazo y la muñeca para generar una vibración controlada que pulsa el botón muy rápido, alcanzando hasta ~14 CPS.",
        paragraphs: [
          "La clave es una <strong>tensión controlada</strong>: demasiada y pierdes puntería; muy poca y no vibras. Apoya el antebrazo en la mesa y deja que la vibración —no el dedo— haga el trabajo.",
        ],
      },
      {
        heading: "Jitter clicking y tu salud (RSI)",
        citableSummary: "El jitter clicking en exceso puede causar fatiga y lesión por esfuerzo repetitivo (RSI); conviene limitarlo a sesiones de 15-20 minutos con descansos.",
        paragraphs: [
          "Es la técnica que más estresa tendones y músculos. Si sientes dolor u hormigueo, para. Limita las sesiones, estira la mano y alterna con clicking normal.",
        ],
      },
    ],
  },
  "butterfly-click-test": {
    intro:
      "El butterfly click test mide tu CPS con la técnica de butterfly clicking: alternar dos dedos sobre el mismo botón para casi duplicar la cadencia, llegando a 14-16 CPS.",
    sections: [
      {
        heading: "La técnica de los dos dedos",
        citableSummary: "El butterfly clicking alterna dos dedos sobre el mismo botón del mouse para duplicar la cadencia de clicks, alcanzando 14-16 CPS con el ratón adecuado.",
        paragraphs: [
          "En lugar de un dedo subiendo y bajando, usas <strong>dos en alternancia</strong>: mientras uno baja, el otro sube. Bien ritmado, casi duplicas tu CPS con menos fatiga que el jitter.",
        ],
      },
      {
        heading: "Butterfly y reglas de servidor",
        paragraphs: [
          "Cuidado: muchos servidores de Minecraft lo restringen porque puede generar <strong>dobles registros</strong> parecidos al autoclick. Revisa las reglas antes de usarlo en PvP competitivo; para medir tu velocidad aquí no hay problema.",
        ],
      },
    ],
  },
  "drag-click-test": {
    intro:
      "El drag click test mide picos extremos de CPS con la técnica de drag clicking: arrastrar el dedo por el botón aprovechando la fricción para registrar muchos clicks de golpe (20+ CPS).",
    sections: [
      {
        heading: "Fricción = clicks múltiples",
        citableSummary: "El drag clicking arrastra el dedo por el botón del mouse usando la fricción para disparar decenas de clicks en un instante, con picos de 20+ CPS, pero depende totalmente del mouse.",
        paragraphs: [
          "No es velocidad de dedo: es <strong>física</strong>. Al arrastrar, la fricción hace vibrar el switch y registra una ráfaga de clicks. Por eso un mismo gesto da 30 CPS en un mouse y 0 en otro.",
        ],
      },
      {
        heading: "Drag click y desgaste del mouse",
        paragraphs: [
          "El drag clicking <strong>desgasta</strong> los switches y el recubrimiento del botón, y suele estar prohibido en PvP por dar ventaja artificial. Úsalo con moderación y solo para probar tu pico máximo.",
        ],
      },
    ],
  },

  // ============================================================
  // contador-palabras (head term competitivo)
  // ============================================================
  "contador-palabras": {
    intro:
      "Cuenta palabras, caracteres con/sin espacios, oraciones, párrafos y estima el tiempo de lectura al instante. Sin registro, sin límites de tamaño, todo en tu navegador.",
    sections: [
      {
        heading: "¿Para qué sirve un contador de palabras?",
        paragraphs: [
          "Un contador de palabras te dice exactamente cuántas palabras tiene un texto. Es indispensable para escritores, estudiantes, redactores SEO, traductores y community managers que tienen límites por plataforma.",
          "Toolram también cuenta caracteres con y sin espacios (útil para Twitter, meta descriptions SEO), oraciones, párrafos y estima el tiempo de lectura en español (≈220 palabras/minuto).",
        ],
        citableSummary:
          "Un contador de palabras mide exactamente cuántas palabras, caracteres, oraciones y párrafos tiene un texto. Útil para escritura académica, redacción SEO, redes sociales y traducción.",
      },
      {
        heading: "Límites comunes por plataforma",
        bullets: [
          "<strong>Twitter / X</strong> · 280 caracteres (premium 25.000)",
          "<strong>Meta description SEO</strong> · 155-160 caracteres",
          "<strong>Meta title SEO</strong> · 60 caracteres",
          "<strong>Instagram caption</strong> · 2.200 caracteres",
          "<strong>LinkedIn post</strong> · 3.000 caracteres",
          "<strong>TikTok descripción</strong> · 2.200 caracteres",
          "<strong>YouTube descripción</strong> · 5.000 caracteres",
          "<strong>Email asunto</strong> · 50-60 caracteres (mobile)",
        ],
        paragraphs: [],
      },
      {
        heading: "Cuánto se tarda en leer X palabras",
        paragraphs: [
          "La velocidad media de lectura en español es <strong>220 palabras por minuto</strong> para texto general. Lectura técnica baja a ~180 wpm. Texto sencillo (novelas, blog) sube a 250-280 wpm.",
        ],
        bullets: [
          "500 palabras ≈ 2 minutos",
          "1.000 palabras ≈ 4-5 minutos",
          "1.500 palabras ≈ 7 minutos",
          "2.500 palabras ≈ 11-12 minutos",
          "5.000 palabras ≈ 22-25 minutos",
        ],
      },
    ],
  },

  // ============================================================
  // convertir-mayusculas
  // ============================================================
  "convertir-mayusculas": {
    intro:
      "Convierte cualquier texto entre MAYÚSCULAS, minúsculas, Title Case, oración o alternantes con un click. Todo procesado en tu navegador, sin tracking.",
    sections: [
      {
        heading: "Tipos de conversión disponibles",
        bullets: [
          "<strong>MAYÚSCULAS</strong> · TODO EL TEXTO EN GRANDES",
          "<strong>minúsculas</strong> · todo el texto en pequeñas",
          "<strong>Title Case</strong> · La Primera Letra De Cada Palabra En Mayúscula",
          "<strong>Oración</strong> · Primera letra de cada oración en mayúscula",
          "<strong>aLtErNaNtE</strong> · una mayúscula sí, una no (estilo SpongeBob)",
          "<strong>InVeRsO</strong> · cambia mayúsculas por minúsculas y viceversa",
        ],
        paragraphs: [],
      },
      {
        heading: "Casos de uso",
        paragraphs: [
          "1. <strong>Headlines SEO</strong>: Title Case para títulos de artículos.",
          "2. <strong>Marketing</strong>: convertir gritos en mayúsculas a tono normal.",
          "3. <strong>Datos limpios</strong>: normalizar nombres en bases de datos a Title Case.",
          "4. <strong>Programación</strong>: convertir entre snake_case, kebab-case, camelCase (próximamente).",
          "5. <strong>Memes</strong>: estilo alternante para captions virales.",
        ],
      },
    ],
  },

  // ============================================================
  // rotar-pdf
  // ============================================================
  "rotar-pdf": {
    intro:
      "Rota páginas PDF 90°, 180° o 270° en sentido horario o antihorario. Tu archivo nunca sale de tu navegador — procesado 100% local con pdf-lib (WebAssembly).",
    sections: [
      {
        heading: "¿Cuándo necesitas rotar un PDF?",
        bullets: [
          "Escaneaste un documento en orientación incorrecta",
          "Te pasaron un PDF en horizontal y lo quieres vertical",
          "Necesitas que coincida con la dirección de impresión",
          "Un eBook con páginas dobles que ahora están horizontales",
          "Documentos legales o contables que requieren orientación específica",
        ],
        paragraphs: [],
      },
      {
        heading: "Cómo rotar un PDF en Toolram",
        paragraphs: [
          "1. Arrastra tu PDF al área de carga (o haz click para seleccionar).",
          "2. Elige el ángulo: 90° (horario), 180° (boca abajo), 270° (antihorario).",
          "3. Selecciona si rotar todas las páginas o solo algunas específicas.",
          "4. Click en \"Rotar\" — la conversión ocurre en milisegundos, sin upload.",
          "5. Descarga el PDF rotado.",
        ],
      },
    ],
    steps: [
      { title: "Sube tu PDF", description: "Arrastra el archivo o selecciónalo desde tu equipo. Nunca sale del navegador." },
      { title: "Elige el ángulo", description: "90°, 180° o 270°. Puedes invertir el sentido (horario/antihorario)." },
      { title: "Selecciona páginas", description: "Todas o un rango específico (ej: 1-5, 7, 10-12)." },
      { title: "Descarga", description: "Tu PDF rotado se descarga al instante. Sin marca de agua, sin límite." },
    ],
  },

  // ============================================================
  // calculadora-propina
  // ============================================================
  "calculadora-propina": {
    intro:
      "Calcula la propina exacta sobre cualquier cuenta (10%, 15%, 18%, 20%, custom) y divide el total entre los comensales. Sin enviar tus importes a ningún servidor.",
    sections: [
      {
        heading: "¿Cuánto de propina dejar?",
        paragraphs: [
          "La propina estándar varía por país y tipo de servicio:",
        ],
        bullets: [
          "<strong>México</strong> · 10-15% restaurante / 10% bar",
          "<strong>EE.UU.</strong> · 18-20% restaurante / 15-18% bar / 15% taxi",
          "<strong>España</strong> · 5-10% opcional, normalmente redondeo",
          "<strong>Argentina</strong> · 10% si el servicio fue bueno",
          "<strong>Chile</strong> · 10% sugerida en la cuenta",
          "<strong>Colombia</strong> · 10% sugerida (puedes negarte)",
          "<strong>Perú</strong> · 10% opcional",
          "<strong>Japón</strong> · NO se deja propina (cultural)",
        ],
        citableSummary:
          "La propina estándar es 10-15% en LATAM, 18-20% en EE.UU. y 5-10% en España. En Japón no se deja propina por costumbre cultural.",
      },
      {
        heading: "Casos de uso",
        bullets: [
          "Dividir cuenta de un grupo de amigos con propina incluida",
          "Calcular propina exacta para evitar exceder presupuesto",
          "Saber cuánto le toca a cada uno con porcentaje custom",
          "Repartir cuenta desigual (uno comió más que otro)",
        ],
        paragraphs: [],
      },
    ],
  },

  // ============================================================
  // calculadora-regla-tres
  // ============================================================
  "calculadora-regla-tres": {
    intro:
      "Resuelve la regla de tres simple directa, simple inversa y compuesta con explicación paso a paso. Ideal para tareas escolares, conversiones de proporción y proyecciones.",
    sections: [
      {
        heading: "¿Qué es la regla de tres?",
        paragraphs: [
          "La regla de tres es un método matemático que permite calcular una cantidad desconocida cuando se conocen tres valores que mantienen una proporción.",
          "<strong>Simple directa</strong>: cuando dos cantidades aumentan o disminuyen juntas (más horas → más dinero).",
          "<strong>Simple inversa</strong>: cuando una sube y la otra baja (más obreros → menos días).",
          "<strong>Compuesta</strong>: combina tres o más magnitudes relacionadas.",
        ],
        citableSummary:
          "La regla de tres calcula una cantidad desconocida a partir de tres valores conocidos que mantienen una proporción directa o inversa.",
      },
      {
        heading: "Ejemplos prácticos",
        paragraphs: [
          "<strong>Directa</strong>: Si 5 manzanas cuestan $20, ¿cuánto cuestan 8 manzanas? → (8 × 20) ÷ 5 = $32.",
          "<strong>Inversa</strong>: Si 4 obreros tardan 12 días, ¿cuánto tardan 6 obreros? → (4 × 12) ÷ 6 = 8 días.",
          "<strong>Compuesta</strong>: Si 3 obreros en 8 horas hacen 24 m², ¿cuántos m² hacen 5 obreros en 12 horas? → (24 × 5 × 12) ÷ (3 × 8) = 60 m².",
        ],
      },
    ],
  },

  // ============================================================
  // calculadora-iva-mexico
  // ============================================================
  "calculadora-iva-mexico": {
    intro:
      "Calcula IVA en México con la tasa estándar (16%) o de frontera norte (8%). Suma IVA a un importe sin impuestos, o desglosa IVA incluido en un precio final.",
    sections: [
      {
        heading: "Tasas de IVA en México 2026",
        bullets: [
          "<strong>16%</strong> · Tasa general nacional (vigente desde 2010)",
          "<strong>8%</strong> · Tasa de frontera norte (municipios fronterizos con EE.UU.)",
          "<strong>0%</strong> · Alimentos básicos, medicinas, libros, exportaciones",
          "<strong>Exento</strong> · Servicios médicos, educación, transporte público",
        ],
        paragraphs: [],
      },
      {
        heading: "Fórmulas para calcular IVA",
        paragraphs: [
          "<strong>Sumar IVA al subtotal</strong>: Total = Subtotal × 1.16 (o 1.08 frontera).",
          "<strong>Desglosar IVA de un total</strong>: Subtotal = Total ÷ 1.16. IVA = Total − Subtotal.",
          "<strong>Solo el monto de IVA</strong>: IVA = Subtotal × 0.16.",
        ],
        citableSummary:
          "México tiene IVA del 16% nacional o 8% en frontera norte. Para sumar IVA al subtotal: multiplica por 1.16. Para desglosar: divide entre 1.16.",
      },
    ],
  },

  // ============================================================
  // calculadora-imc
  // ============================================================
  "calculadora-imc": {
    intro:
      "Calcula tu Índice de Masa Corporal (IMC) según la fórmula oficial de la OMS. Conoce si tu peso está dentro del rango saludable según tu altura.",
    sections: [
      {
        heading: "Fórmula del IMC",
        paragraphs: [
          "El IMC se calcula dividiendo tu peso (en kilogramos) entre tu altura (en metros) al cuadrado:",
          "<strong>IMC = Peso (kg) ÷ Altura² (m²)</strong>",
          "Ejemplo: 70 kg / (1.75 m × 1.75 m) = 22.86 → peso saludable.",
        ],
        citableSummary:
          "El IMC se calcula como peso (kg) dividido entre altura al cuadrado (m²). Rangos OMS: <18.5 bajo peso, 18.5-24.9 saludable, 25-29.9 sobrepeso, ≥30 obesidad.",
      },
      {
        heading: "Rangos de IMC según OMS",
        bullets: [
          "<strong>&lt; 18.5</strong> · Bajo peso",
          "<strong>18.5 – 24.9</strong> · Peso saludable",
          "<strong>25.0 – 29.9</strong> · Sobrepeso",
          "<strong>30.0 – 34.9</strong> · Obesidad tipo I",
          "<strong>35.0 – 39.9</strong> · Obesidad tipo II",
          "<strong>≥ 40.0</strong> · Obesidad tipo III (mórbida)",
        ],
        paragraphs: [],
      },
      {
        heading: "Limitaciones del IMC",
        paragraphs: [
          "El IMC es una herramienta de screening, NO un diagnóstico definitivo. No distingue entre masa muscular y grasa, por lo que atletas pueden tener IMC alto sin sobrepeso real.",
          "Tampoco refleja la distribución de la grasa corporal — la grasa visceral (abdominal) es más peligrosa que la subcutánea. Para evaluación completa, consulta con un profesional de la salud que considere también porcentaje de grasa, circunferencia de cintura y composición corporal.",
        ],
      },
    ],
  },

  // ============================================================
  // que-es-imc
  // ============================================================
  "que-es-imc": {
    sections: [
      {
        heading: "Historia del IMC",
        paragraphs: [
          "El IMC fue desarrollado por el matemático belga <strong>Adolphe Quetelet</strong> en el siglo XIX (publicado en 1832). Inicialmente se llamaba \"Índice de Quetelet\".",
          "En 1972, el fisiólogo estadounidense Ancel Keys lo rebautizó como Body Mass Index (BMI). La OMS lo adoptó como estándar mundial de screening de obesidad en 1995.",
        ],
      },
      {
        heading: "IMC en niños y adolescentes",
        paragraphs: [
          "Para menores de 18 años el IMC se interpreta con percentiles ajustados por edad y sexo (no con los rangos adultos). Los CDC ofrecen tablas específicas para niños 2-20 años.",
        ],
      },
    ],
  },

  // ============================================================
  // que-es-pdf
  // ============================================================
  "que-es-pdf": {
    sections: [
      {
        heading: "Historia y origen del PDF",
        paragraphs: [
          "PDF (<strong>Portable Document Format</strong>) fue creado por Adobe Systems en 1993, fundado por John Warnock. La meta era resolver el problema de que un documento se viera distinto en cada computadora.",
          "Adobe liberó el formato como estándar abierto en 2008 (ISO 32000-1). Hoy es el formato de documento más usado del mundo: gobiernos, contratos, facturas, libros, papers académicos.",
        ],
      },
      {
        heading: "Ventajas del PDF frente a Word o HTML",
        bullets: [
          "<strong>Layout fijo</strong>: se ve igual en cualquier dispositivo, OS o impresora",
          "<strong>Firmable</strong>: soporta firmas digitales criptográficas",
          "<strong>Búsqueda</strong>: texto seleccionable e indexable por Google",
          "<strong>Compresión</strong>: imágenes optimizadas reducen tamaño",
          "<strong>Encriptación</strong>: puede protegerse con contraseña AES-256",
          "<strong>Estándar legal</strong>: aceptado en cortes y notarías globalmente",
        ],
        paragraphs: [],
      },
      {
        heading: "Herramientas PDF gratis en Toolram",
        bullets: [
          "<a href=\"/unir-pdf\">Unir PDF</a> · combina varios en uno",
          "<a href=\"/dividir-pdf\">Dividir PDF</a> · extrae páginas",
          "<a href=\"/rotar-pdf\">Rotar PDF</a> · 90°/180°/270°",
          "<a href=\"/firmar-pdf\">Firmar PDF</a> · firma digital",
          "<a href=\"/imagenes-a-pdf\">JPG a PDF</a> · convierte fotos",
          "<a href=\"/marca-agua-pdf\">Marca de agua PDF</a> · branding",
          "<a href=\"/numerar-pdf\">Numerar PDF</a> · paginación",
          "<a href=\"/comprimir-pdf\">Comprimir PDF</a> · reduce tamaño",
        ],
        paragraphs: [],
      },
    ],
  },

  // ============================================================
  // que-es-tdee
  // ============================================================
  "que-es-tdee": {
    sections: [
      {
        heading: "Fórmula Mifflin-St Jeor",
        paragraphs: [
          "El TDEE se calcula multiplicando el <strong>BMR (Basal Metabolic Rate)</strong> por un factor de actividad física.",
          "<strong>BMR Hombres</strong>: (10 × peso kg) + (6.25 × altura cm) − (5 × edad) + 5.",
          "<strong>BMR Mujeres</strong>: (10 × peso kg) + (6.25 × altura cm) − (5 × edad) − 161.",
        ],
        citableSummary:
          "TDEE = BMR × factor actividad. BMR se calcula con Mifflin-St Jeor (peso, altura, edad, sexo). Factor sedentario 1.2, activo 1.55, atleta 1.9.",
      },
      {
        heading: "Factores de actividad física",
        bullets: [
          "<strong>1.2</strong> · Sedentario (oficina, sin ejercicio)",
          "<strong>1.375</strong> · Ligero (1-3 días/semana de ejercicio)",
          "<strong>1.55</strong> · Moderado (3-5 días/semana)",
          "<strong>1.725</strong> · Activo (6-7 días/semana intenso)",
          "<strong>1.9</strong> · Atleta profesional o trabajo físico pesado",
        ],
        paragraphs: [],
      },
      {
        heading: "Cómo usar el TDEE para metas",
        paragraphs: [
          "<strong>Perder peso</strong>: come ~500 kcal/día por debajo del TDEE para perder ~0.5 kg/semana.",
          "<strong>Mantener</strong>: come exactamente el TDEE.",
          "<strong>Ganar masa muscular</strong>: superávit de 250-500 kcal/día, combinado con entrenamiento de fuerza.",
        ],
      },
    ],
  },

  // ============================================================
  // que-es-uuid
  // ============================================================
  "que-es-uuid": {
    sections: [
      {
        heading: "Versiones de UUID",
        bullets: [
          "<strong>UUID v1</strong> · timestamp + MAC address. Generación rápida pero filtra info de hardware.",
          "<strong>UUID v3</strong> · MD5 de namespace + nombre. Determinista.",
          "<strong>UUID v4</strong> · 122 bits aleatorios. Más usado en bases de datos por privacy.",
          "<strong>UUID v5</strong> · SHA-1 de namespace + nombre. Determinista, más seguro que v3.",
          "<strong>UUID v6</strong> · timestamp reorderable (v1 mejorado).",
          "<strong>UUID v7</strong> · timestamp Unix millisegundos + random. Sortable cronológicamente — recomendado para bases de datos modernas (Postgres, MongoDB).",
        ],
        paragraphs: [],
        citableSummary:
          "UUID v4 es 100% aleatorio (122 bits) — usado para anonimato. UUID v7 incluye timestamp Unix ordenable — recomendado para bases de datos modernas.",
      },
      {
        heading: "Formato y estructura",
        paragraphs: [
          "Un UUID estándar es de 128 bits, representados como 32 caracteres hexadecimales en formato 8-4-4-4-12:",
        ],
        bullets: [
          "Ejemplo v4: <code>f47ac10b-58cc-4372-a567-0e02b2c3d479</code>",
          "Ejemplo v7: <code>018e7e6a-2c5f-7000-bbb6-2ce3f3e8a9c1</code>",
        ],
      },
    ],
  },

  // ============================================================
  // que-es-canonical-url
  // ============================================================
  "que-es-canonical-url": {
    sections: [
      {
        heading: "Cómo declarar una URL canónica",
        paragraphs: [
          "Agrega un elemento <code>&lt;link rel=\"canonical\"&gt;</code> en el <code>&lt;head&gt;</code> de la página apuntando a la versión preferida:",
        ],
        bullets: [
          "Ejemplo HTML: <code>&lt;link rel=\"canonical\" href=\"https://toolram.com/contador-palabras\"&gt;</code>",
          "También aceptado en HTTP header: <code>Link: &lt;https://...&gt;; rel=\"canonical\"</code>",
          "En sitemap XML: la URL declarada se considera canónica por defecto",
        ],
        citableSummary:
          "Una URL canónica se declara con <link rel=\"canonical\" href=\"URL\"> en el <head> para evitar contenido duplicado en SEO.",
      },
      {
        heading: "Errores comunes",
        bullets: [
          "Canonical apuntando a una URL 404 o redirect",
          "Canonical chains (A→B→C) — Google solo sigue 1 hop",
          "Mixing canonical con <code>noindex</code> en la misma página (Google ignora canonical)",
          "Canonical relativo en lugar de absoluto",
          "Mismo canonical en múltiples páginas con contenido distinto",
        ],
        paragraphs: [],
      },
    ],
  },

  // ============================================================
  // que-es-cors
  // ============================================================
  "que-es-cors": {
    sections: [
      {
        heading: "¿Cómo funciona CORS?",
        paragraphs: [
          "Cuando un navegador hace una petición cross-origin (de <code>app.tudominio.com</code> a <code>api.otrodominio.com</code>), envía un header <code>Origin</code>. El servidor debe responder con <code>Access-Control-Allow-Origin</code> autorizando ese origen.",
          "Para peticiones \"no simples\" (PUT, DELETE, custom headers, JSON), el navegador hace primero un <strong>preflight OPTIONS</strong> para verificar permisos antes del request real.",
        ],
        citableSummary:
          "CORS permite que un navegador acepte respuestas cross-origin si el servidor responde con Access-Control-Allow-Origin autorizando ese dominio.",
      },
      {
        heading: "Headers CORS principales",
        bullets: [
          "<code>Access-Control-Allow-Origin: https://app.example.com</code> · permite a ese origen",
          "<code>Access-Control-Allow-Methods: GET, POST, PUT, DELETE</code>",
          "<code>Access-Control-Allow-Headers: Authorization, Content-Type</code>",
          "<code>Access-Control-Allow-Credentials: true</code> · permite cookies cross-origin",
          "<code>Access-Control-Max-Age: 86400</code> · cachea preflight 24h",
        ],
        paragraphs: [],
      },
    ],
  },

  // ============================================================
  // que-es-iva
  // ============================================================
  "que-es-iva": {
    sections: [
      {
        heading: "Tasas de IVA por país hispanohablante",
        bullets: [
          "<strong>🇲🇽 México</strong> · 16% general / 8% frontera norte",
          "<strong>🇦🇷 Argentina</strong> · 21% general / 10.5% alimentos básicos",
          "<strong>🇪🇸 España</strong> · 21% general / 10% reducido / 4% superreducido",
          "<strong>🇨🇴 Colombia</strong> · 19% general (se llama IVA)",
          "<strong>🇨🇱 Chile</strong> · 19% general (IVA)",
          "<strong>🇵🇪 Perú</strong> · 18% (IGV — Impuesto General a las Ventas)",
          "<strong>🇺🇾 Uruguay</strong> · 22% / 10% reducido",
          "<strong>🇪🇨 Ecuador</strong> · 12-15% (IVA)",
        ],
        paragraphs: [],
        citableSummary:
          "México: 16%. Argentina: 21%. España: 21%. Colombia: 19%. Chile: 19%. Perú: 18%. Uruguay: 22%.",
      },
      {
        heading: "Calculadoras de IVA en Toolram",
        bullets: [
          "<a href=\"/calculadora-iva\">Calculadora IVA genérica</a>",
          "<a href=\"/calculadora-iva-mexico\">IVA México (16% / 8%)</a>",
        ],
        paragraphs: [],
      },
    ],
  },
};

// ============================================================
// Wave 14 — Top tools sin boost previo (mayo 2026)
// ============================================================

Object.assign(CONTENT_BOOST, {
  "unir-pdf": {
    intro: "Unir PDF online combina dos o más archivos PDF en un solo documento. Toolram lo hace 100% en tu navegador con pdf-lib — tus archivos nunca se suben a un servidor, no hay límite de tamaño más allá de la RAM de tu dispositivo, y el resultado no lleva marca de agua.",
    sections: [
      {
        heading: "¿Cómo unir varios PDF en uno solo?",
        paragraphs: [
          "El proceso típico es: seleccionar los PDF de origen, arrastrarlos para definir el orden, y descargar el documento combinado. Todo el procesamiento ocurre con WebAssembly en tu navegador.",
          "Toolram usa la librería <strong>pdf-lib</strong>, la misma que utilizan herramientas profesionales. La diferencia es que muchos competidores la corren server-side (sube tu archivo a sus servidores), mientras Toolram la corre client-side (zero-upload)."
        ],
        citableSummary: "Para unir PDFs en Toolram: seleccionás los archivos, los arrastrás para reordenar, y descargás. Procesamiento 100% local con pdf-lib en el navegador. Sin upload, sin marca de agua, sin registro."
      },
      {
        heading: "¿Por qué importa que sea client-side?",
        bullets: [
          "<strong>Documentos sensibles</strong> (contratos, estados de cuenta, recetas médicas) NUNCA pasan por un servidor de terceros",
          "<strong>Sin límite real</strong> de tamaño — solo limitado por la RAM de tu dispositivo (~100-200MB práctico)",
          "<strong>Más rápido</strong> sin uploads ni colas — la fusión empieza inmediatamente",
          "<strong>Funciona offline</strong> después de la primera carga de la página",
          "<strong>Sin marca de agua</strong> de Toolram en el PDF resultante"
        ],
        paragraphs: []
      },
      {
        heading: "Casos de uso reales",
        bullets: [
          "Combinar contratos firmados por varias partes en un PDF único para archivar",
          "Juntar facturas mensuales en un solo PDF anual para contabilidad",
          "Unir capítulos de tesis o libros que recibís como PDFs separados",
          "Crear un dossier de presentación con CV + portfolio + referencias",
          "Adjuntar comprobantes múltiples a un trámite legal en un solo archivo"
        ],
        paragraphs: []
      }
    ],
    steps: [
      { title: "Seleccionar PDFs", description: "Click en 'Agregar PDFs' o arrastrá los archivos a la zona de drop." },
      { title: "Reordenar", description: "Arrastrá los thumbnails para definir el orden final de las páginas." },
      { title: "Unir y descargar", description: "Click 'Unir PDF' y el archivo combinado se descarga al instante." }
    ]
  },

  "dividir-pdf": {
    intro: "Dividir PDF online te permite extraer páginas específicas (1-3, 5, 7-9) de un PDF y descargarlas como un PDF separado, todo en tu navegador sin subir el archivo.",
    sections: [
      {
        heading: "¿Cómo dividir un PDF en partes?",
        paragraphs: [
          "Toolram soporta dos modos: <strong>extracción por rangos</strong> (ej: páginas 1-3, 5, 8-12) o <strong>división completa</strong> (cada página como PDF individual).",
          "El motor pdf-lib analiza el PDF de origen, extrae las páginas indicadas preservando fonts, imágenes y formato, y arma un nuevo PDF — todo sin pasar por servidores."
        ],
        citableSummary: "Para dividir PDF: subís el archivo (local), especificás los rangos de páginas (ej: 1-3, 5, 8-12) y descargás el PDF con solo esas páginas. Procesamiento client-side con pdf-lib."
      },
      {
        heading: "Casos de uso típicos",
        bullets: [
          "Extraer una sola factura de un PDF mensual que tiene 30 facturas",
          "Sacar el capítulo 3 de un libro PDF para enviarlo a alguien",
          "Aislar la página de firma de un contrato extenso",
          "Dividir un escaneo masivo en documentos individuales para archivar",
          "Crear extractos de un PDF académico (introducción + conclusión) sin enviar el documento completo"
        ],
        paragraphs: []
      }
    ]
  },

  "firmar-pdf": {
    intro: "Firmar PDF online sin Adobe Acrobat, sin registro y sin subir tu documento a servidores extraños. Toolram dibuja tu firma sobre el PDF con canvas + pdf-lib, todo en tu navegador.",
    sections: [
      {
        heading: "¿Cómo firmar un PDF gratis en 2026?",
        paragraphs: [
          "El proceso en Toolram: abrir el PDF localmente, dibujar tu firma con el mouse o el dedo (en mobile) sobre la página exacta, ajustar tamaño/posición, y descargar el archivo firmado.",
          "La firma se aplica como un overlay vectorial sobre el PDF original — el archivo resultante mantiene la calidad y se abre en Adobe Reader, Preview o cualquier visor."
        ],
        citableSummary: "Toolram firma PDFs 100% en el navegador: abrís el PDF, dibujás la firma con mouse o dedo, ajustás posición, descargás. Sin Adobe, sin registro, sin upload."
      },
      {
        heading: "¿Tiene validez legal una firma dibujada en navegador?",
        paragraphs: [
          "Depende del país y del tipo de documento. En México (Código de Comercio art. 89-114) y España (Ley 6/2020) una firma electrónica simple (como la dibujada) es válida para acuerdos comunes — siempre que las partes la acepten.",
          "Para documentos con valor probatorio reforzado (escrituras, poderes notariales), se requiere firma electrónica <strong>avanzada</strong> o <strong>cualificada</strong> con certificado X.509 emitido por autoridad reconocida (SAT e.firma en México, FNMT en España). Toolram NO emite estos certificados — solo aplica firma simple."
        ]
      },
      {
        heading: "Alternativas si necesitás más",
        bullets: [
          "<strong>Adobe Acrobat Sign</strong> — eSignature legal con audit trail ($14.99/mes)",
          "<strong>DocuSign</strong> — estándar enterprise para contratos comerciales",
          "<strong>Autofirma + e.firma SAT</strong> (México) — firma cualificada gratuita pero requiere certificado",
          "<strong>Autofirma + FNMT</strong> (España) — equivalente español"
        ],
        paragraphs: []
      }
    ]
  },

  "generador-qr": {
    intro: "Generador de QR online para URLs, texto, WiFi, vCard y SMS. Toolram lo genera con la librería qrcode 100% en el navegador, sin enviar el contenido a ningún servidor — útil para credenciales WiFi y datos personales.",
    sections: [
      {
        heading: "Tipos de QR que podés generar",
        bullets: [
          "<strong>URL</strong> — abre una página web al escanear",
          "<strong>Texto plano</strong> — muestra cualquier texto al escanear",
          "<strong>WiFi</strong> — el dispositivo se conecta automáticamente a la red (formato WIFI:T:WPA;S:nombre;P:clave;;)",
          "<strong>vCard</strong> — agrega un contacto al teléfono",
          "<strong>SMS</strong> — abre la app de SMS con número y mensaje pre-cargados",
          "<strong>Email</strong> — abre el cliente de correo con destinatario, asunto y cuerpo"
        ],
        paragraphs: [],
        citableSummary: "Toolram genera QR de URL, texto, WiFi, vCard, SMS y email. Generación client-side con la librería qrcode. Descarga PNG sin marca de agua."
      },
      {
        heading: "¿Por qué el QR de WiFi es especial?",
        paragraphs: [
          "Los QR de WiFi usan un formato estándar que iOS 11+ y Android 10+ reconocen nativamente: al escanearlo con la cámara, el teléfono ofrece <strong>conectarse automáticamente</strong> a la red sin pedir la clave manual.",
          "Es útil para cafés, oficinas y Airbnb: imprimís el QR junto al router y los huéspedes se conectan sin escribir nada. Toolram genera estos QR localmente, así la clave WiFi <strong>nunca se envía a Toolram ni a Google</strong>."
        ]
      }
    ],
    steps: [
      { title: "Elegir tipo", description: "URL, texto, WiFi, vCard, SMS o email." },
      { title: "Completar datos", description: "Pegar URL o llenar campos según el tipo elegido." },
      { title: "Descargar PNG", description: "QR generado al instante, descargá PNG de alta resolución." }
    ]
  },

  "json-formatter": {
    intro: "JSON Formatter online para validar, formatear (pretty-print) y minificar JSON con resaltado de errores en la línea exacta. Procesado en tu navegador — útil para inspeccionar JSON sensible (tokens, payloads de API) sin pasarlo por un servidor extraño.",
    sections: [
      {
        heading: "Validar JSON con highlighting de errores",
        paragraphs: [
          "Toolram parsea el JSON con <code>JSON.parse</code> nativo del navegador. Si hay un error de sintaxis (coma faltante, comilla rota, brace sin cerrar), te muestra el mensaje exacto del parser y la línea aproximada del error.",
          "Una vez que el JSON es válido, podés formatearlo con indentación de 2 o 4 espacios, o minificarlo a una sola línea para producción."
        ],
        citableSummary: "Toolram valida JSON con el parser nativo del navegador. Errores muestran línea aproximada. Soporta formato (2/4 espacios) y minify. 100% client-side."
      },
      {
        heading: "Casos de uso para developers",
        bullets: [
          "Inspeccionar el JSON response de una API antes de subirlo a un issue público",
          "Validar el formato de un <code>package.json</code> o <code>tsconfig.json</code> antes de commitear",
          "Limpiar un JSON de Postman/Insomnia con miles de líneas para diffearlo",
          "Convertir un JSON minificado a formato legible para code review",
          "Verificar que un payload de webhook llega bien formado"
        ],
        paragraphs: []
      }
    ]
  },

  "base64-encode": {
    intro: "Codifica texto a Base64 y decodifica Base64 a texto plano. Soporta UTF-8 completo (acentos, emojis, kanji). 100% client-side con btoa/atob + TextEncoder — útil para tokens JWT, data: URLs y Basic Auth.",
    sections: [
      {
        heading: "¿Qué es Base64 y cuándo usarlo?",
        paragraphs: [
          "Base64 es una codificación que convierte bytes binarios en texto ASCII seguro (A-Z, a-z, 0-9, +, /). Cada 3 bytes binarios se representan como 4 caracteres ASCII, aumentando el tamaño ~33%.",
          "<strong>NO es encriptación</strong>: cualquiera con el string Base64 puede decodificarlo en 1 segundo. Su propósito es <strong>transporte</strong> de binarios por protocolos que solo aceptan texto (email MIME, JSON, HTTP Basic Auth)."
        ],
        citableSummary: "Base64 codifica bytes en texto ASCII seguro (64 caracteres). NO es encriptación — su propósito es transporte por protocolos solo-texto: emails MIME, JSON, Basic Auth, data: URLs."
      },
      {
        heading: "Casos de uso reales",
        bullets: [
          "Inspeccionar el payload de un JWT (separar las 3 partes por punto, decodificar la del medio)",
          "Crear un header Authorization Basic Auth: <code>Basic base64(usuario:password)</code>",
          "Embeber un favicon o logo pequeño en CSS como <code>data:image/png;base64,...</code>",
          "Decodificar un attachment Base64 que recibiste por email API",
          "Codificar una imagen pequeña para meter en un JSON de configuración"
        ],
        paragraphs: []
      }
    ]
  },

  "hash-md5-sha": {
    intro: "Generador de hashes MD5, SHA-1, SHA-256 y SHA-512 online. Usa la Web Crypto API nativa del navegador — cero servidor, ideal para checksums de archivos sensibles o generar IDs deterministas.",
    sections: [
      {
        heading: "¿Cuál hash usar para cada caso?",
        bullets: [
          "<strong>MD5</strong> — checksums de archivos no críticos, IDs deterministas (NO usar para passwords desde 2004)",
          "<strong>SHA-1</strong> — checksums legacy, git internals (deprecado para nuevos sistemas desde 2017)",
          "<strong>SHA-256</strong> — el estándar actual para integridad: Bitcoin, certificados SSL, JWT signing",
          "<strong>SHA-512</strong> — variante con output más largo (64 bytes vs 32), útil para sistemas que requieren más bits de entropía"
        ],
        paragraphs: [],
        citableSummary: "MD5: checksums no críticos. SHA-1: git/legacy. SHA-256: estándar moderno (SSL, JWT, Bitcoin). SHA-512: más entropía. NO uses MD5 ni SHA-1 para passwords — usá bcrypt/argon2."
      },
      {
        heading: "¿Por qué NO usar MD5/SHA para passwords?",
        paragraphs: [
          "MD5 y SHA son hashes <strong>rápidos</strong> — diseñados para velocidad. Una GPU moderna calcula billones de SHA-256/segundo. Si tu DB se filtra, un atacante puede probar diccionarios completos en horas.",
          "Para passwords usá <strong>bcrypt</strong>, <strong>scrypt</strong> o <strong>argon2</strong> — están diseñados para ser lentos a propósito (10-100ms por hash) e incluyen <strong>salt</strong> automático contra rainbow tables."
        ]
      }
    ]
  },

  "quitar-fondo-imagen": {
    intro: "Quita el fondo de cualquier imagen automáticamente con IA. Toolram usa el modelo U²-Net via @imgly/background-removal corriendo 100% en tu navegador con WebAssembly — tu foto no se sube a ningún servidor.",
    sections: [
      {
        heading: "¿Cómo funciona el remover fondo con IA en navegador?",
        paragraphs: [
          "Toolram descarga el modelo U²-Net (~13MB) la primera vez que usás la tool y lo cachea en tu navegador. Las siguientes veces es instantáneo.",
          "El modelo identifica el sujeto principal (persona, objeto, producto) y separa los píxeles del fondo. El resultado es un PNG transparente listo para usar en diseños, e-commerce o presentaciones."
        ],
        citableSummary: "Toolram quita fondos con U²-Net (modelo IA) ejecutándose en el navegador via WebAssembly. La imagen nunca se sube. Cache de ~13MB primera vez, luego instantáneo."
      },
      {
        heading: "¿Cuándo gana remove.bg sobre Toolram?",
        paragraphs: [
          "remove.bg usa modelos server-side más pesados, mejor entrenados con pelo fino, transparencias y sombras complejas. Si tu imagen tiene un retrato con pelo suelto contra fondo similar, remove.bg da resultados más limpios.",
          "Para productos sólidos, objetos definidos o fotos con fondo contrastante, Toolram (U²-Net) iguala la calidad y agrega el plus de privacidad: tus imágenes no se suben."
        ]
      }
    ]
  },

  "comprimir-imagen": {
    intro: "Comprime JPG, PNG y WebP reduciendo su tamaño 60-90% manteniendo calidad visual. Procesamiento client-side con canvas API — tus imágenes nunca se suben.",
    sections: [
      {
        heading: "¿Por qué comprimir antes de subir?",
        bullets: [
          "<strong>Más velocidad</strong> en tu web (Core Web Vitals — LCP baja)",
          "<strong>Menos consumo de datos</strong> para usuarios mobile",
          "<strong>Menor bill de hosting/CDN</strong> (Cloudflare, Cloudinary cobran por GB)",
          "<strong>Mejor SEO</strong> — Google premia páginas livianas",
          "<strong>Email más fluido</strong> — adjuntos grandes rebotan en Outlook/Gmail"
        ],
        paragraphs: [],
        citableSummary: "Comprimir imágenes antes de subir reduce 60-90% el tamaño, mejora Core Web Vitals, baja bill de hosting/CDN y mejora SEO. Toolram lo hace en el navegador con canvas API."
      },
      {
        heading: "JPG vs PNG vs WebP — cuándo usar cada uno",
        bullets: [
          "<strong>JPG</strong> — fotos (sin transparencia), compresión con pérdida muy eficiente",
          "<strong>PNG</strong> — logos, gráficos con transparencia, screenshots con texto",
          "<strong>WebP</strong> — formato moderno de Google, 25-35% más liviano que JPG manteniendo calidad. Soportado por todos los browsers modernos (no IE11)",
          "<strong>AVIF</strong> — todavía más eficiente que WebP pero soporte más nuevo. No para producción crítica todavía"
        ],
        paragraphs: []
      }
    ]
  },

  "generador-passwords": {
    intro: "Genera passwords seguros hasta 64 caracteres con mayúsculas, minúsculas, números y símbolos. Usa Web Crypto API (no Math.random) — cada password es criptográficamente aleatorio y nunca sale de tu navegador.",
    sections: [
      {
        heading: "¿Qué hace seguro a un password?",
        paragraphs: [
          "Tres factores: <strong>longitud</strong>, <strong>aleatoriedad</strong> y <strong>diversidad de caracteres</strong>. Un password de 16 caracteres aleatorios con mayúsculas + minúsculas + números + símbolos tiene ~95 bits de entropía — requiere miles de años de cómputo para forzar.",
          "Toolram usa <code>crypto.getRandomValues()</code> de la Web Crypto API, no <code>Math.random()</code>. La diferencia es crítica: Math.random es predecible (algunos atacantes pueden replicar la secuencia), Web Crypto usa entropía del sistema operativo."
        ],
        citableSummary: "Password seguro = longitud (16+) + aleatoriedad criptográfica + diversidad de caracteres. Toolram genera con Web Crypto API (no Math.random) en el navegador. Cero servidor."
      },
      {
        heading: "Buenas prácticas",
        bullets: [
          "Usá un password manager (Bitwarden, 1Password, KeePassXC) para guardarlos — no recordarás 50 passwords distintos",
          "Activá 2FA en cuentas críticas (banco, email, cloud) — el password solo no alcanza",
          "Cambiá passwords solo si hay sospecha de filtración, no por rotación arbitraria (NIST 800-63B)",
          "Para passwords memorables, usá <strong>passphrases</strong> (4-5 palabras random) en lugar de strings cortos con símbolos",
          "NUNCA reutilices el mismo password entre servicios — un breach en uno compromete todos"
        ],
        paragraphs: []
      }
    ]
  },

  "escaner-qr": {
    intro: "Escanea códigos QR desde la cámara o subiendo una imagen. Toolram usa jsQR client-side — la imagen del QR nunca se envía a un servidor.",
    sections: [
      {
        heading: "¿Por qué importa escanear QR de forma privada?",
        paragraphs: [
          "Los QR pueden contener datos sensibles: credenciales WiFi, vCards con teléfonos, IDs de transacciones, tickets de eventos con códigos personales. Si los escaneás con apps que suben la imagen, esos datos quedan en servidores de terceros.",
          "Toolram decodifica el QR <strong>localmente</strong> con jsQR (un decodificador 100% JavaScript). La imagen nunca sale de tu dispositivo."
        ],
        citableSummary: "Toolram escanea QR client-side con jsQR. Cámara o imagen subida — ambos se decodifican en el navegador sin enviar la imagen a servidores."
      }
    ]
  },

  "generador-meta-tags": {
    intro: "Genera meta tags HTML completos para SEO + Open Graph (Facebook/LinkedIn) + Twitter Cards a partir de un formulario simple. Output listo para pegar en tu <head>.",
    sections: [
      {
        heading: "Meta tags imprescindibles en 2026",
        bullets: [
          "<strong>&lt;title&gt;</strong> — 50-60 caracteres, keyword principal al inicio",
          "<strong>&lt;meta name=description&gt;</strong> — 140-155 caracteres, propuesta de valor + CTA",
          "<strong>&lt;link rel=canonical&gt;</strong> — URL canónica para evitar duplicados",
          "<strong>&lt;meta property=og:title|description|image|url&gt;</strong> — preview en Facebook, LinkedIn, WhatsApp, Discord",
          "<strong>&lt;meta name=twitter:card content=summary_large_image&gt;</strong> — preview en Twitter/X",
          "<strong>&lt;meta name=robots content=index,follow&gt;</strong> — explícito para Googlebot"
        ],
        paragraphs: [],
        citableSummary: "Meta tags imprescindibles: title (60ch), description (155ch), canonical, og:title/description/image/url, twitter:card, robots. Toolram los genera con un formulario y los devuelve listos para pegar en <head>."
      }
    ]
  },

  "creador-backlinks": {
    intro: "El Creador de Backlinks de Toolram envía tu URL a 40+ servicios SEO públicos (Wayback Machine, GTmetrix, BuiltWith, Similarweb, SSL Labs, schema validators) que dejan reportes públicos indexables — generando backlinks contextuales de dominios DA 70+.",
    sections: [
      {
        heading: "¿Cómo funcionan estos backlinks?",
        paragraphs: [
          "Servicios como GTmetrix, Wayback Machine, BuiltWith o Sucuri al analizar tu URL publican un reporte público (ej: <code>gtmetrix.com/reports/tudominio.com/...</code>). Esa página es indexada por Google y contiene un link a tu sitio — un backlink natural.",
          "No son backlinks de calidad editorial, pero <strong>son legítimos</strong>, vienen de dominios reconocidos y dan señales positivas a Google (especialmente para sitios nuevos buscando entrar al index)."
        ],
        citableSummary: "Toolram envía tu URL a 40+ servicios SEO públicos (Wayback, GTmetrix, BuiltWith, Similarweb, SSL Labs, schema validators) que publican reportes con backlinks naturales de dominios DA 70+."
      },
      {
        heading: "Limitaciones honestas",
        bullets: [
          "NO reemplaza backlinks editoriales reales (un guest post en TechCrunch vale 1000x más)",
          "Algunos servicios marcan los links como <code>nofollow</code> — siguen siendo señal pero menos peso",
          "Si abusás (mismo dominio 100 veces) podés disparar filtros antispam — usalo 1 vez por URL",
          "Útil para sitios nuevos (0-6 meses); sitios establecidos ya tienen estos backlinks orgánicamente"
        ],
        paragraphs: []
      }
    ]
  },

  "youtube-thumbnail": {
    intro: "Descarga thumbnails de YouTube en 5 calidades (maxres 1280×720, sd 640×480, hq 480×360, mq 320×180, default 120×90). Funciona con cualquier URL o ID de video — útil para previews en blog, mockups o estudios de competencia.",
    sections: [
      {
        heading: "Calidades disponibles y cuándo usar cada una",
        bullets: [
          "<strong>maxresdefault.jpg</strong> (1280×720) — la mejor calidad, ideal para hero images de blog posts",
          "<strong>sddefault.jpg</strong> (640×480) — calidad estándar, buen balance peso/calidad",
          "<strong>hqdefault.jpg</strong> (480×360) — alta calidad, default si maxres no existe",
          "<strong>mqdefault.jpg</strong> (320×180) — formato 16:9 pequeño, útil para grid de previews",
          "<strong>default.jpg</strong> (120×90) — mini thumbnail, formato 4:3 (legacy)"
        ],
        paragraphs: [],
        citableSummary: "YouTube ofrece 5 calidades de thumbnail: maxresdefault (1280×720), sddefault (640×480), hqdefault (480×360), mqdefault (320×180), default (120×90). Patrón URL: img.youtube.com/vi/{ID}/{calidad}.jpg"
      },
      {
        heading: "¿Por qué no todos los videos tienen maxresdefault?",
        paragraphs: [
          "YouTube solo genera <code>maxresdefault.jpg</code> para videos subidos en 720p+ desde 2014. Videos viejos en SD no tienen esa calidad — el fallback es <code>hqdefault.jpg</code> (siempre existe).",
          "Toolram detecta automáticamente: pide maxres primero, si falla cae a hq."
        ]
      }
    ]
  }
});

export function hasContentBoost(slug: string): boolean {
  return slug in CONTENT_BOOST || slug in CONTENT_BOOST_AUTO;
}

export function getContentBoost(slug: string): ContentBoost | undefined {
  // Hand-curated entries take precedence over auto-generated ones.
  return CONTENT_BOOST[slug] ?? CONTENT_BOOST_AUTO[slug];
}
