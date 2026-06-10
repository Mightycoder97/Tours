'use client';

import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AdvisorsSection() {
  const t = useTranslations('pages.contact');

  const ADVISORS = [
    {
      name: 'Juan Mendoza',
      role: 'Asesor de Aventura y Trekking',
      phone: '51941555422',
      image: '/imagenes/advisor_juan.png',
      desc: 'Especialista en el Camino Inca, Salkantay Trek y rutas de aventura de alta montaña.'
    },
    {
      name: 'Sofía Valenzuela',
      role: 'Especialista en Experiencias Culturales',
      phone: '51989389418',
      image: '/imagenes/advisor_sofia.png',
      desc: 'Experta en tours de lujo a Machu Picchu, recorridos del Valle Sagrado e itinerarios familiares.'
    }
  ];

  return (
    <div className="bg-accent/40 rounded-3xl p-8 border border-gray-100 shadow-sm max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h3 className="font-serif text-2xl font-bold text-primary-dark mb-2">{t('advisorsTitle')}</h3>
        <p className="text-text-light text-xs sm:text-sm max-w-lg mx-auto font-light">{t('advisorsSubtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ADVISORS.map((adv, idx) => {
          const msg = encodeURIComponent(`¡Hola ${adv.name}! Me interesa planificar un tour y me gustaría recibir tu asesoramiento personalizado.`);
          const url = `https://wa.me/${adv.phone}?text=${msg}`;

          return (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left hover:shadow-md transition-shadow">
              <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 border border-gray-100 bg-gray-50 shadow-inner">
                <Image
                  src={adv.image}
                  alt={adv.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  <h4 className="font-serif text-lg text-text-main font-bold leading-snug">{adv.name}</h4>
                  <p className="text-primary text-xs font-bold uppercase tracking-wider mb-2">{adv.role}</p>
                  <p className="text-text-light text-xs font-light mb-4 leading-relaxed">{adv.desc}</p>
                </div>
                
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#20ba59] text-white py-2 px-4 rounded-lg font-bold text-xs shadow-sm transition-all active:scale-95 cursor-pointer max-w-xs mx-auto sm:mx-0 w-fit border-none"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chatear con {adv.name.split(' ')[0]}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
