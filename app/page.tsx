// "use client";

import dynamic from "next/dynamic";

// Import critical sections (above the fold)
import { HeroSection } from "@/components/sections/HeroSection";
import { DemoDataNotice } from "@/components/sections/DemoDataNotice";
import { NavigationBar } from "@/components/sections/NavigationBar";
import { ParticleBackground } from "@/components/ParticleBackground";
import { getProfile, getStats } from "@/lib/actions/profile";
import { getSkills } from "@/lib/actions/skills";
import { getEducation } from "@/lib/actions/education";
import { getExperience } from "@/lib/actions/experience";
import { getProjects } from "@/lib/actions/projects";
import { getCertificates } from "@/lib/actions/certificates";

// Lazy load below-fold sections
const AboutSection = dynamic(
  () =>
    import("@/components/sections/AboutSection").then((mod) => ({
      default: mod.AboutSection,
    })),
  { ssr: true }
);
const ExperienceSection = dynamic(
  () =>
    import("@/components/sections/ExperienceSection").then((mod) => ({
      default: mod.ExperienceSection,
    })),
  { ssr: true }
);
const ProjectsSection = dynamic(
  () =>
    import("@/components/sections/ProjectsSection").then((mod) => ({
      default: mod.ProjectsSection,
    })),
  { ssr: true }
);
const SkillsSection = dynamic(
  () =>
    import("@/components/sections/SkillsSection").then((mod) => ({
      default: mod.SkillsSection,
    })),
  { ssr: true }
);
const EducationSection = dynamic(
  () =>
    import("@/components/sections/EducationSection").then((mod) => ({
      default: mod.EducationSection,
    })),
  { ssr: true }
);
const CertificatesSection = dynamic(
  () =>
    import("@/components/sections/CertificatesSection").then((mod) => ({
      default: mod.CertificatesSection,
    })),
  { ssr: true }
);
const ContactSection = dynamic(
  () =>
    import("@/components/sections/ContactSection").then((mod) => ({
      default: mod.ContactSection,
    })),
  { ssr: true }
);
const FooterSection = dynamic(
  () =>
    import("@/components/sections/FooterSection").then((mod) => ({
      default: mod.FooterSection,
    })),
  { ssr: true }
);

export default async function Home() {
  const profile = await getProfile();
  const skills = await getSkills();
  const education = await getEducation();
  const experience = await getExperience();
  const projects = await getProjects();
  const certificates = await getCertificates();
  const stats = await getStats();

  return (
    <div className="min-h-screen max-w-screen overflow-x-hidden relative">
      {/* Global Particle Background */}
      <ParticleBackground />

      {/* Main Content */}
      <div className="relative z-10">
        <NavigationBar profile={profile} />

        <HeroSection profile={profile} />

        <DemoDataNotice profile={profile} />

        <AboutSection profile={profile} stats={stats} />

        <ExperienceSection experience={experience} />

        <ProjectsSection projects={projects} />

        <SkillsSection skills={skills} />

        <EducationSection education={education} />

        <CertificatesSection certificates={certificates} />

        <ContactSection profile={profile} />

        <FooterSection profile={profile} />
      </div>
    </div>
  );
}
