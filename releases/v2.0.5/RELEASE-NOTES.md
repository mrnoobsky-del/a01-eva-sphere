# A-01 v2.0.5 — Interactive Sphere & Mobile UX

Date: 2026-11-12

## Changes

- Reworked the main context panel on phones into a safe-area-aware bottom sheet with a bounded viewport height and its own vertical scroll area.
- Added wrapping and min-width safeguards for panel text, button rows, level lists, appearance controls, metadata grids and climate controls so they do not extend beyond narrow screens.
- Kept the tablet context panel as a bounded, independently scrollable side drawer.
- Added mobile viewport constraints and internal scrolling to the Documentation search dialog and Registry search/details panels embedded in the integrated workspace.
- Added labels to both the inner and outer faces of each 3D module. Labels face the viewer, only appear for the active/walked level or when the camera is close, and are hidden when their face points away from the camera.
- Selecting a 3D object now opens its existing information card. Selecting an object during walk mode does the same.

## Validation

- Source anchors were checked before modification and each scripted change was applied exactly once.
- Static checks confirm that the new mobile panel CSS, integrated-page dialog CSS, 3D label creation/visibility, and model-click information-card events are present.
- This remains a preview build. Device/browser visual testing, touch testing, and verification against the live uCoz page and Worker are still required before deployment.
