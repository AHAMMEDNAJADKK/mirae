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

  // HUD Overlays
  const heroContentRef = useRef(null);
  const signatureContentRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    preloadSingleImage('/assets/images/hero/transition-signature.webp');
    preloadSingleImage('/assets/images/exterior/exterior-roof.webp');
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.0,
          onUpdate: (self) => {
            setScrollProgress(Math.round(self.progress * 100));
          }
        }
      });

      // 01 -> 02: Zoom drone view and fade out Hero title
      tl.to(droneLayerRef.current, {
        scale: 1.18,
        ease: 'none',
        duration: 2.0
      }, 0)
      .to(heroContentRef.current, {
        opacity: 0,
        y: -35,
        ease: 'power2.in',
        duration: 1.2
      }, 0.4)

      // 02: Crossfade into closer view (The MIRAE Signature)
      .fromTo(signatureLayerRef.current, {
        opacity: 0,
        scale: 1.15
      }, {
        opacity: 1,
        scale: 1.02,
        ease: 'none',
        duration: 2.2
      }, 1.2)
      .fromTo(signatureContentRef.current, {
        opacity: 0,
        y: 40
      }, {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        duration: 1.2
      }, 1.8);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="hero" 
      ref={containerRef} 
      className="relative w-full h-[220vh] bg-[#0a0a0a]"
    >
      {/* Sticky Fullscreen Cinematic Viewport */}
      <div className="sticky top-0 w-full h-screen h-[100svh] min-h-0 overflow-hidden bg-black flex flex-col justify-between select-none">
        
        {/* Visual Background Layers */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          
          {/* Layer 01: High Drone Aerial View */}
          <div 
            ref={droneLayerRef} 
            className="absolute inset-0 w-full h-full will-change-transform"
          >
            <img 
              src="/assets/images/hero/hero-drone.webp"
              onError={(e) => { e.target.src = '/assets/images/hero/hero-drone.jpg'; }}
              alt="MIRAE Architectural Residence Drone View"
              className="w-full h-full object-cover object-center"
              loading="eager"
              decoding="sync"
            />
          </div>

          {/* Layer 02: Transition / Closer View (The MIRAE Signature) */}
          <div 
            ref={signatureLayerRef} 
            className="absolute inset-0 w-full h-full will-change-transform opacity-0 pointer-events-none"
          >
            <img 
              src="/assets/images/hero/transition-signature.webp"
              onError={(e) => { e.target.src = '/assets/images/hero/transition-signature.jpg'; }}
              alt="The MIRAE Signature Residence Closer View"
              className="w-full h-full object-cover object-center"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Architectural Vignette & Subtle Atmospheric Gradients */}
          <div className="absolute inset-0 architectural-vignette pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
        </div>

        {/* --- 01. HERO VIEW CONTENT (Left Aligned Stack) --- */}
        <div 
          ref={heroContentRef}
          className="relative z-20 w-full h-full flex flex-col justify-between p-6 sm:p-12 md:p-16 lg:p-20 pointer-events-none"
        >
          {/* Top Spacing to clear Navbar */}
          <div className="w-full pt-16 sm:pt-20" />

          {/* Center-Left Editorial Headline */}
          <div className="max-w-3xl my-auto text-left pointer-events-auto">
            <h1 className="font-architectural text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] leading-[1.02] tracking-[0.03em] font-light text-white mb-4 sm:mb-6">
              Architecture<br />
              <span className="italic font-normal font-editorial tracking-[0.06em]">Shaped By</span><br />
              Experience.
            </h1>
            <p className="text-xs sm:text-sm font-mono-subtle text-[#d4d3ce] tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-8 sm:mb-10">
              50+ Years Of Real Construction Expertise
            </p>
            <div>
              <button 
                onClick={() => {
                  const el = document.getElementById('exterior-layers');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center space-x-3 text-xs font-mono-subtle tracking-[0.25em] uppercase text-white hover:text-[#d0cfcb] transition-colors duration-300"
              >
                <span>Explore Our World</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-2 text-sm">———→</span>
              </button>
            </div>
          </div>

          {/* Bottom Telemetry & Controls */}
          <div className="w-full flex items-end justify-between pt-6 text-xs font-mono-subtle text-white/70">
            <div className="hidden sm:block text-[11px] text-white/50 tracking-widest">
              <span>RESIDENCE 01 • MALAPPURAM</span>
            </div>

            {/* Center Scroll Mouse Indicator */}
            <div className="flex flex-col items-center mx-auto sm:mx-0">
              <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1 mb-1">
                <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
              </div>
              <span className="text-[9px] tracking-[0.3em] text-white/60 uppercase">Scroll</span>
            </div>

            {/* Right Slide Indicator */}
            <div className="flex items-center space-x-3 text-[11px]">
              <span className="text-white font-medium tracking-widest">01 / 06</span>
              <div className="w-10 h-[1px] bg-white/30" />
            </div>
          </div>
        </div>

        {/* --- 02. TRANSITION — CLOSER VIEW CONTENT (The MIRAE Signature) --- */}
        <div 
          ref={signatureContentRef}
          className="absolute inset-0 z-20 flex items-center justify-end p-6 sm:p-12 md:p-16 lg:p-20 pointer-events-none opacity-0"
        >
          <div className="max-w-xl bg-black/85 backdrop-blur-md p-8 sm:p-12 border border-white/[0.12] text-left pointer-events-auto">
            <span className="text-[10px] sm:text-xs font-mono-subtle text-subtle tracking-[0.3em] uppercase block mb-3">
              02. TRANSITION — CLOSER VIEW
            </span>
            <h2 className="font-architectural text-2xl sm:text-4xl text-white font-light tracking-[0.1em] uppercase mb-4 sm:mb-6">
              THE MIRAE SIGNATURE
            </h2>
            <p className="text-xs sm:text-sm font-light text-[#c8c8c8] leading-relaxed mb-6 sm:mb-8">
              Mirae creates architecture where quiet luxury, refined design and enduring craftsmanship come together. From private residences and contemporary homes to resorts, hospitality spaces and landmark developments, every project is composed with a discerning eye for proportion, material, light and detail.
            </p>
            <button 
              onClick={() => {
                const el = document.getElementById('exterior-layers');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center space-x-3 text-xs font-mono-subtle tracking-[0.25em] uppercase text-white hover:text-[#d0cfcb] transition-colors duration-300"
            >
              <span>Discover More</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-2 text-sm">———→</span>
            </button>
          </div>
        </div>

        {/* Right Vertical Studio Brandmark */}
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 z-20 pointer-events-none origin-right rotate-90 text-[10px] font-mono-subtle tracking-[0.4em] text-white/30 uppercase">
          MIRAE ARC STUDIO
        </div>

      </div>
    </section>
  );
}
