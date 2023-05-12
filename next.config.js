/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    STRAPI_URL: process.env.API_URL
  }
};

module.exports = nextConfig;
