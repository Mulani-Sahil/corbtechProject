/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Required for pdf-parse and react-pdf to work in Next.js
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

module.exports = nextConfig;