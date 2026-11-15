# A-01 v3.4.0 — Integrated digital twin and shell engineering node

**Date:** 2026-11-15  
**Base:** integrated digital twin v3.1.2 + serviceable shell module v3.3.0  
**Status:** published experimental integrated prototype; not deployed to the public uCoz site.

## Open

- [Integrated A-01 v3.4.0 digital twin](../../digital-twin/eva-sphere-a01-v340-integrated-shell-engineering.html)
- [Change log](../../digital-twin/CHANGELOG_v340.md)
- [Russian integration notes](../../digital-twin/README_RU_v340.md)

## Integration

The main v3.1.2 digital twin is preserved as the foundation. The v3.3.0 engineering workbench is embedded as an isolated, responsive iframe workbench and opened from the selected outer-shell cassette's object-details panel.

The main shell has 144 actual cassette records. Their panelIndex maps one-to-one to the workbench's 12 × 12 selector: row R maps to shell sector P; cell S01–S06 maps to column C01 / bands B01–B06; cell S07–S12 maps to column C02 / bands B01–B06. Both sides synchronize selection.

A scene action runs the existing main-twin 3D cassette service animation for the same selected cassette. The workbench retains the nine-state pressure / anti-icing simulation.

## Preserved systems

Five-level main scene, interior navigation, exterior shell view, object registry, 144 cassette geometry, LED sky service concepts, existing object cards and shell-cassette movement animation.

## Verification boundaries

The integration bridge and source structure were checked. A full browser/WebGL end-to-end test still requires a browser with an available WebGL context; the automated test environment has previously failed to create one. No physical engineering validation has been performed. The workbench values are illustrative and do not control real equipment.

The integrated GitHub file does not automatically deploy to the project's public uCoz website.
