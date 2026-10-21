import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

export default async function CTASection() {
  const t = await getTranslations('home.cta');

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="relative rounded-[36px] overflow-hidden py-16 lg:py-20 px-6 sm:px-12 shadow-[0_25px_60px_rgba(139,102,232,0.28)]">
          {/* Vibrant Violet (#8B66E8) to Deep Petrol (#213E4C) Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-secondary" />
          
          {/* Decorative glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/15 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-secondary/50 blur-3xl" />
          </div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-extrabold text-white mb-5 leading-tight tracking-tight">
              {t('title')}
            </h2>
            <p className="text-white/85 text-base sm:text-lg mb-9 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/tours" 
                className="bg-secondary text-white px-8 py-4 rounded-full font-extrabold text-base sm:text-lg hover:bg-white hover:text-secondary hover:shadow-xl transition-all inline-flex items-center gap-2.5 group shadow-lg"
              >
                {t('exploreTours')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contacto"
                className="bg-white/15 backdrop-blur-md border-2 border-white/35 text-white px-8 py-4 rounded-full font-extrabold text-base sm:text-lg hover:bg-white hover:text-primary transition-all inline-flex items-center gap-2.5"
              >
                <Mail className="w-5 h-5" />
                {t('contactUs')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

