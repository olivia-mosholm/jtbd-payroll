import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/jtbd-payroll",
  images: { unoptimized: true },
};

export default nextConfig;
