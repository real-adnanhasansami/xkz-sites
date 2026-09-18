import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export function middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // লোকালহোস্ট এবং আপনার মেইন প্রোডাকশন ডোমেইন ট্র্যাক করা
  const isLocalhost = hostname.includes('localhost');
  const isMainDomain = hostname === 'xkz.vercel.app' || hostname.startsWith('xkz-sites');

  // ভিজিটর মেইন ডোমেইনে থাকলে নরমালি হোমপেজ লোড হবে
  if (isLocalhost && hostname === 'localhost:3000' || isMainDomain) {
    return NextResponse.next();
  }

  // সাবডোমেন আলাদা করা (যেমন: abc.xkz.vercel.app থেকে abc)
  const subdomain = hostname.split('.')[0];

  // সাবডোমেনটি যদি ভুল করে মেইন নামগুলো হয়, তবে ইগনোর করবে
  if (subdomain === 'xkz' || subdomain === 'xkz-sites' || subdomain === 'www') {
    return NextResponse.next();
  }

  // ইন্টারনালি রুট পরিবর্তন করে ইউজারের নির্দিষ্ট ডাইনামিক সাইটে নিয়ে যাবে
  return NextResponse.rewrite(
    new URL(`/sites/${subdomain}${url.pathname}`, req.url)
  );
}
