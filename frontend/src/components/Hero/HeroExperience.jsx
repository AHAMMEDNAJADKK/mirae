import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { preloadSingleImage } from '../../utils/imagePreloader';

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

      // 1. Initial Cinematic Image Entrance (Image only, no headline)
      if (!prefersReducedMotion) {
        gsap.fromTo(imageLayerRef.current,
          { scale: 1.04, opacity: 0 },
          { scale: 1.0, opacity: 1, duration: 1.2, ease: 'power2.out' }
        );
      } else {
        gsap.to(imageLayerRef.current, { opacity: 1, duration: 0.8 });
      }

      // 2. Cinematic Scroll Scrub Sequence
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;
            if (heroContentRef.current) {
              heroContentRef.current.style.pointerEvents = (p >= 0.36 && p <= 0.76) ? 'auto' : 'none';
            }
          }
        }
      });

      if (!prefersReducedMotion) {
        scrollTl
          // Phase 1: Reveal headline & CTA gradually as logo docks into navbar (progress 0.05 -> 0.44)
          .fromTo(heroContentRef.current,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, ease: 'power2.out', duration: 0.39 },
            0.05
          )
          // Phase 2: Settled viewing window (progress 0.44 -> 0.72)
          .to(heroContentRef.current, { opacity: 1, y: 0, duration: 0.28 }, 0.44)
          // Phase 3: Transition out into Section 03 (progress 0.72 -> 1.0)
          .to(heroContentRef.current,
            { opacity: 0, y: -28, ease: 'power2.in', duration: 0.28 },
            0.72
          )
          .to(imageLayerRef.current,
            { scale: 1.08, ease: 'none', duration: 0.28 },
            0.72
          );
      } else {
        scrollTl
          .fromTo(heroContentRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.05)
          .to(heroContentRef.current, { opacity: 1, duration: 0.3 }, 0.45)
          .to(heroContentRef.current, { opacity: 0, duration: 0.3 }, 0.75);
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      const navbarOffset = 76;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="hero" 
      ref={containerRef} 
      className="relative w-full h-[200vh] bg-[#070707]"
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
          className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-14 sm:pb-18 md:pb-22 lg:pb-26 pointer-events-auto"
        >
          <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl text-left -translate-x-0 md:-translate-x-3 lg:-translate-x-6">
            <h1 className="font-excon font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] xl:text-[4.75rem] text-white leading-[1.06] tracking-[-0.02em] drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)]">
              Architecture<br />
              Shaped by Experience
            </h1>

            {/* Premium 'EXPLORE PROJECTS →' CTA */}
            <div className="mt-8 sm:mt-10 md:mt-12">
              <button
                onClick={scrollToProjects}
                className="group inline-flex items-center space-x-3.5 text-xs sm:text-[13px] font-pencrow font-semibold tracking-[0.25em] uppercase text-neutral-200 hover:text-white transition-colors duration-300 focus:outline-none cursor-pointer py-1"
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
