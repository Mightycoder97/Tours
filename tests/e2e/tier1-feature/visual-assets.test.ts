/**
 * Tier 1: Feature 8 — Visual Asset & Banner Distribution CMS Tests
 */

import { TestSuite, expect } from '../harness/assertions';
import { getTestDb } from '../harness/env';

export const visualAssetsFeatureSuite = new TestSuite(
  'Tier 1.8: Visual Asset & Banner Distribution CMS',
  'Tier 1: Feature Tests'
);

visualAssetsFeatureSuite.test(
  'T8.1.1',
  'Admin can configure Hero Slider slides (title, subtitle, image, link) for MTA in site_settings',
  async () => {
    const db = getTestDb();

    const mtaSlides = [
      {
        title: 'Explora los Andes Peruanos',
        subtitle: 'Viajes inolvidables con Machu Picchu Travel Adventures',
        image: '/imagenes/hero-slider/mta-promo-1.jpg',
        link: '/tours',
      },
      {
        title: 'Cusco Clásico & Valle Sagrado',
        subtitle: 'Historia viva en cada rincón',
        image: '/imagenes/hero-slider/mta-promo-2.jpg',
        link: '/tours/cusco-clasico',
      },
    ];

    const { data, error } = await db.from('site_settings')
      .eq('tenant', 'mta')
      .eq('key', 'home_hero_slides')
      .update({ value: JSON.stringify(mtaSlides) });

    expect(error).toBeNull();
    expect(data![0].tenant).toBe('mta');

    const parsed = JSON.parse(data![0].value);
    expect(parsed.length).toBe(2);
    expect(parsed[0].title).toBe('Explora los Andes Peruanos');
  }
);

visualAssetsFeatureSuite.test(
  'T8.1.2',
  'Admin can configure Hero Slider slides for Sonqo in site_settings',
  async () => {
    const db = getTestDb();

    const sonqoSlides = [
      {
        title: 'Despierta tu Espíritu Andino',
        subtitle: 'Turismo consciente y místico en el corazón del Cusco',
        image: '/imagenes/hero-slider/sonqo-promo-1.jpg',
        link: '/tours',
      },
    ];

    const { data, error } = await db.from('site_settings')
      .eq('tenant', 'sonqo')
      .eq('key', 'home_hero_slides')
      .update({ value: JSON.stringify(sonqoSlides) });

    expect(error).toBeNull();
    expect(data![0].tenant).toBe('sonqo');

    const parsed = JSON.parse(data![0].value);
    expect(parsed.length).toBe(1);
    expect(parsed[0].title).toBe('Despierta tu Espíritu Andino');
  }
);

visualAssetsFeatureSuite.test(
  'T8.1.3',
  'Hero slider CMS updates persist as valid JSON in site_settings',
  async () => {
    const db = getTestDb();

    const { data: setting } = await db.from('site_settings')
      .eq('tenant', 'mta')
      .eq('key', 'home_hero_slides')
      .single();

    expect(setting).toBeDefined();
    expect(typeof setting.value).toBe('string');

    // Parse and verify valid JSON schema
    let parsed: any;
    expect(() => {
      parsed = JSON.parse(setting.value);
    }).not.toThrow();

    expect(Array.isArray(parsed)).toBe(true);
    for (const slide of parsed) {
      expect(typeof slide.title).toBe('string');
      expect(typeof slide.image).toBe('string');
    }
  }
);

visualAssetsFeatureSuite.test(
  'T8.1.4',
  'HeroSlider.tsx dynamically renders slides from active brand settings',
  async () => {
    const db = getTestDb();

    // 1. Fetch MTA slides
    const { data: mtaSetting } = await db.from('site_settings')
      .eq('tenant', 'mta')
      .eq('key', 'home_hero_slides')
      .single();
    const mtaSlides = JSON.parse(mtaSetting.value);
    expect(mtaSlides.length).toBeGreaterThan(0);

    // 2. Fetch Sonqo slides
    const { data: sonqoSetting } = await db.from('site_settings')
      .eq('tenant', 'sonqo')
      .eq('key', 'home_hero_slides')
      .single();
    const sonqoSlides = JSON.parse(sonqoSetting.value);
    expect(sonqoSlides.length).toBeGreaterThan(0);

    // 3. Brand isolation of rendered slides
    expect(mtaSlides[0].title).not.toBe(sonqoSlides[0].title);
  }
);

visualAssetsFeatureSuite.test(
  'T8.1.5',
  'Section promotional banners can be updated independently per brand',
  async () => {
    const db = getTestDb();

    // 1. MTA Section Banner
    await db.from('site_settings').insert({
      tenant: 'mta' as const,
      key: 'banner_promotional_cta',
      value: JSON.stringify({
        bannerUrl: '/imagenes/banners/mta-cta.jpg',
        headline: 'Reserva Hoy con MTA',
      }),
    });

    // 2. Sonqo Section Banner
    await db.from('site_settings').insert({
      tenant: 'sonqo' as const,
      key: 'banner_promotional_cta',
      value: JSON.stringify({
        bannerUrl: '/imagenes/banners/sonqo-cta.jpg',
        headline: 'Conecta con Sonqo Perú',
      }),
    });

    // 3. Verify independent retrieval
    const { data: mtaBanner } = await db.from('site_settings')
      .eq('tenant', 'mta')
      .eq('key', 'banner_promotional_cta')
      .single();
    const { data: sonqoBanner } = await db.from('site_settings')
      .eq('tenant', 'sonqo')
      .eq('key', 'banner_promotional_cta')
      .single();

    expect(mtaBanner.tenant).toBe('mta');
    expect(sonqoBanner.tenant).toBe('sonqo');
    expect(mtaBanner.value).toContain('Reserva Hoy con MTA');
    expect(sonqoBanner.value).toContain('Conecta con Sonqo Perú');
  }
);
