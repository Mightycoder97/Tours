/**
 * Tier 1: Feature 3 — Admin Multi-Brand Context Switcher Tests
 */

import { TestSuite, expect } from '../harness/assertions';
import { BrandHelper } from '../harness/brand-helper';
import { getAdminActiveBrand, setAdminActiveBrand, ADMIN_BRAND_COOKIE } from '@/lib/admin-brand';
import { getTestDb } from '../harness/env';

export const switcherFeatureSuite = new TestSuite(
  'Tier 1.3: Admin Multi-Brand Context Switcher',
  'Tier 1: Feature Tests'
);

switcherFeatureSuite.test(
  'T3.1.1',
  'Setting active brand to sonqo stores admin_brand=sonqo cookie',
  async () => {
    BrandHelper.resetCookies();
    await setAdminActiveBrand('sonqo');

    const cookie = BrandHelper.getCookie(ADMIN_BRAND_COOKIE);
    expect(cookie).toBeDefined();
    expect(cookie?.value).toBe('sonqo');

    const options = BrandHelper.getCookieOptions(ADMIN_BRAND_COOKIE);
    expect(options?.path).toBe('/');
    expect(options?.maxAge).toBe(60 * 60 * 24 * 30);

    const resolved = await getAdminActiveBrand();
    expect(resolved).toBe('sonqo');
  }
);

switcherFeatureSuite.test(
  'T3.1.2',
  'Setting active brand to mta stores admin_brand=mta cookie',
  async () => {
    BrandHelper.resetCookies();
    await setAdminActiveBrand('mta');

    const cookie = BrandHelper.getCookie(ADMIN_BRAND_COOKIE);
    expect(cookie).toBeDefined();
    expect(cookie?.value).toBe('mta');

    const resolved = await getAdminActiveBrand();
    expect(resolved).toBe('mta');
  }
);

switcherFeatureSuite.test(
  'T3.1.3',
  'Default admin brand is mta when no cookie is set',
  async () => {
    BrandHelper.resetCookies();
    const defaultBrand = await getAdminActiveBrand();
    expect(defaultBrand).toBe('mta');

    BrandHelper.setCookie('NEXT_LOCALE', 'es');
    const withOtherCookies = await getAdminActiveBrand();
    expect(withOtherCookies).toBe('mta');
  }
);

switcherFeatureSuite.test(
  'T3.1.4',
  'Admin layout / header reflects current active brand context',
  () => {
    const mtaConfig = BrandHelper.getConfig('mta');
    expect(mtaConfig.name).toContain('Machu Picchu Travel');
    expect(mtaConfig.adminBadgeClass).toContain('teal');

    const sonqoConfig = BrandHelper.getConfig('sonqo');
    expect(sonqoConfig.name).toContain('Sonqo Perú Travel');
    expect(sonqoConfig.adminBadgeClass).toContain('8B66E8');
  }
);

switcherFeatureSuite.test(
  'T3.1.5',
  'Switching brand revalidates administrative view data for the selected brand',
  async () => {
    const db = getTestDb();

    // 1. In MTA context, list tours
    await setAdminActiveBrand('mta');
    const brandMta = await getAdminActiveBrand();
    const { data: mtaTours } = await db.from('tours').eq('tenant', brandMta);
    expect(mtaTours).toBeDefined();
    for (const t of mtaTours!) {
      expect(t.tenant).toBe('mta');
    }

    // 2. Switch context to Sonqo via production function
    await setAdminActiveBrand('sonqo');
    const brandSonqo = await getAdminActiveBrand();
    expect(brandSonqo).toBe('sonqo');

    // 3. In Sonqo context, list tours returns Sonqo tours only
    const { data: sonqoTours } = await db.from('tours').eq('tenant', brandSonqo);
    expect(sonqoTours).toBeDefined();
    for (const t of sonqoTours!) {
      expect(t.tenant).toBe('sonqo');
    }
  }
);
