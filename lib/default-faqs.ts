import type { Tool } from "@/lib/tools-registry";
import type { Calculator } from "@/lib/calculators";

type FAQ = { q: string; a: string };

const PRIVACY_BY_CATEGORY: Record<string, string> = {
  pdf: "Sí. Los archivos se procesan en tu navegador con WebAssembly y JavaScript — no se suben a ningún servidor de Toolram.",
  image: "Sí. Las imágenes se procesan localmente en tu navegador con Canvas API — nunca salen de tu dispositivo.",
  text: "Sí. Todo el procesamiento ocurre en tu navegador. No guardamos ni enviamos tu texto a ningún servidor.",
  developer: "Sí. La herramienta procesa tus datos 100% en el cliente. No hay backend recibiendo nada.",
  generator: "Sí. La generación es local en tu navegador con Web Crypto API o JavaScript puro.",
  calculator: "Sí. Los cálculos se hacen en tu navegador, no enviamos los valores a ningún servidor.",
  finance: "Sí. Los importes y datos financieros se calculan localmente — nada se transmite ni almacena.",
  design: "Sí. La generación de CSS y previews ocurre en tu navegador.",
  marketing: "Sí. Los datos de campaña se calculan en cliente — útil para no exponer métricas confidenciales.",
  network: "Sí. Los cálculos de red se hacen localmente. Las consultas DNS/WHOIS pasan por proveedores públicos sin almacenar tu IP.",
  seo: "Sí. La herramienta corre en tu navegador. Las URLs analizadas no se registran en nuestros logs.",
  converter: "Sí. La conversión es 100% client-side — tus datos no se envían a ningún servidor.",
  symbols: "Sí. Es una página estática con copia al portapapeles — no enviamos nada.",
  "fancy-text": "Sí. La transformación Unicode ocurre en tu navegador, sin tracking del texto.",
  test: "Sí. Tus métricas de test (clicks, reacción, tipeo) se miden y muestran en cliente, sin enviarse.",
  random: "Sí. La generación aleatoria usa Math.random/crypto.getRandomValues local.",
  ai: "Las herramientas de IA marcadas como server-side avisan en su descripción. Las que dicen 'Web Speech API' o 'Tesseract.js' procesan en tu navegador."
};

const PURPOSE_HINT_BY_CATEGORY: Record<string, string> = {
  pdf: "edición y conversión de archivos PDF",
  image: "edición y procesamiento de imágenes",
  text: "manipulación y análisis de texto",
  developer: "tareas de desarrollo y debugging",
  generator: "generación rápida de elementos útiles",
  calculator: "cálculos precisos del día a día",
  finance: "planificación financiera",
  design: "diseño web y prototipado",
  marketing: "campañas de marketing digital",
  network: "administración de redes",
  seo: "auditoría y optimización SEO",
  converter: "conversión entre formatos y unidades",
  symbols: "copiar caracteres especiales y símbolos",
  "fancy-text": "estilizar texto para redes sociales",
  test: "medir velocidad y reflejos",
  random: "tomar decisiones aleatorias",
  ai: "tareas asistidas por IA"
};

export function defaultFaqs(tool: Tool): FAQ[] {
  if (tool.faqs && tool.faqs.length > 0) return tool.faqs;
  const name = tool.name;
  const cat = tool.category;
  const purpose = PURPOSE_HINT_BY_CATEGORY[cat] || "esta tarea";
  const privacy = PRIVACY_BY_CATEGORY[cat] || "Sí. Toolram funciona principalmente client-side: tus datos se procesan en tu navegador.";
  return [
    {
      q: `¿${name} es gratis?`,
      a: `Sí, ${name} es 100% gratuita y sin límite de uso. No requiere registro, no tiene marca de agua y no muestra anuncios intrusivos. Toolram se mantiene con publicidad lateral discreta y donaciones.`
    },
    {
      q: "¿Mis datos salen de mi navegador?",
      a: privacy
    },
    {
      q: `¿Funciona en móvil ${name.toLowerCase()}?`,
      a: `Sí. ${name} está optimizada para Chrome, Safari, Firefox y Edge — tanto en escritorio como en iOS y Android. El layout es responsive y funciona sin instalación.`
    },
    {
      q: `¿Para qué se usa ${name.toLowerCase()}?`,
      a: `${name} se usa para ${purpose}. ${tool.shortDesc} Es ideal para profesionales que necesitan resolver la tarea rápido sin instalar software ni crear cuentas.`
    },
    {
      q: "¿Hay límite de uso?",
      a: "No, podés usar la herramienta tantas veces como quieras. Los archivos pesados (PDF, imágenes) están limitados solo por la memoria de tu navegador, no por nosotros."
    }
  ];
}

export function defaultCalcFaqs(calc: Calculator): FAQ[] {
  return [
    {
      q: `¿${calc.name} es gratis?`,
      a: `Sí. ${calc.name} es 100% gratuita, sin registro y sin marca de agua. Sin límites de cálculo.`
    },
    {
      q: "¿Los valores que ingreso se guardan?",
      a: "No. Los cálculos se hacen completamente en tu navegador. Ningún dato se envía ni almacena en servidores de Toolram."
    },
    {
      q: `¿Cómo funciona ${calc.name}?`,
      a: `${calc.longDesc.slice(0, 240)}`
    },
    {
      q: "¿Es precisa la calculadora?",
      a: "Sí, usamos las fórmulas estándar de la industria con precisión de punto flotante de 64 bits (IEEE 754). Para cálculos críticos legales/financieros consulta siempre a un profesional."
    },
    {
      q: "¿Funciona en móvil?",
      a: "Sí. La calculadora está optimizada para móvil con teclado numérico nativo en inputs."
    }
  ];
}
