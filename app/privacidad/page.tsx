import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo Toolram trata tus datos. Procesamiento local, sin trackers de terceros invasivos.",
  alternates: { canonical: "/privacidad" }
};

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-10 prose prose-sm">
      <h1 className="text-3xl font-bold mb-4">Política de privacidad</h1>
      <p className="text-sm text-[color:var(--color-fg-soft)]">Última actualización: 28 de abril de 2026</p>
      <h2 className="mt-6 text-xl font-bold">Datos que NO recolectamos</h2>
      <ul>
        <li>Texto, archivos o imágenes que pegues/subas a herramientas client-side.</li>
        <li>Contraseñas, hashes, UUIDs o cualquier salida de generadores: se generan en tu navegador.</li>
        <li>Cuentas o contraseñas de redes sociales: nunca te las pedimos.</li>
      </ul>
      <h2 className="mt-6 text-xl font-bold">Datos que sí podemos recolectar</h2>
      <ul>
        <li><strong>Analytics agregados</strong> (vía Google Analytics 4 o Plausible) — número de visitas, país, navegador. No identifican usuarios.</li>
        <li><strong>Logs de servidor</strong> de los endpoints que requieren backend (PageSpeed, AI tools): IP y user-agent durante 30 días para prevenir abuso.</li>
      </ul>
      <h2 className="mt-6 text-xl font-bold">Cookies</h2>
      <p>Usamos solo cookies funcionales (preferencia de tema oscuro/claro). No usamos cookies de tracking de terceros.</p>
      <h2 className="mt-6 text-xl font-bold">Contacto</h2>
      <p>Si tenés preguntas: <a href="mailto:contacto@nebu-lab.com">contacto@nebu-lab.com</a></p>
    </article>
  );
}
