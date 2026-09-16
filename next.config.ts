import type { NextConfig } from "next";

// BASE_PATH is set only for the GitHub Pages preview (/Arclin-website); Vercel/custom domain leave it unset.
const basePath = process.env.BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
