#!/bin/bash
set -e

echo "=== mnmoo Build & Deploy ==="

# 1. Copy main HTML to www
echo "[1/4] Copying index.html to www..."
cp index.html www/index.html

# Remove stray files from www root
rm -f www/index1.html www/screens.js
rm -rf www/grade1_math

# 2. Sync games (HTML, MP3s, JSON) to www
echo "[2/4] Syncing games to www..."
rsync -av --delete \
  --exclude='batchp3.py' \
  --exclude='REDESIGN_PLAN.md' \
  --exclude='readme' \
  --exclude='fix_landscape_final.js' \
  --exclude='output.mp3' \
  --exclude='output1.mp3' \
  --exclude='thumb.json' \
  games/ www/games/

# Remove stray files from www/games root
rm -f www/games/batchp3.py www/games/REDESIGN_PLAN.md www/games/fix_landscape_final.js
rm -f www/games/output.mp3 www/games/output1.mp3 www/games/thumb.json
rm -rf www/games/readme

# 3. Sync to Android
echo "[3/4] Running cap sync android..."
npx cap sync android

# 4. Detect device and run
echo "[4/4] Detecting connected device..."
DEVICE=$(adb devices | grep -w "device" | head -1 | awk '{print $1}')

if [ -z "$DEVICE" ]; then
  echo "ERROR: No Android device connected. Connect a device and try again."
  echo "       Make sure USB debugging is enabled."
  exit 1
fi

echo "  Found device: $DEVICE"
npx cap run android --target="$DEVICE"
