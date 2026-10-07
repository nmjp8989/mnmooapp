# AGENTS.md

## Project Overview

mnmoo is a mobile-first educational quiz app for Math and Coding (Python) grades K–8. Built as a single-page HTML app deployed to Android via Capacitor.

## Tech Stack

- **Frontend**: Single-file HTML/CSS/JS (`code.html`)
- **Mobile**: Capacitor 8.4 (Android)
- **IAP**: RevenueCat SDK (`@revenuecat/purchases-capacitor` 13.x)
- **Fonts**: Google Fonts (Bebas Neue, DM Mono, Syne, Crimson Pro)

## Build & Deploy

```bash
# Copy HTML to www and sync to Android
npm run build && npx cap sync android

# Open Android Studio
npx cap open android

# Run on device/emulator
npx cap run android
```

## RevenueCat Setup

API key is configured in `index.html`:

```javascript
const RC_API_KEY = 'goog_OTYhKHoUiAMNkVUvsRCZAFwhwIH';
const RC_ENTITLEMENT = 'com.mnmoo_pro';
```

RevenueCat products:
- **mnmoo_pro_monthly**: $6.49/month (3-day free trial)
- **mnmoo_pro_yearly**: Yearly subscription
- **mnmoo_pro_lifetime**: Lifetime one-time purchase
- **Entitlement**: `com.mnmoo Pro`

## Architecture

- `code.html` — single-file app (CSS + JS inline)
- `www/index.html` — built copy for Capacitor
- `android/` — native Android project (Capacitor-managed)
- `capacitor.config.json` — Capacitor configuration

## Key Conventions

- All JS functions exposed to `window` for inline `onclick` handlers (module script)
- RevenueCat init runs at DOMContentLoaded, then re-renders home with correct pro status
- Free tiers: Math K–2, Code K–2. Grades 3–8 require Pro
- State persisted to `localStorage` (stats, daily streak)
- Sound effects via Web Audio API oscillators (no audio files)

## Common Issues

- **RevenueCat not initializing**: Ensure API key is set and app is signed (not debug WebView)
- **Inline onclick not working**: Functions must be on `window` due to `type="module"`
- **Choices clipping**: `.ch-grid` uses `flex-direction:column` with `overflow:hidden`
