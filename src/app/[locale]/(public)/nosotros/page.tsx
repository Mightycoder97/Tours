import { Shield, Users, MapPin, Award, Heart, Globe, CheckCircle2, FileText, ArrowRight, MessageCircle, ChevronDown } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta');
  return {
    title: t('aboutPage.title'),
    description: t('aboutPage.description'),
    alternates: {
      canonical: 'https://machupicchutravel.com/es/nosotros',
      languages: {
        'es': 'https://machupicchutravel.com/es/nosotros',
        'en': 'https://machupicchutravel.com/en/nosotros',
        'x-default': 'https://machupicchutravel.com/es/nosotros',
      },
    },
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
  
  // Retrieve raw array of tips from translations
  let tips: string[] = [];
  try {
    tips = t.raw('bookingTips') as string[];
  } catch (e) {
    tips = [
      "Reserva tus boletos de ingreso a Machu Picchu con al menos 30 días de anticipación.",
      "Aclimátate en Cusco por 1 o 2 días antes de realizar caminatas de alta montaña.",
      "Asegúrate de que la agencia esté certificada y cuente con permisos oficiales.",
      "Lleva siempre tu pasaporte o documento de identidad físico original al tour."
    ];
  }

  const whatsappNumber = '51955723329';
  const whatsappMsg = encodeURIComponent('¡Hola! Me gustaría ponerme en contacto con un asesor para planificar mi viaje a Machu Picchu.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero */}
      <div className="bg-primary text-white py-16 sm:py-24 pt-32 sm:pt-36">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
          <span className="bg-white/15 text-xs font-bold uppercase tracking-wider py-1 px-3.5 rounded-full inline-block mb-3 border border-white/10">
            {t('selloBadge')}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4">{t('title')}</h1>
          <p className="text-lg text-white/80 font-light max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Story & Seal Badge Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story text */}
            <div className="lg:col-span-7">
              <h2 className="text-3xl md:text-4xl font-serif text-text-main mb-6">{t('ourStory')}</h2>
              <p className="text-text-light text-base leading-relaxed mb-4">
                {t('storyParagraph1')}
              </p>
              <p className="text-text-light text-base leading-relaxed">
                {t('storyParagraph2')}
              </p>
              
              <div className="mt-8">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#ff7a00] hover:bg-[#e06b00] text-white py-3.5 px-6 rounded-full font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t('ctaUs')}
                </a>
              </div>
            </div>

            {/* Official Certification Seal Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-accent rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm text-center max-w-sm w-full">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <Image
                    src="/imagenes/agency_seal.png"
                    alt={t('selloBadge')}
                    fill
                    sizes="192px"
                    className="object-contain"
                    priority
                  />
                </div>
                <h3 className="font-serif text-lg text-primary-dark font-bold mb-2">
                  {t('selloBadge')}
                </h3>
                <p className="text-xs text-text-light leading-relaxed">
                  Operador turístico formal con Registro Nacional de MINCETUR y DIRCETUR Cusco. Comprometidos con un servicio transparente y con total seguridad.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-accent py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statKeys.map((key, index) => (
              <div key={key} className="text-center">
                <div className="text-4xl md:text-5xl font-serif text-primary mb-2 font-bold">{statNumbers[index]}</div>
                <div className="text-text-light text-sm font-semibold uppercase tracking-wider">{t(`stats.${key}`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reforestation & Sustainability Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Reforestation Image */}
            <div className="lg:col-span-6 relative aspect-square w-full rounded-2xl overflow-hidden shadow-md border border-gray-100">
              <Image
                src="/imagenes/reforestation.png"
                alt={t('reforestationAlt')}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Reforestation Text */}
            <div className="lg:col-span-6">
              <span className="text-primary text-xs font-bold uppercase tracking-wider block mb-2">Turismo Responsable</span>
              <h2 className="text-3xl md:text-4xl font-serif text-text-main mb-6">
                {t('sustainabilityTitle')}
              </h2>
              <p className="text-text-light text-base leading-relaxed">
                {t('sustainabilityText')}
              </p>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="border-l-4 border-primary pl-4">
                  <div className="text-2xl font-bold font-serif text-primary">+10,000</div>
                  <div className="text-xs text-text-light">Árboles plantados en Cusco</div>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <div className="text-2xl font-bold font-serif text-primary">100%</div>
                  <div className="text-xs text-text-light">Compromiso con comunidades</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Booking Tips Grid */}
      <section className="py-16 lg:py-24 bg-accent/40">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-text-main mb-4">
              {t('bookingTipsTitle')}
            </h2>
            <p className="text-text-light text-sm max-w-xl mx-auto">
              Planifica tu viaje de manera inteligente y sácale el máximo provecho a tu aventura en Cusco y Machu Picchu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                  {idx + 1}
                </div>
                <p className="text-text-main text-sm sm:text-base leading-relaxed font-medium">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Licenses and Permits Accordion Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-text-main mb-3">
              {t('licensesTitle')}
            </h2>
            <p className="text-text-light text-sm">
              {t('licensesSubtitle')}
            </p>
          </div>

          <div className="space-y-4">
            {/* Accordion Item 1: RUC */}
            <details className="group border border-gray-100 rounded-2xl bg-white shadow-sm p-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="font-bold text-text-main text-sm sm:text-base">{t('rucLabel')}</span>
                </div>
                <span className="text-text-light group-open:rotate-180 transition-transform">
                  <ChevronDown className="w-5 h-5" />
                </span>
              </summary>
              <div className="mt-4 pt-4 border-t border-gray-50 text-sm text-text-light space-y-2">
                <p className="flex justify-between">
                  <span className="font-medium">Número de RUC:</span>
                  <span className="font-bold text-text-main">{t('rucVal')}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">{t('companyNameLabel')}:</span>
                  <span className="font-bold text-text-main">{t('companyNameVal')}</span>
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Registro oficial en la Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT) de Perú. Estado: Activo / Habido.
                </p>
              </div>
            </details>

            {/* Accordion Item 2: DIRCETUR */}
            <details className="group border border-gray-100 rounded-2xl bg-white shadow-sm p-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="font-bold text-text-main text-sm sm:text-base">{t('minceturLabel')}</span>
                </div>
                <span className="text-text-light group-open:rotate-180 transition-transform">
                  <ChevronDown className="w-5 h-5" />
                </span>
              </summary>
              <div className="mt-4 pt-4 border-t border-gray-50 text-sm text-text-light space-y-2">
                <p className="flex justify-between">
                  <span className="font-medium">Número de Registro:</span>
                  <span className="font-bold text-text-main">{t('minceturVal')}</span>
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Licencia otorgada por la Dirección Regional de Comercio Exterior y Turismo (DIRCETUR) de Cusco y avalada por el Ministerio de Comercio Exterior y Turismo (MINCETUR).
                </p>
              </div>
            </details>

            {/* Accordion Item 3: SERNANP */}
            <details className="group border border-gray-100 rounded-2xl bg-white shadow-sm p-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="font-bold text-text-main text-sm sm:text-base">{t('sernanpLabel')}</span>
                </div>
                <span className="text-text-light group-open:rotate-180 transition-transform">
                  <ChevronDown className="w-5 h-5" />
                </span>
              </summary>
              <div className="mt-4 pt-4 border-t border-gray-50 text-sm text-text-light space-y-2">
                <p className="flex justify-between">
                  <span className="font-medium">Autorización Camino Inca:</span>
                  <span className="font-bold text-text-main">{t('sernanpVal')}</span>
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Permiso oficial otorgado por el Servicio Nacional de Áreas Naturales Protegidas por el Estado (SERNANP) para la operación reglamentaria de tours en el Santuario Histórico de Machu Picchu.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-accent/30">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif text-text-main text-center mb-12">{t('ourValues')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {valueKeys.map((key) => {
              const Icon = valueIcons[key];
              return (
                <div key={key} className="text-center p-6 bg-white rounded-2xl border border-gray-50 shadow-sm">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl text-text-main mb-2 font-bold">{t(`values.${key}.title`)}</h3>
                  <p className="text-text-light text-sm leading-relaxed font-light">{t(`values.${key}.description`)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
    </div>
  );
}
