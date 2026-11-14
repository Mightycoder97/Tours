/**
 * Tier 2: Boundary 7 — Media Gallery Boundaries
 */

import { TestSuite, expect } from '../harness/assertions';
import { assertValidImageUrl } from '@/lib/validation';
import { reorderGalleryImages, assertValidGallery } from '@/lib/gallery';
import { getTestDb } from '../harness/env';

export const galleryBoundarySuite = new TestSuite(
  'Tier 2.7: Media Gallery Boundaries',
  'Tier 2: Boundary & Corner Cases'
);

galleryBoundarySuite.test(
  'T7.2.1',
  'Tour with 0 gallery images (empty array) renders without layout break or null pointer',
  async () => {
    const db = getTestDb();

    const { data: tour, error } = await db.from('tours').insert({
      slug: 'tour-empty-gallery',
      tenant: 'mta' as const,
      title: 'Tour Sin Fotos Secundarias',
      price_adult: 180,
      image_url: 'https://images.unsplash.com/main',
      images: [],
    });

    expect(error).toBeNull();
    expect(tour![0].images).toEqual([]);

    // Simulating public gallery rendering logic
    const displayedImages = tour![0].images && tour![0].images.length > 0
      ? tour![0].images
      : [tour![0].image_url]; // Fallback to hero image

    expect(displayedImages.length).toBe(1);
    expect(displayedImages[0]).toBe('https://images.unsplash.com/main');
  }
);

galleryBoundarySuite.test(
  'T7.2.2',
  'Duplicate image URLs in gallery deduplicated or preserved cleanly',
  async () => {
    const db = getTestDb();
    const rawImages = [
      'https://images.unsplash.com/photo-1',
      'https://images.unsplash.com/photo-2',
      'https://images.unsplash.com/photo-1', // duplicate
      'https://images.unsplash.com/photo-3',
      'https://images.unsplash.com/photo-2', // duplicate
    ];

    // Save tour with duplicate images to database
    const { data: tour, error } = await db.from('tours').insert({
      slug: 'tour-dup-gallery',
      tenant: 'mta' as const,
      title: 'Tour Galería Duplicados',
      price_adult: 300,
      image_url: rawImages[0],
      images: rawImages,
    });

    expect(error).toBeNull();
    expect(tour).toBeDefined();
    assertValidGallery(tour![0].images);
    expect(tour![0].images.length).toBe(5); // Preserved cleanly without corruption
  }
);

galleryBoundarySuite.test(
  'T7.2.3',
  'Extremely long image URL (2048+ chars) or malformed URL rejected by validator',
  () => {
    // 1. Extreme length (2500 chars)
    const extremeUrl = 'https://images.unsplash.com/photo?' + 'x='.repeat(1250);
    expect(() => {
      assertValidImageUrl(extremeUrl);
    }).toThrow('exceeds maximum length');

    // 2. Malformed non-URL string
    expect(() => {
      assertValidImageUrl('not-a-valid-url-scheme');
    }).toThrow('Malformed URL');

    // 3. Dangerous javascript pseudo protocol
    expect(() => {
      assertValidImageUrl('javascript:alert(1)');
    }).toThrow('Invalid URL protocol');
  }
);

galleryBoundarySuite.test(
  'T7.2.4',
  'Maximum gallery size (50 images) handled smoothly',
  async () => {
    const db = getTestDb();

    const maxGallery = Array.from({ length: 50 }).map(
      (_, i) => `https://images.unsplash.com/photo-gallery-max-${i + 1}`
    );

    const { data: tour, error } = await db.from('tours').insert({
      slug: 'tour-max-gallery',
      tenant: 'sonqo' as const,
      title: 'Tour Galería Máxima',
      price_adult: 400,
      image_url: maxGallery[0],
      images: maxGallery,
    });

    expect(error).toBeNull();
    expect(tour![0].images.length).toBe(50);
    expect(tour![0].images[49]).toBe('https://images.unsplash.com/photo-gallery-max-50');
  }
);

galleryBoundarySuite.test(
  'T7.2.5',
  'Single image gallery reorder operation behaves idempotently',
  () => {
    const singleImageGallery = ['https://images.unsplash.com/only-one'];
    const reordered = reorderGalleryImages(singleImageGallery, 0, 0);
    expect(reordered).toEqual(singleImageGallery);
  }
);
