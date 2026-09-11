import React, { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const b = document.body;
      const st = 'scrollTop';
      const sh = 'scrollHeight';
      const percent = ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
      setScrollPercentage(Math.min(100, Math.max(0, Math.round(percent))));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center space-y-4 pointer-events-none">
      <div className="text-[10px] font-mono-subtle text-white/50 tracking-widest rotate-90 my-2">
        {String(scrollPercentage).padStart(2, '0')}%
      </div>
      
      {/* Subtle vertical indicator track */}
      <div className="w-[1px] h-24 bg-white/10 relative overflow-hidden">
        <div 
          className="w-full bg-white transition-all duration-150"
          style={{ height: `${scrollPercentage}%` }}
        />
      </div>

      <div className="text-[9px] font-mono-subtle text-white/30 tracking-widest rotate-90 my-2">
        JOURNEY
      </div>
    </div>
  );
}
