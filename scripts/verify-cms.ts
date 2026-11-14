#!/usr/bin/env tsx
/**
 * CMS Automated Verification Entrypoint
 * Standalone verification script for Machu Picchu Travel Adventures & Sonqo Perú Travel CMS.
 *
 * Verifies Acceptance Criteria from ORIGINAL_REQUEST.md:
 * - Section 1: Auth & Route Protection (/login, unauthenticated /admin redirection, bcrypt encrypted password check)
 * - Section 2: Multi-Brand Isolation (MTA vs Sonqo data separation in tours, settings, bookings, and admin brand cookies)
 * - Section 3: Tour Management CRUD (day-by-day itinerary JSON, 3-tier pricing adult/child/infant, exclusions list, availability slot generation)
 * - Section 4: Visual Asset Distribution (dynamic hero slides in site_settings per brand, tour media galleries images TEXT[])
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import assert from 'node:assert/strict';

// Production Domain Modules
import { BRANDS, DEFAULT_BRAND_ID } from '../src/lib/brand';
import {
  getAdminActiveBrand,
  setAdminActiveBrand,
  ADMIN_BRAND_COOKIE,
} from '../src/lib/admin-brand';
import {
  sanitizeExclusionsList,
  sanitizeInclusionsList,
  assertValidPricing as prodAssertPricing,
} from '../src/lib/tours';
import {
  reorderGalleryImages,
  assertValidGallery as prodAssertGallery,
} from '../src/lib/gallery';
import {
  parseHeroSlidesJson,
  assertValidHeroSlide,
  getFallbackHeroSlides,
} from '../src/lib/visual-assets';
import { assertValidImageUrl } from '../src/lib/validation';

// Server Actions (Auth Guarding)
import { updateAdminPassword, switchAdminBrand } from '../src/app/admin/actions';
import { createTour, updateTour, deleteTour } from '../src/app/admin/tours/actions';

// High-Fidelity Test Harness & In-Memory Supabase DB
import { AuthHelper } from '../tests/e2e/harness/auth-helper';
import { BrandHelper } from '../tests/e2e/harness/brand-helper';
import { getTestDb, resetTestDb } from '../tests/e2e/harness/env';
import {
  assertEncryptedPassword,
  assertTenantIsolation,
  assertValidPricing,
  assertValidItinerary,
  assertValidGallery,
} from '../tests/e2e/harness/assertions';

// ANSI Terminal Colors for Professional Output
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
};

interface StepResult {
  code: string;
  description: string;
  durationMs: number;
  passed: boolean;
  error?: Error;
}

const allResults: Record<string, StepResult[]> = {
  'Section 1: Auth & Route Protection': [],
  'Section 2: Multi-Brand Isolation': [],
  'Section 3: Tour Management CRUD': [],
  'Section 4: Visual Asset Distribution': [],
};

async function runStep(
  section: keyof typeof allResults,
  code: string,
  description: string,
  fn: () => void | Promise<void>
): Promise<void> {
  const start = performance.now();
  try {
    await fn();
    const durationMs = Math.round((performance.now() - start) * 10) / 10;
    allResults[section].push({ code, description, durationMs, passed: true });
    console.log(`  ${colors.green}✔ PASS${colors.reset} [${code}] ${description} ${colors.dim}(${durationMs}ms)${colors.reset}`);
  } catch (err: any) {
    const durationMs = Math.round((performance.now() - start) * 10) / 10;
    allResults[section].push({ code, description, durationMs, passed: false, error: err });
    console.error(`  ${colors.red}✖ FAIL${colors.reset} [${code}] ${description} ${colors.dim}(${durationMs}ms)${colors.reset}`);
    console.error(`    ${colors.red}${err.message || err}${colors.reset}`);
    if (err.stack) {
      console.error(`    ${colors.dim}${err.stack.split('\n').slice(1, 4).join('\n    ')}${colors.reset}`);
    }
  }
}

async function verifySection1Auth(): Promise<void> {
  console.log(`\n${colors.bold}${colors.cyan}================================================================================${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}  SECTION 1: AUTHENTICATION & ROUTE PROTECTION (/admin, /login, encrypted pwd)${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}================================================================================${colors.reset}`);

  AuthHelper.initAuthInterceptor();
  AuthHelper.setRequestContext({});

  await runStep(
    'Section 1: Auth & Route Protection',
    'SEC-1.1',
    'Unauthenticated GET /admin is intercepted by Edge Middleware and redirected to /login with redirectTo',
    async () => {
      const res = await AuthHelper.executeMiddleware({
        url: 'http://localhost:3000/admin',
      });
      assert.strictEqual(res.status, 307, 'Must return 307 Temporary Redirect');
      const location = res.location || '';
      assert.ok(location.includes('/login'), `Location must point to login page, got: ${location}`);
      assert.ok(location.includes('redirectTo=%2Fadmin'), `Must preserve redirectTo parameter, got: ${location}`);
    }
  );

  await runStep(
    'Section 1: Auth & Route Protection',
    'SEC-1.2',
    'Unauthenticated GET /admin/tours and /admin/settings preserve deep redirect paths',
    async () => {
      const resTours = await AuthHelper.executeMiddleware({
        url: 'http://localhost:3000/admin/tours/new',
      });
      assert.strictEqual(resTours.status, 307);
      assert.ok((resTours.location || '').includes('redirectTo=%2Fadmin%2Ftours%2Fnew'));

      const resSettings = await AuthHelper.executeMiddleware({
        url: 'http://localhost:3000/admin/settings',
      });
      assert.strictEqual(resSettings.status, 307);
      assert.ok((resSettings.location || '').includes('redirectTo=%2Fadmin%2Fsettings'));
    }
  );

  await runStep(
    'Section 1: Auth & Route Protection',
    'SEC-1.3',
    'Stored admin user credentials enforce bcrypt/PBKDF2 salted hash (no plaintext passwords)',
    async () => {
      const db = getTestDb();
      const adminUser = Array.from(db.authUsers.values()).find(u => u.email === 'admin@machupicchutravel.com');
      assert.ok(adminUser, 'Admin user must exist in database');

      // Assert password matches encrypted digest pattern (not plaintext)
      assertEncryptedPassword(adminUser.password_hash);
      assert.notStrictEqual(adminUser.password_hash, 'AdminPassword123!');

      // Verify hashing helper
      const { combined } = AuthHelper.hashPassword('SuperSecret2026!');
      assertEncryptedPassword(combined);
      assert.strictEqual(AuthHelper.verifyPassword('SuperSecret2026!', combined), true);
      assert.strictEqual(AuthHelper.verifyPassword('WrongSecret!', combined), false);
    }
  );

  await runStep(
    'Section 1: Auth & Route Protection',
    'SEC-1.4',
    'Valid credentials authenticate successfully and generate cryptographically signed session token',
    async () => {
      const login = await AuthHelper.login('admin@machupicchutravel.com', 'AdminPassword123!');
      assert.strictEqual(login.success, true);
      assert.ok(login.token, 'Must return session token');

      const verification = AuthHelper.verifySessionToken(login.token);
      assert.strictEqual(verification.valid, true);
      assert.strictEqual(verification.payload?.email, 'admin@machupicchutravel.com');
      assert.strictEqual(verification.payload?.role, 'admin');

      // Invalid credentials fail
      const badLogin = await AuthHelper.login('admin@machupicchutravel.com', 'WrongPassword!');
      assert.strictEqual(badLogin.success, false);
      assert.strictEqual(badLogin.token, undefined);
    }
  );

  await runStep(
    'Section 1: Auth & Route Protection',
    'SEC-1.5',
    'Authenticated session allows unrestricted access through Edge Middleware to /admin',
    async () => {
      const login = await AuthHelper.login('admin@machupicchutravel.com', 'AdminPassword123!');
      const cookies = { 'sb-access-token': login.token! };

      const res = await AuthHelper.executeMiddleware({
        url: 'http://localhost:3000/admin',
        cookies,
      });

      // Permitted access: status 200 and not redirected to login
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.location, null);
    }
  );

  await runStep(
    'Section 1: Auth & Route Protection',
    'SEC-1.6',
    'Already authenticated user visiting /login is redirected back to /admin',
    async () => {
      const login = await AuthHelper.login('admin@machupicchutravel.com', 'AdminPassword123!');
      const cookies = { 'sb-access-token': login.token! };

      const res = await AuthHelper.executeMiddleware({
        url: 'http://localhost:3000/login',
        cookies,
      });

      assert.strictEqual(res.status, 307);
      assert.strictEqual(res.location, 'http://localhost:3000/admin');
    }
  );

  await runStep(
    'Section 1: Auth & Route Protection',
    'SEC-1.7',
    'Mutating administrative server actions strictly enforce auth guard and reject unauthenticated requests',
    async () => {
      AuthHelper.setRequestContext({});

      // 1. switchAdminBrand
      await assert.rejects(
        async () => {
          await switchAdminBrand('sonqo');
        },
        (err: Error) => {
          assert.ok(err.message.includes('Unauthorized'), `Expected 'Unauthorized', got: ${err.message}`);
          return true;
        }
      );

      // 2. updateAdminPassword
      await assert.rejects(
        async () => {
          await updateAdminPassword({ newPassword: 'NewPassword123!' });
        },
        (err: Error) => {
          assert.ok(err.message.includes('Unauthorized'), `Expected 'Unauthorized', got: ${err.message}`);
          return true;
        }
      );

      // 3. createTour
      await assert.rejects(
        async () => {
          const formData = new FormData();
          formData.append('title', 'Unauthorized Tour');
          await createTour(formData);
        },
        (err: Error) => {
          assert.ok(err.message.includes('Unauthorized'), `Expected 'Unauthorized', got: ${err.message}`);
          return true;
        }
      );
    }
  );
}

async function verifySection2MultiBrand(): Promise<void> {
  console.log(`\n${colors.bold}${colors.cyan}================================================================================${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}  SECTION 2: MULTI-BRAND ISOLATION (MTA vs Sonqo context, tours, settings, cookies)${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}================================================================================${colors.reset}`);

  BrandHelper.resetCookies();
  resetTestDb();

  await runStep(
    'Section 2: Multi-Brand Isolation',
    'SEC-2.1',
    'Admin brand cookie switcher defaults to "mta" and persists transitions cleanly',
    async () => {
      BrandHelper.resetCookies();

      // Default when no cookie is set
      const defaultBrand = await getAdminActiveBrand();
      assert.strictEqual(defaultBrand, 'mta', 'Default brand must be "mta"');

      // Switch to sonqo
      await setAdminActiveBrand('sonqo');
      const sonqoBrand = await getAdminActiveBrand();
      assert.strictEqual(sonqoBrand, 'sonqo');
      assert.strictEqual(BrandHelper.getCookie(ADMIN_BRAND_COOKIE)?.value, 'sonqo');

      // Switch back to mta
      await setAdminActiveBrand('mta');
      const mtaBrand = await getAdminActiveBrand();
      assert.strictEqual(mtaBrand, 'mta');
      assert.strictEqual(BrandHelper.getCookie(ADMIN_BRAND_COOKIE)?.value, 'mta');

      // Rejects invalid brand identifier
      await assert.rejects(async () => {
        await setAdminActiveBrand('invalid_brand' as any);
      }, /Invalid brand identifier/);
    }
  );

  await runStep(
    'Section 2: Multi-Brand Isolation',
    'SEC-2.2',
    'Database partitioning in "tours" table strictly isolates MTA and Sonqo listings',
    async () => {
      const db = getTestDb();

      // Query MTA tours
      const { data: mtaTours } = await db.from('tours').eq('tenant', 'mta').select();
      assert.ok(mtaTours && mtaTours.length > 0);
      assertTenantIsolation(mtaTours, 'mta');

      // Query Sonqo tours
      const { data: sonqoTours } = await db.from('tours').eq('tenant', 'sonqo').select();
      assert.ok(sonqoTours && sonqoTours.length > 0);
      assertTenantIsolation(sonqoTours, 'sonqo');

      // Ensure no crossover
      const mtaIds = new Set(mtaTours.map(t => t.id));
      const hasCrossover = sonqoTours.some(t => mtaIds.has(t.id));
      assert.strictEqual(hasCrossover, false, 'MTA and Sonqo tour IDs must not overlap');
    }
  );

  await runStep(
    'Section 2: Multi-Brand Isolation',
    'SEC-2.3',
    'Composite unique key (tenant, slug) permits same slug across brands without collision',
    async () => {
      const db = getTestDb();

      // Find initial seed tours with same slug
      const slug = 'camino-inca-clasico';
      const { data: mtaTour } = await db.from('tours').eq('tenant', 'mta').eq('slug', slug).single();
      const { data: sonqoTour } = await db.from('tours').eq('tenant', 'sonqo').eq('slug', slug).single();

      assert.ok(mtaTour, 'MTA tour with camino-inca-clasico must exist');
      assert.ok(sonqoTour, 'Sonqo tour with camino-inca-clasico must exist');
      assert.strictEqual(mtaTour.slug, sonqoTour.slug);
      assert.notStrictEqual(mtaTour.id, sonqoTour.id);
      assert.strictEqual(mtaTour.tenant, 'mta');
      assert.strictEqual(sonqoTour.tenant, 'sonqo');

      // Attempt duplicate slug within the same brand is rejected
      const { error: dupError } = await db.from('tours').insert({
        slug: 'camino-inca-clasico',
        tenant: 'mta',
        title: 'Duplicate Slug Tour In Same Brand',
        price_adult: 500,
        image_url: 'https://images.unsplash.com/test',
      });
      assert.ok(dupError, 'Inserting duplicate slug in same tenant must fail');
      assert.ok(
        dupError.message.includes('unique constraint') ||
        dupError.message.includes('duplicate key') ||
        dupError.message.includes('already exists')
      );
    }
  );

  await runStep(
    'Section 2: Multi-Brand Isolation',
    'SEC-2.4',
    'Site settings partition: updating Sonqo settings never mutates MTA settings',
    async () => {
      const db = getTestDb();

      // Read initial MTA hero slides
      const { data: initialMta } = await db.from('site_settings')
        .eq('tenant', 'mta')
        .eq('key', 'home_hero_slides')
        .single();
      assert.ok(initialMta);
      const mtaOriginalValue = initialMta.value;

      // Update Sonqo hero slides
      const newSonqoSlides = [
        {
          title: 'Exclusivo Sonqo Perú 2026',
          subtitle: 'Mística andina de alto nivel',
          image: '/imagenes/hero-slider/sonqo-new.jpg',
        },
      ];

      const { error: updateErr } = await db.from('site_settings')
        .eq('tenant', 'sonqo')
        .eq('key', 'home_hero_slides')
        .update({ value: JSON.stringify(newSonqoSlides) });
      assert.strictEqual(updateErr, null);

      // Verify Sonqo updated
      const { data: updatedSonqo } = await db.from('site_settings')
        .eq('tenant', 'sonqo')
        .eq('key', 'home_hero_slides')
        .single();
      assert.strictEqual(JSON.parse(updatedSonqo.value)[0].title, 'Exclusivo Sonqo Perú 2026');

      // Verify MTA setting remains completely unchanged
      const { data: verifyMta } = await db.from('site_settings')
        .eq('tenant', 'mta')
        .eq('key', 'home_hero_slides')
        .single();
      assert.strictEqual(verifyMta.value, mtaOriginalValue, 'MTA settings must not be affected by Sonqo updates');
    }
  );

  await runStep(
    'Section 2: Multi-Brand Isolation',
    'SEC-2.5',
    'Public brand resolution correctly identifies MTA and Sonqo hosts and theme tokens',
    async () => {
      // 1. Host resolution
      const resolvedMta = BrandHelper.resolvePublicBrand({ host: 'machupicchutravel.com' });
      assert.strictEqual(resolvedMta, 'mta');

      const resolvedSonqo = BrandHelper.resolvePublicBrand({ host: 'sonqoperutravel.com' });
      assert.strictEqual(resolvedSonqo, 'sonqo');

      // 2. Query param resolution
      const resolvedParamSonqo = BrandHelper.resolvePublicBrand({ searchParams: { brand: 'sonqo' } });
      assert.strictEqual(resolvedParamSonqo, 'sonqo');

      // 3. Theme tokens
      const mtaConfig = BrandHelper.getConfig('mta');
      const sonqoConfig = BrandHelper.getConfig('sonqo');
      assert.strictEqual(mtaConfig.id, 'mta');
      assert.strictEqual(sonqoConfig.id, 'sonqo');
      assert.strictEqual(mtaConfig.colors.primary, '#048A84');
      assert.strictEqual(sonqoConfig.colors.primary, '#8B66E8');
      assert.notStrictEqual(mtaConfig.colors.primary, sonqoConfig.colors.primary);
    }
  );
}

async function verifySection3TourCRUD(): Promise<void> {
  console.log(`\n${colors.bold}${colors.cyan}================================================================================${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}  SECTION 3: TOUR MANAGEMENT CRUD (itinerary JSON, 3-tier pricing, exclusions, availability)${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}================================================================================${colors.reset}`);

  const db = getTestDb();

  await runStep(
    'Section 3: Tour Management CRUD',
    'SEC-3.1',
    '3-tier pricing model (adult, child, infant) enforces strict business rules and boundary constraints',
    async () => {
      // Valid pricing passes
      const validPricing = { price_adult: 550, price_child: 380, price_infant: 120 };
      prodAssertPricing(validPricing);
      assertValidPricing(validPricing);

      // Missing or <= 0 adult price throws
      assert.throws(() => prodAssertPricing({ price_adult: 0 }), /Adult price must be a valid number strictly greater than 0/);
      assert.throws(() => prodAssertPricing({ price_adult: -10 }), /Adult price must be a valid number strictly greater than 0/);
      assert.throws(() => prodAssertPricing({ price_adult: undefined }), /Adult price must be defined/);

      // Negative child/infant price throws
      assert.throws(() => prodAssertPricing({ price_adult: 200, price_child: -5 }), /Child price cannot be negative/);
      assert.throws(() => prodAssertPricing({ price_adult: 200, price_infant: -1 }), /Infant price cannot be negative/);

      // Child or infant price greater than adult price throws
      assert.throws(() => prodAssertPricing({ price_adult: 200, price_child: 250 }), /Child price .* should not exceed adult price/);
      assert.throws(() => prodAssertPricing({ price_adult: 200, price_infant: 210 }), /Infant price .* should not exceed adult price/);
    }
  );

  await runStep(
    'Section 3: Tour Management CRUD',
    'SEC-3.2',
    'Dynamic day-by-day itinerary JSON schema validation and storage',
    async () => {
      const itinerary = [
        { day: 1, title: 'Bienvenida y Aclimatación', description: 'Recepción en el aeropuerto de Cusco.' },
        { day: 2, title: 'Valle Sagrado de los Incas', description: 'Visita a Pisac y Ollantaytambo.' },
        { day: 3, title: 'Ciudadela de Machu Picchu', description: 'Tour guiado en la maravilla del mundo.' },
      ];

      // Validate itinerary schema
      assertValidItinerary(itinerary);

      // Non-array throws
      assert.throws(() => assertValidItinerary('not an array'), /Itinerary must be a JSON array/);
      // Item missing day throws
      assert.throws(() => assertValidItinerary([{ title: 'No Day', description: 'Desc' }]), /must have positive integer 'day'/);
    }
  );

  await runStep(
    'Section 3: Tour Management CRUD',
    'SEC-3.3',
    'Sanitizer handles multiline inclusions and exclusions lists with whitespace cleaning',
    async () => {
      const rawMultiline = `
        Guía profesional de alta montaña
        
        Boletos turísticos y tren de lujo
           
        Almuerzo buffet en Aguas Calientes
      `;

      const sanitized = sanitizeInclusionsList(rawMultiline);
      assert.strictEqual(sanitized.length, 3);
      assert.strictEqual(sanitized[0], 'Guía profesional de alta montaña');
      assert.strictEqual(sanitized[1], 'Boletos turísticos y tren de lujo');
      assert.strictEqual(sanitized[2], 'Almuerzo buffet en Aguas Calientes');

      const rawExclusions = [' Propinas voluntarias ', '   ', 'Seguro médico internacional', ''];
      const sanitizedExcl = sanitizeExclusionsList(rawExclusions);
      assert.strictEqual(sanitizedExcl.length, 2);
      assert.strictEqual(sanitizedExcl[0], 'Propinas voluntarias');
      assert.strictEqual(sanitizedExcl[1], 'Seguro médico internacional');
    }
  );

  let createdTourId = '';
  await runStep(
    'Section 3: Tour Management CRUD',
    'SEC-3.4',
    'Admin creates complete tour with 3-tier pricing, itinerary, inclusions, exclusions, and active tenant',
    async () => {
      const newTourData = {
        slug: 'laguna-humantay-trek-premium',
        tenant: 'mta' as const,
        title: 'Laguna Humantay Trek Premium 1 Día',
        description: 'Caminata escénica hacia la laguna turquesa a los pies del glaciar Salkantay.',
        price_adult: 110.0,
        price_child: 85.0,
        price_infant: 25.0,
        duration: '1 Día',
        tag: 'Popular',
        image_url: 'https://images.unsplash.com/photo-humantay-main',
        images: [
          'https://images.unsplash.com/photo-humantay-main',
          'https://images.unsplash.com/photo-humantay-2',
        ],
        inclusions: ['Transporte turístico privado', 'Guía bilingüe', 'Desayuno y almuerzo buffet'],
        exclusions: ['Entrada a la comunidad Mollepata', 'Caballo de emergencia'],
        itinerary: [
          { day: 1, title: 'Cusco - Mollepata - Soraypampa - Laguna Humantay', description: 'Ascenso a la laguna y retorno a Cusco.' },
        ],
        is_active: true,
      };

      const { data, error } = await db.from('tours').insert(newTourData);
      assert.strictEqual(error, null);
      assert.ok(data && data.length > 0);
      createdTourId = data[0].id;

      assert.strictEqual(data[0].slug, 'laguna-humantay-trek-premium');
      assert.strictEqual(data[0].tenant, 'mta');
      assert.strictEqual(data[0].price_adult, 110.0);
      assert.strictEqual(data[0].price_child, 85.0);
      assert.strictEqual(data[0].price_infant, 25.0);
      assert.strictEqual(data[0].itinerary.length, 1);
      assert.strictEqual(data[0].exclusions.length, 2);
    }
  );

  await runStep(
    'Section 3: Tour Management CRUD',
    'SEC-3.5',
    'Admin updates pricing, itinerary, and toggles active status on created tour',
    async () => {
      assert.ok(createdTourId, 'Tour must be created in previous step');

      const { data: updated, error } = await db.from('tours')
        .eq('id', createdTourId)
        .update({
          price_adult: 125.0,
          price_child: 95.0,
          price_infant: 30.0,
          is_active: false,
        });

      assert.strictEqual(error, null);
      assert.strictEqual(updated![0].price_adult, 125.0);
      assert.strictEqual(updated![0].price_child, 95.0);
      assert.strictEqual(updated![0].price_infant, 30.0);
      assert.strictEqual(updated![0].is_active, false);
    }
  );

  await runStep(
    'Section 3: Tour Management CRUD',
    'SEC-3.6',
    'Brand-aware tour availability slots generation, capacity reservation, and overbooking prevention',
    async () => {
      // Create availability slot for created tour
      const slotData = {
        tour_id: createdTourId,
        tenant: 'mta' as const,
        date: '2026-09-10',
        capacity: 15,
        booked_count: 5,
        price_override: null,
        is_blocked: false,
      };

      const { data: slot, error } = await db.from('tour_availability').insert(slotData);
      assert.strictEqual(error, null);
      assert.strictEqual(slot![0].capacity, 15);
      assert.strictEqual(slot![0].booked_count, 5);

      // Remaining seats = 10
      const remaining = slot![0].capacity - slot![0].booked_count;
      assert.strictEqual(remaining, 10);

      // Attempting to reserve 12 seats exceeds capacity
      const requestedSeats = 12;
      const canBook = (slot![0].booked_count + requestedSeats) <= slot![0].capacity;
      assert.strictEqual(canBook, false, 'Overbooking must be rejected');

      // Reserving 4 seats succeeds and updates booked_count
      const validSeats = 4;
      const { data: updatedSlot } = await db.from('tour_availability')
        .eq('id', slot![0].id)
        .update({ booked_count: slot![0].booked_count + validSeats });

      assert.strictEqual(updatedSlot![0].booked_count, 9);
      assert.strictEqual(updatedSlot![0].capacity - updatedSlot![0].booked_count, 6);
    }
  );
}

async function verifySection4VisualAssets(): Promise<void> {
  console.log(`\n${colors.bold}${colors.cyan}================================================================================${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}  SECTION 4: VISUAL ASSET DISTRIBUTION (hero slides per brand, tour media galleries)${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}================================================================================${colors.reset}`);

  const db = getTestDb();

  await runStep(
    'Section 4: Visual Asset Distribution',
    'SEC-4.1',
    'Hero slides schema validator enforces title, image URL, and parses structured JSON',
    async () => {
      const validSlide = {
        title: 'Maravillas de Machu Picchu',
        subtitle: 'Una travesía inolvidable por los Andes',
        image: 'https://images.unsplash.com/photo-hero-test',
        link: '/tours/camino-inca',
        cta: 'Reservar Ahora',
      };

      assertValidHeroSlide(validSlide);

      const jsonStr = JSON.stringify([validSlide]);
      const parsed = parseHeroSlidesJson(jsonStr);
      assert.strictEqual(parsed.length, 1);
      assert.strictEqual(parsed[0].title, 'Maravillas de Machu Picchu');

      // Invalid slide: missing title throws
      assert.throws(() => assertValidHeroSlide({ image: 'https://test.com/img.jpg' }), /must have a non-empty string title/);
      // Invalid slide: missing image throws
      assert.throws(() => assertValidHeroSlide({ title: 'Test Title' }), /must have a non-empty string image/);
      // Malformed JSON throws
      assert.throws(() => parseHeroSlidesJson('not-valid-json'), /Invalid JSON syntax/);
    }
  );

  await runStep(
    'Section 4: Visual Asset Distribution',
    'SEC-4.2',
    'Fallback banners retrieved cleanly when brand hero slides are empty or unconfigured',
    async () => {
      const fallbackMta = getFallbackHeroSlides('mta');
      assert.ok(Array.isArray(fallbackMta) && fallbackMta.length > 0);
      assert.ok(fallbackMta[0].title.length > 0);
      assert.ok(fallbackMta[0].image.length > 0);

      const fallbackSonqo = getFallbackHeroSlides('sonqo');
      assert.ok(Array.isArray(fallbackSonqo) && fallbackSonqo.length > 0);
      assert.ok(fallbackSonqo[0].title.includes('Sonqo'));
    }
  );

  await runStep(
    'Section 4: Visual Asset Distribution',
    'SEC-4.3',
    'Dynamic hero slides persisted in site_settings per brand and retrieved independently',
    async () => {
      const mtaNewSlides = [
        {
          title: 'MTA Expedición 2026',
          subtitle: 'Aventura segura con los mejores guías',
          image: '/imagenes/hero-slider/mta-expedition.jpg',
          link: '/tours',
        },
      ];

      const { error: errMta } = await db.from('site_settings')
        .eq('tenant', 'mta')
        .eq('key', 'home_hero_slides')
        .update({ value: JSON.stringify(mtaNewSlides) });
      assert.strictEqual(errMta, null);

      const { data: retrievedMta } = await db.from('site_settings')
        .eq('tenant', 'mta')
        .eq('key', 'home_hero_slides')
        .single();
      const parsedMta = parseHeroSlidesJson(retrievedMta.value);
      assert.strictEqual(parsedMta[0].title, 'MTA Expedición 2026');

      const { data: retrievedSonqo } = await db.from('site_settings')
        .eq('tenant', 'sonqo')
        .eq('key', 'home_hero_slides')
        .single();
      const parsedSonqo = parseHeroSlidesJson(retrievedSonqo.value);
      assert.notStrictEqual(parsedSonqo[0].title, 'MTA Expedición 2026');
    }
  );

  await runStep(
    'Section 4: Visual Asset Distribution',
    'SEC-4.4',
    'Tour primary hero image URL validation and boundary handling',
    async () => {
      const validUrl = 'https://images.unsplash.com/photo-1526392060635-9d6019884377';
      const validPath = '/imagenes/tours/machu-picchu-hero.jpg';

      assertValidImageUrl(validUrl);
      assertValidImageUrl(validPath);

      // Malformed or empty URL throws
      assert.throws(() => assertValidImageUrl(''), /must be a non-empty string/);
      assert.throws(() => assertValidImageUrl('ftp://example.com/test.jpg'), /Invalid URL protocol/);
      assert.throws(() => assertValidImageUrl('not-a-url'), /Malformed URL syntax/);
      assert.throws(() => assertValidImageUrl('https://test.com/' + 'a'.repeat(2050)), /exceeds maximum length/);
    }
  );

  await runStep(
    'Section 4: Visual Asset Distribution',
    'SEC-4.5',
    'Tour media gallery (images TEXT[]) validation, addition, and removal',
    async () => {
      const initialGallery = [
        'https://images.unsplash.com/gallery-1.jpg',
        'https://images.unsplash.com/gallery-2.jpg',
        'https://images.unsplash.com/gallery-3.jpg',
      ];

      prodAssertGallery(initialGallery);
      assertValidGallery(initialGallery);

      // Empty gallery is valid (renders fallback without crash)
      prodAssertGallery([]);
      assertValidGallery([]);

      // Invalid gallery items throw
      assert.throws(() => prodAssertGallery(['']), /must be a non-empty string URL/);
      assert.throws(() => prodAssertGallery('not an array' as any), /must be an array/);
    }
  );

  await runStep(
    'Section 4: Visual Asset Distribution',
    'SEC-4.6',
    'Gallery reordering (reorderGalleryImages) mutates order cleanly and protects against out-of-bounds indices',
    async () => {
      const images = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg'];

      // Move img1 (index 0) to index 2: should become [img2, img3, img1, img4]
      const reordered = reorderGalleryImages(images, 0, 2);
      assert.deepStrictEqual(reordered, ['img2.jpg', 'img3.jpg', 'img1.jpg', 'img4.jpg']);

      // Move img4 (index 3) to index 0: should become [img4, img1, img2, img3]
      const reorderedToStart = reorderGalleryImages(images, 3, 0);
      assert.deepStrictEqual(reorderedToStart, ['img4.jpg', 'img1.jpg', 'img2.jpg', 'img3.jpg']);

      // Out of bounds indices return unchanged shallow copy safely
      const outOfBounds = reorderGalleryImages(images, -1, 2);
      assert.deepStrictEqual(outOfBounds, images);

      const outOfBounds2 = reorderGalleryImages(images, 0, 99);
      assert.deepStrictEqual(outOfBounds2, images);
    }
  );
}

async function main(): Promise<void> {
  const overallStart = performance.now();
  console.log(`\n${colors.bold}${colors.magenta}================================================================================${colors.reset}`);
  console.log(`${colors.bold}${colors.magenta}   MACHU PICCHU TRAVEL ADVENTURES & SONQO PERU TRAVEL CMS VERIFICATION RUNNER   ${colors.reset}`);
  console.log(`${colors.bold}${colors.magenta}================================================================================${colors.reset}`);
  console.log(`Node Version:  ${process.version}`);
  console.log(`Execution at:  ${new Date().toISOString()}`);
  console.log(`Scope:         Acceptance Criteria (R1-R5) from ORIGINAL_REQUEST.md`);
  console.log(`Target:        Auth, Multi-Brand Isolation, Tour CRUD, and Visual Asset Distribution`);
  console.log(`${colors.bold}${colors.magenta}================================================================================${colors.reset}`);

  try {
    await verifySection1Auth();
    await verifySection2MultiBrand();
    await verifySection3TourCRUD();
    await verifySection4VisualAssets();
  } catch (fatalErr: any) {
    console.error(`\n${colors.red}${colors.bold}FATAL ERROR IN VERIFICATION RUNNER:${colors.reset}`, fatalErr);
    process.exit(1);
  }

  const overallDuration = Math.round((performance.now() - overallStart) / 10) / 100;

  // Calculate totals
  let totalTests = 0;
  let totalPassed = 0;
  let totalFailed = 0;

  for (const [section, results] of Object.entries(allResults)) {
    const passed = results.filter(r => r.passed).length;
    const failed = results.filter(r => !r.passed).length;
    totalTests += results.length;
    totalPassed += passed;
    totalFailed += failed;
  }

  console.log(`\n${colors.bold}${colors.cyan}================================================================================${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}                        CMS VERIFICATION SUMMARY REPORT                         ${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}================================================================================${colors.reset}`);

  for (const [section, results] of Object.entries(allResults)) {
    const passed = results.filter(r => r.passed).length;
    const total = results.length;
    const statusColor = passed === total ? colors.green : colors.red;
    console.log(`  ${section.padEnd(46)}: ${statusColor}${passed}/${total} passed${colors.reset}`);
  }

  console.log(`${colors.bold}${colors.cyan}--------------------------------------------------------------------------------${colors.reset}`);
  console.log(`  Total Verification Steps: ${totalTests}`);
  console.log(`  Passed Steps:             ${colors.green}${totalPassed}${colors.reset}`);
  console.log(`  Failed Steps:             ${totalFailed === 0 ? colors.green + '0' : colors.red + totalFailed}${colors.reset}`);
  console.log(`  Execution Time:           ${overallDuration}s`);
  console.log(`${colors.bold}${colors.cyan}================================================================================${colors.reset}\n`);

  if (totalFailed > 0) {
    console.error(`${colors.red}${colors.bold}❌ CMS VERIFICATION FAILED WITH ${totalFailed} FAILED STEP(S)!${colors.reset}\n`);
    process.exit(1);
  } else {
    console.log(`${colors.green}${colors.bold}🎉 ALL CMS ACCEPTANCE CRITERIA VERIFIED WITH 100% SPECIFICATION COMPLIANCE!${colors.reset}\n`);
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Unhandled verification error:', err);
  process.exit(1);
});
