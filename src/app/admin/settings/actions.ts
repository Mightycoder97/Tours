'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { getAdminActiveBrand } from '@/lib/admin-brand';
import { parseHeroSlidesJson, assertValidHeroSlide, HeroSlide } from '@/lib/visual-assets';
import { BrandId } from '@/lib/brand';

export async function updateSettings(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');
  
  const activeBrand = await getAdminActiveBrand();
  const formTenant = formData.get('tenant');
  const targetTenant = (formTenant === 'mta' || formTenant === 'sonqo') ? formTenant : activeBrand;

  const entries = Array.from(formData.entries());
  
  for (const [key, value] of entries) {
    if (typeof value === 'string' && key.startsWith('setting_')) {
      const actualKey = key.replace('setting_', '');
      if (actualKey === 'home_hero_slides') {
        parseHeroSlidesJson(value);
      }

      // Check existing row scoped to targetTenant
      const { data: existing } = await supabase
        .from('site_settings')
        .select('id')
        .eq('tenant', targetTenant)
        .eq('key', actualKey)
        .maybeSingle();

      if (existing) {
        await supabase
          .from('site_settings')
          .update({ value })
          .eq('tenant', targetTenant)
          .eq('key', actualKey);
      } else {
        await supabase
          .from('site_settings')
          .upsert(
            {
              tenant: targetTenant,
              key: actualKey,
              value,
            },
            { onConflict: 'tenant,key' }
          );
      }
    }
  }
  
  revalidatePath('/', 'layout');
  revalidatePath('/admin/settings');
}

export async function updateHeroSlides(formData: FormData): Promise<{ success?: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const activeBrand = await getAdminActiveBrand();
  const formTenant = formData.get('tenant')?.toString();
  const targetTenant: BrandId = (formTenant === 'mta' || formTenant === 'sonqo') ? formTenant : activeBrand;

  const rawSlides = formData.get('home_hero_slides')?.toString() || formData.get('slides')?.toString() || '[]';
  const validatedSlides = parseHeroSlidesJson(rawSlides);

  const { data: existing } = await supabase
    .from('site_settings')
    .select('id')
    .eq('tenant', targetTenant)
    .eq('key', 'home_hero_slides')
    .maybeSingle();

  let mutationError;
  if (existing) {
    const { error } = await supabase
      .from('site_settings')
      .update({ value: JSON.stringify(validatedSlides) })
      .eq('tenant', targetTenant)
      .eq('key', 'home_hero_slides');
    mutationError = error;
  } else {
    const { error } = await supabase
      .from('site_settings')
      .upsert(
        {
          tenant: targetTenant,
          key: 'home_hero_slides',
          value: JSON.stringify(validatedSlides),
          description: 'Diapositivas y banners configurables para el Hero Slider principal',
        },
        { onConflict: 'tenant,key' }
      );
    mutationError = error;
  }

  if (mutationError) {
    console.error('Error updating hero slides:', mutationError);
    return { error: mutationError.message };
  }

  revalidatePath('/', 'layout');
  revalidatePath('/admin/settings');
  return { success: true };
}

export async function saveHeroSlidesDirect(tenant: BrandId, slides: HeroSlide[]): Promise<{ success?: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  const targetTenant: BrandId = (tenant === 'mta' || tenant === 'sonqo') ? tenant : 'mta';

  for (const s of slides) {
    assertValidHeroSlide(s);
  }

  const { data: existing } = await supabase
    .from('site_settings')
    .select('id')
    .eq('tenant', targetTenant)
    .eq('key', 'home_hero_slides')
    .maybeSingle();

  let mutationError;
  if (existing) {
    const { error } = await supabase
      .from('site_settings')
      .update({ value: JSON.stringify(slides) })
      .eq('tenant', targetTenant)
      .eq('key', 'home_hero_slides');
    mutationError = error;
  } else {
    const { error } = await supabase
      .from('site_settings')
      .upsert(
        {
          tenant: targetTenant,
          key: 'home_hero_slides',
          value: JSON.stringify(slides),
          description: 'Diapositivas y banners configurables para el Hero Slider principal',
        },
        { onConflict: 'tenant,key' }
      );
    mutationError = error;
  }

  if (mutationError) {
    console.error('Error saving hero slides:', mutationError);
    return { error: mutationError.message };
  }

  revalidatePath('/', 'layout');
  revalidatePath('/admin/settings');
  return { success: true };
}
