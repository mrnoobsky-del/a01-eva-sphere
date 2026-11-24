# A-01 v4.1.4 — Changelog

**Date:** 24 November 2026  
**Release type:** preserved previous clean-interface and initial Lottie release

## Added
- Lazy-loaded Lottie Web 5.13.0 with inline animation data and SVG renderer.
- One lightweight orbital animation used in the model-loading indicator and the restored welcome screen.
- CSS fallback when the Lottie CDN or player is unavailable.
- Reduced-motion and hidden-tab handling.

## Changed
- Restored the earlier A-01 first-visit welcome screen and its replay control.
- Introduced a new welcome preference key so returning from v4.1.3 shows the updated welcome again.
- Made the “do not show on future visits” checkbox a true persistent opt-out.
- Removed the bottom FPS/benchmark overlay and its 10-second test.
- Removed the public camera-rotation, model-rotation and stop-test buttons.
- Kept the normal reset-view control.

## Preserved
- Native adaptive pixel-ratio controller from v4.1.3.
- Geometry batching and feature-picking logic.
- Core 3D scene and interaction systems.

## Verification
Static source checks passed for the intended interface and code markers. The v4.1.3 3D scene previously loaded in the user's browser; direct v4.1.4 Lottie runtime testing is pending. No 60 FPS claim is made.

## Release status
v4.1.4 is preserved as a historical release. A-01 v4.9.0 is the current primary build in GitHub `main`; v4.1.3 remains preserved as the earlier stable scene snapshot.
