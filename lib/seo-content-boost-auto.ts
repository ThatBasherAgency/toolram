import type { ContentBoost } from "./seo-content-boost";

/**
 * AUTO-GENERATED extended SEO content for tool pages that previously had only
 * a short description. Original, tool-specific guides written to satisfy the
 * E-E-A-T / content-depth bar (AdSense "low value content" fix, 2026-05-29).
 * Merged into getContentBoost() via CONTENT_BOOST_AUTO.
 */
export const CONTENT_BOOST_AUTO: Record<string, ContentBoost> = {
  "contador-caracteres": {
    "intro": "El Contador de caracteres muestra en tiempo real cuántos caracteres tiene tu texto, tanto con espacios como sin ellos, palabras, oraciones y párrafos. Es indispensable para redactores, community managers y especialistas en SEO que trabajan con límites estrictos en plataformas y campos de formulario.",
    "sections": [
      {
        "heading": "¿Qué límites de caracteres importan en la práctica?",
        "paragraphs": [
          "Cada plataforma tiene un tope distinto y superarlo tiene consecuencias concretas. En <strong>Twitter/X el límite es 280 caracteres</strong>; superarlo impide publicar. Las <strong>meta descriptions se truncan alrededor de 155 caracteres</strong> en los resultados de Google, y los title tags se cortan cerca de los 60 (≈600px de ancho en desktop). Los SMS tradicionales permiten 160 caracteres en GSM-7 o solo 70 en Unicode (emojis o tildes en algunos encodings), algo crítico para campañas de SMS marketing en México.",
          "LinkedIn acepta 3.000 caracteres en publicaciones, pero el extracto visible antes del botón 'ver más' es de apenas unos 210. YouTube trunca las descripciones de video en las primeras 100-150 caracteres en los resultados de búsqueda. Conocer estos umbrales antes de publicar ahorra tiempo y evita mensajes cortados que se ven poco profesionales.",
          "Los formularios de captura de leads o fichas de producto en e-commerce también imponen límites técnicos en base de datos (VARCHAR 255, por ejemplo). Escribir el copy directamente en este contador te da visibilidad inmediata sin depender de que el formulario rechace el texto."
        ],
        "citableSummary": "<strong>Un title tag SEO óptimo tiene entre 50 y 60 caracteres</strong> para evitar el truncado en los resultados de Google y mejorar el CTR orgánico.",
        "bullets": [
          "Twitter/X: 280 caracteres por tweet",
          "Title tag SEO: 50-60 caracteres (≈600 px)",
          "Meta description SEO: hasta 155 caracteres",
          "SMS GSM-7: 160 caracteres por mensaje",
          "Instagram bio: 150 caracteres",
          "WhatsApp Business descripción: 256 caracteres"
        ]
      },
      {
        "heading": "Usos más allá del SEO: contratos, formularios y código",
        "paragraphs": [
          "Abogados y notarios que trabajan con plataformas judiciales digitales (como el SCEJ en México) saben que ciertos campos de texto aceptan un máximo de caracteres. Pegar el texto en un contador antes de enviarlo evita errores de truncado en actas o escrituras digitalizadas.",
          "Los desarrolladores también lo usan para validar constantes en código: nombres de variables, mensajes de log, etiquetas en AWS/GCP tienen límites de longitud. Contar caracteres de un JSON key o un label de Kubernetes (63 caracteres máx.) antes de escribirlo en el código ahorra un ciclo de CI/CD fallido.",
          "Para publicidad digital —Google Ads, Meta Ads— los límites son duros: titulares de Google Ads hasta 30 caracteres, descripciones hasta 90. Escribir el copy en esta herramienta y revisar los conteos exactos antes de subir la campaña evita rechazos automáticos."
        ]
      },
      {
        "heading": "Diferencia entre caracteres, palabras y bytes",
        "paragraphs": [
          "Un error común es confundir caracteres con bytes. Un carácter ASCII (letra inglesa, número) ocupa 1 byte en UTF-8, pero una letra con tilde (á, é, ñ) ocupa 2 bytes y un emoji puede ocupar 4. Plataformas como Twitter cuentan caracteres Unicode, no bytes, por lo que una ñ vale 1 carácter. Pero si tu base de datos usa <code>VARCHAR(255)</code> con charset <code>latin1</code>, las tildes sí consumen el doble de espacio.",
          "Las palabras, en cambio, se separan por espacios o signos de puntuación. Un texto de 280 caracteres puede tener entre 40 y 70 palabras según la longitud promedio. Para artículos SEO, el conteo de palabras es tan importante como el de caracteres: Google y herramientas como Clearscope o Surfer SEO establecen rangos de word count para rankear en determinadas categorías."
        ],
        "citableSummary": "En UTF-8, un carácter en español con tilde (á, é, ñ) ocupa 2 bytes, no 1; esto afecta límites en bases de datos con charset <strong>latin1</strong> pero no en plataformas sociales que cuentan puntos de código Unicode."
      }
    ],
    "steps": [
      {
        "title": "Pegar o escribir tu texto",
        "description": "Ingresa el texto en el área principal. El conteo se actualiza de forma instantánea, sin necesidad de hacer clic en ningún botón."
      },
      {
        "title": "Revisar los contadores",
        "description": "Observa los valores de caracteres con espacios, sin espacios, palabras, oraciones y párrafos para el contexto que necesites (Twitter, meta description, SMS, etc.)."
      },
      {
        "title": "Ajustar el texto hasta el límite deseado",
        "description": "Edita directamente en el área de texto hasta alcanzar el número objetivo. El indicador cambia de color cuando te acercas o superas un umbral definido."
      },
      {
        "title": "Copiar el resultado final",
        "description": "Una vez satisfecho con el conteo, copia el texto ajustado y pégalo en tu plataforma de destino con confianza."
      }
    ]
  },
  "numerar-pdf": {
    "intro": "La herramienta para numerar páginas de PDF inserta automáticamente la numeración en formato '1/N' al pie de cada página, con posición configurable. Es ideal para tesis, informes legales, manuales técnicos o cualquier documento que deba entregarse con foliado oficial.",
    "sections": [
      {
        "heading": "¿Por qué el foliado de páginas importa en documentos formales?",
        "paragraphs": [
          "En México y gran parte de Latinoamérica, los documentos entregados ante notarías, juzgados o dependencias de gobierno deben presentarse <strong>foliados</strong> para garantizar que no se insertó ni extrajo ninguna hoja. El formato estándar '1/N' (por ejemplo, '1/15', '2/15'…) permite verificar de un vistazo que el expediente está completo. Sin numeración, un documento puede ser rechazado en trámites administrativos.",
          "Las universidades también exigen paginación en tesis y trabajos recepcionales. El reglamento de titulación de la UNAM, el IPN y muchas otras instituciones indica que la numeración debe aparecer en el pie de página o el encabezado. Generarla manualmente en Word y luego exportar a PDF es propenso a errores si el documento se modifica después; numerar el PDF final es la forma más segura.",
          "En auditorías contables o legales, los paquetes de evidencia en PDF deben llevar folio para que el auditor pueda referenciar páginas específicas en su dictamen. Un PDF sin numeración complica el trabajo de revisión y puede señalarse como un defecto de forma en el informe final."
        ],
        "citableSummary": "<strong>El foliado '1/N' en documentos PDF</strong> es un requisito común en trámites legales y administrativos en México porque permite verificar la integridad del expediente de un solo vistazo."
      },
      {
        "heading": "Posiciones disponibles y cuándo usar cada una",
        "paragraphs": [
          "La herramienta ofrece tres posiciones: <strong>abajo centro</strong>, <strong>abajo derecha</strong> y <strong>arriba derecha</strong>. La posición abajo centro es la más usada en documentos académicos y corresponde al estilo APA y a la mayoría de las guías de tesis universitarias. Abajo derecha es preferida en documentos corporativos o legales donde el margen derecho queda libre para firmas o sellos.",
          "Arriba derecha es habitual en manuales técnicos y reportes ejecutivos, donde el lector espera encontrar el número sin bajar la vista al pie. Si el documento original ya tiene encabezados o pies de página con logotipo o información, arriba derecha evita superposición con el contenido existente en la zona inferior.",
          "Es importante considerar si el PDF tiene márgenes suficientes. Un PDF sin márgenes (bordes al corte, como en diseño editorial) puede que el número de página quede sobre el contenido. En ese caso, imprimir con márgenes desde una herramienta como Scribus o InDesign antes de numerar es la práctica correcta."
        ],
        "bullets": [
          "Abajo centro: tesis, APA, trabajos académicos",
          "Abajo derecha: contratos, documentos legales con espacio para firmas",
          "Arriba derecha: manuales técnicos, reportes corporativos"
        ]
      },
      {
        "heading": "El archivo original no se modifica: ¿qué significa esto?",
        "paragraphs": [
          "La herramienta procesa el PDF en el navegador y genera un <em>nuevo</em> archivo descargable; el PDF que subiste permanece intacto en tu equipo. Esto es importante si el documento original está firmado digitalmente: los números de página se insertan en el nuevo archivo sin invalidar la firma del documento fuente, porque nunca se toca ese archivo.",
          "Sin embargo, si el PDF ya tiene una <strong>firma digital integrada</strong> (por ejemplo, una FIEL o una firma electrónica avanzada del SAT), el nuevo PDF generado con numeración no heredará esa firma —será un documento nuevo sin certificado. Si necesitas un PDF numerado y firmado digitalmente, el flujo correcto es: numerar primero, luego firmar con la e.firma."
        ]
      }
    ],
    "steps": [
      {
        "title": "Subir el PDF",
        "description": "Haz clic en el área de carga o arrastra tu archivo PDF. El documento se procesa localmente en tu navegador."
      },
      {
        "title": "Elegir la posición del número",
        "description": "Selecciona entre abajo centro, abajo derecha o arriba derecha según el tipo de documento."
      },
      {
        "title": "Generar y descargar",
        "description": "Haz clic en 'Numerar' y descarga el nuevo PDF con la paginación '1/N' insertada en todas las páginas."
      }
    ]
  },
  "timestamp-converter": {
    "intro": "El Conversor de Timestamp Unix traduce en ambas direcciones: de un número entero (segundos desde el 1 de enero de 1970 UTC) a fecha legible en formato local, UTC e ISO 8601, y de una fecha humana a su equivalente en segundos y milisegundos. El reloj en vivo muestra el timestamp actual para que siempre tengas una referencia real.",
    "sections": [
      {
        "heading": "¿Qué es un timestamp Unix y por qué se usa en desarrollo?",
        "paragraphs": [
          "El <strong>Unix Epoch</strong> es un estándar universal de representación temporal: el número de segundos transcurridos desde las 00:00:00 UTC del 1 de enero de 1970. Es agnóstico al huso horario, lo que lo hace ideal para almacenar fechas en bases de datos, APIs y logs sin ambigüedad. Si guardas <code>1716940800</code> en tu base de datos, cualquier servidor en cualquier zona horaria puede reconstruir la fecha exacta.",
          "En JavaScript, <code>Date.now()</code> devuelve el timestamp en <em>milisegundos</em> (13 dígitos), mientras que Python's <code>time.time()</code> y la mayoría de sistemas UNIX retornan <em>segundos</em> (10 dígitos). Este es el error más frecuente: recibir un timestamp de 13 dígitos y tratarlo como segundos, lo que resulta en fechas del año 58.000. La herramienta detecta automáticamente si el valor ingresado está en segundos o milisegundos.",
          "Las APIs REST modernas, los webhooks de Stripe, Shopify o GitHub, y los logs de AWS CloudWatch usan timestamps Unix en sus payloads. Al debuggear un evento, convertir el timestamp al instante te dice exactamente cuándo ocurrió sin abrir una consola de Node o Python."
        ],
        "citableSummary": "Un <strong>timestamp Unix de 10 dígitos</strong> está en segundos; uno de 13 dígitos está en milisegundos. Confundirlos es el error más común y produce fechas erróneas por décadas."
      },
      {
        "heading": "ISO 8601, UTC y hora local: cuál usar según el contexto",
        "paragraphs": [
          "<strong>ISO 8601</strong> es el formato estándar internacional: <code>2024-05-29T12:00:00Z</code> (la Z indica UTC). Es el formato que usan APIs REST, archivos JSON de configuración, cabeceras HTTP y la mayoría de los ORMs modernos. Al mostrar fechas en una interfaz de usuario, en cambio, lo correcto es convertir a hora local del usuario.",
          "En México hay dos zonas horarias relevantes: la mayor parte del país usa <strong>CST/CDT (UTC-6/-5)</strong>, pero Sonora siempre está en MST (UTC-7) sin ajuste de verano. Si desarrollas una app para usuarios en múltiples zonas, almacena siempre en UTC y convierte al mostrar. Este conversor te muestra las tres representaciones simultáneamente para que valides cuál corresponde a tu caso.",
          "El <em>horario de verano</em> en México fue eliminado en octubre de 2022 para la mayoría de los estados (excepción: municipios fronterizos con EE.UU. que siguen el horario americano). Este cambio afecta a sistemas heredados que asumían el cambio de horario automático: si tienes logs de antes y después de 2022, el conversor con offset explícito te ayuda a normalizar las fechas."
        ]
      },
      {
        "heading": "Casos de uso frecuentes en debugging y datos",
        "paragraphs": [
          "Al revisar un log de servidor (Nginx, Apache, Node) que usa timestamps Unix, copiar el valor y pegarlo aquí te dice de inmediato si el error ocurrió a las 3 AM o en hora pico de tráfico. De la misma manera, al configurar un <strong>TTL en Redis o un expire en una cookie</strong>, convertir la fecha objetivo a timestamp Unix es el paso previo obligado.",
          "En análisis de datos, los timestamps mal convertidos son una fuente silenciosa de bugs. Un dataset exportado de BigQuery o Snowflake puede tener columnas de timestamp en microsegundos (16 dígitos) que hay que dividir entre 1.000 para obtener milisegundos, o entre 1.000.000 para segundos. Este conversor acepta los tres órdenes de magnitud y los detecta automáticamente."
        ],
        "bullets": [
          "10 dígitos → segundos (Unix estándar)",
          "13 dígitos → milisegundos (JavaScript Date.now())",
          "16 dígitos → microsegundos (PostgreSQL, BigQuery)",
          "ISO 8601 con Z → UTC explícito",
          "ISO 8601 con offset → e.g. 2024-05-29T07:00:00-06:00 (CDMX)"
        ]
      }
    ],
    "steps": [
      {
        "title": "Pegar el timestamp",
        "description": "Ingresa el número (10, 13 o 16 dígitos) en el campo de timestamp. La herramienta detecta automáticamente la unidad y muestra la fecha equivalente."
      },
      {
        "title": "O ingresar una fecha",
        "description": "Escribe o selecciona una fecha y hora en el campo de fecha para obtener su timestamp Unix en segundos y milisegundos."
      },
      {
        "title": "Revisar los tres formatos",
        "description": "Compara la representación en hora local, UTC e ISO 8601 para confirmar que el valor corresponde al momento esperado."
      },
      {
        "title": "Copiar el valor necesario",
        "description": "Usa el botón de copia junto al formato que necesites para pegarlo directamente en tu código, consulta SQL o configuración."
      }
    ]
  },
  "texto-invertido": {
    "intro": "La herramienta de Texto Invertido ofrece cuatro modos de inversión distintos sobre cualquier texto: espejo carácter a carácter, orden inverso de palabras, inversión de cada palabra individualmente y líneas en orden inverso. Cada modo tiene aplicaciones prácticas diferentes, desde recursos didácticos hasta generación de contraseñas memorables.",
    "sections": [
      {
        "heading": "Los cuatro modos y cuándo aplicar cada uno",
        "paragraphs": [
          "<strong>Caracteres invertidos (espejo)</strong>: toma el texto completo y lo voltea letra por letra. 'Hola mundo' se convierte en 'odnum aloH'. Este modo crea el efecto de leer en espejo, como el texto en una ambulancia o en marcas que juegan con la escritura inversa. Es útil para efectos visuales en diseño gráfico, títulos creativos o stickers.",
          "<strong>Palabras invertidas</strong>: mantiene cada palabra intacta pero invierte su orden. 'El gato come pescado' → 'pescado come gato El'. Se usa en ejercicios de comprensión lectora, en juegos de memoria y en técnicas de aprendizaje de idiomas donde reorganizar frases ayuda a internalizar la gramática.",
          "<strong>Cada palabra invertida</strong>: invierte los caracteres dentro de cada palabra sin cambiar el orden de las palabras. 'Hola mundo' → 'aloH odnum'. Este modo es popular para crear <em>contraseñas mnemotécnicas</em>: tomar una frase memorable e invertir cada palabra produce una contraseña larga y no obvia que el usuario puede reconstruir mentalmente.",
          "<strong>Líneas en orden inverso</strong>: invierte el orden de las líneas del texto sin tocar el contenido de cada una. Útil para dar vuelta el orden de una lista, invertir el orden cronológico de entradas de log pegadas directamente, o reordenar rapidamente un índice."
        ],
        "bullets": [
          "Espejo (carácter): diseño gráfico, texto ambulancia, efectos visuales",
          "Palabras invertidas: juegos de memoria, ejercicios lingüísticos",
          "Cada palabra invertida: contraseñas mnemotécnicas, acertijos",
          "Líneas invertidas: invertir listas, reordenar logs, índices"
        ]
      },
      {
        "heading": "Generación de contraseñas mnemotécnicas con texto invertido",
        "paragraphs": [
          "Una técnica reconocida en gestión de contraseñas es partir de una frase que el usuario conoce bien —por ejemplo, el incipit de una canción, una frase familiar, un proverbio— e invertir cada palabra. 'Quiero un café con leche' se convierte en 'oreira nu éfac noc ehcel'. El resultado tiene mayúsculas, minúsculas y a veces caracteres inusuales (tildes invertidas), lo que aumenta la entropía.",
          "Esta técnica no reemplaza un gestor de contraseñas como Bitwarden o 1Password, pero es útil para contraseñas que <em>sí</em> se deben memorizar, como el PIN de debloqueo de un gestor, la clave maestra de cifrado o contraseñas de cuentas bancarias donde no quieres depender de un software. La lógica reversible (el usuario recuerda la frase original y sabe que debe invertir cada palabra) hace que la contraseña sea reconstruible sin anotarla."
        ],
        "citableSummary": "Invertir cada palabra de una frase memorable es una técnica de seguridad práctica para crear contraseñas largas y no obvias que el usuario puede <strong>reconstruir mentalmente</strong> sin necesidad de anotarlas."
      },
      {
        "heading": "Aplicaciones en aprendizaje de idiomas y creación de acertijos",
        "paragraphs": [
          "En pedagogía de idiomas, la inversión de oraciones se usa para que los estudiantes practiquen la estructura gramatical sin el apoyo del orden natural. Por ejemplo, en inglés: invertir 'I went to the store yesterday' a 'yesterday store the to went I' obliga al estudiante a identificar los constituyentes de la oración para reconstruirla correctamente.",
          "Para la creación de acertijos y puzzles, el modo espejo es el más popular: escribir una pregunta o respuesta en espejo es un recurso clásico en libros de juegos de ingenio. En plataformas educativas para niños, frases en espejo que requieren reflejar el texto en una pantalla o frente a un espejo añaden un elemento físico al reto."
        ]
      }
    ]
  },
  "diff-checker": {
    "intro": "El Comparador de texto (Diff) analiza dos versiones de un texto y señala línea por línea qué cambió: las líneas eliminadas aparecen en rojo, las nuevas en verde y las iguales en gris neutro. Utiliza el algoritmo LCS (Longest Common Subsequence), el mismo núcleo que usa <code>git diff</code>, para producir el mínimo de diferencias posibles.",
    "sections": [
      {
        "heading": "¿Para qué sirve un diff fuera del mundo del código?",
        "paragraphs": [
          "Los desarrolladores conocen bien el diff de Git, pero esta herramienta es igualmente valiosa para perfiles no técnicos. Un <strong>abogado</strong> que revisa dos versiones de un contrato puede pegar ambos textos y ver al instante qué cláusulas se modificaron sin leer el documento completo. Lo mismo aplica para <strong>periodistas</strong> que comparan dos versiones de un comunicado de prensa para detectar cambios de último minuto.",
          "En <strong>content marketing y SEO</strong>, al actualizar un artículo largo es útil tener un diff del texto anterior vs. el nuevo para documentar qué se cambió, especialmente si el cliente o editor debe aprobar los cambios. Muchos CMS no guardan un historial de diff nativo, por lo que copiar las dos versiones aquí llena ese vacío.",
          "Los equipos de <strong>traducción y localización</strong> usan diffs cuando el texto fuente cambia después de que la traducción ya empezó. En lugar de retraduce todo, el diff muestra exactamente qué segmentos nuevos deben traducirse, reduciendo el costo y el tiempo del proyecto."
        ]
      },
      {
        "heading": "Algoritmo LCS: por qué produce diffs más legibles que otros métodos",
        "paragraphs": [
          "El algoritmo <strong>Longest Common Subsequence (LCS)</strong> encuentra la secuencia de líneas más larga que es idéntica en ambos textos y trabaja a partir de ahí para minimizar el número de inserciones y eliminaciones reportadas. El resultado es un diff más compacto y legible que una simple comparación carácter a carácter, que marcaría casi todo como diferente ante un cambio de una sola palabra al inicio de un párrafo.",
          "Por ejemplo, si renombras una variable en 50 líneas de código, un diff basado en diferencia de cadenas marcaría las 50 líneas como cambiadas por completo. LCS reconoce que 49 de esas 50 líneas son esencialmente iguales salvo por el nombre de la variable, agrupando el cambio de forma limpia. Es por esto que <code>git diff</code>, <code>diff(1)</code> de Unix y herramientas como Meld o Beyond Compare usan variantes de este mismo algoritmo.",
          "La limitación del LCS a nivel de líneas es que no detecta cambios <em>dentro</em> de una línea: si cambias una palabra en medio de una línea, verás esa línea completa marcada como eliminada (rojo) y una línea nueva (verde). Para diffs a nivel de palabra o carácter se necesitaría un segundo paso de comparación intra-línea, que algunas herramientas de pago incorporan."
        ],
        "citableSummary": "<strong>LCS (Longest Common Subsequence)</strong> es el algoritmo que minimiza el número de cambios reportados buscando la subsecuencia más larga idéntica entre ambos textos. Es el núcleo de <code>git diff</code> y de la mayoría de las herramientas de comparación profesionales."
      },
      {
        "heading": "Casos de uso en auditoría de configuraciones y contratos",
        "paragraphs": [
          "Administradores de sistemas que gestionan archivos de configuración (Nginx, Apache, <code>sshd_config</code>, <code>docker-compose.yml</code>) usan diffs para comparar la configuración actual con un baseline conocido-bueno antes de hacer un deploy. Pegar ambas versiones aquí tarda segundos y no requiere acceso al servidor.",
          "En procesos de licitación pública en México, los contratos adjudicados a veces difieren del contrato base publicado en el DOF. Un diff automático entre ambas versiones puede revelar cláusulas agregadas o modificadas que no se publicaron correctamente. Esta es una herramienta de transparencia accesible para periodistas de investigación y organizaciones de la sociedad civil."
        ],
        "bullets": [
          "Contratos legales: detectar cláusulas modificadas entre versiones",
          "Código fuente: revisar cambios antes de un code review",
          "Archivos de configuración: comparar contra un baseline seguro",
          "Traducciones: identificar segmentos nuevos en el texto fuente",
          "Artículos SEO: documentar actualizaciones para clientes o editores"
        ]
      }
    ],
    "steps": [
      {
        "title": "Pegar el texto original (izquierda)",
        "description": "Introduce la versión anterior o base del texto en el panel izquierdo."
      },
      {
        "title": "Pegar el texto nuevo (derecha)",
        "description": "Introduce la versión modificada en el panel derecho."
      },
      {
        "title": "Ejecutar el diff",
        "description": "Haz clic en 'Comparar'. Las líneas eliminadas se muestran en rojo, las nuevas en verde y las líneas sin cambios en gris."
      },
      {
        "title": "Revisar y exportar",
        "description": "Revisa los cambios línea por línea. Puedes copiar el resultado o compartir la URL si la herramienta soporta estado en URL."
      }
    ]
  },
  "reordenar-pdf": {
    "intro": "La herramienta para reordenar páginas de PDF presenta todas las páginas del documento en un grid visual y permite moverlas arriba o abajo con flechas, eliminar las que no se necesitan y descargar el PDF resultante con el nuevo orden. El archivo original nunca se modifica.",
    "sections": [
      {
        "heading": "Casos reales donde el orden de páginas importa",
        "paragraphs": [
          "Al escaner un documento físico de varias hojas con un escáner de alimentación automática, es frecuente que una página entre mal y quede en la posición incorrecta. Corregir esto sin reordenar el PDF implica rescannear todo el documento. Con esta herramienta basta subir el PDF, mover la página errante a su lugar y descargar la versión corregida en segundos.",
          "En la preparación de expedientes para trámites ante el IMSS, el SAT o el Registro Público de la Propiedad, los documentos deben presentarse en el orden específico que indica el formulario de requisitos. Si recibiste los documentos de diferentes fuentes y los uniste en un solo PDF, reordenarlos aquí antes de entregar es más rápido que volver a combinar desde cero.",
          "En diseño editorial, cuando se exportan borradores de revistas o catálogos en PDF para revisión de clientes, a veces el orden de las secciones cambia después de la primera exportación. Reordenar el PDF es más ágil que volver a Adobe InDesign o Canva solo para mover dos páginas."
        ]
      },
      {
        "heading": "Eliminar páginas: cuándo es útil y qué considerar",
        "paragraphs": [
          "La función de eliminación permite quitar páginas innecesarias antes de compartir el documento. Por ejemplo, si tienes un contrato de 15 páginas pero solo necesitas compartir los anexos (páginas 8-15), puedes eliminar las páginas 1-7 y descargar solo lo relevante. Esto reduce el tamaño del archivo y evita compartir información confidencial innecesariamente.",
          "Un caso frecuente: exportar un estado de cuenta bancario en PDF donde las últimas páginas son publicidad del banco o condiciones generales que no son parte del comprobante. Eliminar esas páginas antes de subir el documento como comprobante en una plataforma de crédito hace el expediente más limpio.",
          "Importante: si el PDF tiene páginas con <strong>firma digital o sello electrónico</strong>, eliminar esas páginas en el nuevo archivo no invalida la firma del documento original, pero el nuevo PDF descargado será un documento distinto sin certificado de integridad. Verifica siempre los requisitos legales del trámite antes de entregar un PDF modificado."
        ],
        "citableSummary": "Reordenar o eliminar páginas genera un <strong>nuevo archivo PDF</strong> independiente; el documento original en tu equipo permanece intacto y, si tenía firma digital, esa firma sigue siendo válida en el archivo original."
      },
      {
        "heading": "Privacidad: tu PDF no sale de tu navegador",
        "paragraphs": [
          "Toda la manipulación del PDF ocurre localmente en tu navegador usando la librería pdf-lib en JavaScript. El archivo no se sube a ningún servidor externo, lo que es especialmente importante para documentos sensibles: contratos, estados de cuenta, expedientes médicos o documentos de identidad. No hay límite de tiempo para procesar el archivo y los datos no quedan almacenados en ningún servidor.",
          "Esto contrasta con servicios en línea que requieren subir el PDF a sus servidores en la nube (como iLovePDF o Smallpdf en sus versiones gratuitas), donde el archivo reside temporalmente en infraestructura de terceros. Para documentos confidenciales, el procesamiento local es la opción más segura."
        ]
      }
    ],
    "steps": [
      {
        "title": "Subir el PDF",
        "description": "Arrastra el archivo PDF al área de carga o haz clic para seleccionarlo. Se mostrará una vista previa en grid de todas las páginas."
      },
      {
        "title": "Reordenar páginas",
        "description": "Usa las flechas arriba/abajo junto a cada página para cambiar su posición. Puedes hacer tantos movimientos como necesites."
      },
      {
        "title": "Eliminar páginas (opcional)",
        "description": "Haz clic en el botón de eliminar (ícono de basurero) sobre cualquier página que no deba aparecer en el documento final."
      },
      {
        "title": "Descargar el nuevo PDF",
        "description": "Una vez listo el orden, haz clic en 'Descargar PDF'. Obtendrás un nuevo archivo con las páginas en el orden configurado."
      }
    ]
  },
  "dns-lookup": {
    "intro": "El DNS Lookup consulta los 8 tipos de registros DNS más importantes de cualquier dominio —A, AAAA, MX, TXT, NS, CNAME, SOA y CAA— en tiempo real vía Google DNS-over-HTTPS (DoH), mostrando cada valor junto con su TTL. Es esencial para diagnosticar problemas de correo, validar configuraciones de dominio y verificar certificados SSL.",
    "sections": [
      {
        "heading": "Qué significa cada tipo de registro y para qué sirve",
        "paragraphs": [
          "<strong>A y AAAA</strong> son los registros de dirección: A apunta el dominio a una IPv4 (ej. 192.168.1.1) y AAAA a una IPv6. Son los primeros que se revisan cuando un sitio no carga. Si el registro A apunta a una IP incorrecta o al servidor anterior de hosting, el sitio seguirá mostrando el contenido viejo hasta que el TTL expire y el cambio se propague.",
          "<strong>MX (Mail Exchanger)</strong> define qué servidores reciben el correo de un dominio y en qué orden de prioridad. Si el MX de tu dominio apunta a los servidores de Google Workspace pero el correo no llega, verificar los registros MX aquí es el primer paso del diagnóstico. También se usa para confirmar que la migración de correo a un nuevo proveedor se completó.",
          "<strong>TXT</strong> almacena texto arbitrario usado principalmente para verificación de propiedad de dominio (Google Search Console, Facebook, Microsoft) y para autenticación de correo: <strong>SPF</strong> (qué servidores pueden enviar en nombre del dominio), <strong>DKIM</strong> (firma criptográfica de mensajes) y <strong>DMARC</strong> (política de manejo de mensajes que fallan SPF/DKIM). Sin registros SPF y DKIM correctos, el correo de tu dominio cae en spam.",
          "<strong>NS</strong> indica qué servidores de nombres (nameservers) son autoritativos para el dominio. Cuando cambias de proveedor de hosting o DNS (de GoDaddy a Cloudflare, por ejemplo), los NS son lo primero que debes actualizar en el registrador. <strong>CAA</strong> restringe qué autoridades de certificación (Let's Encrypt, DigiCert, Sectigo) pueden emitir certificados SSL para el dominio, añadiendo una capa de seguridad contra certificados fraudulentos."
        ],
        "bullets": [
          "A: IPv4 del servidor (www, raíz, subdominios)",
          "AAAA: IPv6 del servidor",
          "MX: servidores de correo entrante + prioridad",
          "TXT: SPF, DKIM, DMARC, verificaciones de propiedad",
          "NS: nameservers autoritativos del dominio",
          "CNAME: alias que apunta a otro dominio",
          "SOA: servidor primario + email del administrador",
          "CAA: CAs autorizadas para emitir SSL"
        ]
      },
      {
        "heading": "DNS-over-HTTPS: por qué las consultas son más fiables",
        "paragraphs": [
          "A diferencia de herramientas que usan el DNS del sistema operativo del usuario (que puede tener caché local o estar filtrado por la red), este lookup usa <strong>Google DoH (8.8.8.8)</strong> directamente desde el servidor. Esto garantiza que la respuesta refleja el estado real del DNS público, no una versión cacheada en tu router o ISP.",
          "Google DoH (DNS-over-HTTPS) también cifra la consulta DNS, evitando que terceros en la red intercepten qué dominio estás consultando. Para propósitos de diagnóstico, la ventaja más práctica es obtener siempre la vista del DNS tal como lo verían la mayoría de los usuarios en internet, independientemente de tu red local."
        ],
        "citableSummary": "Consultar vía <strong>Google DoH (8.8.8.8)</strong> elimina la interferencia del DNS local o del ISP, asegurando que los registros que ves son los que están publicados globalmente en internet."
      },
      {
        "heading": "Diagnóstico de correo no entregado: el flujo paso a paso",
        "paragraphs": [
          "Si los correos enviados desde tu dominio caen en spam o no se entregan, el flujo de diagnóstico con esta herramienta es: (1) verificar MX para confirmar que apunta a tu proveedor de correo; (2) buscar el registro SPF en TXT — debe incluir los IPs o mecanismos <code>include:</code> de tu proveedor (ej. <code>include:_spf.google.com</code> para Workspace); (3) buscar el registro DKIM en TXT, normalmente en un subdominio como <code>google._domainkey.tudominio.com</code>; (4) verificar DMARC en <code>_dmarc.tudominio.com</code>.",
          "Un dominio sin DMARC es especialmente vulnerable al spoofing. Gmail y Outlook aplican desde 2024 requisitos más estrictos para remitentes de volumen: SPF, DKIM y DMARC son obligatorios para no ser rechazados. Verificar estos registros antes de lanzar una campaña de email marketing puede evitar que miles de correos lleguen al spam."
        ]
      }
    ],
    "steps": [
      {
        "title": "Ingresar el dominio",
        "description": "Escribe el dominio que deseas consultar (sin http:// ni ruta). Por ejemplo: miempresa.com o subdominio.miempresa.com."
      },
      {
        "title": "Ejecutar la consulta",
        "description": "Haz clic en 'Consultar'. La herramienta interroga los 8 tipos de registros en paralelo vía Google DoH."
      },
      {
        "title": "Revisar cada registro",
        "description": "Expande cada sección (A, MX, TXT, etc.) para ver los valores y TTLs actuales. Los registros vacíos simplemente no están configurados."
      },
      {
        "title": "Diagnosticar a partir de los resultados",
        "description": "Compara los valores con los que debería tener el dominio según tu proveedor de hosting, DNS o correo. Un TTL bajo indica que el registro cambió recientemente."
      }
    ]
  },
  "htaccess-generator": {
    "intro": "El Generador .htaccess produce un archivo de configuración para servidores Apache listo para copiar o descargar, con toggles para HTTPS forzado, canonical www, URLs limpias, redirects 301, compresión gzip, cache del navegador, bloqueo de archivos sensibles, anti-hotlinking y páginas de error personalizadas. Sin necesidad de memorizar la sintaxis de Apache.",
    "sections": [
      {
        "heading": "Por qué un .htaccess bien configurado impacta en SEO y seguridad",
        "paragraphs": [
          "El archivo <code>.htaccess</code> es el punto de control de Apache para cada directorio. Una configuración correcta resuelve varios problemas de SEO técnico de golpe: forzar HTTPS elimina la versión HTTP insegura que Google depreca; el canonical www (o sin www) evita <strong>contenido duplicado</strong> entre <code>www.dominio.com</code> y <code>dominio.com</code>; los redirects 301 preservan el link equity de URLs antiguas al moverlas permanentemente.",
          "La compresión <strong>gzip</strong> reduce el peso de HTML, CSS y JavaScript entre un 60-80%, lo que mejora directamente el <em>Time To First Byte (TTFB)</em> y el <em>Largest Contentful Paint (LCP)</em>, dos métricas de Core Web Vitals. Sin gzip, un archivo CSS de 200 KB llega al navegador a 200 KB; con gzip, llega en ~40 KB, reduciendo el tiempo de transferencia proporcionalmente.",
          "El cache del navegador define cuánto tiempo puede un browser reutilizar recursos estáticos (imágenes, fuentes, JS, CSS) sin volver a pedirlos al servidor. Un .htaccess que asigna <code>max-age=31536000</code> (1 año) a imágenes significa que un usuario recurrente cargará el sitio casi sin hacer peticiones para esos recursos, mejorando el <em>Time to Interactive</em>."
        ],
        "citableSummary": "La compresión <strong>gzip en .htaccess</strong> reduce el peso de archivos de texto (HTML, CSS, JS) entre un 60 y 80%, mejorando directamente el TTFB y el LCP de Core Web Vitals."
      },
      {
        "heading": "Bloqueo de archivos sensibles: qué archivos siempre debes proteger",
        "paragraphs": [
          "Un error de configuración frecuente en servidores Apache es dejar accesibles archivos que no deben ser públicos. El generador incluye reglas para bloquear <code>.env</code>, <code>.git</code>, <code>wp-config.php</code>, <code>xmlrpc.php</code> y archivos de backup (<code>.sql</code>, <code>.bak</code>, <code>.zip</code>). Si estos archivos son accesibles desde el navegador, exponen credenciales de base de datos, claves API o el historial de Git del proyecto.",
          "El bloqueo de <code>xmlrpc.php</code> en WordPress es especialmente importante: este archivo, que permite la API XML-RPC de WP, es el vector de ataques de fuerza bruta y DDoS más común en sitios WordPress. Bloquearlo en .htaccess es más efectivo que un plugin de seguridad porque el bloqueo ocurre antes de que PHP se ejecute, sin consumir recursos del servidor.",
          "El anti-hotlinking protege las imágenes de tu servidor de ser cargadas directamente desde otros sitios, lo que consume tu ancho de banda sin beneficiarte. La regla de hotlink en .htaccess verifica el encabezado HTTP <code>Referer</code>: si la solicitud no proviene de tu propio dominio, devuelve un 403 o una imagen de reemplazo."
        ],
        "bullets": [
          ".env — credenciales de aplicación (DB, API keys)",
          ".git/ — historial de código y commits",
          "wp-config.php — credenciales MySQL de WordPress",
          "xmlrpc.php — vector de ataques de fuerza bruta en WP",
          "*.sql, *.bak — backups de base de datos",
          "*.log — logs de errores con información interna"
        ]
      },
      {
        "heading": "Cómo agregar redirects 301 personalizados correctamente",
        "paragraphs": [
          "Los redirects 301 en .htaccess siguen la sintaxis <code>Redirect 301 /ruta-vieja /ruta-nueva</code>. Para URLs con patrones (por ejemplo, migrar <code>/blog/categoria/post</code> a <code>/articulos/post</code>), se usan <code>RewriteRule</code> con expresiones regulares. El generador produce la sintaxis correcta para ambos casos sin que el usuario tenga que conocer la gramática de mod_rewrite.",
          "Un error común al configurar redirects en .htaccess es crear <strong>cadenas de redirección</strong> (A→B→C) en lugar de ir directo al destino final (A→C). Cada salto adicional agrega latencia y puede degradar el traspaso de PageRank. Al migrar un sitio, siempre mapea cada URL origen directamente a su destino final, sin pasar por URLs intermedias."
        ]
      }
    ]
  },
  "gradient-generator": {
    "intro": "El Generador de Gradientes CSS crea código de gradiente listo para pegar en una hoja de estilos: gradientes lineales con ángulo personalizable, radiales circulares y cónicos rotacionales, todos con soporte para múltiples color stops en posiciones exactas. Incluye 10 presets curados y un generador aleatorio.",
    "sections": [
      {
        "heading": "Diferencias entre gradiente lineal, radial y cónico",
        "paragraphs": [
          "Un <strong>gradiente lineal</strong> (<code>linear-gradient</code>) transiciona colores en línea recta entre dos puntos. El ángulo de 0° va de abajo hacia arriba; 90° va de izquierda a derecha; 135° va en diagonal. Es el tipo más común en fondos de botones, hero sections y barras de progreso.",
          "El <strong>gradiente radial</strong> (<code>radial-gradient</code>) emana desde un punto central hacia afuera en forma circular o elíptica. Se usa en efectos de luz (como un foco sobre un fondo oscuro), en botones con efecto de brillo central y en fondos que simulan profundidad. La posición del centro es configurable (centro, esquinas, coordenadas exactas).",
          "El <strong>gradiente cónico</strong> (<code>conic-gradient</code>) rota los colores alrededor de un punto central, como las agujas de un reloj. Permite crear gráficos de torta puras en CSS sin canvas ni SVG, selectores de color circulares y efectos de 'halo' o 'arcoíris'. El soporte en navegadores es excelente: Chrome 69+, Firefox 83+, Safari 12.1+ y Edge 79+."
        ],
        "citableSummary": "El <strong>gradiente cónico de CSS</strong> (<code>conic-gradient</code>) permite crear gráficos de torta completos sin JavaScript ni SVG, usando solo CSS puro. Compatible con Chrome 69+, Firefox 83+ y Safari 12.1+."
      },
      {
        "heading": "Color stops: control fino de la transición",
        "paragraphs": [
          "Un color stop define en qué posición del gradiente aparece cada color y cómo transiciona hacia el siguiente. La sintaxis en CSS es <code>linear-gradient(90deg, #ff0000 0%, #0000ff 100%)</code>. Agregar stops intermedios permite crear gradientes de tres, cuatro o más colores: <code>linear-gradient(90deg, red 0%, yellow 33%, green 66%, blue 100%)</code>.",
          "La posición del color stop puede definirse en porcentaje, píxeles o cualquier unidad CSS. Dos stops en la misma posición crean un <em>corte duro</em> sin transición, útil para crear rayas o segmentos de color sólido dentro de un gradiente. Por ejemplo, <code>linear-gradient(red 50%, blue 50%)</code> crea dos mitades de color sólido.",
          "Para crear gradientes con 'pausa' (un área de color sólido entre dos transiciones), se usan dos stops del mismo color consecutivos: <code>linear-gradient(red, red 40%, blue 60%, blue)</code> crea rojo sólido hasta el 40%, transición de 40% a 60%, y azul sólido desde el 60%."
        ],
        "bullets": [
          "2 stops: gradiente básico entre dos colores",
          "3-4 stops: gradientes multicolor (sunset, océano, arcoíris)",
          "Stops en misma posición: corte duro sin transición",
          "Stops repetidos: área de color sólido dentro del gradiente"
        ]
      },
      {
        "heading": "Los 10 presets curados y cómo usarlos como base",
        "paragraphs": [
          "Los presets incluidos (sunset, ocean, purple, rainbow, mint, pink, gold, dark, neon, fire) son combinaciones de colores probadas que funcionan bien en UI. Son un punto de partida, no un destino: al seleccionar un preset, el editor muestra los stops exactos que lo componen, permitiendo ajustar los colores, el ángulo o las posiciones para adaptarlo a la paleta del proyecto.",
          "En diseño de interfaces, los gradientes <em>dark</em> y <em>neon</em> son populares para paneles de administración y dashboards tech; <em>mint</em> y <em>pink</em> para apps de salud y bienestar; <em>gold</em> para productos de lujo o finanzas. El preset <em>rainbow</em> con conic-gradient es el punto de partida ideal para selectores de color en interfaces de configuración."
        ]
      }
    ],
    "steps": [
      {
        "title": "Seleccionar el tipo de gradiente",
        "description": "Elige entre lineal, radial o cónico según el efecto que buscas. Lineal para fondos y botones; radial para efectos de luz; cónico para gráficos o arcoíris."
      },
      {
        "title": "Configurar colores y posiciones",
        "description": "Agrega color stops con el color picker integrado y define la posición de cada uno en porcentaje. Mínimo 2 stops."
      },
      {
        "title": "Ajustar ángulo o posición central",
        "description": "Para gradientes lineales, ajusta el ángulo (0°-360°). Para radiales y cónicos, configura el punto central."
      },
      {
        "title": "Copiar el código CSS",
        "description": "Usa el botón de copia para obtener el código listo para pegar en tu archivo CSS o en el editor de tu framework favorito."
      }
    ]
  },
  "test-velocidad-web": {
    "intro": "El Test de Velocidad Web mide desde un servidor edge el TTFB (Time To First Byte) y el tiempo total de descarga del HTML de cualquier sitio, junto con el status code y el tamaño del documento. Categoriza el resultado en excelente, aceptable o lento según benchmarks de Google, e incluye un enlace directo a PageSpeed Insights para el análisis completo de Core Web Vitals.",
    "sections": [
      {
        "heading": "TTFB: el primer indicador de problemas de servidor",
        "paragraphs": [
          "El <strong>Time To First Byte (TTFB)</strong> mide cuánto tiempo tarda el servidor en empezar a enviar la respuesta HTTP después de recibir la petición. Google considera <strong>un TTFB ≤200 ms como excelente</strong>, entre 200-500 ms como aceptable y por encima de 500 ms como lento. Un TTFB alto suele indicar problemas en el servidor: base de datos lenta, PHP bloqueado, falta de cache de página o servidor saturado.",
          "Es importante distinguir TTFB de tiempo de carga completo. Un sitio puede tener TTFB de 100 ms pero tardar 8 segundos en cargar completamente debido a docenas de recursos externos (scripts de terceros, fuentes web, imágenes sin optimizar). El TTFB indica la salud del servidor; el tiempo total indica la salud del frontend.",
          "Cuando un sitio en WordPress tiene un TTFB alto (>1 segundo), las causas más comunes son: ausencia de plugin de cache (WP Super Cache, W3 Total Cache, LiteSpeed Cache), hosting compartido saturado, consultas MySQL lentas sin índices o plugins mal optimizados que ejecutan decenas de queries por página. Instalar un plugin de cache bien configurado puede reducir el TTFB de 2 segundos a 50 ms."
        ],
        "citableSummary": "Google clasifica un <strong>TTFB ≤200 ms como excelente</strong>. Por encima de 500 ms se considera lento y suele indicar ausencia de caché de servidor, hosting compartido saturado o consultas de base de datos sin optimizar."
      },
      {
        "heading": "Diferencia entre este test y PageSpeed Insights / Lighthouse",
        "paragraphs": [
          "Este test mide <strong>velocidad de red del HTML</strong>: cuánto tarda el byte inicial en llegar y cuánto pesa el documento HTML raíz. Es una prueba rápida de infraestructura, no un análisis de rendimiento de frontend. PageSpeed Insights y Lighthouse, en cambio, cargan el sitio completo (HTML + CSS + JS + imágenes + fuentes), ejecutan el JavaScript, renderizan la página y miden las <em>Core Web Vitals</em>: LCP, INP (Input Latency) y CLS.",
          "Usa este test como primer diagnóstico para detectar problemas de servidor. Si el TTFB es bueno pero PageSpeed da una puntuación baja, el problema está en el frontend (JavaScript bloqueante, imágenes sin lazy-load, fuentes sin precargar, layout shift). Si el TTFB es alto, el problema está en el backend antes de optimizar cualquier otra cosa.",
          "El test se realiza desde un servidor edge, no desde tu computadora local, lo que elimina la variabilidad de tu conexión a internet y la caché de tu navegador. El resultado refleja la experiencia real de un usuario nuevo que accede al sitio por primera vez desde una conexión limpia."
        ]
      },
      {
        "heading": "Cómo mejorar el TTFB y el tiempo de carga",
        "paragraphs": [
          "Para reducir el TTFB: habilita caché de página completa (full-page cache), activa un CDN como Cloudflare, mueve a un servidor con más recursos o migra a hosting con PHP-FPM + OPcache habilitado. Para reducir el tiempo total: comprime imágenes (WebP/AVIF), habilita gzip/Brotli, elimina JavaScript de bloqueo de renderizado (<code>defer</code> o <code>async</code>) y carga fuentes con <code>font-display: swap</code>.",
          "Un truco fácil de diagnosticar: si el tiempo total es mucho mayor que el TTFB × 2, el HTML está cargando muchos recursos bloqueantes. Abre las DevTools del navegador (F12 → pestaña Network), recarga la página y filtra por 'Render-Blocking' para identificar los recursos que detienen el renderizado."
        ],
        "bullets": [
          "TTFB ≤200 ms → excelente (Google benchmark)",
          "TTFB 200-500 ms → aceptable",
          "TTFB >500 ms → lento, revisar servidor/caché",
          "Tiempo total >3 s → frontend a optimizar (imágenes, JS, fuentes)",
          "Status 200 → OK; 301/302 → redirección; 5xx → error de servidor"
        ]
      }
    ]
  },
  "validador-email": {
    "intro": "El Validador de Email realiza una verificación en cinco capas: formato RFC, longitud de partes (local ≤64, dominio ≤253), detección de proveedores de correo desechable, corrección de typos comunes y verificación de registros MX vía DNS-over-HTTPS. Devuelve un score de 0 a 5 para cada dirección analizada.",
    "sections": [
      {
        "heading": "Por qué validar email antes de importar a una base de datos",
        "paragraphs": [
          "Una base de datos de email marketing con alta tasa de direcciones inválidas o desechables daña la <strong>reputación del dominio remitente</strong>. Las plataformas de envío como Mailchimp, HubSpot o ActiveCampaign miden el bounce rate (tasa de rebote); si supera el 2%, suspenden la cuenta. Un solo envío masivo a una lista sin depurar puede arruinar la reputación de un dominio que tardó meses en construirse.",
          "Los emails desechables (Mailinator, Guerrilla Mail, 10 Minute Mail) son usados principalmente para obtener incentivos únicos (descuentos, accesos de prueba) sin dejar un email real. Detectarlos en el punto de captura del formulario evita que esos leads entren al CRM. Este validador consulta una lista actualizada de más de 2.000 dominios de email temporal.",
          "La corrección de typos comunes —como <code>gmial.com → gmail.com</code>, <code>hotmal.com → hotmail.com</code> o <code>yaho.com → yahoo.com</code>— es especialmente valiosa en formularios de compra donde el usuario escribe su email a mano desde un celular. Sugerir la corrección en tiempo real reduce el porcentaje de pedidos con email inválido, lo que directamente afecta las confirmaciones de compra y los correos transaccionales."
        ],
        "citableSummary": "Una tasa de rebote de email superior al <strong>2% puede causar la suspensión de la cuenta</strong> en la mayoría de las plataformas de email marketing. Limpiar la lista con un validador antes de importar es la primera acción preventiva."
      },
      {
        "heading": "Verificación MX: lo que el formato no puede decirte",
        "paragraphs": [
          "Un email puede tener formato perfectamente válido —<code>usuario@empresa.com</code>— pero si el dominio <code>empresa.com</code> no tiene registros MX configurados, el correo rebotará con un error permanente (hard bounce). La validación de MX consulta los servidores DNS para confirmar que el dominio realmente acepta correo, lo que eleva significativamente la confianza en la dirección.",
          "La verificación MX no equivale a confirmar que el <em>buzón específico</em> existe dentro del servidor. Para eso existe la verificación SMTP (que algunos validadores de pago realizan), que se conecta al servidor de correo y pregunta si el buzón existe sin enviar ningún email. Esta herramienta hace la verificación MX, que es el paso previo indispensable y el que resuelve la mayoría de los hard bounces.",
          "En campañas B2B, donde los emails son corporativos y los dominios no están en listas de desechables, la verificación MX es el filtro más valioso. Un dominio corporativo recién migrado de proveedor puede tener los MX desactualizados durante el período de propagación DNS, lo que resulta en rebotes temporales que el validador puede detectar."
        ]
      },
      {
        "heading": "Score 0-5: cómo interpretar cada nivel",
        "paragraphs": [
          "El score 5 indica un email con formato válido, dominio real con MX activo, sin ser desechable y sin typos detectados. Es el nivel de confianza máximo para agregar el contacto a una lista de envío. Score 4 puede indicar que el MX existe pero hay una advertencia menor (dominio genérico, sin DMARC). Score 3 o menos indica problemas que deben resolverse antes de usar el email.",
          "Para campañas de email marketing, la práctica recomendada es enviar solo a direcciones con score 4 o 5. Las direcciones con score 2-3 pueden enviarse a una lista separada de 're-engagement' o simplemente descartarse. Las con score 0-1 (formato inválido, MX ausente o dominio desechable) nunca deben incluirse en un envío."
        ],
        "bullets": [
          "5/5 — formato OK + MX OK + no desechable + sin typos",
          "4/5 — válido con observación menor",
          "3/5 — dominio sospechoso o sin DMARC",
          "2/5 — posible email temporal o dominio sin MX estable",
          "0-1/5 — inválido, desechable confirmado o dominio sin MX"
        ]
      }
    ]
  },
  "anchor-text": {
    "intro": "El Generador de Anchor Text SEO produce 21 variaciones distribuidas entre exact match, phrase match, branded, naked URL, generic, LSI, long-tail y preguntas. Cada tipo incluye su peso recomendado en una estrategia de link building seguro, con advertencia explícita sobre el riesgo de sobreoptimizar con exact match.",
    "sections": [
      {
        "heading": "La distribución natural de anchor text: el estándar de la industria",
        "paragraphs": [
          "Google penaliza el <em>over-optimization</em> de anchor text: un perfil de enlaces donde el 80% usa la misma keyword exacta como anchor es una señal artificial que activa filtros de Penguin. El estándar de la industria para un perfil saludable es: <strong>40-50% branded</strong> (nombre de la marca o dominio), <strong>25-30% generic</strong> ('click aquí', 'ver más', 'leer artículo'), <strong>15-20% phrase match</strong> y un máximo de <strong>10% exact match</strong>.",
          "Esta distribución replica cómo se comportan los enlaces naturales: cuando alguien enlaza a tu sitio sin intención SEO, usa el nombre de la marca, el título del artículo o simplemente 'haz clic aquí'. Los sitios que rankean con un perfil 100% exact match son raros y suelen ser dominios con autoridad muy alta o que llevan años acumulando esa señal gradualmente.",
          "El branded anchor es el tipo más seguro para escalar. Incluye el nombre del sitio, el nombre de la empresa, el dominio con y sin TLD. La ventaja adicional es que refuerza el reconocimiento de marca: un lector que ve el nombre de la empresa como anchor aprende a asociar ese nombre con el tema del artículo que lo enlaza."
        ],
        "citableSummary": "Una distribución de anchor text saludable tiene <strong>máximo 10% exact match</strong>. Superar ese umbral de forma acelerada activa los filtros de Penguin de Google y puede derivar en una penalización manual o algorítmica."
      },
      {
        "heading": "LSI, long-tail y preguntas: los anchors que Google prefiere en 2024-2025",
        "paragraphs": [
          "Los anchors <strong>LSI (Latent Semantic Indexing)</strong> son términos conceptualmente relacionados con la keyword objetivo que no la mencionan directamente. Para una página sobre 'software de contabilidad', los LSI podrían ser 'gestión financiera para pymes', 'control de gastos empresariales' o 'facturación electrónica'. Estos anchors enriquecen el contexto semántico del enlace sin sobreoptimizar.",
          "Los anchors de <strong>pregunta</strong> ('¿cuál es la mejor herramienta de X?', '¿cómo funciona Y?') imitan el comportamiento de búsqueda conversacional que ha crecido con las búsquedas por voz y los AI Overviews de Google. Un enlace con anchor de pregunta desde un artículo de FAQ puede reforzar la relevancia de la página destino para esas queries.",
          "Los anchors <strong>long-tail</strong> (3-5 palabras más descriptivas que la keyword raíz) son menos competidos y aportan señales de relevancia para consultas de cola larga que suelen tener mayor tasa de conversión. Una página de 'consultoría SEO para ecommerce en México' obtiene más señal semántica de un anchor long-tail específico que del genérico 'SEO'."
        ]
      },
      {
        "heading": "Errores frecuentes en link building que este generador ayuda a evitar",
        "paragraphs": [
          "El error más común es construir todos los enlaces con el mismo anchor exact match. Incluso si los enlaces son de sitios de alta autoridad, Google interpreta un perfil de anchors monótono como manipulación. El generador produce las 21 variaciones en un solo clic para que puedas distribuirlas de forma realista en diferentes publicaciones.",
          "Otro error es usar solo generic anchors ('click aquí', 'más información') por miedo al exact match. Eso también resulta en un perfil artificial, opuesto al anterior pero igual de sospechoso. El equilibrio entre branded (50%), generic (25%), phrase (15%) y exact (10%) es el punto de partida que recomienda la mayoría de los SEOs con experiencia en link building escalable."
        ],
        "bullets": [
          "Exact match (≤10%): 'consultor SEO en México' — riesgo alto si se abusa",
          "Phrase match (15-20%): 'mejor consultor SEO', 'consultor SEO certificado'",
          "Branded (40-50%): nombre de la marca, dominio, empresa",
          "Naked URL (5-10%): https://dominio.com/pagina",
          "Generic (25-30%): 'ver más', 'leer artículo', 'haz clic aquí'",
          "LSI: términos relacionados sin la keyword exacta"
        ]
      }
    ]
  },
  "validador-clabe-cbu": {
    "intro": "El Validador CLABE / CBU verifica la estructura y los dígitos verificadores de claves bancarias estándar: CLABE mexicana de 18 dígitos (con identificación del banco emisor entre más de 90 instituciones) y CBU argentina de 22 dígitos con doble dígito verificador. Confirma la validez del número antes de ejecutar una transferencia.",
    "sections": [
      {
        "heading": "Cómo funciona el dígito verificador de la CLABE mexicana",
        "paragraphs": [
          "La <strong>CLABE (Clave Bancaria Estandarizada)</strong> es un número de 18 dígitos establecido por BANXICO para identificar cuentas bancarias en México. La estructura es: 3 dígitos de código de banco + 3 dígitos de código de ciudad + 11 dígitos de número de cuenta + 1 dígito verificador. El dígito 18 se calcula con el algoritmo de módulo 10: cada uno de los primeros 17 dígitos se multiplica por un factor cíclico (3, 7, 1, 3, 7, 1…), se suman los últimos dígitos de esos productos y el verificador es <code>(10 - (suma mod 10)) mod 10</code>.",
          "Si el dígito 18 de una CLABE no coincide con el calculado, el número fue capturado incorrectamente y la transferencia SPEI será rechazada por el sistema bancario. BANXICO rechaza automáticamente CLABEs con dígito verificador inválido, lo que evita transferencias a cuentas equivocadas —pero solo si el error cambió el dígito 18. Si el error está en los primeros 17 dígitos pero el verificador coincide por casualidad, el sistema procede con la transferencia a la cuenta errónea.",
          "El validador identifica el <strong>banco emisor</strong> a partir de los primeros 3 dígitos. Por ejemplo, '002' corresponde a BBVA México, '006' a Bancomext, '012' a BBVA Bancomer (legacy), '021' a HSBC, '040' a Scotiabank, '058' a Banregio, '059' a Invex, '060' a Bansi, '062' a Afirme, '072' a Banorte, '102' a ABN AMRO (legacy). Verificar que el banco corresponde a lo que esperas es un segundo factor de validación."
        ],
        "citableSummary": "La <strong>CLABE mexicana</strong> tiene 18 dígitos: los 3 primeros identifican el banco, los 3 siguientes la ciudad, los 11 siguientes el número de cuenta y el último es el dígito verificador calculado con módulo 10."
      },
      {
        "heading": "CBU argentina: estructura y doble dígito verificador",
        "paragraphs": [
          "La <strong>CBU (Clave Bancaria Uniforme)</strong> argentina tiene 22 dígitos y fue creada por el BCRA (Banco Central de la República Argentina). Los primeros 8 dígitos corresponden al 'bloque banco': 3 dígitos de código de banco + 4 dígitos de sucursal + 1 dígito verificador. Los 14 restantes son el 'bloque cuenta': 13 dígitos de número de cuenta + 1 dígito verificador.",
          "El doble dígito verificador (uno por cada bloque) hace a la CBU más robusta que la CLABE para detectar errores de transcripción. Ambos verificadores usan un algoritmo de multiplicación por pesos distintos y suma de productos. Un CBU con cualquiera de los dos verificadores incorrectos es inválido y será rechazado por el sistema bancario argentino.",
          "En la práctica, la CBU se usa para transferencias ACH interbancarias en Argentina (Transferencias 3.0 y débito automático). El alias de CBU (alias de cuenta) es una alternativa amigable de hasta 20 caracteres alfanuméricos que mapea a una CBU. Este validador trabaja con el número de CBU de 22 dígitos, no con el alias."
        ]
      },
      {
        "heading": "Precauciones antes de enviar una transferencia bancaria",
        "paragraphs": [
          "Validar el número es necesario pero no suficiente para garantizar que el destinatario es el correcto. Un CLABE o CBU puede ser estructuralmente válido pero pertenecer a una cuenta distinta a la del destinatario esperado. Siempre confirma el número con el destinatario por un canal independiente (llamada telefónica, no solo WhatsApp) antes de transferir montos significativos.",
          "El fraude de 'man-in-the-middle' en transferencias consiste en interceptar la comunicación y modificar el número de cuenta del destinatario antes de que llegue al pagador. Por eso, la confirmación del CLABE/CBU debe hacerse por un canal separado del que se usó para recibirlo. Este validador es una capa de verificación técnica, no un reemplazo del proceso de confirmación con el destinatario."
        ],
        "bullets": [
          "CLABE: 18 dígitos — válida en transferencias SPEI México",
          "CBU: 22 dígitos — válida en transferencias ACH Argentina",
          "Primeros 3 dígitos CLABE → código de banco (>90 instituciones)",
          "Dígito 18 CLABE → verificador módulo 10",
          "Bloque 1 CBU (8 dígitos) → banco + sucursal + verificador",
          "Bloque 2 CBU (14 dígitos) → cuenta + verificador"
        ]
      }
    ]
  },
  "lorem-ipsum": {
    "intro": "El generador de Lorem Ipsum de Toolram produce texto de relleno en segundos: elegís párrafos, palabras u oraciones, y obtenés un bloque listo para pegar en tu diseño o prototipo. Es la herramienta favorita de diseñadores UX, front-end developers y maquetadores que necesitan contenido falso para evaluar tipografía, jerarquía visual y espaciado antes de tener el copy real.",
    "sections": [
      {
        "heading": "¿Por qué 'Lorem Ipsum' y no texto inventado al azar?",
        "paragraphs": [
          "El Lorem Ipsum clásico deriva de un pasaje del filósofo latino Cicerón escrito en el año 45 a. C. (<em>De Finibus Bonorum et Malorum</em>). Su ventaja sobre inventar palabras al azar es que su distribución de letras y longitudes de palabras imita el latín y, por extensión, los idiomas romances. Eso hace que el bloque de texto tenga una apariencia visual muy parecida a un párrafo real en español o inglés, sin distraer al lector con significado.",
          "Usar palabras sin sentido pero tipográficamente naturales permite que el cliente o el stakeholder evalúe el diseño sin leer el texto. Si el relleno fuera repetitivo (por ejemplo, repetir 'contenido contenido contenido') el ojo humano lo detecta como anómalo y distrae la atención del layout.",
          "Algunos equipos optan por texto <strong>Lorem Ipsum en español</strong> con palabras del castellano para proyectos donde la densidad de letras como ñ o tildes impacta el ancho de los textos. Este generador también lo soporta."
        ],
        "citableSummary": "<strong>El Lorem Ipsum no es texto aleatorio:</strong> su estructura fonética imita los idiomas europeos, lo que produce bloques de texto visualmente realistas sin que el lector se distraiga con el contenido."
      },
      {
        "heading": "¿Cuántos párrafos necesito para distintos tipos de maqueta?",
        "paragraphs": [
          "La cantidad de texto de relleno depende del componente que estás maquetando. Para una <strong>card de blog</strong> con extracto, 1 párrafo de 40-50 palabras es suficiente. Para una sección hero con subtítulo, bastán 1-2 oraciones. Para una página de artículo completo o una maqueta de documento legal, 5 a 8 párrafos te dan un scroll realista.",
          "Si estás haciendo pruebas de tipografía responsiva, generá al menos 3 párrafos para ver cómo se comporta el texto en distintos puntos de quiebre (breakpoints). El primer párrafo suele parecer bien, pero el tercer párrafo revela problemas de interlineado en pantallas de 375 px o en ampliaciones de accesibilidad.",
          "Para formularios o tooltips, lo más útil es elegir el modo <em>oraciones</em> y pedir solo 1 o 2. Eso te da exactamente la longitud de un campo de ayuda contextual, sin párrafos completos que rompan el layout del componente."
        ],
        "bullets": [
          "Card de producto o blog: 1 párrafo corto o 2 oraciones",
          "Artículo largo / landing page: 5-8 párrafos",
          "Hero/subtítulo: 1-2 oraciones",
          "Tooltip / helper text: 1 oración",
          "Email template: 3-4 párrafos con distintos anchos de columna"
        ]
      },
      {
        "heading": "Cómo integrarlo en tu flujo de trabajo de diseño",
        "paragraphs": [
          "En Figma podés usar el plugin oficial de Lorem Ipsum, pero si trabajás en código o en herramientas que no tienen plugin propio, copiar desde este generador es más rápido. El flujo ideal: generá el texto, copialo directamente, pegalo en tu editor de código o en tu CMS de staging, y luego reemplazalo con el copy real antes del deploy a producción.",
          "Una advertencia importante: <strong>nunca publiques Lorem Ipsum en producción</strong>. Los motores de búsqueda como Google lo indexan como contenido de baja calidad, lo que puede perjudicar el posicionamiento SEO del sitio. Hay casos documentados de sitios que perdieron rankings porque un template de prueba fue publicado con texto de relleno activo."
        ]
      }
    ],
    "steps": [
      {
        "title": "Elegí el tipo de unidad",
        "description": "Seleccioná si querés generar párrafos, oraciones o palabras según el componente que estás maquetando."
      },
      {
        "title": "Definí la cantidad",
        "description": "Ingresá cuántas unidades necesitás. Para la mayoría de los usos, entre 1 y 5 párrafos es suficiente."
      },
      {
        "title": "Copiá y pegá",
        "description": "Usá el botón Copiar para llevarte el texto al portapapeles y pegalo directamente en tu editor, Figma o CMS."
      }
    ]
  },
  "imagenes-a-pdf": {
    "intro": "La herramienta JPG/PNG a PDF de Toolram convierte una o varias imágenes en un único archivo PDF sin instalar nada y sin subir nada a ningún servidor externo: todo se procesa en tu navegador. Es ideal para agrupar fotos de documentos firmados, capturas de pantalla de comprobantes de pago, o varias páginas escaneadas en un solo archivo que puedas enviar por correo o cargar en un portal.",
    "sections": [
      {
        "heading": "¿Cuándo es mejor un PDF que enviar varias imágenes sueltas?",
        "paragraphs": [
          "Enviar tres fotos de un contrato firmado genera tres archivos adjuntos que el receptor tiene que abrir por separado. Un solo PDF mantiene el orden correcto, no se puede reordenar accidentalmente y casi todos los sistemas de gestión de documentos (portales notariales, plataformas de RRHH, trámites gubernamentales en línea) aceptan PDF pero rechazan JPG o PNG.",
          "Los PDF también son más fáciles de imprimir con márgenes consistentes. Si escaneaste un contrato en 3 hojas con el celular y querés imprimirlo en escala correcta, un PDF A4 ya tiene los márgenes definidos, mientras que imprimir tres JPGs desde el explorador de archivos casi siempre produce márgenes incorrectos.",
          "<strong>Casos de uso frecuentes:</strong> comprobantes de transferencia bancaria agrupados, imágenes de factura en formato no-PDF, fotos de un cuaderno de notas para entregar como tarea, capturas de conversaciones de soporte para adjuntar a un reclamo."
        ],
        "citableSummary": "<strong>Un PDF multi-página mantiene el orden, el formato y la calidad de las imágenes originales</strong>, y es compatible con prácticamente cualquier sistema de gestión documental, a diferencia de enviar múltiples archivos JPG o PNG sueltos."
      },
      {
        "heading": "¿La calidad de mis imágenes se pierde al convertir?",
        "paragraphs": [
          "Esta herramienta incrusta cada imagen como un objeto de imagen dentro del PDF, sin recomprimir el contenido. Eso significa que la calidad visual que tenía el JPG original es exactamente la que verás en el PDF. Si tu foto estaba en 300 DPI (típico de escaneos de documentos), el PDF va a imprimir a 300 DPI.",
          "Lo único que cambia es que cada imagen ocupa una página del PDF con dimensiones proporcionales a las de la imagen. Si tenés imágenes de tamaños muy distintos (por ejemplo, una captura de 1080×1920 y una foto de 4000×3000), cada página tendrá proporciones diferentes. Esto es normal y esperado para un PDF de imágenes.",
          "Si necesitás normalizar a un tamaño de página estándar como A4, hacelo antes de convertir: redimensioná las imágenes a 2480×3508 px (A4 a 300 DPI) con cualquier editor de imagen."
        ]
      },
      {
        "heading": "Privacidad: tus archivos nunca salen del navegador",
        "paragraphs": [
          "Dado que el procesamiento es 100% local (usando JavaScript en tu navegador), tus imágenes jamás se suben a ningún servidor. Esto es especialmente relevante cuando las imágenes contienen datos sensibles como DNI, pasaportes, estados de cuenta bancarios o contratos con firmas. No hay riesgo de que esos archivos queden almacenados en un servidor de terceros.",
          "Para verificarlo, podés desconectar el Wi-Fi después de cargar la herramienta y el proceso seguirá funcionando, ya que todo el código ya está en tu navegador."
        ]
      }
    ],
    "steps": [
      {
        "title": "Seleccioná las imágenes",
        "description": "Hacé clic en el área de carga o arrastras los archivos JPG o PNG. Podés subir varias a la vez."
      },
      {
        "title": "Ordenalas",
        "description": "Reorganizá el orden de las páginas arrastrando las miniaturas. El orden en que aparecen es el orden final del PDF."
      },
      {
        "title": "Generá y descargá",
        "description": "Presioná 'Convertir a PDF' y descargá el archivo resultante. El proceso es instantáneo para la mayoría de las imágenes."
      }
    ]
  },
  "typing-test": {
    "intro": "El test de velocidad de tipeo de Toolram mide tu WPM (palabras por minuto) y tu precisión porcentual en tiempo real, usando textos aleatorios que evitan el efecto de memorización. Está pensado tanto para quienes quieren medir su nivel actual como para practicar y mejorar con el tiempo antes de pruebas de empleo, transcripción o trabajo en call centers.",
    "sections": [
      {
        "heading": "¿Qué WPM necesito según mi trabajo?",
        "paragraphs": [
          "El promedio de un adulto que usa teclado regularmente está entre 38 y 45 WPM. Eso alcanza para trabajo de oficina estándar: correos, formularios, reportes. Sin embargo, varios sectores tienen umbrales más exigentes: atención al cliente por chat (mínimo 50 WPM), transcripción de audio (60-80 WPM), secretariado ejecutivo (70+ WPM), y stenografía profesional (200+ WPM con teclados especializados).",
          "Para programadores, la velocidad de tipeo importa menos que la precisión: un dev que escribe 55 WPM con 99% de precisión es más productivo que uno de 70 WPM con 92% de precisión, porque los errores de tipeo en código pueden tomar minutos en depurarse. <strong>El indicador clave para trabajo técnico es la precisión, no solo la velocidad.</strong>",
          "Si estás postulando a un trabajo remoto de asistente virtual o data entry, muchas empresas en México y Argentina piden un mínimo de 60 WPM. Con práctica diaria de 15 minutos, la mayoría de personas pasan de 40 a 60 WPM en 4-6 semanas."
        ],
        "citableSummary": "<strong>El promedio global de tipeo es 40 WPM.</strong> Tipistas profesionales alcanzan 65-75 WPM, y los campeones mundiales de mecanografía superan los 200 WPM en teclados QWERTY convencionales."
      },
      {
        "heading": "Técnicas concretas para mejorar tu WPM en 30 días",
        "paragraphs": [
          "El error más común de quienes intentan mejorar es ir rápido y corregir después. La investigación en mecanografía muestra que es más efectivo ir al ritmo que puedes escribir sin errores, e ir subiendo la velocidad gradualmente. Cuando corregís constantemente, el cerebro no aprende la secuencia motora del dedo correcto: aprende la secuencia escribir-borrar-escribir.",
          "Otra técnica concreta: practicá las bigramas más frecuentes del español. Las combinaciones 'de', 'en', 'que', 'es', 'la', 'el', 'un', 'se' representan una fracción enorme del texto cotidiano. Hacer ejercicios específicos con esas combinaciones mejora la fluidez más que practicar texto genérico.",
          "Si aún escribís con el sistema de dos dedos, invertí una semana en aprender el método de diez dedos con la posición base en ASDF-JKL. La curva de aprendizaje es molesta (tu WPM baja primero), pero en 3-4 semanas superás tu máximo anterior y seguís mejorando sin límite estructural."
        ],
        "bullets": [
          "Practicá 15 minutos diarios en lugar de sesiones largas esporádicas",
          "Prioriza precisión sobre velocidad: mantené 95%+ antes de intentar ir más rápido",
          "Aprendé teclas de puntuación y símbolos frecuentes como parte del entrenamiento",
          "Usá una fuente monoespaciada para que cada carácter tenga el mismo peso visual",
          "Medí tu WPM a la misma hora cada día para comparar resultados consistentes"
        ]
      },
      {
        "heading": "¿Cómo se calcula el WPM exactamente?",
        "paragraphs": [
          "El estándar universal para medir WPM define una 'palabra' como 5 caracteres, sin importar cuántas palabras reales escribiste. Eso significa que 'Hola' (4 letras) cuenta como 0.8 palabras, y 'maravillosamente' (15 letras) cuenta como 3 palabras. Este estándar existe para que la comparación entre idiomas sea justa, ya que el español y el alemán tienen palabras más largas que el inglés en promedio.",
          "La fórmula es: <code>WPM = (Total de caracteres / 5) / Minutos transcurridos</code>. La precisión se calcula como <code>(Caracteres correctos / Total caracteres escritos) × 100</code>. Ambas métricas juntas son más informativas que el WPM solo."
        ]
      }
    ]
  },
  "eliminar-acentos": {
    "intro": "La herramienta de eliminación de tildes y acentos de Toolram ofrece tres transformaciones distintas en un solo clic: texto sin tildes (conservando la ñ), texto completamente ASCII (convirtiendo también la ñ a 'n') y slugs URL-friendly listos para usar como rutas de sitios web. Es especialmente útil para desarrolladores, redactores SEO y administradores de base de datos que trabajan con sistemas que no soportan caracteres UTF-8 extendidos.",
    "sections": [
      {
        "heading": "¿Cuándo necesito ASCII puro vs. solo quitar tildes?",
        "paragraphs": [
          "La distinción es importante según el contexto de uso. <strong>Solo quitar tildes (mantener ñ)</strong> es útil cuando exportás a un sistema que soporta Latin-1 pero no UTF-8 completo, o cuando necesitás normalizar nombres propios para búsquedas sin perder la ñ, que es una letra del alfabeto español, no un error tipográfico.",
          "<strong>ASCII puro (sin ñ)</strong> es necesario para: nombres de archivos en sistemas Windows legacy, identificadores de variables en lenguajes de programación antiguos, columnas de base de datos con charset latin1 o ascii, y URLs en sistemas de gestión de contenido que no manejan internamente la normalización de caracteres.",
          "El slug URL-friendly hace un paso adicional: además de quitar acentos y ñ, convierte todo a minúsculas, reemplaza espacios y caracteres especiales por guiones, y elimina guiones dobles. Por ejemplo, 'Jalisco: ¡La Perla del Occidente!' se convierte en <code>jalisco-la-perla-del-occidente</code>."
        ],
        "citableSummary": "<strong>Un slug URL-friendly</strong> es la versión normalizada de un texto que puede usarse directamente en una ruta de URL, sin caracteres especiales, espacios ni mayúsculas, separando palabras con guiones."
      },
      {
        "heading": "Casos de uso reales en desarrollo y SEO",
        "paragraphs": [
          "En WordPress, los slugs se generan automáticamente, pero si estás migrando contenido desde un CMS personalizado o una hoja de cálculo, necesitás generar slugs válidos para 50 o 100 artículos a la vez. Copiás todos los títulos, los pegás aquí y obtenés los slugs en un paso.",
          "En bases de datos MySQL con charset utf8mb3 (el utf8 incompleto que usaba MySQL antes de la versión 8), los caracteres de cuatro bytes como emojis fallan, pero también ciertos caracteres diacríticos poco comunes. Normalizar los datos a ASCII puro antes de insertarlos evita errores de codificación en producción.",
          "Para SEO, los slugs sin caracteres especiales son técnicamente preferibles porque algunos sistemas de tracking y herramientas de análisis codifican los caracteres especiales como <code>%C3%B1</code> en los reportes, lo que complica la lectura y el filtrado de datos en Google Analytics o Search Console."
        ]
      },
      {
        "heading": "Tabla de conversiones comunes que hace esta herramienta",
        "paragraphs": [
          "Las vocales con tilde (á, é, í, ó, ú) se convierten a su versión sin tilde (a, e, i, o, u). La Á mayúscula se convierte a A, y así con todas. La ü (diéresis, usada en palabras como 'pingüino' o 'güero' en México) se convierte a 'u'. La ñ en modo ASCII se convierte a 'n', aunque con eso se pierde la distinción entre 'año' y 'ano', por lo que este modo debe usarse solo cuando el sistema destino lo requiere."
        ],
        "bullets": [
          "á → a, é → e, í → i, ó → o, ú → u (y sus mayúsculas)",
          "ü → u (diéresis usada en palabras como 'güero', 'cigüeña')",
          "ñ → n solo en modo ASCII puro",
          "Slug: espacios → guiones, mayúsculas → minúsculas, signos de puntuación eliminados",
          "¿ ¡ ° @ # eliminados en el modo slug"
        ]
      }
    ],
    "steps": [
      {
        "title": "Pegá tu texto",
        "description": "Escribí o pegá el texto que querés normalizar en el campo de entrada."
      },
      {
        "title": "Elegí el modo",
        "description": "Seleccioná entre: sin tildes (conserva ñ), ASCII puro (sin ñ) o slug URL-friendly."
      },
      {
        "title": "Copiá el resultado",
        "description": "El resultado aparece al instante. Usá el botón Copiar para llevarlo al portapapeles."
      }
    ]
  },
  "css-formatter": {
    "intro": "El formateador y minificador CSS de Toolram funciona en ambas direcciones: convierte CSS comprimido o minificado en código bien indentado y legible, o comprime CSS extenso para reducir el tamaño del archivo que se envía al navegador en producción. Muestra el porcentaje de reducción al minificar, lo que te permite cuantificar el ahorro de bytes antes de hacer el deploy.",
    "sections": [
      {
        "heading": "¿Cuánto peso pierde el CSS al minificar? Números reales",
        "paragraphs": [
          "La reducción típica al minificar CSS está entre el 15% y el 35% del tamaño original. Un archivo de 80 KB como el de Bootstrap 5 completo se reduce a unos 58 KB minificado (su versión oficial .min.css). Para archivos escritos a mano con mucho whitespace, comentarios y líneas en blanco, la reducción puede superar el 40%.",
          "Esto importa porque los archivos CSS son recursos render-blocking: el navegador no muestra nada hasta que termina de descargar y procesar todos los archivos CSS enlazados en el <code>&lt;head&gt;</code>. Reducir 20 KB en un CSS de 60 KB puede mejorar el First Contentful Paint (FCP) de tu página en 100-300 ms en conexiones lentas.",
          "Si además aplicás Gzip o Brotli en el servidor (que casi todo hosting moderno activa por defecto), el CSS minificado se comprime aún más: un CSS de 58 KB minificado se transfiere como ~12 KB con Brotli. El minificado y la compresión del servidor son complementarios, no excluyentes."
        ],
        "citableSummary": "<strong>Un CSS minificado ocupa entre un 15% y un 35% menos</strong> que el original. Combinado con compresión Brotli del servidor, el ahorro total puede superar el 80% del tamaño original."
      },
      {
        "heading": "¿Para qué sirve el modo de formateo (el inverso)?",
        "paragraphs": [
          "Cuando heredás un proyecto donde el CSS ya está minificado (por un pipeline anterior, por un plugin de WordPress en modo caché, o porque el developer original lo entregó comprimido), leer ese código es imposible. Esta herramienta lo reformatea con indentación de 2 espacios, separando cada propiedad en su propia línea y cada bloque con una línea en blanco.",
          "También es útil para inspeccionar CSS generado por frameworks como <strong>Tailwind CSS con purge</strong> o CSS generado automáticamente por herramientas de diseño como Figma Inspect. Esos archivos suelen llegar en una sola línea o sin indentación consistente.",
          "Para debug en producción: si tu herramienta de DevTools del navegador muestra un CSS minificado y querés compararlo con el de staging, formateá ambos y hacé un diff de texto. Es mucho más claro que comparar líneas minificadas."
        ]
      },
      {
        "heading": "Qué hace y qué no hace el minificador",
        "paragraphs": [
          "Este minificador elimina comentarios, espacios en blanco innecesarios, saltos de línea y el último punto y coma antes de un cierre de bloque. También colapsa colores en formato largo: <code>#ffffff</code> a <code>#fff</code>, y valores <code>0px</code> a <code>0</code>.",
          "Lo que <strong>no hace</strong>: no reordena selectores para evitar especificidad, no elimina reglas duplicadas, no hace dead code elimination (CSS de componentes que no se usan en la página). Para esas optimizaciones avanzadas necesitás herramientas dedicadas como PurgeCSS o el modo JIT de Tailwind."
        ],
        "bullets": [
          "Elimina comentarios /* */ y espacios innecesarios",
          "Colapsa #ffffff → #fff y 0px → 0",
          "Elimina el último punto y coma antes de cierre de bloque",
          "NO elimina reglas CSS duplicadas",
          "NO detecta código muerto ni selectores sin uso"
        ]
      }
    ],
    "steps": [
      {
        "title": "Pegá tu CSS",
        "description": "Copiá el código CSS que querés procesar y pegalo en el área de texto."
      },
      {
        "title": "Elegí el modo",
        "description": "Seleccioná 'Formatear' para hacerlo legible o 'Minificar' para reducir el tamaño."
      },
      {
        "title": "Verificá el ahorro",
        "description": "Al minificar, la herramienta muestra el tamaño original vs. el resultado y el porcentaje de reducción."
      },
      {
        "title": "Copiá el resultado",
        "description": "Usá el botón Copiar para llevar el CSS procesado al portapapeles."
      }
    ]
  },
  "pdf-a-jpg": {
    "intro": "El conversor PDF a JPG de Toolram usa pdf.js —la misma biblioteca open-source que emplean Firefox y Chrome para renderizar PDFs— para convertir cada página de tu documento en una imagen JPG de alta resolución, con 4 niveles de calidad que van desde 72 DPI hasta 288 DPI. Todo el procesamiento ocurre en tu navegador, sin que el archivo PDF se suba a ningún servidor.",
    "sections": [
      {
        "heading": "¿Qué DPI necesito para imprimir vs. pantalla vs. WhatsApp?",
        "paragraphs": [
          "La resolución en DPI (dots per inch) determina la nitidez de la imagen resultante. <strong>72 DPI</strong> es suficiente para vistas previas en pantalla, miniaturas web o compartir por WhatsApp donde el receptor solo va a ver la imagen en celular. <strong>144 DPI</strong> es una calidad intermedia buena para presentaciones en pantallas retina o adjuntos de correo.",
          "<strong>288 DPI</strong> es la opción de mayor calidad, recomendada si vas a imprimir la imagen o si necesitás extraer texto visualmente de un PDF (por ejemplo, para capturar un cuadro o tabla de un informe y pegarlo en una presentación). A 288 DPI, una página A4 genera una imagen de aproximadamente 2480×3508 píxeles.",
          "Un detalle importante: si el PDF original ya tiene imágenes comprimidas de baja calidad, aumentar los DPI en la exportación no va a mejorar esas imágenes. La resolución que establecés afecta el renderizado vectorial (texto, diagramas, líneas), pero no puede aumentar la resolución de una foto ya comprimida dentro del PDF."
        ],
        "citableSummary": "<strong>72 DPI para pantalla, 150-288 DPI para impresión.</strong> Una página A4 exportada a 288 DPI produce una imagen de 2480×3508 píxeles, el equivalente a una fotografía de alta resolución."
      },
      {
        "heading": "Casos de uso: cuándo convertir PDF a JPG tiene sentido",
        "paragraphs": [
          "El caso de uso más común es extraer una página específica de un informe para insertarla como imagen en una presentación de PowerPoint o Google Slides. Las presentaciones aceptan imágenes directamente pero no PDFs completos, así que convertir la página exacta que necesitás es la solución más limpia.",
          "También es útil para compartir documentos en plataformas que no soportan adjuntos PDF: algunas redes sociales, formularios de carga de imágenes, o gestores de contenido que solo aceptan imágenes. Un certificado de finalización, un diploma o un informe de una página se comparte mucho más fácil como JPG.",
          "Para OCR: si necesitás hacer reconocimiento óptico de caracteres en un PDF que no tiene texto seleccionable (por ejemplo, un PDF escaneado), primero lo convertís a JPG de alta resolución y luego usás una herramienta de OCR. Las herramientas de OCR como Tesseract o Google Vision trabajan mejor con imágenes directamente que con PDFs."
        ]
      },
      {
        "heading": "Privacidad y procesamiento local",
        "paragraphs": [
          "Dado que este conversor funciona completamente en el navegador usando pdf.js y Canvas API, tu archivo PDF nunca sale de tu computadora. Esto es especialmente relevante para PDFs con datos confidenciales: contratos, documentos médicos, estados de cuenta, declaraciones fiscales.",
          "Podés verificarlo abriendo la consola de red (F12 → Network) mientras usás la herramienta: no verás ninguna solicitud HTTP que incluya tu archivo. El único tráfico es la carga inicial del código de la herramienta."
        ]
      }
    ],
    "steps": [
      {
        "title": "Cargá tu PDF",
        "description": "Hacé clic en el área de carga o arrastrá el archivo PDF desde tu explorador de archivos."
      },
      {
        "title": "Elegí la calidad",
        "description": "Seleccioná el nivel de DPI: 72 para web/pantalla, 144 para calidad media, 288 para impresión."
      },
      {
        "title": "Descargá las imágenes",
        "description": "Podés descargar cada página individualmente o todas a la vez en un ZIP."
      }
    ]
  },
  "headers-checker": {
    "intro": "El HTTP Headers Checker de Toolram hace un GET real a cualquier URL y te devuelve el status code, la latencia de respuesta, la cadena completa de redirecciones con cada salto documentado, todos los response headers del servidor, y un análisis específico de los 6 headers de seguridad más importantes. Es la herramienta que usan desarrolladores, especialistas SEO y auditores de seguridad para diagnosticar problemas sin abrir DevTools.",
    "sections": [
      {
        "heading": "¿Cuáles son los 6 headers de seguridad que deberías tener activos?",
        "paragraphs": [
          "<strong>Strict-Transport-Security (HSTS)</strong> le dice al navegador que siempre use HTTPS para ese dominio, incluso si el usuario escribe 'http://'. Sin HSTS, existe una ventana de vulnerabilidad en la primera visita. <strong>Content-Security-Policy (CSP)</strong> define qué recursos puede cargar la página: scripts, estilos, frames, fuentes. Es la defensa principal contra ataques XSS.",
          "<strong>X-Content-Type-Options: nosniff</strong> evita que el navegador 'adivine' el tipo MIME de un archivo, lo que podría permitir ejecutar un archivo de texto como JavaScript. <strong>X-Frame-Options</strong> previene que tu sitio sea incrustado en un iframe de otro dominio, protegiendo contra clickjacking. Su equivalente moderno es <code>Content-Security-Policy: frame-ancestors</code>.",
          "<strong>Referrer-Policy</strong> controla qué información de la URL de origen se comparte cuando el usuario hace clic en un enlace saliente. Para sitios con URLs que contienen datos sensibles (tokens, IDs de sesión), esto es crítico. <strong>Permissions-Policy</strong> (antes Feature-Policy) restringe el acceso a APIs del navegador como cámara, micrófono o geolocalización."
        ],
        "citableSummary": "<strong>Solo el 20% de los sitios web tienen los 6 headers de seguridad correctamente configurados</strong>, según análisis del HTTP Archive. HSTS y CSP son los más frecuentemente omitidos."
      },
      {
        "heading": "Cómo interpretar una cadena de redirects en SEO",
        "paragraphs": [
          "Cada salto en una cadena de redirects agrega latencia y, en el caso de crawlers de motores de búsqueda como Googlebot, consume crawl budget. Una cadena de 3 redirects (por ejemplo, http:// → https:// → sin www → con www) es un problema técnico frecuente en sitios WordPress migrados. Lo óptimo es un máximo de 1 redirect por URL.",
          "Los redirects 301 (permanentes) transfieren entre el 99% y el 100% del link equity (PageRank) a la URL destino, según la guía oficial de Google. Los 302 (temporales) técnicamente no transfieren link equity. Si tenés redirects de consolidación de dominios o de páginas eliminadas, asegurate de que sean 301.",
          "Un redirect loop (donde la URL A redirige a B y B redirige a A) aparece en esta herramienta como una cadena que se repite. Es un error crítico que hace que la página sea completamente inaccesible para usuarios y bots."
        ]
      },
      {
        "heading": "Uso para auditorías técnicas SEO",
        "paragraphs": [
          "Además de ver el status code final, esta herramienta te muestra headers relevantes para SEO como <code>X-Robots-Tag</code> (que puede bloquear la indexación a nivel de header, incluso si el meta robots del HTML dice 'index'), <code>Cache-Control</code> (importante para saber si las CDNs están cacheando la versión correcta) y <code>Last-Modified</code> / <code>ETag</code> (que afectan cómo Googlebot decide cuándo re-crawlear la página).",
          "Para auditorías rápidas sin instalar Screaming Frog o similar, podés verificar docenas de URLs manualmente en minutos. Especialmente útil para confirmar que redirects de migración están configurados correctamente en producción."
        ]
      }
    ],
    "steps": [
      {
        "title": "Ingresá la URL",
        "description": "Pegá la URL completa que querés inspeccionar, incluyendo https:// o http://."
      },
      {
        "title": "Ejecutá la consulta",
        "description": "Presioná 'Verificar headers'. La herramienta hace un GET real y registra todos los saltos de redirect."
      },
      {
        "title": "Revisá los resultados",
        "description": "Observá el status code, la latencia, la cadena de redirects y el análisis de los 6 headers de seguridad."
      }
    ]
  },
  "generador-hashtags": {
    "intro": "El generador de hashtags de Toolram crea sets de hashtags optimizados por categoría y plataforma: desde 10 hashtags de nicho para LinkedIn hasta los 30 permitidos en Instagram, con variaciones automáticas de tu propia keyword. Las recomendaciones están ajustadas a las dinámicas de cada red social, porque la estrategia de hashtags en TikTok es fundamentalmente distinta a la de LinkedIn.",
    "sections": [
      {
        "heading": "¿Cuántos hashtags usar por plataforma? La guía práctica 2025",
        "paragraphs": [
          "<strong>Instagram</strong> permite hasta 30 hashtags por post y hasta 10 en Stories. Los estudios de alcance de Socialinsider y Later muestran que los posts con 5-10 hashtags relevantes superan en alcance a los que usan 30 hashtags genéricos. La razón: Instagram penaliza el uso de hashtags 'spam' o completamente genéricos porque saturan feeds sin añadir contexto.",
          "<strong>TikTok</strong> recomienda oficialmente usar 3-5 hashtags, incluyendo siempre al menos uno de tendencia o challenge activo. El algoritmo de TikTok es principalmente de contenido (For You Page), no de hashtags, pero los hashtags sí ayudan a la clasificación temática inicial del video.",
          "<strong>LinkedIn</strong> tiene un comportamiento diferente: 3-5 hashtags muy específicos de industria funcionan mejor que listas largas. Hashtags como <code>#marketingdigital</code> tienen millones de seguidores en español y pueden darte visibilidad con audiencias profesionales, pero competís con mucho contenido. Hashtags más nicho como <code>#b2bsaas</code> o <code>#inboundmarketing</code> son más precisos."
        ],
        "citableSummary": "<strong>La recomendación actualizada para Instagram es 5-10 hashtags de nicho</strong>, no los 30 permitidos. El algoritmo prioriza relevancia sobre cantidad desde la actualización de 2023."
      },
      {
        "heading": "Mezcla de hashtags: pequeños, medianos y grandes",
        "paragraphs": [
          "Una estrategia efectiva combina hashtags de tres niveles de popularidad. Los <strong>hashtags grandes</strong> (más de 1 millón de posts en Instagram, como #fitness o #comida) tienen mucha competencia y tu contenido desaparece rápidamente del feed del hashtag. Los <strong>medianos</strong> (100K-1M posts) tienen un balance entre audiencia y competencia.",
          "Los <strong>hashtags pequeños o nicho</strong> (menos de 100K posts) son donde tu contenido puede mantenerse visible por más tiempo y llegar a una audiencia muy específica. Para una cuenta nueva, los hashtags nicho generan más engagements por seguidor que los grandes. Este generador te da una mezcla equilibrada de los tres niveles.",
          "Para cuentas de negocios locales en México, Argentina o Colombia, incluí siempre 1-2 hashtags geográficos relevantes: <code>#fotografoCDMX</code>, <code>#negociosBogota</code>, <code>#emprendedorArgentina</code>. Estos tienen poca competencia y conectan directamente con tu audiencia local."
        ]
      },
      {
        "heading": "Hashtags para X (Twitter): funcionan distinto",
        "paragraphs": [
          "En X, la práctica recomendada es usar máximo 1-2 hashtags por tweet. El algoritmo de X penaliza los tweets que parecen spam, y una lista de hashtags al final de un tweet es una señal negativa. La función principal de los hashtags en X es unirse a conversaciones en tiempo real (breaking news, eventos en vivo, debates) y no tanto para descubrimiento de contenido evergreen.",
          "Para X, este generador te sugiere 1-2 hashtags de conversación activa relacionados con tu tema. Si no hay conversación activa en ese momento, generalmente es mejor no usar hashtags y dejar que el contenido hable por sí mismo."
        ]
      }
    ]
  },
  "paleta-colores": {
    "intro": "El generador de paletas de colores de Toolram crea sets de 5 colores armónicos usando la teoría del color clásica: monocromático, análogo, complementario, triádico, tetrádico o aleatorio. Podés bloquear los colores que ya te gustaron y regenerar solo el resto, y usás la barra espaciadora para generar paletas nuevas sin interrumpir tu flujo de trabajo.",
    "sections": [
      {
        "heading": "¿Qué tipo de armonía usar según el proyecto?",
        "paragraphs": [
          "<strong>Monocromático</strong> usa un solo tono base con diferentes valores de luminosidad y saturación. Produce paletas muy cohesivas, elegantes y fáciles de usar sin errores. Es ideal para interfaces minimalistas, branding corporativo sobrio, o cuando querés que el color no distraiga del contenido. Las apps fintech como Nubank o N26 usan esquemas prácticamente monocromáticos.",
          "<strong>Análogo</strong> usa colores vecinos en la rueda de color (por ejemplo, azul, azul-verde, verde). Crea sensación de armonía natural y calma. Es el esquema favorito para marcas de bienestar, naturaleza, salud y sostenibilidad. <strong>Complementario</strong> usa colores opuestos (naranja y azul, rojo y verde). Genera alto contraste y vibración visual, ideal para CTAs y elementos que querés que destaquen.",
          "<strong>Triádico</strong> (3 colores equidistantes) y <strong>tetrádico</strong> (4 colores) ofrecen paletas más complejas y vibrantes. Son más difíciles de equilibrar pero dan identidades visuales muy memorables cuando se usan bien. Marcas como Google y NBC usan paletas triádicas o tetrádicas como parte de su identidad."
        ],
        "citableSummary": "<strong>El 90% de las decisiones de compra están influenciadas por el color</strong>, según investigaciones de psicología del consumidor. Una paleta coherente aumenta el reconocimiento de marca en hasta un 80%."
      },
      {
        "heading": "Cómo usar la paleta generada en tu proyecto real",
        "paragraphs": [
          "Una paleta de 5 colores en un proyecto de diseño tiene roles específicos: 1 color dominante o primario (60% del espacio visual), 1 color secundario (30%) y 1 color de acento para CTAs y destacados (10%). Los 2 colores restantes suelen ser neutros o variaciones de los anteriores para texto, fondos y bordes.",
          "Cada color de la paleta viene con su código HEX, que podés pegar directamente en CSS, Figma, Canva, Illustrator o cualquier herramienta de diseño. Para Tailwind CSS, los colores HEX se agregan en el objeto <code>theme.extend.colors</code> de tu configuración. Para CSS vanilla, los definís como custom properties: <code>--color-primary: #3B6E9C;</code>.",
          "Un error frecuente en diseño web: usar colores directamente de una paleta sin verificar el contraste para accesibilidad. El estándar WCAG 2.1 requiere una relación de contraste de <strong>4.5:1</strong> para texto normal sobre fondo de color. Verificá siempre el contraste antes de usar tu paleta en producción."
        ]
      },
      {
        "heading": "El atajo de teclado que acelera tu workflow",
        "paragraphs": [
          "La barra espaciadora genera una paleta nueva instantáneamente. Esto imita el flujo de trabajo del popular Coolors.co y permite explorar cientos de paletas por minuto sin hacer clic. Cuando encontrás un color que te gusta, lo bloqueás con el ícono de candado y seguís presionando espacio hasta que los colores restantes también te convencen.",
          "Este flujo es significativamente más rápido que elegir colores manualmente desde una rueda de color. La mayoría de diseñadores encuentran su paleta final en 2-5 minutos de exploración con este método."
        ]
      }
    ]
  },
  "citas-apa": {
    "intro": "El generador de citas académicas de Toolram produce referencias correctamente formateadas en APA 7ma edición, MLA 9, Chicago y Harvard para páginas web, libros y artículos de revista científica, con todos los campos obligatorios según el tipo de fuente. Es la herramienta que usan estudiantes universitarios, investigadores y docentes para evitar errores de formato que pueden costar puntos en una entrega.",
    "sections": [
      {
        "heading": "APA 7 vs. MLA 9 vs. Chicago: ¿cuál usa tu universidad?",
        "paragraphs": [
          "<strong>APA 7ma edición</strong> (American Psychological Association) es el estándar en ciencias sociales, psicología, educación, comunicación y negocios. Es el formato más usado en universidades latinoamericanas para tesis y trabajos finales de grado. El formato de autor-fecha <code>(Apellido, Año)</code> en el texto remite a la lista de referencias al final.",
          "<strong>MLA 9</strong> (Modern Language Association) es estándar en humanidades, literatura, lingüística y artes. Usa el formato autor-página en el texto: <code>(García Márquez 45)</code>. <strong>Chicago</strong> tiene dos sistemas: notas al pie con bibliografía (usado en historia y humanidades) y autor-fecha (ciencias). <strong>Harvard</strong> es similar a APA pero con diferencias de puntuación y es el más usado en universidades del Reino Unido y Australia.",
          "En México, Argentina y Colombia, la mayoría de las facultades de ciencias sociales, derecho y negocios exigen APA 7. Las facultades de letras e idiomas suelen pedir MLA. Verificá siempre en el reglamento de tu institución cuál es el formato obligatorio."
        ],
        "citableSummary": "<strong>APA 7ma edición</strong> es el estándar más usado en universidades latinoamericanas para tesis y trabajos académicos en ciencias sociales, psicología, educación y negocios."
      },
      {
        "heading": "Los errores más frecuentes al citar que esta herramienta evita",
        "paragraphs": [
          "El error número uno en citas APA es el orden de los elementos en la referencia de libro: muchos estudiantes escriben Editorial seguido de Ciudad cuando en APA 7 ya se eliminó la ciudad de publicación para libros (solo se mantiene para ediciones anteriores). Esta herramienta genera la referencia con el formato APA 7 correcto.",
          "Otro error frecuente es el DOI vs. URL en artículos científicos. En APA 7, si el artículo tiene DOI, siempre se usa el DOI (en formato URL: <code>https://doi.org/10.xxxx</code>); la URL solo se usa si no hay DOI disponible. Para páginas web, el campo fecha de acceso solo es necesario si el contenido puede cambiar; para artículos con fecha de publicación clara, no se incluye.",
          "En MLA 9, el concepto de 'contenedor' cambió significativamente respecto a MLA 8: una revista académica es el contenedor de un artículo, y una antología es el contenedor de un ensayo. El generador maneja correctamente estos niveles de contenedor para cada tipo de fuente."
        ]
      },
      {
        "heading": "Cómo citar páginas web en APA 7: casos especiales",
        "paragraphs": [
          "Para páginas web sin autor identificado, APA 7 indica que se usa el nombre de la organización o sitio web en lugar del autor personal. Si tampoco hay organización identificable, el título del artículo sube a la posición de autor. Este generador maneja ese caso automáticamente.",
          "Para páginas web sin fecha de publicación, APA 7 usa <code>(s.f.)</code> en español (equivalente al inglés n.d.). La fecha de acceso se agrega al final: <code>Recuperado el 15 de mayo de 2025, de https://...</code>. Para contenido con fecha fija y estable, no se necesita fecha de acceso."
        ],
        "bullets": [
          "APA 7: sin ciudad editorial para libros publicados a partir de 2020",
          "DOI en formato https://doi.org/... siempre preferido sobre URL en artículos",
          "Autor desconocido en web: organización o título del artículo en lugar de autor",
          "Fechas: (s.f.) para sin fecha, año entre paréntesis para fuentes con fecha",
          "MLA 9: incluí el nombre del sitio web como contenedor para artículos en línea"
        ]
      }
    ],
    "steps": [
      {
        "title": "Elegí el estilo",
        "description": "Seleccioná APA 7, MLA 9, Chicago o Harvard según el requerimiento de tu institución."
      },
      {
        "title": "Elegí el tipo de fuente",
        "description": "Indicá si es una página web, un libro o un artículo de revista académica."
      },
      {
        "title": "Completá los campos",
        "description": "Llenálos campos disponibles (autor, año, título, editorial, URL, etc.). Los campos obligatorios están marcados."
      },
      {
        "title": "Copiá la referencia",
        "description": "La cita formateada aparece al instante. Copiala y pegala directamente en tu bibliografía."
      }
    ]
  },
  "texto-a-voz": {
    "intro": "El conversor de texto a voz de Toolram usa la Web Speech API nativa del navegador para transformar cualquier texto en audio con más de 40 idiomas y 100 voces disponibles, sin enviar nada a servidores externos y sin límite de caracteres. Es una herramienta real de accesibilidad y productividad, no una demo: podés controlar la velocidad, el tono y el volumen de la voz.",
    "sections": [
      {
        "heading": "¿Qué es la Web Speech API y por qué importa para la privacidad?",
        "paragraphs": [
          "La <strong>Web Speech API</strong> es una especificación del W3C que permite a los navegadores web acceder a síntesis de voz (text-to-speech) y reconocimiento de voz directamente desde JavaScript, sin plugins ni SDKs externos. Chrome, Edge, Firefox y Safari la implementan con diferentes conjuntos de voces según el sistema operativo del usuario.",
          "La diferencia clave con servicios como Google Cloud TTS o Amazon Polly es que en la Web Speech API el texto se procesa localmente, usando las voces instaladas en tu sistema operativo. En Windows usás las voces de Microsoft (como 'Sabina' en español), en macOS las voces de Apple (como 'Paulina' o 'Mónica'), y en Android las voces de Google. Ningún texto sale de tu dispositivo.",
          "Esto es relevante para usos con texto confidencial: documentos legales, textos médicos, contenido de trabajo interno. A diferencia de herramientas TTS en la nube, no hay riesgo de que ese texto quede en logs de un servidor de terceros."
        ],
        "citableSummary": "<strong>La Web Speech API procesa el texto localmente</strong> en el navegador usando las voces del sistema operativo, sin enviar el contenido a servidores externos, a diferencia de los servicios TTS en la nube."
      },
      {
        "heading": "Casos de uso reales: más allá del texto en voz alta",
        "paragraphs": [
          "Para <strong>aprender pronunciación de idiomas</strong>: pegá una frase en francés, japonés o alemán y escuchá la pronunciación nativa antes de una clase o viaje. Las voces nativas del sistema son significativamente más precisas que los motores TTS de primera generación.",
          "Para <strong>accesibilidad</strong>: usuarios con dislexia, discapacidad visual o fatiga visual pueden escuchar artículos largos en lugar de leerlos. La velocidad 0.7x es ideal para comprender texto técnico complejo; 1.5x para repasar contenido ya conocido.",
          "Para <strong>revisión de textos propios</strong>: escuchar en voz alta un texto que escribiste es una técnica usada por escritores y redactores para detectar errores que el ojo pierde al leer. El cerebro procesa diferente lo escuchado vs. lo leído, así que los problemas de ritmo, oraciones demasiado largas y palabras repetidas se vuelven evidentes al oír."
        ]
      },
      {
        "heading": "Voces disponibles y diferencias por sistema operativo",
        "paragraphs": [
          "La cantidad de voces disponibles varía según el sistema operativo y el idioma instalado. <strong>Windows 11</strong> con idioma español instalado ofrece voces como 'Microsoft Sabina' (México) y 'Microsoft Helena' (España). <strong>macOS</strong> en español tiene 'Paulina' (México), 'Mónica' (España) y otras en sistemas actualizados. <strong>Chrome en Android</strong> descarga voces de alta calidad de Google en segundo plano.",
          "Si ves pocas voces disponibles, probá instalar el paquete de idioma correspondiente en tu sistema operativo. En Windows: Configuración → Hora e idioma → Idioma → Español (México) → Opciones → Descargar paquete de voz.",
          "Para accesibilidad avanzada o voces de calidad profesional sin efecto robotizado, servicios como ElevenLabs o Azure TTS ofrecen voces neurales de mayor calidad, aunque requieren API key y tienen costo. Esta herramienta es ideal para todos los usos cotidianos sin costo."
        ]
      }
    ],
    "steps": [
      {
        "title": "Pegá o escribí el texto",
        "description": "Ingresá el texto que querés convertir a audio en el campo de texto. No hay límite de caracteres."
      },
      {
        "title": "Elegí el idioma y la voz",
        "description": "Seleccioná el idioma y la voz disponible en tu sistema. Las opciones dependen de los paquetes de idioma instalados."
      },
      {
        "title": "Ajustá velocidad, tono y volumen",
        "description": "Usá los controles deslizantes: velocidad 0.5x-2x, tono y volumen. 0.8x es ideal para comprensión de textos técnicos."
      },
      {
        "title": "Reproducí",
        "description": "Presioná el botón de reproducción. Podés pausar, reanudar o detener en cualquier momento."
      }
    ]
  },
  "whatsapp-link": {
    "intro": "El generador de links de WhatsApp de Toolram crea links wa.me con mensaje precargado en formato listo para usar en landing pages, bios de redes sociales y firmas de correo. Genera tres outputs simultáneamente: el link directo, el botón HTML verde oficial y un QR descargable, con soporte para 18 países de Latinoamérica, España y EE.UU.",
    "sections": [
      {
        "heading": "¿Cómo funciona wa.me y por qué es mejor que compartir el número directamente?",
        "paragraphs": [
          "Los links <code>wa.me</code> son el sistema oficial de Click-to-Chat de WhatsApp. El formato es <code>https://wa.me/[código-país][número]</code> con el parámetro opcional <code>?text=[mensaje-codificado]</code>. Cuando alguien hace clic, WhatsApp se abre directamente con el número y el mensaje ya escrito, <strong>sin que el contacto necesite guardar el número en su agenda</strong>.",
          "Esto elimina la fricción más común en conversiones de negocio: que el cliente potencial vea el número pero no lo escriba porque implica abrir la aplicación, crear un nuevo chat y tipear el número. Con el link, el proceso es un clic y ya está en la conversación.",
          "Para empresas que usan WhatsApp Business, los links wa.me son compatibles tanto con la app personal como con la versión Business. Los links también funcionan en la versión web (web.whatsapp.com), redirigiendo directamente al chat correspondiente."
        ],
        "citableSummary": "<strong>Los links wa.me eliminan la necesidad de guardar el número:</strong> con un clic, el usuario abre WhatsApp con el chat listo, lo que puede aumentar la tasa de conversación hasta en un 40% comparado con mostrar el número en texto."
      },
      {
        "heading": "Dónde usar cada uno de los 3 outputs generados",
        "paragraphs": [
          "El <strong>link directo wa.me</strong> es para cualquier plataforma de texto: bio de Instagram, TikTok o Twitter, botón de Linktree, email signature, Google Business Profile, landing pages en editores de texto como Notion o HubSpot. Es la forma más universal.",
          "El <strong>botón HTML verde</strong> está listo para pegar en el código de cualquier web. El código incluye el color verde oficial (#25D366), el ícono SVG de WhatsApp y el texto personalizable. Solo necesitás pegarlo en el HTML de tu sitio o en el editor de código de tu página en WordPress, Shopify o Webflow. Sin configuración adicional.",
          "El <strong>QR descargable</strong> es para materiales físicos: tarjetas de presentación, volantes, carteles, menús de restaurante, packaging de productos. Cuando alguien escanea el QR con la cámara del celular, se abre directamente el chat con el mensaje precargado. El QR generado apunta a la URL wa.me completa, incluyendo el mensaje."
        ]
      },
      {
        "heading": "Mensajes precargados que funcionan para ventas",
        "paragraphs": [
          "El mensaje precargado que más convierte en negocios es uno que ya califica la intención: por ejemplo 'Hola, vi su página web y me interesa [producto/servicio]. ¿Tienen disponibilidad?' El cliente no tiene que pensar qué escribir, lo que aumenta la probabilidad de que efectivamente envíe el mensaje.",
          "Para e-commerce con múltiples productos, podés crear un link diferente por producto o categoría, cada uno con el mensaje precargado mencionando el artículo específico. Eso le da al equipo de ventas el contexto de qué está buscando el cliente antes de responder.",
          "En servicios profesionales (médicos, abogados, contadores), el mensaje precargado puede incluir el tipo de consulta. Esto ayuda a enrutar el mensaje al especialista correcto desde el primer contacto."
        ]
      }
    ],
    "steps": [
      {
        "title": "Seleccioná el país",
        "description": "Elegí el país de tu número de WhatsApp. El código de país se agrega automáticamente en el formato correcto."
      },
      {
        "title": "Ingresá el número",
        "description": "Escribí el número sin el código de país (solo los dígitos del número local, sin ceros ni guiones iniciales)."
      },
      {
        "title": "Escribí el mensaje precargado",
        "description": "Agregá el texto que quieras que aparezca ya escrito cuando el usuario abra el chat. Podés dejarlo vacío si preferís que el chat abra en blanco."
      },
      {
        "title": "Copiá el output que necesitás",
        "description": "Usá el link directo para redes sociales, el HTML para tu web, o descargá el QR para materiales impresos."
      }
    ]
  },
  "calculadora-sueldo-neto": {
    "intro": "La calculadora de sueldo neto de Toolram estima el salario que efectivamente recibís en tu cuenta bancaria a partir del bruto mensual, aplicando las retenciones y aportes 2026 de 6 países: México, Argentina, Chile, Perú, Colombia y España. Es una aproximación basada en las tablas fiscales vigentes sin deducciones especiales, ideal para comparar ofertas laborales o entender tu carga impositiva.",
    "sections": [
      {
        "heading": "¿Cuánto se descuenta en cada país? Una comparación directa",
        "paragraphs": [
          "En <strong>México</strong>, las retenciones incluyen el ISR (Impuesto Sobre la Renta, escalonado desde 1.92% hasta 35% según el ingreso) y las cuotas del IMSS al trabajador (aproximadamente 1.65% sobre el SBC). Para un salario bruto de 20,000 MXN mensuales, el neto estimado es alrededor de 17,200 MXN. Para 50,000 MXN bruto, el ISR ya es significativo y el neto baja a aproximadamente 37,000-39,000 MXN.",
          "En <strong>Argentina</strong>, con el sistema actual pos-simplificación de Ganancias en 2023-2024, el piso de tributación aumentó considerablemente. Los aportes del empleado incluyen jubilación (11%), obra social (3%) y PAMI (3%). En <strong>Chile</strong>, los trabajadores aportan 10% a AFP (jubilación) más 7% al sistema de salud, lo que representa un 17% flat antes de impuestos.",
          "<strong>España</strong> aplica retención de IRPF (desde 19% hasta 47% según tramo) más cotización a la Seguridad Social del empleado (6.35% aproximadamente). Los netos en España son notablemente menores al bruto en rangos de ingreso medianos y altos, lo que sorprende a muchos que reciben su primera oferta laboral expresada en bruto anual."
        ],
        "citableSummary": "<strong>La diferencia entre sueldo bruto y neto varía significativamente por país:</strong> en Chile puede ser 17-20%, en España puede llegar al 35-40% en sueldos medios, y en México el rango es 8-25% dependiendo del ingreso."
      },
      {
        "heading": "Negociación de sueldo: bruto vs. neto, un error costoso",
        "paragraphs": [
          "El error más frecuente al recibir una oferta laboral es comparar el número bruto entre países sin ajustar por impuestos y aportes. Un salario de 3,000 USD brutos en España puede convertirse en ~2,000 netos, mientras que 3,000 USD equivalentes en México (con tipo de cambio aproximado) puede dejar ~2,500 netos. La comparación directa del bruto lleva a decisiones equivocadas.",
          "En contextos de negociación, especialmente en empresas internacionales, es importante saber si la empresa cotiza el salario en bruto anual o mensual. En España las ofertas suelen expresarse en bruto anual (una cifra que dividida en 12 se ve mayor de lo que realmente es). En México y Argentina lo habitual es hablar de bruto mensual.",
          "Esta calculadora es útil para esas conversaciones: podés simular distintos niveles de sueldo bruto y ver exactamente cuánto cambia el neto. También permite comparar si vale más negociar un mayor bruto vs. beneficios no monetarios (seguro médico, bonos, vales de despensa en México) que no tributan."
        ]
      },
      {
        "heading": "Limitaciones importantes de esta calculadora",
        "paragraphs": [
          "Esta herramienta usa las tablas fiscales generales vigentes en 2026 y aplica una situación estándar: <strong>sin deducciones especiales</strong> (hipoteca, hijos a cargo, gastos médicos, plan de pensiones). En la práctica, estas deducciones pueden reducir significativamente el impuesto real, especialmente en España (deducción por mínimo personal) y México (deducción de gastos médicos).",
          "Para cálculos precisos con tu situación particular, especialmente en Argentina (donde el sistema fiscal cambia frecuentemente) o si tenés ingresos variables, bonos, participación en utilidades (PTU en México) o múltiples empleadores simultáneos, consultá con un contador. Esta calculadora es un estimado informativo, no un cálculo fiscal definitivo."
        ],
        "bullets": [
          "México: tabla ISR mensual LISR vigente + cuotas IMSS trabajador ~1.65%",
          "Argentina: jubilación 11% + obra social 3% + PAMI 3%; Ganancias según piso 2026",
          "Chile: AFP 10% + Salud 7%; impuesto de segunda categoría escalonado",
          "Perú: AFP o ONP según afiliación + IR según UIT vigente",
          "Colombia: salud 4% + pensión 4%; retención en la fuente sobre excedente",
          "España: IRPF por tramos + Seguridad Social trabajador ~6.35%"
        ]
      }
    ],
    "steps": [
      {
        "title": "Elegí tu país",
        "description": "Seleccioná el país donde trabajás. Esto determina qué tabla fiscal y qué aportes se aplican."
      },
      {
        "title": "Ingresá el sueldo bruto",
        "description": "Escribí tu salario bruto mensual en la moneda local del país seleccionado."
      },
      {
        "title": "Revisá el desglose",
        "description": "La calculadora muestra el neto estimado y el desglose de cada retención: impuesto a la renta, aportes previsionales y de salud."
      }
    ]
  },
  "generador-uuid": {
    "intro": "Un UUID (Universally Unique Identifier) versión 4 es una cadena de 128 bits generada con aleatoriedad criptográfica que luce así: <code>550e8400-e29b-41d4-a716-446655440000</code>. Con este generador producís uno o varios UUIDs listos para copiar sin instalar ninguna librería ni depender de un backend.",
    "sections": [
      {
        "heading": "¿Para qué se usa un UUID en la práctica?",
        "paragraphs": [
          "El caso más común es como <strong>clave primaria en bases de datos</strong> cuando necesitás que los registros sean identificables desde el frontend antes de persistirlos. Por ejemplo, en una app React podés asignar el UUID al objeto local mientras el usuario llena un formulario y luego enviarlo al servidor sin colisiones, incluso si hay múltiples instancias corriendo en paralelo.",
          "En sistemas distribuidos, los UUIDs reemplazan a los IDs autoincrement porque no requieren coordinar un contador central. También se usan como <strong>nombres de archivos únicos</strong> al subir imágenes a S3 o Google Cloud Storage, y como tokens de sesión de un solo uso en flujos de confirmación de email."
        ],
        "citableSummary": "Un UUID v4 ofrece aproximadamente 5.3 × 10²² UUIDs por cada nanosegundo transcurrido desde 1970, haciendo prácticamente imposible una colisión real."
      },
      {
        "heading": "UUID v4 vs otras versiones: ¿cuál elegir?",
        "paragraphs": [
          "La versión 4 es <strong>completamente aleatoria</strong> (122 bits de entropía), ideal cuando no necesitás que el ID sea ordenable por tiempo. La versión 7 (RFC 9562, ratificado en 2024) incorpora un prefijo de timestamp de 48 bits, lo que lo hace ordenable cronológicamente —útil si querés índices B-tree eficientes en PostgreSQL o MySQL—. La versión 1 expone la MAC address del generador, lo que es un riesgo de privacidad ya obsoleto en la mayoría de sistemas modernos.",
          "Si usás <strong>Supabase o PostgreSQL</strong>, podés combinar el UUID generado aquí con la extensión <code>pgcrypto</code> o la función nativa <code>gen_random_uuid()</code>. En JavaScript, desde Node 14.17 podés usar <code>crypto.randomUUID()</code> directamente, y este generador utiliza exactamente esa API Web Crypto cuando está disponible en tu navegador."
        ]
      },
      {
        "heading": "Generar múltiples UUIDs a la vez",
        "paragraphs": [
          "Cuando necesitás poblar una base de datos de prueba, crear IDs para un batch de registros o generar tokens para un envío masivo de invitaciones, la opción de generación múltiple ahorra tiempo. Podés generar hasta 50 UUIDs en un click y copiarlos todos como lista separada por saltos de línea, lista JSON o formato SQL <code>VALUES ('uuid1'), ('uuid2')</code>.",
          "Todos los UUIDs se generan <strong>localmente en tu navegador</strong> usando la API <code>crypto.getRandomValues()</code>. Ningún valor se envía a ningún servidor, lo que es especialmente relevante si vas a usarlos como tokens de seguridad antes de registrarlos."
        ]
      }
    ],
    "steps": [
      {
        "title": "Elegí la cantidad",
        "description": "Seleccioná cuántos UUIDs necesitás: uno, diez o hasta cincuenta. Un solo UUID es suficiente para la mayoría de usos puntuales."
      },
      {
        "title": "Hacé click en Generar",
        "description": "El generador crea los UUIDs al instante usando la API Web Crypto de tu navegador. No hay llamada a servidor."
      },
      {
        "title": "Copiá en el formato que necesitás",
        "description": "Usá el botón de copia rápida para un solo UUID, o seleccioná el formato de salida (lista, JSON, SQL) antes de copiar el lote completo."
      }
    ]
  },
  "proteger-pdf": {
    "intro": "Cuando enviás un contrato, informe financiero o propuesta comercial en PDF, necesitás que quede claro que el documento es confidencial. Esta herramienta agrega una <strong>marca visual de confidencialidad</strong> directamente en el archivo, sin que el PDF salga de tu computadora.",
    "sections": [
      {
        "heading": "Qué hace exactamente esta herramienta",
        "paragraphs": [
          "El procesamiento ocurre <strong>100% en tu navegador</strong> usando la biblioteca <em>pdf-lib</em>. Se añade una superposición de texto en cada página del PDF con la leyenda de confidencialidad que elijas (por ejemplo «CONFIDENCIAL», «BORRADOR» o «USO INTERNO») en un tono semi-transparente diagonal. También se modifica la metadata del archivo: el campo <em>Author</em>, <em>Keywords</em> y <em>Subject</em> se actualizan para incluir la clasificación.",
          "Es importante entender qué <strong>no</strong> hace esta versión: no agrega contraseña de apertura ni contraseña de edición (cifrado AES-256). Un usuario técnico puede quitar la marca con Acrobat o herramientas similares. La marca visible es una señal legal y organizacional, no una barrera criptográfica. Si necesitás encriptación real, estamos desarrollando un microservicio backend para esa función."
        ],
        "citableSummary": "La marca de confidencialidad tiene valor legal como aviso de restricción de uso, incluso sin encriptación, según la mayoría de marcos de propiedad intelectual en América Latina."
      },
      {
        "heading": "Casos de uso típicos en entornos profesionales",
        "paragraphs": [
          "Los equipos de finanzas y legales usan marcas de confidencialidad en <strong>estados de resultados, valuaciones, contratos NDA y propuestas de adquisición</strong> antes de compartirlos por email o plataformas de due diligence. La marca actúa como recordatorio explícito para el receptor y como evidencia en caso de filtración.",
          "En el ámbito educativo y de consultoría, es común marcar exámenes, materiales con copyright o reportes de auditoría como «BORRADOR» mientras están en revisión, para evitar que versiones incompletas circulen como definitivas. Con esta herramienta podés procesar el PDF en segundos sin instalar Acrobat ni pagar suscripciones."
        ]
      },
      {
        "heading": "Privacidad: por qué importa procesar localmente",
        "paragraphs": [
          "Al no subir el archivo a ningún servidor, evitás que el contenido confidencial quede expuesto durante la transferencia o almacenado en logs de un tercero. Esto es especialmente relevante para documentos sujetos a regulaciones como la <strong>Ley Fintech mexicana, la Ley 29733 peruana de protección de datos</strong> o cualquier acuerdo NDA que restrinja compartir el contenido con terceros.",
          "El PDF procesado se descarga directamente desde la memoria de tu navegador. No hay ningún paso intermedio en la nube."
        ]
      }
    ],
    "steps": [
      {
        "title": "Subí tu PDF",
        "description": "Arrastrá el archivo o usá el selector. El PDF se carga en memoria del navegador; no se sube a ningún servidor."
      },
      {
        "title": "Elegí el texto de la marca",
        "description": "Escribí la leyenda que aparecerá en diagonal en cada página: «CONFIDENCIAL», «BORRADOR», «NO DISTRIBUIR» u otro texto personalizado."
      },
      {
        "title": "Descargá el PDF marcado",
        "description": "Hacé click en Proteger y descargá el archivo modificado. El original queda intacto en tu disco."
      }
    ]
  },
  "temporizador": {
    "intro": "Un temporizador online que sigue corriendo aunque cambies de pestaña, con alarma sonora y presets para los casos de uso más comunes: la técnica Pomodoro, descansos cortos y tiempos de cocción exactos.",
    "sections": [
      {
        "heading": "La técnica Pomodoro y por qué 25 minutos",
        "paragraphs": [
          "La técnica Pomodoro, desarrollada por Francesco Cirillo en los años 80, divide el trabajo en bloques de <strong>25 minutos de concentración seguidos de 5 minutos de descanso</strong>. Después de cuatro pomodoros, se toma un descanso largo de 15-30 minutos. La investigación sobre carga cognitiva sostiene que el cerebro mantiene atención sostenida de alta calidad durante bloques de 20-30 minutos, lo que explica por qué este intervalo funciona mejor que sesiones de 1-2 horas sin pausa.",
          "El preset de 25 minutos de este temporizador está calibrado exactamente para Pomodoro. Cuando suena la alarma, es la señal para pausar, anotar en qué punto quedaste y tomar el descanso de 5 minutos antes de volver."
        ],
        "citableSummary": "Estudios sobre productividad en knowledge workers muestran que trabajar en bloques de 25 minutos con descansos activos reduce la fatiga cognitiva acumulada hasta un 40% comparado con sesiones continuas de 2 horas."
      },
      {
        "heading": "Tiempos de cocción: huevos y más",
        "paragraphs": [
          "El preset de cocción de huevos está dividido en tres variantes específicas: <strong>3 minutos</strong> para huevo pasado por agua (clara apenas cuajada, yema líquida), <strong>5 minutos</strong> para huevo mollet (clara firme, yema cremosa) y <strong>10 minutos</strong> para huevo duro. Estos tiempos asumen agua hirviendo a nivel del mar; en ciudades de altura como Bogotá (2.600 msnm) o Ciudad de México (2.240 msnm) necesitás sumar 1-2 minutos por la menor temperatura de ebullición.",
          "Más allá de los huevos, el temporizador es útil para pasta al dente, arroz por absorción, blanqueado de verduras o cualquier preparación que requiera precisión sin tener que contar en tu cabeza."
        ]
      },
      {
        "heading": "Funcionamiento en segundo plano",
        "paragraphs": [
          "A diferencia de muchos temporizadores web que se pausan o desincronizán cuando la pestaña queda inactiva, este usa la API <code>Page Visibility</code> y timestamps absolutos para recalcular el tiempo restante cuando volvés a la pestaña. Si cerraste la pestaña accidentalmente, el timer se interrumpe —para uso en segundo plano prolongado recomendamos una app nativa de escritorio—.",
          "La alarma sonora usa la <strong>Web Audio API</strong> para generar el tono directamente, sin depender de archivos de audio externos que podrían no cargar con conexión lenta."
        ]
      }
    ],
    "steps": [
      {
        "title": "Elegí un preset o configurá manualmente",
        "description": "Seleccioná Pomodoro (25 min), descanso corto (5 min) o uno de los tiempos de cocción; o ingresá horas, minutos y segundos manualmente."
      },
      {
        "title": "Iniciá el temporizador",
        "description": "Hacé click en Iniciar. Podés cambiar de pestaña con seguridad; el temporizador sigue corriendo en segundo plano."
      },
      {
        "title": "Respondé a la alarma",
        "description": "Cuando el tiempo se agota, suena la alarma. Hacé click en Reiniciar para volver al tiempo inicial o ajustá una nueva duración."
      }
    ]
  },
  "generador-robots": {
    "intro": "El archivo <code>robots.txt</code> es la primera línea de control sobre qué rastreadores pueden indexar tu sitio y qué secciones deben ignorar. Un archivo mal configurado puede resultar en que Google indexe páginas de administración o que scrapers de IA entrenen sus modelos con tu contenido sin permiso.",
    "sections": [
      {
        "heading": "Los 5 presets y cuándo usar cada uno",
        "paragraphs": [
          "<strong>Todo permitido</strong> es el punto de partida para sitios nuevos que quieren máxima visibilidad en buscadores. <strong>Todo bloqueado</strong> es útil en entornos de staging o previo al lanzamiento de un sitio, cuando no querés que Google indexe una versión incompleta. El preset de <strong>WordPress</strong> bloquea directorios que nunca deben indexarse: <code>/wp-admin/</code>, <code>/wp-includes/</code>, páginas de login y feeds redundantes como <code>?feed=</code> y <code>?s=</code> (resultados de búsqueda interna).",
          "El preset de <strong>e-commerce</strong> es más complejo: bloquea páginas de filtros de facetas (<code>/categoria/?color=</code>, <code>/shop/?orderby=</code>) que generan miles de URLs duplicadas y canibalizan el presupuesto de crawl. También bloquea carritos, checkouts y páginas de cuenta de usuario. El preset de <strong>bloqueo de IA</strong> incluye los user-agents más relevantes de 2024-2025: <code>GPTBot</code> (OpenAI), <code>Google-Extended</code> (Gemini), <code>CCBot</code> (Common Crawl) y <code>anthropic-ai</code> (Claude)."
        ],
        "citableSummary": "Bloquear GPTBot en robots.txt es la medida técnica más directa para impedir que OpenAI use tu contenido en el entrenamiento de futuros modelos, según la documentación oficial de OpenAI publicada en agosto de 2023."
      },
      {
        "heading": "Errores comunes que destruyen el SEO",
        "paragraphs": [
          "El error más grave es bloquear accidentalmente <code>Disallow: /</code> para Googlebot, lo que hace invisible todo el sitio. Suele ocurrir cuando alguien copia un robots.txt de staging a producción sin revisarlo. Otro error frecuente es usar <code>Disallow: /admin</code> sin la barra final, lo que solo bloquea exactamente <code>/admin</code> pero no <code>/admin/</code> ni <code>/administrator/</code>.",
          "Para WordPress, bloquear <code>/wp-content/uploads/</code> es un error: Google necesita rastrear las imágenes de esa carpeta para indexarlas en Google Imágenes. Solo bloqueá los subdirectorios específicos que no quieras indexar, nunca el directorio de uploads completo."
        ]
      },
      {
        "heading": "La directiva Sitemap dentro de robots.txt",
        "paragraphs": [
          "Aunque Google puede descubrir tu sitemap en <code>Search Console</code>, declararlo en <code>robots.txt</code> con <code>Sitemap: https://tusitio.com/sitemap.xml</code> lo hace accesible a cualquier rastreador, incluyendo Bing, DuckDuckGo y rastreadores especializados. El generador incluye un campo dedicado para agregar hasta tres URLs de sitemap, lo que es útil si tenés sitemaps separados por tipo de contenido (posts, páginas, imágenes, videos).",
          "El campo de sitemap es especialmente importante si usás un CDN o dominio personalizado para tu sitemap, ya que la URL no siempre coincide con el dominio principal del sitio."
        ]
      }
    ]
  },
  "yaml-json-converter": {
    "intro": "YAML y JSON son los dos formatos de configuración dominantes en desarrollo moderno. A veces necesitás pasar de uno a otro: por ejemplo, convertir la configuración de un <code>docker-compose.yml</code> a JSON para un API endpoint, o transformar un <code>package.json</code> en YAML para documentación. Este convertidor maneja ambas direcciones al instante.",
    "sections": [
      {
        "heading": "Diferencias clave entre YAML y JSON",
        "paragraphs": [
          "JSON es un subconjunto estricto —solo llaves, corchetes, comillas dobles y valores primitivos—, lo que lo hace ideal para intercambio de datos en APIs y configuraciones de paquetes npm. YAML sacrifica la verbosidad por legibilidad humana: usa indentación en lugar de llaves, acepta comentarios con <code>#</code> y no requiere comillas en strings simples. Un <code>.github/workflows/deploy.yml</code> con 80 líneas sería significativamente más largo y menos legible en JSON.",
          "La trampa más frecuente al convertir de YAML a JSON es que YAML infiere tipos: <code>version: 3.8</code> se convierte en <code>\"version\": 3.8</code> (número flotante), pero en Docker Compose ese valor debe ser string. El convertidor muestra el resultado para que puedas verificar que los tipos sean los correctos antes de usar el JSON en producción."
        ],
        "citableSummary": "En YAML, el string 'true' sin comillas se convierte a boolean true en la mayoría de parsers, lo que puede romper validaciones si el campo espera string. Siempre revisá los tipos al convertir."
      },
      {
        "heading": "Herramientas que usan cada formato",
        "paragraphs": [
          "<strong>YAML</strong>: GitHub Actions, GitLab CI, Kubernetes manifests, Docker Compose, Ansible playbooks, configuraciones de ESLint y Prettier, Helm charts. <strong>JSON</strong>: <code>package.json</code>, <code>tsconfig.json</code>, APIs REST, respuestas de webhooks, configuración de VS Code (<code>settings.json</code>), esquemas JSON Schema. Algunos proyectos aceptan ambos formatos —como Prettier o Jest— y la elección es de preferencia del equipo.",
          "Un caso concreto: si recibís la configuración de un microservicio en YAML de un colega DevOps y necesitás enviarla como body de un API POST, este convertidor te da el JSON válido en segundos sin tener que buscar una librería o escribir un script de Node."
        ]
      },
      {
        "heading": "Limitaciones del parser client-side",
        "paragraphs": [
          "El parser soporta los tipos más comunes: strings, números enteros y flotantes, booleanos, null, listas y objetos anidados de cualquier profundidad. Las funcionalidades avanzadas de YAML —anclas (<code>&anchor</code>), referencias (<code>*alias</code>), bloques de texto multi-línea (<code>|</code> y <code>></code>) y tags de tipo (<code>!!str</code>)— requieren un parser server-side más robusto como js-yaml completo.",
          "Para YAML con caracteres especiales en strings (dos puntos, guiones al inicio de línea), el convertidor aplica las reglas de escape automáticamente en la salida JSON. Si encontrás un error de parseo, verificá que la indentación sea consistente: YAML no acepta mezcla de tabs y espacios."
        ]
      }
    ]
  },
  "comprimir-pdf": {
    "intro": "Un PDF que pesa 15 MB puede ser un obstáculo para enviarlo por email (límite de 25 MB en Gmail), subirlo a un portal gubernamental con restricción de 5 MB o adjuntarlo en un formulario de postulación laboral. Esta herramienta reduce el peso del archivo procesando su estructura interna, sin reencoder imágenes.",
    "sections": [
      {
        "heading": "Qué se comprime y qué no",
        "paragraphs": [
          "La herramienta aplica tres técnicas sobre el PDF: primero, <strong>reorganización de object streams</strong> —agrupa objetos internos del PDF de forma más eficiente, similar a cómo un archivo ZIP comprime mejor archivos similares juntos—. Segundo, <strong>eliminación de metadata redundante</strong>: la mayoría de PDFs generados por Word, LibreOffice o herramientas de diseño incluyen campos como <em>Author</em>, <em>Producer</em> (que revela qué software lo generó), <em>Keywords</em> y <em>Subject</em> que raramente son necesarios y ocupan espacio. Tercero, <strong>compresión de streams de contenido</strong> usando el algoritmo Deflate nativo de pdf-lib.",
          "Lo que esta herramienta <strong>no hace</strong> es reencoder las imágenes embebidas. Si tu PDF pesa 8 MB porque tiene 20 fotografías a 300 dpi sin comprimir, la reducción será modesta (5-15%). En ese caso, la estrategia correcta es primero comprimir las imágenes con una herramienta dedicada antes de generar el PDF, o usar herramientas especializadas como Ghostscript que sí reencodean imágenes JPEG."
        ],
        "citableSummary": "En PDFs generados por Microsoft Word o LibreOffice sin imágenes pesadas, la eliminación de metadata y la recompresión de streams puede reducir el tamaño entre un 10% y un 40%."
      },
      {
        "heading": "Cuándo la compresión es más efectiva",
        "paragraphs": [
          "Los mejores candidatos para esta herramienta son: <strong>PDFs de texto con tablas y gráficos vectoriales</strong> (contratos, reportes financieros, presentaciones de diapositivas exportadas), PDFs generados por herramientas de diseño como Canva o InDesign que incluyen metadata extensa, y PDFs que fueron guardados múltiples veces y tienen versiones intermedias acumuladas en los objetos del archivo.",
          "Los peores candidatos son PDFs ya comprimidos (el tamaño no bajará significativamente) y PDFs cuyo peso viene casi exclusivamente de imágenes a alta resolución escaneadas. Para estos últimos, Ghostscript con el parámetro <code>-dPDFSETTINGS=/ebook</code> o herramientas como Smallpdf ofrecen compresión de imágenes que esta herramienta no realiza."
        ]
      },
      {
        "heading": "Privacidad y procesamiento local",
        "paragraphs": [
          "Todo el procesamiento ocurre en tu navegador con <em>pdf-lib</em>. El archivo nunca se transmite a ningún servidor, lo que es fundamental si el PDF contiene información sensible: declaraciones de impuestos, estados de cuenta, contratos con cláusulas de confidencialidad o información de pacientes.",
          "Esta arquitectura también significa que la herramienta funciona sin conexión a internet una vez que la página está cargada, y que el rendimiento depende de la potencia de tu computadora. PDFs de más de 50 MB pueden tardar varios segundos en procesarse."
        ]
      }
    ],
    "steps": [
      {
        "title": "Cargá tu PDF",
        "description": "Arrastrá el archivo o usá el selector de archivo. El PDF se carga en memoria del navegador."
      },
      {
        "title": "Iniciá la compresión",
        "description": "Hacé click en Comprimir. Verás el peso original y el peso resultante para que puedas evaluar si la reducción es suficiente para tu caso."
      },
      {
        "title": "Descargá el PDF comprimido",
        "description": "Si el resultado te conviene, descargá el archivo. Si la compresión no fue suficiente para tus imágenes, considerá comprimir las imágenes por separado antes de volver a intentarlo."
      }
    ]
  },
  "seo-quick-audit": {
    "intro": "Un audit SEO completo en segundos: esta herramienta analiza cualquier URL pública, evalúa 16 criterios técnicos y de contenido, y entrega un score de 0 a 100 con el detalle exacto de qué está bien, qué falta y qué es crítico.",
    "sections": [
      {
        "heading": "Los 6 checks críticos y por qué importan",
        "paragraphs": [
          "<strong>HTTPS</strong>: Google usa HTTPS como señal de ranking desde 2014. Un sitio en HTTP además de penalizado muestra advertencias en Chrome que espantan usuarios. <strong>Title</strong>: debe existir, tener entre 50-60 caracteres (se trunca en los resultados), ser único por página y contener la keyword principal. <strong>Meta description</strong>: no es factor de ranking directo, pero el CTR orgánico sí afecta el posicionamiento; una descripción bien escrita puede aumentar el CTR en 15-30%. <strong>H1</strong>: debe haber exactamente uno por página, diferente del title, con la keyword secundaria. <strong>Viewport</strong>: sin el meta viewport, Google considera el sitio no mobile-friendly y lo penaliza en mobile. <strong>Canonical</strong>: evita contenido duplicado señalando la URL preferida.",
          "Un fallo en cualquiera de estos seis checks es considerado crítico: impacta directamente en la indexación o el posicionamiento. El score penaliza con más peso estos checks que los recomendados."
        ],
        "citableSummary": "Según datos de Ahrefs (2023), el 75% de las páginas en internet no tienen meta description; las que sí la tienen bien escrita muestran CTR hasta 5.8% mayor en resultados de búsqueda."
      },
      {
        "heading": "Los 10 checks recomendados explicados",
        "paragraphs": [
          "<strong>Lang</strong>: el atributo <code>lang</code> en el tag <code>html</code> ayuda a los lectores de pantalla y a Google a entender el idioma del contenido. <strong>OG y Twitter cards</strong>: controlan cómo se ve tu página cuando se comparte en redes sociales —sin ellos, LinkedIn o Twitter eligen imagen y texto arbitrariamente—. <strong>Schema.org</strong>: el markup estructurado habilita rich results como estrellas de reseñas, preguntas frecuentes o precio de productos en los resultados de Google.",
          "<strong>Alt en imágenes</strong>: texto alternativo que los motores usan para entender imágenes y que es requerido por accesibilidad (WCAG 2.1). <strong>H2</strong>: indica estructura del contenido para rastreadores. <strong>Links internos</strong>: distribuyen link equity y ayudan al descubrimiento de páginas. <strong>HSTS</strong>: encabezado de seguridad que fuerza HTTPS. <strong>CSP</strong>: Content Security Policy, señal de seguridad adicional valorada en auditorías técnicas."
        ]
      },
      {
        "heading": "Cómo interpretar el score y los resultados",
        "paragraphs": [
          "Un score de 0-40 indica problemas críticos que probablemente estén limitando la indexación. Entre 41-70 el sitio es funcional pero tiene oportunidades claras de mejora. De 71-90 hay solo ajustes menores. 91-100 es un sitio técnicamente bien configurado (aunque el score técnico no garantiza ranking —el contenido y los backlinks siguen siendo los factores más importantes—).",
          "El audit también muestra el <strong>tiempo de respuesta del servidor</strong> y el peso del HTML. Un tiempo de respuesta superior a 2 segundos es señal de un servidor lento que puede afectar Core Web Vitals. Un HTML superior a 500 KB puede indicar scripts o contenido innecesario que ralentiza la carga inicial."
        ]
      }
    ],
    "steps": [
      {
        "title": "Ingresá la URL",
        "description": "Escribí o pegá la URL completa incluyendo https://. La herramienta analizará esa página específica, no el dominio completo."
      },
      {
        "title": "Esperá el análisis",
        "description": "La herramienta se conecta al sitio, descarga el HTML y analiza los 16 checks en segundos. El tiempo varía según la velocidad del servidor analizado."
      },
      {
        "title": "Revisá el detalle de cada check",
        "description": "Expandí cada check para ver el valor exacto encontrado (por ejemplo, el texto de tu title) y la recomendación específica para corregirlo si falla."
      }
    ]
  },
  "password-strength": {
    "intro": "¿Tu contraseña resiste un ataque de fuerza bruta con hardware moderno? Esta herramienta analiza la entropía real de tu contraseña, estima cuánto tardaría en crackearse y detecta patrones débiles, todo sin enviar la contraseña a ningún servidor.",
    "sections": [
      {
        "heading": "Entropía en bits: el número que realmente importa",
        "paragraphs": [
          "La entropía de una contraseña mide cuántos intentos necesitaría un atacante en el peor caso. Se calcula como <code>log₂(tamaño_del_espacio ^ longitud)</code>. Una contraseña de 8 caracteres usando solo minúsculas (26 opciones) tiene <strong>37.6 bits</strong> de entropía —descifrable en horas con una GPU moderna—. La misma longitud con mayúsculas, minúsculas, números y símbolos (94 opciones) sube a <strong>52.4 bits</strong>. Una contraseña de 16 caracteres alfanuméricos alcanza <strong>95 bits</strong>, que a 10⁹ intentos por segundo tomaría más de 1 millón de años.",
          "La herramienta calcula esta entropía en tiempo real mientras escribís y la compara con los umbrales de seguridad actuales: menos de 40 bits se considera muy débil, 40-59 débil, 60-79 media, 80-99 fuerte, 100+ muy fuerte. Estos umbrales están calibrados para hardware de 2024-2025."
        ],
        "citableSummary": "El tiempo de crackeo se calcula asumiendo 10⁹ intentos por segundo, equivalente a una GPU de gama alta moderna (RTX 4090 en hashcat). Ataques distribuidos o hardware especializado pueden ser 10-100x más rápidos."
      },
      {
        "heading": "Los 10 checks y los errores más comunes",
        "paragraphs": [
          "Los checks que más frecuentemente fallan son: <strong>contraseñas comunes</strong> (password, 123456, qwerty, contraseña —millones de personas las siguen usando—), <strong>secuencias de teclado</strong> (asdfgh, qwerty, zxcvbn —reconocibles al instante por diccionarios de ataque—) y <strong>repeticiones de caracteres</strong> (aaa111, Password11). Incluso contraseñas largas con estas características son vulnerables porque los ataques modernos incluyen diccionarios de patrones.",
          "<strong>Longitud mínima recomendada</strong>: 12 caracteres para cuentas personales, 16 para cuentas con acceso a datos sensibles o sistemas críticos. NIST SP 800-63B (actualizado en 2024) recomienda priorizar la longitud sobre la complejidad, y recomienda usar frases en lugar de contraseñas con sustituciones obvias como <code>P@ssw0rd</code>."
        ]
      },
      {
        "heading": "Privacidad: análisis 100% en tu navegador",
        "paragraphs": [
          "La contraseña nunca abandona tu dispositivo. Todo el análisis —incluyendo la verificación contra listas de contraseñas comprometidas— ocurre localmente usando la API de JavaScript. La lista de contraseñas comunes está embebida en el código del cliente, sin llamadas a servicios externos como Have I Been Pwned.",
          "Esto la hace ideal para evaluar contraseñas reales de sistemas en uso, ya que el riesgo de exposición durante el análisis es cero. Recomendamos de todas formas no usar esta herramienta en computadoras compartidas o con malware, ya que el keylogger podría capturar lo que escribís independientemente de esta herramienta."
        ]
      }
    ]
  },
  "numeros-romanos": {
    "intro": "Los números romanos aparecen en más contextos cotidianos de lo que parece: relojes análogos, títulos de películas y eventos (Super Bowl LVIII), numeración de siglos (siglo XXI), capítulos de libros, nombres de monarcas y papas (Juan Pablo II), y en arquitectura e inscripciones. Este convertidor bidireccional maneja el rango completo del sistema clásico.",
    "sections": [
      {
        "heading": "Las reglas del sistema romano que la gente olvida",
        "paragraphs": [
          "El sistema romano tiene tres reglas principales que generan confusión. La primera es la <strong>regla de sustracción</strong>: IV (4) no es IIII, IX (9) no es VIIII, XL (40), XC (90), CD (400) y CM (900) son las únicas combinaciones sustractivas válidas. Escribir IC para 99 es incorrecto; el correcto es XCIX.",
          "La segunda es la <strong>regla de repetición máxima</strong>: I, X, C y M pueden repetirse máximo 3 veces consecutivas. Por eso 40 es XL y no XXXX. La tercera es que V, L y D <strong>nunca se repiten</strong>: no existe VV (siempre es X) ni LL (siempre es C). El validador de esta herramienta verifica estas tres reglas al convertir de romano a arábigo y rechaza notaciones incorrectas."
        ],
        "citableSummary": "El rango de 1 a 3999 cubre el sistema romano clásico. El número 4000 requeriría MMMM (cuatro M consecutivas), lo que viola la regla de máximo 3 repeticiones. Para números mayores se usaban barras sobre las letras (vinculum), no soportadas en este convertidor."
      },
      {
        "heading": "Usos prácticos y casos de estudio",
        "paragraphs": [
          "En diseño y tipografía, los números romanos se usan en páginas preliminares de libros (índice, prólogo, dedicatoria) que se numeran por separado del cuerpo principal. La distinción entre números arábigos y romanos permite mantener dos sistemas de numeración en el mismo documento sin ambigüedad.",
          "Para estudiantes de historia, los siglos en español siempre se escriben en romano: el siglo XX abarca de 1901 a 2000, y el XXI de 2001 a 2100. Las olimpiadas se numeran en romano (Juegos Olímpicos de París fueron los <strong>XXXIII Juegos</strong>), al igual que los Super Bowls y muchos campeonatos mundiales."
        ]
      },
      {
        "heading": "Tabla de referencia rápida",
        "paragraphs": [
          "Los valores de los símbolos básicos: I=1, V=5, X=10, L=50, C=100, D=500, M=1000. Las combinaciones sustractivas: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900. Para descomponer un número grande, el algoritmo va de mayor a menor: 2024 = MM (2000) + XXIV (24) = MMXXIV.",
          "La herramienta muestra la descomposición paso a paso para que puedas entender la lógica del número convertido, no solo ver el resultado."
        ],
        "bullets": [
          "I = 1, V = 5, X = 10",
          "L = 50, C = 100, D = 500, M = 1000",
          "Sustractivos: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900",
          "Rango válido: 1 (I) a 3999 (MMMCMXCIX)"
        ]
      }
    ]
  },
  "buscar-rimas": {
    "intro": "Encontrar la palabra correcta que rime puede llevar horas de búsqueda manual cuando escribís letras de canciones, poemas o raps. Este buscador de rimas para español filtra por tipo de rima —consonante o asonante— y entrega opciones relevantes al instante.",
    "sections": [
      {
        "heading": "Rima consonante vs asonante: la diferencia práctica",
        "paragraphs": [
          "En la <strong>rima consonante</strong> (o perfecta), coinciden todos los sonidos desde la vocal acentuada hasta el final: <em>corazón / canción / ilusión</em>. Es la rima estándar en poesía clásica española, villancicos y la mayoría de reggaetón y pop en español. En la <strong>rima asonante</strong>, solo coinciden las vocales a partir de la tónica: <em>tarde / calle / padre</em> riman en asonante porque comparten la secuencia <em>a-e</em>.",
          "El rap y el hip-hop en español mezclan ambos tipos: las rimas principales suelen ser consonantes (<em>flow / conoce / pronto / tono</em>), pero las rimas internas dentro del verso frecuentemente son asonantes para mantener el ritmo sin forzar palabras. Entender esta distinción te permite escribir letras más ricas y flexibles."
        ],
        "citableSummary": "El español tiene una ventaja sobre el inglés para la rima: sus terminaciones son más regulares (-ión, -ado, -ente, -ancia) y hay más palabras que comparten sonidos finales, lo que explica por qué el reggaetón y la poesía en español suena más rimado que sus equivalentes en inglés."
      },
      {
        "heading": "Para qué usos está optimizado el buscador",
        "paragraphs": [
          "El diccionario incluye <strong>más de 200 palabras comunes</strong> del español neutro con marcación por sílaba tónica, lo que permite calcular correctamente si la rima cae en sílaba aguda, grave o esdrújula. Esto es relevante porque <em>amor</em> y <em>calor</em> riman (ambas agudas terminadas en -or), pero <em>amor</em> y <em>cómoda</em> no riman en ningún sentido práctico aunque compartan algunas vocales.",
          "Es especialmente útil para <strong>jingles publicitarios</strong> (donde la rima refuerza la memorabilidad de la marca), <strong>discursos con rima</strong> para brindis o celebraciones, y raps donde necesitás encontrar múltiples palabras que rimen con el término central de tu estrofa."
        ]
      },
      {
        "heading": "Limitaciones del diccionario y cómo expandirlo",
        "paragraphs": [
          "El diccionario actual de 200+ palabras cubre el vocabulario más común pero inevitablemente no incluye términos técnicos, jerga regional, neologismos ni nombres propios. Para expandir el rango de búsqueda, la estrategia más efectiva es buscar primero la terminación fonética que necesitás (por ejemplo, palabras terminadas en <em>-ando</em> o <em>-ente</em>) y combinar los resultados del buscador con un diccionario de rimas completo como el de la RAE.",
          "Los géneros literarios como el <strong>soneto clásico</strong> requieren esquemas de rima específicos (ABBA ABBA CDC DCD) que este buscador no gestiona automáticamente, pero te ayuda a encontrar las palabras para cada posición del esquema."
        ]
      }
    ]
  },
  "voz-a-texto": {
    "intro": "Dictá en lugar de escribir: esta herramienta convierte tu voz a texto en tiempo real usando la Web Speech API, con soporte para 12 variantes de idioma incluyendo español de México, Argentina, Colombia, España, Chile y Perú. Sin instalar nada, directamente en tu navegador.",
    "sections": [
      {
        "heading": "Cómo funciona el reconocimiento continuo en tiempo real",
        "paragraphs": [
          "A diferencia de los dictados por segmento donde hay que esperar a que se procese cada frase, este reconocimiento es <strong>continuo</strong>: podés hablar fluido y ver el texto aparecer mientras hablás. Se muestran resultados intermedios (en cursiva o diferenciados visualmente) que se confirman conforme el motor de reconocimiento estabiliza su transcripción. Esto imita la experiencia de Google Docs Voice Typing o el dictado de iOS.",
          "La Web Speech API delega el reconocimiento al motor del navegador. En Chrome y Edge usa los servidores de reconocimiento de voz de Google o Microsoft respectivamente, lo que significa que <strong>el audio sí viaja a sus servidores</strong>. Safari también soporta la API pero puede tener latencia mayor. Firefox aún no soporta Speech Recognition de forma nativa."
        ],
        "citableSummary": "El reconocimiento de voz en español de México (es-MX) es distinto al de España (es-ES) en el modelo acústico: las variantes regionales afectan el reconocimiento de palabras con seseo, el voseo y términos locales como 'chido', 'chilango' o 'cuate'."
      },
      {
        "heading": "Casos de uso donde el dictado supera al teclado",
        "paragraphs": [
          "<strong>Tomar notas en reuniones</strong>: cuando estás en una llamada o reunión presencial y necesitás registrar lo que se dice sin que el teclado haga ruido. <strong>Transcribir entrevistas</strong>: reproducí el audio de la entrevista y dictá en paralelo, o usá la herramienta directamente si la entrevista es presencial. <strong>Redactar emails largos</strong>: hablar es 3-4 veces más rápido que escribir a teclado para la mayoría de personas —un email de 300 palabras lleva 2 minutos hablando vs 5-6 escribiendo.",
          "<strong>Accesibilidad</strong>: para personas con condiciones que dificultan el tipeo (artritis, lesiones de mano, dislexia) el dictado por voz es una herramienta de productividad fundamental. El soporte de múltiples variantes del español es especialmente valioso porque un hablante de Colombia o Argentina puede tener problemas con modelos entrenados exclusivamente en español peninsular."
        ]
      },
      {
        "heading": "Consejos para mejorar la precisión",
        "paragraphs": [
          "El reconocimiento mejora significativamente con: <strong>micrófono de calidad</strong> (los auriculares con micrófono integrado superan al micrófono del laptop), <strong>entorno silencioso</strong> (el ruido de fondo es la principal causa de errores), <strong>hablar claro y a velocidad normal</strong> (no exageradamente lento ni rápido), y <strong>pronunciar los signos de puntuación en voz alta</strong> si necesitás control exacto («coma», «punto», «punto y coma»).",
          "Para nombres propios, términos técnicos o palabras en otros idiomas que el motor no reconozca correctamente, podés pausar, escribir manualmente esas palabras en el texto resultante y reanudar el dictado. El texto transcrito es editable en todo momento."
        ]
      }
    ],
    "steps": [
      {
        "title": "Seleccioná el idioma",
        "description": "Elegí la variante de español que usás (México, Argentina, Colombia, etc.) para mejor precisión. Si vas a dictar en otro idioma, seleccionalo antes de empezar."
      },
      {
        "title": "Permitís el acceso al micrófono",
        "description": "El navegador pedirá permiso para usar el micrófono. Este permiso es solo para esta sesión; podés revocarlo desde la configuración del navegador."
      },
      {
        "title": "Dictá y editá",
        "description": "Hacé click en Iniciar y comenzá a hablar. El texto aparece en tiempo real. Al terminar, copiá el texto o continuá editando en el campo de texto."
      }
    ]
  },
  "ocr-imagen-texto": {
    "intro": "OCR (Optical Character Recognition) es la tecnología que extrae texto legible de imágenes. Esta herramienta usa Tesseract.js —el mismo motor OCR de Google pero corriendo en tu navegador— para convertir fotos, capturas y documentos escaneados a texto editable, sin subir ninguna imagen a ningún servidor.",
    "sections": [
      {
        "heading": "Cómo funciona Tesseract.js en el navegador",
        "paragraphs": [
          "Tesseract es el motor OCR de código abierto más usado del mundo, originalmente desarrollado por HP y mantenido actualmente por Google. <strong>Tesseract.js</strong> es su versión compilada a WebAssembly que corre directamente en el navegador. La primera vez que usás la herramienta, descarga el modelo de reconocimiento del idioma seleccionado (~3 MB para español). Este modelo queda en caché en tu navegador, así que las ejecuciones siguientes son inmediatas.",
          "El proceso de OCR tiene tres etapas: segmentación de la imagen (identificar bloques de texto, líneas y caracteres), clasificación de cada carácter contra el modelo entrenado, y post-procesamiento con diccionario del idioma para corregir errores de clasificación. Por eso el reconocimiento mejora notablemente con imágenes bien iluminadas, texto negro sobre fondo blanco y tipografías regulares."
        ],
        "citableSummary": "Tesseract alcanza una precisión superior al 95% en documentos impresos de buena calidad. En escritura manuscrita la precisión cae al 60-80% dependiendo de la legibilidad. Para documentos torcidos, la función de enderezamiento automático (deskewing) puede mejorar los resultados en 10-20%."
      },
      {
        "heading": "Qué tipos de imágenes dan mejores resultados",
        "paragraphs": [
          "Los mejores candidatos son: <strong>capturas de pantalla de documentos PDF</strong> (texto nítido, fondo uniforme), <strong>fotos de pizarrón o pantalla proyectada</strong> tomadas perpendicularmente con buena iluminación, <strong>documentos físicos escaneados a 300 dpi</strong> (la resolución mínima recomendada para OCR), y <strong>libros o revistas impresas</strong> fotografiados con luz natural uniforme.",
          "Los casos más difíciles son: fondos con patrones o texturas, texto superpuesto sobre imágenes, tipografías decorativas o muy condensadas, texto muy pequeño (menor a 12px en la imagen), y escritura manuscrita no caligráfica. Para estos casos, el resultado puede requerir revisión manual significativa."
        ]
      },
      {
        "heading": "Usos prácticos en el día a día",
        "paragraphs": [
          "En el trabajo: extraer datos de <strong>facturas o recibos escaneados</strong> para ingresarlos en una planilla, copiar texto de una presentación de PowerPoint cuando no tenés el archivo original, o digitalizar notas tomadas a mano en reuniones. En el ámbito académico: transcribir citas de libros físicos, extraer texto de capturas de papers académicos en formato imagen.",
          "Para accesibilidad: convertir imágenes de texto que no son legibles por lectores de pantalla a texto accesible. Para archivos históricos: digitalizar documentos antiguos o periódicos escaneados para hacer búsquedas de texto en colecciones digitales. El soporte de seis idiomas cubre la mayoría de los casos de América Latina y España."
        ]
      }
    ],
    "steps": [
      {
        "title": "Subí la imagen",
        "description": "Arrastrá o seleccioná una imagen JPG, PNG o WebP. La imagen nunca abandona tu navegador."
      },
      {
        "title": "Seleccioná el idioma del texto",
        "description": "Elegí el idioma predominante en la imagen. Para documentos con texto en varios idiomas, el idioma principal es el que mejor resultado da."
      },
      {
        "title": "Ejecutá el OCR y copiá el resultado",
        "description": "Hacé click en Extraer texto. El proceso toma entre 2 y 15 segundos según el tamaño de la imagen. Copiá el texto resultante o descargalo como .txt."
      }
    ]
  },
  "calculadora-edad-mascota": {
    "intro": "¿Tu perro tiene 3 años y querés saber a qué etapa de vida humana equivale? La fórmula popular de «multiplicar por 7» lleva décadas siendo incorrecta. Este conversor usa la fórmula científica de la AAHA que distingue entre razas y tamaños para un resultado mucho más preciso.",
    "sections": [
      {
        "heading": "Por qué la regla de los 7 años es incorrecta",
        "paragraphs": [
          "La regla de «1 año de perro = 7 años humanos» surgió de dividir la expectativa de vida humana promedio (~70 años) entre la de los perros (~10 años). El problema es que los perros no envejecen a tasa constante: <strong>el primer año de vida de un perro equivale a aproximadamente 15 años humanos</strong>, porque en ese tiempo pasan de cachorro recién nacido a adulto sexualmente maduro. El segundo año suma otros 9, llegando a los 24 años humanos equivalentes.",
          "La <strong>American Animal Hospital Association (AAHA)</strong> publicó en 2019 una guía actualizada basada en estudios de marcadores epigenéticos de envejecimiento que muestra cómo la tasa de envejecimiento varía no solo por la edad sino por el tamaño de la raza. Un Chihuahua de 10 años y un Gran Danés de 10 años no tienen el mismo perfil de salud —el primero equivale a unos 56 años humanos, el segundo a casi 66."
        ],
        "citableSummary": "Según la guía AAHA 2019-2021, los perros de razas gigantes (más de 45 kg) envejecen significativamente más rápido que los de razas pequeñas a partir de los 5 años, lo que explica su menor expectativa de vida a pesar de ser perros «más grandes»."
      },
      {
        "heading": "Diferencias entre razas pequeñas, medianas, grandes y gigantes",
        "paragraphs": [
          "Esta calculadora distingue cuatro categorías de tamaño con sus respectivas curvas de envejecimiento: <strong>pequeños</strong> (menos de 9 kg: Chihuahua, Maltés, Pomerania), <strong>medianos</strong> (9-22 kg: Beagle, Cocker Spaniel, Border Collie), <strong>grandes</strong> (22-45 kg: Labrador, Golden Retriever, Husky) y <strong>gigantes</strong> (más de 45 kg: Gran Danés, Mastín, San Bernardo). A partir de los 5-6 años, las diferencias entre estas categorías se vuelven más pronunciadas.",
          "Los <strong>gatos</strong> tienen una curva diferente a los perros: envejecen rápido los primeros dos años (el primer año equivale a 15 humanos, el segundo a +9) y luego estabilizan en aproximadamente 4 años humanos por año vivido. Los gatos de interior tienden a vivir más que los de exterior, pero la calculadora usa los promedios de la guía AAHA para felinos independientemente de ese factor."
        ]
      },
      {
        "heading": "Cómo interpretar el resultado para el cuidado veterinario",
        "paragraphs": [
          "Conocer la equivalencia en años humanos ayuda a entender qué tipo de cuidados son apropiados según la etapa de vida. Un perro de 7 años equivalente a un humano de 44-50 años está entrando en la mediana edad: es momento de <strong>chequeos anuales más detallados</strong>, analítica de sangre para detectar problemas renales, hepáticos o tiroideos, y posiblemente ajustar la dieta a una formulación para adulto senior.",
          "A partir de los equivalentes a 60 años humanos, los veterinarios recomiendan chequeos bianuales. Esta perspectiva también es emocionalmente relevante: si tu perro tiene 11 años y equivale a 72 humanos, entendés por qué moverse le cuesta más o por qué duerme más horas —y podés adaptar el ejercicio y los cuidados en consecuencia."
        ]
      }
    ],
    "steps": [
      {
        "title": "Seleccioná la especie",
        "description": "Elegí perro o gato. Los gatos tienen una curva de envejecimiento diferente a la de los perros."
      },
      {
        "title": "Ingresá la edad y el tamaño (perros)",
        "description": "Para perros, seleccioná también la categoría de tamaño: pequeño, mediano, grande o gigante. Para gatos, solo la edad es necesaria."
      },
      {
        "title": "Leé el resultado y la interpretación",
        "description": "Verás la edad equivalente en años humanos y a qué etapa de vida corresponde (cachorro/adolescente, adulto joven, madurez, senior)."
      }
    ]
  },
  "url-encode": {
    "intro": "Cuando pegás una URL con espacios, acentos o símbolos como <code>&amp;</code>, <code>?</code> o <code>#</code> en un navegador o en tu código, el resultado es impredecible: el servidor puede rechazar la petición, el parámetro se trunca o el link simplemente no abre. El codificador/decodificador de URLs convierte cada carácter problemático a su equivalente <strong>percent-encoding</strong> (por ejemplo, el espacio se vuelve <code>%20</code> y la ñ se vuelve <code>%C3%B1</code>) de acuerdo al estándar RFC 3986.",
    "sections": [
      {
        "heading": "¿Cuándo hace falta codificar una URL?",
        "paragraphs": [
          "El caso más común ocurre con los parámetros <code>GET</code>: si tenés una URL como <code>https://ejemplo.com/buscar?q=café con leche</code>, el espacio y los acentos deben convertirse antes de enviarla. El resultado correcto sería <code>q=caf%C3%A9%20con%20leche</code>. Sin codificación, distintos servidores interpretan el espacio de maneras diferentes — algunos lo aceptan como <code>+</code>, otros devuelven error 400.",
          "También es crítico cuando construís links de compartir en redes sociales, parámetros UTM con caracteres especiales, o cuando armás solicitudes a APIs REST que esperan valores en query string. Los frameworks modernos como React o Vue encodean automáticamente, pero si construís URLs a mano en JavaScript con concatenación de strings, el problema puede pasar desapercibido hasta producción."
        ],
        "citableSummary": "El percent-encoding reemplaza cada carácter no permitido por <code>%XX</code> donde XX es el valor hexadecimal del byte UTF-8 correspondiente, según RFC 3986."
      },
      {
        "heading": "Diferencias entre encodeURI y encodeURIComponent",
        "paragraphs": [
          "En JavaScript existen dos funciones nativas que hacen cosas distintas: <code>encodeURI()</code> preserva los caracteres estructurales de la URL completa (como <code>/</code>, <code>:</code>, <code>?</code> y <code>&amp;</code>), mientras que <code>encodeURIComponent()</code> codifica <em>todo</em> lo que no sea alfanumérico, incluyendo esos caracteres. La segunda es la correcta cuando codificás el <strong>valor</strong> de un parámetro individual, no la URL entera.",
          "Este codificador aplica la lógica equivalente a <code>encodeURIComponent</code> para el modo encode completo, lo que lo hace seguro para valores de parámetros que contienen caracteres como <code>=</code>, <code>&amp;</code> o <code>+</code>. Si estás enviando, por ejemplo, un email como parámetro, el <code>@</code> debe convertirse en <code>%40</code>; si no lo hacés, el servidor puede confundirlo con la sintaxis de autenticación."
        ]
      },
      {
        "heading": "Decodificar: recuperar el texto original",
        "paragraphs": [
          "La operación inversa es igual de útil: cuando encontrás una URL larga llena de <code>%</code> en logs de servidor, en parámetros de analytics o en redirects, decodificarla te muestra el texto humano legible en un clic. Por ejemplo, <code>%2Ftienda%2Fproductos%3Fcategoria%3Dropa</code> decodifica a <code>/tienda/productos?categoria=ropa</code>.",
          "En debugging de integraciones con APIs de terceros — como Mercado Libre, Shopify o cualquier OAuth 2.0 — es frecuente que el <code>redirect_uri</code> llegue codificado. Pegarlo aquí te ahorra tener que correrlo manualmente en la consola del navegador."
        ]
      }
    ],
    "steps": [
      {
        "title": "Pegá tu texto o URL",
        "description": "Ingresá el texto con caracteres especiales (acentos, espacios, símbolos) en el campo de entrada."
      },
      {
        "title": "Elegí la operación",
        "description": "Seleccioná Codificar para obtener la versión percent-encoded, o Decodificar para recuperar el texto original desde una URL codificada."
      },
      {
        "title": "Copiá el resultado",
        "description": "El resultado aparece instantáneamente. Usá el botón Copiar para llevarlo a tu código, buscador o documento."
      }
    ]
  },
  "informacion-pdf": {
    "intro": "Antes de imprimir un documento, enviarlo por correo o publicarlo en tu sitio web, conviene saber exactamente qué tiene adentro: cuántas páginas, qué tan pesado es, quién lo creó y qué programa lo generó. La herramienta de información de PDF extrae esos metadatos directamente en el navegador — sin subir el archivo a ningún servidor — leyendo el encabezado y el diccionario de objetos del formato PDF.",
    "sections": [
      {
        "heading": "Qué información podés obtener de un PDF",
        "paragraphs": [
          "El formato PDF almacena un <strong>diccionario de información</strong> (<code>Info</code>) con campos opcionales: autor (<code>Author</code>), título (<code>Title</code>), asunto (<code>Subject</code>), palabras clave (<code>Keywords</code>), aplicación que lo creó (<code>Creator</code>), aplicación que lo convirtió (<code>Producer</code>), y las fechas de creación y modificación en formato <code>D:AAAAMMDDHHMMSS</code>. Estos campos los define quien generó el documento — no todos los PDFs los completan.",
          "Además de los metadatos del diccionario, esta herramienta reporta el <strong>número total de páginas</strong> y el <strong>tamaño del archivo</strong>. Esa combinación es especialmente útil para cotizaciones de imprenta: saber que un catálogo tiene 48 páginas en 12 MB es suficiente para estimar tiempos de impresión y costos antes de siquiera abrirlo."
        ],
        "citableSummary": "Los metadatos de un PDF se almacenan en el objeto <code>Info</code> del diccionario de objetos, y pueden incluir autor, fechas, aplicación creadora y palabras clave, aunque no todos los documentos los completan."
      },
      {
        "heading": "Casos de uso cotidianos",
        "paragraphs": [
          "Un escenario frecuente: recibes un PDF de un proveedor y necesitás verificar que el documento tiene las 20 páginas acordadas, no está corrupto y fue generado con Adobe Acrobat (no una conversión desde imagen que pueda perder calidad de texto). Con esta herramienta lo comprobás en segundos sin instalar nada.",
          "Otro uso es la <strong>verificación de autoría y fecha</strong>: en entornos legales o académicos, el campo <code>CreationDate</code> puede ser parte de la evidencia de que un documento existía antes de cierta fecha. También es útil para redactores freelance que entregan trabajo: verificar que el campo <code>Author</code> esté correcto antes de enviar el archivo final al cliente evita esa situación incómoda de mandar un PDF que todavía dice «Propietario: Usuario de Windows»."
        ]
      },
      {
        "heading": "Privacidad: el archivo no sale de tu dispositivo",
        "paragraphs": [
          "Toda la extracción ocurre con la <strong>File API del navegador</strong> y código JavaScript local. El PDF nunca se transmite a ningún servidor. Esto es relevante si trabajás con documentos confidenciales — contratos, estados financieros, expedientes médicos — donde subir el archivo a un servicio externo puede ser un problema de cumplimiento.",
          "Si el PDF tiene permisos restrictivos (encriptación de 128 o 256 bits), es posible que algunos campos del diccionario <code>Info</code> no sean accesibles sin la contraseña. En ese caso verás los campos disponibles y una indicación de que el documento está protegido."
        ]
      }
    ],
    "steps": [
      {
        "title": "Cargá el PDF",
        "description": "Hacé clic en el área de carga o arrastrá el archivo PDF desde tu explorador de archivos."
      },
      {
        "title": "Revisá los metadatos",
        "description": "La herramienta muestra páginas, tamaño, autor, fechas de creación/modificación, aplicación creadora y más."
      },
      {
        "title": "Usá la información",
        "description": "Copiá los datos que necesitás — sin necesidad de abrir el PDF en ningún visor externo."
      }
    ]
  },
  "numero-aleatorio": {
    "intro": "Elegir un número al azar parece simple, pero hacerlo con verdadera imparcialidad — sin que nadie pueda acusar de trampa — tiene su ciencia. Este generador usa <code>crypto.getRandomValues()</code>, la API criptográfica del navegador que alimenta el mismo mecanismo que se usa en tokens de seguridad, garantizando que cada resultado es estadísticamente independiente del anterior. Definís el rango, la cantidad y si los números pueden repetirse: ideal para sorteos, rifas, asignación de turnos o cualquier situación donde necesitás imparcialidad verificable.",
    "sections": [
      {
        "heading": "Cómo funciona la aleatoriedad del navegador",
        "paragraphs": [
          "Los generadores de números aleatorios de software se dividen en dos grandes categorías: los <strong>pseudoaleatorios (PRNG)</strong>, que usan fórmulas matemáticas y pueden reproducirse si conocés la semilla, y los <strong>criptográficamente seguros (CSPRNG)</strong>, que usan fuentes de entropía del hardware (interrupciones del teclado, tiempos de disco, ruido térmico). <code>crypto.getRandomValues()</code> es de este segundo tipo.",
          "Para un sorteo de Instagram con 500 participantes numerados del 1 al 500, esto significa que no hay forma de que alguien prediga o manipule el resultado. A diferencia de <code>Math.random()</code> de JavaScript — que es PRNG y podría teóricamente reproducirse si se conociera la semilla — <code>crypto.getRandomValues()</code> cumple con los estándares NIST SP 800-90."
        ],
        "citableSummary": "La Web Cryptography API (<code>crypto.getRandomValues</code>) provee aleatoriedad criptográficamente segura basada en entropía del sistema operativo, a diferencia de <code>Math.random()</code> que es pseudoaleatorio."
      },
      {
        "heading": "Sorteos sin repetición: la lógica detrás",
        "paragraphs": [
          "Cuando activás el modo «sin repetición», el generador aplica un algoritmo de <strong>muestreo sin reemplazo</strong> (Fisher-Yates shuffle sobre el rango pedido). Esto garantiza que si pedís 10 números entre 1 y 100, obtenés exactamente 10 valores distintos, cada uno con la misma probabilidad de aparecer. Es el método correcto para rifas físicas donde cada número solo puede ser asignado a una persona.",
          "El límite práctico es que no podés pedir más números únicos que los que hay en el rango: si el rango es 1–50 y pedís 51 números sin repetición, la herramienta lo advierte. Este chequeo evita el clásico error de configurar un sorteo imposible."
        ]
      },
      {
        "heading": "Usos más allá del sorteo típico",
        "paragraphs": [
          "En educación, un docente puede generar 30 números del 1 al 100 para armar un examen con problemas aleatorios de un banco de ejercicios. En simulaciones de Monte Carlo simplificadas, 1000 números entre 0 y 999 sirven de muestra inicial. Para juegos de mesa o RPG de tablero, reemplaza cualquier dado con un generador de 1 a N.",
          "También es útil para asignar contraseñas numéricas temporales, definir el orden de presentación en una clase, o seleccionar una muestra aleatoria de registros de una base de datos para una auditoría manual — sin el sesgo que introduce elegir «a ojo»."
        ]
      }
    ],
    "steps": [
      {
        "title": "Definí el rango",
        "description": "Ingresá el mínimo y el máximo entre los que querés generar números (por ejemplo, 1 y 100)."
      },
      {
        "title": "Elegí cuántos números",
        "description": "Podés generar desde 1 hasta 1000 números en una sola operación."
      },
      {
        "title": "Seleccioná si se repiten",
        "description": "Activá la opción «sin repetición» si cada número debe ser único, ideal para sorteos y rifas."
      },
      {
        "title": "Generá y copiá",
        "description": "Presioná Generar y copiá los resultados con un clic para usarlos donde los necesitás."
      }
    ]
  },
  "densidad-keywords": {
    "intro": "La densidad de keywords fue durante años el principal indicador SEO que los editores controlaban manualmente: si repetías «zapatos de cuero» el 2% de las veces, el texto estaba «optimizado». Hoy Google usa modelos semánticos mucho más sofisticados, pero la frecuencia de términos sigue siendo una señal de relevancia temática. Esta herramienta va más allá del simple conteo: analiza tanto <strong>palabras individuales</strong> como <strong>bigramas</strong> (pares de palabras consecutivas), filtra stopwords en español y muestra el porcentaje real de densidad para cada término.",
    "sections": [
      {
        "heading": "Por qué los bigramas importan más que las palabras sueltas",
        "paragraphs": [
          "Una página sobre «seguro de auto» que repite «seguro» 15 veces y «auto» 12 veces pero el bigrama «seguro auto» solo aparece 3 veces puede ser semánticamente débil en esa combinación específica. Los bigramas revelan qué frases de dos palabras dominan el texto — y en SEO, las frases de dos palabras suelen corresponder mejor con las intenciones de búsqueda reales que los términos aislados.",
          "Por ejemplo, la diferencia entre «diseño web» y «diseño» + «web» como términos separados es importante: el bigrama indica que el contenido trata el tema de forma integrada, no que simplemente menciona ambas palabras en contextos distintos. La herramienta muestra los <strong>15 bigramas más frecuentes</strong> junto con su porcentaje sobre el total de bigramas del texto."
        ],
        "citableSummary": "El análisis de bigramas detecta frases de dos palabras repetidas, que suelen correlacionar mejor con intenciones de búsqueda específicas que los términos individuales."
      },
      {
        "heading": "El rol del filtrado de stopwords",
        "paragraphs": [
          "Sin filtrado, las palabras más frecuentes en cualquier texto en español serían «de», «la», «que», «en», «y» — palabras que no aportan información semántica para SEO. El filtro de stopwords elimina artículos, preposiciones, conjunciones y pronombres comunes, dejando visible solo el vocabulario con carga semántica real.",
          "Esto te permite detectar casos como: un artículo supuestamente sobre «email marketing» donde la palabra «email» aparece solo 0.4% pero «ventas» aparece 2.1%, revelando que el enfoque real del texto es ventas en general y no la canal específico. Ese tipo de desalineación entre intención declarada y contenido real es exactamente lo que Google penaliza con el concepto de «topic mismatch»."
        ]
      },
      {
        "heading": "Densidad óptima: qué números buscar",
        "paragraphs": [
          "No existe una densidad «ideal» universal, pero como referencia práctica: un keyword principal en una densidad de <strong>1% a 2.5%</strong> suele ser natural para textos de 800–2000 palabras. Densidades superiores al 4–5% en una sola palabra clave son señal de keyword stuffing y pueden activar filtros de spam de Google.",
          "Lo más útil de esta herramienta es usarla comparativamente: analizá tu artículo, luego analizá el texto de la página que rankea #1 para tu keyword objetivo, y comparad los bigramas dominantes. Si la página competidora repite «planificación financiera personal» como bigrama 8 veces y vos lo mencionás solo 2, tenés una brecha semántica concreta que podés cerrar editando."
        ]
      }
    ],
    "steps": [
      {
        "title": "Pegá el texto del artículo",
        "description": "Copiá el contenido de tu página o artículo (sin HTML, solo texto plano) y pegalo en el campo de análisis."
      },
      {
        "title": "Revisá las palabras top",
        "description": "Observá las 30 palabras más frecuentes con sus porcentajes — identifica tu keyword principal y verifica que esté bien representada."
      },
      {
        "title": "Analizá los bigramas",
        "description": "Los 15 bigramas más comunes revelan qué frases de dos palabras dominan el contenido — comparalos con las páginas competidoras."
      },
      {
        "title": "Ajustá el contenido",
        "description": "Editá el texto para balancear la densidad: agregá variantes semánticas donde un término esté subrepresentado, o reducí repeticiones donde supere el 3%."
      }
    ]
  },
  "prompt-builder": {
    "intro": "La calidad de lo que obtenés de ChatGPT, Claude o Gemini depende casi completamente de cómo formulás la instrucción. Un prompt mal estructurado produce respuestas genéricas, largas o completamente fuera de tema; uno bien construido con rol, contexto, formato y restricciones claras puede reemplazar horas de trabajo. Este constructor de prompts te guía por los componentes que los ingenieros de prompts profesionales usan — incluyendo técnicas como <em>few-shot prompting</em> y asignación de rol — y genera el texto final listo para pegar en cualquier LLM.",
    "sections": [
      {
        "heading": "Los componentes de un prompt efectivo",
        "paragraphs": [
          "Un prompt de alto rendimiento tiene al menos cuatro elementos: <strong>rol</strong> (quién es el modelo: «Eres un abogado corporativo mexicano con 15 años de experiencia»), <strong>tarea</strong> (qué debe hacer: «Redacta una cláusula de confidencialidad»), <strong>contexto</strong> (información relevante: «Para un contrato con un proveedor de software SaaS») y <strong>formato de salida</strong> (cómo debe responder: «En formato de lista numerada, máximo 200 palabras»).",
          "Los elementos opcionales pero poderosos incluyen la <strong>audiencia</strong> («El lector es el CFO sin formación legal»), el <strong>tono</strong> («Formal pero sin jerga técnica»), y los <strong>ejemplos few-shot</strong> — uno o dos ejemplos del tipo de respuesta que esperás. Los estudios del equipo de investigación de Google DeepMind muestran que agregar solo dos ejemplos puede mejorar la calidad de la respuesta entre un 20% y 60% en tareas estructuradas."
        ],
        "citableSummary": "Un prompt estructurado con rol + tarea + contexto + formato produce consistentemente mejores resultados que una instrucción en lenguaje natural libre, especialmente para tareas repetibles o de formato específico."
      },
      {
        "heading": "Few-shot prompting: enseñar con ejemplos",
        "paragraphs": [
          "El few-shot prompting es la técnica de incluir 1–3 pares de entrada/salida dentro del propio prompt para mostrarle al modelo el patrón exacto que querés. Por ejemplo, si necesitás que Claude convierta nombres de productos en slugs SEO, mostrarle «\"Zapatos de Cuero Marrón\" → zapatos-cuero-marron» como ejemplo antes de darle la lista real produce resultados mucho más consistentes que solo describir la regla.",
          "El constructor te permite agregar estos ejemplos en campos separados, que luego se formatean automáticamente en la estructura correcta según el modelo de destino: ChatGPT usa una convención distinta a la de Claude para los ejemplos en el system prompt."
        ]
      },
      {
        "heading": "Restricciones: qué NO debe hacer el modelo",
        "paragraphs": [
          "Las instrucciones negativas son tan importantes como las positivas. «No uses listas con viñetas», «No menciones competidores», «No superes 150 palabras», «No uses tecnicismos sin definirlos» — este tipo de restricciones recortan significativamente el espacio de respuestas posibles y reducen la probabilidad de que el modelo haga algo inesperado.",
          "El campo de restricciones de este builder te permite agregar múltiples reglas que se incorporan al prompt final en una sección dedicada. Es especialmente valioso para prompts que vas a reutilizar en flujos automatizados o compartir con un equipo — donde necesitás que el comportamiento sea predecible y repetible."
        ]
      }
    ],
    "steps": [
      {
        "title": "Definí el rol",
        "description": "Describí quién debe ser el modelo: profesión, experiencia, perspectiva. Cuanto más específico, mejor."
      },
      {
        "title": "Escribí la tarea principal",
        "description": "Explicá qué debe hacer en una o dos oraciones claras y concretas."
      },
      {
        "title": "Agregá contexto y audiencia",
        "description": "Incluí información de fondo relevante y describí a quién va dirigida la respuesta."
      },
      {
        "title": "Elegí tono y formato",
        "description": "Seleccioná el tono (formal, conversacional, técnico) y el formato de salida deseado (lista, párrafo, tabla, código)."
      },
      {
        "title": "Agregá ejemplos few-shot (opcional)",
        "description": "Si el output debe seguir un patrón específico, incluí uno o dos ejemplos de entrada/salida esperada."
      },
      {
        "title": "Copiá el prompt generado",
        "description": "El prompt estructurado aparece listo para pegarlo en ChatGPT, Claude, Gemini o cualquier otro LLM."
      }
    ]
  },
  "recortar-imagen": {
    "intro": "Recortar una foto de forma precisa — para centrar una cara en un avatar, eliminar fondo innecesario de una miniatura o ajustar proporciones para una portada de red social — es algo que no debería requerir abrir Photoshop ni Canva. Esta herramienta lo hace completamente en el navegador usando la Canvas API: subís la imagen, arrastrás y redimensionás la caja de selección, y descargás el recorte en PNG sin pérdida. Ningún pixel sale de tu dispositivo.",
    "sections": [
      {
        "heading": "Casos de uso concretos para recortar imágenes online",
        "paragraphs": [
          "El caso más frecuente es preparar una <strong>foto de perfil</strong>: la mayoría de las plataformas (LinkedIn, Instagram, WhatsApp) esperan una imagen cuadrada centrada en el rostro. Subís la foto original en formato horizontal, posicionás la caja de recorte sobre la cara y descargás el cuadrado resultante. Sin necesidad de registrarte ni pagar.",
          "Otro uso habitual es recortar <strong>capturas de pantalla</strong> para tutoriales o documentación técnica: tenés la captura completa del escritorio pero solo necesitás el área del modal o del formulario relevante. La herramienta te permite afinar el recorte pixel a pixel arrastrando las esquinas, algo que los recortadores básicos del sistema operativo no siempre permiten."
        ],
        "citableSummary": "El recorte se procesa 100% en el navegador usando Canvas API, lo que significa que imágenes confidenciales o con datos personales nunca salen de tu dispositivo."
      },
      {
        "heading": "Cómo funciona el recorte sin pérdida de calidad",
        "paragraphs": [
          "El output es <strong>PNG lossless</strong>, lo que significa que los píxeles del área seleccionada se copian tal cual, sin recompresión. Si la imagen original era un JPG de alta calidad, el recorte PNG preserva todos los detalles sin agregar los artefactos de compresión que aparecen cuando recomprimís un JPG sobre un JPG.",
          "La limitación del PNG es el tamaño de archivo: si recortás una sección grande de una foto de alta resolución, el PNG resultante puede ser significativamente más pesado que la versión JPG equivalente. Para imágenes que van a la web, podés comprimir el PNG resultado usando una herramienta de optimización después del recorte."
        ]
      },
      {
        "heading": "Tamaños de referencia para redes sociales y plataformas",
        "paragraphs": [
          "Para orientarte al recortar: <strong>foto de perfil Instagram</strong> se muestra a 110×110 px (recomendado subir 320×320); <strong>foto de perfil LinkedIn</strong> 400×400 px; <strong>thumbnail YouTube</strong> 1280×720 px (relación 16:9); <strong>portada Twitter/X</strong> 1500×500 px; <strong>imagen cuadrada para feed Instagram</strong> mínimo 1080×1080 px.",
          "Al hacer el recorte en esta herramienta podés ver las dimensiones exactas del área seleccionada en tiempo real, lo que te permite alcanzar las proporciones correctas antes de descargar sin necesidad de calculadoras externas."
        ]
      }
    ],
    "steps": [
      {
        "title": "Subí la imagen",
        "description": "Hacé clic para seleccionar o arrastrá un archivo JPG, PNG o WebP desde tu computadora."
      },
      {
        "title": "Ajustá la caja de recorte",
        "description": "Mové la caja arrastrando su interior y redimensionala tirando de cualquier esquina hasta encuadrar exactamente lo que querés conservar."
      },
      {
        "title": "Descargá el PNG",
        "description": "Presioná el botón de descarga para obtener el recorte en formato PNG lossless, listo para usar."
      }
    ]
  },
  "mi-ip": {
    "intro": "Tu dirección IP pública es la identidad de tu conexión en internet: todos los sitios que visitás la ven, y a través de ella es posible inferir tu ubicación aproximada, tu proveedor de internet y el número de sistema autónomo (ASN) de la red. Esta herramienta la muestra junto con toda la información geográfica y técnica asociada — sin instalar extensiones ni app. Útil tanto para diagnósticos de red como para entender qué datos revela tu conexión al navegar.",
    "sections": [
      {
        "heading": "Qué información se puede obtener de una dirección IP",
        "paragraphs": [
          "A partir de tu IP pública, las bases de datos de geolocalización como MaxMind GeoIP2 o ip-api pueden determinar con precisión variable: el <strong>país</strong> (casi siempre correcto), la <strong>región o estado</strong> (correcto en la mayoría de los casos), la <strong>ciudad</strong> (precisa en zonas urbanas, puede estar a 50–100 km en zonas rurales) y el <strong>código postal</strong> (menos confiable, especialmente en Latinoamérica donde la cobertura de datos es menor que en EE.UU. o Europa).",
          "La información técnica incluye el <strong>ISP u organización</strong> (por ejemplo: «Telmex», «Izzi Telecom», «Claro Colombia»), el <strong>ASN</strong> (número de sistema autónomo, identificador único de la red), y la <strong>zona horaria</strong> inferida de la ubicación. Esta herramienta también detecta y muestra tu <strong>user-agent</strong>: el texto que tu navegador envía identificando el sistema operativo y versión."
        ],
        "citableSummary": "Una dirección IP permite geolocalizar la conexión a nivel ciudad con una precisión típica de 50–80 km, pero no identifica la dirección física del usuario; la precisión disminuye significativamente en zonas rurales."
      },
      {
        "heading": "IPv4 vs IPv6: diferencias prácticas",
        "paragraphs": [
          "Si tu resultado muestra un número largo en formato <code>2806:2f0:a0a0:xxxx::</code>, estás conectado mediante <strong>IPv6</strong>, el protocolo que reemplaza progresivamente a IPv4. En Latinoamérica, ISPs como Telmex, Claro y Telecentro ya asignan IPv6 a muchos usuarios residenciales. La diferencia práctica es que con IPv6 cada dispositivo puede tener una IP global única (en IPv4 la mayoría comparte una IP por NAT del router).",
          "Para verificar conectividad, algunos servicios online todavía solo funcionan con IPv4. Si necesitás tu IP IPv4 específicamente, podés usar servicios como <code>ipv4.icanhazip.com</code> que fuerzan la respuesta en ese protocolo."
        ]
      },
      {
        "heading": "Por qué importa saber tu IP pública",
        "paragraphs": [
          "Los casos prácticos más comunes: configurar acceso remoto a un router o NAS doméstico (necesitás saber tu IP para crear reglas de firewall o en el servicio DDNS), verificar que tu VPN está funcionando (si la IP que aparece aquí coincide con la de tu ISP real, la VPN no está enrutando el tráfico correctamente), y diagnosticar por qué un servicio te bloquea o te redirige a un país incorrecto.",
          "En desarrollo web, también es útil para probar geobloqueos o redirecciones basadas en IP: si tu sitio redirige usuarios de México a <code>/mx/</code> y querés verificar que funciona correctamente, ver aquí que tu IP está identificada como «Ciudad de México, Telmex» confirma que la prueba es válida."
        ]
      }
    ]
  },
  "calculadora-porcentaje": {
    "intro": "Los porcentajes aparecen en casi cualquier decisión cotidiana: el descuento de un producto, el aumento de sueldo, la propina en un restaurante, el rendimiento de una inversión. Sin embargo, mezclar los distintos tipos de cálculo — «cuánto es el X% de Y» versus «qué porcentaje es X de Y» versus «cuánto aumentó entre dos valores» — es fuente constante de errores. Esta calculadora integra los cuatro modos más usados en una sola pantalla, mostrando la fórmula y el razonamiento paso a paso para que el resultado sea verificable.",
    "sections": [
      {
        "heading": "Los cuatro modos de cálculo porcentual",
        "paragraphs": [
          "<strong>Modo 1 — X% de Y:</strong> el más básico. Si un artículo cuesta $850 con 15% de descuento, calculás 15% de 850 = 127.50, entonces pagás $722.50. Fórmula: <code>(X / 100) × Y</code>. <strong>Modo 2 — Qué porcentaje es X de Y:</strong> si vendiste 34 unidades de una meta de 120, ¿qué porcentaje alcanzaste? <code>(34 / 120) × 100 = 28.3%</code>. Este modo es el correcto para calcular tasas de conversión, cumplimiento de presupuesto o participación de mercado.",
          "<strong>Modo 3 — Variación porcentual:</strong> compara dos valores en el tiempo. Si el costo de producción pasó de $4,200 a $5,100, el aumento fue <code>((5100 - 4200) / 4200) × 100 = 21.4%</code>. Este modo es crítico para reportes financieros — el error clásico es calcular la variación sobre el valor nuevo en lugar del valor original. <strong>Modo 4 — Propina:</strong> divide el porcentaje entre los comensales para que cada uno sepa exactamente cuánto paga."
        ],
        "citableSummary": "La variación porcentual siempre se calcula sobre el <em>valor original</em> (base), no sobre el valor nuevo — un error frecuente que infla o deflacta artificialmente las cifras en reportes."
      },
      {
        "heading": "Errores comunes que esta calculadora ayuda a evitar",
        "paragraphs": [
          "El error más frecuente en descuentos escalonados: si aplicás 20% de descuento y luego 10% adicional, el descuento total <strong>no</strong> es 30%. Es 28%, porque el segundo descuento aplica sobre el precio ya reducido. Para calcularlo correctamente: <code>(1 - 0.20) × (1 - 0.10) = 0.72</code>, es decir 28% de descuento total.",
          "Otro error habitual: confundir «aumentó un 50%» con «es 50% de» — son operaciones inversas. Si un precio aumentó 50%, el nuevo precio es el original × 1.5. Si querés saber cuánto era el original dado el precio final con aumento, la fórmula inversa es <code>precio_final / 1.5</code>. La calculadora de variación porcentual muestra ambas direcciones."
        ]
      },
      {
        "heading": "Propina en restaurantes: cálculo rápido para grupos",
        "paragraphs": [
          "En México, Argentina y otros países latinoamericanos, la propina sugerida en restaurantes varía entre 10% y 15% para servicio estándar, y hasta 20% para servicio excepcional. El modo propina de esta calculadora toma el total de la cuenta, el porcentaje que querés dejar y la cantidad de personas en la mesa, y devuelve cuánto aporta cada uno incluyendo la propina.",
          "Por ejemplo: cuenta de $1,340, 15% de propina para 4 personas → propina total $201, total a pagar $1,541, cada persona paga $385.25. El cálculo aparece desglosado para que sea fácil de explicar en la mesa sin discusiones."
        ]
      }
    ]
  },
  "binario-decimal": {
    "intro": "Los sistemas numéricos posicionales son la base de toda la computación: el procesador trabaja en binario, los colores web se expresan en hexadecimal, los permisos de Unix se definen en octal y los humanos usamos decimal. Entender las conversiones entre estas cuatro bases — y poder hacerlas rápido — es una habilidad esencial para programadores, estudiantes de sistemas y técnicos en electrónica. Este conversor las maneja todas de forma instantánea, muestra la representación binaria con bits coloreados y, si el valor está en rango, muestra el carácter ASCII correspondiente.",
    "sections": [
      {
        "heading": "Las cuatro bases y cuándo se usa cada una",
        "paragraphs": [
          "<strong>Binario (base 2):</strong> solo usa 0 y 1. Es el lenguaje nativo del hardware digital. Aparece en manipulación de bits, máscaras de red, protocolos de comunicación serie y registro de estados en microcontroladores. <strong>Octal (base 8):</strong> usa dígitos del 0 al 7. Se usa principalmente en permisos de Unix/Linux: el comando <code>chmod 755</code> usa octal, donde 7 = 111 en binario (leer, escribir, ejecutar), 5 = 101 (leer, ejecutar) y así sucesivamente.",
          "<strong>Decimal (base 10):</strong> la base cotidiana. <strong>Hexadecimal (base 16):</strong> usa 0–9 y A–F. Es el formato más compacto para representar datos binarios porque cada dígito hex equivale exactamente a 4 bits (un <em>nibble</em>). Por eso los colores CSS son hex (<code>#FF6B35</code>), las direcciones de memoria lo son, y los hashes MD5/SHA también."
        ],
        "citableSummary": "Un dígito hexadecimal representa exactamente 4 bits, lo que hace al hex el formato más eficiente para expresar datos binarios de forma legible: dos dígitos hex = un byte completo."
      },
      {
        "heading": "Permisos Unix: el caso de uso más práctico del octal",
        "paragraphs": [
          "Cuando ejecutás <code>chmod 644 archivo.txt</code>, estás usando octal. El 6 en el propietario = binario 110 = leer(4)+escribir(2)+sin ejecutar(0). El 4 en grupo y otros = binario 100 = solo leer. Este conversor te permite verificar cualquier combinación: si necesitás permisos 755 para un script de shell, convertís 7 = 111 = rwx, 5 = 101 = r-x, y confirmás que el script tendrá ejecución para el propietario y solo lectura/ejecución para el resto.",
          "El error clásico con permisos es confundir 775 con 777: el primero no da escritura a «otros», el segundo sí — un riesgo de seguridad en servidores compartidos. Visualizar los bits en binario hace esta diferencia inmediatamente obvia."
        ]
      },
      {
        "heading": "Caracteres ASCII: el puente entre números y texto",
        "paragraphs": [
          "El estándar ASCII asigna a cada carácter imprimible un número del 32 al 126. Por ejemplo, el decimal 65 = hex 41 = binario 01000001 = carácter «A». Esta correspondencia es fundamental para entender protocolos de red, parsear archivos de texto en bajo nivel, o depurar datos que llegan corruptos.",
          "Los caracteres del 0 al 31 son de control (como 10 = salto de línea, 13 = retorno de carro) y aparecen en headers de protocolos y en archivos binarios. El conversor muestra el carácter solo para el rango 32–126 (imprimibles), evitando confusiones con los caracteres de control que no tienen representación visual estándar."
        ]
      }
    ],
    "steps": [
      {
        "title": "Ingresá el número en cualquier base",
        "description": "Escribí el valor en el campo de binario, octal, decimal o hexadecimal — los demás campos se actualizan en tiempo real."
      },
      {
        "title": "Observá los bits coloreados",
        "description": "La representación binaria muestra cada bit con color para facilitar la lectura de grupos de 4 (nibbles) o 8 (bytes)."
      },
      {
        "title": "Verificá el carácter ASCII",
        "description": "Si el valor decimal está entre 32 y 126, verás el carácter imprimible correspondiente — útil para trabajo con texto en bajo nivel."
      }
    ]
  },
  "generador-username": {
    "intro": "Crear un username memorable, disponible y coherente con la plataforma es más difícil de lo que parece: la mayoría de las combinaciones simples están tomadas, y los nombres genéricos no se recuerdan ni posicionan bien en búsquedas dentro de las plataformas. Este generador produce variaciones en 8 estilos distintos — desde leet speak hasta CamelCase profesional — a partir de un nombre base que proporcionás, o en modo aleatorio si arrancás desde cero.",
    "sections": [
      {
        "heading": "Los 8 estilos y para qué sirve cada uno",
        "paragraphs": [
          "<strong>Gaming:</strong> agrega números estratégicos al final o en medio del nombre, siguiendo las convenciones de plataformas como Steam o Valorant (ej: <code>darkwolf47</code>). <strong>Aesthetic:</strong> inserta puntos entre letras, popular en Instagram y TikTok para nombres que se ven «limpios» (ej: <code>v.i.o.l.e.t.a</code>). <strong>Pro / CamelCase:</strong> formato sin espacios con mayúsculas internas, ideal para LinkedIn, GitHub o perfiles profesionales (ej: <code>SofiaRamirez</code>).",
          "<strong>Underscore:</strong> usa guiones bajos como separadores, estándar en Twitter/X y en comunidades de desarrollo (ej: <code>sofia_ramirez</code>). <strong>Leet speak (1337):</strong> reemplaza letras por números similares visualmente: <code>a→4</code>, <code>e→3</code>, <code>i→1</code>, <code>o→0</code> — muy usado en gaming y comunidades técnicas. <strong>Con números:</strong> agrega el año de nacimiento, un número favorito o secuencias cortas para diferenciarse de usernames tomados."
        ],
        "citableSummary": "El estilo de username más adecuado depende de la plataforma: CamelCase funciona mejor en contextos profesionales como LinkedIn o GitHub; leet speak y gaming en plataformas de entretenimiento."
      },
      {
        "heading": "Cómo verificar disponibilidad antes de registrarte",
        "paragraphs": [
          "El generador incluye un enlace directo a <strong>Namechk</strong>, un servicio que verifica simultáneamente la disponibilidad de un username en más de 100 plataformas (Instagram, TikTok, Twitter/X, YouTube, Twitch, Discord, GitHub, entre otros). Hacerlo antes de comprometerte con un nombre ahorra el problema de encontrar que en una plataforma clave ya está tomado.",
          "La estrategia recomendada para creadores de contenido es elegir un username que esté disponible en al menos las cuatro plataformas que usarás activamente, que tenga menos de 15 caracteres (límite de Twitter/X) y que no dependa de números difíciles de recordar. Un nombre consistente entre plataformas facilita que tu audiencia te encuentre y te mencione."
        ]
      },
      {
        "heading": "Username para gaming vs creador de contenido vs uso profesional",
        "paragraphs": [
          "Para <strong>gaming</strong>, los mejores usernames tienden a ser cortos (4–8 caracteres), fáciles de pronunciar en voz alta durante streams o partidas en equipo, y evocativos (nombres de animales, elementos, conceptos de poder). Un nombre como <code>FrostByte</code> funciona mejor que <code>JuanCarlos1998</code> en Twitch o Fortnite.",
          "Para <strong>uso profesional</strong> en GitHub o LinkedIn, la convención es usar nombre real en CamelCase o con punto: <code>maria.gonzalez</code> o <code>MariaGonzalez</code>. Para <strong>creadores de contenido</strong> en TikTok o Instagram, la tendencia de 2024–2025 favorece nombres de 1–2 sílabas altamente memorables o frases cortas en inglés que suenen global."
        ]
      }
    ]
  },
  "rotar-imagen": {
    "intro": "Las cámaras de teléfono guardan la orientación de la foto en un campo EXIF llamado <code>Orientation</code>, que muchos programas leen correctamente — pero no todos. Cuando subís una foto tomada en vertical a un formulario web, un sistema de gestión de contenidos o una aplicación que ignora EXIF, aparece rotada 90°. Esta herramienta corrige eso (y más) completamente en el navegador: rotación en pasos de 90° y flip horizontal/vertical, sin ningún archivo que salga de tu dispositivo.",
    "sections": [
      {
        "heading": "Por qué las fotos del celular aparecen rotadas",
        "paragraphs": [
          "Los sensores de las cámaras de smartphones siempre capturan la imagen en orientación <em>landscape</em> (horizontal). Cuando tomás una foto en vertical, el chip detecta la rotación del acelerómetro y escribe en los metadatos EXIF el campo <code>Orientation: 6</code> (rotada 90° sentido horario) o <code>Orientation: 8</code> (antihorario). Las apps de galería del teléfono corrigen esto automáticamente al mostrarla, pero cuando subís el archivo JPG a cualquier sistema que no lee EXIF, la imagen aparece acostada.",
          "La solución correcta no es rotar el EXIF (que deja el problema si el receptor también ignora EXIF), sino rotar los píxeles reales de la imagen y reescribirla. Esta herramienta hace exactamente eso: toma los píxeles, los transforma con Canvas API y genera un archivo nuevo con la orientación correcta quemada en los píxeles, independiente de cualquier metadata."
        ],
        "citableSummary": "Al rotar los píxeles reales de la imagen (no solo el campo EXIF), la orientación correcta queda garantizada en cualquier programa o plataforma, sin depender de que el receptor interprete los metadatos."
      },
      {
        "heading": "Flip horizontal para selfies y capturas de cámara frontal",
        "paragraphs": [
          "Las cámaras frontales muestran una imagen espejada en la previsualización para simular un espejo, pero algunas guardan la foto en la orientación real (no espejada), mientras otras la guardan ya volteada. El resultado puede ser que tu selfie en la foto guardada tiene el texto de una remera al revés, o que el lunar que tenés en el lado derecho aparece en el lado izquierdo.",
          "El flip horizontal corrige esto instantáneamente. También es útil para corregir capturas de video en conferencias donde la cámara invierte la imagen, o para preparar imágenes en espejo para diseños de impresión donde el transfer requiere imagen invertida."
        ]
      },
      {
        "heading": "Formatos de descarga: JPG vs PNG",
        "paragraphs": [
          "La herramienta ofrece descarga en <strong>JPG al 92% de calidad</strong> (excelente balance entre tamaño y nitidez, invisible la diferencia con calidad 100% para el ojo humano) o en <strong>PNG lossless</strong> para cuando necesitás preservar todos los píxeles sin compresión, como en capturas de pantalla con texto nítido o logos.",
          "Para fotos de cámara, JPG al 92% es siempre la opción correcta: un JPG de 3MB se convierte en aproximadamente 2–3MB descargado, mientras que el PNG equivalente puede pesar 15–25MB sin ningún beneficio visual perceptible en fotografías."
        ]
      }
    ],
    "steps": [
      {
        "title": "Subí la imagen",
        "description": "Seleccioná o arrastrá un archivo JPG, PNG o WebP. La imagen se muestra en el visor al instante."
      },
      {
        "title": "Rotá o flippeá",
        "description": "Usá los botones de 90° horario/antihorario para rotar, o los botones de flip para voltear horizontal o verticalmente."
      },
      {
        "title": "Elegí el formato y descargá",
        "description": "Seleccioná JPG (fotos) o PNG (capturas, logos) y descargá la imagen transformada."
      }
    ]
  },
  "calculadora-calorias": {
    "intro": "Saber cuántas calorías necesitás por día no es suficiente si no sabés cómo se calculó ese número ni en qué se basa el ajuste según tu objetivo. Esta calculadora usa la <strong>ecuación de Mifflin-St Jeor</strong>, validada en estudios como el de Frankenfield et al. (2005) como la más precisa entre las cinco fórmulas principales para estimar el metabolismo basal (BMR). A partir del BMR, aplica el factor de actividad para obtener el TDEE y lo ajusta según tu objetivo — con la distribución de macronutrientes incluida.",
    "sections": [
      {
        "heading": "Cómo funciona la ecuación Mifflin-St Jeor",
        "paragraphs": [
          "La fórmula calcula el <strong>metabolismo basal (BMR)</strong> — las calorías que tu cuerpo necesita en reposo absoluto para mantener funciones vitales. Para hombres: <code>BMR = 10×peso(kg) + 6.25×altura(cm) − 5×edad + 5</code>. Para mujeres: <code>BMR = 10×peso(kg) + 6.25×altura(cm) − 5×edad − 161</code>. Por ejemplo, una mujer de 30 años, 65 kg y 165 cm tiene un BMR de aproximadamente 1.445 kcal/día.",
          "El factor de actividad convierte el BMR en <strong>TDEE</strong> (gasto calórico total diario). Sedentario (sin ejercicio) = BMR × 1.2; ejercicio ligero 1–3 días/semana = BMR × 1.375; moderado 3–5 días = BMR × 1.55; activo 6–7 días = BMR × 1.725; muy activo (trabajo físico + ejercicio diario intenso) = BMR × 1.9. La mayoría de los adultos urbanos con trabajo de escritorio y ejercicio 3 veces por semana cae en el rango 1.55."
        ],
        "citableSummary": "La ecuación Mifflin-St Jeor (publicada en 1990) mostró un margen de error del ±10% en estudios de validación en adultos sanos, frente al ±15–20% de la ecuación Harris-Benedict original de 1919."
      },
      {
        "heading": "Ajuste calórico por objetivo",
        "paragraphs": [
          "Para <strong>perder grasa</strong>, el déficit recomendado por la mayoría de protocolos basados en evidencia es <strong>−500 kcal/día</strong> para pérdida de ~0.5 kg/semana (agresivo pero sostenible para personas con más de 20% de grasa corporal), o <strong>−250 kcal/día</strong> para pérdida de ~0.25 kg/semana (más lento pero preserva más masa muscular — recomendado en fases de cutting de atletas).",
          "Para <strong>ganar masa muscular</strong>, un superávit de <strong>+250 a +500 kcal/día</strong> es el rango que maximiza la ganancia muscular mientras minimiza la acumulación de grasa — el llamado «lean bulk». Superávits mayores (>500 kcal) tienden a acumular más grasa que músculo, especialmente en personas sin años de entrenamiento de fuerza."
        ]
      },
      {
        "heading": "Distribución de macronutrientes explicada",
        "paragraphs": [
          "La calculadora distribuye los macros siguiendo las guías de evidencia más recientes: <strong>proteína a 2g por kg de peso corporal</strong> (mínimo para preservar músculo en déficit calórico, según meta-análisis de Morton et al. 2018); <strong>grasa al 25% de las calorías totales</strong> (necesaria para producción hormonal, especialmente testosterona y estrógenos); el resto en <strong>carbohidratos</strong>, que son la fuente de energía preferida para el músculo y el cerebro.",
          "Para una dieta <strong>keto</strong>, la distribución estándar es diferente: menos del 5% de calorías en carbohidratos (~25–50g/día), 70–75% en grasas y 20–25% en proteína. Si seguís keto, la distribución de macros que muestra esta calculadora es la convencional — usala como referencia del TDEE y ajustá los ratios manualmente."
        ]
      }
    ],
    "steps": [
      {
        "title": "Ingresá tus datos físicos",
        "description": "Completá edad, sexo, peso (kg) y altura (cm) para que la fórmula Mifflin-St Jeor calcule tu BMR."
      },
      {
        "title": "Seleccioná tu nivel de actividad",
        "description": "Elegí entre sedentario, ejercicio ligero, moderado, activo o muy activo según tu rutina real de la semana."
      },
      {
        "title": "Elegí tu objetivo",
        "description": "Seleccioná perder peso (déficit −500 o −250 kcal), mantener o ganar masa (+250 o +500 kcal)."
      },
      {
        "title": "Revisá el TDEE y los macros",
        "description": "La calculadora muestra tus calorías objetivo con la distribución recomendada de proteína, grasa y carbohidratos en gramos."
      }
    ]
  },
  "barcode-generator": {
    "intro": "El código de barras EAN-13 (International Article Number, anteriormente European Article Number) es el estándar global para identificar productos en retail desde 1977: está en prácticamente cada producto de supermercado, farmacia o librería del mundo. Este generador crea códigos EAN-13 válidos, calcula automáticamente el <strong>13° dígito verificador</strong> a partir de los primeros 12, y permite descargarlo en PNG de alta resolución para uso en etiquetas, documentos o materiales de aprendizaje.",
    "sections": [
      {
        "heading": "Cómo funciona el dígito verificador EAN-13",
        "paragraphs": [
          "El 13° dígito del EAN-13 no es arbitrario: se calcula mediante un algoritmo de suma de verificación (checksum) que detecta errores de lectura. El proceso: tomás los primeros 12 dígitos, multiplicás alternadamente por 1 y por 3 (posiciones impares ×1, pares ×3), sumás todos los productos, calculás el residuo módulo 10, y si el residuo es 0 el verificador es 0, si no es <code>10 − residuo</code>.",
          "Por ejemplo, para el código <code>750104045058</code>: <code>7×1 + 5×3 + 0×1 + 1×3 + 0×1 + 4×3 + 0×1 + 4×3 + 5×1 + 0×3 + 5×1 + 8×3 = 7+15+0+3+0+12+0+12+5+0+5+24 = 83</code>. <code>83 mod 10 = 3</code>, dígito verificador = <code>10−3 = 7</code>. El código completo sería <code>7501040450587</code>. Este generador hace ese cálculo automáticamente."
        ],
        "citableSummary": "El dígito verificador EAN-13 se calcula mediante checksum con pesos alternados 1 y 3, permitiendo que cualquier escáner detecte errores de un solo dígito con 100% de confiabilidad."
      },
      {
        "heading": "Prefijos GS1 y uso comercial real",
        "paragraphs": [
          "Los primeros 3 dígitos de un EAN-13 identifican el <strong>prefijo GS1</strong> del país o región que asignó el código. Los prefijos 750–759 corresponden a México, 770–771 a Colombia, 775 a Perú, 779 a Argentina, 789–790 a Brasil. Sin embargo, el prefijo identifica dónde se registró la empresa, no dónde se fabrica el producto — es común ver productos latinoamericanos con prefijos europeos o estadounidenses.",
          "Para vender en tiendas físicas o en marketplaces como Amazon, Mercado Libre o Walmart, necesitás un código GS1 <strong>registrado</strong> en GS1 México (gs1mexico.org) o en la organización GS1 de tu país. Los códigos no registrados funcionan a nivel técnico pero son inválidos comercialmente y pueden generar conflictos con otros productos que usen el mismo número."
        ]
      },
      {
        "heading": "Usos válidos sin registro GS1",
        "paragraphs": [
          "Para <strong>etiquetas internas</strong> en almacenes propios donde usás lectores de código de barras para gestionar inventario sin vender en retail externo, podés usar cualquier código EAN-13 técnicamente válido. Lo mismo aplica para <strong>sistemas de control de activos</strong>, <strong>bibliotecas personales o institucionales</strong> que quieran codificar sus colecciones, o simplemente para <strong>aprender o practicar</strong> desarrollo de software de punto de venta.",
          "Alternativas al EAN-13 para uso interno: el <strong>Code 128</strong> acepta caracteres alfanuméricos y se usa ampliamente en logística; el <strong>QR code</strong> almacena URLs y texto y no requiere registro. Para e-commerce puro sin tienda física, los QRs son frecuentemente suficientes y más flexibles."
        ]
      }
    ],
    "steps": [
      {
        "title": "Ingresá los primeros 12 dígitos",
        "description": "Escribí los 12 dígitos de tu código (solo números). El generador calcula automáticamente el 13° dígito verificador."
      },
      {
        "title": "Personalizá los colores",
        "description": "Elegí el color de las barras y el fondo para adaptarlo a la etiqueta o material donde lo vas a usar."
      },
      {
        "title": "Descargá el PNG",
        "description": "Obtenés el código de barras en alta resolución listo para insertar en etiquetas, documentos o materiales de diseño."
      }
    ]
  },
  "tiempo-reaccion": {
    "intro": "Tu tiempo de reacción es la ventana entre que ocurre un estímulo visual y el momento en que tu cuerpo responde. Este test lo mide en milisegundos con precisión de navegador, sin hardware especial. Los conductores de Fórmula 1 promedian entre 150 y 190 ms; un adulto joven sin entrenamiento, entre 220 y 280 ms. Saber dónde estás te da una línea base para mejorar.",
    "sections": [
      {
        "heading": "¿Qué mide exactamente este test?",
        "paragraphs": [
          "El test registra el tiempo transcurrido entre el cambio de color del cuadro y el click o toque en pantalla. No mide velocidad de pensamiento complejo, sino <strong>reacción simple ante estímulo visual</strong>: el impulso viaja desde la retina por el nervio óptico hasta el córtex visual, cruza al córtex motor y baja por la médula hasta los músculos de la mano en unos 200–300 ms promedio.",
          "Factores que alargan ese tiempo incluyen cansancio, falta de sueño, alcohol y distracción. Por eso verás variaciones notables entre tu primer intento del día y uno tras horas de trabajo frente a pantalla. La media de 5 intentos es más representativa que el mejor o el peor resultado individual."
        ],
        "citableSummary": "El tiempo de reacción humano promedio ante un estímulo visual oscila entre 200 y 300 ms; valores por debajo de 200 ms son propios de atletas o pilotos entrenados.",
        "bullets": [
          "Menos de 150 ms → rango élite (pilotos, jugadores profesionales de eSports)",
          "150–200 ms → excelente para deportistas entrenados",
          "200–280 ms → rango típico adulto saludable",
          "280–350 ms → normal en adultos mayores o con fatiga",
          "Más de 400 ms → posible señal de cansancio extremo o alteración"
        ]
      },
      {
        "heading": "Variaciones naturales y factores que afectan los resultados",
        "paragraphs": [
          "La hora del día importa: el pico de alerta cognitiva suele ocurrir entre las 10 AM y el mediodía, y de nuevo a media tarde. Hacer el test en esos momentos dará tu mejor marca. También importa la anticipación: si haces click antes de que el cuadro cambie, el test debe descartarlo como <em>falsa salida</em>, igual que en atletismo.",
          "El dispositivo influye: los monitores con tasa de refresco de 60 Hz añaden hasta 16,7 ms de latencia de pantalla inevitable; los de 144 Hz reducen eso a ~7 ms. Un mouse con cable tiene menos latencia que el touchpad. El resultado en móvil puede diferir 15–30 ms respecto al escritorio por la latencia táctil."
        ]
      },
      {
        "heading": "Cómo mejorar tu tiempo de reacción",
        "paragraphs": [
          "El entrenamiento específico con juegos de reacción visual (como este mismo test repetido diariamente) produce mejoras reales de 10–20 ms en 4–6 semanas, según estudios de neuroplasticidad. El mecanismo es la mielinización progresiva de vías nerviosas frecuentemente usadas.",
          "El sueño es el factor más potente: una noche con menos de 6 horas degrada el tiempo de reacción en un promedio de 15–30 ms. El café mejora el rendimiento solo si compensas déficit de sueño; sin deuda de sueño, el efecto es marginal y la ventana dura 3–4 horas."
        ]
      }
    ],
    "steps": [
      {
        "title": "Espera el cambio de color",
        "description": "No hagas click antes de tiempo. El cuadro cambiará en un momento aleatorio entre 1 y 4 segundos para evitar que anticipes."
      },
      {
        "title": "Haz click o toca la pantalla",
        "description": "Tan pronto como veas el cambio, reacciona. El tiempo se mide desde el instante exacto del cambio hasta tu input."
      },
      {
        "title": "Repite 5 veces",
        "description": "El promedio de 5 intentos elimina los valores atípicos (falsas salidas o distracciones) y te da una medida más representativa."
      },
      {
        "title": "Compara tu promedio",
        "description": "Usa la tabla de rangos para interpretar tu resultado. Vuelve en distintos momentos del día o tras dormir bien para ver la diferencia."
      }
    ]
  },
  "redimensionar-imagen": {
    "intro": "Redimensionar una imagen parece simple, pero hacerlo mal puede costar segundos de carga en tu sitio web o hacer que una foto se vea pixelada en Instagram. Esta herramienta procesa todo en tu navegador usando la <strong>Canvas API</strong>, sin subir nada a ningún servidor, lo que la hace ideal para imágenes con datos sensibles, documentos de identidad o fotos privadas.",
    "sections": [
      {
        "heading": "Tamaños recomendados por plataforma",
        "paragraphs": [
          "Para web en general, el ancho más común para imágenes de contenido es 800–1200 px; más allá es redundante en pantallas estándar de 96 dpi. Para <strong>Open Graph</strong> (preview en WhatsApp, Facebook) el tamaño óptimo es 1200 × 630 px, con una relación 1.91:1. Instagram feed acepta hasta 1080 × 1080 px (cuadrado) o 1080 × 1350 px (vertical 4:5).",
          "Para email marketing, imágenes de más de 600 px de ancho se cortarán en muchos clientes de correo. El peso importa tanto como las dimensiones: una foto de 3000 × 2000 px en JPG sin comprimir puede pesar 8 MB y dispara el tiempo de carga. La combinación ideal para web es JPG a calidad 75–85 con ancho no superior a 1200 px."
        ],
        "citableSummary": "Una imagen de 1200 px de ancho en JPG calidad 80 suele pesar entre 80 y 200 KB, suficiente para la mayoría de usos web sin sacrificar calidad visible.",
        "bullets": [
          "Open Graph / redes sociales: 1200 × 630 px",
          "Instagram cuadrado: 1080 × 1080 px",
          "Email marketing: máximo 600 px de ancho",
          "Blog / artículo web: 800–1200 px de ancho",
          "Miniatura / thumbnail: 300–400 px"
        ]
      },
      {
        "heading": "Proporciones y el riesgo de deformar la imagen",
        "paragraphs": [
          "Mantener la proporción original (aspect ratio) es crítico para evitar imágenes estiradas o achatadas. Si la foto original mide 4000 × 3000 px (relación 4:3) y la redimensionas a 800 × 800 px sin bloquear proporción, las caras quedarán deformadas. La herramienta ofrece la opción de <em>bloquear proporción</em>: al ingresar solo el ancho, calcula el alto automáticamente.",
          "En el caso de recortar a una proporción diferente (ej. de 4:3 a 1:1 para Instagram), el recorte ideal se hace antes del redimensionado para no perder resolución. Planifica primero la composición y luego ajusta el tamaño al destino."
        ]
      },
      {
        "heading": "Formato de salida: JPG vs PNG vs WebP",
        "paragraphs": [
          "<strong>JPG</strong> es ideal para fotografías: comprime muy bien y los artefactos de compresión son imperceptibles a calidad 80+. <strong>PNG</strong> es mejor para gráficos con texto, logos o cuando necesitas transparencia, porque es sin pérdida. <strong>WebP</strong> ofrece hasta 30% menos peso que JPG a igual calidad visual y soporta transparencia, pero algunos clientes de correo antiguos no lo muestran correctamente.",
          "Si tu destino es un sitio web moderno (WordPress ≥ 5.8, Shopify, etc.), WebP es la opción más eficiente. Para compartir por WhatsApp o imprimir, JPG calidad alta (85–95) es el estándar más compatible."
        ]
      }
    ],
    "steps": [
      {
        "title": "Sube tu imagen",
        "description": "Acepta JPG, PNG y WebP. La imagen no sale de tu dispositivo; el procesamiento ocurre completamente en el navegador."
      },
      {
        "title": "Define las dimensiones",
        "description": "Ingresa el ancho o alto deseado en píxeles. Activa 'mantener proporción' para que el otro valor se calcule automáticamente."
      },
      {
        "title": "Elige formato y calidad",
        "description": "Para fotos, JPG calidad 80 es el punto óptimo calidad/peso. Para logos o texto, usa PNG. Para web moderna, elige WebP."
      },
      {
        "title": "Descarga el resultado",
        "description": "Haz click en Descargar. El archivo procesado se guarda directamente en tu carpeta de descargas."
      }
    ]
  },
  "cara-cruz": {
    "intro": "Una moneda justa tiene exactamente 50% de probabilidad en cada lanzamiento, pero rara vez eso significa que obtendrás 10 caras seguidas o una distribución perfecta de 5-5 en 10 tiradas. Esta herramienta te permite lanzar una moneda virtual, llevar registro de las últimas 20 tiradas y observar cómo la distribución se acerca al 50/50 con más lanzamientos.",
    "sections": [
      {
        "heading": "La ley de los grandes números en acción",
        "paragraphs": [
          "La <strong>ley de los grandes números</strong> garantiza que, con suficientes lanzamientos, la proporción observada de caras se acercará al 50%. Pero en series cortas de 10 o 20 tiradas, es perfectamente normal ver 7 caras y 3 cruces: no hay sesgo, solo varianza natural. Esta herramienta te permite visualizar ese efecto en tiempo real.",
          "El generador utiliza <code>Math.random()</code> de JavaScript, que implementa un <em>generador de números pseudoaleatorios</em> (típicamente Xorshift128+ en V8/Chrome). Para decisiones casuales cotidianas, la calidad es más que suficiente. Para aplicaciones criptográficas o sorteos oficiales, se requieren generadores certificados (TRNG hardware)."
        ],
        "citableSummary": "En 1000 lanzamientos de una moneda justa, la probabilidad de que la proporción de caras caiga entre 47% y 53% es aproximadamente del 95%, ilustrando la convergencia estadística."
      },
      {
        "heading": "Usos reales de cara o cruz",
        "paragraphs": [
          "Decidir quién empieza un juego de mesa, elegir qué película ver, repartir una tarea entre dos personas, resolver un desacuerdo menor entre amigos: el lanzamiento de moneda funciona porque ambas partes aceptan el resultado como justo antes de conocerlo. Esto es lo que los economistas llaman un <em>mecanismo de coordinación</em>.",
          "En deportes, el lanzamiento de moneda es oficial: la UEFA la usa para desempate en competencias como la Champions League cuando los equipos están igualados en todos los criterios. El árbitro hace el lanzamiento físico, pero el principio estadístico es idéntico."
        ]
      },
      {
        "heading": "Rachas y la falacia del jugador",
        "paragraphs": [
          "Ver 5 caras seguidas no significa que la siguiente tirada es más probable que salga cruz. Cada lanzamiento es independiente: la moneda no tiene memoria. La <strong>falacia del jugador</strong> (también llamada falacia de Monte Carlo) es creer lo contrario, y es el origen de muchas malas decisiones en apuestas.",
          "El historial de las últimas 20 tiradas en esta herramienta sirve precisamente para observar ese fenómeno: las rachas ocurren con frecuencia estadísticamente esperada. Una racha de 6 iguales consecutivos tiene probabilidad de 1/64 (~1.56%), suficientemente común como para aparecer en sesiones de 100 lanzamientos."
        ]
      }
    ]
  },
  "previsualizador-serp": {
    "intro": "Antes de publicar cualquier página, vale la pena saber exactamente cómo se verá en los resultados de búsqueda de Google. Un título truncado pierde clics; una descripción cortada a la mitad transmite unprofesionalismo. Este previsualizador replica la presentación real de los snippets de Google, con indicadores de color que advierten cuando te acercas o superas los límites recomendados.",
    "sections": [
      {
        "heading": "Los límites reales de título y descripción",
        "paragraphs": [
          "Google no trunca por número de caracteres sino por <strong>ancho en píxeles</strong>: el título tiene aproximadamente 600 px disponibles en escritorio, lo que equivale a unas 55–65 letras latinas según el peso visual de cada carácter (la 'i' ocupa menos que la 'M'). La cifra de 60 caracteres es una convención útil pero imprecisa; el previsualizador aplica la medición por píxeles para mayor exactitud.",
          "La meta description no afecta directamente el ranking, pero sí la <em>tasa de clics (CTR)</em>. Google la muestra cuando considera que contiene el fragmento más relevante para la consulta del usuario; en caso contrario, extrae texto del cuerpo de la página. Escribir una buena meta description igual vale la pena: aparece en la mayoría de búsquedas de marca o informacionales."
        ],
        "citableSummary": "Google trunca los títulos de SERP alrededor de los 600 px de ancho, no a los 60 caracteres exactos; una 'W' en mayúscula ocupa el doble de espacio que una 'i' minúscula."
      },
      {
        "heading": "Cómo escribir un título que genere clics",
        "paragraphs": [
          "Los títulos más efectivos para CTR orgánico incluyen el <strong>keyword principal al inicio</strong> (los primeros 30 caracteres son los más visibles en móvil), un modificador de intención ('Guía completa', 'Paso a paso', 'Precios 2025') y, opcionalmente, el nombre de la marca al final separado por '|' o '–'. Evita el clickbait: Google puede reescribir el título si detecta discrepancia con el contenido de la página.",
          "Para páginas de producto en e-commerce mexicano, el formato que mejor convierte suele ser: <code>[Producto] [variante clave] – [tienda] | Envío gratis</code>. El término 'envío gratis' en el título puede incrementar el CTR entre 5 y 15% según pruebas A/B reportadas por agencias de CRO."
        ]
      },
      {
        "heading": "URL en los resultados: limpieza y legibilidad",
        "paragraphs": [
          "Google muestra la URL en formato <em>breadcrumb</em> desde 2020: en lugar de <code>ejemplo.com/categoria/subcategoria/pagina</code> aparece como <code>Ejemplo › Categoria › Subcategoria</code>. Esto hace que los URLs limpios y descriptivos sean más importantes que nunca para la percepción del usuario.",
          "En el previsualizador, ingresa la URL real que usarás para verificar que el breadcrumb se muestre de forma lógica. Evita parámetros UTM u otros query strings en la URL canónica: esos van solo en los enlaces de campaña, no en la URL que Google indexa."
        ]
      }
    ],
    "steps": [
      {
        "title": "Ingresa el título (title tag)",
        "description": "Escribe el contenido de tu etiqueta <title>. El indicador cambia a amarillo al acercarte a 55 chars y a rojo al superar los 60. Ajusta hasta quedar en verde."
      },
      {
        "title": "Escribe la meta description",
        "description": "Redacta una descripción de 120–155 caracteres que resuma el valor de la página e incluya una llamada a la acción implícita. El indicador te avisa si te excedes de 160."
      },
      {
        "title": "Agrega la URL de destino",
        "description": "Pega la URL canónica de tu página (sin parámetros UTM). El previsualizador mostrará el breadcrumb tal como lo presenta Google."
      },
      {
        "title": "Revisa el preview completo",
        "description": "Verifica que el snippet sea legible de un vistazo, que el título no quede cortado en un punto incómodo y que la descripción transmita claramente el propósito de la página."
      }
    ]
  },
  "contador-tokens": {
    "intro": "Los tokens son la unidad de cobro de los modelos de lenguaje como GPT-4o, Claude o Gemini: no equivalen a palabras ni a caracteres de forma directa, sino a fragmentos de texto determinados por el tokenizador de cada modelo. Saber cuántos tokens tiene tu prompt antes de enviarlo evita sorpresas en la factura y ayuda a optimizar textos largos para que entren en el contexto del modelo.",
    "sections": [
      {
        "heading": "¿Cómo se cuentan los tokens?",
        "paragraphs": [
          "En inglés, 1 token equivale aproximadamente a 0,75 palabras o 4 caracteres. En español, el ratio es ligeramente peor: las palabras con acentos, tildes y caracteres especiales suelen tokenizarse en 2 fragmentos donde en inglés sería 1. Una regla práctica: un texto en español de 1000 palabras tiene entre 1300 y 1500 tokens según el modelo.",
          "Cada modelo usa su propio tokenizador: <strong>GPT-4o y GPT-3.5 usan cl100k_base</strong> (tiktoken de OpenAI), Claude usa su propio tokenizador con vocabulario de ~50,000 piezas, y Gemini usa SentencePiece. Los conteos difieren hasta en un 10–15% para el mismo texto, lo que importa cuando optimizas prompts de sistema con muchos miles de tokens."
        ],
        "citableSummary": "Un texto en español de 1000 palabras ocupa aproximadamente 1300–1500 tokens en modelos como GPT-4o o Claude 3.5, por la mayor densidad de caracteres del idioma."
      },
      {
        "heading": "Ventanas de contexto y sus límites prácticos",
        "paragraphs": [
          "GPT-4o tiene una ventana de 128.000 tokens; Claude 3.5 Sonnet, 200.000 tokens; Gemini 1.5 Pro, hasta 2 millones. Pero el <em>contexto útil</em> es menor: los modelos pierden coherencia con textos muy largos (el llamado 'lost-in-the-middle' problem, documentado en papers de 2023). Para tareas de análisis, 32.000–50.000 tokens es un rango donde los modelos rinden bien.",
          "En batch jobs de OpenAI, procesar 1 millón de tokens con GPT-4o-mini cuesta aproximadamente $0,15 USD de entrada y $0,60 USD de salida a precios de 2025. Esta calculadora te ayuda a estimar ese costo antes de lanzar el job, especialmente cuando procesas cientos de documentos."
        ]
      },
      {
        "heading": "Casos prácticos para presupuestar antes de ejecutar",
        "paragraphs": [
          "Un desarrollador que quiere resumir 500 PDFs con GPT-4o puede pegar un texto de ejemplo, ver cuántos tokens ocupa, multiplicarlo por 500 y calcular el costo antes de correr el script. Un copy writer que escribe prompts de sistema largos para un chatbot puede verificar que el prompt base más el historial de conversación caben en el contexto sin truncarse.",
          "Para aplicaciones con RAG (Retrieval-Augmented Generation), cada fragmento recuperado añade tokens al prompt. Si tu fragmento promedio pesa 300 tokens y recuperas 5 fragmentos por consulta, estás añadiendo 1500 tokens fijos de contexto más el historial de chat. Visualizarlo ayuda a decidir cuántos fragmentos vale la pena recuperar."
        ],
        "bullets": [
          "GPT-4o: $2,50 / 1M tokens entrada · $10,00 / 1M tokens salida (precios 2025)",
          "GPT-4o-mini: $0,15 / 1M entrada · $0,60 / 1M salida",
          "Claude 3.5 Sonnet: $3,00 / 1M entrada · $15,00 / 1M salida",
          "Gemini 1.5 Pro: $1,25 / 1M entrada (≤128K) · $5,00 / 1M salida"
        ]
      }
    ]
  },
  "marca-agua-imagen": {
    "intro": "Agregar una marca de agua protege la autoría de tus fotos sin necesidad de software externo ni suscripciones. Esta herramienta procesa todo en el navegador con <strong>Canvas API</strong>: tu imagen nunca se sube a ningún servidor, lo que la hace especialmente útil para fotógrafos, ilustradores o equipos que manejan material visual confidencial antes de aprobación.",
    "sections": [
      {
        "heading": "Modo posición fija vs modo mosaico",
        "paragraphs": [
          "El <strong>modo posición fija</strong> coloca tu texto en una de las nueve posiciones clásicas (esquinas, bordes o centro). Es el estándar para fotografía profesional: el copyright queda visible sin tapar el sujeto principal de la imagen. La opción más común es la esquina inferior derecha con opacidad al 60–70%, suficientemente visible para ser detectada pero sin arruinar la composición.",
          "El <strong>modo mosaico</strong> (tile) repite el texto en diagonal por toda la imagen a intervalos regulares. Este formato hace prácticamente imposible eliminar la marca recortando o difuminando una esquina: se usaría para previews de stock photos, documentos confidenciales en revisión legal o imágenes de producto que aún no se han aprobado para publicación."
        ],
        "citableSummary": "El modo mosaico diagonal es la forma más robusta de protección visual: requiere edición píxel a píxel para eliminar la marca, lo que disuade el uso no autorizado en la práctica.",
        "bullets": [
          "Fotografía de autor: esquina inferior derecha, opacidad 60%, tamaño moderado",
          "Preview de stock: mosaico diagonal, alta opacidad (80%+), repetición densa",
          "Documento en revisión: mosaico con texto 'BORRADOR' o 'CONFIDENCIAL'",
          "Producto e-commerce en revisión: mosaico semitransparente con marca"
        ]
      },
      {
        "heading": "Configuración de tipografía y color",
        "paragraphs": [
          "El color blanco o negro con opacidad del 50–70% funciona sobre la mayoría de imágenes. Para fondos complejos con áreas mixtas claras y oscuras, usa blanco con sombra de texto o una combinación de dos capas. El ángulo de rotación de 30–45 grados en modo mosaico es estándar en la industria porque es difícil de eliminar automáticamente con herramientas de clonado.",
          "El tamaño de fuente ideal para posición fija depende del tamaño de salida de la imagen: para una foto de 2000 px de ancho, 24–36 px es visible sin dominar. Para thumbnails de 400 px, 12–16 px es suficiente. Ajusta siempre después de ver el resultado real, no solo la configuración."
        ]
      },
      {
        "heading": "Privacidad y procesamiento local",
        "paragraphs": [
          "A diferencia de servicios en línea como Canva o Adobe Express, esta herramienta no transmite la imagen a ningún servidor en ningún momento. Puedes verificarlo con las herramientas de desarrollador del navegador (pestaña Red): no habrá ninguna solicitud de subida de archivo. Esto la hace adecuada para imágenes médicas, legales o con información personal identificable.",
          "El archivo descargado es un JPG estándar generado directamente desde el canvas HTML5. La calidad de salida es alta (por defecto 90–95% en la mayoría de implementaciones), indistinguible de un export de Photoshop para uso web."
        ]
      }
    ],
    "steps": [
      {
        "title": "Sube la imagen base",
        "description": "Acepta JPG, PNG y WebP. La imagen se procesa localmente; ningún dato sale de tu navegador."
      },
      {
        "title": "Escribe el texto de la marca",
        "description": "Usa tu copyright (© 2025 Tu Nombre), nombre de marca o 'CONFIDENCIAL'. Máximo 50 caracteres para que sea legible."
      },
      {
        "title": "Elige modo y posición",
        "description": "Selecciona posición fija (esquina o centro) para uso editorial, o mosaico para protección máxima contra uso no autorizado."
      },
      {
        "title": "Ajusta tipografía, color y opacidad",
        "description": "Combina tamaño, ángulo y opacidad hasta que la marca sea claramente visible sin destruir la imagen. Vista previa en tiempo real."
      },
      {
        "title": "Descarga la imagen protegida",
        "description": "El resultado se descarga como JPG de alta calidad directamente desde el navegador."
      }
    ]
  },
  "generador-utm": {
    "intro": "Sin parámetros UTM, Google Analytics 4 agrupa buena parte del tráfico de campañas bajo 'Direct' o '(not provided)', haciendo imposible saber qué anuncio, email o post en redes trajo realmente las conversiones. Este generador construye URLs con parámetros UTM correctamente formateados en segundos, con sugerencias de valores estándar para evitar los errores de nomenclatura que fragmentan los reportes.",
    "sections": [
      {
        "heading": "Los cinco parámetros UTM y cuándo usarlos",
        "paragraphs": [
          "<strong>utm_source</strong> identifica el origen (google, facebook, newsletter, instagram). <strong>utm_medium</strong> es el tipo de canal (cpc, organic, social, email, referral). <strong>utm_campaign</strong> es el nombre de tu campaña (black-friday-2025, lanzamiento-curso-marzo). Estos tres son obligatorios para cualquier análisis serio. Los otros dos son opcionales pero útiles.",
          "<strong>utm_term</strong> se usa en Google Ads para identificar la keyword que disparó el anuncio (aunque GA4 lo recibe automáticamente si vinculas las cuentas). <strong>utm_content</strong> diferencia creativos o variantes dentro de la misma campaña: si tienes dos versiones de un banner, ponles <code>utm_content=banner-azul</code> y <code>utm_content=banner-verde</code> para identificar cuál convierte mejor."
        ],
        "citableSummary": "utm_source, utm_medium y utm_campaign son los tres parámetros esenciales; sin los tres, los informes de adquisición en GA4 quedan fragmentados y poco accionables."
      },
      {
        "heading": "Errores comunes que contaminan los datos",
        "paragraphs": [
          "El error más costoso es la inconsistencia en mayúsculas: <code>utm_source=Facebook</code> y <code>utm_source=facebook</code> aparecen como dos fuentes distintas en GA4. La regla de oro es <strong>siempre minúsculas y sin espacios</strong>; usa guiones para separar palabras en campaña (black-friday, no Black Friday ni black_friday).",
          "Otro error frecuente es agregar UTMs a URLs internas del sitio. Si un botón de 'Compra ahora' en tu home lleva a <code>/checkout/?utm_source=home&utm_medium=cta</code>, GA4 reiniciará la sesión y atribuirá esa visita a 'home/cta' en lugar de al canal de adquisición original. Los UTMs van solo en URLs que entran desde fuera del sitio."
        ]
      },
      {
        "heading": "Nomenclatura estándar para Meta Ads y Email",
        "paragraphs": [
          "Para Meta Ads (Facebook e Instagram), el formato recomendado es: <code>utm_source=facebook&utm_medium=cpc&utm_campaign=nombre-campaña&utm_content=nombre-conjunto</code>. Meta también soporta parámetros dinámicos como <code>{{campaign.name}}</code> que se populan automáticamente en la URL.",
          "Para newsletters y flujos de email, el estándar es <code>utm_source=newsletter&utm_medium=email</code> con <code>utm_campaign</code> indicando la edición o nombre del flujo (<code>bienvenida-dia3</code>, <code>abandono-carrito</code>). Plataformas como Mailchimp y Klaviyo tienen UTM automáticos, pero configurarlos manualmente te da control total sobre la nomenclatura."
        ]
      }
    ],
    "steps": [
      {
        "title": "Ingresa la URL de destino",
        "description": "La URL canónica de tu landing page, sin parámetros UTM previos. Si ya tiene query strings, el generador los preserva y agrega los UTM al final."
      },
      {
        "title": "Define source y medium",
        "description": "Elige entre las sugerencias rápidas (google, facebook, instagram, newsletter) o escribe valores propios. Usa siempre minúsculas."
      },
      {
        "title": "Nombra tu campaña",
        "description": "Usa guiones en lugar de espacios: black-friday-2025, lanzamiento-v2, reactivacion-inactivos. Sé específico para poder filtrar en GA4."
      },
      {
        "title": "Agrega term y content (opcional)",
        "description": "Útil en Google Ads para keywords o para diferenciar creativos A/B dentro de la misma campaña."
      },
      {
        "title": "Copia la URL generada",
        "description": "La URL final incluye todos los parámetros codificados correctamente. Pruébala en el navegador para verificar que la página de destino cargue sin errores."
      }
    ]
  },
  "calculadora-prestamo": {
    "intro": "El sistema francés de amortización es el estándar en la mayoría de préstamos personales, hipotecas y créditos automotrices en México, Argentina, Colombia y Perú. La cuota mensual es fija durante todo el plazo, pero la proporción entre capital e interés cambia cada mes: al inicio pagas más intereses; al final, más capital. Esta calculadora muestra esa distribución mes a mes en una tabla completa.",
    "sections": [
      {
        "heading": "La fórmula francesa y por qué la cuota es fija",
        "paragraphs": [
          "La cuota mensual fija (PMT) se calcula con la fórmula: <code>PMT = P × [r(1+r)^n] / [(1+r)^n – 1]</code>, donde P es el capital prestado, r es la tasa mensual (tasa anual ÷ 12) y n es el número de cuotas. El resultado es una cuota constante que cubre intereses decrecientes más capital creciente, terminando con saldo cero exacto en el último pago.",
          "Por ejemplo, un préstamo de MX$100.000 a 24 meses con tasa anual del 18% (1,5% mensual) genera una cuota de MX$4.992/mes. El primer mes pagas MX$1.500 de intereses y MX$3.492 de capital; el mes 24 pagas MX$74 de intereses y MX$4.918 de capital. El total de intereses pagados es MX$19.808, un 19,8% extra sobre el capital original."
        ],
        "citableSummary": "En el sistema francés, las primeras cuotas de un préstamo tienen hasta un 70–80% de componente de interés; ese porcentaje se invierte progresivamente hacia el final del plazo."
      },
      {
        "heading": "Comparar plazos: el costo real de alargar el crédito",
        "paragraphs": [
          "Alargar el plazo reduce la cuota mensual pero aumenta significativamente el total de intereses. Con el mismo ejemplo de MX$100.000 al 18% anual: a 12 meses la cuota es MX$9.168/mes y los intereses totales son MX$10.016; a 48 meses la cuota baja a MX$2.937/mes pero los intereses totales suben a MX$40.976. El préstamo a 4 años cuesta 4 veces más en intereses que el de 1 año.",
          "La tabla de amortización ayuda a tomar decisiones informadas: ¿vale la pena pagar cuotas más altas para terminar antes? ¿Cuánto ahorro si hago un pago anticipado en el mes 12? Muchos contratos permiten prepagos que reducen el capital y acortan el plazo sin penalización."
        ]
      },
      {
        "heading": "Tasas en México y la región: referencias 2025",
        "paragraphs": [
          "En México, las tasas de préstamos personales de bancos como BBVA o Santander oscilan entre 18% y 36% anual (CAT promedio 30–60% para algunos productos). Las cajas de ahorro y cooperativas suelen ofrecer tasas menores para sus socios. Las <strong>plataformas fintech</strong> como Konfío o Kueski ofrecen tasas más variables según el perfil crediticio.",
          "Para hipotecas en México (crédito INFONAVIT, FOVISSSTE o bancario), las tasas fijas son actualmente 9–13% anual en pesos. Para Argentina, Colombia y Perú, los rangos varían sustancialmente; usa la tasa nominal anual indicada en tu contrato y conviértela a mensual dividiéndola entre 12 para ingresar en la calculadora."
        ],
        "bullets": [
          "Préstamo personal banco MX: 18–36% anual típico",
          "Hipoteca INFONAVIT MX: 10–12% anual fija",
          "Crédito automotriz MX: 10–20% anual",
          "Para convertir: tasa mensual = tasa anual ÷ 12"
        ]
      }
    ]
  },
  "pomodoro": {
    "intro": "La técnica Pomodoro fue desarrollada por Francesco Cirillo a finales de los años 80 con un temporizador de cocina con forma de tomate (<em>pomodoro</em> en italiano). El principio es simple pero efectivo: trabajar con foco total durante 25 minutos, descansar 5, y cada 4 ciclos tomar una pausa larga. Esta estructura reduce la procrastinación y mejora la calidad de la concentración porque el cerebro trabaja mejor con límites de tiempo definidos.",
    "sections": [
      {
        "heading": "Por qué 25 minutos es el intervalo óptimo",
        "paragraphs": [
          "La duración de 25 minutos no es arbitraria: coincide aproximadamente con el tiempo en que la concentración sostenida en adultos comienza a degradarse sin un sistema de refuerzo externo. Investigaciones en psicología cognitiva sugieren que los períodos de atención profunda (lo que Cal Newport llama <em>deep work</em>) tienen un techo natural de 60–90 minutos, y bloques de 25 minutos permiten acumular varias unidades dentro de ese techo sin agotarse.",
          "Las pausas de 5 minutos permiten que el cerebro consolide lo que procesó (hay evidencia de que las pausas activan el sistema de memoria por defecto) y reducen la fatiga de decisión acumulada. Sin pausas programadas, el rendimiento cognitivo cae gradualmente y se recupera mal."
        ],
        "citableSummary": "El uso del temporizador Pomodoro reduce el tiempo percibido como perdido en un 40% según el propio Cirillo, al crear urgencia positiva que disuade las distracciones."
      },
      {
        "heading": "Adaptaciones frecuentes de la técnica",
        "paragraphs": [
          "Muchos profesionales adaptan los tiempos base: 50 minutos de trabajo + 10 de pausa (el formato 50/10) funciona mejor para trabajo creativo profundo donde el arranque cuesta más. El formato 90/20 se alinea con los ciclos ultradianos naturales del cerebro. Lo importante es mantener el principio de límites explícitos y descansos estructurados.",
          "Para programadores o escritores, una variación popular es completar un <em>bloque de tarea específica</em> antes de que suene el timer si estás en el medio de un flujo: el timer como señal de revisión, no de interrupción obligatoria. Lo que no funciona es ignorar las pausas: la fatiga cognitiva acumulada es el principal enemigo de la productividad sostenida."
        ]
      },
      {
        "heading": "El contador de pomodoros como métrica de productividad",
        "paragraphs": [
          "El número de pomodoros completados por día es una métrica más honesta que las horas sentado frente al escritorio. Conocer tu capacidad real (¿cuántos pomodoros de trabajo real hago en un día típico?) permite planificar proyectos de forma más realista. Cirillo usaba el conteo como herramienta de estimación: si una tarea requirió 6 pomodoros la primera vez, las siguientes tareas similares deberían planificarse con ese benchmark.",
          "Este temporizador lleva el conteo automáticamente y marca la pausa larga de 15 minutos cada 4 ciclos completados. El sonido de alerta usa el <code>Web Audio API</code> del navegador, sin archivos externos, así que funciona aunque la pestaña esté en segundo plano (en la mayoría de navegadores modernos)."
        ]
      }
    ],
    "steps": [
      {
        "title": "Define tu tarea",
        "description": "Antes de iniciar, escribe en papel o en un documento la tarea específica que completarás en este pomodoro. La claridad de objetivo reduce la fricción para empezar."
      },
      {
        "title": "Inicia el temporizador de 25 minutos",
        "description": "Haz click en Play. El contador regresa de 25:00 a 00:00. Durante este tiempo, cierra notificaciones, redes sociales y email."
      },
      {
        "title": "Trabaja hasta que suene la alarma",
        "description": "Si surge una distracción o idea ajena a la tarea, anótala rápidamente y vuelve al foco. El registro evita que pierdas la idea sin interrumpir el bloque."
      },
      {
        "title": "Toma la pausa de 5 minutos",
        "description": "Levántate, estira, bebe agua. No revises email ni redes: la pausa es para el cerebro, no para cambiar de tipo de trabajo cognitivo."
      },
      {
        "title": "Pausa larga tras 4 pomodoros",
        "description": "El temporizador la activa automáticamente. Usa los 15 minutos para una caminata corta, comer algo o simplemente no hacer nada: la recuperación profunda mejora la calidad de los siguientes bloques."
      }
    ]
  },
  "slug-generator": {
    "intro": "Un slug URL mal formado puede costarle ranking a una página antes de que Google la indexe: los caracteres con acentos, los espacios codificados como %20 y los stopwords redundantes generan URLs largas y difíciles de leer que reducen el CTR en SERP. Este generador produce slugs limpios, SEO-friendly y compatibles con todos los CMS principales, siguiendo el mismo criterio que aplica el plugin Yoast SEO en WordPress.",
    "sections": [
      {
        "heading": "Qué hace exactamente el generador",
        "paragraphs": [
          "El proceso tiene varios pasos en cadena: primero normaliza el texto a <strong>NFD Unicode</strong> para separar letras de sus diacríticos (á → a + ́), luego elimina los diacríticos con una expresión regular, después convierte a minúsculas, reemplaza espacios y caracteres no alfanuméricos por el separador elegido (guión por defecto), y finalmente recorta separadores dobles o al inicio/fin del string.",
          "La eliminación de stopwords es opcional porque no siempre mejora el SEO: <code>/que-es-el-marketing-digital/</code> es más legible que <code>/marketing-digital/</code> en algunos contextos, y el URL legible tiene valor para el CTR. En cambio, para URLs muy largas que superan los 70–80 caracteres, eliminar artículos y preposiciones sí ayuda sin perder coherencia semántica."
        ],
        "citableSummary": "Google lee los guiones en URLs como separadores de palabras; los underscores no se interpretan como separadores, haciendo que 'zapatos_deportivos' se trate como una sola palabra en lugar de dos."
      },
      {
        "heading": "Guiones vs underscores: la diferencia que sí importa",
        "paragraphs": [
          "John Mueller de Google confirmó en múltiples ocasiones que los <strong>guiones (-) son separadores de palabras para Googlebot</strong>, mientras que los underscores (_) no lo son. Esto significa que <code>/zapatos-deportivos/</code> es indexado con dos keywords ('zapatos' y 'deportivos'), mientras que <code>/zapatos_deportivos/</code> puede tratarse como una sola palabra compuesta.",
          "La excepción son algunos contextos técnicos donde los underscores son convención: variables de código en documentación, nombres de archivos en sistemas Unix, o identificadores en APIs. Para páginas web de contenido, siempre usa guiones."
        ]
      },
      {
        "heading": "Longitud óptima y estructura de URL",
        "paragraphs": [
          "No existe un límite técnico estricto impuesto por Google, pero los URLs más cortos (3–5 palabras clave) generan mayor CTR en los resultados de búsqueda porque son más legibles a primera vista. URLs con más de 100 caracteres no solo lucen mal en SERP, sino que pueden truncarse en algunos clientes de email o sistemas de seguimiento.",
          "Para estructuras con categorías, el patrón <code>/categoria/subcategoria/slug/</code> es preferible a slug plano solo cuando la jerarquía aporta contexto semántico. Agregar el año en el slug (<code>/guia-utm-2025/</code>) puede darte ranking en consultas con modificador temporal, pero obliga a actualizar o redirigir el URL cuando cambies el año."
        ]
      }
    ]
  },
  "filtros-imagen": {
    "intro": "Los filtros de imagen ya no son exclusivos de apps como Instagram o VSCO. Esta herramienta aplica hasta 10 presets profesionales y 8 controles manuales directamente en tu navegador con <strong>Canvas API</strong>, sin instalar nada y sin que la imagen salga de tu dispositivo. Ideal para preparar fotos de producto, imágenes para redes sociales o material visual para blogs antes de publicar.",
    "sections": [
      {
        "heading": "Los 10 presets y cuándo usar cada uno",
        "paragraphs": [
          "<strong>B&N</strong> (blanco y negro): desatura completamente la imagen; funciona mejor con fotos de alto contraste o retratos donde quieres eliminar la distracción del color. <strong>Sepia</strong>: añade un tono cálido marrón-dorado que evoca fotografía antigua; útil para contenido editorial o histórico. <strong>Vintage</strong>: combina saturación reducida, viñeta sutil y tono ligeramente amarillo; popular para contenido de moda o lifestyle. <strong>Polaroid</strong>: simula el revelado instantáneo con colores suavizados y contraste particular; funciona bien para contenido casual y orgánico en Instagram.",
          "<strong>Frío</strong>: desplaza el balance de blancos hacia azules; ideal para fotografía de arquitectura, paisajes nevados o contenido tecnológico. <strong>Cálido</strong>: lo contrario, tira hacia amarillos y naranjas; perfecto para gastronomía, atardeceres o contenido de viajes. <strong>Drama</strong>: alto contraste y saturación intensa; para fotografía de moda o estilos editoriales impactantes. <strong>Dreamy</strong>: bajo contraste, colores pasteles y suavidad; para contenido de bodas, maternidad o estética vintage suave."
        ],
        "citableSummary": "Los filtros de imagen no solo cambian estética: aplicar el mismo filtro consistentemente a todas las imágenes de un perfil de Instagram genera identidad visual reconocible, lo que aumenta el engagement un 30% en promedio según estudios de social media."
      },
      {
        "heading": "Controles manuales: más allá de los presets",
        "paragraphs": [
          "El <strong>brillo</strong> afecta la luminosidad global; ajustes menores de ±10 son suficientes para corregir fotos subexpuestas o sobreexpuestas sin distorsionar los colores. El <strong>contraste</strong> separa luces y sombras: subirlo demasiado quema las altas luces; lo ideal es combinar contraste moderado con un ajuste de brillo compensatorio.",
          "La <strong>saturación</strong> controla la intensidad de los colores: reducirla al 80% da un look más editorial y menos 'de cámara'; subirla al 120–130% hace que los colores de comida o naturaleza se vean más vivos y apetecibles. El <strong>blur</strong> es útil para crear un efecto de profundidad de campo artificial, aunque su aplicación es global, no selectiva como en editores avanzados."
        ]
      },
      {
        "heading": "Privacidad y calidad del resultado",
        "paragraphs": [
          "Todo el procesamiento usa <code>CSS filters</code> y manipulación directa de píxeles via Canvas API. No hay comunicación con ningún servidor externo en ningún paso. Puedes verificar esto con las DevTools de Chrome (pestaña Red filtrada por XHR/Fetch): no aparecerá ninguna solicitud de carga de imagen.",
          "La calidad de descarga es JPG alta. Una advertencia técnica: cada aplicación de filtro y reexportación a JPG añade artefactos de compresión acumulados. Si necesitas aplicar múltiples rondas de edición, parte siempre del archivo original, no del resultado previamente filtrado."
        ]
      }
    ],
    "steps": [
      {
        "title": "Sube tu foto",
        "description": "Arrastra o selecciona una imagen JPG, PNG o WebP. La foto no se envía a ningún servidor."
      },
      {
        "title": "Prueba los presets con un click",
        "description": "Los 10 presets se aplican instantáneamente en la vista previa. Haz click en cada uno para comparar antes de decidir."
      },
      {
        "title": "Afina con controles manuales",
        "description": "Después de elegir un preset, ajusta brillo, contraste y saturación al gusto. Pequeñas correcciones (±10–20) producen grandes diferencias."
      },
      {
        "title": "Descarga la imagen editada",
        "description": "El resultado se descarga como JPG de alta calidad. Siempre guarda también el archivo original para reediciones futuras."
      }
    ]
  },
  "calculadora-embarazo": {
    "intro": "La fecha probable de parto (FPP) es una de las primeras informaciones que necesita una embarazada, y la regla de Naegele es el método estándar utilizado en obstetricia desde el siglo XIX: suma 280 días (40 semanas) a la fecha de la última menstruación (FUM). Esta calculadora aplica esa fórmula y además sitúa el embarazo en su semana actual, trimestre e hitos clínicos relevantes.",
    "sections": [
      {
        "heading": "La regla de Naegele y sus fundamentos",
        "paragraphs": [
          "La regla de Naegele asume un ciclo menstrual regular de 28 días y ovulación en el día 14. En la práctica, la mayoría de los embarazos de término ocurren entre las semanas 39 y 41: solo el 5% de los bebés nacen exactamente en la FPP calculada. Esta variabilidad normal hace que la fecha se llame 'probable' y no 'exacta'.",
          "Para mujeres con ciclos irregulares o que no recuerdan la FUM con precisión, la ecografía del primer trimestre (antes de las 14 semanas) ofrece una datación más precisa basada en la medición de la longitud cráneo-caudal (LCC) del embrión. En caso de discrepancia mayor a 7 días entre la fecha por FUM y la fecha por ecografía, los obstetras generalmente adoptan la fecha ecográfica como referencia."
        ],
        "citableSummary": "La regla de Naegele calcula la FPP como FUM + 280 días; el rango de parto 'a término' va de las 37 a las 42 semanas completas de gestación según la OMS."
      },
      {
        "heading": "Los tres trimestres y sus hitos principales",
        "paragraphs": [
          "El <strong>primer trimestre</strong> va de la semana 1 a la 12. Los hitos más importantes son la ecografía de las 11–14 semanas (translucencia nucal para screening de trisomías) y los análisis de sangre de primer trimestre. Es el período de mayor riesgo de aborto espontáneo: más del 80% de los abortos ocurren en esta etapa.",
          "El <strong>segundo trimestre</strong> abarca las semanas 13 a 26. La ecografía morfológica de las 20 semanas es el estudio más completo: revisa todos los órganos fetales, placenta y líquido amniótico. A las 24 semanas se alcanza el umbral de <em>viabilidad</em>: con cuidados intensivos neonatales intensivos, la supervivencia supera el 50%. El <strong>tercer trimestre</strong> (semanas 27–40+) incluye la ecografía de las 32 semanas (crecimiento y posición fetal), el test de estreptococo del grupo B entre semanas 35 y 37, y el monitoreo final hasta el parto."
        ]
      },
      {
        "heading": "Cálculo desde distintos puntos de partida",
        "paragraphs": [
          "La herramienta permite calcular desde tres puntos: la <strong>FUM</strong> (más común), la <strong>fecha de concepción</strong> (útil en fertilización in vitro, donde se conoce la fecha exacta de transferencia embrionaria) o la <strong>fecha probable de parto</strong> (para calcular cuántas semanas lleva el embarazo si ya conoces la FPP de tu médico).",
          "En el caso de FIV, la edad gestacional se cuenta de forma diferente: para embriones de día 5 (blastocisto), la edad gestacional equivale a la fecha de transferencia + 14 días de diferencia convencional + 5 días de cultivo, lo que da la 'FUM equivalente' desde la que se hacen todos los cálculos. Tu especialista en reproducción te indicará la edad gestacional exacta desde la primera consulta."
        ],
        "bullets": [
          "Semana 12: ecografía translucencia nucal + análisis de sangre",
          "Semana 20: ecografía morfológica",
          "Semana 24: umbral de viabilidad fetal",
          "Semana 28: inicio del tercer trimestre",
          "Semana 37: inicio del término; parto prematuro tardío antes de esta fecha",
          "Semana 40: FPP estimada",
          "Semana 42: límite de embarazo prolongado, se indica inducción"
        ]
      }
    ]
  },
  "buscador-emojis": {
    "intro": "Buscar un emoji por nombre en el teclado del celular puede tomar más tiempo del que parece cuando no recuerdas exactamente cómo está clasificado. Este buscador permite encontrar emojis por nombre en español o por tags asociados ('fuego', 'amor', 'risa'), organizados en 11 categorías con copia al portapapeles con un solo click, listos para pegar en WhatsApp, Instagram, email o cualquier aplicación.",
    "sections": [
      {
        "heading": "Búsqueda por tags en español",
        "paragraphs": [
          "La ventaja de buscar por tags es que no necesitas saber el nombre técnico del emoji. Escribir 'fiesta' puede mostrar 🎉 🥳 🪅 🎊 aunque sus nombres oficiales en inglés sean 'party popper', 'partying face' o 'confetti ball'. Los tags en español permiten buscar por concepto, emoción o contexto en lugar de memorizar nomenclatura.",
          "La categoría de <strong>banderas</strong> incluye los países de habla hispana más frecuentes: México 🇲🇽, España 🇪🇸, Argentina 🇦🇷, Colombia 🇨🇴, Perú 🇵🇪, Chile 🇨🇱, Venezuela 🇻🇪, y también EUA 🇺🇸 por su relevancia en comunicaciones regionales. Para emojis de banderas de países menos comunes, el teclado nativo del sistema operativo es más completo."
        ],
        "citableSummary": "Los emojis de caras y corazones representan más del 60% del uso total en mensajería según análisis de Unicode Consortium; los 10 más usados en español incluyen 😂 ❤️ 🙏 😊 🔥 👍 😭 😍 💪 🤣."
      },
      {
        "heading": "Compatibilidad entre plataformas y versiones",
        "paragraphs": [
          "Un mismo emoji se renderiza diferente en iOS, Android, Windows y macOS. El 😂 de Apple tiene sombra y brillos; el de Google es más plano y satinado. Esta diferencia es puramente cosmética: el carácter Unicode subyacente es idéntico (U+1F602) y funciona igual en todas las plataformas modernas.",
          "Los emojis más nuevos (Unicode 15.0 y 15.1, de 2022 y 2023) como 🫨 (cara sacudida) o 🙂‍↔️ (cabeza moviéndose) pueden mostrarse como cuadrados o interrogaciones en dispositivos con sistemas operativos anteriores a Android 14 o iOS 17.4. Para uso profesional o en comunicaciones formales, es más seguro usar emojis del rango Unicode 12 o anterior."
        ]
      },
      {
        "heading": "Emojis en marketing digital y SEO",
        "paragraphs": [
          "En asuntos de email marketing, algunos estudios reportan un aumento del 25–35% en tasas de apertura cuando el asunto incluye un emoji relevante. La clave es que sea coherente con el tono de marca: funciona para marcas casuales, no para comunicaciones corporativas formales.",
          "En SEO, Google muestra emojis en los títulos de los resultados de búsqueda desde 2015, aunque de forma inconsistente. Plataformas como Twitter/X y LinkedIn sí los muestran en las vistas previas de enlaces. Para metadescripciones, un emoji al inicio puede aumentar el CTR orgánico al hacer el resultado más llamativo visualmente en la SERP."
        ]
      }
    ]
  },
  "cronometro": {
    "intro": "El cronómetro online de Toolram mide tiempo con precisión de centésimas de segundo y sigue corriendo aunque cambies de pestaña o minimices la ventana del navegador, algo que los cronómetros básicos del sistema operativo no siempre garantizan en segundo plano.",
    "sections": [
      {
        "heading": "Precisión real y funcionamiento en segundo plano",
        "paragraphs": [
          "La herramienta usa la API <code>performance.now()</code> del navegador, que no depende del reloj de sistema y resiste los ajustes de hora automáticos (NTP). Eso significa que si arrancás un entrenamiento de 45 minutos y el sistema sincroniza la hora en ese lapso, el tiempo medido no salta.",
          "El cronómetro también mantiene la cuenta cuando el navegador suspende el tab en dispositivos móviles, recalculando el tiempo transcurrido al volver al foco. Útil si usás el teléfono durante una sesión de estudio Pomodoro y recibís notificaciones."
        ],
        "citableSummary": "La API performance.now() garantiza medición continua sin saltos por sincronización NTP, incluso con el tab en segundo plano."
      },
      {
        "heading": "Vueltas (laps): cómo registrar tiempos parciales",
        "paragraphs": [
          "Cada vez que presionás <strong>Vuelta</strong>, el cronómetro registra el tiempo parcial de esa vuelta <em>y</em> el tiempo acumulado total, los dos en simultáneo. Esto imita el funcionamiento de los relojes deportivos profesionales: sabés cuánto tardaste la vuelta 3 y también el tiempo total al terminar la vuelta 3.",
          "Al exportar, obtenés un archivo CSV con columna de vuelta, tiempo parcial y acumulado, listo para pegar en Excel o Google Sheets y calcular promedios. Ideal para coaches de atletismo, entrenadores de natación o cualquier disciplina donde analizar variaciones de vuelta a vuelta marca la diferencia."
        ],
        "bullets": [
          "Hasta 999 vueltas por sesión",
          "CSV incluye lap number, split time y elapsed time",
          "Resolución de 10 milisegundos (centésimas)"
        ]
      },
      {
        "heading": "Casos de uso frecuentes",
        "paragraphs": [
          "Más allá del deporte, el cronómetro online es popular para medir tiempo de cocción exacto (un sous-vide a 57 °C por 90 minutos no tolera mucho error), controlar tiempos de presentaciones académicas con límite estricto, o hacer pruebas de performance manual en interfaces antes de configurar herramientas automatizadas.",
          "Los equipos de desarrollo también lo usan para medir cuánto tarda una query lenta antes y después de agregar un índice, sin necesidad de abrir DevTools en el servidor."
        ]
      },
      {
        "heading": "Pausa, reset y sin registro de datos",
        "paragraphs": [
          "El botón de pausa congela la medición sin perder las vueltas ya registradas. El reset limpia todo y vuelve a cero, incluyendo la tabla de laps. La herramienta no envía ningún tiempo al servidor: todo corre localmente en tu navegador.",
          "No se requiere cuenta, no hay anuncios que interrumpan y no se guarda historial en ninguna base de datos externa. Al cerrar la pestaña, los datos desaparecen, lo cual es la conducta esperada para una herramienta de medición de sesión."
        ]
      }
    ],
    "steps": [
      {
        "title": "Iniciar",
        "description": "Presioná el botón verde <strong>Iniciar</strong> para comenzar la cuenta. El contador arranca desde 00:00:00.00."
      },
      {
        "title": "Registrar vueltas",
        "description": "Presioná <strong>Vuelta</strong> cada vez que quieras marcar un tiempo parcial. Aparece una nueva fila en la tabla con el tiempo de esa vuelta y el acumulado."
      },
      {
        "title": "Pausar y reanudar",
        "description": "Presioná <strong>Pausa</strong> para detener sin perder el registro. Volvé a presionar para continuar desde donde quedó."
      },
      {
        "title": "Exportar CSV",
        "description": "Cuando termines, presioná <strong>Exportar CSV</strong> para descargar el registro de vueltas con columnas lap, split y elapsed."
      }
    ]
  },
  "convertir-imagen": {
    "intro": "La herramienta de conversión de imágenes de Toolram convierte entre JPG, PNG y WebP directamente en el navegador: ningún archivo sale de tu dispositivo hacia un servidor externo. Es especialmente útil para preparar imágenes web con el mejor equilibrio entre calidad y peso.",
    "sections": [
      {
        "heading": "Cuándo elegir cada formato",
        "paragraphs": [
          "<strong>WebP</strong> es el formato ganador para la web moderna: produce archivos 25-35% más livianos que JPG equivalente a la misma calidad visual percibida, y además soporta transparencia (canal alfa), algo que JPG no puede hacer. Chrome, Firefox, Safari y Edge lo soportan desde hace años, por lo que hoy cubre más del 95% del tráfico web global.",
          "<strong>PNG</strong> es compresión sin pérdida: la imagen se reconstruye píxel a píxel exacta al original. Esto lo hace imprescindible para logos con fondo transparente, capturas de pantalla de texto, diseño gráfico e imágenes con bordes nítidos donde la compresión con pérdida genera artefactos visibles. Un PNG puede pesar 3-8× más que un WebP equivalente, así que solo usalo cuando la fidelidad exacta sea crítica.",
          "<strong>JPG</strong> sigue siendo el estándar universal para fotografías porque ningún visor o sistema lo rechaza. Si necesitás compartir una foto con alguien que no usa herramientas técnicas, JPG es la opción más segura."
        ],
        "citableSummary": "WebP pesa 25-35% menos que JPG con igual calidad y soporta transparencia; PNG es sin pérdida pero más pesado; JPG es el formato de máxima compatibilidad para fotografías."
      },
      {
        "heading": "Control de calidad y tamaño resultante",
        "paragraphs": [
          "Al convertir a WebP o JPG podés ajustar la calidad con un deslizador de 1 a 100. Un valor de 80 es el punto óptimo para la mayoría de imágenes web: la diferencia visual respecto a 100 es imperceptible a ojo desnudo, pero el archivo pesa entre 40-60% menos. Valores por debajo de 60 empiezan a mostrar artefactos notables en zonas de degradado.",
          "La conversión a PNG ignora el control de calidad porque PNG siempre guarda sin pérdida. Lo que sí influye es el nivel de compresión interno (de 0 a 9), que afecta el tiempo de procesamiento pero no la calidad visual."
        ],
        "bullets": [
          "Calidad 80 = equilibrio óptimo peso/calidad para web",
          "PNG siempre es sin pérdida, WebP y JPG tienen compresión configurable",
          "La conversión ocurre 100% en el navegador vía Canvas API"
        ]
      },
      {
        "heading": "Privacidad y limitaciones técnicas",
        "paragraphs": [
          "La conversión usa la <code>Canvas API</code> del navegador. La imagen se dibuja en un canvas HTML5 y se extrae con <code>canvas.toBlob()</code> en el formato destino. Ningún byte de tu imagen viaja a internet: todo es procesamiento local.",
          "La limitación principal es la memoria RAM del dispositivo. Imágenes superiores a 30 megapíxeles (por ejemplo, RAW de cámaras mirrorless modernas) pueden causar que el navegador cancele la operación en equipos con poca RAM. Para esos casos, una herramienta de escritorio como ImageMagick o Squoosh en modo local es más apropiada."
        ]
      }
    ],
    "steps": [
      {
        "title": "Seleccionar imagen",
        "description": "Arrastrá tu imagen al área marcada o hacé clic para abrir el selector de archivos. Se admiten JPG, PNG y WebP."
      },
      {
        "title": "Elegir formato destino",
        "description": "Seleccioná JPG, PNG o WebP en el menú desplegable. Si elegís JPG o WebP, aparece el control de calidad."
      },
      {
        "title": "Ajustar calidad",
        "description": "Mové el deslizador de calidad. Un valor de 80 es ideal para imágenes web. Para PNG este paso no aplica."
      },
      {
        "title": "Descargar",
        "description": "Presioná <strong>Convertir y descargar</strong>. El archivo se guarda automáticamente con el nombre original y la nueva extensión."
      }
    ]
  },
  "dados": {
    "intro": "El lanzador de dados virtual de Toolram replica con precisión estadística el comportamiento de dados físicos usando el generador de números pseudoaleatorios criptográficamente seguro del navegador (<code>crypto.getRandomValues</code>), lo que lo hace más imparcial que tirar un dado físico desgastado o ligeramente desequilibrado.",
    "sections": [
      {
        "heading": "Tipos de dado y sus usos en juegos de rol",
        "paragraphs": [
          "Los siete tipos de dado cubren prácticamente cualquier sistema de juego de mesa publicado. El <strong>D6</strong> es el más universal: lo usan desde Monopoly hasta <em>Blades in the Dark</em>. El <strong>D20</strong> es el ícono de D&D 5e y Pathfinder: determina si un ataque impacta o si una habilidad tiene éxito contra una Dificultad (CD). El <strong>D100</strong> (o D10×2) aparece en sistemas como <em>Call of Cthulhu</em> y <em>Warhammer Fantasy Roleplay</em>, donde los porcentajes definen las probabilidades de habilidades.",
          "El <strong>D4</strong> suele representar daño de daga o flecha, el <strong>D8</strong> el de espada larga o flechas de arco largo, el <strong>D10</strong> el de algunas armas de dos manos o habilidades de pícaro, y el <strong>D12</strong> el hacha de guerra o el dado de golpe del bárbaro en D&D. Conocer qué dado corresponde a cada arma acelera enormemente las sesiones."
        ],
        "citableSummary": "Los dados D4, D6, D8, D10, D12, D20 y D100 cubren D&D 5e, Pathfinder, Call of Cthulhu y la mayoría de sistemas de rol publicados."
      },
      {
        "heading": "Tirar varios dados y leer la suma",
        "paragraphs": [
          "Cuando seleccionás más de un dado del mismo tipo, la herramienta muestra el resultado individual de cada dado <em>y</em> la suma total. Esto replica la notación estándar de dados: <code>3D6</code> significa tirar tres dados de seis caras y sumar. En D&D, por ejemplo, un mago que lanza <em>Bola de fuego</em> hace <code>8D6</code> de daño: necesitás saber el resultado de cada dado para aplicar efectos de resistencia o inmunidad.",
          "También podés combinar distintos tipos de dado para tiradas compuestas, como <code>1D8 + 1D6</code> de daño de un arma con encantamiento. En esos casos, simplemente hacé dos tiradas separadas y sumá los resultados."
        ],
        "bullets": [
          "Hasta 20 dados del mismo tipo por tirada",
          "Resultados individuales + suma automática",
          "Historial de las últimas tiradas visible en pantalla"
        ]
      },
      {
        "heading": "Más allá del rol: usos cotidianos",
        "paragraphs": [
          "Los dados online también resuelven decisiones grupales de forma neutral. Un D6 para elegir entre seis opciones de restaurante, un D4 para decidir el turno de quien empieza en un juego de mesa cuando no hay dado físico a mano, o un D20 para adjudicar quién hace qué tarea en una lista de 20 ítems.",
          "En educación, los docentes usan lanzadores de dados para seleccionar alumnos al azar sin el sesgo involuntario de señalar siempre a los mismos, o para introducir conceptos de probabilidad con experimentos en tiempo real."
        ]
      }
    ]
  },
  "generador-schema-faq": {
    "intro": "El generador de Schema FAQ de Toolram produce el bloque <code>JSON-LD</code> listo para implementar en cualquier CMS o HTML estático. Cuando Google procesa correctamente el markup <code>FAQPage</code>, puede mostrar hasta 3 preguntas desplegables directamente en el resultado de búsqueda, lo que amplía el espacio que ocupa tu snippet y puede incrementar el CTR entre un 20 y un 40%.",
    "sections": [
      {
        "heading": "Qué es FAQPage schema y qué no es",
        "paragraphs": [
          "<strong>FAQPage</strong> es un tipo de schema.org que Google usa para identificar páginas donde una entidad (marca, persona, sitio) responde directamente preguntas frecuentes. La diferencia clave con <strong>QAPage</strong> es que en FAQPage las respuestas son autoritativas y provienen del dueño del contenido, mientras que QAPage corresponde a foros o plataformas donde la comunidad vota respuestas (como Stack Overflow).",
          "Google dejó de mostrar el rich result de FAQ de forma generalizada para sitios que lo usaban en exceso o en páginas de baja autoridad. Hoy lo muestra con mayor frecuencia en sitios gubernamentales, de salud y de alto E-E-A-T. Aun así, el markup sigue siendo valioso porque Bing, Google SGE y los extractores de datos de IA lo leen para generar respuestas."
        ],
        "citableSummary": "FAQPage schema.org señala respuestas autoritativas del dueño del sitio; diferente a QAPage (comunidad). Rich result visible según E-E-A-T y nicho."
      },
      {
        "heading": "Formato correcto del JSON-LD generado",
        "paragraphs": [
          "El JSON-LD generado sigue la especificación exacta de schema.org/FAQPage con un array de <code>Question</code> cada uno con <code>name</code> (la pregunta) y <code>acceptedAnswer</code> con propiedad <code>text</code>. La propiedad <code>text</code> acepta HTML básico (enlaces, negritas), lo que Google permite y a veces renderiza en el snippet.",
          "El bloque va dentro de un tag <code>&lt;script type=\"application/ld+json\"&gt;</code> en el <code>&lt;head&gt;</code> de la página. En WordPress se puede agregar via plugin (SEO Yoast, Rank Math) o con un snippet en <code>functions.php</code>. En Webflow o Framer, se pega en el campo de \"Custom Code\" del bloque head de la página específica."
        ],
        "bullets": [
          "Genera JSON-LD válido según schema.org/FAQPage",
          "Acepta HTML básico en las respuestas (enlaces, <strong>)</strong>",
          "Compatible con Google Rich Results Test para validar"
        ]
      },
      {
        "heading": "Mejores prácticas para maximizar el rich result",
        "paragraphs": [
          "Las preguntas deben reflejar dudas reales que los usuarios buscan, no marketing disfrazado de FAQ. Respondé de forma directa en las primeras 30-50 palabras: Google suele truncar respuestas largas. Evitá duplicar la misma FAQ en múltiples páginas del sitio porque Google puede penalizar el uso masivo del markup.",
          "Validá el resultado final en la herramienta oficial <a href=\"https://search.google.com/test/rich-results\" rel=\"noopener\">Rich Results Test de Google</a> antes de publicar. Si el test detecta errores de sintaxis o propiedades requeridas faltantes, el rich result no se activa."
        ]
      }
    ],
    "steps": [
      {
        "title": "Agregar pregunta",
        "description": "Escribí la primera pregunta en el campo <strong>Pregunta</strong>. Usá la formulación exacta que los usuarios buscarían en Google."
      },
      {
        "title": "Escribir la respuesta",
        "description": "Respondé de forma directa. Las primeras dos oraciones son las más importantes: Google las muestra en el snippet."
      },
      {
        "title": "Sumar más ítems",
        "description": "Presioná <strong>+ Agregar pregunta</strong> para incorporar más pares. Se recomiendan entre 3 y 7 preguntas por página."
      },
      {
        "title": "Copiar e implementar",
        "description": "Copiá el bloque JSON-LD generado y pegalo dentro del <code>&lt;head&gt;</code> de tu página, antes del cierre <code>&lt;/head&gt;</code>."
      }
    ]
  },
  "generador-titulos-seo": {
    "intro": "El generador de títulos SEO de Toolram aplica 15 plantillas con historial probado de CTR alto en Google Search para producir variantes accionables de títulos a partir de una sola keyword. La idea es eliminar el bloqueo creativo y darte opciones concretas para A/B testing en Google Search Console.",
    "sections": [
      {
        "heading": "Por qué el título SEO afecta el CTR más que la posición",
        "paragraphs": [
          "Dos resultados en posición 3 y 4 pueden tener CTR invertido si el título del 4° es más atractivo. Google mide el CTR orgánico como señal de relevancia: un resultado con CTR consistentemente mayor que el promedio de su posición tiende a subir. Un título bien optimizado puede incrementar el CTR entre un 15-30% sin cambiar una sola línea del contenido de la página.",
          "Las 15 plantillas del generador incluyen formatos con mayor tasa de clics histórica según datos de grandes publicaciones digitales: números impares (<em>«7 formas de...»</em>), año explícito (<em>«Guía 2025»</em>), preguntas directas (<em>«¿Cómo...?»</em>), comparativas (<em>«X vs Y»</em>) y títulos con promesa negativa (<em>«Evitá estos errores»</em>)."
        ],
        "citableSummary": "El título SEO influye directamente en el CTR orgánico. Mejores títulos pueden incrementar clics en 15-30% sin modificar el contenido."
      },
      {
        "heading": "El límite de 60 caracteres y cómo leer el indicador",
        "paragraphs": [
          "Google trunca los títulos que superan aproximadamente 600 píxeles de ancho (lo que equivale a unos 60 caracteres en tipografía promedio). El indicador de longitud del generador muestra en tiempo real cuántos caracteres tiene cada variante y marca en amarillo los que están entre 50-60, y en rojo los que pasan de 60.",
          "La regla de los 60 caracteres es una aproximación: letras anchas como M y W consumen más espacio que i o l. Si tu título incluye muchas mayúsculas o caracteres anchos, apuntá a 55 como límite seguro. Google a veces reescribe títulos que considera demasiado largos o poco representativos del contenido, así que un título preciso y dentro del límite reduce esa intervención."
        ],
        "bullets": [
          "15 plantillas: números, año, pregunta, guía, comparativa, secretos, listado y más",
          "Indicador visual de longitud con semáforo de 60 caracteres",
          "Copiado individual con un clic por variante"
        ]
      },
      {
        "heading": "Cómo usar las variantes para testing real",
        "paragraphs": [
          "Una vez que tenés las 15 variantes, seleccioná las 3 que mejor encajen con la intención de búsqueda de tu keyword. Publicá la página con el título que consideres más fuerte. Después de 4-6 semanas, revisá en Google Search Console la métrica <em>CTR promedio</em> para esa URL. Si el CTR está por debajo del promedio de tu sitio para páginas en posición similar, cambiá al segundo título candidato y esperá otras 4 semanas.",
          "Evitá cambiar el título más de una vez por mes: cada cambio reinicia el aprendizaje de Google sobre cómo presentar tu página. La paciencia es parte del proceso de optimización."
        ]
      }
    ]
  },
  "analizador-meta": {
    "intro": "El analizador de meta tags de Toolram procesa el código HTML de cualquier página web y devuelve un diagnóstico estructurado de 15 puntos SEO on-page en segundos, sin necesidad de instalar extensiones ni acceder a herramientas de pago. Es útil tanto para auditar tu propio sitio como para analizar la competencia.",
    "sections": [
      {
        "heading": "Qué evalúa el análisis de las 15 señales",
        "paragraphs": [
          "El analizador verifica presencia y calidad de: <strong>title</strong> (longitud 50-60 caracteres), <strong>meta description</strong> (150-160 caracteres), <strong>canonical</strong>, <strong>robots</strong>, <strong>Open Graph</strong> (og:title, og:description, og:image, og:url), <strong>Twitter Card</strong> (twitter:card, twitter:title), <strong>lang</strong> en el tag <code>&lt;html&gt;</code>, <strong>H1</strong> (exactamente uno), presencia de <strong>H2</strong>, imágenes sin atributo <strong>alt</strong>, conteo de enlaces internos vs externos, y detección de bloques <code>application/ld+json</code> de schema.org.",
          "Cada señal recibe un estado: ✓ correcto, ⚠ presente pero mejorable (por ejemplo, meta description de 200 caracteres), o ✗ ausente. El score final suma los puntos sobre 100 como referencia rápida, no como métrica absoluta de ranking."
        ],
        "citableSummary": "Evalúa 15 señales SEO on-page: title, meta description, canonical, robots, OG, Twitter Card, H1/H2, imágenes sin alt, enlaces y schema JSON-LD."
      },
      {
        "heading": "Cómo obtener el HTML de cualquier página",
        "paragraphs": [
          "En cualquier navegador de escritorio, presioná <strong>Ctrl+U</strong> (Windows/Linux) o <strong>Cmd+U</strong> (Mac) en la página que querés analizar. Se abre el código fuente en una nueva pestaña. Seleccioná todo con Ctrl+A, copiá con Ctrl+C y pegalo en el campo de la herramienta.",
          "Atención: el HTML obtenido con Ctrl+U es el HTML inicial del servidor, antes de que JavaScript modifique el DOM. Si el sitio inyecta meta tags dinámicamente via JavaScript (como hacen algunas SPAs con React o Vue), el analizador no verá esos tags. Para páginas con renderizado client-side, usá el panel <em>Elements</em> de DevTools (F12) y copiá el <code>&lt;head&gt;</code> completo ya renderizado."
        ],
        "bullets": [
          "Ctrl+U en cualquier navegador para obtener el HTML fuente",
          "Para SPAs: copiá el head desde DevTools Elements (F12), no desde Ctrl+U",
          "El análisis corre 100% en el cliente, el HTML no se envía a ningún servidor"
        ]
      },
      {
        "heading": "Interpretar resultados y priorizar correcciones",
        "paragraphs": [
          "No todas las señales tienen el mismo peso. El orden de prioridad para corregir es: (1) title ausente o fuera de rango, (2) H1 ausente o múltiple, (3) imágenes sin alt (afecta accesibilidad y SEO de imágenes), (4) canonical mal configurado, (5) meta description ausente, (6) Open Graph para compartir en redes.",
          "El score de 100 puntos es orientativo. Un sitio con score 72 puede rankear mejor que uno con 91 si tiene mejor autoridad de dominio o contenido más relevante. Usá el análisis para identificar omisiones básicas, no para obsesionarte con el número."
        ]
      }
    ],
    "steps": [
      {
        "title": "Obtener el HTML",
        "description": "Abrí la página a analizar y presioná <strong>Ctrl+U</strong> para ver el código fuente. Seleccioná todo y copiá."
      },
      {
        "title": "Pegar el código",
        "description": "Pegá el HTML en el campo de texto de la herramienta. Funciona con el HTML parcial (solo el head) o la página completa."
      },
      {
        "title": "Analizar",
        "description": "Presioná <strong>Analizar</strong>. En menos de un segundo aparece el diagnóstico completo con las 15 señales evaluadas."
      },
      {
        "title": "Revisar y priorizar",
        "description": "Revisá los ítems marcados en rojo primero (ausentes), luego los amarillos (mejorables). El orden sugerido de corrección está detallado en cada señal."
      }
    ]
  },
  "conversor-divisas": {
    "intro": "El conversor de divisas de Toolram obtiene tasas de cambio del Banco Central Europeo vía la API pública de Frankfurter, actualizadas cada día hábil. Cubre más de 30 monedas incluyendo el peso mexicano (MXN), peso argentino (ARS), peso chileno (CLP), peso colombiano (COP), sol peruano (PEN), real brasileño (BRL), dólar y euro.",
    "sections": [
      {
        "heading": "De dónde vienen las tasas y qué significan",
        "paragraphs": [
          "Las tasas del Banco Central Europeo son el precio interbancario oficial: el tipo de cambio al que los bancos grandes se prestan dinero entre sí en el mercado mayorista. <strong>Este precio no es el que pagás tú al cambiar dinero.</strong> Tu banco o casa de cambio le agrega un margen (spread) de entre el 2% y el 5% más comisiones fijas. Es por eso que la herramienta aclara que las tasas son referenciales.",
          "Para el par USD/MXN, la diferencia puede ser significativa. Si la tasa interbancaria está en $17.20 pesos por dólar, un banco de ventanilla puede estar cobrando $16.40 para compra y vendiendo a $18.00, un spread total de casi 9%. Las casas de cambio aeroportuarias suelen tener los spreads más altos."
        ],
        "citableSummary": "Las tasas del BCE son interbancarias. Los bancos agregan un spread del 2-5% (ventanillas aeroportuarias pueden llegar al 8-10% sobre el interbancario)."
      },
      {
        "heading": "Monedas LATAM disponibles y sus particularidades",
        "paragraphs": [
          "El peso argentino (ARS) tiene un caso especial: Argentina mantiene controles de capital y tipos de cambio múltiples. La tasa oficial del Banco Central de la República Argentina (BCRA) suele diferir significativamente del dólar informal. La herramienta muestra la tasa oficial vía BCE, que corresponde al tipo de cambio formal.",
          "El sol peruano (PEN), el peso colombiano (COP) y el real brasileño (BRL) son monedas de flotación administrada: el banco central interviene ocasionalmente. Sus tasas son más estables y la diferencia entre interbancario y banco de ventanilla es menor, generalmente del 2-3%."
        ],
        "bullets": [
          "30+ monedas: USD, EUR, MXN, ARS, CLP, COP, PEN, BRL, GBP, JPY, CAD y más",
          "Actualización diaria en días hábiles (fuente: BCE vía Frankfurter API)",
          "ARS = tasa oficial BCRA; para tipos informales consultar fuentes locales"
        ]
      },
      {
        "heading": "Cuándo usar el conversor y cuándo no",
        "paragraphs": [
          "El conversor es ideal para presupuestar viajes, comparar precios internacionales, calcular el valor aproximado de una transferencia internacional o hacer seguimiento de cómo fluctúa una moneda semana a semana. No es apropiado como base para operaciones financieras formales, contratos internacionales o declaraciones fiscales, que requieren tasas certificadas de bancos centrales o instituciones reconocidas.",
          "Para freelancers que facturan en dólares o euros a clientes del exterior, el conversor es útil para estimar el ingreso en moneda local antes de que el banco haga la conversión, pero el monto final dependerá del tipo de cambio del día exacto en que se acredita la transferencia."
        ]
      }
    ],
    "steps": [
      {
        "title": "Seleccionar monedas",
        "description": "Elegí la moneda de origen (por ejemplo USD) y la moneda destino (por ejemplo MXN) en los menús desplegables."
      },
      {
        "title": "Ingresar el monto",
        "description": "Escribí el monto a convertir. La conversión se actualiza en tiempo real sin necesidad de presionar ningún botón."
      },
      {
        "title": "Leer el resultado",
        "description": "El resultado muestra el monto convertido y la tasa exacta usada con su fecha de actualización."
      },
      {
        "title": "Considerar el spread bancario",
        "description": "Restá mentalmente entre 2-5% al resultado si vas a hacer la conversión en un banco. Para casas de cambio aeroportuarias, restá hasta 8%."
      }
    ]
  },
  "calculadora-iva": {
    "intro": "La calculadora de IVA de Toolram resuelve los dos cálculos más comunes en la vida fiscal cotidiana: sumar el IVA a un precio neto (para saber cuánto pagará el cliente) y extraer el IVA de un precio total (para saber cuánto IVA vas a declarar cuando el precio final ya incluye impuesto). Cubre ocho países con tasas preconfiguradas.",
    "sections": [
      {
        "heading": "Los dos modos de cálculo y cuándo usar cada uno",
        "paragraphs": [
          "<strong>Sumar IVA al subtotal:</strong> usás este modo cuando tenés el precio sin impuesto y querés saber el precio final al público. En México (IVA 16%), un servicio de diseño gráfico que cotizás en $5,000 MXN + IVA se factura como $5,000 × 1.16 = <strong>$5,800 MXN con IVA incluido</strong>. El IVA trasladado al cliente es $800.",
          "<strong>Extraer IVA del precio total:</strong> usás este modo cuando el precio ya incluye IVA y necesitás separar cuánto es base y cuánto es impuesto. Para un ticket de $348 MXN con IVA incluido: base = $348 / 1.16 = <strong>$300 MXN</strong>, IVA = <strong>$48 MXN</strong>. Esto es clave al hacer conciliaciones contables o al reportar el IVA acreditable de tus gastos."
        ],
        "citableSummary": "Modo 1: precio neto × (1 + tasa) = precio con IVA. Modo 2: precio total / (1 + tasa) = base; total − base = IVA. En México la tasa es 16%."
      },
      {
        "heading": "Tasas por país y casos especiales",
        "paragraphs": [
          "En <strong>México</strong> la tasa general es 16%, pero existe una tasa del 8% para la franja fronteriza norte (municipios como Tijuana, Juárez, Matamoros). La calculadora usa la tasa general del 16%; si operás en zona fronteriza, seleccioná la tasa personalizada e ingresá 8. Algunos productos y servicios en México tienen IVA del 0% (alimentos no procesados, medicamentos, libros), lo que no es lo mismo que estar exentos.",
          "<strong>Argentina</strong> tiene IVA del 21% general, pero 10.5% para bienes de primera necesidad y ciertos servicios. <strong>España</strong> tiene 21% general, 10% reducido (restaurantes, alojamiento, transporte) y 4% superreducido (pan, leche, libros). La tasa personalizable de 0-30% cubre cualquier combinación regional o sectorial."
        ],
        "bullets": [
          "México 16% (8% zona fronteriza norte: usar tasa personalizada)",
          "España 21% general, 10% reducido, 4% superreducido",
          "Argentina 21% general, 10.5% reducido",
          "Chile 19%, Perú 18%, Colombia 19%, Uruguay 22%, Ecuador 15%"
        ]
      },
      {
        "heading": "Redondeo, decimales y uso en facturación",
        "paragraphs": [
          "La calculadora muestra hasta dos decimales, que es el estándar de redondeo para facturación en la mayoría de países hispanohablantes. En México, el SAT acepta redondeo al centavo más próximo; en Argentina, la AFIP también trabaja con dos decimales.",
          "Para cálculos encadenados (por ejemplo, calcular el IVA de múltiples líneas de una factura), sumá primero todos los subtotales sin IVA y después aplicá la tasa al total, para evitar errores de redondeo acumulados al calcular IVA línea por línea."
        ]
      }
    ],
    "steps": [
      {
        "title": "Seleccionar país o tasa",
        "description": "Elegí tu país en el menú para cargar la tasa automáticamente, o seleccioná <strong>Personalizada</strong> y escribí la tasa que necesitás."
      },
      {
        "title": "Elegir modo de cálculo",
        "description": "Seleccioná <strong>Sumar IVA</strong> si tenés el precio sin impuesto, o <strong>Extraer IVA</strong> si el precio ya incluye impuesto."
      },
      {
        "title": "Ingresar el monto",
        "description": "Escribí el precio en el campo de monto. El resultado se calcula al instante."
      },
      {
        "title": "Leer los tres valores",
        "description": "La calculadora muestra: precio base (sin IVA), monto del IVA y precio total (con IVA). Podés copiar cualquiera de los tres."
      }
    ]
  },
  "calculadora-cientifica": {
    "intro": "La calculadora científica de Toolram reúne en una interfaz web las funciones que estudiantes de preparatoria, universidad e ingeniería necesitan con mayor frecuencia: trigonometría con selección de DEG/RAD, logaritmos, potencias, raíces, factorial y las constantes π y e, con soporte completo de paréntesis anidados.",
    "sections": [
      {
        "heading": "Funciones trigonométricas: DEG vs RAD",
        "paragraphs": [
          "El error más común al usar una calculadora científica es mezclar modos angulares. Si la calculadora está en modo <strong>DEG</strong> (grados sexagesimales) y calculás <code>sin(π)</code> ingresando el valor numérico de π (3.14159...), obtenés <code>0.0548</code>, no <code>0</code>. Eso es porque 3.14159 grados no es lo mismo que π radianes. En modo <strong>RAD</strong>, <code>sin(π)</code> = <code>0</code> (el seno de 180°).",
          "La regla práctica: si tu problema viene del aula de física o matemáticas y los ángulos se expresan en grados (30°, 45°, 90°), usá DEG. Si estás en cálculo diferencial, física de oscilaciones o señales, donde los ángulos aparecen como múltiplos de π, usá RAD. El modo DEG es el default porque es el más frecuente en nivel preuniversitario."
        ],
        "citableSummary": "DEG para ángulos expresados en grados (geometría, trigonometría básica). RAD para cálculo, física y cualquier fórmula con π."
      },
      {
        "heading": "Logaritmos, potencias y raíces",
        "paragraphs": [
          "<code>ln</code> es el logaritmo natural (base <em>e</em> ≈ 2.71828); <code>log</code> es el logaritmo en base 10. Son distintos y no intercambiables: <code>ln(100)</code> ≈ 4.605, mientras que <code>log(100)</code> = 2 exacto. En química se usa <code>log</code> para calcular pH; en crecimiento exponencial, análisis de señales y entropía de Shannon se usa <code>ln</code>.",
          "Las potencias <code>x²</code> y <code>x³</code> son atajos rápidos, pero <code>xʸ</code> acepta cualquier exponente incluyendo fracciones (por ejemplo <code>8^(1/3)</code> = 2, la raíz cúbica de 8). La función factorial <code>n!</code> solo aplica a enteros no negativos: <code>10!</code> = 3,628,800, utilísimo en combinatoria y probabilidad."
        ],
        "bullets": [
          "ln = logaritmo natural (base e); log = base 10 — no confundirlos",
          "x^(1/n) para raíces de cualquier índice (1/3 para cúbica, 1/4 para cuarta)",
          "Factorial: 0! = 1, 12! = 479,001,600 (límite práctico ~20! antes de overflow)"
        ]
      },
      {
        "heading": "Memoria Ans y paréntesis anidados",
        "paragraphs": [
          "La tecla <strong>Ans</strong> inserta automáticamente el resultado de la operación anterior en la expresión actual. Si calculaste <code>√(144)</code> = 12 y a continuación querés calcular <code>Ans² + 5</code>, presionar Ans evita reescribir el 12. Esto acelera cálculos encadenados donde el resultado de un paso es insumo del siguiente.",
          "Los paréntesis anidados funcionan hasta cualquier profundidad que el navegador permita evaluar (en la práctica, más de 10 niveles anidados es inusual en problemas reales). La calculadora resalta visualmente el par de paréntesis correspondiente cuando el cursor está sobre uno, lo que ayuda a detectar paréntesis que cerraste de más o de menos."
        ]
      }
    ]
  },
  "json-csv": {
    "intro": "El conversor JSON-CSV de Toolram convierte en ambas direcciones: de JSON (array de objetos) a CSV tabular, y de CSV a JSON con detección automática de tipos. Es útil para quienes trabajan con APIs, exportaciones de plataformas de e-commerce o migración de datos entre sistemas sin querer abrir un editor de código.",
    "sections": [
      {
        "heading": "De JSON a CSV: cómo funciona la aplanamiento",
        "paragraphs": [
          "El conversor toma un <strong>array de objetos JSON</strong> donde cada objeto representa una fila. Las claves del primer objeto se usan como encabezados de columna. Si un objeto tiene una clave que otros no tienen, esa columna aparece vacía para las filas sin esa clave.",
          "Los valores que son arrays u objetos anidados se serializan como string JSON dentro de la celda CSV, porque CSV es inherentemente plano. Por ejemplo, <code>{\"tags\": [\"ropa\", \"mujer\"]}</code> se convierte en la celda <code>\"[\"\"ropa\"\",\"\"mujer\"\"]\"]</code> con el escapado doble de comillas que CSV requiere. Si necesitás aplanar estructuras anidadas, es mejor preprocesar el JSON antes de convertir."
        ],
        "citableSummary": "JSON a CSV: cada objeto del array = una fila. Las claves del primer objeto = cabeceras. Objetos anidados se serializan como string dentro de la celda."
      },
      {
        "heading": "De CSV a JSON: detección automática de tipos",
        "paragraphs": [
          "Al convertir CSV a JSON, la herramienta detecta automáticamente si un campo es número (entero o decimal), booleano (<code>true</code>/<code>false</code>) o null, en lugar de devolver todo como strings. Así, una columna <code>precio</code> con valor <code>299.99</code> se convierte en el número <code>299.99</code>, no en la cadena <code>\"299.99\"</code>, lo que evita tener que parsear manualmente en el código receptor.",
          "El separador es configurable: coma (CSV estándar), punto y coma (común en exportaciones europeas donde la coma es el separador decimal), tab (TSV, frecuente en exportaciones de Google Sheets) y pipe (<code>|</code>, usado en algunos sistemas legacy). Si tu archivo viene de Excel en español, casi seguro tiene punto y coma como separador."
        ],
        "bullets": [
          "Detección automática: números, booleans, null — no todo como string",
          "Separadores: coma, punto y coma, tab, pipe",
          "Compatible con exportaciones de WooCommerce, Shopify, HubSpot y Airtable"
        ]
      },
      {
        "heading": "Casos de uso reales",
        "paragraphs": [
          "Un uso muy frecuente es exportar datos de una API REST (que devuelve JSON) a un CSV para análisis en Excel o Google Sheets sin necesidad de escribir código. También sirve para el sentido inverso: tienes una hoja de cálculo de productos de tu tienda, la exportás como CSV, la convertís a JSON y la mandás a una API de importación masiva.",
          "Otro caso común: WooCommerce y Shopify exportan órdenes y productos en CSV. Al convertirlos a JSON, el formato es mucho más fácil de procesar con scripts de automatización en Node.js o Python, o de importar en bases de datos NoSQL como MongoDB."
        ]
      }
    ],
    "steps": [
      {
        "title": "Pegar o escribir el contenido",
        "description": "Pegá tu JSON (array de objetos) o tu CSV en el campo de entrada. La herramienta detecta automáticamente el formato."
      },
      {
        "title": "Seleccionar el separador (solo CSV→JSON)",
        "description": "Si convertís CSV a JSON, indicá el separador de tu archivo: coma, punto y coma, tab o pipe."
      },
      {
        "title": "Convertir",
        "description": "Presioná <strong>Convertir</strong>. El resultado aparece en el panel derecho con el formato destino."
      },
      {
        "title": "Copiar o descargar",
        "description": "Copiá el resultado al portapapeles o descargalo como archivo <code>.csv</code> o <code>.json</code>."
      }
    ]
  },
  "generador-nombres": {
    "intro": "El generador de nombres LATAM de Toolram combina una base de 80 nombres (40 masculinos, 40 femeninos) y 50 apellidos comunes en América Latina y España para producir identidades ficticias verosímiles, útiles para personajes narrativos, NPCs de juegos de rol o datos de prueba en desarrollo de software.",
    "sections": [
      {
        "heading": "Para qué sirve un generador de nombres hispanos específico",
        "paragraphs": [
          "Generadores de nombres genéricos en inglés producen combinaciones que suenan extrañas en contexto hispanohablante (\"John García\" o \"Michael Rodríguez\"). Para un personaje de novela ambientada en Ciudad de México, un NPC de un videojuego con worldbuilding latinoamericano, o una base de datos de demo para una startup, los nombres deben sonar naturales y regionales.",
          "Los 50 apellidos incluyen los más frecuentes en LATAM según datos de registros civiles: García, Rodríguez, López, Martínez, González (los cinco más comunes en México y España) junto con apellidos de alta frecuencia regional como Quispe, Mamani y Condori (frecuentes en Bolivia y Perú), o Figueroa y Espinoza (frecuentes en Chile y Argentina)."
        ],
        "citableSummary": "Nombres y apellidos calibrados para LATAM: incluye apellidos regionales andinos (Quispe, Mamani) y del cono sur además de los pan-hispánicos más frecuentes."
      },
      {
        "heading": "Opciones disponibles: género, segundo nombre y títulos",
        "paragraphs": [
          "El generador produce nombres en tres modos de género: masculino, femenino o cualquiera (mezcla aleatoria, útil cuando necesitás un grupo diverso). La opción de <strong>segundo nombre</strong> agrega un segundo nombre de pila antes del apellido, lo que es culturalmente común en muchos países de LATAM (\"María Fernanda\", \"Juan Carlos\", \"Ana Sofía\").",
          "Los títulos profesionales disponibles (Lic., Ing., Dr., Dra., Arq., Lic.) son útiles para generar personajes con roles específicos en contextos organizacionales o académicos, sin que suenen inventados. Podés generar hasta 50 nombres de una vez para poblar tablas de base de datos de prueba o listas de personajes de un mundo narrativo complejo."
        ],
        "bullets": [
          "80 nombres de pila (40 masculinos + 40 femeninos) + 50 apellidos",
          "Segundo nombre opcional para combinaciones como \"María Fernanda González\"",
          "Títulos: Lic., Ing., Dr., Dra., Arq.",
          "Hasta 50 nombres generados simultáneamente"
        ]
      },
      {
        "heading": "Uso en desarrollo de software y bases de datos demo",
        "paragraphs": [
          "Al desarrollar aplicaciones, necesitás datos de prueba que parezcan reales para hacer demos con clientes o para pruebas de interfaz con texto representativo. Nombres genéricos como \"Usuario 1\" o \"Test Name\" rompen la ilusión y hacen que los demos se vean no terminados.",
          "El generador es una alternativa rápida a librerías como Faker.js para el caso específico de nombres hispanos, sin necesidad de instalar dependencias ni escribir código. Copiás la lista generada y la pegás directamente en tu seed de base de datos o en el JSON de datos mock."
        ]
      }
    ]
  },
  "calculadora-ovulacion": {
    "intro": "La calculadora de ovulación de Toolram estima el día de ovulación, la ventana fértil de seis días y la fecha aproximada de la próxima menstruación a partir del primer día del último período y la duración habitual del ciclo. Es una herramienta informativa basada en el método del calendario, útil para conocer el ciclo propio.",
    "sections": [
      {
        "heading": "Cómo funciona el cálculo: la regla de los 14 días",
        "paragraphs": [
          "El método del calendario asume que la ovulación ocurre aproximadamente <strong>14 días antes del inicio de la próxima menstruación</strong>, no 14 días después del inicio del ciclo. Para un ciclo regular de 28 días, ambas referencias coinciden en el día 14. Pero para un ciclo de 35 días, la ovulación ocurre alrededor del día 21, no del 14.",
          "La ventana fértil cubre los 5 días previos a la ovulación más el día de ovulación mismo (6 días en total). Los espermatozoides pueden sobrevivir hasta 5 días en el tracto reproductivo, pero el óvulo solo es viable 12-24 horas después de ser liberado. Por eso los días previos a la ovulación son también parte de la ventana fértil."
        ],
        "citableSummary": "Ovulación ≈ 14 días antes de la próxima menstruación (no 14 días después del inicio). Ventana fértil: 5 días previos + día de ovulación = 6 días totales."
      },
      {
        "heading": "Limitaciones importantes del método del calendario",
        "paragraphs": [
          "La calculadora lo indica explícitamente: el <strong>método del calendario solo tiene una tasa de fallo del 24% anual</strong> cuando se usa como único método anticonceptivo (datos de la OMS y Planned Parenthood). Esto significa que aproximadamente 1 de cada 4 personas que lo usan como único método queda embarazada en un año.",
          "Los ciclos irregulares reducen aún más la fiabilidad: estrés, viajes, cambios de peso, enfermedad, lactancia y síndrome de ovario poliquístico (SOP) pueden alterar la ovulación de un mes a otro. Para planificación familiar seria, los métodos de consciencia reproductiva basados en temperatura basal y moco cervical (método sintotérmico) son más precisos que el calendario solo."
        ],
        "bullets": [
          "Tasa de fallo del calendario como único método: ~24% anual (OMS)",
          "Ciclos regulares de 21 a 45 días son calculables; los irregulares no",
          "Útil para conocer el propio ciclo, no como anticonceptivo confiable",
          "SOP, estrés, lactancia y medicamentos pueden adelantar o retrasar la ovulación"
        ]
      },
      {
        "heading": "Para quienes buscan embarazo",
        "paragraphs": [
          "Para quienes buscan concebir, la calculadora identifica los días de mayor probabilidad de fertilización. Tener relaciones sexuales en los 2-3 días previos a la ovulación y el día de ovulación ofrece la mayor probabilidad estadística de concepción, ya que el esperma ya está presente cuando el óvulo es liberado.",
          "Si después de 12 meses de intentarlo (o 6 meses si la persona tiene más de 35 años) no se logra el embarazo, la recomendación médica estándar es consultar a un especialista en fertilidad. La calculadora es un punto de partida, no un sustituto del seguimiento médico."
        ]
      }
    ],
    "steps": [
      {
        "title": "Ingresar primer día del último período",
        "description": "Seleccioná la fecha en la que comenzó tu última menstruación usando el selector de fecha."
      },
      {
        "title": "Indicar duración del ciclo",
        "description": "Ingresá la duración habitual de tu ciclo en días (de 21 a 45). Si varía, usá el promedio de los últimos 3 meses."
      },
      {
        "title": "Ver resultados",
        "description": "La calculadora muestra: día de ovulación estimado, inicio y fin de la ventana fértil de 6 días, y fecha aproximada de la próxima menstruación."
      },
      {
        "title": "Interpretar con precaución",
        "description": "Recordá que estos son <em>estimados</em> basados en ciclos regulares. Un ciclo irregular requiere métodos de seguimiento adicionales como temperatura basal o test de ovulación (LH)."
      }
    ]
  },
  "generador-bio-instagram": {
    "intro": "El generador de bio para Instagram de Toolram produce cinco estilos de biografía con saltos de línea reales que Instagram respeta, algo que falla cuando se escribe la bio directamente en el campo de edición del perfil desde ciertos dispositivos. Cubre desde el estilo aesthetic hasta el profesional, con indicador de los 150 caracteres máximos.",
    "sections": [
      {
        "heading": "El problema de los saltos de línea en Instagram",
        "paragraphs": [
          "Instagram acepta saltos de línea en la bio, pero la app móvil a veces los elimina al pegar texto copiado desde el teclado estándar. El truco es copiar el texto ya formateado desde una fuente externa (como esta herramienta) y pegarlo en el campo de bio <em>sin borrar ni reescribir</em> el contenido pegado. Si editás el texto después de pegar dentro del campo de Instagram, la app puede colapsar los saltos.",
          "Los saltos de línea se logran con el carácter Unicode de retorno de carro estándar (U+000A), que Instagram acepta cuando viene en el texto pegado pero no siempre cuando se ingresa con la tecla Enter del teclado virtual en iOS o Android. La herramienta genera el texto con los saltos correctos listos para copiar."
        ],
        "citableSummary": "Los saltos de línea en la bio de Instagram funcionan al pegar texto externo ya formateado. Editarlos dentro del campo de la app puede colapsarlos."
      },
      {
        "heading": "Los cinco estilos y cuándo usar cada uno",
        "paragraphs": [
          "<strong>Aesthetic</strong> usa símbolos Unicode como ✧, ✿, ⋆ y ᴬ para crear una estética visual típica de cuentas de lifestyle, moda y arte. <strong>Minimalista</strong> usa separadores tipográficos neutros (·, —, /) apropiados para marcas que buscan sobriedad. <strong>Profesional</strong> usa viñetas de flecha (▸, ↳) para listas de logros o servicios, ideal para freelancers, coaches y consultores. <strong>Divertido</strong> mezcla emojis temáticos con texto casual para creadores de entretenimiento. <strong>Emoji-heavy</strong> es el estilo más visual, con emojis al inicio de cada línea, frecuente en cuentas de comida, viajes y entretenimiento.",
          "TikTok, Twitter/X y YouTube aceptan saltos de línea con el mismo mecanismo. La bio generada puede reutilizarse en esas plataformas con mínimos ajustes, aunque el límite de caracteres varía: TikTok permite 80, Twitter/X 160, YouTube 1,000."
        ],
        "bullets": [
          "Máximo 150 caracteres en Instagram (indicador visual en tiempo real)",
          "5 estilos: Aesthetic, Minimalista, Profesional, Divertido, Emoji-heavy",
          "Compatible con TikTok (80 chars), Twitter/X (160) y YouTube (1,000)",
          "Saltos de línea reales listos para pegar sin editar"
        ]
      },
      {
        "heading": "Qué información incluir en una bio efectiva",
        "paragraphs": [
          "Una bio de alto rendimiento en Instagram responde tres preguntas en 150 caracteres: <em>¿quién eres?</em> (rol o identidad), <em>¿qué hacés o ofrecés?</em> (propuesta de valor), <em>¿qué querés que hagan?</em> (CTA: el link, una acción). El generador estructura las variantes alrededor de estas tres preguntas.",
          "Evitá usar hashtags en la bio de Instagram si tu cuenta es privada (no funcionan) y usálos con moderación en cuentas públicas (Instagram no los impulsa en bio como antes). El único link clicable es el que se agrega en el campo separado de «Sitio web», así que asegurate de incluir una llamada a la acción que dirija hacia ahí."
        ]
      }
    ],
    "steps": [
      {
        "title": "Ingresar tu información",
        "description": "Completá los campos: nombre, rol o profesión, propuesta de valor y CTA (lo que querés que hagan). No todos son obligatorios."
      },
      {
        "title": "Seleccionar estilo",
        "description": "Elegí entre los 5 estilos disponibles. Podés generarlos todos y comparar."
      },
      {
        "title": "Revisar el contador de caracteres",
        "description": "Verificá que ninguna variante supere los 150 caracteres. El indicador muestra el conteo en tiempo real."
      },
      {
        "title": "Copiar y pegar en Instagram",
        "description": "Copiá el texto generado. En Instagram, andá a <strong>Editar perfil</strong>, tocá el campo Bio, borrálo, pegá el texto copiado y guardá. No edites el texto dentro del campo para preservar los saltos de línea."
      }
    ]
  },
  "ruleta-decision": {
    "intro": "La <strong>Ruleta para Decidir</strong> es una herramienta de azar visual que elimina la parálisis por análisis cuando todas las opciones parecen igual de válidas. Agrega tus alternativas, gira y deja que el resultado hable por sí solo — sin sesgos, sin discusiones.",
    "sections": [
      {
        "heading": "Cómo funciona el sorteo",
        "paragraphs": [
          "Cada opción que ingresas ocupa un sector proporcional de la ruleta: si agregas 4 opciones, cada una tiene exactamente 25% de probabilidad. Si agregas 10, cada una tiene 10%. El generador de números aleatorios que determina dónde frena la ruleta opera con <code>Math.random()</code> en JavaScript, ejecutado completamente en tu navegador — ningún resultado se envía a ningún servidor.",
          "La animación de frenado simula inercia real: la rueda desacelera gradualmente antes de detenerse, lo que hace el proceso visualmente satisfactorio y evita que se perciba como un resultado 'instantáneo' predeterminado."
        ],
        "citableSummary": "Cada opción tiene probabilidad igual y proporcional. El sorteo corre en tu navegador sin enviar datos.",
        "bullets": [
          "Mínimo 2 opciones, sin límite máximo práctico",
          "Elimina la opción ganadora para hacer sorteos sucesivos sin repetición",
          "Útil para sorteos en Instagram Live, TikTok o YouTube donde el público ve el resultado en pantalla"
        ]
      },
      {
        "heading": "Casos de uso reales",
        "paragraphs": [
          "En el aula, los docentes la usan para seleccionar qué estudiante expone, qué tema se evalúa primero o cómo dividir equipos. En vez de señalar con el dedo o usar listas predeterminadas, la ruleta aporta percepción de imparcialidad visible para todo el grupo.",
          "Para equipos de trabajo remoto, funciona bien en retrospectivas o dailies: ¿quién da el primer update? ¿qué tarea técnica atacar primero cuando el backlog tiene cinco candidatas con la misma prioridad? En restaurantes o grupos de amigos decidiendo dónde comer, el ritual de girar la ruleta convierte una decisión tediosa en un momento lúdico."
        ]
      },
      {
        "heading": "Consejos para sorteos en redes sociales",
        "paragraphs": [
          "Si haces un sorteo en Instagram o TikTok, comparte pantalla mientras giras para que la audiencia lo vea en tiempo real. Agrega el nombre de cada participante (o un número de comentario) como opción. Para bases de participantes grandes, numera y usa el <a href='/generador-numero-aleatorio'>generador de número aleatorio</a> para eliminar primero hasta quedar con los finalistas que entran en la ruleta.",
          "Evita el error común de agregar opciones duplicadas creyendo que aumenta sus probabilidades: es mejor usar opciones únicas y ajustar el peso manualmente si el formato de tu sorteo lo requiere (por ejemplo, un participante con 2 tickets válidos)."
        ]
      }
    ],
    "steps": [
      {
        "title": "Agrega tus opciones",
        "description": "Escribe cada alternativa en el campo de texto y presiona Agregar (o Enter). Puedes editar o eliminar opciones antes de girar."
      },
      {
        "title": "Gira la ruleta",
        "description": "Presiona el botón central o el de giro. La animación dura entre 3 y 6 segundos con desaceleración gradual."
      },
      {
        "title": "Lee el resultado",
        "description": "La opción ganadora se resalta con un marcador y aparece en texto debajo de la ruleta. Puedes girar nuevamente o eliminar el ganador para sorteos múltiples."
      }
    ]
  },
  "conversor-temperatura": {
    "intro": "El <strong>Conversor de Temperatura</strong> calcula simultáneamente los equivalentes en Celsius, Fahrenheit y Kelvin al instante. No importa qué escala recibas — pega el valor en el campo correspondiente y las otras dos se actualizan en tiempo real.",
    "sections": [
      {
        "heading": "Las tres escalas y cuándo las encuentras",
        "paragraphs": [
          "<strong>Celsius (°C)</strong> es el estándar en México, América Latina, Europa y la mayoría del mundo científico cotidiano. Los pronósticos del tiempo, los termómetros de cocina, los refrigeradores y los hornos en la región usan esta escala. El punto de congelación del agua es 0 °C y la ebullición a nivel del mar es 100 °C.",
          "<strong>Fahrenheit (°F)</strong> domina en Estados Unidos (y parcialmente en las Islas Caimán y las Bahamas). Si viajas al norte, compras un horno importado sin modificar o sigues recetas de sitios como AllRecipes, te toparás con valores como 350 °F (177 °C) para hornear pan, o 98.6 °F (37 °C) como temperatura corporal normal. <strong>Kelvin (K)</strong> — sin símbolo de grado — es la escala del Sistema Internacional usada en termodinámica, astrofísica y química. El cero absoluto es 0 K (−273.15 °C), la temperatura más baja posible."
        ],
        "citableSummary": "Celsius: estándar en LATAM. Fahrenheit: EE.UU. y recetas anglosajonas. Kelvin: ciencia y termodinámica. Las fórmulas exactas son °F = (°C × 9/5) + 32 y K = °C + 273.15."
      },
      {
        "heading": "Fórmulas exactas (para verificar o entender)",
        "paragraphs": [
          "De Celsius a Fahrenheit: multiplica por 9, divide entre 5 y suma 32. Ejemplo: 25 °C → (25 × 9/5) + 32 = 77 °F. De Fahrenheit a Celsius: resta 32, multiplica por 5 y divide entre 9. Ejemplo: 350 °F → (350 − 32) × 5/9 = 176.67 °C.",
          "De Celsius a Kelvin: suma 273.15. De Kelvin a Celsius: resta 273.15. No existe conversión directa estándar entre Fahrenheit y Kelvin sin pasar por Celsius. La herramienta realiza todas las conversiones encadenadas internamente con precisión de punto flotante IEEE 754."
        ]
      },
      {
        "heading": "Errores comunes que evita esta herramienta",
        "paragraphs": [
          "El error más frecuente es olvidar sumar 32 al convertir Celsius a Fahrenheit — se obtiene, por ejemplo, 45 en vez de 77 para 25 °C. Otro error clásico: confundir Kelvin con Celsius en papers científicos cuando los valores son similares en rangos medios (por ejemplo, 300 K ≈ 27 °C, no 300 °C).",
          "En contextos industriales — refrigeración, pasteurización, esterilización de equipos médicos — una conversión incorrecta puede tener consecuencias críticas. Usar la herramienta como verificación rápida antes de configurar equipos importados reduce ese riesgo."
        ],
        "bullets": [
          "Temperatura corporal normal: 37 °C = 98.6 °F = 310.15 K",
          "Punto de fusión del acero: ~1,370 °C = ~2,500 °F = ~1,643 K",
          "Nitrógeno líquido: −196 °C = −321 °F = 77 K"
        ]
      }
    ]
  },
  "regex-tester": {
    "intro": "El <strong>Tester de Expresiones Regulares</strong> evalúa patrones regex contra texto de prueba en tiempo real, resaltando cada coincidencia con color. Usa el motor de JavaScript nativo, la misma implementación que Node.js, Chrome y Firefox — lo que ves es exactamente lo que obtendrías en tu código.",
    "sections": [
      {
        "heading": "Flags disponibles y qué hacen",
        "paragraphs": [
          "Los flags modifican el comportamiento del patrón completo. <code>g</code> (global) encuentra <em>todas</em> las coincidencias en el texto, no solo la primera — sin este flag, <code>/\\d+/</code> sobre «hay 3 gatos y 12 perros» devuelve solo <code>3</code>. <code>i</code> (insensitive) ignora mayúsculas/minúsculas: <code>/hola/i</code> coincide con «Hola», «HOLA» y «hOlA».",
          "<code>m</code> (multiline) hace que <code>^</code> y <code>$</code> coincidan con el inicio y fin de <em>cada línea</em>, no del string completo — esencial para procesar archivos CSV o logs. <code>s</code> (dotAll) permite que el punto <code>.</code> coincida también con saltos de línea <code>\\n</code>, útil para capturar bloques HTML multi-línea. <code>u</code> activa soporte completo Unicode, necesario para caracteres fuera del BMP como emojis."
        ],
        "citableSummary": "JavaScript tiene 6 flags principales: g (global), i (case-insensitive), m (multiline), s (dotAll), u (unicode), y (sticky). Combínalos según el caso."
      },
      {
        "heading": "Patrones más usados con ejemplos reales",
        "paragraphs": [
          "Validar email básico: <code>/^[\\w.-]+@[\\w.-]+\\.[a-z]{2,}$/i</code>. Capturar números de teléfono mexicanos (10 dígitos, con o sin código +52): <code>/(?:\\+?52)?\\s*\\(?[1-9]\\d{2}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}/g</code>. Extraer URLs de un texto HTML: <code>/https?:\\/\\/[^\\s\"'<>]+/gi</code>.",
          "Para limpiar espacios múltiples en strings: <code>/\\s{2,}/g</code> y reemplaza con un espacio. Para validar RFCs mexicanos (personas físicas, 13 caracteres): <code>/^[A-Z]{4}\\d{6}[A-Z0-9]{3}$/i</code>. La herramienta resalta cada match con color, lo que permite identificar inmediatamente capturas parciales o greedy matches no intencionales."
        ]
      },
      {
        "heading": "Errores frecuentes al escribir regex",
        "paragraphs": [
          "El <strong>backtracking catastrófico</strong> ocurre con patrones como <code>/(a+)+b/</code> sobre un string largo que no termina en «b»: el motor intenta exponencialmente todas las combinaciones y congela el navegador. La herramienta aplica un timeout para evitar que el tab se cuelgue.",
          "Otro error común: olvidar escapar el punto <code>.</code> cuando se quiere matchear literalmente un punto — <code>/3.14/</code> coincide también con «3x14» o «3 14». La forma correcta es <code>/3\\.14/</code>. El cheatsheet integrado de la herramienta lista los metacaracteres que necesitan escape: <code>. * + ? ^ $ { } [ ] | ( ) \\</code>."
        ],
        "bullets": [
          "Prueba siempre con texto que NO debería coincidir — los falsos positivos son tan peligrosos como los falsos negativos",
          "Los grupos de captura <code>()</code> se indexan desde $1; los non-capturing <code>(?:)</code> no consumen índice",
          "Lookahead positivo <code>(?=...)</code> y negativo <code>(?!...)</code> permiten condiciones sin consumir caracteres"
        ]
      }
    ],
    "steps": [
      {
        "title": "Ingresa el patrón",
        "description": "Escribe tu expresión regular en el campo Patrón, sin las barras delimitadoras. Ejemplo: \\d{4}-\\d{2}-\\d{2} para fechas ISO."
      },
      {
        "title": "Selecciona flags",
        "description": "Activa los flags necesarios (g, i, m, s, u, y) con los toggles. El flag g es el más común para encontrar todas las coincidencias."
      },
      {
        "title": "Pega el texto de prueba",
        "description": "Ingresa el texto sobre el que quieres probar el patrón. Las coincidencias se resaltan en tiempo real mientras escribes."
      },
      {
        "title": "Revisa los resultados",
        "description": "El panel inferior muestra cuántas coincidencias encontró, los grupos capturados y los índices de cada match en el texto."
      }
    ]
  },
  "generador-sitemap": {
    "intro": "El <strong>Generador de Sitemap XML</strong> convierte una lista de URLs en un archivo <code>sitemap.xml</code> válido conforme al protocolo oficial de sitemaps.org, listo para subir a tu servidor y enviar a Google Search Console o Bing Webmaster Tools.",
    "sections": [
      {
        "heading": "Qué es un sitemap y por qué importa para el SEO",
        "paragraphs": [
          "Un sitemap XML es un archivo de índice que le dice a los buscadores qué páginas existen en tu sitio, cuándo se modificaron por última vez y qué tan importantes son entre sí. Aunque Google puede descubrir páginas rastreando links, un sitemap acelera ese proceso — especialmente en sitios nuevos, sitios con poca linkbuilding interna o páginas huérfanas que no reciben ningún enlace interno.",
          "El protocolo Sitemap 0.9 (el estándar actual) define cuatro campos por URL: <code>&lt;loc&gt;</code> (obligatorio), <code>&lt;lastmod&gt;</code> (fecha ISO 8601), <code>&lt;changefreq&gt;</code> y <code>&lt;priority&gt;</code>. Google reconoce oficialmente que usa <code>&lt;lastmod&gt;</code> para decidir si recrawlear una URL, pero ignora mayormente <code>&lt;changefreq&gt;</code> y <code>&lt;priority&gt;</code> — aunque otros buscadores como Bing sí los consideran."
        ],
        "citableSummary": "Google usa <code>lastmod</code> para priorizar recrawls. El límite del estándar es 50,000 URLs y 50 MB por archivo de sitemap."
      },
      {
        "heading": "Cómo configurar frecuencia y prioridad correctamente",
        "paragraphs": [
          "<strong>changefreq</strong> acepta: <code>always</code>, <code>hourly</code>, <code>daily</code>, <code>weekly</code>, <code>monthly</code>, <code>yearly</code>, <code>never</code>. Usa <code>daily</code> para blogs o páginas de noticias que publican contenido cada día; <code>monthly</code> para páginas de producto que cambian de precio o stock con frecuencia moderada; <code>yearly</code> para páginas estáticas como /contacto o /aviso-legal.",
          "<strong>priority</strong> va de 0.0 a 1.0 y es <em>relativo entre las URLs de tu propio sitio</em> — no comparado con otros sitios. La home suele llevar 1.0, las páginas principales de categoría 0.8, las páginas de producto 0.6-0.7 y las páginas de soporte o legales 0.3-0.4. No pongas todas en 1.0: anula el efecto de señalización."
        ]
      },
      {
        "heading": "Pasos para enviarlo a Google Search Console",
        "paragraphs": [
          "Una vez descargado el <code>sitemap.xml</code>, súbelo a la raíz de tu dominio: <code>https://tudominio.com/sitemap.xml</code>. Entra a <a href='https://search.google.com/search-console' target='_blank' rel='noopener'>Google Search Console</a>, selecciona tu propiedad, ve a <em>Indexación → Sitemaps</em> e ingresa la ruta relativa <code>sitemap.xml</code>. Google devolverá el número de URLs detectadas vs. URLs indexadas.",
          "Si tienes más de 50,000 URLs, debes dividirlas en múltiples archivos y crear un <em>sitemap index</em> que los enlace. Para sitios de e-commerce con imágenes, considera agregar un sitemap de imágenes separado (<code>&lt;image:image&gt;</code>) que puede mejorar el descubrimiento en Google Imágenes."
        ],
        "bullets": [
          "Verifica que todas las URLs sean canónicas (sin parámetros UTM ni paginación con ?page=2)",
          "No incluyas URLs con noindex, URLs de admin, URLs de checkout ni páginas de error 404",
          "Agrega la ruta del sitemap en tu robots.txt: <code>Sitemap: https://tudominio.com/sitemap.xml</code>"
        ]
      }
    ],
    "steps": [
      {
        "title": "Pega tus URLs",
        "description": "Una URL por línea, comenzando con https:// o http://. El generador valida automáticamente el formato antes de procesar."
      },
      {
        "title": "Configura los parámetros",
        "description": "Selecciona changefreq y priority globales. Si necesitas valores distintos por URL, puedes editar el XML resultante directamente."
      },
      {
        "title": "Genera y descarga",
        "description": "Haz clic en Generar. El XML aparece en el panel con el encabezado correcto <?xml version=\"1.0\" encoding=\"UTF-8\"?> y el namespace de sitemaps.org."
      },
      {
        "title": "Envía a Google y Bing",
        "description": "Sube el archivo a la raíz de tu servidor y envíalo desde Google Search Console (Sitemaps) y Bing Webmaster Tools (Sitemaps)."
      }
    ]
  },
  "plantillas-prompts": {
    "intro": "La <strong>Biblioteca de Plantillas de Prompts</strong> reúne 18 prompts probados para las tareas más frecuentes con IA: desde redactar un artículo SEO hasta depurar código o preparar una clase. Cada plantilla tiene placeholders en mayúsculas que reemplazas con tu contexto — sin empezar desde cero cada vez.",
    "sections": [
      {
        "heading": "Por qué las plantillas superan al prompt improvisado",
        "paragraphs": [
          "Un prompt mal estructurado produce respuestas genéricas. La diferencia entre «escribe un artículo sobre café» y un prompt que especifica audiencia, tono, extensión, estructura y ejemplos a incluir es abismal en la calidad del output. Las plantillas en esta biblioteca incorporan las prácticas documentadas por investigadores de prompting: rol explícito, contexto, restricciones negativas («no uses jerga corporativa») y formato de salida esperado.",
          "El formato de placeholder <code>[EN MAYÚSCULAS]</code> tiene una ventaja práctica: es visualmente imposible confundir el placeholder con el contenido real, y puedes buscar rápidamente con Ctrl+F si olvidaste reemplazar alguno antes de pegar el prompt."
        ],
        "citableSummary": "Las 6 categorías cubren: SEO, Redacción, Programación, Marketing, Análisis y Aprendizaje. Filtra por texto o categoría para encontrar la plantilla correcta en segundos."
      },
      {
        "heading": "Ejemplos de plantillas disponibles",
        "paragraphs": [
          "En la categoría <strong>SEO</strong>: plantilla para briefing de artículo con intención de búsqueda, análisis de competidores, y optimización de meta descriptions. En <strong>Redacción</strong>: estructura de post de blog con gancho, desarrollo y CTA, reescritura de textos legales en lenguaje simple, y generación de variantes A/B para headlines.",
          "En <strong>Programación</strong>: revisión de código con explicación de bugs y sugerencias de refactor, generación de tests unitarios para una función, y documentación de APIs en formato Markdown. En <strong>Marketing</strong>: copy para anuncio en Meta Ads con hook emocional y CTA, y guion de video corto para TikTok o Reels con estructura gancho-desarrollo-cierre."
        ]
      },
      {
        "heading": "Cómo adaptar las plantillas a tu flujo de trabajo",
        "paragraphs": [
          "Copia la plantilla con un click y pégala directamente en ChatGPT, Claude, Gemini o cualquier interfaz de IA. El formato es agnóstico al modelo — funciona igual en todos porque se basa en instrucciones en lenguaje natural, no en sintaxis específica de ninguna API.",
          "Para uso repetitivo, guarda la plantilla completada (con tus placeholders ya rellenados) en un documento de texto o en el sistema de fragmentos de tu editor. Herramientas como TextExpander, Raycast Snippets o el bloc de notas de tu teléfono funcionan como biblioteca personal rápida."
        ],
        "bullets": [
          "Siempre especifica el modelo o la herramienta de IA que usarás — algunos prompts funcionan mejor en modelos con contexto largo",
          "Si el output no cumple, agrega una instrucción de refinamiento al final del prompt en vez de reescribir todo",
          "Los prompts de programación mejoran significativamente si incluyes el lenguaje, la versión y el contexto del proyecto"
        ]
      }
    ]
  },
  "comparador-textos": {
    "intro": "El <strong>Comparador de Textos</strong> detecta similitud entre dos fragmentos usando el algoritmo de similitud Jaccard con shingles de 5 palabras, y resalta visualmente las frases idénticas. Es más preciso que un simple conteo de palabras comunes porque evalúa secuencias, no ocurrencias aisladas.",
    "sections": [
      {
        "heading": "Cómo funciona la similitud Jaccard con shingles",
        "paragraphs": [
          "Un <strong>shingle de 5 palabras</strong> es una ventana deslizante de 5 palabras consecutivas. El texto «el gato come pescado fresco todos los días» genera shingles como «el gato come pescado fresco», «gato come pescado fresco todos», «come pescado fresco todos los», etc. La similitud Jaccard mide cuántos shingles comparten ambos textos dividido entre cuántos shingles únicos existen en total (intersección / unión).",
          "Este método detecta paráfrasis débiles mejor que comparar palabras sueltas: si alguien cambia solo algunos adjetivos pero conserva las secuencias de sustantivos y verbos, los shingles lo revelan. Un porcentaje por encima del 30% en textos largos (500+ palabras) o 20% en textos cortos merece revisión manual."
        ],
        "citableSummary": "Jaccard con shingles de 5 palabras detecta paráfrasis parciales. Un score sobre 30% en textos largos indica similitud significativa que merece revisión."
      },
      {
        "heading": "Casos de uso en SEO y contenido",
        "paragraphs": [
          "En SEO, el contenido duplicado interno (dos artículos sobre el mismo tema con párrafos copiados entre sí) puede diluir autoridad y generar señales de baja calidad ante Google. Antes de publicar un artículo nuevo, compáralo contra el que ya tienes en el mismo cluster temático.",
          "Para detectar paráfrasis de IA, las herramientas de reescritura automática suelen cambiar sinónimos pero conservan la estructura de oraciones — exactamente lo que captura el análisis de shingles. Un texto reescrito con GPT o similar que comparte más del 25% de shingles con el original no está suficientemente diferenciado para pasar como contenido único."
        ]
      },
      {
        "heading": "Limitaciones que debes conocer",
        "paragraphs": [
          "La herramienta compara texto plano normalizado (sin puntuación, en minúsculas). No analiza semántica: dos textos con el mismo significado pero vocabulario completamente distinto marcarán 0% de similitud aunque sean equivalentes en contenido. Para análisis semántico profundo se requieren embeddings vectoriales, que están fuera del alcance de una herramienta de navegador.",
          "El análisis de oraciones idénticas es complementario: si la similitud Jaccard es baja pero hay oraciones completas iguales, aparecerán en el panel de coincidencias exactas. Esto ocurre cuando se copian párrafos específicos (introducción, conclusión) en textos por lo demás originales."
        ],
        "bullets": [
          "Normaliza ambos textos al mismo idioma antes de comparar — mezclar español e inglés reduce artificialmente el score",
          "Para e-commerce, compara descripciones de producto contra las del fabricante para detectar contenido duplicado exacto",
          "Los textos legales (términos y condiciones, avisos de privacidad) suelen tener alta similitud por diseño — no es plagio"
        ]
      }
    ],
    "steps": [
      {
        "title": "Pega el texto original",
        "description": "En el panel izquierdo, ingresa el texto de referencia: el artículo publicado, el texto del proveedor o el documento original."
      },
      {
        "title": "Pega el texto a comparar",
        "description": "En el panel derecho, ingresa el texto sospechoso: el artículo nuevo, la versión reescrita o el contenido del competidor."
      },
      {
        "title": "Analiza los resultados",
        "description": "El score Jaccard aparece en porcentaje. Desplázate al panel de coincidencias para ver las frases resaltadas y el conteo de oraciones idénticas."
      }
    ]
  },
  "numero-a-letras": {
    "intro": "El <strong>Conversor de Número a Letras</strong> transforma cantidades numéricas en su escritura en español, generando simultáneamente cinco formatos: texto general, pesos mexicanos, pesos argentinos, dólares y euros — todos con la estructura <em>XX/100</em> requerida en documentos formales.",
    "sections": [
      {
        "heading": "Por qué los documentos formales requieren número en letras",
        "paragraphs": [
          "En México, el SAT y el Código de Comercio establecen que los cheques, pagarés y facturas en papel deben expresar el monto tanto en número como en letras. La razón histórica es prevenir alteraciones: es mucho más difícil modificar «DOCE MIL TRESCIENTOS CUARENTA Y CINCO PESOS 67/100 M.N.» que cambiar un dígito en «$12,345.67». La abreviatura <strong>M.N.</strong> (Moneda Nacional) aparece después del monto en pesos mexicanos.",
          "En contratos notariales, la escritura en letras del monto también es obligatoria. Un error tipográfico en la cantidad escrita puede invalidar el documento o generar conflictos legales si existe contradicción entre el número y la letra."
        ],
        "citableSummary": "En México, cheques y facturas en papel requieren el monto en letras con formato XX/100 M.N. por obligación legal. Esta herramienta genera los 5 formatos más usados simultáneamente."
      },
      {
        "heading": "Formatos generados y sus diferencias",
        "paragraphs": [
          "El formato <strong>pesos mexicanos</strong> usa «PESOS» y «CENTAVOS» con el sufijo «M.N.». Ejemplo para $15,230.50: <em>QUINCE MIL DOSCIENTOS TREINTA PESOS 50/100 M.N.</em>. El formato <strong>pesos argentinos</strong> usa la misma estructura pero sin «M.N.» y con las convenciones regionales de género gramatical («UN MILLÓN» vs «UNA MILLÓN» — la herramienta aplica la concordancia correcta automáticamente).",
          "El formato <strong>dólares</strong> genera <em>QUINCE MIL DOSCIENTOS TREINTA DÓLARES 50/100 USD</em> o <em>US DOLLARS</em> según la convención del documento. El formato <strong>euros</strong> sigue la misma lógica con «EUROS». El formato <strong>texto general</strong> es útil para cualquier otro contexto: solo el número en palabras sin mención de moneda."
        ]
      },
      {
        "heading": "Errores comunes al escribir montos en letras manualmente",
        "paragraphs": [
          "El error más frecuente es en los millares compuestos. «1,100» se escribe «MIL CIEN», no «UN MIL CIEN». En español, «un mil» es incorrecto — se dice simplemente «mil». Sin embargo, «dos mil», «tres mil» sí llevan el número multiplicador. La herramienta aplica esta regla automáticamente.",
          "Otro error habitual: «21» se escribe «VEINTIÚN» (con tilde cuando precede a sustantivo masculino: «VEINTIÚN PESOS») pero «VEINTIUNA» ante femenino. Los decimales siempre van como fracción sobre 100 en documentos formales, incluso si son cero: «CINCO MIL PESOS 00/100 M.N.», no «CINCO MIL PESOS EXACTOS»."
        ],
        "bullets": [
          "Rango soportado: hasta cientos de miles de millones (999,999,999,999.99)",
          "Los centavos se expresan siempre como XX/100, no como fracción decimal ni en letras",
          "Para CFDI digitales, el SAT no exige monto en letras — es solo para documentos impresos y contratos"
        ]
      }
    ],
    "steps": [
      {
        "title": "Ingresa el número",
        "description": "Escribe la cantidad con punto decimal para los centavos. Ejemplo: 12345.67 para doce mil trescientos cuarenta y cinco pesos con 67 centavos."
      },
      {
        "title": "Elige el formato",
        "description": "Selecciona la moneda o usa el formato de texto general. Los 5 formatos se generan simultáneamente y puedes copiar el que necesites."
      },
      {
        "title": "Copia el resultado",
        "description": "Haz clic en el botón de copiar junto al formato que necesitas. El texto ya incluye mayúsculas, acentos y la fracción XX/100 lista para pegar en tu documento."
      }
    ]
  },
  "calculadora-descuento": {
    "intro": "La <strong>Calculadora de Descuento</strong> calcula el precio final real cuando se aplican un descuento principal, un cupón adicional y un impuesto (como el IVA). Muestra también el ahorro total en pesos y el porcentaje de descuento efectivo — porque los descuentos compuestos <em>no</em> se suman simplemente.",
    "sections": [
      {
        "heading": "Por qué los descuentos compuestos no se suman",
        "paragraphs": [
          "Si un producto tiene 30% de descuento y además un cupón del 20%, el descuento total <em>no</em> es 50%. El primer descuento se aplica sobre el precio original: $1,000 × 0.70 = $700. El segundo descuento se aplica sobre el precio ya reducido: $700 × 0.80 = $560. El descuento real es del 44%, no del 50%.",
          "Este malentendido es extremadamente común durante el <strong>Buen Fin</strong>, <strong>Hot Sale</strong> o cualquier evento con cupones adicionales. Las tiendas lo saben — por eso apilan descuentos en vez de dar un único descuento mayor: «50% + 20% extra» suena mejor que «44% de descuento real» aunque el precio final sea idéntico."
        ],
        "citableSummary": "30% + 20% de descuento compuesto = 44% real, no 50%. La calculadora muestra el descuento efectivo y el precio final incluyendo impuestos opcionalmente."
      },
      {
        "heading": "El papel del IVA en las ofertas mexicanas",
        "paragraphs": [
          "En México, el IVA es del 16% y generalmente ya está incluido en el precio de venta al público (PVP). Sin embargo, en compras B2B, en importaciones o cuando el precio aparece «más IVA», necesitas agregarlo al final. La calculadora permite aplicar el impuesto <em>después</em> de los descuentos, que es el orden correcto: descuento sobre precio base, luego IVA sobre el precio con descuento.",
          "Ejemplo práctico: laptop con precio de $18,000 con 15% de descuento por Buen Fin + cupón bancario de 10% adicional: precio con descuento principal = $15,300; con cupón = $13,770; si el precio era sin IVA, suma 16% → precio final $15,973.20. Ahorro total: $4,026.80 (22.37% real)."
        ]
      },
      {
        "heading": "Usos más allá de las ofertas de e-commerce",
        "paragraphs": [
          "Los compradores B2B negocian descuentos escalonados con proveedores: «15% por volumen + 5% por pago anticipado». La calculadora muestra exactamente cuánto se paga y cuánto se ahorra frente al precio de lista, facilitando la comparación entre proveedores con distintas estructuras de descuento.",
          "Para revendedores y distribuidores, calcular el margen real requiere conocer el costo después de descuentos y antes de IVA acreditable. La herramienta también funciona para calcular precios de venta: parte del costo, agrega el margen deseado y el IVA, y obtén el precio sugerido al público."
        ],
        "bullets": [
          "El Buen Fin 2025 en México se realizó en noviembre — guarda los recibos para comparar el descuento real con el anunciado",
          "Algunas tiendas aplican el cupón ANTES del descuento principal (orden inverso) — siempre verifica el precio final",
          "Para suscripciones con «primer mes gratis + 50% los siguientes 3 meses», el ahorro real en 12 meses es solo ~18%"
        ]
      }
    ],
    "steps": [
      {
        "title": "Ingresa el precio original",
        "description": "El precio de lista antes de cualquier descuento. En México, generalmente incluye IVA — si no, activa la opción de agregar impuesto al final."
      },
      {
        "title": "Agrega el descuento principal",
        "description": "El porcentaje de la oferta principal: 20%, 30%, 50%, etc. La calculadora muestra el precio intermedio después de este descuento."
      },
      {
        "title": "Agrega el descuento adicional (opcional)",
        "description": "El cupón, descuento bancario o promoción extra. Se aplica sobre el precio ya reducido por el primer descuento."
      },
      {
        "title": "Revisa el precio final y el ahorro real",
        "description": "La calculadora muestra precio final, ahorro en pesos y porcentaje de descuento efectivo. Compara con el descuento anunciado para verificar si la oferta es lo que parece."
      }
    ]
  },
  "markdown-html": {
    "intro": "El conversor <strong>Markdown ↔ HTML</strong> es bidireccional: convierte Markdown a HTML renderizado para publicar, y también HTML a Markdown para editar contenido con una sintaxis más simple. El preview en vivo muestra exactamente cómo quedará el resultado final.",
    "sections": [
      {
        "heading": "Sintaxis Markdown soportada",
        "paragraphs": [
          "La herramienta implementa CommonMark, el estándar más adoptado. Soporta headings (<code># H1</code> hasta <code>###### H6</code>), <strong>negrita</strong> (<code>**texto**</code>), <em>cursiva</em> (<code>*texto*</code>), <code>código inline</code> (<code>`código`</code>), bloques de código con indicador de lenguaje (<code>```javascript</code>), listas ordenadas y no ordenadas, links (<code>[texto](url)</code>), imágenes (<code>![alt](url)</code>), citas (<code>&gt; texto</code>) y separadores (<code>---</code>).",
          "Para tablas, usa la sintaxis extendida GFM (GitHub Flavored Markdown): encabezados con <code>|</code> separadores y la línea de alineación con guiones. Ejemplo: <code>| Col 1 | Col 2 |</code> / <code>|-------|-------|</code>. Esta extensión también está disponible en plataformas como GitHub, GitLab, Notion y Obsidian."
        ],
        "citableSummary": "Implementa CommonMark + extensiones GFM (tablas, tachado, checkbox lists). Compatible con GitHub, GitLab, Notion, Obsidian y la mayoría de static site generators."
      },
      {
        "heading": "Cuándo usar Markdown y cuándo HTML directo",
        "paragraphs": [
          "<strong>Usa Markdown</strong> cuando escribes documentación técnica, READMEs de repositorios, artículos en plataformas como Dev.to o Hashnode, o cuando el contenido lo van a mantener personas sin conocimientos de HTML. La sintaxis es legible incluso sin renderizar.",
          "<strong>Usa HTML directo</strong> cuando necesitas control fino sobre atributos (clases, IDs, data-attributes), cuando insertas componentes con JavaScript, o cuando el CMS recibe HTML directamente (como WordPress con el editor clásico o WooCommerce en descripciones de producto). La conversión HTML → Markdown es útil para limpiar HTML exportado de Word o Google Docs, que suele estar lleno de estilos inline innecesarios."
        ]
      },
      {
        "heading": "Casos prácticos de uso bidireccional",
        "paragraphs": [
          "Un caso muy común: tienes el contenido de una página de aterrizaje en HTML y quieres moverlo a un sistema basado en Markdown (Jekyll, Hugo, Astro, VitePress). La dirección HTML → Markdown hace esa migración en segundos, generando Markdown limpio sin los divs y spans del HTML original.",
          "En sentido inverso, si escribes documentación técnica en Markdown y necesitas publicarla como página HTML estática o enviarla como email HTML, la dirección Markdown → HTML genera el markup correcto con todos los elementos semánticos. Los bloques de código con resaltado de sintaxis son especialmente útiles para documentación de APIs o tutoriales técnicos."
        ],
        "bullets": [
          "El HTML generado usa tags semánticos: <code>&lt;strong&gt;</code> en vez de <code>&lt;b&gt;</code>, <code>&lt;em&gt;</code> en vez de <code>&lt;i&gt;</code>",
          "Las URLs en links se sanitizan para prevenir XSS (se eliminan protocolos javascript:)",
          "Para emails HTML, usa la opción de exportar con estilos inline — los clientes de correo ignoran CSS en <code>&lt;style&gt;</code>"
        ]
      }
    ],
    "steps": [
      {
        "title": "Selecciona la dirección de conversión",
        "description": "Elige Markdown → HTML o HTML → Markdown con el selector en la parte superior de la herramienta."
      },
      {
        "title": "Ingresa el contenido",
        "description": "Pega o escribe el texto en el panel izquierdo. El panel derecho muestra el resultado renderizado en tiempo real."
      },
      {
        "title": "Revisa el preview",
        "description": "Verifica que la estructura visual sea la esperada: headings, listas, código y links deben verse correctamente formateados."
      },
      {
        "title": "Copia el resultado",
        "description": "Usa el botón Copiar para llevar el HTML o Markdown resultante al portapapeles, listo para pegar en tu editor, CMS o repositorio."
      }
    ]
  },
  "html-formatter": {
    "intro": "El <strong>HTML Beautifier / Minifier</strong> formatea código HTML para legibilidad en desarrollo o lo comprime para producción. Dos modos, una herramienta — con estadísticas en vivo del porcentaje de reducción de tamaño.",
    "sections": [
      {
        "heading": "Beautify: indentación inteligente por tipo de tag",
        "paragraphs": [
          "El modo Beautify formatea con indentación configurable (2 espacios, 4 espacios o tab). La herramienta distingue entre <strong>tags de bloque</strong> (<code>div</code>, <code>section</code>, <code>article</code>, <code>ul</code>, <code>table</code>) que abren nueva línea e indentación, y <strong>tags inline</strong> (<code>a</code>, <code>span</code>, <code>em</code>, <code>strong</code>, <code>code</code>) que permanecen dentro del flujo del texto sin romper el párrafo.",
          "Esta distinción es importante: un beautifier mal configurado puede agregar saltos de línea entre un <code>&lt;a&gt;</code> y el texto que le rodea, lo que en algunos navegadores genera un espacio en blanco no deseado en el renderizado. El beautifier de esta herramienta respeta el modelo de formateo de CSS y no introduce espacios invisibles."
        ],
        "citableSummary": "Beautify respeta tags inline vs. bloque para no introducir espacios de renderizado no deseados. Minify reduce típicamente 20-40% en HTML real."
      },
      {
        "heading": "Minify: qué elimina y cuánto ahorra",
        "paragraphs": [
          "El minificador elimina: espacios en blanco entre tags, saltos de línea, indentación, comentarios HTML (<code>&lt;!-- --&gt;</code>) y espacios múltiples dentro de atributos. Para un archivo HTML típico de página de aterrizaje (15-30 KB), la reducción suele ser del 20-35%. Para páginas con mucha indentación profunda o comentarios extensos de CMS (como WordPress con Gutenberg), puede llegar al 40%.",
          "Lo que el minificador <em>no</em> modifica: el contenido de texto visible, los valores de atributos, el contenido dentro de <code>&lt;script&gt;</code> y <code>&lt;style&gt;</code> (que requieren minificadores especializados), y los atributos <code>alt</code> e <code>aria-label</code>. Los comentarios condicionales de IE (<code>&lt;!--[if lt IE 9]&gt;</code>) tampoco se eliminan para preservar compatibilidad."
        ]
      },
      {
        "heading": "Cuándo cada modo tiene sentido en un flujo real",
        "paragraphs": [
          "<strong>Beautify</strong> es útil cuando recibes HTML de un generador automático (exportadores de Figma, Webflow, Elementor, email builders), que típicamente produce código en una sola línea o con indentación inconsistente. Formatearlo antes de editarlo manualmente ahorra tiempo y reduce errores al identificar la estructura de tags.",
          "<strong>Minify</strong> se usa antes de desplegar a producción cuando el servidor no tiene compresión Gzip/Brotli activa, o para reducir el tamaño de emails HTML (los servidores de correo tienen límites estrictos, Gmail corta mensajes sobre ~102 KB). También sirve para reducir el tamaño de plantillas HTML incrustadas en código JavaScript o Python."
        ],
        "bullets": [
          "Combina minify con compresión Gzip en el servidor para reducciones totales del 70-80%",
          "No minifiques archivos HTML que vas a editar — guarda siempre el original formateado",
          "El minificador preserva los atributos data-* y aria-* sin modificación"
        ]
      }
    ],
    "steps": [
      {
        "title": "Pega tu HTML",
        "description": "Copia el HTML desde tu editor, desde el inspector del navegador (Ctrl+U para ver código fuente) o desde tu CMS y pégalo en el panel de entrada."
      },
      {
        "title": "Elige el modo",
        "description": "Selecciona Beautify para legibilidad (configura la indentación: 2 espacios es el estándar más común en proyectos web modernos) o Minify para producción."
      },
      {
        "title": "Revisa las estadísticas",
        "description": "El panel muestra el tamaño original, el tamaño resultante y el porcentaje de reducción o expansión en tiempo real."
      },
      {
        "title": "Copia o descarga",
        "description": "Usa el botón Copiar para llevar el resultado al portapapeles, o descárgalo como archivo .html directamente."
      }
    ]
  },
  "generador-anagrama": {
    "intro": "El <strong>Generador de Anagramas</strong> reordena todas las letras de una palabra para encontrar las permutaciones posibles. Hasta 7 letras genera la lista completa; desde 8 en adelante muestra una selección aleatoria representativa, porque el número de permutaciones crece factorialmente y saturaria el navegador.",
    "sections": [
      {
        "heading": "La matemática detrás de los anagramas",
        "paragraphs": [
          "Para una palabra de <em>n</em> letras distintas, el número de permutaciones es <em>n!</em> (factorial). Una palabra de 5 letras tiene 120 combinaciones; de 6 letras, 720; de 7 letras, 5,040 — todas manejables en el navegador. Con 8 letras son 40,320; con 9, 362,880; con 10, 3,628,800. Mostrar todos esos resultados sería impráctico y consumiría cientos de megabytes de memoria.",
          "Cuando existen letras repetidas, el número real de anagramas únicos se reduce. La fórmula correcta es <em>n! / (k₁! × k₂! × ...)</em> donde k₁, k₂... son las frecuencias de cada letra repetida. «MAMA» tiene 4!/2!2! = 6 anagramas únicos (MAMA, MAAM, AMMA, AMAM, AAMM, MAAM), no 24."
        ],
        "citableSummary": "Hasta 7 letras: todas las permutaciones (máx. 5,040). Desde 8: muestra 50 aleatorias. Letras repetidas reducen el total real por la fórmula n!/(k₁!k₂!...)."
      },
      {
        "heading": "Usos reales: crucigramas, naming y juegos",
        "paragraphs": [
          "En <strong>crucigramas y pasatiempos</strong>, los anagramas son una técnica estándar de pistas. «ROMA» anagramado da «MORA», «AMOR», «RAMO» y «OMAR» — todos son anagramas válidos entre sí. La herramienta es útil tanto para crear pistas como para resolverlas.",
          "Para <strong>naming y branding</strong>, los emprendedores usan anagramas del nombre del fundador, del servicio o de una palabra clave para generar nombres de marca originales y pronunciables. Buscar anagramas de tu nombre o de una palabra relacionada con tu negocio puede revelar combinaciones sonoras que no habrías considerado manualmente.",
          "En juegos de palabras como Scrabble o Wordle en español, identificar todos los anagramas posibles de un conjunto de letras es una estrategia legítima para maximizar el puntaje."
        ]
      },
      {
        "heading": "Diferencia entre anagrama y permutación",
        "paragraphs": [
          "La herramienta genera <strong>todas las permutaciones posibles</strong> de las letras ingresadas — incluyendo combinaciones que no son palabras reales del español. Un anagrama en el sentido estricto del lenguaje es solo aquella permutación que forma una palabra con significado. La herramienta no filtra por diccionario: muestra todas las combinaciones y tú identificas cuáles son palabras reales.",
          "Esta distinción es importante para juegos de palabras: «PATO» genera «TAPO», «TOPA», «OPAT» y otras combinaciones — solo las primeras dos son palabras del español. Si necesitas filtrar por palabras válidas, puedes cruzar los resultados manualmente con un diccionario online."
        ],
        "bullets": [
          "Las tildes y la ñ se incluyen como letras distintas — «n» y «ñ» generan anagramas diferentes",
          "Ingresa solo el stem de la palabra (sin artículos ni preposiciones) para obtener resultados más útiles",
          "Para nombres propios, prueba sin acento y con acento — los resultados pueden variar"
        ]
      }
    ]
  },
  "calculadora-horas-trabajadas": {
    "intro": "La <strong>Calculadora de Horas Trabajadas</strong> suma los horarios de múltiples días, descuenta el tiempo de descanso y calcula el monto total a cobrar según tu tarifa por hora — en la moneda que elijas. Ideal para freelancers que cobran por tiempo y para empleados que llevan su propio control de asistencia.",
    "sections": [
      {
        "heading": "Cómo se calcula el tiempo neto de trabajo",
        "paragraphs": [
          "Para cada día, ingresas la hora de entrada, la hora de salida y los minutos de descanso (comida, breaks). La herramienta calcula: <em>(hora salida − hora entrada) − minutos descanso = horas netas</em>. Ejemplo: entrada 9:00, salida 18:30, descanso 60 minutos → 9.5 horas − 1 hora = <strong>8.5 horas netas</strong>.",
          "La calculadora soporta <strong>turnos que cruzan medianoche</strong>: si entras a las 22:00 y sales a las 06:00, la herramienta interpreta correctamente que la duración es 8 horas (no −16 horas). Esto es esencial para enfermeras, guardias de seguridad, operadores de call center nocturno y cualquier trabajo en turno de noche."
        ],
        "citableSummary": "Soporta turnos nocturnos que cruzan medianoche. Calcula horas netas descontando descansos y multiplica por la tarifa para obtener el monto total a cobrar."
      },
      {
        "heading": "Cálculo de tarifas y monedas",
        "paragraphs": [
          "Una vez que tienes el total de horas trabajadas, ingresas tu tarifa por hora en la moneda de tu preferencia (MXN, USD, EUR, ARS, COP, entre otras). La calculadora multiplica y muestra el monto bruto a cobrar. Si tu tarifa está en USD y tu cliente paga en MXN, puedes convertir el resultado usando el <a href='/conversor-divisas'>conversor de divisas</a> para obtener el monto en pesos al tipo de cambio actual.",
          "Para freelancers en plataformas como Upwork o Freelancer, donde las tarifas son en USD por hora, este cálculo es diario: total de horas logged × tarifa = monto a facturar. Para empleados con sueldo mensual que quieren calcular su costo-hora (útil para saber cuánto vale realmente cada hora de su tiempo), dividen su sueldo entre las horas trabajadas en el mes."
        ]
      },
      {
        "heading": "Aplicaciones para freelancers y planilla",
        "paragraphs": [
          "Un error común en freelancing es no contabilizar el tiempo de reuniones, revisiones y comunicación con el cliente — solo las horas de producción efectiva. La calculadora permite agregar cada bloque de tiempo por separado, incluyendo los 30 minutos de una videollamada o la hora de revisiones, para que la factura refleje el tiempo real invertido.",
          "Para empleados en México, la Ley Federal del Trabajo establece que la jornada ordinaria es de 8 horas diarias (jornada diurna) o 7 horas (nocturna). Las horas extra se pagan al doble las primeras 9 horas semanales y al triple las siguientes. La calculadora puede usarse para identificar cuántas horas extra se acumularon en la semana y calcular el monto adicional que corresponde."
        ],
        "bullets": [
          "Para proyectos con tarifa fija, divide el monto del proyecto entre las horas que estimas para verificar que tu tarifa efectiva sea razonable",
          "Guarda o imprime el reporte semanal como respaldo antes de emitir la factura al cliente",
          "En México, las horas extra voluntarias tienen un límite legal de 3 horas diarias y 9 semanales (Art. 66 LFT)"
        ]
      }
    ],
    "steps": [
      {
        "title": "Agrega los días trabajados",
        "description": "Para cada día, ingresa la hora de entrada (formato 24h o 12h), la hora de salida y los minutos de descanso. Haz clic en Agregar día para sumar más registros."
      },
      {
        "title": "Ingresa tu tarifa por hora",
        "description": "Escribe el monto que cobras por hora y selecciona la moneda. Puedes dejarlo en 0 si solo necesitas el total de horas sin calcular el monto."
      },
      {
        "title": "Revisa el resumen",
        "description": "La calculadora muestra las horas netas por día, el total acumulado y el monto a cobrar. Los turnos nocturnos se identifican automáticamente."
      }
    ]
  },
  "firma-email": {
    "intro": "El <strong>Generador de Firma de Email</strong> crea una firma HTML profesional con tabla compatible con todos los clientes de correo — Gmail, Outlook, Apple Mail, Thunderbird — sin depender de CSS externo que estos clientes ignoran. El resultado se copia como rich text listo para pegar directamente en la configuración de tu cliente.",
    "sections": [
      {
        "heading": "Por qué las firmas de email requieren HTML con tabla",
        "paragraphs": [
          "Los clientes de correo son notoriamente restrictivos con el CSS: Gmail ignora <code>&lt;style&gt;</code> en el <code>&lt;head&gt;</code>, Outlook usa el motor de renderizado de Word (no WebKit ni Blink) y Apple Mail tiene sus propias interpretaciones de modelo de caja. La única forma de garantizar que una firma se vea igual en todos estos clientes es usar <strong>tablas HTML con estilos inline</strong> — la técnica que se usaba en el diseño web de los 2000 y que los clientes de correo nunca dejaron de requerir.",
          "La herramienta genera exactamente ese HTML: <code>&lt;table&gt;</code> con <code>cellpadding</code>, <code>cellspacing</code>, <code>border=0</code> y todos los estilos como atributos <code>style</code> inline en cada celda. No usa Flexbox, no usa Grid, no usa variables CSS — porque ninguna de esas tecnologías funciona de manera confiable en Outlook 2019 o Gmail en iOS."
        ],
        "citableSummary": "Las firmas de email requieren tablas HTML con estilos inline para ser compatibles con Outlook, Gmail, Apple Mail y Thunderbird. Esta herramienta genera ese HTML directamente."
      },
      {
        "heading": "Campos disponibles y cuáles incluir",
        "paragraphs": [
          "La firma soporta: nombre completo, cargo, empresa, teléfono (con formato internacional recomendado: +52 55 1234 5678 para México), email de contacto, URL del sitio web y perfil de LinkedIn. También permite elegir el color de acento de la marca — ese color se aplica al nombre y a la línea separadora para dar identidad visual sin sobrecargar.",
          "En cuanto a qué incluir: menos es más. Las firmas más efectivas tienen nombre, cargo, empresa y un único canal de contacto (teléfono o email, no ambos si ya están en el encabezado del correo). El logo solo vale la pena si el cliente lo va a ver renderizado — muchos clientes bloquean imágenes externas por defecto, lo que hace que el logo no aparezca."
        ]
      },
      {
        "heading": "Cómo agregar la firma en cada cliente",
        "paragraphs": [
          "En <strong>Gmail</strong>: Configuración (ícono de engranaje) → Ver toda la configuración → Firma → Crear nueva. Pega el rich text copiado directamente en el campo de firma. Si pegas HTML plano en vez de rich text, verás el código en vez de la firma formateada.",
          "En <strong>Outlook</strong> (escritorio): Archivo → Opciones → Correo → Firmas. Crea una nueva firma y pega el rich text. En Outlook en la web (OWA): Configuración → Correo → Redactar y responder → Firma de correo electrónico. En <strong>Apple Mail</strong>: Preferencias → Firmas → selecciona tu cuenta → botón + → pega en el panel de edición."
        ],
        "bullets": [
          "No incluyas imágenes alojadas en servicios temporales — si el servidor desaparece, el logo deja de aparecer en todos los correos enviados previamente",
          "El teléfono en formato E.164 (+521XXXXXXXXXX) permite que los móviles detecten y enlacen el número automáticamente",
          "Prueba la firma enviándote un correo de prueba desde cada cliente que uses antes de activarla definitivamente"
        ]
      }
    ],
    "steps": [
      {
        "title": "Completa tus datos",
        "description": "Ingresa nombre, cargo, empresa, teléfono, email, web y LinkedIn. Todos los campos son opcionales — incluye solo los que usarás."
      },
      {
        "title": "Elige el color de marca",
        "description": "Selecciona el color hexadecimal que identifica tu empresa o rol. Se aplica al nombre y al separador visual."
      },
      {
        "title": "Previsualiza la firma",
        "description": "El preview en tiempo real muestra cómo quedará la firma. Verifica que todos los datos sean correctos y que el layout sea limpio."
      },
      {
        "title": "Copia e instala",
        "description": "Haz clic en Copiar firma. Abre la configuración de firmas de tu cliente de correo (Gmail, Outlook, Apple Mail) y pega directamente — el formato rich text se conserva."
      }
    ]
  },
  "marca-agua-pdf": {
    "intro": "Agregar una marca de agua a un PDF es el método más directo para proteger documentos confidenciales, diferenciar versiones de trabajo y cumplir con políticas internas de clasificación de información. Esta herramienta lo hace directamente en el navegador: no hay carga a servidores, no se crea ninguna cuenta y el archivo procesado nunca sale de tu equipo.",
    "sections": [
      {
        "heading": "¿Por qué importa la marca de agua en documentos de trabajo?",
        "paragraphs": [
          "En entornos corporativos y legales, los documentos circulan entre múltiples personas antes de aprobarse. Un contrato sin la leyenda <strong>BORRADOR</strong> puede confundirse con la versión final; un informe financiero sin <strong>CONFIDENCIAL</strong> puede compartirse más allá del destinatario correcto. La marca de agua diagonal es reconocida internacionalmente como indicador de estado o clasificación.",
          "También es útil para estudios, despachos y freelancers que envían propuestas de diseño, presupuestos o portfolios: estampar el nombre del cliente o <em>«Solo para revisión»</em> establece contexto sin alterar el contenido legible del documento."
        ],
        "citableSummary": "La marca de agua en PDF comunica el estado del documento (borrador, confidencial, muestra) de forma visual en todas las páginas, previniendo usos incorrectos sin alterar el contenido original."
      },
      {
        "heading": "Configuración de opacidad, tamaño y color",
        "paragraphs": [
          "Una marca de agua demasiado oscura tapa el texto legible; demasiado clara pasa desapercibida. Para documentos de texto, una opacidad del 15 al 25 % en gris claro suele ser el equilibrio correcto. Si el PDF contiene imágenes o gráficas oscuras, conviene subir la opacidad al 35-40 % o usar color blanco.",
          "El tamaño de la fuente depende del formato del documento: para hojas A4 en orientación vertical, un tamaño de 48-60 pt abarca el ancho de página sin cortar las palabras; para presentaciones en horizontal (16:9), un tamaño de 72-90 pt garantiza visibilidad en la diagonal. Puedes ajustar estos parámetros libremente antes de descargar."
        ],
        "bullets": [
          "Texto sugerido: CONFIDENCIAL · BORRADOR · DRAFT · SOLO PARA REVISIÓN · MUESTRA · CANCELADO",
          "Opacidad recomendada para texto sobre blanco: 15-25 %",
          "Opacidad recomendada para texto sobre imágenes oscuras: 35-45 %",
          "Tamaño típico A4 vertical: 48-60 pt · A4 horizontal / presentaciones: 72-90 pt"
        ]
      },
      {
        "heading": "Procesamiento local y privacidad del documento",
        "paragraphs": [
          "La herramienta utiliza <strong>pdf-lib</strong>, una librería JavaScript de código abierto que opera íntegramente dentro del navegador. Tu PDF nunca se transmite a ningún servidor externo: la modificación ocurre en memoria RAM local y el archivo resultante se descarga directamente desde esa misma memoria.",
          "Esto es especialmente relevante para documentos con datos sensibles: contratos, estados de cuenta, expedientes médicos o acuerdos de confidencialidad. A diferencia de servicios en la nube, aquí no existen logs de subidas ni copias temporales en servidores de terceros."
        ]
      },
      {
        "heading": "Limitaciones y alternativas para casos avanzados",
        "paragraphs": [
          "Esta herramienta agrega una marca de agua visual (capa de texto sobre el PDF). No cifra el documento ni impide que alguien con Acrobat edite o elimine la capa de texto. Para protección a prueba de edición, necesitarás herramientas como Adobe Acrobat Pro (que puede aplanar la marca) o LibreOffice con exportación a PDF/A.",
          "Si necesitas procesar docenas de archivos en lote, considera usar la librería <code>pdf-lib</code> directamente desde Node.js o Python con <code>PyMuPDF</code> (fitz). Esta herramienta online es ideal para archivos individuales o uso ocasional sin instalar software."
        ]
      }
    ],
    "steps": [
      {
        "title": "Sube el PDF",
        "description": "Arrastra el archivo o usa el selector. El documento se carga solo en tu navegador."
      },
      {
        "title": "Escribe el texto de la marca",
        "description": "Escribe la leyenda (máximo ~25 caracteres para que no se corte en diagonal en páginas A4)."
      },
      {
        "title": "Ajusta opacidad, tamaño y color",
        "description": "Usa los controles deslizantes. El preview refleja el resultado final en la primera página."
      },
      {
        "title": "Descarga el PDF marcado",
        "description": "Haz clic en «Descargar». Todas las páginas incluirán la marca de agua en la posición diagonal estándar."
      }
    ]
  },
  "conversor-unidades": {
    "intro": "Convertir entre sistemas de medición es una tarea cotidiana que suele provocar errores cuando se hace de memoria o con fórmulas incompletas. Esta herramienta reúne cinco categorías —longitud, peso/masa, volumen, área y tiempo— con más de 30 unidades, y realiza todos los cálculos en el lado del cliente para resultados instantáneos sin conexión a internet.",
    "sections": [
      {
        "heading": "Los errores más comunes al convertir unidades",
        "paragraphs": [
          "Una confusión frecuente es asumir que <strong>1 galón = 4 litros</strong>, cuando el galón estadounidense equivale a <strong>3.785 litros</strong> y el galón imperial británico a 4.546 litros. Del mismo modo, confundir libras con kilogramos en contextos médicos (dosificación de medicamentos, por ejemplo) puede tener consecuencias graves si no se aplica el factor correcto: <strong>1 kg = 2.2046 lb</strong>.",
          "En el ámbito de la construcción, mezclar metros cuadrados con pies cuadrados al calcular materiales genera presupuestos erróneos. Una habitación de 20 m² equivale a 215.28 ft², no a 200 ft². Esta herramienta muestra el resultado con suficientes decimales para evitar ese tipo de redondeo prematuro."
        ],
        "citableSummary": "Los conversores de unidades más necesarios en el día a día son: metros ↔ pies, kilogramos ↔ libras, litros ↔ galones (EE. UU.) y metros cuadrados ↔ pies cuadrados."
      },
      {
        "heading": "Longitud y distancia: del taller al viaje internacional",
        "paragraphs": [
          "En manufactura y diseño industrial, las medidas en pulgadas coexisten con el sistema métrico. Una pulgada equivale exactamente a <strong>25.4 mm</strong> o <strong>2.54 cm</strong>, un valor fijo desde 1959. Al trabajar con planos en AutoCAD que combinan ambos sistemas, es esencial operar con esta precisión.",
          "Para distancias largas, 1 milla equivale a 1.60934 km. Si planeas un viaje por carretera en EE. UU. o el Reino Unido y tu velocímetro está en km/h, recuerda que 60 mph equivalen a 96.56 km/h, no a 100 km/h como muchos estiman."
        ]
      },
      {
        "heading": "Volumen, área y tiempo: unidades menos intuitivas",
        "paragraphs": [
          "Las unidades de volumen presentan mayor variación regional. En recetas de cocina estadounidenses aparecen <em>cups</em>, <em>fluid ounces</em> y <em>tablespoons</em>; 1 cup = 236.6 ml, 1 fl oz = 29.57 ml. Para áreas agrícolas, 1 hectárea = 10,000 m² = 2.471 acres, diferencia que importa en evaluaciones de terrenos y créditos rurales.",
          "El tiempo también se presta a confusiones: cuántos segundos hay en un año (31,536,000 en un año común; 31,622,400 en bisiesto) es un dato necesario en cálculos de tasas de eventos, estadísticas epidemiológicas y configuración de sistemas de monitoreo con intervalos en segundos."
        ],
        "bullets": [
          "1 galón EE. UU. = 3.785 litros (no confundir con galón imperial = 4.546 L)",
          "1 pulgada = 25.4 mm exacto · 1 pie = 30.48 cm",
          "1 hectárea = 2.471 acres · 1 milla cuadrada = 640 acres",
          "1 año común = 365 días = 8,760 horas = 31,536,000 segundos"
        ]
      }
    ]
  },
  "convertidor-color": {
    "intro": "Cuando trabajas simultáneamente con Figma, CSS, Tailwind y herramientas de diseño en formato HSL, traducir un color entre formatos manualmente es lento y propenso a errores. Este conversor transforma cualquier color entre HEX, RGB, HSL y clase Tailwind arbitraria al instante, con un color picker integrado para explorar variaciones sin salir de la herramienta.",
    "sections": [
      {
        "heading": "HEX, RGB y HSL: cuándo usar cada formato",
        "paragraphs": [
          "<strong>HEX</strong> (<code>#1a2b3c</code>) es el formato más compacto y el estándar histórico en CSS. Es adecuado para copiar colores entre herramientas o comunicarlos en un brief. Su limitación es que no es intuitivo para ajustar: modificar la luminosidad requiere entender los tres pares de dígitos.",
          "<strong>HSL</strong> (hue, saturation, lightness) es ideal cuando necesitas generar variantes: subir la luminosidad (<em>L</em>) del 40 % al 60 % da la versión «clara» del mismo color sin cambiar el tono. Muchos design systems modernos definen su paleta en HSL precisamente por esta razón. <strong>RGB</strong> sigue siendo el formato nativo de pantallas y el que acepta la función <code>rgb()</code> de CSS."
        ],
        "citableSummary": "HSL es el formato más conveniente para construir paletas de colores con variantes de luminosidad; HEX para comunicar colores concretos; RGB para operaciones matemáticas con canales de color individuales."
      },
      {
        "heading": "Integración con Tailwind CSS y variables CSS",
        "paragraphs": [
          "Tailwind CSS permite colores arbitrarios con la sintaxis <code>bg-[#1a2b3c]</code> o <code>text-[rgb(26,43,60)]</code>. Esta herramienta genera la clase arbitraria lista para pegar en tu JSX o HTML. Si usas Tailwind v3 con CSS variables en <code>tailwind.config.js</code>, también obtienes el valor en formato <code>var(--color-nombre)</code> para definirlo en tu capa <code>@layer base</code>.",
          "Para quienes usan Design Tokens o CSS custom properties, el conversor entrega el valor en notación <code>hsl(220 30% 25%)</code> (sin comas, formato moderno CSS Level 4) compatible con navegadores desde 2021, así como la notación clásica <code>hsl(220, 30%, 25%)</code> para proyectos con soporte a navegadores más antiguos."
        ],
        "bullets": [
          "Pegá un HEX y obtén RGB, HSL, clase Tailwind arbitraria y CSS variable en un clic",
          "El color picker permite explorar variaciones en tiempo real antes de copiar",
          "Salida HSL moderna (sin comas) y clásica (con comas) disponibles",
          "Útil para auditar colores de marca: verificar si dos HEX distintos son perceptualmente muy similares en HSL"
        ]
      },
      {
        "heading": "Errores frecuentes al trabajar con colores entre herramientas",
        "paragraphs": [
          "Un error común es copiar el valor RGB de Figma —que lo exporta como <code>R: 26 G: 43 B: 60</code>— e intentar usarlo directamente en CSS sin convertirlo a la función <code>rgb(26, 43, 60)</code>. Otro error frecuente: confundir el canal alfa en HEX de 8 dígitos (#RRGGBBAA) con el orden opuesto (#AARRGGBB) que usa Android.",
          "El canal de opacidad en CSS moderno puede expresarse en la función <code>rgb()</code> como cuarto argumento: <code>rgb(26 43 60 / 50%)</code>. Este conversor no incluye canal alfa directamente, pero una vez obtenido el valor base en cualquier formato, agregar <code>/ 0.5</code> al final de la función CSS es inmediato."
        ]
      }
    ]
  },
  "jwt-decoder": {
    "intro": "Los JSON Web Tokens son el mecanismo de autenticación más extendido en APIs REST modernas, pero su estructura en Base64URL los hace completamente ilegibles a simple vista. Este decodificador desglosa el header, el payload y las fechas <code>iat</code>/<code>exp</code> en formato legible, directamente en el navegador sin enviar el token a ningún servidor.",
    "sections": [
      {
        "heading": "Anatomía de un JWT: header, payload y firma",
        "paragraphs": [
          "Un JWT tiene tres partes separadas por puntos (<code>xxxxx.yyyyy.zzzzz</code>). El <strong>header</strong> contiene el algoritmo de firma (típicamente <code>HS256</code>, <code>RS256</code> o <code>ES256</code>) y el tipo (<code>JWT</code>). El <strong>payload</strong> contiene los <em>claims</em>: datos del usuario como <code>sub</code> (subject/user ID), <code>email</code>, roles, y los timestamps <code>iat</code> (issued at) e <code>exp</code> (expiration). La <strong>firma</strong> es un hash criptográfico que solo puede verificarse con la clave secreta del servidor.",
          "Decodificar el header y el payload es trivial (solo requiere decodificación Base64URL) y no revela ningún secreto. La clave nunca forma parte del token. Lo que sí puede ser sensible es el <em>contenido</em> del payload: IDs de usuario, permisos o datos personales, razón por la cual este decodificador opera 100 % localmente."
        ],
        "citableSummary": "Decodificar un JWT no equivale a verificarlo: la decodificación muestra el contenido en texto legible, pero solo el servidor con la clave secreta puede confirmar que el token es auténtico y no ha sido manipulado."
      },
      {
        "heading": "Interpretar iat y exp: timestamps Unix",
        "paragraphs": [
          "Los campos <code>iat</code> y <code>exp</code> son <strong>timestamps Unix</strong> (segundos desde el 1 de enero de 1970 UTC). Un valor típico de expiración para tokens de sesión es 3,600 (1 hora), 86,400 (24 horas) o 604,800 (7 días) sumados al <code>iat</code>. Este decodificador convierte ambos a fecha y hora legible en tu zona horaria local y muestra si el token ya expiró.",
          "Un token expirado devolverá <strong>401 Unauthorized</strong> en la API. Si ves que el <code>exp</code> ya pasó pero la app sigue funcionando, probablemente el servidor no está validando la expiración correctamente —un bug de seguridad a reportar."
        ],
        "bullets": [
          "Header típico: <code>{\"alg\":\"HS256\",\"typ\":\"JWT\"}</code>",
          "Claims estándar: <code>sub</code>, <code>iss</code>, <code>aud</code>, <code>exp</code>, <code>iat</code>, <code>nbf</code>, <code>jti</code>",
          "HS256 usa clave simétrica (mismo secreto para firmar y verificar); RS256 usa par público/privado",
          "El payload puede contener cualquier dato JSON personalizado; no hay cifrado, solo codificación Base64URL"
        ]
      },
      {
        "heading": "Casos de uso: debugging en desarrollo y auditoría de seguridad",
        "paragraphs": [
          "Durante el desarrollo de una API, esta herramienta es útil para verificar que el backend está incluyendo los claims correctos (roles, permisos, tenant ID) sin necesidad de conectar un debugger. También sirve para confirmar que el tiempo de expiración configurado en el servidor es el esperado.",
          "En auditorías de seguridad, inspeccionar JWTs interceptados (en pruebas de penetración autorizadas) permite verificar si se están almacenando datos sensibles innecesariamente en el payload: contraseñas en texto plano, datos de tarjetas o información médica nunca deben aparecer en un JWT sin cifrado adicional."
        ]
      }
    ],
    "steps": [
      {
        "title": "Pega el JWT",
        "description": "Copia el token de tu aplicación (del header Authorization, de localStorage o de una cookie) y pégalo en el campo de entrada."
      },
      {
        "title": "Lee el header y el payload",
        "description": "La herramienta muestra el algoritmo de firma y todos los claims en formato JSON indentado."
      },
      {
        "title": "Verifica las fechas",
        "description": "Comprueba que iat y exp tienen los valores esperados y si el token está vigente o expirado."
      },
      {
        "title": "Diagnostica el problema",
        "description": "Si el contenido del payload no incluye los campos que espera tu frontend, el bug está en cómo el backend genera el token."
      }
    ]
  },
  "editar-pdf": {
    "intro": "Completar un formulario PDF escaneado, agregar una nota aclaratoria o tachar datos desactualizados son tareas que normalmente exigen Acrobat Pro o imprimir y volver a escanear. Este editor minimalista permite colocar bloques de texto en cualquier punto de cualquier página del PDF directamente desde el navegador, sin instalaciones y sin que el archivo salga de tu computadora.",
    "sections": [
      {
        "heading": "Cuándo un editor de texto en PDF es suficiente",
        "paragraphs": [
          "La mayoría de los casos de edición de PDF se reducen a tres situaciones: <strong>completar campos de formulario</strong> que no son interactivos (PDFs escaneados), <strong>agregar notas o aclaraciones</strong> sobre un documento recibido, y <strong>tachar o superponer datos</strong> con rectángulos de color para anonimizar información antes de compartir.",
          "Para estos casos, un editor de texto posicionable es todo lo que se necesita. Las alternativas de escritorio como LibreOffice Draw o Adobe Acrobat añaden complejidad innecesaria para tareas puntuales. Esta herramienta usa <strong>pdf-lib</strong> —la misma librería de código abierto que emplean Notion, Figma y otras plataformas para sus exportaciones a PDF— garantizando compatibilidad con el estándar PDF 1.7."
        ]
      },
      {
        "heading": "Posicionamiento exacto con coordenadas X/Y porcentuales",
        "paragraphs": [
          "El editor ubica cada bloque de texto mediante coordenadas expresadas como porcentaje del ancho y alto de la página. Esto garantiza consistencia independientemente del tamaño real del PDF: si el formulario es A4 (595 × 842 pt en PDF) o carta (612 × 792 pt), el 50% siempre cae en el centro.",
          "Para formularios escaneados, el flujo típico es abrir el PDF en el navegador para identificar visualmente la posición del campo a completar, calcular su ubicación aproximada en porcentaje y ajustar en 2-3 iteraciones de prueba. Este proceso tarda menos de un minuto una vez que se tiene práctica."
        ],
        "citableSummary": "El posicionamiento porcentual de texto permite editar formularios PDF de cualquier tamaño (A4, carta, oficio) sin preocuparse por las dimensiones absolutas en puntos tipográficos."
      },
      {
        "heading": "Limitaciones importantes de este enfoque",
        "paragraphs": [
          "Este editor <em>superpone</em> texto sobre el PDF existente: no edita ni elimina el texto original. Si necesitas borrar texto existente en un PDF digital (no escaneado), necesitarás herramientas que trabajen con el contenido nativo del PDF como Adobe Acrobat Pro o Sejda. Para PDFs escaneados (imágenes), ninguna herramienta puede «borrar» texto real porque el texto es parte de la imagen.",
          "Tampoco admite inserción de imágenes, firmas digitales con validez legal o edición de campos de formulario interactivos (<em>AcroForm</em>). Para firmas con validez jurídica en México, la FIEL (e.firma) del SAT requiere infraestructura PKI, no solo superposición gráfica."
        ]
      }
    ],
    "steps": [
      {
        "title": "Sube el PDF",
        "description": "Arrastra el archivo al área indicada. Se carga localmente en el navegador, ningún byte viaja a internet."
      },
      {
        "title": "Selecciona la página",
        "description": "Elige en qué página quieres agregar texto. Puedes añadir bloques en múltiples páginas."
      },
      {
        "title": "Define posición, color y tamaño",
        "description": "Ingresa las coordenadas X e Y como porcentaje (0-100), el color en HEX y el tamaño en puntos tipográficos."
      },
      {
        "title": "Escribe el texto y descarga",
        "description": "Agrega todos los bloques necesarios y descarga el PDF resultante con todas las anotaciones incorporadas."
      }
    ]
  },
  "whois-domain": {
    "intro": "Antes de comprar un dominio, colaborar con una empresa o evaluar un competidor, conocer la antigüedad del dominio, su registrar y su estado puede revelar información crítica. Esta herramienta consulta RDAP —el protocolo moderno que reemplaza a WHOIS— y presenta los datos clave de cualquier dominio <code>.com</code>, <code>.net</code>, <code>.org</code>, <code>.mx</code>, <code>.es</code>, <code>.io</code> y la mayoría de TLDs en segundos.",
    "sections": [
      {
        "heading": "RDAP vs WHOIS: por qué el sucesor moderno importa",
        "paragraphs": [
          "<strong>WHOIS</strong> es un protocolo de 1982 que devuelve texto plano sin estructura garantizada: cada registrar formatea la respuesta a su manera. <strong>RDAP</strong> (Registration Data Access Protocol, RFC 7483) devuelve JSON estructurado, soporta HTTPS y permite que las respuestas incluyan datos localizados y paginados. La ICANN lo adoptó formalmente en 2019 como sustituto obligatorio.",
          "En la práctica, RDAP da resultados más consistentes y parseables entre diferentes registrars. La información de contacto del registrante suele estar redactada por privacidad (GDPR/política de ICANN desde 2018), pero los metadatos del dominio —fechas, estado, DNS— permanecen accesibles."
        ],
        "citableSummary": "RDAP reemplaza a WHOIS como estándar oficial de consulta de dominios desde 2019. Devuelve JSON estructurado y soporta HTTPS, a diferencia del texto plano sin formato de WHOIS."
      },
      {
        "heading": "Qué revelan las fechas y el estado del dominio",
        "paragraphs": [
          "La <strong>fecha de registro</strong> indica la antigüedad del dominio. Un dominio de 10+ años tiene historial de confianza ante Google y ante potenciales compradores o socios. Un dominio registrado hace 3 semanas que dice ser una empresa consolidada merece mayor escrutinio.",
          "El <strong>estado del dominio</strong> (<em>domain status</em>) puede ser <code>clientTransferProhibited</code> (normal, bloquea transferencias no autorizadas), <code>serverHold</code> (suspendido por el registro, posible deuda o problema legal) o <code>pendingDelete</code> (en proceso de liberación, podría estar disponible pronto). La <strong>fecha de expiración</strong> permite saber si el dominio está en riesgo de no renovarse y quedarse disponible."
        ],
        "bullets": [
          "<code>clientTransferProhibited</code>: estado normal, protege contra transferencias no autorizadas",
          "<code>serverHold</code>: dominio suspendido — posible incumplimiento de pago o disputa legal",
          "<code>pendingDelete</code>: dominio próximo a liberarse tras no ser renovado (período de gracia ~75 días en .com)",
          "Fecha de expiración + registrar: útil para monitorear dominios de interés estratégico o competidores"
        ]
      },
      {
        "heading": "Usos estratégicos: competencia, due diligence y compra de dominios",
        "paragraphs": [
          "Para análisis competitivo en SEO, la antigüedad del dominio es un factor de autoridad. Conocer cuándo registró su dominio un competidor ayuda a contextualizar su autoridad y su historial de presencia en el mercado. Los servidores DNS revelan el proveedor de hosting (Cloudflare, AWS, Hostinger, etc.) y a veces indican el stack tecnológico.",
          "Para compra de dominios usados, verificar que el dominio no tiene estado <code>serverHold</code> o historial de spam antes de adquirirlo es esencial: un dominio penalizado por Google puede tardar meses en recuperar visibilidad orgánica, incluso bajo nueva propiedad."
        ]
      }
    ]
  },
  "calculadora-edad": {
    "intro": "Calcular la edad exacta parece simple hasta que intervienen años bisiestos, meses de diferente longitud o la necesidad de expresarla en semanas, horas o segundos para un contexto específico. Esta calculadora va más allá del resultado en años: entrega la edad en todas las unidades posibles más datos de contexto como el signo zodiacal, el animal del horóscopo chino y cuántos días faltan para el próximo cumpleaños.",
    "sections": [
      {
        "heading": "Por qué la edad exacta importa más allá del cumpleaños",
        "paragraphs": [
          "En contextos médicos y legales, la edad exacta en meses y días es relevante. El desarrollo pediátrico se mide en <strong>meses de edad corregida</strong> en bebés prematuros; los plazos de jubilación en muchos países dependen de haber alcanzado exactamente cierta edad en una fecha específica; y los procesos de adopción o tutela evalúan la diferencia de edad en meses, no solo en años.",
          "Para investigadores, periodistas o documentalistas, saber cuántos días vivió una persona histórica o cuántos días han pasado desde un evento concreto puede ser una cifra de impacto en un artículo o presentación. La herramienta realiza todos estos cálculos con precisión de milisegundos, considerando años bisiestos."
        ],
        "citableSummary": "La edad exacta en días, horas y segundos es necesaria en contextos pediátricos, legales, periodísticos y de investigación donde los años solos no son suficientemente precisos."
      },
      {
        "heading": "Cómo se calculan correctamente los años, meses y días",
        "paragraphs": [
          "El cálculo correcto de edad en años, meses y días no es una simple división. Si naciste el 31 de enero y hoy es 1 de marzo, tienes 1 mes cumplido (no 0.x meses del cociente 28/365). El algoritmo correcto incrementa años completos, luego meses completos sobre el resto, y finalmente cuenta los días del mes parcial. Esta herramienta implementa esa lógica, por lo que el resultado coincide con la edad civil real.",
          "Los años bisiestos afectan los cálculos de semanas y días totales: si naciste el 29 de febrero, la herramienta maneja correctamente ese caso borde y calcula el próximo cumpleaños al 28 de febrero o 1 de marzo según la convención estándar."
        ]
      },
      {
        "heading": "Signos zodiacales y horóscopo chino: los detalles",
        "paragraphs": [
          "El <strong>zodíaco occidental</strong> (Aries, Tauro, Géminis…) divide el año solar en 12 segmentos con fechas fijas. Los signos de cusp (frontera) —como nacer el 20 de mayo, último día de Tauro o primero de Géminis según algunos sistemas— pueden variar un día entre fuentes porque la frontera exacta depende de la hora del tránsito solar, no solo la fecha.",
          "El <strong>horóscopo chino</strong> es un ciclo de 12 años asociado a animales: Rata, Buey, Tigre, Conejo, Dragón, Serpiente, Caballo, Cabra, Mono, Gallo, Perro, Cerdo. El año chino empieza entre enero y febrero (Año Nuevo Lunar), por lo que nacer en enero o febrero puede corresponder al año animal anterior. Esta herramienta considera esa frontera para asignar el signo correcto."
        ],
        "bullets": [
          "Resultado en: años + meses + días · meses totales · semanas totales · días totales · horas · minutos · segundos",
          "Día de la semana en que naciste (dato útil para anécdotas, estadísticas o contexto histórico)",
          "Días hasta el próximo cumpleaños: útil para planificación personal o recordatorios",
          "Compatible con cualquier fecha desde el siglo XIX hasta el presente"
        ]
      }
    ]
  },
  "box-shadow-generator": {
    "intro": "La propiedad CSS <code>box-shadow</code> es una de las más poderosas y a la vez más tediosas de escribir a mano, especialmente cuando se combinan múltiples sombras para efectos de profundidad, glassmorphism o neumorfismo. Este generador visual permite componer hasta varias sombras simultáneas, ver el resultado en tiempo real y copiar el código CSS listo para producción.",
    "sections": [
      {
        "heading": "Sintaxis de box-shadow y por qué los parámetros importan",
        "paragraphs": [
          "La sintaxis completa es <code>box-shadow: offsetX offsetY blur spread color</code>, con la palabra clave <code>inset</code> opcional al inicio para sombras interiores. <strong>Offset</strong> desplaza la sombra en píxeles (valores negativos mueven a izquierda/arriba). <strong>Blur</strong> define la difusión: 0px produce sombra nítida como los badges de notificación; 40-60px crea el efecto de sombra suave característico de Material Design.",
          "<strong>Spread</strong> es el parámetro menos intuitivo: con valor positivo expande la sombra más allá del elemento (útil para bordes brillantes); con valor negativo la contrae (técnica del neumorfismo). La <strong>combinación de inset + spread negativo</strong> crea el efecto de superficie hundida sin modificar el layout del elemento."
        ],
        "citableSummary": "La clave del neumorfismo CSS es combinar una sombra clara con inset:false y una oscura con inset:true, ambas con spread negativo, creando la ilusión de superficie presionada sin alterar el espacio del elemento."
      },
      {
        "heading": "Los 7 presets y sus casos de uso reales",
        "paragraphs": [
          "<strong>Suave</strong> (2-4px blur, opacidad 15-20%): para cards en fondos blancos o gris muy claro. El estándar del diseño de SaaS moderno. <strong>Material Design</strong> (elevación 4dp: <code>0 2px 4px rgba(0,0,0,.24), 0 4px 5px rgba(0,0,0,.16)</code>): sigue las guías de Google Material 2 para botones y FABs. <strong>Neon/Glow</strong>: spread positivo en color saturado (sin offset) para efectos de brillo en interfaces oscuras o gaming.",
          "<strong>Neumorfo</strong> requiere dos sombras simultáneas: una clara y una oscura, simétricamente opuestas. Solo funciona bien sobre fondos de gris claro neutro (no blanco puro). <strong>Sunken</strong> (inset, blur bajo, spread 0): da la apariencia de campo de formulario presionado o área activa."
        ]
      },
      {
        "heading": "Multi-shadow: técnica de capas para profundidad realista",
        "paragraphs": [
          "Las sombras más convincentes en UI modernas combinan 2-3 capas con diferentes opacidades y distancias. La técnica de <em>layered shadows</em> de Nathan Curtis usa: una sombra pequeña cercana (baja opacidad) más una grande y difusa (muy baja opacidad). Ejemplo para un card elevado: <code>0 1px 3px rgba(0,0,0,.12), 0 8px 24px rgba(0,0,0,.08)</code>.",
          "Este generador permite agregar múltiples sombras en una sola regla CSS. El resultado se expresa como valores separados por coma, compatible con todos los navegadores modernos desde IE11. Para animaciones de hover que cambian la elevación, el truco es hacer la transición sobre la propiedad <code>box-shadow</code> directamente: <code>transition: box-shadow 0.2s ease</code>."
        ],
        "bullets": [
          "Hasta N sombras simultáneas en una sola propiedad CSS (separadas por coma)",
          "Inset: convierte la sombra exterior en interior — imprescindible para neumorfismo",
          "Spread negativo con inset: contrae la sombra creando un halo sin borde visible",
          "El código generado es compatible con todos los navegadores modernos y lista para pegar en CSS/SCSS/Tailwind"
        ]
      }
    ]
  },
  "favicon-generator": {
    "intro": "Un favicon mal configurado o ausente genera un error 404 visible en las DevTools del navegador y puede afectar la percepción de profesionalismo de un sitio. Esta herramienta genera todos los tamaños necesarios —desde 16×16 hasta 512×512— en un solo paso, ya sea a partir de texto (iniciales de una marca) o de una imagen propia.",
    "sections": [
      {
        "heading": "Por qué se necesitan múltiples tamaños de favicon",
        "paragraphs": [
          "El tamaño clásico <strong>16×16 px</strong> es el que aparece en las pestañas del navegador. A 32×32 lo usan algunas barras de marcadores y atajos de escritorio en Windows. A <strong>180×180</strong> (apple-touch-icon) lo carga iOS cuando el usuario guarda el sitio en el home screen. A <strong>192×192 y 512×512</strong> lo requiere el Web App Manifest para PWAs: el de 512 se usa en la pantalla de splash al abrir la app en Android.",
          "Servir un solo favicon.ico de 16×16 es técnicamente válido pero insuficiente para una experiencia completa. Los navegadores modernos priorizan PNG sobre ICO, y los metadatos correctos en <code>&lt;head&gt;</code> indican al navegador qué tamaño usar en cada contexto."
        ],
        "citableSummary": "Un set completo de favicons necesita al menos 5 tamaños: 16px (pestañas), 32px (escritorio), 180px (iOS home screen), 192px y 512px (PWA Android). Servir solo favicon.ico es insuficiente para sitios modernos."
      },
      {
        "heading": "Modo texto: favicons desde iniciales de marca",
        "paragraphs": [
          "Para proyectos sin un logo definitivo, crear un favicon con 1-2 letras sobre fondo de color es la solución más rápida y legible en tamaño pequeño. Las iniciales deben ser máximo 2 caracteres: más letras se vuelven ilegibles a 16×16 px. Fontes sans-serif bold (como <em>Inter Bold</em> o <em>Roboto Black</em>) tienen mejor legibilidad que serif a tamaños pequeños.",
          "La forma del contenedor influye en la percepción: <strong>squircle</strong> (superelipse) es el estilo que usa iOS para sus iconos de apps y se percibe más moderno que el cuadrado recto. El circle es ideal para proyectos de fotografía o portfolios personales; rounded para SaaS corporativos."
        ]
      },
      {
        "heading": "Implementación correcta en el HTML",
        "paragraphs": [
          "Una vez descargados los PNGs, el HTML del <code>&lt;head&gt;</code> debe incluir las etiquetas correspondientes. La configuración mínima recomendada: <code>&lt;link rel=\"icon\" sizes=\"32x32\" href=\"/favicon-32.png\"&gt;</code>, <code>&lt;link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"/favicon-180.png\"&gt;</code> y una referencia al Web App Manifest que declare los iconos de 192 y 512.",
          "Para Next.js, desde v13.3 con App Router, basta colocar un archivo <code>favicon.ico</code> en la carpeta <code>/app</code> y el framework genera automáticamente los metadatos. En WordPress, el favicon se configura desde Apariencia → Personalizar → Identidad del sitio y se puede subir un PNG de 512×512 que WP escala automáticamente."
        ],
        "bullets": [
          "16px y 32px: para pestañas y favoritos del navegador",
          "180px: apple-touch-icon para iOS (guardar en pantalla de inicio)",
          "192px y 512px: requeridos por el Web App Manifest para PWAs",
          "Forma squircle: estilo iOS moderno — más legible en contextos de apps que el cuadrado recto"
        ]
      }
    ]
  },
  "js-formatter": {
    "intro": "Recibir código JavaScript minificado, ofuscado o sin formatear hace que el code review sea casi imposible. En el otro sentido, distribuir código sin minimizar aumenta el peso del bundle innecesariamente. Este formateador y minificador JavaScript opera en el navegador y cubre ambos sentidos: beautify para legibilidad, minify para reducir bytes.",
    "sections": [
      {
        "heading": "Beautify: qué hace exactamente y qué respeta",
        "paragraphs": [
          "El modo <strong>beautify</strong> agrega indentación consistente (2 o 4 espacios según configuración), saltos de línea después de <code>;</code> y <code>{</code>, y espaciado alrededor de operadores. Respeta <strong>strings multilínea y template literals</strong> (<code>`backtick`</code>) sin alterar su contenido interior, lo que es crítico: un formateador que modifique el contenido de un template literal puede romper el código.",
          "Los comentarios de bloque (<code>/* */</code>) y de línea (<code>//</code>) también se preservan. Esto es especialmente importante al hacer reverse engineering de código minificado: los comentarios que el autor original incluyó antes de minimizar a veces sobreviven y revelan contexto útil sobre la lógica."
        ],
        "citableSummary": "Un buen JavaScript beautifier debe preservar el contenido exacto de strings, template literals y comentarios. Modificar cualquiera de estos puede cambiar el comportamiento del programa."
      },
      {
        "heading": "Minify: reducción de bytes y consideraciones",
        "paragraphs": [
          "El modo <strong>minify</strong> elimina espacios en blanco, saltos de línea y comentarios que no afectan la ejecución del código. Para un archivo de 50KB, la minificación típica genera reducciones del 30-50%. Combinada con compresión gzip o brotli (estándar en cualquier CDN o servidor moderno), el ahorro real en transferencia puede superar el 80% respecto al original.",
          "Esta herramienta es útil para revisiones puntuales, snippets y archivos sueltos. Para flujos de build en producción, herramientas especializadas como <strong>esbuild</strong> (el más rápido, escrito en Go), <strong>terser</strong> (el estándar de Webpack) o <strong>SWC</strong> (base de Next.js y Vite) aplican optimizaciones adicionales: tree-shaking, constante folding y renombrado de variables locales."
        ]
      },
      {
        "heading": "Casos prácticos: cuándo usar este formateador online",
        "paragraphs": [
          "Los escenarios más comunes: <strong>depurar una librería de terceros</strong> cuyo CDN sirve la versión minificada, <strong>analizar código generado</strong> por una herramienta (Webpack, Rollup, Babel) para verificar que el output es el esperado, o <strong>formatear snippets de Stack Overflow</strong> antes de integrarlos a un proyecto.",
          "También es útil para preparar fragmentos de código antes de pegarlos en documentación técnica, donde la indentación consistente mejora la legibilidad. Para proyectos con ESLint+Prettier configurados, este formateador es un complemento para casos fuera del flujo de desarrollo habitual, no un reemplazo de las herramientas del proyecto."
        ],
        "bullets": [
          "Beautify: indentación consistente, saltos de línea y espaciado. Respeta strings, template literals y comentarios",
          "Minify: elimina espacios y comentarios. Reducción típica 30-50% en tamaño de archivo",
          "Para producción real: esbuild (velocidad), terser (compatibilidad Webpack), SWC (Next.js/Vite)",
          "Útil sin instalar Node.js ni herramientas de build — basta con el navegador"
        ]
      }
    ]
  },
  "generador-logo-texto": {
    "intro": "Antes de tener un logotipo diseñado por un profesional, los proyectos necesitan una identidad visual funcional para redes sociales, presentaciones y material de trabajo. Este generador produce logos tipográficos en 6 estilos y descarga PNG de 1200×400 px con fondo transparente o personalizado, listo para usar en cualquier contexto digital.",
    "sections": [
      {
        "heading": "Wordmarks tipográficos: cuándo son la solución correcta",
        "paragraphs": [
          "Un <strong>wordmark</strong> (logo de solo texto) es la forma más directa de marca para nombres cortos y memorables. Google, FedEx, Visa y Sony son wordmarks. La ventaja sobre los logos con ícono es que el nombre queda siempre explícito, lo que reduce la carga cognitiva al reconocer la marca en contextos nuevos.",
          "Para proyectos en etapa temprana, un wordmark tipográfico profesional es suficiente para LinkedIn, GitHub, presentaciones de pitch y redes sociales. Invertir en un logomark (combinación de símbolo + texto) tiene sentido cuando la marca ya tiene reconocimiento y puede prescindir del nombre en ciertos contextos."
        ]
      },
      {
        "heading": "Los 6 estilos y sus aplicaciones",
        "paragraphs": [
          "<strong>Solid</strong>: texto liso en un color, el más versátil y el que funciona en mayor cantidad de fondos. Ideal para documentos corporativos y presentaciones. <strong>Gradient</strong>: degradado entre dos colores personalizables, típico de marcas tech y SaaS modernos. <strong>Outline</strong>: solo el contorno del texto, elegante sobre fondos de color sólido o fotografías. <strong>Shadow</strong>: texto con sombra drop, añade dimensión sin ser ruidoso.",
          "<strong>Neon</strong>: texto con glow exterior, pensado para marcas de entretenimiento, gaming o eventos nocturnos. <strong>Retro</strong>: efecto de letras con perspectiva o extrusión que evoca los 80s, popular en cervezas artesanales, música indie y proyectos con estética vintage. Cada estilo tiene casos de uso naturales; usar neon en una consultoría contable o retro en un banco generaría disonancia con las expectativas del público."
        ],
        "citableSummary": "Los 6 estilos de logo tipográfico cubren los principales arquetipos de marca: corporativo (solid), moderno-tech (gradient), premium (outline), profundidad (shadow), entretenimiento (neon) y vintage (retro)."
      },
      {
        "heading": "Descarga PNG de alta resolución: cómo usarlo correctamente",
        "paragraphs": [
          "La descarga en 1200×400 px es suficiente para uso digital en cabeceras de redes sociales (Twitter/X header: 1500×500, LinkedIn empresa: 1128×191, YouTube canal: 2560×1440 con zona segura central de ~1546×423). Para escalarlo sin pérdida, el formato PNG con fondo transparente permite superponerlo sobre cualquier fondo.",
          "Para impresión, un PNG de 1200px a 72 DPI solo alcanza 16 cm de ancho. Si necesitas el logo para imprimir en merchandising o señalética, pide a un diseñador la versión vectorial en SVG o AI. Este generador cubre necesidades digitales; para impresión de calidad se requiere vector."
        ],
        "bullets": [
          "Resolución de descarga: 1200×400 px PNG — suficiente para todos los usos digitales",
          "Fondo transparente disponible para superposición sobre cualquier color de fondo",
          "6 fuentes: bold sans, serif, monoespaciada, itálica, light, black (ultra-bold)",
          "Para redes: Twitter/X header 1500×500 · LinkedIn empresa 1128×191 · favicon derivado: usar herramienta de favicon"
        ]
      }
    ]
  },
  "validador-rfc-curp": {
    "intro": "El RFC y la CURP son los dos documentos de identificación fiscal y civil más utilizados en México. Un RFC mal digitado invalida facturas electrónicas (CFDI); una CURP con error bloquea trámites en el IMSS, la SEP o el RENAPO. Esta herramienta verifica la estructura de ambas claves localmente, sin enviar datos a ningún servidor externo.",
    "sections": [
      {
        "heading": "Estructura del RFC: persona física vs. persona moral",
        "paragraphs": [
          "El RFC de <strong>persona física</strong> tiene 13 caracteres: 4 letras (iniciales del nombre y apellidos según reglas del SAT) + 6 dígitos de fecha de nacimiento (AAMMDD) + 3 caracteres alfanuméricos de la <em>homoclave</em>. El RFC de <strong>persona moral</strong> (empresa) tiene 12 caracteres: 3 letras de la razón social + 6 dígitos de fecha de constitución + 3 de homoclave.",
          "Los errores más frecuentes al capturar un RFC son: confundir la Ñ con la N (el SAT usa Ñ en el RFC), invertir mes y día en la fecha (el formato es AAMMDD, no AADD MM), o copiar la homoclave con O en lugar de cero o viceversa. Esta herramienta detecta si el RFC ingresado corresponde a persona física o moral por longitud y lo indica explícitamente."
        ],
        "citableSummary": "RFC de persona física: 13 caracteres (4 letras + 6 dígitos fecha + 3 homoclave). RFC de persona moral: 12 caracteres (3 letras + 6 dígitos + 3 homoclave). La diferencia en longitud es el primer indicador del tipo de contribuyente."
      },
      {
        "heading": "Estructura de la CURP: 18 caracteres con información codificada",
        "paragraphs": [
          "La CURP tiene 18 caracteres: 4 letras (primer apellido + segundo apellido + nombre) + 6 dígitos de fecha de nacimiento (AAMMDD) + 1 letra de sexo (H=hombre, M=mujer) + 2 letras del estado de nacimiento (o NE para nacidos en el extranjero) + 3 consonantes internas de los apellidos y nombre + 2 caracteres de discriminación (1 dígito numérico + 1 dígito de verificación).",
          "El estado de nacimiento se codifica con claves definidas por RENAPO: <code>AS</code>=Aguascalientes, <code>BC</code>=Baja California, <code>BS</code>=Baja California Sur… hasta <code>ZA</code>=Zacatecas. Esta herramienta extrae y muestra ese estado en texto completo, lo que permite verificar que coincide con el acta de nacimiento."
        ]
      },
      {
        "heading": "Privacidad y limitaciones del validador",
        "paragraphs": [
          "La validación es <strong>estructural</strong>: verifica que el RFC o CURP cumple el formato definido por el SAT y RENAPO, pero no consulta las bases de datos oficiales. Que un RFC sea estructuralmente válido no garantiza que esté registrado ante el SAT; para eso se necesita la consulta directa en el portal del SAT (<em>rfc.sat.gob.mx</em>), que requiere autenticación.",
          "Toda la lógica corre en JavaScript del lado del cliente. El RFC y la CURP ingresados no se transmiten a ningún servidor: son datos sensibles de identidad fiscal y civil, y esta herramienta los trata como tal. Para validación con registro ante el SAT o RENAPO, los canales oficiales son el <em>Portal del SAT</em> y el <em>RENAPO en línea</em> respectivamente."
        ],
        "bullets": [
          "RFC persona física: 13 chars · RFC persona moral: 12 chars",
          "CURP: 18 chars · posiciones 11-12 codifican el estado de nacimiento según catálogo RENAPO",
          "Sexo en CURP: H (Hombre) o M (Mujer) — posición 11",
          "Validación estructural local — no consulta bases de datos del SAT ni RENAPO"
        ]
      }
    ]
  },
  "validador-dni-nie": {
    "intro": "El DNI y el NIE son los documentos de identificación personal en España. Un dígito de control incorrecto invalida cualquier trámite con la Administración, firma de contratos o apertura de cuentas bancarias. Este validador verifica si la letra de control es correcta usando el algoritmo oficial módulo 23 y, en caso de error, calcula cuál debería ser.",
    "sections": [
      {
        "heading": "El algoritmo módulo 23: cómo funciona el dígito de control",
        "paragraphs": [
          "Tanto el DNI como el NIE usan el mismo algoritmo: el número (8 dígitos del DNI, o los 7 dígitos del NIE con la primera letra convertida: X=0, Y=1, Z=2) se divide entre 23, y el resto de esa división se mapea a una letra de la tabla oficial: <code>TRWAGMYFPDXBNJZSQVHLCKE</code>. La letra de control que aparece en el documento debe coincidir con la de esa posición.",
          "La tabla excluye las letras I, Ñ, O y U para evitar confusiones visuales (0/O, 1/I, U/V). El módulo 23 garantiza que un solo dígito cambiado en el número produce una letra de control diferente, lo que permite detectar errores de transcripción con alta fiabilidad."
        ],
        "citableSummary": "La tabla de letras DNI/NIE es TRWAGMYFPDXBNJZSQVHLCKE (23 letras, excluye I, Ñ, O, U). La posición correcta es: número del documento módulo 23 = índice en la tabla."
      },
      {
        "heading": "DNI vs NIE: diferencias de formato",
        "paragraphs": [
          "El <strong>DNI</strong> (Documento Nacional de Identidad) tiene 8 dígitos numéricos + 1 letra: ejemplo <code>12345678Z</code>. Es el documento de los ciudadanos españoles. El <strong>NIE</strong> (Número de Identificación de Extranjero) tiene una letra inicial (X, Y o Z) + 7 dígitos + 1 letra de control: ejemplo <code>X1234567L</code>. Lo usan ciudadanos extranjeros con residencia, trabajo o intereses económicos en España.",
          "El NIE es gestionado por la Dirección General de Policía y es obligatorio para, entre otros trámites, abrir cuenta bancaria, firmar contratos de trabajo, declarar el IRPF o comprar un inmueble. Su formato cambió cuando la serie X se agotó: la serie Y está activa y la Z está reservada para cuando Y también se agote."
        ]
      },
      {
        "heading": "Errores frecuentes y contexto de uso",
        "paragraphs": [
          "El error más común al transcribir un DNI es confundir la letra O con el número 0, o la letra I con el número 1 —precisamente por eso estas letras están excluidas de la tabla de control. Otro error frecuente es incluir el guion separador (<code>12345678-Z</code>) en formularios que esperan solo alfanuméricos; este validador acepta ambos formatos.",
          "En formularios web de servicios españoles (Hacienda, Seguridad Social, banca online), la validación del NIE/DNI ocurre tanto en el frontend como en el backend. Verificar el documento antes de rellenar el formulario evita errores de validación que bloquean el proceso. También es útil en entornos de desarrollo para generar NIEs sintéticos válidos para pruebas (con números de ficción que no corresponden a ninguna persona real)."
        ],
        "bullets": [
          "DNI: 8 dígitos + 1 letra · ejemplo válido: <code>12345678Z</code>",
          "NIE: X/Y/Z + 7 dígitos + 1 letra · ejemplo válido: <code>X1234567L</code>",
          "Tabla de control: TRWAGMYFPDXBNJZSQVHLCKE (excluye I, Ñ, O, U)",
          "Validación 100% local — ningún dato de identidad se transmite al servidor"
        ]
      }
    ]
  }
};
