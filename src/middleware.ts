import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { createServerClient } from '@supabase/ssr';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Redirect localized admin/api paths to non-localized equivalents immediately
  const isLocalizedAdmin = pathname.match(/^\/[a-z]{2}\/admin(\/|$)/);
  if (isLocalizedAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/[a-z]{2}\/admin/, '/admin');
    return NextResponse.redirect(url);
  }

  const isLocalizedApi = pathname.match(/^\/[a-z]{2}\/api(\/|$)/);
  if (isLocalizedApi) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/[a-z]{2}\/api/, '/api');
    return NextResponse.redirect(url);
  }

  const isPageAdmin = pathname.startsWith('/admin');
  const isPageApi = pathname.startsWith('/api');
  const isPageLogin = pathname.startsWith('/login') || pathname.match(/^\/[a-z]{2}\/login(\/|$)/);

  // 2. Run next-intl middleware or bypass for admin/api
  let response;
  if (isPageAdmin || isPageApi) {
    response = NextResponse.next();
  } else {
    response = intlMiddleware(request);
  }

  // 3. Initialize Supabase SSR client with synchronized cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // 4. Fetch current user session
  const { data: { user } } = await supabase.auth.getUser();

  // 5. Auth gate rules
  if (isPageAdmin && !user) {
    const url = request.nextUrl.clone();
    const locale = request.cookies.get('NEXT_LOCALE')?.value || 'es';
    url.pathname = `/${locale}/login`;
    // Ensure the post-login redirect path points to the clean, non-localized /admin path
    const cleanRedirectPath = pathname.replace(/^\/[a-z]{2}\/admin/, '/admin');
    url.searchParams.set('redirectTo', cleanRedirectPath);
    return NextResponse.redirect(url);
  }

  if (isPageLogin && user) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin'; // ALWAYS redirect to the non-localized admin dashboard
    url.searchParams.delete('redirectTo');
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  // Match all routes except Next.js internals and static files
  matcher: [
    '/((?!_next|_vercel|.*\\..*).*)',
    '/admin/:path*',
  ],
};
