"use client";
import { useEffect, useState, useCallback } from "react";
import { SCRAMBLE_CHARS } from "@/lib/utils";

interface TextScrambleProps {
  text: string;
  play: boolean;
  speed?: number;
  className?: string;
}

export default function TextScramble({
  text,
  play,
  speed = 30,
  className = "",
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);

  const scramble = useCallback(() => {
    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );

      iteration += 1 / 3;
      if (iteration > maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  useEffect(() => {
    if (play) {
      const cleanup = scramble();
      return cleanup;
    }
  }, [play, scramble]);

  return <span className={className}>{displayText}</span>;
}
