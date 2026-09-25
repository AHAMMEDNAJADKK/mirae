import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Disable on touch / mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    let rafId = null;
    let mouseX = -100;
    let mouseY = -100;

    const render = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      rafId = null;
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!rafId) {
        rafId = window.requestAnimationFrame(render);
      }
    };

    const onMouseOver = (e) => {
      if (e.target.closest('button, a, input, select, textarea, [data-cursor-hover]')) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div 
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full mix-blend-difference will-change-transform ${
        hovered ? 'w-8 h-8 bg-white/40 backdrop-blur-sm' : 'w-2.5 h-2.5 bg-white'
      }`}
      style={{
        transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
        transition: 'width 0.15s ease-out, height 0.15s ease-out, background-color 0.15s ease-out'
      }}
    />
  );
}
