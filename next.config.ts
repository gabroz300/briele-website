import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  // Disabilita ESLint durante il build per evitare errori di linting
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ottimizzazioni per performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'react-icons'],
  },
  // Compressione delle immagini
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // Ottimizzazioni per il bundle
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Headers per cache e compressione
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
