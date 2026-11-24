# A-01 v4.9.0 — Changelog

**Date:** 24 November 2026  
**Release type:** digital-twin quality and runtime-hardening release

## Added
- Contextual Lottie animation for the active exterior LED-cassette service demonstration.
- Lottie player timeout, API validation and alternate-CDN fallback.
- Explicit animation cleanup for the loading overlay.
- WebGL context-loss and context-restoration handling.
- A reusable runtime error panel with a retry action.
- Welcome-dialog keyboard focus containment and focus restoration.
- Resize fallback for environments without ResizeObserver.

## Changed
- Continuously animated scene work is capped at 60 Hz; stationary scene updates remain demand-driven.
- Loading, welcome and service animations are lazy and pause when the tab is hidden.
- Updated all user-facing build labels and HTML version metadata to 4.9.0.
- Updated the self-canonical, Open Graph, Schema.org and share URL for each of the three originals.

## Preserved
- Three.js 0.185.0 scene, feature picking, geometry batching and LOD.
- Native adaptive pixel-ratio controller.
- Restored first-visit welcome and opt-out/replay preferences.
- Removal of the public FPS overlay, 10-second benchmark control and rotation-test buttons.
- Historical v4.1.4, v4.1.3 and v4.0.0 snapshots.

## Verification
Static JavaScript syntax, embedded JSON, duplicate-ID, version-metadata, SEO URL and removal checks passed for the three HTML outputs. Browser/device verification of this release is pending. A 60 Hz cap is not a measured 60 FPS result.
