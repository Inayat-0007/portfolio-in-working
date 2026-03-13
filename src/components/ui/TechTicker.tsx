"use client";
import { TECH_TICKER } from "@/lib/constants";

export default function TechTicker() {
  const content = TECH_TICKER.join(" • ") + " • ";

  return (
    <div className="overflow-hidden whitespace-nowrap opacity-30">
      <div className="inline-flex animate-scroll-left">
        <span className="font-mono text-xs text-text-dim tracking-wider pr-4">
          {content}
        </span>
        <span className="font-mono text-xs text-text-dim tracking-wider pr-4">
          {content}
        </span>
      </div>
    </div>
  );
}
