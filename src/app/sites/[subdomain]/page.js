import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { subdomain } = params;

  const { data: site } = await supabase
    .from('user_sites')
    .select('site_title')
    .eq('subdomain', subdomain)
    .single();

  return {
    title: site?.site_title || `Site - ${subdomain}`,
  };
}

export default async function SubdomainPage({ params }) {
  const { subdomain } = params;

  if (!subdomain) {
    notFound();
  }

  const { data: site, error } = await supabase
    .from('user_sites')
    .select('html_content, site_title')
    .eq('subdomain', subdomain)
    .single();

  if (error || !site) {
    notFound();
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: site.html_content }}
      style={{ width: '100%', minHeight: '100vh' }}
    />
  );
}
