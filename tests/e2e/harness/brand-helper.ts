/**
 * Multi-Brand Context & Public Parity Test Helpers
 * MTA vs Sonqo Perú Brand Resolution, Cookies, and Theming
 */

import { BRANDS, BrandConfig, BrandId, DEFAULT_BRAND_ID } from '@/lib/brand';
import {
  ADMIN_BRAND_COOKIE,
  getAdminActiveBrand as prodGetAdminActiveBrand,
  setAdminActiveBrand as prodSetAdminActiveBrand,
} from '@/lib/admin-brand';
import { mockCookieStore } from './env';

export class BrandHelper {
  public static readonly COOKIE_NAME = ADMIN_BRAND_COOKIE;

  /**
   * Resolves the active administrative brand using genuine getAdminActiveBrand from @/lib/admin-brand.
   */
  public static async getAdminActiveBrand(cookiesOverride?: Record<string, string>): Promise<BrandId> {
    if (cookiesOverride) {
      mockCookieStore.load(cookiesOverride);
    }
    return await prodGetAdminActiveBrand();
  }

  /**
   * Sets the active brand cookie using genuine setAdminActiveBrand from @/lib/admin-brand.
   */
  public static async setAdminActiveBrand(brandInput: string): Promise<void> {
    await prodSetAdminActiveBrand(brandInput as BrandId);
  }

  public static getCookie(name: string) {
    return mockCookieStore.get(name);
  }

  public static getCookieOptions(name: string) {
    return mockCookieStore.getOptions(name);
  }

  public static setCookie(name: string, value: string, options?: any) {
    mockCookieStore.set(name, value, options);
  }

  public static resetCookies() {
    mockCookieStore.clear();
  }

  /**
   * Resolves the active public brand tenant from HTTP Host header or query param.
   */
  public static resolvePublicBrand(options: {
    host?: string;
    searchParams?: Record<string, string>;
    envTenant?: string;
  } = {}): BrandId {
    // 1. Query param preview override
    if (options.searchParams?.['brand']) {
      const q = options.searchParams['brand'].trim().toLowerCase();
      if (q === 'sonqo') return 'sonqo';
      if (q === 'mta') return 'mta';
    }

    // 2. Host header resolution
    if (options.host) {
      const cleanHost = options.host.toLowerCase().split(':')[0]; // strip port
      if (
        cleanHost.includes('sonqoperutravel.com') ||
        cleanHost.includes('sonqo.pe') ||
        cleanHost.startsWith('sonqo.')
      ) {
        return 'sonqo';
      }
      if (
        cleanHost.includes('machupicchutravel.com') ||
        cleanHost.includes('mta.')
      ) {
        return 'mta';
      }
    }

    // 3. Environment variable fallback
    if (options.envTenant) {
      const envNorm = options.envTenant.trim().toLowerCase();
      if (envNorm === 'sonqo') return 'sonqo';
    }

    // 4. Default brand
    return DEFAULT_BRAND_ID;
  }

  /**
   * Retrieves brand configuration from BRANDS dictionary.
   */
  public static getConfig(brandId: BrandId): BrandConfig {
    return BRANDS[brandId];
  }

  /**
   * Filters a list of entities strictly by tenant ID.
   */
  public static filterByTenant<T extends { tenant: string }>(items: T[], brand: BrandId): T[] {
    return items.filter(item => item.tenant.toLowerCase() === brand.toLowerCase());
  }

  /**
   * Validates dynamic HTML theme attributes and tokens for public pages.
   */
  public static getExpectedHtmlTheme(brand: BrandId): {
    dataBrand: string;
    primaryColor: string;
    accentColor: string;
  } {
    const config = BRANDS[brand];
    return {
      dataBrand: brand,
      primaryColor: config.colors.primary,
      accentColor: config.colors.accent,
    };
  }
}
