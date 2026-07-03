import Hero from '@/components/home/Hero';
import FeaturedTours from '@/components/home/FeaturedTours';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import CTASection from '@/components/home/CTASection';
import SEOBlock from '@/components/home/SEOBlock';
import JsonLd from '@/components/seo/JsonLd';
import DestinationsSection from '@/components/home/DestinationsSection';
import { getTranslations } from 'next-intl/server';


export const revalidate = 60;

export default async function Home() {
  const tFaq = await getTranslations('home.faq');
  const tCommon = await getTranslations('common');

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'TravelAgency',
        name: 'Machu Picchu Travel Adventures',
        description: tCommon('jsonLdDescription'),
        url: 'https://machupicchutravel.com',
        telephone: '+51955723329',
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
            name: tFaq('items.0.question'),
            acceptedAnswer: {
              '@type': 'Answer',
              text: tFaq('items.0.answer')
            }
          },
          {
            '@type': 'Question',
            name: tFaq('items.1.question'),
            acceptedAnswer: {
              '@type': 'Answer',
              text: tFaq('items.1.answer')
            }
          },
          {
            '@type': 'Question',
            name: tFaq('items.2.question'),
            acceptedAnswer: {
              '@type': 'Answer',
              text: tFaq('items.2.answer')
            }
          },
          {
            '@type': 'Question',
            name: tFaq('items.4.question'),
            acceptedAnswer: {
              '@type': 'Answer',
              text: tFaq('items.4.answer')
            }
          },
        ]
      }} />
      <Hero />
      <div className="h-40 sm:h-28 md:h-32"></div>
      
      {/* Tours Destacados */}
      <FeaturedTours />

      {/* Destinos */}
      <DestinationsSection />

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
