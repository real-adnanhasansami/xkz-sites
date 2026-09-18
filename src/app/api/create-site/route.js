import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Ensure you have these mapped in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

// Generate random 8-character alphanumeric string
const generateSubdomain = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export async function POST(req) {
  try {
    const { html_content } = await req.json();

    if (!html_content) {
      return NextResponse.json({ success: false, error: 'HTML content required' }, { status: 400 });
    }

    const subdomain = generateSubdomain();

    // Requires a 'sites' table in Supabase with 'subdomain' and 'html_content' columns
    const { data, error } = await supabase
      .from('sites')
      .insert([{ subdomain, html_content }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, subdomain, data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}