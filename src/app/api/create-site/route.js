import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const body = await req.json();
    const { siteTitle, htmlContent } = body;

    if (!siteTitle || !htmlContent) {
      return NextResponse.json({ error: 'Title and HTML content are required.' }, { status: 400 });
    }

    // Generate random 8-character alphanumeric string for the subdomain
    const subdomain = Math.random().toString(36).substring(2, 10);

    // Insert payload into Supabase 'user_sites' table
    const { data, error } = await supabase
      .from('user_sites')
      .insert([
        {
          subdomain,
          site_title: siteTitle,
          html_content: htmlContent,
        },
      ])
      .select();

    if (error) throw error;

    // Determine the correct protocol and domain for the response
    const isDev = process.env.NODE_ENV === 'development';
    const baseDomain = isDev ? 'localhost:3000' : 'xkz.vercel.app';
    const protocol = isDev ? 'http' : 'https';
    const siteUrl = `${protocol}://${subdomain}.${baseDomain}`;

    return NextResponse.json({ success: true, subdomain, siteUrl }, { status: 200 });
  } catch (error) {
    console.error('Error creating site:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}