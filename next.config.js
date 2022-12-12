const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  eslint: {
    dirs: ["src"],
  },
});
