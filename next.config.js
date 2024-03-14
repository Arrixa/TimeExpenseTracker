const { hostname } = require('os');
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {}

// module.exports = nextConfig

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {

    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
      config.externals.push('nodemailer');
    }

    if (!isServer) {
      // Exclude @mapbox/node-pre-gyp from client-side bundle
      config.resolve.alias['@mapbox/node-pre-gyp'] = false;
      // Exclude modules causing 'fs' module issues in the browser
      config.resolve.alias.fs = false;
      config.resolve.alias.child_process = false;
      config.resolve.alias.net = false;
      config.resolve.alias.tls = false;
      config.resolve.alias.dns = false;
    }

    return config;
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "opulent-space-tribble-jjjpqw56px4p2qr7v-3000.app.github.dev/",
      ]
    }
  }
};