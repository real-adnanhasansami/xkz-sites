import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export function middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // base domain বা মেইন ওয়েবসাইট ট্র‍্যাক করা
  const isLocalhost = hostname.includes('localhost');
  const baseDomain = isLocalhost ? 'localhost:3000' : 'xkz.vercel.app';

  // ভিজিটর মেইন ডোমেইনে থাকলে নরমালি পেজ লোড হবে
  if (hostname === baseDomain) {
    return NextResponse.next();
  }

  // ভিজিটর যদি কোনো সাবডোমেইনে ঢোকে (যেমন: abc.xkz.vercel.app)
  const subdomain = hostname.split('.')[0];

  // সাবডোমেইনটি যদি মেইন ডোমেইনের নামের সাথে মিলে যায় (xkz) তবে ইগনোর করবে
  if (subdomain === 'xkz') {
    return NextResponse.next();
  }

  // ইন্টারনালি রুট পরিবর্তন করে ইউজারের নির্দিষ্ট সাইটে নিয়ে যাবে
  return NextResponse.rewrite(
    new URL(`/sites/${subdomain}${url.pathname}`, req.url)
  );
}
