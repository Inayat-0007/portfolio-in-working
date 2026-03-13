"use client";
import { cn } from "@/lib/utils";

interface MarqueeStripProps {
  items: string[];
  direction?: "left" | "right";
  speed?: string;
  className?: string;
  separator?: string;
}

export default function MarqueeStrip({
  items,
  direction = "left",
  className = "",
  separator = " • ",
}: MarqueeStripProps) {
  const content = items.join(separator) + separator;

  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <div
        className={`inline-flex ${
          direction === "left" ? "animate-scroll-left" : "animate-scroll-right"
        }`}
      >
        <span className="inline-block pr-4">{content}</span>
        <span className="inline-block pr-4">{content}</span>
      </div>
    </div>
  );
}
