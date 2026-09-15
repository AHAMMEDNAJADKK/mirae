import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ onOpenMenu, isLoaded }) {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  
  const headerRef = useRef(null);
  const logoBtnRef = useRef(null);
  const logoImgRef = useRef(null);
  const navRightRef = useRef(null);
  const lastScrollY = useRef(0);

  // GSAP ScrollTrigger continuous single-element logo translation & scaling (Single Logo from Hero to Navbar)
  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (navRightRef.current) {
        navRightRef.current.style.opacity = '1';
        navRightRef.current.style.pointerEvents = 'auto';
      }
      return;
    }

    let currentST = null;

    const initLogoTransition = () => {
      if (currentST) currentST.kill();
      if (!logoBtnRef.current) return;

      // Clear transform to measure true docked layout position
      gsap.set(logoBtnRef.current, { clearProps: 'transform,transformOrigin' });
      if (navRightRef.current) {
        gsap.set(navRightRef.current, { clearProps: 'opacity,transform,pointerEvents' });
      }

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isMobile = vw < 640;
      const isTablet = vw >= 640 && vw < 1024;

      const dockRect = logoBtnRef.current.getBoundingClientRect();
      const dockCenterX = dockRect.left + dockRect.width / 2;
      const dockCenterY = dockRect.top + dockRect.height / 2;

      // Center of viewport for initial brand introduction state
      const targetCenterX = vw / 2;
      const targetCenterY = vh * 0.48; // Optical vertical center

      const deltaX = targetCenterX - dockCenterX;
      const deltaY = targetCenterY - dockCenterY;

      // Prominent, dignified scaling for the new logo in the Hero
      const heroScale = isMobile ? 1.7 : (isTablet ? 1.85 : 2.0);

      // Initial state based on current scroll position
      const initialScroll = window.scrollY;
      const progress = Math.min(1, Math.max(0, initialScroll / 400));
      const easeP = 1 - Math.pow(1 - progress, 1.35);

      gsap.set(logoBtnRef.current, {
        x: deltaX * (1 - easeP),
        y: deltaY * (1 - easeP),
        scale: 1 + (heroScale - 1) * (1 - easeP),
        transformOrigin: 'center center'
      });

      if (navRightRef.current) {
        const navP = Math.max(0, (progress - 0.45) / 0.55);
        gsap.set(navRightRef.current, {
          opacity: navP,
          y: -8 * (1 - navP),
          pointerEvents: navP > 0.8 ? 'auto' : 'none'
        });
      }

      // Smooth scroll interpolation via ScrollTrigger (400px cinematic breathing room)
      currentST = ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: '+=400',
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress; // 0 to 1
          const easeProgress = 1 - Math.pow(1 - p, 1.35);

          gsap.set(logoBtnRef.current, {
            x: deltaX * (1 - easeProgress),
            y: deltaY * (1 - easeProgress),
            scale: 1 + (heroScale - 1) * (1 - easeProgress),
            transformOrigin: 'center center'
          });

          if (navRightRef.current) {
            const navP = Math.max(0, (p - 0.45) / 0.55);
            gsap.set(navRightRef.current, {
              opacity: navP,
              y: -8 * (1 - navP),
              pointerEvents: navP > 0.8 ? 'auto' : 'none'
            });
          }
        }
      });
    };

    initLogoTransition();

    let resizeTimer = null;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initLogoTransition, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (currentST) currentST.kill();
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoaded]);

  // Backscroll visibility & active section tracking
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const delta = currentScrollY - lastScrollY.current;

          const inHero = currentScrollY <= 650;
          setIsScrolledPastHero(!inHero);

          if (inHero) {
            // Inside Hero: always visible & transparent
            setIsNavVisible(true);
          } else if (delta > 4) {
            // Scrolling down past Hero: smoothly hide navbar
            setIsNavVisible(false);
          } else if (delta < -4) {
            // Backscroll (scrolling up) past Hero: smoothly reveal navbar
            setIsNavVisible(true);
          }

          lastScrollY.current = currentScrollY;

          // Active section tracking
          const sectionIds = ['hero', 'projects', 'about', 'contact'];
          const scrollPos = currentScrollY + 140;

          for (let i = sectionIds.length - 1; i >= 0; i--) {
            const el = document.getElementById(sectionIds[i]);
            if (el && el.offsetTop <= scrollPos) {
              setActiveSection(sectionIds[i]);
              break;
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ease-out transform ${
        isScrolledPastHero
          ? 'py-1 sm:py-1.5 bg-black/80 backdrop-blur-md border-b border-white/[0.08] shadow-2xl'
          : 'py-2 sm:py-3 bg-transparent border-b border-transparent shadow-none'
      } ${
        isNavVisible 
          ? 'translate-y-0 opacity-100 pointer-events-auto' 
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        
        {/* Brand Logo Dock Container (Left) — Single Continuous New Logo */}
        <div className="flex items-center">
          <button 
            ref={logoBtnRef}
            onClick={() => scrollToSection('hero')}
            className="flex items-center focus:outline-none group transition-opacity hover:opacity-90 py-0 will-change-transform"
            aria-label="MIRAE Architecture Home"
          >
            <img 
              ref={logoImgRef}
              src="/assets/images/mirae-hero-logo.webp" 
              alt="MIRAE" 
              className="h-16 sm:h-20 md:h-20 lg:h-24 xl:h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]" 
              style={{ filter: 'invert(1) hue-rotate(180deg)', aspectRatio: '1024 / 381' }}
              onLoad={() => {
                window.dispatchEvent(new Event('resize'));
              }}
            />
          </button>
        </div>

        {/* Right Navigation Group: PROJECTS  ABOUT  CONTACT  ☰ */}
        <div ref={navRightRef} className="flex items-center space-x-6 sm:space-x-8 md:space-x-10 will-change-transform">
          <nav 
            className="hidden sm:flex items-center space-x-6 sm:space-x-8 md:space-x-10 text-xs font-pencrow font-medium" 
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative py-1 transition-colors duration-300 tracking-[0.2em] uppercase text-[11px] sm:text-xs font-pencrow ${
                    isActive ? 'text-white font-semibold' : 'text-neutral-300 hover:text-white font-medium'
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

          {/* Architectural Hamburger Menu Toggle (☰) */}
          <button
            onClick={onOpenMenu}
            aria-label="Toggle Full Navigation Menu"
            className="p-1.5 sm:p-2 min-w-[38px] min-h-[38px] text-white hover:text-amber-200 focus:outline-none flex flex-col items-end justify-center space-y-1.5 group cursor-pointer transition-colors duration-300"
          >
            <span className="w-5 sm:w-6 h-[1.5px] bg-white transition-all duration-300 group-hover:w-6 sm:group-hover:w-7 group-hover:bg-amber-300" />
            <span className="w-3.5 sm:w-4.5 h-[1.5px] bg-white transition-all duration-300 group-hover:w-6 sm:group-hover:w-7 group-hover:bg-amber-300" />
          </button>
        </div>

      </div>
    </header>
  );
}
