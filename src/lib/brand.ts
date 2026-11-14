export type BrandId = 'sonqo' | 'mta';

export interface BrandConfig {
  id: BrandId;
  name: string;
  shortName: string;
  legalName: string;
  ruc: string;
  minceturRegistrationCode?: string;
  gerceturAccreditation?: string;
  bookingPrefix: string;
  domain: string;
  emailDomain: string;
  logo: {
    alt: string;
    lightBgSrc: string;
    darkBgSrc: string;
    ogImageSrc: string;
    sizeClass: string;
    sizesAttr: string;
    filterOnDark: string;
    filterOnLight: string;
  };
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    footerBg: string;
    accent: string;
    cta: string;
    ctaHover: string;
    white: string;
  };
  contact: {
    phone: string;
    cleanPhone: string;
    email: string;
    address: string;
  };
  social: {
    facebook: string;
    instagram: string;
    tiktok: string;
    tripadvisor: string;
  };
  adminBadgeClass: string;
}

export const BRANDS: Record<BrandId, BrandConfig> = {
  sonqo: {
    id: 'sonqo',
    name: 'Sonqo Perú Travel',
    shortName: 'Sonqo Perú Travel',
    legalName: 'Sonqo Perú Travel E.I.R.L.',
    ruc: '20616667549',
    minceturRegistrationCode: 'DIRCETUR-CUSCO-2024-00129',
    gerceturAccreditation: 'Agencia de Viajes y Turismo Registrada en GERCETUR Cusco',
    bookingPrefix: 'SNQ',
    domain: 'https://sonqoperutravel.com',
    emailDomain: 'sonqoperutravel.com',
    logo: {
      alt: 'Sonqo Perú Travel Logo',
      lightBgSrc: '/imagenes/logo-sonqo-color.png',
      darkBgSrc: '/imagenes/logo-sonqo.png',
      ogImageSrc: '/imagenes/logo-sonqo-square.png',
      sizeClass: 'w-[86px] h-[34px] sm:w-[96px] sm:h-[38px] lg:w-[108px] lg:h-[42px]',
      sizesAttr: '(max-width: 640px) 86px, (max-width: 1024px) 96px, 108px',
      filterOnDark: '',
      filterOnLight: '',
    },
    colors: {
      primary: '#8B66E8',
      primaryLight: '#A485F0',
      primaryDark: '#213E4C',
      footerBg: '#213E4C',
      accent: '#8B66E8',
      cta: '#8B66E8',
      ctaHover: '#734FD1',
      white: '#FFFFFF',
    },
    contact: {
      phone: '+51 984 228 417',
      cleanPhone: '51984228417',
      email: 'sonqoperutravel@gmail.com',
      address: 'Cal. Fernando Túpac Amaru Mz. LL Lote 3, Urb. Túpac Amaru, Cusco, Perú',
    },
    social: {
      facebook: 'https://www.facebook.com/sonqoperutravel/',
      instagram: 'https://www.instagram.com/sonqoperutravel/',
      tiktok: 'https://www.tiktok.com/@sonqoperutravel',
      tripadvisor: 'https://www.tripadvisor.com',
    },
    adminBadgeClass: 'bg-[#8B66E8]/15 text-[#8B66E8] border border-[#8B66E8]/30',
  },
  mta: {
    id: 'mta',
    name: 'Machu Picchu Travel Adventure',
    shortName: 'Machu Picchu Travel',
    legalName: 'Machu Picchu Travel Adventure E.I.R.L.',
    ruc: '20564458385',
    minceturRegistrationCode: 'DIRCETUR-CUSCO-2024-00129',
    gerceturAccreditation: 'Agencia de Viajes y Turismo Registrada en GERCETUR Cusco',
    bookingPrefix: 'MTP',
    domain: 'https://machupicchutravel.com',
    emailDomain: 'machupicchutravel.com',
    logo: {
      alt: 'Machu Picchu Travel Adventure Logo',
      lightBgSrc: '/imagenes/logo.png',
      darkBgSrc: '/imagenes/logo.png',
      ogImageSrc: '/imagenes/logo.png',
      sizeClass: 'w-[58px] h-[58px] sm:w-[68px] sm:h-[68px] lg:w-[78px] lg:h-[78px]',
      sizesAttr: '(max-width: 640px) 58px, (max-width: 1024px) 68px, 78px',
      filterOnDark: 'brightness-0 invert',
      filterOnLight: 'brightness-0',
    },
    colors: {
      primary: '#048A84',
      primaryLight: '#06C0B8',
      primaryDark: '#036B66',
      footerBg: '#1a1a2e',
      accent: '#C4A35A',
      cta: '#ff7a00',
      ctaHover: '#e06b00',
      white: '#FFFFFF',
    },
    contact: {
      phone: '+51 955 723 329',
      cleanPhone: '51955723329',
      email: 'reservasmtaperu@gmail.com',
      address: 'Av. El Sol 123, Centro Histórico, Cusco, Perú',
    },
    social: {
      facebook: 'https://www.facebook.com/MachupicchuTravelAdventure/',
      instagram: 'https://www.instagram.com/machupicchutraveladventure/',
      tiktok: 'https://www.tiktok.com/@machupicchutraveladventu?is_from_webapp=1&sender_device=pc',
      tripadvisor: 'https://www.tripadvisor.com',
    },
    adminBadgeClass: 'bg-teal-100 text-teal-800 border border-teal-200',
  },
};

export const DEFAULT_BRAND_ID: BrandId = 'mta';

export function getBrandConfig(tenantOverride?: string | null): BrandConfig {
  let raw = tenantOverride;
  if (!raw && typeof document !== 'undefined') {
    const dataBrand = document.documentElement?.getAttribute('data-brand');
    if (dataBrand) raw = dataBrand;
  }
  if (!raw) {
    raw = process.env.NEXT_PUBLIC_BRAND_TENANT || DEFAULT_BRAND_ID;
  }
  const clean = raw.toLowerCase().trim();
  if (clean === 'sonqo') {
    return BRANDS.sonqo;
  }
  return BRANDS.mta;
}

export function resolveTenantFromBooking(booking: {
  tenant?: string | null;
  booking_code?: string | null;
}): BrandConfig {
  if (booking.tenant && (booking.tenant === 'mta' || booking.tenant === 'sonqo')) {
    return BRANDS[booking.tenant];
  }
  if (booking.booking_code?.startsWith('SNQ-')) {
    return BRANDS.sonqo;
  }
  if (booking.booking_code?.startsWith('MTP-')) {
    return BRANDS.mta;
  }
  return getBrandConfig();
}

export function applyBrandToMessages<T>(messages: T, brand: BrandConfig = getBrandConfig()): T {
  if (brand.id === 'mta') {
    return messages;
  }

  const transformValue = (val: unknown): unknown => {
    if (typeof val === 'string') {
      return val
        .replace(/Machu\s*Picchu\s*Travel\s*Adventure\s*E\.I\.R\.L\./gi, brand.legalName)
        .replace(/Machu\s*Picchu\s*Travel\s*Adventures?/gi, brand.name)
        .replace(/Machu\s*Picchu\s*Travel/gi, brand.shortName)
        .replace(/20564458385/g, brand.ruc)
        .replace(/reservasmtaperu@gmail\.com/gi, brand.contact.email)
        .replace(/reservas@sonqoperutravel\.com/gi, brand.contact.email)
        .replace(/https?:\/\/machupicchutravel\.com/gi, brand.domain)
        .replace(/\+51 955 723 329/g, brand.contact.phone)
        .replace(/Av\.\s*El\s*Sol\s*123,\s*(Centro\s*Hist[oó]rico|Historic\s*Center),\s*Cusco,\s*Per[uú]/gi, brand.contact.address);
    }
    if (Array.isArray(val)) {
      return val.map(transformValue);
    }
    if (val !== null && typeof val === 'object') {
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
        out[k] = transformValue(v);
      }
      return out;
    }
    return val;
  };

  return transformValue(messages) as T;
}

