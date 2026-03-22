"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutStrip() {
  const containerRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Content entry animation
      gsap.from(".about-content", {
        y: 60,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // Image reveal animation (no blur)
      gsap.from(".about-image-wrapper", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 lg:py-48 px-6 lg:px-12 container mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-16 items-center">
        
        {/* Left Content */}
        <div className="flex flex-col pr-0 lg:pr-12">
          <span className="about-content font-sans text-brand-orange text-[10px] uppercase tracking-[0.3em] font-bold mb-6">
            {t("// 01 — NOTRE HISTOIRE", "// 01 — قصتنا")}
          </span>
          
          <h2 className="about-content font-syne font-extrabold text-4xl md:text-[52px] leading-[0.9] tracking-[-0.04em] text-white mb-8">
            {t("Nés du soleil du Sud.", "ولدنا من شمس الجنوب.")}
          </h2>
          
          <p className="about-content font-sans text-[15px] leading-[1.7] text-white/50 font-light mb-10 max-w-[460px]">
            {t(
              "Sud Extra Power est une société marocaine fondée à Agadir, au cœur de la région la plus ensoleillée du Royaume. Nous concevons et déployons des systèmes d'énergie renouvelable pour les particuliers, les agriculteurs et les entreprises — avec une obsession pour la durabilité et la performance terrain.",
              "سود إكسترا باور هي شركة مغربية تأسست في أكادير، في قلب أكثر مناطق المملكة إشعاعا. نصمم وننشر أنظمة الطاقة المتجددة للأفراد والمزارعين والشركات — بشغف نحو الاستدامة والأداء الميداني."
            )}
          </p>

          <div className="about-content border-l-2 border-brand-orange pl-8 py-4 bg-brand-orange/[0.03] rounded-r-xl max-w-[540px]">
            <p className="font-sans text-brand-orange italic text-[16px] leading-relaxed font-medium">
              &quot;{t("Chaque watt produit ici, c'est un pas vers l'indépendance énergétique du Maroc.", "كل واط يُنتج هنا، هو خطوة نحو الاستقلال الطاقي للمغرب.")}&quot;
            </p>
          </div>
        </div>

        {/* Right Images */}
        <div className="relative h-[700px] w-full mt-16 lg:mt-0">
          {/* Main Large Image */}
          <div className="about-image-wrapper absolute top-0 right-0 w-[75%] aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)] z-0 transform rotate-2">
            <Image
              src="/images/solar_field.png"
              alt="Solar Field"
              fill
              className="object-cover brightness-110 contrast-110"
              sizes="(max-width: 768px) 75vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-bg/80 via-transparent to-transparent" />
          </div>
          
          {/* Secondary Smaller Image */}
          <div className="about-image-wrapper absolute -bottom-10 left-0 w-[55%] aspect-[5/6] overflow-hidden rounded-2xl border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.9)] z-10 translate-x-4 transform rotate-3">
            <Image
              src="/images/modern_solar_home.png"
              alt="Modern Solar Home"
              fill
              className="object-cover brightness-110 contrast-110"
              sizes="(max-width: 768px) 55vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/30 to-transparent mix-blend-overlay" />
          </div>

          {/* Floating Badge */}
          <div className="about-content absolute -bottom-4 right-10 bg-[#111] backdrop-blur-md border border-white/10 px-8 py-6 z-20 flex flex-col gap-2 rounded-xl shadow-2xl shadow-brand-orange/20 transform rotate-1">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">
                {t("Basé à Agadir", "مقرنا في أكادير")}
              </span>
            </div>
            <span className="font-syne text-lg text-white font-bold">
              {t("Région Souss-Massa", "جهة سوس ماسة")}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
