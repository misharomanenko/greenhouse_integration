/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GREENHOUSE_API_KEY: process.env.GREENHOUSE_API_KEY,
    GREENHOUSE_ON_BEHALF_OF: process.env.GREENHOUSE_ON_BEHALF_OF,
    COMPANY_NAME: process.env.COMPANY_NAME,
  },
}

module.exports = nextConfig

