import React, { useState, useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const prevPercentRef = useRef(-1);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const b = document.body;
      const st = 'scrollTop';
      const sh = 'scrollHeight';
      const totalScroll = (h[sh] || b[sh]) - h.clientHeight;
      if (totalScroll <= 0) return;
      const percent = Math.min(100, Math.max(0, Math.round(((h[st] || b[st]) / totalScroll) * 100)));
      if (percent !== prevPercentRef.current) {
        prevPercentRef.current = percent;
        setScrollPercentage(percent);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center space-y-4 pointer-events-none">
      <div className="text-[10px] font-pencrow font-medium text-white/50 tracking-widest rotate-90 my-2">
        {String(scrollPercentage).padStart(2, '0')}%
      </div>
      
      {/* Subtle vertical indicator track */}
      <div className="w-[1px] h-24 bg-white/10 relative overflow-hidden">
        <div 
          className="w-full bg-white transition-all duration-150"
          style={{ height: `${scrollPercentage}%` }}
        />
      </div>

      <div className="text-[9px] font-pencrow font-medium text-white/30 tracking-widest rotate-90 my-2">
        JOURNEY
      </div>
    </div>
  );
}
