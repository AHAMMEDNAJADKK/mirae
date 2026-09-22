import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { preloadSingleImage } from '../../utils/imagePreloader';

gsap.registerPlugin(ScrollTrigger);

const layersData = [
  {
    id: 'roof',
    title: 'Roof Level & Cantilevers',
    subtitle: 'Sculptural terracotta pitched rooflines, overhanging eaves & deep shade buttress geometry',
    image: '/assets/images/exterior/exterior-roof.webp',
    fallbackImage: '/assets/images/exterior/exterior-roof.jpg'
  },
  {
    id: 'upper',
    title: 'Upper Floor & Louvers',
    subtitle: 'Curvilinear architectural brise-soleil, cantilevered perimeter planters & warm interior glow',
    image: '/assets/images/exterior/exterior-upper-floor.webp',
    fallbackImage: '/assets/images/exterior/exterior-upper-floor.jpg'
  },
  {
    id: 'entrance',
    title: 'Entrance & Arrival',
    subtitle: 'Board-formed concrete portals, cantilevered teak soffits & floating entryway thresholds',
    image: '/assets/images/exterior/exterior-entrance.webp',
    fallbackImage: '/assets/images/exterior/exterior-entrance.jpg'
  },
  {
    id: 'pool',
    title: 'Landscape & Infinity Pool',
    subtitle: 'Illuminated bamboo pavilion canopy, multi-tiered cascading pools & lush tropical flora',
    image: '/assets/images/exterior/exterior-pool.webp',
    fallbackImage: '/assets/images/exterior/exterior-pool.jpg'
  }
];

export default function ExteriorLayers() {
  const containerRef = useRef(null);
  const layerRefs = useRef([]);
  const textRefs = useRef([]);
  const activeIdxRef = useRef(0);
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);

  useEffect(() => {
    // Pre-warm all exterior layer images immediately
    layersData.forEach((layer) => {
      preloadSingleImage(layer.image);
      if (layer.fallbackImage) preloadSingleImage(layer.fallbackImage);
    });
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const total = layersData.length;

      // Set initial states for images and text layers
      layerRefs.current.forEach((el, idx) => {
        if (!el) return;
        gsap.set(el, {
          opacity: idx === 0 ? 1 : 0,
          scale: prefersReducedMotion ? 1 : (idx === 0 ? 1 : 1.03),
          transformOrigin: 'center center'
        });
      });

      textRefs.current.forEach((el, idx) => {
        if (!el) return;
        gsap.set(el, {
          opacity: idx === 0 ? 1 : 0,
          y: prefersReducedMotion ? 0 : (idx === 0 ? 0 : 20),
          pointerEvents: idx === 0 ? 'auto' : 'none'
        });
      });

      // Single authoritative timeline driving both images & text
      // Timeline duration = 4.0 units.
      // Layer 0: rest 0.00 -> 0.65 | transition 0 -> 1: 0.65 -> 1.00 (midpoint 0.825)
      // Layer 1: rest 1.00 -> 1.65 | transition 1 -> 2: 1.65 -> 2.00 (midpoint 1.825)
      // Layer 2: rest 2.00 -> 2.65 | transition 2 -> 3: 2.65 -> 3.00 (midpoint 2.825)
      // Layer 3: rest 3.00 -> 4.00 | stable viewing moment before release
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;
            // Calibrated boundary thresholds derived from transition midpoints
            let idx = 0;
            if (p >= 0.706) {
              idx = 3;
            } else if (p >= 0.456) {
              idx = 2;
            } else if (p >= 0.206) {
              idx = 1;
            } else {
              idx = 0;
            }

            if (idx !== activeIdxRef.current) {
              activeIdxRef.current = idx;
              setActiveLayerIndex(idx);
            }
          }
        }
      });

      // Sequence building: 3 transitions across the 4 layers
      for (let i = 1; i < total; i++) {
        const prevImg = layerRefs.current[i - 1];
        const currImg = layerRefs.current[i];
        const prevTxt = textRefs.current[i - 1];
        const currTxt = textRefs.current[i];

        const transStart = i - 0.35; // 0.65, 1.65, 2.65
        const transDuration = 0.35;

        if (prevImg && currImg) {
          // Crossfade images
          tl.to(prevImg, {
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 0.98,
            ease: 'power2.inOut',
            duration: transDuration
          }, transStart)
          .fromTo(currImg, {
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 1.03
          }, {
            opacity: 1,
            scale: 1.0,
            ease: 'power2.out',
            duration: transDuration
          }, transStart);
        }

        if (prevTxt && currTxt) {
          // Crossfade texts
          tl.to(prevTxt, {
            opacity: 0,
            y: prefersReducedMotion ? 0 : -16,
            ease: 'power2.inOut',
            duration: transDuration * 0.85,
            onComplete: () => {
              if (prevTxt) prevTxt.style.pointerEvents = 'none';
            }
          }, transStart)
          .fromTo(currTxt, {
            opacity: 0,
            y: prefersReducedMotion ? 0 : 20
          }, {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            duration: transDuration,
            onStart: () => {
              if (currTxt) currTxt.style.pointerEvents = 'auto';
            }
          }, transStart + 0.05);
        }
      }

      // Hold final Layer 3 at full rest through the end of the scroll
      tl.to({}, { duration: 1.0 }, 3.0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="exterior-layers" 
      data-section="exterior"
      ref={containerRef} 
      className="relative w-full h-[250svh] sm:h-[300vh] md:h-[340vh] lg:h-[380vh] bg-[#080808]"
    >
      {/* Anchor alias for #exterior */}
      <div id="exterior" className="absolute top-0 left-0 w-0 h-0 pointer-events-none" />

      {/* Sticky Viewport Scene */}
      <div className="sticky top-0 w-full h-screen h-[100dvh] h-[100svh] min-h-0 overflow-hidden bg-black flex flex-col justify-between select-none">
        
        {/* Background Visual Layers (Stacked for seamless GPU crossfade) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {layersData.map((layer, idx) => (
            <div
              key={layer.id}
              ref={(el) => (layerRefs.current[idx] = el)}
              className="absolute inset-0 w-full h-full will-change-transform will-change-opacity"
            >
              <img 
                src={layer.image}
                onError={(e) => { e.target.src = layer.fallbackImage; }}
                alt={layer.title}
                className="w-full h-full object-cover object-[center_35%] sm:object-center"
                loading={idx === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/80 pointer-events-none" />
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            </div>
          ))}
          <div className="absolute inset-0 architectural-vignette pointer-events-none" />
        </div>

        {/* Center / Right Layer Navigation Indicators */}
        <div className="relative z-20 w-full max-w-7xl 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 md:px-10 lg:px-16 2xl:px-12 my-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 lg:gap-8 2xl:gap-12 py-4 sm:py-6 md:py-0">
          
          {/* Left: Active Level Description (Cohesive, fluid width with rich typography) */}
          <div className="relative w-full max-w-2xl md:max-w-sm lg:max-w-md 2xl:max-w-lg min-h-[150px] xs:min-h-[145px] sm:min-h-[155px] md:min-h-[175px] 2xl:min-h-[200px] bg-black/85 backdrop-blur-md p-4 sm:p-6 md:p-7 lg:p-8 2xl:p-10 border-l-2 border-mirae-orange shadow-2xl overflow-hidden">
            {layersData.map((layer, idx) => (
              <div
                key={layer.id}
                ref={(el) => (textRefs.current[idx] = el)}
                className="absolute inset-0 p-4 sm:p-6 md:p-7 lg:p-8 2xl:p-10 flex flex-col justify-center will-change-transform will-change-opacity"
              >
                <span className="text-[10px] font-pencrow text-mirae-orange font-medium tracking-[0.3em] uppercase block mb-1 sm:mb-2">
                  LEVEL 0{idx + 1} / 04
                </span>
                <h3 className="font-architectural text-base xs:text-lg sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[2.65rem] text-white font-bold tracking-[0.04em] uppercase mb-1 sm:mb-2.5 2xl:mb-3 leading-tight">
                  {layer.title}
                </h3>
                <p className="text-xs sm:text-sm 2xl:text-base font-normal text-[#d4d4d4] leading-relaxed font-pencrow line-clamp-3">
                  {layer.subtitle}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Architectural Cutaway Callout Indicators (Desktop / Tablet) */}
          <div className="hidden md:flex flex-col space-y-3 sm:space-y-4 lg:space-y-6 2xl:space-y-7 bg-black/75 backdrop-blur-md p-4 sm:p-6 lg:p-8 2xl:p-10 border border-white/[0.1] shadow-2xl shrink-0">
            {layersData.map((layer, idx) => {
              const isActive = activeLayerIndex === idx;
              return (
                <div 
                  key={layer.id}
                  className={`flex items-center space-x-4 transition-all duration-300 ${
                    isActive ? 'opacity-100 translate-x-1' : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  {/* Indicator Dot & Line */}
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive ? 'bg-mirae-orange shadow-[0_0_8px_rgba(234,88,12,0.6)] scale-125' : 'bg-white/40'
                    }`} />
                    <div className={`h-[1px] transition-all duration-300 ${
                      isActive ? 'w-8 bg-mirae-orange' : 'w-4 bg-white/20'
                    }`} />
                  </div>

                  {/* Level Label */}
                  <span className={`text-xs sm:text-sm font-architectural tracking-wider uppercase ${
                    isActive ? 'text-white font-semibold' : 'text-[#a0a0a0]'
                  }`}>
                    {layer.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Mobile Horizontal Level Switch Strip (< md) */}
          <div className="flex md:hidden w-full items-center justify-between bg-black/80 backdrop-blur-md px-3.5 py-2.5 border border-white/[0.08]">
            {layersData.map((layer, idx) => {
              const isActive = activeLayerIndex === idx;
              return (
                <div 
                  key={layer.id}
                  className={`flex items-center space-x-1.5 transition-all duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full transition-all ${
                    isActive ? 'bg-mirae-orange scale-125 shadow-[0_0_8px_rgba(234,88,12,0.6)]' : 'bg-white/40'
                  }`} />
                  <span className={`text-[10px] font-pencrow uppercase tracking-wider ${
                    isActive ? 'text-white font-semibold' : 'text-neutral-400'
                  }`}>
                    0{idx + 1}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Bar Info */}
        <div className="relative z-20 w-full max-w-7xl 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 md:px-10 lg:px-16 2xl:px-12 pb-[max(1rem,env(safe-area-inset-bottom))] flex justify-between items-center text-[9px] sm:text-xs 2xl:text-sm font-pencrow text-white/50 font-medium">
          <span>PROGRESSIVE TECTONIC SEQUENCE</span>
          <span className="font-medium text-white/70 tracking-wider">
            {layersData[activeLayerIndex].title.toUpperCase()}
          </span>
        </div>

      </div>
    </section>
  );
}
