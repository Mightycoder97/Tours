import { createClient } from '@/lib/supabase/server';

export const revalidate = 0;

export default async function BookingsPage() {
  const supabase = await createClient();
  
  const { data: bookings } = await supabase
    .from('bookings')
    .select('*, tours(title)')
    .order('created_at', { ascending: false });

  const safeBookings = bookings || [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-serif font-bold text-primary">Gestión de Reservas</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-sm text-text-light uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-bold">Código</th>
              <th className="px-6 py-4 font-bold">Tour Adquirido</th>
              <th className="px-6 py-4 font-bold">Fecha / Pasajeros</th>
              <th className="px-6 py-4 font-bold">Persona Contacto</th>
              <th className="px-6 py-4 font-bold">Estado / Método</th>
              <th className="px-6 py-4 font-bold text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {safeBookings.map((b: any) => (
              <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-primary">{b.booking_code}</td>
                <td className="px-6 py-4 font-medium text-text-main whitespace-nowrap overflow-hidden text-ellipsis max-w-xs" title={b.tours?.title}>{b.tours?.title || 'Tour Eliminado'}</td>
                <td className="px-6 py-4">
                   <span className="block font-bold">{b.selected_date}</span>
                   <span className="text-xs text-text-light">{b.adults} Adultos, {b.children} Niños</span>
                </td>
                <td className="px-6 py-4">
                   <span className="block font-bold">{b.passenger_name}</span>
                   <span className="text-xs text-text-light">{b.passenger_email} <br/> {b.passenger_phone}</span>
                </td>
                <td className="px-6 py-4">
                   <span className={`inline-block px-2 py-1 rounded-sm text-xs font-bold mr-2 mb-1 ${b.payment_status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                     {b.payment_status}
                   </span><br/>
                   <span className="text-xs uppercase text-text-light bg-gray-100 px-2 py-1 rounded-sm">{b.payment_method}</span>
                </td>
                <td className="px-6 py-4 text-right font-bold text-lg">
                   USD {b.total_usd}
                </td>
              </tr>
            ))}
            
            {safeBookings.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-text-light">No hay reservas procesadas en el sistema.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
