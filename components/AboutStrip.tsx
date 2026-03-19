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

      gsap.from(".about-image", {
        y: 60,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 lg:py-48 px-6 lg:px-12 container mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-16 items-center">
        
        {/* Left Content */}
        <div className="flex flex-col pr-0 lg:pr-12">
          <span className="about-content font-sans text-brand-gold text-xs uppercase tracking-[0.2em] font-bold mb-6">
            {t("01 — NOTRE HISTOIRE", "01 — قصتنا")}
          </span>
          
          <h2 className="about-content font-syne font-extrabold text-5xl md:text-[56px] leading-[1.1] tracking-[-0.02em] text-white mb-8">
            {t("Nés du soleil du Sud.", "ولدنا من شمس الجنوب.")}
          </h2>
          
          <p className="about-content font-sans text-[15px] leading-[1.9] text-white/65 font-light mb-10">
            {t(
              "Sud Extra Power est une société marocaine fondée à Agadir, au cœur de la région la plus ensoleillée du Royaume. Nous concevons et déployons des systèmes d'énergie renouvelable pour les particuliers, les agriculteurs et les entreprises — avec une obsession pour la durabilité et la performance terrain.",
              "سود إكسترا باور هي شركة مغربية تأسست في أكادير، في قلب أكثر مناطق المملكة إشعاعا. نصمم وننشر أنظمة الطاقة المتجددة للأفراد والمزارعين والشركات — بشغف نحو الاستدامة والأداء الميداني."
            )}
          </p>

          <div className="about-content border-l-2 border-brand-gold pl-6 py-2">
            <p className="font-sans text-brand-gold italic text-[15px] leading-relaxed">
              &quot;{t("Chaque watt produit ici, c'est un pas vers l'indépendance énergétique du Maroc.", "كل واط يُنتج هنا، هو خطوة نحو الاستقلال الطاقي للمغرب.")}&quot;
            </p>
          </div>
        </div>

        {/* Right Images */}
        <div className="relative h-[600px] w-full mt-10 lg:mt-0">
          <div className="about-image absolute top-0 right-10 w-[60%] aspect-[4/5] border border-white/10 z-0">
            <Image
              src="https://images.unsplash.com/photo-1548337138-e87d889cc369?w=600&q=80"
              alt="Worker installing solar"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 60vw, 30vw"
            />
          </div>
          
          <div className="about-image absolute bottom-10 left-0 w-[55%] aspect-[5/6] border border-white/10 z-10">
            <Image
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80"
              alt="Solar panels close-up"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 55vw, 25vw"
            />
          </div>

          {/* Floating Card */}
          <div className="about-image absolute bottom-0 right-0 bg-[#0F2035] border border-white/10 px-5 py-4 z-20 flex items-center gap-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-brand-gold">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="font-sans text-xs uppercase tracking-widest text-white/80 font-bold">
              {t("Région Souss-Massa · Agadir", "جهة سوس ماسة · أكادير")}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
