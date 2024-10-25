/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GREENHOUSE_API_KEY: process.env.GREENHOUSE_API_KEY,
    GREENHOUSE_ON_BEHALF_OF: process.env.GREENHOUSE_ON_BEHALF_OF,
    COMPANY_NAME: process.env.COMPANY_NAME,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      type: 'asset/resource',
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/greenhouse-api/:path*',
        destination: '/api/greenhouse-api/:path*',
      },
    ];
  },
}

module.exports = nextConfig
