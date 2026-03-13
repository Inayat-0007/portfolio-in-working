"use client";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { PROJECTS } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";
import TextScramble from "@/components/ui/TextScramble";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useInView } from "@/hooks/useInView";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, isInView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div
      ref={cardRef}
      className="project-panel min-w-[100vw] w-screen h-full flex items-center justify-center px-6 md:px-16 shrink-0"
    >
      <div ref={inViewRef} className="max-w-6xl w-full grid md:grid-cols-[55%_45%] gap-8 md:gap-12 items-center">
        {/* Image */}
        <motion.div
          className="relative rounded-xl overflow-hidden aspect-[16/10] group"
          initial={{ scale: 1.15, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-full h-full relative">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${project.color}15, ${project.color}05, #11111188)`,
              }}
            />
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <span className="font-mono text-sm text-accent-primary uppercase tracking-wider flex items-center gap-2">
              View Project <ExternalLink size={14} />
            </span>
          </div>
        </motion.div>

        {/* Info */}
        <div className="space-y-5">
          {/* Number */}
          <span
            className="font-display text-7xl md:text-8xl font-bold block leading-none select-none"
            style={{ color: `${project.color}20` }}
          >
            {project.number}
          </span>

          {/* Title */}
          <h3 className="font-display text-2xl md:text-4xl font-bold text-text-primary">
            <TextScramble text={project.title} play={isInView} speed={25} />
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full glass-card font-mono text-[11px] uppercase tracking-wider"
                style={{ color: project.color, borderColor: `${project.color}30` }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="font-body text-sm md:text-base text-text-secondary leading-relaxed">
            {project.description}
          </p>

          {/* Period */}
          <span className="font-mono text-xs text-text-muted block">{project.period}</span>

          {/* CTA */}
          <MagneticButton>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider group/link"
              style={{ color: project.color }}
              data-cursor="link"
              data-cursor-label="OPEN"
            >
              View on GitHub
              <span className="w-0 group-hover/link:w-6 h-[1px] transition-all duration-500" style={{ backgroundColor: project.color }} />
              <ExternalLink size={14} />
            </a>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { ref: titleRef, isInView: titleVisible } = useInView<HTMLDivElement>({
    threshold: 0.3,
  });

  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      // The container holds the first static title slide + all project panels
      if (!containerRef.current) return;

      gsap.to(containerRef.current, {
        x: () => -(containerRef.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + (containerRef.current!.scrollWidth - window.innerWidth),
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden"
    >
      {/* Desktop: Horizontal Scroll */}
      {!isMobile ? (
        <div className="h-screen flex items-center w-full">
          <div ref={containerRef} className="flex h-full w-max flex-nowrap">
            {/* Entry card */}
            <div className="min-w-[100vw] w-screen h-full flex items-center justify-center px-6 shrink-0">
              <div ref={titleRef} className="text-center">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-primary block mb-4">
                  03 — Projects
                </span>
                <h2
                  className="font-display font-bold text-text-primary mb-4"
                  style={{
                    fontSize: "clamp(3rem, 8vw, 8rem)",
                    WebkitTextStroke: "1px rgba(255,255,255,0.15)",
                    color: "transparent",
                  }}
                >
                  <TextScramble text="Selected Work" play={titleVisible} speed={30} />
                </h2>
                <p className="font-mono text-sm text-text-muted">
                  <span className="text-accent-primary">04</span> PROJECTS •{" "}
                  <span className="text-text-dim">
                    Real products. Real impact. Real code.
                  </span>
                </p>
              </div>
            </div>

            {/* Project panels */}
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      ) : (
        /* Mobile: Vertical Cards */
        <div className="py-32 px-6">
          <div className="mb-12 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-primary block mb-4">
              03 — Projects
            </span>
            <h2
              className="font-display font-bold text-text-primary mb-2"
              style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
            >
              Selected Work
            </h2>
            <p className="font-mono text-sm text-text-muted">
              04 Projects • Real products. Real code.
            </p>
          </div>

          <div className="max-w-lg mx-auto space-y-12">
            {PROJECTS.map((project) => (
              <motion.div
                key={project.id}
                className="glass-card p-6 rounded-xl"
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Image */}
                <div className="w-full aspect-video rounded-lg mb-5 relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}15, #11111188)`,
                    }}
                  />
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border"
                      style={{
                        color: project.color,
                        borderColor: `${project.color}30`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-display text-xl font-bold text-text-primary mb-2">
                  {project.title}
                </h3>
                <p className="font-body text-sm text-text-secondary mb-4 leading-relaxed">
                  {project.description}
                </p>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider"
                  style={{ color: project.color }}
                >
                  View Project <ExternalLink size={12} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
