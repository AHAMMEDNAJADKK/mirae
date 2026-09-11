import React, { useState } from 'react';
import { materialsData } from '../../data/materialsData';
import { Layers } from 'lucide-react';

export default function MaterialsSection() {
  const [selectedMaterial, setSelectedMaterial] = useState(materialsData[0]);

  return (
    <section id="materials" className="relative w-full bg-[#0a0a0a] py-32 px-6 sm:px-12 md:px-20 text-[#f4f3ef] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 border-b border-white/[0.08] pb-10">
          <div>
            <div className="flex items-center space-x-3 text-xs font-mono-subtle text-subtle uppercase mb-4 tracking-[0.3em]">
              <Layers className="w-3.5 h-3.5 text-white/70" />
              <span>HONEST TECTONICS & MATERIALITY</span>
            </div>
            <h2 className="font-architectural text-3xl sm:text-5xl md:text-6xl font-light tracking-wide text-white uppercase">
              MATERIALS & CRAFT
            </h2>
          </div>
          <p className="text-sm font-light text-subtle max-w-md mt-6 md:mt-0 leading-relaxed">
            Quiet luxury is rooted in enduring craftsmanship, raw authenticity, and materials that weather with dignity over generations.
          </p>
        </div>

        {/* Interactive Material Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 mb-12">
          {materialsData.map((mat) => (
            <button
              key={mat.id}
              onClick={() => setSelectedMaterial(mat)}
              className={`text-left p-4 sm:p-6 border transition-all duration-300 ${
                selectedMaterial.id === mat.id
                  ? 'border-white bg-[#161616]'
                  : 'border-white/[0.08] hover:border-white/30 bg-[#0d0d0d]'
              }`}
            >
              <span className="text-xs font-mono-subtle text-subtle block mb-2">
                {mat.num}
              </span>
              <span className="font-architectural text-sm sm:text-base font-light tracking-wider text-white block">
                {mat.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Main Material Detail Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#0d0d0d] border border-white/[0.08] p-6 sm:p-12">
          {/* Large Material Imagery */}
          <div className="lg:col-span-7 relative h-[380px] sm:h-[480px] md:h-[540px] overflow-hidden border border-white/[0.06]">
            <img 
              src={selectedMaterial.image} 
              onError={(e) => { e.target.src = '/assets/images/material-stone.jpg'; }}
              alt={selectedMaterial.name}
              className="w-full h-full object-cover object-center transition-transform duration-1000 hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 text-xs font-mono-subtle text-white/80">
              SPECIFICATION: {selectedMaterial.num} / {materialsData.length}
            </div>
          </div>

          {/* Material Editorial Story & Properties */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-mono-subtle text-subtle tracking-[0.25em] block uppercase mb-2">
                {selectedMaterial.subtitle}
              </span>
              <h3 className="font-architectural text-2xl sm:text-4xl text-white font-light uppercase tracking-wider mb-4">
                {selectedMaterial.name}
              </h3>
              <p className="text-sm sm:text-base font-light text-[#c0c0c0] leading-relaxed">
                {selectedMaterial.description}
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/[0.08]">
              <span className="text-xs font-mono-subtle text-subtle uppercase tracking-widest block">
                MATERIAL INTEGRATION ATTRIBUTES
              </span>
              {selectedMaterial.properties.map((prop, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-sm text-[#d4d4d4]">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  <span>{prop}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <span className="text-xs font-mono-subtle text-white/50 block">
                MIRAE ARCHITECTURAL MATERIAL STANDARDS • CRAFTED WITHOUT ARTIFICE
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
