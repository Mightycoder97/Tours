import type { Metadata } from "next";
import { Montserrat, DM_Serif_Display } from "next/font/google";
import { getLocale, getTranslations } from "next-intl/server";
import "./globals.css";
import ImageProtectionProvider from "@/components/ui/ImageProtectionProvider";
import { getBrandConfig } from "@/lib/brand";


const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  weight: "400",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.home');
  const locale = await getLocale();
  const brand = getBrandConfig();

  return {
    metadataBase: new URL(brand.domain),
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
          url: `${brand.domain}${brand.logo.ogImageSrc}`,
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
      images: [`${brand.domain}${brand.logo.ogImageSrc}`],
    },
    robots: {
      index: true,
      follow: true,
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

