"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ServicesGrid() {
  const { t } = useLanguage();

  const services = [
    {
      id: "01",
      icon: "⚡",
      title: t("Installation Solaire PV", "تركيب الطاقة الشمسية للكهرباء"),
      desc: t(
        "Systèmes résidentiels, commerciaux et industriels. Onduleurs hybrides, batteries lithium, monitoring connecté.",
        "أنظمة سكنية وتجارية وصناعية. محولات هجينة، بطاريات ليثيوم، مراقبة متصلة."
      ),
    },
    {
      id: "02",
      icon: "💧",
      title: t("Pompage Solaire", "الضخ بالطاقة الشمسية"),
      desc: t(
        "Pompes immergées et de surface pour l'agriculture, l'irrigation et l'adduction d'eau en zones rurales.",
        "مضخات غاطسة وسطحية للزراعة والري وتوفير المياه في المناطق القروية."
      ),
    },
    {
      id: "03",
      icon: "🔆",
      title: t("Chauffe-eau Solaire", "تسخين المياه بالطاقة الشمسية"),
      desc: t(
        "Capteurs thermiques plans et tubes sous vide pour hôtels, villas et complexes industriels.",
        "سخانات حرارية مسطحة وأنابيب مفرغة للفنادق والفيلات والمجمعات الصناعية."
      ),
    },
    {
      id: "04",
      icon: "🔧",
      title: t("Maintenance & SAV", "الصيانة وخدمة ما بعد البيع"),
      desc: t(
        "Contrats d'entretien préventif, curatif, et hotline technique 6j/7 pour toutes vos installations.",
        "عقود صيانة وقائية وعلاجية، وخط ساخن تقني 6 أيام في الأسبوع لجميع تركيباتكم."
      ),
    },
  ];

  return (
    <section className="py-24 lg:py-40 bg-dark-bg">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 lg:mb-24 gap-8 md:gap-0">
          <div>
            <span className="block font-sans text-brand-gold text-xs uppercase tracking-[0.2em] font-bold mb-4">
              {t("02 — CE QUE NOUS FAISONS", "02 — ماذا نفعل")}
            </span>
            <h2 className="font-syne font-extrabold text-5xl md:text-[64px] leading-tight text-white tracking-[-0.02em]">
              {t("Nos Services.", "خدماتنا.")}
            </h2>
          </div>
          <Link
            href="/services"
            className="text-white hover:text-brand-gold font-sans text-sm font-bold tracking-wider flex items-center gap-2 transition-colors uppercase border-b border-transparent hover:border-brand-gold pb-1"
          >
            {t("Voir Tous", "عرض الكل")} <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* Grid - Horizontal Scroll on Mobile, 2x2 on Desktop */}
        <div className="flex overflow-x-auto lg:grid lg:grid-cols-2 gap-6 pb-8 lg:pb-0 snap-x snap-mandatory hide-scrollbar">
          {services.map((service) => (
            <div
              key={service.id}
              className="min-w-[85vw] sm:min-w-[400px] lg:min-w-0 snap-start bg-[#0F2035] border border-white/5 border-t-brand-gold border-t-2 p-10 lg:p-12 relative overflow-hidden transition-all duration-300 hover:bg-primary-blue/15 hover:border-primary-blue/50 hover:-translate-y-1.5 group cursor-pointer"
            >
              {/* Background Number */}
              <span className="absolute top-6 right-8 font-syne font-extrabold text-[72px] text-white/[0.04] leading-none pointer-events-none transition-colors duration-300 group-hover:text-primary-blue/20">
                {service.id}
              </span>

              <div className="relative z-10 flex flex-col h-full">
                <div className="text-[36px] mb-8 select-none">
                  {service.icon}
                </div>
                
                <h3 className="font-syne font-bold text-[22px] text-white mb-4 leading-snug">
                  {service.title}
                </h3>
                
                <p className="font-sans text-[13px] text-white/55 font-light leading-relaxed mt-auto max-w-[90%]">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
