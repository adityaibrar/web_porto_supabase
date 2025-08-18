// "use client";

// Import all section components
import { HeroSection } from "@/components/sections/HeroSection";
import { DemoDataNotice } from "@/components/sections/DemoDataNotice";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { CertificatesSection } from "@/components/sections/CertificatesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { NavigationBar } from "@/components/sections/NavigationBar";
import { getProfile, getStats } from "@/lib/actions/profile";
import { getSkills } from "@/lib/actions/skills";
import { getEducation } from "@/lib/actions/education";
import { getExperience } from "@/lib/actions/experience";
import { getProjects } from "@/lib/actions/projects";
import { getCertificates } from "@/lib/actions/certificates";

interface PortfolioStats {
  total_projects: number;
  total_skills: number;
  years_experience: number;
}

export default async function Home() {
  const profile = await getProfile();
  const skills = await getSkills();
  const education = await getEducation();
  const experience = await getExperience();
  const projects = await getProjects();
  const certificates = await getCertificates();
  const stats = await getStats();

  return (
    <div className="min-h-screen bg-background max-w-screen overflow-x-hidden">
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
  );
}
