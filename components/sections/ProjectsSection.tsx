"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen, ExternalLink, Github, X, Eye, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Project } from "@/app/page";
import { useState } from "react";

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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setShowScrollIndicator(true);
    
    // Hide scroll indicator after 3 seconds
    setTimeout(() => {
      setShowScrollIndicator(false);
    }, 3000);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setShowScrollIndicator(false);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.scrollTop > 10) {
      setShowScrollIndicator(false);
    }
  };

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
                  <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300 group hover:scale-105 h-full cursor-pointer">
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
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button
                          onClick={() => openModal(project)}
                          className="bg-cyan-500/80 hover:bg-cyan-600/80 text-white backdrop-blur-sm"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
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
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-5 h-5 text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors" />
                            </a>
                          )}
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
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
                      <p className="text-gray-300 mb-4 text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-gray-800 text-gray-300 text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge
                            variant="secondary"
                            className="bg-gray-800 text-gray-300 text-xs"
                          >
                            +{project.technologies.length - 3} more
                          </Badge>
                        )}
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

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={closeModal}
            >
                              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="bg-gray-900/95 border border-gray-800 rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto backdrop-blur-md relative"
                style={{
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none',
                }}
                onScroll={handleScroll}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Scroll Indicator */}
                <AnimatePresence>
                  {showScrollIndicator && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="absolute bottom-4 right-4 z-10 pointer-events-none flex flex-col items-center"
                    >
                      <div className="bg-cyan-500/20 border border-cyan-500/30 rounded-full p-2 backdrop-blur-sm">
                        <motion.div
                          animate={{ y: [0, 8, 0] }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 1.5, 
                            ease: "easeInOut" 
                          }}
                        >
                          <ChevronDown className="w-5 h-5 text-cyan-400" />
                        </motion.div>
                      </div>
                      <div className="text-xs text-cyan-400 text-center mt-1 bg-black/50 px-2 py-1 rounded backdrop-blur-sm whitespace-nowrap">
                        Scroll for more
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Modal Header */}
                <div className="sticky top-0 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 p-6 flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">
                    {selectedProject.title}
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closeModal}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  {/* Project Image */}
                  <div className="mb-6">
                    <img
                      src={
                        selectedProject.image_url ||
                        "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800"
                      }
                      alt={selectedProject.title}
                      className="w-full h-64 md:h-80 object-cover rounded-lg"
                    />
                  </div>

                  {/* Project Links */}
                  <div className="flex space-x-4 mb-6">
                    {selectedProject.live_url && (
                      <Button
                        asChild
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                      >
                        <a
                          href={selectedProject.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Live
                        </a>
                      </Button>
                    )}
                    {selectedProject.github_url && (
                      <Button
                        asChild
                        variant="outline"
                        className="border-gray-700 hover:bg-gray-400 hover:text-black text-white"
                      >
                        <a
                          href={selectedProject.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          View Code
                        </a>
                      </Button>
                    )}
                  </div>

                  {/* Project Description */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Description
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}