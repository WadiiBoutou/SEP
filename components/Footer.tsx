"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#080E18] border-t border-white/5 pt-24 pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative h-[48px] w-[48px]">
                <Image
                  src="/LOGO2.webp"
                  alt="Sud Extra Power Logo"
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <span className="font-syne font-bold text-lg tracking-tight text-white">
                Sud Extra Power
              </span>
            </Link>
            <p className="text-white/65 font-sans text-sm pr-4">
              {t("L'énergie propre, livrée au Sud.", "الطاقة النظيفة، نوصلها للجنوب.")}
            </p>
          </div>

          <div>
            <h4 className="font-syne font-bold text-white mb-6 uppercase tracking-wider text-sm">
              {t("Navigation", "تصفح")}
            </h4>
            <ul className="flex flex-col gap-4 font-sans text-sm text-white/70">
              <li><Link href="/" className="hover:text-brand-gold transition-colors duration-200">{t("Accueil", "الرئيسية")}</Link></li>
              <li><Link href="/about" className="hover:text-brand-gold transition-colors">{t("À Propos", "من نحن")}</Link></li>
              <li><Link href="/services" className="hover:text-brand-gold transition-colors">{t("Services", "خدماتنا")}</Link></li>
              <li><Link href="/contact" className="hover:text-brand-gold transition-colors">{t("Contact", "اتصل بنا")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-syne font-bold text-white mb-6 uppercase tracking-wider text-sm">
              {t("Services", "خدماتنا")}
            </h4>
            <ul className="flex flex-col gap-4 font-sans text-sm text-white/70">
              <li>{t("Installation Solaire PV", "تركيب الألواح الشمسية")}</li>
              <li>{t("Pompage Solaire", "الضخ بالطاقة الشمسية")}</li>
              <li>{t("Chauffe-eau Solaire", "سخانات المياه بالطاقة الشمسية")}</li>
              <li>{t("Maintenance & SAV", "الصيانة وخدمة ما بعد البيع")}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-syne font-bold text-white mb-6 uppercase tracking-wider text-sm">
              {t("Contact", "اتصل بنا")}
            </h4>
            <ul className="flex flex-col gap-4 font-sans text-sm text-white/70">
              <li>Swalem, Route de Tiznit, Inchaden</li>
              <li>Chtouka Ait Baha, Agadir</li>
              <li>+212 612-619329</li>
              <li>sudextrapower@gmail.com</li>
            </ul>
            <div className="flex items-center gap-4 mt-8">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-gold hover:text-dark-bg transition-all">
                <Facebook size={18} />
              </a>
              <a href="https://wa.me/212612619329?text=Bonjour%20l'equipe%20SEP%2C%20je%20souhaiterais%20obtenir%20des%20informations%20sur%20vos%20solutions%20d'energie%20solaire." target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#25D366] transition-all">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </a>
              <a href="mailto:sudextrapower@gmail.com" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-gold hover:text-dark-bg transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <p className="text-white/40 text-xs font-sans">
            &copy; {new Date().getFullYear()} Sud Extra Power. {t("Tous droits réservés.", "جميع الحقوق محفوظة.")}
          </p>
          <p className="text-white/40 text-xs font-sans tracking-widest uppercase">
            Agadir &middot; Maroc
          </p>
        </div>
      </div>
    </footer>
  );
}
