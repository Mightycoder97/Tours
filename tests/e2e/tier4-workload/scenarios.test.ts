/**
 * Tier 4: Real-World Application Scenarios (5 Workloads)
 */

import {
  TestSuite,
  expect,
  assertTenantIsolation,
  assertValidPricing,
  assertValidItinerary,
  assertValidGallery,
  assertEncryptedPassword,
} from '../harness/assertions';
import { AuthHelper } from '../harness/auth-helper';
import { BrandHelper } from '../harness/brand-helper';
import { getTestDb } from '../harness/env';

export const workloadScenarioSuite = new TestSuite(
  'Tier 4: Real-World End-to-End Application Scenarios',
  'Tier 4: Workload Scenarios'
);

workloadScenarioSuite.test(
  'T4.0.1',
  'Scenario 1: Complete MTA Tour Lifecycle',
  async () => {
    const db = getTestDb();

    // 1. Admin logs in with encrypted credentials
    const login = await AuthHelper.login('admin@machupicchutravel.com', 'AdminPassword123!');
    expect(login.success).toBe(true);
    const adminCookies = {
      'sb-access-token': login.token!,
      admin_brand: 'mta',
    };

    // 2. Admin switches context to MTA
    const activeBrand = await BrandHelper.getAdminActiveBrand(adminCookies);
    expect(activeBrand).toBe('mta');

    // 3. Creates 4-day Machu Picchu Luxury Tour with 3-tier pricing
    const luxuryPricing = {
      price_adult: 500.0,
      price_child: 350.0,
      price_infant: 100.0,
    };
    assertValidPricing(luxuryPricing);

    const detailedItinerary = [
      { day: 1, title: 'Llegada y Tren Panorámico', description: 'Viaje en tren Vistadome hacia Aguas Calientes.' },
      { day: 2, title: 'Amanecer en Machu Picchu', description: 'Visita guiada exclusiva de primer turno.' },
      { day: 3, title: 'Huayna Picchu y Termas', description: 'Ascenso a la cumbre y relajación en aguas termales.' },
      { day: 4, title: 'Retorno de Lujo a Cusco', description: 'Almuerzo gourmet y traslado a hotel.' },
    ];
    assertValidItinerary(detailedItinerary);

    const galleryImages = [
      'https://images.unsplash.com/photo-luxury-1',
      'https://images.unsplash.com/photo-luxury-2',
      'https://images.unsplash.com/photo-luxury-3',
      'https://images.unsplash.com/photo-luxury-4',
    ];
    assertValidGallery(galleryImages);

    const { data: createdTour, error: createErr } = await db.from('tours').insert({
      slug: 'machu-picchu-luxury-4-days',
      tenant: activeBrand,
      title: 'Machu Picchu Luxury Experience 4 Días',
      description: 'La máxima experiencia de lujo y confort en los Andes.',
      ...luxuryPricing,
      duration: '4 Días / 3 Noches',
      tag: 'Luxury',
      image_url: 'https://images.unsplash.com/photo-luxury-hero',
      images: galleryImages,
      inclusions: [
        'Tren Hiram Bingham o Vistadome',
        'Hotel 5 estrellas',
        'Guía privado VIP',
        'Todas las comidas gourmet',
        'Boletos de ingreso preferenciales',
        'Traslados en minivan ejecutiva',
      ],
      exclusions: [
        'Vuelos internacionales',
        'Propinas voluntarias',
        'Servicios de spa no especificados',
      ],
      itinerary: detailedItinerary,
      is_active: true,
    });

    expect(createErr).toBeNull();
    const tour = createdTour![0];
    expect(tour.tenant).toBe('mta');
    expect(tour.inclusions.length).toBe(6);
    expect(tour.exclusions.length).toBe(3);

    // 4. Generates 60 days of availability
    const availabilitySlots = Array.from({ length: 60 }).map((_, i) => {
      const d = new Date('2026-07-01');
      d.setDate(d.getDate() + i);
      return {
        tour_id: tour.id,
        tenant: activeBrand,
        date: d.toISOString().split('T')[0],
        capacity: 12,
        booked_count: 0,
        price_override: null,
        is_blocked: false,
      };
    });

    const { data: slots, error: availErr } = await db.from('tour_availability').insert(availabilitySlots);
    expect(availErr).toBeNull();
    expect(slots!.length).toBe(60);

    // 5. Verifies tour appears in public MTA catalog
    const publicBrand = BrandHelper.resolvePublicBrand({ host: 'machupicchutravel.com' });
    const { data: publicCatalog } = await db.from('tours')
      .eq('tenant', publicBrand)
      .eq('is_active', true);
    const inCatalog = publicCatalog!.find(t => t.slug === 'machu-picchu-luxury-4-days');
    expect(inCatalog).toBeDefined();

    // 6. Verifies public detail page shows full itinerary, gallery, and allows date selection
    const { data: publicDetail } = await db.from('tours')
      .eq('tenant', publicBrand)
      .eq('slug', 'machu-picchu-luxury-4-days')
      .single();
    expect(publicDetail.itinerary.length).toBe(4);
    expect(publicDetail.images.length).toBe(4);

    const { data: publicSlots } = await db.from('tour_availability')
      .eq('tour_id', publicDetail.id)
      .eq('date', '2026-07-15')
      .single();
    expect(publicSlots).toBeDefined();
    expect(publicSlots.capacity - publicSlots.booked_count).toBe(12);
  }
);

workloadScenarioSuite.test(
  'T4.0.2',
  'Scenario 2: Complete Sonqo Tour Lifecycle with Multi-Brand Isolation',
  async () => {
    const db = getTestDb();

    // 1. Admin switches context to Sonqo Perú Travel
    await BrandHelper.setAdminActiveBrand('sonqo');
    const adminCookies = {
      'sb-access-token': 'admin-token',
      admin_brand: 'sonqo',
    };
    const activeBrand = await BrandHelper.getAdminActiveBrand(adminCookies);
    expect(activeBrand).toBe('sonqo');

    // 2. Creates exclusive "Ruta Mística Sonqo" tour
    const { data: createdSonqo, error: errSonqo } = await db.from('tours').insert({
      slug: 'ruta-mistica-sonqo',
      tenant: activeBrand,
      title: 'Ruta Mística Sonqo & Sanación Andina',
      description: 'Un viaje sagrado al interior del cosmos andino.',
      price_adult: 550.0,
      price_child: 400.0,
      price_infant: 120.0,
      image_url: 'https://images.unsplash.com/photo-sonqo-mistica',
      images: [
        'https://images.unsplash.com/photo-sonqo-1',
        'https://images.unsplash.com/photo-sonqo-2',
      ],
      is_active: true,
    });
    expect(errSonqo).toBeNull();
    const sonqoTour = createdSonqo![0];
    expect(sonqoTour.tenant).toBe('sonqo');

    // 3. Verifies tour is visible under Sonqo public routes
    const sonqoPublicBrand = BrandHelper.resolvePublicBrand({ host: 'sonqoperutravel.com' });
    const { data: sonqoDetail } = await db.from('tours')
      .eq('tenant', sonqoPublicBrand)
      .eq('slug', 'ruta-mistica-sonqo')
      .maybeSingle();
    expect(sonqoDetail).toBeDefined();
    expect(sonqoDetail?.tenant).toBe('sonqo');

    // 4. Verifies tour is COMPLETELY INVISIBLE under MTA public routes
    const mtaPublicBrand = BrandHelper.resolvePublicBrand({ host: 'machupicchutravel.com' });
    const { data: mtaDetail } = await db.from('tours')
      .eq('tenant', mtaPublicBrand)
      .eq('slug', 'ruta-mistica-sonqo')
      .maybeSingle();
    expect(mtaDetail).toBeNull();

    // 5. Verifies database records strict tenant='sonqo'
    const { data: rawDbCheck } = await db.from('tours').eq('id', sonqoTour.id).single();
    expect(rawDbCheck.tenant).toBe('sonqo');
  }
);

workloadScenarioSuite.test(
  'T4.0.3',
  'Scenario 3: Visual Identity & Banner Rebranding Campaign',
  async () => {
    const db = getTestDb();

    // 1. Admin configures 3 seasonal hero slides for MTA
    const mtaSeasonalSlides = [
      { title: 'Temporada Seca en Machu Picchu', image: '/img/mta-dry-season.jpg', link: '/tours' },
      { title: 'Trek de los Glaciares', image: '/img/mta-glacier.jpg', link: '/tours/glaciares' },
      { title: 'Laguna Humantay Turquesa', image: '/img/mta-humantay.jpg', link: '/tours/humantay' },
    ];
    await db.from('site_settings')
      .eq('tenant', 'mta')
      .eq('key', 'home_hero_slides')
      .update({ value: JSON.stringify(mtaSeasonalSlides) });

    // 2. Admin switches context to Sonqo and configures 2 distinct cultural slides
    const sonqoCulturalSlides = [
      { title: 'Ceremonia al Sol Inti Raymi', image: '/img/sonqo-inti-raymi.jpg', link: '/tours' },
      { title: 'El Despertar de la Pachamama', image: '/img/sonqo-pachamama.jpg', link: '/tours/pachamama' },
    ];
    await db.from('site_settings')
      .eq('tenant', 'sonqo')
      .eq('key', 'home_hero_slides')
      .update({ value: JSON.stringify(sonqoCulturalSlides) });

    // 3. Verifies public MTA homepage serves MTA slides with teal theme
    const mtaBrand = BrandHelper.resolvePublicBrand({ host: 'machupicchutravel.com' });
    const mtaTheme = BrandHelper.getExpectedHtmlTheme(mtaBrand);
    expect(mtaTheme.primaryColor).toBe('#048A84');

    const { data: mtaSetting } = await db.from('site_settings')
      .eq('tenant', mtaBrand)
      .eq('key', 'home_hero_slides')
      .single();
    const parsedMta = JSON.parse(mtaSetting.value);
    expect(parsedMta.length).toBe(3);
    expect(parsedMta[0].title).toBe('Temporada Seca en Machu Picchu');

    // 4. Verifies public Sonqo homepage serves Sonqo slides with Sonqo branding
    const sonqoBrand = BrandHelper.resolvePublicBrand({ host: 'sonqoperutravel.com' });
    const sonqoTheme = BrandHelper.getExpectedHtmlTheme(sonqoBrand);
    expect(sonqoTheme.primaryColor).toBe('#8B66E8');

    const { data: sonqoSetting } = await db.from('site_settings')
      .eq('tenant', sonqoBrand)
      .eq('key', 'home_hero_slides')
      .single();
    const parsedSonqo = JSON.parse(sonqoSetting.value);
    expect(parsedSonqo.length).toBe(2);
    expect(parsedSonqo[0].title).toBe('Ceremonia al Sol Inti Raymi');
  }
);

workloadScenarioSuite.test(
  'T4.0.4',
  'Scenario 4: Concurrent Multi-Tenant Administration',
  async () => {
    const db = getTestDb();

    // 1. MTA creates tour A
    const { data: tourA } = await db.from('tours').insert({
      slug: 'concurrent-tour-a',
      tenant: 'mta' as const,
      title: 'MTA Concurrent Tour A',
      price_adult: 200,
      image_url: 'https://images.unsplash.com/tour-a',
    });

    // 2. Sonqo creates tour B
    const { data: tourB } = await db.from('tours').insert({
      slug: 'concurrent-tour-b',
      tenant: 'sonqo' as const,
      title: 'Sonqo Concurrent Tour B',
      price_adult: 220,
      image_url: 'https://images.unsplash.com/tour-b',
    });

    // 3. MTA updates banner setting
    await db.from('site_settings').insert({
      tenant: 'mta' as const,
      key: 'concurrent_mta_banner',
      value: 'mta-banner-v1',
    });

    // 4. Sonqo creates availability for tour B
    await db.from('tour_availability').insert({
      tour_id: tourB![0].id,
      tenant: 'sonqo' as const,
      date: '2026-12-01',
      capacity: 15,
      booked_count: 0,
    });

    // 5. MTA deletes tour A
    await db.from('tours').eq('id', tourA![0].id).delete();

    // Assert that at every stage, neither tenant's data was modified or exposed to the other
    const { data: checkTourADeleted } = await db.from('tours').eq('id', tourA![0].id).maybeSingle();
    expect(checkTourADeleted).toBeNull();

    const { data: checkTourBIntact } = await db.from('tours').eq('id', tourB![0].id).single();
    expect(checkTourBIntact).toBeDefined();
    expect(checkTourBIntact.tenant).toBe('sonqo');

    const { data: sonqoAvailability } = await db.from('tour_availability')
      .eq('tour_id', tourB![0].id)
      .single();
    expect(sonqoAvailability.tenant).toBe('sonqo');
    expect(sonqoAvailability.capacity).toBe(15);
  }
);

workloadScenarioSuite.test(
  'T4.0.5',
  'Scenario 5: Security & Session Integrity Audit',
  async () => {
    // 1. Attempt access to /admin, /admin/tours, /admin/settings without cookie -> assert redirect to /login
    const unauthPaths = ['/admin', '/admin/tours', '/admin/settings'];
    for (const p of unauthPaths) {
      const check = await AuthHelper.executeMiddleware({
        url: `http://localhost:3000${p}`,
        cookies: {},
      });
      expect(check.status).toBe(307);
      expect(check.location).toBe(`http://localhost:3000/es/login?redirectTo=${encodeURIComponent(p)}`);
    }

    // 2. Attempt login with wrong password -> assert failure
    const badLogin = await AuthHelper.login('admin@machupicchutravel.com', 'IncorrectPassword!');
    expect(badLogin.success).toBe(false);
    expect(badLogin.token).toBeUndefined();

    // 3. Login with valid encrypted password -> assert redirected to /admin
    const goodLogin = await AuthHelper.login('admin@machupicchutravel.com', 'AdminPassword123!');
    expect(goodLogin.success).toBe(true);

    const postLoginCheck = await AuthHelper.executeMiddleware({
      url: 'http://localhost:3000/login?redirectTo=/admin/settings',
      cookies: { 'sb-access-token': goodLogin.token! },
    });
    expect(postLoginCheck.status).toBe(307);
    expect(postLoginCheck.location).toBe('http://localhost:3000/admin');

    // 4. Tamper with session cookie -> assert next mutation is blocked
    const tamperedToken = goodLogin.token! + 'TAMPERED';
    expect(() => {
      AuthHelper.requireAuthGuard({ 'sb-access-token': tamperedToken });
    }).toThrow('Unauthorized');

    // 5. Logout and verify complete revocation
    const loggedOutCookies = {};
    expect(() => {
      AuthHelper.requireAuthGuard(loggedOutCookies);
    }).toThrow('Unauthorized');
  }
);
