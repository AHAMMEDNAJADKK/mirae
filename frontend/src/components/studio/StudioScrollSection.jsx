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
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Preload all 6 client images for immediate smooth scrolling
    studioImages.forEach(item => {
      preloadSingleImage(item.image);
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const total = studioImages.length;

      // Master ScrollTrigger for live progress tracking
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          const idx = Math.min(total - 1, Math.floor(self.progress * total));
          setActiveIndex(idx);
        }
      });

      // Sequential layer transitions
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.0
        }
      });

      for (let i = 1; i < total; i++) {
        const prev = slideRefs.current[i - 1];
        const curr = slideRefs.current[i];
        const position = i;

        if (prev && curr) {
          tl.to(prev, {
            opacity: 0,
            scale: 0.97,
            ease: 'power2.inOut',
            duration: 1.0
          }, position - 0.4)
          .fromTo(curr, {
            opacity: 0,
            scale: 1.06
          }, {
            opacity: 1,
            scale: 1.0,
            ease: 'power2.out',
            duration: 1.0
          }, position - 0.3);
        }
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const activeItem = studioImages[activeIndex] || studioImages[0];

  return (
    <section 
      id="studio"
      ref={containerRef}
      className="relative w-full h-[450vh] bg-[#080808] text-[#f4f3ef] border-t border-white/[0.08]"
    >
      {/* Sticky Cinematic Viewport */}
      <div className="sticky top-0 h-screen h-[100svh] w-full flex flex-col justify-between p-4 sm:p-8 md:p-12 lg:p-14 overflow-hidden">
        
        {/* Top Editorial Bar */}
        <div className="relative z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border-b border-white/[0.08] pb-3 sm:pb-5">
          <div>
            <div className="flex items-center space-x-2 text-xs font-pencrow text-amber-400 font-medium tracking-[0.25em] uppercase mb-1">
              <Compass className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>THE ATELIER • SPATIAL SEQUENCE</span>
            </div>
            <h2 className="font-architectural text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wider">
              WHERE VISION TAKES FORM
            </h2>
          </div>

          {/* Dynamic Index & Progress Bar */}
          <div className="flex items-center space-x-5 sm:space-x-8">
            <div className="flex flex-col items-end">
              <span className="text-xs font-pencrow text-white/50 uppercase tracking-widest font-medium">
                SEQUENCE
              </span>
              <span className="text-sm sm:text-base font-pencrow font-semibold text-white tracking-widest">
                {activeItem.num} <span className="text-white/30">/ 06</span>
              </span>
            </div>

            {/* Architectural Progress Meter */}
            <div className="w-20 sm:w-36 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
              <div 
                className="h-full bg-amber-400 transition-all duration-300 ease-out"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Central Display: Layered Image Canvas */}
        <div className="relative z-10 flex-grow my-2 sm:my-4 md:my-6 w-full max-w-6xl mx-auto flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full max-h-[50vh] sm:max-h-[58vh] lg:max-h-[62vh] aspect-[16/10] sm:aspect-[16/9] overflow-hidden border border-white/[0.1] bg-[#0c0c0c] shadow-2xl">
            {studioImages.map((item, idx) => (
              <div
                key={item.id}
                ref={(el) => (slideRefs.current[idx] = el)}
                className="absolute inset-0 w-full h-full will-change-transform will-change-opacity"
                style={{
                  opacity: idx === 0 ? 1 : 0,
                  transform: idx === 0 ? 'scale(1)' : 'scale(1.06)'
                }}
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
                <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-md px-3 py-1 border border-white/15 text-[11px] font-pencrow font-medium tracking-[0.2em] text-white/90 uppercase">
                  {item.tag}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Editorial Caption Panel */}
        <div className="relative z-20 max-w-6xl mx-auto w-full pt-3 sm:pt-4 border-t border-white/[0.08] flex flex-col md:flex-row items-start md:items-end justify-between gap-3 sm:gap-4">
          <div className="max-w-2xl">
            <div className="text-xs font-pencrow text-amber-400 font-medium tracking-widest uppercase mb-1">
              {activeItem.category} • {activeItem.subtitle}
            </div>
            <h3 className="font-architectural text-lg sm:text-xl md:text-2xl font-bold text-white uppercase tracking-wide">
              {activeItem.title}
            </h3>
            <p className="text-xs sm:text-sm font-normal text-neutral-300 mt-1 leading-relaxed font-pencrow">
              {activeItem.description}
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-pencrow text-white/50 uppercase tracking-widest font-medium">
            <span>SCROLL TO ADVANCE</span>
            <ArrowRight className="w-3.5 h-3.5 animate-pulse text-amber-400" />
          </div>
        </div>

      </div>
    </section>
  );
}
