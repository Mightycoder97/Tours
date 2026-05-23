import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';
import SuccessActions from '@/components/ui/SuccessActions';

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ code?: string }> }) {
  const resolvedParams = await searchParams;
  const bookingId = resolvedParams.code || Math.random().toString(36).substring(2, 10).toUpperCase();

  return (
    <div className="bg-background-alt min-h-screen pt-32 pb-20 flex items-center justify-center">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden text-center">
          
          <div className="bg-primary py-12 px-6 relative">
            <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
            <div className="relative z-10 flex flex-col items-center">
               <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl">
                 <CheckCircle className="w-10 h-10 text-green-500" />
               </div>
               <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">¡Reserva Confirmada!</h1>
               <p className="text-white/90 text-lg max-w-lg">
                 Tu viaje a la magia del Perú está garantizado. Hemos enviado los detalles a tu correo electrónico.
               </p>
            </div>
          </div>

          <div className="p-8 md:p-12">
            
            <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100 flex flex-col sm:flex-row justify-between items-center text-left">
              <div>
                 <span className="text-xs font-bold uppercase text-gray-500 tracking-wider block mb-1">Código de Reserva</span>
                 <span className="text-2xl font-mono font-bold text-primary">{bookingId}</span>
              </div>
              <SuccessActions bookingCode={bookingId} />
            </div>

            <div className="text-left mb-10">
              <h3 className="text-lg font-bold text-primary mb-4 border-b pb-2">¿Qué sigue ahora?</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 shrink-0 mt-0.5">1</span>
                  Revisa tu bandeja de entrada o spam. Hemos enviado los e-tickets que deberás presentar el día del tour.
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 shrink-0 mt-0.5">2</span>
                  Lleva tu documento de identidad (Pasaporte o DNI) original.
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 shrink-0 mt-0.5">3</span>
                  Preséntate en el punto de encuentro 30 minutos antes de la hora acordada.
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/tours" className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-text-main rounded-full font-bold transition-colors">
                Ver más Destinos
              </Link>
              <Link href="/" className="px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary-light transition-colors flex items-center justify-center shadow-lg">
                Volver al Inicio <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
