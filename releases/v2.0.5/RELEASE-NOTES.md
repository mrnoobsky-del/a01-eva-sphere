# A-01 v2.0.5 — welcome inside the workspace

Date: 2026-11-12

## Changes
- Reworked the first-visit welcome from a viewport-wide modal into an in-workspace welcome panel, constrained to the central Sphere workspace.
- Moved the welcome markup into .workspace-main, alongside the 3D stage; the stage retains its layout footprint on desktop while being visually hidden during welcome mode.
- Replaced the dimmed full-screen backdrop with a contained pearl/graphite panel that follows the active theme.
- Rebuilt the three navigation choices as consistent responsive action cards with aligned icons, titles, descriptions, and arrows.
- On narrow mobile layouts, the welcome becomes a normal full-width workspace section rather than an overlay.
- Opening and closing the welcome toggles a dedicated app-shell state class. Existing navigation destinations and the v2.0.5 first-visit key remain intact.
- Retained compact-navigation fixes: collapsed rail hides headings and labels and displays centered icons only.

## Validation
Static source checks passed: welcome markup is inside .workspace-main; final welcome layout is contained, not viewport-fixed; open/close toggles welcome-mode; responsive cards and compact-nav rules are present. Browser visual and interaction testing remains required. Not deployed to production.
