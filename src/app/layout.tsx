import type { Metadata } from "next";
import { Montserrat, DM_Serif_Display } from "next/font/google";
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
  title: "Machu Picchu Travel Adventures",
  description: "Conectamos tu viaje con la magia del Perú. Reserva tours increíbles hacia Machu Picchu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${montserrat.variable} ${dmSerif.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-background text-foreground">
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
