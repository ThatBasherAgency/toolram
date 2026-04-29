import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/lib/tools-registry";
import { TOOL_EN } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "All free online tools",
  description: "Complete list of all free online tools at Toolram. PDF, SEO, AI, symbols, converters and more.",
  alternates: { canonical: "/en/all-tools" }
};

export default function AllToolsEn() {
  const tools = TOOLS.filter((t) => TOOL_EN[t.slug]).map((t) => ({ tool: t, en: TOOL_EN[t.slug] }));
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">All tools</h1>
      <p className="text-lg text-[color:var(--color-fg-soft)] mb-8">{tools.length} tools available in English. More translations coming.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tools.map(({ tool, en }) => (
          <Link key={tool.slug} href={`/en/${tool.slug}`} className="card group">
            <h3 className="font-semibold mb-1 group-hover:text-[color:var(--color-brand)]">{en.name}</h3>
            <p className="text-sm text-[color:var(--color-fg-soft)]">{en.shortDesc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
