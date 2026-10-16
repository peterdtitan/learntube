/** @type {import('next').NextConfig} */
// Sent with every response. No script policy: Next's inline scripts would need nonces,
// which force every page dynamic. These cover framing, sniffing, referrers and device access.
const SECURITY_HEADERS = [
  { key: 'Content-Security-Policy', value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self' https://accounts.google.com" },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Fullscreen is for timed checkpoints; YouTube's player asks for the rest.
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), fullscreen=(self "https://www.youtube-nocookie.com"), autoplay=(self "https://www.youtube-nocookie.com"), encrypted-media=(self "https://www.youtube-nocookie.com"), picture-in-picture=(self "https://www.youtube-nocookie.com")' },
];

// Only our own Blob store's images go through the image optimizer, not any store on Vercel.
// The token is vercel_blob_rw_<storeId>_<secret>, and @vercel/blob builds public URLs as
// <storeId>.public.blob.vercel-storage.com. Builds without a token (CI, local) keep the wildcard.
const blobStore = (process.env.BLOB_READ_WRITE_TOKEN || '').split('_')[3]?.toLowerCase();
const BLOB_HOST = `${blobStore || '*'}.public.blob.vercel-storage.com`;

const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: SECURITY_HEADERS }];
  },
  // Test builds go elsewhere so they never clash with a running `next dev`.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    // Make photos are in Vercel Blob; lesson thumbnails come from YouTube's image CDN and are
    // fetched by the server, so a learner's browser doesn't contact YouTube before they press play.
    remotePatterns: [
      { protocol: 'https', hostname: BLOB_HOST, pathname: '/**' },
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
