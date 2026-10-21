import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import { getLocale, getTranslations } from "next-intl/server";
import "./globals.css";
import ImageProtectionProvider from "@/components/ui/ImageProtectionProvider";
import { getBrandConfig } from "@/lib/brand";


const montserrat = Plus_Jakarta_Sans({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSerif = Outfit({
  variable: "--font-dm-serif",
  weight: ["600", "700", "800"],
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.home');
  const locale = await getLocale();
  const brand = getBrandConfig();

  return {
    title: {
      default: t('title'),
      template: t('titleTemplate'),
    },
    description: t('description'),
    keywords: t('keywords').split(', '),
    authors: [{ name: brand.name }],
    creator: brand.name,
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'es_PE',
      url: brand.domain,
      siteName: brand.name,
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [
        {
          url: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1200',
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: brand.name,
      description: t('twitterDescription'),
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: brand.domain,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const brand = getBrandConfig();

  return (
    <html
      lang={locale}
      data-brand={brand.id}
      suppressHydrationWarning
      className={`${montserrat.variable} ${dmSerif.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-background text-foreground">
        <ImageProtectionProvider />
        <a href="#main-content" className="skip-to-content">
          {locale === 'en' ? 'Skip to main content' : 'Saltar al contenido principal'}
        </a>
        <main id="main-content" className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}

