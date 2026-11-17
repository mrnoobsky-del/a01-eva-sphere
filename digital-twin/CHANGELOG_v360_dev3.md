# A-01 v3.6.0-dev.3 — Reproducible Reference Capture

**Base:** v3.6.0-dev.2 on `feature/a01-v360-visual-match-pass`.
**Status:** experimental visual candidate; not a stable release.

## Added
- Named camera preset: `A01_REFERENCE_ATRIUM_1200x675`.
- Visible capture control beside the reference-camera control.
- One-click export of a clean 1200×675 PNG from the WebGL canvas.
- Paired JSON camera manifest with timestamp, camera position, target, FOV, clipping planes, 16:9 aspect, renderer backend, pixel ratio, output color space and tone-mapping settings.
- Capture temporarily switches the renderer to a 1× pixel ratio and 16:9 camera projection, then restores the original canvas size, pixel ratio and camera aspect.
- Capture is blocked during camera flight so the saved frame is not an accidental intermediate view.

## Review notes
- PNG and JSON capture is a repeatable visual checkpoint, not an automatic pixel-match score.
- Camera coordinates are recorded from the actual camera at capture time; the user may orbit slightly after the preset and save a deliberate framing.
- No geometry, structural dimensions, or engineering assumptions are changed in this pass.
- Browser download and screenshot inspection still need a live interaction check.
