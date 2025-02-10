import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Ensure you are using the export option
  distDir: 'dist', // Указываем папку dist
  assetPrefix: process.env.NODE_ENV === 'production' ? '/frontendClicker' : '',
};

export default nextConfig;
