"use client";

import { useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";

export default function AnimatedGradientBackground() {
  const { scrollYProgress } = useScroll();

  const meshOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5], [0.6, 0.8, 0.4]);
  const orb1X = useTransform(scrollYProgress, [0, 0.5, 1], [0, 50, -30]);
  const orb2X = useTransform(scrollYProgress, [0, 0.5, 1], [0, -40, 60]);
  const orb3Y = useTransform(scrollYProgress, [0, 0.5, 1], [0, -80, 40]);

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Base mesh gradient - flows continuously */}
      <motion.div
        className="absolute inset-[-50%] opacity-40"
        style={{ opacity: meshOpacity }}
      >
        <div className="mesh-gradient-animated absolute inset-0" />
      </motion.div>

      {/* Floating blurred orbs - 2026 Neo-webism style */}
      <motion.div
        className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.35] orb-float-1"
        style={{
          x: orb1X,
          background: "radial-gradient(circle, rgba(0,240,255,0.4) 0%, rgba(0,240,255,0.1) 40%, transparent 70%)",
        }}
      />
      <motion.div
        className="absolute top-[40%] right-[10%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.3] orb-float-2"
        style={{
          x: orb2X,
          background: "radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(139,92,246,0.15) 40%, transparent 70%)",
        }}
      />
      <motion.div
        className="absolute bottom-[20%] left-[30%] w-[350px] h-[350px] rounded-full blur-[100px] opacity-[0.25] orb-float-3"
        style={{
          y: orb3Y,
          background: "radial-gradient(circle, rgba(0,240,255,0.3) 0%, rgba(139,92,246,0.1) 50%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[10%] right-[25%] w-[300px] h-[300px] rounded-full blur-[90px] opacity-[0.2] orb-float-4"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 60%)",
        }}
      />

      {/* Animated grid lines - subtle tech feel */}
      <div className="absolute inset-0 grid-bg opacity-[0.03]" />

      {/* Radial vignette for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, transparent 60%, rgba(10,10,10,0.4) 100%)",
        }}
      />
    </div>
  );
}
