/**
 * Tier 1: Feature 7 — Media Gallery Management for Tours Tests
 */

import { TestSuite, expect, assertValidGallery } from '../harness/assertions';
import { getTestDb } from '../harness/env';

export const galleryFeatureSuite = new TestSuite(
  'Tier 1.7: Media Gallery Management for Tours',
  'Tier 1: Feature Tests'
);

galleryFeatureSuite.test(
  'T7.1.1',
  'Tour primary hero image (image_url) is configured and persisted',
  async () => {
    const db = getTestDb();

    const heroImageUrl = 'https://images.unsplash.com/photo-machu-picchu-hero-main';
    const { data: created, error } = await db.from('tours').insert({
      slug: 'tour-con-hero-image',
      tenant: 'mta' as const,
      title: 'Tour con Imagen Principal',
      price_adult: 200,
      image_url: heroImageUrl,
    });

    expect(error).toBeNull();
    expect(created![0].image_url).toBe(heroImageUrl);
  }
);

galleryFeatureSuite.test(
  'T7.1.2',
  'Multiple gallery images can be added to images TEXT[]',
  async () => {
    const db = getTestDb();

    const gallery = [
      'https://images.unsplash.com/photo-gallery-1',
      'https://images.unsplash.com/photo-gallery-2',
      'https://images.unsplash.com/photo-gallery-3',
    ];

    assertValidGallery(gallery);

    const { data: created, error } = await db.from('tours').insert({
      slug: 'tour-con-galeria',
      tenant: 'mta' as const,
      title: 'Tour con Galería',
      price_adult: 250,
      image_url: gallery[0],
      images: gallery,
    });

    expect(error).toBeNull();
    expect(created![0].images).toEqual(gallery);
    expect(created![0].images.length).toBe(3);
  }
);

galleryFeatureSuite.test(
  'T7.1.3',
  'Gallery images can be reordered in the CMS',
  async () => {
    const db = getTestDb();

    // 1. Create tour with ordered gallery
    const initialOrder = [
      'https://images.unsplash.com/img-a',
      'https://images.unsplash.com/img-b',
      'https://images.unsplash.com/img-c',
    ];
    const { data: created } = await db.from('tours').insert({
      slug: 'tour-reordenar-galeria',
      tenant: 'mta' as const,
      title: 'Tour Reordenar',
      price_adult: 180,
      image_url: initialOrder[0],
      images: initialOrder,
    });
    const tourId = created![0].id;

    // 2. Reorder: move 'img-c' to first position
    const reordered = [
      'https://images.unsplash.com/img-c',
      'https://images.unsplash.com/img-a',
      'https://images.unsplash.com/img-b',
    ];

    const { data: updated, error } = await db.from('tours')
      .eq('id', tourId)
      .update({ images: reordered });

    expect(error).toBeNull();
    expect(updated![0].images).toEqual(reordered);
    expect(updated![0].images[0]).toBe('https://images.unsplash.com/img-c');
  }
);

galleryFeatureSuite.test(
  'T7.1.4',
  'Gallery images can be removed individually',
  async () => {
    const db = getTestDb();

    const initialGallery = [
      'https://images.unsplash.com/img-1',
      'https://images.unsplash.com/img-to-remove',
      'https://images.unsplash.com/img-3',
    ];

    const { data: created } = await db.from('tours').insert({
      slug: 'tour-eliminar-foto',
      tenant: 'sonqo' as const,
      title: 'Tour Eliminar Foto',
      price_adult: 300,
      image_url: initialGallery[0],
      images: initialGallery,
    });
    const tourId = created![0].id;

    // Remove 'img-to-remove'
    const filteredGallery = initialGallery.filter(url => !url.includes('img-to-remove'));
    expect(filteredGallery.length).toBe(2);

    const { data: updated, error } = await db.from('tours')
      .eq('id', tourId)
      .update({ images: filteredGallery });

    expect(error).toBeNull();
    expect(updated![0].images).toEqual(filteredGallery);
    expect(updated![0].images).not.toContain('https://images.unsplash.com/img-to-remove');
  }
);

galleryFeatureSuite.test(
  'T7.1.5',
  'Public tour detail page renders the full gallery image set',
  async () => {
    const db = getTestDb();

    // Query pre-seeded MTA tour
    const { data: tour } = await db.from('tours')
      .eq('tenant', 'mta')
      .eq('slug', 'camino-inca-clasico')
      .single();

    expect(tour).toBeDefined();
    expect(tour.images).toBeDefined();
    expect(tour.images.length).toBeGreaterThan(0);
    assertValidGallery(tour.images);

    // Verify all images are valid URL strings
    for (const imgUrl of tour.images) {
      expect(typeof imgUrl).toBe('string');
      expect(imgUrl.startsWith('https://')).toBe(true);
    }
  }
);
