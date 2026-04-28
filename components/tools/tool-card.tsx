import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, type Tool } from "@/lib/tools-registry";

export function ToolCard({ tool }: { tool: Tool }) {
  const cat = CATEGORIES[tool.category];
  return (
    <Link href={`/${tool.slug}`} className="card group flex flex-col">
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs px-2 py-0.5 rounded-full bg-[color:var(--color-bg-soft)] text-[color:var(--color-fg-soft)]">
          {cat.emoji} {cat.name}
        </span>
        <ArrowUpRight className="w-4 h-4 text-[color:var(--color-fg-soft)] group-hover:text-[color:var(--color-brand)] transition" />
      </div>
      <h3 className="font-semibold mb-1 group-hover:text-[color:var(--color-brand)]">{tool.name}</h3>
      <p className="text-sm text-[color:var(--color-fg-soft)] flex-1">{tool.shortDesc}</p>
    </Link>
  );
}
