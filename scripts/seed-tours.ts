/**
 * seed-tours.ts
 * Seeds all 53+1 tours into Supabase using the service role key.
 * Run with: npx tsx scripts/seed-tours.ts
 *
 * Prerequisites:
 *   - scripts/tour-photos-map.json must exist (run migrate-photos.js first)
 *   - .env.local must have NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 */

import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌  Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

// ── Load photo map ────────────────────────────────────────────────────────────
const mapPath  = path.resolve(__dirname, 'tour-photos-map.json');
const photoMap: Record<string, string[]> = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

// ── Tour Data ─────────────────────────────────────────────────────────────────
// Fields: slug, title, duration, price_adult, category_slug, location, destination_slug, description

interface TourSeed {
  slug: string;
  title: string;
  duration: string;
  price_adult: number | null;
  category_slug: string;
  location: string;
  destination_slug: string;
  description: string;
  tag?: string;
}

const TOURS: TourSeed[] = [
  // ── LIMA ──────────────────────────────────────────────────────────────────
  {
    slug: 'paracas-ica-huacachina-full-day',
    title: 'Paracas, Ica & Huacachina Full Day',
    duration: '14h',
    price_adult: 80.00,
    category_slug: 'aventura',
    location: 'Paracas, Ica',
    destination_slug: 'lima',
    tag: 'Aventura',
    description: 'Vive una aventura inolvidable explorando las impresionantes Islas Ballestas, la mágica Huacachina y la famosa Ruta del Vino en Ica y Chincha. Disfruta de tubulares, sandboarding, degustación de piscos, chocolates artesanales y un espectacular show de música negra.',
  },
  {
    slug: 'lineas-de-nazca-full-day',
    title: 'Líneas de Nazca Full Day',
    duration: '18h',
    price_adult: 232.00,
    category_slug: 'cultura',
    location: 'Nazca, Ica',
    destination_slug: 'lima',
    tag: 'Cultura',
    description: 'Vive una experiencia única sobrevolando las enigmáticas Líneas de Nazca, uno de los mayores misterios arqueológicos del mundo. Admira impresionantes figuras trazadas en el desierto y disfruta de una aventura inolvidable desde Lima.',
  },
  {
    slug: 'city-tour-lima',
    title: 'City Tour Lima',
    duration: '5h',
    price_adult: null,
    category_slug: 'city-tour',
    location: 'Lima',
    destination_slug: 'lima',
    tag: 'City Tour',
    description: 'Descubre la fascinante historia de Lima recorriendo sus etapas ancestral, colonial y moderna. Visita la emblemática Huaca Pucllana, explora el Centro Histórico con sus impresionantes plazas y monumentos coloniales, conoce las misteriosas Catacumbas de San Francisco y disfruta de los modernos atractivos de Miraflores y el Parque del Amor en un recorrido lleno de cultura, historia y tradición.',
  },
  {
    slug: 'circuito-magico-de-aguas',
    title: 'Circuito Mágico de Aguas',
    duration: '3h',
    price_adult: 29.00,
    category_slug: 'cultura',
    location: 'Lima',
    destination_slug: 'lima',
    tag: 'Cultura',
    description: 'Disfruta de una noche inolvidable en el impresionante Circuito Mágico del Agua, reconocido por Guinness World Records como el complejo de fuentes más grande del mundo. Maravíllate con espectaculares juegos de agua, luces y música en el hermoso Parque de la Reserva, uno de los atractivos más visitados de Lima.',
  },
  {
    slug: 'islas-palomino',
    title: 'Islas Palomino',
    duration: '4h',
    price_adult: 63.00,
    category_slug: 'naturaleza',
    location: 'Callao',
    destination_slug: 'lima',
    tag: 'Naturaleza',
    description: 'Embárcate en una emocionante aventura por las costas del Callao y descubre las impresionantes Islas Palomino. Navega entre islas llenas de historia, observa aves marinas en su entorno natural y vive la experiencia única de nadar junto a miles de lobos marinos.',
  },
  {
    slug: 'santuario-de-pachacamac',
    title: 'Santuario de Pachacámac',
    duration: '4h',
    price_adult: 32.00,
    category_slug: 'cultura',
    location: 'Pachacámac',
    destination_slug: 'lima',
    tag: 'Cultura',
    description: 'Descubre uno de los centros ceremoniales más importantes del antiguo Perú en un fascinante recorrido por el Santuario de Pachacámac. Explora templos, pirámides y palacios llenos de historia, conoce el mítico Templo del Sol y finaliza la experiencia recorriendo el encantador distrito bohemio de Barranco y su famoso Puente de los Suspiros.',
  },
  {
    slug: 'museo-larco',
    title: 'Museo Larco',
    duration: '4h',
    price_adult: 43.00,
    category_slug: 'cultura',
    location: 'Lima',
    destination_slug: 'lima',
    tag: 'Cultura',
    description: 'Sumérgete en más de 5,000 años de historia peruana visitando uno de los museos más prestigiosos de Latinoamérica. Recorre sus hermosos jardines, admira impresionantes colecciones de oro, textiles y cerámicas prehispánicas, y descubre piezas únicas que revelan el legado de las antiguas civilizaciones del Perú.',
  },
  {
    slug: 'tour-gastronomico-lima',
    title: 'Tour Gastronómico Lima',
    duration: '4h',
    price_adult: 103.00,
    category_slug: 'gastronomia',
    location: 'Lima',
    destination_slug: 'lima',
    tag: 'Gastronomía',
    description: 'Descubre por qué Lima es considerada una de las capitales gastronómicas del mundo. Recorre un tradicional mercado local, conoce los ingredientes más representativos de la cocina peruana, degusta exóticas frutas nativas y participa en una divertida clase de cocina donde aprenderás a preparar el auténtico ceviche peruano y el tradicional pisco sour.',
  },

  // ── AREQUIPA ──────────────────────────────────────────────────────────────
  {
    slug: 'city-tour-arequipa-half-day',
    title: 'City Tour Arequipa (Half Day)',
    duration: '3h',
    price_adult: 46.00,
    category_slug: 'city-tour',
    location: 'Arequipa',
    destination_slug: 'arequipa',
    tag: 'City Tour',
    description: 'Recorre la encantadora Ciudad Blanca y descubre su impresionante legado colonial. Visita el famoso Monasterio de Santa Catalina, la histórica Plaza de Armas, los tradicionales barrios arequipeños y los monumentos más representativos de una de las ciudades más bellas del Perú, rodeada por majestuosos volcanes.',
  },
  {
    slug: 'city-tour-arequipa-yanahuara-carmen-alto',
    title: 'City Tour Arequipa + Yanahuara + Carmen Alto',
    duration: '3h',
    price_adult: 64.00,
    category_slug: 'city-tour',
    location: 'Arequipa',
    destination_slug: 'arequipa',
    tag: 'City Tour',
    description: 'Descubre la belleza de Arequipa recorriendo sus principales atractivos históricos y culturales. Disfruta de espectaculares vistas de los volcanes desde los miradores de Yanahuara y Carmen Alto, admira el impresionante Valle de Chilina y explora el emblemático Monasterio de Santa Catalina, considerado uno de los tesoros arquitectónicos más importantes del Perú.',
  },
  {
    slug: 'tour-campina-arequipena-mirabus',
    title: 'Tour Campiña Arequipeña - Mirabús',
    duration: '4h',
    price_adult: 18.00,
    category_slug: 'city-tour',
    location: 'Arequipa',
    destination_slug: 'arequipa',
    tag: 'City Tour',
    description: 'Recorre los paisajes más hermosos de la campiña arequipeña a bordo de un cómodo Mirabús panorámico. Disfruta de impresionantes vistas de los volcanes Misti, Chachani y Pichu Pichu, visita los tradicionales distritos de Yanahuara y Carmen Alto, conoce la histórica Mansión del Fundador y descubre el encantador Molino de Sabandía en una experiencia llena de cultura, historia y naturaleza.',
  },
  {
    slug: 'ruta-del-sillar-half-day',
    title: 'Ruta del Sillar (Half Day)',
    duration: '4h',
    price_adult: 28.00,
    category_slug: 'cultura',
    location: 'Arequipa',
    destination_slug: 'arequipa',
    tag: 'Cultura',
    description: 'Descubre los orígenes de la Ciudad Blanca en una fascinante excursión por la Ruta del Sillar. Visita las impresionantes canteras de piedra volcánica donde nació la arquitectura arequipeña, observa el trabajo artesanal de los canteros y explora la misteriosa Quebrada de Culebrillas, un espectacular paisaje natural lleno de historia y cultura.',
  },
  {
    slug: 'canon-del-colca-2-dias-1-noche',
    title: 'Cañón del Colca 2 Días / 1 Noche',
    duration: '2 días / 1 noche',
    price_adult: 42.00,
    category_slug: 'multi-dia',
    location: 'Colca',
    destination_slug: 'arequipa',
    tag: 'Multi-Día',
    description: 'Vive una experiencia inolvidable explorando el espectacular Cañón del Colca en un recorrido de dos días. Disfruta de impresionantes paisajes andinos, observa vicuñas en su hábitat natural, relájate en los baños termales de La Calera y contempla el majestuoso vuelo del cóndor desde la famosa Cruz del Cóndor.',
  },
  {
    slug: 'trekking-canon-del-colca-3-dias-2-noches',
    title: 'Trekking Cañón del Colca 3 Días / 2 Noches',
    duration: '3 días / 2 noches',
    price_adult: 107.00,
    category_slug: 'trekking',
    location: 'Colca',
    destination_slug: 'arequipa',
    tag: 'Trekking',
    description: 'Vive una aventura única recorriendo a pie uno de los cañones más profundos del mundo. Descubre impresionantes paisajes andinos, convive con familias locales, atraviesa pintorescos pueblos tradicionales y descansa en el oasis de Sangalle rodeado de naturaleza.',
  },
  {
    slug: 'salinas-y-aguada-blanca-half-day',
    title: 'Salinas y Aguada Blanca (Half Day)',
    duration: '7h',
    price_adult: 28.00,
    category_slug: 'naturaleza',
    location: 'Salinas',
    destination_slug: 'arequipa',
    tag: 'Naturaleza',
    description: 'Descubre los impresionantes paisajes de la Reserva Nacional Salinas y Aguada Blanca, uno de los ecosistemas más espectaculares del sur del Perú. Admira lagunas altoandinas rodeadas de volcanes, observa flamencos, vicuñas y alpacas en su hábitat natural, y recorre el inmenso salar donde se realiza la tradicional extracción de sal.',
  },
  {
    slug: 'salinas-aguada-blanca-represa-uzuna',
    title: 'Salinas y Aguada Blanca / Represa de Uzuña',
    duration: '11h',
    price_adult: 30.00,
    category_slug: 'naturaleza',
    location: 'Salinas',
    destination_slug: 'arequipa',
    tag: 'Naturaleza',
    description: 'Disfruta de una aventura inolvidable por los impresionantes paisajes altoandinos de Arequipa. Recorre la Reserva Nacional de Salinas y Aguada Blanca, observa vicuñas, alpacas y flamencos en su entorno natural, visita el espectacular Salar de Moche y relájate en las aguas termales de Lojen. Finaliza la experiencia en la hermosa Represa de Uzuña, donde podrás disfrutar de actividades como kayak y paseos en bote.',
  },
  {
    slug: 'catarata-de-pillones',
    title: 'Catarata de Pillones',
    duration: '11h',
    price_adult: 28.00,
    category_slug: 'naturaleza',
    location: 'Pillones',
    destination_slug: 'arequipa',
    tag: 'Naturaleza',
    description: 'Descubre uno de los paisajes naturales más sorprendentes de Arequipa en una excursión llena de aventura y naturaleza. Recorre la Reserva Nacional Salinas y Aguada Blanca, admira el impresionante Bosque de Piedras de Puruña y llega hasta la espectacular Catarata de Pillones, donde el agua ha moldeado increíbles formaciones rocosas.',
  },
  {
    slug: 'valle-de-majes',
    title: 'Valle de Majes',
    duration: '12h',
    price_adult: 30.00,
    category_slug: 'cultura',
    location: 'Majes',
    destination_slug: 'arequipa',
    tag: 'Cultura',
    description: 'Descubre la riqueza histórica, cultural y gastronómica del Valle de Majes. Visita los impresionantes Petroglifos de Toro Muerto, considerados una de las mayores concentraciones de arte rupestre del mundo, conoce las Huellas de Dinosaurios de Querulpa y disfruta de la tradición vitivinícola de la región con una degustación de vinos y piscos artesanales.',
  },
  {
    slug: 'rafting-rio-chili-half-day',
    title: 'Rafting Río Chili (Half Day)',
    duration: '3h',
    price_adult: 28.00,
    category_slug: 'aventura',
    location: 'Río Chili',
    destination_slug: 'arequipa',
    tag: 'Aventura',
    description: 'Vive una emocionante aventura navegando por las aguas del Río Chili, rodeado de los impresionantes paisajes del Valle de Chilina. Recorre rápidos de nivel intermedio y siente la adrenalina mientras disfrutas de una de las actividades de aventura más populares de Arequipa.',
  },

  // ── PUNO ──────────────────────────────────────────────────────────────────
  {
    slug: 'puno-full-day-uros-taquile',
    title: 'Puno Full Day – Uros & Taquile',
    duration: 'Full Day',
    price_adult: 45.00,
    category_slug: 'cultura',
    location: 'Lago Titicaca',
    destination_slug: 'puno',
    tag: 'Cultura',
    description: 'Explora las maravillas del Lago Titicaca visitando las emblemáticas Islas Flotantes de Uros y la tradicional Isla Taquile. Conoce las costumbres y tradiciones de sus habitantes, disfruta de impresionantes vistas del lago navegable más alto del mundo y descubre el arte textil que ha dado fama internacional a la comunidad de Taquile.',
  },
  {
    slug: 'ruta-aymara-full-day',
    title: 'Ruta Aymara Full Day',
    duration: 'Full Day',
    price_adult: 38.00,
    category_slug: 'cultura',
    location: 'Chucuito',
    destination_slug: 'puno',
    tag: 'Cultura',
    description: 'Descubre la riqueza cultural, histórica y mística del altiplano puneño recorriendo la fascinante Ruta Aymara. Visita el famoso Templo de la Fertilidad en Chucuito, las enigmáticas Chullpas de Molloco, los ancestrales Waru Warus andinos y el místico portal de Aramu Muru, un lugar lleno de energía y leyendas.',
  },
  {
    slug: 'puno-islas-uros-amantani-taquile-2d1n',
    title: 'Puno: Islas Uros, Amantaní y Taquile 2D/1N',
    duration: '2 días / 1 noche',
    price_adult: 65.00,
    category_slug: 'multi-dia',
    location: 'Islas Uros, Puno',
    destination_slug: 'puno',
    tag: 'Multi-Día',
    description: 'Vive una experiencia auténtica en el Lago Titicaca compartiendo las tradiciones de sus comunidades locales. Visita las famosas Islas Flotantes de Uros, pasa una noche en la Isla Amantaní junto a una familia anfitriona y disfruta de sus costumbres, gastronomía y danzas típicas. Completa la aventura recorriendo la Isla Taquile.',
  },
  {
    slug: 'islas-uros-half-day',
    title: 'Islas Uros Half Day',
    duration: '3h',
    price_adult: 20.00,
    category_slug: 'cultura',
    location: 'Islas Uros',
    destination_slug: 'puno',
    tag: 'Cultura',
    description: 'Explora las emblemáticas Islas Flotantes de los Uros y conoce una de las culturas más fascinantes del Lago Titicaca. Navega por sus tranquilas aguas mientras descubres las tradiciones, costumbres y estilo de vida de los habitantes de estas impresionantes islas construidas artesanalmente con totora.',
  },
  {
    slug: 'sillustani-half-day',
    title: 'Sillustani Half Day',
    duration: '4h',
    price_adult: 25.00,
    category_slug: 'cultura',
    location: 'Sillustani',
    destination_slug: 'puno',
    tag: 'Cultura',
    description: 'Descubre el impresionante complejo arqueológico de Sillustani, ubicado a orillas de la laguna Umayo. Recorre este antiguo cementerio preinca e inca, famoso por sus monumentales chullpas o torres funerarias, mientras conoces las creencias y rituales ancestrales relacionados con la vida después de la muerte.',
  },
  {
    slug: 'ruta-quechua-full-day-lampa-pukara-tinajani',
    title: 'Ruta Quechua Full Day: Lampa, Pukará y Tinajani',
    duration: '10h',
    price_adult: 80.00,
    category_slug: 'cultura',
    location: 'Lampa',
    destination_slug: 'puno',
    tag: 'Cultura',
    description: 'Descubre la historia, cultura y tradición del altiplano puneño visitando Lampa, conocida como la Ciudad Rosada; Pukará, una de las culturas preincas más importantes de la región y cuna del famoso Torito de Pukará; y Tinajani, un impresionante conjunto de formaciones rocosas naturales.',
  },
  {
    slug: 'lodge-en-uros-1-dia-1-noche',
    title: 'Lodge en Uros 1/2 Día y 1 Noche',
    duration: '2 días / 1 noche',
    price_adult: 85.00,
    category_slug: 'multi-dia',
    location: 'Islas Uros',
    destination_slug: 'puno',
    tag: 'Multi-Día',
    description: 'Vive una experiencia única sobre el Lago Titicaca hospedándote en un acogedor lodge flotante en las Islas Uros. Disfruta de un recorrido en embarcación de totora por la Reserva Nacional del Titicaca, contempla impresionantes paisajes naturales y pasa una noche rodeado de tranquilidad con vistas espectaculares del lago.',
  },

  // ── CUSCO ─────────────────────────────────────────────────────────────────
  {
    slug: 'machu-picchu-full-day',
    title: 'Machu Picchu Full Day',
    duration: '14h',
    price_adult: 318.00,
    category_slug: 'cultura',
    location: 'Machu Picchu',
    destination_slug: 'cusco',
    tag: 'Cultura',
    description: 'Descubre la maravilla más emblemática del Perú en una experiencia inolvidable hacia la legendaria ciudadela de Machu Picchu. Viaja a través de espectaculares paisajes andinos, explora uno de los sitios arqueológicos más impresionantes del mundo junto a un guía profesional y captura la clásica fotografía en este destino declarado Patrimonio de la Humanidad y una de las Nuevas Siete Maravillas del Mundo.',
  },
  {
    slug: 'montana-de-colores-vinicunca',
    title: 'Montaña de Colores (Vinicunca)',
    duration: '12h',
    price_adult: 41.00,
    category_slug: 'naturaleza',
    location: 'Vinicunca',
    destination_slug: 'cusco',
    tag: 'Naturaleza',
    description: 'Atrévete a descubrir uno de los paisajes más impresionantes del Perú. Recorre los majestuosos Andes hasta llegar a la famosa Montaña de Colores, una maravilla natural conocida por sus sorprendentes tonalidades minerales. Disfruta de espectaculares vistas panorámicas, vive una experiencia única en plena naturaleza y captura fotografías inolvidables.',
  },
  {
    slug: 'laguna-humantay',
    title: 'Laguna Humantay',
    duration: '13h',
    price_adult: 38.00,
    category_slug: 'naturaleza',
    location: 'Humantay',
    destination_slug: 'cusco',
    tag: 'Naturaleza',
    description: 'Descubre uno de los tesoros naturales más impresionantes de Cusco. La Laguna Humantay cautiva a sus visitantes con sus espectaculares aguas turquesas y el imponente paisaje de montañas nevadas que la rodean. Disfruta de una emocionante caminata por los Andes peruanos y contempla una de las vistas más fotografiadas y admiradas del país.',
  },
  {
    slug: 'montana-de-colores-atv',
    title: 'Montaña de Colores ATV',
    duration: '14h',
    price_adult: 95.00,
    category_slug: 'aventura',
    location: 'Vinicunca',
    destination_slug: 'cusco',
    tag: 'Aventura',
    description: 'Vive la aventura de llegar a la famosa Montaña de Colores a bordo de una emocionante cuatrimoto. Recorre impresionantes paisajes andinos rodeados de nevados, valles y fauna altoandina, disfrutando de una experiencia llena de adrenalina y naturaleza.',
  },
  {
    slug: 'city-tour-cusco',
    title: 'City Tour Cusco',
    duration: '5h',
    price_adult: 20.00,
    category_slug: 'city-tour',
    location: 'Cusco',
    destination_slug: 'cusco',
    tag: 'City Tour',
    description: 'Descubre la antigua capital del Imperio Inca en un recorrido lleno de historia y cultura. Visita el majestuoso Qoricancha, considerado el templo más importante del Tahuantinsuyo, y explora los impresionantes complejos arqueológicos de Sacsayhuamán, Qenqo, Pucapucara y Tambomachay.',
  },
  {
    slug: 'mirabus-cusco',
    title: 'Mirabus Cusco',
    duration: '2h 30min',
    price_adult: 13.00,
    category_slug: 'city-tour',
    location: 'Cusco',
    destination_slug: 'cusco',
    tag: 'City Tour',
    description: 'Conoce Cusco de una forma cómoda y entretenida a bordo de un moderno bus panorámico. Recorre el centro histórico de la ciudad, disfruta de impresionantes vistas de los principales atractivos turísticos y descubre la riqueza cultural e histórica de la antigua capital del Imperio Inca.',
  },
  {
    slug: 'city-tour-cusco-realidad-virtual',
    title: 'City Tour Cusco en Realidad Virtual',
    duration: '6h',
    price_adult: 36.00,
    category_slug: 'city-tour',
    location: 'Cusco',
    destination_slug: 'cusco',
    tag: 'City Tour',
    description: 'Vive una experiencia innovadora que combina historia y tecnología en el corazón de Cusco. Recorre los principales atractivos arqueológicos e históricos de la ciudad mientras utilizas lentes de realidad virtual para descubrir cómo lucían estos impresionantes lugares durante el Imperio Inca.',
  },
  {
    slug: 'tour-bus-180-escenico',
    title: 'Tour Bus 180° Escénico',
    duration: '2h 30min',
    price_adult: 31.00,
    category_slug: 'city-tour',
    location: 'Cusco',
    destination_slug: 'cusco',
    tag: 'City Tour',
    description: 'Disfruta de una experiencia única recorriendo Cusco a bordo de un moderno bus panorámico. Admira espectaculares vistas de la ciudad desde el Cristo Blanco y finaliza la experiencia con una demostración y degustación del famoso Pisco Sour.',
  },
  {
    slug: 'valle-sagrado-vip',
    title: 'Valle Sagrado VIP',
    duration: '11h 30min',
    price_adult: 30.00,
    category_slug: 'cultura',
    location: 'Valle Sagrado',
    destination_slug: 'cusco',
    tag: 'Cultura',
    description: 'Descubre los tesoros más impresionantes del Valle Sagrado de los Incas en un recorrido completo que combina historia, cultura y paisajes espectaculares. Explora Chinchero, los enigmáticos andenes de Moray, las famosas Salineras de Maras, la fortaleza de Ollantaytambo y el complejo arqueológico de Pisac. Además, disfruta de un delicioso almuerzo buffet en el corazón del Valle Sagrado.',
  },
  {
    slug: 'valle-sagrado-tradicional',
    title: 'Valle Sagrado Tradicional',
    duration: '10h',
    price_adult: 30.00,
    category_slug: 'cultura',
    location: 'Valle Sagrado',
    destination_slug: 'cusco',
    tag: 'Cultura',
    description: 'Recorre el legendario Valle Sagrado de los Incas y descubre algunos de los sitios arqueológicos más importantes de Cusco. Admira las impresionantes terrazas de Pisac, explora la majestuosa fortaleza de Ollantaytambo y conoce las tradiciones ancestrales de Chinchero.',
  },
  {
    slug: 'tour-mistico',
    title: 'Tour Místico',
    duration: '4h',
    price_adult: 30.00,
    category_slug: 'mistico',
    location: 'Cusco, Huasao',
    destination_slug: 'cusco',
    tag: 'Místico',
    description: 'Descubre un recorrido diferente y lleno de magia por los atractivos más sorprendentes de los alrededores de Cusco. Explora la impresionante Morada de los Dioses, admira las curiosas esculturas del Valle de los Duendes, recorre el encantador Humedal de Huasao y déjate sorprender por el misterioso Parque de los Ents.',
  },
  {
    slug: 'taller-toritos-de-pucara',
    title: 'Taller Toritos de Pucará',
    duration: '2h',
    price_adult: 44.00,
    category_slug: 'cultura',
    location: 'Cusco',
    destination_slug: 'cusco',
    tag: 'Cultura',
    description: 'Vive una experiencia cultural única y despierta tu creatividad participando en un auténtico taller artístico cusqueño. Aprende sobre el significado de los tradicionales Toritos de Pucará mientras pintas tu propia pieza de cerámica o lienzo guiado por artistas locales.',
  },
  {
    slug: 'maras-moray-salineras',
    title: 'Maras, Moray y Salineras',
    duration: '7h',
    price_adult: 28.00,
    category_slug: 'cultura',
    location: 'Maras',
    destination_slug: 'cusco',
    tag: 'Cultura',
    description: 'Descubre tres de los atractivos más fascinantes del Valle Sagrado. Explora los misteriosos andenes circulares de Moray, considerados un laboratorio agrícola inca, recorre el tradicional pueblo de Maras y maravíllate con las impresionantes Salineras.',
  },
  {
    slug: 'walking-tour-cusco-historico',
    title: 'Walking Tour Cusco Histórico',
    duration: '3h',
    price_adult: 19.00,
    category_slug: 'cultura',
    location: 'Cusco',
    destination_slug: 'cusco',
    tag: 'Cultura',
    description: 'Descubre el encanto de Cusco caminando por sus calles llenas de historia, cultura y tradición. Recorre la Plaza de Armas, admira la arquitectura colonial de la Catedral y la Compañía de Jesús, conoce la famosa Piedra de los 12 Ángulos, explora el artístico barrio de San Blas.',
  },
  {
    slug: 'walking-tour-cusco-tradicional',
    title: 'Walking Tour Cusco Tradicional',
    duration: '3h',
    price_adult: 19.00,
    category_slug: 'cultura',
    location: 'Cusco',
    destination_slug: 'cusco',
    tag: 'Cultura',
    description: 'Sumérgete en la esencia de Cusco recorriendo sus calles históricas y descubriendo los secretos de la antigua capital inca. Visita los principales monumentos coloniales, conoce el emblemático barrio de San Blas, admira la famosa Piedra de los 12 Ángulos.',
  },
  {
    slug: 'free-walking-tour-cusco-miradores',
    title: 'Free Walking Tour Cusco Miradores',
    duration: '3h',
    price_adult: 20.00,
    category_slug: 'city-tour',
    location: 'Cusco',
    destination_slug: 'cusco',
    tag: 'City Tour',
    description: 'Descubre Cusco desde sus mejores puntos panorámicos en un recorrido lleno de historia, cultura y vistas espectaculares. Explora la Plaza de Armas, el encantador barrio de San Blas, la famosa Piedra de los 12 Ángulos y visita el Mirador de San Cristóbal para contemplar la ciudad desde las alturas.',
  },
  {
    slug: 'waqrapukara',
    title: 'Waqrapukara',
    duration: '13h',
    price_adult: 47.00,
    category_slug: 'trekking',
    location: 'Waqrapukara',
    destination_slug: 'cusco',
    tag: 'Trekking',
    description: 'Descubre uno de los secretos mejor guardados de Cusco en una aventura hacia Waqrapukara, una impresionante fortaleza inca enclavada entre montañas y cañones. Disfruta de una caminata rodeada de espectaculares paisajes andinos y maravíllate con esta enigmática construcción en forma de cuernos.',
  },
  {
    slug: 'palcoyo-montana-de-colores-alternativa',
    title: 'Palcoyo – Montaña de Colores Alternativa',
    duration: '12h',
    price_adult: 43.00,
    category_slug: 'naturaleza',
    location: 'Palcoyo',
    destination_slug: 'cusco',
    tag: 'Naturaleza',
    description: 'Descubre la belleza de Palcoyo, la alternativa perfecta a la Montaña de Colores. Disfruta de una caminata suave rodeada de impresionantes paisajes andinos, contempla hasta tres montañas multicolores en un solo recorrido y admira el espectacular Bosque de Piedras.',
  },
  {
    slug: '7-lagunas-de-ausangate-full-day',
    title: '7 Lagunas de Ausangate Full Day',
    duration: '14h',
    price_adult: 42.00,
    category_slug: 'trekking',
    location: 'Ausangate',
    destination_slug: 'cusco',
    tag: 'Trekking',
    description: 'Explora uno de los paisajes más espectaculares de los Andes peruanos en una aventura rodeada de montañas nevadas, lagunas de intensos colores turquesa, verde y azul, y una increíble biodiversidad altoandina. Recorre las impresionantes 7 Lagunas de Ausangate y relájate en las aguas termales de Pacchanta.',
  },
  {
    slug: 'cuatrimotos-maras-moray-salineras-zipline',
    title: 'Cuatrimotos Maras, Moray, Salineras + Zipline',
    duration: '8h',
    price_adult: 73.00,
    category_slug: 'aventura',
    location: 'Maras',
    destination_slug: 'cusco',
    tag: 'Aventura',
    description: 'Vive una experiencia llena de adrenalina recorriendo los impresionantes paisajes del Valle Sagrado a bordo de cuatrimotos. Explora los enigmáticos andenes de Moray, admira las famosas Salineras de Maras y disfruta de increíbles vistas. La aventura continúa con una emocionante experiencia de Zipline.',
  },
  {
    slug: 'cuatrimotos-morada-de-los-dioses',
    title: 'Cuatrimotos Morada de los Dioses',
    duration: '2h',
    price_adult: 35.00,
    category_slug: 'aventura',
    location: 'Cusco',
    destination_slug: 'cusco',
    tag: 'Aventura',
    description: 'Disfruta de una emocionante aventura en cuatrimotos por los alrededores de Cusco y descubre la impresionante Morada de los Dioses. Recorre hermosos paisajes andinos mientras conduces por rutas especialmente diseñadas para la aventura.',
  },
  {
    slug: 'queswachaca-full-day',
    title: 'Queswachaca Full Day',
    duration: '12h',
    price_adult: 47.00,
    category_slug: 'cultura',
    location: "Q'eswachaka",
    destination_slug: 'cusco',
    tag: 'Cultura',
    description: 'Descubre una de las tradiciones vivas más impresionantes del Perú visitando el legendario Puente Q\'eswachaka, el último puente colgante inca aún reconstruido de forma ancestral por las comunidades locales.',
  },
  {
    slug: 'valle-sur',
    title: 'Valle Sur',
    duration: '9h',
    price_adult: 26.00,
    category_slug: 'cultura',
    location: 'Tipón',
    destination_slug: 'cusco',
    tag: 'Cultura',
    description: 'Explora los tesoros históricos y arqueológicos del sur de Cusco. Descubre Tipón, una impresionante obra maestra de la ingeniería hidráulica inca, y recorre Pikillaqta, una de las ciudades más importantes de la cultura Wari.',
  },
  {
    slug: 'glaciar-quelccaya-full-day',
    title: 'Glaciar Quelccaya Full Day',
    duration: '17h 30min',
    price_adult: 60.00,
    category_slug: 'naturaleza',
    location: 'Glaciar Quelccaya',
    destination_slug: 'cusco',
    tag: 'Naturaleza',
    description: 'Vive una aventura inolvidable hacia el majestuoso Glaciar Quelccaya, considerado el glaciar tropical más grande del mundo. Recorre impresionantes paisajes andinos, observa vicuñas y lagunas de aguas cristalinas mientras exploras la espectacular Cordillera Vilcanota.',
  },
  {
    slug: 'montana-pallay-punchu',
    title: 'Montaña Pallay Punchu',
    duration: '13h 30min',
    price_adult: 50.00,
    category_slug: 'trekking',
    location: 'Pallay Punchu',
    destination_slug: 'cusco',
    tag: 'Trekking',
    description: 'Descubre una de las montañas más sorprendentes de Cusco, famosa por sus coloridas formaciones geológicas que asemejan un poncho andino extendido. Además, complementa la experiencia visitando el histórico Complejo Arqueológico de Raqchi.',
  },
  {
    slug: 'matrimonio-andino-kasarakuy',
    title: 'Matrimonio Andino o Kasarakuy y Pago a la Tierra',
    duration: '4h',
    price_adult: 230.00,
    category_slug: 'mistico',
    location: 'Chinchero',
    destination_slug: 'cusco',
    tag: 'Místico',
    description: 'Vive una ceremonia ancestral única en el corazón del Valle Sagrado de los Incas. Participa en el tradicional Kasarakuy, un ritual andino de unión espiritual guiado por un maestro andino, acompañado del sagrado Pago a la Pachamama.',
  },
  {
    slug: 'pachamanca-full-day',
    title: 'Pachamanca Full Day',
    duration: 'Full Day',
    price_adult: 112.00,
    category_slug: 'gastronomia',
    location: 'Chinchero',
    destination_slug: 'cusco',
    tag: 'Gastronomía',
    description: 'Vive una auténtica experiencia cultural en el tradicional pueblo de Chinchero y descubre los secretos de la Pachamanca, uno de los platos más emblemáticos de la gastronomía peruana. Participa en la preparación ancestral de los alimentos cocinados bajo tierra.',
  },
  {
    slug: 'mesalpata-ccorihuayrachinamocco',
    title: 'Mesalpata o Ccorihuayrachinamocco',
    duration: 'Full Day',
    price_adult: 180.00,
    category_slug: 'cultura',
    location: 'Cuper Ccasapata',
    destination_slug: 'cusco',
    tag: 'Cultura',
    description: 'Vive una auténtica experiencia cultural en la comunidad de Cuper Ccasapata, donde compartirás tradiciones andinas junto a los pobladores locales. Disfruta de una caminata acompañada de alpacas, conoce plantas medicinales ancestrales.',
  },
];

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🌱  Seeding Supabase...\n');

  // 1. Upsert destinations
  const { data: dests, error: destErr } = await supabase
    .from('destinations')
    .upsert([
      { name: 'Lima',     slug: 'lima' },
      { name: 'Cusco',    slug: 'cusco' },
      { name: 'Arequipa', slug: 'arequipa' },
      { name: 'Puno',     slug: 'puno' },
    ], { onConflict: 'slug' })
    .select();

  if (destErr) { console.error('❌  destinations:', destErr.message); process.exit(1); }
  console.log(`✅  Destinations: ${dests?.length}`);

  // 2. Upsert categories
  const { data: cats, error: catErr } = await supabase
    .from('categories')
    .upsert([
      { name: 'City Tour',   slug: 'city-tour' },
      { name: 'Aventura',    slug: 'aventura' },
      { name: 'Naturaleza',  slug: 'naturaleza' },
      { name: 'Cultura',     slug: 'cultura' },
      { name: 'Trekking',    slug: 'trekking' },
      { name: 'Gastronomía', slug: 'gastronomia' },
      { name: 'Místico',     slug: 'mistico' },
      { name: 'Multi-Día',   slug: 'multi-dia' },
    ], { onConflict: 'slug' })
    .select();

  if (catErr) { console.error('❌  categories:', catErr.message); process.exit(1); }
  console.log(`✅  Categories: ${cats?.length}`);

  // Build lookup maps
  const destMap: Record<string, string> = {};
  for (const d of dests || []) destMap[d.slug] = d.id;

  const catMap: Record<string, string> = {};
  for (const c of cats || []) catMap[c.slug] = c.id;

  // 3. Insert / upsert tours
  let seeded = 0;
  let failed = 0;

  for (const tour of TOURS) {
    const photos = photoMap[tour.slug] || [];
    const imageUrl = photos[0] || '';

    const payload = {
      slug:            tour.slug,
      title:           tour.title,
      description:     tour.description,
      duration:        tour.duration,
      price_adult:     tour.price_adult,
      price_child:     null,
      tag:             tour.tag || null,
      location:        tour.location,
      image_url:       imageUrl,
      images:          photos,
      is_active:       true,
      rating:          4.8,
      reviews_count:   Math.floor(Math.random() * 150) + 30,
      category_id:     catMap[tour.category_slug] || null,
      destination_id:  destMap[tour.destination_slug] || null,
    };

    const { error } = await supabase
      .from('tours')
      .upsert(payload, { onConflict: 'slug' });

    if (error) {
      console.error(`  ❌  ${tour.slug}: ${error.message}`);
      failed++;
    } else {
      console.log(`  ✅  ${tour.slug} (${photos.length} photos)`);
      seeded++;
    }
  }

  console.log(`\n📊  Seeded: ${seeded}  |  Failed: ${failed}`);
}

main().catch(err => { console.error(err); process.exit(1); });
