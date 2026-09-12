import React, { useState } from 'react';

/**
 * Standardized Aspect-Ratio Locked Image Component
 * Ensures zero image stretching or squishing across all viewport sizes
 */
export const SpatialImageCard = ({
  src,
  fallbackImage,
  alt = 'MIRAE Architectural Visual',
  aspectRatio = 'aspect-[16/9]',
  className = '',
  badge = null,
  caption = null,
  onClick = null
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    if (fallbackImage && imgSrc !== fallbackImage) {
      setImgSrc(fallbackImage);
    } else if (src.endsWith('.webp')) {
      setImgSrc(src.replace('.webp', '.jpg'));
    }
  };

  return (
    <div
      onClick={onClick}
      className={`group relative w-full overflow-hidden bg-neutral-950 border border-white/[0.08] transition-all duration-500 hover:border-white/30 ${aspectRatio} ${className} ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <img
        src={imgSrc}
        onError={handleError}
        alt={alt}
        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
        loading="lazy"
        decoding="async"
      />

      {/* Subtle Ambient Shadow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* Optional Architectural Badge */}
      {badge && (
        <div className="absolute top-3.5 left-3.5 z-10 bg-black/70 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono-subtle text-white/80 border border-white/10 tracking-widest uppercase">
          {badge}
        </div>
      )}

      {/* Optional Bottom Caption Overlay */}
      {caption && (
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-[11px] font-mono-subtle text-white/75 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="truncate">{caption}</span>
          <span className="text-white/40 tracking-widest text-[9px] uppercase ml-2 shrink-0">VIEW</span>
        </div>
      )}
    </div>
  );
};

export default SpatialImageCard;
