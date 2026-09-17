import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { preloadSingleImage } from '../../utils/imagePreloader';
import { scrollToPosition, getLenis } from '../../animations/smoothScroll';

gsap.registerPlugin(ScrollTrigger);

export default function HeroExperience() {
  const containerRef = useRef(null);
  const imageLayerRef = useRef(null);
  const heroContentRef = useRef(null);

  // Controlled Hero Scroll State Machine refs
  const heroStateRef = useRef(0); // 0 = Initial, 1 = Text Focus, 2 = Next Section
  const isAnimatingRef = useRef(false);
  const lastGestureTimeRef = useRef(0);
  const touchStartYRef = useRef(0);
  const touchStartXRef = useRef(0);
  const touchScrollStartRef = useRef(0);

  useEffect(() => {
    preloadSingleImage('/assets/images/hero/mirae-hero-bg.jpg');
    preloadSingleImage('/assets/images/exterior/exterior-roof.webp');
  }, []);

  const getHeroMetrics = () => {
    if (!containerRef.current) return { state0: 0, state1: 500, state2: 1000 };
    const vh = window.innerHeight;
    const heroHeight = containerRef.current.offsetHeight;
    const maxHeroScroll = Math.max(1, heroHeight - vh);
    // State 1 is placed at progress ~0.50 (the center of the text focus plateau)
    const state1 = Math.round(maxHeroScroll * 0.50);
    const state2 = maxHeroScroll;
    return { state0: 0, state1, state2 };
  };

  const getCurrentScrollY = () => {
    const lenis = getLenis();
    if (lenis && typeof lenis.scroll === 'number') {
      return Math.round(lenis.scroll);
    }
    return Math.round(window.scrollY);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Set initial hidden state for headline & CTA at scroll = 0
      gsap.set(heroContentRef.current, { opacity: 0, y: 32, pointerEvents: 'none' });

      // 1. Initial Cinematic Image Entrance
      if (!prefersReducedMotion) {
        gsap.fromTo(imageLayerRef.current,
          { scale: 1.04, opacity: 0 },
          { scale: 1.0, opacity: 1, duration: 1.2, ease: 'power2.out' }
        );
      } else {
        gsap.to(imageLayerRef.current, { opacity: 1, duration: 0.8 });
      }

      // 2. Structured Cinematic Scroll Scrub Sequence with Stable Text Plateau
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;
            if (heroContentRef.current) {
              heroContentRef.current.style.pointerEvents = (p >= 0.32 && p <= 0.68) ? 'auto' : 'none';
            }
          }
        }
      });

      if (!prefersReducedMotion) {
        scrollTl
          // Phase 1: Reveal headline & CTA gradually as logo docks into navbar (progress 0.04 -> 0.38)
          .fromTo(heroContentRef.current,
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, ease: 'power2.out', duration: 0.34 },
            0.04
          )
          // Phase 2: Settled viewing window across State 1 (progress 0.38 -> 0.66)
          // State 1 stopping point is centered right here at progress 0.50
          .to(heroContentRef.current, { opacity: 1, y: 0, duration: 0.28 }, 0.38)
          // Phase 3: Transition out into ExteriorLayers (progress 0.66 -> 1.0)
          .to(heroContentRef.current,
            { opacity: 0, y: -30, ease: 'power2.in', duration: 0.34 },
            0.66
          )
          .to(imageLayerRef.current,
            { scale: 1.08, ease: 'none', duration: 0.34 },
            0.66
          );
      } else {
        scrollTl
          .fromTo(heroContentRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.04)
          .to(heroContentRef.current, { opacity: 1, duration: 0.28 }, 0.38)
          .to(heroContentRef.current, { opacity: 0, duration: 0.34 }, 0.66);
      }

    }, containerRef);

    // 3. Controlled Hero Scroll Progression (Wheel, Touch, Keypad)
    const handleWheel = (e) => {
      const { state0, state1, state2 } = getHeroMetrics();
      const currentY = getCurrentScrollY();

      // When scrolled past Hero into subsequent sections, allow 100% free native scroll
      if (currentY >= state2 + 30) {
        heroStateRef.current = 2;
        return;
      }

      // If active programmatic transition is running, swallow subsequent wheel delta
      if (isAnimatingRef.current) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return;
      }

      // Ignore tiny trackpad / wheel micro-jitters
      if (Math.abs(e.deltaY) < 14) return;

      const now = Date.now();
      if (now - lastGestureTimeRef.current < 260) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return;
      }

      // STATE 0: Initial Hero -> First Scroll moves to State 1 and STOPS
      if (currentY <= state1 * 0.52) {
        if (e.deltaY > 0) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          isAnimatingRef.current = true;
          lastGestureTimeRef.current = now;
          heroStateRef.current = 1;

          scrollToPosition(state1, {
            duration: 0.85,
            lock: true,
            onComplete: () => {
              setTimeout(() => {
                isAnimatingRef.current = false;
                lastGestureTimeRef.current = Date.now();
              }, 220);
            }
          });
          setTimeout(() => { isAnimatingRef.current = false; }, 1100);
          return;
        }
      }

      // STATE 1: At Text Focus Plateau -> Second Scroll continues to State 2; scroll up returns to State 0
      if (Math.abs(currentY - state1) <= 160) {
        if (e.deltaY > 0) {
          // Second scroll down -> Continue into next section
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          isAnimatingRef.current = true;
          lastGestureTimeRef.current = now;
          heroStateRef.current = 2;

          scrollToPosition(state2, {
            duration: 0.9,
            lock: true,
            onComplete: () => {
              setTimeout(() => {
                isAnimatingRef.current = false;
                lastGestureTimeRef.current = Date.now();
              }, 220);
            }
          });
          setTimeout(() => { isAnimatingRef.current = false; }, 1100);
          return;
        } else if (e.deltaY < 0) {
          // Scroll up from State 1 -> Return to Initial Hero
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          isAnimatingRef.current = true;
          lastGestureTimeRef.current = now;
          heroStateRef.current = 0;

          scrollToPosition(0, {
            duration: 0.85,
            lock: true,
            onComplete: () => {
              setTimeout(() => {
                isAnimatingRef.current = false;
                lastGestureTimeRef.current = Date.now();
              }, 220);
            }
          });
          setTimeout(() => { isAnimatingRef.current = false; }, 1100);
          return;
        }
      }

      // Reverse scroll from top of ExteriorLayers back into Hero
      if (currentY >= state2 - 40 && currentY <= state2 + 100 && e.deltaY < -20) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        isAnimatingRef.current = true;
        lastGestureTimeRef.current = now;
        heroStateRef.current = 1;

        scrollToPosition(state1, {
          duration: 0.85,
          lock: true,
          onComplete: () => {
            setTimeout(() => {
              isAnimatingRef.current = false;
              lastGestureTimeRef.current = Date.now();
            }, 220);
          }
        });
        setTimeout(() => { isAnimatingRef.current = false; }, 1100);
        return;
      }
    };

    // Touch Swipe Handlers for Mobile & Tablet
    const handleTouchStart = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      touchStartYRef.current = e.touches[0].clientY;
      touchStartXRef.current = e.touches[0].clientX;
      touchScrollStartRef.current = getCurrentScrollY();
    };

    const handleTouchMove = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const { state1, state2 } = getHeroMetrics();
      const currentY = getCurrentScrollY();

      if (currentY >= state2 + 20) return;

      const dy = touchStartYRef.current - e.touches[0].clientY;

      if (isAnimatingRef.current) {
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return;
      }

      // In State 0, prevent native fling from overshooting State 1
      if (touchScrollStartRef.current <= state1 * 0.52 && dy > 16) {
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
      // In State 1, hold position against uncontrolled native flings
      else if (Math.abs(touchScrollStartRef.current - state1) <= 160 && Math.abs(dy) > 16) {
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    };

    const handleTouchEnd = (e) => {
      if (!e.changedTouches || e.changedTouches.length === 0) return;
      const { state0, state1, state2 } = getHeroMetrics();
      const currentY = getCurrentScrollY();

      if (currentY >= state2 + 20) return;
      if (isAnimatingRef.current) return;

      const endY = e.changedTouches[0].clientY;
      const endX = e.changedTouches[0].clientX;
      const deltaY = touchStartYRef.current - endY; // > 0 means swiped UP (scrolling down)
      const deltaX = touchStartXRef.current - endX;

      // Require dominant vertical gesture with meaningful delta
      if (Math.abs(deltaY) < 32 || Math.abs(deltaY) < Math.abs(deltaX) * 1.1) return;

      const now = Date.now();
      if (now - lastGestureTimeRef.current < 260) return;

      // Swiping up from State 0 -> Go to State 1 and STOP
      if (touchScrollStartRef.current <= state1 * 0.52 && deltaY > 0) {
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        isAnimatingRef.current = true;
        lastGestureTimeRef.current = now;
        heroStateRef.current = 1;

        scrollToPosition(state1, {
          duration: 0.85,
          lock: true,
          onComplete: () => {
            setTimeout(() => {
              isAnimatingRef.current = false;
              lastGestureTimeRef.current = Date.now();
            }, 220);
          }
        });
        setTimeout(() => { isAnimatingRef.current = false; }, 1100);
        return;
      }

      // Swiping from State 1
      if (Math.abs(touchScrollStartRef.current - state1) <= 160) {
        if (deltaY > 0) {
          // Second swipe -> Go to State 2 (Next section)
          if (e.cancelable) e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          isAnimatingRef.current = true;
          lastGestureTimeRef.current = now;
          heroStateRef.current = 2;

          scrollToPosition(state2, {
            duration: 0.9,
            lock: true,
            onComplete: () => {
              setTimeout(() => {
                isAnimatingRef.current = false;
                lastGestureTimeRef.current = Date.now();
              }, 220);
            }
          });
          setTimeout(() => { isAnimatingRef.current = false; }, 1100);
          return;
        } else if (deltaY < 0) {
          // Swipe down -> Return to State 0
          if (e.cancelable) e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          isAnimatingRef.current = true;
          lastGestureTimeRef.current = now;
          heroStateRef.current = 0;

          scrollToPosition(0, {
            duration: 0.85,
            lock: true,
            onComplete: () => {
              setTimeout(() => {
                isAnimatingRef.current = false;
                lastGestureTimeRef.current = Date.now();
              }, 220);
            }
          });
          setTimeout(() => { isAnimatingRef.current = false; }, 1100);
          return;
        }
      }

      // Reverse swipe from ExteriorLayers back into Hero
      if (touchScrollStartRef.current >= state2 - 40 && touchScrollStartRef.current <= state2 + 100 && deltaY < 0) {
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        isAnimatingRef.current = true;
        lastGestureTimeRef.current = now;
        heroStateRef.current = 1;

        scrollToPosition(state1, {
          duration: 0.85,
          lock: true,
          onComplete: () => {
            setTimeout(() => {
              isAnimatingRef.current = false;
              lastGestureTimeRef.current = Date.now();
            }, 220);
          }
        });
        setTimeout(() => { isAnimatingRef.current = false; }, 1100);
        return;
      }
    };

    // Keyboard Accessibility (Arrow Down / Page Down / Spacebar)
    const handleKeyDown = (e) => {
      const currentY = getCurrentScrollY();
      const { state0, state1, state2 } = getHeroMetrics();
      if (currentY >= state2 + 20) return;

      if (['ArrowDown', 'PageDown', 'Space'].includes(e.code)) {
        if (currentY <= state1 * 0.52) {
          e.preventDefault();
          scrollToPosition(state1, { duration: 0.85, lock: true });
        } else if (Math.abs(currentY - state1) <= 160) {
          e.preventDefault();
          scrollToPosition(state2, { duration: 0.9, lock: true });
        }
      } else if (['ArrowUp', 'PageUp'].includes(e.code)) {
        if (Math.abs(currentY - state1) <= 160) {
          e.preventDefault();
          scrollToPosition(0, { duration: 0.85, lock: true });
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: false, capture: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: false, capture: true });
    window.addEventListener('keydown', handleKeyDown, { capture: true });

    return () => {
      ctx.revert();
      window.removeEventListener('wheel', handleWheel, { capture: true });
      window.removeEventListener('touchstart', handleTouchStart, { capture: true });
      window.removeEventListener('touchmove', handleTouchMove, { capture: true });
      window.removeEventListener('touchend', handleTouchEnd, { capture: true });
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, []);

  const scrollToProjects = () => {
    isAnimatingRef.current = true;
    heroStateRef.current = 2;
    const el = document.getElementById('projects');
    if (el) {
      const navbarOffset = 76;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      scrollToPosition(elementPosition - navbarOffset, { 
        duration: 1.1,
        onComplete: () => {
          isAnimatingRef.current = false;
        }
      });
      setTimeout(() => { isAnimatingRef.current = false; }, 1400);
    }
  };

  return (
    <section 
      id="hero" 
      ref={containerRef} 
      className="relative w-full h-[220vh] bg-[#070707]"
    >
      {/* Sticky Fullscreen Cinematic Architectural Stage */}
      <div className="sticky top-0 w-full h-screen h-[100svh] min-h-0 overflow-hidden bg-black flex flex-col justify-end select-none">
        
        {/* Dominant Architectural Focus Visual: mirae-hero-bg.jpg */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div 
            ref={imageLayerRef} 
            className="absolute inset-0 w-full h-full will-change-transform"
          >
            <img 
              src="/assets/images/hero/mirae-hero-bg.jpg"
              alt="MIRAE Architectural Atelier Interior"
              className="w-full h-full object-cover object-[center_40%] transform-gpu brightness-[1.02] contrast-[1.02]"
              loading="eager"
              decoding="sync"
            />
          </div>

          {/* Light, Natural Architectural Atmosphere with Subtle Legibility Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Left-Aligned Editorial Headline + Explore Projects CTA */}
        <div 
          ref={heroContentRef}
          className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-8 sm:pb-14 md:pb-20 lg:pb-26 pointer-events-auto"
        >
          <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl text-left -translate-x-0 md:-translate-x-3 lg:-translate-x-6">
            <h1 className="font-excon font-semibold text-2xl sm:text-4xl md:text-5xl lg:text-[4rem] xl:text-[4.75rem] text-white leading-[1.08] sm:leading-[1.06] tracking-[-0.02em] drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)]">
              Architecture<br />
              Shaped by Experience
            </h1>

            {/* Premium 'EXPLORE PROJECTS →' CTA */}
            <div className="mt-5 sm:mt-8 md:mt-12">
              <button
                onClick={scrollToProjects}
                className="group inline-flex items-center space-x-3.5 text-xs sm:text-[13px] font-pencrow font-semibold tracking-[0.25em] uppercase text-neutral-200 hover:text-white transition-colors duration-300 focus:outline-none cursor-pointer py-1.5 sm:py-1"
                aria-label="Explore Projects"
              >
                <span className="relative">
                  EXPLORE PROJECTS
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-mirae-orange/90 transition-all duration-300 group-hover:w-full" />
                </span>
                <span className="text-sm sm:text-base transition-transform duration-300 ease-out group-hover:translate-x-2 text-neutral-300 group-hover:text-mirae-orange">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
