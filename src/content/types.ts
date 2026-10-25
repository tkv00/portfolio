import type { StaticImageData } from 'next/image';
import type { Chip } from '@/components/TechIcon';

// 문구 표기: **굵게**, ==강조색==, `코드`. PDF 원고(tools/v13)와 같은 규칙이다.
export type Link = { label?: string; text: string; url: string };

export type Media =
  // paper: 흰 바탕 그림(다이어그램 캡처, 설계 보드)은 흰 카드 위에 둔다
  | { kind: 'image'; src: StaticImageData; alt: string; paper?: boolean }
  // src/diagrams 의 SVG를 검은 바탕 색으로 바꿔 넣는다
  | { kind: 'diagram'; file: string; alt: string }
  // animated-tech-diagram 으로 만든 2D 애니메이션(public/motion/<name>.mp4, .jpg). BEFORE, AFTER를 따로 둔다
  | { kind: 'motion'; name: string; alt: string; width: number; height: number };

// cols: 2는 전후 비교 한 쌍, 3은 누르면 원본이 열리는 작은 썸네일 줄
export type Figure = { items: Media[]; caption: string; cols?: 1 | 2 | 3 };

export type Block =
  | { type: 'para'; text: string }
  | { type: 'h2'; num?: string; text: string }
  // 행마다 그 설명을 뒷받침하는 그림이나 표를 바로 아래에 붙인다
  | { type: 'rows'; rows: Row[] }
  | { type: 'table'; title?: string; cols: string[]; rows: string[][]; right?: number[]; widths?: string[] }
  | { type: 'kv'; rows: [string, string][] }
  | ({ type: 'figure' } & Figure)
  | { type: 'links'; items: Link[] };

export type Row = { label: string; text: string; blocks?: Block[] };

export type Story = {
  id: string;
  eyebrow: string;
  // 왼쪽 목차에 쓸 짧은 이름
  nav: string;
  title: string;
  sub: string;
  // 본문 속 PR, ADR 번호를 해당 링크로 바꾼다
  inlineLinks?: Link[];
  blocks: Block[];
};

export type Project = {
  id: string;
  num: string;
  name: string;
  tagline: string;
  summary: string;
  intro?: string;
  meta: [string, string][];
  stack: Chip[];
  award?: string;
  hero?: Figure;
  contribution?: string;
  // [굵은 첫 줄, 설명, 그 항목을 보여 주는 그림]
  highlights: [string, string, Figure?][];
  links: Link[];
  stories: Story[];
};
