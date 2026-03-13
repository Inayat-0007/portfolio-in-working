"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Award, ExternalLink, Calendar } from "lucide-react";
import { CERTIFICATIONS } from "@/lib/constants";
import GlassCard from "@/components/ui/GlassCard";
import HighlightSwipe from "@/components/ui/HighlightSwipe";
import MarqueeStrip from "@/components/ui/MarqueeStrip";
import TextScramble from "@/components/ui/TextScramble";

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const featured = CERTIFICATIONS.find((c) => c.featured);
  const others = CERTIFICATIONS.filter((c) => !c.featured);

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative py-36 md:py-48 overflow-hidden"
    >
      {/* Background Marquee Strips */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center opacity-[0.03] pointer-events-none rotate-3 scale-110">
        <MarqueeStrip
          items={CERTIFICATIONS.map((c) => c.title)}
          direction="left"
          className="font-display text-8xl font-bold leading-none py-4"
          separator=" ★ "
        />
        <MarqueeStrip
          items={["Verified Skills", "Industry Standard", "Continuous Learning", "Mastery"]}
          direction="right"
          className="font-mono text-6xl uppercase tracking-widest leading-none py-12"
          separator=" // "
        />
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }} className="relative z-10">
        <div className="mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted mb-4 block">
            05 — Certifications
          </span>
          <h2
            className="font-display font-bold text-text-primary"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            <HighlightSwipe color="var(--accent-secondary)">
              Proof of Work
            </HighlightSwipe>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_minmax(300px,400px)] gap-8 md:gap-12">
          {/* Featured Certificate */}
          {featured && (
            <motion.div style={{ y: y1 }}>
              <GlassCard
                className="p-8 md:p-12 h-full rounded-2xl border-accent-secondary/30 relative"
                glowColor="rgba(139, 92, 246, 0.15)"
              >
                {/* Persistent glow for featured */}
                <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_60px_rgba(139,92,246,0.1)] pointer-events-none" />

                <div className="w-full aspect-video rounded-xl mb-8 relative overflow-hidden ring-1 ring-white/10">
                  {featured.image ? (
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-bg-primary">
                      <Award size={64} className="text-accent-secondary opacity-20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-tertiary/80 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-full bg-accent-secondary/10 flex items-center justify-center ring-1 ring-accent-secondary/30 backdrop-blur-sm z-10">
                    <Award size={28} className="text-accent-secondary" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-accent-secondary uppercase tracking-widest block mb-1">
                      Featured
                    </span>
                    <span className="font-body text-sm text-text-muted flex items-center gap-2">
                      <Calendar size={14} /> {featured.date}
                    </span>
                  </div>
                </div>

                <h3 className="font-display text-3xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
                  <TextScramble text={featured.title} play={true} speed={40} />
                </h3>

                <p className="font-body text-lg text-text-secondary mb-10 leading-relaxed max-w-2xl">
                  {featured.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-12">
                  {featured.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-accent-secondary/10 border border-accent-secondary/20 rounded-full font-mono text-xs text-accent-secondary uppercase tracking-wider"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <a
                  href={featured.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 bg-accent-secondary text-white font-mono text-sm uppercase tracking-wider rounded-lg hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all duration-300"
                  data-cursor="button"
                >
                  Verify Credential <ExternalLink size={16} />
                </a>
              </GlassCard>
            </motion.div>
          )}

          {/* Other Certificates Grid */}
          <div className="flex flex-col gap-6">
            {others.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                  data-cursor="link"
                >
                  <GlassCard className="p-6 transition-all duration-300 group-hover:bg-white/[0.02] group-hover:border-accent-primary/30">
                    <div className="flex justify-between items-start mb-4">
                      {cert.image ? (
                        <div className="w-24 h-16 rounded overflow-hidden relative ring-1 ring-white/10">
                          <Image
                            src={cert.image}
                            alt={cert.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded bg-bg-tertiary flex items-center justify-center group-hover:bg-accent-primary/10 transition-colors">
                          <Award
                            size={20}
                            className="text-text-muted group-hover:text-accent-primary transition-colors"
                          />
                        </div>
                      )}
                      <ExternalLink
                        size={16}
                        className="text-text-dim group-hover:text-accent-primary transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"
                      />
                    </div>

                    <h4 className="font-display font-bold text-lg text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                      {cert.title}
                    </h4>

                    <div className="font-mono text-xs text-text-dim flex items-center gap-2 mb-4">
                      <Calendar size={12} /> {cert.date}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {cert.skills.slice(0, 3).map((skill) => (
                         <span
                         key={skill}
                         className="text-[10px] font-mono text-text-secondary px-2 py-1 bg-black/20 rounded border border-white/5"
                       >
                         {skill}
                       </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className="text-[10px] font-mono text-text-dim px-2 py-1">
                          +{cert.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </GlassCard>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
