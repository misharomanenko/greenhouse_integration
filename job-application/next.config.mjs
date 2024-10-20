/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
};

export default nextConfig;
