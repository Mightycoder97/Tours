import { MapPin, Clock, Mountain, Train } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta');
  return {
    title: t('routesPage.title'),
    description: t('routesPage.description'),
  };
}

const routeIcons = [Train, Train, Mountain, Mountain];
const routeIndices = [0, 1, 2, 3] as const;

export default async function RutasPage() {
  const t = await getTranslations('pages.routes');

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

      {/* Routes */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {routeIndices.map((i) => {
            const Icon = routeIcons[i];
            const highlights: string[] = t.raw(`items.${i}.highlights`);
            return (
              <div key={i} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-serif text-2xl text-text-main mb-2">{t(`items.${i}.title`)}</h2>
                    <p className="text-text-light mb-4 leading-relaxed">{t(`items.${i}.description`)}</p>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <span className="flex items-center gap-1.5 text-sm text-text-light">
                        <Clock className="w-4 h-4 text-primary" /> {t(`items.${i}.duration`)}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-text-light">
                        <MapPin className="w-4 h-4 text-primary" /> {t('difficultyLabel', { level: t(`items.${i}.difficulty`) })}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {highlights.map((h: string) => (
                        <span key={h} className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">{h}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/tours" className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary-light transition-colors inline-flex items-center gap-2">
            {t('viewAvailableTours')}
          </Link>
        </div>
      </div>
    </div>
  );
}
