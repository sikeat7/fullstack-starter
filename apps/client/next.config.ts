import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Configuración para el monorepo
  transpilePackages: ['@repo/ui'],

  // Configuración de desarrollo
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Proxy para la API en desarrollo
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/:path*`,
      },
    ];
  },
};

export default nextConfig;
