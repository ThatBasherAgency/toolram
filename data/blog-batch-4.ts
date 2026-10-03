import type { BlogPost } from "./blog";

/**
 * Batch 4 (3-oct-2026). Cuatro guías long-tail elegidas con datos de Bing Webmaster (90 días):
 * cada una responde una consulta real que ya traía impresiones y enlaza a la herramienta del cluster.
 * Intención distinta a la de la herramienta (guía / ejercicios / dato), para no canibalizarla.
 */

export const POSTS_BATCH_4: BlogPost[] = [
  {
    slug: "blog/cantidad-con-letra-pagare-cheque-mexico",
    title: "Cómo escribir la cantidad con letra en un pagaré",
    excerpt:
      "La forma correcta de escribir un monto con letra en un pagaré, cheque o recibo en México: centavos en XX/100, M.N., «veintiún pesos», «un millón de pesos» y qué pasa si la cifra y la letra no coinciden.",
    publishedAt: "2026-10-03",
    updatedAt: "2026-10-03",
    author: "José Gaspard",
    category: "Calculadoras",
    keywords: [
      "cantidad con letra pagaré",
      "como escribir cantidad con letra",
      "00/100 M.N.",
      "centavos con letra",
      "cantidad con letra cheque",
      "300 mil pesos con letra"
    ],
    estimatedReadMinutes: 6,
    body: `
## La respuesta corta

En México, una cantidad con letra se escribe así: **el entero en palabras + la moneda + los centavos en número sobre 100 + M.N.** Por ejemplo, $1,250.50 se escribe «MIL DOSCIENTOS CINCUENTA PESOS 50/100 M.N.». Los centavos no se escriben con letra: van como fracción de cien. «M.N.» significa *moneda nacional* y aclara que son pesos mexicanos y no dólares.

Si quieres saltarte las reglas, el [convertidor de número a letras](/numero-a-letras) lo hace solo y en mayúsculas, listo para copiar.

## Ejemplos de cantidades con letra

Estos son montos que la gente busca tal cual. Todos salen igual en el convertidor de Toolram:

| Cifra | Con letra |
|---|---|
| $0.13 | CERO PESOS 13/100 M.N. |
| $21.00 | VEINTIÚN PESOS 00/100 M.N. |
| $101.00 | CIENTO UN PESOS 00/100 M.N. |
| $1,250.50 | MIL DOSCIENTOS CINCUENTA PESOS 50/100 M.N. |
| $15,230.50 | QUINCE MIL DOSCIENTOS TREINTA PESOS 50/100 M.N. |
| $141,939.00 | CIENTO CUARENTA Y UN MIL NOVECIENTOS TREINTA Y NUEVE PESOS 00/100 M.N. |
| $300,000.00 | TRESCIENTOS MIL PESOS 00/100 M.N. |
| $1,000,000.00 | UN MILLÓN DE PESOS 00/100 M.N. |
| $2,500,000.00 | DOS MILLONES QUINIENTOS MIL PESOS 00/100 M.N. |

## Los cuatro detalles donde casi todos se equivocan

1. **Montos menores a un peso.** $0.13 no es «trece centavos» a secas en un documento formal: se escribe «CERO PESOS 13/100 M.N.». Así el formato es el mismo que en cualquier otro monto y nadie puede añadir un número delante.
2. **Veintiún, no veintiuno.** Delante de un sustantivo masculino como *pesos*, «uno» pierde la última letra: VEINTIÚN PESOS, CIENTO UN PESOS, TREINTA Y UN MIL. «Veintiuno pesos» es un error que se ve mucho en recibos.
3. **«De» solo en millones redondos.** Se escribe «UN MILLÓN DE PESOS» y «DOS MILLONES DE PESOS», pero «DOS MILLONES QUINIENTOS MIL PESOS», sin «de», porque ya hay cifras después del millón.
4. **Los centavos siempre con dos dígitos.** 50 centavos es 50/100, y 5 centavos es 05/100. Sin centavos, 00/100.

## ¿Por qué un pagaré lleva la cantidad con letra?

Porque la letra es más difícil de alterar que la cifra, y porque la ley le da prioridad. La Ley General de Títulos y Operaciones de Crédito (LGTOC), en su **artículo 16**, dice que si el importe de un título de crédito está escrito en palabras y en cifras y no coinciden, **vale la suma escrita en palabras**. Si se escribió varias veces y hay diferencias, vale la menor.

Traducido: si en el pagaré pones $30,000 en número y «TRES MIL PESOS» con letra, el documento vale por tres mil. Por eso conviene revisar la letra dos veces antes de firmar, sobre todo con montos de seis cifras.

El pagaré, además, tiene requisitos propios en el **artículo 170 de la LGTOC**: la mención de ser pagaré, la promesa incondicional de pagar una suma determinada, el nombre de a quién se paga, la época y lugar de pago, la fecha y lugar en que se firma y la firma de quien lo suscribe. La cantidad con letra es la forma práctica de dejar esa «suma determinada» sin ambigüedad.

## Cómo llenar la cantidad en un pagaré, paso a paso

1. Escribe la cifra con punto decimal y dos centavos: $300,000.00.
2. Convierte el entero a palabras: TRESCIENTOS MIL.
3. Añade la moneda: PESOS.
4. Añade los centavos sobre 100: 00/100.
5. Cierra con M.N. si son pesos mexicanos.
6. Tacha con una línea el espacio que sobre en el renglón, para que nadie pueda agregar texto.

Resultado: TRESCIENTOS MIL PESOS 00/100 M.N.

## ¿Y en un cheque?

El cheque sigue la misma lógica: la cifra en el recuadro y la cantidad con letra en la línea larga, con XX/100 M.N. al final. El mismo artículo 16 de la LGTOC aplica a los títulos de crédito en general, cheques incluidos. Los bancos suelen rechazar cheques con letra y cifra distintas o con tachaduras, así que si te equivocas, es más seguro anular el cheque que corregirlo encima.

## ¿Mayúsculas o minúsculas?

Ninguna ley exige mayúsculas, pero es la costumbre en pagarés, cheques y facturas porque se lee mejor y es más difícil de retocar. Si usas mayúsculas, acentúalas: VEINTIÚN, MILLÓN, NOVECIENTOS. La RAE indica que las mayúsculas llevan tilde igual que las minúsculas.

## Otras monedas

Para dólares, el formato habitual es el mismo con la moneda cambiada y sin M.N.: «MIL DÓLARES 00/100 USD». Para euros: «MIL EUROS 00/100». El [convertidor](/numero-a-letras) tiene las variantes listas para pesos, dólares y euros.
`,
    faqs: [
      {
        q: "¿Cómo se escriben los centavos con letra en un pagaré?",
        a: "No se escriben con letra: van como fracción de cien después de la moneda. $1,250.50 es «MIL DOSCIENTOS CINCUENTA PESOS 50/100 M.N.» y un monto sin centavos lleva 00/100."
      },
      {
        q: "¿Qué significa M.N. en una cantidad con letra?",
        a: "Moneda nacional. Indica que el monto está en pesos mexicanos, para que no se confunda con dólares u otra moneda que también usa el signo $."
      },
      {
        q: "¿Qué vale si la cantidad con letra y la cifra no coinciden?",
        a: "Vale la escrita en palabras. Lo dice el artículo 16 de la Ley General de Títulos y Operaciones de Crédito; si la cantidad aparece varias veces con diferencias, vale la menor."
      },
      {
        q: "¿Cómo se escribe 300 mil pesos con letra?",
        a: "TRESCIENTOS MIL PESOS 00/100 M.N."
      },
      {
        q: "¿Se escribe veintiuno pesos o veintiún pesos?",
        a: "Veintiún pesos. Delante de un sustantivo masculino, «uno» se acorta: veintiún, ciento un, treinta y un mil."
      }
    ]
  },
  {
    slug: "blog/cuantas-palabras-son-un-millon-de-tokens",
    title: "¿Cuántas palabras son 1 millón de tokens?",
    excerpt:
      "Medimos texto real en español e inglés con los tokenizadores de OpenAI: un millón de tokens son unas 710,000 palabras en español con GPT-4o y unas 600,000 con GPT-4. El Quijote completo ocupa 592,000 tokens.",
    publishedAt: "2026-10-03",
    updatedAt: "2026-10-03",
    author: "José Gaspard",
    category: "IA",
    keywords: [
      "cuantas palabras son un millon de tokens",
      "tokens a palabras español",
      "cuantos tokens tiene una palabra",
      "tokens por palabra",
      "contador de tokens",
      "1 millon de tokens"
    ],
    estimatedReadMinutes: 6,
    body: `
## La respuesta corta

**Un millón de tokens equivale a unas 710,000 palabras en español** con el tokenizador de GPT-4o (o200k_base), y a unas **600,000 palabras** con el de GPT-4 y GPT-3.5 (cl100k_base). En inglés la misma cantidad de tokens alcanza para unas 750,000-763,000 palabras. El español gasta más tokens por palabra porque los tokenizadores se entrenaron con más inglés.

No son estimaciones copiadas de otra web: las medimos el 3 de octubre de 2026 con la librería oficial tiktoken de OpenAI. Abajo está el método para que puedas repetirlo.

## La medición

Tomamos cuatro artículos completos de Wikipedia (Ciudad de México, Lima, Inteligencia artificial y Fútbol) en su versión en español y en inglés, y contamos palabras y tokens con los dos tokenizadores de OpenAI más usados.

| Texto | Tokenizador | Tokens por palabra | 1 millón de tokens ≈ |
|---|---|---|---|
| Wikipedia en español (72,608 palabras) | o200k_base (GPT-4o) | 1.41 | 710,000 palabras |
| Wikipedia en español | cl100k_base (GPT-4, GPT-3.5) | 1.67 | 598,000 palabras |
| Wikipedia en inglés (48,058 palabras) | o200k_base (GPT-4o) | 1.31 | 763,000 palabras |
| Wikipedia en inglés | cl100k_base (GPT-4, GPT-3.5) | 1.33 | 749,000 palabras |

Dos cosas salen de la tabla. La primera: el tokenizador nuevo de OpenAI trata bastante mejor al español (1.41 tokens por palabra frente a 1.67). La segunda: aun con el nuevo, el español sigue costando cerca de un 8 % más tokens que el inglés para la misma cantidad de palabras.

## ¿Cuántos tokens tiene el Quijote?

Medimos también el texto completo de *Don Quijote de la Mancha* (las dos partes, edición del Proyecto Gutenberg): **386,614 palabras**.

- Con o200k_base (GPT-4o): **592,079 tokens**.
- Con cl100k_base (GPT-4): **663,832 tokens**.

El castellano del siglo XVII se tokeniza peor que el actual (1.53 tokens por palabra), pero la conclusión práctica es clara: **el Quijote entero cabe en una ventana de contexto de un millón de tokens**, y sobra espacio para tus preguntas.

## ¿Cuántos tokens tiene una palabra?

En español actual, entre 1.4 y 1.7 tokens por palabra según el modelo. Las palabras cortas y frecuentes («de», «que», «casa») suelen ser un solo token. Las largas, raras o con tildes se parten en varios: «desafortunadamente» o un apellido poco común pueden ocupar tres o cuatro.

Una regla rápida que funciona bien para presupuestar:

- **Español con GPT-4o:** palabras × 1.4 = tokens.
- **Español con modelos anteriores:** palabras × 1.7 = tokens.
- **Inglés:** palabras × 1.3 = tokens. Coincide con la referencia de OpenAI de que 100 tokens son unas 75 palabras en inglés.

## ¿Y en Claude o Gemini?

Cada empresa usa su propio tokenizador, así que la cifra cambia. Nuestra medición es solo de los tokenizadores públicos de OpenAI, porque son los que se pueden ejecutar en local sin llamar a una API. Para Claude y Gemini, la forma fiable de saberlo es la función de conteo de tokens de su propia API, o una estimación como la que hace el [contador de tokens de Toolram](/contador-tokens), que sirve para presupuestar antes de enviar un texto largo.

## ¿Cuánto pesa un archivo de un millón de tokens?

Con 4.4 caracteres por token (lo que medimos en español con o200k_base), un millón de tokens son unos 4.4 millones de caracteres. Guardado como texto plano en UTF-8, eso ronda los **4.5 MB**: las letras sin tilde ocupan un byte y las acentuadas y la ñ ocupan dos. Un PDF con el mismo texto pesará más por las fuentes y el formato.

## Cómo repetir la medición

Si quieres comprobarlo con tus propios textos, basta Python y tiktoken:

\`\`\`
pip install tiktoken
python -c "import tiktoken; t=open('texto.txt').read(); e=tiktoken.get_encoding('o200k_base'); print(len(t.split()), len(e.encode(t)))"
\`\`\`

El primer número son las palabras y el segundo los tokens. Divide el segundo entre el primero y tendrás tu ratio.
`,
    faqs: [
      {
        q: "¿Cuántas palabras son un millón de tokens en español?",
        a: "Unas 710,000 palabras con el tokenizador de GPT-4o y unas 600,000 con el de GPT-4 y GPT-3.5, según nuestra medición con tiktoken sobre artículos de Wikipedia en español (3-oct-2026)."
      },
      {
        q: "¿Cuántos tokens tiene una palabra en español?",
        a: "Entre 1.4 y 1.7 tokens por palabra de media, según el modelo. En inglés la media está en 1.3."
      },
      {
        q: "¿Cabe el Quijote en un millón de tokens?",
        a: "Sí. El texto completo (386,614 palabras) ocupa 592,079 tokens con el tokenizador de GPT-4o y 663,832 con el de GPT-4."
      },
      {
        q: "¿Por qué el español gasta más tokens que el inglés?",
        a: "Porque los tokenizadores se construyeron con más texto en inglés, así que tienen más palabras inglesas completas en su vocabulario y parten más las españolas."
      }
    ]
  },
  {
    slug: "blog/cambiar-mayusculas-a-minusculas-word-excel-google-docs",
    title: "Mayúsculas a minúsculas en Word, Excel y Docs",
    excerpt:
      "El atajo de Word (Mayús + F3), las fórmulas de Excel y Google Sheets (MINUSC, MAYUSC, NOMPROPIO), el menú de Google Docs y qué hacer cuando el texto no cambia porque es solo formato.",
    publishedAt: "2026-10-03",
    updatedAt: "2026-10-03",
    author: "José Gaspard",
    category: "Texto",
    keywords: [
      "cambiar mayusculas a minusculas en word",
      "mayusculas a minusculas excel",
      "google docs mayusculas minusculas",
      "shift f3 word",
      "formula minusc excel",
      "convertir mayusculas a minusculas"
    ],
    estimatedReadMinutes: 5,
    body: `
## La respuesta corta

- **Word:** selecciona el texto y pulsa **Mayús + F3**. Cada pulsación alterna entre minúsculas, MAYÚSCULAS y Cada Palabra Con Mayúscula.
- **Excel y Google Sheets:** usa una fórmula en otra columna: **=MINUSC(A2)**, **=MAYUSC(A2)** o **=NOMPROPIO(A2)**.
- **Google Docs:** menú **Formato → Texto → Uso de mayúsculas** y eliges minúsculas, MAYÚSCULAS o Tipo título.
- **Cualquier otro sitio** (un correo, un formulario, un CMS): pega el texto en el [convertidor de mayúsculas y minúsculas](/convertir-mayusculas) y copia el resultado.

## En Microsoft Word

Hay dos caminos y los dos cambian las letras de verdad:

1. **Atajo:** selecciona el texto y pulsa Mayús + F3. En portátiles donde las teclas F hacen otra cosa (brillo, volumen), pulsa también Fn: Fn + Mayús + F3. En Mac es igual.
2. **Botón:** pestaña Inicio, grupo Fuente, botón «Aa» (Cambiar mayúsculas y minúsculas). Ahí aparecen también «Tipo oración», que deja en mayúscula solo la primera letra de cada frase, y la opción que invierte mayúsculas y minúsculas, útil cuando escribiste con el Bloq Mayús activado sin darte cuenta.

### Si el texto no cambia

Pasa más de lo que parece: el texto se ve en mayúsculas pero Mayús + F3 no hace nada. Es porque no son mayúsculas reales, sino un **formato de fuente**. Abre el cuadro Fuente (la flecha pequeña en la esquina del grupo Fuente) y quita la casilla «Mayúsculas» o «Versales». Al copiar ese texto a otro programa verás que en realidad estaba en minúsculas.

## En Excel

Excel no tiene botón para esto. Se hace con funciones:

| Quieres | Fórmula | «ana MARÍA lópez» queda |
|---|---|---|
| Todo en minúsculas | =MINUSC(A2) | ana maría lópez |
| Todo en mayúsculas | =MAYUSC(A2) | ANA MARÍA LÓPEZ |
| Primera letra de cada palabra | =NOMPROPIO(A2) | Ana María López |

El truco es que la fórmula va en otra columna. Cuando tengas el resultado, cópialo y pégalo encima del original con **Pegado especial → Valores**, y borra la columna auxiliar.

Si tu Excel está en inglés, las mismas funciones se llaman LOWER, UPPER y PROPER.

Otra vía sin fórmulas es el **Relleno rápido** (Ctrl + E): escribe a mano el primer resultado en la columna de al lado, pulsa Ctrl + E y Excel copia el patrón al resto.

## En Google Sheets

Funciona igual que Excel: =LOWER(A2), =UPPER(A2) y =PROPER(A2). Si tu hoja está configurada en español, también acepta los nombres MINUSC, MAYUSC y NOMPROPIO.

## En Google Docs

Docs sí tiene menú: selecciona el texto y entra a **Formato → Texto → Uso de mayúsculas**. Las tres opciones son minúsculas, MAYÚSCULAS y Tipo título. No hay atajo de teclado nativo para esto.

## Una nota de ortografía

Dos reglas de la RAE que conviene tener en cuenta al convertir:

- **Las mayúsculas llevan tilde.** ÁRBOL, MARÍA, CAMIÓN. Si tu texto en mayúsculas no las tiene, al pasarlo a minúsculas tampoco aparecerán y tendrás que ponerlas a mano.
- **«Tipo título» es costumbre del inglés.** En español, el título de un libro, una película o un artículo lleva mayúscula solo en la primera palabra y en los nombres propios: «Cien años de soledad», no «Cien Años De Soledad». Úsalo para nombres de personas, no para títulos.

## Cuando no estás en Word ni en Excel

Si el texto está en un correo, en WhatsApp, en un formulario web o en el editor de tu página, lo más rápido es el [convertidor de Toolram](/convertir-mayusculas): pegas, eliges minúsculas, MAYÚSCULAS, tipo oración o tipo título, y copias. Funciona en el navegador y no guarda lo que pegas.
`,
    faqs: [
      {
        q: "¿Cuál es el atajo para cambiar mayúsculas a minúsculas en Word?",
        a: "Mayús + F3 con el texto seleccionado. Cada pulsación alterna entre minúsculas, MAYÚSCULAS y Cada Palabra Con Mayúscula. En portátiles puede hacer falta pulsar también Fn."
      },
      {
        q: "¿Cómo paso a minúsculas una columna en Excel?",
        a: "En una columna auxiliar escribe =MINUSC(A2), arrástrala hacia abajo, copia el resultado y pégalo sobre el original con Pegado especial → Valores. En Excel en inglés la función se llama LOWER."
      },
      {
        q: "¿Google Docs tiene atajo para mayúsculas y minúsculas?",
        a: "No tiene atajo nativo. Se hace desde Formato → Texto → Uso de mayúsculas."
      },
      {
        q: "¿Por qué Mayús + F3 no cambia mi texto en Word?",
        a: "Porque las mayúsculas son un formato de fuente y no letras reales. Abre el cuadro Fuente y quita la casilla «Mayúsculas» o «Versales»."
      },
      {
        q: "¿Las mayúsculas llevan tilde?",
        a: "Sí. La RAE indica que las mayúsculas se acentúan igual que las minúsculas: ÁRBOL, MARÍA, CAMIÓN."
      }
    ]
  },
  {
    slug: "blog/regla-de-tres-ejercicios-resueltos",
    title: "Ejercicios de regla de tres resueltos paso a paso",
    excerpt:
      "Ejercicios de regla de tres con problemas reales: recetas, mermas de cocina, precios, porcentajes, obreros, velocidad y producción. Cada uno con el planteamiento, la operación y cómo saber si es directa o inversa.",
    publishedAt: "2026-10-03",
    updatedAt: "2026-10-03",
    author: "José Gaspard",
    category: "Calculadoras",
    keywords: [
      "regla de tres ejercicios resueltos",
      "regla de 3 ejemplos",
      "regla de tres inversa ejercicios",
      "regla de tres compuesta ejemplo",
      "como sacar regla de 3"
    ],
    estimatedReadMinutes: 7,
    body: `
## Cómo resolver cualquier regla de tres en 3 pasos

1. **Ordena los datos** en dos filas: lo que sabes arriba, lo que preguntas abajo, con la incógnita x.
2. **Decide si es directa o inversa.** Pregúntate: si una cantidad sube, ¿la otra sube también? Si sí, es directa. Si baja, es inversa.
3. **Opera.** Directa: multiplicas en cruz y divides. Inversa: multiplicas en línea y divides.

Si solo quieres el resultado, la [calculadora de regla de tres](/calculadora-regla-tres) resuelve la simple, la inversa y la compuesta con el procedimiento. Aquí van los ejercicios hechos a mano para que entiendas qué hace.

## Ejercicio 1. Receta para más personas (directa)

Una receta para 4 porciones lleva 300 g de harina. ¿Cuánta harina necesitas para 10 porciones?

| Porciones | Harina |
|---|---|
| 4 | 300 g |
| 10 | x |

Más porciones, más harina: directa. x = 10 × 300 ÷ 4 = **750 g**.

## Ejercicio 2. Mermas en la cocina (directa)

Este es un caso real que nos llegó como búsqueda: «si de 650 gramos me quedan 263, ¿cuántos necesito para que me queden 480?». Pasa con la carne que pierde agua al cocinarse o con la fruta que se pela.

| Compro | Me queda |
|---|---|
| 650 g | 263 g |
| x | 480 g |

Si quiero que me quede más, tengo que comprar más: directa. x = 650 × 480 ÷ 263 = **1,186.3 g**, es decir, unos 1.19 kg.

Truco: 263 ÷ 650 = 0.405. Te queda el 40.5 % de lo que compras, así que para cualquier cantidad final basta dividir entre 0.405.

## Ejercicio 3. Precio por metro (directa)

3 metros de tela cuestan $255. ¿Cuánto cuestan 7.5 metros?

x = 7.5 × 255 ÷ 3 = **$637.50**.

## Ejercicio 4. Sacar un porcentaje (directa)

Respondiste bien 45 de 180 preguntas. ¿Qué porcentaje es?

| Preguntas | Porcentaje |
|---|---|
| 180 | 100 % |
| 45 | x |

x = 45 × 100 ÷ 180 = **25 %**. Todo porcentaje es una regla de tres directa donde el total vale 100.

## Ejercicio 5. Obreros y días (inversa)

6 obreros terminan una barda en 15 días. ¿Cuántos días tardan 9 obreros?

Más obreros, menos días: inversa. Se multiplica en línea: x = 6 × 15 ÷ 9 = **10 días**.

Comprobación rápida: el trabajo total es 6 × 15 = 90 jornadas. Con 9 obreros, 90 ÷ 9 = 10. Si los dos productos coinciden, la inversa está bien.

## Ejercicio 6. Velocidad y tiempo (inversa)

A 80 km/h llegas en 3 horas. ¿Cuánto tardas a 120 km/h?

Más velocidad, menos tiempo: inversa. x = 80 × 3 ÷ 120 = **2 horas**.

## Ejercicio 7. Comida para animales (inversa)

El alimento alcanza 20 días para 3 perros. Si adoptas uno más, ¿para cuántos días alcanza?

Más perros, menos días: inversa. x = 3 × 20 ÷ 4 = **15 días**.

## Ejercicio 8. Máquinas, horas y piezas (compuesta)

5 máquinas trabajando 8 horas fabrican 400 piezas. ¿Cuántas piezas fabrican 3 máquinas en 10 horas?

Aquí hay tres magnitudes, así que se compara cada una con la incógnita por separado:

- Menos máquinas, menos piezas: directa, factor 3/5.
- Más horas, más piezas: directa, factor 10/8.

x = 400 × (3/5) × (10/8) = 400 × 0.6 × 1.25 = **300 piezas**.

Cuando una de las relaciones es inversa, su factor se pone al revés. Por ejemplo, si la pregunta fuera cuántos días tardan, más máquinas significaría menos días, y el factor de máquinas iría invertido.

## Cómo saber si es directa o inversa sin equivocarte

Imagina el caso extremo. ¿Si duplicas una cantidad, la otra se duplica? Directa. ¿Se reduce a la mitad? Inversa. Recetas, precios, distancias a velocidad fija y porcentajes son directas. Trabajadores contra tiempo, velocidad contra tiempo y raciones contra días son inversas.

El error más común es tratar como directa una inversa: si te sale que 9 obreros tardan más que 6, el planteamiento está al revés.
`,
    faqs: [
      {
        q: "¿Cómo se saca una regla de tres simple?",
        a: "Ordena los datos en dos filas, con la incógnita x abajo. Si es directa, multiplica el dato que acompaña a x por el de la otra columna y divide entre el que queda. Ejemplo: si 4 porciones llevan 300 g, 10 porciones llevan 10 × 300 ÷ 4 = 750 g."
      },
      {
        q: "¿Cómo sé si una regla de tres es inversa?",
        a: "Si al aumentar una cantidad la otra disminuye, es inversa. Ejemplo: más obreros, menos días. Se resuelve multiplicando en línea: 6 obreros × 15 días ÷ 9 obreros = 10 días."
      },
      {
        q: "Si de 650 g me quedan 263 g, ¿cuánto necesito para que me queden 480 g?",
        a: "Unos 1,186 g. Es una regla de tres directa: 650 × 480 ÷ 263 = 1,186.3 g."
      },
      {
        q: "¿Qué es una regla de tres compuesta?",
        a: "La que relaciona tres o más magnitudes. Se resuelve multiplicando el dato conocido por un factor por cada magnitud, invertido cuando la relación es inversa. Ejemplo: 400 piezas × 3/5 × 10/8 = 300 piezas."
      }
    ]
  }
];
