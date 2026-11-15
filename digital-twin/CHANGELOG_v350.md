# A-01 v3.5.0 — changelog

## Added
- Four levels of inward-facing viewing galleries (L01–L04), six bays per level.
- Alternating bay angular offsets between floors to vary the openings through the central atrium.
- Two shallow seat ledges, transparent inner-edge balustrades and visual reference rays toward the central plaza.
- Distributed speaker concept: eight local nodes per level plus four atrium main arrays.
- Five independent logical sound zones (L00–L04) and four UI modes: quiet, speech, event and alert.
- UI controls to show/hide speaker nodes, terraces and view rays; focus camera on the central atrium.
- Scene API exposed as `window.EVA_SPHERE.acoustics`.

## Concept dimensions (uncalibrated scene units)
- Atrium opening radius: 3.72.
- Main circular circulation radius: 4.42 (unchanged).
- Viewing deck radial range: 2.97–3.695; projection into atrium: 0.75.
- Viewing bay arc: 42 degrees; six bays per level.
- Conceptual balustrade height: 1.10.
- Second seat ledge rise relative to first: 0.18.

## Preserved
- v3.4.0 integrated digital twin, five levels, existing objects and routes.
- Integrated A01-L03-D01 shell-service workbench, cassette synchronization, pressure and anti-icing scenario.
- Existing exterior shell, service animations, LED sky and workspace controls.

## Verification and limitations
- Inline JavaScript passed Node.js syntax checks.
- HTML IDs were checked for duplicates.
- The acoustic system is visual/control logic only; no audio playback, room-acoustic simulation, STI or sound-pressure calculations are performed.
- Sightline rays are a visual aid, not a C-value calculation.
- Geometry remains in uncalibrated scene units. Physical architectural, structural, accessibility, fire/egress and acoustic engineering checks remain outstanding.
- Full WebGL/device verification must be recorded separately; a successful static check is not a substitute.
