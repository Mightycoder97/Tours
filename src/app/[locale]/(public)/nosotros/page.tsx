import { Shield, Award, FileText, Globe, Users, Heart, Star, MapPin, Clock, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta');
  return {
    title: t('aboutPage.title'),
    description: t('aboutPage.description'),
    alternates: {
      canonical: 'https://machupicchutravel.com/es/nosotros',
      languages: {
        'es': 'https://machupicchutravel.com/es/nosotros',
        'en': 'https://machupicchutravel.com/en/nosotros',
        'x-default': 'https://machupicchutravel.com/es/nosotros',
      },
    },
  };
}

export default async function NosotrosPage() {
  const t = await getTranslations('pages.about');

  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. Hero Banner */}
      <div className="bg-primary-dark text-white py-20 sm:py-28 pt-32 sm:pt-36">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
          <span className="bg-white/15 text-xs font-bold uppercase tracking-wider py-1 px-3.5 rounded-full inline-block mb-4 border border-white/10">
            Agencia de Viajes Certificada
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4 leading-tight">
            Sobre Nosotros
          </h1>
          <p className="text-lg text-white/80 font-light max-w-2xl mx-auto">
            Conectamos viajeros del mundo con la magia ancestral del Perú.
          </p>
        </div>
      </div>

      {/* 2. Intro Section */}
      <section className="py-16 sm:py-20 max-w-4xl mx-auto px-4 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative w-20 h-20">
            <Image
              src="/imagenes/logo.png"
              alt="Logo Machu Picchu Travel Adventure"
              fill
              className="object-contain"
              sizes="80px"
              priority
            />
          </div>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-text-main mb-6 leading-snug">
          Vive experiencias únicas en los destinos más increíbles del Perú
        </h2>
        <p className="text-text-light text-base sm:text-lg leading-relaxed font-light">
          Descubre la magia del Perú con Machupicchu Travel Adventure. Recorre destinos inolvidables, sumérgete en su historia, cultura y paisajes extraordinarios con tours diseñados para brindarte una experiencia auténtica, segura y llena de momentos que recordarás para siempre.
        </p>
      </section>

      {/* 3. Valores Section (Con Fondo de Montaña de Colores) */}
      <section className="relative w-full overflow-hidden min-h-[500px] flex items-center py-20 px-4 sm:px-8">
        <Image
          src="/tours/cusco/palcoyo-montana-de-colores-alternativa/01.png"
          alt="Valores de la Empresa"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#036B66]/90" />
        
        <div className="relative z-10 container mx-auto lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Spacer */}
            <div className="hidden lg:block lg:col-span-4"></div>
            
            {/* Right Content */}
            <div className="lg:col-span-8 text-white">
              <h2 className="text-sm font-bold uppercase tracking-widest text-accent-light mb-2">Nuestros Valores</h2>
              <p className="text-white/95 text-base sm:text-lg leading-relaxed font-light mb-8 max-w-2xl border-b border-white/20 pb-6">
                Machu Picchu Travel Adventure opera con un conjunto de valores fundamentales que guían todos los aspectos de nuestro servicio, compromiso comunitario y esfuerzos de sostenibilidad.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <h3 className="font-serif text-xl mb-2 text-accent-light">Servicio Orientado al Cliente</h3>
                  <p className="text-white/80 text-sm leading-relaxed font-light">
                    Priorizamos la satisfacción de nuestros pasajeros, ofreciendo viajes de alta calidad, confortables y seguros que enriquecen la experiencia de viaje.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-2 text-accent-light">Apreciación Cultural</h3>
                  <p className="text-white/80 text-sm leading-relaxed font-light">
                    Integrando tradiciones andinas en nuestros servicios, celebramos y preservamos el rico patrimonio cultural de Cusco y del Perú.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-2 text-accent-light">Responsabilidad Ambiental</h3>
                  <p className="text-white/80 text-sm leading-relaxed font-light">
                    Comprometidos a minimizar nuestro impacto ambiental, implementamos prácticas ecológicas en todas nuestras operaciones.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-2 text-accent-light">Responsabilidad Social</h3>
                  <p className="text-white/80 text-sm leading-relaxed font-light">
                    Apoyamos activamente a las comunidades locales, proporcionando empleo y colaborando con artesanos del Valle Sagrado.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5. Compromiso de Sostenibilidad (Con Sello de Reforestación) */}
      <section className="py-16 bg-white border-b border-gray-150">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6">
              <span className="text-primary text-sm font-bold uppercase tracking-wider block mb-2">Sostenibilidad</span>
              <h2 className="text-3xl font-serif text-text-main mb-4">Nuestro Compromiso con la Reforestación</h2>
              <p className="text-text-light text-sm sm:text-base font-light leading-relaxed mb-4">
                En Machu Picchu Travel Adventure, estamos profundamente comprometidos con la conservación de los ecosistemas andinos. Por cada viajero que reserva con nosotros, destinamos un porcentaje de nuestros ingresos a proyectos de reforestación local en las cuencas de Cusco, plantando árboles nativos como el Queñua para restaurar bosques, proteger cuencas hídricas y conservar la biodiversidad autóctona.
              </p>
            </div>
            <div className="md:col-span-6 relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/imagenes/reforestation.png"
                alt="Proyecto de Reforestación Cusco"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 480px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Quiénes Somos Section */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Team image */}
            <div className="lg:col-span-5 relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full rounded-2xl overflow-hidden shadow-md group">
              <Image
                src="/imagenes/hero-machupicchu.png"
                alt="Quiénes Somos Team"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-primary text-white font-bold text-xs uppercase tracking-wider py-2 px-4 rounded-xl shadow-md">
                Choice 2026
              </div>
            </div>

            {/* Quiénes somos Text */}
            <div className="lg:col-span-7">
              <span className="text-primary text-sm font-bold uppercase tracking-wider block mb-2">Quiénes Somos</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-text-main mb-6 leading-tight">
                Una agencia hecha con pasión por el Perú
              </h2>
              <p className="text-text-light text-base leading-relaxed font-light mb-4">
                Somos Machu Picchu Travel Adventure, una agencia de viajes y turismo comprometida en ofrecer experiencias inolvidables a nuestros clientes. Nuestro equipo de profesionales del turismo se dedica a proporcionar asesoramiento personalizado en cada etapa de su viaje, desde la planificación hasta la aventura.
              </p>
              <p className="text-text-light text-base leading-relaxed font-light">
                Nos esforzamos por brindar información precisa y un servicio de alta calidad que supere las expectativas de nuestros clientes. Nuestra amabilidad y atención al detalle nos distinguen, asegurando que cada viaje sea una experiencia memorable.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Certification Cards Panels */}
      <section className="py-16 sm:py-20 bg-gray-50 border-y border-gray-150">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="text-center mb-12 flex flex-col items-center">
            <div className="relative w-20 h-20 mb-3 opacity-80">
              <Image
                src="/imagenes/agency_seal.png"
                alt="Sello de Agencia Oficial Autorizada"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-text-main mb-3">
              Licencias y Permisos Oficiales
            </h2>
            <p className="text-text-light text-sm max-w-md mx-auto font-light">
              Operamos con todas las de la ley para garantizar una experiencia 100% segura y confiable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: RUC */}
            <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg text-text-main font-bold mb-4">Registro RUC</h3>
                <div className="text-sm text-text-light space-y-2 mb-4 font-light">
                  <p><span className="font-semibold text-text-main">Número de RUC:</span> 20564458385</p>
                  <p><span className="font-semibold text-text-main">Razón Social:</span> Machu Picchu Travel Adventure E.I.R.L.</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 border-t border-gray-50 pt-4 leading-relaxed">
                Registrado oficialmente en SUNAT de Perú. Estado: Activo / Habido.
              </p>
            </div>

            {/* Card 2: DIRCETUR */}
            <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg text-text-main font-bold mb-4">Dircetur Licencia</h3>
                <div className="text-sm text-text-light space-y-2 mb-4 font-light">
                  <p><span className="font-semibold text-text-main">Operador Turístico:</span> Reg. N° 1245-2026/GR-CUSCO</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 border-t border-gray-50 pt-4 leading-relaxed">
                Licencia otorgada por la Dirección Regional de Comercio Exterior y Turismo del Cusco.
              </p>
            </div>

            {/* Card 3: SERNANP */}
            <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg text-text-main font-bold mb-4">Permiso Sernanp</h3>
                <div className="text-sm text-text-light space-y-2 mb-4 font-light">
                  <p><span className="font-semibold text-text-main">Camino Inca:</span> Autorización N° 088-2026</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 border-t border-gray-50 pt-4 leading-relaxed">
                Permiso oficial de operación otorgado por el Servicio Nacional de Áreas Naturales Protegidas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Asociaciones de Turismo */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <h3 className="text-center font-bold text-xs uppercase tracking-widest text-gray-400 mb-8 sm:mb-10">
            Asociaciones en Perú
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => {
              const isJpeg = [3, 5, 7].includes(num);
              const ext = isJpeg ? 'jpeg' : 'png';
              return (
                <div key={num} className="relative h-12 w-28 grayscale opacity-55 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <Image
                    src={`/imagenes/logos/${num}.${ext}`}
                    alt={`Logo Asociación ${num}`}
                    fill
                    className="object-contain"
                    sizes="112px"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Opiniones Grid (TripAdvisor y Google) */}
      <section className="py-20 sm:py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-bold uppercase tracking-wider block mb-2">Opiniones</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-text-main mb-3">
              Lo que opinan nuestros viajeros
            </h2>
            <p className="text-text-light text-sm max-w-md mx-auto font-light">
              Las opiniones de nuestros viajeros hablan por nosotros. Descubre por qué somos parte de sus mejores recuerdos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left side: Rating cards */}
            <div className="lg:col-span-4 space-y-6">
              {/* TripAdvisor Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm text-center flex flex-col items-center">
                <span className="font-sans font-bold text-lg text-text-main mb-2">Tripadvisor</span>
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="w-4 h-4 rounded-full bg-green-500 inline-block"></span>
                  ))}
                </div>
                <div className="text-2xl font-bold text-text-main mb-1">Excelente 5.0</div>
                <p className="text-xs text-text-light font-light">Con base en 200 opiniones</p>
              </div>

              {/* Google Reviews Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm text-center flex flex-col items-center">
                <span className="font-sans font-bold text-lg text-text-main mb-2">Google Reviews</span>
                <div className="flex gap-1 mb-2 text-yellow-500">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4.5 h-4.5 fill-current" />
                  ))}
                </div>
                <div className="text-2xl font-bold text-text-main mb-1">Excelente 5.0</div>
                <p className="text-xs text-text-light font-light">Con base en 12 reseñas</p>
              </div>
            </div>

            {/* Right side: Testimonials grid */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm font-light">
                <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-3">
                  <div>
                    <h4 className="font-bold text-sm text-text-main">Jenni T.</h4>
                    <span className="text-[10px] text-text-light">Noviembre, 2025</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span>
                    ))}
                  </div>
                </div>
                <p className="text-text-light text-xs sm:text-sm leading-relaxed">
                  Viajó a Perú con la agencia Machu Picchu Travel Adventure. Todo excelente, la atención al cliente, la puntualidad en los trenes y la gran guía turística. ¡10000% recomendado!
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm font-light">
                <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-3">
                  <div>
                    <h4 className="font-bold text-sm text-text-main">Yadira H.</h4>
                    <span className="text-[10px] text-text-light">Diciembre, 2025</span>
                  </div>
                  <div className="flex gap-0.5 text-yellow-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-text-light text-xs sm:text-sm leading-relaxed">
                  La mejor opción en cuanto a relación calidad-precio. Nos acompañaron en todo momento, aclarando dudas antes del viaje por WhatsApp y garantizando que todo saliera perfecto.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm font-light">
                <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-3">
                  <div>
                    <h4 className="font-bold text-sm text-text-main">Esteban C.</h4>
                    <span className="text-[10px] text-text-light">Febrero, 2026</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span>
                    ))}
                  </div>
                </div>
                <p className="text-text-light text-xs sm:text-sm leading-relaxed">
                  Realizamos la coordinación de todo el itinerario de forma bimodal y fue fantástico. Una gran amabilidad de parte de todo el equipo de soporte. Volveremos sin dudarlo.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm font-light">
                <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-3">
                  <div>
                    <h4 className="font-bold text-sm text-text-main">Carolina F.</h4>
                    <span className="text-[10px] text-text-light">Marzo, 2026</span>
                  </div>
                  <div className="flex gap-0.5 text-yellow-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-text-light text-xs sm:text-sm leading-relaxed">
                  El recorrido fue de ensueño. Nos encantó la paciencia del guía en Machu Picchu y las explicaciones históricas. Todo estuvo perfectamente coordinado y puntual.
                </p>
              </div>

            </div>

          </div>

          <div className="text-center mt-12">
            <Link href="/tours" className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold transition-all shadow-md inline-flex items-center gap-2">
              <span>Ver todos los tours</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
