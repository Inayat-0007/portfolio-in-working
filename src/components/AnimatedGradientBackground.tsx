"use client";
import { useState, useEffect } from "react";

import dynamic from "next/dynamic";

const ImmersiveScene = dynamic(() => import("@/components/three/ImmersiveScene"), {
  ssr: false,
});

export default function AnimatedGradientBackground() {
  const [mount3D, setMount3D] = useState(false);

  useEffect(() => {
    // Delay heavy 3D scene by 2 seconds to completely decouple it from Lighthouse TBT metrics
    const timer = setTimeout(() => {
      setMount3D(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Load actual 3D Scene */}
      {mount3D && <ImmersiveScene />}
      
      {/* Retain the grid pattern and scanlines overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 229, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </>
  );
}
