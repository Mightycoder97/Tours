import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import dotenv from 'dotenv';
import { localizeTour } from '../src/lib/tours-i18n';
import { TOURS_CONTENT } from '../src/data/tours-content';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const require = createRequire(import.meta.url);
const nextHeaders = require('next/headers');

// Mock cookie store returning no session token (simulating unauthenticated request)
const mockCookieStore = {
  get: () => undefined,
  getAll: () => [],
  set: () => {},
  delete: () => {},
  has: () => false,
};

nextHeaders.cookies = async () => mockCookieStore;

describe('Milestone 3 Verification: Comprehensive Tour & Availability CMS Management', () => {
  it('Test 1: TourForm and actions parse 3-tier pricing, exclusions, itinerary repeater, and tenant', async () => {
    // 1. TourForm.tsx UI inspection
    const tourFormCode = fs.readFileSync(path.resolve(process.cwd(), 'src/components/admin/TourForm.tsx'), 'utf8');

    // 3-tier Pricing
    assert.ok(tourFormCode.includes('name="price_adult"'), 'TourForm must have price_adult input');
    assert.ok(tourFormCode.includes('name="price_child"'), 'TourForm must have price_child input');
    assert.ok(tourFormCode.includes('name="price_infant"'), 'TourForm must have price_infant input');
    assert.ok(tourFormCode.includes('tour?.price_infant'), 'TourForm must pre-fill price_infant from tour');

    // Exclusions
    assert.ok(tourFormCode.includes('name="exclusions"'), 'TourForm must have exclusions textarea');
    assert.ok(tourFormCode.includes('tour?.exclusions'), 'TourForm must pre-fill exclusions from tour');

    // Day-by-Day Dynamic Itinerary Repeater
    assert.ok(tourFormCode.includes('addItineraryDay'), 'TourForm must have addItineraryDay handler');
    assert.ok(tourFormCode.includes('removeItineraryDay'), 'TourForm must have removeItineraryDay handler');
    assert.ok(tourFormCode.includes('moveItineraryDay'), 'TourForm must have moveItineraryDay handler');
    assert.ok(tourFormCode.includes('name="itinerary"'), 'TourForm must serialize itinerary to form hidden input');
    assert.ok(tourFormCode.includes('JSON.stringify(itinerary)'), 'TourForm must serialize itinerary as JSON string');

    // Tenant Selector and activeBrand Prop
    assert.ok(tourFormCode.includes('name="tenant"'), 'TourForm must include tenant selector');
    assert.ok(tourFormCode.includes('activeBrand'), 'TourForm must accept activeBrand prop');
    assert.ok(tourFormCode.includes('initialTenant'), 'TourForm must compute initialTenant from tour or activeBrand');

    // 2. actions.ts parsing inspection
    const actionsCode = fs.readFileSync(path.resolve(process.cwd(), 'src/app/admin/tours/actions.ts'), 'utf8');
    assert.ok(actionsCode.includes('price_infant'), 'Tour actions must parse price_infant');
    assert.ok(actionsCode.includes('exclusions'), 'Tour actions must parse exclusions');
    assert.ok(actionsCode.includes('itinerary'), 'Tour actions must parse itinerary JSON');
    assert.ok(actionsCode.includes('tenant'), 'Tour actions must parse and validate tenant');
    assert.ok(actionsCode.includes('JSON.parse'), 'Tour actions must safely parse itinerary JSON');
    assert.ok(actionsCode.includes("'mta'") && actionsCode.includes("'sonqo'"), 'Tour actions must validate tenant against allowed brands');
  });

  it('Test 2: Unauthenticated mutations to tour and availability actions reject with Unauthorized error', async () => {
    const { createTour, updateTour, deleteTour } = await import('../src/app/admin/tours/actions');
    const { 
      createAvailabilitySlots, 
      updateAvailabilitySlot, 
      deleteAvailabilitySlot, 
      bulkDeleteAvailability 
    } = await import('../src/app/admin/availability/actions');

    const emptyFormData = new FormData();

    // Tour actions unauthenticated guards
    await assert.rejects(
      async () => { await createTour(emptyFormData); },
      (err: Error) => {
        assert.ok(err.message.includes('Unauthorized'), `createTour expected Unauthorized, got: ${err.message}`);
        return true;
      }
    );

    await assert.rejects(
      async () => { await updateTour('fake-id-123', emptyFormData); },
      (err: Error) => {
        assert.ok(err.message.includes('Unauthorized'), `updateTour expected Unauthorized, got: ${err.message}`);
        return true;
      }
    );

    await assert.rejects(
      async () => { await deleteTour('fake-id-123'); },
      (err: Error) => {
        assert.ok(err.message.includes('Unauthorized'), `deleteTour expected Unauthorized, got: ${err.message}`);
        return true;
      }
    );

    // Availability actions unauthenticated guards
    await assert.rejects(
      async () => { await createAvailabilitySlots(emptyFormData); },
      (err: Error) => {
        assert.ok(err.message.includes('Unauthorized'), `createAvailabilitySlots expected Unauthorized, got: ${err.message}`);
        return true;
      }
    );

    await assert.rejects(
      async () => { await updateAvailabilitySlot('slot-123', emptyFormData); },
      (err: Error) => {
        assert.ok(err.message.includes('Unauthorized'), `updateAvailabilitySlot expected Unauthorized, got: ${err.message}`);
        return true;
      }
    );

    await assert.rejects(
      async () => { await deleteAvailabilitySlot('slot-123'); },
      (err: Error) => {
        assert.ok(err.message.includes('Unauthorized'), `deleteAvailabilitySlot expected Unauthorized, got: ${err.message}`);
        return true;
      }
    );

    await assert.rejects(
      async () => { await bulkDeleteAvailability('tour-123'); },
      (err: Error) => {
        assert.ok(err.message.includes('Unauthorized'), `bulkDeleteAvailability expected Unauthorized, got: ${err.message}`);
        return true;
      }
    );
  });

  it('Test 3: Multi-brand tenant isolation in tour admin and availability scoping', () => {
    // 1. Tour admin pages pass activeBrand
    const newPageCode = fs.readFileSync(path.resolve(process.cwd(), 'src/app/admin/tours/new/page.tsx'), 'utf8');
    assert.ok(newPageCode.includes('getAdminActiveBrand'), 'New tour page must retrieve activeBrand');
    assert.ok(newPageCode.includes('activeBrand={activeBrand}'), 'New tour page must pass activeBrand to TourForm');

    const editPageCode = fs.readFileSync(path.resolve(process.cwd(), 'src/app/admin/tours/[id]/page.tsx'), 'utf8');
    assert.ok(editPageCode.includes('getAdminActiveBrand'), 'Edit tour page must retrieve activeBrand');
    assert.ok(editPageCode.includes('activeBrand={activeBrand}'), 'Edit tour page must pass activeBrand to TourForm');

    const listPageCode = fs.readFileSync(path.resolve(process.cwd(), 'src/app/admin/tours/page.tsx'), 'utf8');
    assert.ok(listPageCode.includes(".eq('tenant', activeBrand)"), 'Tours admin page must filter tours by activeBrand');

    // 2. Availability page brand scoping
    const availPageCode = fs.readFileSync(path.resolve(process.cwd(), 'src/app/admin/availability/page.tsx'), 'utf8');
    assert.ok(availPageCode.includes('getAdminActiveBrand'), 'Availability page must retrieve activeBrand');
    assert.ok(availPageCode.includes(".eq('tenant', activeBrand)"), 'Availability page must query tours for activeBrand');
    assert.ok(availPageCode.includes(".in('tour_id', brandTourIds)"), 'Availability page must filter slots by brand tour IDs');
    assert.ok(availPageCode.includes('activeBrand={activeBrand}'), 'Availability page must pass activeBrand to AvailabilityManager');

    // 3. AvailabilityManager component brand awareness
    const availManagerCode = fs.readFileSync(path.resolve(process.cwd(), 'src/components/admin/AvailabilityManager.tsx'), 'utf8');
    assert.ok(availManagerCode.includes('activeBrand'), 'AvailabilityManager must accept activeBrand prop');
    assert.ok(availManagerCode.includes('brandConfig'), 'AvailabilityManager must compute brandConfig for contextual labels');

    // 4. RelatedTours brand scoping
    const relatedToursCode = fs.readFileSync(path.resolve(process.cwd(), 'src/components/tours/RelatedTours.tsx'), 'utf8');
    assert.ok(relatedToursCode.includes('getBrandConfig'), 'RelatedTours must call getBrandConfig');
    assert.ok(relatedToursCode.includes(".eq('tenant', brand.id)"), 'RelatedTours must filter tours by brand.id');
  });

  it('Test 4: Dynamic itinerary fallback logic on public tour detail', () => {
    // 1. Tour with custom DB itinerary uses DB itinerary
    const customDbItinerary = [
      { day: 1, title: 'Bienvenida personalizada', description: 'Recepción en el aeropuerto y traslado exclusivo.' },
      { day: 2, title: 'Tour exclusivo a medida', description: 'Visita privada con guía especializado.' },
    ];

    const tourWithDbItinerary = {
      id: 'custom-tour-1',
      slug: 'machu-picchu-full-day',
      title: 'Machu Picchu Full Day Custom',
      itinerary: customDbItinerary,
      inclusions: ['Transporte VIP'],
    };

    const localizedCustom = localizeTour(tourWithDbItinerary, 'es');
    assert.strictEqual(localizedCustom.itinerary?.length, 2, 'Should preserve the 2 days from DB itinerary');
    assert.strictEqual(localizedCustom.itinerary?.[0].title, 'Bienvenida personalizada');

    // 2. Tour with empty itinerary array falls back to TOURS_CONTENT static itinerary
    const tourWithEmptyItinerary = {
      id: 'catalog-tour-1',
      slug: 'machu-picchu-full-day',
      title: 'Machu Picchu Full Day Catalog',
      itinerary: [],
      inclusions: ['Transporte'],
    };

    const localizedFallback = localizeTour(tourWithEmptyItinerary, 'es');
    const staticItinerary = TOURS_CONTENT['machu-picchu-full-day'].itinerary.es;
    assert.ok(staticItinerary && staticItinerary.length > 0, 'Static itinerary should exist');
    assert.strictEqual(
      localizedFallback.itinerary?.length,
      staticItinerary.length,
      'Empty DB itinerary must fall back to TOURS_CONTENT static itinerary'
    );
    assert.strictEqual(
      (localizedFallback.itinerary as any)?.[0]?.title,
      staticItinerary[0].title,
      'First day title must match static itinerary fallback'
    );

    // 3. Tour detail page source code inspection
    const tourDetailPageCode = fs.readFileSync(path.resolve(process.cwd(), 'src/app/[locale]/(public)/tours/[slug]/page.tsx'), 'utf8');
    assert.ok(tourDetailPageCode.includes('<TourItinerary items={tour.itinerary} />'), 'Tour detail page must render TourItinerary component with tour.itinerary');
  });

  it('Test 5: Exclusions rendering and 3-tier pricing on public tour detail and booking sidebar', () => {
    const tourDetailPageCode = fs.readFileSync(path.resolve(process.cwd(), 'src/app/[locale]/(public)/tours/[slug]/page.tsx'), 'utf8');

    // Exclusions
    assert.ok(tourDetailPageCode.includes('exclusions: data.exclusions || []'), 'fetchTour must extract exclusions from database row');
    assert.ok(tourDetailPageCode.includes('tour.exclusions && tour.exclusions.length > 0'), 'Tour detail must check for exclusions presence');
    assert.ok(tourDetailPageCode.includes('No Incluye') || tourDetailPageCode.includes('What is Not Included'), 'Tour detail must render "No Incluye" heading');
    assert.ok(tourDetailPageCode.includes('XCircle'), 'Tour detail must use XCircle icon for exclusions');

    // 3-tier Pricing
    assert.ok(tourDetailPageCode.includes('priceInfant: data.price_infant != null'), 'fetchTour must extract priceInfant');
    assert.ok(tourDetailPageCode.includes('tour.priceInfant != null'), 'Tour detail must check for priceInfant display');
    assert.ok(tourDetailPageCode.includes('priceInfant={tour.priceInfant}'), 'Tour detail must pass priceInfant to BookingSidebar');

    // BookingSidebar inspection
    const bookingSidebarCode = fs.readFileSync(path.resolve(process.cwd(), 'src/components/tours/BookingSidebar.tsx'), 'utf8');
    assert.ok(bookingSidebarCode.includes('priceInfant'), 'BookingSidebarProps must include priceInfant');
    assert.ok(bookingSidebarCode.includes('priceInfantProp'), 'BookingSidebar must accept priceInfantProp');
  });
});