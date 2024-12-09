import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_CODESANDBOX_HOST: process.env.CODESANDBOX_HOST,
  },
};

export default nextConfig;
