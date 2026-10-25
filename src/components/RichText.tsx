import { Fragment, type ReactNode } from 'react';
import type { Link } from '@/content/types';

type Seg = { text: string; b: boolean; acc: boolean; mono: boolean };

// **굵게**, ==강조색==, `코드` 를 겹치지 않는 구간으로 나눈다(PDF 렌더러 L.parse 와 같은 토글 규칙)
function parse(src: string): Seg[] {
  const segs: Seg[] = [];
  const st = { b: false, acc: false, mono: false };
  let buf = '';
  const flush = () => {
    if (buf) segs.push({ text: buf, ...st });
    buf = '';
  };
  for (let i = 0; i < src.length; ) {
    if (src.startsWith('**', i)) { flush(); st.b = !st.b; i += 2; continue; }
    if (src.startsWith('==', i)) { flush(); st.acc = !st.acc; i += 2; continue; }
    if (src[i] === '`') { flush(); st.mono = !st.mono; i += 1; continue; }
    buf += src[i];
    i += 1;
  }
  flush();
  return segs;
}

// 본문 속 PR, ADR 번호 같은 글자를 링크로 바꾼다
function linkify(text: string, links: Link[], key: string): ReactNode[] {
  if (!links.length) return [text];
  const sorted = [...links].sort((a, b) => b.text.length - a.text.length);
  const out: ReactNode[] = [];
  let rest = text;
  let n = 0;
  while (rest) {
    let hit: { at: number; link: Link } | null = null;
    for (const l of sorted) {
      const at = rest.indexOf(l.text);
      if (at >= 0 && (!hit || at < hit.at)) hit = { at, link: l };
    }
    if (!hit) { out.push(rest); break; }
    if (hit.at > 0) out.push(rest.slice(0, hit.at));
    out.push(
      <a key={`${key}-${n++}`} href={hit.link.url} target="_blank" rel="noreferrer" className="inline-link">
        {hit.link.text}
      </a>,
    );
    rest = rest.slice(hit.at + hit.link.text.length);
  }
  return out;
}

export function RichText({ text, links = [] }: { text: string; links?: Link[] }) {
  return (
    <>
      {parse(text).map((s, i) => {
        let node: ReactNode = <Fragment>{linkify(s.text, links, String(i))}</Fragment>;
        if (s.mono) node = <code>{node}</code>;
        if (s.acc) node = <mark className="acc">{node}</mark>;
        else if (s.b) node = <strong>{node}</strong>;
        return <Fragment key={i}>{node}</Fragment>;
      })}
    </>
  );
}
