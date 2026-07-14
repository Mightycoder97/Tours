import { getTranslations } from 'next-intl/server';
import { notFound, redirect } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Calendar, Clock, User, ChevronRight, ArrowLeft } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';
import BlogSidebarClient from '@/components/blog/BlogSidebarClient';
import { createClient } from '@supabase/supabase-js';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

async function getSlugForLocale(idx: number, locale: string) {
  const t = await getTranslations({ locale, namespace: 'pages.blog' });
  return t(`posts.${idx}.slug`);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;
  const t = await getTranslations({ locale, namespace: 'pages.blog' });
  
  const postIndices = [0, 1, 2, 3] as const;
  let matchedIdx: number | null = null;
  for (const i of postIndices) {
    if (t(`posts.${i}.slug`) === slug) {
      matchedIdx = i;
      break;
    }
  }
  
  if (matchedIdx === null) {
    return { title: 'Not Found' };
  }
  
  const postTitle = t(`posts.${matchedIdx}.title`);
  const postExcerpt = t(`posts.${matchedIdx}.excerpt`);
  
  const postImages = [
    '/imagenes/hero-machupicchu.png?v=2',
    '/imagenes/tren-machupicchu.png?v=2',
    '/tours/cusco/palcoyo-montana-de-colores-alternativa/01.png',
    '/tours/cusco/pachamanca-full-day/01.png',
  ];
  const imagePath = `https://machupicchutravel.com${postImages[matchedIdx]}`;
  
  const esSlug = await getSlugForLocale(matchedIdx, 'es');
  const enSlug = await getSlugForLocale(matchedIdx, 'en');

  return {
    title: `${postTitle} | Machu Picchu Travel Blog`,
    description: postExcerpt.substring(0, 160),
    openGraph: {
      title: postTitle,
      description: postExcerpt,
      images: [{ url: imagePath }],
      type: 'article',
      url: `https://machupicchutravel.com${locale === 'es' ? '' : '/en'}/blog/${slug}`,
      publishedTime: matchedIdx === 0 ? '2026-05-15T00:00:00Z' : matchedIdx === 1 ? '2026-05-10T00:00:00Z' : matchedIdx === 2 ? '2026-05-05T00:00:00Z' : '2026-05-01T00:00:00Z',
      authors: ['Machu Picchu Travel Adventures'],
    },
    twitter: {
      card: 'summary_large_image',
      title: postTitle,
      description: postExcerpt,
      images: [imagePath],
    },
    alternates: {
      canonical: `https://machupicchutravel.com${locale === 'es' ? '' : '/en'}/blog/${slug}`,
      languages: {
        'es': `https://machupicchutravel.com/blog/${esSlug}`,
        'en': `https://machupicchutravel.com/en/blog/${enSlug}`,
        'x-default': `https://machupicchutravel.com/blog/${esSlug}`,
      },
    },
  };
}

export async function generateStaticParams() {
  const esSlugs = [
    '10-consejos-esenciales-para-visitar-machu-picchu',
    'valle-sagrado-la-joya-oculta-de-los-andes',
    'guia-completa-montana-de-colores-vinicunca',
    'gastronomia-cusquena-sabores-que-no-puedes-perderte'
  ];
  const enSlugs = [
    '10-essential-tips-for-visiting-machu-picchu',
    'sacred-valley-the-hidden-gem-of-the-andes',
    'complete-guide-rainbow-mountain-vinicunca',
    'cusco-cuisine-flavors-you-cant-miss'
  ];
  
  const params: { locale: string; slug: string }[] = [];
  
  esSlugs.forEach((slug) => {
    params.push({ locale: 'es', slug });
  });
  
  enSlugs.forEach((slug) => {
    params.push({ locale: 'en', slug });
  });
  
  return params;
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;
  const t = await getTranslations({ locale, namespace: 'pages.blog' });
  const tc = await getTranslations({ locale, namespace: 'common' });

  const postIndices = [0, 1, 2, 3] as const;
  let matchedIdx: number | null = null;
  for (const i of postIndices) {
    if (t(`posts.${i}.slug`) === slug) {
      matchedIdx = i;
      break;
    }
  }

  // Auto-redirect if slug matches other locale
  if (matchedIdx === null) {
    const otherLocale = locale === 'es' ? 'en' : 'es';
    const tOther = await getTranslations({ locale: otherLocale, namespace: 'pages.blog' });
    for (const i of postIndices) {
      if (tOther(`posts.${i}.slug`) === slug) {
        const correctSlug = tOther(`posts.${i}.slug`);
        const targetPath = otherLocale === 'es' ? `/blog/${correctSlug}` : `/en/blog/${correctSlug}`;
        redirect(targetPath);
      }
    }
    return notFound();
  }

  const postTitle = t(`posts.${matchedIdx}.title`);
  const postExcerpt = t(`posts.${matchedIdx}.excerpt`);
  const postDate = t(`posts.${matchedIdx}.date`);
  const postReadTime = t(`posts.${matchedIdx}.readTime`);
  const postCategory = t(`posts.${matchedIdx}.category`);
  const postAuthor = t(`posts.${matchedIdx}.author`);
  const postIntro = t(`posts.${matchedIdx}.intro`);
  const postConclusion = t(`posts.${matchedIdx}.conclusion`);

  const postImages = [
    '/imagenes/hero-machupicchu.png?v=2',
    '/imagenes/tren-machupicchu.png?v=2',
    '/tours/cusco/palcoyo-montana-de-colores-alternativa/01.png',
    '/tours/cusco/pachamanca-full-day/01.png',
  ];
  const postImage = postImages[matchedIdx];

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const recommendedSlugs = [
    'machu-picchu-full-day',
    'valle-sagrado-vip',
    'montana-de-colores-vinicunca',
    'pachamanca-full-day'
  ];
  const { data: rawTours } = await supabase
    .from('tours')
    .select('id, title, slug, image_url, price_adult, duration, tag')
    .eq('is_active', true)
    .in('slug', recommendedSlugs);

  const tours = (rawTours || []).sort((a, b) => {
    return recommendedSlugs.indexOf(a.slug) - recommendedSlugs.indexOf(b.slug);
  });

  const canonicalUrl = `https://machupicchutravel.com${locale === 'es' ? '' : '/en'}/blog/${slug}`;
  const imageFullPath = `https://machupicchutravel.com${postImage}`;
  
  // Format publish date to ISO for Schema
  const dateIso = matchedIdx === 0 ? '2026-05-15T08:00:00Z' : matchedIdx === 1 ? '2026-05-10T08:00:00Z' : matchedIdx === 2 ? '2026-05-05T08:00:00Z' : '2026-05-01T08:00:00Z';

  // Helper to parse markdown links in paragraphs
  function renderParagraphWithLinks(text: string, key: string) {
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      const linkText = match[1];
      const linkUrl = match[2];
      
      parts.push(
        <Link
          key={`${key}-${match.index}`}
          href={linkUrl}
          className="text-primary hover:text-primary-dark font-bold underline transition-colors"
        >
          {linkText}
        </Link>
      );
      
      lastIndex = regex.lastIndex;
    }
    
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts.length > 0 ? parts : text;
  }

  // Get raw sections from next-intl
  const rawSections = t.raw(`posts.${matchedIdx}.sections`);
  const sections = Array.isArray(rawSections) ? rawSections : [];

  return (
    <div className="bg-gray-50 min-h-screen pt-24 sm:pt-28 pb-20">
      
      {/* Schema.org BlogPosting Markup */}
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': postTitle,
        'description': postExcerpt,
        'image': [imageFullPath],
        'datePublished': dateIso,
        'dateModified': dateIso,
        'author': {
          '@type': 'Organization',
          'name': postAuthor
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Machu Picchu Travel Adventures',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://machupicchutravel.com/imagenes/logo.png'
          }
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': canonicalUrl
        }
      }} />

      {/* Breadcrumbs Navigation */}
      <div className="container mx-auto px-4 lg:px-8 py-4 max-w-6xl">
        <div className="flex items-center gap-2 text-xs text-text-light font-light uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          <span className="text-text-main line-clamp-1 font-normal">{postTitle}</span>
        </div>

        <Link
          href="/blog"
          className="inline-flex items-center text-xs font-bold text-primary hover:text-primary-dark transition-colors uppercase tracking-wider mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {locale === 'es' ? 'Volver al Blog' : 'Back to Blog'}
        </Link>
      </div>

      {/* Main Grid Content */}
      <main className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Article Container (Left Column) */}
          <article className="w-full lg:w-2/3 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-150 shadow-sm">
            
            {/* Category and Meta Info */}
            <header className="mb-6">
              <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-4">
                {postCategory}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-text-main font-bold leading-tight mb-4">
                {postTitle}
              </h1>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-text-light font-light border-b border-gray-100 pb-6">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-primary" />
                  <span>{postAuthor}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{postDate}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary-light" />
                  <span>{postReadTime}</span>
                </span>
              </div>
            </header>

            {/* Featured Image */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-8 shadow-sm bg-gray-100">
              <Image
                src={postImage}
                alt={postTitle}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>

            {/* Article Content Body */}
            <div className="prose max-w-none text-text-main font-sans text-base sm:text-lg leading-relaxed font-light space-y-6">
              
              {/* Introduction */}
              <p className="text-lg text-text-main font-normal leading-relaxed mb-8">
                {renderParagraphWithLinks(postIntro, 'intro')}
              </p>

              {/* Sections */}
              {sections.map((section: any, sIdx: number) => (
                <section key={sIdx} className="pt-4">
                  {section.title && (
                    <h2 className="text-xl sm:text-2xl font-serif text-primary-dark font-bold mt-8 mb-4">
                      {section.title}
                    </h2>
                  )}
                  {Array.isArray(section.paragraphs) && section.paragraphs.map((para: string, pIdx: number) => (
                    <p key={pIdx} className="mb-4 text-text-light font-light leading-relaxed">
                      {renderParagraphWithLinks(para, `s-${sIdx}-p-${pIdx}`)}
                    </p>
                  ))}
                </section>
              ))}

              {/* Conclusion */}
              {postConclusion && (
                <div className="mt-10 p-6 sm:p-8 bg-accent/20 rounded-2xl border border-primary/10">
                  <h3 className="font-serif text-lg sm:text-xl text-primary-dark font-bold mb-2">
                    {locale === 'es' ? 'Conclusión y Recomendaciones' : 'Conclusion and Recommendations'}
                  </h3>
                  <p className="text-text-main font-light leading-relaxed mb-0">
                    {renderParagraphWithLinks(postConclusion, 'conclusion')}
                  </p>
                </div>
              )}

            </div>

          </article>

          {/* Sticky Sidebar Container (Right Column) */}
          <BlogSidebarClient tours={tours} />

        </div>
      </main>

    </div>
  );
}
