import { Link } from '@/i18n/navigation';
import { Home, Search } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('pages.notFound');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-8xl font-serif text-primary-dark mb-4">404</h1>
        <h2 className="text-2xl font-serif text-text-main mb-3">
          {t('title')}
        </h2>
        <p className="text-text-light mb-8">
          {t('description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary-light transition-colors"
          >
            <Home className="w-4 h-4" /> {t('goHome')}
          </Link>
          <Link
            href="/tours"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 rounded-full font-bold text-text-main hover:bg-gray-50 transition-colors"
          >
            <Search className="w-4 h-4" /> {t('exploreTours')}
          </Link>
        </div>
      </div>
    </div>
  );
}
