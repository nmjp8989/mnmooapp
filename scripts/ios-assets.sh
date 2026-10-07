#!/bin/bash
set -euo pipefail
# sips ships with macOS. Reuse the existing brand asset, with no icon alpha channel.
asset_dir=ios/App/App/Assets.xcassets
temp_dir=$(mktemp -d)
sips -s format jpeg games/assets/pcmnmooappicon512.png --out "$temp_dir/icon.jpg" >/dev/null
sips -s format png -z 1024 1024 "$temp_dir/icon.jpg" --out "$asset_dir/AppIcon.appiconset/AppIcon-512@2x.png" >/dev/null
for file in "$asset_dir"/Splash.imageset/*.png; do
  sips -s format png "$temp_dir/icon.jpg" --out "$file" >/dev/null
done
