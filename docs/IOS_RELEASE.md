# iOS with Capacitor and Codemagic

Android continues to use `bash build-release.sh` (or your existing Gradle
`bundleRelease` command). No Expo project or migration is involved.

## 1. Apple and RevenueCat setup

Create a **new** Apple app for mnmoo, separate from Sa Re Ga Ma:

- Bundle identifier: `com.mnmoo.firstgradelearninggames`
- Name: `Mnmoo First Grade Games`
- Devices: iPhone and iPad; minimum iOS 15
- Category: Education

In the existing mnmoo RevenueCat project, add an **App Store app** using that
bundle identifier and connect its App Store credentials. Google/Amazon keys
cannot configure Apple purchases. Copy the Apple **public SDK key** (`appl_...`).
Never embed RevenueCat secret keys or Apple private keys in the HTML.

Create Apple products (Google products do not automatically exist on Apple):

| Apple product ID | Apple type | RevenueCat package |
| --- | --- | --- |
| `mnmoo_pro_monthly` | Auto-renewing subscription, one month | `$rc_monthly` |
| `mnmoo_pro_yearly` | Auto-renewing subscription, one year | `$rc_annual` |
| `mnmoo_pro_lifetime` | Non-consumable | `$rc_lifetime` |

Put monthly/yearly in the same subscription group. Set prices, availability,
localizations, and optionally the monthly introductory trial in App Store Connect.
Import the Apple products into RevenueCat, attach all three to **`mnmoo_pro`**,
and map them to the current offering's packages alongside the Android products.
The older AGENTS.md entitlement examples differ from the current code; do not
create a second entitlement using those old names.

iOS displays localized store prices and neutral subscription labels; it does not
promise every customer a free trial or a fixed savings percentage. Apple handles
any configured, eligible introductory offer in its purchase sheet.
There is no app login, so sharing a RevenueCat project does not automatically
transfer anonymous Android purchases to iOS. Apple restore restores Apple purchases.

## 2. Codemagic setup (no local Mac required)

1. Connect this repository to a Codemagic **personal account**. Select YAML
   configuration. Workflows use `mac_mini_m2`; no automatic push triggers are set.
2. Run **ios-simulator** first. It requires no Apple signing credentials or
   RevenueCat key. It compiles the native app and launches it on available iPhone
   and iPad simulators, saving screenshots. Purchases are intentionally unavailable.
3. Add an App Store Connect API integration named **`mnmoo-app-store-connect`**.
   Follow Codemagic's signing instructions to supply an Apple distribution
   certificate and App Store provisioning profile for the bundle ID. Ensure
   the Apple app identifier supports In-App Purchase.
4. Create environment group **`mnmoo_ios`** and set **`RC_APPLE_API_KEY`** to
   the Apple public SDK key. Do not set `IOS_SIMULATOR_BUILD` in this group.
5. Run **ios-testflight**. It tests routing, builds assets, syncs only iOS,
   creates branded icons, applies signing, archives an IPA, and uploads it.
   Build numbers use this workflow's incrementing `BUILD_NUMBER + 1`; if migrating
   this workflow to another Codemagic app, adjust to exceed prior uploaded numbers.
6. In App Store Connect, complete export-compliance information if requested,
   then add internal testers. External testers require TestFlight beta review;
   complete beta details and submit there. The YAML deliberately does not submit
   beta/public reviews automatically or publish a public release.

The cloud workflow creates the final iOS app icon/launch images from the existing
`games/assets/pcmnmooappicon512.png`; review branding in the simulator screenshots.
The native template assets are overwritten before either cloud build.

## Commands

```bash
npm run test:ios
# Simulator web assets + native sync (works on Linux; Xcode compilation is in cloud):
IOS_SIMULATOR_BUILD=1 npm run ios:sync
# Signed-build assets; set RC_APPLE_API_KEY in your environment first:
npm run ios:sync
```

The Apple key is injected only into generated `www/index.html`; the source
`index.html` retains an empty default. Your normal Android build regenerates
`www/index.html` from source. Do not commit generated Apple-key changes to `www`.
Dependencies use Swift Package Manager; CocoaPods is not required.

## Release checklist and limitations

- Inspect both simulator screenshots. A successful launch is a smoke check, not
  proof that every game, audio path, purchase, or interaction works.
- Invite iPhone/iPad testers through TestFlight. Verify every listed game, touch,
  portrait/landscape, audio, background/resume, all three purchases, restore after
  reinstall, cancellation, expiration, and unavailable-network behavior.
- Set working privacy-policy, support and terms URLs; add visible legal links and
  renewal disclosures before public submission. Audit `privacy.html` against actual
  SDK data collection: its current blanket offline/no-data statements need review.
- Complete screenshots, age rating, privacy disclosures, product review information,
  tax/banking agreements, and App Store metadata. General Education classification
  does not remove obligations arising from the app's child audience.
- Games currently request Google Fonts and some remote sprites. Verify offline
  behavior rather than describing the app as entirely offline.
- Native compilation/signing and purchase behavior cannot be verified on the local
  Linux machine. Treat the first cloud build and TestFlight checks as required.

References:
- https://docs.codemagic.io/yaml-quick-start/building-an-ionic-app/
- https://docs.codemagic.io/yaml-code-signing/signing-ios/
- https://www.revenuecat.com/docs/getting-started/installation/capacitor
- https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/
