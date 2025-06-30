import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profile: {
        Row: {
          id: string;
          name: string;
          title: string;
          bio: string;
          location: string;
          email: string;
          phone: string;
          github_url: string;
          linkedin_url: string;
          website_url: string;
          avatar_url: string;
          resume_url: string;
          created_at: string;
          updated_at: string;
          years_of_experience: number;
        };
        Insert: {
          id?: string;
          name: string;
          title: string;
          bio: string;
          location?: string;
          email?: string;
          phone?: string;
          github_url?: string;
          linkedin_url?: string;
          website_url?: string;
          avatar_url?: string;
          resume_url?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          title?: string;
          bio?: string;
          location?: string;
          email?: string;
          phone?: string;
          github_url?: string;
          linkedin_url?: string;
          website_url?: string;
          avatar_url?: string;
          resume_url?: string;
          updated_at?: string;
        };
      };
      skills: {
        Row: {
          id: string;
          name: string;
          category: string;
          level: number;
          icon_url: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          level: number;
          icon_url?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          level?: number;
          icon_url?: string;
        };
      };
      education: {
        Row: {
          id: string;
          institution: string;
          degree: string;
          field_of_study: string;
          start_date: string;
          end_date: string;
          gpa: number;
          description: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          institution: string;
          degree: string;
          field_of_study: string;
          start_date: string;
          end_date?: string;
          gpa?: number;
          description?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          institution?: string;
          degree?: string;
          field_of_study?: string;
          start_date?: string;
          end_date?: string;
          gpa?: number;
          description?: string;
        };
      };
      experience: {
        Row: {
          id: string;
          company: string;
          position: string;
          start_date: string;
          end_date: string;
          description: string;
          technologies: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          company: string;
          position: string;
          start_date: string;
          end_date?: string;
          description: string;
          technologies: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          company?: string;
          position?: string;
          start_date?: string;
          end_date?: string;
          description?: string;
          technologies?: string[];
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          technologies: string[];
          github_url: string;
          live_url: string;
          image_url: string;
          featured: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          technologies: string[];
          github_url?: string;
          live_url?: string;
          image_url?: string;
          featured?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          technologies?: string[];
          github_url?: string;
          live_url?: string;
          image_url?: string;
          featured?: boolean;
        };
      };
      certificates: {
        Row: {
          id: string;
          title: string;
          issuer: string;
          issue_date: string;
          expiry_date: string;
          credential_id: string;
          credential_url: string;
          image_url: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          issuer: string;
          issue_date: string;
          expiry_date?: string;
          credential_id?: string;
          credential_url?: string;
          image_url?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          issuer?: string;
          issue_date?: string;
          expiry_date?: string;
          credential_id?: string;
          credential_url?: string;
          image_url?: string;
        };
      };
    };
  };
};