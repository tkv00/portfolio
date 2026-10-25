// PDF용 다이어그램 SVG(src/diagrams)를 웹의 검은 바탕 팔레트로 바꿔 HTML 안에 그대로 넣는다.
// 글자가 SVG 텍스트로 남아 있어 사이트 글꼴(Pretendard, JetBrains Mono)로 그려지고 확대해도 깨지지 않는다.
import fs from 'node:fs';
import path from 'node:path';

const DIR = path.join(process.cwd(), 'src/diagrams');

// 흰 종이판(portfolio-2026 style guide)과 검정판(krafton_dark) 색을 사이트 토큰으로 옮긴다
const LIGHT: Record<string, string> = {
  '#ffffff': '#15181e', // 노드 면
  '#f5f6f8': '#111318', // 그룹 바탕
  '#eaecf0': '#1a1d23',
  '#e8eef7': '#2a251d', // 강조 면
  '#e3e6eb': '#3a3f48', // 막대 job 26
  '#b3bac6': '#6f7682', // 막대 job 28
  '#d6dae0': '#2e333c', // 선
  '#0f1a2a': '#eef1f6', // 글자
  '#6b7280': '#aab0bc', // 보조 글자, 화살표
  '#01438d': '#d9bc90', // 강조
};

// 검정판은 흰색이 글자와 테두리에 쓰인다. 테두리만 한 단계 낮춘다
const DARK: Record<string, string> = {
  '#ffffff': '#eef1f6',
  'stroke:#ffffff': '#8a919c',
  '#000000': '#0d0f13',
  '#161616': '#111318',
  '#3a3a3a': '#2e333c',
  '#a2a4a3': '#aab0bc',
  '#f9423a': '#d9bc90',
  '#4a1a17': '#2a251d',
};

const SANS = "Pretendard, 'Apple SD Gothic Neo', sans-serif";
const MONO = "'JetBrains Mono', Pretendard, ui-monospace, monospace";

export type Diagram = { svg: string; width: number; height: number; title: string };

const cache = new Map<string, Diagram>();

export function loadDiagram(file: string): Diagram {
  const hit = cache.get(file);
  if (hit) return hit;
  let svg = fs.readFileSync(path.join(DIR, file), 'utf8');
  const prefix = file.replace(/\W/g, '').toLowerCase() + '-';

  svg = svg
    .replace(/<\?xml[^>]*>\s*/, '')
    .replace(/<style>@import[^<]*<\/style>/g, '')
    .replace(/<style>[^<]*font-family:\s*var\(--font-sans\)[^<]*<\/style>/g, '');

  // 바깥 바탕 사각형은 지워서 사이트 카드 색이 보이게 한다. 그 색으로 흰 종이판인지 검정판인지 가른다
  const [, , vw, vh] = (svg.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 0 0').split(/\s+/).map(Number);
  const bg = new RegExp(`<rect(?: x="0" y="0")? width="${vw}" height="${vh}" fill="([^"]+)"\\s*/>`);
  // data-palette="site" 는 처음부터 사이트 색으로 그린 그림(scripts/outbox-diagram.py)이라 색을 그대로 둔다
  const palette: Record<string, string> = svg.includes('data-palette="site"') ? {} : svg.match(bg)?.[1].toLowerCase() === '#000000' ? DARK : LIGHT;
  svg = svg.replace(bg, '');

  svg = svg
    .replace(/stroke="(#[0-9a-fA-F]{6})"/g, (m, hex: string) => {
      const to = palette[`stroke:${hex.toLowerCase()}`];
      return to ? `stroke="${to}"` : m;
    })
    .replace(/#[0-9a-fA-F]{6}\b/g, (hex) => palette[hex.toLowerCase()] ?? hex);
  svg = svg.replace(/font-family="([^"]*)"/g, (_, fam: string) =>
    `font-family="${/mono/i.test(fam) ? MONO : SANS}"`,
  );

  // 한 페이지에 여러 SVG를 넣으므로 id 가 겹치지 않게 파일마다 접두어를 붙인다
  svg = svg
    .replace(/\bid="([^"]+)"/g, `id="${prefix}$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${prefix}$1)`)
    .replace(/(xlink:href|href|aria-labelledby)="([^"]+)"/g, (m, attr: string, val: string) =>
      attr === 'aria-labelledby'
        ? `${attr}="${val.split(/\s+/).map((v) => prefix + v).join(' ')}"`
        : val.startsWith('#') ? `${attr}="#${prefix}${val.slice(1)}"` : m,
    );

  const title = svg.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] ?? '';
  svg = svg
    .replace(/<svg\b([^>]*?)\s(?:width|height)="[^"]*"/g, '<svg$1')
    .replace(/<svg\b([^>]*?)\s(?:width|height)="[^"]*"/g, '<svg$1')
    .replace(/<svg\b/, '<svg class="diagram__svg"');

  const d = { svg, width: vw, height: vh, title };
  cache.set(file, d);
  return d;
}
