import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { preloadSingleImage } from '../../utils/imagePreloader';

gsap.registerPlugin(ScrollTrigger);

export default function HeroExperience() {
  const containerRef = useRef(null);
  const imageLayerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    preloadSingleImage('/assets/images/hero/downloads-2.png');
    preloadSingleImage('/assets/images/exterior/exterior-roof.webp');
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Initial Entrance Animation Sequence
      if (!prefersReducedMotion) {
        const entranceTl = gsap.timeline({ delay: 0.1 });
        entranceTl
          .fromTo(imageLayerRef.current,
            { scale: 1.05, opacity: 0 },
            { scale: 1.0, opacity: 1, duration: 1.3, ease: 'power2.out' }
          )
          .fromTo(textRef.current,
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
            '-=0.6'
          );
      }

      // 2. Cinematic Scroll Scrub
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        }
      });

      if (!prefersReducedMotion) {
        scrollTl
          .to(imageLayerRef.current, {
            scale: 1.08,
            ease: 'none',
            duration: 1.5
          }, 0)
          .to(textRef.current, {
            opacity: 0,
            y: -24,
            ease: 'power2.in',
            duration: 0.8
          }, 0.2);
      } else {
        scrollTl.to(textRef.current, { opacity: 0, duration: 0.8 }, 0.2);
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="hero" 
      ref={containerRef} 
      className="relative w-full h-[140vh] bg-[#070707]"
    >
      {/* Sticky Fullscreen Cinematic Architectural Stage */}
      <div className="sticky top-0 w-full h-screen h-[100svh] min-h-0 overflow-hidden bg-black flex flex-col justify-between select-none">
        
        {/* Dominant Visual Focus: downloads 2.png */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div 
            ref={imageLayerRef} 
            className="absolute inset-0 w-full h-full will-change-transform"
          >
            <img 
              src="/assets/images/hero/downloads-2.png"
              onError={(e) => { e.target.src = '/assets/images/hero/downloads 2.png'; }}
              alt="MIRAE Architectural Atelier Interior"
              className="w-full h-full object-cover object-[center_35%] transform-gpu"
              loading="eager"
              decoding="sync"
            />
          </div>

          {/* Deep Architectural Vignettes for Maximum Legibility & Atmospheric Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/80 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-transparent to-black/80 pointer-events-none" />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </div>

        {/* Top Space Buffer (Reserved for Large Centered Hero Logo Presence) */}
        <div className="relative z-10 w-full pt-16 sm:pt-20 md:pt-24 flex justify-center pointer-events-none">
          <div className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto" />
        </div>

        {/* Bottom Headline: ONLY 'Architecture Shaped by Experience' */}
        <div 
          ref={textRef}
          className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 md:pb-16 text-center pointer-events-auto"
        >
          <h1 className="font-architectural text-xl sm:text-2xl md:text-3xl lg:text-[2.5rem] xl:text-[2.85rem] font-normal tracking-[0.025em] sm:tracking-[0.035em] text-neutral-100 leading-tight drop-shadow-[0_4px_28px_rgba(0,0,0,0.95)] max-w-4xl mx-auto">
            Architecture Shaped by Experience
          </h1>
        </div>

      </div>
    </section>
  );
}
