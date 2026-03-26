'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createCategory(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get('name');
  const slug = formData.get('slug');

  if (!name || !slug) return { error: 'Nombre y slug son requeridos' };

  const { error } = await supabase.from('categories').insert([{ name, slug }]);
  if (error) return { error: error.message };
  
  revalidatePath('/admin/categories');
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) return { error: error.message };
  
  revalidatePath('/admin/categories');
}
