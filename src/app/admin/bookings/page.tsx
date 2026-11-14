import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { BRANDS, resolveTenantFromBooking } from '@/lib/brand';
import { getAdminActiveBrand } from '@/lib/admin-brand';
import { Building2 } from 'lucide-react';

interface BookingItem {
  id: string;
  booking_code: string;
  tenant?: string | null;
  tours?: { title?: string; slug?: string } | null;
  selected_date: string;
  adults: number;
  children: number;
  passenger_name: string;
  passenger_email: string;
  passenger_phone: string;
  payment_status: string;
  payment_method: string;
  total_usd: number;
}

export const revalidate = 0;

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ tenant?: string }>;
}) {
  const { tenant } = await searchParams;
  const activeBrand = await getAdminActiveBrand();

  // Default the tenant filter to activeBrand when no searchParams.tenant is explicitly specified
  const activeTenantFilter = tenant === 'all' || tenant === 'sonqo' || tenant === 'mta'
    ? tenant
    : activeBrand;

  const supabase = await createClient();
  
  // If activeTenantFilter is specific, query by tenant; if 'all', query all
  let query = supabase
    .from('bookings')
    .select('*, tours(title, slug)')
    .order('created_at', { ascending: false });

  if (activeTenantFilter !== 'all') {
    query = query.eq('tenant', activeTenantFilter);
  }

  const { data: bookings } = await query;

  const allBookings = (bookings || []) as unknown as BookingItem[];
  // Ensure backward compatibility with booking_code prefix resolution
  const safeBookings = activeTenantFilter === 'all'
    ? allBookings
    : allBookings.filter((b: BookingItem) => resolveTenantFromBooking(b).id === activeTenantFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary-dark">Gestión de Reservas</h1>
          <p className="text-sm text-text-light mt-1 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-primary" />
            Contexto activo en sesión: <span className="font-bold text-text-main">{BRANDS[activeBrand].name}</span>
          </p>
        </div>

        {/* Filtro por Marca (Tenant) */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm w-fit">
          <Link
            href="/admin/bookings?tenant=all"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTenantFilter === 'all'
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-light hover:bg-gray-100'
            }`}
          >
            Todas
          </Link>
          <Link
            href="/admin/bookings?tenant=sonqo"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTenantFilter === 'sonqo'
                ? 'bg-[#8B66E8] text-white shadow-sm'
                : 'text-text-light hover:bg-gray-100'
            }`}
          >
            {BRANDS.sonqo.shortName} {activeBrand === 'sonqo' ? '★' : ''}
          </Link>
          <Link
            href="/admin/bookings?tenant=mta"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTenantFilter === 'mta'
                ? 'bg-[#048A84] text-white shadow-sm'
                : 'text-text-light hover:bg-gray-100'
            }`}
          >
            {BRANDS.mta.shortName} {activeBrand === 'mta' ? '★' : ''}
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
            {safeBookings.map((b: BookingItem) => {
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
                <td colSpan={6} className="px-6 py-8 text-center text-text-light">
                  No hay reservas procesadas para {activeTenantFilter === 'all' ? 'ninguna marca' : BRANDS[activeTenantFilter as keyof typeof BRANDS]?.name || activeTenantFilter}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
