# A-01 Digital Twin

This directory contains the evolving A-01 digital workspace and software prototypes. A digital model is not evidence that physical systems have been built, commissioned or validated.

## Current primary build — A-01 v4.9.4

A-01 v4.9.4 is the current primary build in GitHub `main`. It preserves the v4.9.3 Three.js scene, requestAnimationFrame cadence, no-auto-rotation behavior, object-inspection layout, LOD, geometry batching and adaptive pixel ratio. It adds EVA Resource Loop, a local scenario model for water, food, electricity and reserve comparisons. Inputs are illustrative assumptions, not measurements. 120 Hz remains a hardware-dependent target, not a measured result.

- [Primary HTML build v4.9.4](eva-sphere-a01-v494-resource-loop.html)
- [Russian documentation](README_RU_v494.md) · [Changelog](CHANGELOG_v494.md) · [Release notes](../releases/v4.9.4/RELEASE-NOTES_RU.md)
- [EVA Resource Loop technical note](../docs/A01-RESOURCE-LOOP-DIGITAL-TWIN-v0.1_RU.md)
- [GitHub analogue and license review](../docs/OPEN-SOURCE-ANALOGUES-REVIEW-v0.1_RU.md)
- [Preserved v4.9.3 snapshot](eva-sphere-a01-v493-120hz-unobstructed-study.html)

The resource model runs locally in the browser. No sensors, live telemetry, building controllers or physical equipment commands are connected. It does not replace the existing Climate, Energy or Engineering modules.

**Verification:** static HTML structure, unique IDs and scenario formula control values are checked for this release. Browser/device acceptance of WebGL, touch input, visual layout and frame-time percentiles remains a separate task. No 120 FPS result is claimed. The physical Sphere remains a concept, not a commissioned building.


## Preserved previous release — A-01 v4.1.4

- [Wix HTML build](eva-sphere-a01-v414-wix-preview.html)
- [VibeShorts canonical original](eva-sphere-a01-v414-vibeshorts-original.html)
- [EvaSphere canonical original](eva-sphere-a01-v414-evasphere-original.html)
- [Russian documentation](README_RU_v414.md) · [Changelog](CHANGELOG_v414.md) · [Release notes](../releases/v4.1.4/RELEASE-NOTES_RU.md)

## Preserved previous scene — A-01 v4.1.3

- [Open the v4.1.3 primary HTML snapshot](eva-sphere-a01-v413-primary-digital-twin.html)
- [Wix original](eva-sphere-a01-v413-wix-original.html) · [VibeShorts original](eva-sphere-a01-v413-vibeshorts-original.html) · [EvaSphere original](eva-sphere-a01-v413-evasphere-original.html)
- [Russian documentation](README_RU_v413.md) · [Changelog](CHANGELOG_v413.md) · [Release notes](../releases/v4.1.3/RELEASE-NOTES_RU.md)

## Preserved architecture foundation — A-01 v4.0.0

- [Open the v4.0.0 architecture baseline](eva-sphere-a01-v400-primary-architecture-baseline.html)
- [Russian documentation](README_RU_v400.md) · [English documentation](README_v400.md)
- [Changelog](CHANGELOG_v400.md) · [Architecture note](../architecture/A01-V400-PRIMARY-ARCHITECTURE-BASELINE_RU.md)

v4.0.0 remains the preserved architectural reference for radial modules, entrance openings, vestibules and the human circulation path. Earlier companion studies remain available in the historical archive.

**Deployment:** GitHub changes do not automatically deploy to Wix or uCoz. Each platform's own HTML file must be uploaded to its matching destination.
