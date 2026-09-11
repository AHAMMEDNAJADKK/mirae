import React from 'react';

export default function BrandStory() {
  return (
    <section 
      id="about" 
      className="relative w-full bg-[#080808] text-[#f4f3ef] py-16 sm:py-24 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Label */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <span className="text-xs font-mono-subtle text-white/50 tracking-[0.3em] uppercase">
            06. BRAND STORY / ABOUT
          </span>
          <div className="hidden sm:block text-xs font-mono-subtle text-white/40">
            OUR PHILOSOPHY
          </div>
        </div>

        {/* Two-Column Layout (Matching Panel 06 Reference) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left: Text & CTA */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 text-left">
            <h2 className="font-architectural text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-[0.04em] leading-[1.08]">
              More than buildings,<br />
              <span className="italic font-editorial tracking-[0.06em]">we create experiences.</span>
            </h2>
            
            <p className="text-xs sm:text-sm font-light text-[#b0b0b0] leading-relaxed max-w-lg">
              With over 50 years of expertise, Mirae has grown into a trusted name in architecture and construction, known for its timeless designs, uncompromising quality and deep connection to nature and people.
            </p>

            <div className="pt-4">
              <button 
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center space-x-3 text-xs font-mono-subtle tracking-[0.25em] uppercase text-white hover:text-[#d0cfcb] transition-colors duration-300"
              >
                <span>Our Story</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-2 text-sm">———→</span>
              </button>
            </div>
          </div>

          {/* Right: Architecture & Nature Photography (Monochrome/B&W) */}
          <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] w-full overflow-hidden bg-black/60 border border-white/[0.08]">
            <img 
              src="/assets/images/about/about-architecture.webp"
              onError={(e) => { e.target.src = '/assets/images/about/about-architecture.jpg'; }}
              alt="MIRAE Architecture & Nature Dialogue"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
}
