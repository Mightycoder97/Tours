import { Shield, CreditCard, Package, Star, RefreshCw, Headphones } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

const featureIcons = [Shield, CreditCard, Package, Star, RefreshCw, Headphones];
const featureKeys = [
  'localExperience',
  'securePayments',
  'allInclusive',
  'happyTravelers',
  'flexibleCancellation',
  'support',
] as const;

export default async function WhyChooseUs() {
  const t = await getTranslations('home.whyUs');

  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-text-main mb-4">
            {t('title')}
          </h2>
          <p className="text-text-light text-lg font-light">
            {t('subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureKeys.map((key, index) => {
            const Icon = featureIcons[index];
            return (
              <div
                key={key}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-serif text-xl text-text-main mb-3">{t(`features.${key}.title`)}</h3>
                <p className="text-text-light text-sm leading-relaxed">{t(`features.${key}.description`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
