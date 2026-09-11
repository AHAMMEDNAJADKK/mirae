import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenMenu }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-700 ${
        scrolled 
          ? 'bg-[#0a0a0a]/85 backdrop-blur-md border-b border-white/[0.06] py-4' 
          : 'bg-transparent py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 flex items-center justify-between">
        {/* Brand Logo / Typography */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="group flex flex-col focus:outline-none"
        >
          <span className="font-architectural text-xl sm:text-2xl tracking-[0.22em] text-[#f4f3ef] group-hover:text-white transition-colors duration-300">
            MIRAE
          </span>
          <span className="text-[9px] tracking-[0.25em] text-subtle uppercase -mt-1 group-hover:text-body transition-colors">
            arc studio
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-10 text-xs font-mono-subtle text-[#a0a0a0]">
          <button 
            onClick={() => scrollToSection('journey')}
            className="hover:text-white transition-colors tracking-widest relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
          >
            JOURNEY
          </button>
          <button 
            onClick={() => scrollToSection('interior')}
            className="hover:text-white transition-colors tracking-widest relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
          >
            INTERIORS
          </button>
          <button 
            onClick={() => scrollToSection('materials')}
            className="hover:text-white transition-colors tracking-widest relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
          >
            MATERIALS
          </button>
          <button 
            onClick={() => scrollToSection('projects')}
            className="hover:text-white transition-colors tracking-widest relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
          >
            PORTFOLIO
          </button>
          <button 
            onClick={() => scrollToSection('philosophy')}
            className="hover:text-white transition-colors tracking-widest relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
          >
            ABOUT
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="hover:text-white transition-colors tracking-widest relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
          >
            CONTACT
          </button>
        </nav>

        {/* Right CTA / Menu Trigger */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => scrollToSection('contact')}
            className="hidden lg:inline-flex items-center space-x-2 text-xs font-mono-subtle border border-white/20 hover:border-white px-4 py-2 transition-all duration-300 tracking-wider hover:bg-white hover:text-black"
          >
            <span>INQUIRE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Hamburger / Menu toggle for all screens */}
          <button
            onClick={onOpenMenu}
            aria-label="Open Navigation Menu"
            className="p-2 text-[#f4f3ef] hover:text-white focus:outline-none flex items-center space-x-2 group"
          >
            <span className="text-[11px] font-mono-subtle hidden sm:inline-block text-subtle group-hover:text-white transition-colors">
              MENU
            </span>
            <div className="w-6 h-4 flex flex-col justify-between items-end">
              <span className="w-6 h-[1px] bg-white transition-all group-hover:w-4" />
              <span className="w-4 h-[1px] bg-white transition-all group-hover:w-6" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
