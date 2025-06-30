/*
# Enhanced Portfolio Schema with File Upload Support

1. New Tables
- Add storage bucket policies for file uploads
- Update existing tables with better structure
- Add years_of_experience to profile table

2. Storage Setup
- Create buckets for avatars, project images, and certificates
- Set up proper RLS policies for file access

3. Enhanced Features
- Support for image uploads (.jpg, .jpeg, .png)
- Support for PDF uploads for certificates
- Better skills structure (name only)
- Years of experience calculation
*/

-- Create storage buckets if they don't exist
INSERT INTO
    storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true),
    ('projects', 'projects', true),
    (
        'certificates',
        'certificates',
        true
    ) ON CONFLICT (id) DO NOTHING;

-- Storage policies for avatars bucket
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects FOR
SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can upload avatar images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'avatars' AND (storage.extension(name) = ANY (ARRAY['jpg', 'jpeg', 'png'])));

CREATE POLICY "Authenticated users can update avatar images" ON storage.objects FOR
UPDATE TO authenticated USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can delete avatar images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'avatars');

-- Storage policies for projects bucket
CREATE POLICY "Project images are publicly accessible" ON storage.objects FOR
SELECT USING (bucket_id = 'projects');

CREATE POLICY "Authenticated users can upload project images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'projects' AND (storage.extension(name) = ANY (ARRAY['jpg', 'jpeg', 'png'])));

CREATE POLICY "Authenticated users can update project images" ON storage.objects FOR
UPDATE TO authenticated USING (bucket_id = 'projects');

CREATE POLICY "Authenticated users can delete project images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'projects');

-- Storage policies for certificates bucket
CREATE POLICY "Certificate files are publicly accessible" ON storage.objects FOR
SELECT USING (bucket_id = 'certificates');

CREATE POLICY "Authenticated users can upload certificate files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'certificates' AND (storage.extension(name) = ANY (ARRAY['jpg', 'jpeg', 'png', 'pdf'])));

CREATE POLICY "Authenticated users can update certificate files" ON storage.objects FOR
UPDATE TO authenticated USING (bucket_id = 'certificates');

CREATE POLICY "Authenticated users can delete certificate files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'certificates');

-- Add years_of_experience to profile table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profile' AND column_name = 'years_of_experience'
  ) THEN
    ALTER TABLE profile ADD COLUMN years_of_experience integer DEFAULT 0;

END IF;

END;

$$;

-- Update profile with years of experience
UPDATE profile
SET
    years_of_experience = 3
WHERE
    years_of_experience IS NULL
    OR years_of_experience = 0;

-- Create function to get portfolio stats
CREATE OR REPLACE FUNCTION get_portfolio_stats()
RETURNS TABLE(
  total_projects bigint,
  total_skills bigint,
  years_experience integer
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (SELECT COUNT(*) FROM projects) as total_projects,
    (SELECT COUNT(*) FROM skills) as total_skills,
    (SELECT COALESCE(years_of_experience, 0) FROM profile LIMIT 1) as years_experience;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT
EXECUTE ON FUNCTION get_portfolio_stats () TO anon,
authenticated;