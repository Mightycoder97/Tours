import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const revalidate = 60;

export default async function FeaturedTours() {
  const { data: tours } = await supabase.from('tours').select('*').eq('is_active', true).limit(4);
  const displayTours = tours || [];

  let settingsMap: Record<string, string> = {};
  try {
    const { data: settings } = await supabase.from('site_settings').select('*');
    if (settings) {
      settings.forEach(s => settingsMap[s.key] = s.value);
    }
  } catch (e) {
    console.error('Settings table missing or error', e);
  }

  const heroTitleHtml = settingsMap['home_hero_title'] || 'Encuentra la aventura <br/><span class="text-accent italic">ideal para ti</span>';
  const heroSubtitle = settingsMap['home_hero_subtitle'] || 'Explora nuestros paquetes turísticos cuidadosamente diseñados para ofrecerte una experiencia inolvidable.';

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 
              className="text-3xl md:text-5xl font-serif text-primary font-bold mb-4 [&>span]:text-accent [&>span]:italic"
              dangerouslySetInnerHTML={{ __html: heroTitleHtml }} 
            />
            <p className="text-text-light text-lg font-light">
              {heroSubtitle}
            </p>
          </div>
          <Link 
            href="/tours" 
            className="mt-6 md:mt-0 group flex items-center text-primary font-semibold hover:text-primary-light transition-colors"
          >
            Ver todos los tours
            <span className="ml-2 w-8 h-8 rounded-full border border-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayTours.map((tour: any) => (
            <Link href={`/tours/${tour.slug}`} key={tour.id} className="group cursor-pointer">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col">
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  {/* Tag/Badge */}
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary tracking-wider">
                    {tour.tag}
                  </div>
                  
                  <Image 
                    src={tour.image_url} 
                    alt={tour.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-serif text-2xl font-bold leading-tight mb-2">
                      {tour.title}
                    </h3>
                    <div className="flex justify-between items-end mt-4">
                      <div className="text-white/80">
                        <span className="text-xs uppercase tracking-wider block mb-1">Desde</span>
                        <div className="font-bold text-xl text-accent">USD {tour.price_adult}</div>
                      </div>
                      <span className="text-white flex items-center hover:underline text-sm font-medium">
                        Descubre <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
