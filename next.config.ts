import type { NextConfig } from "next";
import download from "./src/data/download.json";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/downloads/:file*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          { key: "Content-Disposition", value: "attachment" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Killed SaaS surface — the product is free, MIT, BYOK.
      { source: "/pricing", destination: "/download", permanent: true },
      { source: "/login", destination: "/", permanent: true },
      { source: "/signup", destination: "/", permanent: true },
      { source: "/account", destination: "/", permanent: true },
      { source: "/billing/:path*", destination: "/", permanent: true },
      { source: "/matrix", destination: "/", permanent: true },
      { source: "/blog", destination: "/changelog", permanent: true },
      { source: "/blog/:slug*", destination: "/changelog", permanent: true },
      { source: "/releases", destination: "/changelog", permanent: true },
      { source: "/contact", destination: "/about", permanent: true },
      // Docs consolidation (old hand-written pages merged into synced docs).
      { source: "/docs/custom-skills", destination: "/docs/skills", permanent: true },
      { source: "/docs/workflow-presets", destination: "/docs/project-config", permanent: true },
      { source: "/docs/exec-approvals", destination: "/docs/security", permanent: true },
      { source: "/docs/keychain", destination: "/docs/security", permanent: true },
      { source: "/docs/permissions", destination: "/docs/security", permanent: true },
      { source: "/docs/building", destination: "/docs/distribution", permanent: true },
      { source: "/docs/packaging", destination: "/docs/distribution", permanent: true },
      // Stable alias for the current release artifact.
      { source: "/downloads/latest", destination: download.path, permanent: false },
    ];
  },
};

export default nextConfig;
