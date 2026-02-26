import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  async rewrites() {
    return [
      {
        source: "/api-proxy/:path*",
        destination: "https://bengal-bazar-server.vercel.app/:path*",
      },
    ];
  },

  experimental: {
    optimizePackageImports: [
      "lodash",
      "gsap",
      "@gsap/react",
      "react-toastify",
      "@iconify/react",
    ],
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
