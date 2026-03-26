import { createClient } from '@/lib/supabase/server';
import AvailabilityManager from './AvailabilityManager';

export const revalidate = 0;

export default async function AdminAvailabilityPage() {
  const supabase = await createClient();

  // Fetch all tours for the selector
  const { data: tours } = await supabase
    .from('tours')
    .select('id, title, slug')
    .eq('is_active', true)
    .order('title');

  // Fetch all future availability slots with tour info
  const today = new Date().toISOString().split('T')[0];
  const { data: slots } = await supabase
    .from('tour_availability')
    .select('*, tours(title)')
    .gte('available_date', today)
    .order('available_date', { ascending: true });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-primary">Gestión de Disponibilidad</h1>
        <p className="text-sm text-text-light mt-1">Administra las fechas disponibles y la capacidad máxima por tour.</p>
      </div>

      <AvailabilityManager
        tours={tours || []}
        initialSlots={slots || []}
      />
    </div>
  );
}
