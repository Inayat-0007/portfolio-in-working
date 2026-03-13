"use client";
import { useState, useEffect } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = Date.now();
    let ticking = false;

    const updateScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = docHeight > 0 ? scrollY / docHeight : 0;

      const now = Date.now();
      const dt = now - lastTime;
      const currentVelocity = dt > 0 ? (scrollY - lastScrollY) / dt : 0;

      setProgress(currentProgress);
      setVelocity(currentVelocity);

      lastScrollY = scrollY;
      lastTime = now;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { progress, velocity };
}
