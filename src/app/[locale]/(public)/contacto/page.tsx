import { MapPin, Mail, MessageCircle, Phone } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/contacto/ContactForm';
import AdvisorsSection from '@/components/contacto/AdvisorsSection';
import BookingSidebar from '@/components/tours/BookingSidebar';
import BookingWidget from '@/components/home/BookingWidget';
import JsonLd from '@/components/seo/JsonLd';
import { createClient } from '@/lib/supabase/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta');
  return {
    title: t('contactPage.title'),
    description: t('contactPage.description'),
  };
}

export default async function ContactoPage() {
  const t = await getTranslations('pages.contact');
  
  // Fetch default popular tour for the booking widget on the contact page
  const supabase = await createClient();
  const { data: defaultTour } = await supabase
    .from('tours')
    .select('*')
    .eq('slug', 'machu-picchu-full-day')
    .single();

  const activeTour = defaultTour || {
    id: 'mock-id',
    title: 'Machu Picchu Full Day',
    slug: 'machu-picchu-full-day',
    price_adult: 299.00,
    price_child: 209.00,
    image_url: '/imagenes/hero-machupicchu.png'
  };

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

      {/* 1. Hero Banner */}
      <div className="bg-primary text-white py-16 sm:py-24 pt-32 sm:pt-36">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
          <h1 className="text-4xl sm:text-5xl font-serif mb-4">Contáctanos</h1>
          <p className="text-lg text-white/80 font-light max-w-2xl mx-auto">
            Estamos aquí para ayudarte a planificar tu próxima aventura inolvidable.
          </p>
        </div>
      </div>

      {/* 2. Main Section: Contact Form + Booking Sidebar (Two-Column on Desktop) */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif text-text-main mb-3">Encuentra la aventura ideal para ti</h2>
            <p className="text-text-light text-sm font-light max-w-md mx-auto">
              Envíanos un mensaje para coordinar directamente o utiliza el cotizador rápido a la derecha.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start justify-center">
            
            {/* Left: Contact Form */}
            <div className="lg:col-span-7 w-full">
              <ContactForm />
            </div>

            {/* Right: Booking Sidebar (Simulate Reservation) */}
            <div className="lg:col-span-5 w-full sticky top-24">
              <BookingSidebar 
                tourId={activeTour.id}
                tourName={activeTour.title}
                tourSlug={activeTour.slug}
                priceAdult={activeTour.price_adult}
                priceChild={activeTour.price_child ?? undefined}
                imageUrl={activeTour.image_url}
                autoOpen={false}
              />
            </div>

          </div>
        </div>
      </section>

      {/* 3. Google Maps Office & Detail Cards */}
      <section id="map" className="py-16 lg:py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="text-center mb-10">
            <span className="text-primary text-xs font-bold uppercase tracking-wider block mb-2">Ubicación en Cusco</span>
            <h2 className="text-3xl md:text-4xl font-serif text-text-main font-bold mb-3">Visítanos en nuestra oficina principal en la ciudad imperial.</h2>
            <p className="text-text-light text-sm max-w-lg mx-auto font-light">Reserva tu Viaje con nosotros y haz de este una experiencia única.</p>
          </div>

          {/* Iframe Google Map */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200 h-[380px] sm:h-[450px] relative w-full">
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
          
          {/* Detail Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto text-center">
            <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col items-center">
              <MapPin className="w-6 h-6 text-primary mb-2 animate-bounce" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-text-light mb-1">Dirección</h4>
              <p className="text-text-main text-xs sm:text-sm font-semibold">Av. El Sol 123, Cusco, Perú</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col items-center">
              <MessageCircle className="w-6 h-6 text-primary mb-2" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-text-light mb-1">WhatsApp Principal</h4>
              <p className="text-text-main text-xs sm:text-sm font-semibold">+51 955 723 329</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col items-center">
              <Mail className="w-6 h-6 text-primary mb-2" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-text-light mb-1">Consultas</h4>
              <p className="text-text-main text-xs sm:text-sm font-semibold break-all">reservasmtaperu@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Nuestros Asesores Section */}
      <section className="py-16 lg:py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-text-main mb-3">Nuestros Asesores</h2>
            <p className="text-text-light text-sm font-light max-w-md mx-auto">
              Cada gran aventura comienza con una decisión. Contáctanos y vive una experiencia inolvidable.
            </p>
          </div>
          <AdvisorsSection />
        </div>
      </section>

      {/* 5. Bottom Search/Booking Widget Overlay */}
      <section className="py-12 bg-gray-50 border-t border-gray-100 relative z-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <BookingWidget />
        </div>
      </section>

    </div>
  );
}
