'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { validateImageUrl } from '@/lib/validation';
import { sanitizeInclusionsList, sanitizeExclusionsList, assertValidPricing } from '@/lib/tours';

export interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}

function parseTourFormData(formData: FormData) {
  // Parse Inclusions & Exclusions using domain sanitizers
  const inclusions = sanitizeInclusionsList(formData.get('inclusions')?.toString() || '');
  const exclusions = sanitizeExclusionsList(formData.get('exclusions')?.toString() || '');

  // Parse Pricing
  const priceAdultRaw = formData.get('price_adult')?.toString();
  const priceAdult = priceAdultRaw !== undefined && priceAdultRaw !== '' ? parseFloat(priceAdultRaw) : 0;

  const priceChildRaw = formData.get('price_child')?.toString();
  const priceChild = priceChildRaw !== undefined && priceChildRaw.trim() !== '' ? parseFloat(priceChildRaw) : null;

  const priceInfantRaw = formData.get('price_infant')?.toString();
  const priceInfant = priceInfantRaw !== undefined && priceInfantRaw.trim() !== '' ? parseFloat(priceInfantRaw) : null;

  // Parse Itinerary JSON
  let itinerary: ItineraryItem[] = [];
  const rawItinerary = formData.get('itinerary')?.toString();
  if (rawItinerary) {
    try {
      const parsed = JSON.parse(rawItinerary);
      if (Array.isArray(parsed)) {
        itinerary = parsed
          .filter(item => item && typeof item === 'object')
          .map((item, idx) => ({
            day: typeof item.day === 'number' ? item.day : idx + 1,
            title: typeof item.title === 'string' ? item.title.trim() : '',
            description: typeof item.description === 'string' ? item.description.trim() : '',
          }));
      }
    } catch (e) {
      console.error('Error parsing itinerary JSON in action:', e);
    }
  }

  // Parse and validate Tenant
  const rawTenant = formData.get('tenant')?.toString()?.trim().toLowerCase();
  const tenant: 'mta' | 'sonqo' = (rawTenant === 'sonqo' || rawTenant === 'mta') ? rawTenant : 'mta';

  // Parse Gallery Images (TEXT[])
  let images: string[] = [];
  const rawImages = formData.get('images')?.toString();
  if (rawImages) {
    try {
      const parsed = JSON.parse(rawImages);
      if (Array.isArray(parsed)) {
        images = parsed
          .filter((item): item is string => typeof item === 'string' && item.trim() !== '')
          .map(item => item.trim());
      }
    } catch (e) {
      console.error('Error parsing gallery images JSON in action:', e);
    }
  }

  return {
    title: formData.get('title')?.toString().trim(),
    slug: formData.get('slug')?.toString().trim(),
    description: formData.get('description')?.toString() || '',
    price_adult: priceAdult,
    price_child: priceChild,
    price_infant: priceInfant,
    duration: formData.get('duration')?.toString() || null,
    tag: formData.get('tag')?.toString() || null,
    image_url: formData.get('image_url')?.toString().trim() || '',
    images,
    is_active: formData.get('is_active') === 'on',
    category_id: formData.get('category_id') || null,
    destination_id: formData.get('destination_id') || null,
    inclusions,
    exclusions,
    itinerary,
    tenant,
  };
}

export async function createTour(formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const tourData = parseTourFormData(formData);

  if (tourData.image_url) {
    validateImageUrl(tourData.image_url);
  }
  if (tourData.images && tourData.images.length > 0) {
    for (const imgUrl of tourData.images) {
      validateImageUrl(imgUrl);
    }
  }
  if (tourData.price_adult > 0) {
    assertValidPricing({
      price_adult: tourData.price_adult,
      price_child: tourData.price_child,
      price_infant: tourData.price_infant,
    });
  }

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

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const tourData = parseTourFormData(formData);

  if (tourData.image_url) {
    validateImageUrl(tourData.image_url);
  }
  if (tourData.images && tourData.images.length > 0) {
    for (const imgUrl of tourData.images) {
      validateImageUrl(imgUrl);
    }
  }
  if (tourData.price_adult > 0) {
    assertValidPricing({
      price_adult: tourData.price_adult,
      price_child: tourData.price_child,
      price_infant: tourData.price_infant,
    });
  }

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

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const { error } = await supabase.from('tours').delete().eq('id', id);
  if (error) {
    return { error: error.message };
  }
  revalidatePath('/admin/tours');
  revalidatePath('/tours');
  redirect('/admin/tours');
}