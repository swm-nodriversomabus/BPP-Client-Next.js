/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    return config;
  },
  output: 'standalone',
  env: {
    NEXT_BASE_URL: process.env.NEXT_BASE_URL,
    NEXT_CLIENT: process.env.NEXT_CLIENT,
  },
};

module.exports = nextConfig;
