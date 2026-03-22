"use client";

import { useEffect, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./ProcessSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    num: "01",
    title: "Consultation",
    desc: "Analyse approfondie de votre consommation et de votre potentiel solaire.",
    img: "/images/modern_solar_home.webp",
  },
  {
    num: "02",
    title: "Conception",
    desc: "Étude technique personnalisée et plan d'implantation détaillé.",
    img: "/images/solar_field.webp",
  },
  {
    num: "03",
    title: "Mise en œuvre",
    desc: "Installation rigoureuse par nos techniciens experts certifiés.",
    img: "/images/house.webp",
  },
  {
    num: "04",
    title: "Monitoring",
    desc: "Monitoring en temps réel et suivi de performance permanent.",
    img: "/images/maintenance2.webp",
  },
];

export default function ProcessSection() {
  const { t, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Timeline Progress Animation
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          },
        });
      }

      // Items Animation
      const items = gsap.utils.toArray<HTMLElement>(`.${styles.item}`);
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [lang]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <span className={styles.label}>{t("// Méthodologie", "// المنهجية")}</span>
        <h2 className={styles.title}>
          <span style={{ color: '#FF7B00' }}>Process</span> <span className={styles.outlineText}>de Travail</span>
        </h2>
      </div>

      <div className={styles.timelineContainer}>
        {/* Vertical Timeline */}
        <div className={styles.timeline}>
          <div ref={progressRef} className={styles.progress} />
        </div>

        <div ref={containerRef} className={styles.itemsStack}>
          {processSteps.map((step, index) => (
            <div
              key={step.num}
              className={`${styles.item} ${index % 2 !== 0 ? styles.rowReverse : ""}`}
            >
              {/* Timeline Dot */}
              <div className={styles.dot} />

              {/* Image Column */}
              <div className={styles.imageCol}>
                <div className={styles.imageBox}>
                  <Image
                    src={step.img}
                    alt={step.title}
                    fill
                    className={styles.image}
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
              </div>

              {/* Text Column */}
              <div className={styles.textCol}>
                <div className={styles.stepNum}>{step.num}</div>
                <h3 className={styles.stepTitle}>
                  {t(step.title, 
                    step.title === "Consultation" ? "استشارة" :
                    step.title === "Conception" ? "تصميم" :
                    step.title === "Mise en œuvre" ? "تنفيذ" : "مراقبة"
                  )}
                </h3>
                <p className={styles.stepDesc}>
                  {t(step.desc,
                    step.title === "Consultation" ? "تحليل عميق لاستهلاكك وإمكانات الطاقة الشمسية الخاصة بك." :
                    step.title === "Conception" ? "دراسة فنية شخصية وخطة تنفيذ مفصلة." :
                    step.title === "Mise en œuvre" ? "تركيب دقيق من قبل الفنيين الخبراء المعتمدين لدينا." : "مراقبة في الوقت الحقيقي وتتبع الأداء الدائم."
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
