import React, { useEffect } from 'react';
import { useFandom } from '../context/FandomContext';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export const LightboxModal = () => {
  const { lightbox, closeLightbox, nextLightbox, prevLightbox } = useFandom();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox.isOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.isOpen, closeLightbox, nextLightbox, prevLightbox]);

  if (!lightbox.isOpen || !lightbox.images.length) return null;

  const currentImg = lightbox.images[lightbox.currentIndex];

  return (
    <div
      onClick={closeLightbox}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-backdrop-fade cursor-pointer"
    >
      {/* Top Header */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between z-10 bg-gradient-to-b from-black/80 to-transparent cursor-default"
      >
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded bg-purple-600/30 border border-purple-500/40 text-xs font-mono text-purple-300">
            {lightbox.currentIndex + 1} / {lightbox.images.length}
          </span>
          {lightbox.title && (
            <h3 className="text-sm sm:text-base font-semibold text-white drop-shadow">
              {lightbox.title}
            </h3>
          )}
        </div>

        <button
          onClick={closeLightbox}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all transform hover:rotate-90"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Display with Carousel controls */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full max-h-[85vh] max-w-6xl mx-auto flex items-center justify-center p-4 sm:p-12 cursor-default animate-modal-pop"
      >
        <img
          src={currentImg}
          alt={lightbox.title || 'Gallery image'}
          className="max-h-full max-w-full object-contain rounded-lg shadow-2xl transition-all duration-300"
        />

        {/* Previous Button */}
        {lightbox.images.length > 1 && (
          <button
            onClick={prevLightbox}
            className="absolute left-2 sm:left-6 p-3 rounded-full bg-slate-900/80 hover:bg-purple-600 border border-white/20 text-white transition-all transform hover:scale-110 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {lightbox.images.length > 1 && (
          <button
            onClick={nextLightbox}
            className="absolute right-2 sm:right-6 p-3 rounded-full bg-slate-900/80 hover:bg-purple-600 border border-white/20 text-white transition-all transform hover:scale-110 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      {lightbox.images.length > 1 && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2 px-4 overflow-x-auto py-2 cursor-default"
        >
          {lightbox.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                lightbox.currentIndex = idx;
              }}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                idx === lightbox.currentIndex
                  ? 'border-purple-500 scale-105 shadow-lg shadow-purple-900/60'
                  : 'border-white/20 opacity-50 hover:opacity-100'
              }`}
            >
              <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
