"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { t, lang } = useLanguage();

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animations
      gsap.from(".hero-line", {
        y: 80,
        opacity: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });

      // Origin Story fading up
      gsap.from(".origin-content", {
        y: 60,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".origin-section",
          start: "top 80%",
        },
      });

      // Team Photo + Values opposing slides
      gsap.from(".team-image-container", {
        x: -60,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".team-values-section",
          start: "top 80%",
        },
      });

      gsap.from(".values-list", {
        x: 60,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".team-values-section",
          start: "top 80%",
        },
      });

      // By The Numbers (Counters)
      const counters = document.querySelectorAll('.about-counter');
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
              trigger: ".numbers-section",
              start: "top 75%",
            }
          }
        );
      });

      // Dual Image Editorial sliding
      gsap.fromTo(".dual-image-left", 
        { x: "-5%", scale: 1.04 },
        {
          x: "0%",
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".dual-image-section",
            start: "top 80%",
          }
        }
      );

      gsap.fromTo(".dual-image-right", 
        { x: "5%", scale: 1.04 },
        {
          x: "0%",
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".dual-image-section",
            start: "top 80%",
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <article ref={containerRef} className="bg-dark-bg min-h-screen pt-32 lg:pt-0 overflow-hidden">
      
      {/* SECTION 1 — PAGE HERO */}
      <section className="relative lg:min-h-screen flex flex-col justify-end pt-20 lg:pt-40">
        {/* Grain noise overlay */}
        <div 
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.035] w-[200%] h-[200%] -left-[50%] -top-[50%] z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="flex flex-col lg:flex-row relative z-20 flex-1">
          {/* Text Left (55%) */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center px-6 lg:pl-12 lg:pr-20 pb-16 lg:pb-32">
            <div className="overflow-hidden mb-6">
              <span className="hero-line block font-sans text-brand-gold text-[11px] font-medium uppercase tracking-[0.2em]">
                {t("02 — À PROPOS", "02 — من نحن")}
              </span>
            </div>

            <h1 className="font-syne font-extrabold text-[56px] md:text-[80px] lg:text-[clamp(72px,7vw,110px)] leading-[0.88] tracking-[-0.04em] text-white mb-8">
              <div className="overflow-hidden"><span className="hero-line block">{t("Construire", "بناء")}</span></div>
              <div className="overflow-hidden"><span className="hero-line block">{t("l'Avenir", "المستقبل")}</span></div>
              <div className="overflow-hidden"><span className="hero-line block text-brand-gold">{t("Énergétique.", "الطاقي.")}</span></div>
            </h1>

            <div className="overflow-hidden mb-10">
              <p className="hero-line font-sans text-base font-light text-white/60 max-w-[440px] leading-[1.85]">
                {t(
                  "Depuis Agadir, au cœur du Souss-Massa, SEP accompagne particuliers, agriculteurs et industriels dans leur transition vers une énergie propre, fiable et souveraine.",
                  "من أكادير، في قلب سوس ماسة، ترافق SEP الأفراد والمزارعين والصناعيين في انتقالهم نحو طاقة نظيفة وموثوقة ومستقلة."
                )}
              </p>
            </div>

            <div className="overflow-hidden">
              <div className="hero-line flex flex-wrap gap-4">
                <span className="border border-white/12 px-4 py-2 font-sans font-medium text-[12px] text-white rounded-none">
                  {t("Fondée en 2014", "تأسست عام 2014")}
                </span>
                <span className="border border-white/12 px-4 py-2 font-sans font-medium text-[12px] text-white rounded-none">
                  {t("+500 Projets", "+500 مشروع")}
                </span>
              </div>
            </div>
          </div>

          {/* Image Right (45%) Bleeds right */}
          <div className="w-full lg:w-[45%] h-[50vh] lg:h-auto relative lg:absolute top-0 right-0 bottom-0 z-0">
            {/* Gradient Overlay for fade */}
            <div 
              className="absolute inset-0 z-10 pointer-events-none"
              style={{ background: lang === 'ar' ? 'linear-gradient(to left, #0C1A27 0%, transparent 30%)' : 'linear-gradient(to right, #0C1A27 0%, transparent 30%)' }}
            />
            <Image
              src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=80"
              alt="Industrial solar field"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>

        {/* Bottom Hero Stats Strip */}
        <div className="w-full border-t border-white/10 relative z-20 bg-dark-bg/80 backdrop-blur-sm">
          <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 py-6">
            <div className="flex flex-col border-b md:border-b-0 md:border-r border-white/10 py-4 md:py-2 px-2">
              <span className="font-syne font-bold text-2xl text-white mb-1">2014</span>
              <span className="font-sans text-[11px] uppercase tracking-widest text-white/50">{t("Année de Fondation", "سنة التأسيس")}</span>
            </div>
            <div className="flex flex-col border-b md:border-b-0 md:border-r border-white/10 py-4 md:py-2 md:px-8">
              <span className="font-syne font-bold text-2xl text-white mb-1">Agadir</span>
              <span className="font-sans text-[11px] uppercase tracking-widest text-white/50">{t("Siège Social", "المقر الرئيسي")}</span>
            </div>
            <div className="flex flex-col py-4 md:py-2 md:pl-8">
              <span className="font-syne font-bold text-2xl text-white mb-1">+10 ans</span>
              <span className="font-sans text-[11px] uppercase tracking-widest text-white/50">{t("D'Expérience Terrain", "تجارب ميدانية")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — ORIGIN STORY */}
      <section className="origin-section py-32 lg:py-48 px-6">
        <div className="max-w-[800px] mx-auto text-center flex flex-col items-center">
          <span className="origin-content font-sans text-brand-gold text-xs uppercase tracking-[0.2em] font-bold mb-10 block">
            {t("01 — ORIGINE", "01 — الأصل")}
          </span>
          
          <h2 className="origin-content font-syne font-bold text-[32px] md:text-[42px] leading-[1.1] text-white mb-12 text-balance">
            &quot;{t(
              "Tout a commencé avec une conviction simple : le Maroc possède l'une des ressources solaires les plus riches au monde — elle devait être accessible à tous.",
              "بدأ كل شيء بقناعة بسيطة: يمتلك المغرب إحدى أغنى الموارد الشمسية في العالم — التي يجب أن تكون في متناول الجميع."
            )}&quot;
          </h2>

          <div className="origin-content w-full h-px bg-white/[0.08] my-12" />

          <div className="origin-content grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
            <p className="font-sans text-[15px] text-white/65 font-light leading-[1.9]">
              {t(
                "SEP a été fondée en 2014 par une équipe d'ingénieurs passionnés, originaires du Souss-Massa. Face à la flambée des tarifs électriques et à l'inaccessibilité des énergies renouvelables pour les populations rurales, ils ont décidé d'agir. Les premières années ont été consacrées aux systèmes de pompage solaire pour les agriculteurs de la région — une technologie simple, mais transformatrice.",
                "تأسست SEP في عام 2014 من قبل فريق من المهندسين الشغوفين من سوس ماسة. أمام ارتفاع أسعار الكهرباء وصعوبة وصول السكان في المناطق القروية إلى الطاقات المتجددة، قرروا اتخاذ إجراء. خُصصت السنوات الأولى لأنظمة الضخ بالطاقة الشمسية لمزارعي المنطقة — تقنية بسيطة ولكنها تحويلية."
              )}
            </p>
            <p className="font-sans text-[15px] text-white/65 font-light leading-[1.9]">
              {t(
                "Aujourd'hui, SEP opère sur l'ensemble du territoire marocain, avec des projets livrés de Laâyoune à Tanger. Notre catalogue s'est élargi — installations PV résidentielles et industrielles, chauffe-eau solaires, systèmes d'irrigation connectés — mais notre philosophie reste la même : un travail soigné, des matériaux certifiés, et un suivi sans compromis.",
                "اليوم، تعمل SEP على كامل التراب المغربي، بمشاريع تم تسليمها من العيون إلى طنجة. اتسع نطاقنا — من التركيبات الكهروضوئية السكنية والصناعية، وسخانات المياه الشمسي، إلى أنظمة الري المتصلة — ولكن فلسفتنا تظل كما هي: عمل دقيق، مواد معتمدة، ومتابعة دون مساومة."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — TEAM PHOTO + VALUES */}
      <section className="team-values-section pb-32 lg:pb-48 px-6 lg:px-12 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center overflow-hidden">
          
          {/* Left Image */}
          <div className="team-image-container relative w-full aspect-[3/4] border border-white/5 bg-[#0F2035] p-0 rounded-none">
            <Image
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
              alt="Construction workers installing solar"
              fill
              className="object-cover object-center rounded-none"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Floating Label */}
            <div className="absolute -bottom-6 -left-2 lg:-left-6 bg-[#0F2035] border border-white/10 px-5 py-4 rounded-none shadow-2xl z-10">
              <div className="font-sans font-medium text-[12px] text-white mb-1">
                📍 {t("Agadir, Maroc", "أكادير، المغرب")}
              </div>
              <div className="font-sans font-light text-[11px] text-brand-gold uppercase tracking-wider">
                {t("Équipe terrain certifiée", "فريق ميداني معتمد")}
              </div>
            </div>
          </div>

          {/* Right Values */}
          <div className="values-list flex flex-col pt-12 lg:pt-0">
            <span className="font-sans text-brand-gold text-xs uppercase tracking-[0.2em] font-bold mb-6">
              {t("02 — NOS VALEURS", "02 — قيمنا")}
            </span>
            <h2 className="font-syne font-extrabold text-5xl md:text-[48px] text-white leading-[1.1] mb-12">
              {t("Ce Qui Nous Guide.", "ما يوجهنا.")}
            </h2>

            <div className="flex flex-col border-t border-white/[0.07]">
              {[
                {
                  id: "01",
                  title: t("Expertise Terrain", "الخبرة الميدانية"),
                  desc: t("Chaque installation est conduite par des techniciens formés et certifiés, avec un protocole rigoureux du chantier à la mise en service.", "كل تركيب يتم تحت إشراف تقنيين مدربين ومعتمدين، مع بروتوكول صارم من ورشة العمل إلى مرحلة التشغيل.")
                },
                {
                  id: "02",
                  title: t("Matériaux Certifiés", "مواد معتمدة"),
                  desc: t("Nous ne sourçons que des panneaux, onduleurs et équipements répondant aux normes IEC et CE — aucun compromis sur la qualité.", "نستورد فقط الألواح والمحولات والمعدات التي تتوافق مع معايير IEC و CE — لا مساومة على الجودة.")
                },
                {
                  id: "03",
                  title: t("Proximité Client", "القرب من العميل"),
                  desc: t("Un interlocuteur dédié, un suivi post-installation, et une hotline réactive. Votre satisfaction est notre KPI principal.", "جهة اتصال مخصصة، ومتابعة ما بعد التركيب، وخط ساخن سريع الاستجابة. رضاك هو مؤشر الأداء الرئيسي لنا.")
                },
                {
                  id: "04",
                  title: t("Impact Local", "الأثر المحلي"),
                  desc: t("Entreprise marocaine, nous investissons dans la région Souss-Massa et privilégions les partenaires et sous-traitants locaux.", "شركة مغربية، نستثمر في منطقة سوس ماسة ونمنح الأولوية للشركاء والمقاولين الفرعيين المحليين.")
                }
              ].map((val, i) => (
                <div key={i} className="flex gap-6 py-8 border-b border-white/[0.07]">
                  <span className="font-syne font-extrabold text-[40px] text-brand-gold/40 leading-[0.8]">
                    {val.id}
                  </span>
                  <div className="flex flex-col">
                    <h3 className="font-syne font-bold text-[18px] text-white mb-2">{val.title}</h3>
                    <p className="font-sans font-light text-[13px] text-white/55 leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — BY THE NUMBERS */}
      <section className="numbers-section relative py-32 lg:py-48 bg-[#0F2035] overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-overlay opacity-20">
          <span className="font-syne font-extrabold text-[120px] sm:text-[200px] lg:text-[260px] text-white/[0.05] leading-none select-none tracking-tighter">
            SEP
          </span>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
            
            <div className="flex flex-col items-center text-center lg:border-r border-white/10 px-4">
              <div className="flex items-baseline mb-2">
                <span className="about-counter font-syne font-extrabold text-[60px] lg:text-[80px] text-brand-gold leading-none" data-target="8">
                  8
                </span>
              </div>
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/50 font-bold whitespace-nowrap mt-2">
                {t("Wilayas couvertes", "ولايات مغطاة")}
              </span>
            </div>

            <div className="flex flex-col items-center text-center lg:border-r border-white/10 px-4">
              <div className="flex items-baseline mb-2">
                <span className="about-counter font-syne font-extrabold text-[60px] lg:text-[80px] text-brand-gold leading-none" data-target="3000">
                  3000
                </span>
                <span className="font-syne font-extrabold text-[60px] lg:text-[80px] text-brand-gold leading-none">h</span>
              </div>
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/50 font-bold whitespace-nowrap mt-2">
                {t("Ensoleillement Souss-Massa", "إشعاع سوس ماسة")}
              </span>
            </div>

            <div className="flex flex-col items-center text-center lg:border-r border-white/10 px-4">
              <div className="flex items-baseline mb-2">
                <span className="about-counter font-syne font-extrabold text-[60px] lg:text-[80px] text-brand-gold leading-none" data-target="15">
                  15
                </span>
                <span className="font-syne font-extrabold text-[60px] lg:text-[80px] text-brand-gold leading-none ml-2">+</span>
              </div>
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/50 font-bold whitespace-nowrap mt-2">
                {t("Partenaires certifiés", "شركاء معتمدون")}
              </span>
            </div>

            <div className="flex flex-col items-center text-center px-4">
              <div className="flex items-baseline mb-2">
                <span className="about-counter font-syne font-extrabold text-[60px] lg:text-[80px] text-brand-gold leading-none" data-target="2">
                  2
                </span>
                <span className="font-syne font-extrabold text-[60px] lg:text-[80px] text-brand-gold leading-none">x</span>
              </div>
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/50 font-bold whitespace-nowrap mt-2">
                {t("Retour sur investissement", "عائد الاستثمار")}
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5 — DUAL IMAGE EDITORIAL BLOCK */}
      <section className="dual-image-section flex flex-col md:flex-row w-full h-[70vh] overflow-hidden bg-dark-bg">
        {/* Left Image */}
        <div className="relative w-full md:w-[50vw] h-1/2 md:h-full overflow-hidden">
          <div className="dual-image-left absolute inset-0 w-[110%] h-[110%] -top-[5%] -left-[5%]">
            <Image
              src="https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&q=80"
              alt="Résidentiel & Commercial"
              fill
              className="object-cover object-center"
              sizes="50vw"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[#0C1A27]/35" />
          </div>
          {/* Centered Text */}
          <div className="absolute inset-0 flex items-center justify-center z-10 drop-shadow-lg">
            <span className="font-syne font-bold text-[22px] text-white">{t("Résidentiel & Commercial", "سكني وتجاري")}</span>
          </div>
        </div>

        {/* Center line (Desktop) */}
        <div className="hidden md:block w-px h-full bg-brand-gold z-20" />
        
        {/* Center line (Mobile) */}
        <div className="block md:hidden w-full h-px bg-brand-gold z-20" />

        {/* Right Image */}
        <div className="relative w-full md:w-[50vw] h-1/2 md:h-full overflow-hidden">
          <div className="dual-image-right absolute inset-0 w-[110%] h-[110%] -top-[5%] -left-[5%]">
            <Image
              src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80"
              alt="Agriculture & Industrie"
              fill
              className="object-cover object-center"
              sizes="50vw"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[#0C1A27]/35" />
          </div>
          {/* Centered Text */}
          <div className="absolute inset-0 flex items-center justify-center z-10 drop-shadow-lg">
            <span className="font-syne font-bold text-[22px] text-white">{t("Agriculture & Industrie", "الزراعة والصناعة")}</span>
          </div>
        </div>
      </section>

      {/* SECTION 6 — CTA (Specific to About) */}
      <section className="cta-section relative w-full py-32 lg:py-48 flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1400&q=80"
            alt="Aerial view"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* 85% Dark Overlay */}
          <div className="absolute inset-0 bg-[#0C1A27]/85 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/50 to-transparent" />
          {/* Heat overlay spot */}
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/40 rounded-full blur-[180px] pointer-events-none mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center text-center">
          <h2 className="font-syne font-extrabold text-5xl md:text-[64px] max-w-4xl text-white tracking-[-0.02em] leading-tight mb-8">
            {t("Rejoignez les 500+ clients qui ont fait le choix SEP.", "انضم إلى أكثر من 500 عميل اختاروا SEP.")}
          </h2>
          
          <p className="font-sans text-[16px] font-light text-white/70 tracking-wide mb-12">
            {t("Devis gratuit · Étude personnalisée · Installation certifiée", "عرض مجاني · دراسة مخصصة · تركيب معتمد")}
          </p>

          <Link
            href="/contact"
            className="relative bg-brand-orange hover:bg-brand-heat hover:shadow-[0_0_20px_rgba(255,77,0,0.5)] text-dark-bg transition-all px-12 py-5 text-sm uppercase tracking-widest font-bold font-sans rounded-none"
          >
            {t("Demander un Devis", "طلب عرض سعر")}
          </Link>
        </div>
      </section>

    </article>
  );
}
