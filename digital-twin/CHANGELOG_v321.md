# Changelog — v3.2.1

## Engineering Cycle Inspector

### Added
- New opt-in «Инженерный просмотр» mode for movable dolek modules.
- Manual 13-stage inspection using the v3.2.0 animation phase boundaries.
- Previous / next stage buttons and a direct stage range selector.
- Auto playback with a target of 4.2 seconds per stage, plus pause/resume.
- Optional camera tracking of the selected module while the animation advances.
- Live model-space readouts for radial module travel, carriage vertical travel, hatch angle and LED panel offset.
- Responsive inspector panel with collapse and close controls.
- Completion state remains visible after the movement rig is disposed.

### Preserved
- The original v3.2.0 file and the default 16.5-second cycle when Engineering Inspector is disabled.
- The lift-up hatch, separate radial transfer and vertical carriage sequence, climate, anti-icing and pressure-management concepts.

### Scope and limitations
- Readouts are model-derived values in conditional scene units, not physical measurements.
- This is a visual digital-twin inspection mode, not a PLC, safety controller or validated lifting design.
- Collision-free motion is not established by this UI; swept-volume and clearance verification remain separate engineering tasks.

### Static validation
- 7 executable inline script blocks parsed without syntax errors.
- Responsive CSS and 13 phase boundaries present in the generated file.
- Browser interaction test pending.
