# A-01 v3.3.0 Offline HTML — Build Report

**Artifact:** `eva-sphere-a01-v330-offline.html`  
**Build profile:** Single HTML / local runtime  
**Status:** prepared; static checks passed; browser offline acceptance not yet performed.

## Artifact

- [Single HTML file](./eva-sphere-a01-v330-offline.html)
- [Build manifest](./BUILD-MANIFEST.json)
- Git blob SHA-1: `3d56424ec6d1a073bf2d34a607312b5e47409595`
- File size: 3,717,766 bytes
- Embedded engine bundle: 2,129,276 characters

## What is embedded

- Three.js r185 core.
- Three.js r185 module exports.
- OrbitControls from Three.js r185.
- Existing A-01 main 3D scene and application code.
- Existing integrated documentation/registry pages and their CSS data.
- Three.js MIT license notice.

The Three.js core and module declarations are wrapped in isolated closures. The main A-01 module receives `THREE` and `OrbitControls` through `globalThis.__A01_OFFLINE_ENGINE__`. The runtime bundle has no remaining ESM import/export statements.

## Static verification performed

| Check | Result |
|---|---|
| Engine bundle JavaScript syntax | PASS |
| Main application module syntax after import replacement | PASS |
| Engine import statements | 0 |
| Engine export statements | 0 |
| HTML script src attributes | 0 |
| Import map | Removed |
| Three.js CDN references | 0 |
| Duplicate DOM IDs | 0 |
| Unique DOM IDs | 319 |
| Embedded license notice | Present |

The syntax checks were performed by compiling both script bodies in a JavaScript parser. This is not a rendering or browser-startup test.

## Network-only features

- Eva chat still uses the Cloudflare Worker endpoint. It is invoked only when the user sends a message; the 3D core does not require it.
- External web and payment links remain external destinations and need connectivity when opened.

No secrets or API keys are embedded.

## Optional Living World modules

The source HTML references three optional files that were absent from the supplied source package:
- `companion-motion.js`
- `companion-ai.js`
- `companions.js`

The original source marked these scripts as optional using `onerror="this.remove()"`. Their file requests have been removed from the standalone build. The missing files are recorded in the build manifest. Their functionality is not claimed as included; supply their real source files if those companion features are required.

## Not yet verified

- Double-click launch through `file://` in Chrome/Edge/Firefox.
- First launch with the network disabled before opening the file.
- Actual WebGL renderer creation and visual display.
- Camera controls, object inspection, sidebar width behaviour, and local persistence in a real browser.
- No uCoz deployment was made.

## Acceptance instruction

Open the HTML in a modern desktop browser with Wi-Fi/network disabled before launch. Confirm the 3D scene renders, move the camera, open and close an object, expand/collapse the sidebar, and inspect the browser console and Network panel. Record PASS/FAIL/NOT TESTED for every item in `ACCEPTANCE-MATRIX_RU.md`.

Until this browser run is complete, this artifact is a statically validated offline candidate, not a fully browser-accepted release.

## Дополнительная проверка runtime

После статической проверки сам встроенный engine bundle был выполнен в изолированной среде JavaScript без DOM:
- инициализация bundle: **PASS**;
- `THREE.REVISION`: `185`;
- `THREE.WebGLRenderer`, `Scene`, `PerspectiveCamera`, `BufferGeometry`, `MeshStandardMaterial`: доступны;
- `OrbitControls`: доступен.

Это подтверждает, что модуль Three.js собран и его экспорты создаются без ESM-загрузчика. Это по-прежнему не проверка создания WebGL-контекста, рендеринга canvas или пользовательского интерфейса в браузере.
