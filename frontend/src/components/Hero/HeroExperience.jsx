import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { preloadSingleImage } from '../../utils/imagePreloader';

gsap.registerPlugin(ScrollTrigger);

export default function HeroExperience() {
  const containerRef = useRef(null);
  
  // Visual layers
  const droneLayerRef = useRef(null);
  const signatureLayerRef = useRef(null);

  // Overlays
  const heroContentRef = useRef(null);
  const signatureContentRef = useRef(null);
  const progressLineRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    preloadSingleImage('/assets/images/hero/hero-drone.webp');
    preloadSingleImage('/assets/images/hero/transition-signature.webp');
    preloadSingleImage('/assets/images/exterior/exterior-roof.webp');
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Initial Orchestrated Entrance Animation Sequence
      if (!prefersReducedMotion) {
        const entranceTl = gsap.timeline({ delay: 0.15 });
        entranceTl
          .fromTo(droneLayerRef.current, 
            { scale: 1.08, opacity: 0 }, 
            { scale: 1.0, opacity: 1, duration: 1.4, ease: 'power2.out' }
          )
          .fromTo('.hero-kicker', 
            { y: 18, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 
            '-=0.8'
          )
          .fromTo('.hero-brand', 
            { y: 18, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 
            '-=0.6'
          )
          .fromTo('.hero-title-line', 
            { y: 24, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out' }, 
            '-=0.5'
          )
          .fromTo('.hero-sub', 
            { y: 16, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 
            '-=0.5'
          )
          .fromTo('.hero-cta', 
            { y: 12, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 
            '-=0.5'
          )
          .fromTo('.hero-telemetry', 
            { opacity: 0 }, 
            { opacity: 1, duration: 0.7, ease: 'power2.out' }, 
            '-=0.3'
          );
      }

      // 2. Parallax ScrollTrigger Timeline (Hero -> The MIRAE Signature)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.9,
          onUpdate: (self) => {
            const p = Math.round(self.progress * 100);
            setScrollProgress(p);
            if (progressLineRef.current) {
              progressLineRef.current.style.width = `${p}%`;
            }
          }
        }
      });

      if (prefersReducedMotion) {
        // Reduced motion: graceful fades only
        scrollTl
          .to(heroContentRef.current, { opacity: 0, duration: 1.0 }, 0.2)
          .fromTo(signatureLayerRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 }, 0.8)
          .fromTo(signatureContentRef.current, { opacity: 0 }, { opacity: 1, duration: 1.0 }, 1.2);
      } else {
        // Full cinematic scrub: gentle scale + fade
        scrollTl
          .to(droneLayerRef.current, {
            scale: 1.10,
            ease: 'none',
            duration: 2.0
          }, 0)
          .to(heroContentRef.current, {
            opacity: 0,
            y: -24,
            ease: 'power2.in',
            duration: 1.0
          }, 0.25)
          .fromTo(signatureLayerRef.current, {
            opacity: 0,
            scale: 1.08
          }, {
            opacity: 1,
            scale: 1.0,
            ease: 'none',
            duration: 2.0
          }, 0.85)
          .fromTo(signatureContentRef.current, {
            opacity: 0,
            y: 28
          }, {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            duration: 1.1
          }, 1.35);
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToExterior = () => {
    const el = document.getElementById('exterior-layers');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      ref={containerRef} 
      className="relative w-full h-[220vh] bg-[#070707]"
    >
      {/* Sticky Fullscreen Cinematic Viewport */}
      <div className="sticky top-0 w-full h-screen h-[100svh] min-h-0 overflow-hidden bg-black flex flex-col justify-between select-none">
        
        {/* Background Visual Layers */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          
          {/* Layer 01: High Drone Aerial View (RESORT KERALA) */}
          <div 
            ref={droneLayerRef} 
            className="absolute inset-0 w-full h-full will-change-transform"
          >
            <img 
              src="/assets/images/hero/hero-drone.webp"
              onError={(e) => { e.target.src = '/assets/images/hero/hero-drone.jpg'; }}
              alt="MIRAE Architecture Hillside Resort Sanctuary Aerial Vista"
              className="w-full h-full object-cover object-center transform-gpu"
              loading="eager"
              decoding="sync"
            />
          </div>

          {/* Layer 02: Transition / Closer View (The MIRAE Signature — Traditional Modern) */}
          <div 
            ref={signatureLayerRef} 
            className="absolute inset-0 w-full h-full will-change-transform opacity-0 pointer-events-none"
          >
            <img 
              src="/assets/images/hero/transition-signature.webp"
              onError={(e) => { e.target.src = '/assets/images/hero/transition-signature.jpg'; }}
              alt="The MIRAE Signature Residence Twilight View"
              className="w-full h-full object-cover object-center transform-gpu"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Architectural Vignette & Atmospheric Contrast Gradients */}
          <div className="absolute inset-0 architectural-vignette pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent pointer-events-none" />
        </div>

        {/* --- 01. HERO VIEW CONTENT --- */}
        <div 
          ref={heroContentRef}
          className="relative z-20 w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-12 lg:p-16 xl:p-20 pointer-events-none"
        >
          {/* Top HUD Telemetry Bar */}
          <div className="w-full pt-16 sm:pt-20 lg:pt-24 flex items-center justify-between pointer-events-auto">
            <div className="flex items-center space-x-2.5 text-[10px] sm:text-xs font-mono-subtle text-white/75 tracking-[0.25em] uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              <span>ATELIER LIVE • 11.0510° N, 76.0711° E</span>
            </div>
            <div className="hidden md:flex items-center space-x-3 text-[10px] font-mono-subtle text-white/45 tracking-[0.3em] uppercase">
              <span>KERALA, INDIA</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>SPATIAL ARCHITECTURE</span>
            </div>
          </div>

          {/* Center-Left Editorial Headline & Hierarchy */}
          <div className="max-w-2xl my-auto text-left pointer-events-auto py-4">
            {/* Small Architectural Eyebrow / Label */}
            <div className="hero-kicker inline-flex items-center space-x-2.5 text-[10px] sm:text-xs font-mono-subtle tracking-[0.28em] sm:tracking-[0.35em] text-amber-300/90 uppercase mb-2">
              <span className="w-5 sm:w-7 h-[1px] bg-amber-400/80" />
              <span>01 / ATELIER MONOGRAPH ARCHIVE</span>
            </div>

            {/* Brand / Studio Identity */}
            <div className="hero-brand text-xs sm:text-sm font-mono-subtle tracking-[0.35em] text-white/70 uppercase mb-3 sm:mb-4">
              MIRAE ARCSTUDIO
            </div>

            {/* Controlled Architectural Statement / Heading */}
            <h1 className="font-architectural text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] leading-[1.08] tracking-[0.02em] font-light text-white mb-4 sm:mb-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
              <span className="hero-title-line block">Architecture</span>
              <span className="hero-title-line block italic font-normal font-editorial tracking-[0.04em] text-[#f3ede2]">
                Shaped By
              </span>
              <span className="hero-title-line block">Experience.</span>
            </h1>

            {/* Refined Supporting Statement */}
            <p className="hero-sub font-light text-xs sm:text-sm md:text-base text-neutral-300/90 tracking-wide max-w-lg leading-relaxed mb-6 sm:mb-8 drop-shadow-md">
              Where 50+ years of real construction mastery converges with quiet tropical luxury. Every space composed with intention, proportion, and enduring materiality.
            </p>

            {/* Architectural Action Button */}
            <div className="hero-cta">
              <button 
                onClick={scrollToExterior}
                className="group inline-flex items-center space-x-3 text-[11px] sm:text-xs font-mono-subtle tracking-[0.25em] uppercase text-white hover:text-amber-200 transition-colors duration-300 py-2 border-b border-white/20 hover:border-amber-400"
              >
                <span>Explore Spatial Sequence</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-2 text-sm text-amber-400">———→</span>
              </button>
            </div>
          </div>

          {/* Bottom Telemetry & Controls */}
          <div className="hero-telemetry w-full flex items-end justify-between pt-4 pb-2 sm:pb-4 text-xs font-mono-subtle text-white/70">
            <div className="hidden sm:flex items-center space-x-2 text-[11px] text-white/60 tracking-widest uppercase">
              <span className="text-amber-400 font-mono">SCENE 01 •</span>
              <span>HILLSIDE RESORT & INFINITY SANCTUARY</span>
            </div>

            {/* Center Scroll Mouse Indicator */}
            <div 
              onClick={scrollToExterior}
              className="flex flex-col items-center mx-auto sm:mx-0 cursor-pointer pointer-events-auto group"
            >
              <div className="w-5 h-8 rounded-full border border-white/40 flex items-start justify-center p-1 mb-1 group-hover:border-amber-400 transition-colors">
                <div className="w-1 h-2 bg-amber-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
              </div>
              <span className="text-[9px] tracking-[0.3em] text-white/60 uppercase group-hover:text-white transition-colors">Scroll</span>
            </div>

            {/* Right Slide Indicator & Scrub Progress */}
            <div className="flex items-center space-x-3 text-[11px]">
              <span className="text-white font-medium tracking-widest font-mono">01 / 06</span>
              <div className="w-16 h-[2px] bg-white/20 relative overflow-hidden rounded-full">
                <div 
                  ref={progressLineRef} 
                  className="absolute left-0 top-0 h-full bg-amber-400 transition-all duration-150"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- 02. TRANSITION — CLOSER VIEW CONTENT (The MIRAE Signature) --- */}
        <div 
          ref={signatureContentRef}
          className="absolute inset-0 z-20 flex items-center justify-end p-6 sm:p-12 md:p-16 lg:p-20 pointer-events-none opacity-0"
        >
          <div className="max-w-xl bg-black/85 backdrop-blur-md p-8 sm:p-12 border border-white/[0.12] text-left pointer-events-auto shadow-2xl">
            <span className="text-[10px] sm:text-xs font-mono-subtle text-amber-400/90 tracking-[0.35em] uppercase block mb-3">
              02. THE MIRAE SIGNATURE • 50+ YEARS LEGACY
            </span>
            <h2 className="font-architectural text-2xl sm:text-4xl text-white font-light tracking-[0.08em] uppercase mb-4 sm:mb-6">
              Quiet Luxury & Enduring Craftsmanship
            </h2>
            <p className="text-xs sm:text-sm font-light text-[#c8c8c8] leading-relaxed mb-6 sm:mb-8">
              Mirae creates architecture where quiet luxury, refined design and enduring craftsmanship come together. From private residences and contemporary homes to resorts, hospitality spaces and landmark developments, every project is composed with a discerning eye for proportion, material, light and detail.
            </p>
            <button 
              onClick={scrollToExterior}
              className="group inline-flex items-center space-x-3 text-xs font-mono-subtle tracking-[0.25em] uppercase text-white hover:text-amber-200 transition-colors duration-300 border-b border-white/20 hover:border-amber-400 pb-1"
            >
              <span>Discover Architectural Anatomy</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-2 text-sm text-amber-400">———→</span>
            </button>
          </div>
        </div>

        {/* Right Vertical Studio Brandmark */}
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 z-20 pointer-events-none origin-right rotate-90 text-[10px] font-mono-subtle tracking-[0.4em] text-white/30 uppercase">
          MIRAE ARCSTUDIO
        </div>

      </div>
    </section>
  );
}
