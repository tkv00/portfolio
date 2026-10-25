import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '김도연 | Backend, Data, Infra',
  description:
    '정산 배치, 행동 로그 파이프라인, AWS 인프라, LLM 회의록 자동화를 만든 백엔드 개발자 김도연의 포트폴리오입니다.',
  openGraph: {
    title: '김도연 포트폴리오',
    description: '정산 배치, 행동 로그 파이프라인, AWS 인프라, LLM 회의록 자동화',
    type: 'website',
    locale: 'ko_KR',
  },
};

export const viewport: Viewport = { themeColor: '#08090c', colorScheme: 'dark' };

// 글꼴은 public/fonts 에 직접 두고(Pretendard는 이 사이트 글자만 남긴 서브셋) 첫 화면에 쓰는 두 개를 미리 받는다
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preload" href="/fonts/pretendard-subset.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
