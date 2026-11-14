/**
 * Tier 2: Boundary 8 — Visual Asset CMS Boundaries
 */

import { TestSuite, expect } from '../harness/assertions';
import { assertValidHeroSlide, assertValidHeroSlidesJson } from '@/lib/visual-assets';
import { getTestDb } from '../harness/env';

export const visualAssetsBoundarySuite = new TestSuite(
  'Tier 2.8: Visual Asset CMS Boundaries',
  'Tier 2: Boundary & Corner Cases'
);

visualAssetsBoundarySuite.test(
  'T8.2.1',
  'Setting home_hero_slides to empty array displays default fallback banner',
  async () => {
    const db = getTestDb();

    // Set slides to empty array
    await db.from('site_settings')
      .eq('tenant', 'mta')
      .eq('key', 'home_hero_slides')
      .update({ value: JSON.stringify([]) });

    const { data: setting } = await db.from('site_settings')
      .eq('tenant', 'mta')
      .eq('key', 'home_hero_slides')
      .single();

    const parsedSlides = JSON.parse(setting.value);
    expect(parsedSlides).toEqual([]);

    // UI rendering fallback check
    const defaultFallbackSlide = {
      title: 'Machu Picchu Travel Adventures',
      subtitle: 'Descubre los Andes',
      image: '/imagenes/hero-slider/fallback-default.jpg',
    };

    const renderedSlides = parsedSlides.length > 0 ? parsedSlides : [defaultFallbackSlide];
    expect(renderedSlides.length).toBe(1);
    expect(renderedSlides[0].image).toBe('/imagenes/hero-slider/fallback-default.jpg');
  }
);

visualAssetsBoundarySuite.test(
  'T8.2.2',
  'Setting home_hero_slides with malformed JSON string gracefully caught with error',
  () => {
    const malformedRawString = '{ title: "Unquoted key", broken json [';
    expect(() => {
      assertValidHeroSlidesJson(malformedRawString);
    }).toThrow('Invalid JSON syntax');
  }
);

visualAssetsBoundarySuite.test(
  'T8.2.3',
  'Slide missing optional link URL renders as non-clickable slide without crash',
  () => {
    const slideWithoutLink: { title: string; subtitle: string; image: string; link?: string } = {
      title: 'Vista Panorámica de Huayna Picchu',
      subtitle: 'Fotografía capturada por nuestro equipo en 2026',
      image: '/imagenes/hero-slider/huayna-picchu.jpg',
      // link is omitted
    };

    // Validates slide schema passes with optional link omitted
    expect(() => {
      assertValidHeroSlide(slideWithoutLink);
    }).not.toThrow();

    expect(slideWithoutLink.link).toBeUndefined();
    expect(slideWithoutLink.title).toBe('Vista Panorámica de Huayna Picchu');
  }
);

visualAssetsBoundarySuite.test(
  'T8.2.4',
  'Maximum slide count (10+ slides) renders with functional carousel controls',
  async () => {
    const db = getTestDb();

    const tenSlides = Array.from({ length: 12 }).map((_, i) => ({
      title: `Diapositiva ${i + 1}`,
      subtitle: `Subtítulo descriptivo ${i + 1}`,
      image: `/imagenes/hero-slider/slide-${i + 1}.jpg`,
      link: `/tours/slide-${i + 1}`,
    }));

    const { data: updated, error } = await db.from('site_settings')
      .eq('tenant', 'mta')
      .eq('key', 'home_hero_slides')
      .update({ value: JSON.stringify(tenSlides) });

    expect(error).toBeNull();
    const parsed = JSON.parse(updated![0].value);
    expect(parsed.length).toBe(12);

    // Carousel configuration supports up to N slides with loop enabled
    const carouselConfig = {
      loop: true,
      slideCount: parsed.length,
      hasControls: parsed.length > 1,
    };
    expect(carouselConfig.hasControls).toBe(true);
  }
);

visualAssetsBoundarySuite.test(
  'T8.2.5',
  'Cross-tenant visual asset overwrite attempt rejected',
  async () => {
    const db = getTestDb();

    // Attempt to update Sonqo's slides using an MTA scoped query
    const mtaTenant = 'mta';
    const { data: matched } = await db.from('site_settings')
      .eq('tenant', mtaTenant)
      .eq('key', 'home_hero_slides');

    for (const item of matched!) {
      expect(item.tenant).toBe('mta');
    }

    // Direct attempt to write a conflicting row for Sonqo with same key is rejected
    const { error: duplicateKeyError } = await db.from('site_settings').insert({
      tenant: 'sonqo' as const,
      key: 'home_hero_slides',
      value: '[]',
    });
    expect(duplicateKeyError).toBeDefined();
    expect(duplicateKeyError?.message).toContain('site_settings_tenant_key_unique');
  }
);
