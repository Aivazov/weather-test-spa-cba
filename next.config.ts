import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',

  // Ensure proper handling of environment variables
  env: {
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  },

  // Optimize images and static assets
  images: {
    unoptimized: false,
    domains: [
      'keyassets.timeincuk.net',
      'cdn.mos.cms.futurecdn.net',
      'www.weather.gov',
    ],
  },
};

export default nextConfig;
