export type Symbol = {
  char: string;
  name: string;
  unicode: string;
  category: string;
  alt?: string;
};

export type SymbolCategory = {
  slug: string;
  name: string;
  description: string;
  emoji: string;
  symbols: Symbol[];
};

export const SYMBOL_CATEGORIES: SymbolCategory[] = [
  {
    slug: "corazones",
    name: "Símbolos de corazón",
    description: "Copia y pega más de 25 corazones para tus mensajes, redes sociales y bio.",
    emoji: "❤️",
    symbols: [
      { char: "♥", name: "Corazón negro", unicode: "U+2665", category: "corazones" },
      { char: "♡", name: "Corazón blanco", unicode: "U+2661", category: "corazones" },
      { char: "❤", name: "Corazón rojo", unicode: "U+2764", category: "corazones" },
      { char: "❣", name: "Exclamación corazón", unicode: "U+2763", category: "corazones" },
      { char: "❥", name: "Corazón con flecha rotada", unicode: "U+2765", category: "corazones" },
      { char: "💕", name: "Dos corazones", unicode: "U+1F495", category: "corazones" },
      { char: "💖", name: "Corazón brillante", unicode: "U+1F496", category: "corazones" },
      { char: "💗", name: "Corazón creciente", unicode: "U+1F497", category: "corazones" },
      { char: "💘", name: "Corazón con flecha", unicode: "U+1F498", category: "corazones" },
      { char: "💙", name: "Corazón azul", unicode: "U+1F499", category: "corazones" },
      { char: "💚", name: "Corazón verde", unicode: "U+1F49A", category: "corazones" },
      { char: "💛", name: "Corazón amarillo", unicode: "U+1F49B", category: "corazones" },
      { char: "💜", name: "Corazón morado", unicode: "U+1F49C", category: "corazones" },
      { char: "🖤", name: "Corazón negro emoji", unicode: "U+1F5A4", category: "corazones" },
      { char: "🤍", name: "Corazón blanco emoji", unicode: "U+1F90D", category: "corazones" },
      { char: "🤎", name: "Corazón marrón", unicode: "U+1F90E", category: "corazones" },
      { char: "🧡", name: "Corazón naranja", unicode: "U+1F9E1", category: "corazones" },
      { char: "💝", name: "Corazón con moño", unicode: "U+1F49D", category: "corazones" },
      { char: "💞", name: "Corazones girando", unicode: "U+1F49E", category: "corazones" },
      { char: "💟", name: "Adorno de corazón", unicode: "U+1F49F", category: "corazones" },
      { char: "💌", name: "Carta de amor", unicode: "U+1F48C", category: "corazones" },
      { char: "💔", name: "Corazón roto", unicode: "U+1F494", category: "corazones" },
      { char: "💓", name: "Corazón latiendo", unicode: "U+1F493", category: "corazones" },
      { char: "❦", name: "Corazón floral", unicode: "U+2766", category: "corazones" },
      { char: "❧", name: "Corazón con tallo", unicode: "U+2767", category: "corazones" }
    ]
  },
  {
    slug: "estrellas",
    name: "Símbolos de estrella",
    description: "Estrellas blancas, negras, brillantes y de muchas puntas para copiar y pegar.",
    emoji: "⭐",
    symbols: [
      { char: "★", name: "Estrella negra", unicode: "U+2605", category: "estrellas" },
      { char: "☆", name: "Estrella blanca", unicode: "U+2606", category: "estrellas" },
      { char: "✦", name: "Estrella negra de 4 puntas", unicode: "U+2726", category: "estrellas" },
      { char: "✧", name: "Estrella blanca de 4 puntas", unicode: "U+2727", category: "estrellas" },
      { char: "✩", name: "Estrella ligera", unicode: "U+2729", category: "estrellas" },
      { char: "✪", name: "Estrella circulada", unicode: "U+272A", category: "estrellas" },
      { char: "✫", name: "Estrella abierta", unicode: "U+272B", category: "estrellas" },
      { char: "✬", name: "Estrella negra centro abierto", unicode: "U+272C", category: "estrellas" },
      { char: "✭", name: "Estrella delineada", unicode: "U+272D", category: "estrellas" },
      { char: "✮", name: "Estrella negra muy redonda", unicode: "U+272E", category: "estrellas" },
      { char: "✯", name: "Pinwheel star", unicode: "U+272F", category: "estrellas" },
      { char: "✰", name: "Estrella sombreada", unicode: "U+2730", category: "estrellas" },
      { char: "⭐", name: "Estrella emoji", unicode: "U+2B50", category: "estrellas" },
      { char: "🌟", name: "Estrella brillante", unicode: "U+1F31F", category: "estrellas" },
      { char: "✨", name: "Destellos", unicode: "U+2728", category: "estrellas" },
      { char: "💫", name: "Mareo estrellas", unicode: "U+1F4AB", category: "estrellas" },
      { char: "⋆", name: "Operador estrella pequeña", unicode: "U+22C6", category: "estrellas" },
      { char: "✱", name: "Asterisco pesado", unicode: "U+2731", category: "estrellas" },
      { char: "✲", name: "Asterisco abierto", unicode: "U+2732", category: "estrellas" },
      { char: "❋", name: "Florete pesado", unicode: "U+274B", category: "estrellas" },
      { char: "✴", name: "Estrella 8 puntas", unicode: "U+2734", category: "estrellas" },
      { char: "✵", name: "Pinwheel 8 puntas", unicode: "U+2735", category: "estrellas" }
    ]
  },
  {
    slug: "flechas",
    name: "Símbolos de flecha",
    description: "Flechas en todas direcciones: ←, →, ↑, ↓, dobles, curvas y decoradas.",
    emoji: "➡️",
    symbols: [
      { char: "←", name: "Flecha izquierda", unicode: "U+2190", category: "flechas" },
      { char: "→", name: "Flecha derecha", unicode: "U+2192", category: "flechas" },
      { char: "↑", name: "Flecha arriba", unicode: "U+2191", category: "flechas" },
      { char: "↓", name: "Flecha abajo", unicode: "U+2193", category: "flechas" },
      { char: "↔", name: "Flecha izq-der", unicode: "U+2194", category: "flechas" },
      { char: "↕", name: "Flecha arriba-abajo", unicode: "U+2195", category: "flechas" },
      { char: "↖", name: "Flecha noroeste", unicode: "U+2196", category: "flechas" },
      { char: "↗", name: "Flecha noreste", unicode: "U+2197", category: "flechas" },
      { char: "↘", name: "Flecha sureste", unicode: "U+2198", category: "flechas" },
      { char: "↙", name: "Flecha suroeste", unicode: "U+2199", category: "flechas" },
      { char: "⇐", name: "Doble flecha izquierda", unicode: "U+21D0", category: "flechas" },
      { char: "⇒", name: "Doble flecha derecha", unicode: "U+21D2", category: "flechas" },
      { char: "⇑", name: "Doble flecha arriba", unicode: "U+21D1", category: "flechas" },
      { char: "⇓", name: "Doble flecha abajo", unicode: "U+21D3", category: "flechas" },
      { char: "⇔", name: "Doble flecha izq-der", unicode: "U+21D4", category: "flechas" },
      { char: "↩", name: "Flecha gancho izquierda", unicode: "U+21A9", category: "flechas" },
      { char: "↪", name: "Flecha gancho derecha", unicode: "U+21AA", category: "flechas" },
      { char: "⤴", name: "Flecha curva arriba", unicode: "U+2934", category: "flechas" },
      { char: "⤵", name: "Flecha curva abajo", unicode: "U+2935", category: "flechas" },
      { char: "⬅", name: "Flecha izquierda gruesa", unicode: "U+2B05", category: "flechas" },
      { char: "➡", name: "Flecha derecha gruesa", unicode: "U+27A1", category: "flechas" },
      { char: "⬆", name: "Flecha arriba gruesa", unicode: "U+2B06", category: "flechas" },
      { char: "⬇", name: "Flecha abajo gruesa", unicode: "U+2B07", category: "flechas" },
      { char: "➜", name: "Flecha derecha pesada", unicode: "U+279C", category: "flechas" },
      { char: "➤", name: "Flecha derecha tipo punta", unicode: "U+27A4", category: "flechas" },
      { char: "➔", name: "Flecha derecha pesada", unicode: "U+2794", category: "flechas" },
      { char: "➢", name: "Flecha tipo cabeza", unicode: "U+27A2", category: "flechas" }
    ]
  },
  {
    slug: "matematicos",
    name: "Símbolos matemáticos",
    description: "Símbolos para fórmulas, ecuaciones y notación matemática.",
    emoji: "∑",
    symbols: [
      { char: "∑", name: "Sumatoria", unicode: "U+2211", category: "matematicos" },
      { char: "∏", name: "Productoria", unicode: "U+220F", category: "matematicos" },
      { char: "∫", name: "Integral", unicode: "U+222B", category: "matematicos" },
      { char: "√", name: "Raíz cuadrada", unicode: "U+221A", category: "matematicos" },
      { char: "∞", name: "Infinito", unicode: "U+221E", category: "matematicos" },
      { char: "≈", name: "Aproximadamente igual", unicode: "U+2248", category: "matematicos" },
      { char: "≠", name: "No igual", unicode: "U+2260", category: "matematicos" },
      { char: "≤", name: "Menor o igual", unicode: "U+2264", category: "matematicos" },
      { char: "≥", name: "Mayor o igual", unicode: "U+2265", category: "matematicos" },
      { char: "±", name: "Más-menos", unicode: "U+00B1", category: "matematicos" },
      { char: "×", name: "Por", unicode: "U+00D7", category: "matematicos" },
      { char: "÷", name: "Dividido", unicode: "U+00F7", category: "matematicos" },
      { char: "π", name: "Pi", unicode: "U+03C0", category: "matematicos" },
      { char: "Σ", name: "Sigma mayúscula", unicode: "U+03A3", category: "matematicos" },
      { char: "Δ", name: "Delta mayúscula", unicode: "U+0394", category: "matematicos" },
      { char: "α", name: "Alpha", unicode: "U+03B1", category: "matematicos" },
      { char: "β", name: "Beta", unicode: "U+03B2", category: "matematicos" },
      { char: "γ", name: "Gamma", unicode: "U+03B3", category: "matematicos" },
      { char: "θ", name: "Theta", unicode: "U+03B8", category: "matematicos" },
      { char: "λ", name: "Lambda", unicode: "U+03BB", category: "matematicos" },
      { char: "μ", name: "Mu", unicode: "U+03BC", category: "matematicos" },
      { char: "Ω", name: "Omega", unicode: "U+03A9", category: "matematicos" },
      { char: "∂", name: "Derivada parcial", unicode: "U+2202", category: "matematicos" },
      { char: "∇", name: "Nabla", unicode: "U+2207", category: "matematicos" },
      { char: "∈", name: "Pertenece", unicode: "U+2208", category: "matematicos" },
      { char: "∉", name: "No pertenece", unicode: "U+2209", category: "matematicos" },
      { char: "⊂", name: "Subconjunto", unicode: "U+2282", category: "matematicos" },
      { char: "⊃", name: "Superconjunto", unicode: "U+2283", category: "matematicos" },
      { char: "∪", name: "Unión", unicode: "U+222A", category: "matematicos" },
      { char: "∩", name: "Intersección", unicode: "U+2229", category: "matematicos" }
    ]
  },
  {
    slug: "moneda",
    name: "Símbolos de moneda",
    description: "Dólar, euro, libra, yen, peso, bitcoin y todas las monedas del mundo.",
    emoji: "💲",
    symbols: [
      { char: "$", name: "Dólar", unicode: "U+0024", category: "moneda" },
      { char: "€", name: "Euro", unicode: "U+20AC", category: "moneda" },
      { char: "£", name: "Libra esterlina", unicode: "U+00A3", category: "moneda" },
      { char: "¥", name: "Yen / Yuan", unicode: "U+00A5", category: "moneda" },
      { char: "₹", name: "Rupia india", unicode: "U+20B9", category: "moneda" },
      { char: "₽", name: "Rublo ruso", unicode: "U+20BD", category: "moneda" },
      { char: "₿", name: "Bitcoin", unicode: "U+20BF", category: "moneda" },
      { char: "₩", name: "Won coreano", unicode: "U+20A9", category: "moneda" },
      { char: "¢", name: "Centavo", unicode: "U+00A2", category: "moneda" },
      { char: "₱", name: "Peso filipino", unicode: "U+20B1", category: "moneda" },
      { char: "₪", name: "Shekel", unicode: "U+20AA", category: "moneda" },
      { char: "₫", name: "Dong vietnamita", unicode: "U+20AB", category: "moneda" },
      { char: "₴", name: "Hryvnia ucraniano", unicode: "U+20B4", category: "moneda" },
      { char: "₸", name: "Tenge kazajo", unicode: "U+20B8", category: "moneda" },
      { char: "₺", name: "Lira turca", unicode: "U+20BA", category: "moneda" }
    ]
  },
  {
    slug: "musica",
    name: "Símbolos musicales",
    description: "Notas, claves y símbolos musicales para Unicode.",
    emoji: "♪",
    symbols: [
      { char: "♩", name: "Negra", unicode: "U+2669", category: "musica" },
      { char: "♪", name: "Corchea", unicode: "U+266A", category: "musica" },
      { char: "♫", name: "Dos corcheas", unicode: "U+266B", category: "musica" },
      { char: "♬", name: "Dos semicorcheas", unicode: "U+266C", category: "musica" },
      { char: "♭", name: "Bemol", unicode: "U+266D", category: "musica" },
      { char: "♮", name: "Becuadro", unicode: "U+266E", category: "musica" },
      { char: "♯", name: "Sostenido", unicode: "U+266F", category: "musica" }
    ]
  },
  {
    slug: "check-cross",
    name: "Check y cruz",
    description: "Tildes, palomitas, cruces y aspas para listas y formularios.",
    emoji: "✓",
    symbols: [
      { char: "✓", name: "Check ligero", unicode: "U+2713", category: "check-cross" },
      { char: "✔", name: "Check pesado", unicode: "U+2714", category: "check-cross" },
      { char: "✗", name: "Cruz ligera", unicode: "U+2717", category: "check-cross" },
      { char: "✘", name: "Cruz pesada", unicode: "U+2718", category: "check-cross" },
      { char: "☑", name: "Caja con check", unicode: "U+2611", category: "check-cross" },
      { char: "☒", name: "Caja con cruz", unicode: "U+2612", category: "check-cross" },
      { char: "☐", name: "Caja vacía", unicode: "U+2610", category: "check-cross" },
      { char: "✅", name: "Check verde emoji", unicode: "U+2705", category: "check-cross" },
      { char: "❌", name: "Cruz roja emoji", unicode: "U+274C", category: "check-cross" },
      { char: "❎", name: "Caja con cruz emoji", unicode: "U+274E", category: "check-cross" }
    ]
  },
  {
    slug: "lenny-faces",
    name: "Lenny Faces y Kaomoji",
    description: "Caritas japonesas y Lenny faces clásicos para chats.",
    emoji: "ʕ•ᴥ•ʔ",
    symbols: [
      { char: "( ͡° ͜ʖ ͡°)", name: "Lenny clásico", unicode: "Kaomoji", category: "lenny-faces" },
      { char: "( ͡~ ͜ʖ ͡°)", name: "Lenny coqueto", unicode: "Kaomoji", category: "lenny-faces" },
      { char: "( ͠° ͟ʖ ͡°)", name: "Lenny serio", unicode: "Kaomoji", category: "lenny-faces" },
      { char: "( ͡ᵔ ͜ʖ ͡ᵔ)", name: "Lenny feliz", unicode: "Kaomoji", category: "lenny-faces" },
      { char: "ಠ_ಠ", name: "Mirada de desaprobación", unicode: "Kaomoji", category: "lenny-faces" },
      { char: "¬‿¬", name: "Sonrisa irónica", unicode: "Kaomoji", category: "lenny-faces" },
      { char: "ʕ•ᴥ•ʔ", name: "Oso", unicode: "Kaomoji", category: "lenny-faces" },
      { char: "(╯°□°)╯︵ ┻━┻", name: "Tirando la mesa", unicode: "Kaomoji", category: "lenny-faces" },
      { char: "┬─┬ノ( º _ ºノ)", name: "Poniendo la mesa", unicode: "Kaomoji", category: "lenny-faces" },
      { char: "(づ｡◕‿‿◕｡)づ", name: "Abrazo", unicode: "Kaomoji", category: "lenny-faces" },
      { char: "ヽ(´▽`)/", name: "Saludando", unicode: "Kaomoji", category: "lenny-faces" },
      { char: "ಥ_ಥ", name: "Llorando", unicode: "Kaomoji", category: "lenny-faces" },
      { char: "(ʘ‿ʘ)", name: "Sorprendido", unicode: "Kaomoji", category: "lenny-faces" },
      { char: "(◕‿◕)", name: "Sonriendo dulce", unicode: "Kaomoji", category: "lenny-faces" },
      { char: "(─‿‿─)", name: "Confianza", unicode: "Kaomoji", category: "lenny-faces" }
    ]
  }
];

export const SYMBOLS_BY_CATEGORY = Object.fromEntries(SYMBOL_CATEGORIES.map((c) => [c.slug, c]));
