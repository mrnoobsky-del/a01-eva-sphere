# A-01 v3.2.6 — Runtime audit and startup guards

**Date:** 2026-11-13  
**Release type:** Experimental standalone prototype  
**Status:** Archived for research; not merged into the v2.1.0 main digital-twin baseline; not deployed to the project website.

## Included

- Single-file HTML prototype with a light interface and Three.js 0.185.0 loaded through the browser import map.
- Five conceptual levels and 54 program spaces, including six larger zones in the upper crown (L04).
- Geometric area estimates and a built-in geometry audit.
- Conceptual vertical circulation: two lift shafts, ten lift landing/door sets, four stair connections, five gallery bridges and room-entry portals.
- Runtime error messaging for startup and render-loop failures, plus handling for a lost WebGL context.
- Metric-panel updates use DOM text nodes rather than replacing the metric container's HTML.

## Checks performed before archiving

- Inline JavaScript module passed Node.js syntax validation.
- Static scan found no duplicate HTML IDs.
- Static scan found no remaining bare `portalGlass` identifier; the material is referenced as `portalGlassMaterial`.
- File size and expected HTML structure were checked.

## Not verified

- A full live browser session with a real WebGL graphics context.
- Visual correctness, mobile touch behavior, browser compatibility, GPU performance, or restoration after WebGL context loss.
- Physical scale calibration. All dimensions and areas remain in model units, not verified metres or square metres.
- Real-world stair, lift, accessibility, structural, fire-safety, evacuation or building-code compliance.

The in-model route audit checks the connectivity of the prototype's logical graph and the presence of generated scene objects. It is not a physical navigation, collision, accessibility or life-safety validation.

## Lineage and use

This is an experimental continuation of the v3.1 interiors study and subsequent v3.2 geometry/circulation prototypes. Keep it separate from the v2.1.0 baseline until it has been compared, browser-tested and deliberately merged.

The A-01 physical complex is a concept, not a built or certified facility. Any real-world implementation requires qualified architecture and engineering work, site-specific calculations, regulatory review and independent safety verification.
