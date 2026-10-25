// 실제 제품 아이콘. 대부분 simple-icons(CC0), Simple Icons에 없는 Java와 AWS는 devicon(MIT)에서 가져온다.
// 정적 생성 때만 실행되므로 아이콘은 HTML 안의 SVG로 들어가고 클라이언트 JS는 늘지 않는다.
import fs from 'node:fs';
import path from 'node:path';
import {
  siApachekafka,
  siClaude,
  siClickup,
  siDiscord,
  siDocker,
  siFastapi,
  siGithubactions,
  siGrafana,
  siJavascript,
  siK6,
  siMongodb,
  siN8n,
  siPostgresql,
  siPrometheus,
  siPython,
  siReact,
  siRedis,
  siSpring,
  siSpringboot,
  siTerraform,
  siGithub,
} from 'simple-icons';

export type Icon = { title: string; viewBox: string; body: string };

type SimpleIcon = { title: string; hex: string; path: string };

// 검은 바탕에서 안 보이는 브랜드색(검정에 가까운 색)은 본문 글자색으로 바꾼다
function luminance(hex: string) {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function simple(icon: SimpleIcon, title = icon.title): Icon {
  const fill = luminance(icon.hex) < 0.06 ? 'currentColor' : `#${icon.hex}`;
  return { title, viewBox: '0 0 24 24', body: `<path fill="${fill}" d="${icon.path}"/>` };
}

function devicon(file: string, title: string, recolor: Record<string, string> = {}): Icon {
  const raw = fs.readFileSync(path.join(process.cwd(), 'node_modules/devicon/icons', file), 'utf8');
  const viewBox = raw.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 128 128';
  let body = raw.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  for (const [from, to] of Object.entries(recolor)) body = body.split(from).join(to);
  return { title, viewBox, body };
}

export const ICONS = {
  java: devicon('java/java-original.svg', 'Java'),
  aws: devicon('amazonwebservices/amazonwebservices-original-wordmark.svg', 'AWS', { '#252f3e': 'currentColor' }),
  spring: simple(siSpring, 'Spring Batch'),
  springboot: simple(siSpringboot, 'Spring Boot'),
  postgresql: simple(siPostgresql),
  mongodb: simple(siMongodb),
  redis: simple(siRedis),
  grafana: simple(siGrafana),
  prometheus: simple(siPrometheus),
  k6: simple(siK6),
  kafka: simple(siApachekafka, 'Kafka'),
  python: simple(siPython),
  fastapi: simple(siFastapi),
  javascript: simple(siJavascript),
  react: simple(siReact),
  docker: simple(siDocker),
  terraform: simple(siTerraform),
  githubactions: simple(siGithubactions, 'GitHub Actions'),
  github: simple(siGithub),
  n8n: simple(siN8n),
  discord: simple(siDiscord),
  clickup: simple(siClickup),
  claude: simple(siClaude, 'Claude Code'),
} satisfies Record<string, Icon>;

export type IconKey = keyof typeof ICONS;
