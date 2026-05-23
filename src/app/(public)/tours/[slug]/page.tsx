import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, MapPin, Check, Info } from 'lucide-react';
import BookingSidebar from '@/components/tours/BookingSidebar';

import { supabase } from '@/lib/supabase';

const fetchTour = async (slug: string) => {
  const { data, error } = await supabase.from('tours').select('*').eq('slug', slug).single();
  
  if (error || !data) return null;

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    description: data.description,
    inclusions: data.inclusions || [],
    image: data.image_url,
    images: data.images || [],
    price: data.price_adult,
    priceChild: data.price_child ?? undefined,
    duration: data.duration
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const tour = await fetchTour(resolvedParams.slug);
  if (!tour) return { title: 'No encontrado' };
  
  return {
    title: `${tour.title} | Machu Picchu Travel`,
    description: tour.description.substring(0, 160),
    openGraph: {
      images: [tour.image],
    },
  };
}

export default async function TourDetail({ params }: { params: Promise<{ slug: string }>}) {
  const resolvedParams = await params;
  const tour = await fetchTour(resolvedParams.slug);
  
  if (!tour) return notFound();

  return (
    <div className="bg-background min-h-screen pt-20 sm:pt-24 pb-28 lg:pb-20">
      {/* Breadcrumb & Navigation */}
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <Link href="/tours" className="inline-flex items-center text-sm font-bold text-primary hover:text-accent transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver a Tours
        </Link>
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header Content */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center space-x-4 mb-4 text-sm font-bold text-text-light uppercase tracking-wider">
            <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> Cusco, Perú</span>
            <span className="flex items-center"><Clock className="w-4 h-4 mr-1 text-accent" /> {tour.duration}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-4 sm:mb-6 leading-tight">
            {tour.title}
          </h1>
        </div>

        {/* Dynamic Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
          
          {/* Main Content Column */}
          <div className="w-full lg:w-2/3">
            
            {/* Main Picture */}
            <div className="rounded-3xl overflow-hidden shadow-sm aspect-video w-full mb-8 relative">
              <Image src={tour.image} fill sizes="(max-width: 768px) 100vw, 66vw" className="object-cover" alt={tour.title} priority />
            </div>

            {/* Small Masonry Gallery */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12">
               {tour.images.map((img: string, idx: number) => (
                  <div key={idx} className="rounded-xl sm:rounded-2xl overflow-hidden aspect-square h-28 sm:h-36 md:h-48 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative">
                    <Image src={img} fill sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw" className="object-cover hover:scale-105 transition-transform duration-500" alt="Galeria de tour" />
                  </div>
               ))}
               <div className="rounded-xl sm:rounded-2xl overflow-hidden aspect-square h-28 sm:h-36 md:h-48 bg-gray-100 flex items-center justify-center font-bold text-primary hover:bg-gray-200 transition-colors shadow-sm cursor-pointer text-sm sm:text-base">
                  Ver Galería +12
               </div>
            </div>

            {/* Content Tabs mock (Descripción, Itinerario) */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-10 shadow-sm border border-gray-100">
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">Descripción del Tour</h2>
              <p className="text-lg text-text-light leading-relaxed mb-10">
                {tour.description}
              </p>

              <h3 className="font-serif text-2xl font-bold text-primary mb-6 flex items-center">
                 ¿Qué incluye este paquete?
              </h3>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {tour.inclusions.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start text-text-main">
                      <div className="w-6 h-6 rounded-full bg-green-100 text-primary flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-lg leading-snug">{item}</span>
                    </li>
                 ))}
              </ul>
            </div>
            
            {/* Additional Info / Policies */}
            <div className="mt-8 bg-[#F4F4F4] rounded-2xl p-6 md:p-10 text-text-light">
               <h3 className="font-bold text-text-main uppercase tracking-wider mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-primary" /> Información Importante
               </h3>
               <p className="text-sm">
                 Para reservar este tour es necesario confirmar con la mayor anticipación posible debido a la alta demanda de la ciudadela. No hay reembolsos por entradas ya emitidas por el Ministerio de Cultura.
               </p>
            </div>

          </div>

          {/* Sticky Booking Sidebar */}
          <div className="w-full lg:w-1/3">
             <BookingSidebar 
               tourId={tour.id}
               tourName={tour.title}
               tourSlug={tour.slug}
               priceAdult={tour.price}
               priceChild={tour.priceChild}
               imageUrl={tour.image}
             />
          </div>

        </div>
      </div>
    </div>
  );
}
