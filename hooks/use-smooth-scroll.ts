"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
}

export function useSmoothScroll() {
    useEffect(() => {
        // Smooth scroll for anchor links
        const links = document.querySelectorAll('a[href^="#"]');

        const handleClick = (e: Event) => {
            e.preventDefault();
            const target = (e.currentTarget as HTMLAnchorElement).getAttribute("href");

            if (target && target !== "#") {
                const element = document.querySelector(target);
                if (element) {
                    gsap.to(window, {
                        duration: 1.2,
                        scrollTo: {
                            y: element,
                            offsetY: 80, // offset untuk navbar
                        },
                        ease: "power3.inOut",
                    });
                }
            }
        };

        links.forEach((link) => {
            link.addEventListener("click", handleClick);
        });

        return () => {
            links.forEach((link) => {
                link.removeEventListener("click", handleClick);
            });
        };
    }, []);
}

export function useScrollAnimations() {
    useEffect(() => {
        // Animate sections on scroll
        const sections = document.querySelectorAll("section");

        sections.forEach((section) => {
            const elements = section.querySelectorAll(
                ".animate-on-scroll, .fade-in-up, .fade-in-left, .fade-in-right"
            );

            elements.forEach((element) => {
                gsap.fromTo(
                    element,
                    {
                        opacity: 0,
                        y: 50,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 85%",
                            end: "bottom 15%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);
}
