export interface DestinationI18n {
  slug: string;
  name: {
    es: string;
    en: string;
  };
  region: string;
  tagline: {
    es: string;
    en: string;
  };
  seoTitle: {
    es: string;
    en: string;
  };
  seoDescription: {
    es: string;
    en: string;
  };
  heroImage: string;
  altitude: string;
  bestSeason: {
    es: string;
    en: string;
  };
  highlights: {
    es: string[];
    en: string[];
  };
  overview: {
    es: string[];
    en: string[];
  };
  whyVisit: {
    es: string[];
    en: string[];
  };
}

export const DESTINATIONS_I18N: Record<string, DestinationI18n> = {
  cusco: {
    slug: 'cusco',
    name: {
      es: 'Cusco',
      en: 'Cusco',
    },
    region: 'Andes del Sur, Perú',
    tagline: {
      es: 'La Capital Arqueológica de América y Puerta de Entrada a Machu Picchu',
      en: 'The Archaeological Capital of the Americas & Gateway to Machu Picchu',
    },
    seoTitle: {
      es: 'Tours en Cusco: Paquetes y Excursiones a Machu Picchu y Valle Sagrado',
      en: 'Cusco Tours: Guided Packages, Machu Picchu & Sacred Valley Excursions',
    },
    seoDescription: {
      es: 'Descubre los mejores tours en Cusco, Machu Picchu, Valle Sagrado, Laguna Humantay y Montaña de Colores. Guías oficiales certificados, salidas diarias y reservas 100% garantizadas.',
      en: 'Explore premier Cusco tours including Machu Picchu full day, Sacred Valley, Humantay Lake, and Rainbow Mountain. Certified official local guides, daily departures, and 100% guaranteed booking.',
    },
    heroImage: '/imagenes/hero-machupicchu.png',
    altitude: '3,399 m s. n. m. (11,152 ft)',
    bestSeason: {
      es: 'Mayo a Octubre (Temporada seca con cielos despejados)',
      en: 'May to October (Dry season with clear blue skies)',
    },
    highlights: {
      es: [
        'Ciudadela Sagrada de Machu Picchu (Maravilla del Mundo Moderno)',
        'Valle Sagrado de los Incas: Pisac, Ollantaytambo y Moray',
        'Montaña de los 7 Colores (Vinicunca y Palcoyo)',
        'Laguna Turquesa de Humantay al pie del nevado Salkantay',
        'Centro Histórico del Cusco, Qorikancha y Fortaleza de Sacsayhuamán',
      ],
      en: [
        'Machu Picchu Historic Sanctuary (Wonder of the Modern World)',
        'Sacred Valley of the Incas: Pisac, Ollantaytambo, and Moray',
        'Rainbow Mountain of 7 Colors (Vinicunca & Palcoyo)',
        'Turquoise alpine waters of Humantay Lake beneath Salkantay glacier',
        'Historic Downtown Cusco, Qorikancha, and Sacsayhuamán Fortress',
      ],
    },
    overview: {
      es: [
        'Cusco, conocida ancestralmente como el "Ombligo del Mundo", es el corazón cultural e histórico del Perú y uno de los destinos turísticos más fascinantes del planeta. Antigua capital del Imperio Inca (Tahuantinsuyo) y joya arquitectónica virreinal, la ciudad combina imponentes muros megalíticos con casonas e iglesias coloniales de singular belleza.',
        'Desde Cusco parten las rutas hacia la mística ciudadela de Machu Picchu, a través de pintorescos viajes en tren panorámico o legendarios caminos de herradura como el Camino Inca y la ruta Salkantay. Además, sus valles interandinos albergan terrazas agrícolas como Moray, las salineras milenarias de Maras y pueblos llenos de vida y tradición textil.',
        'Nuestros paquetes turísticos en Cusco están cuidadosamente diseñados para ofrecer experiencias auténticas, con grupos reducidos, transporte turístico moderno, guías locales certificados y asistencia permanente para una aclimatación confortable y segura.',
      ],
      en: [
        'Cusco, historically revered as the "Navel of the World", represents the cultural and archaeological heart of Peru and one of the world’s most mesmerizing destinations. As the imperial capital of the Inca Empire (Tahuantinsuyo) and later a colonial jewel, the city seamlessly weaves megalithic stone foundations with Spanish baroque architecture.',
        'From Cusco, travelers embark on unforgettable journeys to the mystical sanctuary of Machu Picchu, via scenic panoramic railway expeditions or world-renowned hiking trails such as the Classic Inca Trail and Salkantay Trek. The surrounding Sacred Valley unfolds agricultural marvels at Moray, ancient salt evaporation ponds at Maras, and vibrant textile artisan hamlets.',
        'Our curated Cusco tour packages feature small-group departures, modern sanitized transportation, licensed bilingual tour guides, and proactive high-altitude acclimation support to guarantee a seamless, deeply enriching travel experience.',
      ],
    },
    whyVisit: {
      es: [
        'Acceso directo a la maravilla arqueológica de Machu Picchu.',
        'Incomparable legado histórico y arquitectura andino-colonial.',
        'Diversidad de aventuras: trekking, cuatrimotos, caminatas y fotografía.',
        'Vibrante gastronomía novoandina y mercados artesanales tradicionales.',
      ],
      en: [
        'Direct gateway to the archaeological wonder of Machu Picchu.',
        'Incomparable fusion of Inca craftsmanship and Spanish colonial artistry.',
        'Rich variety of excursions: alpine trekking, ATV tours, and cultural photography.',
        'Award-winning Novoandina gastronomy and vibrant traditional artisan markets.',
      ],
    },
  },

  lima: {
    slug: 'lima',
    name: {
      es: 'Lima',
      en: 'Lima',
    },
    region: 'Costa Central, Perú',
    tagline: {
      es: 'Capital Gastronómica de Latinoamérica frente al Océano Pacífico',
      en: 'The Gastronomic Capital of the Americas Overlooking the Pacific Ocean',
    },
    seoTitle: {
      es: 'Tours en Lima: City Tour, Huacachina, Islas Ballestas y Gastronomía',
      en: 'Lima Tours: City Tours, Huacachina Oasis, Ballestas Islands & Food Tours',
    },
    seoDescription: {
      es: 'Reserva los mejores tours en Lima y excursiones full day a Paracas, Huacachina, Líneas de Nazca y Pachacámac. Degusta la mejor gastronomía y recorre el centro colonial.',
      en: 'Book top-rated Lima day tours and full-day excursions to Paracas, Huacachina Desert Oasis, Nazca Lines, and Pachacámac. Savor world-class culinary tours and historic districts.',
    },
    heroImage: '/imagenes/hero-machupicchu-1.png',
    altitude: '0 - 150 m s. n. m. (Nivel del mar)',
    bestSeason: {
      es: 'Diciembre a Abril (Verano soleado y cálido frente al mar)',
      en: 'December to April (Sunny coastal summer with warm ocean breezes)',
    },
    highlights: {
      es: [
        'Centro Histórico de Lima, Plaza Mayor y Catacumbas de San Francisco',
        'Excursión Full Day Paracas, Islas Ballestas y Oasis de Huacachina',
        'Sobrevuelo a las enigmáticas Líneas de Nazca',
        'Museo Larco y su invaluable colección de arte precolombino',
        'Tours gastronómicos por los distritos bohemios de Barranco y Miraflores',
      ],
      en: [
        'Historic Downtown Lima, Plaza Mayor, and San Francisco Catacombs',
        'Full-day expedition to Paracas Marine Reserve and Huacachina Desert Oasis',
        'Scenic flight over the enigmatic UNESCO Nazca Lines',
        'Larco Museum with its world-class pre-Columbian gold and ceramic collection',
        'Signature culinary tasting tours through bohemian Barranco and Miraflores',
      ],
    },
    overview: {
      es: [
        'Lima, conocida como la "Ciudad de los Reyes", es la vibrante capital del Perú y el principal punto de ingreso al país. Situada sobre acantilados que dominan el Océano Pacífico, es la única capital sudamericana con vistas panorámicas al mar y un fascinante cruce de épocas prehispánica, colonial y cosmopolita contemporánea.',
        'Famosa a nivel global como la capital gastronómica indiscutible de América, Lima alberga restaurantes clasificados entre los mejores del mundo, así como una rica tradición de huariques, cevicherías costeras y mercados de insumos frescos de la costa, sierra y selva.',
        'Nuestros tours desde Lima incluyen recorridos culturales por conventos y santuarios prehispánicos como Pachacámac, además de emocionantes excursiones de un día hacia el sur: navegación por las Islas Ballestas, sandboarding en las dunas de Huacachina y sobrevuelos a las milenarias Líneas de Nazca.',
      ],
      en: [
        'Lima, historically christened the "City of Kings", is Peru’s dynamic coastal capital and principal international gateway. Perched atop dramatic cliffs overlooking the Pacific Ocean, it is the only South American capital bordering the sea, presenting a captivating synthesis of pre-Hispanic temples, opulent viceregal mansions, and contemporary sophistication.',
        'Celebrated worldwide as the gastronomic capital of Latin America, Lima is home to globally acclaimed Michelin-caliber dining as well as authentic neighborhood cevicherías, pisco bars, and lively produce markets brimming with ingredients from the Andes and Amazon.',
        'Our Lima tours encompass in-depth cultural itineraries through UNESCO-listed convents and pre-Inca ceremonial complexes like Pachacámac, alongside exhilarating full-day coastal getaways: wildlife boat safaris at the Ballestas Islands, desert dune buggy thrills in Huacachina, and breathtaking flights across the Nazca Lines.',
      ],
    },
    whyVisit: {
      es: [
        'Capital culinaria de renombre mundial con restaurantes de clase global.',
        'Fascinante patrimonio virreinal y museos con tesoros de oro preinca.',
        'Excursiones full day a oasis desérticos y fauna marina protegida.',
        'Modernos malecones con parques y vistas espectaculares al Pacífico.',
      ],
      en: [
        'World-renowned gastronomic powerhouse with celebrated culinary hotspots.',
        'Rich viceregal heritage, UNESCO plazas, and pre-Columbian gold treasures.',
        'Convenient day trips to coastal desert dunes, wildlife reserves, and Nazca.',
        'Stunning clifftop promenades and ocean sunsets across Miraflores.',
      ],
    },
  },

  arequipa: {
    slug: 'arequipa',
    name: {
      es: 'Arequipa',
      en: 'Arequipa',
    },
    region: 'Sur del Perú',
    tagline: {
      es: 'La Majestuosa Ciudad Blanca al Pie de los Volcanes Misti y Chachani',
      en: 'The White City of Sillar Architecture Framed by Dramatic Volcanoes',
    },
    seoTitle: {
      es: 'Tours en Arequipa y Cañón del Colca: Excursiones y Trekking Guiado',
      en: 'Arequipa & Colca Canyon Tours: Guided Day Trips, Trekking & Mirabús',
    },
    seoDescription: {
      es: 'Explora Arequipa, el Monasterio de Santa Catalina y el Cañón del Colca para observar el majestuoso vuelo del cóndor andino. Reserva excursiones en mirabús, sillar y trekking.',
      en: 'Explore Arequipa’s sillar historic center, Santa Catalina Monastery, and deep Colca Canyon to witness the majestic Andean condor in flight. Book guided treks and day trips.',
    },
    heroImage: '/tours/arequipa/tour-campina-arequipena-mirabus/01.jpg',
    altitude: '2,325 m s. n. m. (7,628 ft)',
    bestSeason: {
      es: 'Abril a Noviembre (Clima templado, seco y con sol radiante)',
      en: 'April to November (Temperate, dry climate with abundant sunshine)',
    },
    highlights: {
      es: [
        'Cañón del Colca: observación del Vuelo del Cóndor en Cruz del Cóndor',
        'Monasterio de Santa Catalina de Siena (ciudadela religiosa de sillar)',
        'Ruta del Sillar en las canteras volcánicas de Añashuayco',
        'Miradores de Yanahuara y Carmen Alto con vistas al volcán Misti',
        'Reserva Nacional de Salinas y Aguada Blanca con vicuñas y flamencos',
      ],
      en: [
        'Colca Canyon: breathtaking Andean Condor flight viewing at Cruz del Cóndor',
        'Santa Catalina Monastery (a vibrant sillar citadel within the city)',
        'The Sillar Route through the active volcanic ash quarries of Añashuayco',
        'Yanahuara and Carmen Alto arches with panoramic views of Misti Volcano',
        'Salinas and Aguada Blanca National Reserve with wild vicuñas and flamingos',
      ],
    },
    overview: {
      es: [
        'Arequipa, la segunda urbe más importante del Perú, deslumbra a los visitantes por su arquitectura colonial esculpida en sillar, una piedra volcánica blanca extraída de las faldas de los volcanes Misti, Chachani y Pichu Pichu. Su centro histórico, declarado Patrimonio Cultural de la Humanidad por la UNESCO, conserva casonas señoriales y monasterios únicos en el mundo.',
        'A pocas horas de la ciudad se despliega el imponente Cañón del Colca, uno de los más profundos del globo terráqueo. En este valle milenario habitan comunidades que aún cultivan terrazas agrícolas preincas y donde cada mañana se presencia el majestuoso vuelo del cóndor andino sobre abismos de más de 3,000 metros.',
        'Nuestros itinerarios en Arequipa comprenden recorridos por la campiña arequipeña, circuitos de aventura como rafting en el río Chili, cataratas de Pillones y expediciones de trekking de 2 y 3 días al interior del Cañón del Colca.',
      ],
      en: [
        'Arequipa, Peru’s second city, charms global travelers with its resplendent colonial core crafted from sillar—a luminous white volcanic ignimbrite quarried from the surrounding guardians: Misti, Chachani, and Pichu Pichu volcanoes. Designated a UNESCO World Heritage site, its streets boast ornate convents and storied solar mansions.',
        'Just beyond the highland plateau lies the legendary Colca Canyon, more than twice as deep as the Grand Canyon. Ancient Collagua and Cabana communities preserve stepped pre-Inca terraces, while early mornings at the Cruz del Cóndor viewpoint offer unforgettable encounters with wild Andean condors ascending thermal updrafts.',
        'Our Arequipa tour collection features open-top scenic Mirabús excursions, Chili River whitewater rafting, volcanic Sillar quarry explorations, Pillones waterfalls, and 2 to 3-day deep canyon trekking itineraries.',
      ],
    },
    whyVisit: {
      es: [
        'Arquitectura única en el mundo esculpida en piedra volcánica blanca.',
        'El avistamiento más cercano del majestuoso cóndor andino en el Colca.',
        'Deliciosa tradición picantera con platos emblemáticos como el rocoto relleno.',
        'Clima soleado durante prácticamente todo el año.',
      ],
      en: [
        'Unique architectural wonder built with luminous volcanic sillar stone.',
        'The premier destination in South America to view Andean condors in flight.',
        'Celebrated picantería dining tradition serving delicacies like rocoto relleno.',
        'Dry, sun-drenched weather and clear skies nearly 300 days a year.',
      ],
    },
  },

  puno: {
    slug: 'puno',
    name: {
      es: 'Puno',
      en: 'Puno',
    },
    region: 'Altiplano del Sur, Perú',
    tagline: {
      es: 'Capital del Folclore Peruano a Orillas del Místico Lago Titicaca',
      en: 'The Folklore Capital of Peru on the Sacred Waters of Lake Titicaca',
    },
    seoTitle: {
      es: 'Tours en Puno y Lago Titicaca: Islas Uros, Taquile, Amantaní y Sillustani',
      en: 'Puno & Lake Titicaca Tours: Uros Floating Islands, Taquile & Sillustani',
    },
    seoDescription: {
      es: 'Descubre el Lago Titicaca con tours a las Islas Flotantes de los Uros, Taquile y Amantaní. Conoce las Chullpas de Sillustani y la rica tradición cultural del altiplano.',
      en: 'Experience Lake Titicaca with guided boat tours to the Uros Floating Reed Islands, Taquile, and Amantaní. Discover Sillustani funerary towers and high-plateau folklore.',
    },
    heroImage: '/tours/puno/puno-full-day-uros-taquile/01.jpg',
    altitude: '3,812 m s. n. m. (12,507 ft)',
    bestSeason: {
      es: 'Mayo a Octubre (Días despejados y noches frías con cielos estrellados)',
      en: 'May to October (Crisp clear sunny days and star-filled night skies)',
    },
    highlights: {
      es: [
        'Navegación por el Lago Titicaca, el lago navegable más alto del mundo',
        'Islas Flotantes de Totora de los Uros y sus tradiciones ancestrales',
        'Isla de Taquile: arte textil reconocido como Patrimonio Inmaterial de la Humanidad',
        'Turismo vivencial y pernocte comunitario en la Isla de Amantaní',
        'Complejo Arqueológico de Sillustani y sus enigmáticas chullpas funerarias',
      ],
      en: [
        'Boat navigation across Lake Titicaca, the highest navigable lake on Earth',
        'Floating totora reed islands of the Uros people and their ancient way of life',
        'Taquile Island: celebrated textile art recognized as UNESCO Intangible Heritage',
        'Experiential community homestays and stargazing on Amantaní Island',
        'Sillustani Archaeological Site with its towering pre-Inca funerary chullpas',
      ],
    },
    overview: {
      es: [
        'Puno, situada en el vasto altiplano andino a más de 3,800 metros de altura, es la Capital del Folclore Peruano y la cuna mítica de la civilización incaica. Según la leyenda ancestral, de las aguas sagradas del Lago Titicaca emergieron Manco Cápac y Mama Ocllo para fundar el Imperio de los Incas.',
        'El Lago Titicaca es el lago navegable más alto del planeta y un ecosistema de impresionante belleza con aguas azul profundo reflejando el cielo andino. Sus habitantes conservan dialectos quechuas y aymaras, vestimentas coloridas y singulares formas de vida en islas flotantes de totora construidas a mano.',
        'Nuestros tours en Puno ofrecen lanchas rápidas modernas, experiencias de turismo comunitario auténticas, visitas a las torres funerarias preincas de Sillustani y combinaciones ideales para continuar el viaje hacia Cusco o La Paz.',
      ],
      en: [
        'Puno, situated upon the expansive Andean high plateau at over 3,800 meters elevation, is officially celebrated as the Folklore Capital of Peru and the mythical birthplace of Inca civilization. Legend recounts that Manco Cápac and Mama Ocllo emerged from Lake Titicaca’s sacred waters to establish the Inca Empire.',
        'Lake Titicaca is the highest navigable alpine lake on Earth, showcasing sapphire blue waters framed by distant snow-capped Royal Mountain peaks. Its communities preserve centuries-old Quechua and Aymara customs, vibrant folkloric celebrations, and unique engineering like the hand-woven totora floating islands of the Uros.',
        'Our Puno itineraries feature comfortable modern speedboats, authentic family-hosted cultural homestays, private excursions to the sacred funerary towers of Sillustani, and seamless connections between Cusco and Bolivia.',
      ],
    },
    whyVisit: {
      es: [
        'Navegar en las aguas sagradas del lago navegable más alto del mundo.',
        'Aprender cómo se construyen y sostienen las islas flotantes de totora.',
        'Textiles de Taquile galardonados por la UNESCO por su refinada técnica.',
        'Vivir la mayor riqueza dancística y folclórica de todo el Perú.',
      ],
      en: [
        'Sail the tranquil waters of the highest navigable lake in the world.',
        'Walk upon handwoven totora reeds and witness ancient floating communities.',
        'Admire intricate textile masterpieces on Taquile, honored by UNESCO.',
        'Immerse in Peru’s most vibrant living folklore, music, and cultural warmth.',
      ],
    },
  },
};

export function getDestinationBySlug(slug: string): DestinationI18n | undefined {
  if (!slug) return undefined;
  return DESTINATIONS_I18N[slug.toLowerCase().trim()];
}

export function localizeDestinationName(destNameOrSlug: string | undefined | null, locale: string): string {
  if (!destNameOrSlug) return '';
  const normalized = destNameOrSlug.toLowerCase().trim();
  
  if (DESTINATIONS_I18N[normalized]) {
    return locale === 'en' ? DESTINATIONS_I18N[normalized].name.en : DESTINATIONS_I18N[normalized].name.es;
  }
  
  const found = Object.values(DESTINATIONS_I18N).find(
    d => d.name.es.toLowerCase() === normalized || d.slug === normalized
  );
  if (found) {
    return locale === 'en' ? found.name.en : found.name.es;
  }
  
  return destNameOrSlug;
}
