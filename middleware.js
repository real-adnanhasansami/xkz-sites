// middleware.js
import { NextResponse } from 'next/server';

const ROOT_DOMAIN = 'xkz.vercel.app'; // your production root domain

export function middleware(req) {
  try {
    const url = req.nextUrl;
    const hostHeader = req.headers.get('host');

    // If for any reason there's no host header, just let it through.
    if (!hostHeader) {
      return NextResponse.next();
    }

    // Strip port (important for localhost:3000)
    const hostname = hostHeader.split(':')[0];

    // --- 1. Bypass conditions ---
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    const isRootDomain = hostname === ROOT_DOMAIN;
    // Vercel preview/branch deployment URLs (…-git-main-…, …-fqmsr…vercel.app)
    // These have MORE hyphenated segments than a real subdomain would — treat
    // any hostname that isn't exactly "<subdomain>.xkz.vercel.app" pattern
    // safely by only proceeding when it literally ends with ".${ROOT_DOMAIN}"
    const isSubdomainOfRoot = hostname.endsWith(`.${ROOT_DOMAIN}`);

    if (isLocalhost || isRootDomain || !isSubdomainOfRoot) {
      return NextResponse.next();
    }

    // --- 2. Extract subdomain safely ---
    const subdomain = hostname.replace(`.${ROOT_DOMAIN}`, '');

    if (!subdomain || subdomain.includes('.')) {
      // malformed / unexpected hostname shape — don't risk rewriting
      return NextResponse.next();
    }

    // --- 3. Rewrite ---
    const rewriteUrl = url.clone();
    rewriteUrl.pathname = `/sites/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(rewriteUrl);

  } catch (err) {
    // Absolute last line of defense — never let middleware 500.
    console.error('Middleware error:', err);
    return NextResponse.next();
  }
}

// --- 4. Critical: matcher must exclude _next, api, and static files ---
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
