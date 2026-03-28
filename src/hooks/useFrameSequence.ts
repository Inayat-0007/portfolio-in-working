"use client";
import { useState, useEffect } from "react";

export function useFrameSequence(frameCount: number, pathPrefix: string, padLength: number = 3) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = new Array(frameCount);
    let isCancelled = false;

    // Concurrently load frames for high-performance zero-lag start
    const loadImages = async () => {
      // Chunk loading to avoid choking the browser queue while maintaining speed
      const chunkSize = 20; 
      for (let i = 0; i < frameCount; i += chunkSize) {
        if (isCancelled) break;
        
        const chunk = Array.from({ length: Math.min(chunkSize, frameCount - i) }, (_, j) => {
          const frameIndex = i + j + 1;
          return new Promise<void>((resolve) => {
            const img = new window.Image();
            const frameNum = String(frameIndex).padStart(padLength, '0');
            img.src = `${pathPrefix}${frameNum}.jpg`;
            
            const handleComplete = () => {
              loadedImages[frameIndex - 1] = img;
              loadedCount++;
              setProgress(Math.round((loadedCount / frameCount) * 100));
              resolve();
            };

            img.onload = handleComplete;
            img.onerror = () => {
              console.error(`Failed to load frame ${frameNum}`);
              handleComplete(); // resolve anyway to keep moving
            };
          });
        });
        
        await Promise.all(chunk);
      }
      
      if (!isCancelled) {
        setImages(loadedImages);
      }
    };

    loadImages();

    return () => {
      isCancelled = true;
    };
  }, [frameCount, pathPrefix, padLength]);

  return { images, progress, isLoaded: progress === 100 };
}
