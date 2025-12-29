"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Profile } from "@/types/types";
import { useEffect, useState, useMemo, memo } from "react";

interface HeroSectionProps {
  profile: Profile | null;
}

function HeroSectionComponent({ profile }: HeroSectionProps) {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  // Memoize titles array
  const titles = useMemo(
    () => profile?.title?.split("|").map((t) => t.trim()) || [],
    [profile?.title]
  );

  // Title Rotation Logic
  useEffect(() => {
    if (titles.length === 0) return;
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* --- LEFT CONTENT --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left space-y-8 relative"
          >
            {/* 2. AVAILABLE FOR HIRE BADGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm"
            >
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </div>
              <span className="text-xs font-medium text-slate-300 tracking-wide">
                AVAILABLE FOR HIRE
              </span>
            </motion.div>

            {/* 3. MAIN HEADING */}
            <div className="space-y-2 relative">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[1.1] flex items-center gap-3">
                <span className="text-slate-300">I&apos;m </span>
                {/* Blok Ungu Nama */}
                <span className="relative inline-block px-4">
                  <span className="absolute inset-0 bg-[#6d28d9] -skew-x-6 rounded-lg transform"></span>
                  <span className="relative text-white z-10">
                    {profile?.name?.split(" ")[1] || "Aditya"}
                  </span>
                </span>
              </h1>

              {/* Rotating Titles */}
              <div className="h-12 flex items-center overflow-hidden pl-1">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={currentTitleIndex}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-2xl md:text-3xl font-bold text-slate-400"
                  >
                    {titles[currentTitleIndex]}
                  </motion.h2>
                </AnimatePresence>
              </div>

              <p className="text-lg text-slate-400 max-w-lg leading-relaxed pt-4">
                who loves intuitive, clean and work with{" "}
                <span className="text-[#a78bfa] font-medium">
                  Flutter ecosystem
                </span>
                .
              </p>
            </div>

            {/* 4. CTA BUTTONS (FLOWING BORDER) */}
            <div className="flex flex-col md:flex-row gap-6 pt-6">
              <a
                href="#contact"
                className="relative inline-flex h-14 overflow-hidden rounded-[12px] p-[2px] focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-slate-50 group"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#6d28d9_50%,#000000_100%)]" />

                {/* 2. Tombol Utama (Content Overlay) */}
                <Button
                  size="lg"
                  className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[10px] bg-[#030014] px-10 text-sm font-semibold text-white backdrop-blur-3xl transition-all hover:bg-[#0f0b29]"
                >
                  Get in Touch
                </Button>
              </a>

              {/* Social icons bawah tombol */}
              <div className="flex items-center gap-4 mt-4 md:mt-0 md:ml-4">
                {profile?.github_url && (
                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                )}
                {profile?.linkedin_url && (
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                )}
                {profile?.email && (
                  <a
                    href={profile.email}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-gray-400 hover:text-pink-400 transition-colors"
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT CONTENT (IMAGE) --- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Glow Effect Belakang Gambar */}
            {/* <div className="absolute -inset-4 bg-gradient-to-tr from-violet-600/30 to-purple-600/30 rounded-[2.5rem] blur-2xl"></div> */}

            {/* Main Image Card */}
            <div className="relative w-full max-w-sm ml-auto aspect-[4/5] rounded-[2rem] overflow-hidden border border-slate-800 bg-slate-900/50">
              <Image
                src={
                  profile?.avatar_url ||
                  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop"
                }
                alt="Profile"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                className="object-cover"
                blurDataURL="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
              />

              {/* Overlay Gradient bawah untuk teks (opsional) */}
              {/* <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-60"></div> */}
            </div>

            {/* Dekorasi Floating Icon di sebelah kanan gambar */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -right-8 bottom-20 bg-[#1e1b4b] p-4 rounded-2xl border border-violet-500/30 shadow-2xl"
            >
              <Terminal className="w-8 h-8 text-violet-400" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export const HeroSection = memo(HeroSectionComponent);
HeroSection.displayName = "HeroSection";
