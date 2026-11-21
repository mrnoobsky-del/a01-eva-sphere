# A-01 v3.8.0 — Axiom-inspired Interior Blockout

**Date:** 21 November 2026  
**Base:** conceptual A-01 interior composition; companion module for digital-twin line v3.7.0  
**Type:** standalone interactive Three.js scene  
**Status:** published; full engineering and user validation remain outstanding.

## Open
- [Open the interactive A-01 v3.8.0 3D blockout](eva-sphere-a01-v380-axiom-inspired-interior-blockout.html)
- [Changelog](CHANGELOG_v380.md)
- [Interior Blockout architectural note](../architecture/A01-AXIOM-INTERIOR-BLOCKOUT-v0.1.md)
- [Previous integrated build v3.7.0](eva-sphere-a01-v370-human-comfort-engineering.html)

## 1. Purpose

v3.8.0 is an early spatial blockout for the A-01 interior. It studies selected ideas from the Axiom passenger ship in WALL‑E: a tall central void, ring-shaped galleries, functionally distinct zones, visible vertical connections, and a mix of public, residential and restorative spaces.

This is a standalone companion module, not a replacement for or overwrite of the v3.7.0 main scene. The digital-twin index links to it; this release does not insert the module geometry directly into the main WebGL scene.

## 2. Scene contents

- Five conceptual levels, L00–L04.
- Open central atrium and ring galleries.
- Volumetric room blocks arranged around the perimeter.
- Bridges between the inner gallery and outer circulation route.
- Three illustrative lift shafts and cars.
- Outer service belt and vertical service riser routes.
- Green pockets on family and upper levels.
- Transparent dome geometry for spatial composition review.

Current functional allocation:
- **L00:** main entrance, assistance, logistics and technical/sanitary rooms.
- **L01:** public services, small retail, food and meeting spaces.
- **L02:** residential modules and shared lounges.
- **L03:** family care, wellness, rest and winter garden.
- **L04:** views, library, workspaces and a conceptual dispatch centre.

## 3. Controls

- Selecting L00–L04 highlights a level and updates its information card.
- “Isolate selected level” hides the other floor rings.
- Independent toggles control the dome shell, room modules, bridges, lift core, service belt and planting.
- Camera presets: Atrium, Top and Entry. Drag/touch to orbit and zoom.
- Reset restores the initial camera and enables all layers.

## 4. Conceptual status

All coordinates, radii, heights, element thicknesses, room counts, shaft locations and floor-to-floor distances are schematic scene units. They are not calibrated in metres and must not be used to estimate occupancy, egress, cost, structural capacity or construction.

Lift cars move slightly as a visual illustration only. This is not a lift traffic model, control algorithm or evacuation verification. Bridges, shafts and service routes have not been checked for accessibility, fire compartments, clashes, acoustics, maintenance or code compliance.

## 5. Verification and limitations

**Included:** standalone Three.js WebGL module; five levels; atrium; galleries; room blocks; bridges; illustrative lift shafts; service belt; conceptual risers; planting; layer toggles; camera presets; Russian documentation and project-index links.

**Outstanding:** cross-browser and mobile testing; geometry integration into the v3.7.0 main scene; parametric alignment with the dome; dimensioned plans and accessible clear widths; IFC/BIM; structural, smoke, HVAC, acoustic, water, drainage, lift and evacuation calculations.

The module loads Three.js 0.160.0 and OrbitControls from jsDelivr, so it requires an internet connection and WebGL support.

## 6. Architectural research sources

Axiom is used only as a reference for spatial organization and art direction. No Pixar/Disney geometry, original film assets or third-party fan 3D models are embedded in this module.

- [Pixar / Disney — WALL‑E bonus materials and set fly-throughs](https://go-60de6c82-be11-98e1-4d6c-c65a234eee95.disney.io/disneyvideos/animatedfilms/wall-e/textonly.html)
- [WALL‑E environment art — artist portfolio](https://www.tucumanian.com/walle)
- [Axiom — user-generated Sketchfab models; verify licensing before use](https://sketchfab.com/tags/wall-e-disney)

---

*v3.8.0 is a visual blockout and research scene. It is not a BIM model, architectural construction design, engineering calculation model or safety certification.*