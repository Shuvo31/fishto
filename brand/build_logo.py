"""Generates the FISHTO logo system (wordmark, app icon, favicon) as pure-path SVGs.

Wordmark letters come from Outfit ExtraBold (SIL OFL, see fonts/OFL.txt); the final
"o" is drawn as a fish so the brand reads "fisht" + fish.

Run: python build_logo.py   (requires fonttools)
"""
import json
import math
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

HERE = Path(__file__).parent
PUBLIC = HERE.parent / "frontend" / "public"
SRC = HERE.parent / "frontend" / "src" / "components"

INK = "#1D1D1F"
LIGHT = "#F5F5F7"
BLUE_TOP = "#2997FF"
BLUE_BOTTOM = "#0066CC"
BLUE = "#0071E3"

WEIGHT = 800
TRACKING = -18  # font units, tightens the heavy weight like a custom wordmark

font = instancer.instantiateVariableFont(TTFont(HERE / "fonts" / "Outfit.ttf"), {"wght": WEIGHT})
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
upm = font["head"].unitsPerEm
x_height = font["OS/2"].sxHeight
cap_height = font["OS/2"].sCapHeight


def glyph_bounds(ch):
    pen = BoundsPen(glyphs)
    glyphs[cmap[ord(ch)]].draw(pen)
    return pen.bounds


# Stem width measured from the "i" so the fish ring matches the letter weight.
ix0, _, ix1, _ = glyph_bounds("i")
STEM = ix1 - ix0

# ---- Letters "fisht" (y flipped so baseline sits at y=0, ascenders negative) ----
letters = []
x = 0
for ch in "fisht":
    name = cmap[ord(ch)]
    pen = SVGPathPen(glyphs)
    glyphs[name].draw(TransformPen(pen, (1, 0, 0, -1, x, 0)))
    letters.append(pen.getCommands())
    x += font["hmtx"][name][0] + TRACKING
letters_path = " ".join(letters)

# ---- Fish "o" ----
def fish(x0, cy, H):
    """Solid fish facing left: rounded head, pinched tail joint, forked tail, eye cut-out.

    x0 is the nose, cy the vertical centre, H the body height. Returns (path, right edge).
    """
    w = H * 1.12            # body length
    tl = H * 0.50           # tail length
    pinch = H * 0.07        # half-height of the tail joint
    fin = H * 0.44          # half-height of the tail tips
    jx = x0 + w
    tx = jx + tl

    def p(x, y):
        return f"{x:.1f} {y:.1f}"

    top = cy - H / 2
    bot = cy + H / 2
    body = (
        f"M{p(x0, cy)}"
        f"C{p(x0, cy - H * 0.30)} {p(x0 + w * 0.16, top)} {p(x0 + w * 0.40, top)}"
        f"C{p(x0 + w * 0.68, top)} {p(jx - w * 0.10, cy - H * 0.20)} {p(jx, cy - pinch)}"
        f"L{p(tx - tl * 0.08, cy - fin)}"
        f"Q{p(tx + tl * 0.02, cy - fin * 1.02)} {p(tx - tl * 0.04, cy - fin * 0.82)}"
        f"Q{p(tx - tl * 0.40, cy)} {p(tx - tl * 0.04, cy + fin * 0.82)}"
        f"Q{p(tx + tl * 0.02, cy + fin * 1.02)} {p(tx - tl * 0.08, cy + fin)}"
        f"L{p(jx, cy + pinch)}"
        f"C{p(jx - w * 0.10, cy + H * 0.20)} {p(x0 + w * 0.68, bot)} {p(x0 + w * 0.40, bot)}"
        f"C{p(x0 + w * 0.16, bot)} {p(x0, cy + H * 0.30)} {p(x0, cy)}Z"
    )
    er = H * 0.085
    ex, ey = x0 + w * 0.22, cy - H * 0.10
    eye = f"M{p(ex - er, ey)}a{er:.1f} {er:.1f} 0 1 0 {2 * er:.1f} 0a{er:.1f} {er:.1f} 0 1 0 {-2 * er:.1f} 0Z"
    # Gill: a ")" crescent cut behind the eye, the signature detail of the mark.
    gx, hh = x0 + w * 0.34, H * 0.30
    ra, rb = H * 0.36, H * 0.56
    gill = (
        f"M{p(gx, cy - hh)}"
        f"A{ra:.1f} {ra:.1f} 0 0 1 {p(gx, cy + hh)}"
        f"A{rb:.1f} {rb:.1f} 0 0 0 {p(gx, cy - hh)}Z"
    )
    return body + eye + gill, tx + tl * 0.02


o_left_bearing = glyph_bounds("o")[0]
FISH_H = x_height + 24                        # optical overshoot above/below the x-height
fish_path, tail_end = fish(x + o_left_bearing + 28, -x_height / 2, FISH_H)

# ---- Wordmark viewBox ----
f_top = -max(glyph_bounds("f")[3], glyph_bounds("h")[3])
pad = 20
vb_x, vb_y = -pad, f_top - pad
vb_w = tail_end + 2 * pad
vb_h = -f_top + 2 * pad + 12


def wordmark_svg(letter_fill, fish_fill, defs=""):
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb_x:.0f} {vb_y:.0f} {vb_w:.0f} {vb_h:.0f}" role="img" aria-labelledby="t">
  <title id="t">FISHTO</title>
  {defs}<path fill="{letter_fill}" d="{letters_path}"/>
  <path fill="{fish_fill}" fill-rule="evenodd" d="{fish_path}"/>
</svg>
"""


GRADIENT_DEFS = (
    f'<defs><linearGradient id="fishto-blue" x1="0" y1="0" x2="1" y2="1">'
    f'<stop offset="0" stop-color="{BLUE_TOP}"/><stop offset="1" stop-color="{BLUE_BOTTOM}"/>'
    f"</linearGradient></defs>\n  "
)

# ---- App icon: iOS-style squircle with a white, leaping fish ----
ICON = 1024
ICON_FISH_H = ICON * 0.43
ICON_TILT = -14  # degrees; the fish leaps up and to the left


def squircle(size, n=5.0, steps=256):
    a = size / 2
    pts = []
    for i in range(steps):
        t = 2 * math.pi * i / steps
        c, s = math.cos(t), math.sin(t)
        px = a + a * math.copysign(abs(c) ** (2 / n), c)
        py = a + a * math.copysign(abs(s) ** (2 / n), s)
        pts.append(f"{px:.1f} {py:.1f}")
    return "M" + "L".join(pts) + "Z"


_, _icon_right = fish(0, 0, ICON_FISH_H)
icon_nose = (ICON - _icon_right) / 2
icon_fish_path, _ = fish(icon_nose, ICON / 2, ICON_FISH_H)
ICON_TRANSFORM = f"rotate({ICON_TILT} {ICON / 2:.0f} {ICON / 2:.0f})"
SQUIRCLE = squircle(ICON)


def icon_svg(background):
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {ICON} {ICON}" role="img" aria-labelledby="t">
  <title id="t">FISHTO</title>
  <defs><linearGradient id="fishto-icon" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{BLUE_TOP}"/><stop offset="1" stop-color="{BLUE_BOTTOM}"/></linearGradient></defs>
  <path fill="url(#fishto-icon)" d="{background}"/>
  <path fill="#FFFFFF" fill-rule="evenodd" transform="{ICON_TRANSFORM}" d="{icon_fish_path}"/>
</svg>
"""


outputs = {
    PUBLIC / "logo.svg": wordmark_svg(INK, "url(#fishto-blue)", GRADIENT_DEFS),
    PUBLIC / "logo-white.svg": wordmark_svg(LIGHT, BLUE_TOP),
    PUBLIC / "logo-mark.svg": icon_svg(SQUIRCLE),
    PUBLIC / "favicon.svg": icon_svg(SQUIRCLE),
    HERE / "icon-full-bleed.svg": icon_svg(f"M0 0H{ICON}V{ICON}H0Z"),
}
for path, svg in outputs.items():
    path.write_text(svg)

# Paths for the React <Logo /> component, so the site renders the exact same artwork.
component_data = {
    "wordmark": {
        "viewBox": f"{vb_x:.0f} {vb_y:.0f} {vb_w:.0f} {vb_h:.0f}",
        "letters": letters_path,
        "fish": fish_path,
    },
    "icon": {
        "viewBox": f"0 0 {ICON} {ICON}",
        "squircle": SQUIRCLE,
        "fish": icon_fish_path,
        "fishTransform": ICON_TRANSFORM,
    },
}
(SRC / "logo-paths.json").write_text(json.dumps(component_data, indent=2))

print(f"stem={STEM} x_height={x_height} wordmark={vb_w:.0f}x{vb_h:.0f}")
