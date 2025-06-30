"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { type Profile } from "@/app/page";

interface NavigationBarProps {
  profile: Profile | null;
  activeSection: string;
  onScrollToSection: (sectionId: string) => void;
}

export function NavigationBar({
  profile,
  activeSection,
  onScrollToSection,
}: NavigationBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "About", id: "about" },
    { name: "Experience", id: "experience" },
    { name: "Projects", id: "projects" },
    { name: "Skills", id: "skills" },
    { name: "Education", id: "education" },
    { name: "Certificates", id: "certificates" },
    { name: "Contact", id: "contact" },
  ];

  const handleNavClick = (sectionId: string) => {
    // Close mobile menu first
    setIsMobileMenuOpen(false);

    // Add small delay to ensure menu closes before scrolling
    setTimeout(() => {
      onScrollToSection(sectionId);
    }, 100);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            {profile?.name || "Flutter Dev"}
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onScrollToSection(item.id)}
                className={`text-sm font-medium transition-colors hover:text-cyan-400 relative ${
                  activeSection === item.id ? "text-cyan-400" : "text-gray-300"
                }`}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.2 }}
                className="pt-4 pb-2 space-y-2 border-t border-gray-800 mt-4"
              >
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeSection === item.id
                        ? "text-cyan-400 bg-cyan-500/10 border-l-4 border-cyan-400"
                        : "text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50"
                    }`}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
