/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            // destination: 'http://localhost:4000/:path*' // 
            // destination: 'http://52.221.9.230:28080/api/:path*'
            // destination: 'http://54.151.240.239:8080/api/:path*'//eth
            destination: 'http://test.eth.b01.multiadaptive.com/api/:path*',//btc
            
          },{
            source: '/api_btc/:path*',
            // destination: 'http://54.177.13.87:8080/api/:path*',//btc
            destination: 'http://test.btc.node03.multiadaptive.com/api/:path*',//btc
          }
        ]
    }
};

export default nextConfig;
