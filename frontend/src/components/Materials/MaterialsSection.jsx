import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { materialsOverview, materialsData } from '../../data/materialsData';
import { preloadSingleImage } from '../../utils/imagePreloader';

export default function MaterialsSection() {
  const [activeMaterial, setActiveMaterial] = useState(materialsData[0]);

  // Pre-warm all material images so switching is instant without flicker
  useEffect(() => {
    materialsData.forEach((mat) => {
      preloadSingleImage(mat.image);
      if (mat.fallbackImage) preloadSingleImage(mat.fallbackImage);
    });
  }, []);

  return (
    <section 
      id="materials" 
      className="relative w-full bg-[#0a0a0a] text-[#f4f3ef] py-16 sm:py-20 md:py-24 px-5 sm:px-10 md:px-16 lg:px-20 border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Label */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <span className="text-xs font-mono-subtle text-white/60 tracking-[0.3em] uppercase font-medium">
            05. PROJECT DETAILS / MATERIALS
          </span>
          <div className="hidden sm:block text-xs font-mono-subtle text-white/40">
            TECTONIC HONESTY
          </div>
        </div>

        {/* Two-Column Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left: Dynamic Material Feature Photo with smooth crossfade */}
          <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[4/5] w-full overflow-hidden bg-neutral-950 border border-white/[0.1] rounded-sm group shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMaterial.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <img 
                  src={activeMaterial.image}
                  onError={(e) => { 
                    if (activeMaterial.fallbackImage && e.target.src !== activeMaterial.fallbackImage) {
                      e.target.src = activeMaterial.fallbackImage; 
                    }
                  }}
                  alt={`MIRAE Material Architecture Detail — ${activeMaterial.name}`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 will-change-transform"
                  loading="eager"
                  decoding="sync"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
              </motion.div>
            </AnimatePresence>

            {/* Architectural Material Plate Badge */}
            <div className="absolute top-4 left-4 z-10 bg-black/75 backdrop-blur-md px-3 py-1.5 border border-white/10 flex items-center space-x-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] font-mono-subtle text-white tracking-[0.25em] uppercase font-medium">
                PLATE {activeMaterial.num} • {activeMaterial.name.toUpperCase()}
              </span>
            </div>

            {/* Subtitle bottom banner */}
            <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/65 backdrop-blur-md px-4 py-3 border border-white/10 flex items-center justify-between text-xs font-mono-subtle text-white/90">
              <span className="tracking-wider uppercase font-light text-[11px] sm:text-xs">{activeMaterial.subtitle}</span>
              <span className="text-[10px] text-white/50 tracking-widest hidden sm:inline-block">TECTONIC STUDY</span>
            </div>
          </div>

          {/* Right: Editorial Narrative & Material Swatches */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6 sm:space-y-8 text-left">
            <div>
              <h2 className="font-architectural text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[0.04em] uppercase mb-3 sm:mb-5 leading-tight">
                {materialsOverview.title}
              </h2>
              <p className="text-xs sm:text-sm font-normal text-[#b8b8b8] leading-relaxed max-w-lg mb-6 sm:mb-8">
                {materialsOverview.description}
              </p>
              
              {/* Active Material Detail Card */}
              <div className="bg-[#111111] p-4 sm:p-6 border border-white/[0.12] mb-6 sm:mb-8 transition-all duration-300 shadow-xl">
                <div className="flex items-center justify-between mb-3 border-b border-white/[0.08] pb-2.5">
                  <div className="flex items-center space-x-3">
                    <span className="text-[11px] font-mono-subtle text-amber-400 font-medium tracking-widest">
                      {activeMaterial.num} / 04
                    </span>
                    <span className="text-base sm:text-lg font-architectural text-white uppercase tracking-wider font-semibold">
                      {activeMaterial.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono-subtle text-white/40 tracking-widest uppercase">
                    AUTHENTIC SPECIFICATION
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#d4d4d4] font-normal leading-relaxed mb-2">
                  {activeMaterial.description}
                </p>
                <div className="text-[11px] font-mono-subtle text-white/60 tracking-wide mt-2">
                  Key Attribute: <span className="text-amber-300/90">{activeMaterial.subtitle}</span>
                </div>
              </div>
            </div>

            {/* Bottom 4 Swatches Row */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono-subtle text-white/50 tracking-[0.25em] uppercase block">
                  SELECT MATERIAL SWATCH
                </span>
                <span className="text-[10px] font-mono-subtle text-amber-400/80 tracking-widest uppercase">
                  CLICK TO PREVIEW SPECIFICATION
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
                {materialsData.map((mat) => {
                  const isSelected = activeMaterial.id === mat.id;
                  return (
                    <button
                      key={mat.id}
                      type="button"
                      onClick={() => setActiveMaterial(mat)}
                      className={`group flex flex-col items-center text-center transition-all duration-300 focus:outline-none ${
                        isSelected ? 'scale-105' : 'opacity-65 hover:opacity-100'
                      }`}
                      aria-label={`Select ${mat.name} material specification`}
                    >
                      <div className={`relative aspect-square w-full overflow-hidden rounded-sm border transition-all duration-300 mb-2 ${
                        isSelected 
                          ? 'border-amber-400 ring-2 ring-amber-400/40 shadow-[0_0_15px_rgba(251,191,36,0.25)]' 
                          : 'border-white/10 group-hover:border-white/40'
                      }`}>
                        <img 
                          src={mat.image}
                          onError={(e) => { 
                            if (mat.fallbackImage && e.target.src !== mat.fallbackImage) {
                              e.target.src = mat.fallbackImage; 
                            }
                          }}
                          alt={mat.name}
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-amber-400/10 pointer-events-none" />
                        )}
                      </div>
                      <span className={`text-[11px] font-mono-subtle tracking-wider uppercase transition-colors ${
                        isSelected ? 'text-amber-300 font-medium' : 'text-[#a0a0a0]'
                      }`}>
                        {mat.name}
                      </span>
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
