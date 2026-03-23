"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import InteractiveSolarBackground from "@/components/InteractiveSolarBackground";

/**
 * DUAL IMAGE SECTION COMPONENT
 * Implements the 300ms dwell delay (React State) and perfect squashing (flex: 100/0)
 */
const DWELL_MS = 300;

function DualImageSection({ t }: { t: any }) {
  const [focused, setFocused] = useState<number | null>(null);
  const dwellTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ITEMS = [
    { 
      id: 'residential', 
      label: t("Résidentiel & Commercial", "سكني وتجاري"), 
      sub: t("Solutions de Toiture", "حلول الأسطح"), 
      src: '/images/house-with-modern-solar-system-as-a-symbol-of-renewable-energy.webp?v=2' 
    },
    { 
      id: 'agriculture', 
      label: t("Agriculture & Industrie", "الزراعة والصناعة"), 
      sub: t("Pompage & Grandes Surfaces", "الضخ والأسطح الكبيرة"), 
      src: '/images/agro.webp?v=2' 
    },
  ];

  const clearTimer = () => {
    if (dwellTimer.current) {
      clearTimeout(dwellTimer.current);
      dwellTimer.current = null;
    }
  };

  const handleEnter = (i: number) => {
    clearTimer();
    dwellTimer.current = setTimeout(() => setFocused(i), DWELL_MS);
  };

  const handleLeave = () => {
    clearTimer();
    setFocused(null);
  };

  return (
    <section
      className="relative flex flex-col md:flex-row w-full overflow-hidden bg-dark-bg border-y border-white/5"
      style={{ height: '70vh' }}
      onMouseLeave={handleLeave}
    >
      {ITEMS.map((item, i) => {
        const isActive = focused === i;
        const isInactive = focused !== null && focused !== i;

        return (
          <div
            key={item.id}
            onMouseEnter={() => handleEnter(i)}
            style={{
              flex: isActive ? '1 0 100%' : isInactive ? '0 0 0.001%' : '1 0 50%',
              transition: 'flex 0.8s cubic-bezier(0.77, 0, 0.175, 1)',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            {/* Background Image Container */}
            <div 
                className="absolute inset-0 w-full h-full transition-all duration-700"
                style={{
                    filter: isActive ? 'blur(0px) brightness(1)' : 'blur(12px) brightness(0.4)',
                }}
            >
                <img
                    src={item.src}
                    alt={item.label}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>

            {/* Dark Overlay */}
            <div
              className="absolute inset-0 transition-colors duration-700"
              style={{
                background: isActive ? 'rgba(12, 26, 39, 0.1)' : 'rgba(12, 26, 39, 0.45)',
              }}
            />

            {/* Content Layer */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center transition-all duration-700"
              style={{
                opacity: isInactive ? 0 : 1,
                pointerEvents: 'none'
              }}
            >
              <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-brand-gold mb-4 opacity-80 drop-shadow-md">
                {item.sub}
              </span>
              <h2 className="font-syne font-extrabold text-[28px] md:text-[clamp(32px,4vw,56px)] text-white uppercase tracking-tight leading-none drop-shadow-2xl">
                {item.label}
              </h2>
              <div className="w-16 h-1 bg-brand-orange mt-6 transition-all duration-700" 
                   style={{ width: isActive ? '100px' : '0px' }} 
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}

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

      // Hero Background Parallax & Intro
      gsap.fromTo(".hero-bg-image", 
        { scale: 1.2, filter: "brightness(0.3) contrast(1.2)" },
        { 
          scale: 1, 
          filter: "brightness(0.5) contrast(1.5)",
          duration: 2, 
          ease: "power2.out" 
        }
      );

      gsap.to(".hero-bg-image", {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section-main",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <article ref={containerRef} className="bg-dark-bg min-h-screen pt-32 lg:pt-0 overflow-hidden font-sans">
      
      {/* SECTION 1 — PAGE HERO (Full Screen Background) */}
      <section className="hero-section-main relative h-screen flex flex-col justify-center overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/powerline.webp"
            alt="Powerline background"
            fill
            className="hero-bg-image object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Cinematic Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C1A27] via-[#0C1A27]/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A27] via-transparent to-transparent z-10" />
          <div className="absolute inset-0 bg-black/20 mix-blend-overlay z-10" />
        </div>

        {/* Grain noise overlay */}
        <div 
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.035] w-[200%] h-[200%] -left-[50%] -top-[50%] z-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="container mx-auto px-6 lg:px-12 relative z-30">
          <div className="max-w-4xl pt-20 lg:pt-0 lg:-ml-8">
            <div className="overflow-hidden mb-6 py-1">
              <span className="hero-line block font-sans text-brand-gold text-[10px] sm:text-[12px] font-bold uppercase tracking-[0.3em] drop-shadow-md">
                {t("02 — À PROPOS", "02 — من نحن")}
              </span>
            </div>

            <h1 className="font-syne font-extrabold text-[36px] sm:text-[44px] md:text-[58px] lg:text-[clamp(48px,5.5vw,78px)] leading-[1.1] tracking-[-0.04em] text-white mb-10 drop-shadow-2xl">
              <div className="overflow-hidden py-1 pr-4"><span className="hero-line block">{t("Construire", "بناء")}</span></div>
              <div className="overflow-hidden py-1 pr-4"><span className="hero-line block">{t("l'Avenir", "المستقبل")}</span></div>
              <div className="overflow-hidden py-1 pr-4"><span className="hero-line block text-brand-orange drop-shadow-[0_0_15px_rgba(255,123,0,0.3)]">{t("Énergétique.", "الطاقي.")}</span></div>
            </h1>

            <div className="overflow-hidden mb-12">
              <p className="hero-line font-sans text-base md:text-lg font-light text-white/80 max-w-[500px] leading-[1.8] drop-shadow-lg">
                {t(
                  "Depuis Agadir, au cœur du Souss-Massa, SEP accompagne particuliers, agriculteurs et industriels dans leur transition vers une énergie propre, fiable et souveraine.",
                  "من أكادير، في قلب سوس ماسة، ترافق SEP الأفراد والمزارعين والصناعيين في انتقالهم نحو طاقة نظيفة وموثوقة ومستقلة."
                )}
              </p>
            </div>

            <div className="overflow-hidden">
              <div className="hero-line flex flex-wrap gap-6">
                <div className="flex flex-col">
                  <span className="font-syne font-bold text-white text-xl">2014</span>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-brand-gold">{t("Depuis", "منذ")}</span>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="flex flex-col">
                  <span className="font-syne font-bold text-white text-xl">+500</span>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-brand-gold">{t("Projets", "مشروع")}</span>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="flex flex-col">
                  <span className="font-syne font-bold text-white text-xl">Agadir</span>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-brand-gold">{t("Siège", "المقر")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — ORIGIN STORY */}
      <section className="relative origin-section py-32 lg:py-48 px-6">
        <InteractiveSolarBackground baseOpacity={0.03} glowOpacity={0.25} />
        <div className="relative z-10 max-w-[800px] mx-auto text-center flex flex-col items-center">
          <span className="origin-content font-sans text-brand-gold text-xs uppercase tracking-[0.2em] font-bold mb-10 block">
            {t("01 — ORIGINE", "01 — الأصل")}
          </span>
          
          <h2 className="origin-content font-syne font-bold text-[28px] sm:text-[32px] md:text-[42px] leading-[1.1] text-white mb-12 text-balance">
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
      <section className="relative team-values-section pb-32 lg:pb-48 px-6 lg:px-12 container mx-auto">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center overflow-hidden">
          
          <div className="team-image-container relative w-full aspect-[3/4] border border-white/5 bg-[#0F2035] p-0 rounded-none overflow-hidden">
            <Image
              src="/images/workers.webp"
              alt="Construction workers installing solar"
              fill
              className="object-cover object-center rounded-none"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="values-list flex flex-col pt-12 lg:pt-0">
            <span className="font-sans text-brand-gold text-xs uppercase tracking-[0.2em] font-bold mb-6">
              {t("02 — NOS VALEURS", "02 — قيمنا")}
            </span>
            <h2 className="font-syne font-extrabold text-[32px] sm:text-4xl md:text-[44px] text-white leading-[1.1] mb-12">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-24 lg:gap-y-0 text-center">
            
            <div className="flex flex-col items-center px-10 lg:border-r border-white/10">
              <div className="flex items-baseline mb-2">
                <span className="about-counter font-syne font-extrabold text-[56px] lg:text-[64px] text-brand-orange leading-none" data-target="8">
                  8
                </span>
              </div>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold max-w-[120px] mt-4 leading-relaxed whitespace-nowrap">
                {t("Wilayas couvertes", "ولايات مغطاة")}
              </span>
            </div>

            <div className="flex flex-col items-center px-10 lg:border-r border-white/10">
              <div className="flex items-baseline mb-2">
                <span className="about-counter font-syne font-extrabold text-[56px] lg:text-[64px] text-brand-orange leading-none" data-target="3000">
                  3000
                </span>
                <span className="font-syne font-extrabold text-[56px] lg:text-[64px] text-brand-orange leading-none ml-1">h</span>
              </div>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold max-w-[180px] mt-4 leading-relaxed whitespace-nowrap">
                {t("Ensoleillement", "إشعاع الشمس")}
              </span>
            </div>

            <div className="flex flex-col items-center px-10 lg:border-r border-white/10">
              <div className="flex items-baseline mb-2">
                <span className="about-counter font-syne font-extrabold text-[56px] lg:text-[64px] text-brand-orange leading-none" data-target="15">
                  15
                </span>
                <span className="font-syne font-extrabold text-[56px] lg:text-[64px] text-brand-orange leading-none ml-2">+</span>
              </div>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold max-w-[150px] mt-4 leading-relaxed whitespace-nowrap">
                {t("Partenaires", "شركاء")}
              </span>
            </div>

            <div className="flex flex-col items-center px-10">
              <div className="flex items-baseline mb-2">
                <span className="about-counter font-syne font-extrabold text-[56px] lg:text-[64px] text-brand-orange leading-none" data-target="2">
                  2
                </span>
                <span className="font-syne font-extrabold text-[56px] lg:text-[64px] text-brand-orange leading-none ml-1">x</span>
              </div>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold max-w-[150px] mt-4 leading-relaxed whitespace-nowrap">
                {t("ROI Moyen", "عائد الاستثمار")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — DUAL IMAGE SECTION (React Powered Entry) */}
      <DualImageSection t={t} />

      {/* SECTION 6 — CTA (Specific to About) */}
      <section className="cta-section relative w-full py-32 lg:py-48 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/powerline2.webp"
            alt="Aerial view"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#0C1A27]/85 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/50 to-transparent" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center text-center">
          <h2 className="font-syne font-extrabold text-[32px] sm:text-5xl md:text-[64px] max-w-4xl text-white tracking-[-0.02em] leading-tight mb-8">
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
