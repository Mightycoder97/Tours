'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroCarouselProps {
  images: string[];
  altText: string;
}

const AUTO_ADVANCE_MS = 5000;

export default function HeroCarousel({ images, altText }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Touch / swipe support
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = images.length;

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent((index + total) % total);
      setTimeout(() => setIsTransitioning(false), 400);
    },
    [isTransitioning, total]
  );

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const id = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [isPaused, next, total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [prev, next]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 50) {
      delta > 0 ? next() : prev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!images || images.length === 0) return null;

  // Single image — no carousel chrome needed
  if (total === 1) {
    return (
      <div
        className="photo-bg protected-gallery rounded-3xl overflow-hidden shadow-lg aspect-video w-full mb-6 relative"
        style={{ backgroundImage: `url(${images[0]})` }}
        role="img"
        aria-label={altText}
        onDragStart={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div
          className="absolute bottom-2 right-3 text-white/60 text-[9px] font-sans pointer-events-none select-none z-10 bg-black/30 px-1.5 py-0.5 rounded"
          aria-hidden="true"
        >
          © Machu Picchu Travel Adventures
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative rounded-3xl overflow-hidden shadow-lg aspect-video w-full mb-6 protected-gallery group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onDragStart={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
      role="region"
      aria-label={`Galería de fotos: ${altText}`}
      aria-roledescription="carousel"
    >
      {/* Slides */}
      {images.map((src, idx) => (
        <div
          key={idx}
          className="photo-bg absolute inset-0 transition-opacity duration-500 ease-in-out"
          style={{
            backgroundImage: `url(${src})`,
            opacity: idx === current ? 1 : 0,
            zIndex: idx === current ? 1 : 0,
          }}
          role="img"
          aria-label={`${altText} — foto ${idx + 1} de ${total}`}
          aria-hidden={idx !== current}
        />
      ))}

      {/* Dark gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40 z-10 pointer-events-none" />

      {/* Left arrow */}
      <button
        onClick={prev}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/55 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 focus-visible:opacity-100 shadow-lg"
        aria-label="Foto anterior"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/55 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 focus-visible:opacity-100 shadow-lg"
        aria-label="Foto siguiente"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dot indicators */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5"
        role="tablist"
        aria-label="Seleccionar foto"
      >
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            role="tab"
            aria-selected={idx === current}
            aria-label={`Foto ${idx + 1}`}
            className={`transition-all duration-300 rounded-full shadow !min-w-0 !min-h-0 ${
              idx === current
                ? 'w-6 h-2 bg-white'
                : 'w-2 h-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-4 right-4 z-20 bg-black/30 backdrop-blur-sm text-white/90 text-xs font-sans font-medium px-2.5 py-1 rounded-full pointer-events-none select-none">
        {current + 1} / {total}
      </div>

      {/* Copyright notice */}
      <div
        className="absolute bottom-2 right-3 z-20 text-white/55 text-[9px] font-sans pointer-events-none select-none bg-black/25 px-1.5 py-0.5 rounded"
        aria-hidden="true"
      >
        © Machu Picchu Travel Adventures
      </div>
    </div>
  );
}
