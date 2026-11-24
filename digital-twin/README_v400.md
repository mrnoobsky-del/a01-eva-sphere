# A-01 v4.0.0 — Primary Architecture Baseline

**Release date:** 22 November 2026  
**Repository status:** primary digital-twin build on main  
**Type:** integrated interactive HTML prototype  
**Source line:** preserved v3.1.6 workspace build (3.1.6-gullwing-crown-vent-calcs)

## Open the build

- [A-01 Performance — 60 FPS without visual quality loss](../performance/README.md)
- [Benchmark report template](../performance/BENCHMARK-REPORT-TEMPLATE_RU.md)
- [P0 source review](../performance/P0-STATIC-SOURCE-REVIEW-v4.0.0_RU.md) · [Browser baseline recorder](../performance/baseline-recorder.js)

- [A-01 v4.0.0 primary HTML](eva-sphere-a01-v400-primary-architecture-baseline.html)
- [Changelog](CHANGELOG_v400.md)
- [Russian architecture note](../architecture/A01-V400-PRIMARY-ARCHITECTURE-BASELINE_RU.md)
- [Russian release notes](../releases/v4.0.0/RELEASE-NOTES_RU.md)
- [Русская документация](README_RU_v400.md)

## 1. Purpose and status

v4.0.0 is designated the primary A-01 digital-twin architecture build in the repository's main branch. It preserves the integrated workspace and its research sections while rebuilding the geometry of the radial modules (doleks), entrance assemblies and walk path to address doors intersecting module façades and the public ring.

As of the release date, the public [evasphere.usite.pro](https://evasphere.usite.pro/) page still reports v3.1.6 metadata. A GitHub commit does not automatically deploy to uCoz. Therefore v4.0.0 is the **repository's primary build**, not a confirmed live-site deployment.

This is a conceptual software model. It does not claim that the physical complex has been built, commissioned or certified.

## 2. Architecture scope

- Five levels, L00–L04.
- Twelve radial modules per level — 60 module records in the scene catalog.
- Hollow module volumes instead of solid wedge masses.
- Separate floor and roof slabs, radial partitions, an inner wall with a door opening, and an outer glazed façade.
- Entry vestibules with two sequential door planes.
- Paired glass swing leaves on side hinges; interaction opens the nearest door plane rather than both simultaneously.
- A ring-shaped walk path, first-person camera, level selection and interface navigation points for vertical transitions.
- Existing workspace sections from the integrated source page, including the asset registry, climate, energy, comfort, shell-service scenarios, data-centre concept and related conceptual modules.

## 3. Geometry decisions

### Module and opening

The inner and outer module boundaries are built separately. The inner wall is no longer covered by a single solid façade plate: a real gap is left for the entrance. Radial side walls and upper/lower junctions are separate elements, so a door is not left in front of an opaque solid wall.

### Vestibule and doors

The vestibule is placed within the radial depth of the module. Both door planes sit beyond the inner wall line but remain inside the module; they do not project into the public circulation ring. Transparent side panels, a threshold and a top glazed panel connect the two planes.

Distances and dimensions are **scene units**. In particular, the door offsets of +0.06 and +0.82 from the inner wall line define the virtual vestibule layout, not construction dimensions in metres. Opening width and height also require calibration against real anthropometry, accessibility requirements and applicable codes.

### Ring path and camera

The walk path uses a radius of 4.40 scene units, centred between the atrium's inner boundary and the module entrances. First-person camera height is derived from the avatar head geometry rather than an arbitrary fixed offset. This is intended to reduce the previous elevated, ceiling-like viewpoint and make eye height more consistent with the floor.

### Vertical navigation

Small illuminated panels mark interactive level-transition points. The transition is software navigation. These panels are **not modeled stair flights**, an elevator system or verified evacuation routes. Lift and transport scenes remain illustrative.

## 4. Build verification

Local static checks were completed on the HTML source:

| Check | Result |
|---|---:|
| HTML IDs | 298 |
| Duplicate IDs | 0 |
| Executable inline JavaScript blocks | 7 |
| JavaScript syntax errors from node --check | 0 |
| JSON import map | valid JSON |
| v4.0.0 architecture markers | present |

Reproduce the check from the repository root:

    python tools/validate_a01_v400.py

Node.js is required for JavaScript syntax checking. The script checks source structure and syntax; it does not execute a WebGL render.

**Not completed:** browser visual review, mobile and GPU testing, rendered intersection measurements, user acceptance on all levels, or engineering calculations. The build environment did not permit a full browser WebGL run. A static PASS must not be interpreted as proof that every visual issue has been eliminated.

## 5. Limitations and outstanding work

Coordinates, radii, heights, thicknesses, door dimensions, passage widths and module counts belong to a conceptual model. They are not calibrated in metres and are not BIM/IFC, construction drawings or a basis for construction.

The following have not been verified:
- structural capacity, wind/snow loads, connections and deformation;
- accessibility, actual clear widths, gradients and turning spaces;
- fire compartments, smoke control, evacuation and safe egress time;
- ventilation, heating, cooling and condensation;
- acoustics, water supply, drainage and leak protection;
- lifts, escalators, maintenance access and operations;
- automatic-door safety and anti-entrapment protection.

Three.js 0.185.0 and OrbitControls are loaded from jsDelivr via the import map. The current HTML build requires an internet connection and WebGL support. It is not a self-contained offline package.

## 6. Development rules

1. Fix shared geometry functions and templates rather than manually offsetting individual doors.
2. Check every circulation-radius change against the atrium boundary, entrance zone and human clearances.
3. Do not represent visual markers or level teleportation as a real stair, lift or evacuation route.
4. Preserve earlier builds and changelogs rather than overwriting archives.
5. Before the next release, run static checks and then a real browser/WebGL review on desktop and mobile.
6. Move engineering concepts into calculations and project documentation with qualified professionals.

---

**A-01 v4.0.0 is the repository's primary software architecture baseline. It is not a construction design, engineering review, safety certificate or evidence that the physical Sphere is ready.**
