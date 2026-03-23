"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(false);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user has seen the loader in this session
    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");
    
    if (!hasSeenLoader) {
      setIsVisible(true);
      
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("hasSeenLoader", "true");
          // Smooth exit
          gsap.to(preloaderRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => setIsVisible(false)
          });
        }
      });

      // Entrance
      tl.fromTo(contentRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power4.out" }
      );

      // Progress bar (2.5 seconds total)
      tl.to(progressBarRef.current, {
        width: "100%",
        duration: 2.5,
        ease: "power1.inOut"
      }, 0);

      // Subtle scale pulse
      tl.to(".preloader-logo", {
        scale: 1.08,
        duration: 1.25,
        repeat: 1,
        yoyo: true,
        ease: "sine.inOut"
      }, 0);

    } else {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0C1A27]"
    >
      <div ref={contentRef} className="flex flex-col items-center max-w-[280px] w-full px-8 relative z-10">
        {/* Logo Section */}
        <div className="preloader-logo relative mb-14">
          <img 
            src="/LOGO2.webp" 
            alt="SEP Logo" 
            className="w-28 h-28 md:w-36 md:h-36 object-contain relative z-10"
          />
          {/* Subtle glow behind logo */}
          <div className="absolute inset-0 bg-brand-orange/15 blur-3xl -z-10 rounded-full scale-150" />
        </div>

        {/* Brand Text Section */}
        <div className="text-center mb-10">
          <h2 className="font-syne font-black text-white text-[22px] tracking-tight mb-2">
            SUD EXTRA POWER
          </h2>
          <p className="font-sans text-sky-blue/80 text-[11px] uppercase tracking-[0.4em] font-semibold">
            L'excellence énergétique
          </p>
        </div>

        {/* Custom Progress Bar */}
        <div className="w-full h-[1px] bg-white/10 relative overflow-hidden rounded-full">
          <div 
            ref={progressBarRef}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-orange to-brand-glow w-0"
          />
        </div>
        
        {/* Loading Indicator Text */}
        <span className="mt-5 font-sans text-white/40 text-[10px] uppercase tracking-[0.25em] italic loader-fade-text">
          Chargement de l'expérience...
        </span>
      </div>

      {/* Background Atmosphere Lights */}
      <div className="absolute inset-0 opacity-25 pointer-events-none mix-blend-screen">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-blue/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-orange/15 blur-[150px] rounded-full" />
      </div>

      <style jsx>{`
        .loader-fade-text {
          animation: pulseFade 2s infinite ease-in-out;
        }
        @keyframes pulseFade {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
