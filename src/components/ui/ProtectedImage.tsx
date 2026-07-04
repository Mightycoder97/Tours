'use client';
import Image, { ImageProps } from 'next/image';

interface ProtectedImageProps extends ImageProps {
  showCopyright?: boolean;
}

/**
 * ProtectedImage
 * Wraps Next.js Image with drag prevention, context menu blocking,
 * and an optional copyright notice overlay.
 *
 * When `fill` is used the wrapper is absolute inset-0 so the image
 * fills the nearest positioned ancestor (the caller's container).
 * When `fill` is NOT used the wrapper is relative and sized by the image.
 */
export function ProtectedImage({ showCopyright = false, fill, className, ...props }: ProtectedImageProps) {
  const wrapperClass = fill
    ? 'absolute inset-0 select-none'
    : 'relative select-none';

  return (
    <div className={wrapperClass} data-protected="true">
      <Image
        {...props}
        fill={fill}
        className={className ?? (fill ? 'object-cover' : undefined)}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
        unoptimized
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
