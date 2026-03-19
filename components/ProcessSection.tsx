"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function ProcessSection() {
  const { t } = useLanguage();

  const steps = [
    {
      num: "01",
      title: t("Audit Gratuit", "تدقيق مجاني"),
      desc: t(
        "Nous analysons vos besoins énergétiques et votre site.",
        "نحلل احتياجاتك الطاقية وموقعك."
      )
    },
    {
      num: "02",
      title: t("Étude Technique", "دراسة تقنية"),
      desc: t(
        "Notre équipe conçoit une solution sur mesure.",
        "يقوم فريقنا بتصميم حل مخصص."
      )
    },
    {
      num: "03",
      title: t("Installation", "التركيب"),
      desc: t(
        "Nos techniciens certifiés déploient votre système en quelques jours.",
        "يقوم تقنيونا المعتمدون بتركيب نظامك في بضعة أيام."
      )
    },
    {
      num: "04",
      title: t("Suivi & SAV", "المتابعة والخدمة"),
      desc: t(
        "Monitoring continu, maintenance et support à vie.",
        "مراقبة مستمرة وصيانة ودعم مدى الحياة."
      )
    }
  ];

  return (
    <section className="py-24 lg:py-40 bg-dark-bg">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="font-syne font-extrabold text-5xl md:text-[56px] text-white mb-20 tracking-tight text-center lg:text-left">
          {t("Comment Ça Marche.", "كيف نعمل.")}
        </h2>

        <div className="relative">
          {/* Dashed line connecting steps (Desktop only) */}
          <div className="hidden lg:block absolute top-[40px] left-0 right-[25%] border-t border-dashed border-white/15 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col relative group">
                <div className="bg-dark-bg inline-block self-start pr-6 mb-8 relative z-10">
                  <span className="font-syne font-extrabold text-[56px] lg:text-[80px] text-brand-gold leading-none block transform group-hover:-translate-y-2 transition-transform duration-300">
                    {step.num}
                  </span>
                </div>
                
                <h3 className="font-syne font-bold text-2xl text-white mb-4">
                  {step.title}
                </h3>
                
                <p className="font-sans text-[15px] font-light text-white/50 leading-relaxed pr-4">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
