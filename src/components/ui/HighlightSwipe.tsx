"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { type ReactNode } from "react";

interface HighlightSwipeProps {
  children: ReactNode;
  color?: string;
  className?: string;
}

export default function HighlightSwipe({
  children,
  color = "var(--accent-primary)",
  className = "",
}: HighlightSwipeProps) {
  const { ref, isInView } = useInView<HTMLSpanElement>({ threshold: 0.5 });

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute bottom-1 left-0 h-3 z-0"
        style={{ backgroundColor: color, opacity: 0.3 }}
        initial={{ width: "0%" }}
        animate={isInView ? { width: "100%" } : { width: "0%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />
    </span>
  );
}
