# Consciousness: Dimensions — privacy review

The page is a draft. Complete the source `TODO(privacy-...)` comments in
`consciousness-privacy-policy/index.html` before publishing it as the game's
final policy or linking it from App Store Connect. Replace pending-verification
paragraphs with verified disclosures, then remove the draft notice.

## Evidence available

This repository contains the React/Vite portfolio, not the game source. The
policy now also incorporates the game-project audit supplied by the owner on
2026-10-14. That audit reviewed source, serialized settings, installed package
cache, and available iOS artifacts. It did not verify Unity Dashboard settings,
actual network traffic, or the final submission archive. These findings have
not been independently re-audited from this website repository.

The supplied audit identified Unity 6000.3.24f1, Unity IAP 5.4.4,
Advertisement Legacy 4.19.0, and Services Core 1.18.0. It found:

- Local PlayerPrefs progress, currency, navigation, intro/campaign flags,
  ownership state, and legacy skin reads; no custom cloud-save implementation.
- Active IAP purchase intent, paid, failed, and fulfilled telemetry paths at
  `prd.insights.analytics.unity3d.com/v1/ingest/producer`. Payloads include
  transaction/receipt data, device information, IDFV, and installation/session
  identifiers, with some values conditional on availability.
- A conditional settings request to
  `insights.unity3d.com/v1/get-connections-settings`.
- Engine analytics enabled and configured to initialize at startup, without
  custom gameplay events or a separate UGS Analytics package. Actual automatic
  engine transmission remains unverified.
- Disabled ad and crash/diagnostic settings and no ad calls/custom crash
  uploader in reviewed game scripts. An Ads SDK is still installed; IDFA
  collection, final native inclusion, and tracking remain unverified.
- Automatic menu purchase/product fetching and a local entitlement flag.
  No explicit raw-receipt persistence or receipt-validation backend in game
  code; the SDK accesses richer data and stores hashed transaction records.

The public page summarizes these findings without equating source transmission
paths with observed successful uploads. It does not infer anonymity from the
absence of login, or label identifier collection as tracking without evidence.
The contact email comes from `src/App.jsx`.

References checked for provider disclosures:

- https://www.apple.com/legal/privacy/data/en/app-store/
- https://developer.apple.com/in-app-purchase/
- https://developer.apple.com/app-store/app-privacy-details/
- https://docs.unity.com/en-us/iap/privacy-and-consent/overview
- https://unity.com/legal/game-player-and-app-user-privacy-policy

## App Store Connect

The supplied audit does not support selecting “No, we do not collect data from
this app” for the current implementation. Account for qualifying third-party
SDK collection. Review Identifiers, Purchase History, Product Interaction,
and applicable diagnostic/other data categories against confirmed payloads,
uses, linkage, and tracking. The bundled IAP manifest's empty collection list
conflicts with inspected telemetry; it is not proof of no collection.

Do not copy a completed privacy label from this draft. Final answers must match
the release implementation and provider uses. Disabling Analytics or Diagnostics
alone does not eliminate the inspected independent IAP telemetry paths.

## Required verification

- Inspect the Unity Dashboard project
  `90066ce8-6407-4b29-80bf-6149c71cb032` (Interdimensional 2) and each relevant
  environment. Check Analytics, Diagnostics, IAP reporting, and Connections /
  data-collection settings. Confirm identifiers, recipients, retention,
  secondary uses, legal bases, and Unity's processor/controller roles.
- Verify iOS Editor settings and resolved dependencies in a disposable checkout.
  Resolve the audited manifest/lock discrepancies for UGUI (2.6.0 vs 2.0.0)
  and Multiplayer Center (2.0.1 vs 1.0.1).
- Inspect the exact submission archive: linked frameworks/SDKs, Info.plist,
  entitlements, privacy manifests/report, Ads inclusion, tracking declarations,
  and required-reason API declarations.
- Capture release-equivalent physical-device traffic from the menu: fresh
  launch, idle/background/resume, gameplay, cancelled/successful purchases,
  restore, and relaunch. Verify purchase and configuration payloads and engine
  analytics. Encrypted or uncaptured traffic is inconclusive. Check IDFV/IDFA,
  identifier linkage, consent/opt-out controls, and any secondary uses.
- Inspect device preferences, purchasing directories, identifiers, transaction
  records, logs, backups, and uninstall behavior before/after tests. Test crash
  delivery separately in a controlled build.
- Confirm processing locations, safeguards, retention/deletion for each data
  type and support correspondence. Establish request routing for Unity IAP
  data processed on the developer's behalf versus Unity's own processing.
- Confirm the intended age audience, App Store age rating, Kids Category
  status, release regions, and any applicable consent or children's data rules.
- Confirm applicable privacy rights, request procedures, and international
  transfers for the actual release regions and practices.
- Confirm `bdautovic2@etf.unsa.ba` is monitored and appropriate for game privacy
  requests. Replace it if needed with a verified address.
- Add the policy's effective date and update/notification process. Align the
  final policy with App Store Connect privacy answers and the released game.

## Routing and deployment

Vite builds the portfolio and the static policy as separate HTML entries. The
policy is emitted at `dist/consciousness-privacy-policy/index.html`; it needs no
JavaScript or SPA fallback. GitHub Pages resolves the directory at
`/consciousness-privacy-policy` (normally redirecting to its trailing-slash URL),
including direct navigation and refresh. Vite rewrites the CSS paths for the
nested page. The canonical URL uses the requested path without a trailing slash.

Run `npm ci` and `npm run build`. The existing GitHub Actions workflow publishes
`dist` on pushes to `main`; no workflow change is needed. No deployment or push
is part of this change. After a separately authorized deployment, check both
forms of the policy URL on the live site and refresh the page.
