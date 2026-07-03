'use client';
import Image, { ImageProps } from 'next/image';

interface ProtectedImageProps extends ImageProps {
  showCopyright?: boolean;
}

/**
 * ProtectedImage
 * Wraps Next.js Image with drag prevention, context menu blocking,
 * and an optional copyright watermark overlay.
 */
export function ProtectedImage({ showCopyright = false, className, ...props }: ProtectedImageProps) {
  return (
    <div className="relative select-none" data-protected="true">
      <Image
        {...props}
        className={className}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
      />
      {showCopyright && (
        <div
          className="absolute bottom-1 right-1 text-white/60 text-[9px] font-sans pointer-events-none select-none z-10 bg-black/30 px-1 py-0.5 rounded"
          aria-hidden="true"
        >
          © Machu Picchu Travel Adventures
        </div>
      )}
    </div>
  );
}
