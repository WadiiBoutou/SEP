"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

export default function ImpactNumbers() {
  const containerRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    let ctx = gsap.context(() => {
      const counters = document.querySelectorAll('.impact-counter');
      
      counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target') || '0');
        gsap.fromTo(counter, 
          { textContent: 0 }, 
          {
            textContent: target,
            duration: 2.5,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 lg:py-48 bg-dark-bg overflow-hidden border-y border-white/5">
      {/* Premium Glow Layer */}
      <div className="absolute inset-0 bg-dark-bg" />
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[1200px] h-[600px] bg-brand-orange/[0.03] rounded-[100%] blur-[120px] pointer-events-none" />

      {/* Giant Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden mix-blend-overlay">
        <span className="font-syne font-extrabold text-[150px] sm:text-[250px] lg:text-[400px] text-white/[0.02] leading-none select-none tracking-tighter w-full text-center">
          SEP
        </span>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
          
          <div className="flex flex-col items-center text-center lg:border-r border-white/10 px-4">
            <div className="flex items-baseline mb-2">
              <span className="impact-counter font-syne font-extrabold text-[72px] lg:text-[96px] text-brand-gold leading-none" data-target="3000">
                3000
              </span>
            </div>
            <span className="font-sans text-[12px] uppercase tracking-[0.2em] text-white/40 font-bold whitespace-nowrap">
              {t("Heures soleil/an au Maroc", "ساعات شمس/سنة بالمغرب")}
            </span>
          </div>

          <div className="flex flex-col items-center text-center lg:border-r border-white/10 px-4">
            <div className="flex items-baseline mb-2">
              <span className="impact-counter font-syne font-extrabold text-[72px] lg:text-[96px] text-brand-gold leading-none" data-target="500">
                500
              </span>
              <span className="font-syne font-extrabold text-[72px] lg:text-[96px] text-brand-gold leading-none">+</span>
            </div>
            <span className="font-sans text-[12px] uppercase tracking-[0.2em] text-white/40 font-bold whitespace-nowrap">
              {t("Projets livrés", "مشاريع منجزة")}
            </span>
          </div>

          <div className="flex flex-col items-center text-center lg:border-r border-white/10 px-4">
            <div className="flex items-baseline mb-2">
              <span className="impact-counter font-syne font-extrabold text-[72px] lg:text-[96px] text-brand-gold leading-none" data-target="10">
                10
              </span>
              <span className="font-syne font-extrabold text-[48px] lg:text-[64px] text-brand-gold leading-none ml-2">MW</span>
            </div>
            <span className="font-sans text-[12px] uppercase tracking-[0.2em] text-white/40 font-bold whitespace-nowrap">
              {t("Capacité installée", "القدرة المركبة")}
            </span>
          </div>

          <div className="flex flex-col items-center text-center px-4">
            <div className="flex items-baseline mb-2">
              <span className="impact-counter font-syne font-extrabold text-[72px] lg:text-[96px] text-brand-gold leading-none" data-target="98">
                98
              </span>
              <span className="font-syne font-extrabold text-[72px] lg:text-[96px] text-brand-gold leading-none">%</span>
            </div>
            <span className="font-sans text-[12px] uppercase tracking-[0.2em] text-white/40 font-bold whitespace-nowrap">
              {t("Taux de satisfaction", "نسبة الرضا")}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
