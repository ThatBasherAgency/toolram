import type { Metadata } from "next";
import { SearchBox } from "@/components/tools/search-box";
import { ToolCard } from "@/components/tools/tool-card";
import { popularTools } from "@/lib/tools-registry";

export const metadata: Metadata = {
  title: "Buscar herramienta",
  description: "Busca entre todas las herramientas de Toolram",
  alternates: { canonical: "/buscar" }
};

export default function SearchPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Buscar herramienta</h1>
      <SearchBox />
      <h2 className="text-xl font-bold mt-10 mb-3">Más populares</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {popularTools(9).map((t) => <ToolCard key={t.slug} tool={t} />)}
      </div>
    </div>
  );
}
