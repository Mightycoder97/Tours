'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Search, Mic, Camera, Sparkles, AlertCircle } from 'lucide-react';
import { Link, useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

interface Tour {
  id: string;
  title: string;
  slug: string;
  image_url: string;
  price_adult: number;
  duration: string;
  tag?: string;
  rating?: number;
  reviews_count?: number;
}

interface BlogPageClientProps {
  tours: Tour[];
}

export default function BlogPageClient({ tours }: BlogPageClientProps) {
  const t = useTranslations('pages.blog');
  const tc = useTranslations('common');
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicketOption, setSelectedTicketOption] = useState<'yes' | 'no' | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const fadeImages = [
    '/imagenes/hero-machupicchu.png?v=2',
    '/imagenes/hero-machupicchu-1.png?v=2',
    '/imagenes/hero-camino-inca.png?v=2',
    '/imagenes/tren-machupicchu.png?v=2'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % fadeImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [fadeImages.length]);

  // Mapped local images for the 4 blog posts (to remove remote Unsplash images)
  const postImages = [
    '/imagenes/hero-machupicchu.png?v=2', // Post 0
    '/imagenes/tren-machupicchu.png?v=2', // Post 1
    '/tours/cusco/palcoyo-montana-de-colores-alternativa/01.png', // Post 2
    '/tours/cusco/pachamanca-full-day/01.png', // Post 3
  ];

  const postIndices = [0, 1, 2, 3] as const;

  // Filter posts locally based on search query
  const filteredPostIndices = useMemo(() => {
    return postIndices.filter((i) => {
      const title = t(`posts.${i}.title`).toLowerCase();
      const excerpt = t(`posts.${i}.excerpt`).toLowerCase();
      const query = searchQuery.toLowerCase();
      return title.includes(query) || excerpt.includes(query);
    });
  }, [searchQuery, t]);

  const handleTicketContinue = () => {
    if (!selectedTicketOption) return;
    
    const whatsappNumber = '51955723329';
    let message = '';
    if (selectedTicketOption === 'yes') {
      message = '¡Hola! Estoy leyendo el blog y necesito ayuda para reservar mi entrada a Machu Picchu junto con la experiencia completa.';
    } else {
      message = '¡Hola! Ya cuento con mi entrada a Machu Picchu, pero necesito reservar el servicio de tren y el guía turístico.';
    }

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* 1. Hero Banner */}
      <div className="bg-primary text-white py-16 sm:py-24 pt-32 sm:pt-36">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
          <h1 className="text-4xl sm:text-5xl font-serif mb-4">{t('title')}</h1>
          <p className="text-lg text-white/80 font-light">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* 2. Featured Aventura & Tours Carousel Section */}
      <section className="container mx-auto px-4 lg:px-8 py-16 max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-serif text-text-main mb-3">Encuentra la aventura ideal para ti</h2>
          <p className="text-text-light text-sm font-light max-w-md mx-auto">
            Explora nuestros paquetes turísticos cuidadosamente diseñados para ofrecerte una experiencia inolvidable.
          </p>
        </div>

        {/* Large Panoramic Banner */}
        <div className="relative w-full h-[220px] sm:h-[300px] md:h-[380px] overflow-hidden mb-12 shadow-sm">
          {fadeImages.map((img, idx) => (
            <div
              key={img}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                idx === activeImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <Image
                src={img}
                alt="Machu Picchu Travel Adventure Banner"
                fill
                className="object-cover scale-[1.08]"
                sizes="100vw"
                priority={idx === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/10 z-20" />
        </div>

        {/* Recommended Tours Horizontal Slider */}
        <div className="mb-6 flex justify-between items-center">
          <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Blog MachuPicchuTravel Adventure</h3>
          <Link href="/tours" className="text-xs font-bold text-primary hover:text-primary-dark uppercase tracking-wider flex items-center gap-1">
            <span>Ver todos los tours</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {tours.slice(0, 5).map((tour) => (
            <div key={tour.id} className="w-[260px] sm:w-[300px] shrink-0 bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/10] w-full bg-gray-100">
                  <Image
                    src={tour.image_url || '/placeholder-tour.jpg'}
                    alt={tour.title}
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                  {tour.tag && (
                    <span className="absolute top-3 left-3 bg-primary text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg">
                      Popular
                    </span>
                  )}
                </div>
                <div className="p-4 sm:p-5">
                  <h4 className="font-serif text-base sm:text-lg text-text-main mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                    {tour.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-text-light mb-4 font-light">
                    <span>{tour.duration}</span>
                    <span>•</span>
                    <span>Cusco</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-text-light font-light">Desde</span>
                    <span className="text-base sm:text-lg font-bold text-primary-dark">
                      USD {tour.price_adult}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0 sm:p-5 sm:pt-0 grid grid-cols-2 gap-2">
                <Link
                  href={`/tours/${tour.slug}`}
                  className="bg-gray-50 hover:bg-gray-100 text-text-main text-xs font-bold py-2 rounded-lg text-center transition-colors border border-gray-200"
                >
                  Leer más
                </Link>
                <Link
                  href={`/tours/${tour.slug}?book=true`}
                  className="bg-[#ff7a00] hover:bg-[#e06b00] text-white text-xs font-bold py-2 rounded-lg text-center transition-colors shadow-sm"
                >
                  Reservar ahora
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Search block styled like Google Search + Modo IA */}
      <section className="bg-accent/30 py-16 border-y border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-3">Blog MTA</span>
          <h2 className="text-2xl sm:text-3xl font-serif text-text-main mb-8">
            Toda la informacion que necesitas esta aqui
          </h2>
          
          {/* Google Search Bar Mock */}
          <div className="relative bg-white border border-gray-200 rounded-full shadow-md flex items-center px-5 py-3.5 max-w-xl mx-auto focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all">
            <Search className="w-5 h-5 text-gray-400 shrink-0 mr-3" />
            <input
              type="text"
              placeholder="+ Preguntar a Google"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-text-main placeholder-gray-400 font-light text-sm sm:text-base p-0 focus:ring-0 leading-tight"
            />
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-2 sm:ml-3 border-l border-gray-100 pl-2 sm:pl-3">
              <button className="hidden sm:inline-block text-gray-400 hover:text-primary transition-colors" aria-label="Búsqueda por voz">
                <Mic className="w-4.5 h-4.5" />
              </button>
              <button className="hidden sm:inline-block text-gray-400 hover:text-primary transition-colors" aria-label="Búsqueda por imagen">
                <Camera className="w-4.5 h-4.5" />
              </button>
              <button className="bg-primary hover:bg-primary-dark text-white text-xs font-bold py-1.5 px-3 rounded-full flex items-center gap-1 transition-colors">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Modo IA</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Blog Posts Grid */}
      <section className="container mx-auto px-4 lg:px-8 py-16 max-w-5xl">
        {filteredPostIndices.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-150 shadow-sm max-w-xl mx-auto">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="font-bold text-lg text-text-main mb-1">No se encontraron artículos</h3>
            <p className="text-text-light text-sm font-light mb-4">Intenta ajustar tu término de búsqueda.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-primary font-bold text-sm hover:underline"
            >
              Mostrar todos los artículos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPostIndices.map((i) => {
              const postTitle = t(`posts.${i}.title`);
              return (
                <article key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-150 group">
                  <Link href={`/blog/${t(`posts.${i}.slug`)}`} className="block aspect-[16/9] overflow-hidden relative bg-gray-100">
                    <Image
                      src={postImages[i]}
                      alt={postTitle}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 400px"
                    />
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-[11px] text-text-light mb-3 font-semibold uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-primary" /> {t(`posts.${i}.date`)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-primary-light" /> {t(`posts.${i}.readTime`)}
                      </span>
                    </div>
                    <Link href={`/blog/${t(`posts.${i}.slug`)}`} className="block">
                      <h3 className="font-serif text-xl text-text-main mb-2 group-hover:text-primary transition-colors font-bold leading-snug">
                        {postTitle}
                      </h3>
                    </Link>
                    <p className="text-text-light text-sm leading-relaxed font-light mb-4 sm:mb-6 line-clamp-3">
                      {t(`posts.${i}.excerpt`)}
                    </p>
                    <Link
                      href={`/blog/${t(`posts.${i}.slug`)}`}
                      className="text-primary font-bold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      <span>{t('readMore')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. Ticket Callout Widget: "¿Necesitas tu entrada a Machu Picchu?" */}
      <section className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-md text-center">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-text-main mb-3">¿Necesitas tu entrada a Machu Picchu?</h2>
          <p className="text-text-light text-sm font-light max-w-md mx-auto mb-8">
            Las entradas se agotan con meses de anticipación. Podemos ayudarte a conseguir una si aún no la tienes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-8">
            {/* Card A: Yes */}
            <button
              onClick={() => setSelectedTicketOption('yes')}
              className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all active:scale-98 ${
                selectedTicketOption === 'yes'
                  ? 'border-primary bg-primary/5 ring-1 ring-primary'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mb-4 ${
                selectedTicketOption === 'yes' ? 'border-primary bg-primary text-white text-[10px]' : 'border-gray-300'
              }`}>
                {selectedTicketOption === 'yes' && '✓'}
              </span>
              <div>
                <h4 className="font-bold text-sm text-text-main mb-1">Sí, necesito entrada</h4>
                <p className="text-xs text-text-light font-light leading-normal">Ayúdame a reservar la experiencia completa.</p>
              </div>
            </button>

            {/* Card B: No */}
            <button
              onClick={() => setSelectedTicketOption('no')}
              className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all active:scale-98 ${
                selectedTicketOption === 'no'
                  ? 'border-primary bg-primary/5 ring-1 ring-primary'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mb-4 ${
                selectedTicketOption === 'no' ? 'border-primary bg-primary text-white text-[10px]' : 'border-gray-300'
              }`}>
                {selectedTicketOption === 'no' && '✓'}
              </span>
              <div>
                <h4 className="font-bold text-sm text-text-main mb-1">No necesito entrada</h4>
                <p className="text-xs text-text-light font-light leading-normal">Solo necesito el tren y el guía turístico.</p>
              </div>
            </button>
          </div>

          <button
            onClick={handleTicketContinue}
            disabled={!selectedTicketOption}
            className={`w-full max-w-xs py-3.5 px-8 rounded-full font-bold transition-all shadow-md text-sm sm:text-base ${
              selectedTicketOption
                ? 'bg-primary-dark hover:bg-primary text-white cursor-pointer active:scale-95'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continuar
          </button>
        </div>
      </section>

    </div>
  );
}
