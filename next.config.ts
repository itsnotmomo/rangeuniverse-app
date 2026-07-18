import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: { formats: ['image/avif', 'image/webp'] },

  async redirects() {
    return [
      // /mr  → homepage
      { source: '/mr', destination: 'https://rangeuniverse.com', permanent: true },
      { source: '/mr/', destination: 'https://rangeuniverse.com', permanent: true },
      // catch all (e.g. /mr/anything) → homepage
      { source: '/mr/:path*', destination: 'https://rangeuniverse.com', permanent: true },
      // /signals is now the homepage — keep old inbound links working
      { source: '/signals', destination: '/', permanent: true },
      // /v2c variant was promoted to the homepage — keep old inbound links working
      { source: '/v2c', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
