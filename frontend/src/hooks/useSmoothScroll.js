import { useEffect } from 'react';
import { initSmoothScroll } from '../animations/smoothScroll';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useSmoothScroll() {
  useEffect(() => {
    const handle = initSmoothScroll();

    return () => {
      if (handle && handle.destroy) {
        handle.destroy();
      }
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
}
