import { createClient } from '@/lib/supabase/server';
import { Users, DollarSign, Calendar } from 'lucide-react';

export const revalidate = 0; // Ensures fresh data is always shown for admins

export default async function AdminDashboard() {
  const supabase = await createClient();
  
  // Basic stats
  const { count: bookingsCount } = await supabase.from('bookings').select('*', { count: 'exact', head: true });
  const { data: revenueData } = await supabase.from('bookings').select('total_usd').eq('payment_status', 'PAID');
  const { count: toursCount } = await supabase.from('tours').select('*', { count: 'exact', head: true });
  
  const totalRevenue = revenueData?.reduce((acc, curr) => acc + curr.total_usd, 0) || 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-serif font-bold text-primary">Dashboard Principal</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 bg-primary/10 text-primary rounded-xl mr-4"><Users className="w-8 h-8" /></div>
          <div>
            <p className="text-text-light text-sm font-bold uppercase tracking-wider">Total Reservas</p>
            <h3 className="text-3xl font-serif font-bold text-text-main">{bookingsCount || 0}</h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 bg-green-100 text-green-700 rounded-xl mr-4"><DollarSign className="w-8 h-8" /></div>
          <div>
            <p className="text-text-light text-sm font-bold uppercase tracking-wider">Ingresos (Pagados)</p>
            <h3 className="text-3xl font-serif font-bold text-text-main">USD {totalRevenue.toFixed(2)}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-xl mr-4"><Calendar className="w-8 h-8" /></div>
          <div>
            <p className="text-text-light text-sm font-bold uppercase tracking-wider">Tours Listados</p>
            <h3 className="text-3xl font-serif font-bold text-text-main">{toursCount || 0}</h3>
          </div>
        </div>
      </div>
      
    </div>
  );
}
