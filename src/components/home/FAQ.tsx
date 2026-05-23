'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: '¿Cuánto tiempo antes debo reservar mi tour a Machu Picchu?',
    answer: 'Recomendamos reservar con al menos 2 semanas de anticipación, especialmente en temporada alta (junio-agosto). Los cupos son limitados por grupo para garantizar una experiencia personalizada.',
  },
  {
    question: '¿Qué incluye el precio del tour?',
    answer: 'Nuestros tours incluyen transporte desde tu hotel en Cusco, entrada a los sitios arqueológicos, guía profesional bilingüe, y almuerzo buffet. Algunos tours premium incluyen tren de retorno.',
  },
  {
    question: '¿Es seguro viajar a Machu Picchu?',
    answer: 'Sí, es completamente seguro. Cusco y Machu Picchu son destinos turísticos muy bien organizados. Nuestros guías están certificados en primeros auxilios y portamos botiquines de emergencia. Además, ofrecemos seguro de viaje opcional.',
  },
  {
    question: '¿Qué debo llevar al tour?',
    answer: 'Pasaporte original (obligatorio), protector solar, sombrero, agua, ropa cómoda en capas, zapatillas de trekking, impermeable (noviembre-marzo), y cámara fotográfica.',
  },
  {
    question: '¿Puedo cancelar o reprogramar mi reserva?',
    answer: 'Sí, ofrecemos cancelación gratuita hasta 48 horas antes del tour. Para reprogramaciones, contáctanos con al menos 24 horas de anticipación y ajustaremos la fecha sin costo adicional, sujeto a disponibilidad.',
  },
  {
    question: '¿Hay restricciones de edad o condición física?',
    answer: 'La mayoría de nuestros tours son aptos para todas las edades. Sin embargo, algunos tours de trekking (Montaña de Colores, Salkantay) requieren buena condición física. Recomendamos aclimatarse 2-3 días en Cusco antes de tours de alta altitud.',
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express) a través de Culqi, y también PayPal para pagos internacionales. Todos los pagos son procesados con encriptación SSL.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-text-main mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-text-light text-lg font-light">
            Todo lo que necesitas saber antes de tu aventura.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-bold text-text-main pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-text-light leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
