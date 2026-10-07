#!/bin/bash
set -e

echo "=== mnmoo Release Build ==="

# 1. Copy HTML to www and sync
echo "[1/3] Building web assets..."
npm run build && npx cap sync android

# 2. Bump version in build.gradle
echo "[2/3] Bumping version..."
GRADLE="android/app/build.gradle"
VCODE=$(grep 'versionCode' "$GRADLE" | grep -o '[0-9]\+' | head -1)
VNAME=$(grep 'versionName' "$GRADLE" | grep -o '"[^"]*"' | tr -d '"')
NEW_VCODE=$((VCODE + 1))
MAJOR=$(echo "$VNAME" | cut -d. -f1)
MINOR=$(echo "$VNAME" | cut -d. -f2)
NEW_MINOR=$((MINOR + 1))
NEW_VNAME="${MAJOR}.${NEW_MINOR}"

sed -i "s/versionCode $VCODE/versionCode $NEW_VCODE/" "$GRADLE"
sed -i "s/versionName \"$VNAME\"/versionName \"$NEW_VNAME\"/" "$GRADLE"

echo "  $VNAME ($VCODE) → $NEW_VNAME ($NEW_VCODE)"

# 3. Build AAB
echo "[3/3] Building release AAB..."
cd android && ./gradlew bundleRelease
cd ..

echo ""
echo "=== Done ==="
echo "AAB: android/app/build/outputs/bundle/release/app-release.aab"
echo "Version: $NEW_VNAME ($NEW_VCODE)"
