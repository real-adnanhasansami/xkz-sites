import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // প্রোডাকশনে আপনার মূল ডোমেইন বা প্রজেক্ট নেম হ্যান্ডেল করার জন্য
  const currentHost = hostname.split('.')[0];

  // যদি মূল ডোমেইন বা লোকালহোস্ট হয় (যেমন: xkz বা localhost)
  if (
    currentHost === 'xkz' || 
    hostname === 'xkz.vercel.app' || 
    hostname.includes('localhost')
  ) {
    return NextResponse.next();
  }

  // সাবডোমেইন হলে নির্দিষ্ট ফোল্ডারে রিরাইট করবে
  return NextResponse.rewrite(new URL(`/sites/${currentHost}${url.pathname}`, req.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
