import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { materialsData } from '../../data/materialsData';
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
      <div className="sticky top-0 w-full h-screen h-[100dvh] min-h-0 overflow-hidden bg-[#0a0a0a] text-[#f4f3ef] flex flex-col justify-center select-none py-6 sm:py-10 md:py-12 px-5 sm:px-10 md:px-16 lg:px-20 border-t border-white/[0.08]">
        
        {/* Main Viewport Presentation Area */}
        <div className="w-full max-w-7xl mx-auto my-auto flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 xl:gap-16 items-center py-2">
          
          {/* Left Column: Full-Scale Material Feature Photo (Dominant) */}
          <div className="lg:col-span-7 xl:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[58vh] xl:h-[62vh] max-h-[62vh] w-full overflow-hidden bg-neutral-950 border border-white/[0.1] rounded-sm group shadow-2xl">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Right Column: Refined Minimal Editorial Presentation */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center text-left space-y-5 sm:space-y-6">
            
            {/* Concept, Material Name & Short Statement */}
            <div className="space-y-3">
              <span className="text-xs font-pencrow text-mirae-orange font-medium tracking-[0.25em] uppercase block">
                TECTONIC HONESTY • 0{activeIndex + 1}
              </span>
              <h3 className="font-architectural text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-[0.04em] uppercase leading-tight transition-colors duration-300">
                {activeMaterial.name}
              </h3>
              <p className="text-xs sm:text-sm md:text-base font-normal text-neutral-300 leading-relaxed font-pencrow max-w-md transition-opacity duration-300">
                {activeMaterial.description}
              </p>
            </div>

            {/* Clean Material Selector (Stone / Wood / Concrete / Metal) */}
            <div className="pt-4 border-t border-white/[0.08]">
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {materialsData.map((mat, idx) => {
                  const isSelected = activeIndex === idx;
                  return (
                    <button
                      key={mat.id}
                      type="button"
                      onClick={() => scrollToMaterial(idx)}
                      className={`h-8 px-3 sm:px-3.5 text-[11px] sm:text-xs font-pencrow font-medium tracking-wider uppercase transition-all duration-300 flex items-center space-x-2 border cursor-pointer rounded-sm ${
                        isSelected
                          ? 'border-mirae-orange bg-mirae-orange/10 text-white shadow-sm'
                          : 'border-white/10 text-white/50 hover:text-white hover:border-white/30'
                      }`}
                      aria-label={`Select ${mat.name} material specification`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-mirae-orange' : 'bg-white/20'}`} />
                      <span>{mat.name}</span>
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
