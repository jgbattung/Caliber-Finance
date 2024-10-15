/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/api/auth/signin',
        destination: '/error',
        permanent: false,
      },
      {
        source: '/api/auth/signin/page',
        destination: '/error',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;