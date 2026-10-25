import Image from 'next/image';
import type { Block, Figure as FigureData, Link, Media } from '@/content/types';
import { loadDiagram } from '@/lib/diagrams';
import { Motion } from './Motion';
import { RichText } from './RichText';

function MediaItem({ m, half, eager }: { m: Media; half: boolean; eager?: boolean }) {
  if (m.kind === 'diagram') {
    const d = loadDiagram(m.file);
    return (
      <div className="media media--diagram" role="img" aria-label={m.alt} dangerouslySetInnerHTML={{ __html: d.svg }} />
    );
  }
  if (m.kind === 'motion') return <Motion name={m.name} alt={m.alt} width={m.width} height={m.height} />;
  return (
    // 글자가 작은 캡처는 원본을 새 탭으로 열어 확대해 볼 수 있다
    <a href={m.src.src} target="_blank" rel="noreferrer" className={`media media--image${m.paper ? ' media--paper' : ''}`}>
      <Image
        src={m.src}
        alt={m.alt}
        sizes={half ? '(max-width: 760px) 100vw, 440px' : '(max-width: 960px) 100vw, 900px'}
        priority={eager}
      />
    </a>
  );
}

export function Figure({ items, caption, cols, eager }: FigureData & { eager?: boolean }) {
  const half = cols === 2 || cols === 3;
  return (
    <figure className={`figure${cols === 2 ? ' figure--half' : cols === 3 ? ' figure--third' : ''}`}>
      <div className="figure__items">
        {items.map((m, i) => (
          <MediaItem key={i} m={m} half={half} eager={eager && i === 0} />
        ))}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function KeyValue({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="kv">
      {rows.map(([k, v]) => (
        <div key={k} className="kv__row">
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function LinkList({ items }: { items: Link[] }) {
  return (
    <ul className="links">
      {items.map((l) => (
        <li key={l.url}>
          <a href={l.url} target="_blank" rel="noreferrer">
            {l.label && <span className="links__label">{l.label}</span>}
            <span className="links__text">{l.text}</span>
            <span aria-hidden className="links__arrow">↗</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Blocks({ blocks, links = [] }: { blocks: Block[]; links?: Link[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'para':
            return (
              <p key={i} className="para">
                <RichText text={b.text} links={links} />
              </p>
            );
          case 'h2':
            return (
              <h4 key={i} className="h2">
                {b.num && <span className="h2__num">{b.num}</span>}
                <span>{b.text}</span>
              </h4>
            );
          case 'rows':
            return (
              <dl key={i} className="rows">
                {b.rows.map((r) => (
                  <div key={r.label} className={`rows__row${r.label === '결과' ? ' rows__row--result' : ''}`}>
                    <dt>{r.label}</dt>
                    <dd>
                      <RichText text={r.text} links={links} />
                    </dd>
                    {/* 이 행의 설명을 뒷받침하는 그림과 표를 바로 아래에 둔다 */}
                    {r.blocks && (
                      <div className="rows__media">
                        <Blocks blocks={r.blocks} links={links} />
                      </div>
                    )}
                  </div>
                ))}
              </dl>
            );
          case 'table':
            return (
              <div key={i} className="table-wrap">
                {b.title && <p className="table-title">{b.title}</p>}
                <div className="table-scroll">
                  <table>
                    {b.widths && (
                      <colgroup>
                        {b.widths.map((w, j) => (
                          <col key={j} style={{ width: w }} />
                        ))}
                      </colgroup>
                    )}
                    <thead>
                      <tr>
                        {b.cols.map((c, j) => (
                          <th key={j} className={b.right?.includes(j) ? 'num' : undefined}>
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b.rows.map((row, r) => (
                        <tr key={r}>
                          {row.map((cell, j) => (
                            <td key={j} className={b.right?.includes(j) ? 'num' : undefined}>
                              <RichText text={cell} links={links} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          case 'kv':
            return <KeyValue key={i} rows={b.rows} />;
          case 'figure':
            return <Figure key={i} {...b} />;
          case 'links':
            return <LinkList key={i} items={b.items} />;
        }
      })}
    </>
  );
}
