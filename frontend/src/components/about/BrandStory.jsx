import React from 'react';
import { Compass, Award, ShieldCheck, Eye } from 'lucide-react';

export default function BrandStory() {
  return (
    <section id="about" className="relative w-full bg-[#0a0a0a] py-32 px-6 sm:px-12 md:px-20 text-[#f4f3ef] border-t border-white/[0.08] overflow-hidden">
      <div id="philosophy" className="absolute -top-20" />
      <div className="max-w-6xl mx-auto">
        
        {/* Magazine Editorial Headline */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono-subtle text-subtle tracking-[0.35em] uppercase block mb-4">
            THE EDITORIAL ESSAY
          </span>
          <h2 className="font-architectural text-3xl sm:text-5xl md:text-6xl font-light text-white uppercase tracking-wider mb-8">
            THE MIRAE SIGNATURE
          </h2>
          <div className="w-12 h-[1px] bg-white/40 mx-auto" />
        </div>

        {/* Large Editorial Statement */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16 items-center mb-24">
          <div className="md:col-span-7">
            <p className="font-architectural text-xl sm:text-2xl md:text-3xl text-white font-light leading-relaxed tracking-wide mb-8">
              “Mirae creates architecture where quiet luxury, refined design and enduring craftsmanship come together.”
            </p>
            <p className="text-base text-[#b5b5b5] font-light leading-relaxed mb-6">
              From private residences and contemporary homes to resorts, hospitality spaces and landmark developments, every project is composed with a discerning eye for proportion, material, light and detail.
            </p>
            <p className="text-base text-[#9e9e9e] font-light leading-relaxed">
              The result is architecture that feels exclusive yet effortless, timeless yet distinctly contemporary — spaces crafted not simply to be seen, but to be experienced.
            </p>
          </div>

          <div className="md:col-span-5 relative aspect-[4/5] overflow-hidden border border-white/[0.08]">
            <img 
              src="/assets/images/brand/signature-mood.webp" 
              onError={(e) => { e.target.src = '/assets/images/signature-mood.jpg'; }}
              alt="MIRAE Studio Signature Atmosphere"
              className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-1000"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-xs font-mono-subtle text-white/80">
              MIRAE ARCHITECTURAL STUDIO • PMR INFRA
            </div>
          </div>
        </div>

        {/* 4 Architectural Pillars based on Brochure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-16 border-t border-white/[0.08]">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono-subtle text-subtle uppercase">
              <Compass className="w-4 h-4 text-white/70" />
              <span>PROPORTION & LIGHT</span>
            </div>
            <h4 className="font-architectural text-lg text-white font-light uppercase">
              Spatial Geometry
            </h4>
            <p className="text-xs text-[#a0a0a0] leading-relaxed">
              Calibrated volumetric forms designed around the sun's trajectory, illuminating architectural surfaces with natural poetry.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono-subtle text-subtle uppercase">
              <ShieldCheck className="w-4 h-4 text-white/70" />
              <span>CONSTRUCTION EXPERTISE</span>
            </div>
            <h4 className="font-architectural text-lg text-white font-light uppercase">
              50+ Years Heritage
            </h4>
            <p className="text-xs text-[#a0a0a0] leading-relaxed">
              Rooted in half a century of genuine structural engineering and construction mastery under PMR Infra LLP.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono-subtle text-subtle uppercase">
              <Eye className="w-4 h-4 text-white/70" />
              <span>QUIET LUXURY</span>
            </div>
            <h4 className="font-architectural text-lg text-white font-light uppercase">
              Restrained Elegance
            </h4>
            <p className="text-xs text-[#a0a0a0] leading-relaxed">
              Luxury that never shouts. Subtlety, bespoke joinery, tactile textures, and generous unhurried spatial breathing room.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono-subtle text-subtle uppercase">
              <Award className="w-4 h-4 text-white/70" />
              <span>ENDURING INTEGRITY</span>
            </div>
            <h4 className="font-architectural text-lg text-white font-light uppercase">
              Timeless Detailing
            </h4>
            <p className="text-xs text-[#a0a0a0] leading-relaxed">
              Materials chosen to patina with age: natural granite, honest timber, exposed concrete, and weather-defying metals.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
