/**
 * Tours Content Engine (ES / EN)
 * Complete localized content for all active tours: titles, descriptions, inclusions, and itineraries.
 */

export interface TourDayItinerary {
  day: number;
  title: string;
  description: string;
}

export interface TourLocalizedDetails {
  title: string;
  tag: string;
  location: string;
  description: string;
  inclusions: string[];
  itinerary: TourDayItinerary[];
}

export interface TourContentItem {
  title: { es: string; en: string };
  tag: { es: string; en: string };
  location: { es: string; en: string };
  description: { es: string; en: string };
  inclusions: { es: string[]; en: string[] };
  itinerary: { es: TourDayItinerary[]; en: TourDayItinerary[] };
}

export const TOURS_CONTENT: Record<string, TourContentItem> = {
  "7-lagunas-de-ausangate-full-day": {
    "title": {
      "es": "7 Lagunas de Ausangate Full Day",
      "en": "7 Lakes of Ausangate Full Day Trek"
    },
    "tag": {
      "es": "Aventura",
      "en": "Adventure"
    },
    "location": {
      "es": "Ausangate, Cusco",
      "en": "Ausangate, Cusco"
    },
    "description": {
      "es": "Explora uno de los paisajes más espectaculares de los Andes peruanos en una aventura rodeada de montañas nevadas, lagunas de intensos colores turquesa, verde y azul, y una increíble biodiversidad altoandina. Recorre las impresionantes 7 Lagunas de Ausangate y relájate en las aguas termales de Pacchanta.",
      "en": "Experience an unforgettable journey with the 7 Lakes of Ausangate Full Day Trek. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico ida y vuelta desde su hotel en Cusco",
        "Guía profesional bilingüe certificado (español e inglés)",
        "Desayuno buffet energético y almuerzo buffet novoandino",
        "Botiquín de primeros auxilios y balón de oxígeno medicinal",
        "Bastones de trekking para la caminata",
        "Boleto de ingreso a la comunidad y atractivo natural"
      ],
      "en": [
        "Round-trip tourist transport from your hotel in Cusco",
        "Certified bilingual professional guide (English and Spanish)",
        "Nutritious buffet breakfast and Novoandina buffet lunch",
        "First aid kit and portable medical oxygen tank",
        "Trekking poles for the hiking trail",
        "Entrance tickets to local communities and natural site"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en 7 Lagunas de Ausangate Full Day",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Ausangate, Cusco, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of 7 Lakes of Ausangate Full Day Trek",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Ausangate, Cusco, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "canon-del-colca-2-dias-1-noche": {
    "title": {
      "es": "Cañón del Colca 2 Días / 1 Noche",
      "en": "Colca Canyon 2 Days / 1 Night"
    },
    "tag": {
      "es": "Multi-Día",
      "en": "Multi-Day Expedition"
    },
    "location": {
      "es": "Chivay y Valle del Colca, Arequipa",
      "en": "Chivay & Colca Valley, Arequipa"
    },
    "description": {
      "es": "Vive una experiencia inolvidable explorando el espectacular Cañón del Colca en un recorrido de dos días. Disfruta de impresionantes paisajes andinos, observa vicuñas en su hábitat natural, relájate en los baños termales de La Calera y contempla el majestuoso vuelo del cóndor desde la famosa Cruz del Cóndor.",
      "en": "Experience an unforgettable journey with the Colca Canyon 2 Days / 1 Night. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico ida y vuelta desde Arequipa",
        "Guía profesional oficial de turismo bilingüe",
        "Alojamiento seleccionado en Chivay o Yanque (según categoría)",
        "Desayuno continental o buffet",
        "Visita a la Cruz del Cóndor para avistamiento de aves",
        "Paradas en los miradores de volcanes y Reserva Salinas y Aguada Blanca"
      ],
      "en": [
        "Round-trip tourist transportation from Arequipa",
        "Certified bilingual professional tour guide",
        "Selected hotel accommodation in Chivay or Yanque",
        "Continental or buffet breakfast included",
        "Guided visit to Cruz del Cóndor for Andean condor flight viewing",
        "Scenic photo stops at Volcano Viewpoint and Salinas & Aguada Blanca Reserve"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Arequipa - Pampa Cañahuas - Mirador de los Volcanes - Chivay",
          "description": "Salida de Arequipa atravesando la Reserva Nacional de Salinas y Aguada Blanca observando vicuñas en libertad. Parada en Patapampa a 4,910 m s. n. m. para divisar los volcanes Sabancaya y Ampato. Llegada a Chivay, almuerzo tradicional, acomodación en el hotel y tarde de relajación en las aguas termales de La Calera. Cena con show de danzas folclóricas."
        },
        {
          "day": 2,
          "title": "Mirador Cruz del Cóndor - Pueblos Tradicionales - Retorno a Arequipa",
          "description": "Desayuno temprano y partida hacia la Cruz del Cóndor para presenciar el despertar y majestuoso planeo de los cóndores andinos sobre el cañón más profundo de América. Retorno pasando por los pintorescos pueblos coloniales de Pinchollo, Maca y Yanque con sus terrazas incas intactas. Almuerzo en Chivay y viaje de regreso a Arequipa llegando a las 17:30 hrs."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Arequipa - Pampa Cañahuas Vicuña Reserve - Volcano Lookout - Chivay",
          "description": "Depart Arequipa climbing through Salinas & Aguada Blanca Reserve to observe wild vicuñas and alpacas. Cross the high Patapampa Pass (4,910 m / 16,108 ft) admiring smoking Sabancaya and snow-capped Ampato. Descend to Chivay for lunch and hotel check-in. In the afternoon, soothe in the thermal hot springs of La Calera followed by an authentic Andean folk dinner show."
        },
        {
          "day": 2,
          "title": "Cruz del Cóndor Viewpoint - Ancient Valley Villages - Arequipa Return",
          "description": "Early breakfast and drive along the canyon rim to the famed Cruz del Cóndor viewpoint. Marvel at giant Andean condors riding thermal mountain breezes over abyssal cliffs. Stop at ancestral Collagua villages like Pinchollo, Maca, and Yanque featuring centuries-old church facades and working Inca terraces. Enjoy lunch in Chivay before returning to Arequipa by 17:30 hrs."
        }
      ]
    }
  },
  "catarata-de-pillones": {
    "title": {
      "es": "Catarata de Pillones",
      "en": "Pillones Waterfall Day Tour"
    },
    "tag": {
      "es": "Naturaleza",
      "en": "Nature"
    },
    "location": {
      "es": "Pillones, Arequipa",
      "en": "Pillones, Arequipa"
    },
    "description": {
      "es": "Descubre uno de los paisajes naturales más sorprendentes de Arequipa en una excursión llena de aventura y naturaleza. Recorre la Reserva Nacional Salinas y Aguada Blanca, admira el impresionante Bosque de Piedras de Puruña y llega hasta la espectacular Catarata de Pillones, donde el agua ha moldeado increíbles formaciones rocosas.",
      "en": "Experience an unforgettable journey with the Pillones Waterfall Day Tour. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico cómodo con aire acondicionado",
        "Guía oficial de turismo bilingüe colegiado",
        "Recojo y retorno en hoteles céntricos",
        "Entradas y boletos de acceso a los templos y atractivos",
        "Asistencia personalizada durante todo el recorrido"
      ],
      "en": [
        "Comfortable tourist transportation with air conditioning",
        "Certified bilingual official tour guide",
        "Pickup and drop-off at downtown hotels",
        "Admission tickets to featured temples and monuments",
        "Personalized assistance throughout the excursion"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Catarata de Pillones",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Pillones, Arequipa, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Pillones Waterfall Day Tour",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Pillones, Arequipa, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "circuito-magico-de-aguas": {
    "title": {
      "es": "Circuito Mágico de Aguas",
      "en": "Magic Water Circuit & Fountain Light Show"
    },
    "tag": {
      "es": "Nocturno",
      "en": "Night Tour"
    },
    "location": {
      "es": "Lima",
      "en": "Lima"
    },
    "description": {
      "es": "Disfruta de una noche inolvidable en el impresionante Circuito Mágico del Agua, reconocido por Guinness World Records como el complejo de fuentes más grande del mundo. Maravíllate con espectaculares juegos de agua, luces y música en el hermoso Parque de la Reserva, uno de los atractivos más visitados de Lima.",
      "en": "Experience an unforgettable journey with the Magic Water Circuit & Fountain Light Show. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico moderno con chofer profesional",
        "Guía oficial de turismo bilingüe acreditado",
        "Entradas a museos y conventos incluidos en el itinerario",
        "Recojo y retorno en hoteles de Miraflores, San Isidro o Barranco",
        "Degustación o botella de agua mineral"
      ],
      "en": [
        "Modern tourist vehicle with licensed professional driver",
        "Accredited bilingual official tour guide",
        "Admission tickets to museums and convents on the itinerary",
        "Hotel pickup and drop-off in Miraflores, San Isidro, or Barranco",
        "Mineral water and cultural snack or tasting"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Circuito Mágico de Aguas",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Lima, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Magic Water Circuit & Fountain Light Show",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Lima, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "city-tour-arequipa-half-day": {
    "title": {
      "es": "City Tour Arequipa (Half Day)",
      "en": "Arequipa Half Day City Tour"
    },
    "tag": {
      "es": "Popular",
      "en": "Popular"
    },
    "location": {
      "es": "Arequipa",
      "en": "Arequipa"
    },
    "description": {
      "es": "Recorre la encantadora Ciudad Blanca y descubre su impresionante legado colonial. Visita el famoso Monasterio de Santa Catalina, la histórica Plaza de Armas, los tradicionales barrios arequipeños y los monumentos más representativos de una de las ciudades más bellas del Perú, rodeada por majestuosos volcanes.",
      "en": "Experience an unforgettable journey with the Arequipa Half Day City Tour. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico cómodo con aire acondicionado",
        "Guía oficial de turismo bilingüe colegiado",
        "Recojo y retorno en hoteles céntricos",
        "Entradas y boletos de acceso a los templos y atractivos",
        "Asistencia personalizada durante todo el recorrido"
      ],
      "en": [
        "Comfortable tourist transportation with air conditioning",
        "Certified bilingual official tour guide",
        "Pickup and drop-off at downtown hotels",
        "Admission tickets to featured temples and monuments",
        "Personalized assistance throughout the excursion"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en City Tour Arequipa (Half Day)",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Arequipa, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Arequipa Half Day City Tour",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Arequipa, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "city-tour-arequipa-yanahuara-carmen-alto": {
    "title": {
      "es": "City Tour Arequipa + Yanahuara + Carmen Alto",
      "en": "Arequipa City Tour + Yanahuara & Carmen Alto"
    },
    "tag": {
      "es": "Popular",
      "en": "Popular"
    },
    "location": {
      "es": "Arequipa",
      "en": "Arequipa"
    },
    "description": {
      "es": "Descubre la belleza de Arequipa recorriendo sus principales atractivos históricos y culturales. Disfruta de espectaculares vistas de los volcanes desde los miradores de Yanahuara y Carmen Alto, admira el impresionante Valle de Chilina y explora el emblemático Monasterio de Santa Catalina, considerado uno de los tesoros arquitectónicos más importantes del Perú.",
      "en": "Experience an unforgettable journey with the Arequipa City Tour + Yanahuara & Carmen Alto. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico cómodo con aire acondicionado",
        "Guía oficial de turismo bilingüe colegiado",
        "Recojo y retorno en hoteles céntricos",
        "Entradas y boletos de acceso a los templos y atractivos",
        "Asistencia personalizada durante todo el recorrido"
      ],
      "en": [
        "Comfortable tourist transportation with air conditioning",
        "Certified bilingual official tour guide",
        "Pickup and drop-off at downtown hotels",
        "Admission tickets to featured temples and monuments",
        "Personalized assistance throughout the excursion"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en City Tour Arequipa + Yanahuara + Carmen Alto",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Arequipa, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Arequipa City Tour + Yanahuara & Carmen Alto",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Arequipa, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "city-tour-cusco": {
    "title": {
      "es": "City Tour Cusco",
      "en": "Cusco Imperial City Tour"
    },
    "tag": {
      "es": "Clásico & Esencial",
      "en": "Classic & Essential"
    },
    "location": {
      "es": "Cusco Histórico",
      "en": "Historic Cusco"
    },
    "description": {
      "es": "Descubre la antigua capital del Imperio Inca en un recorrido lleno de historia y cultura. Visita el majestuoso Qoricancha, considerado el templo más importante del Tahuantinsuyo, y explora los impresionantes complejos arqueológicos de Sacsayhuamán, Qenqo, Pucapucara y Tambomachay.",
      "en": "Experience an unforgettable journey with the Cusco Imperial City Tour. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico cómodo con aire acondicionado",
        "Guía oficial de turismo bilingüe colegiado",
        "Recojo y retorno en hoteles céntricos",
        "Entradas y boletos de acceso a los templos y atractivos",
        "Asistencia personalizada durante todo el recorrido"
      ],
      "en": [
        "Comfortable tourist transportation with air conditioning",
        "Certified bilingual official tour guide",
        "Pickup and drop-off at downtown hotels",
        "Admission tickets to featured temples and monuments",
        "Personalized assistance throughout the excursion"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Templo del Sol (Qorikancha) y las 4 Fortalezas Incas",
          "description": "Inicio a las 13:00 hrs en el centro de Cusco. Visita al emblemático Templo de Qorikancha, máxima expresión de la arquitectura inca y colonial. Continuación en bus hacia la colosal fortaleza de Sacsayhuamán con bloques de hasta 120 toneladas, el templo ceremonial de Qenqo, la fortaleza militar de Puka Pukara y los baños rituales de agua de Tambomachay. Retorno a la Plaza Mayor a las 18:30 hrs."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Qorikancha Sun Temple & 4 Monumental Inca Archaeological Parks",
          "description": "Commence at 13:00 hrs in downtown Cusco. Visit the legendary Sun Temple of Qorikancha, showcasing masterful Inca stonework beneath colonial convent walls. Travel up to the megalithic ramparts of Sacsayhuamán, followed by the labyrinthine ceremonial caves of Qenqo, the military redoubt of Puka Pukara, and the sacred water springs of Tambomachay. Conclude near the Plaza de Armas around 18:30 hrs."
        }
      ]
    }
  },
  "city-tour-cusco-realidad-virtual": {
    "title": {
      "es": "City Tour Cusco en Realidad Virtual",
      "en": "Cusco City Tour with 3D Virtual Reality"
    },
    "tag": {
      "es": "Innovador",
      "en": "Innovative"
    },
    "location": {
      "es": "Cusco",
      "en": "Cusco"
    },
    "description": {
      "es": "Vive una experiencia innovadora que combina historia y tecnología en el corazón de Cusco. Recorre los principales atractivos arqueológicos e históricos de la ciudad mientras utilizas lentes de realidad virtual para descubrir cómo lucían estos impresionantes lugares durante el Imperio Inca.",
      "en": "Experience an unforgettable journey with the Cusco City Tour with 3D Virtual Reality. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico cómodo con aire acondicionado",
        "Guía oficial de turismo bilingüe colegiado",
        "Recojo y retorno en hoteles céntricos",
        "Entradas y boletos de acceso a los templos y atractivos",
        "Asistencia personalizada durante todo el recorrido"
      ],
      "en": [
        "Comfortable tourist transportation with air conditioning",
        "Certified bilingual official tour guide",
        "Pickup and drop-off at downtown hotels",
        "Admission tickets to featured temples and monuments",
        "Personalized assistance throughout the excursion"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en City Tour Cusco en Realidad Virtual",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Cusco, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Cusco City Tour with 3D Virtual Reality",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Cusco, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "city-tour-lima": {
    "title": {
      "es": "City Tour Lima",
      "en": "Lima City Tour: Colonial & Contemporary"
    },
    "tag": {
      "es": "Popular",
      "en": "Popular"
    },
    "location": {
      "es": "Lima",
      "en": "Lima"
    },
    "description": {
      "es": "Descubre la fascinante historia de Lima recorriendo sus etapas ancestral, colonial y moderna. Visita la emblemática Huaca Pucllana, explora el Centro Histórico con sus impresionantes plazas y monumentos coloniales, conoce las misteriosas Catacumbas de San Francisco y disfruta de los modernos atractivos de Miraflores y el Parque del Amor en un recorrido lleno de cultura, historia y tradición.",
      "en": "Experience an unforgettable journey with the Lima City Tour: Colonial & Contemporary. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico moderno con chofer profesional",
        "Guía oficial de turismo bilingüe acreditado",
        "Entradas a museos y conventos incluidos en el itinerario",
        "Recojo y retorno en hoteles de Miraflores, San Isidro o Barranco",
        "Degustación o botella de agua mineral"
      ],
      "en": [
        "Modern tourist vehicle with licensed professional driver",
        "Accredited bilingual official tour guide",
        "Admission tickets to museums and convents on the itinerary",
        "Hotel pickup and drop-off in Miraflores, San Isidro, or Barranco",
        "Mineral water and cultural snack or tasting"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en City Tour Lima",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Lima, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Lima City Tour: Colonial & Contemporary",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Lima, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "cuatrimotos-maras-moray-salineras-zipline": {
    "title": {
      "es": "Cuatrimotos Maras, Moray, Salineras + Zipline",
      "en": "ATV Quad Biking Maras, Moray & Salt Mines + Zipline"
    },
    "tag": {
      "es": "Aventura",
      "en": "Adventure"
    },
    "location": {
      "es": "Maras, Cusco",
      "en": "Maras, Cusco"
    },
    "description": {
      "es": "Vive una experiencia llena de adrenalina recorriendo los impresionantes paisajes del Valle Sagrado a bordo de cuatrimotos. Explora los enigmáticos andenes de Moray, admira las famosas Salineras de Maras y disfruta de increíbles vistas. La aventura continúa con una emocionante experiencia de Zipline.",
      "en": "Experience an unforgettable journey with the ATV Quad Biking Maras, Moray & Salt Mines + Zipline. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico ida y vuelta desde el centro de la ciudad",
        "Equipos completos de seguridad certificados (casco, guantes, arnés, chaleco salvavidas)",
        "Instructor y guía profesional especializado en aventura",
        "Charla técnica de inducción y prácticas de manejo previas",
        "Botiquín de primeros auxilios y seguro contra accidentes de tránsito (SOAT)"
      ],
      "en": [
        "Round-trip tourist transport from downtown meeting points",
        "Certified safety equipment (helmet, gloves, harness, life jacket)",
        "Specialized professional outdoor adventure instructor and guide",
        "Safety briefing and introductory driving practice session",
        "Comprehensive first aid kit and vehicular passenger insurance"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Cuatrimotos Maras, Moray, Salineras + Zipline",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Maras, Cusco, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of ATV Quad Biking Maras, Moray & Salt Mines + Zipline",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Maras, Cusco, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "cuatrimotos-morada-de-los-dioses": {
    "title": {
      "es": "Cuatrimotos Morada de los Dioses",
      "en": "ATV Quad Biking to the Abode of the Gods"
    },
    "tag": {
      "es": "Aventura",
      "en": "Adventure"
    },
    "location": {
      "es": "Cusco",
      "en": "Cusco"
    },
    "description": {
      "es": "Disfruta de una emocionante aventura en cuatrimotos por los alrededores de Cusco y descubre la impresionante Morada de los Dioses. Recorre hermosos paisajes andinos mientras conduces por rutas especialmente diseñadas para la aventura.",
      "en": "Experience an unforgettable journey with the ATV Quad Biking to the Abode of the Gods. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico ida y vuelta desde el centro de la ciudad",
        "Equipos completos de seguridad certificados (casco, guantes, arnés, chaleco salvavidas)",
        "Instructor y guía profesional especializado en aventura",
        "Charla técnica de inducción y prácticas de manejo previas",
        "Botiquín de primeros auxilios y seguro contra accidentes de tránsito (SOAT)"
      ],
      "en": [
        "Round-trip tourist transport from downtown meeting points",
        "Certified safety equipment (helmet, gloves, harness, life jacket)",
        "Specialized professional outdoor adventure instructor and guide",
        "Safety briefing and introductory driving practice session",
        "Comprehensive first aid kit and vehicular passenger insurance"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Cuatrimotos Morada de los Dioses",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Cusco, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of ATV Quad Biking to the Abode of the Gods",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Cusco, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "free-walking-tour-cusco-miradores": {
    "title": {
      "es": "Free Walking Tour Cusco Miradores",
      "en": "Cusco Scenic Viewpoints Walking Tour"
    },
    "tag": {
      "es": "Popular",
      "en": "Popular"
    },
    "location": {
      "es": "Cusco",
      "en": "Cusco"
    },
    "description": {
      "es": "Descubre Cusco desde sus mejores puntos panorámicos en un recorrido lleno de historia, cultura y vistas espectaculares. Explora la Plaza de Armas, el encantador barrio de San Blas, la famosa Piedra de los 12 Ángulos y visita el Mirador de San Cristóbal para contemplar la ciudad desde las alturas.",
      "en": "Experience an unforgettable journey with the Cusco Scenic Viewpoints Walking Tour. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico cómodo con aire acondicionado",
        "Guía oficial de turismo bilingüe colegiado",
        "Recojo y retorno en hoteles céntricos",
        "Entradas y boletos de acceso a los templos y atractivos",
        "Asistencia personalizada durante todo el recorrido"
      ],
      "en": [
        "Comfortable tourist transportation with air conditioning",
        "Certified bilingual official tour guide",
        "Pickup and drop-off at downtown hotels",
        "Admission tickets to featured temples and monuments",
        "Personalized assistance throughout the excursion"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Free Walking Tour Cusco Miradores",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Cusco, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Cusco Scenic Viewpoints Walking Tour",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Cusco, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "glaciar-quelccaya-full-day": {
    "title": {
      "es": "Glaciar Quelccaya Full Day",
      "en": "Quelccaya Ice Cap Glacier Full Day Expedition"
    },
    "tag": {
      "es": "Naturaleza",
      "en": "Nature"
    },
    "location": {
      "es": "Glaciar Quelccaya, Cusco",
      "en": "Glaciar Quelccaya, Cusco"
    },
    "description": {
      "es": "Vive una aventura inolvidable hacia el majestuoso Glaciar Quelccaya, considerado el glaciar tropical más grande del mundo. Recorre impresionantes paisajes andinos, observa vicuñas y lagunas de aguas cristalinas mientras exploras la espectacular Cordillera Vilcanota.",
      "en": "Experience an unforgettable journey with the Quelccaya Ice Cap Glacier Full Day Expedition. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico ida y vuelta desde su hotel en Cusco",
        "Guía profesional bilingüe certificado (español e inglés)",
        "Desayuno buffet energético y almuerzo buffet novoandino",
        "Botiquín de primeros auxilios y balón de oxígeno medicinal",
        "Bastones de trekking para la caminata",
        "Boleto de ingreso a la comunidad y atractivo natural"
      ],
      "en": [
        "Round-trip tourist transport from your hotel in Cusco",
        "Certified bilingual professional guide (English and Spanish)",
        "Nutritious buffet breakfast and Novoandina buffet lunch",
        "First aid kit and portable medical oxygen tank",
        "Trekking poles for the hiking trail",
        "Entrance tickets to local communities and natural site"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Glaciar Quelccaya Full Day",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Glaciar Quelccaya, Cusco, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Quelccaya Ice Cap Glacier Full Day Expedition",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Glaciar Quelccaya, Cusco, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "islas-palomino": {
    "title": {
      "es": "Islas Palomino",
      "en": "Palomino Islands & Swim with Sea Lions"
    },
    "tag": {
      "es": "Naturaleza",
      "en": "Nature"
    },
    "location": {
      "es": "Callao, Lima",
      "en": "Callao, Lima"
    },
    "description": {
      "es": "Embárcate en una emocionante aventura por las costas del Callao y descubre las impresionantes Islas Palomino. Navega entre islas llenas de historia, observa aves marinas en su entorno natural y vive la experiencia única de nadar junto a miles de lobos marinos.",
      "en": "Experience an unforgettable journey with the Palomino Islands & Swim with Sea Lions. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico moderno con chofer profesional",
        "Guía oficial de turismo bilingüe acreditado",
        "Entradas a museos y conventos incluidos en el itinerario",
        "Recojo y retorno en hoteles de Miraflores, San Isidro o Barranco",
        "Degustación o botella de agua mineral"
      ],
      "en": [
        "Modern tourist vehicle with licensed professional driver",
        "Accredited bilingual official tour guide",
        "Admission tickets to museums and convents on the itinerary",
        "Hotel pickup and drop-off in Miraflores, San Isidro, or Barranco",
        "Mineral water and cultural snack or tasting"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Islas Palomino",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Callao, Lima, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Palomino Islands & Swim with Sea Lions",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Callao, Lima, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "islas-uros-half-day": {
    "title": {
      "es": "Islas Uros Half Day",
      "en": "Uros Floating Islands Half Day Tour"
    },
    "tag": {
      "es": "Popular",
      "en": "Popular"
    },
    "location": {
      "es": "Islas Uros, Puno",
      "en": "Islas Uros, Puno"
    },
    "description": {
      "es": "Explora las emblemáticas Islas Flotantes de los Uros y conoce una de las culturas más fascinantes del Lago Titicaca. Navega por sus tranquilas aguas mientras descubres las tradiciones, costumbres y estilo de vida de los habitantes de estas impresionantes islas construidas artesanalmente con totora.",
      "en": "Experience an unforgettable journey with the Uros Floating Islands Half Day Tour. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Traslados terrestres hotel en Puno - puerto lacustre - hotel",
        "Embarcación turística a motor (lancha rápida con chalecos salvavidas)",
        "Guía profesional oficial bilingüe (español / inglés)",
        "Boletos de ingreso a las Islas Flotantes de los Uros y Taquile",
        "Almuerzo tradicional en la Isla de Taquile a base de trucha fresca del lago",
        "Demostración cultural y textil por familias locales"
      ],
      "en": [
        "Round-trip transfers from Puno hotel to Lake Titicaca port",
        "Comfortable motorized tourist boat with safety life vests",
        "Certified bilingual official tour guide (English and Spanish)",
        "Admission fees to Uros Floating Islands and Taquile Island",
        "Traditional lunch on Taquile Island featuring fresh lake trout",
        "Interactive cultural and weaving presentation by native families"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Islas Uros Half Day",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Islas Uros, Puno, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Uros Floating Islands Half Day Tour",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Islas Uros, Puno, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "laguna-humantay": {
    "title": {
      "es": "Laguna Humantay",
      "en": "Humantay Lake Day Hike"
    },
    "tag": {
      "es": "Naturaleza Espectacular",
      "en": "Scenic Alpine Lake"
    },
    "location": {
      "es": "Mollepata, Anta, Cusco",
      "en": "Mollepata, Anta, Cusco"
    },
    "description": {
      "es": "Descubre uno de los tesoros naturales más impresionantes de Cusco. La Laguna Humantay cautiva a sus visitantes con sus espectaculares aguas turquesas y el imponente paisaje de montañas nevadas que la rodean. Disfruta de una emocionante caminata por los Andes peruanos y contempla una de las vistas más fotografiadas y admiradas del país.",
      "en": "Experience an unforgettable journey with the Humantay Lake Day Hike. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico ida y vuelta desde su hotel en Cusco",
        "Guía profesional bilingüe certificado (español e inglés)",
        "Desayuno buffet energético y almuerzo buffet novoandino",
        "Botiquín de primeros auxilios y balón de oxígeno medicinal",
        "Bastones de trekking para la caminata",
        "Boleto de ingreso a la comunidad y atractivo natural"
      ],
      "en": [
        "Round-trip tourist transport from your hotel in Cusco",
        "Certified bilingual professional guide (English and Spanish)",
        "Nutritious buffet breakfast and Novoandina buffet lunch",
        "First aid kit and portable medical oxygen tank",
        "Trekking poles for the hiking trail",
        "Entrance tickets to local communities and natural site"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Ascenso a la Joya Turquesa del Nevado Salkantay (4,200 m s. n. m.)",
          "description": "Salida a las 04:30 AM hacia Mollepata para desayunar. Continuación hacia Soraypampa (3,900 m), punto base de la caminata. Caminata ascendente de 1.5 horas hasta la impresionante Laguna Humantay de aguas esmeralda. Ceremonia de ofrenda a los Apus y tiempo libre. Descenso a Soraypampa, almuerzo buffet en Mollepata y retorno a Cusco alrededor de las 18:00 hrs."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Hike to the Turquoise Jewel of Salkantay Glacier (4,200 m / 13,779 ft)",
          "description": "Depart at 04:30 AM towards Mollepata for a hearty breakfast. Drive onwards to Soraypampa (3,900 m), the trailhead at the foot of Salkantay. Ascend steadily for 1.5 hours to the crystalline turquoise waters of Humantay Lake. Participate in a traditional stone apacheta offering to the mountain spirits (Apus). Descend back to Soraypampa, enjoy lunch in Mollepata, and return to Cusco."
        }
      ]
    }
  },
  "lineas-de-nazca-full-day": {
    "title": {
      "es": "Líneas de Nazca Full Day",
      "en": "Nazca Lines Flight & Desert Full Day"
    },
    "tag": {
      "es": "Arqueología & Misterio",
      "en": "Archaeology & Mystery"
    },
    "location": {
      "es": "Nazca e Ica (Salida desde Lima)",
      "en": "Nazca & Ica (Departing from Lima)"
    },
    "description": {
      "es": "Vive una experiencia única sobrevolando las enigmáticas Líneas de Nazca, uno de los mayores misterios arqueológicos del mundo. Admira impresionantes figuras trazadas en el desierto y disfruta de una aventura inolvidable desde Lima.",
      "en": "Experience an unforgettable journey with the Nazca Lines Flight & Desert Full Day. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico privado ida y vuelta desde Lima",
        "Sobrevuelo de 30-35 minutos sobre las Líneas de Nazca en avioneta certificada",
        "Piloto y copiloto profesionales con sistema de audio individual",
        "Certificado de sobrevuelo y asistencia en el aeródromo",
        "Parada en bodega tradicional de Ica con cata de pisco"
      ],
      "en": [
        "Private round-trip tourist transport from Lima",
        "30-35 minute scenic flight over the enigmatic Nazca Lines in certified aircraft",
        "Licensed pilot and copilot with personal headset audio commentary",
        "Official flight certificate and airport boarding assistance",
        "Stop at a traditional Ica winery with guided pisco tasting"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Sobrevuelo a los Enigmáticos Geoglifos de Nazca",
          "description": "Partida temprana desde Lima con destino al aeródromo de Ica o Nazca. Proyección de video documental sobre las teorías de Maria Reiche y despegue en moderna aeronave Cessna. Avistamiento aéreo de 12 geoglifos monumentales incluyendo el Colibrí, el Mono, la Araña, el Cóndor y el Astronauta. Almuerzo campestre y viaje de retorno a Lima."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Flight over the Enigmatic Giant Geoglyphs of Nazca",
          "description": "Early morning private departure from Lima to the aerodrome. Watch an introductory documentary highlighting Maria Reiche’s astronomical calendar discoveries before boarding. Take to the skies for breathtaking aerial views of over 12 iconic geoglyphs including the Hummingbird, Monkey, Spider, Condor, and Astronaut. Enjoy a relaxed regional lunch before returning to Lima."
        }
      ]
    }
  },
  "lodge-en-uros-1-dia-1-noche": {
    "title": {
      "es": "Lodge en Uros 1/2 Día y 1 Noche",
      "en": "Uros Floating Lodge Experiential Stay 2D/1N"
    },
    "tag": {
      "es": "Multi-Día",
      "en": "Multi-Day"
    },
    "location": {
      "es": "Islas Uros, Puno",
      "en": "Islas Uros, Puno"
    },
    "description": {
      "es": "Vive una experiencia única sobre el Lago Titicaca hospedándote en un acogedor lodge flotante en las Islas Uros. Disfruta de un recorrido en embarcación de totora por la Reserva Nacional del Titicaca, contempla impresionantes paisajes naturales y pasa una noche rodeado de tranquilidad con vistas espectaculares del lago.",
      "en": "Experience an unforgettable journey with the Uros Floating Lodge Experiential Stay 2D/1N. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Traslados terrestres hotel en Puno - puerto lacustre - hotel",
        "Embarcación turística a motor (lancha rápida con chalecos salvavidas)",
        "Guía profesional oficial bilingüe (español / inglés)",
        "Boletos de ingreso a las Islas Flotantes de los Uros y Taquile",
        "Almuerzo tradicional en la Isla de Taquile a base de trucha fresca del lago",
        "Demostración cultural y textil por familias locales"
      ],
      "en": [
        "Round-trip transfers from Puno hotel to Lake Titicaca port",
        "Comfortable motorized tourist boat with safety life vests",
        "Certified bilingual official tour guide (English and Spanish)",
        "Admission fees to Uros Floating Islands and Taquile Island",
        "Traditional lunch on Taquile Island featuring fresh lake trout",
        "Interactive cultural and weaving presentation by native families"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Lodge en Uros 1/2 Día y 1 Noche",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Islas Uros, Puno, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Uros Floating Lodge Experiential Stay 2D/1N",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Islas Uros, Puno, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "machu-picchu-full-day": {
    "title": {
      "es": "Machu Picchu Full Day",
      "en": "Machu Picchu Full Day Tour"
    },
    "tag": {
      "es": "Maravilla Mundial",
      "en": "World Wonder"
    },
    "location": {
      "es": "Machu Picchu, Cusco",
      "en": "Machu Picchu, Cusco"
    },
    "description": {
      "es": "Descubre la maravilla más emblemática del Perú en una experiencia inolvidable hacia la legendaria ciudadela de Machu Picchu. Viaja a través de espectaculares paisajes andinos, explora uno de los sitios arqueológicos más impresionantes del mundo junto a un guía profesional y captura la clásica fotografía en este destino declarado Patrimonio de la Humanidad y una de las Nuevas Siete Maravillas del Mundo.",
      "en": "Experience an unforgettable journey with the Machu Picchu Full Day Tour. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Traslado terrestre Cusco - Estación de Ollantaytambo - Cusco",
        "Boletos de tren ida y vuelta (Inca Rail Voyager o PeruRail Expedition)",
        "Boletos de bus ecológico Aguas Calientes - Machu Picchu - Aguas Calientes",
        "Boleto oficial de ingreso al Santuario Histórico de Machu Picchu (Circuito confirmado)",
        "Guía profesional de turismo certificado para el recorrido de 2.5 horas",
        "Asistencia y monitoreo permanente las 24 horas del día"
      ],
      "en": [
        "Private ground transfer Cusco - Ollantaytambo Station - Cusco",
        "Round-trip panoramic train tickets (Inca Rail Voyager or PeruRail Expedition)",
        "Eco-bus shuttle tickets Aguas Calientes - Machu Picchu - Aguas Calientes",
        "Official admission ticket to Machu Picchu Historic Sanctuary (confirmed circuit)",
        "Certified professional tour guide for a 2.5-hour in-depth exploration",
        "24/7 dedicated travel concierge assistance and tracking"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Viaje Panorámico en Tren y Tour Guiado en la Ciudadela Inca",
          "description": "Recojo de madrugada de su hotel en Cusco hacia Ollantaytambo. Embarque en tren panorámico hacia Aguas Calientes admirando las gargantas del río Urubamba. Ascenso en bus hasta la puerta del Santuario Histórico de Machu Picchu. Tour guiado de 2.5 horas por los templos, plazas ceremoniales y miradores icónicos. Tiempo libre para almorzar en el pueblo y retorno en tren y bus a Cusco al anochecer."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Scenic Train Journey & Guided Exploration of the Inca Citadel",
          "description": "Early morning hotel pickup in Cusco for the transfer to Ollantaytambo. Board the panoramic train following the roaring Urubamba River canyon to Aguas Calientes. Board the eco-shuttle ascending to the gates of Machu Picchu. Enjoy a comprehensive 2.5-hour certified guided tour covering the Temple of the Sun, Sacred Plaza, and postcard viewpoints. Return to Cusco by scenic rail and private transport by evening."
        }
      ]
    }
  },
  "maras-moray-salineras": {
    "title": {
      "es": "Maras, Moray y Salineras",
      "en": "Maras, Moray & Ancient Salt Mines Half Day"
    },
    "tag": {
      "es": "Popular",
      "en": "Popular"
    },
    "location": {
      "es": "Maras, Cusco",
      "en": "Maras, Cusco"
    },
    "description": {
      "es": "Descubre tres de los atractivos más fascinantes del Valle Sagrado. Explora los misteriosos andenes circulares de Moray, considerados un laboratorio agrícola inca, recorre el tradicional pueblo de Maras y maravíllate con las impresionantes Salineras.",
      "en": "Experience an unforgettable journey with the Maras, Moray & Ancient Salt Mines Half Day. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico cómodo con aire acondicionado",
        "Guía oficial de turismo bilingüe colegiado",
        "Recojo y retorno en hoteles céntricos",
        "Entradas y boletos de acceso a los templos y atractivos",
        "Asistencia personalizada durante todo el recorrido"
      ],
      "en": [
        "Comfortable tourist transportation with air conditioning",
        "Certified bilingual official tour guide",
        "Pickup and drop-off at downtown hotels",
        "Admission tickets to featured temples and monuments",
        "Personalized assistance throughout the excursion"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Maras, Moray y Salineras",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Maras, Cusco, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Maras, Moray & Ancient Salt Mines Half Day",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Maras, Cusco, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "matrimonio-andino-kasarakuy": {
    "title": {
      "es": "Matrimonio Andino o Kasarakuy y Pago a la Tierra",
      "en": "Ancestral Andean Wedding Ceremony (Kasarakuy)"
    },
    "tag": {
      "es": "Místico",
      "en": "Featured"
    },
    "location": {
      "es": "Chinchero, Cusco",
      "en": "Chinchero, Cusco"
    },
    "description": {
      "es": "Vive una ceremonia ancestral única en el corazón del Valle Sagrado de los Incas. Participa en el tradicional Kasarakuy, un ritual andino de unión espiritual guiado por un maestro andino, acompañado del sagrado Pago a la Pachamama.",
      "en": "Experience an unforgettable journey with the Ancestral Andean Wedding Ceremony (Kasarakuy). Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico cómodo con aire acondicionado",
        "Guía oficial de turismo bilingüe colegiado",
        "Recojo y retorno en hoteles céntricos",
        "Entradas y boletos de acceso a los templos y atractivos",
        "Asistencia personalizada durante todo el recorrido"
      ],
      "en": [
        "Comfortable tourist transportation with air conditioning",
        "Certified bilingual official tour guide",
        "Pickup and drop-off at downtown hotels",
        "Admission tickets to featured temples and monuments",
        "Personalized assistance throughout the excursion"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Matrimonio Andino o Kasarakuy y Pago a la Tierra",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Chinchero, Cusco, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Ancestral Andean Wedding Ceremony (Kasarakuy)",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Chinchero, Cusco, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "mesalpata-ccorihuayrachinamocco": {
    "title": {
      "es": "Mesalpata o Ccorihuayrachinamocco",
      "en": "Mesalpata Cultural Community Immersion"
    },
    "tag": {
      "es": "Cultura",
      "en": "Culture"
    },
    "location": {
      "es": "Cuper Ccasapata, Cusco",
      "en": "Cuper Ccasapata, Cusco"
    },
    "description": {
      "es": "Vive una auténtica experiencia cultural en la comunidad de Cuper Ccasapata, donde compartirás tradiciones andinas junto a los pobladores locales. Disfruta de una caminata acompañada de alpacas, conoce plantas medicinales ancestrales.",
      "en": "Experience an unforgettable journey with the Mesalpata Cultural Community Immersion. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico cómodo con aire acondicionado",
        "Guía oficial de turismo bilingüe colegiado",
        "Recojo y retorno en hoteles céntricos",
        "Entradas y boletos de acceso a los templos y atractivos",
        "Asistencia personalizada durante todo el recorrido"
      ],
      "en": [
        "Comfortable tourist transportation with air conditioning",
        "Certified bilingual official tour guide",
        "Pickup and drop-off at downtown hotels",
        "Admission tickets to featured temples and monuments",
        "Personalized assistance throughout the excursion"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Mesalpata o Ccorihuayrachinamocco",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Cuper Ccasapata, Cusco, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Mesalpata Cultural Community Immersion",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Cuper Ccasapata, Cusco, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "mirabus-cusco": {
    "title": {
      "es": "Mirabus Cusco",
      "en": "Cusco Panoramic Mirabús Open-Top Tour"
    },
    "tag": {
      "es": "Popular",
      "en": "Popular"
    },
    "location": {
      "es": "Cusco",
      "en": "Cusco"
    },
    "description": {
      "es": "Conoce Cusco de una forma cómoda y entretenida a bordo de un moderno bus panorámico. Recorre el centro histórico de la ciudad, disfruta de impresionantes vistas de los principales atractivos turísticos y descubre la riqueza cultural e histórica de la antigua capital del Imperio Inca.",
      "en": "Experience an unforgettable journey with the Cusco Panoramic Mirabús Open-Top Tour. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico cómodo con aire acondicionado",
        "Guía oficial de turismo bilingüe colegiado",
        "Recojo y retorno en hoteles céntricos",
        "Entradas y boletos de acceso a los templos y atractivos",
        "Asistencia personalizada durante todo el recorrido"
      ],
      "en": [
        "Comfortable tourist transportation with air conditioning",
        "Certified bilingual official tour guide",
        "Pickup and drop-off at downtown hotels",
        "Admission tickets to featured temples and monuments",
        "Personalized assistance throughout the excursion"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Mirabus Cusco",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Cusco, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Cusco Panoramic Mirabús Open-Top Tour",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Cusco, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "montana-de-colores-atv": {
    "title": {
      "es": "Montaña de Colores ATV",
      "en": "Rainbow Mountain ATV Quad Biking Adventure"
    },
    "tag": {
      "es": "Aventura",
      "en": "Adventure"
    },
    "location": {
      "es": "Vinicunca, Cusco",
      "en": "Vinicunca, Cusco"
    },
    "description": {
      "es": "Vive la aventura de llegar a la famosa Montaña de Colores a bordo de una emocionante cuatrimoto. Recorre impresionantes paisajes andinos rodeados de nevados, valles y fauna altoandina, disfrutando de una experiencia llena de adrenalina y naturaleza.",
      "en": "Experience an unforgettable journey with the Rainbow Mountain ATV Quad Biking Adventure. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico ida y vuelta desde el centro de la ciudad",
        "Equipos completos de seguridad certificados (casco, guantes, arnés, chaleco salvavidas)",
        "Instructor y guía profesional especializado en aventura",
        "Charla técnica de inducción y prácticas de manejo previas",
        "Botiquín de primeros auxilios y seguro contra accidentes de tránsito (SOAT)"
      ],
      "en": [
        "Round-trip tourist transport from downtown meeting points",
        "Certified safety equipment (helmet, gloves, harness, life jacket)",
        "Specialized professional outdoor adventure instructor and guide",
        "Safety briefing and introductory driving practice session",
        "Comprehensive first aid kit and vehicular passenger insurance"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Montaña de Colores ATV",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Vinicunca, Cusco, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Rainbow Mountain ATV Quad Biking Adventure",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Vinicunca, Cusco, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "montana-de-colores-vinicunca": {
    "title": {
      "es": "Montaña de Colores (Vinicunca)",
      "en": "Rainbow Mountain (Vinicunca)"
    },
    "tag": {
      "es": "Trekking Imperdible",
      "en": "Must-Do Trek"
    },
    "location": {
      "es": "Vinicunca, Pitumarca, Cusco",
      "en": "Vinicunca, Pitumarca, Cusco"
    },
    "description": {
      "es": "Atrévete a descubrir uno de los paisajes más impresionantes del Perú. Recorre los majestuosos Andes hasta llegar a la famosa Montaña de Colores, una maravilla natural conocida por sus sorprendentes tonalidades minerales. Disfruta de espectaculares vistas panorámicas, vive una experiencia única en plena naturaleza y captura fotografías inolvidables.",
      "en": "Experience an unforgettable journey with the Rainbow Mountain (Vinicunca). Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico ida y vuelta desde su hotel en Cusco",
        "Guía profesional bilingüe certificado (español e inglés)",
        "Desayuno buffet energético y almuerzo buffet novoandino",
        "Botiquín de primeros auxilios y balón de oxígeno medicinal",
        "Bastones de trekking para la caminata",
        "Boleto de ingreso a la comunidad y atractivo natural"
      ],
      "en": [
        "Round-trip tourist transport from your hotel in Cusco",
        "Certified bilingual professional guide (English and Spanish)",
        "Nutritious buffet breakfast and Novoandina buffet lunch",
        "First aid kit and portable medical oxygen tank",
        "Trekking poles for the hiking trail",
        "Entrance tickets to local communities and natural site"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Caminata hacia la Cumbre de los 7 Colores (5,036 m s. n. m.)",
          "description": "Recojo a las 04:00 AM de su hotel. Viaje al sur de Cusco hasta Cusipata para disfrutar de un reconfortante desayuno. Traslado al punto de inicio de la caminata en Phulawasipata. Ascenso gradual de aproximadamente 1.5 a 2 horas rodeados de alpacas y el imponente nevado Ausangate. Llegada al mirador principal de Vinicunca con tiempo para fotografías y explicación geológica. Descenso, almuerzo buffet y retorno a Cusco."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "High-Altitude Hike to the 7-Color Summit (5,036 m / 16,522 ft)",
          "description": "Hotel pickup at 04:00 AM heading south of Cusco to Cusipata for an energizing breakfast. Continue to Phulawasipata trailhead. Begin a gradual 1.5 to 2-hour uphill trek surrounded by grazing alpacas and glaciated views of Mount Ausangate. Arrive at the Vinicunca ridge viewpoint for unforgettable photos and geological commentary. Descend, enjoy a hot buffet lunch, and return to Cusco by late afternoon."
        }
      ]
    }
  },
  "montana-pallay-punchu": {
    "title": {
      "es": "Montaña Pallay Punchu",
      "en": "Pallay Punchu Sharp Mountain Trek"
    },
    "tag": {
      "es": "Trekking",
      "en": "Trekking"
    },
    "location": {
      "es": "Pallay Punchu, Cusco",
      "en": "Pallay Punchu, Cusco"
    },
    "description": {
      "es": "Descubre una de las montañas más sorprendentes de Cusco, famosa por sus coloridas formaciones geológicas que asemejan un poncho andino extendido. Además, complementa la experiencia visitando el histórico Complejo Arqueológico de Raqchi.",
      "en": "Experience an unforgettable journey with the Pallay Punchu Sharp Mountain Trek. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico ida y vuelta desde su hotel en Cusco",
        "Guía profesional bilingüe certificado (español e inglés)",
        "Desayuno buffet energético y almuerzo buffet novoandino",
        "Botiquín de primeros auxilios y balón de oxígeno medicinal",
        "Bastones de trekking para la caminata",
        "Boleto de ingreso a la comunidad y atractivo natural"
      ],
      "en": [
        "Round-trip tourist transport from your hotel in Cusco",
        "Certified bilingual professional guide (English and Spanish)",
        "Nutritious buffet breakfast and Novoandina buffet lunch",
        "First aid kit and portable medical oxygen tank",
        "Trekking poles for the hiking trail",
        "Entrance tickets to local communities and natural site"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Montaña Pallay Punchu",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Pallay Punchu, Cusco, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Pallay Punchu Sharp Mountain Trek",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Pallay Punchu, Cusco, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "museo-larco": {
    "title": {
      "es": "Museo Larco",
      "en": "Larco Pre-Columbian Gold & Ceramic Museum"
    },
    "tag": {
      "es": "Cultura",
      "en": "Culture"
    },
    "location": {
      "es": "Lima",
      "en": "Lima"
    },
    "description": {
      "es": "Sumérgete en más de 5,000 años de historia peruana visitando uno de los museos más prestigiosos de Latinoamérica. Recorre sus hermosos jardines, admira impresionantes colecciones de oro, textiles y cerámicas prehispánicas, y descubre piezas únicas que revelan el legado de las antiguas civilizaciones del Perú.",
      "en": "Experience an unforgettable journey with the Larco Pre-Columbian Gold & Ceramic Museum. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico moderno con chofer profesional",
        "Guía oficial de turismo bilingüe acreditado",
        "Entradas a museos y conventos incluidos en el itinerario",
        "Recojo y retorno en hoteles de Miraflores, San Isidro o Barranco",
        "Degustación o botella de agua mineral"
      ],
      "en": [
        "Modern tourist vehicle with licensed professional driver",
        "Accredited bilingual official tour guide",
        "Admission tickets to museums and convents on the itinerary",
        "Hotel pickup and drop-off in Miraflores, San Isidro, or Barranco",
        "Mineral water and cultural snack or tasting"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Museo Larco",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Lima, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Larco Pre-Columbian Gold & Ceramic Museum",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Lima, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "pachamanca-full-day": {
    "title": {
      "es": "Pachamanca Full Day",
      "en": "Traditional Andean Pachamanca Gastronomic Day"
    },
    "tag": {
      "es": "Gastronomía",
      "en": "Gastronomy"
    },
    "location": {
      "es": "Chinchero, Cusco",
      "en": "Chinchero, Cusco"
    },
    "description": {
      "es": "Vive una auténtica experiencia cultural en el tradicional pueblo de Chinchero y descubre los secretos de la Pachamanca, uno de los platos más emblemáticos de la gastronomía peruana. Participa en la preparación ancestral de los alimentos cocinados bajo tierra.",
      "en": "Experience an unforgettable journey with the Traditional Andean Pachamanca Gastronomic Day. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico cómodo con aire acondicionado",
        "Guía oficial de turismo bilingüe colegiado",
        "Recojo y retorno en hoteles céntricos",
        "Entradas y boletos de acceso a los templos y atractivos",
        "Asistencia personalizada durante todo el recorrido"
      ],
      "en": [
        "Comfortable tourist transportation with air conditioning",
        "Certified bilingual official tour guide",
        "Pickup and drop-off at downtown hotels",
        "Admission tickets to featured temples and monuments",
        "Personalized assistance throughout the excursion"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Pachamanca Full Day",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Chinchero, Cusco, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Traditional Andean Pachamanca Gastronomic Day",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Chinchero, Cusco, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "palcoyo-montana-de-colores-alternativa": {
    "title": {
      "es": "Palcoyo – Montaña de Colores Alternativa",
      "en": "Palcoyo Alternative Rainbow Mountain Day Tour"
    },
    "tag": {
      "es": "Naturaleza",
      "en": "Nature"
    },
    "location": {
      "es": "Palcoyo, Cusco",
      "en": "Palcoyo, Cusco"
    },
    "description": {
      "es": "Descubre la belleza de Palcoyo, la alternativa perfecta a la Montaña de Colores. Disfruta de una caminata suave rodeada de impresionantes paisajes andinos, contempla hasta tres montañas multicolores en un solo recorrido y admira el espectacular Bosque de Piedras.",
      "en": "Experience an unforgettable journey with the Palcoyo Alternative Rainbow Mountain Day Tour. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico cómodo con aire acondicionado",
        "Guía oficial de turismo bilingüe colegiado",
        "Recojo y retorno en hoteles céntricos",
        "Entradas y boletos de acceso a los templos y atractivos",
        "Asistencia personalizada durante todo el recorrido"
      ],
      "en": [
        "Comfortable tourist transportation with air conditioning",
        "Certified bilingual official tour guide",
        "Pickup and drop-off at downtown hotels",
        "Admission tickets to featured temples and monuments",
        "Personalized assistance throughout the excursion"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Palcoyo – Montaña de Colores Alternativa",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Palcoyo, Cusco, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Palcoyo Alternative Rainbow Mountain Day Tour",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Palcoyo, Cusco, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "paquete-de-prueba-culqi": {
    "title": {
      "es": "Paquete de Prueba Culqi (S/ 10.00)",
      "en": "Culqi Test Package (S/ 10.00)"
    },
    "tag": {
      "es": "Prueba Técnica",
      "en": "Test Package"
    },
    "location": {
      "es": "Pruebas Técnicas",
      "en": "Technical Validation"
    },
    "description": {
      "es": "Paquete de prueba con valor de S/ 10.00 Soles (PEN) creado exclusivamente para verificar el flujo completo de reservas y cobros con la pasarela de pagos Culqi (Tarjeta de Crédito/Débito y Yape).",
      "en": "Experience an unforgettable journey with the Culqi Test Package (S/ 10.00). Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Paquete de validación de pagos en moneda local (PEN)"
      ],
      "en": [
        "Payment validation package for Peruvian Soles (PEN) gateway testing"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Prueba de Pasarela Culqi",
          "description": "Paquete habilitado exclusivamente para validación transaccional interna."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Culqi Gateway Test",
          "description": "Package enabled strictly for internal end-to-end transactional checkout testing."
        }
      ]
    }
  },
  "paracas-ica-huacachina-full-day": {
    "title": {
      "es": "Paracas, Ica & Huacachina Full Day",
      "en": "Paracas, Ica & Huacachina Desert Oasis Full Day"
    },
    "tag": {
      "es": "Aventura & Costa",
      "en": "Coast & Desert Adventure"
    },
    "location": {
      "es": "Paracas e Ica (Salida desde Lima)",
      "en": "Paracas & Ica (Departing from Lima)"
    },
    "description": {
      "es": "Vive una aventura inolvidable explorando las impresionantes Islas Ballestas, la mágica Huacachina y la famosa Ruta del Vino en Ica y Chincha. Disfruta de tubulares, sandboarding, degustación de piscos, chocolates artesanales y un espectacular show de música negra.",
      "en": "Experience an unforgettable journey with the Paracas, Ica & Huacachina Desert Oasis Full Day. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico privado ida y vuelta desde Lima",
        "Tour en deslizador marítimo a las Islas Ballestas y El Candelabro",
        "Paseo en carros areneros tubulares (buggies) y práctica de sandboarding en las dunas",
        "Visita a bodega vitivinícola tradicional con cata guiada de vinos y piscos peruanos",
        "Guía profesional durante todo el recorrido y pago de tasas portuarias y turísticas"
      ],
      "en": [
        "Private round-trip tourist transportation departing from Lima",
        "Speedboat maritime tour to the wildlife-rich Ballestas Islands and El Candelabro geoglyph",
        "Adrenaline-filled dune buggy roller-coaster ride and sandboarding in Huacachina",
        "Tour of a historic artisanal vineyard with guided tasting of Peruvian pisco and wines",
        "Professional guide throughout and all port taxes and desert entrance fees included"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Islas Ballestas, Oasis de Huacachina y Dunas del Desierto de Ica",
          "description": "Salida de Lima a las 04:30 AM hacia la Bahía de Paracas. Navegación marítima de 2 horas avistando lobos marinos, pingüinos de Humboldt y aves guaneras en las Islas Ballestas. Traslado a Ica para visitar una bodega pisquera artesanal con almuerzo típico. En la tarde, arribo a la laguna de Huacachina para vivir la emoción de los buggies y sandboarding sobre dunas gigantescas al atardecer. Retorno a Lima a las 22:00 hrs."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Ballestas Wildlife Cruise, Pisco Vineyard & Sunset Dune Buggy in Huacachina",
          "description": "Depart Lima at 04:30 AM south along the Pan-American Highway to Paracas Bay. Embark on a 2-hour marine boat tour observing sea lions, Humboldt penguins, and boobies around the Ballestas rock arches. Travel to Ica for an authentic pisco bodega tour and traditional lunch. In the afternoon, explore the idyllic Huacachina palm oasis and ride high-powered dune buggies across desert peaks at sunset. Return to Lima around 22:00 hrs."
        }
      ]
    }
  },
  "puno-full-day-uros-taquile": {
    "title": {
      "es": "Puno Full Day – Uros & Taquile",
      "en": "Lake Titicaca Full Day: Uros & Taquile Islands"
    },
    "tag": {
      "es": "Lago Titicaca",
      "en": "Lake Titicaca"
    },
    "location": {
      "es": "Lago Titicaca, Puno",
      "en": "Lake Titicaca, Puno"
    },
    "description": {
      "es": "Explora las maravillas del Lago Titicaca visitando las emblemáticas Islas Flotantes de Uros y la tradicional Isla Taquile. Conoce las costumbres y tradiciones de sus habitantes, disfruta de impresionantes vistas del lago navegable más alto del mundo y descubre el arte textil que ha dado fama internacional a la comunidad de Taquile.",
      "en": "Experience an unforgettable journey with the Lake Titicaca Full Day: Uros & Taquile Islands. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Traslados terrestres hotel en Puno - puerto lacustre - hotel",
        "Embarcación turística a motor (lancha rápida con chalecos salvavidas)",
        "Guía profesional oficial bilingüe (español / inglés)",
        "Boletos de ingreso a las Islas Flotantes de los Uros y Taquile",
        "Almuerzo tradicional en la Isla de Taquile a base de trucha fresca del lago",
        "Demostración cultural y textil por familias locales"
      ],
      "en": [
        "Round-trip transfers from Puno hotel to Lake Titicaca port",
        "Comfortable motorized tourist boat with safety life vests",
        "Certified bilingual official tour guide (English and Spanish)",
        "Admission fees to Uros Floating Islands and Taquile Island",
        "Traditional lunch on Taquile Island featuring fresh lake trout",
        "Interactive cultural and weaving presentation by native families"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Navegación a las Islas Flotantes de los Uros y la Isla de Taquile",
          "description": "Recojo de su hotel en Puno y traslado al puerto lacustre. Navegación en lancha rápida hacia las legendarias Islas de los Uros, conociendo cómo las familias nativas tejen las balsas y plataformas de totora. Continuación del viaje hacia la Isla de Taquile, caminata escénica por caminos preincas, almuerzo típico de trucha fresca y presentación de su célebre arte textil reconocido por la UNESCO. Retorno a Puno a las 17:00 hrs."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Speedboat Cruise to Uros Floating Reed Islands & UNESCO Taquile Island",
          "description": "Morning pickup from your Puno hotel and transfer to the pier. Cruise by modern speedboat across Lake Titicaca to the Uros Floating Islands, discovering how indigenous families construct floating villages from totora reeds. Continue onward to Taquile Island, hike peaceful pre-Inca paths, enjoy a traditional grilled lake trout lunch, and admire world-renowned UNESCO textile weaving arts. Arrive back in Puno around 17:00 hrs."
        }
      ]
    }
  },
  "puno-islas-uros-amantani-taquile-2d1n": {
    "title": {
      "es": "Puno: Islas Uros, Amantaní y Taquile 2D/1N",
      "en": "Lake Titicaca: Uros, Amantaní & Taquile Islands 2D/1N"
    },
    "tag": {
      "es": "Multi-Día",
      "en": "Multi-Day"
    },
    "location": {
      "es": "Uros, Amantaní, Taquile, Puno",
      "en": "Uros, Amantaní, Taquile, Puno"
    },
    "description": {
      "es": "Vive una experiencia auténtica en el Lago Titicaca compartiendo las tradiciones de sus comunidades locales. Visita las famosas Islas Flotantes de Uros, pasa una noche en la Isla Amantaní junto a una familia anfitriona y disfruta de sus costumbres, gastronomía y danzas típicas. Completa la aventura recorriendo la Isla Taquile.",
      "en": "Experience an unforgettable journey with the Lake Titicaca: Uros, Amantaní & Taquile Islands 2D/1N. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Traslados terrestres hotel en Puno - puerto lacustre - hotel",
        "Embarcación turística a motor (lancha rápida con chalecos salvavidas)",
        "Guía profesional oficial bilingüe (español / inglés)",
        "Boletos de ingreso a las Islas Flotantes de los Uros y Taquile",
        "Almuerzo tradicional en la Isla de Taquile a base de trucha fresca del lago",
        "Demostración cultural y textil por familias locales"
      ],
      "en": [
        "Round-trip transfers from Puno hotel to Lake Titicaca port",
        "Comfortable motorized tourist boat with safety life vests",
        "Certified bilingual official tour guide (English and Spanish)",
        "Admission fees to Uros Floating Islands and Taquile Island",
        "Traditional lunch on Taquile Island featuring fresh lake trout",
        "Interactive cultural and weaving presentation by native families"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Puno: Islas Uros, Amantaní y Taquile 2D/1N",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Uros, Amantaní, Taquile, Puno, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Lake Titicaca: Uros, Amantaní & Taquile Islands 2D/1N",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Uros, Amantaní, Taquile, Puno, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "queswachaca-full-day": {
    "title": {
      "es": "Queswachaca Full Day",
      "en": "Q’eswachaka Last Inca Handwoven Rope Bridge Full Day"
    },
    "tag": {
      "es": "Cultura",
      "en": "Culture"
    },
    "location": {
      "es": "Q'eswachaka, Cusco",
      "en": "Q'eswachaka, Cusco"
    },
    "description": {
      "es": "Descubre una de las tradiciones vivas más impresionantes del Perú visitando el legendario Puente Q'eswachaka, el último puente colgante inca aún reconstruido de forma ancestral por las comunidades locales.",
      "en": "Experience an unforgettable journey with the Q’eswachaka Last Inca Handwoven Rope Bridge Full Day. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico cómodo con aire acondicionado",
        "Guía oficial de turismo bilingüe colegiado",
        "Recojo y retorno en hoteles céntricos",
        "Entradas y boletos de acceso a los templos y atractivos",
        "Asistencia personalizada durante todo el recorrido"
      ],
      "en": [
        "Comfortable tourist transportation with air conditioning",
        "Certified bilingual official tour guide",
        "Pickup and drop-off at downtown hotels",
        "Admission tickets to featured temples and monuments",
        "Personalized assistance throughout the excursion"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Queswachaca Full Day",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Q'eswachaka, Cusco, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Q’eswachaka Last Inca Handwoven Rope Bridge Full Day",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Q'eswachaka, Cusco, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "rafting-rio-chili-half-day": {
    "title": {
      "es": "Rafting Río Chili (Half Day)",
      "en": "Chili River Whitewater Rafting Half Day"
    },
    "tag": {
      "es": "Aventura",
      "en": "Adventure"
    },
    "location": {
      "es": "Río Chili, Arequipa",
      "en": "Río Chili, Arequipa"
    },
    "description": {
      "es": "Vive una emocionante aventura navegando por las aguas del Río Chili, rodeado de los impresionantes paisajes del Valle de Chilina. Recorre rápidos de nivel intermedio y siente la adrenalina mientras disfrutas de una de las actividades de aventura más populares de Arequipa.",
      "en": "Experience an unforgettable journey with the Chili River Whitewater Rafting Half Day. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico ida y vuelta desde el centro de la ciudad",
        "Equipos completos de seguridad certificados (casco, guantes, arnés, chaleco salvavidas)",
        "Instructor y guía profesional especializado en aventura",
        "Charla técnica de inducción y prácticas de manejo previas",
        "Botiquín de primeros auxilios y seguro contra accidentes de tránsito (SOAT)"
      ],
      "en": [
        "Round-trip tourist transport from downtown meeting points",
        "Certified safety equipment (helmet, gloves, harness, life jacket)",
        "Specialized professional outdoor adventure instructor and guide",
        "Safety briefing and introductory driving practice session",
        "Comprehensive first aid kit and vehicular passenger insurance"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Rafting Río Chili (Half Day)",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Río Chili, Arequipa, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Chili River Whitewater Rafting Half Day",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Río Chili, Arequipa, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "ruta-aymara-full-day": {
    "title": {
      "es": "Ruta Aymara Full Day",
      "en": "Aymara Route & Aramu Muru Dimensional Portal"
    },
    "tag": {
      "es": "Cultura",
      "en": "Culture"
    },
    "location": {
      "es": "Chucuito, Puno",
      "en": "Chucuito, Puno"
    },
    "description": {
      "es": "Descubre la riqueza cultural, histórica y mística del altiplano puneño recorriendo la fascinante Ruta Aymara. Visita el famoso Templo de la Fertilidad en Chucuito, las enigmáticas Chullpas de Molloco, los ancestrales Waru Warus andinos y el místico portal de Aramu Muru, un lugar lleno de energía y leyendas.",
      "en": "Experience an unforgettable journey with the Aymara Route & Aramu Muru Dimensional Portal. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Traslados terrestres hotel en Puno - puerto lacustre - hotel",
        "Embarcación turística a motor (lancha rápida con chalecos salvavidas)",
        "Guía profesional oficial bilingüe (español / inglés)",
        "Boletos de ingreso a las Islas Flotantes de los Uros y Taquile",
        "Almuerzo tradicional en la Isla de Taquile a base de trucha fresca del lago",
        "Demostración cultural y textil por familias locales"
      ],
      "en": [
        "Round-trip transfers from Puno hotel to Lake Titicaca port",
        "Comfortable motorized tourist boat with safety life vests",
        "Certified bilingual official tour guide (English and Spanish)",
        "Admission fees to Uros Floating Islands and Taquile Island",
        "Traditional lunch on Taquile Island featuring fresh lake trout",
        "Interactive cultural and weaving presentation by native families"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Ruta Aymara Full Day",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Chucuito, Puno, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Aymara Route & Aramu Muru Dimensional Portal",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Chucuito, Puno, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "ruta-del-sillar-half-day": {
    "title": {
      "es": "Ruta del Sillar (Half Day)",
      "en": "Arequipa Sillar Volcanic Stone Route Half Day"
    },
    "tag": {
      "es": "Historia",
      "en": "History"
    },
    "location": {
      "es": "Arequipa",
      "en": "Arequipa"
    },
    "description": {
      "es": "Descubre los orígenes de la Ciudad Blanca en una fascinante excursión por la Ruta del Sillar. Visita las impresionantes canteras de piedra volcánica donde nació la arquitectura arequipeña, observa el trabajo artesanal de los canteros y explora la misteriosa Quebrada de Culebrillas, un espectacular paisaje natural lleno de historia y cultura.",
      "en": "Experience an unforgettable journey with the Arequipa Sillar Volcanic Stone Route Half Day. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico cómodo con aire acondicionado",
        "Guía oficial de turismo bilingüe colegiado",
        "Recojo y retorno en hoteles céntricos",
        "Entradas y boletos de acceso a los templos y atractivos",
        "Asistencia personalizada durante todo el recorrido"
      ],
      "en": [
        "Comfortable tourist transportation with air conditioning",
        "Certified bilingual official tour guide",
        "Pickup and drop-off at downtown hotels",
        "Admission tickets to featured temples and monuments",
        "Personalized assistance throughout the excursion"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Ruta del Sillar (Half Day)",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Arequipa, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Arequipa Sillar Volcanic Stone Route Half Day",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Arequipa, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "ruta-quechua-full-day-lampa-pukara-tinajani": {
    "title": {
      "es": "Ruta Quechua Full Day: Lampa, Pukará y Tinajani",
      "en": "Quechua Route: Lampa, Pukará & Tinajani Canyon"
    },
    "tag": {
      "es": "Cultura",
      "en": "Culture"
    },
    "location": {
      "es": "Lampa, Puno",
      "en": "Lampa, Puno"
    },
    "description": {
      "es": "Descubre la historia, cultura y tradición del altiplano puneño visitando Lampa, conocida como la Ciudad Rosada; Pukará, una de las culturas preincas más importantes de la región y cuna del famoso Torito de Pukará; y Tinajani, un impresionante conjunto de formaciones rocosas naturales que crean paisajes únicos.",
      "en": "Experience an unforgettable journey with the Quechua Route: Lampa, Pukará & Tinajani Canyon. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Traslados terrestres hotel en Puno - puerto lacustre - hotel",
        "Embarcación turística a motor (lancha rápida con chalecos salvavidas)",
        "Guía profesional oficial bilingüe (español / inglés)",
        "Boletos de ingreso a las Islas Flotantes de los Uros y Taquile",
        "Almuerzo tradicional en la Isla de Taquile a base de trucha fresca del lago",
        "Demostración cultural y textil por familias locales"
      ],
      "en": [
        "Round-trip transfers from Puno hotel to Lake Titicaca port",
        "Comfortable motorized tourist boat with safety life vests",
        "Certified bilingual official tour guide (English and Spanish)",
        "Admission fees to Uros Floating Islands and Taquile Island",
        "Traditional lunch on Taquile Island featuring fresh lake trout",
        "Interactive cultural and weaving presentation by native families"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Ruta Quechua Full Day: Lampa, Pukará y Tinajani",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Lampa, Puno, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Quechua Route: Lampa, Pukará & Tinajani Canyon",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Lampa, Puno, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "salinas-aguada-blanca-represa-uzuna": {
    "title": {
      "es": "Salinas y Aguada Blanca / Represa de Uzuña",
      "en": "Salinas & Aguada Blanca Reserve & Uzuña Dam"
    },
    "tag": {
      "es": "Naturaleza",
      "en": "Nature"
    },
    "location": {
      "es": "Salinas, Uzuña, Arequipa",
      "en": "Salinas, Uzuña, Arequipa"
    },
    "description": {
      "es": "Disfruta de una aventura inolvidable por los impresionantes paisajes altoandinos de Arequipa. Recorre la Reserva Nacional de Salinas y Aguada Blanca, observa vicuñas, alpacas y flamencos en su entorno natural, visita el espectacular Salar de Moche y relájate en las aguas termales de Lojen. Finaliza la experiencia en la hermosa Represa de Uzuña.",
      "en": "Experience an unforgettable journey with the Salinas & Aguada Blanca Reserve & Uzuña Dam. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico cómodo con aire acondicionado",
        "Guía oficial de turismo bilingüe colegiado",
        "Recojo y retorno en hoteles céntricos",
        "Entradas y boletos de acceso a los templos y atractivos",
        "Asistencia personalizada durante todo el recorrido"
      ],
      "en": [
        "Comfortable tourist transportation with air conditioning",
        "Certified bilingual official tour guide",
        "Pickup and drop-off at downtown hotels",
        "Admission tickets to featured temples and monuments",
        "Personalized assistance throughout the excursion"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Salinas y Aguada Blanca / Represa de Uzuña",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Salinas, Uzuña, Arequipa, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Salinas & Aguada Blanca Reserve & Uzuña Dam",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Salinas, Uzuña, Arequipa, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "salinas-y-aguada-blanca-half-day": {
    "title": {
      "es": "Salinas y Aguada Blanca (Half Day)",
      "en": "Salinas & Aguada Blanca Wildlife Reserve Half Day"
    },
    "tag": {
      "es": "Naturaleza",
      "en": "Nature"
    },
    "location": {
      "es": "Salinas, Arequipa",
      "en": "Salinas, Arequipa"
    },
    "description": {
      "es": "Descubre los impresionantes paisajes de la Reserva Nacional Salinas y Aguada Blanca, uno de los ecosistemas más espectaculares del sur del Perú. Admira lagunas altoandinas rodeadas de volcanes, observa flamencos, vicuñas y alpacas en su hábitat natural, y recorre el inmenso salar donde se realiza la tradicional extracción de sal.",
      "en": "Experience an unforgettable journey with the Salinas & Aguada Blanca Wildlife Reserve Half Day. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico cómodo con aire acondicionado",
        "Guía oficial de turismo bilingüe colegiado",
        "Recojo y retorno en hoteles céntricos",
        "Entradas y boletos de acceso a los templos y atractivos",
        "Asistencia personalizada durante todo el recorrido"
      ],
      "en": [
        "Comfortable tourist transportation with air conditioning",
        "Certified bilingual official tour guide",
        "Pickup and drop-off at downtown hotels",
        "Admission tickets to featured temples and monuments",
        "Personalized assistance throughout the excursion"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Salinas y Aguada Blanca (Half Day)",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Salinas, Arequipa, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Salinas & Aguada Blanca Wildlife Reserve Half Day",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Salinas, Arequipa, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "santuario-de-pachacamac": {
    "title": {
      "es": "Santuario de Pachacámac",
      "en": "Pachacámac Archaeological Sanctuary Half Day"
    },
    "tag": {
      "es": "Historia",
      "en": "History"
    },
    "location": {
      "es": "Pachacámac, Lima",
      "en": "Pachacámac, Lima"
    },
    "description": {
      "es": "Descubre uno de los centros ceremoniales más importantes del antiguo Perú en un fascinante recorrido por el Santuario de Pachacámac. Explora templos, pirámides y palacios llenos de historia, conoce el mítico Templo del Sol y finaliza la experiencia recorriendo el encantador distrito bohemio de Barranco y su famoso Puente de los Suspiros.",
      "en": "Experience an unforgettable journey with the Pachacámac Archaeological Sanctuary Half Day. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico moderno con chofer profesional",
        "Guía oficial de turismo bilingüe acreditado",
        "Entradas a museos y conventos incluidos en el itinerario",
        "Recojo y retorno en hoteles de Miraflores, San Isidro o Barranco",
        "Degustación o botella de agua mineral"
      ],
      "en": [
        "Modern tourist vehicle with licensed professional driver",
        "Accredited bilingual official tour guide",
        "Admission tickets to museums and convents on the itinerary",
        "Hotel pickup and drop-off in Miraflores, San Isidro, or Barranco",
        "Mineral water and cultural snack or tasting"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Santuario de Pachacámac",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Pachacámac, Lima, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Pachacámac Archaeological Sanctuary Half Day",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Pachacámac, Lima, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "sillustani-half-day": {
    "title": {
      "es": "Sillustani Half Day",
      "en": "Sillustani Pre-Inca Funerary Towers Half Day"
    },
    "tag": {
      "es": "Historia",
      "en": "History"
    },
    "location": {
      "es": "Sillustani, Puno",
      "en": "Sillustani, Puno"
    },
    "description": {
      "es": "Descubre el impresionante complejo arqueológico de Sillustani, ubicado a orillas de la laguna Umayo. Recorre este antiguo cementerio preinca e inca, famoso por sus monumentales chullpas o torres funerarias, mientras conoces las creencias y rituales ancestrales relacionados con la vida después de la muerte.",
      "en": "Experience an unforgettable journey with the Sillustani Pre-Inca Funerary Towers Half Day. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Traslados terrestres hotel en Puno - puerto lacustre - hotel",
        "Embarcación turística a motor (lancha rápida con chalecos salvavidas)",
        "Guía profesional oficial bilingüe (español / inglés)",
        "Boletos de ingreso a las Islas Flotantes de los Uros y Taquile",
        "Almuerzo tradicional en la Isla de Taquile a base de trucha fresca del lago",
        "Demostración cultural y textil por familias locales"
      ],
      "en": [
        "Round-trip transfers from Puno hotel to Lake Titicaca port",
        "Comfortable motorized tourist boat with safety life vests",
        "Certified bilingual official tour guide (English and Spanish)",
        "Admission fees to Uros Floating Islands and Taquile Island",
        "Traditional lunch on Taquile Island featuring fresh lake trout",
        "Interactive cultural and weaving presentation by native families"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Sillustani Half Day",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Sillustani, Puno, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Sillustani Pre-Inca Funerary Towers Half Day",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Sillustani, Puno, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "taller-toritos-de-pucara": {
    "title": {
      "es": "Taller Toritos de Pucará",
      "en": "Pucará Ceramic Bull Art & Painting Workshop"
    },
    "tag": {
      "es": "Cultura",
      "en": "Culture"
    },
    "location": {
      "es": "Cusco",
      "en": "Cusco"
    },
    "description": {
      "es": "Vive una experiencia cultural única y despierta tu creatividad participando en un auténtico taller artístico cusqueño. Aprende sobre el significado de los tradicionales Toritos de Pucará mientras pintas tu propia pieza de cerámica o lienzo guiado por artistas locales.",
      "en": "Experience an unforgettable journey with the Pucará Ceramic Bull Art & Painting Workshop. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico cómodo con aire acondicionado",
        "Guía oficial de turismo bilingüe colegiado",
        "Recojo y retorno en hoteles céntricos",
        "Entradas y boletos de acceso a los templos y atractivos",
        "Asistencia personalizada durante todo el recorrido"
      ],
      "en": [
        "Comfortable tourist transportation with air conditioning",
        "Certified bilingual official tour guide",
        "Pickup and drop-off at downtown hotels",
        "Admission tickets to featured temples and monuments",
        "Personalized assistance throughout the excursion"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Taller Toritos de Pucará",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Cusco, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Pucará Ceramic Bull Art & Painting Workshop",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Cusco, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "tour-bus-180-escenico": {
    "title": {
      "es": "Tour Bus 180° Escénico",
      "en": "Cusco 180° Panoramic Bus Scenic Tour"
    },
    "tag": {
      "es": "Popular",
      "en": "Popular"
    },
    "location": {
      "es": "Cusco",
      "en": "Cusco"
    },
    "description": {
      "es": "Disfruta de una experiencia única recorriendo Cusco a bordo de un moderno bus panorámico. Admira espectaculares vistas de la ciudad desde el Cristo Blanco y finaliza la experiencia con una demostración y degustación del famoso Pisco Sour.",
      "en": "Experience an unforgettable journey with the Cusco 180° Panoramic Bus Scenic Tour. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico cómodo con aire acondicionado",
        "Guía oficial de turismo bilingüe colegiado",
        "Recojo y retorno en hoteles céntricos",
        "Entradas y boletos de acceso a los templos y atractivos",
        "Asistencia personalizada durante todo el recorrido"
      ],
      "en": [
        "Comfortable tourist transportation with air conditioning",
        "Certified bilingual official tour guide",
        "Pickup and drop-off at downtown hotels",
        "Admission tickets to featured temples and monuments",
        "Personalized assistance throughout the excursion"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Tour Bus 180° Escénico",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Cusco, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Cusco 180° Panoramic Bus Scenic Tour",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Cusco, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "tour-campina-arequipena-mirabus": {
    "title": {
      "es": "Tour Campiña Arequipeña - Mirabús",
      "en": "Arequipa Countryside Scenic Mirabús Tour"
    },
    "tag": {
      "es": "Popular",
      "en": "Popular"
    },
    "location": {
      "es": "Arequipa",
      "en": "Arequipa"
    },
    "description": {
      "es": "Recorre los paisajes más hermosos de la campiña arequipeña a bordo de un cómodo Mirabús panorámico. Disfruta de impresionantes vistas de los volcanes Misti, Chachani y Pichu Pichu, visita los tradicionales distritos de Yanahuara y Carmen Alto, conoce la histórica Mansión del Fundador y descubre el encantador Molino de Sabandía en una experiencia llena de cultura, historia y naturaleza.",
      "en": "Experience an unforgettable journey with the Arequipa Countryside Scenic Mirabús Tour. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico cómodo con aire acondicionado",
        "Guía oficial de turismo bilingüe colegiado",
        "Recojo y retorno en hoteles céntricos",
        "Entradas y boletos de acceso a los templos y atractivos",
        "Asistencia personalizada durante todo el recorrido"
      ],
      "en": [
        "Comfortable tourist transportation with air conditioning",
        "Certified bilingual official tour guide",
        "Pickup and drop-off at downtown hotels",
        "Admission tickets to featured temples and monuments",
        "Personalized assistance throughout the excursion"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Tour Campiña Arequipeña - Mirabús",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Arequipa, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Arequipa Countryside Scenic Mirabús Tour",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Arequipa, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "tour-gastronomico-lima": {
    "title": {
      "es": "Tour Gastronómico Lima",
      "en": "Lima Authentic Gastronomic & Culinary Tour"
    },
    "tag": {
      "es": "Gastronomía",
      "en": "Gastronomy"
    },
    "location": {
      "es": "Lima",
      "en": "Lima"
    },
    "description": {
      "es": "Descubre por qué Lima es considerada una de las capitales gastronómicas del mundo. Recorre un tradicional mercado local, conoce los ingredientes más representativos de la cocina peruana, degusta exóticas frutas nativas y participa en una divertida clase de cocina donde aprenderás a preparar el auténtico ceviche peruano y el tradicional pisco sour.",
      "en": "Experience an unforgettable journey with the Lima Authentic Gastronomic & Culinary Tour. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico moderno con chofer profesional",
        "Guía oficial de turismo bilingüe acreditado",
        "Entradas a museos y conventos incluidos en el itinerario",
        "Recojo y retorno en hoteles de Miraflores, San Isidro o Barranco",
        "Degustación o botella de agua mineral"
      ],
      "en": [
        "Modern tourist vehicle with licensed professional driver",
        "Accredited bilingual official tour guide",
        "Admission tickets to museums and convents on the itinerary",
        "Hotel pickup and drop-off in Miraflores, San Isidro, or Barranco",
        "Mineral water and cultural snack or tasting"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Tour Gastronómico Lima",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Lima, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Lima Authentic Gastronomic & Culinary Tour",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Lima, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "tour-mistico": {
    "title": {
      "es": "Tour Místico",
      "en": "Mystical Cusco & Huasao Shamanic Tour"
    },
    "tag": {
      "es": "Místico",
      "en": "Featured"
    },
    "location": {
      "es": "Cusco, Huasao",
      "en": "Cusco, Huasao"
    },
    "description": {
      "es": "Descubre un recorrido diferente y lleno de magia por los atractivos más sorprendentes de los alrededores de Cusco. Explora la impresionante Morada de los Dioses, admira las curiosas esculturas del Valle de los Duendes, recorre el encantador Humedal de Huasao y déjate sorprender por el misterioso Parque de los Ents.",
      "en": "Experience an unforgettable journey with the Mystical Cusco & Huasao Shamanic Tour. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico cómodo con aire acondicionado",
        "Guía oficial de turismo bilingüe colegiado",
        "Recojo y retorno en hoteles céntricos",
        "Entradas y boletos de acceso a los templos y atractivos",
        "Asistencia personalizada durante todo el recorrido"
      ],
      "en": [
        "Comfortable tourist transportation with air conditioning",
        "Certified bilingual official tour guide",
        "Pickup and drop-off at downtown hotels",
        "Admission tickets to featured temples and monuments",
        "Personalized assistance throughout the excursion"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Tour Místico",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Cusco, Huasao, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Mystical Cusco & Huasao Shamanic Tour",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Cusco, Huasao, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "trekking-canon-del-colca-3-dias-2-noches": {
    "title": {
      "es": "Trekking Cañón del Colca 3 Días / 2 Noches",
      "en": "Colca Canyon Trekking 3 Days / 2 Nights"
    },
    "tag": {
      "es": "Trekking",
      "en": "Trekking"
    },
    "location": {
      "es": "Colca, Arequipa",
      "en": "Colca, Arequipa"
    },
    "description": {
      "es": "Vive una aventura única recorriendo a pie uno de los cañones más profundos del mundo. Descubre impresionantes paisajes andinos, convive con familias locales, atraviesa pintorescos pueblos tradicionales y descansa en el oasis de Sangalle rodeado de naturaleza.",
      "en": "Experience an unforgettable journey with the Colca Canyon Trekking 3 Days / 2 Nights. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico ida y vuelta desde su hotel en Cusco",
        "Guía profesional bilingüe certificado (español e inglés)",
        "Desayuno buffet energético y almuerzo buffet novoandino",
        "Botiquín de primeros auxilios y balón de oxígeno medicinal",
        "Bastones de trekking para la caminata",
        "Boleto de ingreso a la comunidad y atractivo natural"
      ],
      "en": [
        "Round-trip tourist transport from your hotel in Cusco",
        "Certified bilingual professional guide (English and Spanish)",
        "Nutritious buffet breakfast and Novoandina buffet lunch",
        "First aid kit and portable medical oxygen tank",
        "Trekking poles for the hiking trail",
        "Entrance tickets to local communities and natural site"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Trekking Cañón del Colca 3 Días / 2 Noches",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Colca, Arequipa, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Colca Canyon Trekking 3 Days / 2 Nights",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Colca, Arequipa, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "valle-de-majes": {
    "title": {
      "es": "Valle de Majes",
      "en": "Majes Valley & Toro Muerto Petroglyphs Full Day"
    },
    "tag": {
      "es": "Historia",
      "en": "History"
    },
    "location": {
      "es": "Majes, Arequipa",
      "en": "Majes, Arequipa"
    },
    "description": {
      "es": "Descubre la riqueza histórica, cultural y gastronómica del Valle de Majes. Visita los impresionantes Petroglifos de Toro Muerto, considerados una de las mayores concentraciones de arte rupestre del mundo, conoce las Huellas de Dinosaurios de Querulpa y disfruta de la tradición vitivinícola de la región con una degustación de vinos y piscos artesanales.",
      "en": "Experience an unforgettable journey with the Majes Valley & Toro Muerto Petroglyphs Full Day. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico cómodo con aire acondicionado",
        "Guía oficial de turismo bilingüe colegiado",
        "Recojo y retorno en hoteles céntricos",
        "Entradas y boletos de acceso a los templos y atractivos",
        "Asistencia personalizada durante todo el recorrido"
      ],
      "en": [
        "Comfortable tourist transportation with air conditioning",
        "Certified bilingual official tour guide",
        "Pickup and drop-off at downtown hotels",
        "Admission tickets to featured temples and monuments",
        "Personalized assistance throughout the excursion"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Valle de Majes",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Majes, Arequipa, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Majes Valley & Toro Muerto Petroglyphs Full Day",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Majes, Arequipa, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "valle-sagrado-tradicional": {
    "title": {
      "es": "Valle Sagrado Tradicional",
      "en": "Traditional Sacred Valley of the Incas Full Day"
    },
    "tag": {
      "es": "Popular",
      "en": "Popular"
    },
    "location": {
      "es": "Valle Sagrado, Cusco",
      "en": "Sacred Valley, Cusco"
    },
    "description": {
      "es": "Recorre el legendario Valle Sagrado de los Incas y descubre algunos de los sitios arqueológicos más importantes de Cusco. Admira las impresionantes terrazas de Pisac, explora la majestuosa fortaleza de Ollantaytambo y conoce las tradiciones ancestrales de Chinchero.",
      "en": "Experience an unforgettable journey with the Traditional Sacred Valley of the Incas Full Day. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico cómodo con aire acondicionado",
        "Guía oficial de turismo bilingüe colegiado",
        "Recojo y retorno en hoteles céntricos",
        "Entradas y boletos de acceso a los templos y atractivos",
        "Asistencia personalizada durante todo el recorrido"
      ],
      "en": [
        "Comfortable tourist transportation with air conditioning",
        "Certified bilingual official tour guide",
        "Pickup and drop-off at downtown hotels",
        "Admission tickets to featured temples and monuments",
        "Personalized assistance throughout the excursion"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Valle Sagrado Tradicional",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Valle Sagrado, Cusco, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Traditional Sacred Valley of the Incas Full Day",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Sacred Valley, Cusco, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "valle-sagrado-vip": {
    "title": {
      "es": "Valle Sagrado VIP",
      "en": "Sacred Valley VIP Tour"
    },
    "tag": {
      "es": "Más Popular",
      "en": "Most Popular"
    },
    "location": {
      "es": "Valle Sagrado, Cusco",
      "en": "Sacred Valley, Cusco"
    },
    "description": {
      "es": "Descubre los tesoros más impresionantes del Valle Sagrado de los Incas en un recorrido completo que combina historia, cultura y paisajes espectaculares. Explora Chinchero, los enigmáticos andenes de Moray, las famosas Salineras de Maras, la fortaleza de Ollantaytambo y el complejo arqueológico de Pisac. Además, disfruta de un delicioso almuerzo buffet en el corazón del Valle Sagrado.",
      "en": "Experience an unforgettable journey with the Sacred Valley VIP Tour. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico exclusivo para todo el recorrido",
        "Guía oficial de turismo bilingüe durante todo el día",
        "Almuerzo buffet campestre novoandino en Urubamba",
        "Visitas guiadas a Chinchero, Moray, Salineras de Maras, Ollantaytambo y Pisac",
        "Parada en taller textil tradicional con demostración de teñido natural con cochinilla"
      ],
      "en": [
        "Exclusive tourist transportation throughout the Sacred Valley",
        "Full-day certified bilingual tour guide",
        "Exquisite countryside Novoandina buffet lunch in Urubamba",
        "Guided visits to Chinchero, Moray concentric terraces, Maras Salt Mines, Ollantaytambo, and Pisac",
        "Traditional weaving workshop demonstration with organic alpaca dye methods"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Recorrido Completo: Chinchero, Moray, Salineras, Ollantaytambo y Pisac",
          "description": "Partida a las 06:30 AM hacia Chinchero para conocer sus templos coloniales y tejedores andinos. Visita a las terrazas agrícolas circulares de Moray y las impresionantes minas de sal de Maras. Almuerzo buffet en Urubamba. Por la tarde, recorrido por la fortaleza militar inca de Ollantaytambo y el complejo astronómico de Pisac. Retorno a Cusco a las 18:30 hrs."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Comprehensive Circuit: Chinchero, Moray, Maras, Ollantaytambo & Pisac",
          "description": "Depart at 06:30 AM towards Chinchero to admire colonial frescoes and master weavers. Continue to Moray’s enigmatic concentric microclimate terraces and the thousands of active salt ponds at Maras. Savor a gourmet buffet lunch in Urubamba. In the afternoon, explore the massive megalithic fortress of Ollantaytambo and the astronomical hilltop terraces of Pisac. Return to Cusco around 18:30 hrs."
        }
      ]
    }
  },
  "valle-sur": {
    "title": {
      "es": "Valle Sur",
      "en": "Cusco South Valley: Tipón, Pikillacta & Andahuaylillas"
    },
    "tag": {
      "es": "Historia",
      "en": "History"
    },
    "location": {
      "es": "Tipón, Cusco",
      "en": "Tipón, Cusco"
    },
    "description": {
      "es": "Explora los tesoros históricos y arqueológicos del sur de Cusco. Descubre Tipón, una impresionante obra maestra de la ingeniería hidráulica inca, y recorre Pikillaqta, una de las ciudades más importantes de la cultura Wari.",
      "en": "Experience an unforgettable journey with the Cusco South Valley: Tipón, Pikillacta & Andahuaylillas. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico cómodo con aire acondicionado",
        "Guía oficial de turismo bilingüe colegiado",
        "Recojo y retorno en hoteles céntricos",
        "Entradas y boletos de acceso a los templos y atractivos",
        "Asistencia personalizada durante todo el recorrido"
      ],
      "en": [
        "Comfortable tourist transportation with air conditioning",
        "Certified bilingual official tour guide",
        "Pickup and drop-off at downtown hotels",
        "Admission tickets to featured temples and monuments",
        "Personalized assistance throughout the excursion"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Valle Sur",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Tipón, Cusco, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Cusco South Valley: Tipón, Pikillacta & Andahuaylillas",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Tipón, Cusco, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "walking-tour-cusco-historico": {
    "title": {
      "es": "Walking Tour Cusco Histórico",
      "en": "Historic Downtown Cusco Walking Tour"
    },
    "tag": {
      "es": "Popular",
      "en": "Popular"
    },
    "location": {
      "es": "Cusco",
      "en": "Cusco"
    },
    "description": {
      "es": "Descubre el encanto de Cusco caminando por sus calles llenas de historia, cultura y tradición. Recorre la Plaza de Armas, admira la arquitectura colonial de la Catedral y la Compañía de Jesús, conoce la famosa Piedra de los 12 Ángulos, explora el artístico barrio de San Blas.",
      "en": "Experience an unforgettable journey with the Historic Downtown Cusco Walking Tour. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico cómodo con aire acondicionado",
        "Guía oficial de turismo bilingüe colegiado",
        "Recojo y retorno en hoteles céntricos",
        "Entradas y boletos de acceso a los templos y atractivos",
        "Asistencia personalizada durante todo el recorrido"
      ],
      "en": [
        "Comfortable tourist transportation with air conditioning",
        "Certified bilingual official tour guide",
        "Pickup and drop-off at downtown hotels",
        "Admission tickets to featured temples and monuments",
        "Personalized assistance throughout the excursion"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Walking Tour Cusco Histórico",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Cusco, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Historic Downtown Cusco Walking Tour",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Cusco, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "walking-tour-cusco-tradicional": {
    "title": {
      "es": "Walking Tour Cusco Tradicional",
      "en": "Traditional Cusco Neighborhoods Walking Tour"
    },
    "tag": {
      "es": "Popular",
      "en": "Popular"
    },
    "location": {
      "es": "Cusco",
      "en": "Cusco"
    },
    "description": {
      "es": "Sumérgete en la esencia de Cusco recorriendo sus calles históricas y descubriendo los secretos de la antigua capital inca. Visita los principales monumentos coloniales, conoce el emblemático barrio de San Blas, admira la famosa Piedra de los 12 Ángulos.",
      "en": "Experience an unforgettable journey with the Traditional Cusco Neighborhoods Walking Tour. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico cómodo con aire acondicionado",
        "Guía oficial de turismo bilingüe colegiado",
        "Recojo y retorno en hoteles céntricos",
        "Entradas y boletos de acceso a los templos y atractivos",
        "Asistencia personalizada durante todo el recorrido"
      ],
      "en": [
        "Comfortable tourist transportation with air conditioning",
        "Certified bilingual official tour guide",
        "Pickup and drop-off at downtown hotels",
        "Admission tickets to featured temples and monuments",
        "Personalized assistance throughout the excursion"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Walking Tour Cusco Tradicional",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Cusco, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Traditional Cusco Neighborhoods Walking Tour",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Cusco, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  },
  "waqrapukara": {
    "title": {
      "es": "Waqrapukara",
      "en": "Waqrapukara Horned Inca Fortress Trekking"
    },
    "tag": {
      "es": "Trekking",
      "en": "Trekking"
    },
    "location": {
      "es": "Waqrapukara, Cusco",
      "en": "Waqrapukara, Cusco"
    },
    "description": {
      "es": "Descubre uno de los secretos mejor guardados de Cusco en una aventura hacia Waqrapukara, una impresionante fortaleza inca enclavada entre montañas y cañones. Disfruta de una caminata rodeada de espectaculares paisajes andinos y maravíllate con esta enigmática construcción en forma de cuernos.",
      "en": "Experience an unforgettable journey with the Waqrapukara Horned Inca Fortress Trekking. Discover breathtaking landscapes, ancient archaeological heritage, and rich local living culture with licensed bilingual guides and top-tier personalized service."
    },
    "inclusions": {
      "es": [
        "Transporte turístico ida y vuelta desde su hotel en Cusco",
        "Guía profesional bilingüe certificado (español e inglés)",
        "Desayuno buffet energético y almuerzo buffet novoandino",
        "Botiquín de primeros auxilios y balón de oxígeno medicinal",
        "Bastones de trekking para la caminata",
        "Boleto de ingreso a la comunidad y atractivo natural"
      ],
      "en": [
        "Round-trip tourist transport from your hotel in Cusco",
        "Certified bilingual professional guide (English and Spanish)",
        "Nutritious buffet breakfast and Novoandina buffet lunch",
        "First aid kit and portable medical oxygen tank",
        "Trekking poles for the hiking trail",
        "Entrance tickets to local communities and natural site"
      ]
    },
    "itinerary": {
      "es": [
        {
          "day": 1,
          "title": "Experiencia Guiada en Waqrapukara",
          "description": "Recojo desde su alojamiento en transporte turístico. Recorrido guiado detallado por los principales atractivos de Waqrapukara, Cusco, tiempo para fotografías, interpretación cultural y degustación gastronómica local. Retorno al punto de inicio con asistencia permanente."
        }
      ],
      "en": [
        {
          "day": 1,
          "title": "Guided Exploration of Waqrapukara Horned Inca Fortress Trekking",
          "description": "Hotel pickup by tourist transportation. In-depth guided tour through the core historical and natural sights of Waqrapukara, Cusco, dedicated time for panoramic photography, cultural insights, and regional culinary tastings. Return safely with personalized guide care."
        }
      ]
    }
  }
};

export function getTourContent(slug: string): TourContentItem | undefined {
  if (!slug) return undefined;
  return TOURS_CONTENT[slug];
}
