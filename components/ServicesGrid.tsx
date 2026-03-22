"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ServicesGrid() {
  const { t } = useLanguage();

  const services = [
    {
      id: "01",
      title: t("Installation Solaire", "تركيب الطاقة الشمسية"),
      desc: t(
        "Installation haut de gamme d'équipements photovoltaïques pour particuliers et industriels.",
        "تركيب معدات كهروضوئية عالية الجودة للأفراد والصناعيين."
      ),
      image: "/images/modern_solar_home.webp",
    },
    {
      id: "02",
      title: t("Maintenance & Optimisation", "الصيانة والتحسين"),
      desc: t(
        "Contrats de maintenance préventive et curative pour maximiser votre production solaire.",
        "عقود صيانة وقائية وعلاجية لزيادة إنتاجك الشمسي إلى أقصى حد."
      ),
      image: "/images/maintenance3.webp",
    },
    {
      id: "03",
      title: t("Solutions Hydrauliques", "الحلول المائية"),
      desc: t(
        "Conception de pompage solaire et gestion des ressources hydrauliques durables.",
        "تصميم الضخ الشمسي وإدارة الموارد المائية المستدامة."
      ),
      image: "/images/pump.webp",
    },
  ];

  return (
    <section className="py-24 lg:py-40 bg-brand-dark-bg relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 lg:mb-32 gap-8 md:gap-0">
          <div className="max-w-2xl">
            <span className="block font-sans text-brand-orange text-xs uppercase tracking-[0.3em] font-bold mb-6">
              {t("// Expertise Technique", "// الخبرة التقنية")}
            </span>
            <h2 className="font-syne font-extrabold text-5xl md:text-[72px] leading-[0.9] text-white tracking-[-0.03em]">
              {t("Domaines", "مجالات")} <br className="hidden lg:block" />
              <span className="outline-text-orange">{t("d'Excellence", "التميز")}</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="group flex items-center gap-4 text-white font-sans text-xs font-bold tracking-[0.2em] transition-colors uppercase border-b border-white/20 pb-2 hover:border-brand-orange"
          >
            {t("Tous nos services", "جميع خدماتنا")} <span className="text-lg group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative flex flex-col h-full bg-[#111] border border-white/5 transition-all duration-500 hover:border-brand-orange/30 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-brand-dark-bg/40 group-hover:bg-brand-dark-bg/10 transition-colors duration-500" />
                
                {/* Number Overlay */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="font-syne font-black text-4xl text-white/10 group-hover:text-brand-orange/40 transition-colors">
                    {service.id}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-10 flex-1 flex flex-col">
                <h3 className="font-syne font-bold text-2xl text-white mb-6 leading-tight group-hover:text-brand-orange transition-colors">
                  {service.title}
                </h3>
                
                <p className="font-sans text-[15px] text-white/50 font-light leading-relaxed mb-8">
                  {service.desc}
                </p>

                <div className="mt-auto">
                  <div className="w-12 h-[1px] bg-white/20 group-hover:w-full group-hover:bg-brand-orange transition-all duration-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
          color: transparent;
        }
        .outline-text-orange {
          -webkit-text-stroke: 2px #FF7B00;
          color: transparent;
          filter: drop-shadow(0 0 12px rgba(255, 123, 0, 0.35));
        }
      `}</style>
    </section>
  );
}
