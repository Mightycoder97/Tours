import { createClient } from '@/lib/supabase/server';
import { Link } from '@/i18n/navigation';
import { MapPin, ChevronRight } from 'lucide-react';

interface DestinationCard {
  id: string;
  name: string;
  slug: string;
  tour_count: number;
  cover_image: string;
}

const DESTINATION_COVERS: Record<string, string> = {
  lima:     '/tours/lima/machu-picchu-full-day/01.jpg', // fallback
  cusco:    '/tours/cusco/machu-picchu-full-day/01.jpg',
  arequipa: '/tours/arequipa/city-tour-arequipa-half-day/01.jpg',
  puno:     '/tours/puno/puno-full-day-uros-taquile/01.jpg',
};

// Specific cover images per destination (best photo)
const DEST_COVERS: Record<string, string> = {
  lima:     '/tours/lima/islas-palomino/01.jpg',
  cusco:    '/tours/cusco/machu-picchu-full-day/01.jpg',
  arequipa: '/tours/arequipa/city-tour-arequipa-half-day/01.jpg',
  puno:     '/tours/puno/puno-full-day-uros-taquile/01.jpg',
};

const DEST_DESCRIPTIONS: Record<string, string> = {
  lima:     'La capital gastronómica de Latinoamérica',
  cusco:    'La ciudad imperial de los Incas',
  arequipa: 'La Ciudad Blanca rodeada de volcanes',
  puno:     'El Lago Titicaca y culturas milenarias',
};

const DEST_COLORS: Record<string, string> = {
  lima:     'from-emerald-900/80 to-emerald-700/60',
  cusco:    'from-teal-900/80 to-teal-700/60',
  arequipa: 'from-orange-900/80 to-orange-700/60',
  puno:     'from-blue-900/80 to-blue-700/60',
};

export default async function DestinationsSection() {
  const supabase = await createClient();

  // Fetch destinations with tour counts
  const { data: destinations } = await supabase
    .from('destinations')
    .select('id, name, slug')
    .order('name');

  if (!destinations || destinations.length === 0) return null;

  // Count active tours per destination
  const { data: tourCounts } = await supabase
    .from('tours')
    .select('destination_id')
    .eq('is_active', true);

  const countMap: Record<string, number> = {};
  for (const tour of tourCounts || []) {
    if (tour.destination_id) {
      countMap[tour.destination_id] = (countMap[tour.destination_id] || 0) + 1;
    }
  }

  const destCards: DestinationCard[] = destinations.map(d => ({
    id: d.id,
    name: d.name,
    slug: d.slug,
    tour_count: countMap[d.id] || 0,
    cover_image: DEST_COVERS[d.slug] || DESTINATION_COVERS[d.slug] || '',
  }));

  return (
    <section className="py-16 sm:py-24 bg-white" aria-labelledby="destinations-heading">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">
            Nuestros Destinos
          </p>
          <h2 id="destinations-heading" className="font-serif text-4xl sm:text-5xl text-text-main mb-4">
            Explora el Perú
          </h2>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            Desde la magia de Cusco hasta las costas de Lima, descubre los destinos más increíbles del Perú con guías expertos locales.
          </p>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {destCards.map((dest) => (
            <Link
              key={dest.id}
              href={`/tours?destino=${dest.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] sm:aspect-[3/4] lg:aspect-[2/3] block shadow-md hover:shadow-2xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-primary-light"
              aria-label={`Ver tours en ${dest.name}`}
            >
              {/* Background image (CSS protected) */}
              <div
                className="absolute inset-0 photo-bg transition-transform duration-500 group-hover:scale-105 protected-gallery"
                style={{ backgroundImage: `url(${dest.cover_image})` }}
                role="img"
                aria-label={dest.name}
              />

              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${DEST_COLORS[dest.slug] || 'from-gray-900/80 to-gray-700/60'}`} />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="flex items-center gap-1 text-white/70 text-xs mb-2 font-sans">
                  <MapPin className="w-3 h-3" />
                  <span>Perú</span>
                </div>
                <h3 className="font-serif text-3xl mb-1 leading-tight group-hover:text-primary-light transition-colors">
                  {dest.name}
                </h3>
                <p className="text-white/80 text-sm font-sans mb-3 leading-snug">
                  {DEST_DESCRIPTIONS[dest.slug]}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs font-sans">
                    {dest.tour_count} {dest.tour_count === 1 ? 'tour' : 'tours'} disponibles
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-primary flex items-center justify-center transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors"
          >
            Ver todos nuestros tours
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
