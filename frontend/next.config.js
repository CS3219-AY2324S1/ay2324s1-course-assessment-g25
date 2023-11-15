/** @type {import('next').NextConfig} */
const pathPrefix = process.env.NODE_ENV === "production" 
  ? "/ay2324s1-course-assessment-g25" 
  : ""

const nextConfig = {
  assetPrefix: pathPrefix,
  basePath: pathPrefix,
  // output: "export",
  reactStrictMode: false,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    })
    return config
  },
}

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'liveblocks.io',
      },
    ],
    domains: ['cdn.discordapp.com', 'liveblocks.io', 'avatars.githubusercontent.com'],
  },
}

// module.exports = nextConfig
