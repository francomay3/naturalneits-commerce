export default {
  experimental: {
    inlineCss: true,
    useCache: true,
  },
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: process.env.NODE_ENV === "development",
    },
  },
  webpack: (config: any) => {
    // Suppress webpack cache warnings about big strings
    config.infrastructureLogging = {
      ...config.infrastructureLogging,
      level: "error",
    };

    return config;
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },
};
