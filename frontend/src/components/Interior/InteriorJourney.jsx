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
      <div className="sticky top-0 w-full h-screen h-[100dvh] min-h-0 overflow-hidden bg-[#080808] text-[#f4f3ef] flex flex-col justify-between select-none py-4 sm:py-6 md:py-8 px-5 sm:px-10 md:px-16 lg:px-20 border-t border-white/[0.08]">
        
        {/* Top Header HUD */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between text-xs font-pencrow shrink-0">
          <div className="flex items-center space-x-3">
            <span className="text-white/70 tracking-[0.3em] uppercase font-medium">
              04. INTERIOR ROOMS (ONE BY ONE)
            </span>
          </div>
          <div className="text-white/40 tracking-widest hidden sm:block font-medium">
            RESIDENTIAL SANCTUARY • ROOM 0{activeIndex + 1}/04
          </div>
        </div>

        {/* Main Viewport Presentation Area */}
        <div className="w-full max-w-7xl mx-auto my-auto flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-10 xl:gap-14 items-center py-2 sm:py-4">
          
          {/* Left Column: Full-Scale Architectural Visual */}
          <div className="lg:col-span-7 xl:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[52vh] xl:h-[56vh] max-h-[56vh] w-full overflow-hidden bg-[#0d0d0d] border border-white/[0.1] rounded-sm shadow-2xl">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
              </div>
            ))}

            {/* Room Plate Badge (Top-Left) */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 bg-black/75 backdrop-blur-md px-2.5 py-1.5 sm:px-3 sm:py-1.5 border border-white/10 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] font-pencrow text-white tracking-[0.25em] uppercase font-medium">
                ROOM {activeRoom.number} • {activeRoom.title}
              </span>
            </div>

            {/* Subtitle Bar (Bottom) */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 bg-black/75 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2 border border-white/10 flex items-center justify-between text-xs font-pencrow text-white/90">
              <span className="tracking-wider uppercase font-light text-[10px] sm:text-xs truncate mr-2">
                {activeRoom.subtitle}
              </span>
              <span className="text-[9px] sm:text-[10px] text-white/50 tracking-widest shrink-0 hidden sm:inline-block font-pencrow">
                SPATIAL STUDY
              </span>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Controls */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between h-auto lg:h-[52vh] xl:h-[56vh] text-left space-y-3 sm:space-y-4">
            
            {/* Title & Description Block */}
            <div>
              <span className="text-[10px] sm:text-xs font-pencrow text-amber-400 font-medium tracking-[0.3em] uppercase block mb-1 sm:mb-1.5">
                FEATURED SPACE
              </span>
              <h3 className="font-architectural text-xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold text-white tracking-[0.04em] uppercase mb-1.5 sm:mb-2.5 leading-tight transition-colors duration-300">
                {activeRoom.title}
              </h3>
              <p className="text-xs sm:text-sm font-normal text-[#d4d4d4] leading-relaxed font-pencrow transition-opacity duration-300 line-clamp-3 sm:line-clamp-4">
                {activeRoom.subtitle || activeRoom.description}
              </p>
            </div>

            {/* Architectural Highlights Card */}
            <div className="bg-[#111111] p-2.5 sm:p-3.5 border border-white/[0.08] shadow-lg">
              <span className="text-[10px] font-pencrow text-white/40 tracking-widest uppercase block mb-1.5">
                ARCHITECTURAL HIGHLIGHTS
              </span>
              <ul className="space-y-1 text-[11px] sm:text-xs text-[#b8b8b8] font-pencrow">
                {activeRoom.details ? activeRoom.details.slice(0, 2).map((detail, dIdx) => (
                  <li key={dIdx} className="flex items-start space-x-1.5">
                    <span className="text-amber-400/80 mt-0.5">•</span>
                    <span className="line-clamp-1">{detail}</span>
                  </li>
                )) : null}
              </ul>
            </div>

            {/* Navigation & Indicators Row */}
            <div className="pt-2 sm:pt-3 border-t border-white/[0.08] flex items-center justify-between">
              {/* Room Selector Tabs */}
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                {roomsData.map((room, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <button
                      key={room.id}
                      onClick={() => scrollToRoom(idx)}
                      className={`h-7 px-2 sm:px-2.5 text-[10px] sm:text-[11px] font-pencrow font-medium tracking-wider uppercase transition-all duration-300 flex items-center space-x-1 border cursor-pointer ${
                        isActive 
                          ? 'border-amber-400 bg-amber-400/10 text-amber-300' 
                          : 'border-white/10 text-white/40 hover:text-white hover:border-white/30'
                      }`}
                      aria-label={`Go to room ${room.title}`}
                    >
                      <span>0{idx + 1}</span>
                      <span className="hidden xl:inline text-[9px] opacity-75">{room.title.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous room"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next room"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white hover:bg-white/10 transition-all cursor-pointer"
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
