/**
 * Tier 1: Feature 2 — Multi-Brand Database & Tenant Isolation Tests
 */

import { TestSuite, expect, assertTenantIsolation } from '../harness/assertions';
import { getTestDb, resetTestDb } from '../harness/env';

export const tenantFeatureSuite = new TestSuite(
  'Tier 1.2: Multi-Brand Database & Tenant Isolation',
  'Tier 1: Feature Tests'
);

tenantFeatureSuite.test(
  'T2.1.1',
  'tours table enforces tenant column default and values (mta, sonqo)',
  async () => {
    const db = getTestDb();

    // 1. Tour inserted without tenant explicitly set defaults to 'mta'
    const { data: defaultTour, error: errDefault } = await db.from('tours').insert({
      slug: 'valle-sagrado-vip',
      title: 'Valle Sagrado VIP',
      price_adult: 120.0,
      image_url: 'https://images.unsplash.com/photo-valle',
    });
    expect(errDefault).toBeNull();
    expect(defaultTour).toBeDefined();
    expect(defaultTour![0].tenant).toBe('mta');

    // 2. Explicit tenant 'sonqo' persists properly
    const { data: sonqoTour, error: errSonqo } = await db.from('tours').insert({
      slug: 'valle-sagrado-sonqo',
      tenant: 'sonqo',
      title: 'Valle Sagrado Místico Sonqo',
      price_adult: 135.0,
      image_url: 'https://images.unsplash.com/photo-valle-sonqo',
    });
    expect(errSonqo).toBeNull();
    expect(sonqoTour![0].tenant).toBe('sonqo');

    // 3. Invalid tenant is rejected
    const { error: errInvalid } = await db.from('tours').insert({
      slug: 'tour-unknown-tenant',
      tenant: 'unknown_brand',
      title: 'Invalid Brand Tour',
      price_adult: 99.0,
      image_url: 'https://images.unsplash.com/photo',
    });
    expect(errInvalid).toBeDefined();
    expect(errInvalid?.message).toContain('Invalid tenant');
  }
);

tenantFeatureSuite.test(
  'T2.1.2',
  'site_settings table enforces tenant column partition',
  async () => {
    const db = getTestDb();

    // Verify initial settings are partitioned by tenant
    const { data: allSettings } = await db.from('site_settings');
    expect(allSettings).toBeDefined();

    const mtaSettings = allSettings!.filter(s => s.tenant === 'mta');
    const sonqoSettings = allSettings!.filter(s => s.tenant === 'sonqo');

    expect(mtaSettings.length).toBeGreaterThanOrEqual(1);
    expect(sonqoSettings.length).toBeGreaterThanOrEqual(1);
    assertTenantIsolation(mtaSettings, 'mta');
    assertTenantIsolation(sonqoSettings, 'sonqo');
  }
);

tenantFeatureSuite.test(
  'T2.1.3',
  'Same tour slug can exist independently in mta and sonqo without unique conflict (UNIQUE(tenant, slug))',
  async () => {
    const db = getTestDb();

    // 1. Query pre-seeded tour 'camino-inca-clasico' in MTA
    const { data: mtaTour } = await db.from('tours')
      .eq('tenant', 'mta')
      .eq('slug', 'camino-inca-clasico')
      .single();
    expect(mtaTour).toBeDefined();
    expect(mtaTour.tenant).toBe('mta');

    // 2. Query pre-seeded tour 'camino-inca-clasico' in Sonqo
    const { data: sonqoTour } = await db.from('tours')
      .eq('tenant', 'sonqo')
      .eq('slug', 'camino-inca-clasico')
      .single();
    expect(sonqoTour).toBeDefined();
    expect(sonqoTour.tenant).toBe('sonqo');

    // 3. Both exist simultaneously with distinct IDs and contents
    expect(mtaTour.id).not.toBe(sonqoTour.id);
    expect(mtaTour.title).toContain('MTA');
    expect(sonqoTour.title).toContain('Sonqo Perú');

    // 4. Duplicate slug within SAME tenant is rejected
    const { error: duplicateMtaError } = await db.from('tours').insert({
      slug: 'camino-inca-clasico',
      tenant: 'mta',
      title: 'Attempt Duplicate MTA Tour',
      price_adult: 500,
      image_url: 'https://images.unsplash.com/test',
    });
    expect(duplicateMtaError).toBeDefined();
    expect(duplicateMtaError?.message).toContain('tours_tenant_slug_unique');
  }
);

tenantFeatureSuite.test(
  'T2.1.4',
  'Same site setting key can exist independently in mta and sonqo (UNIQUE(tenant, key))',
  async () => {
    const db = getTestDb();

    // 1. Insert 'contact_phone' for MTA
    const { data: mtaPhone, error: errMta } = await db.from('site_settings').insert({
      tenant: 'mta',
      key: 'contact_phone',
      value: '+51 955 723 329',
      description: 'MTA Phone',
    });
    expect(errMta).toBeNull();
    expect(mtaPhone![0].tenant).toBe('mta');

    // 2. Insert same 'contact_phone' key for Sonqo
    const { data: sonqoPhone, error: errSonqo } = await db.from('site_settings').insert({
      tenant: 'sonqo',
      key: 'contact_phone',
      value: '+51 984 228 417',
      description: 'Sonqo Phone',
    });
    expect(errSonqo).toBeNull();
    expect(sonqoPhone![0].tenant).toBe('sonqo');

    // 3. Attempt duplicate key within SAME tenant (MTA) fails
    const { error: errDup } = await db.from('site_settings').insert({
      tenant: 'mta',
      key: 'contact_phone',
      value: '+51 000 000 000',
    });
    expect(errDup).toBeDefined();
    expect(errDup?.message).toContain('site_settings_tenant_key_unique');
  }
);

tenantFeatureSuite.test(
  'T2.1.5',
  'Querying with tenant filter returns exclusively data belonging to specified tenant',
  async () => {
    const db = getTestDb();

    // 1. Query tours for 'mta'
    const { data: mtaTours } = await db.from('tours').eq('tenant', 'mta');
    expect(mtaTours).toBeDefined();
    expect(mtaTours!.length).toBeGreaterThan(0);
    assertTenantIsolation(mtaTours!, 'mta');

    // 2. Query tours for 'sonqo'
    const { data: sonqoTours } = await db.from('tours').eq('tenant', 'sonqo');
    expect(sonqoTours).toBeDefined();
    expect(sonqoTours!.length).toBeGreaterThan(0);
    assertTenantIsolation(sonqoTours!, 'sonqo');

    // 3. Ensure no crossover
    const mtaIds = new Set(mtaTours!.map(t => t.id));
    for (const st of sonqoTours!) {
      expect(mtaIds.has(st.id)).toBe(false);
    }
  }
);
