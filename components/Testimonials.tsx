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
      saving: "65%",
    },
    {
      text: t(
        "Installation rapide, équipe professionnelle. On économise 70% sur notre facture d'électricité.",
        "تركيب سريع، فريق محترف. نقتصد 70% من فاتورة الكهرباء الخاصة بنا."
      ),
      author: "Nadia M.",
      role: t("Gérante d'hôtel, Agadir", "مديرة فندق، أكادير"),
      saving: "70%",
    },
    {
      text: t(
        "Un partenaire de confiance pour notre parc industriel. Je recommande vivement SEP.",
        "شريك موثوق لمجمعنا الصناعي. أوصي بشدة بـ SEP."
      ),
      author: "Youssef K.",
      role: t("Directeur Technique, Tiznit", "مدير تقني، تيزنيت"),
      saving: "80%",
    },
  ];

  return (
    <section className="relative py-24 lg:py-40 bg-dark-bg">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Social Proof Stats Band */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] mb-20 overflow-hidden">
          {[
            { value: "500+", label: t("Clients satisfaits", "عميل راضٍ") },
            { value: "70%", label: t("Économie moyenne", "توفير متوسط") },
            { value: "10 ans", label: t("Garantie installation", "ضمان التركيب") },
            { value: "48h", label: t("Délai d'intervention", "وقت التدخل") },
          ].map((stat, i) => (
            <div key={i} className="bg-[#0F2035] px-8 py-8 flex flex-col gap-1">
              <span className="font-syne font-extrabold text-[36px] md:text-[44px] text-brand-orange leading-none">{stat.value}</span>
              <span className="font-sans text-[11px] uppercase tracking-[0.15em] text-white/50 font-bold mt-2">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <h2 className="font-syne font-extrabold text-5xl md:text-[56px] text-white tracking-tight">
            {t("Ce Qu'ils Disent.", "ماذا يقولون.")}
          </h2>
          <p className="font-sans text-[13px] text-white/40 uppercase tracking-widest max-w-[240px]">
            {t("Avis vérifiés · Clients réels", "آراء موثقة · عملاء حقيقيون")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="group bg-[#0F2035] border border-white/[0.06] hover:border-brand-orange/25 p-10 lg:p-12 relative flex flex-col transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,123,0,0.05)] hover:bg-[#0F2035]/80"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#EEBC58" className="opacity-90">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>

              {/* Massive Quote Mark */}
              <span className="absolute top-4 right-6 font-syne font-extrabold text-[72px] text-brand-gold/10 leading-none pointer-events-none select-none group-hover:text-brand-gold/20 transition-colors duration-300">
                &ldquo;
              </span>
              
              <div className="relative z-10 flex-1">
                <p className="font-sans italic text-[15px] font-light text-white/75 leading-[1.85] mb-10 mt-2">
                  &quot;{item.text}&quot;
                </p>
              </div>

              <div className="relative z-10 pt-6 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <p className="font-sans font-semibold text-[14px] text-white mb-1">
                    {item.author}
                  </p>
                  <p className="font-sans text-[11px] text-sky-blue font-semibold tracking-wider uppercase">
                    {item.role}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-syne font-extrabold text-[22px] text-brand-orange">{item.saving}</span>
                  <p className="font-sans text-[10px] text-white/35 uppercase tracking-widest">{t("économisé", "توفير")}</p>
                </div>
              </div>

              {/* Bottom hover accent line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand-orange group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

