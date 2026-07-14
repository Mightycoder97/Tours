'use client';

import BookingWidget from '@/components/home/BookingWidget';
import HeroSlider from '@/components/home/HeroSlider';

export default function Hero() {
  return (
    <section className="relative xl:h-[90vh] xl:min-h-[750px] w-full mt-[-80px] flex flex-col">
      {/* Hero Slider */}
      <div className="relative h-[65vh] sm:h-[75vh] md:h-[80vh] xl:h-full xl:min-h-[750px] w-full">
        <HeroSlider />
      </div>

      {/* Floating Booking Widget */}
      <div className="relative xl:absolute xl:bottom-0 xl:left-0 xl:right-0 xl:transform xl:translate-y-1/2 px-4 z-20 xl:mt-0">
        <BookingWidget />
      </div>
    </section>
  );
}
