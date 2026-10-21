import { getTranslations } from 'next-intl/server';
import { ProtectedImage } from '@/components/ui/ProtectedImage';

export default async function SEOBlock() {
  const t = await getTranslations('home.seo');

  return (
    <section className="py-14 lg:py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="bg-gradient-to-br from-cream via-white to-cream/60 rounded-[32px] p-6 sm:p-10 lg:p-12 border border-primary/15 shadow-[0_12px_40px_rgba(139,102,232,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Side: Offset Dual Image Collage (Changed image positioning) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md h-[260px] sm:h-[300px]">
                {/* Main tilted photo */}
                <div className="absolute top-0 left-0 w-[68%] h-[85%] rounded-[24px] overflow-hidden shadow-xl border-4 border-white -rotate-3 hover:rotate-0 transition-transform duration-500 z-10">
                  <ProtectedImage
                    src="/tours/cusco/montana-de-colores-vinicunca/01.jpg"
                    alt="Montaña de 7 Colores"
                    fill
                    className="object-cover"
                    showCopyright={false}
                    unoptimized
                  />
                </div>
                {/* Secondary overlapping photo */}
                <div className="absolute bottom-0 right-0 w-[60%] h-[75%] rounded-[24px] overflow-hidden shadow-2xl border-4 border-white rotate-3 hover:rotate-0 transition-transform duration-500 z-20">
                  <ProtectedImage
                    src="/tours/cusco/laguna-humantay/02.jpg"
                    alt="Laguna Humantay"
                    fill
                    className="object-cover"
                    showCopyright={false}
                    unoptimized
                  />
                </div>
              </div>
            </div>

            {/* Right Side: Clean SEO Copy */}
            <div className="lg:col-span-7 text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold text-secondary mb-4 leading-tight tracking-tight">
                {t('title')}
              </h2>
              <p className="text-text-light text-sm sm:text-base lg:text-lg leading-relaxed">
                {t('content')}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

