# A-01 v3.0.0 — Parametric Modular Shell

**Digital-twin build · experimental**

This snapshot preserves the v2.1.0 human-navigation and safety baseline and adds a selectable visualization of the proposed exterior cassette grid.

## What is new

- 144 candidate shell panels: 12 parent sectors × 2 columns × 6 meridional courses.
- Each panel has a stable ID, for example A01-CAS-P01-C01-B01.
- In exterior view, use “Cassettes · 144” to show or hide the panel grid.
- Select a panel to inspect its sector, column, course, angular bounds and surface area in model units.
- Use “Focus object” to bring the selected panel into view.
- Adaptive rendering settings reduce antialiasing and pixel ratio on mobile/coarse-pointer devices.
- Repeated panel-joint markers use THREE.InstancedMesh; curved panels remain individually selectable.

## Geometry basis

The visualization follows the published parametric dataset and generator in geometry/ and tools/:

- base radius: 8.55 model units;
- visual radial factor: 1.006;
- horizontal / vertical scale: 1.22 / 1.35;
- vertical center: 0.58;
- angular domain: 0.015 rad to 0.48π;
- 15° panel columns and six meridional courses.

The runtime recreates the same parameterized surface; it does not fetch the JSON file at runtime. The JSON, CSV and SVG remain the separate geometry records. The radial factor and vertical offset are visual separation values, not construction clearances.

## What is not included

- Crown closure and lower skirt are separate design problems and are not part of the 144-panel grid.
- Panel thickness, material grade, mass, fixing schedule, support spacing and manufacturing tolerance are not defined.
- Wind, snow/ice, seismic, fire, water-ingress, impact, fatigue or service-life capacity is not calculated or verified.
- There is no actuator, panel removal, lifting cradle or maintenance procedure simulation.
- Model units are not calibrated to metres.

The 144 entries are geometry candidates, not an approved bill of materials, fabrication model or construction package. A real project requires a site-specific design basis, qualified engineering, professional review, prototypes and tests.

## Review of the supplied JavaScript example

The supplied example was reviewed as an idea source, not copied as a replacement engine. Adaptive renderer settings and instancing for repeated detail were adopted. The existing project already had its own scene, lights, animation loop, resize observer and cleanup; its established building geometry, avatar navigation, Eva guide, service robot and interface were preserved. Placeholder lift and robot geometry from the example was not transplanted.

## Verification status

The source snapshot and geometry-generation logic were statically reviewed. A live browser/WebGL run, cross-device performance test, physical prototype test and engineering approval have not been performed.

- [Open v3.0.0 HTML prototype](eva-sphere-a01-v300-parametric-shell-cassettes.html)
- [Changelog](CHANGELOG_v300.md)
- [Russian documentation](README_RU_v300.md)
- [Stable v2.1.0 baseline](eva-sphere-a01-v210-human-navigation-safety.html)
