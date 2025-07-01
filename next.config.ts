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
