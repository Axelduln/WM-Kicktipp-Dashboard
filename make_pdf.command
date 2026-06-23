#!/bin/bash
# ============================================================
#  make_pdf.command  —  WC2026 tracker → PDF
#  Converts the NEWEST .html file in this same folder into a PDF
#  (saved right next to it, so iCloud syncs it to your phone).
#
#  HOW TO RUN (on your Mac):
#    • Double-click this file.
#    • First time only: if macOS blocks it, right-click → Open → Open,
#      or run once in Terminal:  chmod +x "make_pdf.command"
#  Requires Google Chrome (or Chromium / Brave / Edge) installed.
# ============================================================

cd "$(dirname "$0")" || exit 1
DIR="$(pwd)"

# 1) newest .html in this folder
HTML="$(ls -t "$DIR"/*.html 2>/dev/null | head -n 1)"
if [ -z "$HTML" ]; then
  echo "❌ No .html file found in this folder."
  read -r -p "Press Return to close."; exit 1
fi
BASE="$(basename "$HTML" .html)"
OUT="$DIR/$BASE.pdf"

# 2) find a Chromium-family browser
CANDIDATES=(
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary"
  "/Applications/Chromium.app/Contents/MacOS/Chromium"
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser"
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"
)
BROWSER=""
for c in "${CANDIDATES[@]}"; do
  [ -x "$c" ] && BROWSER="$c" && break
done
if [ -z "$BROWSER" ]; then
  echo "❌ Couldn't find Chrome / Chromium / Brave / Edge."
  echo "   Install Google Chrome (free), then run this again."
  read -r -p "Press Return to close."; exit 1
fi

# 3) build a file:// URL (percent-encode spaces in the path)
URLPATH="${HTML// /%20}"
HTMLURL="file://$URLPATH"

echo "📄 Converting : $(basename "$HTML")"
echo "🌐 Using      : $(basename "$BROWSER")"
echo "💾 Output     : $(basename "$OUT")"

# 4) render (try modern headless flag, fall back to old one)
"$BROWSER" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$OUT" "$HTMLURL" >/dev/null 2>&1
if [ ! -f "$OUT" ]; then
  "$BROWSER" --headless --disable-gpu --print-to-pdf="$OUT" "$HTMLURL" >/dev/null 2>&1
fi

if [ -f "$OUT" ]; then
  echo ""
  echo "✅ Done!  Created: $BASE.pdf"
  echo "   It will sync to your phone via iCloud — open it from the Files app."
else
  echo "❌ Conversion failed. Try right-click → Open, or check that Chrome is installed."
fi
read -r -p "Press Return to close."
