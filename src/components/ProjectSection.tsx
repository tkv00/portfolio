import type { Project } from '@/content/types';
import { Blocks, Figure, KeyValue, LinkList } from './Blocks';
import { RichText } from './RichText';
import { TechChips } from './TechIcon';

export function ProjectSection({ project: p }: { project: Project }) {
  return (
    <section id={p.id} className="project" aria-labelledby={`${p.id}-title`}>
      <header className="project__head">
        <p className="eyebrow">
          PROJECT {p.num} <span className="eyebrow__sep">/</span> {p.name.toUpperCase()}
        </p>
        <h2 id={`${p.id}-title`} className="project__title">
          <span className="project__num" aria-hidden>
            {p.num}
          </span>
          {p.name}
        </h2>
        <p className="project__tagline">{p.tagline}</p>
        {p.award && <p className="award">{p.award}</p>}
      </header>

      {p.intro && <p className="para lead-para">{p.intro}</p>}
      <KeyValue rows={p.meta} />
      <TechChips items={p.stack} />
      {p.hero && <Figure {...p.hero} />}

      <h3 className="subhead">주요 기여</h3>
      {p.contribution && <p className="para">{p.contribution}</p>}
      <ul className="highlights">
        {p.highlights.map(([head, desc, figure]) => (
          <li key={head}>
            <p className="highlights__head">
              <RichText text={head} />
            </p>
            <p className="highlights__desc">{desc}</p>
            {figure && <Figure {...figure} />}
          </li>
        ))}
      </ul>
      <LinkList items={p.links} />

      {p.stories.map((s, i) => (
        <article key={s.id} id={s.id} className="story">
          <p className="eyebrow">
            {p.name.toUpperCase()} <span className="eyebrow__sep">/</span> <span className="eyebrow__ko">{s.eyebrow}</span>
            <span className="story__count">
              {String(i + 1).padStart(2, '0')} / {String(p.stories.length).padStart(2, '0')}
            </span>
          </p>
          <h3 className="story__title">{s.title}</h3>
          <p className="story__sub">{s.sub}</p>
          <Blocks blocks={s.blocks} links={s.inlineLinks} />
        </article>
      ))}
    </section>
  );
}
