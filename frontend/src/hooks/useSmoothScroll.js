import { useEffect } from 'react';
import { initSmoothScroll } from '../animations/smoothScroll';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useSmoothScroll() {
  useEffect(() => {
    const handle = initSmoothScroll();

    let resizeTimer = null;
    const handleViewportChange = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('orientationchange', handleViewportChange);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange);
    }

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('orientationchange', handleViewportChange);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportChange);
      }
      if (handle && handle.destroy) {
        handle.destroy();
      }
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
}
