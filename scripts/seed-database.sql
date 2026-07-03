-- ============================================================
-- SEED SCRIPT: Destinations, Categories, Tours
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- Step 1: Insert Destinations
INSERT INTO destinations (name, slug) VALUES
  ('Lima', 'lima'),
  ('Cusco', 'cusco'),
  ('Arequipa', 'arequipa'),
  ('Puno', 'puno')
ON CONFLICT (slug) DO NOTHING;

-- Step 2: Insert Categories
INSERT INTO categories (name, slug) VALUES
  ('City Tour', 'city-tour'),
  ('Aventura', 'aventura'),
  ('Naturaleza', 'naturaleza'),
  ('Cultura & Historia', 'cultura'),
  ('Trekking', 'trekking'),
  ('Gastronomía', 'gastronomia'),
  ('Místico & Espiritual', 'mistico'),
  ('Multi-Día', 'multi-dia')
ON CONFLICT (slug) DO NOTHING;

-- Step 3: Add location column if not exists
ALTER TABLE tours ADD COLUMN IF NOT EXISTS location VARCHAR(255);

-- Step 4: Insert all tours
-- Uses subqueries to get destination_id and category_id by slug

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'paracas-ica-huacachina-full-day',
  'Paracas, Ica & Huacachina Full Day',
  'Vive una aventura inolvidable explorando las impresionantes Islas Ballestas, la mágica Huacachina y la famosa Ruta del Vino en Ica y Chincha. Disfruta de tubulares, sandboarding, degustación de piscos, chocolates artesanales y un espectacular show de música negra.',
  '14h',
  80.0,
  NULL,
  'Aventura',
  'Paracas, Ica',
  '/tours/lima/paracas-ica-huacachina-full-day/01.jpg',
  ARRAY['/tours/lima/paracas-ica-huacachina-full-day/01.jpg','/tours/lima/paracas-ica-huacachina-full-day/02.jpg','/tours/lima/paracas-ica-huacachina-full-day/03.jpg','/tours/lima/paracas-ica-huacachina-full-day/04.jpg','/tours/lima/paracas-ica-huacachina-full-day/05.jpg','/tours/lima/paracas-ica-huacachina-full-day/06.jpg','/tours/lima/paracas-ica-huacachina-full-day/07.jpg','/tours/lima/paracas-ica-huacachina-full-day/08.jpg','/tours/lima/paracas-ica-huacachina-full-day/09.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'aventura' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'lima' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'lineas-de-nazca-full-day',
  'Líneas de Nazca Full Day',
  'Vive una experiencia única sobrevolando las enigmáticas Líneas de Nazca, uno de los mayores misterios arqueológicos del mundo. Admira impresionantes figuras trazadas en el desierto y disfruta de una aventura inolvidable desde Lima.',
  '18h',
  232.0,
  NULL,
  'Popular',
  'Nazca, Ica',
  '/tours/lima/lineas-de-nazca-full-day/01.jpg',
  ARRAY['/tours/lima/lineas-de-nazca-full-day/01.jpg','/tours/lima/lineas-de-nazca-full-day/02.jpg','/tours/lima/lineas-de-nazca-full-day/03.png','/tours/lima/lineas-de-nazca-full-day/04.png','/tours/lima/lineas-de-nazca-full-day/05.png','/tours/lima/lineas-de-nazca-full-day/06.png']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'cultura' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'lima' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'city-tour-lima',
  'City Tour Lima',
  'Descubre la fascinante historia de Lima recorriendo sus etapas ancestral, colonial y moderna. Visita la emblemática Huaca Pucllana, explora el Centro Histórico con sus impresionantes plazas y monumentos coloniales, conoce las misteriosas Catacumbas de San Francisco y disfruta de los modernos atractivos de Miraflores y el Parque del Amor en un recorrido lleno de cultura, historia y tradición.',
  '5h',
  0.00,
  NULL,
  'Popular',
  'Lima',
  '/tours/lima/city-tour-lima/01.jpg',
  ARRAY['/tours/lima/city-tour-lima/01.jpg','/tours/lima/city-tour-lima/02.jpg','/tours/lima/city-tour-lima/03.jpg','/tours/lima/city-tour-lima/04.jpg','/tours/lima/city-tour-lima/05.jpg','/tours/lima/city-tour-lima/06.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'city-tour' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'lima' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'circuito-magico-de-aguas',
  'Circuito Mágico de Aguas',
  'Disfruta de una noche inolvidable en el impresionante Circuito Mágico del Agua, reconocido por Guinness World Records como el complejo de fuentes más grande del mundo. Maravíllate con espectaculares juegos de agua, luces y música en el hermoso Parque de la Reserva, uno de los atractivos más visitados de Lima.',
  '3h',
  29.0,
  NULL,
  'Nocturno',
  'Lima',
  '/tours/lima/circuito-magico-de-aguas/01.jpg',
  ARRAY['/tours/lima/circuito-magico-de-aguas/01.jpg','/tours/lima/circuito-magico-de-aguas/02.jpg','/tours/lima/circuito-magico-de-aguas/03.jpg','/tours/lima/circuito-magico-de-aguas/04.jpg','/tours/lima/circuito-magico-de-aguas/05.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'cultura' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'lima' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'islas-palomino',
  'Islas Palomino',
  'Embárcate en una emocionante aventura por las costas del Callao y descubre las impresionantes Islas Palomino. Navega entre islas llenas de historia, observa aves marinas en su entorno natural y vive la experiencia única de nadar junto a miles de lobos marinos.',
  '4h',
  63.0,
  NULL,
  'Naturaleza',
  'Callao, Lima',
  '/tours/lima/islas-palomino/01.jpg',
  ARRAY['/tours/lima/islas-palomino/01.jpg','/tours/lima/islas-palomino/02.jpg','/tours/lima/islas-palomino/03.jpg','/tours/lima/islas-palomino/04.jpg','/tours/lima/islas-palomino/05.jpg','/tours/lima/islas-palomino/06.jpg','/tours/lima/islas-palomino/07.jpg','/tours/lima/islas-palomino/08.jpg','/tours/lima/islas-palomino/09.jpg','/tours/lima/islas-palomino/10.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'naturaleza' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'lima' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'santuario-de-pachacamac',
  'Santuario de Pachacámac',
  'Descubre uno de los centros ceremoniales más importantes del antiguo Perú en un fascinante recorrido por el Santuario de Pachacámac. Explora templos, pirámides y palacios llenos de historia, conoce el mítico Templo del Sol y finaliza la experiencia recorriendo el encantador distrito bohemio de Barranco y su famoso Puente de los Suspiros.',
  '4h',
  32.0,
  NULL,
  'Historia',
  'Pachacámac, Lima',
  '/tours/lima/santuario-de-pachacamac/01.jpg',
  ARRAY['/tours/lima/santuario-de-pachacamac/01.jpg','/tours/lima/santuario-de-pachacamac/02.jpg','/tours/lima/santuario-de-pachacamac/03.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'cultura' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'lima' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'museo-larco',
  'Museo Larco',
  'Sumérgete en más de 5,000 años de historia peruana visitando uno de los museos más prestigiosos de Latinoamérica. Recorre sus hermosos jardines, admira impresionantes colecciones de oro, textiles y cerámicas prehispánicas, y descubre piezas únicas que revelan el legado de las antiguas civilizaciones del Perú.',
  '4h',
  43.0,
  NULL,
  'Cultura',
  'Lima',
  '/tours/lima/museo-larco/01.jpg',
  ARRAY['/tours/lima/museo-larco/01.jpg','/tours/lima/museo-larco/02.jpg','/tours/lima/museo-larco/03.jpg','/tours/lima/museo-larco/04.png','/tours/lima/museo-larco/05.jpg','/tours/lima/museo-larco/06.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'cultura' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'lima' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'tour-gastronomico-lima',
  'Tour Gastronómico Lima',
  'Descubre por qué Lima es considerada una de las capitales gastronómicas del mundo. Recorre un tradicional mercado local, conoce los ingredientes más representativos de la cocina peruana, degusta exóticas frutas nativas y participa en una divertida clase de cocina donde aprenderás a preparar el auténtico ceviche peruano y el tradicional pisco sour.',
  '4h',
  103.0,
  NULL,
  'Gastronomía',
  'Lima',
  '/tours/lima/tour-gastronomico-lima/01.jpg',
  ARRAY['/tours/lima/tour-gastronomico-lima/01.jpg','/tours/lima/tour-gastronomico-lima/02.jpg','/tours/lima/tour-gastronomico-lima/03.jpg','/tours/lima/tour-gastronomico-lima/04.jpg','/tours/lima/tour-gastronomico-lima/05.jpg','/tours/lima/tour-gastronomico-lima/06.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'gastronomia' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'lima' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'city-tour-arequipa-half-day',
  'City Tour Arequipa (Half Day)',
  'Recorre la encantadora Ciudad Blanca y descubre su impresionante legado colonial. Visita el famoso Monasterio de Santa Catalina, la histórica Plaza de Armas, los tradicionales barrios arequipeños y los monumentos más representativos de una de las ciudades más bellas del Perú, rodeada por majestuosos volcanes.',
  '3h',
  46.0,
  NULL,
  'Popular',
  'Arequipa',
  '/tours/arequipa/city-tour-arequipa-half-day/01.jpg',
  ARRAY['/tours/arequipa/city-tour-arequipa-half-day/01.jpg','/tours/arequipa/city-tour-arequipa-half-day/02.jpg','/tours/arequipa/city-tour-arequipa-half-day/03.jpg','/tours/arequipa/city-tour-arequipa-half-day/04.jpg','/tours/arequipa/city-tour-arequipa-half-day/05.jpg','/tours/arequipa/city-tour-arequipa-half-day/06.jpg','/tours/arequipa/city-tour-arequipa-half-day/07.jpg','/tours/arequipa/city-tour-arequipa-half-day/08.jpg','/tours/arequipa/city-tour-arequipa-half-day/09.jpg','/tours/arequipa/city-tour-arequipa-half-day/10.jpg','/tours/arequipa/city-tour-arequipa-half-day/11.jpg','/tours/arequipa/city-tour-arequipa-half-day/12.jpg','/tours/arequipa/city-tour-arequipa-half-day/13.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'city-tour' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'arequipa' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'city-tour-arequipa-yanahuara-carmen-alto',
  'City Tour Arequipa + Yanahuara + Carmen Alto',
  'Descubre la belleza de Arequipa recorriendo sus principales atractivos históricos y culturales. Disfruta de espectaculares vistas de los volcanes desde los miradores de Yanahuara y Carmen Alto, admira el impresionante Valle de Chilina y explora el emblemático Monasterio de Santa Catalina, considerado uno de los tesoros arquitectónicos más importantes del Perú.',
  '3h',
  64.0,
  NULL,
  'Popular',
  'Arequipa',
  '/tours/arequipa/city-tour-arequipa-yanahuara-carmen-alto/01.jpg',
  ARRAY['/tours/arequipa/city-tour-arequipa-yanahuara-carmen-alto/01.jpg','/tours/arequipa/city-tour-arequipa-yanahuara-carmen-alto/02.jpg','/tours/arequipa/city-tour-arequipa-yanahuara-carmen-alto/03.jpg','/tours/arequipa/city-tour-arequipa-yanahuara-carmen-alto/04.jpg','/tours/arequipa/city-tour-arequipa-yanahuara-carmen-alto/05.jpg','/tours/arequipa/city-tour-arequipa-yanahuara-carmen-alto/06.jpg','/tours/arequipa/city-tour-arequipa-yanahuara-carmen-alto/07.jpg','/tours/arequipa/city-tour-arequipa-yanahuara-carmen-alto/08.jpg','/tours/arequipa/city-tour-arequipa-yanahuara-carmen-alto/09.jpg','/tours/arequipa/city-tour-arequipa-yanahuara-carmen-alto/10.jpg','/tours/arequipa/city-tour-arequipa-yanahuara-carmen-alto/11.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'city-tour' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'arequipa' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'tour-campina-arequipena-mirabus',
  'Tour Campiña Arequipeña - Mirabús',
  'Recorre los paisajes más hermosos de la campiña arequipeña a bordo de un cómodo Mirabús panorámico. Disfruta de impresionantes vistas de los volcanes Misti, Chachani y Pichu Pichu, visita los tradicionales distritos de Yanahuara y Carmen Alto, conoce la histórica Mansión del Fundador y descubre el encantador Molino de Sabandía en una experiencia llena de cultura, historia y naturaleza.',
  '4h',
  18.0,
  NULL,
  'Popular',
  'Arequipa',
  '/tours/arequipa/tour-campina-arequipena-mirabus/01.jpg',
  ARRAY['/tours/arequipa/tour-campina-arequipena-mirabus/01.jpg','/tours/arequipa/tour-campina-arequipena-mirabus/02.jpg','/tours/arequipa/tour-campina-arequipena-mirabus/03.jpg','/tours/arequipa/tour-campina-arequipena-mirabus/04.jpg','/tours/arequipa/tour-campina-arequipena-mirabus/05.jpg','/tours/arequipa/tour-campina-arequipena-mirabus/06.jpg','/tours/arequipa/tour-campina-arequipena-mirabus/07.jpg','/tours/arequipa/tour-campina-arequipena-mirabus/08.jpg','/tours/arequipa/tour-campina-arequipena-mirabus/09.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'city-tour' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'arequipa' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'ruta-del-sillar-half-day',
  'Ruta del Sillar (Half Day)',
  'Descubre los orígenes de la Ciudad Blanca en una fascinante excursión por la Ruta del Sillar. Visita las impresionantes canteras de piedra volcánica donde nació la arquitectura arequipeña, observa el trabajo artesanal de los canteros y explora la misteriosa Quebrada de Culebrillas, un espectacular paisaje natural lleno de historia y cultura.',
  '4h',
  28.0,
  NULL,
  'Historia',
  'Arequipa',
  '/tours/arequipa/ruta-del-sillar-half-day/01.jpg',
  ARRAY['/tours/arequipa/ruta-del-sillar-half-day/01.jpg','/tours/arequipa/ruta-del-sillar-half-day/02.jpg','/tours/arequipa/ruta-del-sillar-half-day/03.jpg','/tours/arequipa/ruta-del-sillar-half-day/04.jpg','/tours/arequipa/ruta-del-sillar-half-day/05.jpg','/tours/arequipa/ruta-del-sillar-half-day/06.jpg','/tours/arequipa/ruta-del-sillar-half-day/07.jpg','/tours/arequipa/ruta-del-sillar-half-day/08.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'cultura' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'arequipa' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'canon-del-colca-2-dias-1-noche',
  'Cañón del Colca 2 Días / 1 Noche',
  'Vive una experiencia inolvidable explorando el espectacular Cañón del Colca en un recorrido de dos días. Disfruta de impresionantes paisajes andinos, observa vicuñas en su hábitat natural, relájate en los baños termales de La Calera y contempla el majestuoso vuelo del cóndor desde la famosa Cruz del Cóndor.',
  '2 días / 1 noche',
  42.0,
  NULL,
  'Multi-Día',
  'Colca, Arequipa',
  '/tours/arequipa/canon-del-colca-2-dias-1-noche/01.jpg',
  ARRAY['/tours/arequipa/canon-del-colca-2-dias-1-noche/01.jpg','/tours/arequipa/canon-del-colca-2-dias-1-noche/02.jpg','/tours/arequipa/canon-del-colca-2-dias-1-noche/03.jpg','/tours/arequipa/canon-del-colca-2-dias-1-noche/04.jpg','/tours/arequipa/canon-del-colca-2-dias-1-noche/05.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'multi-dia' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'arequipa' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'trekking-canon-del-colca-3-dias-2-noches',
  'Trekking Cañón del Colca 3 Días / 2 Noches',
  'Vive una aventura única recorriendo a pie uno de los cañones más profundos del mundo. Descubre impresionantes paisajes andinos, convive con familias locales, atraviesa pintorescos pueblos tradicionales y descansa en el oasis de Sangalle rodeado de naturaleza.',
  '3 días / 2 noches',
  107.0,
  NULL,
  'Trekking',
  'Colca, Arequipa',
  '/tours/arequipa/trekking-canon-del-colca-3-dias-2-noches/01.jpg',
  ARRAY['/tours/arequipa/trekking-canon-del-colca-3-dias-2-noches/01.jpg','/tours/arequipa/trekking-canon-del-colca-3-dias-2-noches/02.jpg','/tours/arequipa/trekking-canon-del-colca-3-dias-2-noches/03.jpg','/tours/arequipa/trekking-canon-del-colca-3-dias-2-noches/04.jpg','/tours/arequipa/trekking-canon-del-colca-3-dias-2-noches/05.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'trekking' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'arequipa' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'salinas-y-aguada-blanca-half-day',
  'Salinas y Aguada Blanca (Half Day)',
  'Descubre los impresionantes paisajes de la Reserva Nacional Salinas y Aguada Blanca, uno de los ecosistemas más espectaculares del sur del Perú. Admira lagunas altoandinas rodeadas de volcanes, observa flamencos, vicuñas y alpacas en su hábitat natural, y recorre el inmenso salar donde se realiza la tradicional extracción de sal.',
  '7h',
  28.0,
  NULL,
  'Naturaleza',
  'Salinas, Arequipa',
  '/tours/arequipa/salinas-y-aguada-blanca-half-day/01.jpg',
  ARRAY['/tours/arequipa/salinas-y-aguada-blanca-half-day/01.jpg','/tours/arequipa/salinas-y-aguada-blanca-half-day/02.jpg','/tours/arequipa/salinas-y-aguada-blanca-half-day/03.jpg','/tours/arequipa/salinas-y-aguada-blanca-half-day/04.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'naturaleza' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'arequipa' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'salinas-aguada-blanca-represa-uzuna',
  'Salinas y Aguada Blanca / Represa de Uzuña',
  'Disfruta de una aventura inolvidable por los impresionantes paisajes altoandinos de Arequipa. Recorre la Reserva Nacional de Salinas y Aguada Blanca, observa vicuñas, alpacas y flamencos en su entorno natural, visita el espectacular Salar de Moche y relájate en las aguas termales de Lojen. Finaliza la experiencia en la hermosa Represa de Uzuña.',
  '11h',
  30.0,
  NULL,
  'Naturaleza',
  'Salinas, Uzuña, Arequipa',
  '/tours/arequipa/salinas-aguada-blanca-represa-uzuna/01.jpg',
  ARRAY['/tours/arequipa/salinas-aguada-blanca-represa-uzuna/01.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'naturaleza' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'arequipa' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'catarata-de-pillones',
  'Catarata de Pillones',
  'Descubre uno de los paisajes naturales más sorprendentes de Arequipa en una excursión llena de aventura y naturaleza. Recorre la Reserva Nacional Salinas y Aguada Blanca, admira el impresionante Bosque de Piedras de Puruña y llega hasta la espectacular Catarata de Pillones, donde el agua ha moldeado increíbles formaciones rocosas.',
  '11h',
  28.0,
  NULL,
  'Naturaleza',
  'Pillones, Arequipa',
  '/tours/arequipa/catarata-de-pillones/01.jpg',
  ARRAY['/tours/arequipa/catarata-de-pillones/01.jpg','/tours/arequipa/catarata-de-pillones/02.jpg','/tours/arequipa/catarata-de-pillones/03.jpg','/tours/arequipa/catarata-de-pillones/04.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'naturaleza' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'arequipa' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'valle-de-majes',
  'Valle de Majes',
  'Descubre la riqueza histórica, cultural y gastronómica del Valle de Majes. Visita los impresionantes Petroglifos de Toro Muerto, considerados una de las mayores concentraciones de arte rupestre del mundo, conoce las Huellas de Dinosaurios de Querulpa y disfruta de la tradición vitivinícola de la región con una degustación de vinos y piscos artesanales.',
  '12h',
  30.0,
  NULL,
  'Historia',
  'Majes, Arequipa',
  '/tours/arequipa/valle-de-majes/01.jpg',
  ARRAY['/tours/arequipa/valle-de-majes/01.jpg','/tours/arequipa/valle-de-majes/02.webp','/tours/arequipa/valle-de-majes/03.png','/tours/arequipa/valle-de-majes/04.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'cultura' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'arequipa' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'rafting-rio-chili-half-day',
  'Rafting Río Chili (Half Day)',
  'Vive una emocionante aventura navegando por las aguas del Río Chili, rodeado de los impresionantes paisajes del Valle de Chilina. Recorre rápidos de nivel intermedio y siente la adrenalina mientras disfrutas de una de las actividades de aventura más populares de Arequipa.',
  '3h',
  28.0,
  NULL,
  'Aventura',
  'Río Chili, Arequipa',
  '/tours/arequipa/rafting-rio-chili-half-day/01.jpg',
  ARRAY['/tours/arequipa/rafting-rio-chili-half-day/01.jpg','/tours/arequipa/rafting-rio-chili-half-day/02.webp','/tours/arequipa/rafting-rio-chili-half-day/03.jpg','/tours/arequipa/rafting-rio-chili-half-day/04.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'aventura' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'arequipa' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'puno-full-day-uros-taquile',
  'Puno Full Day – Uros & Taquile',
  'Explora las maravillas del Lago Titicaca visitando las emblemáticas Islas Flotantes de Uros y la tradicional Isla Taquile. Conoce las costumbres y tradiciones de sus habitantes, disfruta de impresionantes vistas del lago navegable más alto del mundo y descubre el arte textil que ha dado fama internacional a la comunidad de Taquile.',
  'Full Day',
  45.0,
  NULL,
  'Popular',
  'Puno, Lago Titicaca',
  '/tours/puno/puno-full-day-uros-taquile/01.jpg',
  ARRAY['/tours/puno/puno-full-day-uros-taquile/01.jpg','/tours/puno/puno-full-day-uros-taquile/02.jpg','/tours/puno/puno-full-day-uros-taquile/03.jpg','/tours/puno/puno-full-day-uros-taquile/04.jpg','/tours/puno/puno-full-day-uros-taquile/05.jpg','/tours/puno/puno-full-day-uros-taquile/06.jpg','/tours/puno/puno-full-day-uros-taquile/07.jpg','/tours/puno/puno-full-day-uros-taquile/08.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'cultura' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'puno' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'ruta-aymara-full-day',
  'Ruta Aymara Full Day',
  'Descubre la riqueza cultural, histórica y mística del altiplano puneño recorriendo la fascinante Ruta Aymara. Visita el famoso Templo de la Fertilidad en Chucuito, las enigmáticas Chullpas de Molloco, los ancestrales Waru Warus andinos y el místico portal de Aramu Muru, un lugar lleno de energía y leyendas.',
  'Full Day',
  38.0,
  NULL,
  'Cultura',
  'Chucuito, Puno',
  '/tours/puno/ruta-aymara-full-day/01.jpg',
  ARRAY['/tours/puno/ruta-aymara-full-day/01.jpg','/tours/puno/ruta-aymara-full-day/02.webp','/tours/puno/ruta-aymara-full-day/03.webp','/tours/puno/ruta-aymara-full-day/04.jpg','/tours/puno/ruta-aymara-full-day/05.jpg','/tours/puno/ruta-aymara-full-day/06.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'cultura' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'puno' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'puno-islas-uros-amantani-taquile-2d1n',
  'Puno: Islas Uros, Amantaní y Taquile 2D/1N',
  'Vive una experiencia auténtica en el Lago Titicaca compartiendo las tradiciones de sus comunidades locales. Visita las famosas Islas Flotantes de Uros, pasa una noche en la Isla Amantaní junto a una familia anfitriona y disfruta de sus costumbres, gastronomía y danzas típicas. Completa la aventura recorriendo la Isla Taquile.',
  '2 días / 1 noche',
  65.0,
  NULL,
  'Multi-Día',
  'Uros, Amantaní, Taquile, Puno',
  '/tours/puno/puno-islas-uros-amantani-taquile-2d1n/01.jpg',
  ARRAY['/tours/puno/puno-islas-uros-amantani-taquile-2d1n/01.jpg','/tours/puno/puno-islas-uros-amantani-taquile-2d1n/02.jpg','/tours/puno/puno-islas-uros-amantani-taquile-2d1n/03.jpg','/tours/puno/puno-islas-uros-amantani-taquile-2d1n/04.jpg','/tours/puno/puno-islas-uros-amantani-taquile-2d1n/05.jpg','/tours/puno/puno-islas-uros-amantani-taquile-2d1n/06.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'multi-dia' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'puno' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'islas-uros-half-day',
  'Islas Uros Half Day',
  'Explora las emblemáticas Islas Flotantes de los Uros y conoce una de las culturas más fascinantes del Lago Titicaca. Navega por sus tranquilas aguas mientras descubres las tradiciones, costumbres y estilo de vida de los habitantes de estas impresionantes islas construidas artesanalmente con totora.',
  '3h',
  20.0,
  NULL,
  'Popular',
  'Islas Uros, Puno',
  '/tours/puno/islas-uros-half-day/01.jpg',
  ARRAY['/tours/puno/islas-uros-half-day/01.jpg','/tours/puno/islas-uros-half-day/02.jpg','/tours/puno/islas-uros-half-day/03.jpg','/tours/puno/islas-uros-half-day/04.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'cultura' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'puno' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'sillustani-half-day',
  'Sillustani Half Day',
  'Descubre el impresionante complejo arqueológico de Sillustani, ubicado a orillas de la laguna Umayo. Recorre este antiguo cementerio preinca e inca, famoso por sus monumentales chullpas o torres funerarias, mientras conoces las creencias y rituales ancestrales relacionados con la vida después de la muerte.',
  '4h',
  25.0,
  NULL,
  'Historia',
  'Sillustani, Puno',
  '/tours/puno/sillustani-half-day/01.jpg',
  ARRAY['/tours/puno/sillustani-half-day/01.jpg','/tours/puno/sillustani-half-day/02.jpg','/tours/puno/sillustani-half-day/03.jpg','/tours/puno/sillustani-half-day/04.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'cultura' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'puno' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'ruta-quechua-full-day-lampa-pukara-tinajani',
  'Ruta Quechua Full Day: Lampa, Pukará y Tinajani',
  'Descubre la historia, cultura y tradición del altiplano puneño visitando Lampa, conocida como la Ciudad Rosada; Pukará, una de las culturas preincas más importantes de la región y cuna del famoso Torito de Pukará; y Tinajani, un impresionante conjunto de formaciones rocosas naturales que crean paisajes únicos.',
  '10h',
  80.0,
  NULL,
  'Cultura',
  'Lampa, Puno',
  '/tours/puno/ruta-quechua-full-day-lampa-pukara-tinajani/01.webp',
  ARRAY['/tours/puno/ruta-quechua-full-day-lampa-pukara-tinajani/01.webp','/tours/puno/ruta-quechua-full-day-lampa-pukara-tinajani/02.jpg','/tours/puno/ruta-quechua-full-day-lampa-pukara-tinajani/03.webp','/tours/puno/ruta-quechua-full-day-lampa-pukara-tinajani/04.jpg','/tours/puno/ruta-quechua-full-day-lampa-pukara-tinajani/05.jpg','/tours/puno/ruta-quechua-full-day-lampa-pukara-tinajani/06.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'cultura' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'puno' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'lodge-en-uros-1-dia-1-noche',
  'Lodge en Uros 1/2 Día y 1 Noche',
  'Vive una experiencia única sobre el Lago Titicaca hospedándote en un acogedor lodge flotante en las Islas Uros. Disfruta de un recorrido en embarcación de totora por la Reserva Nacional del Titicaca, contempla impresionantes paisajes naturales y pasa una noche rodeado de tranquilidad con vistas espectaculares del lago.',
  '2 días / 1 noche',
  85.0,
  NULL,
  'Multi-Día',
  'Islas Uros, Puno',
  '/tours/puno/lodge-en-uros-1-dia-1-noche/01.jpg',
  ARRAY['/tours/puno/lodge-en-uros-1-dia-1-noche/01.jpg','/tours/puno/lodge-en-uros-1-dia-1-noche/02.jpg','/tours/puno/lodge-en-uros-1-dia-1-noche/03.jpg','/tours/puno/lodge-en-uros-1-dia-1-noche/04.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'multi-dia' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'puno' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'machu-picchu-full-day',
  'Machu Picchu Full Day',
  'Descubre la maravilla más emblemática del Perú en una experiencia inolvidable hacia la legendaria ciudadela de Machu Picchu. Viaja a través de espectaculares paisajes andinos, explora uno de los sitios arqueológicos más impresionantes del mundo junto a un guía profesional y captura la clásica fotografía en este destino declarado Patrimonio de la Humanidad y una de las Nuevas Siete Maravillas del Mundo.',
  '14h',
  318.0,
  NULL,
  'Popular',
  'Machu Picchu, Cusco',
  '/tours/cusco/machu-picchu-full-day/01.jpg',
  ARRAY['/tours/cusco/machu-picchu-full-day/01.jpg','/tours/cusco/machu-picchu-full-day/02.jpg','/tours/cusco/machu-picchu-full-day/03.jpg','/tours/cusco/machu-picchu-full-day/04.jpg','/tours/cusco/machu-picchu-full-day/05.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'cultura' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'montana-de-colores-vinicunca',
  'Montaña de Colores (Vinicunca)',
  'Atrévete a descubrir uno de los paisajes más impresionantes del Perú. Recorre los majestuosos Andes hasta llegar a la famosa Montaña de Colores, una maravilla natural conocida por sus sorprendentes tonalidades minerales. Disfruta de espectaculares vistas panorámicas, vive una experiencia única en plena naturaleza y captura fotografías inolvidables.',
  '12h',
  41.0,
  NULL,
  'Popular',
  'Vinicunca, Cusco',
  '/tours/cusco/montana-de-colores-vinicunca/01.jpg',
  ARRAY['/tours/cusco/montana-de-colores-vinicunca/01.jpg','/tours/cusco/montana-de-colores-vinicunca/02.jpg','/tours/cusco/montana-de-colores-vinicunca/03.png','/tours/cusco/montana-de-colores-vinicunca/04.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'naturaleza' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'laguna-humantay',
  'Laguna Humantay',
  'Descubre uno de los tesoros naturales más impresionantes de Cusco. La Laguna Humantay cautiva a sus visitantes con sus espectaculares aguas turquesas y el imponente paisaje de montañas nevadas que la rodean. Disfruta de una emocionante caminata por los Andes peruanos y contempla una de las vistas más fotografiadas y admiradas del país.',
  '13h',
  38.0,
  NULL,
  'Popular',
  'Humantay, Cusco',
  '/tours/cusco/laguna-humantay/01.jpg',
  ARRAY['/tours/cusco/laguna-humantay/01.jpg','/tours/cusco/laguna-humantay/02.jpg','/tours/cusco/laguna-humantay/03.jpg','/tours/cusco/laguna-humantay/04.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'naturaleza' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'montana-de-colores-atv',
  'Montaña de Colores ATV',
  'Vive la aventura de llegar a la famosa Montaña de Colores a bordo de una emocionante cuatrimoto. Recorre impresionantes paisajes andinos rodeados de nevados, valles y fauna altoandina, disfrutando de una experiencia llena de adrenalina y naturaleza.',
  '14h',
  95.0,
  NULL,
  'Aventura',
  'Vinicunca, Cusco',
  '/tours/cusco/montana-de-colores-atv/01.jpg',
  ARRAY['/tours/cusco/montana-de-colores-atv/01.jpg','/tours/cusco/montana-de-colores-atv/02.jpg','/tours/cusco/montana-de-colores-atv/03.jpg','/tours/cusco/montana-de-colores-atv/04.jpg','/tours/cusco/montana-de-colores-atv/05.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'aventura' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'city-tour-cusco',
  'City Tour Cusco',
  'Descubre la antigua capital del Imperio Inca en un recorrido lleno de historia y cultura. Visita el majestuoso Qoricancha, considerado el templo más importante del Tahuantinsuyo, y explora los impresionantes complejos arqueológicos de Sacsayhuamán, Qenqo, Pucapucara y Tambomachay.',
  '5h',
  20.0,
  NULL,
  'Popular',
  'Cusco',
  '/tours/cusco/city-tour-cusco/01.jpg',
  ARRAY['/tours/cusco/city-tour-cusco/01.jpg','/tours/cusco/city-tour-cusco/02.jpg','/tours/cusco/city-tour-cusco/03.jpg','/tours/cusco/city-tour-cusco/04.jpg','/tours/cusco/city-tour-cusco/05.jpg','/tours/cusco/city-tour-cusco/06.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'city-tour' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'mirabus-cusco',
  'Mirabus Cusco',
  'Conoce Cusco de una forma cómoda y entretenida a bordo de un moderno bus panorámico. Recorre el centro histórico de la ciudad, disfruta de impresionantes vistas de los principales atractivos turísticos y descubre la riqueza cultural e histórica de la antigua capital del Imperio Inca.',
  '2h 30min',
  13.0,
  NULL,
  'Popular',
  'Cusco',
  '/tours/cusco/mirabus-cusco/01.png',
  ARRAY['/tours/cusco/mirabus-cusco/01.png','/tours/cusco/mirabus-cusco/02.jpg','/tours/cusco/mirabus-cusco/03.jpg','/tours/cusco/mirabus-cusco/04.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'city-tour' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'city-tour-cusco-realidad-virtual',
  'City Tour Cusco en Realidad Virtual',
  'Vive una experiencia innovadora que combina historia y tecnología en el corazón de Cusco. Recorre los principales atractivos arqueológicos e históricos de la ciudad mientras utilizas lentes de realidad virtual para descubrir cómo lucían estos impresionantes lugares durante el Imperio Inca.',
  '6h',
  36.0,
  NULL,
  'Innovador',
  'Cusco',
  '/tours/cusco/city-tour-cusco-realidad-virtual/01.webp',
  ARRAY['/tours/cusco/city-tour-cusco-realidad-virtual/01.webp','/tours/cusco/city-tour-cusco-realidad-virtual/02.jpg','/tours/cusco/city-tour-cusco-realidad-virtual/03.jpg','/tours/cusco/city-tour-cusco-realidad-virtual/04.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'city-tour' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'tour-bus-180-escenico',
  'Tour Bus 180° Escénico',
  'Disfruta de una experiencia única recorriendo Cusco a bordo de un moderno bus panorámico. Admira espectaculares vistas de la ciudad desde el Cristo Blanco y finaliza la experiencia con una demostración y degustación del famoso Pisco Sour.',
  '2h 30min',
  31.0,
  NULL,
  'Popular',
  'Cusco',
  '/tours/cusco/tour-bus-180-escenico/01.webp',
  ARRAY['/tours/cusco/tour-bus-180-escenico/01.webp','/tours/cusco/tour-bus-180-escenico/02.webp','/tours/cusco/tour-bus-180-escenico/03.jpg','/tours/cusco/tour-bus-180-escenico/04.jpg','/tours/cusco/tour-bus-180-escenico/05.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'city-tour' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'valle-sagrado-vip',
  'Valle Sagrado VIP',
  'Descubre los tesoros más impresionantes del Valle Sagrado de los Incas en un recorrido completo que combina historia, cultura y paisajes espectaculares. Explora Chinchero, los enigmáticos andenes de Moray, las famosas Salineras de Maras, la fortaleza de Ollantaytambo y el complejo arqueológico de Pisac. Además, disfruta de un delicioso almuerzo buffet en el corazón del Valle Sagrado.',
  '11h 30min',
  30.0,
  NULL,
  'Popular',
  'Valle Sagrado, Cusco',
  '/tours/cusco/valle-sagrado-vip/01.jpg',
  ARRAY['/tours/cusco/valle-sagrado-vip/01.jpg','/tours/cusco/valle-sagrado-vip/02.jpg','/tours/cusco/valle-sagrado-vip/03.jpg','/tours/cusco/valle-sagrado-vip/04.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'cultura' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'valle-sagrado-tradicional',
  'Valle Sagrado Tradicional',
  'Recorre el legendario Valle Sagrado de los Incas y descubre algunos de los sitios arqueológicos más importantes de Cusco. Admira las impresionantes terrazas de Pisac, explora la majestuosa fortaleza de Ollantaytambo y conoce las tradiciones ancestrales de Chinchero.',
  '10h',
  30.0,
  NULL,
  'Popular',
  'Valle Sagrado, Cusco',
  '/tours/cusco/valle-sagrado-tradicional/01.jpg',
  ARRAY['/tours/cusco/valle-sagrado-tradicional/01.jpg','/tours/cusco/valle-sagrado-tradicional/02.jpg','/tours/cusco/valle-sagrado-tradicional/03.jpg','/tours/cusco/valle-sagrado-tradicional/04.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'cultura' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'tour-mistico',
  'Tour Místico',
  'Descubre un recorrido diferente y lleno de magia por los atractivos más sorprendentes de los alrededores de Cusco. Explora la impresionante Morada de los Dioses, admira las curiosas esculturas del Valle de los Duendes, recorre el encantador Humedal de Huasao y déjate sorprender por el misterioso Parque de los Ents.',
  '4h',
  30.0,
  NULL,
  'Místico',
  'Cusco, Huasao',
  '/tours/cusco/tour-mistico/01.jpg',
  ARRAY['/tours/cusco/tour-mistico/01.jpg','/tours/cusco/tour-mistico/02.jpg','/tours/cusco/tour-mistico/03.png','/tours/cusco/tour-mistico/04.png','/tours/cusco/tour-mistico/05.webp']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'mistico' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'taller-toritos-de-pucara',
  'Taller Toritos de Pucará',
  'Vive una experiencia cultural única y despierta tu creatividad participando en un auténtico taller artístico cusqueño. Aprende sobre el significado de los tradicionales Toritos de Pucará mientras pintas tu propia pieza de cerámica o lienzo guiado por artistas locales.',
  '2h',
  44.0,
  NULL,
  'Cultura',
  'Cusco',
  '/tours/cusco/taller-toritos-de-pucara/01.jpg',
  ARRAY['/tours/cusco/taller-toritos-de-pucara/01.jpg','/tours/cusco/taller-toritos-de-pucara/02.jpg','/tours/cusco/taller-toritos-de-pucara/03.webp','/tours/cusco/taller-toritos-de-pucara/04.webp','/tours/cusco/taller-toritos-de-pucara/05.webp']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'cultura' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'maras-moray-salineras',
  'Maras, Moray y Salineras',
  'Descubre tres de los atractivos más fascinantes del Valle Sagrado. Explora los misteriosos andenes circulares de Moray, considerados un laboratorio agrícola inca, recorre el tradicional pueblo de Maras y maravíllate con las impresionantes Salineras.',
  '7h',
  28.0,
  NULL,
  'Popular',
  'Maras, Cusco',
  '/tours/cusco/maras-moray-salineras/01.jpg',
  ARRAY['/tours/cusco/maras-moray-salineras/01.jpg','/tours/cusco/maras-moray-salineras/02.jpg','/tours/cusco/maras-moray-salineras/03.png','/tours/cusco/maras-moray-salineras/04.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'cultura' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'walking-tour-cusco-historico',
  'Walking Tour Cusco Histórico',
  'Descubre el encanto de Cusco caminando por sus calles llenas de historia, cultura y tradición. Recorre la Plaza de Armas, admira la arquitectura colonial de la Catedral y la Compañía de Jesús, conoce la famosa Piedra de los 12 Ángulos, explora el artístico barrio de San Blas.',
  '3h',
  19.0,
  NULL,
  'Popular',
  'Cusco',
  '/tours/cusco/walking-tour-cusco-historico/01.jpg',
  ARRAY['/tours/cusco/walking-tour-cusco-historico/01.jpg','/tours/cusco/walking-tour-cusco-historico/02.jpg','/tours/cusco/walking-tour-cusco-historico/03.jpg','/tours/cusco/walking-tour-cusco-historico/04.jpg','/tours/cusco/walking-tour-cusco-historico/05.jpg','/tours/cusco/walking-tour-cusco-historico/06.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'cultura' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'walking-tour-cusco-tradicional',
  'Walking Tour Cusco Tradicional',
  'Sumérgete en la esencia de Cusco recorriendo sus calles históricas y descubriendo los secretos de la antigua capital inca. Visita los principales monumentos coloniales, conoce el emblemático barrio de San Blas, admira la famosa Piedra de los 12 Ángulos.',
  '3h',
  19.0,
  NULL,
  'Popular',
  'Cusco',
  '/tours/cusco/walking-tour-cusco-tradicional/01.jpg',
  ARRAY['/tours/cusco/walking-tour-cusco-tradicional/01.jpg','/tours/cusco/walking-tour-cusco-tradicional/02.jpg','/tours/cusco/walking-tour-cusco-tradicional/03.jpg','/tours/cusco/walking-tour-cusco-tradicional/04.jpg','/tours/cusco/walking-tour-cusco-tradicional/05.jpg','/tours/cusco/walking-tour-cusco-tradicional/06.jpg','/tours/cusco/walking-tour-cusco-tradicional/07.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'cultura' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'free-walking-tour-cusco-miradores',
  'Free Walking Tour Cusco Miradores',
  'Descubre Cusco desde sus mejores puntos panorámicos en un recorrido lleno de historia, cultura y vistas espectaculares. Explora la Plaza de Armas, el encantador barrio de San Blas, la famosa Piedra de los 12 Ángulos y visita el Mirador de San Cristóbal para contemplar la ciudad desde las alturas.',
  '3h',
  20.0,
  NULL,
  'Popular',
  'Cusco',
  '/tours/cusco/walking-tour-cusco-historico/01.jpg',
  ARRAY['/tours/cusco/walking-tour-cusco-historico/01.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'city-tour' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'waqrapukara',
  'Waqrapukara',
  'Descubre uno de los secretos mejor guardados de Cusco en una aventura hacia Waqrapukara, una impresionante fortaleza inca enclavada entre montañas y cañones. Disfruta de una caminata rodeada de espectaculares paisajes andinos y maravíllate con esta enigmática construcción en forma de cuernos.',
  '13h',
  47.0,
  NULL,
  'Trekking',
  'Waqrapukara, Cusco',
  '/tours/cusco/waqrapukara/01.jpg',
  ARRAY['/tours/cusco/waqrapukara/01.jpg','/tours/cusco/waqrapukara/02.png']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'trekking' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'palcoyo-montana-de-colores-alternativa',
  'Palcoyo – Montaña de Colores Alternativa',
  'Descubre la belleza de Palcoyo, la alternativa perfecta a la Montaña de Colores. Disfruta de una caminata suave rodeada de impresionantes paisajes andinos, contempla hasta tres montañas multicolores en un solo recorrido y admira el espectacular Bosque de Piedras.',
  '12h',
  43.0,
  NULL,
  'Naturaleza',
  'Palcoyo, Cusco',
  '/tours/cusco/palcoyo-montana-de-colores-alternativa/01.jpg',
  ARRAY['/tours/cusco/palcoyo-montana-de-colores-alternativa/01.jpg','/tours/cusco/palcoyo-montana-de-colores-alternativa/02.jpg','/tours/cusco/palcoyo-montana-de-colores-alternativa/03.jpg','/tours/cusco/palcoyo-montana-de-colores-alternativa/04.jpg','/tours/cusco/palcoyo-montana-de-colores-alternativa/05.png']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'naturaleza' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  '7-lagunas-de-ausangate-full-day',
  '7 Lagunas de Ausangate Full Day',
  'Explora uno de los paisajes más espectaculares de los Andes peruanos en una aventura rodeada de montañas nevadas, lagunas de intensos colores turquesa, verde y azul, y una increíble biodiversidad altoandina. Recorre las impresionantes 7 Lagunas de Ausangate y relájate en las aguas termales de Pacchanta.',
  '14h',
  42.0,
  NULL,
  'Aventura',
  'Ausangate, Cusco',
  '/tours/cusco/7-lagunas-de-ausangate-full-day/01.jpg',
  ARRAY['/tours/cusco/7-lagunas-de-ausangate-full-day/01.jpg','/tours/cusco/7-lagunas-de-ausangate-full-day/02.jpg','/tours/cusco/7-lagunas-de-ausangate-full-day/03.jpg','/tours/cusco/7-lagunas-de-ausangate-full-day/04.jpg','/tours/cusco/7-lagunas-de-ausangate-full-day/05.webp']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'trekking' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'cuatrimotos-maras-moray-salineras-zipline',
  'Cuatrimotos Maras, Moray, Salineras + Zipline',
  'Vive una experiencia llena de adrenalina recorriendo los impresionantes paisajes del Valle Sagrado a bordo de cuatrimotos. Explora los enigmáticos andenes de Moray, admira las famosas Salineras de Maras y disfruta de increíbles vistas. La aventura continúa con una emocionante experiencia de Zipline.',
  '8h',
  73.0,
  NULL,
  'Aventura',
  'Maras, Cusco',
  '/tours/cusco/cuatrimotos-maras-moray-salineras-zipline/01.jpg',
  ARRAY['/tours/cusco/cuatrimotos-maras-moray-salineras-zipline/01.jpg','/tours/cusco/cuatrimotos-maras-moray-salineras-zipline/02.webp','/tours/cusco/cuatrimotos-maras-moray-salineras-zipline/03.jpg','/tours/cusco/cuatrimotos-maras-moray-salineras-zipline/04.jpg','/tours/cusco/cuatrimotos-maras-moray-salineras-zipline/05.jpg','/tours/cusco/cuatrimotos-maras-moray-salineras-zipline/06.jpg','/tours/cusco/cuatrimotos-maras-moray-salineras-zipline/07.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'aventura' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'cuatrimotos-morada-de-los-dioses',
  'Cuatrimotos Morada de los Dioses',
  'Disfruta de una emocionante aventura en cuatrimotos por los alrededores de Cusco y descubre la impresionante Morada de los Dioses. Recorre hermosos paisajes andinos mientras conduces por rutas especialmente diseñadas para la aventura.',
  '2h',
  35.0,
  NULL,
  'Aventura',
  'Cusco',
  '/tours/cusco/cuatrimotos-morada-de-los-dioses/01.jpg',
  ARRAY['/tours/cusco/cuatrimotos-morada-de-los-dioses/01.jpg','/tours/cusco/cuatrimotos-morada-de-los-dioses/02.jpg','/tours/cusco/cuatrimotos-morada-de-los-dioses/03.jpg','/tours/cusco/cuatrimotos-morada-de-los-dioses/04.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'aventura' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'queswachaca-full-day',
  'Queswachaca Full Day',
  'Descubre una de las tradiciones vivas más impresionantes del Perú visitando el legendario Puente Q''eswachaka, el último puente colgante inca aún reconstruido de forma ancestral por las comunidades locales.',
  '12h',
  47.0,
  NULL,
  'Cultura',
  'Q''eswachaka, Cusco',
  '/tours/cusco/queswachaca-full-day/01.jpg',
  ARRAY['/tours/cusco/queswachaca-full-day/01.jpg','/tours/cusco/queswachaca-full-day/02.jpg','/tours/cusco/queswachaca-full-day/03.jpg','/tours/cusco/queswachaca-full-day/04.jpg','/tours/cusco/queswachaca-full-day/05.jpg','/tours/cusco/queswachaca-full-day/06.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'cultura' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'valle-sur',
  'Valle Sur',
  'Explora los tesoros históricos y arqueológicos del sur de Cusco. Descubre Tipón, una impresionante obra maestra de la ingeniería hidráulica inca, y recorre Pikillaqta, una de las ciudades más importantes de la cultura Wari.',
  '9h',
  26.0,
  NULL,
  'Historia',
  'Tipón, Cusco',
  '/tours/cusco/valle-sur/01.jpg',
  ARRAY['/tours/cusco/valle-sur/01.jpg','/tours/cusco/valle-sur/02.jpg','/tours/cusco/valle-sur/03.jpg','/tours/cusco/valle-sur/04.jpg','/tours/cusco/valle-sur/05.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'cultura' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'glaciar-quelccaya-full-day',
  'Glaciar Quelccaya Full Day',
  'Vive una aventura inolvidable hacia el majestuoso Glaciar Quelccaya, considerado el glaciar tropical más grande del mundo. Recorre impresionantes paisajes andinos, observa vicuñas y lagunas de aguas cristalinas mientras exploras la espectacular Cordillera Vilcanota.',
  '17h 30min',
  60.0,
  NULL,
  'Naturaleza',
  'Glaciar Quelccaya, Cusco',
  '/tours/cusco/glaciar-quelccaya-full-day/01.webp',
  ARRAY['/tours/cusco/glaciar-quelccaya-full-day/01.webp','/tours/cusco/glaciar-quelccaya-full-day/02.webp','/tours/cusco/glaciar-quelccaya-full-day/03.webp','/tours/cusco/glaciar-quelccaya-full-day/04.jpg','/tours/cusco/glaciar-quelccaya-full-day/05.jpg','/tours/cusco/glaciar-quelccaya-full-day/06.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'naturaleza' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'montana-pallay-punchu',
  'Montaña Pallay Punchu',
  'Descubre una de las montañas más sorprendentes de Cusco, famosa por sus coloridas formaciones geológicas que asemejan un poncho andino extendido. Además, complementa la experiencia visitando el histórico Complejo Arqueológico de Raqchi.',
  '13h 30min',
  50.0,
  NULL,
  'Trekking',
  'Pallay Punchu, Cusco',
  '/tours/cusco/montana-pallay-punchu/01.jpg',
  ARRAY['/tours/cusco/montana-pallay-punchu/01.jpg','/tours/cusco/montana-pallay-punchu/02.jpg','/tours/cusco/montana-pallay-punchu/03.jpg','/tours/cusco/montana-pallay-punchu/04.jpg','/tours/cusco/montana-pallay-punchu/05.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'trekking' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'matrimonio-andino-kasarakuy',
  'Matrimonio Andino o Kasarakuy y Pago a la Tierra',
  'Vive una ceremonia ancestral única en el corazón del Valle Sagrado de los Incas. Participa en el tradicional Kasarakuy, un ritual andino de unión espiritual guiado por un maestro andino, acompañado del sagrado Pago a la Pachamama.',
  '4h',
  230.0,
  NULL,
  'Místico',
  'Chinchero, Cusco',
  '/tours/cusco/matrimonio-andino-kasarakuy/01.jpg',
  ARRAY['/tours/cusco/matrimonio-andino-kasarakuy/01.jpg','/tours/cusco/matrimonio-andino-kasarakuy/02.jpg','/tours/cusco/matrimonio-andino-kasarakuy/03.jpg','/tours/cusco/matrimonio-andino-kasarakuy/04.jpg','/tours/cusco/matrimonio-andino-kasarakuy/05.jpg','/tours/cusco/matrimonio-andino-kasarakuy/06.jpg','/tours/cusco/matrimonio-andino-kasarakuy/07.png']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'mistico' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'pachamanca-full-day',
  'Pachamanca Full Day',
  'Vive una auténtica experiencia cultural en el tradicional pueblo de Chinchero y descubre los secretos de la Pachamanca, uno de los platos más emblemáticos de la gastronomía peruana. Participa en la preparación ancestral de los alimentos cocinados bajo tierra.',
  'Full Day',
  112.0,
  NULL,
  'Gastronomía',
  'Chinchero, Cusco',
  '/tours/cusco/pachamanca-full-day/01.jpg',
  ARRAY['/tours/cusco/pachamanca-full-day/01.jpg','/tours/cusco/pachamanca-full-day/02.jpg','/tours/cusco/pachamanca-full-day/03.jpg','/tours/cusco/pachamanca-full-day/04.jpg','/tours/cusco/pachamanca-full-day/05.jpg','/tours/cusco/pachamanca-full-day/06.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'gastronomia' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

INSERT INTO tours (slug, title, description, duration, price_adult, price_child, tag, location, image_url, images, category_id, destination_id, is_active)
SELECT
  'mesalpata-ccorihuayrachinamocco',
  'Mesalpata o Ccorihuayrachinamocco',
  'Vive una auténtica experiencia cultural en la comunidad de Cuper Ccasapata, donde compartirás tradiciones andinas junto a los pobladores locales. Disfruta de una caminata acompañada de alpacas, conoce plantas medicinales ancestrales.',
  'Full Day',
  180.0,
  NULL,
  'Cultura',
  'Cuper Ccasapata, Cusco',
  '/tours/cusco/mesalpata-ccorihuayrachinamocco/01.jpg',
  ARRAY['/tours/cusco/mesalpata-ccorihuayrachinamocco/01.jpg','/tours/cusco/mesalpata-ccorihuayrachinamocco/02.jpg','/tours/cusco/mesalpata-ccorihuayrachinamocco/03.jpg','/tours/cusco/mesalpata-ccorihuayrachinamocco/04.jpg']::TEXT[],
  (SELECT id FROM categories WHERE slug = 'cultura' LIMIT 1),
  (SELECT id FROM destinations WHERE slug = 'cusco' LIMIT 1),
  true
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  duration = EXCLUDED.duration,
  price_adult = EXCLUDED.price_adult,
  tag = EXCLUDED.tag,
  location = EXCLUDED.location,
  image_url = EXCLUDED.image_url,
  images = EXCLUDED.images,
  category_id = EXCLUDED.category_id,
  destination_id = EXCLUDED.destination_id,
  is_active = EXCLUDED.is_active;

-- Verify
SELECT COUNT(*) as total_tours FROM tours WHERE is_active = true;
SELECT d.name as destination, COUNT(t.id) as tours
FROM tours t JOIN destinations d ON t.destination_id = d.id
GROUP BY d.name ORDER BY d.name;