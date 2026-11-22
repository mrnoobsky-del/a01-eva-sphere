# A-01 v3.3.0 — Offline Digital Sphere Architecture

**Status:** architecture specification and implementation plan. This document does not claim that a fully offline build has shipped or passed acceptance.

## Goal

The A-01 digital twin must remain usable without an external network. Connectivity should extend the experience, not be a prerequisite for launching the 3D scene, navigating the model, inspecting objects, or reading bundled project knowledge.

Primary scenario: disconnect the computer from the network, double-click one HTML file, open the A-01 digital Sphere, inspect and navigate the model, use local reference material, and export available local data.

## Offline core requirements

1. Launch from file:// without a local server, BAT launcher, CDN, or external JavaScript module.
2. Preserve the current 3D scene, camera controls, navigation, responsive layout, and immersive object-study flow.
3. Include the local object registry, levels, engineering references, and required media assets.
4. Show a truthful Offline state and degrade gracefully when optional services are unavailable.
5. Keep local data separate from server synchronization and cloud-only functions.
6. Produce reproducible builds with an asset manifest, third-party notices, hashes, and acceptance evidence.

## Architecture layers

### A-01 CORE

Local runtime, UI, 3D engine, camera/input, object registry, local data model, help, settings, and diagnostics.

### World Runtime

Character/companion modules, movement, object interaction, local Eva behaviours, and other optional agents. Each module must have an explicit startup contract. Failure of an optional agent must not prevent the base scene from loading.

### Local Knowledge

Bundled object descriptions, levels, engineering subsystems, procedures, and local search/navigation. External links must be identified as network-only. Local copies of third-party documents may be included only when licensing and version provenance are clear.

### Local Data

Settings, notes, selected objects, local tasks, and exportable state snapshots. Browser persistence under file:// is not sufficiently uniform to assume that localStorage or IndexedDB will behave identically everywhere. Probe storage at runtime, verify writes, show the actual persistence status, and provide JSON export/import. Never report a save as successful without confirmation.

### Online Adapter

A separate network adapter for the Cloudflare Worker/Eva service, sync, updates, and external services. Every network operation needs timeouts, error handling, and an offline fallback. Local user data must not be uploaded without an explicit user action.

### Optional Local AI

A separate optional module for an on-device language model. It is not part of the minimum HTML core: model weights, compute requirements, and a local inference runtime are separate deliverables. Offline core mode may provide local knowledge search and deterministic assistant functions; it must not pretend that a cloud LLM is running locally.

## Delivery profiles

### 1. Single HTML Offline

Primary target. At build time, source ES modules, including Three.js and the required controls, are compiled into one self-contained JavaScript bundle with no external runtime imports. Embed that bundle in the HTML. Required static assets must be embedded as data URLs/inline payloads or generated procedurally. The build must enumerate and reject any remaining mandatory external file.

A CDN import map or a relative vendor path is not, by itself, a verified single-file offline build. Acceptance requires zero mandatory network requests.

### 2. Portable Offline Pack

A separate archive containing HTML, local libraries, media, documentation, licenses, an asset manifest, and a validation launcher. If browser restrictions or resource size make double-click launch unreliable, the pack may offer a local-server launcher as an alternate profile. This does not replace Single HTML acceptance.

### 3. PWA / Hosted Offline

A separate HTTPS deployment using a Service Worker and offline caching. A Service Worker belongs to a hosted secure origin and is not a mechanism for running a local file:// page. PWA is an additional distribution channel, not a substitute for the standalone HTML.

## Build and module requirements

- The embedded runtime must not perform network imports.
- Pin all dependency versions and ship their licenses/notices.
- Scan HTML, CSS, and JavaScript for script/module src, CSS url(), texture/model/font/audio loaders, fetch(), XHR, WebSocket, workers, and dynamic imports.
- Network integrations are optional and must never block core startup.
- Missing WebGL must produce a clear capability diagnostic, not a misleading CDN/engine-download error.
- Failure of an optional module must not stop the main UI.
- Include a version manifest, SHA-256 hashes for build assets, and a third-party license report.

## Offline/online capability matrix

| Capability | Offline | Online |
|---|---|---|
| 3D scene and camera | Yes | Yes |
| Navigation and object inspection | Yes | Yes |
| Bundled knowledge base | Yes | Yes |
| Local settings and export | Yes, subject to storage probe | Yes |
| Cloud Eva chat | No | Yes |
| Server synchronization | No; keep changes local | With user consent |
| Local LLM | Only with separate installation | Optional |
| External links/services | No | Yes |

## Persistence and synchronization

1. Probe localStorage, IndexedDB, and actual read/write access at startup.
2. Display an accurate state: persistent storage available, export-only, or storage unavailable.
3. Provide JSON export/import with schema and version validation.
4. Make network synchronization a distinct user action.
5. Create a backup before migrations or synchronization.
6. Do not silently overwrite conflicts; present a resolution path or preserve both versions.

## Security

- Never embed secrets, API keys, or private tokens in the HTML.
- Never upload notes, history, or tasks automatically.
- Label external actions and links as network-dependent.
- Validate imported JSON against schema, size limits, and allowed fields.
- Prefer pinned, verifiable build artifacts for local resources.
- Ship third-party notices and source licenses.

## Implementation phases

**Phase 0 — Baseline:** freeze the source version, inventory imports/assets/features, record sizes and hashes.

**Phase 1 — Dependency audit:** scan HTML/CSS/JS for URLs, imports, src/href, CSS url(), fetch, XHR, WebSocket, Worker, fonts, images, models, audio, and video.

**Phase 2 — Bundle:** create a reproducible pipeline with pinned toolchain and dependencies; produce one self-contained runtime bundle without runtime imports.

**Phase 3 — Asset packaging:** embed all mandatory resources and remove network-blocking loaders.

**Phase 4 — Local data:** implement capability probes, persistence status, JSON export/import, and schema versioning.

**Phase 5 — Network isolation:** move server functions behind the Online Adapter and verify graceful offline behaviour.

**Phase 6 — Acceptance:** run real browser tests in Chromium/Edge and Firefox, including first launch after disconnection and a clean browser profile.

**Phase 7 — Portable/PWA:** package the alternate archive and separately document HTTPS/PWA deployment.

## Single HTML acceptance criteria

- The file opens by double-click with the network already disconnected.
- DevTools Network shows no mandatory HTTP(S) requests; optional network features fail gracefully and are clearly identified.
- The 3D scene renders without “failed to load 3D engine”.
- Camera, navigation, level selection, object inspection, and UI restoration work.
- Expanding the desktop sidebar narrows the central viewport instead of covering it.
- No JS errors caused by missing modules or assets.
- WebGL availability and unsupported-WebGL behaviour are tested.
- Persistence is tested across close/reopen; when stable browser storage is unavailable, the UI offers export.
- The artifact includes version, SHA-256, dependency inventory, and license notices.
- Acceptance evidence records browser, OS, date, and actual network logs.

## Test matrix

At minimum:
- Chrome/Chromium and Edge on Windows;
- Firefox on Windows;
- Chromium on Linux;
- current desktop browsers on macOS;
- mobile Safari/Chrome separately, because local-file access and persistence have additional platform constraints.

Each test must be labelled **PASS**, **FAIL**, or **NOT TESTED**. Static code checks are not proof of a successful visual browser launch.

## v3.3.0 status

- Architecture and acceptance requirements are documented.
- A complete offline build has not yet been verified.
- v3.2.2 remains the online-dependent CDN variant.
- The previous local-engine ZIP must not be called offline-ready until all libraries and required assets are confirmed inside it.
- uCoz deployment is outside this task and is not performed automatically.

## Licensing

Core engine: [Three.js](https://github.com/mrdoob/three.js), MIT license. Preserve LICENSE and notices for every bundled third-party component. Pin dependency versions in the manifest; do not use floating latest URLs.
