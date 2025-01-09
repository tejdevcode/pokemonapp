/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'img.pokemondb.net',
            port: '',
            pathname: '/**/**',
            search: '',
         },
         {
            protocol: 'https',
            hostname: 'raw.githubusercontent.com',
            port: '',
            pathname: '/**/**',
            search: '',
         },
      ],
   },
};

export default nextConfig;