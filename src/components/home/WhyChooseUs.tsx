import { Shield, CreditCard, Package, Star, RefreshCw, Headphones } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Experiencia Local Certificada',
    description: 'Más de 10 años operando tours en Cusco y Machu Picchu con guías certificados.',
  },
  {
    icon: CreditCard,
    title: 'Pagos 100% Seguros',
    description: 'Acepta tarjetas de crédito, débito y PayPal con encriptación SSL.',
  },
  {
    icon: Package,
    title: 'Todo Incluido',
    description: 'Entradas, transporte, guía profesional y alimentación en cada tour.',
  },
  {
    icon: Star,
    title: '+500 Viajeros Satisfechos',
    description: 'Calificación promedio de 4.9/5 estrellas en todas nuestras experiencias.',
  },
  {
    icon: RefreshCw,
    title: 'Cancelación Flexible',
    description: 'Cancela hasta 48 horas antes sin costo adicional.',
  },
  {
    icon: Headphones,
    title: 'Soporte 24/7',
    description: 'Asistencia en español e inglés antes, durante y después de tu viaje.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-accent py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-text-main mb-4">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-text-light text-lg font-light">
            Somos expertos en crear experiencias inolvidables en el corazón del Imperio Inca.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-serif text-xl font-bold text-text-main mb-3">{feature.title}</h3>
              <p className="text-text-light text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
