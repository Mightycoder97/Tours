import type { Metadata } from "next";
import { Montserrat, DM_Serif_Display } from "next/font/google";
import { getLocale } from "next-intl/server";
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

export const metadata: Metadata = {
  title: {
    default: 'Machu Picchu Travel Adventures | Tours a Machu Picchu, Cusco y Valle Sagrado',
    template: '%s | Machu Picchu Travel Adventures',
  },
  description: 'Reserva tours guiados a Machu Picchu, Valle Sagrado y Cusco. Guías expertos, transporte incluido y pago seguro. +500 viajeros satisfechos.',
  keywords: ['tours machu picchu', 'viajes cusco', 'tour valle sagrado', 'paquetes turísticos peru', 'excursiones machu picchu'],
  authors: [{ name: 'Machu Picchu Travel Adventures' }],
  creator: 'Machu Picchu Travel Adventures',
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://machupicchutravel.com',
    siteName: 'Machu Picchu Travel Adventures',
    title: 'Machu Picchu Travel Adventures | Tours Guiados en Perú',
    description: 'Descubre la magia de Machu Picchu con tours guiados. Guías expertos, todo incluido, pago seguro.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'Machu Picchu al amanecer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Machu Picchu Travel Adventures',
    description: 'Tours guiados a Machu Picchu y Cusco. Reserva ahora.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
