import { MapPin, Clock, Mountain, Train } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rutas a Machu Picchu',
  description: 'Conoce todas las rutas disponibles para llegar a Machu Picchu. Tren, caminata y opciones combinadas.',
};

const routes = [
  {
    title: 'Tren desde Ollantaytambo',
    description: 'La ruta más popular y cómoda. Un viaje escénico de 1.5 horas a través del Valle Sagrado hasta Aguas Calientes.',
    duration: '1.5 horas',
    difficulty: 'Fácil',
    icon: Train,
    highlights: ['Paisajes espectaculares', 'Servicio a bordo', 'Ideal para familias'],
  },
  {
    title: 'Tren desde Poroy (Cusco)',
    description: 'Parte directamente desde la estación de Poroy, cerca de Cusco. Viaje completo de 3.5 horas con vistas increíbles.',
    duration: '3.5 horas',
    difficulty: 'Fácil',
    icon: Train,
    highlights: ['Sale desde Cusco', 'Sin traslados', 'Vistas panorámicas'],
  },
  {
    title: 'Camino Inca Clásico',
    description: 'La caminata más famosa de Sudamérica. 4 días a través de paisajes andinos y ruinas incas hasta la Puerta del Sol.',
    duration: '4 días / 3 noches',
    difficulty: 'Moderada-Alta',
    icon: Mountain,
    highlights: ['Experiencia épica', 'Entrada por Puerta del Sol', 'Campamentos'],
  },
  {
    title: 'Salkantay Trek',
    description: 'Alternativa espectacular al Camino Inca. Cruza el paso del nevado Salkantay a 4,630m de altitud.',
    duration: '5 días / 4 noches',
    difficulty: 'Alta',
    icon: Mountain,
    highlights: ['Glaciares', 'Diversidad climática', 'Sin límite de permisos'],
  },
];

export default function RutasPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <div className="bg-primary text-white py-16 sm:py-24 pt-32 sm:pt-36">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4">Rutas a Machu Picchu</h1>
          <p className="text-lg text-white/80 font-light">
            Descubre las diferentes formas de llegar a la maravilla del mundo.
          </p>
        </div>
      </div>

      {/* Routes */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {routes.map((route) => (
            <div key={route.title} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <route.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="font-serif text-2xl font-bold text-text-main mb-2">{route.title}</h2>
                  <p className="text-text-light mb-4 leading-relaxed">{route.description}</p>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <span className="flex items-center gap-1.5 text-sm text-text-light">
                      <Clock className="w-4 h-4 text-primary" /> {route.duration}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-text-light">
                      <MapPin className="w-4 h-4 text-primary" /> Dificultad: {route.difficulty}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {route.highlights.map((h) => (
                      <span key={h} className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">{h}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/tours" className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary-light transition-colors inline-flex items-center gap-2">
            Ver Tours Disponibles
          </Link>
        </div>
      </div>
    </div>
  );
}
