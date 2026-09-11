import React, { useState } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Preloader from './components/common/Preloader';
import Navbar from './components/navigation/Navbar';
import FullscreenMenu from './components/navigation/FullscreenMenu';
import HeroExperience from './components/hero/HeroExperience';
import InteriorJourney from './components/interior/InteriorJourney';
import MaterialsSection from './components/materials/MaterialsSection';
import ProjectsSection from './components/projects/ProjectsSection';
import BrandStory from './components/about/BrandStory';
import ContactSection from './components/contact/ContactSection';
import ScrollProgress from './components/common/ScrollProgress';
import CustomCursor from './components/common/CustomCursor';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Authoritative Lenis + GSAP ScrollTrigger Synchronization
  useSmoothScroll();

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0a] text-[#f4f3ef] selection:bg-white selection:text-black">
      {/* Editorial Preloader with genuine GPU decode synchronization */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* Subtle Desktop Cursor & Telemetry */}
      <CustomCursor />
      <ScrollProgress />

      {/* Minimal Architectural Navbar */}
      <Navbar onOpenMenu={() => setIsMenuOpen(true)} />

      {/* Fullscreen Mobile / Desktop Overlay Navigation */}
      <FullscreenMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />

      {/* Continuous Architectural Cinematic Flow */}
      <main className="w-full">
        {/* 01 Hero Drone View -> 02 Camera Approach -> 03 Exterior Reveal -> 04 Entrance Threshold */}
        <HeroExperience />

        {/* 05 Interior Spaces (Living, Bedroom, Dining, Bathroom) */}
        <InteriorJourney />

        {/* 06 Tactile Materials & Craftsmanship */}
        <MaterialsSection />

        {/* 07 Selected Works (Authentic Brochure Portfolio) */}
        <ProjectsSection />

        {/* 08 The MIRAE Signature (Brand Philosophy) */}
        <BrandStory />

        {/* 09 Closing Contact & Studio Coordinates */}
        <ContactSection />
      </main>
    </div>
  );
}
