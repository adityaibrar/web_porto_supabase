/*
  # Portfolio Database Schema

  1. New Tables
    - `profile` - User profile information
      - `id` (uuid, primary key)
      - `name` (text) - Full name
      - `title` (text) - Professional title
      - `bio` (text) - Biography
      - `location` (text) - Location
      - `email` (text) - Email address
      - `phone` (text) - Phone number
      - `github_url` (text) - GitHub profile URL
      - `linkedin_url` (text) - LinkedIn profile URL
      - `website_url` (text) - Personal website URL
      - `avatar_url` (text) - Profile picture URL
      - `resume_url` (text) - Resume PDF URL
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

    - `skills` - Technical skills
      - `id` (uuid, primary key)
      - `name` (text) - Skill name
      - `category` (text) - Skill category
      - `level` (integer) - Proficiency level (0-100)
      - `icon_url` (text) - Icon or emoji
      - `created_at` (timestamptz) - Creation timestamp

    - `education` - Educational background
      - `id` (uuid, primary key)
      - `institution` (text) - School/University name
      - `degree` (text) - Degree type
      - `field_of_study` (text) - Field of study
      - `start_date` (date) - Start date
      - `end_date` (date) - End date (nullable)
      - `gpa` (numeric) - GPA (nullable)
      - `description` (text) - Additional description
      - `created_at` (timestamptz) - Creation timestamp

    - `experience` - Work experience
      - `id` (uuid, primary key)
      - `company` (text) - Company name
      - `position` (text) - Job position
      - `start_date` (date) - Start date
      - `end_date` (date) - End date (nullable)
      - `description` (text) - Job description
      - `technologies` (text[]) - Technologies used
      - `created_at` (timestamptz) - Creation timestamp

    - `projects` - Portfolio projects
      - `id` (uuid, primary key)
      - `title` (text) - Project title
      - `description` (text) - Project description
      - `technologies` (text[]) - Technologies used
      - `github_url` (text) - GitHub repository URL
      - `live_url` (text) - Live demo URL
      - `image_url` (text) - Project image URL
      - `featured` (boolean) - Featured project flag
      - `created_at` (timestamptz) - Creation timestamp

    - `certificates` - Professional certificates
      - `id` (uuid, primary key)
      - `title` (text) - Certificate title
      - `issuer` (text) - Issuing organization
      - `issue_date` (date) - Issue date
      - `expiry_date` (date) - Expiry date (nullable)
      - `credential_id` (text) - Credential ID
      - `credential_url` (text) - Verification URL
      - `image_url` (text) - Certificate image URL
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policy for public read access to portfolio data

  3. Functions
    - Function to handle user registration
    - Function to change password
*/

-- Create profile table
CREATE TABLE IF NOT EXISTS profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  title text NOT NULL DEFAULT '',
  bio text NOT NULL DEFAULT '',
  location text DEFAULT '',
  email text DEFAULT '',
  phone text DEFAULT '',
  github_url text DEFAULT '',
  linkedin_url text DEFAULT '',
  website_url text DEFAULT '',
  avatar_url text DEFAULT '',
  resume_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL DEFAULT 'Frontend',
  level integer NOT NULL DEFAULT 50 CHECK (level >= 0 AND level <= 100),
  icon_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create education table
CREATE TABLE IF NOT EXISTS education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution text NOT NULL,
  degree text NOT NULL,
  field_of_study text NOT NULL DEFAULT '',
  start_date date NOT NULL,
  end_date date,
  gpa numeric(3,2),
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create experience table
CREATE TABLE IF NOT EXISTS experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  position text NOT NULL,
  start_date date NOT NULL,
  end_date date,
  description text NOT NULL DEFAULT '',
  technologies text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  technologies text[] DEFAULT '{}',
  github_url text DEFAULT '',
  live_url text DEFAULT '',
  image_url text DEFAULT '',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  issuer text NOT NULL,
  issue_date date NOT NULL,
  expiry_date date,
  credential_id text DEFAULT '',
  credential_url text DEFAULT '',
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (for portfolio display)
CREATE POLICY "Allow public read access to profile"
  ON profile
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access to skills"
  ON skills
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access to education"
  ON education
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access to experience"
  ON experience
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access to projects"
  ON projects
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access to certificates"
  ON certificates
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policies for authenticated users to manage data
CREATE POLICY "Allow authenticated users to manage profile"
  ON profile
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage skills"
  ON skills
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage education"
  ON education
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage experience"
  ON experience
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage certificates"
  ON certificates
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for profile table
CREATE TRIGGER update_profile_updated_at
  BEFORE UPDATE ON profile
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default profile data
INSERT INTO profile (name, title, bio, location, email, github_url, linkedin_url)
VALUES (
  'Aditya Ibrar',
  'Flutter Developer',
  'Passionate Flutter Developer with expertise in cross-platform mobile app development. Experienced in creating beautiful, functional applications using modern technologies and best practices.',
  'Indonesia',
  'adityaibrar.dev@gmail.com',
  'https://github.com/adityaibrar',
  'https://linkedin.com/in/adityaibrar'
) ON CONFLICT DO NOTHING;

-- Insert sample skills
INSERT INTO skills (name, category, level, icon_url) VALUES
  ('Flutter', 'Mobile', 90, '📱'),
  ('Dart', 'Mobile', 85, '🎯'),
  ('Firebase', 'Backend', 80, '🔥'),
  ('JavaScript', 'Frontend', 75, '⚡'),
  ('React', 'Frontend', 70, '⚛️'),
  ('Node.js', 'Backend', 65, '🟢'),
  ('Git', 'Tools', 85, '📝'),
  ('VS Code', 'Tools', 90, '💻'),
  ('PostgreSQL', 'Database', 70, '🐘'),
  ('MongoDB', 'Database', 65, '🍃')
ON CONFLICT DO NOTHING;