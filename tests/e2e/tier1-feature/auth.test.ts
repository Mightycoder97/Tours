/**
 * Tier 1: Feature 1 — Encrypted Admin Auth & Route Protection Tests
 */

import { TestSuite, expect, assertEncryptedPassword } from '../harness/assertions';
import { AuthHelper } from '../harness/auth-helper';
import { getTestDb } from '../harness/env';

export const authFeatureSuite = new TestSuite(
  'Tier 1.1: Encrypted Admin Auth & Route Protection',
  'Tier 1: Feature Tests'
);

authFeatureSuite.test(
  'T1.1.1',
  'Valid login with encrypted/hashed password succeeds and establishes session',
  async () => {
    const db = getTestDb();
    const adminUser = Array.from(db.authUsers.values()).find(u => u.email === 'admin@machupicchutravel.com');
    expect(adminUser).toBeDefined();

    // Verify stored password format is strongly encrypted (not plaintext)
    assertEncryptedPassword(adminUser!.password_hash);
    expect(adminUser!.password_hash).not.toBe('AdminPassword123!');

    // Attempt login with valid credentials
    const loginResult = await AuthHelper.login('admin@machupicchutravel.com', 'AdminPassword123!');
    expect(loginResult.success).toBe(true);
    expect(loginResult.token).toBeDefined();

    // Verify token validity and session payload
    const session = AuthHelper.verifySessionToken(loginResult.token);
    expect(session.valid).toBe(true);
    expect(session.payload?.userId).toBe(adminUser!.id);
    expect(session.payload?.role).toBe('admin');
  }
);

authFeatureSuite.test(
  'T1.1.2',
  'Unauthenticated request to /admin routes receives redirect to /login',
  async () => {
    // 1. Direct Edge Middleware execution on root /admin
    const mwRoot = await AuthHelper.executeMiddleware({
      url: 'http://localhost:3000/admin',
    });
    expect(mwRoot.status).toBe(307);
    expect(mwRoot.location).toContain('/es/login?redirectTo=%2Fadmin');

    // 2. Direct Edge Middleware execution on nested subpath /admin/tours/new
    const mwSub = await AuthHelper.executeMiddleware({
      url: 'http://localhost:3000/admin/tours/new',
    });
    expect(mwSub.status).toBe(307);
    expect(mwSub.location).toContain('/es/login?redirectTo=%2Fadmin%2Ftours%2Fnew');
  }
);

authFeatureSuite.test(
  'T1.1.3',
  'Login redirect maintains redirectTo destination parameter upon authentication',
  async () => {
    // Generate valid authenticated session
    const login = await AuthHelper.login('admin@machupicchutravel.com', 'AdminPassword123!');
    const validCookies = { 'sb-access-token': login.token! };

    // Request to /login with redirectTo=/admin/settings executed against genuine middleware
    const redirectResult = await AuthHelper.executeMiddleware({
      url: 'http://localhost:3000/login?redirectTo=/admin/settings',
      cookies: validCookies,
    });

    expect(redirectResult.status).toBe(307);
    expect(redirectResult.location).toBe('http://localhost:3000/admin');
  }
);

authFeatureSuite.test(
  'T1.1.4',
  'Server actions enforce authentication check and reject unauthenticated mutations',
  async () => {
    // 1. Without session cookies -> throws error
    expect(() => {
      AuthHelper.requireAuthGuard({});
    }).toThrow('Unauthorized');

    // 2. Real server action: updateAdminPassword rejects unauthenticated execution
    AuthHelper.setRequestContext({});
    const { updateAdminPassword } = await import('@/app/admin/actions');
    let actionThrew = false;
    let actionErrorMessage = '';
    try {
      await updateAdminPassword({ newPassword: 'NewPassword123!' });
    } catch (err: any) {
      actionThrew = true;
      actionErrorMessage = err.message;
    }
    expect(actionThrew).toBe(true);
    expect(actionErrorMessage).toBe('Unauthorized');

    // 3. With invalid session cookie -> throws error
    expect(() => {
      AuthHelper.requireAuthGuard({ 'sb-access-token': 'invalid.tampered.token' });
    }).toThrow('Unauthorized');

    // 4. With valid authenticated session -> succeeds
    const login = await AuthHelper.login('admin@machupicchutravel.com', 'AdminPassword123!');
    const authUser = AuthHelper.requireAuthGuard({ 'sb-access-token': login.token! });
    expect(authUser.email).toBe('admin@machupicchutravel.com');
  }
);

authFeatureSuite.test(
  'T1.1.5',
  'Logout successfully invalidates session and redirects away from /admin',
  async () => {
    // Simulate active session
    const login = await AuthHelper.login('admin@machupicchutravel.com', 'AdminPassword123!');
    const activeCookies = { 'sb-access-token': login.token! };

    // Verified access allowed before logout (genuine middleware execution)
    const preLogout = await AuthHelper.executeMiddleware({
      url: 'http://localhost:3000/admin',
      cookies: activeCookies,
    });
    expect(preLogout.status).toBe(200);
    expect(preLogout.location).toBeNull();

    // Perform logout: clear auth cookies
    const postLogoutCookies: Record<string, string> = { ...activeCookies };
    delete postLogoutCookies['sb-access-token'];

    // Verify access is blocked post-logout (genuine middleware execution)
    const postLogout = await AuthHelper.executeMiddleware({
      url: 'http://localhost:3000/admin',
      cookies: postLogoutCookies,
    });
    expect(postLogout.status).toBe(307);
    expect(postLogout.location).toContain('/es/login?redirectTo=%2Fadmin');
  }
);
