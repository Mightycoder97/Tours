import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta');
  return {
    title: t('blogPage.title'),
    description: t('blogPage.description'),
  };
}

const postImages = [
  'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=600&auto=format&fit=crop',
];

const postIndices = [0, 1, 2, 3] as const;

export default async function BlogPage() {
  const t = await getTranslations('pages.blog');

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <div className="bg-primary text-white py-16 sm:py-24 pt-32 sm:pt-36">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4">{t('title')}</h1>
          <p className="text-lg text-white/80 font-light">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {postIndices.map((i) => {
            const postTitle = t(`posts.${i}.title`);
            return (
              <article key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={postImages[i]}
                    alt={postTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-text-light mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {t(`posts.${i}.date`)}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {t(`posts.${i}.readTime`)}</span>
                  </div>
                  <h2 className="font-serif text-xl text-text-main mb-2 group-hover:text-primary transition-colors">
                    {postTitle}
                  </h2>
                  <p className="text-text-light text-sm leading-relaxed mb-4">{t(`posts.${i}.excerpt`)}</p>
                  <span className="text-primary font-bold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    {t('readMore')} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
