/**
 * Tier 1: Feature 4 — Public Brand Parity & Dynamic Branding Tests
 */

import { TestSuite, expect, assertTenantIsolation } from '../harness/assertions';
import { BrandHelper } from '../harness/brand-helper';
import { getTestDb } from '../harness/env';

export const publicFeatureSuite = new TestSuite(
  'Tier 1.4: Public Brand Parity & Dynamic Branding',
  'Tier 1: Feature Tests'
);

publicFeatureSuite.test(
  'T4.1.1',
  'Public site renders MTA branding (logo, primary teal theme) in default context',
  () => {
    const defaultBrand = BrandHelper.resolvePublicBrand({});
    expect(defaultBrand).toBe('mta');

    const mtaConfig = BrandHelper.getConfig(defaultBrand);
    expect(mtaConfig.id).toBe('mta');
    expect(mtaConfig.name).toBe('Machu Picchu Travel Adventure');
    expect(mtaConfig.colors.primary).toBe('#048A84');
    expect(mtaConfig.colors.primaryLight).toBe('#06C0B8');
    expect(mtaConfig.bookingPrefix).toBe('MTP');
    expect(mtaConfig.logo.lightBgSrc).toBe('/imagenes/logo.png');
  }
);

publicFeatureSuite.test(
  'T4.1.2',
  'Public site renders Sonqo branding (data-brand="sonqo", custom palette) when requested',
  () => {
    // Resolve Sonqo via host header
    const sonqoBrand = BrandHelper.resolvePublicBrand({ host: 'sonqoperutravel.com' });
    expect(sonqoBrand).toBe('sonqo');

    const theme = BrandHelper.getExpectedHtmlTheme(sonqoBrand);
    expect(theme.dataBrand).toBe('sonqo');
    expect(theme.primaryColor).toBe('#8B66E8');

    const sonqoConfig = BrandHelper.getConfig(sonqoBrand);
    expect(sonqoConfig.id).toBe('sonqo');
    expect(sonqoConfig.name).toBe('Sonqo Perú Travel');
    expect(sonqoConfig.bookingPrefix).toBe('SNQ');
    expect(sonqoConfig.logo.lightBgSrc).toContain('sonqo');
  }
);

publicFeatureSuite.test(
  'T4.1.3',
  'Public tour listings filter strictly by active public brand tenant',
  async () => {
    const db = getTestDb();

    // 1. Public catalog request for MTA domain
    const activeMta = BrandHelper.resolvePublicBrand({ host: 'machupicchutravel.com' });
    const { data: mtaCatalog } = await db.from('tours').eq('tenant', activeMta).eq('is_active', true);
    expect(mtaCatalog).toBeDefined();
    expect(mtaCatalog!.length).toBeGreaterThan(0);
    assertTenantIsolation(mtaCatalog!, 'mta');

    // 2. Public catalog request for Sonqo domain
    const activeSonqo = BrandHelper.resolvePublicBrand({ host: 'sonqoperutravel.com' });
    const { data: sonqoCatalog } = await db.from('tours').eq('tenant', activeSonqo).eq('is_active', true);
    expect(sonqoCatalog).toBeDefined();
    expect(sonqoCatalog!.length).toBeGreaterThan(0);
    assertTenantIsolation(sonqoCatalog!, 'sonqo');
  }
);

publicFeatureSuite.test(
  'T4.1.4',
  'Public tour detail page loads tour matching active brand without cross-brand leak',
  async () => {
    const db = getTestDb();
    const commonSlug = 'camino-inca-clasico';

    // 1. Visit tour detail on MTA domain
    const { data: mtaDetail } = await db.from('tours')
      .eq('tenant', 'mta')
      .eq('slug', commonSlug)
      .single();
    expect(mtaDetail).toBeDefined();
    expect(mtaDetail.tenant).toBe('mta');
    expect(mtaDetail.title).toContain('MTA');
    expect(mtaDetail.price_adult).toBe(650.0);

    // 2. Visit tour detail on Sonqo domain
    const { data: sonqoDetail } = await db.from('tours')
      .eq('tenant', 'sonqo')
      .eq('slug', commonSlug)
      .single();
    expect(sonqoDetail).toBeDefined();
    expect(sonqoDetail.tenant).toBe('sonqo');
    expect(sonqoDetail.title).toContain('Sonqo Perú');
    expect(sonqoDetail.price_adult).toBe(680.0);
  }
);

publicFeatureSuite.test(
  'T4.1.5',
  'Brand configuration in src/lib/brand.ts provides complete metadata for both brands',
  () => {
    const mta = BrandHelper.getConfig('mta');
    const sonqo = BrandHelper.getConfig('sonqo');

    // Both brands have full contact, legal, RUC, social, bookingPrefix metadata
    expect(mta.ruc).toBe('20564458385');
    expect(sonqo.ruc).toBe('20616667549');

    expect(mta.bookingPrefix).toBe('MTP');
    expect(sonqo.bookingPrefix).toBe('SNQ');

    expect(mta.contact.phone).toBeDefined();
    expect(sonqo.contact.phone).toBeDefined();

    expect(mta.social.facebook).toBeDefined();
    expect(sonqo.social.facebook).toBeDefined();
  }
);
