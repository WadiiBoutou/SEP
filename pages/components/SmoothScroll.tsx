"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { emitScrollProgress, registerScrollTo } from "./lenis-bus";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    
    (window as any).lenis = lenis;

    lenis.on("scroll", (e: any) => {
      ScrollTrigger.update();
      emitScrollProgress(e.scroll, e.limit);
    });

    registerScrollTo((target: number, immediate?: boolean) => {
      lenis.scrollTo(target, { immediate });
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      (window as any).lenis = undefined;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
