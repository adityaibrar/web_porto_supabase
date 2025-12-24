"use client";

import { Profile } from "@/types/types";
import { Github, Linkedin, Mail } from "lucide-react";

interface FooterSectionProps {
  profile: Profile | null;
}

export function FooterSection({ profile }: FooterSectionProps) {
  return (
    <footer className="py-12 px-6 border-t border-gray-800/50 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
              {profile?.name || "Flutter Developer Portfolio"}
            </div>
            <p className="text-gray-400">
              Building the future, one app at a time.
            </p>
          </div>
          <div className="flex space-x-6">
            {profile?.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
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
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            )}
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()}{" "}
            {profile?.name || "Flutter Developer Portfolio"}. Built with Next.js
            and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
