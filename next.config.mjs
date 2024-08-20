import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "placehold.co",
            },
            {
                hostname: "cdn.myanimelist.net",
            },
            {
                hostname: "api.jikan.moe",
            },
        ],
    }
};

export default nextConfig;
