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

// export type Profile = Database["public"]["Tables"]["profile"]["Row"];
// export type Skill = Database["public"]["Tables"]["skills"]["Row"];
// export type Education = Database["public"]["Tables"]["education"]["Row"];
// export type Experience = Database["public"]["Tables"]["experience"]["Row"];
// export type Project = Database["public"]["Tables"]["projects"]["Row"];
// export type Certificate = Database["public"]["Tables"]["certificates"]["Row"];

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
  // const [profile, setProfile] = useState<Profile | null>(null);
  // const [skills, setSkills] = useState<Skill[]>([]);
  // const [education, setEducation] = useState<Education[]>([]);
  // const [experience, setExperience] = useState<Experience[]>([]);
  // const [projects, setProjects] = useState<Project[]>([]);
  // const [certificates, setCertificates] = useState<Certificate[]>([]);
  // const [stats, setStats] = useState<PortfolioStats>({
  //   total_projects: 0,
  //   total_skills: 0,
  //   years_experience: 0,
  // });
  // const [loading, setLoading] = useState(true);
  // const [activeSection, setActiveSection] = useState("hero");

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const sections = [
  //       "hero",
  //       "about",
  //       "experience",
  //       "projects",
  //       "skills",
  //       "education",
  //       "certificates",
  //       "contact",
  //     ];
  //     const current = sections.find((section) => {
  //       const element = document.getElementById(section);
  //       if (element) {
  //         const rect = element.getBoundingClientRect();
  //         return rect.top <= 100 && rect.bottom >= 100;
  //       }
  //       return false;
  //     });
  //     if (current) {
  //       setActiveSection(current);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const [
  //         profileRes,
  //         skillsRes,
  //         educationRes,
  //         experienceRes,
  //         projectsRes,
  //         certificatesRes,
  //         statsRes,
  //       ] = await Promise.all([
  //         supabase.from("profile").select("*").single(),
  //         supabase.from("skills").select("*").order("name"),
  //         supabase
  //           .from("education")
  //           .select("*")
  //           .order("start_date", { ascending: false }),
  //         supabase
  //           .from("experience")
  //           .select("*")
  //           .order("start_date", { ascending: false }),
  //         supabase
  //           .from("projects")
  //           .select("*")
  //           .order("created_at", { ascending: false }),
  //         supabase
  //           .from("certificates")
  //           .select("*")
  //           .order("issue_date", { ascending: false }),
  //         supabase.rpc("get_portfolio_stats"),
  //       ]);

  //       if (profileRes.data) setProfile(profileRes.data);
  //       if (skillsRes.data) setSkills(skillsRes.data);
  //       if (educationRes.data) setEducation(educationRes.data);
  //       if (experienceRes.data) setExperience(experienceRes.data);
  //       if (projectsRes.data) setProjects(projectsRes.data);
  //       if (certificatesRes.data) setCertificates(certificatesRes.data);
  //       if (statsRes.data && statsRes.data.length > 0) {
  //         setStats(statsRes.data[0]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  //     </div>
  //   );
  // }

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
