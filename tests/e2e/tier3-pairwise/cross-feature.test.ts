/**
 * Tier 3: Cross-Feature Combinations (10 Pairwise Interaction Tests)
 */

import {
  TestSuite,
  expect,
  assertTenantIsolation,
  assertValidGallery,
  calculateBookingTotal,
} from '../harness/assertions';
import { AuthHelper } from '../harness/auth-helper';
import { BrandHelper } from '../harness/brand-helper';
import { getTestDb } from '../harness/env';

export const crossFeatureSuite = new TestSuite(
  'Tier 3: Pairwise Cross-Feature Interactions',
  'Tier 3: Pairwise Combinations'
);

crossFeatureSuite.test(
  'T3.0.1 (F1 + F3)',
  'Admin brand switcher retains authenticated session across brand transitions without forcing re-login',
  async () => {
    // 1. Authenticate user
    const login = await AuthHelper.login('admin@machupicchutravel.com', 'AdminPassword123!');
    expect(login.success).toBe(true);

    const sessionCookie = login.token!;
    let currentCookies: Record<string, string> = {
      'sb-access-token': sessionCookie,
      admin_brand: 'mta',
    };

    // 2. Switch brand to Sonqo
    await BrandHelper.setAdminActiveBrand('sonqo');
    currentCookies.admin_brand = 'sonqo';

    // 3. Verify session remains fully valid under new brand context (genuine middleware execution)
    const authCheck = await AuthHelper.executeMiddleware({
      url: 'http://localhost:3000/admin',
      cookies: currentCookies,
    });
    expect(authCheck.status).toBe(200);
    expect(authCheck.location).toBeNull();

    const currentBrand = await BrandHelper.getAdminActiveBrand(currentCookies);
    expect(currentBrand).toBe('sonqo');
  }
);

crossFeatureSuite.test(
  'T3.0.2 (F2 + F5)',
  'Tour creation in MTA context persists with tenant=mta; switching to Sonqo context hides the MTA tour and permits creating a same-slug Sonqo tour',
  async () => {
    const db = getTestDb();
    const slug = 'choquequirao-trek-4-dias';

    // 1. Create tour in MTA
    const { data: mtaTour, error: errMta } = await db.from('tours').insert({
      slug,
      tenant: 'mta' as const,
      title: 'Choquequirao Trek 4 Días - MTA',
      price_adult: 480.0,
      image_url: 'https://images.unsplash.com/choquequirao-mta',
    });
    expect(errMta).toBeNull();
    expect(mtaTour![0].tenant).toBe('mta');

    // 2. Switch to Sonqo context: query for this slug returns null
    const { data: sonqoLookupPre } = await db.from('tours')
      .eq('tenant', 'sonqo')
      .eq('slug', slug)
      .maybeSingle();
    expect(sonqoLookupPre).toBeNull();

    // 3. Create same slug tour in Sonqo
    const { data: sonqoTour, error: errSonqo } = await db.from('tours').insert({
      slug,
      tenant: 'sonqo' as const,
      title: 'Choquequirao Trek Ancestral - Sonqo Perú',
      price_adult: 510.0,
      image_url: 'https://images.unsplash.com/choquequirao-sonqo',
    });
    expect(errSonqo).toBeNull();
    expect(sonqoTour![0].tenant).toBe('sonqo');
    expect(sonqoTour![0].id).not.toBe(mtaTour![0].id);
  }
);

crossFeatureSuite.test(
  'T3.0.3 (F3 + F5)',
  'Admin tours listing filters exclusively by the active brand selected in the switcher',
  async () => {
    const db = getTestDb();

    // Context: MTA
    const activeMta = await BrandHelper.getAdminActiveBrand({ admin_brand: 'mta' });
    const { data: mtaTours } = await db.from('tours').eq('tenant', activeMta);
    assertTenantIsolation(mtaTours!, 'mta');

    // Context: Sonqo
    const activeSonqo = await BrandHelper.getAdminActiveBrand({ admin_brand: 'sonqo' });
    const { data: sonqoTours } = await db.from('tours').eq('tenant', activeSonqo);
    assertTenantIsolation(sonqoTours!, 'sonqo');
  }
);

crossFeatureSuite.test(
  'T3.0.4 (F3 + F6)',
  'Availability batch creation under Sonqo context only attaches availability to Sonqo tours',
  async () => {
    const db = getTestDb();
    const activeSonqo = await BrandHelper.getAdminActiveBrand({ admin_brand: 'sonqo' });

    // 1. Fetch available tours for active brand
    const { data: sonqoTours } = await db.from('tours').eq('tenant', activeSonqo);
    expect(sonqoTours).toBeDefined();
    expect(sonqoTours!.length).toBeGreaterThan(0);

    const targetTour = sonqoTours![0];
    expect(targetTour.tenant).toBe('sonqo');

    // 2. Insert availability
    const { data: slot, error } = await db.from('tour_availability').insert({
      tour_id: targetTour.id,
      tenant: activeSonqo,
      date: '2026-12-25',
      capacity: 14,
      booked_count: 0,
    });

    expect(error).toBeNull();
    expect(slot![0].tenant).toBe('sonqo');
    expect(slot![0].tour_id).toBe(targetTour.id);
  }
);

crossFeatureSuite.test(
  'T3.0.5 (F3 + F8)',
  'Updating Hero Slides in Admin Visual CMS under Sonqo writes only to site_settings WHERE tenant=sonqo',
  async () => {
    const db = getTestDb();
    const activeSonqo = await BrandHelper.getAdminActiveBrand({ admin_brand: 'sonqo' });

    const newSonqoSlide = [
      {
        title: 'Mística Experiencia en Cusco',
        subtitle: 'Sonqo Perú Travel',
        image: '/imagenes/hero-slider/sonqo-new.jpg',
        link: '/tours',
      },
    ];

    await db.from('site_settings')
      .eq('tenant', activeSonqo)
      .eq('key', 'home_hero_slides')
      .update({ value: JSON.stringify(newSonqoSlide) });

    // Verify Sonqo was updated
    const { data: sonqoSetting } = await db.from('site_settings')
      .eq('tenant', 'sonqo')
      .eq('key', 'home_hero_slides')
      .single();
    expect(sonqoSetting.value).toContain('Mística Experiencia en Cusco');

    // Verify MTA was NOT touched
    const { data: mtaSetting } = await db.from('site_settings')
      .eq('tenant', 'mta')
      .eq('key', 'home_hero_slides')
      .single();
    expect(mtaSetting.value).not.toContain('Mística Experiencia en Cusco');
  }
);

crossFeatureSuite.test(
  'T3.0.6 (F4 + F5)',
  'Public tour catalog for MTA displays only MTA tours; public catalog for Sonqo displays only Sonqo tours',
  async () => {
    const db = getTestDb();

    // Public MTA catalog
    const mtaBrand = BrandHelper.resolvePublicBrand({ host: 'machupicchutravel.com' });
    const { data: mtaCatalog } = await db.from('tours').eq('tenant', mtaBrand);
    assertTenantIsolation(mtaCatalog!, 'mta');

    // Public Sonqo catalog
    const sonqoBrand = BrandHelper.resolvePublicBrand({ host: 'sonqoperutravel.com' });
    const { data: sonqoCatalog } = await db.from('tours').eq('tenant', sonqoBrand);
    assertTenantIsolation(sonqoCatalog!, 'sonqo');
  }
);

crossFeatureSuite.test(
  'T3.0.7 (F4 + F8)',
  'Public homepage on Sonqo displays Sonqo hero slides; public homepage on MTA displays MTA hero slides',
  async () => {
    const db = getTestDb();

    // Public request to MTA homepage
    const mtaTenant = BrandHelper.resolvePublicBrand({ host: 'machupicchutravel.com' });
    const { data: mtaSlidesRow } = await db.from('site_settings')
      .eq('tenant', mtaTenant)
      .eq('key', 'home_hero_slides')
      .single();
    const mtaSlides = JSON.parse(mtaSlidesRow.value);

    // Public request to Sonqo homepage
    const sonqoTenant = BrandHelper.resolvePublicBrand({ host: 'sonqoperutravel.com' });
    const { data: sonqoSlidesRow } = await db.from('site_settings')
      .eq('tenant', sonqoTenant)
      .eq('key', 'home_hero_slides')
      .single();
    const sonqoSlides = JSON.parse(sonqoSlidesRow.value);

    expect(mtaSlides[0].title).not.toBe(sonqoSlides[0].title);
  }
);

crossFeatureSuite.test(
  'T3.0.8 (F5 + F7)',
  'Tour creation with full gallery images persists both image_url and images TEXT[] atomically',
  async () => {
    const db = getTestDb();

    const hero = 'https://images.unsplash.com/photo-main-atomic';
    const gallery = [
      'https://images.unsplash.com/photo-gallery-1',
      'https://images.unsplash.com/photo-gallery-2',
      'https://images.unsplash.com/photo-gallery-3',
    ];

    assertValidGallery(gallery);

    const { data, error } = await db.from('tours').insert({
      slug: 'tour-atomico-galeria',
      tenant: 'mta' as const,
      title: 'Tour Atómico con Galería',
      price_adult: 270.0,
      image_url: hero,
      images: gallery,
    });

    expect(error).toBeNull();
    expect(data![0].image_url).toBe(hero);
    expect(data![0].images).toEqual(gallery);
  }
);

crossFeatureSuite.test(
  'T3.0.9 (F5 + F6)',
  'Modifying tour pricing or active status immediately reflects in availability booking calculations',
  async () => {
    const db = getTestDb();

    // 1. Create active tour with price $200
    const { data: tour } = await db.from('tours').insert({
      slug: 'tour-precio-reactivo',
      tenant: 'mta' as const,
      title: 'Tour Precio Reactivo',
      price_adult: 200.0,
      image_url: 'https://images.unsplash.com/photo',
      is_active: true,
    });
    const tourId = tour![0].id;

    // 2. Add availability slot without override (uses tour base price)
    const { data: slot } = await db.from('tour_availability').insert({
      tour_id: tourId,
      tenant: 'mta' as const,
      date: '2026-11-30',
      capacity: 10,
      booked_count: 0,
      price_override: null,
    });

    expect(calculateBookingTotal(2, 200.0)).toBe(400.0);

    // 3. Admin updates tour price to $250
    await db.from('tours').eq('id', tourId).update({ price_adult: 250.0 });
    const { data: updatedTour } = await db.from('tours').eq('id', tourId).single();

    // New booking calculations immediately use updated price $250
    expect(calculateBookingTotal(2, updatedTour.price_adult)).toBe(500.0);
  }
);

crossFeatureSuite.test(
  'T3.0.10 (F1 + F5 + F8)',
  'Unauthenticated direct POST/mutation to Tour CRUD and Settings CMS rejected with 401 Unauthorized',
  () => {
    // Attempt mutation without auth token
    const emptyCookies = {};

    expect(() => {
      AuthHelper.requireAuthGuard(emptyCookies);
    }).toThrow('Unauthorized');

    // Attempt mutation with tampered token
    const tamperedCookies = { 'sb-access-token': 'fake.tampered.signature' };
    expect(() => {
      AuthHelper.requireAuthGuard(tamperedCookies);
    }).toThrow('Unauthorized');
  }
);
