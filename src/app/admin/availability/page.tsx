import { createClient } from '@/lib/supabase/server';
import AvailabilityManager from '@/components/admin/AvailabilityManager';
import { getAdminActiveBrand } from '@/lib/admin-brand';
import { BRANDS } from '@/lib/brand';
import { Building2 } from 'lucide-react';

export const revalidate = 0;

export default async function AdminAvailabilityPage() {
  const activeBrand = await getAdminActiveBrand();
  const brandConfig = BRANDS[activeBrand] || BRANDS.mta;
  const supabase = await createClient();

  // Fetch only tours for the active brand
  const { data: tours } = await supabase
    .from('tours')
    .select('id, title, slug, tenant')
    .eq('is_active', true)
    .eq('tenant', activeBrand)
    .order('title');

  const safeTours = tours || [];
  const brandTourIds = safeTours.map(t => t.id);

  // Fetch only future availability slots for tours of the active brand
  const today = new Date().toISOString().split('T')[0];
  let slots: any[] = [];

  if (brandTourIds.length > 0) {
    const { data: slotsData } = await supabase
      .from('tour_availability')
      .select('*, tours(title, tenant)')
      .in('tour_id', brandTourIds)
      .gte('available_date', today)
      .order('available_date', { ascending: true });
    slots = slotsData || [];
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-serif font-bold text-primary">Gestión de Disponibilidad</h1>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                activeBrand === 'sonqo'
                  ? 'bg-[#8B66E8]/15 text-[#8B66E8] border border-[#8B66E8]/30'
                  : 'bg-teal-100 text-teal-800 border border-teal-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              {brandConfig.name}
            </span>
          </div>
          <p className="text-sm text-text-light mt-1">
            Administra las fechas disponibles y la capacidad máxima para tours de {brandConfig.shortName}.
          </p>
        </div>
      </div>

      <AvailabilityManager
        tours={safeTours}
        initialSlots={slots}
        activeBrand={activeBrand}
      />
    </div>
  );
}