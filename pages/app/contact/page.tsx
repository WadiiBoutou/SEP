"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { t, lang } = useLanguage();

  const [budget, setBudget] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const budgetOptions = [
    { id: "<20k", fr: "< 20 000 MAD", ar: "أقل من 20 000 درهم" },
    { id: "20-50k", fr: "20–50k MAD", ar: "20–50 ألف درهم" },
    { id: "50-100k", fr: "50–100k MAD", ar: "50–100 ألف درهم" },
    { id: ">100k", fr: "+100k MAD", ar: "أكثر من 100 ألف درهم" },
  ];

  /* Animations Setup */
  useEffect(() => {
    let ctx = gsap.context(() => {
      // SECTION 1 — Hero
      gsap.from(".hero-line-anim", {
        y: 60,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.2,
      });

      // SECTION 2 — Info Columns
      gsap.from(".info-item", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-main-section",
          start: "top 80%",
        },
      });

      // SECTION 2 — Form Fields
      gsap.from(".form-field", {
        y: 10,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-form-wrapper",
          start: "top 85%",
        },
      });

      // SECTION 3 — Map & Strip
      gsap.from(".map-section", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".map-section",
          start: "top 90%",
        },
      });

    }, containerRef);
    return () => ctx.revert();
  }, [lang]);

  // Handle Success State Animations
  useEffect(() => {
    if (success) {
      // SVG Draw Animation
      const circle = document.querySelector('.success-circle') as SVGPathElement;
      const check = document.querySelector('.success-check') as SVGPathElement;
      
      if (circle && check) {
        const circleLen = circle.getTotalLength();
        const checkLen = check.getTotalLength();

        gsap.fromTo(circle, 
          { strokeDasharray: circleLen, strokeDashoffset: circleLen },
          { strokeDashoffset: 0, duration: 0.8, ease: "power2.out" }
        );

        gsap.fromTo(check, 
          { strokeDasharray: checkLen, strokeDashoffset: checkLen },
          { strokeDashoffset: 0, duration: 0.5, delay: 0.5, ease: "power2.out" }
        );
      }

      gsap.fromTo(".success-content",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: "power3.out" }
      );
    }
  }, [success]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network request
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const resetForm = () => {
    setSuccess(false);
    setBudget("");
  };

  const inputClass = "form-field w-full bg-white/[0.03] border-b border-white/[0.12] border-x-0 border-t-0 p-4 font-sans font-normal text-[15px] text-white placeholder-white/30 focus:border-brand-gold focus:outline-none focus:ring-0 rounded-none transition-colors duration-200 appearance-none";

  return (
    <article ref={containerRef} className="bg-dark-bg min-h-screen pt-32 lg:pt-0 overflow-hidden font-sans">
      
      {/* SECTION 1 — PAGE HERO */}
      <section className="relative h-[50vh] flex flex-col justify-center items-center px-6 pt-20">
        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto">
          <div className="overflow-hidden mb-6">
            <span className="hero-line-anim block text-brand-gold text-[11px] font-medium uppercase tracking-[0.2em]">
              {t("04 — CONTACT", "04 — اتصل بنا")}
            </span>
          </div>

          <h1 className="font-syne font-extrabold text-[48px] md:text-[64px] lg:text-[clamp(64px,7vw,100px)] leading-[0.88] tracking-[-0.04em] text-white flex flex-col items-center mb-8">
            <div className="overflow-hidden"><span className="hero-line-anim block">{t("Parlons de", "لنتحدث عن")}</span></div>
            <div className="overflow-hidden"><span className="hero-line-anim block text-brand-gold">{t("Votre Projet.", "مشروعك.")}</span></div>
          </h1>

          <div className="overflow-hidden">
            <p className="hero-line-anim text-[15px] font-light text-white/55 max-w-[460px] leading-[1.9] mx-auto">
              {t(
                "Notre équipe répond sous 24h. Pas de jargon, pas de sur-promesse — juste une étude honnête de ce que le solaire peut faire pour vous.",
                "فريقنا يجيب خلال 24 ساعة. بلا مصطلحات معقدة، بلا وعود مبالغ فيها — مجرد دراسة صادقة لما يمكن أن تقدمه الطاقة الشمسية لك."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Thin horizontal separator */}
      <div className="w-full h-px bg-white/[0.06]" />

      {/* SECTION 2 — MAIN CONTACT BLOCK */}
      <section className="contact-main-section py-20 lg:py-32 px-6 lg:px-12 container mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 w-full max-w-7xl mx-auto relative items-start">
          
          {/* LEFT COLUMN — Contact Info (Sticky) */}
          <div className="w-full lg:w-[40%] sticky top-[120px]">
            <h2 className="info-item font-syne font-bold text-[22px] text-white">{t("Retrouvez-nous.", "تجدنا هنا.")}</h2>
            <div className="info-item w-[40px] h-[1px] bg-brand-gold mt-4 mb-8" />

            <div className="flex flex-col border-t border-white/[0.06]">
              {/* Item 1 */}
              <div className="info-item flex items-start gap-5 py-5 border-b border-white/[0.06]">
                <span className="text-brand-gold text-2xl leading-none mt-1">📍</span>
                <div className="flex flex-col">
                  <span className="font-sans text-[11px] font-light uppercase tracking-[0.2em] text-white/45 mb-1">{t("Adresse", "العنوان")}</span>
                  <span className="font-sans text-[14px] font-medium text-white leading-relaxed">
                    Route de Tiznit, Inchaden, Chtouka Ait Baha — Agadir, Maroc
                  </span>
                </div>
              </div>
              
              {/* Item 2 */}
              <div className="info-item flex items-start gap-5 py-5 border-b border-white/[0.06]">
                <span className="text-brand-gold text-2xl leading-none mt-1">📞</span>
                <div className="flex flex-col">
                  <span className="font-sans text-[11px] font-light uppercase tracking-[0.2em] text-white/45 mb-1">{t("Téléphone", "الهاتف")}</span>
                  <span className="font-sans text-[14px] font-medium text-white" dir="ltr">+212 6 12 61 93 29</span>
                </div>
              </div>

              {/* Item 3 */}
              <div className="info-item flex items-start gap-5 py-5 border-b border-white/[0.06]">
                <span className="text-brand-gold text-2xl leading-none mt-1">✉️</span>
                <div className="flex flex-col">
                  <span className="font-sans text-[11px] font-light uppercase tracking-[0.2em] text-white/45 mb-1">{t("Email", "البريد الإلكتروني")}</span>
                  <span className="font-sans text-[14px] font-medium text-white">contact@sudextrapower.ma</span>
                </div>
              </div>

              {/* Item 4 */}
              <div className="info-item flex items-start gap-5 py-5 border-b border-white/[0.06]">
                <span className="text-brand-gold text-2xl leading-none mt-1">🕒</span>
                <div className="flex flex-col">
                  <span className="font-sans text-[11px] font-light uppercase tracking-[0.2em] text-white/45 mb-1">{t("Horaires", "ساعات العمل")}</span>
                  <span className="font-sans text-[14px] font-medium text-white">
                    {t("Lundi – Samedi, 8h00 – 18h00", "الإثنين – السبت، 8:00 صباحاً – 6:00 مساءً")}
                  </span>
                </div>
              </div>
            </div>

            {/* WhatsApp Block */}
            <a 
              href="https://wa.me/212612619329" 
              target="_blank" 
              rel="noreferrer"
              className="info-item block bg-[#0F2035] border border-[#25D366]/25 rounded-none p-5 mt-10 hover:border-[#25D366]/50 hover:bg-[#25D366]/[0.04] transition-colors duration-300 group"
            >
              <div className="font-sans font-light text-[13px] text-white/55 mb-2">{t("Préférez-vous WhatsApp ?", "هل تفضل واتساب؟")}</div>
              <div className="flex items-center gap-3 mb-1">
                <svg viewBox="0 0 24 24" width="20" height="20" className="text-[#25D366]">
                  <path fill="currentColor" d="M12.031 0C5.385 0 0 5.383 0 12.028c0 2.126.554 4.2 1.604 6.023L.109 23.518l5.626-1.474a12.007 12.007 0 0 0 6.296 1.765h.004C18.675 23.809 24.062 18.423 24.062 11.78 24.062 5.132 18.681 0 12.031 0zm0 21.808a9.982 9.982 0 0 1-5.088-1.391l-.364-.216-3.778.991.996-3.684-.236-.376A9.957 9.957 0 0 1 2.016 11.78c0-5.522 4.494-10.016 10.018-10.016 5.525 0 10.018 4.496 10.018 10.018 0 5.521-4.493 10.018-10.021 10.026zm5.503-7.518c-.302-.151-1.787-.881-2.064-.982-.276-.101-.478-.151-.678.151-.202.302-.78 1.054-.954 1.255-.176.202-.352.226-.653.075-.302-.15-1.275-.47-2.428-1.501-.896-.803-1.5-1.795-1.676-2.097-.176-.302-.019-.465.132-.616.136-.135.302-.352.453-.527.151-.176.202-.302.302-.502.101-.202.05-.377-.025-.528-.076-.151-.678-1.631-.929-2.234-.244-.588-.492-.508-.678-.517-.176-.008-.377-.008-.578-.008s-.527.075-.804.376c-.276.302-1.054 1.03-1.054 2.511 0 1.482 1.08 2.913 1.23 3.114.151.202 2.123 3.238 5.144 4.542.719.31 1.28.495 1.717.633.722.229 1.38.197 1.898.119.58-.088 1.787-.73 2.038-1.436.252-.705.252-1.309.176-1.436-.075-.126-.276-.202-.578-.353z" />
                </svg>
                <span className="font-sans font-semibold text-[16px] text-white" dir="ltr">+212 6 12 61 93 29</span>
              </div>
              <div className="font-sans font-light text-[12px] text-white/40">{t("Réponse typique en moins d'une heure.", "رد معتاد في أقل من ساعة.")}</div>
            </a>

            {/* Quote Block */}
            <div className="info-item mt-8 relative pl-6">
              <span className="absolute -left-2 -top-4 font-syne font-extrabold text-[64px] text-brand-gold opacity-30 leading-none">
                "
              </span>
              <p className="font-sans font-light italic text-[14px] text-white/60 leading-relaxed mb-3 relative z-10">
                {t("Chaque projet commence par une conversation. Dites-nous où vous en êtes.", "كل مشروع يبدأ بمحادثة. أخبرنا أين وصلت.")}
              </p>
              <div className="font-sans font-medium text-[12px] text-brand-gold">
                {t("— Équipe SEP", "— فريق SEP")}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Form */}
          <div className="contact-form-wrapper w-full lg:w-[60%] flex flex-col">
            
            {!success ? (
              <form onSubmit={handleSubmit} className="flex flex-col w-full relative z-10">
                <div className="w-[40px] h-[2px] bg-brand-gold mb-6" />
                <h3 className="font-syne font-bold text-[28px] text-white mb-2">
                  {t("Envoyez-nous un Message.", "أرسل لنا رسالة.")}
                </h3>
                <p className="font-sans font-light text-[14px] text-white/50 mb-10">
                  {t("Tous les champs marqués * sont requis.", "جميع الحقول المميزة بعلامة * مطلوبة.")}
                </p>

                <div className="flex flex-col md:flex-row gap-6 mb-2">
                  <input type="text" placeholder={t("Prénom *", "الاسم الأول *")} required className={`${inputClass} md:w-1/2`} />
                  <input type="text" placeholder={t("Nom *", "الاسم العائلي *")} required className={`${inputClass} md:w-1/2`} />
                </div>

                <div className="mb-2">
                  <input type="email" placeholder={t("Email *", "البريد الإلكتروني *")} required className={inputClass} />
                </div>

                <div className="mb-2">
                  <input type="tel" placeholder={t("Téléphone", "الهاتف")} className={inputClass} />
                </div>

                <div className="mb-2">
                  <input type="text" placeholder={t("Ville / Région", "المدينة / المنطقة")} className={inputClass} />
                </div>

                <div className="mb-8 relative">
                  <select 
                    required 
                    className={`${inputClass} cursor-pointer`}
                    defaultValue=""
                  >
                    <option value="" disabled className="text-dark-bg">{t("Choisir un service...", "اختر خدمة...")}</option>
                    <option value="pv" className="text-dark-bg">{t("Installation Solaire PV", "تركيب الطاقة الشمسية الكهروضوئية")}</option>
                    <option value="pompage" className="text-dark-bg">{t("Pompage Solaire", "ضخ شمسي")}</option>
                    <option value="chauffe" className="text-dark-bg">{t("Chauffe-eau Solaire", "سخان المياه الشمسي")}</option>
                    <option value="maintenance" className="text-dark-bg">{t("Maintenance & SAV", "الصيانة وخدمة ما بعد البيع")}</option>
                    <option value="autre" className="text-dark-bg">{t("Autre", "أخرى")}</option>
                  </select>
                  {/* Custom Chevron */}
                  <div className={`absolute top-1/2 -translate-y-1/2 ${lang === 'ar' ? 'left-4' : 'right-4'} pointer-events-none text-brand-gold text-[12px]`}>
                    ▼
                  </div>
                </div>

                <div className="mb-8">
                  <textarea 
                    rows={5} 
                    placeholder={t("Votre Message *", "رسالتك *")} 
                    required 
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Budget Radio Pills */}
                <div className="form-field mb-12">
                  <label className="font-sans font-light text-[14px] text-white/50 block mb-4">
                    {t("Budget approximatif", "الميزانية التقريبية")}
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {budgetOptions.map((opt) => {
                      const isSelected = budget === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setBudget(isSelected ? "" : opt.id)}
                          className={`
                            px-4 py-2 font-sans font-medium text-[12px] tracking-wide transition-all duration-200 rounded-none border
                            ${isSelected 
                              ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' 
                              : 'border-white/[0.12] bg-transparent text-white/55 hover:border-white/30 hover:text-white/80'}
                          `}
                        >
                          {t(opt.fr, opt.ar)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="form-field w-full flex items-center justify-center p-5 bg-brand-gold hover:bg-[#f0c96a] text-dark-bg font-syne font-bold text-[14px] uppercase tracking-[0.2em] rounded-none transition-colors duration-200 group disabled:opacity-70 disabled:pointer-events-none"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-dark-bg border-t-transparent animate-spin" />
                      {t("Envoi en cours...", "جاري الإرسال...")}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {t("Envoyer le Message", "إرسال الرسالة")}
                      <span className={`transform transition-transform duration-200 ${lang === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                        {lang === 'ar' ? '←' : '→'}
                      </span>
                    </div>
                  )}
                </button>
              </form>
            ) : (
              /* Success State */
              <div className="success-content flex flex-col items-center justify-center py-20 px-6 text-center border mt-8 border-white/10 bg-white/[0.02]">
                <div className="relative w-[64px] h-[64px] mb-8">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="30" stroke="#EEBC58" strokeWidth="2" strokeDasharray="189" strokeDashoffset="189" className="success-circle" />
                    <path d="M20 32 L28 40 L44 24" stroke="#EEBC58" strokeWidth="2" fill="none" className="success-check" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="38" strokeDashoffset="38" />
                  </svg>
                </div>
                <h3 className="font-syne font-extrabold text-[32px] text-white mb-4">
                  {t("Message Reçu.", "تم استلام الرسالة.")}
                </h3>
                <p className="font-sans font-light text-[15px] text-white/60 mb-8 max-w-[400px] leading-relaxed">
                  {t(
                    "Nous vous répondons dans les 24h. En attendant, n'hésitez pas à nous appeler ou écrire sur WhatsApp.",
                    "سنرد عليك خلال 24 ساعة. في غضون ذلك، لا تتردد في الاتصال بنا أو مراسلتنا على واتساب."
                  )}
                </p>
                <button 
                  onClick={resetForm}
                  className="font-sans font-medium text-[13px] text-brand-gold hover:text-white transition-colors"
                >
                  {lang === 'ar' ? 'العودة إلى النموذج →' : '← Revenir au formulaire'}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3 — MAP + OFFICE STRIP */}
      <section className="map-section w-full bg-[#0F2035]">
        
        {/* Top Strip */}
        <div className="w-full px-[5vw] py-12">
          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/[0.07]">
            
            <div className="flex flex-col py-6 md:py-0 md:pr-10 w-full md:w-1/3">
              <span className="font-sans font-light text-[11px] text-brand-gold uppercase tracking-[0.2em] mb-2">{t("Bureau Principal", "المكتب الرئيسي")}</span>
              <span className="font-sans font-medium text-[14px] text-white leading-relaxed">
                {t("Route de Tiznit, Inchaden", "طريق تيزنيت، إنشادن")}<br />
                {t("Chtouka Ait Baha, Agadir", "شتوكة آيت باها، أكادير")}
              </span>
            </div>

            <div className="flex flex-col py-6 md:py-0 md:px-10 w-full md:w-1/3">
              <span className="font-sans font-light text-[11px] text-brand-gold uppercase tracking-[0.2em] mb-2">{t("Zone de Couverture", "منطقة التغطية")}</span>
              <span className="font-sans font-medium text-[14px] text-white leading-relaxed">
                {t("Souss-Massa · Guelmim-Oued Noun", "سوس ماسة · كلميم واد نون")}<br />
                {t("Marrakech-Safi · National sur demande", "مراكش آسفي · على الصعيد الوطني عند الطلب")}
              </span>
            </div>

            <div className="flex flex-col py-6 md:py-0 md:pl-10 w-full md:w-1/3">
              <span className="font-sans font-light text-[11px] text-brand-gold uppercase tracking-[0.2em] mb-2">{t("Interventions", "التدخلات")}</span>
              <span className="font-sans font-medium text-[14px] text-white leading-relaxed">
                {t("Délai moyen 48h", "متوسط الوقت 48 ساعة")}<br />
                {t("Rayon 200km autour d'Agadir", "دائرة نصف قطرها 200 كم حول أكادير")}
              </span>
            </div>

          </div>
        </div>

        {/* Map Embed */}
        <div className="w-full h-[400px] border-t border-white/[0.05] relative pointer-events-auto">
          <iframe
            title="SEP Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108827.39!2d-9.598107!3d30.427755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3b6e9daaaaab%3A0x3f5a9c1f2e8b4d7a!2sAgadir%2C%20Morocco!5e0!3m2!1sen!2sma!4v1700000000000"
            width="100%"
            height="100%"
            style={{ 
              border: 0,
              filter: "grayscale(100%) invert(90%) contrast(85%)"
            }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

    </article>
  );
}
