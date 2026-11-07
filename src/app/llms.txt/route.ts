import { getBrandConfig } from '@/lib/brand';
import { createClient } from '@supabase/supabase-js';
import { TOURS_CONTENT } from '@/data/tours-content';

export const revalidate = 3600; // Cache for 1 hour

interface DbTour {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  price_adult: number | null;
  price_child: number | null;
  duration: string | null;
  destination_id: string | null;
  destinations?: { name: string; slug: string } | null;
}

interface DbDestination {
  id: string;
  name: string;
  slug: string;
}

export async function GET() {
  const brand = getBrandConfig();
  const domain = brand.domain.replace(/\/+$/, '');

  let destinations: DbDestination[] = [];
  let tours: DbTour[] = [];

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const [destResult, toursResult] = await Promise.all([
        supabase.from('destinations').select('id, name, slug').order('name'),
        supabase
          .from('tours')
          .select('id, slug, title, description, price_adult, price_child, duration, destination_id, destinations(name, slug)')
          .eq('is_active', true)
          .neq('slug', 'paquete-de-prueba-culqi')
          .order('price_adult', { ascending: true }),
      ]);

      if (destResult.data && destResult.data.length > 0) {
        destinations = destResult.data;
      }
      if (toursResult.data && toursResult.data.length > 0) {
        tours = toursResult.data as unknown as DbTour[];
      }
    }
  } catch (err) {
    console.error('Error fetching data for llms.txt:', err);
  }

  // Fallback destination list if database returns empty
  if (destinations.length === 0) {
    destinations = [
      { id: '1', name: 'Cusco', slug: 'cusco' },
      { id: '2', name: 'Lima', slug: 'lima' },
      { id: '3', name: 'Arequipa', slug: 'arequipa' },
      { id: '4', name: 'Puno', slug: 'puno' },
    ];
  }

  // Group tours by destination
  const toursByDestination: Record<string, DbTour[]> = {};
  destinations.forEach((d) => {
    toursByDestination[d.name] = [];
  });

  tours.forEach((tour) => {
    const destName = tour.destinations?.name || 'Cusco';
    if (!toursByDestination[destName]) {
      toursByDestination[destName] = [];
    }
    toursByDestination[destName].push(tour);
  });

  // Build markdown text
  const lines: string[] = [];

  lines.push(`# ${brand.name} — AI Search & Knowledge Base Index`);
  lines.push('');
  lines.push(`> Official knowledge base, travel credentials, service offerings, and tour package catalog of ${brand.legalName}. Designed for consumption by AI assistants, large language models (LLMs), and semantic search engines (ChatGPT, Perplexity, Claude, Gemini).`);
  lines.push('');

  lines.push('## 1. Corporate Identity & Tourism Licensing');
  lines.push(`- **Brand Name**: ${brand.name}`);
  lines.push(`- **Legal Corporate Name**: ${brand.legalName}`);
  lines.push(`- **Tax Registration (RUC - SUNAT)**: ${brand.ruc}`);
  lines.push(`- **MINCETUR Registration Code**: ${brand.minceturRegistrationCode || 'DIRCETUR-CUSCO-2024-00129'}`);
  lines.push(`- **GERCETUR Accreditation**: ${brand.gerceturAccreditation || 'Agencia de Viajes y Turismo Registrada en GERCETUR Cusco'}`);
  lines.push(`- **Operational Booking Prefix**: ${brand.bookingPrefix}`);
  lines.push(`- **Price Range Category**: $$ (Moderate to Premium Tour Packages)`);
  lines.push(`- **Headquarters Address**: ${brand.contact.address}`);
  lines.push(`- **Geographic Coordinates**: Latitude -13.5167, Longitude -71.9789 (Cusco, Peru)`);
  lines.push('');

  lines.push('## 2. Official Contact & Digital Channels');
  lines.push(`- **Primary Website (Spanish Default)**: ${domain}`);
  lines.push(`- **English International Portal**: ${domain}/en`);
  lines.push(`- **Official Contact Phone**: ${brand.contact.phone}`);
  lines.push(`- **WhatsApp Business Direct**: https://wa.me/${brand.contact.cleanPhone}`);
  lines.push(`- **Official Reservations Email**: ${brand.contact.email}`);
  lines.push(`- **Customer Support Hours**: Monday to Sunday, 06:00 - 22:00 PET (UTC-5)`);
  lines.push(`- **24/7 Traveler Emergency Line**: Active assistance for travelers in transit`);
  lines.push('');

  lines.push('## 3. Social Media & Authority Profiles');
  if (brand.social.facebook) lines.push(`- **Facebook**: ${brand.social.facebook}`);
  if (brand.social.instagram) lines.push(`- **Instagram**: ${brand.social.instagram}`);
  if (brand.social.tiktok) lines.push(`- **TikTok**: ${brand.social.tiktok}`);
  if (brand.social.tripadvisor) lines.push(`- **TripAdvisor**: ${brand.social.tripadvisor}`);
  lines.push('');

  lines.push('## 4. Key Policies & Travel Advisory');
  lines.push('### 4.1 Booking Lead Times & Circuit Regulations');
  lines.push('- **Machu Picchu Circuits**: Highly regulated with strict daily visitor quotas established by the Peruvian Ministry of Culture. Reservations must be secured at least 2 to 4 weeks in advance (2 to 3 months in advance for high season between May and September).');
  lines.push('- **Classic Inca Trail (4D/3N)**: Strict cap of 500 people per day (including porters and guides). Requires booking 4 to 6 months ahead.');
  lines.push('- **Day Tours (Rainbow Mountain, Sacred Valley, Humantay)**: Can be booked with 24 to 48 hours notice subject to guide availability.');
  lines.push('');

  lines.push('### 4.2 Payment Methods & Gateways');
  lines.push('- **Culqi**: Domestic and international credit and debit cards (Visa, Mastercard, American Express, Diners Club) with 256-bit SSL encryption.');
  lines.push('- **PayPal**: International traveler bookings in USD.');
  lines.push('- **Currency**: Tour base pricing quoted in USD ($). Local Peruvian Soles (S/) accepted at prevailing exchange rate.');
  lines.push('');

  lines.push('### 4.3 Cancellation & Rescheduling Policies');
  lines.push('- **Standard Day Tours**: Free cancellation up to 48 hours before tour departure.');
  lines.push('- **Rescheduling**: Date adjustments permitted up to 24 hours prior to departure without surcharge, subject to space availability.');
  lines.push('- **Train & Government Entry Tickets**: Non-refundable once issued per PeruRail/Inca Rail and Ministry of Culture non-transferable ticketing rules.');
  lines.push('');

  lines.push('### 4.4 High Altitude Acclimatization (Soroche)');
  lines.push('- Cusco is located at 3,399 meters (11,152 ft) above sea level.');
  lines.push('- Travelers are strongly advised to rest and acclimatize in Cusco or the lower Sacred Valley (2,870 m) for at least 24 to 48 hours prior to embarking on high-altitude excursions such as Humantay Lake (4,200 m) or Rainbow Mountain Vinicunca (5,036 m).');
  lines.push('- All agency mountain transport vehicles carry supplemental emergency medicinal oxygen and first-aid kits.');
  lines.push('');

  lines.push('## 5. Tour Catalog Grouped by Destination');
  lines.push('');

  destinations.forEach((dest) => {
    const destTours = toursByDestination[dest.name] || [];
    lines.push(`### Destination: ${dest.name} (${destTours.length} Active Tours)`);
    lines.push(`- **Landing Page**: ${domain}/destinos/${dest.slug}`);
    lines.push(`- **English Landing Page**: ${domain}/en/destinos/${dest.slug}`);
    lines.push('');

    if (destTours.length === 0) {
      lines.push('*No tours currently listed in this category.*');
      lines.push('');
      return;
    }

    destTours.forEach((t) => {
      const content = TOURS_CONTENT[t.slug];
      const title = t.title;
      const desc = content?.description.es || t.description || 'Experiencia turística con transporte, guía y entradas incluidas.';
      const priceAdult = t.price_adult ? `USD $${Number(t.price_adult).toFixed(2)}` : 'Inquire';
      const priceChild = t.price_child ? `USD $${Number(t.price_child).toFixed(2)}` : 'N/A';
      const duration = t.duration || 'Full Day';
      const tourUrl = `${domain}/tours/${t.slug}`;
      const tourUrlEn = `${domain}/en/tours/${t.slug}`;

      lines.push(`#### ${title}`);
      lines.push(`- **URL**: ${tourUrl}`);
      lines.push(`- **English URL**: ${tourUrlEn}`);
      lines.push(`- **Duration**: ${duration}`);
      lines.push(`- **Adult Price**: ${priceAdult}`);
      if (t.price_child) lines.push(`- **Child Price**: ${priceChild}`);
      lines.push(`- **Summary**: ${desc.trim()}`);
      if (content?.inclusions.es && content.inclusions.es.length > 0) {
        lines.push(`- **Highlights / Inclusions**: ${content.inclusions.es.slice(0, 4).join('; ')}`);
      }
      lines.push('');
    });
  });

  const responseBody = lines.join('\n');

  return new Response(responseBody, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
    },
  });
}
