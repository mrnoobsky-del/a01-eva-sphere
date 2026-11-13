# A-01 v2.0.13 — Integrated site workspace snapshot

## Purpose

This is an archived HTML snapshot of the integrated Eva Sphere workspace page at `/evasphere/`. It is a separate snapshot track from the main digital-twin baseline **v2.1.0** in `digital-twin/`; v2.0.13 does not replace or supersede that baseline.

## Included work

- Responsive integrated workspace with the existing model, five levels, 60 conceptual modules, navigation rail, contextual panels and light/dark themes.
- Independently collapsible information panels. Their collapsed state is saved locally in the browser.
- Collapsible LED sky controls with automatic local time, morning, day, sunset and night presets, plus a 90-second accelerated day cycle.
- Object discovery cards and a detail sheet with the object's level and ID, conceptual equipment, related systems and connected spaces.
- Walk-to-object interaction: selecting a module in walk mode or using the approach action sets a destination on the internal circular gallery. The object card appears on arrival; proximity detection can also show it during manual exploration.
- Energy and climate concept controls retained in the integrated workspace.
- Adjustments to the visitor scale and module/level geometry carried forward in this snapshot.

## Static checks performed

- All four executable JavaScript blocks passed `node --check`.
- 182 HTML element IDs were inspected; no duplicate IDs were found.
- The HTML file is 1,270,033 bytes.

## Not verified

- A full browser/WebGL visual run was not completed for this archive.
- Live uCoz macro expansion, production Worker connectivity, mobile-device behavior and deployment to the public site have not been independently verified as part of this GitHub commit.
- Three.js and related modules are loaded from the configured CDN, so the page requires network access.

## Concept and navigation limitations

A-01 remains a conceptual digital twin, not a built facility, BIM-validated model, construction package or certified safety design. The walk-to-object behavior follows the conceptual internal gallery; it is not general-purpose NavMesh navigation through every room. Energy, climate and equipment values are preliminary concepts and require qualified engineering work before any real-world use.
