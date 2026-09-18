import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { preloadSingleImage } from '../../utils/imagePreloader';
import { ArrowRight, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const studioImages = [
  {
    id: '01',
    num: '01',
    title: 'THE PRINCIPAL STUDY',
    subtitle: 'Private Executive Atelier',
    category: 'Architecture & Leadership',
    description: 'A contemplative sanctuary defined by fluted acoustic grids, custom dark timber joinery, and warm ambient illumination.',
    image: '/assets/images/studio/studio-01-executive.webp',
    fallbackImage: '/assets/images/studio/studio-01-executive.jpg',
    tag: 'EXECUTIVE ATELIER'
  },
  {
    id: '02',
    num: '02',
    title: 'THE DESIGN ARENA',
    subtitle: 'Open Collaborative Studio',
    category: 'Spatial Design Core',
    description: 'An open-concept architectural arena sheltered beneath a sweeping illuminated ribbon and framed by raw monolithic stone textures.',
    image: '/assets/images/studio/studio-02-arena.webp',
    fallbackImage: '/assets/images/studio/studio-02-arena.jpg',
    tag: 'STUDIO WORKSPACE'
  },
  {
    id: '03',
    num: '03',
    title: 'ATELIER IN SESSION',
    subtitle: 'Design Collective & Ideation',
    category: 'Process & Craftsmanship',
    description: 'Where sketches transform into reality. Our multidisciplinary architects immersed in rigorous detailing and material curation.',
    image: '/assets/images/studio/studio-03-atelier.webp',
    fallbackImage: '/assets/images/studio/studio-03-atelier.jpg',
    tag: 'COLLECTIVE PROCESS'
  },
  {
    id: '04',
    num: '04',
    title: 'THE COMMONS',
    subtitle: 'Reception & Biophilic Welcome Lounge',
    category: 'Spatial Experience',
    description: 'Sculptural terracotta seating, fluted timber reception counter, and cascading vertical flora setting a serene, hospitable arrival tone.',
    image: '/assets/images/studio/studio-04-lounge.webp',
    fallbackImage: '/assets/images/studio/studio-04-lounge.jpg',
    tag: 'RECEPTION & LOUNGE'
  },
  {
    id: '05',
    num: '05',
    title: 'ARCHITECTURAL LEADERSHIP',
    subtitle: 'Vision & Creative Direction',
    category: 'Philosophy & Leadership',
    description: 'Guiding MIRAE with an unwavering commitment to proportion, context, and structural purity across every commissioned work.',
    image: '/assets/images/studio/studio-05-principal.webp',
    fallbackImage: '/assets/images/studio/studio-05-principal.jpg',
    tag: 'PRINCIPAL ARCHITECT'
  },
  {
    id: '06',
    num: '06',
    title: 'SPATIAL CHRONICLE',
    subtitle: 'Panoramic Studio Triptych',
    category: 'Architectural Synthesis',
    description: 'A holistic architectural perspective uniting light, materiality, spatial depth, and human rhythm under one shared vision.',
    image: '/assets/images/studio/studio-06-chronicle.webp',
    fallbackImage: '/assets/images/studio/studio-06-chronicle.jpg',
    tag: 'STUDIO TRIPTYCH'
  }
];

export default function StudioScrollSection() {
  const containerRef = useRef(null);
  const slideRefs = useRef([]);
  const captionRefs = useRef([]);
  const progressFillRef = useRef(null);
  const activeIdxRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Preload all 6 studio images and fallbacks immediately
    studioImages.forEach(item => {
      preloadSingleImage(item.image);
      if (item.fallbackImage) preloadSingleImage(item.fallbackImage);
    });
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const total = studioImages.length;

      // Set initial visual states for all 6 image slides
      slideRefs.current.forEach((el, idx) => {
        if (!el) return;
        gsap.set(el, {
          opacity: idx === 0 ? 1 : 0,
          scale: prefersReducedMotion ? 1 : (idx === 0 ? 1 : 1.02),
          transformOrigin: 'center center'
        });
      });

      // Set initial visual states for all 6 caption blocks
      captionRefs.current.forEach((el, idx) => {
        if (!el) return;
        gsap.set(el, {
          opacity: idx === 0 ? 1 : 0,
          y: prefersReducedMotion ? 0 : (idx === 0 ? 0 : 20),
          pointerEvents: idx === 0 ? 'auto' : 'none'
        });
      });

      // Single authoritative timeline tied directly to container scroll
      // Timeline duration = 6.0 units.
      // Scene 0: rest 0.00 -> 0.65 | transition 0 -> 1: 0.65 -> 1.00 (midpoint 0.825)
      // Scene 1: rest 1.00 -> 1.65 | transition 1 -> 2: 1.65 -> 2.00 (midpoint 1.825)
      // Scene 2: rest 2.00 -> 2.65 | transition 2 -> 3: 2.65 -> 3.00 (midpoint 2.825)
      // Scene 3: rest 3.00 -> 3.65 | transition 3 -> 4: 3.65 -> 4.00 (midpoint 3.825)
      // Scene 4: rest 4.00 -> 4.65 | transition 4 -> 5: 4.65 -> 5.00 (midpoint 4.825)
      // Scene 5: rest 5.00 -> 6.00 | dedicated stable viewing plateau for Scene 6
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;
            // Boundary thresholds derived from transition midpoints
            let idx = 0;
            if (p >= 0.804) {
              idx = 5;
            } else if (p >= 0.637) {
              idx = 4;
            } else if (p >= 0.471) {
              idx = 3;
            } else if (p >= 0.304) {
              idx = 2;
            } else if (p >= 0.138) {
              idx = 1;
            } else {
              idx = 0;
            }

            if (idx !== activeIdxRef.current) {
              activeIdxRef.current = idx;
              setActiveIndex(idx);
            }
          }
        }
      });

      // GPU-accelerated progress meter bar across entire 6-unit duration
      if (progressFillRef.current) {
        gsap.set(progressFillRef.current, { scaleX: 0, transformOrigin: 'left center' });
        tl.to(progressFillRef.current, {
          scaleX: 1,
          ease: 'none',
          duration: 6.0
        }, 0);
      }

      // Sequential layer and caption crossfades
      for (let i = 1; i < total; i++) {
        const prevSlide = slideRefs.current[i - 1];
        const currSlide = slideRefs.current[i];
        const prevCap = captionRefs.current[i - 1];
        const currCap = captionRefs.current[i];

        const transStart = i - 0.35; // 0.65, 1.65, 2.65, 3.65, 4.65
        const transDuration = 0.35;

        if (prevSlide && currSlide) {
          // Image transition: previous fades out with subtle scale retreat, current fades in to 1.0
          tl.to(prevSlide, {
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 0.98,
            ease: 'power2.inOut',
            duration: transDuration
          }, transStart)
          .fromTo(currSlide, {
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 1.02
          }, {
            opacity: 1,
            scale: 1.0,
            ease: 'power2.out',
            duration: transDuration
          }, transStart);
        }

        if (prevCap && currCap) {
          // Caption transition: previous moves up slightly and fades, current rises up and settles
          tl.to(prevCap, {
            opacity: 0,
            y: prefersReducedMotion ? 0 : -16,
            ease: 'power2.inOut',
            duration: transDuration * 0.85,
            onComplete: () => {
              if (prevCap) prevCap.style.pointerEvents = 'none';
            }
          }, transStart)
          .fromTo(currCap, {
            opacity: 0,
            y: prefersReducedMotion ? 0 : 20
          }, {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            duration: transDuration,
            onStart: () => {
              if (currCap) currCap.style.pointerEvents = 'auto';
            }
          }, transStart + 0.05);
        }
      }

      // Hold Scene 5 (Scene 6) at full rest through end of scroll travel
      tl.to({}, { duration: 1.0 }, 5.0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const activeItem = studioImages[activeIndex] || studioImages[0];

  return (
    <section 
      id="studio"
      ref={containerRef}
      className="relative w-full h-[420vh] md:h-[500vh] lg:h-[580vh] bg-[#080808] text-[#f4f3ef] border-t border-white/[0.08]"
    >
      {/* Sticky Cinematic Viewport Stage */}
      <div className="sticky top-0 h-screen h-[100svh] w-full flex flex-col justify-between p-3 sm:p-5 md:p-7 lg:p-8 xl:p-10 overflow-hidden select-none">
        
        {/* Top Editorial Bar */}
        <div className="relative z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 border-b border-white/[0.08] pb-2 sm:pb-4">
          <div>
            <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-pencrow text-mirae-orange font-medium tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-0.5 sm:mb-1">
              <Compass className="w-3.5 h-3.5 text-mirae-orange" />
              <span>THE ATELIER • SPATIAL SEQUENCE</span>
            </div>
            <h2 className="font-architectural text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white uppercase tracking-wider">
              WHERE VISION TAKES FORM
            </h2>
          </div>

          {/* Dynamic Index & Progress Bar */}
          <div className="flex items-center space-x-4 sm:space-x-8 shrink-0">
            <div className="flex flex-col items-end">
              <span className="text-[10px] sm:text-xs font-pencrow text-white/50 uppercase tracking-widest font-medium">
                SEQUENCE
              </span>
              <span className="text-xs sm:text-base font-pencrow font-semibold text-white tracking-widest">
                {activeItem.num} <span className="text-white/30">/ 06</span>
              </span>
            </div>

            {/* Architectural Progress Meter (GPU scaleX animation via GSAP) */}
            <div className="w-16 sm:w-28 md:w-36 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
              <div 
                ref={progressFillRef}
                className="h-full w-full bg-mirae-orange will-change-transform"
                style={{ transformOrigin: 'left center' }}
              />
            </div>
          </div>
        </div>

        {/* Central Display: Layered Image Canvas (Proportioned to prevent laptop clipping) */}
        <div className="relative z-10 flex-grow my-1.5 sm:my-3 md:my-4 w-full max-w-6xl mx-auto flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full max-h-[36vh] sm:max-h-[46vh] md:max-h-[50vh] lg:max-h-[54vh] xl:max-h-[58vh] aspect-[16/10] sm:aspect-[16/9] overflow-hidden border border-white/[0.1] bg-[#0c0c0c] shadow-2xl">
            {studioImages.map((item, idx) => (
              <div
                key={item.id}
                ref={(el) => (slideRefs.current[idx] = el)}
                className="absolute inset-0 w-full h-full will-change-transform will-change-opacity"
              >
                <img
                  src={item.image}
                  onError={(e) => { e.target.src = item.fallbackImage; }}
                  alt={item.title}
                  className="w-full h-full object-cover object-center"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                
                {/* Architectural Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

                {/* Badge Tag */}
                <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-10 bg-black/70 backdrop-blur-md px-2.5 py-1 border border-white/15 text-[9px] sm:text-[11px] font-pencrow font-medium tracking-[0.2em] text-white/90 uppercase">
                  {item.tag}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Editorial Caption Panel */}
        <div className="relative z-20 max-w-6xl mx-auto w-full pt-2 sm:pt-3.5 border-t border-white/[0.08] flex flex-col md:flex-row items-start md:items-end justify-between gap-2.5 sm:gap-4">
          {/* Stacked Animated Captions (Driven synchronously by GSAP timeline) */}
          <div className="relative w-full max-w-2xl min-h-[85px] sm:min-h-[95px] md:min-h-[105px] overflow-hidden">
            {studioImages.map((item, idx) => (
              <div
                key={item.id}
                ref={(el) => (captionRefs.current[idx] = el)}
                className="absolute inset-0 flex flex-col justify-start will-change-transform will-change-opacity"
              >
                <div className="text-[10px] sm:text-xs font-pencrow text-mirae-orange font-medium tracking-widest uppercase mb-0.5 sm:mb-1">
                  {item.category} • {item.subtitle}
                </div>
                <h3 className="font-architectural text-base sm:text-xl md:text-2xl font-bold text-white uppercase tracking-wide leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm font-normal text-neutral-300 mt-1 leading-relaxed font-pencrow line-clamp-2 sm:line-clamp-3">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-pencrow text-white/50 uppercase tracking-widest font-medium shrink-0 pt-1 md:pt-0">
            <span>SCROLL TO ADVANCE</span>
            <ArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-mirae-orange" />
          </div>
        </div>

      </div>
    </section>
  );
}
