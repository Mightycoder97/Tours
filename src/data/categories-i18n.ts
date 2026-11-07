export interface CategoryI18n {
  slug: string;
  name: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
}

export const CATEGORIES_I18N: Record<string, CategoryI18n> = {
  'aventura': {
    slug: 'aventura',
    name: {
      es: 'Aventura',
      en: 'Adventure',
    },
    description: {
      es: 'Emocionantes actividades al aire libre, cuatrimotos, zipline y deportes de aventura en los paisajes más impresionantes del Perú.',
      en: 'Thrilling outdoor activities, ATV quad biking, zipline, and adventure sports across Peru’s most breathtaking landscapes.',
    },
  },
  'city-tour': {
    slug: 'city-tour',
    name: {
      es: 'City Tour',
      en: 'City Tour',
    },
    description: {
      es: 'Recorridos guiados por centros históricos, arquitectura colonial, templos incas y miradores panorámicos urbanos.',
      en: 'Guided excursions through historic centers, colonial architecture, Inca temples, and panoramic urban viewpoints.',
    },
  },
  'cultura': {
    slug: 'cultura',
    name: {
      es: 'Cultura',
      en: 'Culture',
    },
    description: {
      es: 'Descubre el legado arqueológico de los Incas, tradiciones vivas andinas, museos y comunidades nativas ancestrales.',
      en: 'Discover the archaeological legacy of the Incas, living Andean traditions, museums, and ancestral native communities.',
    },
  },
  'gastronomia': {
    slug: 'gastronomia',
    name: {
      es: 'Gastronomía',
      en: 'Gastronomy',
    },
    description: {
      es: 'Experiencias culinarias únicas, clases de cocina tradicional, degustación de pisco sour y visitas a mercados locales peruanos.',
      en: 'Unique culinary experiences, traditional cooking classes, pisco sour tastings, and visits to vibrant local Peruvian markets.',
    },
  },
  'mistico': {
    slug: 'mistico',
    name: {
      es: 'Místico & Espiritual',
      en: 'Mystical & Spiritual',
    },
    description: {
      es: 'Ceremonias ancestrales de pago a la tierra (Pachamama), matrimonios andinos tradicionales y retiros de sanación espiritual.',
      en: 'Ancestral ceremonies honoring Mother Earth (Pachamama), traditional Andean weddings, and spiritual healing retreats.',
    },
  },
  'multi-dia': {
    slug: 'multi-dia',
    name: {
      es: 'Multi-Día',
      en: 'Multi-Day',
    },
    description: {
      es: 'Paquetes completos de viaje de 2 o más días con alojamiento, traslados y excursiones guiadas por los mejores destinos del Perú.',
      en: 'Complete multi-day travel packages of 2 or more days with accommodation, transfers, and guided excursions across Peru.',
    },
  },
  'naturaleza': {
    slug: 'naturaleza',
    name: {
      es: 'Naturaleza',
      en: 'Nature',
    },
    description: {
      es: 'Exploración de cataratas, reservas nacionales, fauna silvestre, lagunas andinas de aguas turquesas y glaciares imponentes.',
      en: 'Exploration of waterfalls, national reserves, wildlife, turquoise Andean alpine lakes, and imposing glaciers.',
    },
  },
  'trekking': {
    slug: 'trekking',
    name: {
      es: 'Trekking',
      en: 'Trekking',
    },
    description: {
      es: 'Rutas de caminata de un día y expediciones de montaña a maravillas naturales como Vinicunca, Humantay y Ausangate.',
      en: 'Day hikes and mountain expeditions to iconic natural wonders including Rainbow Mountain, Humantay Lake, and Ausangate.',
    },
  },
};

export function localizeCategoryName(categoryNameOrSlug: string | undefined | null, locale: string): string {
  if (!categoryNameOrSlug) return '';
  const normalized = categoryNameOrSlug.toLowerCase().trim();
  
  // Try direct slug match
  if (CATEGORIES_I18N[normalized]) {
    return locale === 'en' ? CATEGORIES_I18N[normalized].name.en : CATEGORIES_I18N[normalized].name.es;
  }
  
  // Try match by Spanish name
  const found = Object.values(CATEGORIES_I18N).find(
    c => c.name.es.toLowerCase() === normalized || c.slug === normalized
  );
  if (found) {
    return locale === 'en' ? found.name.en : found.name.es;
  }
  
  return categoryNameOrSlug;
}
