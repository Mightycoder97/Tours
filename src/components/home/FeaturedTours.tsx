import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import FeaturedToursCarousel from './FeaturedToursCarousel';

function renderSafeTitle(html: string) {
  // Only allow: plain text, <br/>, and <span class="...">text</span>
  // Strip everything else for security
  const parts = html.split(/(<br\s*\/?>|<span[^>]*>[^<]*<\/span>)/gi);

  return parts.map((part, i) => {
    if (/^<br\s*\/?>$/i.test(part)) {
      return <br key={i} />;
    }
    const spanMatch = part.match(/^<span[^>]*class="([^"]*)"[^>]*>([^<]*)<\/span>$/i);
    if (spanMatch) {
      // Only allow specific safe classes
      const safeClasses = spanMatch[1]
        .split(' ')
        .filter(c => ['text-accent', 'italic', 'font-bold', 'text-primary'].includes(c))
        .join(' ');
      return <span key={i} className={safeClasses}>{spanMatch[2]}</span>;
    }
    // Plain text - strip any remaining HTML tags
    return <span key={i}>{part.replace(/<[^>]*>/g, '')}</span>;
  });
}

export default async function FeaturedTours() {
  const { data: tours } = await supabase.from('tours').select('*').eq('is_active', true).limit(4);
  const displayTours = tours || [];

  let settingsMap: Record<string, string> = {};
  try {
    const { data: settings } = await supabase.from('site_settings').select('*');
    if (settings) {
      settings.forEach(s => settingsMap[s.key] = s.value);
    }
  } catch (e) {
    console.error('Settings table missing or error', e);
  }

  const heroTitleHtml = settingsMap['home_hero_title'] || 'Encuentra la aventura <br/><span class="text-accent italic">ideal para ti</span>';
  const heroSubtitle = settingsMap['home_hero_subtitle'] || 'Explora nuestros paquetes turísticos cuidadosamente diseñados para ofrecerte una experiencia inolvidable.';

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-serif text-primary font-bold mb-4 [&>span]:text-accent [&>span]:italic">
              {renderSafeTitle(heroTitleHtml)}
            </h2>
            <p className="text-text-light text-lg font-light">
              {heroSubtitle}
            </p>
          </div>
          <Link 
            href="/tours" 
            className="mt-6 md:mt-0 group flex items-center text-primary font-semibold hover:text-primary-light transition-colors"
          >
            Ver todos los tours
            <span className="ml-2 w-8 h-8 rounded-full border border-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        <FeaturedToursCarousel tours={displayTours} />
      </div>
    </section>
  );
}
