# A-01 v4.0.0 — Changelog

**Date:** 22 November 2026  
**Release type:** primary architecture baseline

## Added and changed

- Promoted the integrated digital-twin workspace to the primary v4.0.0 line in the repository.
- Replaced solid wedge-like module masses with hollow radial module construction.
- Split module geometry into floor, roof, inner partition, radial partitions and outer glazed façade.
- Added actual inner-wall entrance openings instead of placing door assemblies over a continuous wall.
- Moved both vestibule door planes inside the radial module depth.
- Rebuilt the door leaves as paired side-hinged swing panels; outer and inner gates operate sequentially.
- Re-aligned vestibule glazing, thresholds, door frames and upper panels with the opening.
- Centred the first-person walk path in the ring and derived camera eye height from avatar geometry.
- Added visible vertical-navigation markers and explicit UI labels for level transitions.
- Preserved the existing climate, energy, comfort, registry, shell-service and other conceptual workspace sections from the v3.1.6 source line.
- Added Russian and English release documentation, an architecture note and a reproducible static validator.

## Static verification

- 298 HTML IDs, with no duplicates.
- Seven executable inline JavaScript blocks passed Node.js node --check.
- Import map parsed as valid JSON.
- Required v4.0.0 metadata and geometry markers were present.

Run python tools/validate_a01_v400.py from the repository root to repeat the static checks.

## Known limitations

- No full browser/WebGL visual acceptance test was completed.
- No mobile/GPU compatibility testing was completed.
- No dimensional calibration, BIM/IFC or physical engineering validation is included.
- Navigation panels are software transition markers, not actual stairs or verified egress.
- Three.js 0.185.0 and OrbitControls load from jsDelivr; an internet connection and WebGL are required.
- The public uCoz site still reports v3.1.6 as of this release date; GitHub does not deploy to uCoz automatically.
