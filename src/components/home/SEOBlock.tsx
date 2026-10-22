import { getTranslations } from 'next-intl/server';

export default async function SEOBlock() {
  const t = await getTranslations('home.seo');

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
        <h2 className="text-2xl md:text-3xl font-serif text-text-main mb-6">
          {t('title')}
        </h2>
        <p className="text-text-light text-base md:text-lg leading-relaxed font-light">
          {t('content')}
        </p>
      </div>
    </section>
  );
}
