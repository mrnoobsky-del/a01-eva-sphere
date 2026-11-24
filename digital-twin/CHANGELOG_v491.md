# A-01 v4.9.1 — Changelog

**Date:** 24 November 2026  
**Release type:** interaction and UI feedback patch

## Added
- Explicit touch activation for 3D scene selection on primary-finger release.
- A short post-touch guard to prevent the browser's synthesized click from selecting the same object twice.
- A drag-click guard so orbit gestures do not accidentally open object details.
- Shared pressed-state feedback for buttons, links, tabs, switches, selects and common form controls.
- One-shot Lottie feedback for UI activations and successful 3D object selection, reusing the lazy lottie-web 5.13.0 loader.
- A lightweight CSS ripple fallback when Lottie cannot load.
- Keyboard-triggered UI feedback positioned at the center of the focused control.

## Preserved
- Existing Three.js 0.185.0 scene, raycasting, object-detail dialogs, floor navigation, walking controls, LOD and geometry batching.
- Existing loading, welcome and LED-cassette service Lottie scenarios.
- Reduced-motion preference: interaction Lottie is skipped when prefers-reduced-motion: reduce is active.
- Existing v4.9.0 files and historical release snapshots are unchanged.

## Verification
- Source-level checks confirm all three HTML variants contain the touch activation guard, drag guard, UI event delegation and Lottie feedback entry point.
- Browser/device acceptance is still required for real touch hardware, mouse gestures, keyboard activation, CDN fallback and WebGL restoration.
- This patch does not claim measured 60 FPS. It retains the existing 60 Hz frame cap.
- CDN loading remains an online dependency; this is not an offline release.
