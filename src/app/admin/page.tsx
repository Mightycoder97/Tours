import { createClient } from '@/lib/supabase/server';
import { Users, DollarSign, Calendar, Building2 } from 'lucide-react';
import { getAdminActiveBrand } from '@/lib/admin-brand';
import { BRANDS } from '@/lib/brand';
import Link from 'next/link';

interface BookingSummary {
  id: string;
  booking_code: string;
  passenger_name: string;
  tours?: { title?: string; slug?: string } | null;
  selected_date: string;
  payment_status: string;
  total_usd: number;
}

export const revalidate = 0; // Ensures fresh data is always shown for admins

export default async function AdminDashboard() {
  const activeBrand = await getAdminActiveBrand();
  const brandConfig = BRANDS[activeBrand] || BRANDS.mta;
  const supabase = await createClient();
  
  // Scoped stats for the active brand
  const { count: bookingsCount } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .eq('tenant', activeBrand);

  const { data: revenueData } = await supabase
    .from('bookings')
    .select('total_usd')
    .eq('payment_status', 'PAID')
    .eq('tenant', activeBrand);

  const { count: toursCount } = await supabase
    .from('tours')
    .select('*', { count: 'exact', head: true })
    .eq('tenant', activeBrand);
  
  const totalRevenue = revenueData?.reduce((acc, curr) => acc + curr.total_usd, 0) || 0;

  // Recent bookings for this active brand
  const { data: recentBookings } = await supabase
    .from('bookings')
    .select('*, tours(title, slug)')
    .eq('tenant', activeBrand)
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div className="space-y-6">
      {/* Brand Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Dashboard Principal</h1>
          <p className="text-sm text-text-light mt-1">
            Resumen operativo y métricas en tiempo real.
          </p>
        </div>

        {/* Active Brand Context Badge */}
        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-sm w-fit">
          <Building2 className="w-4 h-4 text-text-light" />
          <span className="text-xs text-text-light font-medium">Contexto activo:</span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              activeBrand === 'sonqo'
                ? 'bg-[#8B66E8]/15 text-[#8B66E8] border border-[#8B66E8]/30'
                : 'bg-teal-100 text-teal-800 border border-teal-200'
            }`}
          >
            {brandConfig.name} ({activeBrand.toUpperCase()})
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 bg-primary/10 text-primary rounded-xl mr-4"><Users className="w-8 h-8" /></div>
          <div>
            <p className="text-text-light text-sm font-bold uppercase tracking-wider">Total Reservas ({activeBrand.toUpperCase()})</p>
            <h3 className="text-3xl font-serif font-bold text-text-main">{bookingsCount || 0}</h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 bg-green-100 text-green-700 rounded-xl mr-4"><DollarSign className="w-8 h-8" /></div>
          <div>
            <p className="text-text-light text-sm font-bold uppercase tracking-wider">Ingresos ({activeBrand.toUpperCase()})</p>
            <h3 className="text-3xl font-serif font-bold text-text-main">USD {totalRevenue.toFixed(2)}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-xl mr-4"><Calendar className="w-8 h-8" /></div>
          <div>
            <p className="text-text-light text-sm font-bold uppercase tracking-wider">Tours ({activeBrand.toUpperCase()})</p>
            <h3 className="text-3xl font-serif font-bold text-text-main">{toursCount || 0}</h3>
          </div>
        </div>
      </div>

      {/* Recent Bookings List for Active Brand */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-serif font-bold text-lg text-text-main">Últimas Reservas — {brandConfig.shortName}</h2>
          <Link href="/admin/bookings" className="text-xs font-bold text-primary hover:underline">
            Ver todas las reservas →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100 text-xs text-text-light uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 font-bold">Código</th>
                <th className="px-6 py-3 font-bold">Cliente</th>
                <th className="px-6 py-3 font-bold">Tour</th>
                <th className="px-6 py-3 font-bold">Fecha</th>
                <th className="px-6 py-3 font-bold">Estado</th>
                <th className="px-6 py-3 font-bold text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {((recentBookings || []) as unknown as BookingSummary[]).map((b: BookingSummary) => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 font-mono font-bold text-primary">{b.booking_code}</td>
                  <td className="px-6 py-3 font-medium text-text-main">{b.passenger_name}</td>
                  <td className="px-6 py-3 text-text-light truncate max-w-xs">{b.tours?.title || 'Tour'}</td>
                  <td className="px-6 py-3 text-text-light">{b.selected_date}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${b.payment_status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {b.payment_status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right font-bold">USD {b.total_usd}</td>
                </tr>
              ))}
              {(!recentBookings || recentBookings.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-6 py-6 text-center text-text-light">
                    No hay reservas recientes para {brandConfig.shortName}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
