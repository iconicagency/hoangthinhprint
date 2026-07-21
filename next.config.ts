import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Nen gzip/brotli do Vercel xu ly; poweredByHeader tat de khong lo cong nghe
  poweredByHeader: false,
  compress: true,
  images: {
    // AVIF/WebP nhe hon 30-50% so voi JPEG/PNG; cache anh toi uu 31 ngay
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cms.inhoangthinh.com.vn',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hoangthinhprint.com.vn',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // LUU Y: da BO Cache-Control no-store toan site (truoc day tat cache de dev)
  // → gio dung ISR (revalidate 60s trong layout/page) + CDN cache cua Vercel.
  // Security headers ap dung cho moi route.
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        // Ep HTTPS 2 nam, ap dung ca subdomain
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        // Chan doan MIME type — chong upload file gia dang
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        // Chan nhung site vao iframe cua trang khac (clickjacking)
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        // Khong lo full URL khi click link ra ngoai
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        // Tat cac quyen trinh duyet khong dung
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
      ],
    },
  ],
  output: 'standalone',
  transpilePackages: ['motion'],
  webpack: (config, {dev}) => {
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
