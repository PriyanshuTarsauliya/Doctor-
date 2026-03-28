import type { NextConfig } from "next";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  turbopack: {
    root: "..",
  },
};

export default nextConfig;
