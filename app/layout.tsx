import type { Metadata, Viewport } from "next";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sep-solar.ma"; // Updated to a placeholder prod URL if not set

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0C1A27",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SEP | Solutions Solaires & Hydrauliques Premium",
    template: "%s | SEP",
  },
  description:
    "Expertise leader en solutions solaires et hydrauliques au Maroc. Installation photovoltaïque, pompage solaire et maintenance premium pour un avenir durable.",
  keywords: [
    "Sud Extra Power",
    "SEP Solar",
    "Énergie solaire Maroc",
    "Photovoltaïque Agadir",
    "Pompage solaire",
    "Chauffe-eau solaire",
    "Maintenance panneaux solaires",
    "Installation solaire Agadir",
    "Souss-Massa Énergie",
    "Énergie renouvelable Maroc",
  ],
  authors: [{ name: "Sud Extra Power" }],
  creator: "Sud Extra Power",
  publisher: "Sud Extra Power",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/LOGO2.webp?v=4", type: "image/webp" },
    ],
    apple: "/LOGO2.webp?v=4",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "SEP | Solutions Solaires & Hydrauliques",
    description:
      "Expert en solutions solaires et hydrauliques au Maroc. Installation photovoltaïque, pompage solaire et maintenance premium.",
    siteName: "Sud Extra Power",
    locale: "fr_FR",
    images: [
      {
        url: "/LOGO2.webp?v=4",
        width: 1200,
        height: 630,
        alt: "Sud Extra Power — Solutions Solaires",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEP | Solutions Solaires & Hydrauliques",
    description: "Solutions solaires & hydrauliques premium à Agadir, Maroc.",
    images: ["/LOGO2.webp?v=4"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
    logo: `${siteUrl}/LOGO2.webp?v=4`,
    image: `${siteUrl}/LOGO2.webp?v=4`,
    telephone: "+212612619329",
    description: "Expert en solutions solaires et hydrauliques à Agadir, Maroc.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "MA",
      addressLocality: "Agadir",
      streetAddress: "Swalem, Route de Tiznit, Inchaden, Chtouka Ait Baha",
      postalCode: "80000",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "30.4278", // Example: Agadir coordinates
      longitude: "-9.5981",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      opens: "08:30",
      closes: "18:30"
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Souss-Massa" },
      { "@type": "Country", name: "Maroc" },
    ],
    sameAs: [],
  };

  return (
    <html 
      lang="fr" 
      dir="ltr" 
      className={`scroll-smooth ${syne.variable} ${dmSans.variable} ${cairo.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="font-sans antialiased overflow-x-hidden bg-dark-bg text-white">
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
            <main className="relative">{children}</main>
            <Footer />
            <WhatsAppButton />
            <LenisScrollBar />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}

