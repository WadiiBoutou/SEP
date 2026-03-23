import type { Metadata } from "next";
import { Syne, DM_Sans, Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LenisScrollBar from "@/components/LenisScrollBar";

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

export const metadata: Metadata = {
  title: "SEP - Sud Extra Power",
  description: "Solutions solaires et hydrauliques à Agadir, Maroc.",
  icons: {
    icon: [
      { url: "/LOGO2.webp?v=3", type: "image/webp" },
      { url: "/LOGO2.webp?v=3", sizes: "32x32", type: "image/webp" },
    ],
    apple: "/LOGO2.webp?v=3",
    shortcut: "/LOGO2.webp?v=3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" dir="ltr" className={`${syne.variable} ${dmSans.variable} ${cairo.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
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
