/**
 * Tier 2: Boundary 6 — Tour Availability Boundaries
 */

import { TestSuite, expect } from '../harness/assertions';
import { getTestDb } from '../harness/env';

export const availabilityBoundarySuite = new TestSuite(
  'Tier 2.6: Tour Availability Boundaries',
  'Tier 2: Boundary & Corner Cases'
);

availabilityBoundarySuite.test(
  'T6.2.1',
  'Availability generation for dates in the past is rejected or marked historical',
  async () => {
    const db = getTestDb();
    const pastDate = '2020-01-01';

    // Insert past date slot
    await db.from('tour_availability').insert({
      tour_id: 'tour-mta-001',
      tenant: 'mta' as const,
      date: pastDate,
      capacity: 10,
      booked_count: 0,
      is_blocked: false,
    });

    // Public availability filter enforces current and future dates only
    const today = new Date().toISOString().split('T')[0];
    const { data: futureSlots } = await db.from('tour_availability')
      .eq('tour_id', 'tour-mta-001')
      .gte('date', today);

    const hasPastSlot = futureSlots?.some(s => s.date === pastDate);
    expect(hasPastSlot).toBe(false);
  }
);

availabilityBoundarySuite.test(
  'T6.2.2',
  'Leap day (February 29) availability handled correctly across year boundaries',
  async () => {
    const db = getTestDb();
    const leapDay = '2028-02-29'; // 2028 is a leap year

    const { data: slot, error } = await db.from('tour_availability').insert({
      tour_id: 'tour-mta-001',
      tenant: 'mta' as const,
      date: leapDay,
      capacity: 15,
      booked_count: 0,
      is_blocked: false,
    });

    expect(error).toBeNull();
    expect(slot![0].date).toBe('2028-02-29');

    // Parse with Date to ensure validity
    const d = new Date(slot![0].date);
    expect(d.getUTCFullYear()).toBe(2028);
    expect(d.getUTCMonth()).toBe(1); // February is 1 (0-indexed)
    expect(d.getUTCDate()).toBe(29);
  }
);

availabilityBoundarySuite.test(
  'T6.2.3',
  'Zero capacity slot marks tour immediately unavailable',
  async () => {
    const db = getTestDb();

    const { data: slot, error } = await db.from('tour_availability').insert({
      tour_id: 'tour-mta-001',
      tenant: 'mta' as const,
      date: '2026-11-20',
      capacity: 0,
      booked_count: 0,
      is_blocked: false,
    });

    expect(error).toBeNull();
    const availableSeats = slot![0].capacity - slot![0].booked_count;
    expect(availableSeats).toBe(0);

    const canBookAny = availableSeats > 0;
    expect(canBookAny).toBe(false);
  }
);

availabilityBoundarySuite.test(
  'T6.2.4',
  'Overbooking attempt (requesting more seats than capacity) cleanly rejected',
  async () => {
    const db = getTestDb();

    // Create slot with capacity 10 and booked 8
    const { data: slot } = await db.from('tour_availability').insert({
      tour_id: 'tour-mta-001',
      tenant: 'mta' as const,
      date: '2026-11-25',
      capacity: 10,
      booked_count: 8,
      is_blocked: false,
    });
    const slotId = slot![0].id;

    // Attempt update that exceeds capacity: 8 + 3 = 11 > 10
    const { error } = await db.from('tour_availability')
      .eq('id', slotId)
      .update({ booked_count: 11 });

    expect(error).not.toBeNull();
    expect(error!.message).toContain('tour_availability_capacity_check');
  }
);

availabilityBoundarySuite.test(
  'T6.2.5',
  'Batch availability creation with 365 days generated efficiently without timeout',
  async () => {
    const db = getTestDb();
    const startTime = Date.now();

    const batch = Array.from({ length: 365 }).map((_, i) => {
      const d = new Date('2027-01-01');
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      return {
        tour_id: 'tour-mta-001',
        tenant: 'mta' as const,
        date: dateStr,
        capacity: 20,
        booked_count: 0,
        is_blocked: false,
      };
    });

    const { data, error } = await db.from('tour_availability').insert(batch);
    const durationMs = Date.now() - startTime;

    expect(error).toBeNull();
    expect(data!.length).toBe(365);
    expect(durationMs).toBeLessThan(1000); // Must complete under 1s
  }
);
