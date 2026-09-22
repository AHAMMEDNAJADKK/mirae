import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_MONOGRAPHS } from '../../data/projectsData';
import { ArrowUpRight, Download, FileText } from 'lucide-react';
import ProjectDetailModal from './ProjectDetailModal';

const FILTERS = ['All', 'Residential', 'Hospitality', 'Commercial', 'Interior'];

// React Monograph Card Component Standard — minimal default view, full details on click via modal
export const MonographCard = React.forwardRef(({ project, onSelect }, ref) => (
  <motion.div 
    ref={ref}
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
    className="group relative flex flex-col bg-neutral-950 border border-neutral-800/80 rounded-xl overflow-hidden p-4 sm:p-6 2xl:p-8 hover:border-neutral-500 transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-mirae-orange/50 shadow-xl"
  >
    {/* Aspect-Locked Image View */}
    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg bg-neutral-900 mb-4 sm:mb-5 2xl:mb-6">
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
    </div>

    {/* Project Meta: category + id */}
    <div className="flex items-center justify-between text-[11px] sm:text-xs 2xl:text-[13px] font-pencrow text-mirae-orange font-medium tracking-wider mb-1.5 sm:mb-2">
      <span>{project.category.toUpperCase()}</span>
      <span className="text-neutral-400">{project.id}</span>
    </div>

    {/* Project Title */}
    <h3 className="font-architectural text-lg sm:text-2xl lg:text-3xl 2xl:text-[2rem] font-bold text-white mb-1.5 2xl:mb-2 group-hover:text-neutral-100 transition-colors uppercase tracking-wide">
      {project.title}
    </h3>

    {/* Tagline — brief subheading only; full description appears in modal on click */}
    <p className="text-[11px] sm:text-xs 2xl:text-sm font-pencrow font-normal text-neutral-400 tracking-wide">
      {project.tagline}
    </p>

    {/* Call to Action Link */}
    <div className="mt-auto flex items-center justify-between pt-3 sm:pt-4 2xl:pt-5 border-t border-neutral-800/80 mt-4 sm:mt-5 2xl:mt-6">
      <span className="text-[10px] sm:text-xs 2xl:text-[13px] font-pencrow text-neutral-400 tracking-wider">
        {project.monographPlate || 'STUDIO ARCHIVE'}
      </span>
      <span className="text-[11px] sm:text-xs 2xl:text-sm font-pencrow text-neutral-200 group-hover:text-mirae-orange transition-colors tracking-widest flex items-center gap-1.5 font-medium">
        <span>EXPLORE STUDY</span>
        <ArrowUpRight className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-mirae-orange" />
      </span>
    </div>
  </motion.div>
));

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [brochureExpanded, setBrochureExpanded] = useState(false);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return PORTFOLIO_MONOGRAPHS;
    return PORTFOLIO_MONOGRAPHS.filter(
      (p) => p.filterCategory === activeFilter || p.category === activeFilter
    );
  }, [activeFilter]);

  return (
    <section id="projects" className="relative w-full bg-[#080808] py-12 sm:py-20 md:py-32 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-12 text-[#f4f3ef] border-t border-white/[0.08]">
      <div className="max-w-7xl 2xl:max-w-[1680px] mx-auto">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-12 border-b border-white/[0.08] pb-5 sm:pb-8">
          <div>
            <span className="text-[10px] sm:text-xs 2xl:text-sm font-pencrow text-white/60 uppercase mb-1.5 sm:mb-3 block tracking-[0.25em] sm:tracking-[0.3em] font-medium">
              SELECTED WORKS • ARCHIVE
            </span>
            <h2 className="font-architectural text-2xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-[4.25rem] font-bold text-white uppercase tracking-tight">
              BROCHURE PORTFOLIO
            </h2>
          </div>

          {/* Project Counter */}
          <div className="mt-3 md:mt-0 text-[10px] sm:text-xs 2xl:text-sm font-pencrow text-white/50 tracking-widest uppercase font-medium">
            <span>SHOWING {filteredProjects.length} OF {PORTFOLIO_MONOGRAPHS.length} MONOGRAPHS</span>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 mb-6 sm:mb-12" role="tablist" aria-label="Portfolio Filters">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 sm:px-5 2xl:px-6 py-1.5 sm:py-2 2xl:py-2.5 text-[10px] sm:text-xs 2xl:text-[13px] font-pencrow font-medium tracking-wider sm:tracking-widest uppercase transition-all duration-300 border rounded-sm ${
                  isActive
                    ? 'border-white bg-white text-black font-semibold shadow-md'
                    : 'border-white/10 text-white/70 hover:text-white hover:border-white/30 bg-transparent'
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
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 lg:gap-10 2xl:gap-12"
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

        {/* Architectural Monograph & Brochure Compendium Card — minimal until clicked */}
        <div className="mt-10 sm:mt-16 md:mt-20 2xl:mt-24 border border-white/[0.1] bg-[#111111] p-4 sm:p-8 md:p-14 2xl:p-16 relative overflow-hidden rounded-lg shadow-2xl">
          <div className="relative z-10 flex flex-col gap-4 sm:gap-6">

            {/* Always-visible minimal heading row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div>
                <div className="flex items-center space-x-2 text-[10px] sm:text-xs 2xl:text-[13px] font-pencrow text-mirae-orange font-medium tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-1.5 sm:mb-2">
                  <FileText className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-mirae-orange" />
                  <span>MONOGRAPH • COMPENDIUM</span>
                </div>
                <h3 className="font-architectural text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-white uppercase tracking-wide leading-tight">
                  MIRAE — ARCHITECTURE PORTFOLIO
                </h3>
              </div>

              {/* Toggle button — always visible */}
              <button
                onClick={() => setBrochureExpanded((v) => !v)}
                className="shrink-0 self-start sm:self-center inline-flex items-center gap-2 px-4 py-2 2xl:px-5 2xl:py-2.5 text-[10px] sm:text-xs 2xl:text-[13px] font-pencrow font-medium tracking-widest uppercase border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-all duration-300 rounded-sm cursor-pointer"
                aria-expanded={brochureExpanded}
              >
                {brochureExpanded ? 'COLLAPSE' : 'VIEW BROCHURE DETAILS'}
                <ArrowUpRight className={`w-3.5 h-3.5 transition-transform duration-300 ${brochureExpanded ? 'rotate-180 text-mirae-orange' : 'text-mirae-orange'}`} />
              </button>
            </div>

            {/* Collapsible details — only visible after clicking */}
            <AnimatePresence>
              {brochureExpanded && (
                <motion.div
                  key="brochure-details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 pt-4 sm:pt-6 border-t border-white/[0.08]">
                    <div className="max-w-2xl 2xl:max-w-3xl">
                      <p className="text-xs sm:text-sm 2xl:text-base font-normal text-neutral-300 leading-relaxed max-w-xl 2xl:max-w-2xl font-pencrow">
                        The comprehensive architectural compendium containing full portfolio monographs, detailed spatial plates, technical specifications, and masterplanning studies across our landmark projects.
                      </p>
                      
                      {/* Monograph Details Specs */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-6 mt-4 sm:mt-6 text-[10px] sm:text-xs 2xl:text-[13px] font-pencrow text-white/60 font-medium">
                        <span className="flex items-center space-x-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>COMPLETE 22-PAGE EDITION</span>
                        </span>
                        <span>•</span>
                        <span>ORIGINAL PDF DOCUMENT</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="hidden sm:inline">PMR INFRA LLP ARCHIVE</span>
                      </div>
                    </div>

                    {/* Action CTAs */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 shrink-0">
                      <a
                        href="/brochure/mirae-brochure.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center space-x-2 px-4 sm:px-8 2xl:px-10 py-2.5 sm:py-3.5 2xl:py-4 text-[11px] sm:text-xs 2xl:text-sm font-pencrow font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase border border-white/30 text-white hover:border-white hover:bg-white/5 transition-all duration-300 rounded-sm"
                      >
                        <span>View Brochure</span>
                        <ArrowUpRight className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                      </a>

                      <a
                        href="/brochure/mirae-brochure.pdf"
                        download="MIRAE-Architecture-Portfolio.pdf"
                        className="inline-flex items-center justify-center space-x-2 px-4 sm:px-8 2xl:px-10 py-2.5 sm:py-3.5 2xl:py-4 text-[11px] sm:text-xs 2xl:text-sm font-pencrow tracking-[0.15em] sm:tracking-[0.2em] uppercase bg-white text-black font-semibold hover:bg-[#e6e4dd] transition-all duration-300 shadow-lg rounded-sm"
                      >
                        <Download className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                        <span>Download Brochure</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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
