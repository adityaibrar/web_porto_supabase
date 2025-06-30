"use client";

import { motion } from "framer-motion";
import { FolderOpen, ExternalLink, Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Project } from "@/app/page";

interface ProjectsSectionProps {
  projects: Project[];
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

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            Featured Projects
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? (
            projects.slice(0, 6).map((project, index) => {
              const colorScheme = colorSchemes[index % colorSchemes.length];
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300 group hover:scale-105 h-full">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={
                          project.image_url ||
                          "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=500"
                        }
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <FolderOpen className={`w-8 h-8 ${colorScheme.text}`} />
                        <div className="flex space-x-2">
                          {project.live_url && (
                            <a
                              href={project.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-5 h-5 text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors" />
                            </a>
                          )}
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="w-5 h-5 text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors" />
                            </a>
                          )}
                        </div>
                      </div>
                      <h3
                        className={`text-xl font-bold text-white mb-3 group-hover:${colorScheme.text} transition-colors`}
                      >
                        {project.title}
                      </h3>
                      <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-gray-800 text-gray-300 text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
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
              className="col-span-full"
            >
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <p className="text-gray-300">
                    Projects will be displayed here once configured in the admin
                    panel.
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
