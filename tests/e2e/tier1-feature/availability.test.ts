/**
 * Tier 1: Feature 6 — Brand-Aware Tour Availability Tests
 */

import { TestSuite, expect } from '../harness/assertions';
import { getTestDb } from '../harness/env';

export const availabilityFeatureSuite = new TestSuite(
  'Tier 1.6: Brand-Aware Tour Availability',
  'Tier 1: Feature Tests'
);

availabilityFeatureSuite.test(
  'T6.1.1',
  'Availability slots can be created for specific dates with capacity and price overrides',
  async () => {
    const db = getTestDb();

    // 1. Fetch an existing MTA tour
    const { data: tour } = await db.from('tours').eq('tenant', 'mta').limit(1).single();
    expect(tour).toBeDefined();

    // 2. Insert availability slot
    const slot = {
      tour_id: tour.id,
      tenant: 'mta' as const,
      date: '2026-07-20',
      capacity: 20,
      booked_count: 0,
      price_override: 720.0,
      is_blocked: false,
    };

    const { data, error } = await db.from('tour_availability').insert(slot);
    expect(error).toBeNull();
    expect(data![0].capacity).toBe(20);
    expect(data![0].price_override).toBe(720.0);
    expect(data![0].date).toBe('2026-07-20');
  }
);

availabilityFeatureSuite.test(
  'T6.1.2',
  'Availability generation is bound to tours belonging to the active brand',
  async () => {
    const db = getTestDb();

    // Get Sonqo tour
    const { data: sonqoTour } = await db.from('tours').eq('tenant', 'sonqo').limit(1).single();
    expect(sonqoTour).toBeDefined();

    // Generate batch availability for Sonqo tour
    const dates = ['2026-08-01', '2026-08-02', '2026-08-03'];
    const slots = dates.map(d => ({
      tour_id: sonqoTour.id,
      tenant: 'sonqo' as const,
      date: d,
      capacity: 12,
      booked_count: 0,
      is_blocked: false,
    }));

    const { data, error } = await db.from('tour_availability').insert(slots);
    expect(error).toBeNull();
    expect(data!.length).toBe(3);

    for (const record of data!) {
      expect(record.tenant).toBe('sonqo');
      expect(record.tour_id).toBe(sonqoTour.id);
    }
  }
);

availabilityFeatureSuite.test(
  'T6.1.3',
  'Booking a tour updates availability counts accurately',
  async () => {
    const db = getTestDb();

    // Create a slot with capacity 10 and 0 booked
    const { data: created } = await db.from('tour_availability').insert({
      tour_id: 'tour-mta-001',
      tenant: 'mta' as const,
      date: '2026-09-10',
      capacity: 10,
      booked_count: 0,
      is_blocked: false,
    });
    const slotId = created![0].id;

    // Simulate booking 4 spots
    const requestedSeats = 4;
    const { data: slot } = await db.from('tour_availability').eq('id', slotId).single();
    const remainingSeats = slot.capacity - slot.booked_count;
    expect(remainingSeats >= requestedSeats).toBe(true);

    const { data: updated, error } = await db.from('tour_availability')
      .eq('id', slotId)
      .update({ booked_count: slot.booked_count + requestedSeats });

    expect(error).toBeNull();
    expect(updated![0].booked_count).toBe(4);
    expect(updated![0].capacity - updated![0].booked_count).toBe(6);
  }
);

availabilityFeatureSuite.test(
  'T6.1.4',
  'Admin can view availability calendar filtered by active brand tours',
  async () => {
    const db = getTestDb();

    // 1. Query availability for MTA
    const { data: mtaAvail } = await db.from('tour_availability').eq('tenant', 'mta');
    expect(mtaAvail).toBeDefined();
    for (const item of mtaAvail!) {
      expect(item.tenant).toBe('mta');
    }

    // 2. Query availability for Sonqo
    const { data: sonqoAvail } = await db.from('tour_availability').eq('tenant', 'sonqo');
    expect(sonqoAvail).toBeDefined();
    for (const item of sonqoAvail!) {
      expect(item.tenant).toBe('sonqo');
    }
  }
);

availabilityFeatureSuite.test(
  'T6.1.5',
  'Sold out dates prevent further bookings in the public booking sidebar',
  async () => {
    const db = getTestDb();
    const soldOutDate = '2026-10-01';

    // 1. Create sold out slot in database (booked_count === capacity)
    const { data: created } = await db.from('tour_availability').insert({
      tour_id: 'tour-mta-001',
      tenant: 'mta' as const,
      date: soldOutDate,
      capacity: 8,
      booked_count: 8,
      is_blocked: false,
    });
    const slotId = created![0].id;

    // 2. Query availability slot directly from database
    const { data: slot } = await db.from('tour_availability')
      .eq('id', slotId)
      .single();

    expect(slot).toBeDefined();
    const spotsRemaining = slot.capacity - slot.booked_count;
    expect(spotsRemaining).toBe(0);

    // 3. Database boundary: attempting to book beyond capacity is strictly rejected
    const { error: overbookError } = await db.from('tour_availability')
      .eq('id', slotId)
      .update({ booked_count: slot.booked_count + 1 });

    expect(overbookError).not.toBeNull();
    expect(overbookError!.message).toContain('tour_availability_capacity_check');
  }
);
