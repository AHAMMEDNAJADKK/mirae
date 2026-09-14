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
          ? 'bg-black/95 backdrop-blur-md border-b border-white/[0.08] py-1 sm:py-1.5' 
          : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-1.5 sm:py-2.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
          <button 
            onClick={() => scrollToSection('hero')}
            className="flex items-center focus:outline-none group transition-opacity hover:opacity-90 py-0.5"
            aria-label="MIRAE Architecture Home"
          >
            <img 
              src="/assets/images/mirae-navbar-logo.webp" 
              alt="MIRAE Arc Studio" 
              className="h-16 sm:h-18 md:h-20 lg:h-24 xl:h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]" 
              style={{ filter: 'invert(1) hue-rotate(180deg)' }}
            />
          </button>

          {/* Desktop Navigation Links — Strictly Following Scroll Order with About as Final Main Item */}
          <nav className="hidden lg:flex items-center space-x-3.5 xl:space-x-6 text-xs font-mono-subtle" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative py-1 transition-colors duration-300 tracking-[0.16em] xl:tracking-[0.2em] uppercase text-[11px] xl:text-xs ${
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
        <div className="flex items-center space-x-4 sm:space-x-5">
          <button 
            onClick={() => scrollToSection('contact')}
            className={`hidden sm:inline-flex items-center text-[11px] font-mono-subtle tracking-[0.2em] uppercase transition-all duration-300 py-2 px-4 border ${
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
            className="p-2.5 min-w-[44px] min-h-[44px] text-white hover:text-amber-200 focus:outline-none flex flex-col items-end justify-center space-y-1.5 group cursor-pointer"
          >
            <span className="w-6 h-[1.5px] bg-white transition-all duration-300 group-hover:w-8 group-hover:bg-amber-300" />
            <span className="w-4 h-[1.5px] bg-white transition-all duration-300 group-hover:w-8 group-hover:bg-amber-300" />
          </button>
        </div>

      </div>
    </header>
  );
}
