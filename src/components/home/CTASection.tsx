import { ArrowRight, Mail } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

export default async function CTASection() {
  const t = await getTranslations('home.cta');

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.1),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6 max-w-3xl mx-auto leading-tight">
          {t('title')}
        </h2>
        <p className="text-white/80 text-lg font-light max-w-2xl mx-auto mb-10">
          {t('subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/tours" 
            className="bg-white text-primary-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-cream hover:shadow-xl transition-all inline-flex items-center gap-2 group"
          >
            {t('exploreTours')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/tours"
            className="border-2 border-white/40 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all inline-flex items-center gap-2"
          >
            <Mail className="w-5 h-5" />
            {t('contactUs')}
          </Link>
        </div>
      </div>
    </section>
  );
}
