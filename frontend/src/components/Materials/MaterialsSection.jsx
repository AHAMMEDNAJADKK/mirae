import React, { useState } from 'react';
import { materialsOverview, materialsData } from '../../data/materialsData';

export default function MaterialsSection() {
  const [activeMaterial, setActiveMaterial] = useState(materialsData[0]);

  return (
    <section 
      id="materials" 
      className="relative w-full bg-[#0a0a0a] text-[#f4f3ef] py-16 sm:py-24 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Label */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <span className="text-xs font-mono-subtle text-white/50 tracking-[0.3em] uppercase">
            05. PROJECT DETAILS / MATERIALS
          </span>
          <div className="hidden sm:block text-xs font-mono-subtle text-white/40">
            TECTONIC HONESTY
          </div>
        </div>

        {/* Two-Column Editorial Composition (Matching Panel 05 Reference) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left: Monumental Architecture Feature Photo (Concrete & Shadow) */}
          <div className="lg:col-span-6 relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden bg-black/60 border border-white/[0.08]">
            <img 
              src={materialsOverview.featuredImage}
              onError={(e) => { e.target.src = materialsOverview.fallbackImage; }}
              alt="MIRAE Material Architecture Detail"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Right: Editorial Narrative & Material Swatches */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-8 text-left">
            <div>
              <h2 className="font-architectural text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-[0.06em] uppercase mb-6 leading-tight">
                {materialsOverview.title}
              </h2>
              <p className="text-xs sm:text-sm font-light text-[#b0b0b0] leading-relaxed max-w-lg mb-8">
                {materialsOverview.description}
              </p>
              
              {/* Active Material Detail Card */}
              <div className="bg-[#111111] p-5 sm:p-6 border border-white/[0.08] mb-8">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-[11px] font-mono-subtle text-white/50">{activeMaterial.num}</span>
                  <span className="text-sm font-architectural text-white uppercase tracking-wider">{activeMaterial.name}</span>
                </div>
                <p className="text-xs text-[#9c9c9c] leading-relaxed">
                  {activeMaterial.description}
                </p>
              </div>
            </div>

            {/* Bottom 4 Swatches Row (Panel 05 Reference) */}
            <div>
              <span className="text-[10px] font-mono-subtle text-white/40 tracking-[0.25em] uppercase block mb-3">
                SELECT MATERIAL SWATCH
              </span>
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {materialsData.map((mat) => {
                  const isSelected = activeMaterial.id === mat.id;
                  return (
                    <button
                      key={mat.id}
                      onClick={() => setActiveMaterial(mat)}
                      className={`group flex flex-col items-center text-center transition-all duration-300 focus:outline-none ${
                        isSelected ? 'scale-105' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className={`relative aspect-square w-full overflow-hidden border transition-all duration-300 mb-2 ${
                        isSelected ? 'border-white shadow-[0_0_12px_rgba(255,255,255,0.2)]' : 'border-white/10 group-hover:border-white/40'
                      }`}>
                        <img 
                          src={mat.image}
                          onError={(e) => { e.target.src = mat.fallbackImage; }}
                          alt={mat.name}
                          className="w-full h-full object-cover object-center"
                          loading="lazy"
                        />
                      </div>
                      <span className={`text-[11px] font-mono-subtle tracking-wider uppercase transition-colors ${
                        isSelected ? 'text-white font-medium' : 'text-subtle'
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
