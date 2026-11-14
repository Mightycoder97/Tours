/**
 * src/lib/visual-assets.ts
 * Visual assets and hero slider banner configuration utilities.
 */

export interface HeroSlide {
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  cta?: string;
}

export function assertValidHeroSlide(slide: unknown): asserts slide is HeroSlide {
  if (typeof slide !== 'object' || slide === null) {
    throw new Error(`Hero slide must be a non-null object, received ${typeof slide}`);
  }
  const s = slide as Record<string, unknown>;
  if (typeof s.title !== 'string' || s.title.trim() === '') {
    throw new Error('Hero slide must have a non-empty string title');
  }
  if (typeof s.image !== 'string' || s.image.trim() === '') {
    throw new Error('Hero slide must have a non-empty string image URL/path');
  }
  if (s.subtitle !== undefined && typeof s.subtitle !== 'string') {
    throw new Error('Hero slide subtitle must be a string if provided');
  }
  if (s.link !== undefined && typeof s.link !== 'string') {
    throw new Error('Hero slide link must be a string if provided');
  }
  if (s.cta !== undefined && typeof s.cta !== 'string') {
    throw new Error('Hero slide cta must be a string if provided');
  }
}

export function assertValidHeroSlidesJson(rawJson: string): HeroSlide[] {
  if (typeof rawJson !== 'string') {
    throw new Error('Hero slides JSON must be a string');
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawJson);
  } catch (err: any) {
    throw new Error(`Invalid JSON syntax in hero slides setting: ${err.message}`);
  }
  if (!Array.isArray(parsed)) {
    throw new Error('Hero slides setting JSON must parse to an array');
  }
  for (const slide of parsed) {
    assertValidHeroSlide(slide);
  }
  return parsed;
}

export function validateHeroSlide(slide: unknown): asserts slide is HeroSlide {
  assertValidHeroSlide(slide);
}
export const parseHeroSlidesJson = assertValidHeroSlidesJson;

export const DEFAULT_HERO_SLIDES: Record<'mta' | 'sonqo', HeroSlide[]> = {
  mta: [
    {
      title: 'Machu Picchu Travel Adventures',
      subtitle: 'Descubre la magia de los Andes con expertos locales',
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2600&auto=format&fit=crop',
      link: '/tours',
      cta: 'Ver Tours',
    },
    {
      title: 'Camino Inca Legendario',
      subtitle: 'La ruta de trekking más emblemática de Sudamérica',
      image: '/imagenes/hero-camino-inca.png',
      link: '/tours/camino-inca-clasico',
      cta: 'Explorar Ruta',
    },
  ],
  sonqo: [
    {
      title: 'Sonqo Perú Travel',
      subtitle: 'Experiencias culturales y místicas en el corazón del Imperio',
      image: '/imagenes/hero-machupicchu-1.png',
      link: '/tours',
      cta: 'Descubrir Sonqo',
    },
  ],
};

export function getFallbackHeroSlides(tenant: 'mta' | 'sonqo' = 'mta'): HeroSlide[] {
  return DEFAULT_HERO_SLIDES[tenant] || DEFAULT_HERO_SLIDES.mta;
}
