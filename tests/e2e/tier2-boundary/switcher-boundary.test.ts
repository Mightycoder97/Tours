/**
 * Tier 2: Boundary 3 — Admin Brand Switcher Boundaries
 */

import { TestSuite, expect } from '../harness/assertions';
import { BrandHelper } from '../harness/brand-helper';
import { getAdminActiveBrand, setAdminActiveBrand, ADMIN_BRAND_COOKIE } from '@/lib/admin-brand';

export const switcherBoundarySuite = new TestSuite(
  'Tier 2.3: Admin Brand Switcher Boundaries',
  'Tier 2: Boundary & Corner Cases'
);

switcherBoundarySuite.test(
  'T3.2.1',
  'Corrupted or tampered admin_brand cookie value gracefully defaults to mta',
  async () => {
    // 1. Random garbage string
    BrandHelper.setCookie(ADMIN_BRAND_COOKIE, 'corrupted_payload_xyz$$$');
    expect(await getAdminActiveBrand()).toBe('mta');

    // 2. SQL injection attempt in cookie
    BrandHelper.setCookie(ADMIN_BRAND_COOKIE, "mta' OR '1'='1");
    expect(await getAdminActiveBrand()).toBe('mta');

    // 3. XSS payload in cookie
    BrandHelper.setCookie(ADMIN_BRAND_COOKIE, '<script>alert(1)</script>');
    expect(await getAdminActiveBrand()).toBe('mta');
  }
);

switcherBoundarySuite.test(
  'T3.2.2',
  'Empty string in admin_brand cookie falls back to mta',
  async () => {
    BrandHelper.setCookie(ADMIN_BRAND_COOKIE, '');
    expect(await getAdminActiveBrand()).toBe('mta');

    BrandHelper.setCookie(ADMIN_BRAND_COOKIE, '   ');
    expect(await getAdminActiveBrand()).toBe('mta');
  }
);

switcherBoundarySuite.test(
  'T3.2.3',
  'Rapid toggling between mta and sonqo does not cause race conditions or state pollution',
  async () => {
    const sequence: Array<'sonqo' | 'mta'> = ['sonqo', 'mta', 'sonqo', 'sonqo', 'mta', 'sonqo'];

    for (const target of sequence) {
      await setAdminActiveBrand(target);
      expect(await getAdminActiveBrand()).toBe(target);
    }

    expect(await getAdminActiveBrand()).toBe('sonqo');
  }
);

switcherBoundarySuite.test(
  'T3.2.4',
  'Sub-paths under /admin/tours/[id] preserve active brand state',
  async () => {
    await setAdminActiveBrand('sonqo');

    // Verify root path cookie scope ensures availability across all admin sub-paths
    const options = BrandHelper.getCookieOptions(ADMIN_BRAND_COOKIE);
    expect(options?.path).toBe('/');

    expect(await getAdminActiveBrand()).toBe('sonqo');
  }
);

switcherBoundarySuite.test(
  'T3.2.5',
  'setAdminActiveBrand rejects invalid brand identifier and updates active brand state',
  async () => {
    // 1. Invalid brand rejected
    let threw = false;
    try {
      await setAdminActiveBrand('unknown_tenant' as any);
    } catch (err: any) {
      threw = true;
      expect(err.message).toContain('Invalid brand identifier');
    }
    expect(threw).toBe(true);

    // 2. Valid brand transitions succeed cleanly
    await setAdminActiveBrand('mta');
    expect(await getAdminActiveBrand()).toBe('mta');

    await setAdminActiveBrand('sonqo');
    expect(await getAdminActiveBrand()).toBe('sonqo');
  }
);
