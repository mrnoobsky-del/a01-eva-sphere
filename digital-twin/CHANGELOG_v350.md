# A-01 v3.5.0 — changelog

## Atrium and viewing architecture
- Added 24 inward-facing viewing bays: six per level across L01–L04, with alternating angular offsets.
- Added two shallow seating ledges, transparent inner-edge balustrades and 24 visual sightline rays to the central plaza.
- Added a concept layout for up to 80 regular seats, eight wheelchair positions and eight companion positions.
- Added a fallback 2D atrium view for browsers where WebGL is unavailable.
- Corrected desktop details-panel layout to a separate side column; kept the mobile bottom-sheet behaviour.

## Distributed acoustics
- Added 40 distributed speaker nodes (eight per logical floor), four main atrium arrays and eight suspended acoustic islands.
- Added five logical sound zones L00–L04 and four UI modes: quiet, speech, event and alert.
- Added controls for speaker nodes, arrays, viewing terraces, sightline rays and focusing the camera on the atrium.
- Exposed the controls through window.EVA_SPHERE.acoustics.

## Concept geometry — uncalibrated scene units
- Atrium opening radius: 3.72.
- Main circular circulation radius: 4.42 (preserved).
- Viewing deck radial range: 2.97–3.695; inward projection: 0.75.
- Six bays per level; each bay spans 42 degrees.
- Conceptual balustrade height: 1.10.
- Second seat ledge rise relative to first: 0.34.
- Accessible viewing pads are represented separately from regular seating.

## Preliminary metric design targets — not scaled from the current scene
- Central public-space diameter: 14–16 m.
- Viewing-gallery depth: 1.8–2.4 m.
- Clear circulation behind seating: at least 1.5 m.
- Seating-row pitch: 0.85–0.95 m.
- Seat width: 0.50–0.55 m.

These are design targets for the next calibrated model, not verified dimensions or code-compliance values.

## Preserved
- v3.4.0 integrated digital twin, five levels, existing objects and routes.
- Integrated A01-L03-D01 shell-service workbench, cassette synchronization, pressure and anti-icing scenario.
- Existing exterior shell, LED sky, service animations and workspace controls.

## Verification and limitations
- Inline JavaScript passed Node.js syntax checks.
- HTML IDs were checked for duplicates.
- Responsive layout and the 2D fallback are implemented; full end-to-end WebGL/device verification remains outstanding where the browser environment does not expose WebGL.
- The acoustic layer is visual/control logic only: no audio playback, RT60/STI/SPL simulation, delay calculation or sound-pressure verification is performed.
- Sightline rays are visual aids, not C-value calculations.
- No physical architectural, structural, accessibility, fire/egress, local-code or acoustic engineering validation has been performed.
