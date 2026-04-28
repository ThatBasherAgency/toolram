import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Sugerencias, bugs, propuestas o partnerships. Escribinos.",
  alternates: { canonical: "/contacto" }
};

export default function ContactPage() {
  return (
    <article className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Contacto</h1>
      <p className="text-lg text-[color:var(--color-fg-soft)] mb-6">¿Falta una herramienta? ¿Encontraste un bug? ¿Querés proponer algo? Escribinos.</p>
      <a href="mailto:contacto@nebu-lab.com" className="btn btn-primary">📧 contacto@nebu-lab.com</a>
    </article>
  );
}
