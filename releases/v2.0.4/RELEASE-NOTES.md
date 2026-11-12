# A-01 v2.0.4 — First-visit welcome and orientation

Date: 2026-11-12

## Changes

- Added a first-visit welcome screen that explains what A-01 is and offers three clear starting points: explore the Sphere, talk to Eva, or read the project documentation.
- Added a concise development-status disclaimer so conceptual plans are not mistaken for built facilities.
- Added a “Later” action and a close control. Dismissal is remembered in local browser storage so the welcome screen does not interrupt returning visitors.
- The three actions reuse the existing navigation destinations; no duplicate chat backend or documentation system is introduced.
- Responsive layout adapts the welcome panel, text sizes, and touch targets for desktop and mobile.

## Validation status

Static source checks confirm the welcome markup, three navigation destinations, first-visit storage key, and responsive rules are present. Browser visual testing, first-visit persistence testing, and end-to-end checks of the three navigation actions are still required. This is a preview build, not a production deployment.
