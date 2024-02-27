/** @type {import('next').NextConfig} */
/* const nextConfig = {}

module.exports = nextConfig */

const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /node:crypto/,
          (resource) => {
            resource.request = resource.request?.replace(/^node:/, './');
          }
        )
      );
    }
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'srzqarockwvgxved.public.blob.vercel-storage.com',
        port: '',
        pathname: `/${process.env.NEXT_PUBLIC_AVATAR_PATH}**`,
      },
    ],
  },
};

module.exports = nextConfig;
