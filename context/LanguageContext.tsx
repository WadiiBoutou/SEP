"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "fr" | "ar";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (fr: string, ar: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("fr");

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    if (newLang === "ar") {
      document.documentElement.classList.add("font-cairo");
      document.documentElement.classList.remove("font-sans");
    } else {
      document.documentElement.classList.add("font-sans");
      document.documentElement.classList.remove("font-cairo");
    }
  };

  useEffect(() => {
    setLang("fr");
  }, []);

  const t = (fr: string, ar: string) => (lang === "fr" ? fr : ar);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
