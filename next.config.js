/** @type {import('next').NextConfig} */
const nextConfig = {
  // Test builds go elsewhere so they never clash with a running `next dev`.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    // Make photos are in Vercel Blob; lesson thumbnails come from YouTube's image CDN and are
    // fetched by the server, so a learner's browser doesn't contact YouTube before they press play.
    remotePatterns: [
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
      { protocol: 'https', hostname: 'i.ytimg.com', pathname: '/vi/**' },
    ],
  },
  experimental: {
    // Admin cover uploads go through a server action; the default limit is 1 MB.
    serverActions: { bodySizeLimit: '5mb' },
    // @vercel/blob depends on undici, whose syntax Next 14.0's bundler can't parse.
    // Both run only on the server, so load them from node_modules instead of bundling.
    serverComponentsExternalPackages: ['@vercel/blob', 'undici'],
  },
};

module.exports = nextConfig;
