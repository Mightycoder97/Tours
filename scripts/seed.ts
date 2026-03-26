import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Load .env.local file to get variables during script execution
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY // Use service key to bypass RLS

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const MOCK_TOURS = [
  {
    title: 'Tour Mañana en Machu Picchu desde Cusco',
    slug: 'machu-picchu-por-la-manana',
    description: 'Disfruta Machu Picchu por la mañana con tren, entradas, guía y recojo. Regresa a Cusco cerca del atardecer y vive una experiencia inolvidable. Aprovecha y visita la mágica ciudadela de una forma legendaria.',
    price_adult: 185,
    price_child: 130, // Default 30% dsct for child roughly
    duration: 'Full Day (14 hrs)',
    tag: 'MÁS VENDIDO',
    rating: 4.8,
    reviews_count: 124,
    image_url: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1526615555620-37b561b36f1c?q=80&w=1000',
      'https://images.unsplash.com/photo-1490212008434-22bba13149ca?q=80&w=1000',
      'https://images.unsplash.com/photo-1606900693510-482d8c379a25?q=80&w=1000'
    ],
    inclusions: [
      'Recojo en Cusco',
      'Traslado Cusco - Ollantaytambo',
      'Tren The 360° o The Voyager (Ida y Vuelta)',
      'Bus Consettur (Ida y Vuelta)',
      'Ticket de Ingreso a Ciudadela Machu Picchu',
      'Guía profesional de Turismo bilingüe'
    ]
  },
  {
    title: 'Valle Sagrado de los Incas Full Day',
    slug: 'valle-sagrado-full-day',
    description: 'Conoce la historia del Valle Sagrado, visitando Pisac, Ollantaytambo y Chinchero. Un recorrido esencial para comprender el imperio incaico.',
    price_adult: 65,
    price_child: 45,
    duration: 'Full Day (10 hrs)',
    tag: 'CULTURAL',
    rating: 4.6,
    reviews_count: 89,
    image_url: 'https://images.unsplash.com/photo-1606900693510-482d8c379a25?q=80&w=1200',
    images: [],
    inclusions: [
      'Recojo en Cusco central',
      'Transporte turístico especializado',
      'Almuerzo buffet en Urubamba',
      'Guía oficial de Turismo bilingüe'
    ]
  },
  {
    title: 'Tren The 360° a Machu Picchu',
    slug: 'tren-the-360-machu-picchu',
    description: 'Un viaje inolvidable por los paisajes andinos hacia Machu Picchu en el tren con grandes ventanas panorámicas para la mejor visibilidad.',
    price_adult: 210,
    price_child: 147,
    duration: 'Medio día (4 hrs)',
    tag: 'PREMIUM',
    rating: 4.9,
    reviews_count: 215,
    image_url: 'https://images.unsplash.com/photo-1490212008434-22bba13149ca?q=80&w=1200',
    images: [],
    inclusions: [
      'Boleto de tren ida y vuelta',
      'Servicio a bordo con snacks',
      'Vistas panorámicas 360',
      'App de entretenimiento a bordo'
    ]
  }
];

async function seed() {
  console.log("Seeding database (Upsert method)...")
  
  // 1. Insert Categories
  const { data: catData, error: catError } = await supabase.from('categories').upsert([
    { name: 'Cultura', slug: 'cultura' },
    { name: 'Aventura', slug: 'aventura' },
    { name: 'Premium', slug: 'premium' }
  ], { onConflict: 'slug' }).select()
  
  if (catError) {
    console.error("Error inserting categories:", catError)
    return
  }
  
  const culturaId = catData.find(c => c.slug === 'cultura')?.id
  const premiumId = catData.find(c => c.slug === 'premium')?.id
  
  // 2. Insert Destinations
  const { data: destData, error: destError } = await supabase.from('destinations').upsert([
    { name: 'Machu Picchu', slug: 'machu-picchu' },
    { name: 'Valle Sagrado', slug: 'valle-sagrado' }
  ], { onConflict: 'slug' }).select()
  
  if (destError) {
    console.error("Error inserting destinations:", destError)
    return
  }
  
  const mapiId = destData.find(d => d.slug === 'machu-picchu')?.id
  const valleId = destData.find(d => d.slug === 'valle-sagrado')?.id
  
  // 3. Insert Tours
  const toursWithRefs = MOCK_TOURS.map(t => ({
    ...t,
    category_id: t.slug.includes('machu') ? premiumId : culturaId,
    destination_id: t.slug.includes('machu') ? mapiId : valleId
  }))
  
  const { error: toursError } = await supabase.from('tours').upsert(toursWithRefs, { onConflict: 'slug' })
  
  if (toursError) {
    console.error("Error inserting tours:", toursError)
  } else {
    console.log("✅ Seeding complete! Mock data has been pushed to Supabase.")
  }
}

seed().catch(console.error)
