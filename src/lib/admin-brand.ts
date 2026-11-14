import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { BrandId, DEFAULT_BRAND_ID } from './brand';

export const ADMIN_BRAND_COOKIE = 'admin_brand';

/**
 * Resolves the current active administrative brand from cookie context.
 * Adheres to PROJECT.md interface contract: defaults to 'mta'.
 */
export async function getAdminActiveBrand(): Promise<BrandId> {
  try {
    const cookieStore = await cookies();
    const raw = cookieStore.get(ADMIN_BRAND_COOKIE)?.value?.toLowerCase().trim();
    if (raw === 'sonqo') return 'sonqo';
    if (raw === 'mta') return 'mta';
    return DEFAULT_BRAND_ID;
  } catch {
    return DEFAULT_BRAND_ID;
  }
}

/**
 * Sets the active administrative brand in the cookie and revalidates /admin paths.
 */
export async function setAdminActiveBrand(brand: BrandId): Promise<void> {
  if (brand !== 'mta' && brand !== 'sonqo') {
    throw new Error(`Invalid brand identifier "${brand}". Must be 'mta' or 'sonqo'.`);
  }
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_BRAND_COOKIE, brand, {
    path: '/',
    httpOnly: false,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  try {
    revalidatePath('/admin', 'layout');
  } catch {
    // In standalone or test context where revalidatePath is unavailable, ignore gracefully
  }
}
