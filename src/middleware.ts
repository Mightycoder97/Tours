import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes — redirect to /login if no session cookie
  if (pathname.startsWith('/admin')) {
    const token =
      request.cookies.get('sb-access-token')?.value ||
      request.cookies.get('sb-refresh-token')?.value;

    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Handle i18n routing for all other routes
  return intlMiddleware(request);
}

export const config = {
  // Match all routes except Next.js internals and static files
  matcher: [
    '/((?!_next|_vercel|.*\\..*).*)',
    '/admin/:path*',
  ],
};
