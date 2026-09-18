import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';

// Prevent Next.js from statically rendering this route at build time
export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Optional: Generate metadata (title) based on the database entry
export async function generateMetadata({ params }) {
  const { subdomain } = params;
  
  const { data } = await supabase
    .from('user_sites')
    .select('site_title')
    .eq('subdomain', subdomain)
    .single();

  return {
    title: data?.site_title || 'Not Found',
  };
}

export default async function SubdomainSite({ params }) {
  const { subdomain } = params;

  // Query Supabase for the specific subdomain
  const { data, error } = await supabase
    .from('user_sites')
    .select('html_content')
    .eq('subdomain', subdomain)
    .single();

  // If no record exists, trigger Next.js 404 page
  if (error || !data) {
    notFound();
  }

  // Render raw HTML. Note: In production, consider sanitizing HTML if needed,
  // but since these are isolated subdomains, standard same-origin policies apply.
  return (
    <div 
      className="subdomain-wrapper h-full w-full"
      dangerouslySetInnerHTML={{ __html: data.html_content }} 
    />
  );
}