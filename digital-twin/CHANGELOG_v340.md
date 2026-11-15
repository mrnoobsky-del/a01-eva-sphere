# A-01 v3.4.0 — changelog

## Added
- Integrated the v3.3.0 pressure / anti-icing cassette service module into the main v3.1.2 digital twin.
- Added an engineering-node action to the selected outer-shell cassette details panel.
- Added a responsive isolated iframe workbench with no external runtime dependencies.
- Added two-way cassette selection synchronization between the main 144-object registry and the service workbench.
- Exposed the existing 3D shell-cassette service animation through the scene API; the workbench can close and play the selected cassette's animation.

## Mapping
- Main shell panelIndex 1–144 maps to the workbench's 12 × 12 index.
- Workbench row R01–R12 = main shell sector P01–P12.
- Workbench cell S01–S06 = column C01 / bands B01–B06.
- Workbench cell S07–S12 = column C02 / bands B01–B06.

## Preserved
- Main v3.1.2 3D scene, five levels, interior navigation, exterior mode, object registry, cassette geometry, and existing shell-service animation.

## Limitations
- WebGL scene integration must be verified in a browser with an available WebGL context; the isolated test environment may not provide one.
- Embedded pressure and anti-icing values are illustrative only and are not physical engineering validation.
