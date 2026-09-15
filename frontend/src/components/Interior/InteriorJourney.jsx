import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { roomsData } from '../../data/roomsData';
import { preloadSingleImage } from '../../utils/imagePreloader';
import { ArrowLeft, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function InteriorJourney() {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Pre-warm all interior room images
    roomsData.forEach((room) => {
      preloadSingleImage(room.image);
      if (room.fallbackImage) preloadSingleImage(room.fallbackImage);
    });
  }, []);

  useEffect(() => {
    const total = roomsData.length;

    const ctx = gsap.context(() => {
      // Master ScrollTrigger tracking live progress across the 4 rooms
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

      // Layer Transition Timeline for image crossfades
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

  // Smooth click navigation to any room
  const scrollToRoom = (index) => {
    if (!containerRef.current) return;
    const total = roomsData.length;
    const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
    const scrollHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + ((index + 0.3) / total) * scrollHeight;
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  const handlePrev = () => {
    const nextIdx = (activeIndex - 1 + roomsData.length) % roomsData.length;
    scrollToRoom(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % roomsData.length;
    scrollToRoom(nextIdx);
  };

  const activeRoom = roomsData[activeIndex] || roomsData[0];

  return (
    <section 
      id="interior" 
      ref={containerRef} 
      className="relative w-full h-[320vh] bg-[#080808]"
    >
      {/* Sticky Fullscreen Single-Viewport Room Presentation (100dvh) */}
      <div className="sticky top-0 w-full h-screen h-[100dvh] min-h-0 overflow-hidden bg-[#080808] text-[#f4f3ef] flex flex-col justify-center select-none py-6 sm:py-10 md:py-12 px-5 sm:px-10 md:px-16 lg:px-20 border-t border-white/[0.08]">
        
        {/* Main Viewport Presentation Area */}
        <div className="w-full max-w-7xl mx-auto my-auto flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 xl:gap-16 items-center py-2">
          
          {/* Left Column: Full-Scale Architectural Visual (Dominant) */}
          <div className="lg:col-span-7 xl:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[58vh] xl:h-[62vh] max-h-[62vh] w-full overflow-hidden bg-[#0d0d0d] border border-white/[0.1] rounded-sm shadow-2xl">
            {roomsData.map((room, idx) => (
              <div
                key={room.id}
                ref={(el) => (imageRefs.current[idx] = el)}
                className={`absolute inset-0 w-full h-full will-change-transform ${
                  idx === 0 ? 'opacity-100 z-10' : 'opacity-0 z-10'
                }`}
              >
                <img 
                  src={room.image}
                  onError={(e) => { if (room.fallbackImage) e.target.src = room.fallbackImage; }}
                  alt={room.title}
                  className="w-full h-full object-cover object-center transform-gpu"
                  loading={idx === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Right Column: Refined Minimal Editorial Typography */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center text-left space-y-5 sm:space-y-6">
            
            {/* Room Name & Short Supporting Sentence */}
            <div className="space-y-3">
              <span className="text-xs font-pencrow text-mirae-orange font-medium tracking-[0.25em] uppercase block">
                0{activeIndex + 1} / 04
              </span>
              <h3 className="font-architectural text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-[0.04em] uppercase leading-tight transition-colors duration-300">
                {activeRoom.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-base font-normal text-neutral-300 leading-relaxed font-pencrow max-w-md transition-opacity duration-300">
                {activeRoom.subtitle}
              </p>
            </div>

            {/* Room Navigation Strip */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
              {/* Room Selector Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {roomsData.map((room, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <button
                      key={room.id}
                      onClick={() => scrollToRoom(idx)}
                      className={`h-8 px-2.5 sm:px-3 text-[11px] sm:text-xs font-pencrow font-medium tracking-wider uppercase transition-all duration-300 flex items-center space-x-1.5 border cursor-pointer rounded-sm ${
                        isActive 
                          ? 'border-mirae-orange bg-mirae-orange/10 text-white shadow-sm' 
                          : 'border-white/10 text-white/50 hover:text-white hover:border-white/30'
                      }`}
                      aria-label={`Go to room ${room.title}`}
                    >
                      <span className={isActive ? 'text-mirae-orange' : 'text-white/40'}>0{idx + 1}</span>
                      <span className="hidden xl:inline">{room.title.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center space-x-1.5 shrink-0">
                <button
                  onClick={handlePrev}
                  aria-label="Previous room"
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next room"
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-all cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
