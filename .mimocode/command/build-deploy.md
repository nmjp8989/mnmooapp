---
description: "Build mnmoo Android APK and deploy to connected device. Use after editing HTML/Games and need to test on device. Handles Java 21 setup, Gradle build, and reliable adb install (npx cap run android is unreliable)."
---

# Build & Deploy mnmoo

Build the Capacitor Android project and install on a connected device.

## Steps

### 1. Build web assets and sync to Android
```bash
npm run build && npx cap sync android
```

### 2. Build APK with Java 21 (required for Capacitor 8.x Gradle)
```bash
export JAVA_HOME=$HOME/.local/jdk21 && ./gradlew assembleDebug 2>&1 | tail -3
```
Run from `android/` directory. Timeout: 600s.

### 3. Install and launch APK
```bash
adb install -r android/app/build/outputs/apk/debug/app-debug.apk && adb shell am force-stop com.mnmoo.app && adb shell am start -n com.mnmoo.app/.MainActivity
```

### Notes
- Java 21 is REQUIRED — Java 17 fails with `invalid source release: 21`
- `npx cap run android` hangs on device deployment — use manual gradle + adb install instead
- If only edited `www/` files (no source changes), skip step 2 and use `npx cap run android` directly
- Device must have USB debugging enabled; detect with `adb devices`
- Package name: `com.mnmoo.app`
