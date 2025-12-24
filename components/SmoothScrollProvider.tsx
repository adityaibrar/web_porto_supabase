"use client";

import { useEffect, useRef, createContext, useContext } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Context for Lenis instance
const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with optimized settings
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Stop/start Lenis for modal
    const handleModalOpen = () => lenis.stop();
    const handleModalClose = () => lenis.start();

    window.addEventListener("modal-open", handleModalOpen);
    window.addEventListener("modal-close", handleModalClose);

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP ticker for smooth animation
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Handle anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute("href");
        if (href && href !== "#") {
          const element = document.querySelector(href);
          if (element) {
            lenis.scrollTo(element as HTMLElement, {
              offset: -80,
              duration: 1.2,
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Setup scroll animations - optimized
    let scrollTriggers: ScrollTrigger[] = [];
    const setupScrollAnimations = () => {
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const elements = section.querySelectorAll(
          ".animate-on-scroll, .fade-in-up, .fade-in-left, .fade-in-right"
        );
        elements.forEach((element) => {
          const animation = gsap.fromTo(
            element,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              paused: true,
            }
          );

          const trigger = ScrollTrigger.create({
            trigger: element,
            start: "top 85%",
            end: "bottom 15%",
            onEnter: () => animation.play(),
            onLeaveBack: () => animation.reverse(),
          });

          scrollTriggers.push(trigger);
        });
      });
    };

    // Delay to ensure DOM is ready
    const timer = setTimeout(setupScrollAnimations, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("modal-open", handleModalOpen);
      window.removeEventListener("modal-close", handleModalClose);
      lenis.destroy();
      scrollTriggers.forEach((trigger) => trigger.kill());
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
