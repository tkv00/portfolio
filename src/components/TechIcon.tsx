import { ICONS, type IconKey } from '@/lib/icons';

// 아이콘 모양은 페이지에 한 번만 넣고(IconSprite) 쓰는 곳에서는 <use>로 가리킨다.
// 같은 아이콘이 여러 번 나와도 HTML이 늘지 않는다.
export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden focusable="false">
      {Object.entries(ICONS).map(([key, icon]) => (
        <symbol key={key} id={`i-${key}`} viewBox={icon.viewBox} dangerouslySetInnerHTML={{ __html: icon.body }} />
      ))}
    </svg>
  );
}

export function TechIcon({ name, size = 18 }: { name: IconKey; size?: number }) {
  return (
    <svg className="tech-icon" width={size} height={size} role="img" aria-label={ICONS[name].title}>
      <use href={`#i-${name}`} />
    </svg>
  );
}

// 아이콘 + 이름 칩. label 을 주면 아이콘 이름 대신 그 글자를 쓴다(예: Spring Batch, AWS CDK)
export type Chip = { icon?: IconKey; label: string };

export function TechChips({ items }: { items: Chip[] }) {
  return (
    <ul className="chips">
      {items.map((c) => (
        <li key={c.label} className="chip">
          {c.icon ? <TechIcon name={c.icon} size={16} /> : <span className="chip__dot" aria-hidden />}
          {c.label}
        </li>
      ))}
    </ul>
  );
}
