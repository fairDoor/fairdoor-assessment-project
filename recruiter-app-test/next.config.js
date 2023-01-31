/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const path = require("path");

const withImages = require("next-images")({
  i18n,
  reactStrictMode: true,
  distDir: "build",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/candidates",
        permanent: true,
      },
      {
        source: "/auth/login",
        destination: "/auth",
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\.(woff|woff2)$/,
      use: {
        loader: "url-loader",
      },
    });
    return config;
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
});

module.exports = withImages;
