import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { BRANDS, resolveTenantFromBooking } from '@/lib/brand';

export const revalidate = 0;

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ tenant?: string }>;
}) {
  const { tenant } = await searchParams;
  const activeTenantFilter = tenant === 'sonqo' || tenant === 'mta' ? tenant : 'all';

  const supabase = await createClient();
  
  const { data: bookings } = await supabase
    .from('bookings')
    .select('*, tours(title, slug)')
    .order('created_at', { ascending: false });

  const allBookings = bookings || [];
  const safeBookings = activeTenantFilter === 'all'
    ? allBookings
    : allBookings.filter((b: any) => resolveTenantFromBooking(b).id === activeTenantFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-serif font-bold text-primary-dark">Gestión de Reservas</h1>

        {/* Filtro por Marca (Tenant) */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm w-fit">
          <Link
            href="/admin/bookings"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTenantFilter === 'all'
                ? 'bg-primary text-white'
                : 'text-text-light hover:bg-gray-100'
            }`}
          >
            Todas ({allBookings.length})
          </Link>
          <Link
            href="/admin/bookings?tenant=sonqo"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTenantFilter === 'sonqo'
                ? 'bg-[#8B66E8] text-white'
                : 'text-text-light hover:bg-gray-100'
            }`}
          >
            {BRANDS.sonqo.shortName}
          </Link>
          <Link
            href="/admin/bookings?tenant=mta"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTenantFilter === 'mta'
                ? 'bg-[#048A84] text-white'
                : 'text-text-light hover:bg-gray-100'
            }`}
          >
            {BRANDS.mta.shortName}
          </Link>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-sm text-text-light uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-bold">Código / Marca</th>
              <th className="px-6 py-4 font-bold">Tour Adquirido</th>
              <th className="px-6 py-4 font-bold">Fecha / Pasajeros</th>
              <th className="px-6 py-4 font-bold">Persona Contacto</th>
              <th className="px-6 py-4 font-bold">Estado / Método</th>
              <th className="px-6 py-4 font-bold text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {safeBookings.map((b: any) => {
              const bookingBrand = resolveTenantFromBooking(b);
              return (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="block font-mono font-bold text-primary mb-1">{b.booking_code}</span>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-bold ${bookingBrand.adminBadgeClass}`}>
                      {bookingBrand.shortName}
                    </span>
                  </td>
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
                     {b.tours?.slug === 'paquete-de-prueba-culqi' || b.payment_method === 'yape' ? 'S/' : 'USD'} {b.total_usd}
                  </td>
                </tr>
              );
            })}
            
            {safeBookings.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-text-light">No hay reservas procesadas para este filtro.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
