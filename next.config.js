/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Make photos are stored in Vercel Blob.
    remotePatterns: [{ protocol: 'https', hostname: '*.public.blob.vercel-storage.com' }],
  },
  experimental: {
    // @vercel/blob depends on undici, whose syntax Next 14.0's bundler can't parse.
    // Both run only on the server, so load them from node_modules instead of bundling.
    serverComponentsExternalPackages: ['@vercel/blob', 'undici'],
  },
};

module.exports = nextConfig;
