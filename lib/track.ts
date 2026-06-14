// Client-side analytics helpers. No-op on the server or when gtag/clarity are absent.
// Keeps event names in one place so GA4 + Clarity stay in sync.

type AnyFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: AnyFn;
    clarity?: AnyFn;
    dataLayer?: unknown[];
  }
}

export function track(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", event, params);
  } catch {
    /* analytics must never break the UI */
  }
}

// Fires once the visitor actually interacts with a tool (not just views the page).
// This is the signal that correlates with usefulness on a utilities site.
export function trackToolUsed(slug: string): void {
  track("tool_used", { tool_slug: slug });
  if (typeof window === "undefined") return;
  try {
    window.clarity?.("set", "tool_used", slug);
  } catch {
    /* noop */
  }
}

export function trackSearchSelect(query: string, slug: string): void {
  track("search_select", { search_term: query, tool_slug: slug });
}
