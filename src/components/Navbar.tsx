"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, PERSONAL } from "@/lib/constants";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { Menu, X, Download } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { progress } = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
    );

    NAV_LINKS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-accent-primary z-[101]"
        style={{ width: `${progress * 100}%` }}
      />

      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-bg-primary/80 backdrop-blur-2xl border-b border-white/[0.05]"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem" }} className="h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display text-xl md:text-2xl font-bold text-text-primary hover:text-accent-primary transition-colors duration-300"
            data-cursor="button"
          >
            {PERSONAL.monogram}
            <span className="text-accent-primary">.</span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="relative font-mono text-xs uppercase tracking-[0.15em] text-text-muted hover:text-text-primary transition-colors duration-300 group"
                data-cursor="link"
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent-primary"
                    layoutId="activeNav"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-primary/50 group-hover:w-full transition-all duration-300" />
              </button>
            ))}

            <MagneticButton>
              <a
                href={PERSONAL.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-accent-primary/30 rounded-full font-mono text-xs uppercase tracking-wider text-accent-primary hover:bg-accent-primary/10 hover:border-accent-primary/60 transition-all duration-300"
                data-cursor="button"
              >
                <Download size={12} />
                Resume
              </a>
            </MagneticButton>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[99] bg-bg-primary/95 backdrop-blur-3xl flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="font-display text-3xl font-bold text-text-primary hover:text-accent-primary transition-colors"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.a
                href={PERSONAL.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-6 py-3 border border-accent-primary rounded-full font-mono text-sm uppercase tracking-wider text-accent-primary"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
