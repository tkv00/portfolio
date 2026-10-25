import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: { formats: ['image/avif', 'image/webp'] },
  // 홈 폴더의 pnpm-workspace.yaml 을 루트로 잡지 않게 고정
  turbopack: { root: __dirname },
};

export default nextConfig;
