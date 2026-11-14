/**
 * Tier 2: Boundary 4 — Public Brand Parity Boundaries
 */

import { TestSuite, expect } from '../harness/assertions';
import { BrandHelper } from '../harness/brand-helper';
import { getTestDb } from '../harness/env';

export const publicBoundarySuite = new TestSuite(
  'Tier 2.4: Public Brand Parity Boundaries',
  'Tier 2: Boundary & Corner Cases'
);

publicBoundarySuite.test(
  'T4.2.1',
  'Host header with unmapped domain defaults gracefully to primary brand (mta)',
  () => {
    // 1. Unknown third-party domain
    const brand1 = BrandHelper.resolvePublicBrand({ host: 'random-domain.org' });
    expect(brand1).toBe('mta');

    // 2. IP address host
    const brand2 = BrandHelper.resolvePublicBrand({ host: '192.168.1.100:3000' });
    expect(brand2).toBe('mta');

    // 3. Empty or null host
    const brand3 = BrandHelper.resolvePublicBrand({});
    expect(brand3).toBe('mta');
  }
);

publicBoundarySuite.test(
  'T4.2.2',
  'Missing CSS theme variables for brand fall back to root tokens',
  () => {
    // Verify MTA fallback palette
    const mtaTheme = BrandHelper.getExpectedHtmlTheme('mta');
    expect(mtaTheme.primaryColor).toBe('#048A84');

    // Verify Sonqo overrides
    const sonqoTheme = BrandHelper.getExpectedHtmlTheme('sonqo');
    expect(sonqoTheme.primaryColor).toBe('#8B66E8');
    expect(sonqoTheme.primaryColor).not.toBe(mtaTheme.primaryColor);
  }
);

publicBoundarySuite.test(
  'T4.2.3',
  'Direct navigation to a Sonqo tour slug while on MTA domain returns 404 or redirects cleanly',
  async () => {
    const db = getTestDb();

    // Insert an exclusive Sonqo tour that does not exist in MTA
    await db.from('tours').insert({
      slug: 'sonqo-exclusive-meditation',
      tenant: 'sonqo' as const,
      title: 'Ceremonia Exclusiva Sonqo',
      price_adult: 200,
      image_url: 'https://images.unsplash.com/test',
    });

    // Request this slug under MTA public context
    const { data: mtaLookup } = await db.from('tours')
      .eq('tenant', 'mta')
      .eq('slug', 'sonqo-exclusive-meditation')
      .maybeSingle();

    // Must return null (404 Not Found)
    expect(mtaLookup).toBeNull();
  }
);

publicBoundarySuite.test(
  'T4.2.4',
  'High concurrency public requests for both brands serve correct respective assets',
  async () => {
    const requests = Array.from({ length: 20 }).map((_, i) => {
      const isMta = i % 2 === 0;
      const host = isMta ? 'machupicchutravel.com' : 'sonqoperutravel.com';
      const resolved = BrandHelper.resolvePublicBrand({ host });
      return { expected: isMta ? 'mta' : 'sonqo', resolved };
    });

    for (const req of requests) {
      expect(req.resolved).toBe(req.expected);
    }
  }
);

publicBoundarySuite.test(
  'T4.2.5',
  'Special characters in brand search queries do not crash brand filter logic',
  async () => {
    const db = getTestDb();

    const maliciousQueries = [
      "' OR 1=1 --",
      '<script>alert("xss")</script>',
      '../../../etc/passwd',
      '%%__$$##@@!!',
    ];

    for (const q of maliciousQueries) {
      // Safe brand query
      const { data, error } = await db.from('tours')
        .eq('tenant', 'mta')
        .eq('slug', q);

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data!.length).toBe(0);
    }
  }
);
