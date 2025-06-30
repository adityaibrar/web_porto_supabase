"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Education } from "@/app/page";

interface EducationSectionProps {
  education: Education[];
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

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="education" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            Education
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
        </div>

        <div className="space-y-8">
          {education.length > 0 ? (
            education.map((edu, index) => {
              const colorScheme = colorSchemes[index % colorSchemes.length];
              return (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 ${colorScheme.bg} rounded-lg`}>
                          <GraduationCap
                            className={`w-8 h-8 ${colorScheme.text}`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-white mb-2">
                                {edu.degree}
                              </h3>
                              <p className={`font-medium ${colorScheme.text}`}>
                                {edu.institution}
                              </p>
                              <p className="text-gray-300">
                                {edu.field_of_study}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge
                                className={`${colorScheme.bg} ${colorScheme.text} ${colorScheme.border} mb-2`}
                              >
                                {new Date(edu.start_date).getFullYear()} -{" "}
                                {edu.end_date
                                  ? new Date(edu.end_date).getFullYear()
                                  : "Present"}
                              </Badge>
                              {edu.gpa && (
                                <div>
                                  <Badge
                                    variant="secondary"
                                    className="bg-gray-800 text-gray-300"
                                  >
                                    GPA: {edu.gpa}
                                  </Badge>
                                </div>
                              )}
                            </div>
                          </div>
                          {edu.description && (
                            <p className="text-gray-300">{edu.description}</p>
                          )}
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
                    Education information will be displayed here once configured
                    in the admin panel.
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
