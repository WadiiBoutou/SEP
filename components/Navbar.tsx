"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("Accueil", "الرئيسية"), href: "/" },
    { name: t("À Propos", "من نحن"), href: "/about" },
    { name: t("Services", "خدماتنا"), href: "/services" },
    { name: t("Contact", "اتصل بنا"), href: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0C1A27]/80 backdrop-blur-lg border-b border-white/5 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 z-50">
            <div className="relative h-[44px] w-[44px]">
              <Image
                src="/LOGO1.png"
                alt="Sud Extra Power Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-syne font-bold text-xl tracking-tight text-white hidden sm:block">
              Sud Extra Power
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-sans tracking-wide text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-6 border-l border-white/10 pl-6">
              <div className="flex items-center gap-2 text-xs font-bold font-sans">
                <button
                  onClick={() => setLang("fr")}
                  className={`transition-colors ${
                    lang === "fr" ? "text-white" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  FR
                </button>
                <span className="text-white/20">|</span>
                <button
                  onClick={() => setLang("ar")}
                  className={`transition-colors ${
                    lang === "ar" ? "text-white" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  AR
                </button>
              </div>

              <Link
                href="/contact"
                className="bg-brand-orange text-dark-bg px-5 py-3 text-xs uppercase tracking-widest font-bold font-sans rounded-none hover:bg-brand-heat hover:shadow-[0_0_15px_rgba(255,77,0,0.5)] transition-all"
              >
                {t("Devis Gratuit", "احصل على عرض")}
              </Link>
            </div>
          </div>

          <button
            className="lg:hidden text-white z-50 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#0C1A27] z-40 transition-transform duration-500 ease-in-out lg:hidden flex flex-col justify-center items-center ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-center gap-8 mb-12">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-3xl font-syne font-bold text-white hover:text-brand-orange hover:drop-shadow-[0_0_10px_rgba(255,123,0,0.5)] transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-4 text-sm font-bold font-sans bg-white/5 rounded-full px-6 py-2">
            <button
              onClick={() => { setLang("fr"); setMobileMenuOpen(false); }}
              className={lang === "fr" ? "text-brand-orange drop-shadow-[0_0_8px_rgba(255,123,0,0.5)]" : "text-white/50"}
            >
              FR
            </button>
            <span className="text-white/20">|</span>
            <button
              onClick={() => { setLang("ar"); setMobileMenuOpen(false); }}
              className={lang === "ar" ? "text-brand-orange drop-shadow-[0_0_8px_rgba(255,123,0,0.5)]" : "text-white/50"}
            >
              AR
            </button>
          </div>

          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-brand-orange hover:bg-brand-heat hover:shadow-[0_0_20px_rgba(255,77,0,0.5)] text-dark-bg transition-all px-8 py-4 text-sm uppercase tracking-widest font-bold font-sans rounded-none"
          >
            {t("Devis Gratuit", "احصل على عرض")}
          </Link>
        </div>
      </div>
    </>
  );
}
