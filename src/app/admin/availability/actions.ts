'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createAvailabilitySlots(formData: FormData) {
  const supabase = await createClient();
  
  const tourId = formData.get('tour_id')?.toString();
  const startDate = formData.get('start_date')?.toString();
  const endDate = formData.get('end_date')?.toString();
  const maxCapacity = parseInt(formData.get('max_capacity')?.toString() || '20');
  const excludeSundays = formData.get('exclude_sundays') === 'on';

  if (!tourId || !startDate || !endDate) {
    return { error: 'Tour, fecha inicio y fecha fin son requeridos.' };
  }

  // Generate all dates in range
  const slots: { tour_id: string; available_date: string; max_capacity: number }[] = [];
  const current = new Date(startDate + 'T00:00:00');
  const end = new Date(endDate + 'T00:00:00');

  while (current <= end) {
    if (!excludeSundays || current.getDay() !== 0) {
      slots.push({
        tour_id: tourId,
        available_date: current.toISOString().split('T')[0],
        max_capacity: maxCapacity,
      });
    }
    current.setDate(current.getDate() + 1);
  }

  if (slots.length === 0) {
    return { error: 'No se generaron fechas con los parámetros dados.' };
  }

  const { error } = await supabase
    .from('tour_availability')
    .upsert(slots, { onConflict: 'tour_id,available_date' });

  if (error) {
    console.error('Error creating availability:', error);
    return { error: error.message };
  }

  revalidatePath('/admin/availability');
  return { success: true, count: slots.length };
}

export async function updateAvailabilitySlot(id: string, formData: FormData) {
  const supabase = await createClient();
  
  const maxCapacity = parseInt(formData.get('max_capacity')?.toString() || '20');
  const isActive = formData.get('is_active') === 'on';

  const { error } = await supabase
    .from('tour_availability')
    .update({ max_capacity: maxCapacity, is_active: isActive })
    .eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/availability');
  return { success: true };
}

export async function deleteAvailabilitySlot(id: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('tour_availability')
    .delete()
    .eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/availability');
  return { success: true };
}

export async function bulkDeleteAvailability(tourId: string) {
  const supabase = await createClient();
  
  // Only delete future, un-booked slots
  const today = new Date().toISOString().split('T')[0];
  
  const { error } = await supabase
    .from('tour_availability')
    .delete()
    .eq('tour_id', tourId)
    .gte('available_date', today)
    .eq('booked_count', 0);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/availability');
  return { success: true };
}
