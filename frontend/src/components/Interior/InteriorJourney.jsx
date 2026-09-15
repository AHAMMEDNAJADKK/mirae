import React, { useState } from 'react';
import { roomsData } from '../../data/roomsData';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function InteriorJourney() {
  const [selectedId, setSelectedId] = useState(roomsData[0].id);

  // Active featured room
  const activeRoom = roomsData.find(r => r.id === selectedId) || roomsData[0];
  const activeIndex = roomsData.findIndex(r => r.id === activeRoom.id);

  // Remaining supporting rooms for bottom cards
  const supportingRooms = roomsData.filter(r => r.id !== activeRoom.id);

  const handlePrev = () => {
    const nextIdx = (activeIndex - 1 + roomsData.length) % roomsData.length;
    setSelectedId(roomsData[nextIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % roomsData.length;
    setSelectedId(roomsData[nextIdx].id);
  };

  return (
    <section 
      id="interior" 
      className="relative w-full bg-[#080808] text-[#f4f3ef] py-16 sm:py-20 md:py-24 px-5 sm:px-10 md:px-16 lg:px-20 border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <span className="text-xs font-pencrow text-white/60 tracking-[0.3em] uppercase font-medium">
            04. INTERIOR ROOMS (ONE BY ONE)
          </span>
          <div className="hidden sm:flex items-center space-x-2 text-xs font-pencrow text-white/40 font-medium tracking-widest">
            <span>RESIDENTIAL SANCTUARY</span>
          </div>
        </div>

        {/* --- TOP: LARGE FEATURED ROOM DISPLAY --- */}
        <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center bg-[#0d0d0d] border border-white/[0.1] p-5 sm:p-8 md:p-10 mb-8 sm:mb-14 shadow-2xl">
          
          {/* Featured Image (Large 8 Cols) */}
          <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black/50">
            <img 
              key={activeRoom.id}
              src={activeRoom.image}
              onError={(e) => { if (activeRoom.fallbackImage) e.target.src = activeRoom.fallbackImage; }}
              alt={activeRoom.title}
              className="w-full h-full object-cover object-center transition-all duration-700 animate-fadeIn"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Featured Room Metadata (Right 4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4 sm:space-y-6 text-left">
            <div>
              <span className="text-xs font-pencrow text-amber-400 font-medium tracking-[0.3em] block mb-2 sm:mb-3">
                FEATURED SPACE
              </span>
              <h3 className="font-architectural text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-[0.04em] uppercase mb-3 sm:mb-4 leading-tight">
                {activeRoom.title}
              </h3>
              <p className="text-xs sm:text-sm font-normal text-[#d4d4d4] leading-relaxed mb-4 sm:mb-6 font-pencrow">
                {activeRoom.subtitle || activeRoom.description}
              </p>
            </div>

            {/* Room Number & Navigation Arrows */}
            <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs sm:text-sm font-pencrow text-white font-medium tracking-[0.25em]">
                {activeRoom.number}
              </span>

              <div className="flex items-center space-x-3">
                <button 
                  onClick={handlePrev}
                  aria-label="Previous room"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white hover:bg-white/10 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleNext}
                  aria-label="Next room"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white hover:bg-white/10 transition-all"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* --- BOTTOM: 3 SUPPORTING ROOM CARDS (Panel 04 Reference) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {supportingRooms.map((room) => (
            <div 
              key={room.id}
              onClick={() => setSelectedId(room.id)}
              className="group cursor-pointer bg-[#0e0e0e] border border-white/[0.08] hover:border-white/30 transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between shadow-lg"
            >
              {/* Thumbnail Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden mb-4 bg-black/40">
                <img 
                  src={room.image}
                  onError={(e) => { if (room.fallbackImage) e.target.src = room.fallbackImage; }}
                  alt={room.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Room Card Title & Subtitle */}
              <div className="text-left space-y-1.5 mb-4">
                <h4 className="font-architectural text-base sm:text-lg text-white font-semibold tracking-[0.06em] uppercase group-hover:text-amber-200 transition-colors">
                  {room.title}
                </h4>
                <p className="text-xs font-normal text-neutral-400 line-clamp-2 leading-relaxed font-pencrow">
                  {room.subtitle}
                </p>
              </div>

              {/* Room Number & Click Arrow */}
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-pencrow font-medium text-white/50 group-hover:text-white transition-colors">
                <span>{room.number}</span>
                <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
