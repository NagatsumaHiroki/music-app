import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/image/**',
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // デバッグツールの無効化
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  // 開発時のインジケーターを無効化（最新の設定に更新）
  devIndicators: {
    position: 'bottom-left', // インジケーターの位置設定
  },
  // 開発時の全ての表示を最小化
  experimental: {
    optimizePackageImports: ['@fortawesome/react-fontawesome'],
  },
};

export default nextConfig;
