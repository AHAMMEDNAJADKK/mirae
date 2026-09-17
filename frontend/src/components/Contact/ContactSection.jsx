import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { scrollToPosition } from '../../animations/smoothScroll';

export default function ContactSection() {
  const scrollTo = (id) => {
    scrollToPosition('#' + id, { duration: 1.0 });
  };

  return (
    <footer 
      id="contact" 
      className="relative w-full bg-[#050505] text-[#f4f3ef] pt-12 sm:pt-20 md:pt-24 pb-8 sm:pb-12 px-4 sm:px-8 md:px-14 lg:px-20 border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[400px] sm:min-h-[500px]">
        
        {/* Architectural Brand Mark */}
        <div className="w-full text-center my-4 sm:my-10 flex flex-col items-center justify-center">
          <img 
            src="/assets/images/mirae-logo.png" 
            alt="MIRAE Arc Studio by PMR INFRA LLP" 
            className="h-10 sm:h-16 md:h-20 lg:h-24 w-auto object-contain mx-auto mb-3 sm:mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]" 
          />
          <div className="text-[10px] sm:text-xs font-pencrow text-mirae-orange font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase">
            50+ Years Of Real Construction Expertise
          </div>
        </div>

        {/* Center Row: Editorial Statement (Left) and Contact Coordinates (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 my-6 sm:my-12 items-end">
          
          {/* Left: Design Statement */}
          <div className="md:col-span-6 text-left">
            <p className="font-architectural text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight">
              Design is<br />
              thinking made<br />
              visual.
            </p>
          </div>

          {/* Right: Contact Coordinates */}
          <div className="md:col-span-6 flex flex-col sm:items-end space-y-3.5 sm:space-y-4 text-xs font-pencrow text-[#c8c8c8]">
            <div className="flex items-center space-x-3">
              <Phone className="w-3.5 h-3.5 text-mirae-orange shrink-0" />
              <a href="tel:+919388330033" className="hover:text-white transition-colors tracking-wider font-pencrow py-0.5">
                +91 9388330033
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-3.5 h-3.5 text-mirae-orange shrink-0" />
              <a href="mailto:miraearcstudio@gmail.com" className="hover:text-white transition-colors font-pencrow break-all sm:break-normal py-0.5">
                miraearcstudio@gmail.com
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="w-3.5 h-3.5 text-mirae-orange shrink-0" />
              <span className="font-pencrow">Malappuram, Kerala, India</span>
            </div>

            <div className="text-[10px] text-white/40 tracking-widest uppercase pt-1 font-pencrow">
              50+ Years Of Real Construction Expertise • PMR INFRA LLP
            </div>
          </div>

        </div>

        {/* Bottom Bar: Navigation Links & Domain */}
        <div className="pt-6 sm:pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-pencrow text-white/60">
          
          {/* Nav Links */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-7">
            <button onClick={() => scrollTo('hero')} className="hover:text-white transition-colors uppercase py-1.5 px-1 font-pencrow font-medium tracking-wider cursor-pointer">
              Home
            </button>
            <button onClick={() => scrollTo('about')} className="hover:text-white transition-colors uppercase py-1.5 px-1 font-pencrow font-medium tracking-wider cursor-pointer">
              About
            </button>
            <button onClick={() => scrollTo('exterior-layers')} className="hover:text-white transition-colors uppercase py-1.5 px-1 font-pencrow font-medium tracking-wider cursor-pointer">
              Exterior
            </button>
            <button onClick={() => scrollTo('interior')} className="hover:text-white transition-colors uppercase py-1.5 px-1 font-pencrow font-medium tracking-wider cursor-pointer">
              Interior
            </button>
            <button onClick={() => scrollTo('materials')} className="hover:text-white transition-colors uppercase py-1.5 px-1 font-pencrow font-medium tracking-wider cursor-pointer">
              Materials
            </button>
            <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors uppercase py-1.5 px-1 font-pencrow font-medium tracking-wider cursor-pointer">
              Contact
            </button>
          </div>

          {/* Domain with arrow */}
          <div className="flex items-center space-x-2">
            <a 
              href="https://miraearc.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors group inline-flex items-center space-x-2 font-pencrow font-medium tracking-wider py-1"
            >
              <span>miraearc.com</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

        </div>

        {/* Copyright / Infra Info */}
        <div className="pt-4 text-center sm:text-left text-[10px] font-pencrow text-white/30 tracking-wider">
          <span>© {new Date().getFullYear()} MIRAE | arc (by PMR INFRA LLP). ALL RIGHTS RESERVED.</span>
        </div>

      </div>
    </footer>
  );
}
