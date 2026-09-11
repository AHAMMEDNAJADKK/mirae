import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Compass } from 'lucide-react';
import HeroScene3DContainer from './HeroScene3DContainer';
import { preloadSingleImage } from '../../utils/imagePreloader';

gsap.registerPlugin(ScrollTrigger);

export default function HeroExperience() {
  const containerRef = useRef(null);
  
  // Visual layers
  const droneLayerRef = useRef(null);
  const approachLayerRef = useRef(null);
  const exteriorLayerRef = useRef(null);
  const entranceLayerRef = useRef(null);

  // HUD Text overlays
  const hudHeroRef = useRef(null);
  const hudDescentRef = useRef(null);
  const hudExteriorRef = useRef(null);
  const hudEntranceRef = useRef(null);

  const [altitude, setAltitude] = useState(150);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    // Pre-warm secondary layer images asynchronously
    preloadSingleImage('/assets/images/hero/hero-approach.webp');
    preloadSingleImage('/assets/images/exterior/exterior-facade.webp');
    preloadSingleImage('/assets/images/exterior/entrance-threshold.webp');
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scrub timeline linked to parent scroll distance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.0,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollPct(Math.round(p * 100));
            const alt = Math.max(0, Math.round(150 - p * 150));
            setAltitude(alt);
          }
        }
      });

      // Stage 01 -> 02: High Aerial zoom & initial text dissolve
      tl.to(droneLayerRef.current, {
        scale: 1.22,
        ease: 'none',
        duration: 2.5
      }, 0)
      .to(hudHeroRef.current, {
        opacity: 0,
        y: -40,
        ease: 'power2.in',
        duration: 1.2
      }, 0.6)

      // Stage 02: Approach & Descent
      .fromTo(approachLayerRef.current, {
        opacity: 0,
        scale: 1.25
      }, {
        opacity: 1,
        scale: 1.05,
        ease: 'none',
        duration: 2.5
      }, 1.2)
      .fromTo(hudDescentRef.current, {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      }, 1.6)
      .to(hudDescentRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: 'power2.in'
      }, 3.0)

      // Stage 03: Exterior Facade & Roofline Levels
      .fromTo(exteriorLayerRef.current, {
        opacity: 0,
        scale: 1.2
      }, {
        opacity: 1,
        scale: 1.04,
        ease: 'none',
        duration: 2.5
      }, 3.0)
      .fromTo(hudExteriorRef.current, {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      }, 3.4)
      .to(hudExteriorRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: 'power2.in'
      }, 4.8)

      // Stage 04: Glass Entrance Portal Threshold
      .fromTo(entranceLayerRef.current, {
        opacity: 0,
        scale: 1.18
      }, {
        opacity: 1,
        scale: 1.0,
        ease: 'none',
        duration: 2.5
      }, 4.8)
      .fromTo(hudEntranceRef.current, {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      }, 5.2);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="journey" 
      ref={containerRef} 
      className="relative w-full h-[340vh] bg-[#0a0a0a]"
    >
      {/* 
        Sticky Viewport Scene:
        Maintains 100vh / 100svh height throughout the 340vh parent scroll duration.
        Using native CSS sticky top-0 ensures zero duplicate GSAP spacer height or layout gaps.
      */}
      <div className="sticky top-0 w-full h-screen h-[100svh] min-h-0 overflow-hidden bg-black flex flex-col justify-between">
        
        {/* Pluggable 3D / Image Visual Engine */}
        <HeroScene3DContainer>
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            
            {/* Layer 1: High Drone Aerial View */}
            <div 
              ref={droneLayerRef} 
              className="absolute inset-0 w-full h-full will-change-transform"
            >
              <img 
                src="/assets/images/hero/hero-drone.webp"
                onError={(e) => { e.target.src = '/assets/images/hero/hero-drone.jpg'; }}
                alt="MIRAE Architectural Aerial Drone View"
                className="w-full h-full object-cover object-center select-none"
                loading="eager"
                decoding="sync"
              />
            </div>

            {/* Layer 2: Camera Descent & Mountain / Valley Approach */}
            <div 
              ref={approachLayerRef} 
              className="absolute inset-0 w-full h-full will-change-transform opacity-0 pointer-events-none"
            >
              <img 
                src="/assets/images/hero/hero-approach.webp"
                onError={(e) => { e.target.src = '/assets/images/hero/hero-approach.jpg'; }}
                alt="MIRAE Camera Descent Approach"
                className="w-full h-full object-cover object-center select-none"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Layer 3: Architectural Exterior Facade */}
            <div 
              ref={exteriorLayerRef} 
              className="absolute inset-0 w-full h-full will-change-transform opacity-0 pointer-events-none"
            >
              <img 
                src="/assets/images/exterior/exterior-facade.webp"
                onError={(e) => { e.target.src = '/assets/images/exterior/exterior-facade.jpg'; }}
                alt="MIRAE Architecture Exterior Facade"
                className="w-full h-full object-cover object-center select-none"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Layer 4: Glass Entrance Portal Threshold */}
            <div 
              ref={entranceLayerRef} 
              className="absolute inset-0 w-full h-full will-change-transform opacity-0 pointer-events-none"
            >
              <img 
                src="/assets/images/exterior/entrance-threshold.webp"
                onError={(e) => { e.target.src = '/assets/images/exterior/entrance-threshold.jpg'; }}
                alt="MIRAE Architectural Entrance Portal"
                className="w-full h-full object-cover object-center select-none"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Subtle Vignette and Cinematic Contrast */}
            <div className="absolute inset-0 architectural-vignette pointer-events-none" />
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          </div>
        </HeroScene3DContainer>

        {/* --- DYNAMIC HUD CONTENT OVERLAYS --- */}

        {/* 1. Stage 01: Initial Hero View */}
        <div 
          ref={hudHeroRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none"
        >
          <span className="font-mono-subtle text-[10px] sm:text-xs text-white/80 mb-2 sm:mb-5 tracking-[0.25em] sm:tracking-[0.35em] uppercase border border-white/20 px-3 py-1 sm:px-4 sm:py-1.5 backdrop-blur-sm">
            ARCHITECTURE • CRAFTSMANSHIP • EXPERIENCE
          </span>
          <h1 className="font-architectural text-4xl sm:text-6xl md:text-7xl lg:text-9xl tracking-[0.16em] font-light text-white mb-2 sm:mb-5 uppercase drop-shadow-2xl">
            MIRAE
          </h1>
          <p className="font-architectural text-sm sm:text-2xl md:text-3xl text-[#e5e5e5] max-w-2xl font-light tracking-[0.1em] mb-2 sm:mb-4">
            Architecture, Shaped By Experience.
          </p>
          <p className="text-[10px] sm:text-xs font-mono-subtle text-white/70 tracking-[0.2em] sm:tracking-[0.25em] max-w-xl">
            50+ YEARS OF REAL CONSTRUCTION EXPERTISE
          </p>

          <div className="mt-4 sm:mt-10 flex items-center space-x-3 pointer-events-auto">
            <button 
              onClick={() => {
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 sm:px-8 py-2.5 sm:py-3.5 bg-white text-black text-[11px] sm:text-xs font-mono-subtle tracking-[0.2em] sm:tracking-[0.25em] uppercase hover:bg-[#dedcd5] transition-all duration-300 shadow-2xl font-medium"
            >
              EXPLORE OUR WORLD
            </button>
          </div>
        </div>

        {/* 2. Stage 02: Camera Approach HUD */}
        <div 
          ref={hudDescentRef}
          className="absolute inset-0 z-20 flex items-center justify-start px-6 sm:px-12 md:px-20 pointer-events-none opacity-0"
        >
          <div className="max-w-lg bg-[#080808]/85 backdrop-blur-md p-4 sm:p-8 md:p-10 border-l-2 border-white/60">
            <span className="text-[10px] sm:text-xs font-mono-subtle text-subtle tracking-[0.3em] uppercase block mb-1.5 sm:mb-3">
              01 • SENSING TOPOGRAPHY
            </span>
            <h2 className="font-architectural text-xl sm:text-3xl md:text-4xl text-white font-light tracking-wide mb-2 sm:mb-4">
              CAMERA APPROACH
            </h2>
            <p className="text-xs sm:text-sm font-light text-[#c8c8c8] leading-relaxed line-clamp-4 sm:line-clamp-none">
              Descending from high aerial topography into the microclimate. Architecture is not an isolated object, but an enduring dialogue with tropical earth, water, and shifting natural light.
            </p>
          </div>
        </div>

        {/* 3. Stage 03: Exterior Facade HUD */}
        <div 
          ref={hudExteriorRef}
          className="absolute inset-0 z-20 flex items-center justify-end px-6 sm:px-12 md:px-20 pointer-events-none opacity-0"
        >
          <div className="max-w-lg bg-[#080808]/85 backdrop-blur-md p-4 sm:p-8 md:p-10 border-r-2 border-white/60 text-right">
            <span className="text-[10px] sm:text-xs font-mono-subtle text-subtle tracking-[0.3em] uppercase block mb-1.5 sm:mb-3">
              02 • TECTONIC COMPOSITION
            </span>
            <h2 className="font-architectural text-xl sm:text-3xl md:text-4xl text-white font-light tracking-wide mb-2 sm:mb-4">
              EXTERIOR ARCHITECTURE
            </h2>
            <p className="text-xs sm:text-sm font-light text-[#c8c8c8] leading-relaxed line-clamp-4 sm:line-clamp-none">
              Clean architectural lines and organic textures emerge. Overhanging cantilevered eaves, climate-responsive louvers, and reflection pools compose a timeless sanctuary of quiet luxury.
            </p>
          </div>
        </div>

        {/* 4. Stage 04: Entrance Threshold HUD */}
        <div 
          ref={hudEntranceRef}
          className="absolute inset-0 z-20 flex items-center justify-center text-center px-6 pointer-events-none opacity-0"
        >
          <div className="max-w-lg bg-[#080808]/90 backdrop-blur-md p-4 sm:p-8 md:p-10 border border-white/10">
            <span className="text-[10px] sm:text-xs font-mono-subtle text-subtle tracking-[0.3em] uppercase block mb-1.5 sm:mb-3">
              03 • CROSSING THE THRESHOLD
            </span>
            <h2 className="font-architectural text-xl sm:text-3xl md:text-4xl text-white font-light tracking-wide mb-2 sm:mb-4">
              ENTERING THE INTERIOR
            </h2>
            <p className="text-xs sm:text-sm font-light text-[#c8c8c8] leading-relaxed mb-3 sm:mb-6 line-clamp-3 sm:line-clamp-none">
              The camera approaches the grand double-height glass envelope. Crossing into private residential spaces crafted for tactile immersion and restorative calm.
            </p>
            <div className="inline-flex items-center space-x-2 text-xs font-mono-subtle text-white/80">
              <span>CONTINUE SCROLLING TO EXPLORE ROOMS</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </div>
          </div>
        </div>

        {/* --- FIXED BOTTOM HUD TELEMETRY BAR --- */}
        <div className="relative z-30 w-full px-4 sm:px-12 md:px-16 py-2.5 sm:py-5 flex items-end justify-between text-xs font-mono-subtle text-white/70 border-t border-white/[0.08] backdrop-blur-sm bg-black/30">
          <div className="flex items-center space-x-3 sm:space-x-6">
            <div className="flex items-center space-x-2">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/60 animate-pulse" />
              <span className="text-[10px] sm:text-xs">11°04'N 76°04'E • MALAPPURAM</span>
            </div>
            <span className="hidden sm:inline-block text-white/30">|</span>
            <span className="hidden sm:inline-block text-[10px] sm:text-xs">ALTITUDE: {altitude}M</span>
          </div>

          {/* Central Scroll Progress Indicator */}
          <div className="flex flex-col items-center">
            <span className="text-[8px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-white/50 mb-0.5 sm:mb-1">SCROLL CAMERA</span>
            <div className="w-12 sm:w-16 h-[2px] bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-150"
                style={{ width: `${scrollPct}%` }}
              />
            </div>
          </div>

          {/* Progress Percentage */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="hidden sm:inline-block tracking-widest text-white/50 text-[10px] sm:text-[11px]">DRONE VIEW</span>
            <span className="text-white font-medium text-[10px] sm:text-xs">{String(scrollPct).padStart(2, '0')}%</span>
          </div>
        </div>

      </div>
    </section>
  );
}
