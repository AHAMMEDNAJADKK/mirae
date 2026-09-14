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
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);

  useEffect(() => {
    // Pre-warm exterior layer images
    layersData.forEach((layer) => preloadSingleImage(layer.image));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const total = layersData.length;

      // Master ScrollTrigger tracking progress
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        onUpdate: (self) => {
          const idx = Math.min(total - 1, Math.floor(self.progress * total));
          setActiveLayerIndex(idx);
        }
      });

      // Layer Transition Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.0
        }
      });

      for (let i = 1; i < total; i++) {
        const prev = layerRefs.current[i - 1];
        const curr = layerRefs.current[i];
        const step = i * 2;

        if (prev && curr) {
          tl.to(prev, {
            opacity: 0,
            scale: 0.96,
            ease: 'power2.inOut',
            duration: 1.2
          }, step - 0.5)
          .fromTo(curr, {
            opacity: 0,
            scale: 1.1
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

  return (
    <section 
      id="exterior-layers" 
      ref={containerRef} 
      className="relative w-full h-[320vh] bg-[#080808]"
    >
      {/* Sticky Viewport Scene */}
      <div className="sticky top-0 w-full h-screen h-[100svh] min-h-0 overflow-hidden bg-black flex flex-col justify-between select-none">
        
        {/* Background Visual Layers */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {layersData.map((layer, idx) => (
            <div
              key={layer.id}
              ref={(el) => (layerRefs.current[idx] = el)}
              className={`absolute inset-0 w-full h-full will-change-transform ${
                idx === 0 ? 'opacity-100 z-10' : 'opacity-0 z-10'
              }`}
            >
              <img 
                src={layer.image}
                onError={(e) => { e.target.src = layer.fallbackImage; }}
                alt={layer.title}
                className="w-full h-full object-cover object-center"
                loading={idx === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/80 pointer-events-none" />
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            </div>
          ))}
          <div className="absolute inset-0 architectural-vignette pointer-events-none" />
        </div>

        {/* Top Header HUD */}
        <div className="relative z-20 w-full px-5 sm:px-10 md:px-16 pt-5 sm:pt-10 flex items-center justify-between text-xs font-mono-subtle">
          <div className="flex items-center space-x-3">
            <span className="text-white/70 tracking-[0.3em] uppercase font-medium">03. EXTERIOR LAYERS (SCROLLING)</span>
          </div>
          <div className="text-white/50 tracking-widest hidden sm:block">
            ARCHITECTURAL ANATOMY • LEVEL 0{activeLayerIndex + 1}
          </div>
        </div>

        {/* Center / Right Layer Navigation Indicators */}
        <div className="relative z-20 w-full px-5 sm:px-10 md:px-16 my-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-8">
          
          {/* Left: Active Level Description */}
          <div className="w-full md:max-w-md bg-black/85 backdrop-blur-md p-4 sm:p-6 md:p-8 border-l-2 border-amber-400 shadow-2xl">
            <span className="text-[10px] font-mono-subtle text-amber-300 font-medium tracking-[0.3em] uppercase block mb-1.5 sm:mb-2">
              LEVEL 0{activeLayerIndex + 1} / 04
            </span>
            <h3 className="font-architectural text-xl sm:text-3xl md:text-4xl text-white font-bold tracking-[0.04em] uppercase mb-2 sm:mb-3">
              {layersData[activeLayerIndex].title}
            </h3>
            <p className="text-xs sm:text-sm font-normal text-[#d4d4d4] leading-relaxed">
              {layersData[activeLayerIndex].subtitle}
            </p>
          </div>

          {/* Right: Architectural Cutaway Callout Indicators (Desktop / Tablet) */}
          <div className="hidden md:flex flex-col space-y-4 sm:space-y-6 bg-black/75 backdrop-blur-md p-6 sm:p-8 border border-white/[0.1] shadow-2xl">
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
                      isActive ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)] scale-125' : 'bg-white/40'
                    }`} />
                    <div className={`h-[1px] transition-all duration-300 ${
                      isActive ? 'w-8 bg-amber-400' : 'w-4 bg-white/20'
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
          <div className="flex md:hidden w-full items-center justify-between bg-black/80 backdrop-blur-md px-4 py-2.5 border border-white/[0.08]">
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
                    isActive ? 'bg-amber-400 scale-125 shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'bg-white/40'
                  }`} />
                  <span className={`text-[10px] font-mono-subtle uppercase tracking-wider ${
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
        <div className="relative z-20 w-full px-5 sm:px-10 md:px-16 pb-5 sm:pb-8 flex justify-between items-center text-[10px] sm:text-xs font-mono-subtle text-white/50">
          <span>PROGRESSIVE TECTONIC SEQUENCE</span>
          <span className="font-medium text-white/70">{layersData[activeLayerIndex].title.toUpperCase()}</span>
        </div>

      </div>
    </section>
  );
}
