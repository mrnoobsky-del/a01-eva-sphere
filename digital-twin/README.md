# Digital Twin

This directory contains the evolving A-01 digital workspace and its software prototypes. A digital model is not evidence that physical systems have been built, commissioned or validated. Each release identifies its scope, verification status and limitations.

## Primary build — A-01 v4.0.0

- [Open the primary A-01 v4.0.0 HTML build](eva-sphere-a01-v400-primary-architecture-baseline.html)
- [Russian documentation](README_RU_v400.md) · [English documentation](README_v400.md)
- [Changelog](CHANGELOG_v400.md) · [Architecture note](../architecture/A01-V400-PRIMARY-ARCHITECTURE-BASELINE_RU.md)
- [Release notes](../releases/v4.0.0/RELEASE-NOTES_RU.md)

v4.0.0 is the primary repository build. It preserves the integrated v3.1.6 workspace and rebuilds the 60 radial modules, entrance openings, inset vestibules, swing doors and first-person circulation camera. It is a conceptual model, not a physical-building design.

**Verification:** 298 HTML IDs with no duplicates, seven inline JavaScript blocks with no syntax errors, and a valid JSON import map. Run the following from the repository root to repeat static checks:

    python tools/validate_a01_v400.py

Browser/WebGL visual acceptance and engineering validation have not been completed.

**Deployment:** the public uCoz page still reports v3.1.6 metadata as of 22 November 2026. GitHub changes do not deploy to uCoz automatically.

## Preserved previous and companion builds

- [A-01 v3.8.0 — Axiom-inspired interior blockout](eva-sphere-a01-v380-axiom-inspired-interior-blockout.html) · [RU](README_RU_v380.md) · [EN](README_v380.md) · [Changelog](CHANGELOG_v380.md). This remains a standalone companion study, not the main scene.
- [A-01 v3.7.0 — Human Comfort Engineering](eva-sphere-a01-v370-human-comfort-engineering.html) · [RU](README_RU_v370.md) · [EN](README_v370.md) · [Changelog](CHANGELOG_v370.md).
- [A-01 v3.6.0 — AIR-01 life support](eva-sphere-a01-v360-air-01-life-support.html) · [RU](README_RU_v360.md).
- [A-01 v3.1.2 — serviceable LED sky and intro sequence](eva-sphere-a01-v312-modular-shell-serviceable-led.html) · [RU](README_RU_v312.md) · [Changelog](CHANGELOG_v312.md).
- [A-01 v2.1.0 — preserved stable archive](eva-sphere-a01-v210-human-navigation-safety.html) · [RU](README_RU_v210.md).

Older builds remain available for comparison and historical review.
