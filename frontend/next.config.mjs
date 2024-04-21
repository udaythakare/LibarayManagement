/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'tailwindui.com',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'www.dmarge.com',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'cdn-bomfl.nitrocdn.com',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: "**"
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                pathname: "**"
            }
        ],
    },
};

export default nextConfig;
