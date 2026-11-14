import Hero from '@/components/home/Hero';
import FeaturedTours from '@/components/home/FeaturedTours';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import CTASection from '@/components/home/CTASection';
import SEOBlock from '@/components/home/SEOBlock';
import PromotionsSlider from '@/components/home/PromotionsSlider';
import JsonLd from '@/components/seo/JsonLd';
import { getTranslations } from 'next-intl/server';
import { getBrandConfig } from '@/lib/brand';
import { createClient } from '@/lib/supabase/server';
import { parseHeroSlidesJson, getFallbackHeroSlides, HeroSlide } from '@/lib/visual-assets';

import type { Metadata } from 'next';
import { buildPageAlternates } from '@/lib/seo';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: buildPageAlternates(locale, ''),
  };
}

export default async function Home() {
  const tFaq = await getTranslations('home.faq');
  const tCommon = await getTranslations('common');
  const brand = getBrandConfig();
  const sameAsProfiles = [
    brand.social.facebook,
    brand.social.instagram,
    brand.social.tiktok,
    brand.social.tripadvisor,
  ].filter(Boolean);

  // Dynamically query hero slider banners configured in CMS for this brand
  const supabase = await createClient();
  const { data: heroSetting } = await supabase
    .from('site_settings')
    .select('value')
    .eq('tenant', brand.id)
    .eq('key', 'home_hero_slides')
    .maybeSingle();

  let heroSlides: HeroSlide[] = getFallbackHeroSlides(brand.id);
  if (heroSetting?.value) {
    try {
      const parsed = parseHeroSlidesJson(heroSetting.value);
      if (parsed.length > 0) {
        heroSlides = parsed;
      }
    } catch (e) {
      console.error('Error parsing hero slides for brand:', brand.id, e);
    }
  }

  return (
    <main>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'TravelAgency',
        name: brand.name,
        legalName: brand.legalName,
        taxID: brand.ruc,
        description: tCommon('jsonLdDescription'),
        url: brand.domain,
        telephone: `+${brand.contact.cleanPhone}`,
        email: brand.contact.email,
        logo: `${brand.domain}${brand.logo.lightBgSrc}`,
        image: `${brand.domain}${brand.logo.ogImageSrc}`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: brand.contact.address,
          addressLocality: 'Cusco',
          addressRegion: 'Cusco',
          addressCountry: 'PE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -13.5167,
          longitude: -71.9789,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '06:00',
            closes: '22:00',
          },
        ],
        priceRange: '$$',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '523',
          bestRating: '5',
        },
        sameAs: sameAsProfiles,
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [0, 1, 2, 3, 4, 5, 6].map((i) => ({
          '@type': 'Question',
          name: tFaq(`items.${i}.question`),
          acceptedAnswer: {
            '@type': 'Answer',
            text: tFaq(`items.${i}.answer`),
          },
        })),
      }} />
      <Hero slides={heroSlides} />
      <div className="h-6 sm:h-8 xl:h-36"></div>

      {/* SEO Content Block */}
      <SEOBlock />
      
      {/* Tours Destacados */}
      <FeaturedTours />

      {/* Promotions Slider / Ahorra en tu viaje */}
      <PromotionsSlider />

      {/* Testimonios */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
