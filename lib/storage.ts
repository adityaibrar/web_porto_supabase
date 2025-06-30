import { supabase } from './supabase';

export type FileUploadResult = {
  url: string;
  path: string;
  error?: string;
};

export async function uploadFile(
  file: File,
  bucket: 'avatars' | 'projects' | 'certificates' | 'skills',
  path?: string
): Promise<FileUploadResult> {
  try {
    // Validate file type
    const allowedTypes = {
      avatars: ['image/jpeg', 'image/jpg', 'image/png'],
      projects: ['image/jpeg', 'image/jpg', 'image/png'],
      certificates: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'],
      skills: ['image/jpeg', 'image/jpg', 'image/png']
    };

    if (!allowedTypes[bucket].includes(file.type)) {
      return {
        url: '',
        path: '',
        error: `File type ${file.type} not allowed for ${bucket}`
      };
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = path || `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      return {
        url: '',
        path: '',
        error: error.message
      };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return {
      url: publicUrl,
      path: data.path,
      error: undefined
    };
  } catch (error) {
    return {
      url: '',
      path: '',
      error: error instanceof Error ? error.message : 'Upload failed'
    };
  }
}

export async function deleteFile(bucket: 'avatars' | 'projects' | 'certificates' | 'skills', path: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    return !error;
  } catch (error) {
    console.error('Delete file error:', error);
    return false;
  }
}