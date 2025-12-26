/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // images: {
  //   // Use custom loader for Supabase images to avoid timeout issues
  //   loader: 'custom',
  //   loaderFile: './lib/supabase-image-loader.ts',
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'rkgfagmnlhrhoyvsywdb.supabase.co',
  //       port: '',
  //       pathname: '/storage/v1/**',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'images.unsplash.com',
  //       port: '',
  //       pathname: '/**',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'images.pexels.com',
  //       port: '',
  //       pathname: '/**',
  //     },
  //   ],
  //   formats: ['image/avif', 'image/webp'],
  //   // Device sizes for responsive images
  //   deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  //   imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  // },
};

module.exports = nextConfig;
