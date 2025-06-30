/*
  # Enhanced Skills System with Icon Upload Support

  1. Updates
    - Add icon_url column to skills table (if not exists)
    - Update storage policies for skills icons
    - Add sample data with proper structure

  2. Storage Setup
    - Create skills bucket for icon uploads
    - Set up RLS policies for skills icons

  3. Enhanced Features
    - Support for skill icon uploads (.jpg, .jpeg, .png)
    - Better skills structure with categories
    - Improved display layout
*/

-- Create storage bucket for skills icons if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('skills', 'skills', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for skills bucket
CREATE POLICY "Skills icons are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'skills');

CREATE POLICY "Authenticated users can upload skills icons"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'skills' AND (storage.extension(name) = ANY (ARRAY['jpg', 'jpeg', 'png'])));

CREATE POLICY "Authenticated users can update skills icons"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'skills');

CREATE POLICY "Authenticated users can delete skills icons"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'skills');

-- Ensure icon_url column exists in skills table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'skills' AND column_name = 'icon_url'
  ) THEN
    ALTER TABLE skills ADD COLUMN icon_url text DEFAULT '';
  END IF;
END $$;

-- Update existing skills with better categories and remove level column if exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'skills' AND column_name = 'level'
  ) THEN
    ALTER TABLE skills DROP COLUMN level;
  END IF;
END $$;

-- Clear existing skills and insert new ones with proper structure
DELETE FROM skills;

-- Insert enhanced skills data
INSERT INTO skills (name, category, icon_url) VALUES
  ('Flutter', 'Mobile Development', ''),
  ('Dart', 'Programming Language', ''),
  ('Firebase', 'Backend Service', ''),
  ('JavaScript', 'Programming Language', ''),
  ('TypeScript', 'Programming Language', ''),
  ('React', 'Frontend Framework', ''),
  ('Next.js', 'Frontend Framework', ''),
  ('Node.js', 'Backend Runtime', ''),
  ('Express.js', 'Backend Framework', ''),
  ('PostgreSQL', 'Database', ''),
  ('MongoDB', 'Database', ''),
  ('Supabase', 'Backend Service', ''),
  ('Git', 'Version Control', ''),
  ('GitHub', 'Development Platform', ''),
  ('VS Code', 'Development Tool', ''),
  ('Android Studio', 'Development Tool', ''),
  ('Figma', 'Design Tool', ''),
  ('REST API', 'API Technology', ''),
  ('GraphQL', 'API Technology', ''),
  ('Docker', 'DevOps Tool', '')
ON CONFLICT DO NOTHING;