import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Server-side Supabase client for data fetching
const supabase = createClient(supabaseUrl, supabaseKey);

// Keep data fresh, adjust revalidate based on your needs
export const revalidate = 60; 

export default async function SitePage({ params }) {
  const { subdomain } = params;

  if (!subdomain) {
    notFound();
  }

  const { data, error } = await supabase
    .from('sites')
    .select('html_content')
    .eq('subdomain', subdomain)
    .single();

  if (error || !data) {
    // Falls back to a 404 page if subdomain doesn't exist in Supabase
    notFound();
  }

  return (
    <div 
      className="w-full min-h-screen" 
      dangerouslySetInnerHTML={{ __html: data.html_content }} 
    />
  );
}