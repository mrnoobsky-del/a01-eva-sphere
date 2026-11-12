# A-01 v2.0.5 — welcome overlay and compact navigation

Date: 2026-11-12

## Changes
- Moved the first-visit welcome presentation into the primary page stylesheet so it behaves as a true fixed, full-viewport dialog rather than flowing below the 3D workspace.
- Added explicit overlay stacking, backdrop blur, dialog layering, and responsive viewport sizing. The 3D sphere remains behind the welcome screen and is revealed after dismissal or a selected destination.
- In collapsed desktop navigation, hide section headings as well as item labels; center icon-only controls and prevent text overflow.
- Bumped the welcome dismissal key to v2.0.5 so visitors who encountered the previous broken presentation can receive the corrected welcome once.

## Validation
- Static source checks: primary stylesheet contains the welcome overlay rules; compact rail hides section labels and text; existing navigation actions remain unchanged.
- Browser visual, keyboard, mobile, and first-visit persistence tests are still required. This is a proposed preview build and is not deployed to production.
