import { MapPin, Phone, Mail, Clock, MessageCircle, Compass, ChevronDown, HelpCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/contacto/ContactForm';
import AdvisorsSection from '@/components/contacto/AdvisorsSection';
import JsonLd from '@/components/seo/JsonLd';
import { Link } from '@/i18n/navigation';

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
    title: t('contactPage.title'),
    description: t('contactPage.description'),
  };
}

export default async function ContactoPage() {
  const t = await getTranslations('pages.contact');
  const tCommon = await getTranslations('common');
  
  const facebookUrl = 'https://www.facebook.com/MachupicchuTravelAdventure/';
  const instagramUrl = 'https://www.instagram.com/machupicchutraveladventure/';

  const faqs = [
    {
      q: "¿Cuáles son sus políticas de cancelación?",
      a: "Ofrecemos cancelación gratuita con reembolso completo hasta 48 horas antes de la fecha programada para la mayoría de nuestros tours de un solo día. Para Caminos Incas y paquetes de varios días que incluyen boletos de tren y hotel, se aplican políticas especiales debido a que las entradas del Ministerio de Cultura de Perú no son reembolsables."
    },
    {
      q: "¿Cómo gestiono un cambio de fecha en mi reserva?",
      a: "Para reprogramaciones de fecha, escríbenos directamente por WhatsApp a tu asesor de viajes o al correo de reservas con al menos 72 horas de anticipación. Haremos el cambio sin costo adicional sujeto a la disponibilidad del Ministerio de Cultura y los operadores de tren."
    },
    {
      q: "¿Qué métodos de pago son los más recomendados?",
      a: "Aceptamos tarjetas de crédito y débito a través de Izipay y Culqi, pagos por PayPal, y transferencias por Western Union o Moneygram. Recomendamos usar tarjeta para una confirmación instantánea o PayPal para transacciones internacionales seguras."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: t('title'),
        description: t('subtitle'),
        url: 'https://machupicchutravel.com/contacto',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+51-955-723-329',
          contactType: 'reservations',
          areaServed: 'PE',
          availableLanguage: ['Spanish', 'English']
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

      {/* Contact Section: Form + Linktree */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
            
            {/* Contact Form */}
            <div className="w-full lg:flex-1">
              <ContactForm />
            </div>

            {/* Linktree-like Access */}
            <div className="w-full lg:w-auto shrink-0 flex justify-center">
              <div className="bg-accent rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm max-w-sm w-full h-fit flex flex-col gap-4">
                <h3 className="font-serif text-xl font-bold text-primary-dark border-b border-gray-100 pb-2">{t('linktreeTitle')}</h3>
                
                <a 
                  href="https://wa.me/51955723329" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#25d366] hover:bg-[#20ba59] text-white py-3.5 px-4 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer border-none"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chatear por WhatsApp</span>
                </a>
                
                <Link 
                  href="/tours" 
                  className="bg-primary hover:bg-primary-dark text-white py-3.5 px-4 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  <Compass className="w-5 h-5" />
                  <span>{t('linktreeTours')}</span>
                </Link>
                
                <a 
                  href="#map" 
                  className="bg-white border border-gray-200 hover:border-primary text-text-main py-3.5 px-4 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{t('linktreeLocation')}</span>
                </a>
                
                <div className="border-t border-gray-200 pt-4 mt-2">
                  <p className="text-center font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">{t('linktreeSocial')}</p>
                  <div className="flex justify-center gap-3">
                    <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-text-light" aria-label="Facebook">
                      <FacebookIcon className="w-4.5 h-4.5" />
                    </a>
                    <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-text-light" aria-label="Instagram">
                      <InstagramIcon className="w-4.5 h-4.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Nuestros Asesores */}
      <section className="py-16 lg:py-24 bg-white border-t border-gray-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <AdvisorsSection />
        </div>
      </section>

      {/* Cusco Location Map */}
      <section id="map" className="py-16 lg:py-24 bg-accent/30 border-y border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="text-center mb-10">
            <span className="text-primary text-xs font-bold uppercase tracking-wider block mb-2">{t('locationTitle')}</span>
            <h2 className="text-3xl md:text-4xl font-serif text-text-main font-bold mb-3">{t('locationSubtitle')}</h2>
            <p className="text-text-light text-sm max-w-lg mx-auto font-light">{t('bookingPromise')}</p>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-200 h-[380px] sm:h-[450px] relative w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3879.791557342938!2d-71.97905152396155!3d-13.51772658685165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x916e7f22ecb822bb%3A0x8673a5a40a5a31a!2sAv.%20El%20Sol%2C%20Cusco%2008002!5e0!3m2!1ses-419!2spe!4v1717900000000!5m2!1ses-419!2spe"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Cusco Office Location Map"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto text-center">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
              <MapPin className="w-6 h-6 text-primary mb-2" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-text-light mb-1">Dirección</h4>
              <p className="text-text-main text-xs sm:text-sm font-semibold">Av. El Sol 123, Cusco, Perú</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
              <Phone className="w-6 h-6 text-primary mb-2" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-text-light mb-1">WhatsApp Principal</h4>
              <p className="text-text-main text-xs sm:text-sm font-semibold">+51 955 723 329</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
              <Mail className="w-6 h-6 text-primary mb-2" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-text-light mb-1">Consultas</h4>
              <p className="text-text-main text-xs sm:text-sm font-semibold break-all">reservasmtaperu@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs on Contact Page */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="text-center mb-12">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-serif text-text-main mb-2">Preguntas Frecuentes de Reserva</h2>
            <p className="text-text-light text-sm">Resuelve tus dudas sobre pagos, políticas y cambios antes de chatear.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group border border-gray-100 rounded-2xl bg-white shadow-sm p-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                  <span className="font-bold text-text-main text-sm sm:text-base pr-4">{faq.q}</span>
                  <span className="text-text-light group-open:rotate-180 transition-transform shrink-0">
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </summary>
                <div className="mt-3 pt-3 border-t border-gray-50 text-xs sm:text-sm text-text-light leading-relaxed font-light">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
