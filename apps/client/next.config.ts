import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Configuración para el monorepo
  transpilePackages: ['@repo/ui', '@repo/i18n', '@repo/data'],

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

export default withNextIntl(nextConfig);
