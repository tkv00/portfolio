// 표지의 고리 행성. 그림 파일 없이 SVG 하나로 그린다(움직임 없음, 추가 요청 없음).
// 고리는 뒤쪽 절반을 행성보다 먼저, 앞쪽 절반을 나중에 그려 행성을 감싸고 지나가게 한다.
const TILT = -18;

function Ring({ half }: { half: 'back' | 'front' }) {
  return (
    <g transform={`rotate(${TILT} 300 300)`}>
      <g clipPath={`url(#planet-${half})`}>
        <ellipse cx="300" cy="300" rx="286" ry="70" fill="none" stroke="url(#planet-ring)" strokeWidth="1" opacity="0.55" />
        <ellipse cx="300" cy="300" rx="262" ry="63" fill="none" stroke="url(#planet-ring)" strokeWidth="14" opacity="0.16" />
        <ellipse cx="300" cy="300" rx="248" ry="59" fill="none" stroke="url(#planet-ring)" strokeWidth="1.4" opacity="0.8" />
        <ellipse cx="300" cy="300" rx="226" ry="53" fill="none" stroke="url(#planet-ring)" strokeWidth="5" opacity="0.12" />
      </g>
    </g>
  );
}

export function Planet() {
  return (
    <svg className="hero__planet" viewBox="0 0 600 600" aria-hidden focusable="false">
      <defs>
        <radialGradient id="planet-body" cx="36%" cy="30%" r="78%">
          <stop offset="0%" stopColor="#3b4458" />
          <stop offset="34%" stopColor="#222a3a" />
          <stop offset="68%" stopColor="#121620" />
          <stop offset="100%" stopColor="#090b10" />
        </radialGradient>
        <radialGradient id="planet-shade" cx="78%" cy="84%" r="72%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.65" />
          <stop offset="70%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="planet-glow" cx="50%" cy="50%" r="50%">
          <stop offset="78%" stopColor="#8fb3dd" stopOpacity="0" />
          <stop offset="86%" stopColor="#8fb3dd" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#8fb3dd" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="planet-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b9cdea" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#8fb3dd" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#8fb3dd" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="planet-ring" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d9bc90" stopOpacity="0.25" />
          <stop offset="30%" stopColor="#ecd6b2" stopOpacity="1" />
          <stop offset="75%" stopColor="#d9bc90" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#d9bc90" stopOpacity="0.2" />
        </linearGradient>
        <clipPath id="planet-sphere">
          <circle cx="300" cy="300" r="150" />
        </clipPath>
        <clipPath id="planet-back">
          <rect x="0" y="0" width="600" height="300" />
        </clipPath>
        <clipPath id="planet-front">
          <rect x="0" y="300" width="600" height="300" />
        </clipPath>
      </defs>

      <circle cx="300" cy="300" r="190" fill="url(#planet-glow)" />
      <Ring half="back" />

      <circle cx="300" cy="300" r="150" fill="url(#planet-body)" />
      {/* 가스 행성 띠: 고리와 같은 기울기로 아주 옅게 */}
      <g clipPath="url(#planet-sphere)" transform={`rotate(${TILT} 300 300)`} opacity="0.5">
        <rect x="120" y="226" width="360" height="10" fill="#d9bc90" opacity="0.09" />
        <rect x="120" y="252" width="360" height="22" fill="#8fb3dd" opacity="0.06" />
        <rect x="120" y="292" width="360" height="6" fill="#d9bc90" opacity="0.12" />
        <rect x="120" y="318" width="360" height="16" fill="#8fb3dd" opacity="0.05" />
        <rect x="120" y="350" width="360" height="8" fill="#d9bc90" opacity="0.07" />
      </g>
      <circle cx="300" cy="300" r="150" fill="url(#planet-shade)" />
      <circle cx="300" cy="300" r="149.5" fill="none" stroke="url(#planet-rim)" strokeWidth="1.5" />

      {/* 고리가 행성 위에 드리운 그림자 */}
      <g clipPath="url(#planet-sphere)">
        <g transform={`rotate(${TILT} 300 300)`}>
          <ellipse cx="300" cy="318" rx="250" ry="58" fill="none" stroke="#000000" strokeOpacity="0.35" strokeWidth="10" clipPath="url(#planet-front)" />
        </g>
      </g>
      <Ring half="front" />

      <circle cx="528" cy="128" r="6" fill="#e6d3b2" />
      <circle cx="528" cy="128" r="14" fill="#d9bc90" opacity="0.08" />
    </svg>
  );
}
