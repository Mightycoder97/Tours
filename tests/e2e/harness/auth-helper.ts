/**
 * Authentication & Security Test Helpers
 * Encrypted Passwords, Session Tokens, and Genuine Edge Middleware Execution
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://haccibtugwhoegcovlat.supabase.co';
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'mock-anon-key-for-test-runner';
}

import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { NextRequest, NextResponse } from 'next/server';
import middleware from '@/middleware';
import { getTestDb, mockCookieStore } from './env';

export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  salt: string;
}

export interface SessionTokenPayload {
  userId: string;
  email: string;
  role: 'admin';
  exp: number; // Unix timestamp in seconds
}

export class AuthHelper {
  private static readonly SECRET_KEY = 'mta-test-auth-jwt-secret-key-2026';
  private static interceptorInitialized = false;

  /**
   * Initializes transparent fetch interception for Supabase SSR Auth endpoints.
   */
  public static initAuthInterceptor(): void {
    if (this.interceptorInitialized) return;
    this.interceptorInitialized = true;

    const origFetch = globalThis.fetch;
    globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;

      if (url.includes('/auth/v1/user')) {
        let authHeader: string | null = null;
        if (init?.headers) {
          if (init.headers instanceof Headers) {
            authHeader = init.headers.get('Authorization') || init.headers.get('authorization');
          } else if (Array.isArray(init.headers)) {
            const found = init.headers.find(([k]) => k.toLowerCase() === 'authorization');
            authHeader = found ? found[1] : null;
          } else {
            authHeader = (init.headers as any)['Authorization'] || (init.headers as any)['authorization'] || null;
          }
        }

        if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
          const token = authHeader.substring(7);
          const session = AuthHelper.verifySessionToken(token);
          if (session.valid && session.payload) {
            return new Response(
              JSON.stringify({
                id: session.payload.userId,
                email: session.payload.email,
                role: session.payload.role,
                aud: 'authenticated',
              }),
              { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
          }
        }
        return new Response(JSON.stringify({ message: 'Invalid JWT' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (url.includes('/auth/v1/token')) {
        return new Response(
          JSON.stringify({ error: 'invalid_grant', error_description: 'Token expired or invalid' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return origFetch(input, init);
    };
  }

  /**
   * Resolves the Supabase SSR auth cookie key (e.g. sb-haccibtugwhoegcovlat-auth-token).
   */
  public static getSupabaseAuthCookieName(): string {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://haccibtugwhoegcovlat.supabase.co';
      const host = new URL(supabaseUrl).hostname;
      const projectRef = host.split('.')[0];
      return `sb-${projectRef}-auth-token`;
    } catch {
      return 'sb-haccibtugwhoegcovlat-auth-token';
    }
  }

  /**
   * Sets up the Next.js cookies store for server action execution.
   */
  public static setRequestContext(cookiesMap: Record<string, string> = {}): void {
    mockCookieStore.load(cookiesMap);
    const req = createRequire(process.cwd() + '/package.json');
    const nextHeaders = req('next/headers');
    nextHeaders.cookies = async () => mockCookieStore;
  }

  /**
   * Hashes a password using PBKDF2 with SHA-256 and salt.
   */
  public static hashPassword(password: string): { hash: string; salt: string; combined: string } {
    if (!password || password.trim() === '') {
      throw new Error('Password cannot be empty');
    }
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha256').toString('hex');
    const combined = `${salt}:${hash}`;
    return { hash, salt, combined };
  }

  /**
   * Verifies a password against the stored salt:hash string.
   */
  public static verifyPassword(password: string, combinedHash: string): boolean {
    if (!password || !combinedHash) return false;
    const parts = combinedHash.split(':');
    if (parts.length !== 2) return false;
    const [salt, originalHash] = parts;
    try {
      const testHash = crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha256').toString('hex');
      const bufTest = Buffer.from(testHash, 'hex');
      const bufOrig = Buffer.from(originalHash, 'hex');
      if (bufTest.length !== bufOrig.length) return false;
      return crypto.timingSafeEqual(bufTest, bufOrig);
    } catch {
      return false;
    }
  }

  /**
   * Creates a signed session token.
   */
  public static createSessionToken(userId: string, email: string, expiresInSeconds = 3600): string {
    const payload: SessionTokenPayload = {
      userId,
      email,
      role: 'admin',
      exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
    };
    const b64Payload = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const hmac = crypto.createHmac('sha256', this.SECRET_KEY).update(b64Payload).digest('base64url');
    return `${b64Payload}.${hmac}`;
  }

  /**
   * Verifies and decodes a session token.
   */
  public static verifySessionToken(token: string | undefined): { valid: boolean; payload?: SessionTokenPayload; error?: string } {
    if (!token) {
      return { valid: false, error: 'Token missing' };
    }
    const parts = token.split('.');
    if (parts.length !== 2) {
      return { valid: false, error: 'Malformed token structure' };
    }
    const [b64Payload, signature] = parts;
    const expectedSig = crypto.createHmac('sha256', this.SECRET_KEY).update(b64Payload).digest('base64url');

    try {
      const isSigValid = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig));
      if (!isSigValid) {
        return { valid: false, error: 'Invalid token signature (tampered)' };
      }
    } catch {
      return { valid: false, error: 'Invalid token signature length' };
    }

    try {
      const payload: SessionTokenPayload = JSON.parse(Buffer.from(b64Payload, 'base64url').toString('utf8'));
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp < now) {
        return { valid: false, error: 'Session token has expired' };
      }
      return { valid: true, payload };
    } catch {
      return { valid: false, error: 'Corrupted payload JSON' };
    }
  }

  /**
   * Authenticates user against registered DB credentials.
   */
  public static async login(email: string, password: string): Promise<{ success: boolean; token?: string; error?: string }> {
    if (!email || !password) {
      return { success: false, error: 'Email and password are required' };
    }
    const db = getTestDb();
    const user = Array.from(db.authUsers.values()).find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return { success: false, error: 'Invalid login credentials' };
    }

    const isValid = this.verifyPassword(password, user.password_hash);
    if (!isValid) {
      return { success: false, error: 'Invalid login credentials' };
    }

    const token = this.createSessionToken(user.id, user.email);
    return { success: true, token };
  }

  /**
   * Sanitizes redirectTo parameters to prevent Open Redirect vulnerabilities.
   */
  public static sanitizeRedirectUrl(targetUrl: string | undefined | null): string {
    if (!targetUrl || typeof targetUrl !== 'string') {
      return '/admin';
    }
    const trimmed = targetUrl.trim();
    if (trimmed.startsWith('//') || /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) {
      return '/admin';
    }
    if (!trimmed.startsWith('/')) {
      return '/admin';
    }
    return trimmed;
  }

  /**
   * Executes genuine Next.js Edge Middleware for route protection and redirection.
   */
  public static async executeMiddleware(params: {
    url: string;
    cookies?: Record<string, string>;
    headers?: Record<string, string>;
  }): Promise<{ status: number; location: string | null; response: NextResponse }> {
    this.initAuthInterceptor();

    const { url, cookies = {}, headers = {} } = params;
    const request = new NextRequest(new URL(url, 'http://localhost:3000'), {
      headers: new Headers(headers),
    });

    const storageKey = this.getSupabaseAuthCookieName();

    for (const [key, value] of Object.entries(cookies)) {
      request.cookies.set(key, value);
      if (key === 'sb-access-token' || key === 'admin_session') {
        let exp = Math.floor(Date.now() / 1000) + 3600;
        try {
          const parts = value.split('.');
          if (parts.length === 2) {
            const payload = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'));
            if (payload.exp) exp = payload.exp;
          }
        } catch {}

        request.cookies.set(
          storageKey,
          JSON.stringify({
            access_token: value,
            refresh_token: `refresh-${value}`,
            expires_at: exp,
          })
        );
      }
    }

    const response = await middleware(request);
    return {
      status: response.status,
      location: response.headers.get('location'),
      response,
    };
  }

  /**
   * Server Action Auth Guard helper.
   */
  public static requireAuthGuard(cookies: Record<string, string>): { userId: string; email: string } {
    const sessionToken = cookies['sb-access-token'] || cookies['admin_session'];
    const session = this.verifySessionToken(sessionToken);
    if (!session.valid || !session.payload) {
      throw new Error(`Unauthorized: ${session.error || 'Authentication required'}`);
    }
    return {
      userId: session.payload.userId,
      email: session.payload.email,
    };
  }
}
