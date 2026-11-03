import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getBrandConfig } from '@/lib/brand';
import { BookOpen } from 'lucide-react';
import LibroReclamacionesForm from '@/components/reclamaciones/LibroReclamacionesForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const tMeta = await getTranslations({ locale, namespace: 'meta.complaintsPage' });
  const brand = getBrandConfig();
  return {
    title: `${tMeta('title')} | ${brand.name}`,
    description: `${tMeta('description')} (${brand.legalName} — RUC ${brand.ruc}).`,
  };
}

export default async function LibroDeReclamacionesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pages.complaints' });
  const brand = getBrandConfig();

  return (
    <div className="bg-surface min-h-screen pt-24 sm:pt-28 pb-20 print:bg-white print:min-h-0 print:pt-4 print:pb-4">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8 print:hidden">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" /> {t('badge')}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary-dark mb-2">
            {t('title')}
          </h1>
          <p className="text-text-light text-sm">
            {t('legalNameLabel')}: <strong>{brand.legalName}</strong> | {t('rucLabel')}: <strong>{brand.ruc}</strong> | {t('establishmentLabel')}: <strong>{brand.contact.address}</strong>
          </p>
        </div>

        <LibroReclamacionesForm brand={brand} />
      </div>
    </div>
  );
}

