import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

export function middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Define base domains for local and production environments
  const isLocalhost = hostname.includes('localhost');
  const baseDomain = isLocalhost ? 'localhost:3000' : 'xkz.vercel.app';

  // Check if the current request is for a subdomain
  if (hostname !== baseDomain && hostname.endsWith(`.${baseDomain}`)) {
    // Extract the subdomain string
    const subdomain = hostname.replace(`.${baseDomain}`, '');
    
    // Rewrite internally to the dynamic route
    return NextResponse.rewrite(
      new URL(`/sites/${subdomain}${url.pathname}`, req.url)
    );
  }

  // Continue normally if it's the root domain
  return NextResponse.next();
}