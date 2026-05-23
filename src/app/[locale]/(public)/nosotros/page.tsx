import { Shield, Users, MapPin, Award, Heart, Globe } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta');
  return {
    title: t('aboutPage.title'),
    description: t('aboutPage.description'),
  };
}

const valueIcons = {
  security: Shield,
  passion: Heart,
  sustainability: Globe,
  community: Users,
  excellence: Award,
  localKnowledge: MapPin,
} as const;

const statKeys = ['yearsExperience', 'happyTravelers', 'toursOperated', 'averageRating'] as const;
const statNumbers = ['10+', '500+', '50+', '4.9'];
const valueKeys = ['security', 'passion', 'sustainability', 'community', 'excellence', 'localKnowledge'] as const;

export default async function NosotrosPage() {
  const t = await getTranslations('pages.about');

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-primary text-white py-16 sm:py-24 pt-32 sm:pt-36">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4">{t('title')}</h1>
          <p className="text-lg text-white/80 font-light">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-text-main mb-6">{t('ourStory')}</h2>
            <p className="text-text-light text-lg leading-relaxed">
              {t('storyParagraph1')}
            </p>
            <p className="text-text-light text-lg leading-relaxed mt-4">
              {t('storyParagraph2')}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-accent py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statKeys.map((key, index) => (
              <div key={key} className="text-center">
                <div className="text-4xl md:text-5xl font-serif text-primary mb-2">{statNumbers[index]}</div>
                <div className="text-text-light text-sm font-medium">{t(`stats.${key}`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif text-text-main text-center mb-12">{t('ourValues')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {valueKeys.map((key) => {
              const Icon = valueIcons[key];
              return (
                <div key={key} className="text-center p-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl text-text-main mb-2">{t(`values.${key}.title`)}</h3>
                  <p className="text-text-light text-sm leading-relaxed">{t(`values.${key}.description`)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
