# A-01 v4.1.4 — Changelog

**Date:** 24 November 2026  
**Release type:** clean-interface and Lottie preview

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
Static source checks passed for the intended interface and code markers. Browser/Lottie runtime testing is pending. No 60 FPS claim is made.
