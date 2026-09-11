import React from 'react';
import { X, ArrowRight, Check } from 'lucide-react';

export default function ProjectDetailModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#111111] border border-white/10 p-6 sm:p-10 md:p-14 my-auto shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute top-6 right-6 p-2 rounded-full border border-white/20 text-white hover:border-white hover:bg-white hover:text-black transition-all duration-300"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-10 border-b border-white/[0.08] pb-6">
          <div className="flex items-center space-x-3 text-xs font-mono-subtle text-subtle mb-2 uppercase tracking-widest">
            <span>PROJECT {project.num}</span>
            <span>•</span>
            <span>{project.category}</span>
          </div>
          <h2 className="font-architectural text-3xl sm:text-5xl font-light text-white uppercase tracking-wider">
            {project.title}
          </h2>
          <p className="text-base text-subtle font-light mt-2">
            {project.subtitle}
          </p>
        </div>

        {/* Main Grid: Gallery & Descriptions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Gallery Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="aspect-[16/10] overflow-hidden border border-white/[0.08]">
              <img 
                src={project.image} 
                onError={(e) => { e.target.src = '/assets/images/project-resort-01.jpg'; }}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Additional Project Photos from the Brochure */}
            {project.gallery && project.gallery.length > 1 && (
              <div className="grid grid-cols-2 gap-4">
                {project.gallery.slice(1).map((img, i) => (
                  <div key={i} className="aspect-[4/3] overflow-hidden border border-white/[0.06]">
                    <img 
                      src={img} 
                      onError={(e) => { e.target.src = '/assets/images/project-resort-02.jpg'; }}
                      alt={`${project.title} detail ${i+1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <span className="text-xs font-mono-subtle text-white/50 tracking-widest uppercase block">
                {project.tagline}
              </span>
              <p className="text-sm font-light text-[#cfcfcf] leading-relaxed">
                {project.description}
              </p>
              {project.secondaryText && (
                <p className="text-sm font-light text-[#9e9e9e] leading-relaxed italic">
                  "{project.secondaryText}"
                </p>
              )}

              {/* Architectural Features */}
              <div className="pt-6 border-t border-white/[0.08]">
                <h4 className="text-xs font-mono-subtle text-subtle tracking-widest uppercase mb-4">
                  ARCHITECTURAL SIGNATURES
                </h4>
                <ul className="space-y-2.5">
                  {project.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 text-xs text-[#c0c0c0]">
                      <Check className="w-3.5 h-3.5 text-white/70 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-white/[0.08]">
              <button
                onClick={() => {
                  onClose();
                  const contactEl = document.getElementById('contact');
                  if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3.5 px-6 border border-white text-xs font-mono-subtle tracking-widest uppercase text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>INQUIRE ABOUT THIS PROJECT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
