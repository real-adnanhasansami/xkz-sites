import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // যদি রুট ডোমেইন বা লোকালহোস্ট হয়, তবে কোনো রিরাইট হবে না, সরাসরি হোমপেজে যাবে
  if (
    hostname === 'xkz.vercel.app' || 
    hostname.includes('xkz-sites') || 
    hostname.includes('localhost') || 
    hostname.includes('127.0.0.1')
  ) {
    return NextResponse.next();
  }

  // সাবডোমেইন হলে নির্দিষ্ট ফোল্ডারে পাঠাবে
  const subdomain = hostname.split('.')[0];
  if (subdomain && subdomain !== 'www') {
    return NextResponse.rewrite(new URL(`/sites/${subdomain}${url.pathname}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
