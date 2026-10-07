#!/bin/bash
set -euo pipefail
mkdir -p ios/smoke-results
xcrun simctl list devices available --json > ios/smoke-results/devices.json
python3 - <<'PY' > ios/smoke-results/selected.txt
import json
data = json.load(open('ios/smoke-results/devices.json'))
devices = [d for runtime, ds in data['devices'].items() if 'iOS' in runtime for d in ds]
for kind in ('iPhone', 'iPad'):
    matches = [d for d in devices if kind in d['name'] and d.get('isAvailable')]
    if not matches:
        raise SystemExit('No available ' + kind + ' simulator')
    print(kind, matches[0]['udid'])
PY
while read -r kind device_id; do
  xcrun simctl boot "$device_id" || true
  xcrun simctl bootstatus "$device_id" -b
  xcrun simctl install "$device_id" ios/DerivedData/Build/Products/Debug-iphonesimulator/App.app
  xcrun simctl launch "$device_id" com.mnmoo.firstgradelearninggames
  sleep 8
  xcrun simctl io "$device_id" screenshot "ios/smoke-results/$kind.png"
  xcrun simctl shutdown "$device_id"
done < ios/smoke-results/selected.txt
