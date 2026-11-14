# Changelog — A-01 v3.0.0

## Parametric Modular Shell · 14 November 2026

### Added
- A selectable 144-panel exterior cassette visualization aligned with the published geometry generator.
- Stable panel IDs, parent sector / column / course metadata, angular bounds and calculated surface area in model units.
- Exterior-only cassette visibility control and camera focus for a selected panel.
- A shared surface material and grid-line object; repeated joint markers use THREE.InstancedMesh.
- Adaptive renderer antialiasing, power preference and pixel ratio for mobile/coarse-pointer devices.
- Updated version documentation and project summary counters.

### Preserved
- The v2.1.0 file remains unchanged as the stable baseline.
- Five levels, 60 interior modules, avatar navigation, entrances, conceptual evacuation cores, digital sky, Eva guide, service robot and existing workspace panels remain in the new snapshot.

### Source review
- The supplied JavaScript example informed adaptive renderer settings and instanced repeated details.
- Its placeholder floor / robot / lift code was not copied. The existing scene lifecycle, resize observer and resource cleanup were retained.
- Continuous animation remains because the model includes ongoing movement and sky animation; the example's unused needsRender flag was not introduced.

### Limitations
- Candidate geometry is not calibrated to metres and is not a fabrication or structural design.
- Crown closure and lower skirt remain separate design work.
- Materials, thickness, fasteners, supports, loads, fire/water performance and service life are undefined.
- No live browser/WebGL verification, cross-device performance test or physical engineering validation is claimed.
