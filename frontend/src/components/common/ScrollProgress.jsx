import React, { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const h = document.documentElement;
          const b = document.body;
          const totalScroll = (h.scrollHeight || b.scrollHeight) - h.clientHeight;
          if (totalScroll > 0) {
            const currentScroll = window.scrollY || h.scrollTop || b.scrollTop;
            const ratio = Math.min(1, Math.max(0, currentScroll / totalScroll));
            const percent = Math.round(ratio * 100);

            if (barRef.current) {
              barRef.current.style.transform = `scaleY(${ratio})`;
            }
            if (textRef.current) {
              textRef.current.textContent = `${String(percent).padStart(2, '0')}%`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center space-y-4 pointer-events-none">
      <div ref={textRef} className="text-[10px] font-pencrow font-medium text-white/50 tracking-widest rotate-90 my-2">
        00%
      </div>
      
      {/* Subtle vertical indicator track (GPU scaleY transform) */}
      <div className="w-[1px] h-24 bg-white/10 relative overflow-hidden">
        <div 
          ref={barRef}
          className="w-full h-full bg-white will-change-transform"
          style={{ transformOrigin: 'top center', transform: 'scaleY(0)' }}
        />
      </div>

      <div className="text-[9px] font-pencrow font-medium text-white/30 tracking-widest rotate-90 my-2">
        JOURNEY
      </div>
    </div>
  );
}
