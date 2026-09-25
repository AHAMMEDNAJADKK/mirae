import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { preloadSingleImage } from '../../utils/imagePreloader';
import { scrollToPosition } from '../../animations/smoothScroll';

gsap.registerPlugin(ScrollTrigger);

export default function HeroExperience() {
  const containerRef = useRef(null);
  const imageLayerRef = useRef(null);
  const heroContentRef = useRef(null);

  useEffect(() => {
    preloadSingleImage('/assets/images/hero/mirae-hero-bg.jpg');
    preloadSingleImage('/assets/images/mirae-hero-logo.webp');
    preloadSingleImage('/assets/images/exterior/exterior-roof.webp');
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Set initial hidden state for headline & CTA at scroll = 0
      gsap.set(heroContentRef.current, { opacity: 0, y: 28, pointerEvents: 'none' });

      // 1. Initial Cinematic Image Entrance
      if (!prefersReducedMotion) {
        gsap.fromTo(imageLayerRef.current,
          { scale: 1.04, opacity: 0 },
          { scale: 1.0, opacity: 1, duration: 1.2, ease: 'power2.out' }
        );
      } else {
        gsap.to(imageLayerRef.current, { opacity: 1, duration: 0.8 });
      }

      // 2. Structured Cinematic Scroll Scrub Sequence
      // State 0 (Scroll 0): Initial Hero with Mirae logo centered exclusively
      // State 1 (Progress 0.18 - 0.68): User scrolls -> "Architecture Shaped by Experience" smoothly appears
      // State 2 (Progress 0.68 - 1.00): Exit into ExteriorLayers
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress;
            if (heroContentRef.current) {
              heroContentRef.current.style.pointerEvents = (p >= 0.28 && p <= 0.68) ? 'auto' : 'none';
            }
          }
        }
      });

      if (!prefersReducedMotion) {
        scrollTl
          // Phase 1: Reveal headline & CTA strictly upon scrolling (progress 0.18 -> 0.46)
          .fromTo(heroContentRef.current,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, ease: 'power2.out', duration: 0.28 },
            0.18
          )
          // Phase 2: Settled viewing window across State 1 (progress 0.46 -> 0.68)
          .to(heroContentRef.current, { opacity: 1, y: 0, duration: 0.22 }, 0.46)
          // Phase 3: Transition out into ExteriorLayers (progress 0.68 -> 1.0)
          .to(heroContentRef.current,
            { opacity: 0, y: -24, ease: 'power2.in', duration: 0.24 },
            0.68
          )
          .to(imageLayerRef.current,
            { scale: 1.08, ease: 'none', duration: 0.32 },
            0.68
          );
      } else {
        scrollTl
          .fromTo(heroContentRef.current, { opacity: 0 }, { opacity: 1, duration: 0.28 }, 0.18)
          .to(heroContentRef.current, { opacity: 1, duration: 0.22 }, 0.46)
          .to(heroContentRef.current, { opacity: 0, duration: 0.24 }, 0.68);
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      const navbarOffset = 76;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      scrollToPosition(elementPosition - navbarOffset, { duration: 1.0 });
    }
  };

  return (
    <section 
      id="hero" 
      ref={containerRef} 
      className="relative w-full h-[175svh] sm:h-[190svh] md:h-[220vh] bg-[#070707]"
    >
      {/* Sticky Fullscreen Cinematic Architectural Stage */}
      <div className="sticky top-0 w-full h-screen h-[100dvh] h-[100svh] min-h-0 overflow-hidden bg-black flex flex-col justify-end select-none">
        
        {/* Dominant Architectural Focus Visual: mirae-hero-bg.jpg */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div 
            ref={imageLayerRef} 
            className="absolute inset-0 w-full h-full will-change-transform"
          >
            <img 
              src="/assets/images/hero/mirae-hero-bg.jpg"
              alt="MIRAE Architectural Atelier Interior"
              className="w-full h-full object-cover object-[center_36%] sm:object-[center_40%] transform-gpu brightness-[1.02] contrast-[1.02]"
              loading="eager"
              decoding="sync"
            />
          </div>

          {/* Light, Natural Architectural Atmosphere with Subtle Legibility Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-black/10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Left-Aligned Editorial Headline + Explore Projects CTA — Hidden initially, reveals strictly on scroll */}
        <div 
          ref={heroContentRef}
          className="relative z-20 w-full max-w-7xl 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-12 pb-[clamp(2rem,6.5svh,4.5rem)] sm:pb-[clamp(3.5rem,10vh,6.5rem)] md:pb-20 lg:pb-26 2xl:pb-28 landscape:pb-4 opacity-0 pointer-events-none translate-y-8 will-change-transform will-change-opacity"
        >
          <div className="max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl 2xl:max-w-5xl text-left -translate-x-0 md:-translate-x-3 lg:-translate-x-6 2xl:translate-x-0">
            <h1 className="font-excon font-semibold text-[clamp(1.6rem,min(6.8vw,5.2vh),3.15rem)] sm:text-4xl md:text-5xl lg:text-[3.85rem] xl:text-[4.5rem] 2xl:text-[4.85rem] text-white leading-[1.06] sm:leading-[1.08] 2xl:leading-[1.05] tracking-[-0.02em] drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)]">
              <span className="block">Architecture Shaped</span>
              <span className="block">by Experience</span>
            </h1>

            {/* Premium 'EXPLORE PROJECTS →' CTA */}
            <div className="mt-5 sm:mt-8 md:mt-12 2xl:mt-14">
              <button
                onClick={scrollToProjects}
                className="group inline-flex items-center space-x-3.5 text-xs sm:text-[13px] 2xl:text-sm font-pencrow font-semibold tracking-[0.25em] uppercase text-neutral-200 hover:text-white transition-colors duration-300 focus:outline-none cursor-pointer py-1.5 sm:py-1"
                aria-label="Explore Projects"
              >
                <span className="relative">
                  EXPLORE PROJECTS
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-mirae-orange/90 transition-all duration-300 group-hover:w-full" />
                </span>
                <span className="text-sm sm:text-base 2xl:text-lg transition-transform duration-300 ease-out group-hover:translate-x-2 text-neutral-300 group-hover:text-mirae-orange">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
