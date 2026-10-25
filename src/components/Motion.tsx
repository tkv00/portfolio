'use client';

import { useEffect, useRef } from 'react';

// 애니메이션 다이어그램(H.264 MP4, 각 100KB 안팎).
// 포스터는 브라우저 기본 지연 로딩 이미지로 깔고, 영상은 화면 근처에 오면 받아 보일 때만 재생한다.
export function Motion({ name, alt, width, height }: { name: string; alt: string; width: number; height: number }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let loaded = false;
    let shown = false;
    const sync = () => {
      if (loaded && shown && !reduce) v.play().catch(() => {});
      else v.pause();
    };

    // 목차로 멀리서 바로 건너뛰면 두 관찰자가 같은 순간에 불린다. load()가 play()를 끊지 않도록 상태로 맞춘다
    const near = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        v.preload = 'auto';
        v.load();
        loaded = true;
        near.disconnect();
        sync();
      },
      { rootMargin: '800px 0px' },
    );
    const visible = new IntersectionObserver(([e]) => {
      shown = e.isIntersecting;
      sync();
    });
    near.observe(v);
    visible.observe(v);
    return () => {
      near.disconnect();
      visible.disconnect();
    };
  }, [name]);

  return (
    <div className="media media--motion">
      <div className="motion__frame">
        {/* 영상 밑에 까는 포스터. 이미 웹용으로 줄인 JPG라 next/image를 거치지 않는다 */}
        <img src={`/motion/${name}.jpg`} alt="" width={width} height={height} loading="lazy" decoding="async" />
        <video ref={ref} muted loop playsInline preload="none" width={width} height={height} aria-label={alt}>
          <source src={`/motion/${name}.mp4`} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
