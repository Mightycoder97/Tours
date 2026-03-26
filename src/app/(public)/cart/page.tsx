'use client';

import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import { Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { items, removeItem, getTotal } = useCartStore();
  
  // Prevent hydration mismatch for zustand persist
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen"></div>;

  return (
    <div className="bg-gray-50 min-h-screen pt-24 sm:pt-28 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-primary mb-6 sm:mb-8 border-b pb-4">
          Tu Carrito de Viaje
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-text-main mb-4">Aún no has agregado ninguna aventura</h2>
            <p className="text-text-light mb-8">Descubre la magia de los Andes con nuestros tours.</p>
            <Link href="/tours" className="inline-flex items-center px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary-light transition-colors">
              Explorar Tours <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Cart Items */}
            <div className="w-full lg:w-2/3 space-y-4">
              {items.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 flex flex-col sm:flex-row gap-6">
                  <div className="w-full sm:w-1/3 h-40 rounded-lg overflow-hidden shrink-0">
                    <img src={item.imageUrl} alt={item.tourName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-xl font-bold text-primary line-clamp-2 pr-4">{item.tourName}</h3>
                       <button onClick={() => removeItem(item.tourId, item.date)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors flex-shrink-0">
                          <Trash2 className="w-5 h-5" />
                       </button>
                    </div>
                    
                    <div className="text-sm text-text-main mb-4 flex-1">
                      <p className="font-medium mb-1">
                        <span className="text-gray-500">Fecha:</span> {format(new Date(item.date), "dd 'de' MMMM, yyyy", { locale: es })}
                      </p>
                      <p className="font-medium">
                        <span className="text-gray-500">Pasajeros:</span> {item.adults} Adultos {item.children > 0 && `, ${item.children} Niños`}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-end border-t border-gray-50 pt-4 mt-auto">
                       <Link href={`/tours/${item.tourId}`} className="text-sm font-bold text-accent hover:underline">Editar</Link>
                       <div className="text-2xl font-bold text-primary">USD {item.totalPrice}</div>
                    </div>
                  </div>
                </div>
              ))}
              
              <Link href="/tours" className="inline-flex items-center text-primary font-semibold text-sm hover:underline mt-6">
                <ArrowLeft className="w-4 h-4 mr-2" /> Seguir comprando
              </Link>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                 <h2 className="text-xl font-bold text-primary mb-6 border-b pb-4">Resumen del Pedido</h2>
                 
                 <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm text-text-main">
                      <span>Subtotal ({items.length} tours)</span>
                      <span className="font-medium">USD {getTotal()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-text-main">
                      <span>Impuestos (IGV)</span>
                      <span className="font-medium text-green-600">Incluidos</span>
                    </div>
                 </div>

                 <div className="border-t border-gray-100 pt-4 mb-8">
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                      <span className="font-bold text-lg">Total</span>
                      <span className="font-serif text-2xl font-bold text-primary">USD {getTotal()}</span>
                    </div>
                 </div>

                 <Link href="/checkout" className="w-full flex items-center justify-center bg-accent text-primary py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-[#c4a02e] transition-all">
                   Continuar al Pago <ArrowRight className="w-5 h-5 ml-2" />
                 </Link>

                 <div className="mt-4 flex flex-wrap justify-center gap-2 opacity-50">
                    {/* Basic payment icons */}
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                 </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
