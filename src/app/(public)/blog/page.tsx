import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog de Viajes',
  description: 'Consejos, guías y relatos de viaje sobre Machu Picchu, Cusco y el Perú.',
};

const posts = [
  {
    title: '10 Consejos Esenciales para Visitar Machu Picchu',
    excerpt: 'Todo lo que necesitas saber antes de tu primera visita a la ciudadela inca. Desde aclimatación hasta qué llevar en la mochila.',
    date: '15 Mayo, 2026',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=600&auto=format&fit=crop',
    slug: '#',
  },
  {
    title: 'Valle Sagrado: La Joya Oculta de los Andes',
    excerpt: 'Descubre por qué el Valle Sagrado de los Incas es mucho más que un paso obligado hacia Machu Picchu.',
    date: '10 Mayo, 2026',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=600&auto=format&fit=crop',
    slug: '#',
  },
  {
    title: 'Guía Completa: Montaña de Colores (Vinicunca)',
    excerpt: 'Altitud, dificultad, mejor época y todo lo que necesitas para esta caminata única en el mundo.',
    date: '5 Mayo, 2026',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=600&auto=format&fit=crop',
    slug: '#',
  },
  {
    title: 'Gastronomía Cusqueña: Sabores que No Puedes Perderte',
    excerpt: 'Un recorrido por los platos típicos de Cusco que todo viajero debería probar durante su estadía.',
    date: '1 Mayo, 2026',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=600&auto=format&fit=crop',
    slug: '#',
  },
];

export default function BlogPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <div className="bg-primary text-white py-16 sm:py-24 pt-32 sm:pt-36">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4">Blog de Viajes</h1>
          <p className="text-lg text-white/80 font-light">
            Consejos, guías y relatos para inspirar tu próxima aventura.
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {posts.map((post) => (
            <article key={post.title} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-text-light mb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                </div>
                <h2 className="font-serif text-xl font-bold text-text-main mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-text-light text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <span className="text-primary font-bold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Leer más <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
