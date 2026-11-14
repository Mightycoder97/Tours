/**
 * Tier 2: Boundary 1 — Encrypted Admin Auth & Route Protection Boundaries
 */

import { TestSuite, expect } from '../harness/assertions';
import { AuthHelper } from '../harness/auth-helper';

export const authBoundarySuite = new TestSuite(
  'Tier 2.1: Auth & Route Protection Boundaries',
  'Tier 2: Boundary & Corner Cases'
);

authBoundarySuite.test(
  'T1.2.1',
  'Login attempt with empty email or empty password gracefully rejected',
  async () => {
    // 1. Empty email
    const res1 = await AuthHelper.login('', 'AdminPassword123!');
    expect(res1.success).toBe(false);
    expect(res1.error).toContain('required');

    // 2. Empty password
    const res2 = await AuthHelper.login('admin@machupicchutravel.com', '');
    expect(res2.success).toBe(false);
    expect(res2.error).toContain('required');

    // 3. Both empty
    const res3 = await AuthHelper.login('', '');
    expect(res3.success).toBe(false);
  }
);

authBoundarySuite.test(
  'T1.2.2',
  'Login attempt with invalid password hash / plaintext mismatch rejected',
  async () => {
    // Correct user, incorrect password
    const res = await AuthHelper.login('admin@machupicchutravel.com', 'WrongPassword999!');
    expect(res.success).toBe(false);
    expect(res.error).toContain('Invalid login credentials');
    expect(res.token).toBeUndefined();
  }
);

authBoundarySuite.test(
  'T1.2.3',
  'Rapid repeated login failures trigger rate-limiting or controlled rejection without crash',
  async () => {
    const attempts = 15;
    const results = await Promise.all(
      Array.from({ length: attempts }).map(() =>
        AuthHelper.login('admin@machupicchutravel.com', 'BadPass_Repeat')
      )
    );

    for (const r of results) {
      expect(r.success).toBe(false);
    }
  }
);

authBoundarySuite.test(
  'T1.2.4',
  'Malformed redirect URL in redirectTo (open redirect vector) sanitizes to default /admin',
  () => {
    // 1. External domain URL
    const safe1 = AuthHelper.sanitizeRedirectUrl('https://malicious-attacker.com/steal-creds');
    expect(safe1).toBe('/admin');

    // 2. Protocol-relative URL
    const safe2 = AuthHelper.sanitizeRedirectUrl('//evil.com/phish');
    expect(safe2).toBe('/admin');

    // 3. Javascript: pseudo-protocol
    const safe3 = AuthHelper.sanitizeRedirectUrl('javascript:alert(document.cookie)');
    expect(safe3).toBe('/admin');

    // 4. Valid relative URL is preserved
    const safe4 = AuthHelper.sanitizeRedirectUrl('/admin/tours');
    expect(safe4).toBe('/admin/tours');
  }
);

authBoundarySuite.test(
  'T1.2.5',
  'Expired JWT / auth token triggers clean redirect to /login with session expiration message',
  async () => {
    // Generate an expired token (expires in -10 seconds)
    const expiredToken = AuthHelper.createSessionToken('user-admin-001', 'admin@machupicchutravel.com', -10);

    const verify = AuthHelper.verifySessionToken(expiredToken);
    expect(verify.valid).toBe(false);
    expect(verify.error).toContain('expired');

    const routeCheck = await AuthHelper.executeMiddleware({
      url: 'http://localhost:3000/admin',
      cookies: { 'sb-access-token': expiredToken },
    });
    expect(routeCheck.status).toBe(307);
    expect(routeCheck.location).toContain('/es/login?redirectTo=%2Fadmin');
  }
);
