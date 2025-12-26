// Custom image loader - returns original image URLs without transformation
// Images are served as-is from their original sources

interface ImageLoaderProps {
    src: string;
    width: number;
    quality?: number;
}

export default function supabaseLoader({ src }: ImageLoaderProps): string {
    // Return original URL without any transformation
    return src;
}
