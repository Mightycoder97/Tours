import Hero from '@/components/home/Hero';
import FeaturedTours from '@/components/home/FeaturedTours';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="h-40 sm:h-28 md:h-32"></div> {/* Spacing because of floating widget */}
      
      {/* Últimas Promociones & Tours Destacados */}
      <FeaturedTours />

      {/* Other sections like Destinations will follow */}
    </>
  );
}
