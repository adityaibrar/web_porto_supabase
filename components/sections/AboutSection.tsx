"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Briefcase, Globe, Trophy, Code, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Profile } from "@/types/types";
import { useEffect, useState } from "react";

interface PortfolioStats {
  total_projects: number;
  total_skills: number;
  years_experience: number;
}

interface AboutSectionProps {
  profile: Profile | null;
  stats: PortfolioStats;
}

function Counter({ from = 0, to }: { from?: number; to: number }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    const controls = animate(count, to, {
      duration: 2,
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });
    return controls.stop;
  }, [count, to]);

  return <span>{displayValue}</span>;
}

export function AboutSection({ profile, stats }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            About Me
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              {profile?.bio ||
                "Passionate Computer Engineering graduate with a specialized focus on Flutter development. I create beautiful, performant mobile applications that deliver exceptional user experiences across both iOS and Android platforms."}
            </p>
            <div className="flex flex-wrap gap-4">
              {profile?.location && (
                <motion.div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 cursor-pointer group hover:border-cyan-500/50 transition-all">
                  <MapPin className="w-5 h-5 text-cyan-400 group-hover:animate-bounce" />
                  <span className="text-gray-300 group-hover:text-cyan-300">
                    {profile.location}
                  </span>
                </motion.div>
              )}
              {profile?.phone && (
                <motion.div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 cursor-pointer group hover:border-blue-500/50 transition-all">
                  <Phone className="w-5 h-5 text-blue-400 group-hover:animate-pulse" />
                  <span className="text-gray-300 group-hover:text-blue-300">
                    {profile.phone}
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm overflow-hidden group hover:border-cyan-500/50 transition-all duration-500">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <motion.div className="p-4 rounded-lg transition-all duration-300 cursor-pointer">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    >
                      <Briefcase className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-blue-400 mb-2">
                      <Counter to={stats.years_experience} />+
                    </h3>
                    <p className="text-foreground font-medium">
                      Years Experience
                    </p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-4 rounded-lg transition-all duration-300 cursor-pointer"
                  >
                    <motion.div
                      animate={{ rotate: [0, -360] }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Globe className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-green-400 mb-2">
                      <Counter to={stats.total_projects} />
                    </h3>
                    <p className="text-foreground font-medium">
                      Projects Completed
                    </p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-4 rounded-lg transition-all duration-300 cursor-pointer"
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    >
                      <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-yellow-400 mb-2">
                      <Counter to={stats.total_skills} />
                    </h3>
                    <p className="text-foreground font-medium">
                      Technologies Mastered
                    </p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-4 rounded-lg transition-all duration-300 cursor-pointer"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    >
                      <Code className="w-12 h-12 text-accent mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-3xl font-bold mb-2 text-accent">
                      100%
                    </h3>
                    <p className="text-foreground font-medium">Clean Code</p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
