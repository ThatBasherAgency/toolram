import type { Metadata } from "next";
import Link from "next/link";
import { SYMBOL_CATEGORIES } from "@/data/symbols";

export const metadata: Metadata = {
  title: "Símbolos para copiar y pegar",
  description: "Copia y pega corazones ❤, estrellas ★, flechas →, símbolos matemáticos, monedas, música y más. 200+ símbolos Unicode listos para usar.",
  alternates: { canonical: "/simbolos" }
};

// 27-sep-2026: este hub servia 65 palabras de contenido propio (un titulo, una frase y una
// rejilla de enlaces). Se le anade explicacion real de como funcionan los simbolos Unicode
// y 5 preguntas frecuentes con su marcado FAQPage.
const FAQS = [
  {
    q: "¿Por qué algunos símbolos se ven distintos en cada dispositivo?",
    a: "Unicode define qué significa cada símbolo, no cómo se dibuja. El dibujo lo pone la tipografía del sistema, así que un mismo corazón o una misma flecha se ven de una forma en Windows, de otra en macOS y de otra en Android. El carácter que pegas es siempre el mismo."
  },
  {
    q: "¿Se pierden los símbolos al pegarlos en Word o en un correo?",
    a: "No, siempre que el documento use codificación UTF-8, que es la de cualquier programa actual. Si aparece un cuadrado vacío no es que se haya perdido: es que la tipografía elegida no tiene ese carácter. Cambiando la fuente vuelve a verse."
  },
  {
    q: "¿Cuál es la diferencia entre un símbolo y un emoji?",
    a: "El emoji es en realidad un símbolo Unicode más, pero los sistemas lo pintan en color y como imagen. Los símbolos de estas listas son monocromos y heredan el color y el tamaño del texto que los rodea, así que encajan mejor dentro de una frase."
  },
  {
    q: "¿Puedo usarlos en el nombre de usuario o en la biografía de una red social?",
    a: "En la mayoría sí, y son de los sitios donde más se usan. Cada plataforma tiene su propia lista de caracteres permitidos, así que conviene probar antes de guardar. Algunas rechazan símbolos poco habituales aunque los muestren bien al escribirlos."
  },
  {
    q: "¿Afectan al posicionamiento si los pongo en un título?",
    a: "Los buscadores los leen sin problema, pero no siempre los muestran en los resultados: Google sustituye o elimina los que considera decorativos. Úsalos si aportan claridad y nunca como sustituto de una palabra que quieras posicionar."
  }
];

export default function SymbolsIndex() {
  const total = SYMBOL_CATEGORIES.reduce((acc, c) => acc + c.symbols.length, 0);
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <h1 className="text-3xl md:text-4xl font-bold mb-2">Símbolos para copiar y pegar</h1>
      <p className="text-lg text-[color:var(--color-fg-soft)] mb-8">{total}+ símbolos Unicode organizados por categoría. Toca cualquier símbolo para copiarlo.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {SYMBOL_CATEGORIES.map((cat) => (
          <Link key={cat.slug} href={`/simbolos/${cat.slug}`} className="card group">
            <div className="text-4xl mb-2">{cat.emoji}</div>
            <div className="font-semibold mb-1 group-hover:text-[color:var(--color-brand)]">{cat.name}</div>
            <div className="text-xs text-[color:var(--color-fg-soft)] mb-2">{cat.symbols.length} símbolos</div>
            <div className="flex gap-1 flex-wrap text-xl">
              {cat.symbols.slice(0, 6).map((s, i) => <span key={i}>{s.char}</span>)}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-bold mb-3">Qué son estos símbolos y por qué se pegan en cualquier sitio</h2>
        <p className="mb-4 text-[color:var(--color-fg-soft)]">
          Todo lo que ves en esta página es texto, no imágenes. Cada corazón, cada flecha y cada nota musical
          es un carácter del estándar Unicode, el mismo catálogo del que salen la letra A o el signo de euro.
          Por eso se copian y se pegan igual que una palabra: entran en el nombre de un documento, en el
          asunto de un correo, en una hoja de cálculo o en la biografía de una red social sin necesidad de
          instalar nada ni de usar una fuente especial.
        </p>
        <p className="mb-4 text-[color:var(--color-fg-soft)]">
          La diferencia con una imagen importa más de lo que parece. Un símbolo Unicode hereda el tamaño y el
          color del texto que lo rodea, se puede buscar dentro de un documento, lo lee un lector de pantalla y
          no añade peso a una página web. Una imagen de un corazón no hace nada de eso.
        </p>
        <h2 className="text-2xl font-bold mb-3 mt-10">Cómo copiarlos sin errores</h2>
        <p className="mb-4 text-[color:var(--color-fg-soft)]">
          En el ordenador basta con pulsar sobre el símbolo: queda en el portapapeles y se pega con el atajo
          de siempre. En el móvil funciona igual con un toque. Si al pegarlo aparece un recuadro vacío o un
          interrogante, el carácter está bien: lo que falla es que la tipografía elegida no incluye ese dibujo.
          Cambiando la fuente a una completa, como Arial Unicode o Segoe UI Symbol, vuelve a verse.
        </p>
        <p className="mb-4 text-[color:var(--color-fg-soft)]">
          Un aviso útil para quien los usa en formularios: algunos sistemas antiguos guardan el texto en una
          codificación que no admite estos caracteres y los convierten en signos extraños. Antes de usarlos en
          algo importante, como una factura o un campo de base de datos, conviene guardarlo y volver a abrirlo
          para comprobar que sobreviven.
        </p>
        <p className="mb-8 text-[color:var(--color-fg-soft)]">
          Si buscas letras de aspecto distinto en lugar de símbolos sueltos, el{" "}
          <Link href="/texto-decorado" className="underline hover:text-[color:var(--color-brand)]">generador de texto decorado</Link>{" "}
          convierte una frase entera a alfabetos Unicode, y el{" "}
          <Link href="/contador-palabras" className="underline hover:text-[color:var(--color-brand)]">contador de palabras</Link>{" "}
          te dice cuántos caracteres ocupa el resultado antes de publicarlo.
        </p>

        <h2 className="text-2xl font-bold mb-4">Preguntas frecuentes</h2>
        <div className="flex flex-col gap-5">
          {FAQS.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold mb-1">{f.q}</h3>
              <p className="text-[color:var(--color-fg-soft)]">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
