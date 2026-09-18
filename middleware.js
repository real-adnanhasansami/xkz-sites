import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // আপনার মূল ডোমেইন বা লোকালহোস্ট হলে মিডলওয়্যার কাজ করবে না (হোমপেজ দেখাবে)
  const currentHost = process.env.NODE_ENV === 'production' 
    ? hostname.replace(`.vercel.app`, '') 
    : hostname.replace(`.localhost:3000`, '');

  // যদি মূল ডোমেইন বা www হয়, তবে রুট পেজে থাকতে দিন
  if (
    currentHost === 'xkz' || 
    currentHost === 'localhost' || 
    currentHost === 'www' ||
    !currentHost
  ) {
    return NextResponse.next();
  }

  // অন্যথায় সাবডোমেইন রিকোয়েস্টকে /sites/[subdomain]-এ রিরাইট করে দিন
  return NextResponse.rewrite(new URL(`/sites/${currentHost}${url.pathname}`, req.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
