"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "@/components/admin/ProfileForm";
import { SkillsManager } from "@/components/admin/SkillsManager";
import { ExperienceManager } from "./ExperienceManager";
import { ProjectsManager } from "./ProjectsManager";
import { EducationManager } from "./EducationManager";
import { CertificatesManager } from "./CertificatesManager";
import {
  Certificate,
  Education,
  Experience,
  Profile,
  Project,
  Skill,
} from "@/types/types";
interface AdminTabsProps {
  profile: Profile | null;
  skills: Skill[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  certificates: Certificate[];
  onProfileUpdate: (profile: Profile) => void;
  onSkillsUpdate: (skills: Skill[]) => void;
  onEducationUpdate: (education: Education[]) => void;
  onExperienceUpdate: (experience: Experience[]) => void;
  onProjectsUpdate: (projects: Project[]) => void;
  onCertificatesUpdate: (certificates: Certificate[]) => void;
}

export function AdminTabs({
  profile,
  skills,
  education,
  experience,
  projects,
  certificates,
  onProfileUpdate,
  onSkillsUpdate,
  onEducationUpdate,
  onExperienceUpdate,
  onProjectsUpdate,
  onCertificatesUpdate,
}: AdminTabsProps) {
  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="experience">Experience</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="certificates">Certificates</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <ProfileForm profile={profile} onProfileUpdate={onProfileUpdate} />
      </TabsContent>

      <TabsContent value="skills">
        <SkillsManager skills={skills} onSkillsUpdate={onSkillsUpdate} />
      </TabsContent>

      <TabsContent value="experience">
        <ExperienceManager
          experience={experience}
          onExperienceUpdate={onExperienceUpdate}
        />
      </TabsContent>

      <TabsContent value="projects">
        <ProjectsManager
          projects={projects}
          onProjectsUpdate={onProjectsUpdate}
        />
      </TabsContent>

      <TabsContent value="education">
        <EducationManager
          education={education}
          onEducationUpdate={onEducationUpdate}
        />
      </TabsContent>

      <TabsContent value="certificates">
        <CertificatesManager
          certificates={certificates}
          onCertificatesUpdate={onCertificatesUpdate}
        />
      </TabsContent>
    </Tabs>
  );
}
