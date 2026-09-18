import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const subdomain = resolvedParams.subdomain;

  const { data } = await supabase
    .from('user_sites')
    .select('site_title')
    .eq('subdomain', subdomain)
    .single();

  return {
    title: data?.site_title || 'Generated Site',
  };
}

export default async function SitePage({ params }) {
  const resolvedParams = await params;
  const subdomain = resolvedParams.subdomain;

  const { data, error } = await supabase
    .from('user_sites')
    .select('html_content')
    .eq('subdomain', subdomain)
    .single();

  if (error || !data) {
    notFound();
  }

  return (
    <div 
      style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, border: 'none' }}
      dangerouslySetInnerHTML={{ __html: data.html_content }} 
    />
  );
}
