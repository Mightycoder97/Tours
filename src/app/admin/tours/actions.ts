'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createTour(formData: FormData) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect('/login');
  }
  
  const inclusionsStr = formData.get('inclusions')?.toString() || '';
  const inclusions = inclusionsStr.split('\n').filter(i => i.trim() !== '');

  const tourData = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    description: formData.get('description'),
    price_adult: parseFloat(formData.get('price_adult')?.toString() || '0'),
    price_child: formData.get('price_child') ? parseFloat(formData.get('price_child')?.toString()!) : null,
    duration: formData.get('duration'),
    tag: formData.get('tag'),
    image_url: formData.get('image_url'),
    is_active: formData.get('is_active') === 'on',
    category_id: formData.get('category_id') || null,
    destination_id: formData.get('destination_id') || null,
    inclusions,
  };

  const { error } = await supabase.from('tours').insert([tourData]);

  if (error) {
    console.error('Error creating tour:', error);
    return { error: error.message };
  }

  revalidatePath('/admin/tours');
  revalidatePath('/tours');
  redirect('/admin/tours');
}

export async function updateTour(id: string, formData: FormData) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect('/login');
  }
  
  const inclusionsStr = formData.get('inclusions')?.toString() || '';
  const inclusions = inclusionsStr.split('\n').filter(i => i.trim() !== '');

  const tourData = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    description: formData.get('description'),
    price_adult: parseFloat(formData.get('price_adult')?.toString() || '0'),
    price_child: formData.get('price_child') ? parseFloat(formData.get('price_child')?.toString()!) : null,
    duration: formData.get('duration'),
    tag: formData.get('tag'),
    image_url: formData.get('image_url'),
    is_active: formData.get('is_active') === 'on',
    category_id: formData.get('category_id') || null,
    destination_id: formData.get('destination_id') || null,
    inclusions,
  };

  const { error } = await supabase.from('tours').update(tourData).eq('id', id);

  if (error) {
    console.error('Error updating tour:', error);
    return { error: error.message };
  }

  revalidatePath('/admin/tours');
  revalidatePath(`/admin/tours/${id}`);
  revalidatePath('/tours');
  revalidatePath(`/tours/${tourData.slug}`);
  redirect('/admin/tours');
}

export async function deleteTour(id: string) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect('/login');
  }
  const { error } = await supabase.from('tours').delete().eq('id', id);
  if (error) {
    return { error: error.message };
  }
  revalidatePath('/admin/tours');
  revalidatePath('/tours');
  redirect('/admin/tours');
}
