/**
 * MIRAE Reusable High-Performance Image Preloader
 * Decodes critical architectural images before rendering.
 * Prevents duplicate network requests, tracks progress, and provides guaranteed fallback on error.
 */

const preloadedCache = new Set();

export async function preloadSingleImage(src, timeoutMs = 2500) {
  if (!src) return null;
  if (preloadedCache.has(src)) return src;

  return new Promise((resolve) => {
    let settled = false;
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        console.warn(`[Preloader] Image timeout: ${src}`);
        resolve(null);
      }
    }, timeoutMs);

    const done = (result) => {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        if (result) preloadedCache.add(src);
        resolve(result);
      }
    };

    const img = new Image();
    img.src = src;

    // Use HTMLImageElement.decode() for off-thread GPU bitmap decoding
    if ('decode' in img) {
      img.decode()
        .then(() => done(src))
        .catch(() => {
          // Fallback to traditional load event
          img.onload = () => done(src);
          img.onerror = () => {
            console.warn(`[Preloader] Image failed to decode: ${src}`);
            done(null); // Continue gracefully without blocking
          };
        });
    } else {
      img.onload = () => done(src);
      img.onerror = () => {
        console.warn(`[Preloader] Image failed to load: ${src}`);
        done(null);
      };
    }
  });
}

export async function preloadImageBatch(sources, onProgress) {
  let loadedCount = 0;
  const total = sources.length;

  const promises = sources.map(async (src) => {
    const res = await preloadSingleImage(src);
    loadedCount++;
    if (onProgress) {
      onProgress(Math.round((loadedCount / total) * 100));
    }
    return res;
  });

  return Promise.all(promises);
}
