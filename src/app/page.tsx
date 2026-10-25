import Image from 'next/image';
import { Planet } from '@/components/Planet';
import { ProjectSection } from '@/components/ProjectSection';
import { RichText } from '@/components/RichText';
import { IconSprite, TechChips, TechIcon } from '@/components/TechIcon';
import { PROJECTS } from '@/content/projects';
import { AWARDS, CERTIFICATES, EDUCATION, METRICS, OPEN_SOURCE, OPEN_SOURCE_LINKS, PROFILE, SKILLS } from '@/content/profile';
import profile from '@/assets/profile.png';

const SECTIONS = [
  { href: '#skills', text: '기술 스택' },
  { href: '#open-source', text: '오픈소스' },
  { href: '#education', text: '학력과 자격' },
];

function Dated({ rows }: { rows: [string, string][] }) {
  return (
    <ul className="dated">
      {rows.map(([text, date]) => (
        <li key={text}>
          <span>
            <RichText text={text} />
          </span>
          <time>{date}</time>
        </li>
      ))}
    </ul>
  );
}

function SectionHead({ num, en, ko, id }: { num: string; en: string; ko: string; id: string }) {
  return (
    <h2 className="section-head" id={`${id}-title`}>
      <span className="section-head__num">{num}</span>
      <span className="section-head__en">{en}</span>
      <span className="section-head__ko">{ko}</span>
    </h2>
  );
}

function ProfileLinks() {
  return (
    <ul className="profile-links">
      <li>
        <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub">
          <TechIcon name="github" size={18} />
        </a>
      </li>
      <li>
        <a href={PROFILE.blog} target="_blank" rel="noreferrer" aria-label="기술 블로그">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
            <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M5 5a14 14 0 0 1 14 14M5 11a8 8 0 0 1 8 8" />
            <circle cx="6" cy="18" r="1.6" fill="currentColor" />
          </svg>
        </a>
      </li>
      <li>
        <a href={`mailto:${PROFILE.email}`} aria-label="이메일">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
            <rect x="3" y="5.5" width="18" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        </a>
      </li>
    </ul>
  );
}

export default function Home() {
  return (
    <div className="shell">
      <IconSprite />
      {/* 넓은 화면: 블로그처럼 왼쪽 고정 목차. 어느 이야기든 한 번에 이동한다 */}
      <aside className="rail" aria-label="목차">
        <a href="#top" className="rail__me">
          <Image src={profile} alt="" width={52} height={52} className="rail__avatar" priority />
          <span>
            <strong>{PROFILE.name}</strong>
            <span className="rail__role">{PROFILE.role}</span>
          </span>
        </a>
        <ProfileLinks />
        <nav className="rail__nav">
          <p className="rail__label">PROJECTS</p>
          <ol>
            {PROJECTS.map((p) => (
              <li key={p.id}>
                <a href={`#${p.id}`} className="rail__project">
                  <span className="rail__num">{p.num}</span>
                  {p.name}
                </a>
                <ul>
                  {p.stories.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`}>{s.nav}</a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <p className="rail__label">ABOUT</p>
          <ul className="rail__plain">
            {SECTIONS.map((s) => (
              <li key={s.href}>
                <a href={s.href}>{s.text}</a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* 좁은 화면: 위쪽 막대 */}
      <header className="topbar">
        <a href="#top" className="topbar__name">
          {PROFILE.name}
        </a>
        <nav aria-label="섹션">
          {PROJECTS.map((p) => (
            <a key={p.id} href={`#${p.id}`}>
              {p.name}
            </a>
          ))}
          <a href="#skills">Skills</a>
        </nav>
      </header>

      <main id="top" className="main">
        <section className="hero" aria-label="소개">
          <Planet />
          <p className="eyebrow">PORTFOLIO 2026</p>
          <h1 className="hero__headline">
            {PROFILE.headline.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </h1>
          <p className="hero__role">{PROFILE.role}</p>
          <p className="hero__lead">{PROFILE.lead}</p>
          <ul className="hero__links">
            {PROFILE.links.map((l) => (
              <li key={l.url}>
                <a href={l.url} target={l.url.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer">
                  <span className="hero__links-label">{l.label}</span>
                  {l.text}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="metrics" aria-label="주요 수치">
          <ol>
            {METRICS.map((m) => (
              <li key={m.value}>
                <a href={m.href}>
                  <span className="metrics__project">{m.project}</span>
                  <span className="metrics__value">{m.value}</span>
                  <span className="metrics__label">{m.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        <section className="about" aria-label="자기소개">
          <p>
            <RichText text={PROFILE.intro} />
          </p>
        </section>

        <section id="projects" className="toc" aria-labelledby="projects-title">
          <SectionHead num="01" en="PROJECTS" ko="프로젝트" id="projects" />
          <ol>
            {PROJECTS.map((p) => (
              <li key={p.id}>
                <a href={`#${p.id}`}>
                  <span className="toc__num">{p.num}</span>
                  <span className="toc__name">{p.name}</span>
                  <span className="toc__desc">{p.summary}</span>
                  <span className="toc__arrow" aria-hidden>
                    ↓
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        {PROJECTS.map((p) => (
          <ProjectSection key={p.id} project={p} />
        ))}

        <section id="skills" className="block" aria-labelledby="skills-title">
          <SectionHead num="02" en="SKILLS" ko="기술 스택" id="skills" />
          <dl className="skills">
            {SKILLS.map((s) => (
              <div key={s.group}>
                <dt>{s.group}</dt>
                <dd>
                  <TechChips items={s.items} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="open-source" className="block" aria-labelledby="open-source-title">
          <SectionHead num="03" en="OPEN SOURCE" ko="오픈소스" id="open-source" />
          <ul className="oss">
            {OPEN_SOURCE.map((o) => (
              <li key={o.url}>
                <div className="oss__head">
                  <p>
                    <RichText text={o.head} links={OPEN_SOURCE_LINKS} />
                  </p>
                  <time>{o.date}</time>
                </div>
                <p className="oss__desc">
                  <RichText text={o.desc} links={OPEN_SOURCE_LINKS} />
                </p>
                <a className="oss__repo" href={o.url} target="_blank" rel="noreferrer">
                  <TechIcon name="github" size={14} />
                  {o.url.replace('https://github.com/', '')}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="education" className="block" aria-labelledby="education-title">
          <SectionHead num="04" en="EDUCATION" ko="학력과 교육" id="education" />
          <Dated rows={EDUCATION} />
          <div className="twocol">
            <div>
              <h3 className="subhead">자격</h3>
              <Dated rows={CERTIFICATES} />
            </div>
            <div>
              <h3 className="subhead">수상과 병역</h3>
              <Dated rows={AWARDS} />
            </div>
          </div>
        </section>

        <footer className="footer">
          <span>KIM DOYEON · PORTFOLIO 2026</span>
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        </footer>
      </main>
    </div>
  );
}
