import React, { useState, useEffect } from 'react';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'exterior-layers', label: 'Architecture' },
  { id: 'interior', label: 'Interiors' },
  { id: 'materials', label: 'Materials' },
  { id: 'projects', label: 'Portfolio' },
  { id: 'studio', label: 'Atelier' },
  { id: 'about', label: 'About' },
];

export default function Navbar({ onOpenMenu }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sectionIds = ['hero', 'exterior-layers', 'interior', 'materials', 'projects', 'studio', 'about', 'contact'];
      const scrollPos = window.scrollY + 140;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarOffset = 76;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = id === 'hero' ? 0 : elementPosition - navbarOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-md border-b border-white/[0.08] py-4' 
          : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5 sm:py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-8 lg:space-x-12">
          <button 
            onClick={() => scrollToSection('hero')}
            className="font-architectural text-xl sm:text-2xl tracking-[0.25em] text-white focus:outline-none uppercase font-light hover:text-amber-200 transition-colors"
            aria-label="MIRAE Architecture Home"
          >
            MIRAE
          </button>

          {/* Desktop Navigation Links — Strictly Following Scroll Order with About as Final Main Item */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs font-mono-subtle" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative py-1 transition-colors duration-300 tracking-[0.2em] uppercase text-[11px] ${
                    isActive ? 'text-white font-medium' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-amber-400/90 transition-all duration-300" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Action Group: Contact CTA + Mobile/Fullscreen Hamburger */}
        <div className="flex items-center space-x-5">
          <button 
            onClick={() => scrollToSection('contact')}
            className={`hidden sm:inline-flex items-center text-[11px] font-mono-subtle tracking-[0.2em] uppercase transition-all duration-300 py-1.5 px-3.5 border ${
              activeSection === 'contact' 
                ? 'border-amber-400 text-amber-300 bg-amber-400/10 shadow-[0_0_12px_rgba(251,191,36,0.15)]' 
                : 'border-white/20 text-white/80 hover:text-white hover:border-white'
            }`}
          >
            Contact
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={onOpenMenu}
            aria-label="Toggle Full Navigation Menu"
            className="p-2 text-white hover:text-amber-200 focus:outline-none flex flex-col items-end justify-center space-y-1.5 group cursor-pointer"
          >
            <span className="w-6 h-[1.5px] bg-white transition-all duration-300 group-hover:w-8 group-hover:bg-amber-300" />
            <span className="w-4 h-[1.5px] bg-white transition-all duration-300 group-hover:w-8 group-hover:bg-amber-300" />
          </button>
        </div>

      </div>
    </header>
  );
}
