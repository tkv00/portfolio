# portfolio

김도연 웹 포트폴리오. 2026-10-24 이지케어텍 지원본 PDF(포트폴리오 8쪽, 이력서 3쪽)의 문구를 그대로 옮기고, 웹에서는 증거 이미지와 다이어그램을 더 크게, 더 많이 넣었습니다.

- Next.js 16(App Router), 한 페이지 정적 생성
- 블로그(tkv00.github.io)와 같은 우주 컨셉의 검은 바탕
- 글꼴: Pretendard(사이트에 쓰인 글자만 남긴 서브셋), Space Grotesk, JetBrains Mono. 모두 `public/fonts`에 직접 둠
- 기술 아이콘: simple-icons, devicon(Java, AWS)

## 실행

```bash
npm install
npm run dev
```

## 구조

| 위치 | 내용 |
|---|---|
| `src/content/projects.ts` | 프로젝트와 트러블슈팅 원고. `**굵게**`, `==강조색==`, `` `코드` `` |
| `src/content/profile.ts` | 표지, 첫 화면 수치, 기술 스택, 오픈소스, 학력 |
| `src/diagrams/*.svg` | PDF용 다이어그램 원본. 빌드 때 `src/lib/diagrams.ts`가 검은 바탕 색으로 바꿔 HTML에 넣음 |
| `src/assets/` | Grafana 캡처, 설계 보드 등 이미지. `next/image`가 AVIF/WebP로 바꿔 지연 로딩 |
| `public/motion/` | animated-tech-diagram으로 만든 2D 애니메이션(MP4, 포스터 JPG). 원본 scene.json은 저장소 밖 `atd-work/` |

## 문구를 고친 뒤

Pretendard 서브셋에 새 글자가 빠지지 않도록 글꼴을 다시 만듭니다.

```bash
pip3 install --user fonttools brotli
npm run fonts
```

## 렌더링 최적화

- 페이지 전체를 빌드 때 HTML로 만들고, 클라이언트 컴포넌트는 애니메이션 재생기 하나뿐
- 다이어그램은 이미지 파일 대신 SVG로 HTML에 넣어 추가 요청이 없음
- 같은 기술 아이콘은 SVG `<symbol>` 하나를 `<use>`로 재사용
- 첫 화면에 쓰는 글꼴 두 개만 preload, 나머지 이미지는 지연 로딩
- 애니메이션 영상은 화면에 들어올 때만 받아 재생하고 벗어나면 멈춤
