/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'media.rawg.io',
                port:'',
                pathname:'/media/screenshots/**'
            },
            {
                protocol: 'https',
                hostname: 'media.rawg.io',
                port:'',
                pathname:'/media/games/**'
            }
        ]
    }
};

export default nextConfig;
