import { Database } from "@/lib/supabase";

export type Profile = Database["public"]["Tables"]["profile"]["Row"];
export type Skill = Database["public"]["Tables"]["skills"]["Row"];
export type Education = Database["public"]["Tables"]["education"]["Row"];
export type Experience = Database["public"]["Tables"]["experience"]["Row"];
export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type Certificate = Database["public"]["Tables"]["certificates"]["Row"];