#!/usr/bin/env bash
# Renders brand PNGs (social thumbnail + app icons) into frontend/public using headless Chrome.
# Regenerate the SVG artwork first with: python build_logo.py
set -euo pipefail
cd "$(dirname "$0")"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
OUT="../frontend/public"
BRAND="file://$(pwd)"

shot() { # <url> <output> <width> <height>
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --allow-file-access-from-files --default-background-color=00000000 \
    --window-size="$3,$4" --screenshot="$2" "$1" >/dev/null 2>&1
}

shot "$BRAND/og-image.html" "$OUT/og-image.png" 1200 630

# Full-bleed square for OS-masked icons; squircle with transparent corners for the favicon.
# Chrome clamps tiny windows, so small sizes are downscaled from the 512px render.
shot "$BRAND/icon.html?src=icon-full-bleed.svg" "$OUT/icon-512.png" 512 512
cp "$OUT/icon-512.png" "$OUT/icon-maskable-512.png"
sips -z 180 180 "$OUT/icon-512.png" --out "$OUT/apple-touch-icon.png" >/dev/null
sips -z 192 192 "$OUT/icon-512.png" --out "$OUT/icon-192.png" >/dev/null
shot "$BRAND/icon.html?src=../frontend/public/favicon.svg" /tmp/fishto-favicon-512.png 512 512
sips -z 32 32 /tmp/fishto-favicon-512.png --out "$OUT/favicon-32.png" >/dev/null
echo "Rendered brand assets to $OUT"
