"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase, type Database } from "@/lib/supabase";
import { AuthService } from "@/lib/auth";

// Import admin components
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatsOverview } from "@/components/admin/StatsOverview";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { AdminLoading } from "@/components/admin/AdminLoading";
import { LoginForm } from "@/components/admin/LoginForm";

type Profile = Database["public"]["Tables"]["profile"]["Row"];
type Skill = Database["public"]["Tables"]["skills"]["Row"];
type Education = Database["public"]["Tables"]["education"]["Row"];
type Experience = Database["public"]["Tables"]["experience"]["Row"];
type Project = Database["public"]["Tables"]["projects"]["Row"];
type Certificate = Database["public"]["Tables"]["certificates"]["Row"];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (!session) {
        // Clear data when logged out
        setProfile(null);
        setSkills([]);
        setEducation([]);
        setExperience([]);
        setProjects([]);
        setCertificates([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    } else if (isAuthenticated === false) {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const checkAuthStatus = async () => {
    try {
      const { user } = await AuthService.getCurrentUser();
      setIsAuthenticated(!!user);
    } catch (error) {
      console.error("Auth check error:", error);
      setIsAuthenticated(false);
    }
  };

  const fetchData = async () => {
    try {
      const [
        profileRes,
        skillsRes,
        educationRes,
        experienceRes,
        projectsRes,
        certificatesRes,
      ] = await Promise.all([
        supabase.from("profile").select("*").single(),
        supabase.from("skills").select("*").order("name"),
        supabase
          .from("education")
          .select("*")
          .order("start_date", { ascending: false }),
        supabase
          .from("experience")
          .select("*")
          .order("start_date", { ascending: false }),
        supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("certificates")
          .select("*")
          .order("issue_date", { ascending: false }),
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (skillsRes.data) setSkills(skillsRes.data);
      if (educationRes.data) setEducation(educationRes.data);
      if (experienceRes.data) setExperience(experienceRes.data);
      if (projectsRes.data) setProjects(projectsRes.data);
      if (certificatesRes.data) setCertificates(certificatesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleProfileUpdate = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
    toast.success("Profile updated successfully!");
  };

  const handleSkillsUpdate = (updatedSkills: Skill[]) => {
    setSkills(updatedSkills);
  };

  const handleEducationUpdate = (updatedEducation: Education[]) => {
    setEducation(updatedEducation);
  };

  const handleExperienceUpdate = (updatedExperience: Experience[]) => {
    setExperience(updatedExperience);
  };

  const handleProjectsUpdate = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
  };

  const handleCertificatesUpdate = (updatedCertificates: Certificate[]) => {
    setCertificates(updatedCertificates);
  };

  // Show loading while checking auth status
  if (isAuthenticated === null) {
    return <AdminLoading />;
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  // Show loading while fetching data
  if (loading) {
    return <AdminLoading />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <AdminHeader />

        <StatsOverview
          profile={profile}
          skills={skills}
          education={education}
          experience={experience}
          projects={projects}
          certificates={certificates}
        />

        <AdminTabs
          profile={profile}
          skills={skills}
          education={education}
          experience={experience}
          projects={projects}
          certificates={certificates}
          onProfileUpdate={handleProfileUpdate}
          onSkillsUpdate={handleSkillsUpdate}
          onEducationUpdate={handleEducationUpdate}
          onExperienceUpdate={handleExperienceUpdate}
          onProjectsUpdate={handleProjectsUpdate}
          onCertificatesUpdate={handleCertificatesUpdate}
        />
      </div>
    </div>
  );
}
