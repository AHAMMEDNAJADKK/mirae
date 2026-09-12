import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_MONOGRAPHS } from '../../data/projectsData';
import { ArrowUpRight, Download, FileText } from 'lucide-react';
import ProjectDetailModal from './ProjectDetailModal';

const FILTERS = ['All', 'Residential', 'Hospitality', 'Commercial', 'Interior'];

// React Monograph Card Component Standard
export const MonographCard = ({ project, onSelect }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.96 }}
    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    onClick={() => onSelect && onSelect(project)}
    tabIndex={0}
    role="button"
    aria-label={`View architectural study for ${project.title}`}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect && onSelect(project);
      }
    }}
    className="group relative flex flex-col bg-neutral-950 border border-neutral-800/60 rounded-xl overflow-hidden p-5 sm:p-6 hover:border-neutral-600 transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-400/50"
  >
    {/* Aspect-Locked Image View */}
    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg bg-neutral-900 mb-5">
      <img
        src={project.image || project.imageAsset}
        alt={project.title}
        onError={(e) => {
          if (project.fallbackImage && e.target.src !== project.fallbackImage) {
            e.target.src = project.fallbackImage;
          }
        }}
        className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
      <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-xs font-mono tracking-widest text-neutral-300 px-3 py-1 rounded-full border border-white/10">
        {project.id}
      </span>
      <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-xs font-mono tracking-widest text-amber-300/90 px-3 py-1 rounded-full border border-white/10 uppercase">
        {project.category}
      </span>
    </div>

    {/* Project Meta Details */}
    <div className="flex items-center justify-between text-xs font-mono text-amber-400/90 tracking-wider mb-2">
      <span>{project.category.toUpperCase()}</span>
      <span>{project.monographPlate}</span>
    </div>

    <h3 className="font-architectural text-2xl sm:text-3xl font-light text-white mb-1.5 group-hover:text-amber-200 transition-colors uppercase tracking-wide">
      {project.title}
    </h3>
    <p className="text-xs font-medium text-neutral-400 mb-3 tracking-wide">{project.tagline}</p>
    <p className="text-sm text-neutral-400 font-light line-clamp-3 mb-6 leading-relaxed">
      {project.description}
    </p>

    {/* Call to Action Links */}
    <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-800/80">
      <button 
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSelect && onSelect(project);
        }}
        className="text-xs font-mono text-neutral-300 hover:text-white transition-colors tracking-widest flex items-center gap-1.5"
      >
        <span>VIEW STUDY</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
      </button>
      <button 
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSelect && onSelect(project);
        }}
        className="text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors tracking-widest flex items-center gap-1"
      >
        <span>EXPLORE STUDY</span>
        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </div>
  </motion.div>
);

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return PORTFOLIO_MONOGRAPHS;
    return PORTFOLIO_MONOGRAPHS.filter(
      (p) => p.filterCategory === activeFilter || p.category === activeFilter
    );
  }, [activeFilter]);

  return (
    <section id="projects" className="relative w-full bg-[#080808] py-32 px-6 sm:px-12 md:px-20 text-[#f4f3ef] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/[0.08] pb-8">
          <div>
            <span className="text-xs font-mono-subtle text-subtle uppercase mb-3 block tracking-[0.3em]">
              SELECTED WORKS • ARCHIVE
            </span>
            <h2 className="font-architectural text-3xl sm:text-5xl md:text-6xl font-light text-white uppercase tracking-wide">
              BROCHURE PORTFOLIO
            </h2>
          </div>

          {/* Project Counter */}
          <div className="mt-6 md:mt-0 text-xs font-mono-subtle text-subtle tracking-widest uppercase">
            <span>SHOWING {filteredProjects.length} OF {PORTFOLIO_MONOGRAPHS.length} MONOGRAPHS</span>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12" role="tablist" aria-label="Portfolio Filters">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 text-xs font-mono-subtle tracking-widest uppercase transition-all duration-300 border rounded-sm ${
                  isActive
                    ? 'border-white bg-white text-black font-medium shadow-md'
                    : 'border-white/10 text-white/60 hover:text-white hover:border-white/30 bg-transparent'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Responsive Architectural Projects Grid with Framer Motion layout animation */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <MonographCard
                key={project.id}
                project={project}
                onSelect={(p) => setSelectedProject(p)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Architectural Monograph & Brochure Compendium Card */}
        <div className="mt-16 sm:mt-20 border border-white/[0.12] bg-gradient-to-b from-[#121212] to-[#0a0a0a] p-8 sm:p-12 md:p-14 relative overflow-hidden rounded-xl">
          {/* Subtle architectural grid pattern in background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center space-x-2 text-xs font-mono-subtle text-white/50 tracking-[0.3em] uppercase mb-3">
                <FileText className="w-3.5 h-3.5 text-white/60" />
                <span>OFFICIAL MONOGRAPH • PUBLICATION</span>
              </div>
              <h3 className="font-architectural text-2xl sm:text-4xl lg:text-5xl font-light text-white uppercase tracking-wide leading-tight">
                MIRAE — ARCHITECTURE PORTFOLIO
              </h3>
              <p className="text-xs sm:text-sm font-light text-[#9e9e9e] mt-3 sm:mt-4 leading-relaxed max-w-xl">
                The comprehensive architectural compendium containing full portfolio monographs, detailed spatial plates, technical specifications, and masterplanning studies across our landmark projects.
              </p>
              
              {/* Monograph Details Specs */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6 text-xs font-mono-subtle text-white/50">
                <span className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>COMPLETE 22-PAGE EDITION</span>
                </span>
                <span>•</span>
                <span>ORIGINAL PDF DOCUMENT</span>
                <span>•</span>
                <span>PMR INFRA LLP ARCHIVE</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
              <a
                href="/brochure/mirae-brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2.5 px-6 sm:px-8 py-3.5 text-xs font-mono-subtle tracking-[0.2em] uppercase border border-white/30 text-white hover:border-white hover:bg-white/5 transition-all duration-300 rounded-sm"
              >
                <span>View Brochure</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="/brochure/mirae-brochure.pdf"
                download="MIRAE-Architecture-Portfolio.pdf"
                className="inline-flex items-center justify-center space-x-2.5 px-6 sm:px-8 py-3.5 text-xs font-mono-subtle tracking-[0.2em] uppercase bg-white text-black font-medium hover:bg-[#e6e4dd] transition-all duration-300 shadow-lg rounded-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download Brochure</span>
              </a>
            </div>
          </div>
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
