import React, { useState, useMemo } from 'react';
import { projectsData } from '../../data/projectsData';
import { ArrowUpRight, Download, FileText } from 'lucide-react';

import ProjectDetailModal from './ProjectDetailModal';

const FILTERS = ['All', 'Residential', 'Hospitality', 'Commercial', 'Interior'];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projectsData;
    return projectsData.filter((p) => p.filterCategories && p.filterCategories.includes(activeFilter));
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
            <span>SHOWING {filteredProjects.length} OF {projectsData.length} MONOGRAPHS</span>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 text-xs font-mono-subtle tracking-widest uppercase transition-all duration-300 border ${
                  isActive
                    ? 'border-white bg-white text-black font-medium'
                    : 'border-white/10 text-white/60 hover:text-white hover:border-white/30 bg-transparent'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Responsive Architectural Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer border border-white/[0.08] bg-[#0f0f0f] hover:border-white/30 transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* 16:10 Standard Aspect Ratio Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                <img
                  src={project.image}
                  onError={(e) => {
                    e.target.src = project.fallbackImage || '/assets/images/projects/project-resort-01.jpg';
                  }}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

                {/* Top Metadata Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono-subtle">
                  <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 text-white/80 border border-white/10">
                    PROJECT {project.num}
                  </span>
                  <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 text-white/60 border border-white/10">
                    {project.year}
                  </span>
                </div>

                {/* Hover Action Badge */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center space-x-1.5 bg-white text-black px-3 py-1.5 text-[11px] font-mono-subtle tracking-wider uppercase">
                  <span>VIEW STUDY</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card Editorial Info */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono-subtle text-subtle uppercase tracking-widest mb-2">
                    <span>{project.category}</span>
                    <span>{project.location}</span>
                  </div>
                  <h3 className="font-architectural text-2xl sm:text-3xl font-light text-white uppercase tracking-wide group-hover:text-[#f0ece1] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm font-light text-[#9e9e9e] line-clamp-2 mt-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono-subtle text-white/70 group-hover:text-white transition-colors">
                  <span className="tracking-widest uppercase">AREA: {project.area}</span>
                  <div className="flex items-center space-x-1">
                    <span className="tracking-widest uppercase text-[11px]">DETAILS</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Architectural Monograph & Brochure Compendium Card */}
        <div className="mt-16 sm:mt-20 border border-white/[0.12] bg-gradient-to-b from-[#121212] to-[#0a0a0a] p-8 sm:p-12 md:p-14 relative overflow-hidden">
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
                className="inline-flex items-center justify-center space-x-2.5 px-6 sm:px-8 py-3.5 text-xs font-mono-subtle tracking-[0.2em] uppercase border border-white/30 text-white hover:border-white hover:bg-white/5 transition-all duration-300"
              >
                <span>View Brochure</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="/brochure/mirae-brochure.pdf"
                download="MIRAE-Architecture-Portfolio.pdf"
                className="inline-flex items-center justify-center space-x-2.5 px-6 sm:px-8 py-3.5 text-xs font-mono-subtle tracking-[0.2em] uppercase bg-white text-black font-medium hover:bg-[#e6e4dd] transition-all duration-300 shadow-lg"
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
