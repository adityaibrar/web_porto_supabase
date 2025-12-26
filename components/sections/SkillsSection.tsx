"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Skill } from "@/types/types";

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const [isFirstRowPaused, setIsFirstRowPaused] = useState(false);
  const [isSecondRowPaused, setIsSecondRowPaused] = useState(false);

  const firstRowSkills = skills.slice(0, Math.ceil(skills.length / 2));
  const secondRowSkills = skills.slice(Math.ceil(skills.length / 2));

  return (
    <section id="skills" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            Skills & Technologies
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
        </div>

        {skills.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-full mx-auto overflow-hidden"
          >
            {/* First Row - Moving Left Continuously */}
            <div className="relative mb-8 overflow-hidden">
              <div
                className="flex gap-4 whitespace-nowrap"
                style={{
                  width: "max-content",
                  animation: `scrollLeft 20s linear infinite`,
                  animationPlayState: isFirstRowPaused ? "paused" : "running",
                }}
              >
                {/* Duplicate skills for seamless loop */}
                {[...firstRowSkills, ...firstRowSkills].map((skill, index) => (
                  <Badge
                    key={`${skill.id}-first-${index}`}
                    variant="secondary"
                    className="px-4 py-3 text-sm font-medium bg-gray-900/50 border-gray-800 backdrop-blur-sm transition-all duration-300 flex items-center gap-3 cursor-pointer hover:shadow-lg flex-shrink-0 hover:border-cyan-500/30"
                    onMouseEnter={() => setIsFirstRowPaused(true)}
                    onMouseLeave={() => setIsFirstRowPaused(false)}
                  >
                    <div className="w-6 h-6 rounded-md bg-gray-800 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {skill.icon_url ? (
                        <Image
                          width={20}
                          height={20}
                          src={skill.icon_url}
                          alt={skill.name}
                          className="w-5 h-5 object-contain"
                        />
                      ) : (
                        <Code className="w-4 h-4 text-cyan-400" />
                      )}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-white">
                        {skill.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {skill.category}
                      </span>
                    </div>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Second Row - Moving Right Continuously */}
            <div className="relative overflow-hidden">
              <div
                className="flex gap-4 whitespace-nowrap"
                style={{
                  width: "max-content",
                  animation: `scrollRight 25s linear infinite`,
                  animationPlayState: isSecondRowPaused ? "paused" : "running",
                }}
              >
                {/* Duplicate skills for seamless loop */}
                {[...secondRowSkills, ...secondRowSkills].map(
                  (skill, index) => (
                    <Badge
                      key={`${skill.id}-second-${index}`}
                      variant="secondary"
                      className="px-4 py-3 text-sm font-medium bg-gray-900/50 border-gray-800 backdrop-blur-sm transition-all duration-300 flex items-center gap-3 cursor-pointer hover:shadow-lg flex-shrink-0 hover:border-cyan-500/30"
                      onMouseEnter={() => setIsSecondRowPaused(true)}
                      onMouseLeave={() => setIsSecondRowPaused(false)}
                    >
                      <div className="w-6 h-6 rounded-md bg-gray-800 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {skill.icon_url ? (
                          <Image
                            width={20}
                            height={20}
                            src={skill.icon_url}
                            alt={skill.name}
                            className="w-5 h-5 object-contain"
                          />
                        ) : (
                          <Code className="w-4 h-4 text-cyan-400" />
                        )}
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-medium text-white">
                          {skill.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          {skill.category}
                        </span>
                      </div>
                    </Badge>
                  )
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <p className="text-gray-300">
                  Skills will be displayed here once configured in the admin
                  panel.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
}
