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

export function hasContentBoost(slug: string): boolean {
  return slug in CONTENT_BOOST;
}

export function getContentBoost(slug: string): ContentBoost | undefined {
  return CONTENT_BOOST[slug];
}
