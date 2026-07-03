'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Images } from 'lucide-react';
import GalleryModal from '@/components/tours/GalleryModal';

interface GallerySectionProps {
  images: string[];
  mainImage: string;
  altText: string;
}

export default function GallerySection({ images, mainImage, altText }: GallerySectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Combine main image + additional images for the modal
  const allImages = [mainImage, ...images];

  const handleThumbnailClick = (idx: number) => {
    // idx here is the index in `images` array; +1 because allImages[0] = mainImage
    setCurrentIndex(idx + 1);
    setIsModalOpen(true);
  };

  const handleViewGallery = () => {
    setCurrentIndex(0);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Small Masonry Gallery */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12">
        {images.map((img: string, idx: number) => (
          <div
            key={idx}
            onClick={() => handleThumbnailClick(idx)}
            className="rounded-xl sm:rounded-2xl overflow-hidden aspect-square h-28 sm:h-36 md:h-48 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative"
          >
            <Image
              src={img}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
              className="object-cover hover:scale-105 transition-transform duration-500"
              alt={`${altText} — foto ${idx + 1}`}
            />
          </div>
        ))}

        {/* "Ver galería" tile */}
        <div
          onClick={handleViewGallery}
          className="rounded-xl sm:rounded-2xl overflow-hidden aspect-square h-28 sm:h-36 md:h-48 bg-gray-100 flex flex-col items-center justify-center gap-2 font-bold text-primary-dark hover:bg-gray-200 transition-colors shadow-sm cursor-pointer text-sm sm:text-base"
        >
          <Images className="w-6 h-6" />
          <span>Ver galería</span>
        </div>
      </div>

      {/* Gallery Modal */}
      <GalleryModal
        images={allImages}
        initialIndex={currentIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
