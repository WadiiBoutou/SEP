"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-dark-bg" />,
});

export default function ServicesPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { t, lang } = useLanguage();

  const handleScrollTo = (id: string) => {
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.scrollTo(id);
    }
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      // SECTION 1 — PAGE HERO
      gsap.from(".hero-text-line", {
        y: 80,
        opacity: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".pill-nav", {
        y: 20,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.8,
      });

      // Typing effect for "Promesses" / "وعود"
      const promessesText = document.querySelector('.typing-target');
      if (promessesText) {
        const text = promessesText.textContent || "";
        promessesText.textContent = "";
        const chars = text.split("");
        chars.forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.style.opacity = "0";
          promessesText.appendChild(span);
        });

        gsap.to(promessesText.children, {
          opacity: 1,
          duration: 0.05,
          stagger: 0.1, // ~2 seconds for ~20 chars or adjusted for "Promesses" (9 chars)
          ease: "none",
          delay: 1.2
        });
      }

      // SECTION 2, 3, 4, 5 — SERVICE SECTIONS
      const serviceSections = gsap.utils.toArray('.service-section');

      serviceSections.forEach((section: any, index: number) => {
        // Alternating layout text/img slide directions
        // Sections 0 and 2: Text Left (from left), Image Right (from right)
        // Sections 1 and 3: Image Left (from left), Text Right (from right)

        const textBlock = section.querySelector('.service-text');
        const imgBlock = section.querySelector('.service-image');
        const ghostNumber = section.querySelector('.ghost-number');

        let isReversedLayout = index % 2 !== 0;

        let textStartX = isReversedLayout ? 60 : -60;
        let imgStartX = isReversedLayout ? -60 : 60;

        // Slide text
        gsap.fromTo(textBlock,
          { x: textStartX, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
            }
          }
        );

        // Slide image
        gsap.fromTo(imgBlock,
          { x: imgStartX, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
            }
          }
        );

        // Ghost number atmospheric fade
        if (ghostNumber) {
          gsap.fromTo(ghostNumber,
            { opacity: 0 },
            {
              opacity: 0.025, duration: 1.4, ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
              }
            }
          );
        }
      });

      // SECTION 6 — COMPARISON TABLE
      gsap.from(".table-row-animate", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".comparison-section",
          start: "top 80%",
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, [lang]); // Re-run animations if lang changes layout

  return (
    <article ref={containerRef} className="bg-dark-bg min-h-screen pt-32 lg:pt-0 overflow-hidden font-sans">

      {/* SECTION 1 — PAGE HERO */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20 pb-20 overflow-hidden">
        {/* Video Background/Overlay Layer */}
        {/* Spline 3D Scene Background — Adjust bottom opacity here (/85) */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-dark-bg">
          <div className="absolute inset-0 opacity-100 z-10 pointer-events-none bg-gradient-to-b from-[rgb(var(--rgb-dark-bg)/0.2)] via-transparent to-[rgb(var(--rgb-dark-bg)/0.9)]" />
          <Spline
            scene="https://prod.spline.design/4sL7FIpm-FDQzufs/scene.splinecode"
            style={{ width: '100%', height: 'calc(100% + 100px)', position: 'absolute', top: '-50px', left: 0 }}
            className="w-full h-full"
            onLoad={(spline) => {
              // Trial various common names for text objects in this scene
              const namesToHide = ['RAY OF LIGHT', 'Ray of Light', 'RAY', 'LIGHT', 'Text', 'Text 1', 'Text 2'];
              namesToHide.forEach(name => {
                const obj = spline.findObjectByName(name);
                if (obj) {
                  obj.visible = false;
                  console.log(`Successfully hidden Spline object: ${name}`);
                }
              });
            }}
          />

          {/* Intense Orange Overlay for Tinting */}
          <div className="absolute inset-0 bg-brand-orange/15 mix-blend-overlay z-1" />
          <div className="absolute inset-0 bg-brand-orange/5 mix-blend-color z-1" />

          {/* Detailed Dark Overlay — Adjust bottom opacity here (/85) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--rgb-dark-bg)/0.3)] via-transparent to-[rgb(var(--rgb-dark-bg)/0.85)] z-2" />
        </div>

        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.035] w-[200%] h-[200%] -left-[50%] -top-[50%] z-3"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl">
          <h1 className="font-syne font-semibold text-[40px] sm:text-[54px] leading-[0.95] tracking-[-0.04em] md:text-[76px] lg:text-[95px] text-white flex flex-col items-center mb-10">
            <div className="overflow-hidden"><span className="hero-text-line block pb-[0.08em]">{t("Des Solutions.", "حلول.")}</span></div>
            <div className="overflow-hidden"><span className="hero-text-line block pb-[0.08em]">{t("Pas des", "وليست")}</span></div>
            <div className="overflow-hidden">
              <span className="hero-text-line block pb-[0.08em] text-brand-gold border-b-2 border-brand-gold inline-block typing-target">
                {t("Promesses.", "وعود.")}
              </span>
            </div>
          </h1>

          <div className="overflow-hidden mb-16 px-4">
            <p className="hero-text-line text-base font-light text-white/55 max-w-[520px] leading-[1.9] mx-auto">
              {t(
                "De l'installation photovoltaïque au pompage agricole, en passant par la maintenance long terme — chaque service SEP est conçu pour durer, performer et libérer.",
                "من تركيب الألواح الكهروضوئية إلى الضخ الزراعي والصيانة طويلة الأمد — صُممت كل خدمة في SEP لتدوم وتؤدي بحرية."
              )}
            </p>
          </div>

          {/* Bottom Strip Pill Nav Anchors */}
          <div className="overflow-hidden pt-4">
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { id: "#installation-pv", fr: "01 Installation PV", ar: "01 تركيب الطاقة الشمسية" },
                { id: "#pompage-solaire", fr: "02 Pompage Solaire", ar: "02 الضخ الشمسي" },
                { id: "#chauffe-eau", fr: "03 Chauffe-eau", ar: "03 سخانات المياه" },
                { id: "#maintenance", fr: "04 Maintenance", ar: "04 الصيانة" },
              ].map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => handleScrollTo(link.id)}
                  className="pill-nav border border-white/15 px-5 py-2 text-[12px] font-medium uppercase tracking-wider text-white hover:bg-brand-gold/10 hover:border-brand-gold transition-colors duration-300 rounded-none cursor-pointer"
                >
                  {t(link.fr, link.ar)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — SERVICE 01: INSTALLATION SOLAIRE PV */}
      <section id="installation-pv" className="service-section relative pt-24 pb-20 lg:py-40 border-t border-white/10 mx-auto max-w-[1600px] overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col-reverse lg:flex-row items-stretch w-full">

          {/* Text Left (55%) */}
          <div className="service-text w-full lg:w-[55%] flex flex-col justify-center px-6 lg:pl-12 lg:pr-24 relative mt-16 lg:mt-0">
            {/* Ghost Number absolute top-0 left-0 inside left container */}
            <span className="ghost-number absolute top-[-60px] left-0 font-syne font-extrabold text-[100px] lg:text-[160px] text-white pointer-events-none opacity-0 leading-none select-none z-0">
              01
            </span>

            <div className="relative z-10 w-full max-w-[600px] lg:ml-auto">
              <span className="font-sans text-brand-gold text-[12px] uppercase tracking-[0.2em] font-medium mb-6 block" style={{ fontVariant: 'small-caps' }}>
                {t("Service 01", "خدمة 01")}
              </span>

              <h2 className="font-syne font-extrabold text-[28px] sm:text-4xl md:text-[48px] text-white leading-[1.1] tracking-[-0.02em] mb-6">
                {t("Installation Solaire Photovoltaïque.", "تركيب الطاقة الشمسية الكهروضوئية.")}
              </h2>

              <p className="font-sans text-[17px] font-normal text-white/70 max-w-[480px] leading-[1.8] mb-12">
                {t(
                  "Du studio en ville à l'usine en zone industrielle, nous concevons et déployons des systèmes PV adaptés à votre consommation, votre toit et votre budget.",
                  "من شقة في المدينة إلى المصنع في المنطقة الصناعية، نصمم وننشر أنظمة تكييف متناسبة مع استهلاككم، وسقفكم، وميزانيتكم."
                )}
              </p>

              <div className="flex flex-col w-full">
                {[
                  { name: t("Audit Énergétique Gratuit", "تدقيق طاقي مجاني"), desc: t("Analyse de votre consommation et dimensionnement optimal du système.", "تحليل الاستهلاك وتحديد الأبعاد المثلى للنظام.") },
                  { name: t("Onduleurs Hybrides", "محولات هجينة"), desc: t("Compatibles réseau et autonomes, avec gestion intelligente des batteries.", "متوافقة مع الشبكة ومستقلة، مع إدارة ذكية للبطاريات.") },
                  { name: t("Suivi en Temps Réel", "تتبع في الوقت الفعلي"), desc: t("Application mobile connectée pour monitorer production et économies.", "تطبيق متصل لمراقبة الإنتاج والتوفير.") },
                  { name: t("Garantie 25 ans", "25 سنة ضمان"), desc: t("Sur les panneaux. Garantie 10 ans sur onduleurs et main d'œuvre.", "على الألواح. ضمان 10 سنوات على المحولات واليد العاملة.") },
                ].map((ft, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-start py-4 border-t border-white/[0.07] gap-2 md:gap-8">
                    <h3 className="w-full md:w-[40%] font-syne font-semibold text-[14px] text-white shrink-0 mt-1">{ft.name}</h3>
                    <p className="w-full md:w-[60%] font-sans font-light text-[13px] text-white/55 leading-[1.7]">{ft.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 inline-block">
                <Link href="/contact" className="font-sans font-medium text-[14px] text-brand-gold hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-brand-gold pb-1 block">
                  {t("Demander un Devis →", "طلب عرض سعر ←")}
                </Link>
              </div>
            </div>
          </div>

          {/* Image Right (45%) */}
          <div className="service-image w-full lg:w-[45%] h-[50vh] lg:h-auto min-h-[500px] relative">
            <div
              className="absolute inset-y-0 left-0 w-[40%] z-10 pointer-events-none hidden lg:block"
              style={{
                background:
                  lang === 'ar'
                    ? 'linear-gradient(to right, rgb(var(--rgb-dark-bg)) 0%, transparent 100%)'
                    : 'linear-gradient(to right, rgb(var(--rgb-dark-bg)) 0%, transparent 100%)'
              }}
            />
            {/* For precise bleed fading on LTR (left edge of image fades into background #0C1A27) */}
            <div className="absolute inset-y-0 left-0 w-[25%] lg:bg-gradient-to-r from-dark-bg to-transparent z-10 pointer-events-none" />

            <Image
              src="/images/-1x-1.webp"
              alt="Installation photovoltaïque"
              fill
              className="object-cover object-center rounded-none"
              sizes="(max-width: 1024px) 100vw, 45vw"
              loading="lazy"
            />

            {/* Floating Badge (Bottom-Left overlap) */}
            <div className="absolute -bottom-6 left-6 lg:-left-12 bg-off-dark border border-white/10 px-4 py-3 z-20 shadow-2xl rounded-none">
              <span className="font-sans font-medium text-[12px] text-brand-gold whitespace-nowrap">
                ⚡ {t("Résidentiel · Commercial · Industriel", "سكني · تجاري · صناعي")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — SERVICE 02: POMPAGE SOLAIRE (REVERSED) */}
      <section id="pompage-solaire" className="service-section relative pt-24 pb-20 lg:py-40 border-t border-white/10 mx-auto max-w-[1600px] overflow-hidden">
        <div className="flex flex-col lg:flex-row items-stretch w-full">

          {/* Image Left (45%) on Desktop, stacks on top for Mobile */}
          <div className="service-image w-full lg:w-[45%] h-[50vh] lg:h-auto min-h-[500px] relative order-1 lg:order-none">
            {/* Gradient fade right side of image into background */}
            <div className="absolute inset-y-0 right-0 w-[25%] lg:bg-gradient-to-l from-dark-bg to-transparent z-10 pointer-events-none" />

            <Image
              src="/images/irrigation.webp"
              alt="Pompage solaire et irrigation agricole"
              fill
              className="object-cover object-center rounded-none"
              sizes="(max-width: 1024px) 100vw, 45vw"
              loading="lazy"
            />
          </div>

          {/* Text Right (55%) */}
          <div className="service-text w-full lg:w-[55%] flex flex-col justify-center px-6 lg:pl-24 lg:pr-12 relative mt-16 lg:mt-0 order-2 lg:order-none">
            {/* Ghost Number absolute top-0 right-0 inside right container */}
            <span className="ghost-number absolute top-[-60px] lg:right-12 font-syne font-extrabold text-[150px] lg:text-[200px] text-white pointer-events-none opacity-0 leading-none select-none z-0">
              02
            </span>

            <div className="relative z-10 w-full max-w-[600px] lg:mr-auto">
              <span className="font-sans text-brand-gold text-[12px] uppercase tracking-[0.2em] font-medium mb-6 block" style={{ fontVariant: 'small-caps' }}>
                {t("Service 02", "خدمة 02")}
              </span>

              <h2 className="font-syne font-extrabold text-[28px] sm:text-4xl md:text-[48px] text-white leading-[1.1] tracking-[-0.02em] mb-6">
                {t("Pompage Solaire & Irrigation.", "الضخ بالطاقة الشمسية والري.")}
              </h2>

              <p className="font-sans text-[17px] font-normal text-white/70 max-w-[480px] leading-[1.8] mb-12">
                {t(
                  "L'eau et le soleil — deux ressources infinies au Maroc. Nos systèmes de pompage transforment l'une grâce à l'autre, pour irriguer, abreuver et alimenter sans raccordement réseau.",
                  "الماء والشمس — موردان لا ينضبان في المغرب، أنظمتنا تحول الأول بفضل الآخر لسقي الشجر وتغذية الماشية بصورة مستديمة وبلا شبكات نقل."
                )}
              </p>

              <div className="flex flex-col w-full">
                {[
                  { name: t("Pompes Immergées", "مضخات غاطسة"), desc: t("Jusqu'à 300m de profondeur, débit jusqu'à 150m³/h selon configuration.", "حتى 300 متر عمق، وتدفق 150m³/h حسب الإعدادات.") },
                  { name: t("Contrôleur MPPT", "مبرمج MPPT"), desc: t("Extraction optimale de la puissance solaire même par ciel voilé.", "استخراج أقوى للطاقة، حتى لو كان الجو الغائم.") },
                  { name: t("Réservoir & Surpression", "خزانات"), desc: t("Stockage d'eau journalier avec système de pression constante.", "تخزين مائي يومي بضغط طاقي دائم.") },
                  { name: t("Monitoring GSM", "نظام GSM متصل"), desc: t("Suivi à distance de la pompe, alertes pannes et rapports de débit.", "مراقبة عن بعد لحالة المضخة وإشارات الأعطال وبيانات السقي.") },
                ].map((ft, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-start py-4 border-t border-white/[0.07] gap-2 md:gap-8">
                    <h3 className="w-full md:w-[40%] font-syne font-semibold text-[14px] text-white shrink-0 mt-1">{ft.name}</h3>
                    <p className="w-full md:w-[60%] font-sans font-light text-[13px] text-white/55 leading-[1.7]">{ft.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 inline-block">
                <Link href="/contact" className="font-sans font-medium text-[14px] text-brand-gold hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-brand-gold pb-1 block">
                  {t("Voir les Configurations →", "استعراض الإعدادات ←")}
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4 — SERVICE 03: CHAUFFE-EAU SOLAIRE */}
      <section id="chauffe-eau" className="service-section relative pt-24 pb-20 lg:py-40 border-t border-white/10 mx-auto max-w-[1600px] overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col-reverse lg:flex-row items-stretch w-full">

          <div className="service-text w-full lg:w-[55%] flex flex-col justify-center px-6 lg:pl-12 lg:pr-24 relative mt-16 lg:mt-0">
            <span className="ghost-number absolute top-[-60px] left-0 font-syne font-extrabold text-[150px] lg:text-[200px] text-white pointer-events-none opacity-0 leading-none select-none z-0">
              03
            </span>

            <div className="relative z-10 w-full max-w-[600px] lg:ml-auto">
              <span className="font-sans text-brand-gold text-[12px] uppercase tracking-[0.2em] font-medium mb-6 block" style={{ fontVariant: 'small-caps' }}>
                {t("Service 03", "خدمة 03")}
              </span>

              <h2 className="font-syne font-extrabold text-[28px] sm:text-4xl md:text-[48px] text-white leading-[1.1] tracking-[-0.02em] mb-6">
                {t("Chauffe-eau Solaire Thermique.", "سخانات المياه بالطاقة الشمسية.")}
              </h2>

              <p className="font-sans text-[17px] font-normal text-white/70 max-w-[480px] leading-[1.8] mb-12">
                {t(
                  "La production d'eau chaude représente jusqu'à 30% de la facture énergétique d'un foyer ou d'un hôtel. Nos capteurs thermiques éliminent ce coût — durablement.",
                  "يمثل إنتاج المياه الساخنة حتى 30٪ من فاتورة الطاقة لمنزل أو فندق. أجهزة الاستشعار الحرارية لدينا تقضي على هذه التكلفة — بشكل مستدام."
                )}
              </p>

              <div className="flex flex-col w-full">
                {[
                  { name: t("Capteurs Plans Vitrés", "مجمعات مسطحة زجاجية"), desc: t("Haute performance en ensoleillement diffus, idéaux pour usage résidentiel.", "أداء عالي في أشعة الشمس المنتشرة، مثالية للاستخدام السكني.") },
                  { name: t("Tubes Sous Vide", "أنابيب مفرغة"), desc: t("Rendement supérieur en zones à fort irradiation — parfaits pour le sud marocain.", "إنتاجية أعلى في مناطق الإشعاع القوي - مثالية للجنوب المغربي.") },
                  { name: t("Ballon Inox 316L", "خزان إينوكس 316L"), desc: t("Cuve sanitaire anti-corrosion, isolation polyuréthane haute densité.", "خزان صحي مضاد للتآكل، عزل بولي يوريثين عالي الكثافة.") },
                  { name: t("Appoint Électrique", "دعم كهربائي"), desc: t("Résistance intégrée pour les périodes nuageuses — autonomie totale garantie.", "مقاومة مدمجة للفترات الغائمة — استقلالية كاملة مضمونة.") },
                ].map((ft, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-start py-4 border-t border-white/[0.07] gap-2 md:gap-8">
                    <h3 className="w-full md:w-[40%] font-syne font-semibold text-[14px] text-white shrink-0 mt-1">{ft.name}</h3>
                    <p className="w-full md:w-[60%] font-sans font-light text-[13px] text-white/55 leading-[1.7]">{ft.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="service-image w-full lg:w-[45%] h-[50vh] lg:h-auto min-h-[500px] relative">
            <div className="absolute inset-y-0 left-0 w-[25%] lg:bg-gradient-to-r from-dark-bg to-transparent z-10 pointer-events-none" />

            <Image
              src="/images/chauffe eau solaire.webp"
              alt="Chauffe-eau solaire"
              fill
              className="object-cover object-center rounded-none"
              sizes="(max-width: 1024px) 100vw, 45vw"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* SECTION 5 — SERVICE 04: MAINTENANCE & SAV (REVERSED) */}
      <section id="maintenance" className="service-section relative pt-24 pb-20 lg:py-40 border-t border-white/10 mx-auto max-w-[1600px] overflow-hidden">
        <div className="flex flex-col lg:flex-row items-stretch w-full">

          <div className="service-image w-full lg:w-[45%] h-[50vh] lg:h-auto min-h-[500px] relative order-1 lg:order-none">
            <div className="absolute inset-y-0 right-0 w-[25%] lg:bg-gradient-to-l from-dark-bg to-transparent z-10 pointer-events-none" />

            <Image
              src="/images/maintenance2.webp"
              alt="Maintenance and technical support"
              fill
              className="object-cover object-center rounded-none"
              sizes="(max-width: 1024px) 100vw, 45vw"
              loading="lazy"
            />
          </div>

          <div className="service-text w-full lg:w-[55%] flex flex-col justify-center px-6 lg:pl-24 lg:pr-12 relative mt-16 lg:mt-0 order-2 lg:order-none">
            <span className="ghost-number absolute top-[-60px] lg:right-12 font-syne font-extrabold text-[150px] lg:text-[200px] text-white pointer-events-none opacity-0 leading-none select-none z-0">
              04
            </span>

            <div className="relative z-10 w-full max-w-[600px] lg:mr-auto">
              <span className="font-sans text-brand-gold text-[12px] uppercase tracking-[0.2em] font-medium mb-6 block" style={{ fontVariant: 'small-caps' }}>
                {t("Service 04", "خدمة 04")}
              </span>

              <h2 className="font-syne font-extrabold text-[28px] sm:text-4xl md:text-[48px] text-white leading-[1.1] tracking-[-0.02em] mb-6">
                {t("Maintenance & Support Long Terme.", "صيانة ودعم طويل الأمد.")}
              </h2>

              <p className="font-sans text-[17px] font-normal text-white/70 max-w-[480px] leading-[1.8] mb-12">
                {t(
                  "Une installation solaire dure 25 ans. Notre contrat de maintenance aussi. Nous assurons la performance de votre système dans la durée — pas seulement à la livraison.",
                  "التركيب الشمسي يدوم لمدة 25 عامًا. عقد صيانتنا أيضًا. نحن نضمن أداء نظامك على المدى الطويل - وليس فقط عند التسليم."
                )}
              </p>

              <div className="flex flex-col w-full">
                {[
                  { name: t("Inspection Annuelle", "التفتيش السنوي"), desc: t("Nettoyage des panneaux, vérification des connexions, test de l'onduleur.", "تنظيف اللوحات وفحص الوصلات واختبار العاكس.") },
                  { name: t("Remplacement Garanti", "استبدال مضمون"), desc: t("Pièces défectueuses remplacées sous garantie constructeur sans surcoût.", "قطع غيار معيبة يتم استبدالها بموجب ضمان الشركة المصنعة دون أي تكلفة إضافية.") },
                  { name: t("Rapport Mensuel", "التقرير الشهري"), desc: t("Données de production, comparatif vs prévisionnel, alertes dégradation.", "بيانات الإنتاج، وتنبيهات تدهور الأداء.") },
                  { name: t("Hotline Technique", "الخط الساخن الفني"), desc: t("Joignable 6j/7, intervention terrain sous 48h sur la région Souss-Massa.", "متوفر 6 أيام في الأسبوع، تدخل ميداني خلال 48 ساعة في منطقة سوس ماسة.") },
                ].map((ft, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-start py-4 border-t border-white/[0.07] gap-2 md:gap-8">
                    <h3 className="w-full md:w-[40%] font-syne font-semibold text-[14px] text-white shrink-0 mt-1">{ft.name}</h3>
                    <p className="w-full md:w-[60%] font-sans font-light text-[13px] text-white/55 leading-[1.7]">{ft.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 6 — COMPARISON TABLE */}
      <section className="relative comparison-section pt-16 pb-32 lg:pt-24 lg:pb-48 px-6 bg-off-dark border-y border-white/5">
        <div className="relative z-10 container mx-auto">
          {/* Header */}
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-[600px]">
              <span className="block font-sans text-brand-gold text-[12px] uppercase tracking-[0.2em] font-medium mb-4">
                {t("COMPARATIF", "مقارنة")}
              </span>
              <h2 className="font-syne font-extrabold text-[32px] sm:text-[40px] md:text-[48px] leading-tight text-white mb-4">
                {t("Quel Service Pour Vous ?", "ما هي الخدمة الأنسب لك؟")}
              </h2>
              <p className="font-sans text-[15px] font-light text-white/55 leading-relaxed">
                {t("Un récapitulatif rapide pour identifier la solution adaptée à votre profil.", "ملخص سريع لتحديد الحل المناسب لك.")}
              </p>
            </div>

            <div className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px] shrink-0 transform -rotate-6 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <Image
                src="/3D SEP logo.webp"
                alt="3D SEP Logo"
                fill
                className="object-contain contrast-125 brightness-110"
                sizes="(max-width: 768px) 180px, 220px"
              />
            </div>
          </div>

          {/* Table Container - Horizontally scrollable on mobile */}
          <div className="w-full overflow-x-auto hide-scrollbar">
            <div className="min-w-[900px]">

              {/* Table Header Row */}
              <div className="grid grid-cols-5 bg-primary-blue border border-white/[0.07]">
                <div className="col-span-1 p-6 text-left border-r border-white/[0.07]">
                  <span className="font-syne font-semibold text-[13px] text-white uppercase tracking-wider">{t("Critère", "المعيار")}</span>
                </div>
                <div className="col-span-1 p-6 text-center border-r border-white/[0.07]">
                  <span className="font-syne font-semibold text-[13px] text-white uppercase tracking-wider">{t("Installation PV", "طاقة شمسية")}</span>
                </div>
                <div className="col-span-1 p-6 text-center border-r border-white/[0.07]">
                  <span className="font-syne font-semibold text-[13px] text-white uppercase tracking-wider">{t("Pompage Solaire", "ضخ شمسي")}</span>
                </div>
                <div className="col-span-1 p-6 text-center border-r border-white/[0.07]">
                  <span className="font-syne font-semibold text-[13px] text-white uppercase tracking-wider">{t("Chauffe-eau", "سخان ماء")}</span>
                </div>
                <div className="col-span-1 p-6 text-center">
                  <span className="font-syne font-semibold text-[13px] text-white uppercase tracking-wider">{t("Maintenance", "صيانة")}</span>
                </div>
              </div>

              {/* Data Rows */}
              {[
                {
                  critere: t("Profil client", "ملف العميل"),
                  r1: t("Résidentiel / Industriel", "سكني / صناعي"),
                  r2: t("Agriculteur / Rural", "مزارع / قروي"),
                  r3: t("Hôtel / Villa", "فندق / فيلا"),
                  r4: t("Tout client SEP", "كل عميل لـ SEP")
                },
                {
                  critere: t("Économie annuelle", "التوفير السنوي"),
                  r1: t("60–80% facture élec", "60-80٪ فاتورة الكهرباء"),
                  r2: t("Zéro coût pompage", "تكلفة ضخ صفرية"),
                  r3: t("25–35% facture", "25-35٪ من الفاتورة"),
                  r4: t("+5% performance", "+5٪ أداء")
                },
                {
                  critere: t("Délai installation", "وقت التركيب"),
                  r1: t("3–7 jours", "3-7 أيام"),
                  r2: t("2–5 jours", "2-5 أيام"),
                  r3: t("1–2 jours", "1-2 أيام"),
                  r4: t("Contrat annuel", "عقد سنوي")
                },
                {
                  critere: t("Garantie", "ضمان"),
                  r1: t("25 ans panneaux", "25 سنة لوحات"),
                  r2: t("5 ans équipements", "5 سنوات معدات"),
                  r3: t("5 ans capteurs", "5 سنوات سخانات"),
                  r4: t("Incluse", "متضمن")
                },
                {
                  critere: t("ROI moyen", "متوسط العائد"),
                  r1: t("4–6 ans", "4-6 سنوات"),
                  r2: t("2–3 ans", "2-3 سنوات"),
                  r3: t("3–4 ans", "3-4 سنوات"),
                  r4: t("Immédiat", "فوري")
                },
              ].map((row, index) => (
                <div
                  key={index}
                  className={`table-row-animate flex grid grid-cols-5 border-b border-x border-white/[0.07] ${index % 2 === 0 ? 'bg-white/[0.02]' : 'bg-off-dark'}`}
                >
                  <div className="col-span-1 p-6 flex items-center justify-start border-r border-white/[0.07]">
                    <span className="font-syne font-semibold text-[14px] text-white">{row.critere}</span>
                  </div>
                  <div className="col-span-1 p-6 flex items-center justify-center text-center border-r border-white/[0.07]">
                    <span className="font-sans font-light text-[14px] text-white/70">{row.r1}</span>
                  </div>
                  <div className="col-span-1 p-6 flex items-center justify-center text-center border-r border-white/[0.07]">
                    <span className="font-sans font-light text-[14px] text-white/70">{row.r2}</span>
                  </div>
                  <div className="col-span-1 p-6 flex items-center justify-center text-center border-r border-white/[0.07]">
                    <span className="font-sans font-light text-[14px] text-white/70">{row.r3}</span>
                  </div>
                  <div className="col-span-1 p-6 flex items-center justify-center text-center">
                    <span className="font-sans font-light text-[14px] text-white/70">{row.r4}</span>
                  </div>
                </div>
              ))}

              {/* Action Row */}
              <div className="grid grid-cols-5 border-b border-x border-white/[0.07] bg-off-dark">
                <div className="col-span-1 p-4 border-r border-white/[0.07]" />
                <div className="col-span-1 p-5 flex items-center justify-center text-center border-r border-white/[0.07]">
                  <Link href="/contact" className="font-sans font-bold text-[13px] uppercase tracking-wider text-brand-gold hover:text-white transition-colors">{t("Devis →", "سعر ←")}</Link>
                </div>
                <div className="col-span-1 p-5 flex items-center justify-center text-center border-r border-white/[0.07]">
                  <Link href="/contact" className="font-sans font-bold text-[13px] uppercase tracking-wider text-brand-gold hover:text-white transition-colors">{t("Devis →", "سعر ←")}</Link>
                </div>
                <div className="col-span-1 p-5 flex items-center justify-center text-center border-r border-white/[0.07]">
                  <Link href="/contact" className="font-sans font-bold text-[13px] uppercase tracking-wider text-brand-gold hover:text-white transition-colors">{t("Devis →", "سعر ←")}</Link>
                </div>
                <div className="col-span-1 p-5 flex items-center justify-center text-center">
                  <Link href="/contact" className="font-sans font-bold text-[13px] uppercase tracking-wider text-brand-gold hover:text-white transition-colors">{t("Devis →", "سعر ←")}</Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — CTA BANNER */}
      <section className="cta-section relative w-full py-32 lg:py-48 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/powerline.webp"
            alt="Aerial view"
            fill
            className="object-cover object-center"
            sizes="100vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[rgb(var(--rgb-dark-bg)/0.85)] mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/50 to-transparent" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center text-center">
          <h2 className="font-syne font-extrabold text-[30px] sm:text-4xl md:text-[64px] text-white tracking-[-0.02em] leading-tight mb-8">
            {t("Votre Projet Mérite le Meilleur.", "مشروعكم يستحق الأفضل.")}
          </h2>

          <p className="font-sans text-[16px] font-light text-white/70 tracking-wide mb-12">
            {t("Audit gratuit · Devis sous 24h · Équipe certifiée · Suivi à vie", "تدقيق مجاني · عرض أسعار في 24 ساعة · فريق معتمد · متابعة مدى الحياة")}
          </p>

          <Link
            href="/contact"
            className="relative bg-brand-orange hover:bg-brand-heat hover:shadow-[0_0_20px_rgba(255,77,0,0.5)] text-dark-bg transition-all px-12 py-5 text-sm uppercase tracking-widest font-bold font-sans rounded-none"
          >
            {t("Lancer Mon Projet", "إطلاق مشروعي")}
          </Link>
        </div>
      </section>

    </article>
  );
}
