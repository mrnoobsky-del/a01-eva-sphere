# Digital Twin

This directory documents the A-01 digital workspace and its evolving software prototypes.

A digital model or interface is not evidence that the corresponding physical systems have been built, commissioned or validated. Each release must state its version, scope, verification status and known limitations.

## Latest integrated build

- A-01 v3.1.2 — [Serviceable LED sky and intro sequencing](eva-sphere-a01-v312-modular-shell-serviceable-led.html)
- [Russian documentation](README_RU_v312.md) · [English documentation](README_v312.md) · [Changelog](CHANGELOG_v312.md)
- Previous v3.1.1 build — [HTML prototype](eva-sphere-a01-v311-ochre-hover-arrival-flight-hud.html)

## Experimental extensions

- **A-01 Living World v0.1 — digital companions:** [Russian module documentation](modules/living-world/README_RU.md) · [Standalone preview](modules/living-world/preview.html) · [Release notes](modules/living-world/RELEASE-NOTES-v0.1.md)

The Living World module is developed on a separate feature branch. It is not yet merged into the integrated HTML build. It reuses the existing window.EVA_SPHERE scene API and is designed not to replace the core camera, renderer, player controls, service robots, LED cassette system or intro sequence. The preview page is a sandbox, not the full A-01 environment.

## Stable baseline

- A-01 v2.1.0 — [HTML prototype](eva-sphere-a01-v210-human-navigation-safety.html) · [Documentation](README_RU_v210.md)

All digital-twin files remain experimental software and conceptual representations. Geometry uses model units unless explicitly calibrated; it is not construction documentation. Live WebGL, mobile, physical-device and engineering verification must be stated separately for each release.

## First-person vision adapter — AgentEyeCamera v0.1

- [Russian integration notes](modules/living-world/AGENT-EYE-CAMERA-README_RU.md)
- [Synthetic humanoid camera-rig preview](modules/living-world/agent-eye-camera-preview.html)
- [Head-ready integration contract](modules/living-world/agent-eye-camera-integration.html)

This optional adapter creates an independent head-mounted Three.js camera and local canvas stream. The available Living World branch does not yet expose a verified Android-01 humanoid head rig; the preview uses a synthetic fixture. It is an adapter and test harness, not a claim of a live Android-01 connection.
