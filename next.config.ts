import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Secure headers: add headers() for X-Frame-Options, X-Content-Type-Options, CSP, etc.
};

export default nextConfig;
