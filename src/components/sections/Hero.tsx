"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/ui/MagneticButton";
import TextScramble from "@/components/ui/TextScramble";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import FrameCanvas from "@/components/ui/FrameCanvas";
import { useFrameSequence } from "@/hooks/useFrameSequence";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  // 210 frames dynamically loaded
  const { images, progress, isLoaded } = useFrameSequence(210, "/images/hero section images frame/ezgif-frame-");

  useEffect(() => {
    // Detect mobile / touch screens to apply fallback early on
    setIsTouchDevice(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    );
  }, []);

  return (
    <>
      {/* 
        ═══════════════════════════════════════════════════
        MASTER PRELOADER (INITIATE SEQUENCE)
        ═══════════════════════════════════════════════════
      */}
      <AnimatePresence>
        {!isLoaded && !isTouchDevice && (
          <motion.div
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#050505] text-white"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center gap-6 w-full max-w-sm px-6">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-primary animate-pulse">
                Initiating Master Build
              </span>
              
              <h2 className="font-display text-4xl font-bold tracking-widest drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                {progress}%
              </h2>

              <div className="w-full h-[2px] bg-white/10 relative overflow-hidden mt-2">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-accent-primary shadow-[0_0_10px_rgba(0,229,255,0.8)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              
              <span className="font-mono text-[10px] uppercase text-text-dim">
                Mounting Render Pipeline...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        ═══════════════════════════════════════════════════
        HERO SECTION WRAPPER (height set heavily for scrolling)
        ═══════════════════════════════════════════════════
      */}
      <section id="hero" className="relative">
        
        {/*
          THE CANVAS TIMELINE:
          If touch, show fallback image immediately. If desktop, render sequence context.
        */}
        <div className="h-[250vh]">
          {isTouchDevice ? (
            // Mobile Fallback: Parallax Static Image
            <div className="sticky top-16 md:top-20 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] w-full overflow-hidden flex items-center justify-center">
              <Image 
                src="/images/hero section images frame/ezgif-frame-210.jpg"
                alt="Inayat Hero"
                fill
                className="object-cover opacity-60"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/80" />
            </div>
          ) : (
            // Desktop 60fps WebGL/Canvas Scroll Engine
            isLoaded && <FrameCanvas images={images} />
          )}

          {/* 
            ═══════════════════════════════════════════════════
            CONTENT OVERLAY
            ═══════════════════════════════════════════════════
          */}
          <div className="absolute top-16 md:top-20 left-0 w-full h-[calc(100dvh-4rem)] md:h-[calc(100dvh-5rem)] flex flex-col justify-end pb-[12vh] px-6 md:px-12 z-10 pointer-events-none">
            <div className="w-full flex flex-col items-start max-w-4xl pointer-events-auto">
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded || isTouchDevice ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-4 mb-8"
              >
                <div className="w-2 h-2 rounded-full bg-accent-primary shadow-[0_0_10px_rgba(0,229,255,0.8)] animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-primary">
                  System Online
                </span>
              </motion.div>

              <motion.h1
                className="sr-only"
                style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
                initial={{ opacity: 0 }}
                animate={isLoaded || isTouchDevice ? { opacity: 1 } : {}}
              >
                {(isLoaded || isTouchDevice) && (
                  <TextScramble text="INAYAT HUSSAIN" speed={40} play={true} />
                )}
              </motion.h1>

              <motion.p
                className="font-body font-medium text-text-primary mb-8 text-shadow-sm opacity-90 tracking-wide"
                style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)" }}
                initial={{ opacity: 0, x: -20 }}
                animate={isLoaded || isTouchDevice ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Software Engineer | Full Stack & GenAI Specialist
              </motion.p>

              <motion.div
                className="glass-card mb-16 px-6 py-4 border-l-2 text-text-muted bg-[#050505]/40 backdrop-blur-md"
                style={{ borderLeftColor: "var(--accent-secondary)" }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isLoaded || isTouchDevice ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <p className="font-mono text-xs md:text-sm tracking-widest text-[#B0B0B0]">
                  Building Scalable Web Solutions & Intelligent AI Systems
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded || isTouchDevice ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <MagneticButton>
                  <a
                    href="#projects"
                    className="inline-flex items-center justify-center px-8 py-4 neon-border bg-[#101010] text-accent-primary font-display font-bold text-xs uppercase tracking-widest rounded-full hover:bg-accent-primary hover:text-[#050505] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all duration-300 pointer-events-auto"
                    data-cursor="button"
                  >
                    Enter Neural Net
                  </a>
                </MagneticButton>
                
                <MagneticButton>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/10 text-text-primary font-display font-bold text-xs uppercase tracking-widest rounded-full hover:border-accent-secondary hover:shadow-[0_0_20px_rgba(176,38,255,0.2)] hover:bg-[#1a1a1a] transition-all duration-300 pointer-events-auto"
                    data-cursor="button"
                  >
                    Initiate Contact
                  </a>
                </MagneticButton>
              </motion.div>

            </div>
          </div>
        </div>

        {/* Global Scroll Indicator */}
        <div className="absolute bottom-[5vh] left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <ScrollIndicator />
        </div>
      </section>
    </>
  );
}
