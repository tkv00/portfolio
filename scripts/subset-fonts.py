"""Pretendard 가변 글꼴을 이 사이트에 실제로 쓰인 글자만 남겨 하나의 woff2로 만든다.

전체 Pretendard Variable(약 2MB) 대신 수십 KB 파일 하나를 preload 해서 첫 화면 글자가 바로 그려지게 한다.
원고(src/content), 컴포넌트, 다이어그램 SVG의 글자를 모은다. 문구를 고친 뒤에는 다시 실행한다.

    pip3 install --user fonttools brotli
    npm run fonts
"""
import pathlib
import re

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / 'node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2'
OUT = ROOT / 'public/fonts/pretendard-subset.woff2'

chars = set(chr(c) for c in range(0x20, 0x7F))  # ASCII 전체
chars |= set('·…–—→←↑↓↗「」『』“”‘’①②③④⑤⑥⑦⑧⑨×≈≤≥±%°')
for path in list((ROOT / 'src').rglob('*')) + list((ROOT / 'public/motion').glob('*.txt')):
    if path.suffix in {'.ts', '.tsx', '.svg', '.css', '.txt'}:
        text = path.read_text(encoding='utf-8')
        # SVG의 숫자 문자 참조(&#x...;)도 글자로 바꿔 넣는다
        text = re.sub(r'&#x([0-9a-fA-F]+);', lambda m: chr(int(m.group(1), 16)), text)
        chars |= {ch for ch in text if ord(ch) >= 0x20}

font = TTFont(SRC)

opts = subset.Options()
opts.flavor = 'woff2'
opts.layout_features = ['*']
opts.name_IDs = ['*']
opts.notdef_outline = True
sub = subset.Subsetter(options=opts)
sub.populate(text=''.join(sorted(chars)))
sub.subset(font)
# 이 사이트는 400, 500, 700만 쓴다. 굵기 축을 그 범위로 줄인다(글자를 먼저 줄여야 instancer가 가볍다)
font = instancer.instantiateVariableFont(font, {'wght': (400, 700)})
OUT.parent.mkdir(parents=True, exist_ok=True)
font.flavor = 'woff2'
font.save(OUT)

hangul = sum(1 for c in chars if '가' <= c <= '힣')
print(f'{OUT.relative_to(ROOT)}  {OUT.stat().st_size / 1024:.1f} KB  글자 {len(chars)}개(한글 {hangul}개)')
