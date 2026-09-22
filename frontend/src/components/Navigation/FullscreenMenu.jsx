import React, { useEffect, useRef } from 'react';
import { X, ArrowUpRight, MapPin, Phone, Mail } from 'lucide-react';
import gsap from 'gsap';
import { scrollToPosition } from '../../animations/smoothScroll';

export default function FullscreenMenu({ isOpen, onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.to(menuRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.5,
        ease: 'power3.out'
      })
      .fromTo('.menu-item', {
        y: 40,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.3');
    } else {
      document.body.style.overflow = '';
      gsap.to(menuRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.4,
        ease: 'power3.in'
      });
    }
  }, [isOpen]);

  const handleLinkClick = (id) => {
    onClose();
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const navbarOffset = 76;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = id === 'hero' ? 0 : elementPosition - navbarOffset;
        scrollToPosition(offsetPosition, { duration: 1.0 });
      }
    }, 350);
  };

  return (
    <div 
      ref={menuRef}
      className="fixed inset-0 z-50 bg-[#080808]/98 backdrop-blur-2xl opacity-0 pointer-events-none p-4 sm:p-10 md:p-14 lg:p-16 2xl:px-12 2xl:py-16 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] overflow-y-auto max-h-[100dvh] transition-opacity"
    >
      <div className="w-full max-w-7xl 2xl:max-w-[1680px] mx-auto flex flex-col justify-between min-h-full">
        {/* Top Header inside menu */}
        <div className="flex justify-between items-center border-b border-white/[0.08] pb-3 sm:pb-6">
          <div className="flex items-center">
            <img 
              src="/assets/images/mirae-logo.webp" 
              alt="MIRAE" 
              className="h-[clamp(2rem,3.8vw,3.25rem)] 2xl:h-12 w-auto object-contain" 
              style={{ filter: 'invert(1)', aspectRatio: '1024 / 381' }}
            />
          </div>
          <button 
            onClick={onClose}
            aria-label="Close navigation overlay"
            className="group flex items-center space-x-2 text-xs font-pencrow font-medium tracking-widest text-subtle hover:text-white transition-colors p-2 cursor-pointer"
          >
            <span className="hidden sm:inline">CLOSE</span>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
              <X className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>

        {/* Main Nav Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 my-auto py-4 sm:py-8 2xl:py-12">
          <div className="md:col-span-8 flex flex-col space-y-1.5 sm:space-y-3 md:space-y-4">
            {[
              { label: '01 / HOME', target: 'hero' },
              { label: '02 / ARCHITECTURE', target: 'exterior-layers' },
              { label: '03 / INTERIORS', target: 'interior' },
              { label: '04 / MATERIALS', target: 'materials' },
              { label: '05 / PORTFOLIO', target: 'projects' },
              { label: '06 / ATELIER', target: 'studio' },
              { label: '07 / ABOUT', target: 'about' },
              { label: '08 / CONTACT', target: 'contact' },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleLinkClick(item.target)}
                className="menu-item group text-left flex items-baseline justify-between py-1 sm:py-1.5 border-b border-white/[0.04] hover:border-white/30 transition-all duration-300 cursor-pointer"
              >
                <span className="font-architectural text-lg sm:text-2xl md:text-3xl lg:text-5xl 2xl:text-6xl font-medium tracking-[0.05em] text-[#d4d4d4] group-hover:text-white transition-colors duration-300">
                  {item.label}
                </span>
                <ArrowUpRight className="w-4 h-4 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7 text-subtle opacity-0 group-hover:opacity-100 group-hover:text-white -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Sidebar Info */}
          <div className="md:col-span-4 flex flex-col justify-between border-l border-white/[0.06] pl-8 sm:pl-12 hidden md:flex">
            <div>
              <h4 className="text-xs font-pencrow font-medium text-subtle uppercase mb-4 tracking-widest">
                STUDIO LOCATION
              </h4>
              <p className="text-sm 2xl:text-base font-pencrow font-normal text-white leading-relaxed flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-subtle" />
                <span>Malappuram, Kerala</span>
              </p>
            </div>

            <div className="my-8">
              <h4 className="text-xs font-pencrow font-medium text-subtle uppercase mb-4 tracking-widest">
                DIRECT INQUIRIES
              </h4>
              <p className="text-sm 2xl:text-base font-pencrow font-normal text-white mb-2 flex items-center space-x-2">
                <Phone className="w-4 h-4 text-subtle" />
                <a href="tel:+919388330033" className="hover:underline">+91 9388330033</a>
              </p>
              <p className="text-sm 2xl:text-base font-pencrow font-normal text-white flex items-center space-x-2">
                <Mail className="w-4 h-4 text-subtle" />
                <a href="mailto:miraearcstudio@gmail.com" className="hover:underline">miraearcstudio@gmail.com</a>
              </p>
            </div>

            <div>
              <p className="text-xs 2xl:text-sm font-pencrow font-normal text-subtle uppercase leading-relaxed">
                "Spaces crafted not simply to be seen, but to be experienced."
              </p>
              <span className="text-[10px] 2xl:text-xs font-pencrow font-medium text-white/40 block mt-2 tracking-wider uppercase">
                50+ Years Of Real Construction Expertise
              </span>
            </div>
          </div>
        </div>

        {/* Footer Inside Menu */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs 2xl:text-sm font-pencrow text-subtle border-t border-white/[0.08] pt-4 sm:pt-6 mt-4 sm:mt-0">
          <span>© {new Date().getFullYear()} MIRAE ARC STUDIO. ALL RIGHTS RESERVED.</span>
          <span className="mt-2 sm:mt-0 tracking-widest font-pencrow font-medium">MIRAEARC.COM</span>
        </div>
      </div>
    </div>
  );
}
