"use client";
import { useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export default function FrameCanvas({ images }: { images: HTMLImageElement[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // We use the entire body/document for the scroll target 
  // to ensure frames progress across the first 400vh
  const { scrollYProgress } = useScroll();

  const frameIndex = useRef(0);
  const currentFrame = useRef(0);
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // We only want the animation to play over the first ~25% of the total page scroll 
    // (since total scroll might be huge). Adjusting multiplier to fine-tune the frame scroll speed.
    // latest goes from 0 to 1. 1 = bottom of the whole page.
    let mappedProgress = latest * 3.5; // Plays out faster than full page scroll
    if (mappedProgress > 1) mappedProgress = 1;
    
    frameIndex.current = mappedProgress * (images.length - 1);
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext("2d", { alpha: false }); // Optimize for no transparency
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const render = () => {
      // Only consume CPU/GPU cycles when actually visible
      if (isVisible) {
        // LERP logic for buttery smooth transitions
        currentFrame.current += (frameIndex.current - currentFrame.current) * 0.15;
      
      const index = Math.min(
        images.length - 1,
        Math.max(0, Math.round(currentFrame.current))
      );
      
      const img = images[index];
      if (img && img.complete && img.naturalHeight !== 0) {
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        // Contain logic mapping (fits entire image to screen without cropping)
        if (canvasRatio > imgRatio) {
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        } else {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      // Adjust resolution matching devicePixelRatio for highest quality, 
      // but cap it to avoid extreme memory hits on 4k displays.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    // Jumpstart the render loop
    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [images]);

  return (
    <div className="sticky top-16 md:top-20 w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] overflow-hidden bg-[#050505] z-0">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover object-center z-0" 
      />
      {/* Heavy gradient to mask the bottom edge seamlessly into the next section */}
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[20vh] bg-gradient-to-b from-[#050505]/70 to-transparent pointer-events-none" />
    </div>
  );
}
