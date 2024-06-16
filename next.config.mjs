/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            // destination: 'http://localhost:4000/:path*' // 目标 API 地址
            destination: 'http://52.221.9.230:28080/api/:path*'
          }
        ]
    }
};

export default nextConfig;
