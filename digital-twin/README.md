# Digital Twin

## Live website continuation — A-01 v3.1.9 Immersive Object Study

- [Russian documentation](README_RU_v319.md) · [English](README_v319.md) · [简体中文](README_ZH_v319.md)
- [Object-study report](../releases/mainline-v3.1.9/OBJECT-STUDY-MODE-REPORT_RU.md) · [Release overview](../releases/mainline-v3.1.9/README_RU.md) · [Changelog](CHANGELOG_v319.md)

v3.1.9 continues the live v3.1.6 website scene and the prepared v3.1.7/v3.1.8 mainline work. It adds immersive full-screen object study with camera focus, hidden workspace controls and a return path that restores the prior context panel. Automated tests pass; headless browser visual acceptance remains pending. Not deployed to uCoz.

## Live website continuation — A-01 v3.1.8

- [Russian documentation](README_RU_v318.md) · [English](README_v318.md) · [简体中文](README_ZH_v318.md)
- [Spatial coordination report](../releases/mainline-v3.1.8/SPATIAL-COORDINATION-AND-CLASH-AUDIT_RU.md) · [Release overview](../releases/mainline-v3.1.8/README_RU.md) · [Changelog](CHANGELOG_v318.md)

v3.1.8 is based on the live website v3.1.6 and the prepared v3.1.7 Agent Runtime integration. It reconciles selected route, door/stair, service logistics, MEP/HVAC, atrium tower and gallery interfaces. This v3.1.8 build is the previous spatial-clearance step of the separate website track; it is not yet deployed to uCoz. Static/analytic checks pass; live browser/WebGL and hardware acceptance remain pending.

## Live website line — A-01 v3.1.7 (separate build track)

- **Published website baseline:** v3.1.6, build `3.1.6-gullwing-crown-vent-calcs`, checked 22 November 2026 at [evasphere.usite.pro](https://evasphere.usite.pro/).
- **Prepared continuation:** v3.1.7 integrates Android-01 Agent Runtime into the existing `EVA_SPHERE` scene and preserves the current Sphere geometry.
- [Russian documentation](README_RU_v317.md) · [English documentation](README_v317.md) · [简体中文文档](README_ZH_v317.md) · [Changelog](CHANGELOG_v317.md) · [Integration report](../releases/mainline-v3.1.7/INTEGRATION-REPORT_RU.md).

This is the website's own version track and must not be confused with the GitHub integrated digital-twin build v3.7.0 or the standalone v3.8.0 interior blockout. v3.1.7 is a prepared prototype, not a deployed uCoz update. The current GitHub branch publishes its documentation; the full HTML/source package is supplied separately.



This directory documents the A-01 digital workspace and its evolving software prototypes.

A digital model or interface is not evidence that the corresponding physical systems have been built, commissioned or validated. Each release must state its version, scope, verification status and known limitations.

## Latest integrated build — A-01 v3.7.0

- [Open v3.7.0 — Human Comfort Engineering](eva-sphere-a01-v370-human-comfort-engineering.html)
- [Russian documentation](README_RU_v370.md) · [English documentation](README_v370.md) · [简体中文文档](README_ZH_v370.md)
- [Changelog](CHANGELOG_v370.md) · [Human comfort engineering note](../architecture/A01-HUMAN-COMFORT-ENGINEERING-v0.1.md)

v3.7.0 is based on v3.6.0 and retains AIR-01. It adds an embedded Comfort workspace with an interactive SVG schematic for accessible routes, lifts, supplementary escalators, sanitary rooms, family care, water/waste streams, floor/ceiling assemblies and evacuation. The schematic is 2D, not new Three.js geometry; no engineering calculations or physical verification are claimed. The v3.6.0 file remains available as a preserved previous build.

## Latest build

- [A-01 v3.1.2 — Serviceable LED sky and intro sequencing](eva-sphere-a01-v312-modular-shell-serviceable-led.html)
- [Russian documentation](README_RU_v312.md) · [English documentation](README_v312.md) · [Changelog](CHANGELOG_v312.md)
- [Previous v3.1.1 build](eva-sphere-a01-v311-ochre-hover-arrival-flight-hud.html) · [Documentation](README_v311.md)
- [Stable v2.1.0 baseline](eva-sphere-a01-v210-human-navigation-safety.html) · [Documentation](README_RU_v210.md)

The v3.1.2 build improves the first-arrival sequence, splits the interior LED sky into serviceable curved cassettes and documents a separate protected exterior shell maintenance path. It remains an experimental digital twin; its geometry is not a fabrication or construction design. Full live WebGL interaction and physical device testing have not been completed.


## Standalone companion module — A-01 v3.8.0 Interior Blockout

- [Open interactive 3D interior blockout](eva-sphere-a01-v380-axiom-inspired-interior-blockout.html)
- [Russian documentation](README_RU_v380.md) · [English documentation](README_v380.md) · [简体中文文档](README_ZH_v380.md)
- [Changelog](CHANGELOG_v380.md) · [Architectural study](../architecture/A01-AXIOM-INTERIOR-BLOCKOUT-v0.1.md)

v3.8.0 is a standalone Three.js companion scene exploring a central atrium, ring galleries, public/residential/family zones, bridges, illustrative lift shafts and service routes. It is linked from this index but is not merged into the v3.7.0 main scene. All units are schematic and uncalibrated; no engineering or safety calculations are claimed.
