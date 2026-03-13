"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Mail, MapPin, ArrowUpRight, Github, Linkedin, Twitter, ArrowUp } from "lucide-react";
import { PERSONAL } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";
import GlassCard from "@/components/ui/GlassCard";
import TextScramble from "@/components/ui/TextScramble";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative py-32 md:py-40 min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Aurora Background Effect */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-accent-primary/30 blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-accent-secondary/30 blur-[100px] mix-blend-screen" />
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }} className="w-full relative z-10">
        <div className="grid lg:grid-cols-[1fr_600px] gap-16 lg:gap-20">
          {/* Header & Info */}
          <div className="flex flex-col justify-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-primary mb-6 block">
              06 — Connect
            </span>

            <h2
              className="font-display font-bold text-gradient-primary mb-8 text-transparent bg-clip-text"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 1 }}
            >
              Let&apos;s build
              <br />
              <span className="text-text-muted italic">the future.</span>
            </h2>

            <p className="font-body text-lg md:text-xl text-text-secondary max-w-lg mb-12">
              Whether you have a visionary project, a tricky technical problem,
              or just want to say hi, my inbox is always open.
            </p>

            <div className="space-y-6 mb-16">
              {/* Email */}
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-bg-tertiary">
                  <Mail size={20} className="text-text-muted" />
                </div>
                <div>
                  <span className="font-mono text-xs text-text-dim uppercase tracking-wider block mb-1">
                    Direct Email
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="font-display text-xl text-text-primary hover:text-accent-primary transition-colors flex items-center gap-3 group"
                  >
                    {PERSONAL.email}
                    <Copy
                      size={16}
                      className={`transition-colors ${
                        copied ? "text-green-400" : "text-text-dim group-hover:text-accent-primary"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-bg-tertiary">
                  <MapPin size={20} className="text-text-muted" />
                </div>
                <div>
                  <span className="font-mono text-xs text-text-dim uppercase tracking-wider block mb-1">
                    Location
                  </span>
                  <span className="font-display text-xl text-text-primary">
                    {PERSONAL.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Github, link: PERSONAL.socials.github, label: "GitHub" },
                { icon: Linkedin, link: PERSONAL.socials.linkedin, label: "LinkedIn" },
                { icon: Twitter, link: "https://x.com/", label: "Twitter" },
              ].map((social) => (
                <MagneticButton key={social.label}>
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-bg-tertiary/50 hover:bg-accent-primary hover:border-accent-primary hover:text-bg-primary transition-all duration-300 group"
                    aria-label={social.label}
                    data-cursor="button"
                  >
                    <social.icon size={22} className="group-hover:scale-110 transition-transform" />
                  </a>
                </MagneticButton>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="relative">
            <GlassCard className="p-8 md:p-12 rounded-3xl border-t border-l border-white/10 bg-bg-primary/40 backdrop-blur-2xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-text-muted">
                    Name // Organization
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-lg font-display text-text-primary focus:border-accent-primary focus:outline-none transition-colors rounded-none placeholder:text-text-dim/50"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-text-muted">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-lg font-display text-text-primary focus:border-accent-primary focus:outline-none transition-colors rounded-none placeholder:text-text-dim/50"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-text-muted">
                    Message // Project Details
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-lg font-body text-text-primary focus:border-accent-primary focus:outline-none transition-colors rounded-none placeholder:text-text-dim/50 resize-none"
                    placeholder="Tell me about your vision..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full py-5 bg-text-primary text-bg-primary font-display font-bold uppercase tracking-widest relative overflow-hidden group rounded-lg disabled:opacity-70"
                  data-cursor="button"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      "Transmitting..."
                    ) : isSubmitted ? (
                      "Message Received"
                    ) : (
                      <>
                        Initiate Sequence <ArrowUpRight size={18} />
                      </>
                    )}
                  </span>
                  {!isSubmitting && !isSubmitted && (
                    <div className="absolute inset-0 bg-accent-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                  )}
                </button>
              </form>
            </GlassCard>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
             <span className="font-display text-xl font-bold block mb-1">
               {PERSONAL.monogram}.
             </span>
             <span className="font-mono text-xs text-text-dim uppercase tracking-wider">
               © {new Date().getFullYear()} All Rights Reserved.
             </span>
          </div>

          <div className="font-mono text-[10px] text-text-dim uppercase tracking-widest text-center flex flex-col gap-1 items-center md:items-end">
            <span>Designed & Engineered by</span>
            <span>Mohammad Inayat Hussain // 2026 Master Build</span>
          </div>

          <MagneticButton>
            <button
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-bg-tertiary text-text-muted hover:text-accent-primary hover:border-accent-primary transition-all duration-300"
              aria-label="Back to top"
              data-cursor="button"
            >
              <ArrowUp size={20} />
            </button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
