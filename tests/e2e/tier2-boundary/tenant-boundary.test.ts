/**
 * Tier 2: Boundary 2 — Multi-Brand Database Boundaries
 */

import { TestSuite, expect } from '../harness/assertions';
import { getTestDb } from '../harness/env';

export const tenantBoundarySuite = new TestSuite(
  'Tier 2.2: Multi-Brand Database Boundaries',
  'Tier 2: Boundary & Corner Cases'
);

tenantBoundarySuite.test(
  'T2.2.1',
  'Attempting to insert tour with invalid/unknown tenant value is rejected',
  async () => {
    const db = getTestDb();

    // 1. Unknown tenant string
    const { error: errUnknown } = await db.from('tours').insert({
      slug: 'tour-bad-tenant',
      tenant: 'random_tenant',
      title: 'Bad Tenant Tour',
      price_adult: 100,
      image_url: 'https://images.unsplash.com/test',
    });
    expect(errUnknown).toBeDefined();
    expect(errUnknown?.message).toContain('Invalid tenant');

    // 2. Numeric / corrupted tenant
    const { error: errNumeric } = await db.from('tours').insert({
      slug: 'tour-num-tenant',
      tenant: '12345',
      title: 'Numeric Tenant Tour',
      price_adult: 100,
      image_url: 'https://images.unsplash.com/test',
    });
    expect(errNumeric).toBeDefined();
  }
);

tenantBoundarySuite.test(
  'T2.2.2',
  'Tenant identifiers are strictly case-normalized (case-insensitive handling)',
  async () => {
    const db = getTestDb();

    // 1. Insert with uppercase 'SONQO'
    const { data: created, error } = await db.from('tours').insert({
      slug: 'tour-case-test',
      tenant: 'SONQO',
      title: 'Case Normalized Tour',
      price_adult: 220,
      image_url: 'https://images.unsplash.com/test',
    });
    expect(error).toBeNull();
    expect(created![0].tenant).toBe('sonqo');

    // 2. Querying with mixed case 'SoNqO' returns the record
    const { data: queried } = await db.from('tours')
      .eq('tenant', 'SoNqO')
      .eq('slug', 'tour-case-test')
      .single();
    expect(queried).toBeDefined();
    expect(queried.tenant).toBe('sonqo');
  }
);

tenantBoundarySuite.test(
  'T2.2.3',
  'Querying non-existent tenant returns empty set rather than throwing error',
  async () => {
    const db = getTestDb();

    // Query non-existent tenant
    const { data, error } = await db.from('tours').eq('tenant', 'mta_non_existent');
    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data!.length).toBe(0);
  }
);

tenantBoundarySuite.test(
  'T2.2.4',
  'Cross-tenant foreign key integrity preserved across shared category/destination tables',
  async () => {
    const db = getTestDb();

    // 1. Valid category and destination shared across both tenants
    const sharedCatId = 'cat-adventure-001';
    const sharedDestId = 'dest-mp-002';

    // MTA tour using shared FKs
    const { error: errMta } = await db.from('tours').insert({
      slug: 'mta-fk-test',
      tenant: 'mta' as const,
      title: 'MTA FK Tour',
      price_adult: 300,
      image_url: 'https://images.unsplash.com/test',
      category_id: sharedCatId,
      destination_id: sharedDestId,
    });
    expect(errMta).toBeNull();

    // Sonqo tour using same shared FKs
    const { error: errSonqo } = await db.from('tours').insert({
      slug: 'sonqo-fk-test',
      tenant: 'sonqo' as const,
      title: 'Sonqo FK Tour',
      price_adult: 310,
      image_url: 'https://images.unsplash.com/test',
      category_id: sharedCatId,
      destination_id: sharedDestId,
    });
    expect(errSonqo).toBeNull();

    // Non-existent category FK is rejected
    const { error: errInvalidFk } = await db.from('tours').insert({
      slug: 'invalid-fk-tour',
      tenant: 'mta' as const,
      title: 'Invalid FK Tour',
      price_adult: 200,
      image_url: 'https://images.unsplash.com/test',
      category_id: 'non-existent-uuid',
    });
    expect(errInvalidFk).toBeDefined();
    expect(errInvalidFk?.message).toContain('foreign key');
  }
);

tenantBoundarySuite.test(
  'T2.2.5',
  'Concurrent tour inserts with same slug in different tenants succeed simultaneously',
  async () => {
    const db = getTestDb();
    const commonSlug = 'maravilla-machu-picchu-express';

    // Run parallel inserts for MTA and Sonqo
    const [resMta, resSonqo] = await Promise.all([
      db.from('tours').insert({
        slug: commonSlug,
        tenant: 'mta' as const,
        title: 'Machu Picchu Express MTA',
        price_adult: 390,
        image_url: 'https://images.unsplash.com/test-mta',
      }),
      db.from('tours').insert({
        slug: commonSlug,
        tenant: 'sonqo' as const,
        title: 'Machu Picchu Express Sonqo',
        price_adult: 410,
        image_url: 'https://images.unsplash.com/test-sonqo',
      }),
    ]);

    expect(resMta.error).toBeNull();
    expect(resSonqo.error).toBeNull();
    expect(resMta.data![0].tenant).toBe('mta');
    expect(resSonqo.data![0].tenant).toBe('sonqo');
    expect(resMta.data![0].id).not.toBe(resSonqo.data![0].id);
  }
);
