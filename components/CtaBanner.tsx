"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function CtaBanner() {
  const { t, lang } = useLanguage();

  return (
    <section className="relative w-full py-32 lg:py-48 flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1400&q=80"
          alt="Aerial view of massive solar field"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* 85% Dark Overlay */}
          <div className="absolute inset-0 bg-[rgb(var(--rgb-dark-bg)/0.85)] mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/50 to-transparent" />
        {/* Heat overlay spot */}
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/40 rounded-full blur-[180px] pointer-events-none mix-blend-screen" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center text-center">
        <h2 className="font-syne font-extrabold text-5xl md:text-[64px] text-white tracking-[-0.02em] leading-tight mb-6 relative">
          {lang === 'fr' ? (
            <>Passez au <span className="text-brand-glow drop-shadow-[0_0_15px_rgba(255,170,0,0.5)]">Solaire</span> Aujourd'hui.</>
          ) : (
            <>انتقل إلى الطاقة <span className="text-brand-glow drop-shadow-[0_0_15px_rgba(255,170,0,0.5)]">الشمسية</span> اليوم.</>
          )}
        </h2>
        
        <p className="font-sans text-[16px] font-light text-white/80 tracking-wide mb-12">
          {t("Étude gratuite · Devis sous 24h · Installation certifiée", "دراسة مجانية · عرض في 24 ساعة · تركيب معتمد")}
        </p>

        <Link
          href="/contact"
          className="cta-glow relative bg-brand-orange hover:bg-brand-heat hover:shadow-[0_0_30px_rgba(255,77,0,0.6)] text-dark-bg transition-all px-12 py-5 text-sm uppercase tracking-widest font-bold font-sans rounded-none"
        >
          {t("Contactez-Nous", "اتصل بنا")}
        </Link>
      </div>
    </section>
  );
}
