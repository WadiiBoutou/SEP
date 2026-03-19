"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    {
      text: t(
        "SEP a transformé notre exploitation agricole à Taroudant. Notre système de pompage fonctionne parfaitement depuis 2 ans.",
        "قامت SEP بتغيير مزرعتنا في تارودانت. نظام الضخ لدينا يعمل بشكل مثالي منذ عامين."
      ),
      author: "Hassan B.",
      role: t("Agriculteur, Souss-Massa", "مزارع، سوس ماسة"),
    },
    {
      text: t(
        "Installation rapide, équipe professionnelle. On économise 70% sur notre facture d'électricité.",
        "تركيب سريع، فريق محترف. نقتصد 70% من فاتورة الكهرباء الخاصة بنا."
      ),
      author: "Nadia M.",
      role: t("Gérante d'hôtel, Agadir", "مديرة فندق، أكادير"),
    },
    {
      text: t(
        "Un partenaire de confiance pour notre parc industriel. Je recommande vivement SEP.",
        "شريك موثوق لمجمعنا الصناعي. أوصي بشدة بـ SEP."
      ),
      author: "Youssef K.",
      role: t("Directeur Technique, Tiznit", "مدير تقني، تيزنيت"),
    },
  ];

  return (
    <section className="py-24 lg:py-40 bg-dark-bg">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="font-syne font-extrabold text-5xl md:text-[56px] text-white tracking-tight mb-20 text-center lg:text-left">
          {t("Ce Qu'ils Disent.", "ماذا يقولون.")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-[#0F2035] border border-white/[0.06] p-10 lg:p-12 relative flex flex-col"
            >
              {/* Massive Quote Mark */}
              <span className="absolute top-4 left-6 font-syne font-extrabold text-[80px] text-brand-gold/30 leading-none pointer-events-none select-none">
                &ldquo;
              </span>
              
              <div className="relative z-10 flex-1">
                <p className="font-sans italic text-[15px] font-light text-white/70 leading-[1.8] mb-12 mt-8">
                  &quot;{item.text}&quot;
                </p>
              </div>

              <div className="relative z-10 pt-6 border-t border-white/5">
                <p className="font-sans font-medium text-[14px] text-white mb-1">
                  {item.author}
                </p>
                <p className="font-sans text-[12px] text-brand-gold tracking-wider uppercase">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
