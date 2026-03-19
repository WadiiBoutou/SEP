"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function CtaBanner() {
  const { t } = useLanguage();

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
        <div className="absolute inset-0 bg-[#0C1A27]/85 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/50 to-transparent" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center text-center">
        <h2 className="font-syne font-extrabold text-5xl md:text-[64px] text-white tracking-[-0.02em] leading-tight mb-6">
          {t("Passez au Solaire Aujourd'hui.", "انتقل إلى الطاقة الشمسية اليوم.")}
        </h2>
        
        <p className="font-sans text-[16px] font-light text-white/70 tracking-wide mb-12">
          {t("Étude gratuite · Devis sous 24h · Installation certifiée", "دراسة مجانية · عرض في 24 ساعة · تركيب معتمد")}
        </p>

        <Link
          href="/contact"
          className="bg-brand-gold hover:bg-white text-dark-bg transition-colors px-12 py-5 text-sm uppercase tracking-widest font-bold font-sans rounded-none"
        >
          {t("Contactez-Nous", "اتصل بنا")}
        </Link>
      </div>
    </section>
  );
}
