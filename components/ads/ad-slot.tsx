"use client";
import { useEffect, useRef } from "react";

type Props = {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical" | "fluid";
  layout?: string;
  layoutKey?: string;
  className?: string;
  minHeight?: number;
};

export function AdSlot({ slot, format = "auto", layout, layoutKey, className = "", minHeight = 90 }: Props) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!client || pushed.current) return;
    if (typeof window === "undefined") return;
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
      pushed.current = true;
    } catch {
      // ignore
    }
  }, [client]);

  if (!client) {
    return (
      <div
        className={`rounded-xl bg-[color:var(--color-bg-soft)] border border-dashed border-[color:var(--color-border)] flex items-center justify-center text-xs text-[color:var(--color-fg-soft)] ${className}`}
        style={{ minHeight }}
        aria-hidden
      >
        <span className="opacity-60">Espacio publicitario · {format}</span>
      </div>
    );
  }
  return (
    <ins
      ref={ref}
      className={`adsbygoogle block ${className}`}
      style={{ display: "block", minHeight }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
      data-ad-layout={layout}
      data-ad-layout-key={layoutKey}
    />
  );
}
