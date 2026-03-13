"use client";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Code, Shield, Rocket } from "lucide-react";
import { PERSONAL, STATS, IDENTITY_BLOCKS } from "@/lib/constants";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import GlassCard from "@/components/ui/GlassCard";
import { useInView } from "@/hooks/useInView";

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = {
  brain: Brain,
  code: Code,
  shield: Shield,
  rocket: Rocket,
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const { ref: titleRef, isInView: titleVisible } = useInView<HTMLDivElement>({ threshold: 0.3 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Photo circle reveal
      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { clipPath: "circle(0% at 50% 50%)" },
          {
            clipPath: "circle(50% at 50% 50%)",
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: photoRef.current,
              start: "top 70%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );
      }

      // Bio lines animation
      const bioLines = sectionRef.current?.querySelectorAll(".bio-line");
      if (bioLines) {
        bioLines.forEach((line, i) => {
          gsap.from(line, {
            x: i % 2 === 0 ? -60 : 60,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-36 md:py-48 overflow-hidden"
    >
      {/* Section Label */}
      <div ref={titleRef} style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }} className="mb-16">
        <motion.span
          className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted"
          initial={{ x: -40, opacity: 0 }}
          animate={titleVisible ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          01 — About
        </motion.span>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        <div className="grid md:grid-cols-[40%_60%] gap-12 md:gap-16 items-center">
          {/* Photo */}
          <div className="flex justify-center">
            <div
              ref={photoRef}
              className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden"
              style={{ clipPath: "circle(0% at 50% 50%)" }}
            >
              <div className="w-full h-full bg-gradient-to-br from-accent-primary/20 via-bg-tertiary to-accent-secondary/20 flex items-center justify-center">
                <span className="font-display text-7xl md:text-9xl font-bold text-text-dim/30">
                  {PERSONAL.monogram}
                </span>
              </div>
              {/* Subtle border ring */}
              <div className="absolute inset-0 rounded-full border border-accent-primary/20" />
            </div>
          </div>

          {/* Bio Content */}
          <div className="space-y-6">
            {PERSONAL.bio.map((line, i) => (
              <p
                key={i}
                className="bio-line font-body text-base md:text-lg text-text-secondary leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                delay: i * 0.15,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <GlassCard className="p-6 text-center">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  className="font-display text-3xl md:text-4xl font-bold text-accent-primary block mb-2"
                />
                <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                  {stat.label}
                </span>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Identity Blocks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {IDENTITY_BLOCKS.map((block, i) => {
            const IconComponent = ICON_MAP[block.icon];
            return (
              <motion.div
                key={block.label}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <GlassCard className="p-5 group" data-cursor="button">
                  <IconComponent
                    size={24}
                    className="text-accent-primary mb-3 group-hover:scale-110 transition-transform duration-300"
                  />
                  <h3 className="font-display font-bold text-sm text-text-primary mb-1">
                    {block.label}
                  </h3>
                  <p className="font-mono text-xs text-text-muted">{block.detail}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
