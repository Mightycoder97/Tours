'use client';

import BookingWidget from '@/components/home/BookingWidget';

export default function Hero() {
  return (
    <section className="relative h-[80vh] sm:h-[85vh] md:h-[90vh] min-h-[480px] sm:min-h-[520px] md:min-h-[600px] w-full mt-[-80px]">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2600&auto=format&fit=crop")' }}
      ></div>
      
      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent"></div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif text-white font-bold mb-4 sm:mb-6 tracking-wide drop-shadow-lg leading-tight">
          Vive un viaje <br/><span className="italic font-normal">legendario</span> en tren
        </h1>
        <p className="text-base sm:text-lg md:text-2xl text-white/90 font-light max-w-2xl drop-shadow-md px-4">
          Hacia las maravillas de Cusco y la mítica ciudadela de Machu Picchu.
        </p>
      </div>

      {/* Floating Booking Widget */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-4">
        <BookingWidget />
      </div>
    </section>
  );
}
