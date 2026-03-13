"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const counter = { value: 0 };
    gsap.to(counter, {
      value: 100,
      duration: 1.4,
      ease: "power2.inOut",
      onUpdate: () => {
        setCount(Math.round(counter.value));
      },
      onComplete: () => {
        setIsComplete(true);
        setTimeout(onComplete, 400);
      },
    });
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-bg-primary"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
        >
          <motion.div
            ref={nameRef}
            className="font-display text-4xl md:text-6xl font-bold tracking-wider text-text-primary mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {"INAYAT HUSSAIN".split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={
                  count >= 95
                    ? {
                        textShadow:
                          count % 2 === 0
                            ? "2px 0 #00f0ff, -2px 0 #8b5cf6"
                            : "-1px 0 #00f0ff, 1px 0 #8b5cf6",
                      }
                    : undefined
                }
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>

          <div className="flex flex-col items-center gap-4">
            <span
              ref={counterRef}
              className="font-mono text-5xl md:text-7xl font-bold text-accent-primary tabular-nums"
            >
              {count}%
            </span>
            <div className="w-48 h-[2px] bg-bg-tertiary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent-primary rounded-full"
                style={{ width: `${count}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          <motion.p
            className="absolute bottom-8 font-mono text-xs text-text-dim uppercase tracking-[0.3em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading Experience
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
