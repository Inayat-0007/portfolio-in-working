"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles, Terminal, Layers, Wrench, Database, Lock,
} from "lucide-react";
import { SKILL_CATEGORIES, ALL_SKILLS, SKILL_ICONS } from "@/lib/constants";
import GlassCard from "@/components/ui/GlassCard";
import HighlightSwipe from "@/components/ui/HighlightSwipe";

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = {
  sparkles: Sparkles,
  terminal: Terminal,
  layers: Layers,
  wrench: Wrench,
  database: Database,
  lock: Lock,
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".skill-card").forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-36 md:py-48 overflow-hidden"
    >
      {/* Animated Dot Grid Background - 2026 flow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="w-full h-full opacity-[0.05] grid-dots-flow"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,240,255,0.5) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }} className="relative z-10">
        {/* Section Title */}
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted block mb-4">
            02 — Skills
          </span>
          <h2
            className="font-display font-bold text-text-primary"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            <HighlightSwipe>Tech Stack</HighlightSwipe>
          </h2>
        </div>

        {/* Skill Category Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {SKILL_CATEGORIES.map((cat) => {
            const IconComponent = ICON_MAP[cat.icon];
            return (
              <div key={cat.category} className="skill-card">
                <GlassCard className="p-6 h-full" data-cursor="button">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                      <IconComponent size={20} className="text-accent-primary" />
                    </div>
                    <h3 className="font-display font-bold text-base text-text-primary">
                      {cat.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-full bg-bg-tertiary text-text-secondary flex items-center gap-2 font-mono text-[11px] border border-white/[0.05] hover:border-accent-primary/30 hover:text-accent-primary transition-all duration-300"
                      >
                        {SKILL_ICONS[skill] && (
                          <i className={`${SKILL_ICONS[skill]} text-sm`} />
                        )}
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>

        {/* Floating Tech Cloud */}
        <div className="flex flex-wrap justify-center gap-3">
          {ALL_SKILLS.map((skill, i) => (
            <motion.span
              key={skill}
              className="px-4 py-2 rounded-full glass-card flex items-center gap-2 font-mono text-xs text-text-muted hover:text-accent-primary hover:border-accent-primary/30 transition-all duration-300 hover:scale-105"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: i * 0.03,
              }}
              data-cursor="button"
            >
              {SKILL_ICONS[skill] && (
                <i className={`${SKILL_ICONS[skill]} text-base`} />
              )}
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
