'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateSettings(formData: FormData) {
  const supabase = await createClient();
  
  const entries = Array.from(formData.entries());
  
  for (const [key, value] of entries) {
    if (typeof value === 'string' && key.startsWith('setting_')) {
      const actualKey = key.replace('setting_', '');
      await supabase.from('site_settings').update({ value }).eq('key', actualKey);
    }
  }
  
  revalidatePath('/', 'layout');
}
