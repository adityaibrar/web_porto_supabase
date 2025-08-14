"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Experience } from "@/types/types";

interface ExperienceSectionProps {
  experience: Experience[];
}

const colorSchemes = [
  { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/30" },
  { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
  {
    bg: "bg-purple-500/20",
    text: "text-purple-400",
    border: "border-purple-500/30",
  },
  {
    bg: "bg-green-500/20",
    text: "text-green-400",
    border: "border-green-500/30",
  },
  { bg: "bg-pink-500/20", text: "text-pink-400", border: "border-pink-500/30" },
  {
    bg: "bg-orange-500/20",
    text: "text-orange-400",
    border: "border-orange-500/30",
  },
  {
    bg: "bg-indigo-500/20",
    text: "text-indigo-400",
    border: "border-indigo-500/30",
  },
  { bg: "bg-teal-500/20", text: "text-teal-400", border: "border-teal-500/30" },
];

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-20 px-6 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            Experience
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
        </div>

        <div className="space-y-8">
          {experience.length > 0 ? (
            experience.map((exp, index) => {
              const colorScheme = colorSchemes[index % colorSchemes.length];
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 ${colorScheme.bg} rounded-lg `}>
                          <Briefcase
                            className={`w-8 h-8 ${colorScheme.text}`}
                          />
                        </div>
                        <div className="flex-1 flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-2">
                              {exp.position}
                            </h3>
                            <p className={`font-medium ${colorScheme.text}`}>
                              {exp.company}
                            </p>
                          </div>
                          <Badge
                            className={`${colorScheme.bg} ${colorScheme.text} ${colorScheme.border} whitespace-nowrap self-start md:self-auto hover:bg-inherit hover:text-inherit`}
                          >
                            {new Date(exp.start_date).getFullYear()} -{" "}
                            {exp.end_date
                              ? new Date(exp.end_date).getFullYear()
                              : "Present"}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start">
                        <div className="flex-1">
                          <p className="text-gray-300 mb-4 text-sm md:text-base">
                            {exp.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="bg-gray-800 text-gray-300 text-xs md:text-sm"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <p className="text-gray-300">
                    Experience data will be displayed here once configured in
                    the admin panel.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
