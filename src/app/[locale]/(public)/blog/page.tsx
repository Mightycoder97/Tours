import BlogPageClient from '@/components/blog/BlogPageClient';
import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta');
  return {
    title: t('blogPage.title'),
    description: t('blogPage.description'),
  };
}

export const revalidate = 60;

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: tours } = await supabase
    .from('tours')
    .select('id, title, slug, image_url, price_adult, duration, tag')
    .eq('is_active', true)
    .order('created_at', { ascending: true })
    .limit(8);

  return (
    <BlogPageClient tours={tours || []} />
  );
}
