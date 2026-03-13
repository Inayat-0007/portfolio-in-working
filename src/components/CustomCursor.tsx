"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function CustomCursor() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [hoverType, setHoverType] = useState<"default" | "button" | "link" | "project">(
    "default"
  );
  const [hoverLabel, setHoverLabel] = useState("");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(-100, { stiffness: 150, damping: 20, mass: 0.5 });
  const ringY = useSpring(-100, { stiffness: 150, damping: 20, mass: 0.5 });
  const ringScale = useSpring(1, { stiffness: 300, damping: 25 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    },
    [cursorX, cursorY, ringX, ringY]
  );

  useEffect(() => {
    if (isMobile) return;

    // Hide the native cursor via inline style on body
    document.body.style.cursor = "none";

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleEnter = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-cursor]");
      if (!el) return;
      const type = el.getAttribute("data-cursor") as typeof hoverType;
      const label = el.getAttribute("data-cursor-label") ?? "";
      setHoverType(type ?? "default");
      setHoverLabel(label);
      if (type === "button") ringScale.set(2);
      else if (type === "project") ringScale.set(2.5);
      else ringScale.set(1.5);
    };

    const handleLeave = () => {
      setHoverType("default");
      setHoverLabel("");
      ringScale.set(1);
    };

    document.addEventListener("mouseover", handleEnter);
    document.addEventListener("mouseout", handleLeave);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleEnter);
      document.removeEventListener("mouseout", handleLeave);
    };
  }, [isMobile, handleMouseMove, ringScale]);

  if (isMobile) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent-primary pointer-events-none z-[10001] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          scale: ringScale,
          width: 40,
          height: 40,
        }}
      >
        <div
          className={`w-full h-full rounded-full border flex items-center justify-center transition-colors duration-200 ${
            hoverType !== "default"
              ? "border-accent-primary/60 bg-accent-primary/10"
              : "border-text-muted/30"
          }`}
        >
          {hoverLabel && (
            <span className="text-[6px] font-mono uppercase tracking-wider text-accent-primary font-bold">
              {hoverLabel}
            </span>
          )}
        </div>
      </motion.div>
    </>
  );
}
