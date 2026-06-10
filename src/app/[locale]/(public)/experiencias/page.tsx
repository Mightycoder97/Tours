import { MessageCircle, ShieldCheck, CheckCircle2, Star, Landmark, BadgePercent } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PassengerGallery from '@/components/experiencias/PassengerGallery';
import AdvisorContact from '@/components/experiencias/AdvisorContact';
import JsonLd from '@/components/seo/JsonLd';

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
    </svg>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta');
  return {
    title: t('experiencesPage.title'),
    description: t('experiencesPage.description'),
  };
}

// SVG TripAdvisor Owl Logo
function TripAdvisorLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3.167c-1.897 0-3.57 1.1-4.373 2.736a5.163 5.163 0 0 1 8.746 0c-.803-1.637-2.476-2.736-4.373-2.736zM3.46 11.233a3.543 3.543 0 0 1 3.54-3.543c1.954 0 3.54 1.587 3.54 3.543 0 1.954-1.586 3.54-3.54 3.54a3.543 3.543 0 0 1-3.54-3.54zm3.54 1.706a1.706 1.706 0 1 0 0-3.412 1.706 1.706 0 0 0 0 3.412zm6.98-1.706c0-1.956 1.586-3.543 3.54-3.543a3.543 3.543 0 0 1 3.54 3.543c0 1.954-1.586 3.54-3.54 3.54-1.954 0-3.54-1.586-3.54-3.54zm3.54 1.706a1.706 1.706 0 1 0 0-3.412 1.706 1.706 0 0 0 0 3.412zM12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.153 18.067c-.23.23-.46.368-.69.46a7.354 7.354 0 0 1-2.906.574c-1.334 0-2.436-.345-3.328-1.012-.892.667-1.994 1.012-3.328 1.012a7.354 7.354 0 0 1-2.906-.574c-.23-.092-.46-.23-.69-.46-.368-.368-.368-.782 0-1.15a13.344 13.344 0 0 1 2.392-1.932 5.23 5.23 0 0 1-.368-1.886c0-2.898 2.346-5.244 5.244-5.244s5.244 2.346 5.244 5.244c0 .667-.115 1.31-.368 1.886a13.344 13.344 0 0 1 2.392 1.932c.368.368.368.782 0 1.15z" />
    </svg>
  );
}

export default async function ExperienciasPage() {
  const t = await getTranslations('pages.experiences');
  const tTestimonials = await getTranslations('home.testimonials');
  
  const whatsappUrl = 'https://wa.me/51955723329';
  const facebookUrl = 'https://www.facebook.com/MachupicchuTravelAdventure/';
  const instagramUrl = 'https://www.instagram.com/machupicchutraveladventure/';
  const RUC = '20564458385';

  const benefitsKeys = ['allInOne', 'support', 'flexibility', 'directOperator'] as const;
  const benefitIcons = {
    allInOne: BadgePercent,
    support: MessageCircle,
    flexibility: CheckCircle2,
    directOperator: Landmark,
  };

  return (
    <div className="bg-white min-h-screen">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ItemPage',
        name: t('title'),
        description: t('subtitle'),
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://machupicchutravel.com'
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: t('title'),
              item: 'https://machupicchutravel.com/experiencias'
            }
          ]
        }
      }} />

      {/* Hero */}
      <div className="bg-primary text-white py-16 sm:py-24 pt-32 sm:pt-36">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4">{t('title')}</h1>
          <p className="text-lg text-white/80 font-light max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Passenger Gallery & Why Us Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-primary text-xs font-bold uppercase tracking-wider block mb-2">{t('whyUsTitle')}</span>
            <h2 className="text-3xl md:text-4xl font-serif text-text-main max-w-2xl mx-auto mb-4 leading-tight">
              Compartiendo la felicidad de viajar por el Perú antiguo
            </h2>
            <p className="text-text-light text-base max-w-3xl mx-auto leading-relaxed font-light">
              {t('whyUsText')}
            </p>
          </div>

          <PassengerGallery />
        </div>
      </section>

      {/* Social Media Links Section */}
      <section className="py-12 bg-accent/40 border-y border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h3 className="text-center font-bold text-xs uppercase tracking-wider text-gray-400 mb-8">
            Conéctate con nuestra comunidad digital
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            
            <a href="https://www.tripadvisor.com" target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-100 hover:border-[#00aa6c] p-5 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all group cursor-pointer">
              <TripAdvisorLogo className="w-8 h-8 text-[#00aa6c] mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-xs text-text-main uppercase tracking-wider">TripAdvisor</span>
              <span className="text-[10px] text-text-light mt-1">Ver Reseñas</span>
            </a>

            <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-100 hover:border-[#1877f2] p-5 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all group cursor-pointer">
              <FacebookIcon className="w-8 h-8 text-[#1877f2] mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-xs text-text-main uppercase tracking-wider">Facebook</span>
              <span className="text-[10px] text-text-light mt-1">Seguir Página</span>
            </a>

            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-100 hover:border-[#e1306c] p-5 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all group group-hover:scale-110 cursor-pointer">
              <InstagramIcon className="w-8 h-8 text-[#e1306c] mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-xs text-text-main uppercase tracking-wider">Instagram</span>
              <span className="text-[10px] text-text-light mt-1">Ver Fotos</span>
            </a>

            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-100 hover:border-[#25d366] p-5 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all group cursor-pointer">
              <MessageCircle className="w-8 h-8 text-[#25d366] mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-xs text-text-main uppercase tracking-wider">WhatsApp</span>
              <span className="text-[10px] text-text-light mt-1">Chat Directo</span>
            </a>

            <a href="/nosotros" className="bg-white border border-gray-100 hover:border-primary col-span-2 sm:col-span-1 p-5 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all group cursor-pointer">
              <ShieldCheck className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-xs text-text-main uppercase tracking-wider">Licencias</span>
              <span className="text-[10px] text-text-light mt-1">RUC: {RUC}</span>
            </a>

          </div>
        </div>
      </section>

      {/* TripAdvisor Reviews Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
            <div>
              <span className="text-primary text-xs font-bold uppercase tracking-wider block mb-2">{t('reviewsTitle')}</span>
              <h2 className="text-3xl md:text-4xl font-serif text-text-main font-bold leading-tight">
                La voz de nuestros viajeros en TripAdvisor
              </h2>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0 bg-accent px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">Excelente 5.0 / 5</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="w-2.5 h-2.5 rounded-full bg-[#00aa6c] inline-block" />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="w-3.5 h-3.5 rounded-full bg-[#00aa6c] inline-block border border-white/20" />
                      ))}
                    </div>
                    <TripAdvisorLogo className="w-5 h-5 text-gray-300" />
                  </div>
                  <h4 className="font-serif text-base text-text-main mb-2 font-bold leading-snug">
                    "{tTestimonials(`items.${index}.title`)}"
                  </h4>
                  <p className="text-text-light text-xs sm:text-sm leading-relaxed mb-6 font-light">
                    {tTestimonials(`items.${index}.text`)}
                  </p>
                </div>
                
                <div className="border-t border-gray-50 pt-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    {tTestimonials(`items.${index}.name`).charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-text-main text-xs">{tTestimonials(`items.${index}.name`)}</p>
                    <p className="text-text-light text-[10px] uppercase tracking-wider">{tTestimonials(`items.${index}.country`)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Buy Everything With Us Section */}
      <section className="py-16 lg:py-24 bg-accent/40 border-y border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-serif text-text-main text-center mb-12 font-bold">
            {t('whyBuyTitle')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefitsKeys.map((key) => {
              const Icon = benefitIcons[key];
              return (
                <div key={key} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex gap-4 items-start hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-text-main font-bold mb-2 leading-snug">
                      {t(`benefits.${key}.title`)}
                    </h3>
                    <p className="text-text-light text-xs sm:text-sm leading-relaxed font-light">
                      {t(`benefits.${key}.description`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <AdvisorContact />
        </div>
      </section>

    </div>
  );
}
