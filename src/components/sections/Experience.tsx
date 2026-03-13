"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Briefcase } from "lucide-react";
import { EXPERIENCE } from "@/lib/constants";
import GlassCard from "@/components/ui/GlassCard";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.to(lineRef.current, {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "bottom 80%",
            scrub: 0.5,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card, i) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
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
      id="experience"
      className="relative py-36 md:py-48 overflow-hidden"
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Section Title */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted" style={{ display: "block", marginBottom: "1rem" }}>
            04 — Journey
          </span>
          <h2
            className="font-display font-bold text-gradient-primary"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Experience &amp; Education
          </h2>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: "3rem" }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: "0.75rem",
              top: 0,
              bottom: 0,
              width: "2px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "1px",
            }}
          >
            <div
              ref={lineRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: 0,
                background: "var(--accent-primary)",
                boxShadow: "0 0 10px rgba(0, 240, 255, 0.5)",
              }}
            />
          </div>

          {/* Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {EXPERIENCE.map((item) => {
              const Icon = item.type === "education" ? GraduationCap : Briefcase;

              return (
                <div key={item.id} style={{ position: "relative" }}>
                  {/* Node on the line */}
                  <div
                    style={{
                      position: "absolute",
                      left: "-3rem",
                      top: "1.5rem",
                      width: "1.5rem",
                      height: "1.5rem",
                      borderRadius: "50%",
                      background: "var(--bg-primary)",
                      border: "2px solid var(--accent-primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 10,
                      boxShadow: "0 0 12px rgba(0, 240, 255, 0.3)",
                    }}
                  >
                    <Icon size={12} style={{ color: "var(--accent-primary)" }} />
                  </div>

                  {/* Card */}
                  <div className="timeline-card">
                    <GlassCard className="p-6 md:p-8" tilt={false}>
                      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
                        <span className="font-mono text-xs text-accent-primary uppercase tracking-wider">
                          {item.period}
                        </span>
                        <span
                          className="font-mono text-[10px] uppercase tracking-wider"
                          style={{
                            padding: "2px 8px",
                            borderRadius: "4px",
                            background: item.type === "education" ? "rgba(139,92,246,0.15)" : "rgba(0,240,255,0.1)",
                            color: item.type === "education" ? "var(--accent-secondary)" : "var(--accent-primary)",
                          }}
                        >
                          {item.type}
                        </span>
                      </div>

                      <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary" style={{ marginBottom: "0.25rem" }}>
                        {item.role}
                      </h3>
                      <h4 className="font-body text-base text-text-secondary" style={{ marginBottom: "1rem" }}>
                        {item.company}
                      </h4>
                      <p className="font-body text-sm text-text-muted" style={{ lineHeight: 1.7, marginBottom: "1.25rem" }}>
                        {item.description}
                      </p>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {item.tech.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono"
                            style={{
                              fontSize: "10px",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              padding: "4px 10px",
                              background: "var(--bg-tertiary)",
                              border: "1px solid rgba(255,255,255,0.05)",
                              borderRadius: "4px",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </GlassCard>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
