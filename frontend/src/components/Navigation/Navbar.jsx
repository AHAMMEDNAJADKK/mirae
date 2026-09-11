import React, { useState, useEffect } from 'react';

export default function Navbar({ onOpenMenu }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
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
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/85 backdrop-blur-md border-b border-white/[0.08] py-4' 
          : 'bg-transparent py-6 sm:py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 flex items-center justify-between">
        
        {/* Brand Logo (Matching Reference) */}
        <div className="flex items-center space-x-12">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-architectural text-xl sm:text-2xl tracking-[0.25em] text-white focus:outline-none uppercase font-light"
          >
            MIRAE
          </button>

          {/* Desktop Navigation Links (Home, About, Projects, Services, Contact) */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-mono-subtle text-white/70">
            <button 
              onClick={() => scrollToSection('hero')}
              className="hover:text-white transition-colors tracking-widest uppercase"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="hover:text-white transition-colors tracking-widest uppercase"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('exterior-layers')}
              className="hover:text-white transition-colors tracking-widest uppercase"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('materials')}
              className="hover:text-white transition-colors tracking-widest uppercase"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="hover:text-white transition-colors tracking-widest uppercase"
            >
              Contact
            </button>
          </nav>
        </div>

        {/* Right Hamburger Icon (Subtle horizontal lines from reference) */}
        <div className="flex items-center space-x-6">
          <button
            onClick={onOpenMenu}
            aria-label="Toggle Navigation Menu"
            className="p-2 text-white hover:text-white/70 focus:outline-none flex flex-col items-end justify-center space-y-1.5 group cursor-pointer"
          >
            <span className="w-6 h-[1.5px] bg-white transition-all duration-300 group-hover:w-8" />
            <span className="w-4 h-[1.5px] bg-white transition-all duration-300 group-hover:w-8" />
          </button>
        </div>

      </div>
    </header>
  );
}
