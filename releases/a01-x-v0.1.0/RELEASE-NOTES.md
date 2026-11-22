# A-01 X — v0.1.0 preview

**Release class:** experimental technology line within A-01  
**Status:** source prototype; not a production or construction release

## Purpose

A-01 X continues the existing Sphere of Eva project. It does not create a separate A-02 project and does not replace or delete earlier A-01 versions. It explores a new browser-first 3D runtime and a performance-oriented visual architecture while retaining the project's established design and engineering knowledge.

## Included

- Procedural central atrium blockout with five visible levels.
- Orbit camera and desktop first-person walkthrough.
- Bridges, galleries, glass elevator, greenery and architectural lighting.
- PBR material setup and environment lighting.
- Quality profiles and automatic quality adaptation.
- Russian, English and Simplified Chinese interface strings.
- Responsive control panels.
- Explicit boundaries for future engineering adapters.
- GitHub Actions workflows for build and Pages deployment.

## Verification status

- Source tree, package metadata and project naming inspected.
- A local TypeScript check was attempted, but dependencies were not installed; it stopped on unresolved Three.js imports and consequent typing errors.
- A full npm install, production build, browser/WebGL test and device test have not been completed.
- GitHub Actions is configured to install dependencies, type-check and build after publication.

## Important limits

This release is a software visualization prototype. Geometry uses model units and is not a construction model. The scene does not connect to a physical building, sensors, HVAC, energy, water, fire safety or emergency systems. Simulated status values must not be treated as live telemetry.

Physical implementation requires qualified engineering design, site-specific calculations, code review, permits and independent validation.
