import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // লোকালহোস্ট নাকি প্রোডাকশন ডোমেইন তা চেক করা
  const currentHost = hostname
    .replace('.vercel.app', '')
    .replace('.localhost:3000', '');

  // যদি মূল ডোমেইন, www বা লোকালহোস্ট হয়, তবে রুট পেজে থাকতে দিন
  if (
    currentHost === 'xkz' || 
    currentHost === 'localhost' || 
    currentHost === 'www' ||
    !currentHost ||
    currentHost.includes('127.0.0.1')
  ) {
    return NextResponse.next();
  }

  // অন্যথায় সাবডোমেইন রিকোয়েস্টকে /sites/[subdomain]-এ রিরাইট করুন
  return NextResponse.rewrite(new URL(`/sites/${currentHost}${url.pathname}`, req.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
