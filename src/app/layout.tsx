import type { Metadata } from "next";
import { Montserrat, DM_Serif_Display } from "next/font/google";
import { getLocale, getTranslations } from "next-intl/server";
import "./globals.css";

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

  return {
    title: {
      default: t('title'),
      template: t('titleTemplate'),
    },
    description: t('description'),
    keywords: t('keywords').split(', '),
    authors: [{ name: 'Machu Picchu Travel Adventures' }],
    creator: 'Machu Picchu Travel Adventures',
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'es_PE',
      url: 'https://machupicchutravel.com',
      siteName: 'Machu Picchu Travel Adventures',
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
      title: 'Machu Picchu Travel Adventures',
      description: t('twitterDescription'),
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

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${montserrat.variable} ${dmSerif.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-background text-foreground">
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

