import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. favicon.ico)
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};

export function middleware(req) {
  const url = req.nextUrl.clone();
  
  // Get hostname of request (e.g. demo.xkz.vercel.app)
  const hostname = req.headers.get('host') || '';

  // Define our root domains to ignore
  const rootDomains = ['localhost:3000', 'xkz.vercel.app'];

  // If we are on the root domain, do nothing
  if (rootDomains.includes(hostname)) {
    return NextResponse.next();
  }

  // Extract the subdomain (everything before the first dot)
  const subdomain = hostname.split('.')[0];

  // If a valid subdomain exists and it's not a root domain, rewrite the URL
  if (subdomain && !rootDomains.includes(subdomain)) {
    url.pathname = `/sites/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}