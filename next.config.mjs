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
  experimental: {
    workerThreads: false,
    cpus: 1
  }
};

export default nextConfig;