'use client';

import { useState, useCallback, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface PhotoGalleryProps {
  images: string[];
  altText: string;
}

/**
 * PhotoGallery
 * - Protected grid using CSS background-image (not <img> tags)
 * - Click opens a fullscreen lightbox modal
 * - Keyboard navigation: Escape, Arrow Left/Right
 * - Copyright footer in the modal
 */
export default function PhotoGallery({ images, altText }: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex(i => (i !== null ? (i - 1 + images.length) % images.length : 0));
  }, [images.length]);

  const next = useCallback(() => {
    setLightboxIndex(i => (i !== null ? (i + 1) % images.length : 0));
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };

    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, prev, next]);

  if (!images || images.length === 0) return null;

  // Show at most 12 thumbnails in the grid
  const displayImages = images.slice(0, 12);
  const remainingCount = images.length - 12;

  return (
    <>
      {/* Thumbnail Grid */}
      <div className="protected-gallery mb-8">
        <h2 className="font-serif text-2xl text-primary-dark mb-4">Galería de Fotos</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {displayImages.map((src, idx) => (
            <button
              key={idx}
              onClick={() => openLightbox(idx)}
              className="relative aspect-square overflow-hidden rounded-xl group cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary-light"
              aria-label={`Ver foto ${idx + 1} de ${altText}`}
            >
              {/* CSS background-image for protection */}
              <div
                className="absolute inset-0 photo-bg transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${src})` }}
                role="img"
                aria-label={`${altText} - foto ${idx + 1}`}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
              </div>
              {/* Last thumbnail: show remaining count */}
              {idx === 11 && remainingCount > 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">+{remainingCount}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label={`Galería de ${altText}`}
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between p-4 text-white/80">
            <span className="text-sm font-sans">
              {lightboxIndex + 1} / {images.length}
            </span>
            <button
              onClick={closeLightbox}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Cerrar galería"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main image area */}
          <div className="flex-1 flex items-center justify-center relative px-14 sm:px-20 protected-gallery">
            {/* Prev button */}
            <button
              onClick={prev}
              className="absolute left-2 sm:left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors text-white z-10"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image (CSS background-image for protection) */}
            <div
              className="w-full h-full max-h-[75vh] photo-bg"
              style={{ backgroundImage: `url(${images[lightboxIndex]})` }}
              role="img"
              aria-label={`${altText} - foto ${lightboxIndex + 1}`}
            />

            {/* Next button */}
            <button
              onClick={next}
              className="absolute right-2 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors text-white z-10"
              aria-label="Foto siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Copyright footer */}
          <div className="text-center py-3 text-white/40 text-xs font-sans pointer-events-none select-none">
            © Machu Picchu Travel Adventures — Todos los derechos reservados. Fotografías protegidas por derechos de autor.
          </div>
        </div>
      )}
    </>
  );
}
