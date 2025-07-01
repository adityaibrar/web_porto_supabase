/*
# Undo Update Projects Storage Policy for Video Support

1. Drops video_url column if it exists
2. Drops new policy
3. Recreate old policy for images only
*/

-- 1) Drop video_url column
ALTER TABLE projects DROP COLUMN IF EXISTS video_url;

-- 2) Drop new policy
DROP POLICY IF EXISTS "Authenticated users can upload project files" ON storage.objects;

-- 3) Recreate old policy (hanya image)
CREATE POLICY "Authenticated users can upload project images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'projects'
    AND storage.extension(name) = ANY (ARRAY['jpg', 'jpeg', 'png'])
  );