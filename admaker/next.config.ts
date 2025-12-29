import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-02bf1ac6244444b5810b067310ef4874.r2.dev',
      },
    ],
  },
};

export default nextConfig;
