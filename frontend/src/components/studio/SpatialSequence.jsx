import React, { useState } from 'react';
import { SpatialImageCard } from '../common/SpatialImageCard';
import { Compass, ArrowRight, ArrowLeft, Maximize2, X } from 'lucide-react';

export const spatialSequenceData = [
  {
    id: '01',
    tag: '01 / 06',
    tabLabel: '01 / 06',
    tabName: 'WELLNESS SANCTUARY',
    title: 'THE WELLNESS SANCTUARY & SKY PAVILION',
    subtitle: 'Architecture & Leadership • Private Executive Atelier',
    description:
      'A private world dedicated to restoration, where warm thermal waters, sculpted stone, and immersive views create an atmosphere of complete tranquility. Perched above the landscape, the sculptural Sky Pavilion frames the valley through organic forms and natural materials.',
    layout: 'hero',
    images: [
      {
        src: '/assets/images/projects/project-resort-01.webp',
        fallback: '/assets/images/projects/project-resort-01.jpg',
        alt: 'Hillside Resort Sanctuary Elevated Drone View',
        caption: 'Sky Pavilion — Cantilevered Bamboo Valley Vantage',
        badge: 'SKY PAVILION'
      },
      {
        src: '/assets/images/projects/project-resort-02.webp',
        fallback: '/assets/images/projects/project-resort-02.jpg',
        alt: 'Illuminated Bamboo Pool Pavilion & Cascading Waters',
        caption: 'Thermal Wellness Lounge — Natural Stone & Reflective Waters',
        badge: 'THERMAL SANCTUARY'
      }
    ]
  },
  {
    id: '02',
    tag: '02 / 06',
    tabLabel: '02 / 06',
    tabName: 'RESIDENTIAL',
    title: 'RESIDENTIAL ARCHITECTURE',
    subtitle: 'Crafted With Intention • Designed To Endure',
    description:
      'Where 50+ years of real construction experience meets contemporary tropical design. Architectural forms built with slatted timber facades, terracotta pitched roofs, integrated lush courtyards, and expansive glass elevations.',
    layout: '3-tier',
    images: [
      {
        src: '/assets/images/projects/project-pureform-01.webp',
        fallback: '/assets/images/projects/project-pureform-01.jpg',
        alt: 'Slatted Timber Facade & Gabled Pavilion Geometry',
        caption: 'Twin Gabled Timber Pavilion & Linear Shaded Louvers',
        badge: 'GABLED PAVILION'
      },
      {
        src: '/assets/images/projects/project-farmhouse-01.webp',
        fallback: '/assets/images/projects/project-farmhouse-01.jpg',
        alt: 'Modern Tropical Luxury Villa & Courtyard',
        caption: 'Tropical Luxury Villa — Suspended Decks & Water Planes',
        badge: 'TROPICAL VILLA'
      },
      {
        src: '/assets/images/projects/project-pureform-03.webp',
        fallback: '/assets/images/projects/project-pureform-03.jpg',
        alt: 'Expansive Glass Elevation & Shaded Verandas',
        caption: 'Continuous Glass Facades & Shaded Living Thresholds',
        badge: 'GLASS ELEVATION'
      }
    ]
  },
  {
    id: '03',
    tag: '03 / 06',
    tabLabel: '03 / 06',
    tabName: 'INDULGENCE',
    title: 'THE ART OF EVERYDAY INDULGENCE',
    subtitle: 'Cafe & Hospitality Spaces',
    description:
      'A refined cafe experience inspired by timeless Indian charm, warm textures, and contemporary comfort. Crafted for slow moments, soulful conversations, and memorable chai within open-air courtyard settings.',
    layout: '2-column',
    images: [
      {
        src: '/assets/images/projects/project-chaiwalah-01.webp',
        fallback: '/assets/images/projects/project-chaiwalah-01.jpg',
        alt: 'Outdoor Courtyard Dining with Brickwork Features & Tree Planting',
        caption: 'Chaiwalah Courtyard — Brickwork Arches & Central Flora',
        badge: 'COURTYARD DINING'
      },
      {
        src: '/assets/images/projects/project-chaiwalah-02.webp',
        fallback: '/assets/images/projects/project-chaiwalah-02.jpg',
        alt: 'Warm Cup Cafe Interior with Earthy Tones & Relaxed Seating',
        caption: 'The Warm Cup — Earthy Textures & Clay Tile Rooflines',
        badge: 'THE WARM CUP'
      }
    ]
  },
  {
    id: '04',
    tag: '04 / 06',
    tabLabel: '04 / 06',
    tabName: 'THE VISUAL',
    title: 'SEE THE UNBUILT • EXPERIENCE IT BEFORE IT EXISTS',
    subtitle: 'Visualization & Spatial Design',
    description:
      'Our visualization process brings together light, material, texture, scale, and atmosphere to create a realistic impression of the space before construction begins. Featuring organic white wall forms, daylight skylights, and secluded wellness spaces.',
    layout: '4-bento',
    images: [
      {
        src: '/assets/images/exterior/exterior-roof.webp',
        fallback: '/assets/images/exterior/exterior-roof.jpg',
        alt: 'Top-down Organic Roof & Cantilever View',
        caption: 'Top-Down Organic Cantilever & Geometric Roof Plane',
        badge: 'ORGANIC ROOF'
      },
      {
        src: '/assets/images/projects/project-salon-01.webp',
        fallback: '/assets/images/projects/project-salon-01.jpg',
        alt: 'Salon Interior Where Beauty Meets Design',
        caption: 'Salon Interior — Monolithic Terracotta & Arched Niche',
        badge: 'SALON INTERIOR'
      },
      {
        src: '/assets/images/projects/project-salon-03.webp',
        fallback: '/assets/images/projects/project-salon-03.jpg',
        alt: 'Arched Botanical Niche & Fluted Wood Detailing',
        caption: 'Arched Botanical Alcove & Tactile Plaster Contour',
        badge: 'BOTANICAL ARCH'
      },
      {
        src: '/assets/images/exterior/exterior-entrance.webp',
        fallback: '/assets/images/exterior/exterior-entrance.jpg',
        alt: 'Tropical Walkway & Board-Formed Concrete Portal',
        caption: 'Tropical Walkway & Monolithic Entry Sequence',
        badge: 'TROPICAL WALKWAY'
      }
    ]
  },
  {
    id: '05',
    tag: '05 / 06',
    tabLabel: '05 / 06',
    tabName: 'THE PHILOSOPHY',
    title: 'QUIET. REFINED. INTENTIONAL.',
    subtitle: 'Design Philosophy',
    description:
      'Luxury defined by considered proportions, intentional materials, and details that feel effortless. Architecture, interiors, and execution brought together through one seamless process under one roof.',
    layout: 'dual-landscape',
    images: [
      {
        src: '/assets/images/projects/project-pool-02.webp',
        fallback: '/assets/images/projects/project-pool-02.jpg',
        alt: 'Illuminated Bamboo Pool House at Dusk',
        caption: 'Illuminated Bamboo Pavilion — Ethereal Twilight Reflection',
        badge: 'BAMBOO POOL HOUSE'
      },
      {
        src: '/assets/images/projects/project-pool-03.webp',
        fallback: '/assets/images/projects/project-pool-03.jpg',
        alt: 'Reflection Pool Estate View & Precision Pavers',
        caption: 'Serene Composition — Architecture, Water and Earth Synthesized',
        badge: 'REFLECTION ESTATE'
      }
    ]
  },
  {
    id: '06',
    tag: '06 / 06',
    tabLabel: '06 / 06',
    tabName: 'A CURATED FEW',
    title: 'INTENTIONALLY SELECTIVE',
    subtitle: 'Never Designed For Volume',
    description:
      'We keep our project portfolio limited by choice. Because exceptional architecture requires dedicated attention to understand, explore, refine, and perfect. Fewer projects lead to greater attention.',
    layout: 'full-width',
    images: [
      {
        src: '/assets/images/projects/project-farmhouse-02.webp',
        fallback: '/assets/images/projects/project-farmhouse-02.jpg',
        alt: 'Grand Estate Colonnaded Courtyard & Arched Portals',
        caption: 'Masterwork Composition — Grand Estate Arched Courtyard',
        badge: 'CURATED ESTATE'
      },
      {
        src: '/assets/images/projects/project-pureform-02.webp',
        fallback: '/assets/images/projects/project-pureform-02.jpg',
        alt: 'Modern Tropical Residence with Curved Louvers',
        caption: 'Architectural Louvers & Cantilevered Planters',
        badge: 'TROPICAL VILLA'
      }
    ]
  }
];

export default function SpatialSequence() {
  const [activeTab, setActiveTab] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);

  const activeSequence = spatialSequenceData[activeTab];

  const handleNext = () => {
    setActiveTab((prev) => (prev + 1) % spatialSequenceData.length);
  };

  const handlePrev = () => {
    setActiveTab((prev) => (prev - 1 + spatialSequenceData.length) % spatialSequenceData.length);
  };

  return (
    <section
      id="studio"
      className="relative w-full bg-[#080808] text-[#f4f3ef] py-20 sm:py-28 px-6 sm:px-12 md:px-16 lg:px-20 border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-14 border-b border-white/[0.08] pb-6 sm:pb-8 gap-6">
          <div>
            <div className="flex items-center space-x-2.5 text-xs font-mono-subtle text-subtle tracking-[0.25em] uppercase mb-2">
              <Compass className="w-3.5 h-3.5 text-white/60 animate-pulse" />
              <span>THE ATELIER • SPATIAL SEQUENCE</span>
            </div>
            <h2 className="font-architectural text-3xl sm:text-5xl lg:text-6xl font-light text-white uppercase tracking-wide">
              WHERE VISION TAKES FORM
            </h2>
          </div>

          {/* Sequence Step Tracker & Navigation Buttons */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <span className="text-[10px] font-mono-subtle text-white/40 uppercase tracking-widest block">
                SEQUENCE PROGRESSION
              </span>
              <span className="text-sm font-mono-subtle font-medium text-white tracking-widest">
                {activeSequence.tag}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                aria-label="Previous sequence"
                className="p-2.5 border border-white/20 text-white/70 hover:text-white hover:border-white hover:bg-white/10 transition-all duration-300 focus:outline-none"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next sequence"
                className="p-2.5 border border-white/20 text-white/70 hover:text-white hover:border-white hover:bg-white/10 transition-all duration-300 focus:outline-none"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* --- Interactive Sequence Tabs 01 / 06 Through 06 / 06 --- */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-10 sm:mb-12 scrollbar-none">
          {spatialSequenceData.map((item, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(idx)}
                className={`flex-shrink-0 px-4 sm:px-5 py-2.5 sm:py-3 text-xs font-mono-subtle tracking-widest uppercase transition-all duration-300 border ${
                  isActive
                    ? 'border-white bg-white text-black font-semibold shadow-lg'
                    : 'border-white/10 text-white/50 hover:text-white hover:border-white/30 bg-[#0d0d0d]'
                }`}
              >
                <span className="mr-2 opacity-80">{item.tabLabel}</span>
                <span className="hidden md:inline">{item.tabName}</span>
              </button>
            );
          })}
        </div>

        {/* Active Sequence Content Overview */}
        <div className="mb-8 sm:mb-10 max-w-4xl">
          <div className="text-xs font-mono-subtle text-white/50 tracking-widest uppercase mb-1.5">
            {activeSequence.subtitle}
          </div>
          <h3 className="font-architectural text-2xl sm:text-3xl lg:text-4xl font-light text-white uppercase tracking-wider mb-3">
            {activeSequence.title}
          </h3>
          <p className="text-xs sm:text-sm font-light text-[#bfbeb8] leading-relaxed max-w-3xl">
            {activeSequence.description}
          </p>
        </div>

        {/* --- DYNAMIC LAYOUT STRUCTURES (ASPECT-RATIO LOCKED) --- */}

        {/* 1. Hero View Layout (Sequence 01) */}
        {activeSequence.layout === 'hero' && (
          <div className="space-y-6">
            <SpatialImageCard
              src={activeSequence.images[0].src}
              fallbackImage={activeSequence.images[0].fallback}
              alt={activeSequence.images[0].alt}
              aspectRatio="aspect-[4/3] sm:aspect-[16/9]"
              badge={activeSequence.images[0].badge}
              caption={activeSequence.images[0].caption}
              onClick={() => setLightboxImg(activeSequence.images[0])}
            />
            {activeSequence.images[1] && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="md:col-span-2">
                  <SpatialImageCard
                    src={activeSequence.images[1].src}
                    fallbackImage={activeSequence.images[1].fallback}
                    alt={activeSequence.images[1].alt}
                    aspectRatio="aspect-[16/9]"
                    badge={activeSequence.images[1].badge}
                    caption={activeSequence.images[1].caption}
                    onClick={() => setLightboxImg(activeSequence.images[1])}
                  />
                </div>
                <div className="bg-[#0f0f0f] border border-white/[0.08] p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono-subtle text-white/50 tracking-widest uppercase block mb-2">
                      SPATIAL HIGHLIGHT
                    </span>
                    <h4 className="font-architectural text-lg sm:text-xl font-light text-white uppercase mb-2">
                      RESTORE & IMMERSE
                    </h4>
                    <p className="text-xs font-light text-[#9e9e9e] leading-relaxed">
                      Thermal waters sculpted against mountain topography create quiet, meditative retreats where architecture dissolves into the horizon.
                    </p>
                  </div>
                  <div className="pt-4 mt-6 border-t border-white/[0.08] text-[11px] font-mono-subtle text-white/60">
                    MIRAE EXECUTIVE SANCTUARY
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. 3-Tier Vertical Stack Grid (Sequence 02) */}
        {activeSequence.layout === '3-tier' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeSequence.images.map((img, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <SpatialImageCard
                  src={img.src}
                  fallbackImage={img.fallback}
                  alt={img.alt}
                  aspectRatio="aspect-[4/3] sm:aspect-[16/10]"
                  badge={img.badge}
                  caption={img.caption}
                  onClick={() => setLightboxImg(img)}
                />
                <div className="px-1">
                  <span className="text-[10px] font-mono-subtle text-white/40 uppercase tracking-widest block">
                    PLATE 0{i + 1}
                  </span>
                  <p className="text-xs font-light text-[#c5c4bf] mt-0.5 leading-snug">
                    {img.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. 2-Column Asymmetric Split View (Sequence 03) */}
        {activeSequence.layout === '2-column' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            <div className="md:col-span-7">
              <SpatialImageCard
                src={activeSequence.images[0].src}
                fallbackImage={activeSequence.images[0].fallback}
                alt={activeSequence.images[0].alt}
                aspectRatio="aspect-[4/3] sm:aspect-[16/10]"
                badge={activeSequence.images[0].badge}
                caption={activeSequence.images[0].caption}
                onClick={() => setLightboxImg(activeSequence.images[0])}
              />
            </div>
            <div className="md:col-span-5 flex flex-col justify-between space-y-6">
              <SpatialImageCard
                src={activeSequence.images[1].src}
                fallbackImage={activeSequence.images[1].fallback}
                alt={activeSequence.images[1].alt}
                aspectRatio="aspect-[16/10]"
                badge={activeSequence.images[1].badge}
                caption={activeSequence.images[1].caption}
                onClick={() => setLightboxImg(activeSequence.images[1])}
              />
              <div className="bg-[#0f0f0f] border border-white/[0.08] p-6 flex flex-col justify-center flex-grow">
                <span className="text-[11px] font-mono-subtle text-white/50 tracking-widest uppercase mb-1.5 block">
                  SPATIAL CHARACTER
                </span>
                <h4 className="font-architectural text-lg sm:text-xl font-light text-white uppercase mb-2">
                  THE WARM CUP & BREW & BELONG
                </h4>
                <p className="text-xs font-light text-[#9e9e9e] leading-relaxed">
                  Clay pitched canopies, terracotta jali screens, and open-air courtyards unite to elevate social rituals and casual gatherings into enduring memories.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4. 4-Image Quad Bento Grid (Sequence 04) */}
        {activeSequence.layout === '4-bento' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {activeSequence.images.map((img, i) => (
              <SpatialImageCard
                key={i}
                src={img.src}
                fallbackImage={img.fallback}
                alt={img.alt}
                aspectRatio="aspect-[16/10]"
                badge={img.badge}
                caption={img.caption}
                onClick={() => setLightboxImg(img)}
              />
            ))}
          </div>
        )}

        {/* 5. Dual Landscape Feature (Sequence 05) */}
        {activeSequence.layout === 'dual-landscape' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {activeSequence.images.map((img, i) => (
              <SpatialImageCard
                key={i}
                src={img.src}
                fallbackImage={img.fallback}
                alt={img.alt}
                aspectRatio="aspect-[16/10]"
                badge={img.badge}
                caption={img.caption}
                onClick={() => setLightboxImg(img)}
              />
            ))}
          </div>
        )}

        {/* 6. Full-Width Lightbox Portfolio Grid (Sequence 06) */}
        {activeSequence.layout === 'full-width' && (
          <div className="space-y-6 sm:space-y-8">
            <SpatialImageCard
              src={activeSequence.images[0].src}
              fallbackImage={activeSequence.images[0].fallback}
              alt={activeSequence.images[0].alt}
              aspectRatio="aspect-[16/9]"
              badge={activeSequence.images[0].badge}
              caption={activeSequence.images[0].caption}
              onClick={() => setLightboxImg(activeSequence.images[0])}
            />
            {activeSequence.images[1] && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8">
                  <SpatialImageCard
                    src={activeSequence.images[1].src}
                    fallbackImage={activeSequence.images[1].fallback}
                    alt={activeSequence.images[1].alt}
                    aspectRatio="aspect-[16/10]"
                    badge={activeSequence.images[1].badge}
                    caption={activeSequence.images[1].caption}
                    onClick={() => setLightboxImg(activeSequence.images[1])}
                  />
                </div>
                <div className="md:col-span-4 bg-[#0d0d0d] border border-white/[0.08] p-6 sm:p-8">
                  <span className="text-[11px] font-mono-subtle text-white/50 tracking-widest uppercase block mb-2">
                    FEWER PROJECTS • GREATER ATTENTION
                  </span>
                  <h4 className="font-architectural text-xl font-light text-white uppercase mb-3">
                    INTENTIONALLY SELECTIVE
                  </h4>
                  <p className="text-xs font-light text-[#9e9e9e] leading-relaxed mb-6">
                    Every commission is nurtured directly by leadership and master builders to ensure structural integrity and flawless execution.
                  </p>
                  <button
                    onClick={() => {
                      const contactEl = document.getElementById('contact');
                      if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center space-x-2 text-xs font-mono-subtle tracking-[0.2em] uppercase text-white hover:text-[#d0cfcb] transition-colors"
                  >
                    <span>COMMISSION A STUDY</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImg(null)}
              aria-label="Close lightbox"
              className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full aspect-[16/10] overflow-hidden border border-white/20 bg-neutral-950 shadow-2xl">
              <img
                src={lightboxImg.src}
                onError={(e) => {
                  if (lightboxImg.fallback) e.target.src = lightboxImg.fallback;
                }}
                alt={lightboxImg.alt}
                className="w-full h-full object-contain object-center"
              />
            </div>
            <div className="w-full mt-4 flex items-center justify-between text-xs font-mono-subtle text-white/70 border-t border-white/10 pt-3">
              <span>{lightboxImg.caption || lightboxImg.alt}</span>
              <span className="text-white/40 tracking-widest uppercase">{lightboxImg.badge || 'MIRAE ARCSTUDIO'}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
