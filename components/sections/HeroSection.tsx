"use client";

import { motion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Profile } from "@/types/types";
// import { type Profile } from "@/app/page";

interface HeroSectionProps {
  profile: Profile | null;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.1),transparent_50%)]"></div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-8 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse"></div>
            <Image
              width={128}
              height={128}
              src={profile?.avatar_url || ""}
              alt={profile?.name || "Profile"}
              className="w-full h-full rounded-full object-cover relative z-10 border-4 border-background"
              loading="eager"
            />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 pb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            {profile?.name || "Flutter Developer"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            {profile?.title || "Mobile App Developer | Cross-Platform Expert"}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center space-x-6 mb-12"
          >
            {profile?.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800/50 rounded-full hover:bg-cyan-500/20 transition-all duration-300 hover:scale-110"
              >
                <Github className="w-6 h-6" />
              </a>
            )}
            {profile?.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800/50 rounded-full hover:bg-cyan-500/20 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            )}
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="p-3 bg-gray-800/50 rounded-full hover:bg-cyan-500/20 transition-all duration-300 hover:scale-110"
              >
                <Mail className="w-6 h-6" />
              </a>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            onClick={() => scrollToAbout()}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
          >
            Explore My Work
          </Button>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-cyan-400" />
        </div>
      </div>
    </section>
  );
}
