"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PERSONAL } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import TechTicker from "@/components/ui/TechTicker";
import FloatingElement from "@/components/ui/FloatingElement";
import dynamic from "next/dynamic";

const HeroParticles = dynamic(() => import("@/components/three/HeroParticles"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-bg-primary" />,
});

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Name character animation
      const chars = nameRef.current?.querySelectorAll(".char");
      if (chars) {
        gsap.from(chars, {
          y: 80,
          opacity: 0,
          rotateX: 40,
          stagger: 0.03,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.4,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Background Layers */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <HeroParticles />
      </motion.div>

      {/* Floating Geometric Elements */}
      <FloatingElement
        className="absolute top-[15%] left-[10%] opacity-[0.12] hidden md:block"
        delay={0}
        duration={8}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <polygon
            points="30,2 58,17 58,43 30,58 2,43 2,17"
            stroke="var(--accent-primary)"
            strokeWidth="1"
          />
        </svg>
      </FloatingElement>

      <FloatingElement
        className="absolute top-[25%] right-[12%] opacity-[0.15] hidden md:block"
        delay={2}
        duration={7}
      >
        <span className="font-mono text-4xl text-accent-secondary/20">&lt;/&gt;</span>
      </FloatingElement>

      <FloatingElement
        className="absolute bottom-[30%] left-[8%] opacity-[0.1] hidden md:block"
        delay={1}
        duration={9}
        y={15}
      >
        <div className="w-3 h-3 rounded-full bg-accent-primary/30" />
      </FloatingElement>

      <FloatingElement
        className="absolute bottom-[20%] right-[15%] opacity-[0.1] hidden md:block"
        delay={3}
        duration={6}
      >
        <div className="w-2 h-2 rounded-full bg-accent-secondary/30" />
      </FloatingElement>

      {/* Main Content */}
      <motion.div
        ref={contentRef}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        style={{ opacity: contentOpacity }}
      >
        {/* Name */}
        <motion.h1
          ref={nameRef}
          className="font-display font-bold leading-[0.9] tracking-tight mb-6 text-gradient-primary"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 8rem)",
            scale: nameScale,
            opacity: nameOpacity,
            y: nameY,
          }}
        >
          {PERSONAL.displayName}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="font-body text-text-muted mb-3"
          style={{ fontSize: "clamp(1rem, 2vw, 1.6rem)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {PERSONAL.tagline}
        </motion.p>

        {/* Sub-tagline */}
        <motion.p
          className="font-mono text-sm md:text-base text-text-secondary mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {PERSONAL.subTagline}
          <motion.span
            className="inline-block w-[2px] h-4 bg-accent-primary ml-1 align-middle"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          />
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton>
            <a
              href="#projects"
              className="px-8 py-3.5 bg-accent-primary text-bg-primary font-display font-bold text-sm uppercase tracking-wider rounded-full hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-300"
              data-cursor="button"
            >
              View My Projects
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#contact"
              className="px-8 py-3.5 border border-text-muted/30 text-text-primary font-display font-semibold text-sm uppercase tracking-wider rounded-full hover:border-accent-primary/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] transition-all duration-300"
              data-cursor="button"
            >
              Let&apos;s Connect
            </a>
          </MagneticButton>
        </motion.div>

        {/* Tech Ticker */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <TechTicker />
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
