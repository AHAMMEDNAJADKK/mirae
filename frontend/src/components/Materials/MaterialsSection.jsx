import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { materialsOverview, materialsData } from '../../data/materialsData';
import { preloadSingleImage } from '../../utils/imagePreloader';

gsap.registerPlugin(ScrollTrigger);

export default function MaterialsSection() {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Pre-warm all material images so switching is instant without flicker
  useEffect(() => {
    materialsData.forEach((mat) => {
      preloadSingleImage(mat.image);
      if (mat.fallbackImage) preloadSingleImage(mat.fallbackImage);
    });
  }, []);

  useEffect(() => {
    const total = materialsData.length;

    const ctx = gsap.context(() => {
      // Master ScrollTrigger for live progress tracking across the 4 materials
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        onUpdate: (self) => {
          const idx = Math.min(total - 1, Math.floor(self.progress * total));
          setActiveIndex(idx);
        }
      });

      // Layer Transition Timeline for material crossfades
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.0
        }
      });

      for (let i = 1; i < total; i++) {
        const prev = imageRefs.current[i - 1];
        const curr = imageRefs.current[i];
        const step = i * 2;

        if (prev && curr) {
          tl.to(prev, {
            opacity: 0,
            scale: 0.97,
            ease: 'power2.inOut',
            duration: 1.2
          }, step - 0.6)
          .fromTo(curr, {
            opacity: 0,
            scale: 1.06
          }, {
            opacity: 1,
            scale: 1.0,
            ease: 'power2.out',
            duration: 1.2
          }, step - 0.4);
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Smooth scroll navigation to any material
  const scrollToMaterial = (index) => {
    if (!containerRef.current) return;
    const total = materialsData.length;
    const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
    const scrollHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + ((index + 0.3) / total) * scrollHeight;
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  const activeMaterial = materialsData[activeIndex] || materialsData[0];

  return (
    <section 
      id="materials" 
      ref={containerRef} 
      className="relative w-full h-[320vh] bg-[#0a0a0a]"
    >
      {/* Sticky Fullscreen Single-Viewport Material Presentation (100dvh) */}
      <div className="sticky top-0 w-full h-screen h-[100dvh] min-h-0 overflow-hidden bg-[#0a0a0a] text-[#f4f3ef] flex flex-col justify-between select-none py-4 sm:py-6 md:py-8 px-5 sm:px-10 md:px-16 lg:px-20 border-t border-white/[0.08]">
        
        {/* Top Header HUD */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between text-xs font-pencrow shrink-0">
          <div className="flex items-center space-x-3">
            <span className="text-white/70 tracking-[0.3em] uppercase font-medium">
              05. PROJECT DETAILS / MATERIALS
            </span>
          </div>
          <div className="text-white/40 tracking-widest hidden sm:block font-medium">
            TECTONIC HONESTY • MATERIAL 0{activeIndex + 1}/04
          </div>
        </div>

        {/* Main Viewport Presentation Area */}
        <div className="w-full max-w-7xl mx-auto my-auto flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-10 xl:gap-14 items-center py-2 sm:py-3">
          
          {/* Left Column: Full-Scale Material Feature Photo */}
          <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[52vh] xl:h-[56vh] max-h-[56vh] w-full overflow-hidden bg-neutral-950 border border-white/[0.1] rounded-sm group shadow-2xl">
            {materialsData.map((mat, idx) => (
              <div
                key={mat.id}
                ref={(el) => (imageRefs.current[idx] = el)}
                className={`absolute inset-0 w-full h-full will-change-transform ${
                  idx === 0 ? 'opacity-100 z-10' : 'opacity-0 z-10'
                }`}
              >
                <img 
                  src={mat.image}
                  onError={(e) => { 
                    if (mat.fallbackImage && e.target.src !== mat.fallbackImage) {
                      e.target.src = mat.fallbackImage; 
                    }
                  }}
                  alt={`MIRAE Material Architecture Detail — ${mat.name}`}
                  className="w-full h-full object-cover object-center transform-gpu"
                  loading={idx === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
              </div>
            ))}

            {/* Architectural Material Plate Badge */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 bg-black/75 backdrop-blur-md px-2.5 py-1.5 sm:px-3 sm:py-1.5 border border-white/10 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] font-pencrow text-white tracking-[0.25em] uppercase font-medium">
                PLATE {activeMaterial.num} • {activeMaterial.name.toUpperCase()}
              </span>
            </div>

            {/* Subtitle bottom banner */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 bg-black/75 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2 border border-white/10 flex items-center justify-between text-xs font-pencrow text-white/90">
              <span className="tracking-wider uppercase font-light text-[10px] sm:text-xs truncate mr-2">
                {activeMaterial.subtitle}
              </span>
              <span className="text-[9px] sm:text-[10px] text-white/50 tracking-widest shrink-0 hidden sm:inline-block font-pencrow">
                TECTONIC STUDY
              </span>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Material Swatches */}
          <div className="lg:col-span-6 flex flex-col justify-between h-auto lg:h-[52vh] xl:h-[56vh] text-left space-y-2.5 sm:space-y-3.5">
            <div>
              <h2 className="font-architectural text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white tracking-[0.04em] uppercase mb-1 sm:mb-2 leading-tight">
                {materialsOverview.title}
              </h2>
              <p className="text-xs sm:text-sm font-normal text-[#b8b8b8] leading-relaxed max-w-lg mb-3 sm:mb-4 font-pencrow line-clamp-2">
                {materialsOverview.description}
              </p>
              
              {/* Active Material Detail Card */}
              <div className="bg-[#111111] p-3 sm:p-4.5 border border-white/[0.12] mb-3 sm:mb-4 transition-all duration-300 shadow-xl">
                <div className="flex items-center justify-between mb-2 border-b border-white/[0.08] pb-2">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-[11px] font-pencrow text-amber-400 font-medium tracking-widest">
                      {activeMaterial.num} / 04
                    </span>
                    <span className="text-sm sm:text-base font-architectural text-white uppercase tracking-wider font-semibold">
                      {activeMaterial.name}
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-pencrow text-white/40 tracking-widest uppercase font-medium">
                    AUTHENTIC SPECIFICATION
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#d4d4d4] font-normal leading-relaxed mb-1.5 font-pencrow line-clamp-2 sm:line-clamp-3">
                  {activeMaterial.description}
                </p>
                <div className="text-[10px] sm:text-[11px] font-pencrow text-white/60 tracking-wide mt-1.5">
                  Key Attribute: <span className="text-amber-300/90">{activeMaterial.subtitle}</span>
                </div>
              </div>
            </div>

            {/* Bottom 4 Swatches Row */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-pencrow text-white/50 tracking-[0.25em] uppercase block font-medium">
                  SELECT MATERIAL SWATCH
                </span>
                <span className="text-[10px] font-pencrow text-amber-400/80 tracking-widest uppercase font-medium">
                  PLATE 0{activeIndex + 1} / 04 ACTIVE
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-3.5">
                {materialsData.map((mat, idx) => {
                  const isSelected = activeIndex === idx;
                  return (
                    <button
                      key={mat.id}
                      type="button"
                      onClick={() => scrollToMaterial(idx)}
                      className={`group flex flex-col items-center text-center transition-all duration-300 focus:outline-none cursor-pointer ${
                        isSelected ? 'scale-105' : 'opacity-65 hover:opacity-100'
                      }`}
                      aria-label={`Select ${mat.name} material specification`}
                    >
                      <div className={`relative aspect-square w-full overflow-hidden rounded-sm border transition-all duration-300 mb-1.5 ${
                        isSelected 
                          ? 'border-amber-400 ring-2 ring-amber-400/40 shadow-[0_0_15px_rgba(251,191,36,0.25)]' 
                          : 'border-white/10 group-hover:border-white/40'
                      }`}>
                        <img 
                          src={mat.image}
                          onError={(e) => { 
                            if (mat.fallbackImage && e.target.src !== mat.fallbackImage) {
                              e.target.src = mat.fallbackImage; 
                            }
                          }}
                          alt={mat.name}
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-amber-400/10 pointer-events-none" />
                        )}
                      </div>
                      <span className={`text-[10px] sm:text-[11px] font-pencrow tracking-wider uppercase transition-colors ${
                        isSelected ? 'text-amber-300 font-medium' : 'text-[#a0a0a0]'
                      }`}>
                        {mat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
