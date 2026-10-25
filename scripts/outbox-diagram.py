"""Holliverse Outbox 도입 전후 요청 경로(assets/reused/H4_outbox_asis_tobe_original.png)를 사이트 색으로 다시 그린다.

    python3 scripts/outbox-diagram.py   # src/diagrams/outbox_asis_tobe.svg

글자는 SVG 텍스트로 두어 사이트 글꼴(Pretendard, JetBrains Mono)로 그려진다.
data-palette="site" 가 있어 src/lib/diagrams.ts 의 색 바꾸기를 건너뛴다.
"""
import pathlib

OUT = pathlib.Path(__file__).resolve().parent.parent / 'src/diagrams/outbox_asis_tobe.svg'

GROUP_F, GROUP_S = '#111318', '#262a32'
BOX_F, BOX_S = '#171a21', '#353a44'
T1, T2, T3 = '#eef1f6', '#aab0bc', '#7d8490'
EDGE = '#7d8490'
ACC, ACC_T = '#d9bc90', '#241f18'
DNG, DNG_T = '#d98d8d', '#251a1c'
OK, OK_T = '#86c9a6', '#16221c'

W, H = 1000, 916
parts = []


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def text(x, y, s, size=15, color=T1, weight=500, anchor='middle', mono=False):
    fam = 'mono' if mono else 'sans'
    parts.append(f'<text x="{x}" y="{y}" font-size="{size}" font-weight="{weight}" fill="{color}" '
                 f'text-anchor="{anchor}" font-family="{fam}">{esc(s)}</text>')


def rect(x, y, w, h, fill, stroke, r=8, dash=False, sw=1.2):
    d = ' stroke-dasharray="6 5"' if dash else ''
    parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"{d}/>')


def group(x, y, w, h, title, stroke=GROUP_S, fill=GROUP_F, title_color=T2, dash=False):
    rect(x, y, w, h, fill, stroke, r=12, dash=dash)
    text(x + 18, y + 26, title, size=13.5, color=title_color, weight=500, anchor='start')


def box(cx, y, w, h, label, sub=None, mono=False, stroke=BOX_S, fill=BOX_F, color=T1):
    rect(cx - w / 2, y, w, h, fill, stroke)
    if sub:
        text(cx, y + h / 2 - 3, label, mono=mono, color=color)
        text(cx, y + h / 2 + 16, sub, size=13, color=T2, weight=400)
    else:
        text(cx, y + h / 2 + 5.5, label, mono=mono, color=color, size=14.5 if mono else 15.5)


def arrow(x1, y1, x2, y2, color=EDGE, label=None, label_side='right'):
    m = 'acc' if color == ACC else 'ok' if color == OK else 'edge'
    parts.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="1.6" marker-end="url(#m-{m})"/>')
    if label:
        lx = x1 + 12 if label_side == 'right' else x1 - 12
        text(lx, (y1 + y2) / 2 + 5, label, size=13.5, color=color if color != EDGE else T2, weight=500,
             anchor='start' if label_side == 'right' else 'end')


def db(cx, y, w, h, label):
    rx, ry = w / 2, 9
    x0, x1 = cx - rx, cx + rx
    parts.append(f'<path d="M{x0},{y + ry} L{x0},{y + h - ry} A{rx},{ry} 0 0 0 {x1},{y + h - ry} L{x1},{y + ry}" '
                 f'fill="{BOX_F}" stroke="{BOX_S}" stroke-width="1.2"/>')
    parts.append(f'<ellipse cx="{cx}" cy="{y + ry}" rx="{rx}" ry="{ry}" fill="#1e222b" stroke="{BOX_S}" stroke-width="1.2"/>')
    text(cx, y + h / 2 + 10, label, size=15.5)


def chip(cx, y, label, color, fill):
    w = len(label) * 8.6 + 26
    rect(cx - w / 2, y, w, 26, fill, color, r=13, sw=1)
    text(cx, y + 18, label, size=12.5, color=color, mono=True)


L, R = 250, 750

# 머리
for cx, label, color, fill in ((L, 'AS-IS', DNG, DNG_T), (R, 'TO-BE', OK, OK_T)):
    rect(cx - 50, 16, 100, 30, fill, color, r=15, sw=1)
    text(cx, 36, label, size=14, color=color, weight=700, mono=True)
parts.append(f'<line x1="500" y1="16" x2="500" y2="{H - 16}" stroke="{GROUP_S}" stroke-width="1" stroke-dasharray="4 6"/>')

# ── AS-IS ──
box(L, 66, 160, 42, 'Client')
arrow(L, 108, L, 136)
group(30, 136, 440, 236, 'Customer ApiContainer')
box(L, 168, 220, 42, 'POST /user-logs', mono=True)
arrow(L, 210, L, 256, label='비동기 처리')
group(50, 256, 400, 100, 'request path 내 결합', stroke=DNG, fill=DNG_T, title_color=DNG)
box(145, 288, 150, 42, 'Kafka publish')
box(345, 288, 170, 42, 'admin internal HTTP', stroke=DNG)
arrow(220, 309, 260, 309)
text(145, 348, '짧은 작업', size=13, color=T2, weight=400)
text(345, 348, '긴 작업', size=13, color=DNG, weight=500)
arrow(L, 372, L, 400)
group(30, 400, 440, 84, 'Admin ApiContainer')
box(L, 432, 220, 42, 'admin internal HTTP')
arrow(L, 484, L, 512)
db(L, 512, 170, 60, 'feature DB')
rect(40, 608, 420, 104, DNG_T, DNG, r=12, sw=1)
text(L, 640, '구조적 문제', size=15.5, color=DNG, weight=700)
text(L, 668, 'admin 지연 시 request path 전체가 영향을 받음', size=14, color=T1, weight=400)
text(L, 692, '두 책임이 같은 처리 흐름에 결합', size=14, color=T1, weight=400)

# ── TO-BE ──
box(R, 66, 160, 42, 'Client')
arrow(R, 108, R, 136)
group(530, 136, 440, 186, 'Customer ApiContainer')
box(R, 168, 220, 42, 'POST /user-logs', mono=True)
arrow(R, 210, R, 228)
group(550, 228, 400, 82, 'request path 책임 경계', stroke=OK, fill=OK_T, title_color=OK)
box(645, 258, 150, 42, 'Kafka publish')
box(845, 258, 170, 42, 'outbox insert', stroke=OK)
arrow(720, 279, 760, 279)
arrow(845, 300, 845, 352, color=OK, label='분리')
group(530, 352, 440, 116, 'PostgreSQL / Outbox', stroke=ACC, fill=ACC_T, title_color=ACC, dash=True)
box(R, 382, 360, 40, 'user_log_admin_dispatch_outbox', mono=True)
chip(642, 432, 'READY', T2, GROUP_F)
chip(750, 432, 'PROCESSING', ACC, ACC_T)
chip(860, 432, 'ACKED', OK, OK_T)
arrow(R, 468, R, 496)
group(530, 496, 440, 212, 'Scheduler / Dispatch Flow')
box(R, 528, 220, 42, 'scheduler claim')
arrow(R, 570, R, 588)
box(R, 588, 340, 54, 'memberId + KST 기준일 그룹화', sub='계산 문맥 단위로 묶음')
arrow(R, 642, R, 660)
box(R, 660, 260, 40, 'grouped batch dispatch')
arrow(R, 708, R, 736)
group(530, 736, 440, 84, 'Admin ApiContainer')
box(R, 768, 240, 42, 'admin batch endpoint')
arrow(R, 820, R, 848)
db(R, 848, 170, 60, 'feature DB')

defs = ''.join(
    f'<marker id="m-{k}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse">'
    f'<path d="M0,0 L10,5 L0,10 z" fill="{c}"/></marker>'
    for k, c in (('edge', EDGE), ('acc', ACC), ('ok', OK)))
svg = (f'<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg" data-palette="site" role="img">'
       f'<title>Outbox 도입 전후 로그 요청 경로</title><defs>{defs}</defs>' + ''.join(parts) + '</svg>\n')
OUT.write_text(svg, encoding='utf-8')
print(OUT, len(svg))
