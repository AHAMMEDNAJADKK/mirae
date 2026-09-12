import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactSection() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer 
      id="contact" 
      className="relative w-full bg-[#050505] text-[#f4f3ef] pt-20 pb-12 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[500px]">
        
        {/* Top Header Label */}
        <div className="flex items-center justify-between mb-12 sm:mb-16">
          <span className="text-xs font-mono-subtle text-white/50 tracking-[0.3em] uppercase">
            07. FOOTER / CONTACT
          </span>
          <span className="text-xs font-mono-subtle text-white/40">
            CONNECT WITH THE STUDIO
          </span>
        </div>

        {/* Huge Architectural Brand Mark (Matching Panel 07 Reference) */}
        <div className="w-full text-center my-6">
          <h2 className="font-architectural text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] tracking-[0.25em] font-light text-white select-none leading-none">
            MIRAE
          </h2>
          <div className="mt-3 text-xs sm:text-sm font-mono-subtle text-amber-400/90 tracking-[0.3em] uppercase">
            MIRAE | arc (by PMR INFRA LLP)
          </div>
          <div className="mt-1 text-[11px] font-mono-subtle text-white/50 tracking-[0.25em] uppercase">
            50+ Years Of Real Construction Expertise
          </div>
        </div>

        {/* Center Row: Editorial Statement (Left) and Contact Coordinates (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-10 items-end">
          
          {/* Left: Design Statement */}
          <div className="md:col-span-6 text-left">
            <p className="font-architectural text-2xl sm:text-3xl md:text-4xl text-[#dfded9] font-light leading-snug">
              Design is<br />
              thinking made<br />
              visual.
            </p>
          </div>

          {/* Right: Contact Coordinates */}
          <div className="md:col-span-6 flex flex-col sm:items-end space-y-4 text-xs font-mono-subtle text-[#c8c8c8]">
            <div className="flex items-center space-x-3">
              <Phone className="w-3.5 h-3.5 text-white/60" />
              <a href="tel:+919388330033" className="hover:text-white transition-colors tracking-wider">
                +91 9388330033
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-3.5 h-3.5 text-white/60" />
              <a href="mailto:miraearcstudio@gmail.com" className="hover:text-white transition-colors">
                miraearcstudio@gmail.com
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="w-3.5 h-3.5 text-white/60" />
              <span>Malappuram, Kerala, India</span>
            </div>

            <div className="text-[10px] text-white/40 tracking-widest uppercase pt-1">
              50+ Years Of Real Construction Expertise • PMR INFRA LLP
            </div>
          </div>

        </div>

        {/* Bottom Bar: Navigation Links & Domain */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-subtle text-white/60">
          
          {/* Nav Links */}
          <div className="flex items-center space-x-6 sm:space-x-8">
            <button onClick={() => scrollTo('hero')} className="hover:text-white transition-colors uppercase">
              Home
            </button>
            <button onClick={() => scrollTo('about')} className="hover:text-white transition-colors uppercase">
              About
            </button>
            <button onClick={() => scrollTo('exterior-layers')} className="hover:text-white transition-colors uppercase">
              Exterior
            </button>
            <button onClick={() => scrollTo('interior')} className="hover:text-white transition-colors uppercase">
              Interior
            </button>
            <button onClick={() => scrollTo('materials')} className="hover:text-white transition-colors uppercase">
              Materials
            </button>
            <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors uppercase">
              Contact
            </button>
          </div>

          {/* Domain with arrow */}
          <div className="flex items-center space-x-2">
            <a 
              href="https://miraearc.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors group inline-flex items-center space-x-2"
            >
              <span>miraearc.com</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

        </div>

        {/* Copyright / Infra Info */}
        <div className="pt-4 text-center sm:text-left text-[10px] font-mono-subtle text-white/30">
          <span>© {new Date().getFullYear()} MIRAE | arc (by PMR INFRA LLP). ALL RIGHTS RESERVED.</span>
        </div>

      </div>
    </footer>
  );
}
