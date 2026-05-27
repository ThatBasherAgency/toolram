import { SYMBOL_CATEGORIES, type Symbol as SymbolEntry } from "@/data/symbols";

export function slugifySymbol(s: SymbolEntry): string {
  if (s.unicode && s.unicode !== "Kaomoji" && /^U\+[0-9A-Fa-f]+$/.test(s.unicode)) {
    return s.unicode.replace(/^U\+/, "u").toLowerCase();
  }
  return (
    "k-" +
    s.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60)
  );
}

export type SymbolWithSlug = SymbolEntry & { slug: string; categorySlug: string };

export const ALL_SYMBOL_PAGES: SymbolWithSlug[] = SYMBOL_CATEGORIES.flatMap((cat) =>
  cat.symbols.map((s) => ({ ...s, slug: slugifySymbol(s), categorySlug: cat.slug }))
);

const _bySlug: Record<string, Record<string, SymbolWithSlug>> = {};
for (const p of ALL_SYMBOL_PAGES) {
  if (!_bySlug[p.categorySlug]) _bySlug[p.categorySlug] = {};
  _bySlug[p.categorySlug][p.slug] = p;
}

export function findSymbol(categorySlug: string, slug: string): SymbolWithSlug | undefined {
  return _bySlug[categorySlug]?.[slug];
}

export function relatedSymbols(categorySlug: string, slug: string, limit = 8): SymbolWithSlug[] {
  return ALL_SYMBOL_PAGES.filter((p) => p.categorySlug === categorySlug && p.slug !== slug).slice(0, limit);
}
