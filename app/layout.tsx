import type { Metadata } from "next";
import type { Viewport } from "next";
import { Syne, DM_Sans, Cairo } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LenisScrollBar from "@/components/LenisScrollBar";
import Preloader from "@/components/Preloader";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
  weight: ["300", "400", "500", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const metadataBase = new URL(siteUrl);

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "rgb(12 26 39)",
};

export const metadata: Metadata = {
  metadataBase,
  title: "SEP — Sud Extra Power",
  description:
    "Solutions solaires & hydrauliques à Agadir, Maroc. Installation photovoltaïque, pompage solaire, chauffe-eau solaire et maintenance.",
  keywords: [
    "Sud Extra Power",
    "SEP",
    "Énergie solaire",
    "Photovoltaïque",
    "Pompage solaire",
    "Chauffe-eau solaire",
    "Maintenance solaire",
    "Agadir",
    "Maroc",
  ],
  icons: {
    icon: [
      { url: "/LOGO2.webp?v=3", type: "image/webp" },
      { url: "/LOGO2.webp?v=3", sizes: "32x32", type: "image/webp" },
    ],
    apple: "/LOGO2.webp?v=3",
    shortcut: "/LOGO2.webp?v=3",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "SEP — Sud Extra Power",
    description:
      "Solutions solaires & hydrauliques à Agadir, Maroc. Installation photovoltaïque, pompage solaire, chauffe-eau solaire et maintenance.",
    siteName: "SEP — Sud Extra Power",
    locale: "fr_FR",
    images: [
      {
        url: "/LOGO2.webp?v=3",
        width: 512,
        height: 512,
        alt: "SEP — Sud Extra Power",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEP — Sud Extra Power",
    description:
      "Solutions solaires & hydrauliques à Agadir, Maroc. Installation photovoltaïque, pompage solaire, chauffe-eau solaire et maintenance.",
    images: ["/LOGO2.webp?v=3"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "SEP — Sud Extra Power",
    url: siteUrl,
    logo: `${siteUrl}/LOGO2.webp?v=3`,
    image: `${siteUrl}/LOGO2.webp?v=3`,
    telephone: "+212612619329",
    address: {
      "@type": "PostalAddress",
      addressCountry: "MA",
      addressLocality: "Agadir",
      streetAddress: "Swalem, Route de Tiznit, Inchaden, Chtouka Ait Baha",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Souss-Massa" },
      { "@type": "Country", name: "Maroc" },
    ],
    sameAs: [],
  };

  return (
    <html lang="fr" dir="ltr" className={`${syne.variable} ${dmSans.variable} ${cairo.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <Script
          id="ld-json-localbusiness"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Preloader />
        <LanguageProvider>
          <SmoothScroll>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
            <LenisScrollBar />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
