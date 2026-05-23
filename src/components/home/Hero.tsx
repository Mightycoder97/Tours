'use client';

import BookingWidget from '@/components/home/BookingWidget';
import HeroSlider from '@/components/home/HeroSlider';

export default function Hero() {
  return (
    <section className="relative h-[80vh] sm:h-[85vh] md:h-[90vh] min-h-[480px] sm:min-h-[520px] md:min-h-[600px] w-full mt-[-80px]">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Floating Booking Widget */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-4 z-20">
        <BookingWidget />
      </div>
    </section>
  );
}
