import React, { useState } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Preloader from './components/common/Preloader';
import Navbar from './components/Navigation/Navbar';
import FullscreenMenu from './components/Navigation/FullscreenMenu';
import HeroExperience from './components/Hero/HeroExperience';
import ExteriorLayers from './components/exterior/ExteriorLayers';
import InteriorJourney from './components/Interior/InteriorJourney';
import MaterialsSection from './components/Materials/MaterialsSection';
import ProjectsSection from './components/Projects/ProjectsSection';
import StudioScrollSection from './components/studio/StudioScrollSection';
import BrandStory from './components/about/BrandStory';
import ContactSection from './components/Contact/ContactSection';
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

      {/* Minimal Architectural Navbar (Matching Reference) */}
      <Navbar onOpenMenu={() => setIsMenuOpen(true)} />

      {/* Fullscreen Mobile / Desktop Overlay Navigation */}
      <FullscreenMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />

      {/* Continuous Architectural Cinematic Journey (Sections 01 through 07) */}
      <main className="w-full">
        {/* 01. Hero View (Drone Shot) & 02. Transition — Closer View (The MIRAE Signature) */}
        <HeroExperience />

        {/* 03. Exterior Layers (Scrolling Cutaway Anatomical Sequence) */}
        <ExteriorLayers />

        {/* 04. Interior Rooms (Large Featured Display + 3 Supporting Cards) */}
        <InteriorJourney />

        {/* 05. Project Details / Materials (Crafted with Timeless Materials & Swatches) */}
        <MaterialsSection />

        {/* Selected Works Portfolio & Brochure Monograph */}
        <ProjectsSection />

        {/* 06. Studio Experience — 6-Image Architectural Scroll Sequence */}
        <StudioScrollSection />

        {/* 07. Brand Story / About (More than buildings. We create experiences.) */}
        <BrandStory />

        {/* 07. Footer / Contact (MIRAE brandmark, Design is thinking made visual, Coordinates) */}
        <ContactSection />
      </main>
    </div>
  );
}
