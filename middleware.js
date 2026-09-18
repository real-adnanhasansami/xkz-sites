import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // লোকালহোস্ট বা মূল ভেরসেল প্রজেক্ট ডোমেইন হলে মিডলওয়্যার বাইপাস করবে (হোমপেজ দেখাবে)
  if (
    hostname.includes('localhost') || 
    hostname.includes('127.0.0.1') || 
    hostname === 'xkz.vercel.app' ||
    hostname.startsWith('xkz-sites') // আপনার মূল প্রজেক্ট ডোমেইনের অংশ
  ) {
    return NextResponse.next();
  }

  // অন্যথায় এটিকে ইউজারের সাবডোমেইন ধরে নির্দিষ্ট ফোল্ডারে রিরাইট করবে
  const currentHost = hostname.split('.')[0];
  return NextResponse.rewrite(new URL(`/sites/${currentHost}${url.pathname}`, req.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
