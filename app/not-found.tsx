import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="text-7xl mb-4">🔧</div>
      <h1 className="text-3xl font-bold mb-2">404 — Esta página se rompió</h1>
      <p className="text-[color:var(--color-fg-soft)] mb-6">Pero no te preocupes, tenemos una herramienta para arreglar casi todo.</p>
      <Link href="/" className="btn btn-primary">Volver al inicio</Link>
    </div>
  );
}
