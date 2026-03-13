"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import { useLenis } from "@/hooks/useLenis";

// Lazy-load below-fold sections for 2x faster initial render
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const AnimatedGradientBackground = dynamic(
  () => import("@/components/AnimatedGradientBackground"),
  { ssr: false }
);
const About = dynamic(() => import("@/components/sections/About"));
const Skills = dynamic(() => import("@/components/sections/Skills"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Experience = dynamic(() => import("@/components/sections/Experience"));
const Certifications = dynamic(() => import("@/components/sections/Certifications"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useLenis();

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";

    const fallback = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => {
      clearTimeout(fallback);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      document.documentElement.style.overflow = "";
      window.scrollTo(0, 0);
    }
  }, [isLoading]);

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to Content
      </a>

      {isLoading && (
        <Preloader onComplete={() => setIsLoading(false)} />
      )}

      <div
        style={{
          visibility: isLoading ? "hidden" : "visible",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      >
        <AnimatedGradientBackground />
        <CustomCursor />
        <Navbar />

        <main id="main-content" className="relative w-full">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Certifications />
          <Contact />
        </main>
      </div>
    </>
  );
}
