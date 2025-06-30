"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  Briefcase,
  FolderOpen,
  Award,
  GraduationCap,
  Code,
} from "lucide-react";
import { type Database } from "@/lib/supabase";

type Profile = Database["public"]["Tables"]["profile"]["Row"];
type Skill = Database["public"]["Tables"]["skills"]["Row"];
type Education = Database["public"]["Tables"]["education"]["Row"];
type Experience = Database["public"]["Tables"]["experience"]["Row"];
type Project = Database["public"]["Tables"]["projects"]["Row"];
type Certificate = Database["public"]["Tables"]["certificates"]["Row"];

interface StatsOverviewProps {
  profile: Profile | null;
  skills: Skill[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  certificates: Certificate[];
}

export function StatsOverview({
  profile,
  skills,
  education,
  experience,
  projects,
  certificates,
}: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
      <Card>
        <CardContent className="p-4 text-center">
          <User className="w-8 h-8 mx-auto mb-2 text-blue-500" />
          <p className="text-2xl font-bold">{profile ? "1" : "0"}</p>
          <p className="text-sm text-muted-foreground">Profile</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <Code className="w-8 h-8 mx-auto mb-2 text-green-500" />
          <p className="text-2xl font-bold">{skills.length}</p>
          <p className="text-sm text-muted-foreground">Skills</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <Briefcase className="w-8 h-8 mx-auto mb-2 text-purple-500" />
          <p className="text-2xl font-bold">{experience.length}</p>
          <p className="text-sm text-muted-foreground">Experience</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <FolderOpen className="w-8 h-8 mx-auto mb-2 text-orange-500" />
          <p className="text-2xl font-bold">{projects.length}</p>
          <p className="text-sm text-muted-foreground">Projects</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <GraduationCap className="w-8 h-8 mx-auto mb-2 text-cyan-500" />
          <p className="text-2xl font-bold">{education.length}</p>
          <p className="text-sm text-muted-foreground">Education</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <Award className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
          <p className="text-2xl font-bold">{certificates.length}</p>
          <p className="text-sm text-muted-foreground">Certificates</p>
        </CardContent>
      </Card>
    </div>
  );
}