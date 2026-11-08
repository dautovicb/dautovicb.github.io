# Bake It Big! privacy audit and release checklist

Status: Website publication authorized by the owner on November 8, 2026.
The release-level verification items below remain open; publication does not
establish completion of the audit or validate final App Store privacy answers.
Audit date: November 8, 2026. The Unity project and Unity tooling were not modified.

## Scope and evidence

Unity MCP was consulted first: editor_status identified `/Users/bera/bakery`,
Unity 6000.3.24f1, stopped editor. package_list returned 53 installed packages.
get_player_settings confirmed iPhone / IL2CPP and product `roomgame`, company
`DefaultCompany`. get_runtime_pipeline_settings reported enableInBuilds=false.
Read-only disk review then covered Assets C# sources and native plug-in file
patterns, package manifest/lock, ProjectSettings, and existing iOS export.
The bundle ID is `com.DefaultCompany.roomgame`. Confirm this project is the
release source for Bake It Big! before treating these findings as release facts.

This is static/configuration evidence, not an observed network capture. The
existing `build` export is not an authenticated final App Store archive.
Unity Dashboard, release-device traffic, provider retention and production
configuration were not verified. No assertion of zero personal data is justified.

## Detected SDKs, storage, and transmission

| Component | Evidence and data implications |
| --- | --- |
| Unity engine 6000.3.24f1 | Engine can process technical data; exact release diagnostics and automatic collection unresolved. |
| Built-in Analytics 1.0.0 | Installed; UnityConnectSettings global m_Enabled=0, Analytics m_Enabled=0, initializeOnStartup=1. PlayerSettings submitAnalytics=1 also exists. Do not equate these mixed/legacy flags with observed collection or a verified opt-out. No separate UGS Analytics/Core/Auth package found. |
| Crash/performance reporting | Legacy CrashReportingSettings and PerformanceReportingSettings disabled; enableCrashReportAPI=0. New Unity 6 Diagnostics defaults/build overrides and Dashboard must still be checked independently. No custom crash uploader found. |
| Ads / IAP | No Ads, mediation, Unity Purchasing, or other commercial runtime SDK in installed package list or Assets native plug-in scan. UnityConnect ads and purchasing disabled. No ad/purchase runtime API usage found. |
| Networking modules 1.0.0 | UnityWebRequest modules installed as engine capabilities. No custom HTTP/socket calls or runtime endpoints found in Assets C# review. UnityConnect has configured Unity event/config URLs, which do not prove requests occur. |
| Identifiers | No explicit deviceUniqueIdentifier, advertisingIdentifier, or identifier uploader found in game scripts. Final engine/native IDFV/IDFA behavior unverified. |
| Local SaveService | JSON versioned integer-key snapshot in PlayerPrefs under HybridCasual.<profileId> plus .backup; default autosave every 5 seconds, pause/focus/quit flush. Not encrypted by the game. |
| Gameplay data | Currency, cash, unlocks, upgrade levels, location/campaign/objective/mastery progress, tutorial and migration flags, pinned goal and audio-mute preference. LocationIncome stores local time/earnings state to calculate offline rewards, capped at two hours. Legacy currency/unlock PlayerPrefs read for migration. |
| GameplayEvents | In-process event bus; subscribers support local tutorial/goals/mastery/UI. Its “analytics seam” comment is not evidence of remote analytics. No network subscriber found. |
| Unity Pipeline 0.8.0-exp.1 | Development automation/runtime-capable package; MCP reports runtime disabled in builds. Verify final archive excludes active listener. |
| Cinemachine 2.10.7, Timeline 1.8.13, uGUI 2.0.0 / TextMeshPro | Camera, animation, UI functionality; no remote collection path identified in reviewed game integration. |
| Development tooling | Version Control 2.13.6, Multiplayer Center 1.0.1, IDE/test/profile/coverage and related packages. Editor/developer processing is distinct from player data. Multiplayer Center is not evidence of game networking. |
| Native plug-ins | No .dll/.a/.m/.mm/.swift, dependency XML, or xcprivacy files found under Assets using these patterns. This is not a binary linkage audit. |
| Existing iOS artifacts | build/Data/boot.config enables profiler and player connection to local development addresses; unsuitable as proof of production behavior. PrivacyInfo.xcprivacy declares boot time, disk space, UserDefaults, file timestamp API reasons. API-access declarations do not prove off-device collection; absence of collected-data entries does not prove no collection. |
| Support | Existing portfolio/Consciousness email bdautovic2@etf.unsa.ba is only a candidate. Confirm monitored privacy inbox, email provider, handling and retention. |

## Recommended App Store Connect answers (conditional)

Apple requires accounting for qualifying partner collection and defines collection
in terms of off-device transmission and retention beyond real-time servicing:
https://developer.apple.com/app-store/app-privacy-details/

- Do not submit a final “Data Not Collected” answer yet. If release testing and
  vendor verification establish no qualifying off-device collection, that answer
  may be appropriate; local-only PlayerPrefs does not itself require a label.
- If Unity sends retained device/installation identifiers, review Identifiers
  (Device ID and/or User ID as appropriate). Review Diagnostics (Crash Data,
  Performance Data, Other Diagnostic Data) for confirmed diagnostic payloads.
- If retained gameplay/session events are transmitted, assess Usage Data /
  Product Interaction and applicable Gameplay Content categories against the
  exact payload, not merely the event names in the local event bus.
- Assign App Functionality and/or Analytics only to actual verified uses. Check
  provider secondary uses, identifier linkage and retention before answering
  “linked to you.” No login does not establish unlinked data.
- No source evidence currently supports Purchase History, Advertising Data,
  Third-Party Advertising purposes, or tracking. Confirm final SDKs/provider uses
  before selecting final answers. Identifier collection alone is not tracking.
- For support, assess Email Address and Customer Support if collected through
  app functionality. External email and optional disclosures require evaluating
  Apple's exact scope and criteria; do not assume an exemption.
- Review Apple platform processing separately from developer/partner SDK
  collection. A privacy manifest is not a substitute for the privacy label.

## Required confirmations before publication

1. Is `/Users/bera/bakery` the Bake It Big! release project? Confirm final app
   name, bundle ID, version and SDK inventory for the exact submission commit.
2. Confirm effective date and monitored privacy email; the draft does not activate
   the candidate address or invent a release date.
3. Confirm intended ages, Kids Category, age rating and release regions. Assess
   applicable consent, children's safeguards and legal bases for actual processing.
4. Inspect Unity 6 Services > Diagnostics, each release build profile override,
   Dashboard Developer Data/Connections and any other linked services. Resolve
   submitAnalytics/startup settings using current engine documentation.
5. Inspect the signed release archive, linked binaries, Info.plist, entitlements,
   aggregated privacy report/manifests, required-reason APIs and tracking flags.
   Remove development profiler/player connections for the production build.
6. Capture physical-device release-equivalent traffic on fresh install, launch,
   gameplay, idle, background/resume, relaunch and a controlled crash. Identify
   requests, identifiers, payloads and consent behavior. Encrypted/unobserved
   traffic is inconclusive. Inspect local preferences/backups and deletion behavior.
7. Confirm actual recipients, provider roles/secondary uses, processing locations,
   transfer safeguards, retention periods, request/deletion procedures, security
   practices and any sale/sharing/tracking. Resolve support retention as well.
8. Confirm launch monetization. Repeat review and update policy/labels before
   adding advertising or IAP. Obtain required permissions/consents for actual uses.

## Sources checked

- https://unity.com/legal/game-player-and-app-user-privacy-policy
- https://docs.unity.com/en-us/cloud/developer-data/user-consent
- https://docs.unity.com/en-us/cloud/developer-data/configure-diagnostics-editor
- https://developer.apple.com/app-store/app-privacy-details/
- https://www.apple.com/legal/privacy/

Unity's current documentation treats diagnostics configuration independently of
consent APIs and other products. Do not infer new diagnostics status solely
from the disabled legacy crash flags. General provider policies describe possible
practices, not proof that this particular build sends a given payload.

## Website implementation

`bake-it-big-privacy-policy/index.html` uses the existing Consciousness CSS and
system fonts. It has no JavaScript, cookies, analytics, remote assets or new
dependencies. Canonical URL: https://dautovicb.github.io/bake-it-big-privacy-policy/
Vite has a separate entry and emits dist/bake-it-big-privacy-policy/index.html.
The policy follows the Consciousness page and keeps audit commentary in this report.
The page uses November 8, 2026 as its policy date and the existing developer contact
from Consciousness. Confirm the effective date and that the inbox is monitored
before publication. Resolve automatic processing and other release uncertainties
above before an authorized deployment.
Existing GitHub Actions deploys on main pushes. The owner subsequently approved
the page and explicitly requested deployment.

## Complete resolved package inventory (lock file)

- com.unity.cinemachine: 2.10.7
- com.unity.collab-proxy: 2.13.6
- com.unity.editorcoroutines: 1.1.0
- com.unity.ext.nunit: 2.0.5
- com.unity.feature.development: 1.0.2
- com.unity.ide.rider: 3.0.40
- com.unity.ide.visualstudio: 2.0.26
- com.unity.modules.accessibility: 1.0.0
- com.unity.modules.adaptiveperformance: 1.0.0
- com.unity.modules.ai: 1.0.0
- com.unity.modules.androidjni: 1.0.0
- com.unity.modules.animation: 1.0.0
- com.unity.modules.assetbundle: 1.0.0
- com.unity.modules.audio: 1.0.0
- com.unity.modules.cloth: 1.0.0
- com.unity.modules.director: 1.0.0
- com.unity.modules.hierarchycore: 1.0.0
- com.unity.modules.imageconversion: 1.0.0
- com.unity.modules.imgui: 1.0.0
- com.unity.modules.jsonserialize: 1.0.0
- com.unity.modules.particlesystem: 1.0.0
- com.unity.modules.physics: 1.0.0
- com.unity.modules.physics2d: 1.0.0
- com.unity.modules.screencapture: 1.0.0
- com.unity.modules.subsystems: 1.0.0
- com.unity.modules.terrain: 1.0.0
- com.unity.modules.terrainphysics: 1.0.0
- com.unity.modules.tilemap: 1.0.0
- com.unity.modules.ui: 1.0.0
- com.unity.modules.uielements: 1.0.0
- com.unity.modules.umbra: 1.0.0
- com.unity.modules.unityanalytics: 1.0.0
- com.unity.modules.unitywebrequest: 1.0.0
- com.unity.modules.unitywebrequestassetbundle: 1.0.0
- com.unity.modules.unitywebrequestaudio: 1.0.0
- com.unity.modules.unitywebrequesttexture: 1.0.0
- com.unity.modules.unitywebrequestwww: 1.0.0
- com.unity.modules.vectorgraphics: 1.0.0
- com.unity.modules.vehicles: 1.0.0
- com.unity.modules.video: 1.0.0
- com.unity.modules.vr: 1.0.0
- com.unity.modules.wind: 1.0.0
- com.unity.modules.xr: 1.0.0
- com.unity.multiplayer.center: 1.0.1
- com.unity.nuget.mono-cecil: 1.11.6
- com.unity.nuget.newtonsoft-json: 3.2.2
- com.unity.performance.profile-analyzer: 1.4.0
- com.unity.pipeline: 0.8.0-exp.1
- com.unity.settings-manager: 2.1.1
- com.unity.test-framework: 1.6.0
- com.unity.testtools.codecoverage: 1.3.0
- com.unity.timeline: 1.8.13
- com.unity.ugui: 2.0.0

Validation: npm run build passed; built HTML checked for unique IDs, valid internal anchors, canonical URL and absence of scripts. Browser visual QA was not performed.
