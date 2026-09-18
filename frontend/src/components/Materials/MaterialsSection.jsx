import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { materialsData } from '../../data/materialsData';
import { preloadSingleImage } from '../../utils/imagePreloader';
import { scrollToPosition } from '../../animations/smoothScroll';
import { ArrowLeft, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function MaterialsSection() {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Touch swipe tracking refs
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isSwiping = useRef(false);

  // Pre-warm all material images so switching is instant without flicker
  useEffect(() => {
    materialsData.forEach((mat) => {
      preloadSingleImage(mat.image);
      if (mat.fallbackImage) preloadSingleImage(mat.fallbackImage);
    });
  }, []);

  useEffect(() => {
    const total = materialsData.length;
    const mm = gsap.matchMedia();

    // ─── Mobile Phones (≤ 767px) ───────────────────────────────────────────
    // CSS position:sticky on .cinematic-sticky-stage handles the visual lock.
    // We set the outer section height precisely so each material gets ~70svh of
    // dedicated scroll distance → one controlled swipe = one material transition.
    // No GSAP pin → no pin-spacer → no black dead zone.
    mm.add('(max-width: 767px)', () => {
      // Use visualViewport.height when available — most accurate on mobile
      const svh = (window.visualViewport?.height) ?? window.innerHeight;
      // Each material gets STEP_VH of scroll distance; first starts at 0
      const STEP = Math.round(svh * 0.70);
      const totalHeight = svh + (total - 1) * STEP;

      // Apply section height so CSS sticky stage can scroll through it
      if (containerRef.current) {
        containerRef.current.style.height = totalHeight + 'px';
      }

      // Throttle index updates — only fire when the index actually changes
      let lastIdx = -1;

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        // No pin (CSS sticky handles it), no scrub (raw progress is fine at this range)
        onUpdate: (self) => {
          const idx = Math.min(total - 1, Math.floor(self.progress * total));
          if (idx !== lastIdx) {
            lastIdx = idx;
            setActiveIndex(idx);
          }
        }
      });

      return () => {
        st.kill();
        // Reset inline height so other breakpoints are unaffected
        if (containerRef.current) {
          containerRef.current.style.height = '';
        }
      };
    });

    // Tablets (768px - 1023px) & Tablet Portrait: Keep existing tablet behavior
    mm.add('(min-width: 768px) and (max-width: 1023px), (min-width: 768px) and (orientation: portrait)', () => {
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        pin: true,
        start: 'top top',
        end: () => '+=' + Math.round(window.innerHeight * 1.3),
        scrub: 0.5,
        onUpdate: (self) => {
          const idx = Math.min(total - 1, Math.floor(self.progress * total));
          setActiveIndex((prev) => (prev !== idx ? idx : prev));
        }
      });
      return () => st.kill();
    });

    // Desktop Landscape: Cinematic scrub and layered crossfades
    mm.add('(min-width: 1024px) and (orientation: landscape)', () => {
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        pin: true,
        start: 'top top',
        end: () => '+=' + Math.round(window.innerHeight * 2.0),
        scrub: 0.7,
        onUpdate: (self) => {
          const idx = Math.min(total - 1, Math.floor(self.progress * total));
          setActiveIndex((prev) => (prev !== idx ? idx : prev));
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => '+=' + Math.round(window.innerHeight * 2.0),
          scrub: 0.7
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

      return () => {
        st.kill();
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  // Direct swatch crossfade for mobile, tablet, and portrait devices
  useEffect(() => {
    const isDesktopLandscape = window.matchMedia('(min-width: 1024px) and (orientation: landscape)').matches;
    if (isDesktopLandscape) return;

    imageRefs.current.forEach((el, idx) => {
      if (!el) return;
      if (idx === activeIndex) {
        gsap.to(el, { opacity: 1, scale: 1.0, duration: 0.4, ease: 'power2.out' });
      } else {
        gsap.to(el, { opacity: 0, scale: 0.98, duration: 0.3, ease: 'power2.inOut' });
      }
    });
  }, [activeIndex]);

  // Smooth scroll navigation to any material (works on both mobile CSS-sticky and desktop GSAP-pin)
  const scrollToMaterial = (index) => {
    setActiveIndex(index);
    if (!containerRef.current) return;
    const total = materialsData.length;
    const allTriggers = ScrollTrigger.getAll();
    const st = allTriggers.find((s) => s.trigger === containerRef.current);

    if (st && st.pin) {
      // Desktop/tablet: GSAP pin — scroll within pin range
      const targetScroll = st.start + ((index + 0.5) / total) * (st.end - st.start);
      scrollToPosition(targetScroll, { duration: 0.7 });
    } else if (containerRef.current) {
      // Mobile: CSS sticky — section height was set via JS inline style
      const sectionHeight = parseFloat(containerRef.current.style.height) || containerRef.current.offsetHeight;
      const sectionTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
      // Place scroll at the midpoint of the target state's range
      const perState = sectionHeight / total;
      const targetScroll = sectionTop + (index + 0.5) * perState;
      scrollToPosition(targetScroll, { duration: 0.7 });
    }
  };

  const handlePrev = () => {
    const nextIdx = (activeIndex - 1 + materialsData.length) % materialsData.length;
    scrollToMaterial(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % materialsData.length;
    scrollToMaterial(nextIdx);
  };

  // Horizontal touch swipe handlers (touch-pan-y preserves vertical scroll)
  const handleTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = true;
  };

  const handleTouchEnd = (e) => {
    if (!isSwiping.current || !e.changedTouches || e.changedTouches.length === 0) return;
    isSwiping.current = false;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const deltaX = endX - touchStartX.current;
    const deltaY = endY - touchStartY.current;

    // Trigger swipe if horizontal delta >= 40px and dominant over vertical
    if (Math.abs(deltaX) >= 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const activeMaterial = materialsData[activeIndex] || materialsData[0];

  return (
    <section 
      id="materials" 
      ref={containerRef} 
      className="cinematic-scroll-section bg-[#0a0a0a]"
    >
      {/* Presentation Container: Content-Proportional on Mobile/Tablet, Sticky on Desktop */}
      <div className="cinematic-sticky-stage bg-[#0a0a0a] text-[#f4f3ef] select-none py-2 sm:py-5 md:py-6 lg:landscape:py-10 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 border-t border-white/[0.08]">
        
        {/* Main Viewport Presentation Area */}
        <div className="w-full max-w-4xl lg:max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center justify-center py-2 sm:py-4">
          
          {/* Left Column: Full-Scale Material Feature Photo (Dominant with Touch Swipe) */}
          <div 
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="w-full lg:col-span-7 xl:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/10] lg:aspect-auto h-[34vh] sm:h-[42vh] md:h-[48vh] lg:h-[58vh] xl:h-[62vh] max-h-[380px] sm:max-h-[460px] md:max-h-[520px] lg:max-h-[64vh] shrink-0 overflow-hidden bg-neutral-950 border border-white/[0.1] rounded-sm group shadow-2xl touch-pan-y cursor-grab active:cursor-grabbing"
          >
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
                  className="w-full h-full object-cover object-center transform-gpu select-none pointer-events-none"
                  loading={idx === 0 ? "eager" : "lazy"}
                  decoding="async"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Right Column: Refined Minimal Editorial Presentation */}
          <div className="w-full lg:col-span-5 xl:col-span-4 flex flex-col justify-center text-left space-y-3 sm:space-y-4 lg:space-y-6">
            
            {/* Concept, Material Name & Short Statement */}
            <div className="space-y-1.5 sm:space-y-3">
              <span className="text-[10px] sm:text-xs font-pencrow text-mirae-orange font-medium tracking-[0.25em] uppercase block">
                TECTONIC HONESTY • 0{activeIndex + 1}
              </span>
              <h3 className="font-architectural text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-[0.04em] uppercase leading-tight transition-colors duration-300">
                {activeMaterial.name}
              </h3>
              <p className="text-xs sm:text-sm md:text-base font-normal text-neutral-300 leading-relaxed font-pencrow max-w-md transition-opacity duration-300 line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
                {activeMaterial.description}
              </p>
            </div>

            {/* Clean Material Selector (Stone / Wood / Concrete / Metal) & Controls */}
            <div className="pt-2.5 sm:pt-4 border-t border-white/[0.08] flex items-center justify-between gap-2">
              <div className="grid grid-cols-4 gap-1 sm:gap-1.5 sm:flex sm:flex-wrap sm:gap-2">
                {materialsData.map((mat, idx) => {
                  const isSelected = activeIndex === idx;
                  return (
                    <button
                      key={mat.id}
                      type="button"
                      onClick={() => scrollToMaterial(idx)}
                      className={`h-7 sm:h-8 px-1.5 sm:px-3 md:px-3.5 text-[9.5px] sm:text-xs font-pencrow font-medium tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-1 sm:space-x-2 border cursor-pointer rounded-sm touch-manipulation ${
                        isSelected
                          ? 'border-mirae-orange bg-mirae-orange/10 text-white shadow-sm'
                          : 'border-white/10 text-white/50 hover:text-white hover:border-white/30'
                      }`}
                      aria-label={`Select ${mat.name} material specification`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSelected ? 'bg-mirae-orange' : 'bg-white/20'}`} />
                      <span className="truncate">{mat.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous material"
                  className="w-7 sm:w-8 h-7 sm:h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-all cursor-pointer touch-manipulation active:scale-95"
                >
                  <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next material"
                  className="w-7 sm:w-8 h-7 sm:h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-all cursor-pointer touch-manipulation active:scale-95"
                >
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
