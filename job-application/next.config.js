const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    scrollRestoration: true,
    legacyBrowsers: false,
    gzipSize: true,
    optimizeCss: true,
    nextScriptWorkers: true,
  },
  env: {
    NEXT_PUBLIC_STYTCH_PROJECT_ENV: process.env.STYTCH_PROJECT_ENV,
    NEXT_PUBLIC_STYTCH_PROJECT_ID: process.env.STYTCH_PROJECT_ID,
    NEXT_PUBLIC_STYTCH_SECRET: process.env.STYTCH_SECRET,
    GOOGLE_MAP_KEY: process.env.GOOGLE_MAP_KEY,
    NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN: process.env.STYTCH_PUBLIC_TOKEN,
    NEXT_PUBLIC_STYTCH_M2M_SPONSOR_FE_CLIENT_ID:
      process.env.STYTCH_M2M_SPONSOR_FE_CLIENT_ID,
    NEXT_PUBLIC_STYTCH_M2M_SPONSOR_FE_CLIENT_SECRET:
      process.env.STYTCH_M2M_SPONSOR_FE_CLIENT_SECRET,
    STYTCH_RESET_EMAIL_TEMPLATE_ID: process.env.STYTCH_RESET_EMAIL_TEMPLATE_ID,
    SURVEYJS_LICENSE_KEY: process.env.SURVEYJS_LICENSE_KEY,
  },
  images: {
    domains: ['*'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/authenticate',
        destination: '/auth/callback',
      },
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/v1/:path*',
      },
      {
        // Add this new rewrite rule for Greenhouse API
        source: '/greenhouse/:path*',
        destination: 'https://harvest.greenhouse.io/v1/:path*'
      }
    ];
  },
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  httpAgentOptions: {
    keepAlive: true,
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
};

module.exports = withBundleAnalyzer(nextConfig);
