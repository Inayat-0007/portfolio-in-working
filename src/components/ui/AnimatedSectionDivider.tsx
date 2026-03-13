"use client";

import { motion } from "framer-motion";

export default function AnimatedSectionDivider() {
  return (
    <div className="relative h-px w-full overflow-hidden py-0" aria-hidden="true">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent"
        initial={{ x: "-100%" }}
        whileInView={{ x: "100%" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(0,240,255,0.1) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}
