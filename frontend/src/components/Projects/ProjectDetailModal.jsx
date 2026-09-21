import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';

export default function ProjectDetailModal({ project, onClose }) {
  const [activeImage, setActiveImage] = useState(null);

  // Sync active image when project opens
  useEffect(() => {
    if (project) {
      setActiveImage(project.image || project.imageAsset);
    }
  }, [project]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const currentVisual = activeImage || project.image || project.imageAsset;

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-6 md:p-10 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div 
        className="relative w-full max-w-6xl bg-[#111111] border border-white/10 p-4 sm:p-8 md:p-12 my-auto shadow-2xl max-h-[90dvh] overflow-y-auto overscroll-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close project study"
          className="absolute top-3 right-3 sm:top-6 sm:right-6 p-2 min-w-[44px] min-h-[44px] rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white hover:bg-white/10 transition-all duration-300 z-20 focus:outline-none flex items-center justify-center cursor-pointer"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-4 sm:mb-8 border-b border-white/[0.08] pb-4 sm:pb-6 pr-10 sm:pr-14">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-pencrow text-mirae-orange font-medium mb-2 uppercase tracking-widest">
            <span>{project.id || `PROJECT ${project.num}`}</span>
            <span>•</span>
            <span className="text-white/80">{project.category}</span>
            {project.monographPlate && (
              <>
                <span>•</span>
                <span className="text-white/60">{project.monographPlate}</span>
              </>
            )}
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline text-white/40">MIRAE MONOGRAPH ARCHIVE</span>
          </div>
          <h2 id="modal-project-title" className="font-architectural text-xl sm:text-3xl md:text-5xl font-bold text-white uppercase tracking-wider">
            {project.title}
          </h2>
          <p className="text-xs sm:text-base font-editorial italic text-white/85 tracking-wide mt-1.5 sm:mt-2 font-pencrow">
            {project.subtitle}
          </p>
        </div>

        {/* Main Grid: Gallery & Architectural Studies */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Gallery Column */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            {/* Primary Visual Display */}
            <div className="relative aspect-[16/10] overflow-hidden bg-black border border-white/[0.1] group">
              <img 
                src={currentVisual} 
                onError={(e) => { 
                  e.target.src = project.fallbackImage || '/assets/images/projects/project-resort-01.jpg'; 
                }}
                alt={`MIRAE Architectural Study — ${project.title}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 text-[11px] font-pencrow font-medium text-white/70 bg-black/60 backdrop-blur-md px-2.5 py-1 border border-white/10">
                PLATE FOCUS
              </div>
            </div>

            {/* Thumbnail Selection Plates from the Brochure */}
            {project.gallery && project.gallery.length > 1 && (
              <div>
                <div className="text-[11px] font-pencrow font-medium text-white/40 uppercase tracking-widest mb-2.5">
                  ARCHITECTURAL PLATES ({project.gallery.length}) — CLICK TO ENLARGE
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {project.gallery.map((img, i) => {
                    const isSelected = currentVisual === img;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveImage(img)}
                        aria-label={`View plate ${i + 1} of ${project.title}`}
                        className={`relative aspect-[16/10] overflow-hidden border transition-all duration-300 focus:outline-none ${
                          isSelected 
                            ? 'border-white ring-1 ring-white' 
                            : 'border-white/15 opacity-70 hover:opacity-100 hover:border-white/40'
                        }`}
                      >
                        <img 
                          src={img} 
                          onError={(e) => { 
                            e.target.src = project.fallbackImage || '/assets/images/projects/project-resort-01.jpg'; 
                          }}
                          alt={`${project.title} detail plate ${i + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute bottom-1 right-1 text-[9px] font-pencrow font-medium text-white/80 bg-black/70 px-1 py-0.5">
                          0{i + 1}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Details & Monograph Studies Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              
              {/* Concept Tagline */}
              <div className="text-xs font-pencrow font-medium text-white/50 tracking-[0.2em] uppercase">
                {project.tagline}
              </div>

              {/* Architectural Statements */}
              <div className="space-y-3">
                <p className="text-sm font-pencrow font-normal text-[#dfdeda] leading-relaxed">
                  {project.description}
                </p>
                {project.secondaryText && (
                  <p className="text-xs sm:text-sm font-pencrow font-normal text-[#9e9e9e] leading-relaxed italic border-l-2 border-white/20 pl-3.5">
                    "{project.secondaryText}"
                  </p>
                )}
              </div>

              {/* Distinct Brochure Plates (Chaiwalah & Resort) */}
              {project.distinctBlocks && project.distinctBlocks.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                  <h3 className="text-xs font-pencrow font-medium text-white/40 tracking-[0.2em] uppercase">
                    BROCHURE CURATION
                  </h3>
                  <div className="space-y-3">
                    {project.distinctBlocks.map((block, idx) => (
                      <div key={idx} className="bg-white/[0.03] border border-white/[0.08] p-3.5">
                        <h4 className="text-xs font-pencrow font-semibold text-white tracking-widest uppercase mb-1.5 flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                          <span>{block.title}</span>
                        </h4>
                        <p className="text-xs font-pencrow font-normal text-[#b5b4af] leading-relaxed">
                          {block.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Architectural Signatures */}
              {project.signatures && project.signatures.length > 0 && (
                <div className="pt-4 border-t border-white/[0.08]">
                  <h3 className="text-xs font-pencrow font-medium text-white/40 tracking-[0.2em] uppercase mb-3">
                    ARCHITECTURAL SIGNATURES
                  </h3>
                  <ul className="space-y-2">
                    {project.signatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5 text-xs text-[#c5c4c0] font-pencrow font-normal">
                        <Check className="w-3.5 h-3.5 text-white/80 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            {/* Inquire Action Button */}
            <div className="pt-6 border-t border-white/[0.08]">
              <button
                onClick={() => {
                  onClose();
                  const contactEl = document.getElementById('contact');
                  if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3.5 px-6 border border-white text-xs font-pencrow font-medium tracking-[0.2em] uppercase text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center space-x-2.5 shadow-lg"
              >
                <span>INQUIRE ABOUT THIS WORK</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
