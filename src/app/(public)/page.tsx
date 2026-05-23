import Hero from '@/components/home/Hero';
import FeaturedTours from '@/components/home/FeaturedTours';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import CTASection from '@/components/home/CTASection';
import SEOBlock from '@/components/home/SEOBlock';
import JsonLd from '@/components/seo/JsonLd';

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'TravelAgency',
        name: 'Machu Picchu Travel Adventures',
        description: 'Tours guiados a Machu Picchu, Valle Sagrado y Cusco. Experiencias auténticas con guías locales expertos.',
        url: 'https://machupicchutravel.com',
        telephone: '+51987654321',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Cusco',
          addressCountry: 'PE',
        },
        priceRange: '$$',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '523',
          bestRating: '5',
        },
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: '¿Cuánto tiempo antes debo reservar mi tour a Machu Picchu?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Recomendamos reservar con al menos 2 semanas de anticipación, especialmente en temporada alta (junio-agosto).'
            }
          },
          {
            '@type': 'Question',
            name: '¿Qué incluye el precio del tour?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Nuestros tours incluyen transporte, entrada a sitios arqueológicos, guía profesional bilingüe, y almuerzo buffet.'
            }
          },
          {
            '@type': 'Question',
            name: '¿Es seguro viajar a Machu Picchu?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sí, es completamente seguro. Cusco y Machu Picchu son destinos turísticos muy bien organizados.'
            }
          },
          {
            '@type': 'Question',
            name: '¿Puedo cancelar o reprogramar mi reserva?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sí, ofrecemos cancelación gratuita hasta 48 horas antes del tour.'
            }
          },
        ]
      }} />
      <Hero />
      <div className="h-40 sm:h-28 md:h-32"></div>
      
      {/* Tours Destacados */}
      <FeaturedTours />

      {/* SEO Content Block */}
      <SEOBlock />

      {/* Por qué elegirnos */}
      <WhyChooseUs />

      {/* Testimonios */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* CTA Section */}
      <CTASection />
    </>
  );
}
