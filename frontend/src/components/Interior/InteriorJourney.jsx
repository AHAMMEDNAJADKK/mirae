import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { roomsData } from '../../data/roomsData';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function InteriorJourney() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Array of refs for each room layer
  const roomLayerRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalRooms = roomsData.length;

      // Master ScrollTrigger for the interior spatial journey
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;
          const idx = Math.min(totalRooms - 1, Math.floor(p * totalRooms));
          setActiveIndex(idx);
        }
      });

      // Camera depth and opacity transitions between rooms
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.0,
        }
      });

      // Animate transitions sequentially: Room 0 -> 1 -> 2 -> 3
      for (let i = 1; i < totalRooms; i++) {
        const prev = roomLayerRefs.current[i - 1];
        const curr = roomLayerRefs.current[i];
        const stepTime = i * 2;

        if (prev && curr) {
          tl.to(prev, {
            opacity: 0,
            scale: 0.95,
            ease: 'power2.inOut',
            duration: 1.2
          }, stepTime - 0.6)
          .fromTo(curr, {
            opacity: 0,
            scale: 1.08,
          }, {
            opacity: 1,
            scale: 1.0,
            ease: 'power2.out',
            duration: 1.2
          }, stepTime - 0.4);
        }
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const activeRoom = roomsData[activeIndex] || roomsData[0];

  return (
    <section 
      id="interior" 
      ref={containerRef} 
      className="relative w-full h-[320vh] bg-[#080808]"
    >
      {/* Sticky Viewport Frame */}
      <div className="sticky top-0 w-full h-screen h-[100svh] min-h-0 overflow-hidden bg-[#0a0a0a] flex flex-col justify-between">
        
        {/* Background Visual Layers */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {roomsData.map((room, idx) => (
            <div
              key={room.id}
              ref={(el) => (roomLayerRefs.current[idx] = el)}
              className={`absolute inset-0 w-full h-full will-change-transform ${
                idx === 0 ? 'opacity-100 z-10' : 'opacity-0 z-10'
              }`}
            >
              <img 
                src={room.image}
                onError={(e) => { if (room.fallbackImage) e.target.src = room.fallbackImage; }}
                alt={room.title}
                className="w-full h-full object-cover object-center"
                loading={idx === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/85" />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ))}
          <div className="absolute inset-0 architectural-vignette pointer-events-none" />
        </div>

        {/* Top Header HUD inside the sticky interior frame */}
        <div className="relative z-20 w-full px-6 sm:px-12 md:px-16 pt-3 sm:pt-6 md:pt-8 flex items-center justify-between text-xs font-mono-subtle">
          <div className="flex items-center space-x-4">
            <span className="text-subtle tracking-[0.3em] uppercase">INTERIOR SANCTUARY</span>
            <span className="text-white/20">/</span>
            <span className="text-white/90 tracking-widest uppercase">{activeRoom.title}</span>
          </div>

          {/* Room Step Indicators */}
          <div className="flex items-center space-x-4">
            {roomsData.map((r, i) => (
              <div
                key={r.id}
                className={`flex items-center space-x-2 transition-all duration-300 ${
                  activeIndex === i ? 'text-white opacity-100 font-semibold' : 'text-subtle opacity-40'
                }`}
              >
                <span>0{i + 1}</span>
                <div className={`w-6 sm:w-10 h-[1px] transition-all duration-300 ${
                  activeIndex === i ? 'bg-white' : 'bg-white/20'
                }`} />
              </div>
            ))}
          </div>
        </div>

        {/* Center Editorial Room Card */}
        <div className="relative z-20 w-full px-4 sm:px-12 md:px-16 my-auto">
          <div className="max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 md:gap-12 items-center">
            
            {/* Left Column: Number & Titles */}
            <div className="md:col-span-6 space-y-2 sm:space-y-4">
              <span className="text-[11px] sm:text-sm font-mono-subtle text-white/60 tracking-[0.3em] block">
                {activeRoom.number}
              </span>
              <h2 className="font-architectural text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.08em] text-white uppercase leading-tight">
                {activeRoom.title}
              </h2>
              <p className="text-xs sm:text-sm font-light text-subtle tracking-wide">
                {activeRoom.subtitle}
              </p>
              <div className="w-12 h-[1px] bg-white/40 pt-1" />
            </div>

            {/* Right Column: Architectural Description & Craft Details */}
            <div className="md:col-span-6 space-y-3 sm:space-y-5 bg-[#0c0c0c]/85 backdrop-blur-md p-4 sm:p-6 md:p-8 border border-white/[0.08]">
              <p className="text-xs sm:text-sm font-light text-[#dfded9] leading-relaxed">
                {activeRoom.description}
              </p>

              <div className="space-y-1.5 sm:space-y-2 pt-2 sm:pt-3 border-t border-white/[0.08]">
                <span className="text-[10px] font-mono-subtle text-subtle tracking-[0.2em] block uppercase">
                  ARCHITECTURAL SIGNATURES
                </span>
                {activeRoom.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start space-x-2.5 text-xs text-[#b8b8b8]">
                    <Check className="w-3.5 h-3.5 text-white/70 mt-0.5 flex-shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar Info */}
        <div className="relative z-20 w-full px-6 sm:px-12 md:px-16 pb-3 sm:pb-6 md:pb-8 flex justify-between items-center text-[10px] sm:text-xs font-mono-subtle text-white/40">
          <span>SPATIAL SEQUENCE • MIRAE SIGNATURE RESIDENCE</span>
          <span>ROOM {activeRoom.number}</span>
        </div>

      </div>
    </section>
  );
}
