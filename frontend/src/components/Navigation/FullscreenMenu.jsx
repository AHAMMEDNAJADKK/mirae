import React, { useEffect, useRef } from 'react';
import { X, ArrowUpRight, MapPin, Phone, Mail } from 'lucide-react';
import gsap from 'gsap';

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
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);
  };

  return (
    <div 
      ref={menuRef}
      className="fixed inset-0 z-50 bg-[#080808]/98 backdrop-blur-2xl opacity-0 pointer-events-none flex flex-col justify-between p-8 sm:p-12 md:p-16 transition-opacity"
    >
      {/* Top Header inside menu */}
      <div className="flex justify-between items-center border-b border-white/[0.08] pb-6">
        <div>
          <span className="font-architectural text-2xl tracking-[0.25em] text-[#f4f3ef]">
            MIRAE
          </span>
          <span className="text-[10px] tracking-[0.3em] text-subtle block uppercase">
            arc studio • by PMR INFRA LLP
          </span>
        </div>
        <button 
          onClick={onClose}
          aria-label="Close navigation overlay"
          className="group flex items-center space-x-2 text-xs font-mono-subtle text-subtle hover:text-white transition-colors"
        >
          <span>CLOSE</span>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
            <X className="w-4 h-4 text-white" />
          </div>
        </button>
      </div>

      {/* Main Nav Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 my-auto py-8">
        <div className="md:col-span-8 flex flex-col space-y-4 sm:space-y-6">
          {[
            { label: '01 / HOME & DRONE VIEW', target: 'hero' },
            { label: '02 / EXTERIOR LAYERS', target: 'exterior-layers' },
            { label: '03 / INTERIOR ROOMS', target: 'interior' },
            { label: '04 / TIMELESS MATERIALS', target: 'materials' },
            { label: '05 / SELECTED PORTFOLIO', target: 'projects' },
            { label: '06 / THE ATELIER & STUDIO', target: 'studio' },
            { label: '07 / BRAND STORY', target: 'about' },
            { label: '08 / CONTACT & COMMISSIONS', target: 'contact' },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleLinkClick(item.target)}
              className="menu-item group text-left flex items-baseline justify-between py-2 border-b border-white/[0.04] hover:border-white/30 transition-all duration-300"
            >
              <span className="font-architectural text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.08em] text-[#b5b5b5] group-hover:text-white transition-colors duration-300">
                {item.label}
              </span>
              <ArrowUpRight className="w-6 h-6 text-subtle opacity-0 group-hover:opacity-100 group-hover:text-white -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* Sidebar Info */}
        <div className="md:col-span-4 flex flex-col justify-between border-l border-white/[0.06] pl-8 sm:pl-12 hidden md:flex">
          <div>
            <h4 className="text-xs font-mono-subtle text-subtle uppercase mb-4 tracking-widest">
              STUDIO LOCATION
            </h4>
            <p className="text-sm font-light text-white leading-relaxed flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-subtle" />
              <span>Malappuram, Kerala</span>
            </p>
          </div>

          <div className="my-8">
            <h4 className="text-xs font-mono-subtle text-subtle uppercase mb-4 tracking-widest">
              DIRECT INQUIRIES
            </h4>
            <p className="text-sm font-light text-white mb-2 flex items-center space-x-2">
              <Phone className="w-4 h-4 text-subtle" />
              <a href="tel:+919388330033" className="hover:underline">+91 9388330033</a>
            </p>
            <p className="text-sm font-light text-white flex items-center space-x-2">
              <Mail className="w-4 h-4 text-subtle" />
              <a href="mailto:miraearcstudio@gmail.com" className="hover:underline">miraearcstudio@gmail.com</a>
            </p>
          </div>

          <div>
            <p className="text-xs font-mono-subtle text-subtle uppercase leading-relaxed">
              "Spaces crafted not simply to be seen, but to be experienced."
            </p>
            <span className="text-[10px] text-white/40 block mt-2">
              50+ Years Of Real Construction Expertise
            </span>
          </div>
        </div>
      </div>

      {/* Footer Inside Menu */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-xs font-mono-subtle text-subtle border-t border-white/[0.08] pt-6">
        <span>© {new Date().getFullYear()} MIRAE ARC STUDIO. ALL RIGHTS RESERVED.</span>
        <span className="mt-2 sm:mt-0 tracking-widest">MIRAEARC.COM</span>
      </div>
    </div>
  );
}
