import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // লোকালহোস্ট বা মূল ভেরসেল প্রজেক্ট ডোমেইন হলে মিডলওয়্যার বাইপাস করবে (মেইন ড্যাশবোর্ড দেখাবে)
  if (
    hostname.includes('localhost') || 
    hostname.includes('127.0.0.1') || 
    hostname === 'xkz.vercel.app' ||
    hostname.startsWith('xkz-sites')
  ) {
    return NextResponse.next();
  }

  // সাবডোমেইন হলে তা /sites/[subdomain]-এ রিরাইট করবে
  const currentHost = hostname.split('.')[0];
  if (currentHost && currentHost !== 'www') {
    return NextResponse.rewrite(new URL(`/sites/${currentHost}${url.pathname}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
