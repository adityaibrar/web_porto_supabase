"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  MousePointer2,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Profile } from "@/types/types";
import { useEffect, useRef, useState } from "react";

interface HeroSectionProps {
  profile: Profile | null;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  // Data Titles persis egagofur.com
  const titles = profile?.title?.split("|").map((t) => t.trim()) || [];

  // Title Rotation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [titles.length]);

  // Canvas Particles Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${particle.opacity})`;
        ctx.fill();

        particles.forEach((particle2, j) => {
          if (i === j) return;
          const dx = particle.x - particle2.x;
          const dy = particle.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${
              0.1 * (1 - distance / 150)
            })`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-950"
    >
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom right, #020617, #1e1b4b, #0f172a)",
        }}
      />

      {/* Grid & Overlay Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

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
                className="object-cover"
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
