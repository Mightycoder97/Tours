import { Shield, Users, MapPin, Award, Heart, Globe } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Nosotros',
  description: 'Conoce a Machu Picchu Travel Adventures. Más de 10 años creando experiencias inolvidables en Cusco y Machu Picchu.',
};

const stats = [
  { number: '10+', label: 'Años de experiencia' },
  { number: '500+', label: 'Viajeros satisfechos' },
  { number: '50+', label: 'Tours operados' },
  { number: '4.9', label: 'Calificación promedio' },
];

const values = [
  { icon: Shield, title: 'Seguridad', description: 'Tu bienestar es nuestra prioridad. Guías certificados en primeros auxilios y protocolos de emergencia.' },
  { icon: Heart, title: 'Pasión', description: 'Amamos lo que hacemos. Cada tour es diseñado con dedicación para crear momentos mágicos.' },
  { icon: Globe, title: 'Sostenibilidad', description: 'Comprometidos con el turismo responsable y el cuidado del patrimonio cultural y natural.' },
  { icon: Users, title: 'Comunidad', description: 'Trabajamos con comunidades locales para ofrecer experiencias auténticas y beneficiar a la región.' },
  { icon: Award, title: 'Excelencia', description: 'Nos esforzamos por superar expectativas en cada detalle de tu viaje.' },
  { icon: MapPin, title: 'Conocimiento Local', description: 'Nacidos y criados en Cusco, conocemos cada rincón de la tierra de los Incas.' },
];

export default function NosotrosPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-primary text-white py-16 sm:py-24 pt-32 sm:pt-36">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4">Sobre Nosotros</h1>
          <p className="text-lg text-white/80 font-light">
            Conectamos viajeros del mundo con la magia ancestral del Perú.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-main mb-6">Nuestra Historia</h2>
            <p className="text-text-light text-lg leading-relaxed">
              Fundada en Cusco hace más de una década, Machu Picchu Travel Adventures nació de la pasión 
              por compartir las maravillas del Perú con el mundo. Lo que comenzó como un pequeño emprendimiento 
              familiar se ha convertido en una de las operadoras turísticas más confiables de la región.
            </p>
            <p className="text-text-light text-lg leading-relaxed mt-4">
              Nuestro equipo está conformado por guías locales certificados que no solo conocen la historia 
              y geografía de cada sitio, sino que viven y respiran la cultura andina. Creemos que un buen 
              tour no es solo visitar lugares, es conectar con la esencia de una civilización milenaria.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-accent py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-text-light text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-main text-center mb-12">Nuestros Valores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value) => (
              <div key={value.title} className="text-center p-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-bold text-text-main mb-2">{value.title}</h3>
                <p className="text-text-light text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
