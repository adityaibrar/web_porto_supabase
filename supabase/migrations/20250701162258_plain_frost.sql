/*
# Update Projects Storage Policy for Video Support

1. Updates
- Update existing projects storage policy to include video formats
- Add video_url column to projects table (if not exists)

2. Storage Policy Updates
- Extend projects bucket policy to support video uploads
- Support formats: jpg, jpeg, png, mp4, webm, ogg, avi, mov, wmv
*/

-- Add video_url column to projects table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'video_url'
  ) THEN
    ALTER TABLE projects ADD COLUMN video_url text DEFAULT '';
  END IF;
END $$;

-- Drop existing policy and recreate with video support
DROP POLICY IF EXISTS "Authenticated users can upload project images" ON storage.objects;

-- Create new policy that supports both images and videos
CREATE POLICY "Authenticated users can upload project files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'projects' AND (storage.extension(name) = ANY (ARRAY['jpg', 'jpeg', 'png', 'mp4', 'webm', 'ogg', 'avi', 'mov', 'wmv'])));