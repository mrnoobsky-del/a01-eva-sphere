# A-01 Digital Twin

This directory contains the evolving A-01 digital workspace and software prototypes. A digital model is not evidence that physical systems have been built, commissioned or validated.

## Current primary build — A-01 v4.9.0

A-01 v4.9.0 is the current primary integrated digital-twin build in GitHub `main`.

- [Wix HTML build](eva-sphere-a01-v490-wix-preview.html) — `https://headless-dozcbvursgh-storypad9-1409.wix-site-host.com/eva-sphere-a01-v490-quality-experience-preview.html`
- [VibeShorts canonical original](eva-sphere-a01-v490-vibeshorts-original.html) — `https://vibeshorts.ru/evasphere/`
- [EvaSphere canonical original](eva-sphere-a01-v490-evasphere-original.html) — `https://evasphere.usite.pro/`
- [Russian documentation](README_RU_v490.md) · [Changelog](CHANGELOG_v490.md) · [Release notes](../releases/v4.9.0/RELEASE-NOTES_RU.md)
- [Runtime and performance note](../performance/V490-RUNTIME-HARDENING_RU.md)

The release adds contextual Lottie for loading, first-visit welcome and the active shell-service demonstration; improves player fallback and cleanup; adds WebGL context recovery and a retryable startup error panel; caps continuous scene animation at 60 Hz; and improves welcome keyboard focus. Demand-driven rendering, adaptive pixel ratio, geometry batching, feature picking and LOD are retained. The public FPS overlay and rotation-test controls remain removed.

**Verification:** JavaScript script blocks, embedded JSON, duplicate HTML IDs, version labels and three independent canonical URL sets passed static source checks. Browser/device acceptance of the v4.9.0 scene, Lottie and context recovery remains outstanding. The 60 Hz cap is not a measured FPS result.

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
