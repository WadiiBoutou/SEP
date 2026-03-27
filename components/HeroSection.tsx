"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
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
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-brand-dark-bg"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/fallback_home.webp" 
          alt="" 
          fill 
          className={`object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-0' : 'opacity-60'}`}
          priority
          sizes="100vw"
        />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/fallback_home.webp"
          onPlaying={() => setIsVideoLoaded(true)}
          className="w-full h-full object-cover opacity-60 relative z-10"
        >
          <source src="/sunny_sky.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark-bg/80 via-transparent to-brand-dark-bg z-20" />
        <div className="absolute inset-0 bg-brand-dark-bg/20 z-20" />
      </div>

      {/* Grain noise overlay */}
      <div 
        className="hero-grain absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.035] w-[200%] h-[200%] -left-[50%] -top-[50%] z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 flex-1 flex flex-col justify-center relative z-10 pt-16">
        <div className="max-w-4xl">
          <h1 className="font-syne font-semibold text-[40px] sm:text-[54px] leading-[0.95] tracking-[-0.04em] md:text-[76px] lg:text-[95px] text-white mb-10">
            <span className="hero-line block pb-[0.08em]">{t("L'Énergie", "الطاقة")} <span className="text-brand-heat drop-shadow-[0_0_25px_rgba(255,77,0,0.6)]">{t("SOLAIRE", "الشمسية")}</span></span>
            <span className="hero-line block pb-[0.08em]">{t("Qui Change", "التي تغير")} <span className="text-brand-glow drop-shadow-[0_0_20px_rgba(255,170,0,0.4)]">{t("Tout.", "كل شيء.")}</span></span>
          </h1>

          <div className="overflow-hidden mb-10">
            <p className="hero-line font-sans text-sm sm:text-md font-light text-white/80 max-w-[480px] leading-relaxed">
              {t(
                "Depuis Agadir, nous propulsons l'avenir énergétique du Maroc with des installations photovoltaïques de pointe et une expertise technique inégalée.",
                "من أكادير، ندفع بمستقبل الطاقة في المغرب من خلال تركيبات كهروضوئية متطورة وخبرة تقنية لا مثيل لها."
              )}
            </p>
          </div>

          <div className="overflow-hidden">
            <div className="hero-line flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <Link
                href="/contact"
                className="cta-glow group relative overflow-hidden bg-brand-orange px-10 py-5 text-dark-bg transition-all rounded-none"
              >
                <span className="relative z-10 text-xs uppercase tracking-[0.2em] font-bold font-sans">
                  {t("Démarrer votre projet", "ابدأ مشروعك")}
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              <Link
                href="/services"
                className="group flex items-center gap-3 text-white transition-all font-sans text-sm uppercase tracking-widest font-bold"
              >
                <span className="border-b border-white/30 pb-1 group-hover:border-brand-glow group-hover:text-brand-glow transition-all">
                  {t("Expertise Technique", "الخبرة التقنية")}
                </span>
                <span className="text-xl group-hover:translate-x-2 transition-transform">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
