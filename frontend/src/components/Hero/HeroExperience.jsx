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
    preloadSingleImage('/assets/images/exterior/exterior-roof.webp');
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Set initial hidden state for headline & CTA at scroll = 0
      gsap.set(heroContentRef.current, { opacity: 0, y: 32, pointerEvents: 'none' });

      // 1. Initial Cinematic Image Entrance
      if (!prefersReducedMotion) {
        gsap.fromTo(imageLayerRef.current,
          { scale: 1.04, opacity: 0 },
          { scale: 1.0, opacity: 1, duration: 1.2, ease: 'power2.out' }
        );
      } else {
        gsap.to(imageLayerRef.current, { opacity: 1, duration: 0.8 });
      }

      // 2. Structured Cinematic Scroll Scrub Sequence with Controlled Two-Step Progression
      // State 0 (Scroll 0): Initial Hero with large logo centered
      // State 1 (Progress 0.38 - 0.64, snap target 0.50): Headline in focus ("Architecture Shaped by Experience")
      // State 2 (Progress 0.64 - 1.00, snap target 1.00): Exit into ExteriorLayers
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          snap: prefersReducedMotion ? false : {
            snapTo: [0, 0.5, 1],
            duration: { min: 0.2, max: 0.55 },
            delay: 0.05,
            ease: 'power2.out'
          },
          onUpdate: (self) => {
            const p = self.progress;
            if (heroContentRef.current) {
              heroContentRef.current.style.pointerEvents = (p >= 0.30 && p <= 0.70) ? 'auto' : 'none';
            }
          }
        }
      });

      if (!prefersReducedMotion) {
        scrollTl
          // Phase 1: Reveal headline & CTA gradually as logo docks into navbar (progress 0.04 -> 0.36)
          .fromTo(heroContentRef.current,
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, ease: 'power2.out', duration: 0.32 },
            0.04
          )
          // Phase 2: Settled viewing window across State 1 (progress 0.36 -> 0.64, snap target at 0.50)
          .to(heroContentRef.current, { opacity: 1, y: 0, duration: 0.28 }, 0.36)
          // Phase 3: Transition out into ExteriorLayers (progress 0.64 -> 1.0)
          .to(heroContentRef.current,
            { opacity: 0, y: -28, ease: 'power2.in', duration: 0.36 },
            0.64
          )
          .to(imageLayerRef.current,
            { scale: 1.08, ease: 'none', duration: 0.36 },
            0.64
          );
      } else {
        scrollTl
          .fromTo(heroContentRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.04)
          .to(heroContentRef.current, { opacity: 1, duration: 0.28 }, 0.36)
          .to(heroContentRef.current, { opacity: 0, duration: 0.36 }, 0.64);
      }
    }, containerRef);

    // Keyboard accessibility for smooth step progression without blocking native input
    const handleKeyDown = (e) => {
      if (!containerRef.current) return;
      const vh = window.innerHeight;
      const heroHeight = containerRef.current.offsetHeight;
      const maxHeroScroll = Math.max(1, heroHeight - vh);
      const state1 = Math.round(maxHeroScroll * 0.50);
      const state2 = maxHeroScroll;
      const currentY = window.scrollY;

      if (currentY >= state2 + 20) return;

      if (['ArrowDown', 'PageDown'].includes(e.code)) {
        if (currentY < state1 * 0.7) {
          e.preventDefault();
          scrollToPosition(state1, { duration: 0.7 });
        } else if (currentY < state2 - 40) {
          e.preventDefault();
          scrollToPosition(state2, { duration: 0.7 });
        }
      } else if (['ArrowUp', 'PageUp'].includes(e.code)) {
        if (currentY > state1 * 0.3 && currentY <= state2 + 10) {
          e.preventDefault();
          scrollToPosition(currentY > state1 * 1.1 ? state1 : 0, { duration: 0.7 });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      ctx.revert();
      window.removeEventListener('keydown', handleKeyDown);
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
      className="relative w-full h-[220vh] bg-[#070707]"
    >
      {/* Sticky Fullscreen Cinematic Architectural Stage */}
      <div className="sticky top-0 w-full h-screen h-[100svh] min-h-0 overflow-hidden bg-black flex flex-col justify-end select-none">
        
        {/* Dominant Architectural Focus Visual: mirae-hero-bg.jpg */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div 
            ref={imageLayerRef} 
            className="absolute inset-0 w-full h-full will-change-transform"
          >
            <img 
              src="/assets/images/hero/mirae-hero-bg.jpg"
              alt="MIRAE Architectural Atelier Interior"
              className="w-full h-full object-cover object-[center_40%] transform-gpu brightness-[1.02] contrast-[1.02]"
              loading="eager"
              decoding="sync"
            />
          </div>

          {/* Light, Natural Architectural Atmosphere with Subtle Legibility Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Left-Aligned Editorial Headline + Explore Projects CTA */}
        <div 
          ref={heroContentRef}
          className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-[max(3.25rem,8vh)] sm:pb-[max(4rem,9vh)] md:pb-20 lg:pb-26 pointer-events-auto"
        >
          <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl text-left -translate-x-0 md:-translate-x-3 lg:-translate-x-6">
            <h1 className="font-excon font-semibold text-[clamp(1.75rem,5vw,2.25rem)] sm:text-4xl md:text-5xl lg:text-[4rem] xl:text-[4.75rem] text-white leading-[1.1] sm:leading-[1.06] tracking-[-0.02em] drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)]">
              Architecture<br />
              Shaped by Experience
            </h1>

            {/* Premium 'EXPLORE PROJECTS →' CTA */}
            <div className="mt-5 sm:mt-8 md:mt-12">
              <button
                onClick={scrollToProjects}
                className="group inline-flex items-center space-x-3.5 text-xs sm:text-[13px] font-pencrow font-semibold tracking-[0.25em] uppercase text-neutral-200 hover:text-white transition-colors duration-300 focus:outline-none cursor-pointer py-1.5 sm:py-1"
                aria-label="Explore Projects"
              >
                <span className="relative">
                  EXPLORE PROJECTS
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-mirae-orange/90 transition-all duration-300 group-hover:w-full" />
                </span>
                <span className="text-sm sm:text-base transition-transform duration-300 ease-out group-hover:translate-x-2 text-neutral-300 group-hover:text-mirae-orange">
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
