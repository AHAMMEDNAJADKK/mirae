import React, { useState } from 'react';
import { projectsData } from '../../data/projectsData';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import ProjectDetailModal from './ProjectDetailModal';

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  const current = projectsData[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  return (
    <section id="projects" className="relative w-full bg-[#080808] py-32 px-6 sm:px-12 md:px-20 text-[#f4f3ef] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/[0.08] pb-8">
          <div>
            <span className="text-xs font-mono-subtle text-subtle uppercase mb-3 block tracking-[0.3em]">
              SELECTED WORKS • ARCHIVE
            </span>
            <h2 className="font-architectural text-3xl sm:text-5xl md:text-6xl font-light text-white uppercase tracking-wide">
              BROCHURE PORTFOLIO
            </h2>
          </div>
          <div className="flex items-center space-x-6 mt-6 md:mt-0">
            <span className="font-mono text-sm text-subtle">
              {String(currentIndex + 1).padStart(2, '0')} / {String(projectsData.length).padStart(2, '0')}
            </span>
            <div className="flex space-x-2">
              <button 
                onClick={handlePrev}
                aria-label="Previous project"
                className="w-12 h-12 border border-white/20 hover:border-white flex items-center justify-center text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNext}
                aria-label="Next project"
                className="w-12 h-12 border border-white/20 hover:border-white flex items-center justify-center text-white transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Project Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Main Architectural Image with Click to Zoom */}
          <div 
            onClick={() => setSelectedProject(current)}
            className="lg:col-span-8 relative aspect-[16/10] overflow-hidden group cursor-pointer border border-white/[0.06]"
          >
            <img 
              src={current.image} 
              onError={(e) => { e.target.src = '/assets/images/project-resort-01.jpg'; }}
              alt={current.title}
              key={current.id}
              className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
            
            {/* Hover overlay hint */}
            <div className="absolute bottom-6 right-6 hidden sm:flex items-center space-x-2 bg-black/60 backdrop-blur-sm px-4 py-2 text-xs font-mono-subtle text-white border border-white/20 group-hover:border-white transition-all">
              <span>EXPLORE PROJECT GALLERY</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>

            <div className="absolute top-6 left-6 text-xs font-mono-subtle text-white/70 bg-black/50 backdrop-blur-sm px-3 py-1">
              PROJECT {current.num}
            </div>
          </div>

          {/* Project Details */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-xs font-mono-subtle text-white/50 tracking-widest uppercase block">
              {current.category}
            </span>
            <h3 className="font-architectural text-3xl sm:text-4xl md:text-5xl font-light text-white uppercase tracking-wide">
              {current.title}
            </h3>
            <p className="font-architectural text-lg text-[#dedede] font-light italic">
              {current.subtitle}
            </p>
            <p className="text-sm font-light text-[#b8b8b8] leading-relaxed">
              {current.description}
            </p>

            <div className="pt-4 border-t border-white/[0.08]">
              <button
                onClick={() => setSelectedProject(current)}
                className="inline-flex items-center space-x-3 text-xs font-mono-subtle text-white hover:text-white border-b border-white pb-1 tracking-widest uppercase transition-all hover:pr-2"
              >
                <span>VIEW COMPLETE BROCHURE STUDY</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Project Thumbnail Navigation Strip */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 pt-6 border-t border-white/[0.08]">
          {projectsData.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setCurrentIndex(idx)}
              className={`text-left p-2 border transition-all duration-300 ${
                currentIndex === idx
                  ? 'border-white bg-[#1a1a1a]'
                  : 'border-white/[0.08] hover:border-white/30 bg-[#0c0c0c] opacity-60 hover:opacity-100'
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden mb-2">
                <img 
                  src={p.image} 
                  onError={(e) => { e.target.src = '/assets/images/project-resort-01.jpg'; }}
                  alt={p.title} 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="text-[10px] font-mono-subtle text-subtle block">
                {p.num}
              </span>
              <span className="font-architectural text-xs text-white block truncate">
                {p.title}
              </span>
            </button>
          ))}
        </div>

      </div>

      {/* Modal View */}
      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
}
