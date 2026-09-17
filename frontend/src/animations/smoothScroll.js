import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

export const getLenis = () => lenisInstance;

export function scrollToPosition(target, options = {}) {
  if (typeof window === 'undefined') return;
  if (lenisInstance) {
    lenisInstance.scrollTo(target, options);
  } else {
    if (typeof target === 'number') {
      window.scrollTo({ 
        top: target, 
        behavior: options.immediate ? 'auto' : 'smooth' 
      });
    } else if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: options.immediate ? 'auto' : 'smooth' });
      }
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: options.immediate ? 'auto' : 'smooth' });
    }
  }
}

export function initSmoothScroll() {
  if (typeof window === 'undefined') return null;

  if (lenisInstance) {
    return lenisInstance;
  }

  // Respect user preference for reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.2,
    autoRaf: false, // Drive via GSAP ticker for single authoritative RAF loop
  });

  lenisInstance = lenis;

  // Synchronize Lenis scroll updates with ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  const tickerCallback = (time) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  return {
    lenis,
    destroy: () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisInstance = null;
    }
  };
}
