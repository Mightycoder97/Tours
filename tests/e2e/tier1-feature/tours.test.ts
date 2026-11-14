/**
 * Tier 1: Feature 5 — Comprehensive Tour/Plan CMS Tests
 */

import { TestSuite, expect, assertValidPricing, assertValidItinerary } from '../harness/assertions';
import { getTestDb } from '../harness/env';

export const toursFeatureSuite = new TestSuite(
  'Tier 1.5: Comprehensive Tour/Plan CMS',
  'Tier 1: Feature Tests'
);

toursFeatureSuite.test(
  'T5.1.1',
  'Admin can create new tour with 3-tier pricing (price_adult, price_child, price_infant)',
  async () => {
    const db = getTestDb();

    const newTour = {
      slug: 'tour-salcantay-trek',
      tenant: 'mta' as const,
      title: 'Salcantay Trek a Machu Picchu 5 Días',
      description: 'Espectacular caminata alternativa por el nevado Salcantay.',
      price_adult: 450.0,
      price_child: 320.0,
      price_infant: 90.0,
      duration: '5 Días / 4 Noches',
      tag: 'Aventura',
      image_url: 'https://images.unsplash.com/photo-salcantay',
      is_active: true,
    };

    assertValidPricing(newTour);

    const { data, error } = await db.from('tours').insert(newTour);
    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data![0].price_adult).toBe(450.0);
    expect(data![0].price_child).toBe(320.0);
    expect(data![0].price_infant).toBe(90.0);
  }
);

toursFeatureSuite.test(
  'T5.1.2',
  'Admin can edit tour details and update prices for all 3 passenger tiers',
  async () => {
    const db = getTestDb();

    // 1. Create a dedicated tour for modification testing (avoid mutating shared seed tours)
    const { data: created } = await db.from('tours').insert({
      slug: 'tour-pricing-edit-test',
      tenant: 'mta' as const,
      title: 'Tour Para Edición de Precios',
      price_adult: 500.0,
      price_child: 300.0,
      price_infant: 100.0,
      image_url: 'https://images.unsplash.com/test-edit',
    });
    const tourId = created![0].id;

    // 2. Update all 3 tier prices
    const updatedPricing = {
      price_adult: 700.0,
      price_child: 500.0,
      price_infant: 200.0,
    };
    assertValidPricing(updatedPricing);

    const { data: updated, error } = await db.from('tours')
      .eq('id', tourId)
      .update(updatedPricing);

    expect(error).toBeNull();
    expect(updated).toBeDefined();
    expect(updated![0].price_adult).toBe(700.0);
    expect(updated![0].price_child).toBe(500.0);
    expect(updated![0].price_infant).toBe(200.0);
  }
);

toursFeatureSuite.test(
  'T5.1.3',
  'Tour supports dynamic day-by-day itinerary stored as structured JSON',
  async () => {
    const db = getTestDb();

    const itineraryData = [
      { day: 1, title: 'Bienvenida en Cusco', description: 'Recepción en el aeropuerto y aclimatación.' },
      { day: 2, title: 'Valle Sagrado de los Incas', description: 'Visita a Pisac y Ollantaytambo.' },
      { day: 3, title: 'Santuario de Machu Picchu', description: 'Tour guiado por la ciudadela sagrada.' },
    ];

    assertValidItinerary(itineraryData);

    const { data, error } = await db.from('tours').insert({
      slug: 'cusco-magico-3-dias',
      tenant: 'sonqo' as const,
      title: 'Cusco Mágico 3 Días',
      price_adult: 380.0,
      image_url: 'https://images.unsplash.com/photo-cusco-magico',
      itinerary: itineraryData,
    });

    expect(error).toBeNull();
    expect(data![0].itinerary).toBeDefined();
    expect(data![0].itinerary.length).toBe(3);
    expect(data![0].itinerary[0].title).toBe('Bienvenida en Cusco');
  }
);

toursFeatureSuite.test(
  'T5.1.4',
  'Tour supports explicit lists of inclusions and exclusions',
  async () => {
    const db = getTestDb();

    const inclusions = [
      'Transporte turístico privado',
      'Desayuno buffet andino',
      'Boleto turístico de Cusco (BTC)',
    ];
    const exclusions = [
      'Vuelos nacionales o internacionales',
      'Bebidas alcohólicas',
      'Propinas voluntarias',
    ];

    const { data, error } = await db.from('tours').insert({
      slug: 'tour-con-inclusiones',
      tenant: 'mta' as const,
      title: 'Tour con Inclusiones Completas',
      price_adult: 250.0,
      image_url: 'https://images.unsplash.com/photo-tour',
      inclusions,
      exclusions,
    });

    expect(error).toBeNull();
    expect(data![0].inclusions).toEqual(inclusions);
    expect(data![0].exclusions).toEqual(exclusions);
  }
);

toursFeatureSuite.test(
  'T5.1.5',
  'Admin can toggle tour active/inactive state and delete a tour',
  async () => {
    const db = getTestDb();

    // 1. Create a tour to toggle and delete
    const { data: created } = await db.from('tours').insert({
      slug: 'tour-a-eliminar',
      tenant: 'mta' as const,
      title: 'Tour Temporal',
      price_adult: 100.0,
      image_url: 'https://images.unsplash.com/photo',
      is_active: true,
    });
    const tourId = created![0].id;

    // 2. Toggle active to false
    const { data: deactivated } = await db.from('tours')
      .eq('id', tourId)
      .update({ is_active: false });
    expect(deactivated![0].is_active).toBe(false);

    // 3. Delete the tour
    const { error: deleteError } = await db.from('tours').eq('id', tourId).delete();
    expect(deleteError).toBeNull();

    // 4. Verify tour no longer exists
    const { data: checkDeleted } = await db.from('tours').eq('id', tourId).maybeSingle();
    expect(checkDeleted).toBeNull();
  }
);
