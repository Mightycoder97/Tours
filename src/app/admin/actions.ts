'use server';

import { createClient } from '@/lib/supabase/server';
import { setAdminActiveBrand } from '@/lib/admin-brand';
import { BrandId } from '@/lib/brand';
import { revalidatePath } from 'next/cache';

export async function switchAdminBrand(brand: BrandId) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  if (brand !== 'mta' && brand !== 'sonqo') {
    throw new Error(`Invalid brand "${brand}". Must be 'mta' or 'sonqo'.`);
  }

  await setAdminActiveBrand(brand);
  revalidatePath('/admin', 'layout');
  return { success: true, brand };
}

export async function updateAdminPassword({ newPassword }: { newPassword: string }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  if (!newPassword || newPassword.length < 8) {
    return { error: 'La contraseña debe tener al menos 8 caracteres' };
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
