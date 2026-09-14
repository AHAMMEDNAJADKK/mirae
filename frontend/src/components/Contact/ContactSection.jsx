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
      className="relative w-full bg-[#050505] text-[#f4f3ef] pt-16 sm:pt-20 md:pt-24 pb-10 sm:pb-12 px-5 sm:px-10 md:px-16 lg:px-20 border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[500px]">
        
        {/* Top Header Label */}
        <div className="flex items-center justify-between mb-10 sm:mb-16">
          <span className="text-xs font-mono-subtle text-white/60 tracking-[0.3em] uppercase font-medium">
            07. FOOTER / CONTACT
          </span>
          <span className="text-xs font-mono-subtle text-white/40">
            CONNECT WITH THE STUDIO
          </span>
        </div>

        {/* Architectural Brand Mark */}
        <div className="w-full text-center my-6 sm:my-10 flex flex-col items-center justify-center">
          <img 
            src="/assets/images/mirae-logo.png" 
            alt="MIRAE Arc Studio by PMR INFRA LLP" 
            className="h-14 sm:h-20 md:h-24 lg:h-28 w-auto object-contain mx-auto mb-4 sm:mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]" 
          />
          <div className="text-xs sm:text-sm font-mono-subtle text-amber-400 font-medium tracking-[0.3em] uppercase">
            50+ Years Of Real Construction Expertise
          </div>
        </div>

        {/* Center Row: Editorial Statement (Left) and Contact Coordinates (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-8 sm:my-12 items-end">
          
          {/* Left: Design Statement */}
          <div className="md:col-span-6 text-left">
            <p className="font-architectural text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight">
              Design is<br />
              thinking made<br />
              visual.
            </p>
          </div>

          {/* Right: Contact Coordinates */}
          <div className="md:col-span-6 flex flex-col sm:items-end space-y-4 text-xs font-mono-subtle text-[#c8c8c8]">
            <div className="flex items-center space-x-3">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <a href="tel:+919388330033" className="hover:text-white transition-colors tracking-wider">
                +91 9388330033
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <a href="mailto:miraearcstudio@gmail.com" className="hover:text-white transition-colors">
                miraearcstudio@gmail.com
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
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
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-7">
            <button onClick={() => scrollTo('hero')} className="hover:text-white transition-colors uppercase py-1">
              Home
            </button>
            <button onClick={() => scrollTo('about')} className="hover:text-white transition-colors uppercase py-1">
              About
            </button>
            <button onClick={() => scrollTo('exterior-layers')} className="hover:text-white transition-colors uppercase py-1">
              Exterior
            </button>
            <button onClick={() => scrollTo('interior')} className="hover:text-white transition-colors uppercase py-1">
              Interior
            </button>
            <button onClick={() => scrollTo('materials')} className="hover:text-white transition-colors uppercase py-1">
              Materials
            </button>
            <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors uppercase py-1">
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
