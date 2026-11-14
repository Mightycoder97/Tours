/**
 * Tier 2: Boundary 5 — Tour CMS Boundaries
 */

import {
  TestSuite,
  expect,
  assertValidItinerary,
} from '../harness/assertions';
import { sanitizeExclusionsList, assertValidPricing } from '@/lib/tours';
import { getTestDb } from '../harness/env';

export const toursBoundarySuite = new TestSuite(
  'Tier 2.5: Tour CMS Boundaries',
  'Tier 2: Boundary & Corner Cases'
);

toursBoundarySuite.test(
  'T5.2.1',
  'Price adult = 0, negative prices rejected with validation errors',
  () => {
    // 1. Adult price = 0
    expect(() => {
      assertValidPricing({ price_adult: 0 });
    }).toThrow('strictly greater than 0');

    // 2. Negative adult price
    expect(() => {
      assertValidPricing({ price_adult: -50 });
    }).toThrow('strictly greater than 0');

    // 3. Negative child price
    expect(() => {
      assertValidPricing({ price_adult: 100, price_child: -10 });
    }).toThrow('cannot be negative');

    // 4. Negative infant price
    expect(() => {
      assertValidPricing({ price_adult: 100, price_infant: -5 });
    }).toThrow('cannot be negative');
  }
);

toursBoundarySuite.test(
  'T5.2.2',
  'Price infant > price adult rejected or handled with validation warning',
  () => {
    // Infant price ($300) > Adult price ($100)
    expect(() => {
      assertValidPricing({
        price_adult: 100,
        price_child: 80,
        price_infant: 300,
      });
    }).toThrow('should not exceed adult price');
  }
);

toursBoundarySuite.test(
  'T5.2.3',
  'Empty itinerary (0 days) and large itinerary (30+ days) handled without JSON truncation',
  async () => {
    const db = getTestDb();

    // 1. Empty itinerary (0 days)
    const { data: tour0 } = await db.from('tours').insert({
      slug: 'tour-0-day-itinerary',
      tenant: 'mta' as const,
      title: 'Tour Sin Itinerario',
      price_adult: 150,
      image_url: 'https://images.unsplash.com/test',
      itinerary: [],
    });
    expect(tour0![0].itinerary).toEqual([]);

    // 2. Large itinerary (35 days)
    const largeItinerary = Array.from({ length: 35 }).map((_, i) => ({
      day: i + 1,
      title: `Día ${i + 1} de la Gran Travesía Pan-Andina`,
      description: `Descripción detallada de la jornada ${i + 1} recorriendo senderos ancestrales.`,
    }));
    assertValidItinerary(largeItinerary);

    const { data: tour35, error } = await db.from('tours').insert({
      slug: 'tour-35-day-expedition',
      tenant: 'mta' as const,
      title: 'Expedición Pan-Andina 35 Días',
      price_adult: 3500,
      image_url: 'https://images.unsplash.com/test',
      itinerary: largeItinerary,
    });

    expect(error).toBeNull();
    expect(tour35![0].itinerary.length).toBe(35);
    expect(tour35![0].itinerary[34].day).toBe(35);
  }
);

toursBoundarySuite.test(
  'T5.2.4',
  'Exclusions list with empty strings or special characters sanitized properly',
  async () => {
    const db = getTestDb();

    // Raw exclusions containing blank lines or whitespace
    const rawInput = ['  Almuerzo no incluido  ', '', '   ', 'Propinas <script>', 'Seguro & impuestos'];
    const sanitized = sanitizeExclusionsList(rawInput);
    expect(sanitized.length).toBe(3);

    const { data: tour, error } = await db.from('tours').insert({
      slug: 'tour-sanitized-exclusions',
      tenant: 'sonqo' as const,
      title: 'Tour Exclusiones Sanitizadas',
      price_adult: 200,
      image_url: 'https://images.unsplash.com/test',
      exclusions: sanitized,
    });

    expect(error).toBeNull();
    expect(tour![0].exclusions.length).toBe(3);
    expect(tour![0].exclusions[0]).toBe('Almuerzo no incluido');
  }
);

toursBoundarySuite.test(
  'T5.2.5',
  'Maximum length title (255 chars) and extreme description (50k chars) handled gracefully',
  async () => {
    const db = getTestDb();

    const maxTitle = 'T'.repeat(255);
    const hugeDescription = 'D'.repeat(50000);

    const { data, error } = await db.from('tours').insert({
      slug: 'tour-max-strings',
      tenant: 'mta' as const,
      title: maxTitle,
      description: hugeDescription,
      price_adult: 150,
      image_url: 'https://images.unsplash.com/test',
    });

    expect(error).toBeNull();
    expect(data![0].title.length).toBe(255);
    expect(data![0].description.length).toBe(50000);
  }
);
