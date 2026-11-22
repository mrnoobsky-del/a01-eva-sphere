# A-01 v3.2.2 — Dependency audit for Offline Edition

**Audit type:** static inspection of the exact HTML and ZIP files materialized for this task.  
**Date:** 2026-11-22.  
**Status:** confirmed static findings; browser execution with network disabled is NOT TESTED.

## Audited artifacts

| Artifact | Size | SHA-256 |
|---|---:|---|
| eva-sphere-a01-v322-single-html-online.html | 1,657,936 bytes | `d352a4506bc543a349710d3a089edee1ffb48f70cc71ba0401b70681d47ff6e8` |
| a01-v3.2.1-navigation-flow-local-engine.zip | 403,161 bytes | `c13360485618de023c1725213f50e9328a9ea1075f9b3d8fb090034a730892a9` |
| a01-v3.2.2-single-html-online.zip | 385,055 bytes | `c5abcbb5f805cb9a31fef44e8609c6a4c422fab01b1bedb3757806b1c5956818` |

## Findings in v3.2.2 HTML

### Required 3D engine imports

The import map points to:
- `https://cdn.jsdelivr.net/npm/three@0.185.0/build/three.module.js`
- `https://cdn.jsdelivr.net/npm/three@0.185.0/examples/jsm/`

The main 3D entry point dynamically imports:
- `three`
- `three/addons/controls/OrbitControls.js`

These are mandatory for the primary 3D scene. The current v3.2.2 file is therefore not offline-capable.

### Additional relative JavaScript files

The HTML references these optional Living World scripts:
- `./modules/living-world/companion-motion.js`
- `./modules/living-world/companion-ai.js`
- `./modules/living-world/companions.js`

Each script tag has an `onerror` handler that removes the failed script element, so failure is currently non-fatal by markup design. The two supplied ZIPs do not contain this modules directory. For a faithful self-contained release, decide whether these modules are required features and either embed them in the bundle or document/test their graceful absence. Do not silently drop them if the current companion behaviour depends on them.

### Network service call

One explicit `fetch()` endpoint was found:
- `https://offvibe-bot.mrnoobsky.workers.dev/site`

This endpoint is used for the remote Eva chat. It must remain behind the Online Adapter and be unavailable in Offline mode with a clear UI state. It must not prevent the 3D core from starting.

### External links, not core dependencies

The document contains links/metadata referencing:
- `https://vibeshorts.ru/evasphere/`
- `https://yoomoney.ru/to/410015357551847`
- `https://schema.org` in structured metadata

These are not required runtime modules in this inspection, but navigation to external websites naturally requires connectivity.

### Local persistence observations

The HTML uses `localStorage` (21 source occurrences in this scan) and contains no IndexedDB reference. A presence scan is not a write/read verification. The Offline build must add a capability probe, verify real write/read behaviour, and include export/import fallback.

## Findings in v3.2.1 Local Engine ZIP

Archive contents were enumerated. Under `vendor/three/`, the archive contains only:
- `LICENSE.txt`
- `README.md`

It does **not** contain the Three.js module runtime or OrbitControls source. It also does not contain the referenced Living World `modules/` directory.

Therefore this ZIP is not a complete local-engine distribution. The fact that a launcher/README mentions a local engine is not evidence that the engine files are present.

## Findings in v3.2.2 Single HTML ZIP

The archive contains:
- `MANIFEST.json`
- `README_RU.md`
- `eva-sphere-a01-v322-single-html-online.html`

It has no offline engine payload. This matches its stated online-dependent purpose.

## Recommended engineering response

1. Use the v3.2.2 HTML as the source baseline for a dependency audit only; do not change the public/live site as part of this task.
2. Make the required Three.js + OrbitControls dependency a reproducible build dependency pinned to r185.
3. Bundle the main application module and OrbitControls at build time into one self-contained script with no runtime imports; do not rely on data-URL module import maps as the final compatibility strategy without browser proof.
4. Inventory the three Living World modules, decide whether each is required or optional, then bundle or gracefully disable with visible status.
5. Move the Eva Worker request behind a network adapter and ensure it never blocks the core.
6. Inventory any resources loaded indirectly by JS/CSS. Static scan of one HTML file cannot discover every computed URL or user-triggered loader.
7. Run an offline network test from a clean profile with the network disconnected before opening the file.
8. Ship exact tested artifacts, manifest hashes, and third-party licenses.

## Scan summary

| Signal | Static result |
|---|---:|
| HTML script elements | 12 |
| Inline module entry points | 1 |
| Import map CDN targets | 2 |
| Dynamic module imports | 2 |
| Relative companion scripts | 3 |
| Explicit fetch calls | 1 |
| IndexedDB references | 0 |
| localStorage source occurrences | 21 |

These counts are source-level observations, not runtime network telemetry.

## Acceptance status

- HTML parse / source inventory: **PASS**
- ZIP file listing and exact contents: **PASS**
- Complete offline payload: **FAIL** for the two supplied prior ZIP variants
- Browser launch with network disconnected: **NOT TESTED**
- Visual WebGL acceptance: **NOT TESTED**

This audit records why a dependency bundle and browser-level acceptance are required before using the Offline Edition label.
