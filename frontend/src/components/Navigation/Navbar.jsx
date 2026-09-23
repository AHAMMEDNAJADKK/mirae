import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToPosition } from '../../animations/smoothScroll';

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
      const aspectRatio = 1024 / 381; // ~2.6877

      const dockRect = logoBtnRef.current.getBoundingClientRect();
      const dockWidth = dockRect.width || (dockRect.height ? dockRect.height * aspectRatio : (vw < 640 ? 150 : (vw < 1024 ? 185 : 230)));
      const dockCenterX = dockRect.left + dockRect.width / 2;
      const dockCenterY = dockRect.top + dockRect.height / 2;

      // Mathematically fluid hero logo sizing responding to BOTH width and height:
      // Stronger visual presence: occupies ~84% on mobile, ~62% on tablet/foldable, up to 45% on desktop
      const widthIdeal = vw < 640 ? vw * 0.82 : (vw < 1024 ? vw * 0.62 : (vw >= 1536 ? Math.min(vw * 0.42, 820) : Math.min(vw * 0.45, 720)));
      // Height bounds: logo height in hero should never exceed ~18% of vh (or 22% on short landscape screens, up to 20% on large 1080p desktop)
      const heightIdealWidth = vh * (vh < 600 ? 0.22 : (vw >= 1536 ? 0.20 : 0.18)) * aspectRatio;
      // Combined fluid width constrained by both axes
      const fluidWidth = Math.min(widthIdeal, heightIdealWidth);
      // Absolute clamp bounds: min 200px (safe for narrow 320px screens) to max 820px (for large desktop)
      const maxClamp = vw >= 1536 ? 820 : 720;
      const targetHeroWidth = Math.max(200, Math.min(Math.min(maxClamp, vw * 0.85), fluidWidth));
      const heroScale = Math.max(1.15, targetHeroWidth / dockWidth);

      // Continuous safe-area aware optical vertical positioning
      const safeTop = Math.max(dockRect.top, 16);
      const isLandscape = vw > vh && vh < 600;
      const yRatio = isLandscape ? 0.32 : (vw < 640 ? 0.38 : (vw < 1024 ? 0.42 : 0.45));
      const targetCenterY = safeTop + (vh - safeTop) * yRatio;

      const deltaX = (vw / 2) - dockCenterX;
      const deltaY = targetCenterY - dockCenterY;

      // Initial state based on current scroll position
      const initialScroll = window.scrollY;
      const progress = Math.min(1, Math.max(0, initialScroll / 480));
      const easeP = 1 - Math.pow(1 - progress, 1.35);

      gsap.set(logoBtnRef.current, {
        x: deltaX * (1 - easeP),
        y: deltaY * (1 - easeP),
        scale: 1 + (heroScale - 1) * (1 - easeP),
        transformOrigin: 'center center'
      });

      if (navRightRef.current) {
        const navP = Math.max(0, (progress - 0.4) / 0.6);
        gsap.set(navRightRef.current, {
          opacity: navP,
          y: -8 * (1 - navP),
          pointerEvents: navP > 0.8 ? 'auto' : 'none'
        });
      }

      // Smooth scroll interpolation via ScrollTrigger matching State 1 arrival
      currentST = ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: '+=480',
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
            const navP = Math.max(0, (p - 0.4) / 0.6);
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
    window.addEventListener('orientationchange', handleResize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    }

    return () => {
      if (currentST) currentST.kill();
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
    };
  }, [isLoaded]);

  // Backscroll visibility & active section tracking
  const pastHeroRef = useRef(false);
  const activeSecRef = useRef('hero');
  const isNavVisRef = useRef(true);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const delta = currentScrollY - lastScrollY.current;

          const inHero = currentScrollY <= 650;
          const pastHero = !inHero;
          if (pastHero !== pastHeroRef.current) {
            pastHeroRef.current = pastHero;
            setIsScrolledPastHero(pastHero);
          }

          if (inHero) {
            // Inside Hero: always visible & transparent
            if (!isNavVisRef.current) {
              isNavVisRef.current = true;
              setIsNavVisible(true);
            }
          } else if (delta > 6) {
            // Scrolling down past Hero: smoothly hide navbar
            if (isNavVisRef.current) {
              isNavVisRef.current = false;
              setIsNavVisible(false);
            }
          } else if (delta < -6) {
            // Backscroll (scrolling up) past Hero: smoothly reveal navbar
            if (!isNavVisRef.current) {
              isNavVisRef.current = true;
              setIsNavVisible(true);
            }
          }

          lastScrollY.current = currentScrollY;

          // Active section tracking (guarded across all sections)
          const sectionIds = ['hero', 'exterior-layers', 'interior', 'materials', 'projects', 'studio', 'about', 'contact'];
          const scrollPos = currentScrollY + 140;

          for (let i = sectionIds.length - 1; i >= 0; i--) {
            const el = document.getElementById(sectionIds[i]);
            if (el) {
              const topPos = el.getBoundingClientRect().top + currentScrollY;
              if (topPos <= scrollPos) {
                if (activeSecRef.current !== sectionIds[i]) {
                  activeSecRef.current = sectionIds[i];
                  setActiveSection(sectionIds[i]);
                }
                break;
              }
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
      scrollToPosition(offsetPosition, { duration: 1 });
    }
  };

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ease-out transform pt-[env(safe-area-inset-top)] ${
        isScrolledPastHero
          ? 'py-1 sm:py-1.5 bg-black/80 backdrop-blur-md border-b border-white/[0.08] shadow-2xl'
          : 'py-2 sm:py-3 bg-transparent border-b border-transparent shadow-none'
      } ${
        isNavVisible 
          ? 'translate-y-0 opacity-100 pointer-events-auto' 
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="w-full flex items-center justify-between px-4 sm:px-8 lg:px-12 xl:px-14 2xl:px-[clamp(3.5rem,5vw,10rem)] max-w-[3840px] mx-auto">
        
        {/* Brand Logo Dock Container (Left) — Single Continuous New Logo (aligned to margin on xl and 2xl) */}
        <div className="flex items-center -translate-x-1 sm:-translate-x-2 md:-translate-x-3 lg:-translate-x-4 xl:translate-x-0 2xl:translate-x-0">
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
              className="h-[clamp(3.35rem,calc(2.9rem+1.8vw),3.95rem)] sm:h-[clamp(4rem,calc(3.4rem+1.3vw),4.85rem)] lg:h-[clamp(3.75rem,calc(3rem+2.5vw),5.75rem)] 2xl:h-[6.5rem] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]" 
              style={{ filter: 'invert(1)', aspectRatio: '1024 / 381' }}
              onLoad={() => {
                window.dispatchEvent(new Event('resize'));
              }}
            />
          </button>
        </div>

        {/* Right Navigation Group: PROJECTS  ABOUT  CONTACT  ☰ */}
        <div ref={navRightRef} className="flex items-center space-x-6 sm:space-x-8 md:space-x-10 2xl:space-x-12 will-change-transform">
          <nav 
            className="hidden sm:flex items-center space-x-6 sm:space-x-8 md:space-x-10 2xl:space-x-12 text-xs 2xl:text-[13px] font-pencrow font-medium" 
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
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-mirae-orange/90 transition-all duration-300" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Architectural Hamburger Menu Toggle (☰) */}
          <button
            onClick={onOpenMenu}
            aria-label="Toggle Full Navigation Menu"
            className="p-1.5 sm:p-2 min-w-[38px] min-h-[38px] text-white hover:text-neutral-200 focus:outline-none flex flex-col items-end justify-center space-y-1.5 group cursor-pointer transition-colors duration-300"
          >
            <span className="w-5 sm:w-6 h-[1.5px] bg-white transition-all duration-300 group-hover:w-6 sm:group-hover:w-7 group-hover:bg-mirae-orange" />
            <span className="w-3.5 sm:w-4.5 h-[1.5px] bg-white transition-all duration-300 group-hover:w-6 sm:group-hover:w-7 group-hover:bg-mirae-orange" />
          </button>
        </div>

      </div>
    </header>
  );
}
