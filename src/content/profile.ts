// 문구 원본: tools/v13/pages.js 표지(EP00)와 resume.js(ER01–ER03). 전화번호는 공개 웹이라 뺐다.
import type { Chip } from '@/components/TechIcon';
import type { Link } from './types';

export const PROFILE = {
  name: '김도연',
  nameEn: 'KIM DOYEON',
  role: 'Software Engineer',
  headline: ['BACKEND', 'DATA', 'INFRA'],
  lead: '정산 배치, 행동 로그 파이프라인, AWS 인프라, LLM 회의록 자동화를 만들었습니다. 처리 시간과 데이터 누락, 재실행 결과를 직접 재서 확인했습니다.',
  intro:
    '**수학**을 전공하며 결과뿐 아니라 ==그 결과가 성립하는 조건을 확인하는 습관==을 길렀습니다. 이후 **컴퓨터공학**을 복수전공하고 **Java와 Spring** 기반 백엔드 개발 경험을 쌓았습니다. **대용량 배치 처리**와 **데이터 정합성 개선**, **장애 상황에서의 재실행 검증**을 경험했습니다. 기능 구현에 그치지 않고 ==실제 운영 환경에서도 신뢰할 수 있는 시스템==을 만드는 개발자가 되고자 합니다.',
  github: 'https://github.com/tkv00',
  blog: 'https://tkv00.github.io/',
  email: 'tkv0098@gmail.com',
  links: [
    { label: 'GitHub', text: 'github.com/tkv00', url: 'https://github.com/tkv00' },
    { label: 'Blog', text: 'tkv00.github.io', url: 'https://tkv00.github.io/' },
    { label: 'Email', text: 'tkv0098@gmail.com', url: 'mailto:tkv0098@gmail.com' },
  ] satisfies Link[],
};

// 첫 화면 수치 카드. 값은 각 프로젝트 본문의 결과 행과 같다. 누르면 해당 이야기로 바로 간다
export const METRICS = [
  { project: 'TR1L', value: '10,120 → 674초', label: '108만 명 정산의 계산 단계(Step03)', href: '#tr1l-design' },
  { project: 'TR1L', value: '결함 7건', label: '94가지 장애 시나리오로 찾아 고친 재실행 결함', href: '#tr1l-rerun' },
  { project: 'Holliverse', value: '21,526건', label: '행동 로그 전 구간 일치', href: '#holliverse-log' },
  { project: 'Holliverse', value: '449 → 220초', label: '서비스 배포 중앙값 50.9% 단축', href: '#holliverse-infra' },
  { project: 'Holliverse', value: '99.4 → 16%', label: '부하 시험 중 관리자 API CPU 최대 사용률', href: '#holliverse-infra' },
  { project: 'Qello', value: '3분 이내', label: '한 편에 10~15분 걸리던 회의록 작성', href: '#qello-meeting-bot' },
];

// 이력서 기술 스택과 같은 항목. 아이콘이 없는 항목(JPA, Querydsl 등)은 점으로 표시한다
export const SKILLS: { group: string; items: Chip[] }[] = [
  { group: 'Language', items: [{ icon: 'java', label: 'Java 17' }, { icon: 'python', label: 'Python' }, { icon: 'javascript', label: 'JavaScript' }, { icon: 'react', label: 'React.js' }] },
  { group: 'Backend', items: [{ icon: 'springboot', label: 'Spring Boot' }, { icon: 'spring', label: 'Spring Batch' }, { label: 'JPA' }, { label: 'Querydsl' }, { label: 'jOOQ' }, { icon: 'fastapi', label: 'FastAPI' }] },
  { group: 'Database', items: [{ icon: 'postgresql', label: 'PostgreSQL' }, { icon: 'mongodb', label: 'MongoDB' }, { icon: 'redis', label: 'Redis' }] },
  { group: 'Infrastructure', items: [{ icon: 'aws', label: 'AWS ECS Fargate' }, { icon: 'aws', label: 'AWS CDK(Java)' }, { icon: 'terraform', label: 'Terraform' }, { icon: 'docker', label: 'Docker' }, { icon: 'githubactions', label: 'GitHub Actions' }] },
  { group: 'Observability', items: [{ icon: 'prometheus', label: 'Prometheus' }, { icon: 'grafana', label: 'Grafana' }, { label: 'Loki' }, { icon: 'k6', label: 'k6' }] },
  { group: 'AI Tools', items: [{ icon: 'claude', label: 'Claude Code' }, { label: 'Codex' }, { label: 'Agent Skills' }] },
];

export const OPEN_SOURCE = [
  {
    head: '**GitHub Spec Kit** PR #4964 병합',
    date: '2026.10',
    desc: '확장 명령 목록이 에이전트에 실제 등록된 이름과 다르게 보이던 문제를 고치고 회귀 테스트 추가',
    url: 'https://github.com/github/spec-kit',
  },
  {
    head: '**Microsoft MarkItDown** PR #2412 병합',
    date: '2026.09',
    desc: 'CSV 변환 때 표가 사라지는 문제를 Issue #2411로 보고하고 줄바꿈 처리를 고침, 테스트 15개 추가',
    url: 'https://github.com/microsoft/markitdown',
  },
];

export const OPEN_SOURCE_LINKS: Link[] = [
  { text: 'PR #4964', url: 'https://github.com/github/spec-kit/pull/4964' },
  { text: 'Issue #2411', url: 'https://github.com/microsoft/markitdown/issues/2411' },
  { text: 'PR #2412', url: 'https://github.com/microsoft/markitdown/pull/2412' },
];

export const EDUCATION: [string, string][] = [
  ['**영남대학교** 수학과(전공 평점 4.27/4.5), 컴퓨터공학과 복수전공(3.91/4.5)', '2020.03 – 2026.02'],
  ['**LG U+ 유레카 3기** 백엔드 과정 1,080시간', '2025.08 – 2026.03'],
  ['**삼성청년SW·AI아카데미(SSAFY)** 16기 Java 트랙', '2026.07 – 교육 중'],
];

export const CERTIFICATES: [string, string][] = [
  ['정보처리기사', '2025.06'],
  ['SQLD', '2024.12'],
  ['ADsP', '2025.11'],
  ['TOEIC Speaking IH', '2025.11'],
];

export const AWARDS: [string, string][] = [
  ['종합 프로젝트 우수상, TR1L', '2026.01'],
  ['최종 융합 프로젝트 우수상, Holliverse', '2026.03'],
  ['영남대 자연과학대학장 우등상', '2026.02'],
  ['정보통신병 복무', '2021.04 – 2022.10'],
];
