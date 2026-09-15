import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { preloadSingleImage } from '../../utils/imagePreloader';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExited, setIsExited] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function initPreload() {
      // Stage 1: Off-thread decode of primary hero image
      const primaryHero = '/assets/images/hero/downloads-2.png';
      
      // Steady, mathematically smooth progress counter over ~1.9s for a cinematic feel
      let startTime = Date.now();
      const targetDuration = 1900;
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const ratio = Math.min(1, elapsed / targetDuration);
        const easeOut = 1 - Math.pow(1 - ratio, 2);
        const current = Math.min(99, Math.round(easeOut * 99));
        if (!isCancelled) setProgress(current);
      }, 30);

      // Smooth visual duration safeguard: ensure the luxury branding is appreciated
      // while allowing background hero image decode to run concurrently
      const visualPacing = new Promise((resolve) => setTimeout(resolve, 2000));
      const timeoutSafeguard = new Promise((resolve) => setTimeout(resolve, 2800));
      
      await Promise.all([
        visualPacing,
        Promise.race([preloadSingleImage(primaryHero, 2600), timeoutSafeguard])
      ]);
      clearInterval(timer);

      if (isCancelled) return;
      setProgress(100);

      // Brief 200ms pause at 100% so the completion registers before curtain lifts
      await new Promise((resolve) => setTimeout(resolve, 200));
      if (isCancelled) return;

      // Smooth curtain reveal
      const tl = gsap.timeline({
        onComplete: () => {
          if (!isCancelled) {
            setIsExited(true);
            if (onComplete) onComplete();
          }
        }
      });

      tl.to('.preloader-content', {
        y: -40,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.inOut'
      })
      .to('.preloader-curtain', {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
        stagger: 0.08
      }, '-=0.2');
    }

    initPreload();

    return () => {
      isCancelled = true;
    };
  }, [onComplete]);

  if (isExited) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between">
      {/* Background Curtains for cinematic upward reveal */}
      <div className="preloader-curtain fixed inset-0 bg-[#080808] z-0" />
      <div className="preloader-curtain fixed inset-0 bg-[#0f0f0f] z-0 translate-y-full" />

      {/* Preloader Content */}
      <div className="preloader-content relative z-10 w-full h-full flex flex-col justify-between p-8 md:p-16 text-[#f4f3ef]">
        <div className="flex justify-between items-center text-xs tracking-widest uppercase text-subtle font-pencrow font-medium">
          <span>MIRAE ARC STUDIO</span>
          <span>EST. PMR INFRA</span>
        </div>

        <div className="text-center my-auto flex flex-col items-center justify-center">
          <img 
            src="/assets/images/mirae-logo.png" 
            alt="MIRAE Arc Studio" 
            className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain mb-4 sm:mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]" 
          />
          <p className="text-xs sm:text-sm tracking-[0.35em] text-neutral-300 uppercase font-medium font-pencrow">
            Architecture Shaped By Experience
          </p>
        </div>

        <div className="flex justify-between items-end">
          <div className="text-xs text-subtle font-pencrow font-medium">
            <span>50+ YEARS OF REAL CONSTRUCTION EXPERTISE</span>
          </div>
          <div className="font-pencrow text-3xl sm:text-4xl font-light text-white tracking-wider">
            {String(progress).padStart(2, '0')}%
          </div>
        </div>
      </div>
    </div>
  );
}
