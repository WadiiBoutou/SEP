"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".hero-line", {
        y: 80,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Counters
      gsap.from(".stat-counter", {
        textContent: 0,
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 },
        stagger: 0.1,
        delay: 0.5,
      });

      gsap.from(".hero-image", {
        scale: 0.95,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.3,
      });

      // SVG Grain
      const grain = document.querySelector('.hero-grain') as HTMLElement;
      if (grain) {
        gsap.to(grain, {
          x: () => Math.random() * 20 - 10,
          y: () => Math.random() * 20 - 10,
          duration: 0.1,
          repeat: -1,
          yoyo: true,
          ease: "none",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden bg-brand-dark-bg"
    >
      {/* Background radial gradient */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-blue/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none mix-blend-screen" />
      
      {/* Grain noise overlay */}
      <div 
        className="hero-grain absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.035] w-[200%] h-[200%] -left-[50%] -top-[50%]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 flex-1 flex flex-col justify-center relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* Left Column */}
          <div className="w-full lg:w-[60%] flex flex-col">
            <div className="overflow-hidden mb-8">
              <span className="hero-line block font-sans text-brand-gold text-xs uppercase tracking-[0.2em] font-bold">
                {t("Énergie Renouvelable · Maroc", "طاقة متجددة · المغرب")}
              </span>
            </div>

            <h1 className="font-syne font-extrabold text-[70px] leading-[0.9] tracking-[-0.04em] md:text-[90px] lg:text-[110px] text-white overflow-hidden mb-8">
              <span className="hero-line block">{t("L'Énergie", "الطاقة")}</span>
              <span className="hero-line block">{t("Qui Change", "التي تغير")}</span>
              <span className="hero-line block text-brand-gold">{t("Tout.", "كل شيء.")}</span>
            </h1>

            <div className="overflow-hidden mb-12">
              <p className="hero-line font-sans text-base font-light text-white/55 max-w-[420px] leading-relaxed">
                {t(
                  "Depuis Agadir, nous équipons le Maroc en solutions solaires sur mesure — du panneau résidentiel au système de pompage industriel.",
                  "من أكادير، نجهز المغرب بحلول شمسية مصممة خصيصا - من الألواح المنزلية إلى أنظمة الضخ الصناعية."
                )}
              </p>
            </div>

            <div className="overflow-hidden">
              <div className="hero-line flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Link
                  href="/contact"
                  className="bg-brand-gold hover:bg-white text-dark-bg transition-colors px-8 py-4 text-xs uppercase tracking-widest font-bold font-sans rounded-none"
                >
                  {t("Obtenir un Devis", "احصل على عرض")}
                </Link>
                <Link
                  href="/services"
                  className="text-white hover:text-brand-gold hover:border-brand-gold transition-colors font-sans text-sm border-b border-brand-gold pb-1"
                >
                  {t("Découvrir Nos Services", "اكتشف خدماتنا")}
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[40%] flex justify-center lg:justify-end">
            <div className="hero-image relative w-full max-w-[440px] aspect-[4/5] transform rotate-2">
              {/* Offset Gold Border */}
              <div className="absolute inset-0 border border-brand-gold translate-x-3 translate-y-3 pointer-events-none z-0" />
              
              <div className="relative w-full h-full overflow-hidden z-10 border border-white/10 bg-off-dark">
                <Image
                  src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=900&q=80"
                  alt="Solar Field"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row Stats */}
      <div className="container mx-auto px-6 lg:px-12 mt-20 relative z-10">
        <div className="border-t border-white/10 pt-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          
          <div className="flex flex-col border-white/10 md:pr-12">
            <div className="flex items-baseline">
              <span className="font-syne font-extrabold text-[52px] text-white leading-none">+</span>
              <span className="stat-counter font-syne font-extrabold text-[52px] text-white leading-none">500</span>
            </div>
            <span className="font-sans text-[11px] uppercase tracking-widest text-white/50 mt-2 font-bold">
              {t("Installations Réalisées", "تركيبات منجزة")}
            </span>
          </div>

          <div className="flex flex-col md:border-l border-white/10 md:px-12">
            <div className="flex items-baseline">
              <span className="stat-counter font-syne font-extrabold text-[52px] text-white leading-none">3000</span>
              <span className="font-syne font-extrabold text-[52px] text-white leading-none">h</span>
            </div>
            <span className="font-sans text-[11px] uppercase tracking-widest text-white/50 mt-2 font-bold">
              {t("Ensoleillement Annuel au Maroc", "إشعاع شمسي سنوي بالمغرب")}
            </span>
          </div>

          <div className="flex flex-col md:border-l border-white/10 md:pl-12">
            <div className="flex items-baseline">
              <span className="stat-counter font-syne font-extrabold text-[52px] text-white leading-none">10</span>
              <span className="font-syne font-extrabold text-[52px] text-white leading-none ml-2">MW</span>
            </div>
            <span className="font-sans text-[11px] uppercase tracking-widest text-white/50 mt-2 font-bold">
              {t("Puissance Totale Installée", "القوة الإجمالية المركبة")}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
