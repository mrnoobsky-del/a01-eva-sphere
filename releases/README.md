## A-01 X v0.3.0 — Sphere Intelligence and Human Wellbeing (documentation release)

- [Release overview — RU](a01-x-v0.3.0/README_RU.md) · [EN](a01-x-v0.3.0/README.md) · [简体中文](a01-x-v0.3.0/README_ZH.md)
- [Riddle-driven design method](a01-x-v0.3.0/DESIGN-METHOD_RU.md) · [Sphere Intelligence specification](a01-x-v0.3.0/SPHERE-INTELLIGENCE-SPEC_RU.md) · [13-hour test protocol](a01-x-v0.3.0/13-HOUR-TEST_RU.md)
- [References](a01-x-v0.3.0/REFERENCES.md) · [Riddle JSON Schema](a01-x-v0.3.0/riddle.schema.json) · [Release notes](a01-x-v0.3.0/RELEASE-NOTES.md)
- Status: documentation-only specification. No physical sensors, BMS, HVAC, elevators, water or life-safety systems are connected. The 13-hour protocol is a test plan, not a fatigue-free guarantee or evidence of real-building performance.

## A-01 X v0.2.0 — Reality View (experimental)

- [Open interactive HTML prototype](a01-x-v0.2.0/eva-sphere-a01-x-v020-reality-view.html)
- [Russian documentation](a01-x-v0.2.0/README_RU.md) · [English](a01-x-v0.2.0/README.md) · [简体中文](a01-x-v0.2.0/README_ZH.md)
- [Release notes](a01-x-v0.2.0/RELEASE-NOTES.md)
- Status: static JavaScript validation passed. Browser/WebGL/device validation pending. PBR materials, Poly Haven CC0 HDRI, shadows, glass, escalators, moving people/robot and Reality View layers are included. This remains a conceptual procedural model with illustrative entities and no live engineering telemetry.

## A-01 X — v0.1.0 experimental technology line

- [Russian overview](a01-x-v0.1.0/README_RU.md) · [Release notes](a01-x-v0.1.0/RELEASE-NOTES.md)
- [Source code: package, Vite, TypeScript and Three.js](a01-x-v0.1.0/)
- Status: experimental A-01 technology line. Preserves all preceding A-01 versions; not a separate A-02 and not a replacement for the established digital-twin baseline. Local npm installation and production build remain pending; see release notes.

# Releases

Versioned snapshots and their release notes are kept here.

Each release must identify what changed, what was tested, what was not tested, known limitations and whether it has been deployed. A prepared archive is not automatically a verified or production release.

## v3.1.3 — Deployable dolek and coordinated LED portal (experimental)

- [Open v3.1.3 HTML prototype](v3.1.3/eva-sphere-a01-v313-deployable-dolek-led-portal.html)
- [Release notes](v3.1.3/RELEASE-NOTES.md)
- Status: experimental alternative movement study based on v3.1.2; seven executable inline JavaScript blocks passed static syntax checks and duplicate HTML IDs were not found. Full browser/WebGL and physical-engineering validation have not been performed. This does not replace the stationary-pod service concept in v3.1.2.

## v2.0.2 — Mobile UX preview

- [Open mobile preview](v2.0.2/eva-sphere-a01-v202-mobile-preview.html)
- [Release notes](v2.0.2/RELEASE-NOTES.md)
- Status: preview; device-level visual and touch testing pending.


## v2.0.3 — Desktop clarity and dedicated Eva chat preview

- [Open v2.0.3 preview](v2.0.3/eva-sphere-a01-v203-desktop-chat-preview.html)
- [Release notes](v2.0.3/RELEASE-NOTES.md)
- Status: preview; browser and device testing pending.


## v2.0.4 — First-visit welcome and orientation

- [Open v2.0.4 preview](v2.0.4/eva-sphere-a01-v204-welcome-preview.html)
- [Release notes](v2.0.4/RELEASE-NOTES.md)
- Status: preview; browser and first-visit flow testing pending.

## v2.0.10 — Light Default archive

- [Open v2.0.10 HTML snapshot](v2.0.10/eva-sphere-a01-v2010-light-default.html)
- [Release notes](v2.0.10/RELEASE-NOTES.md)
- Status: archived snapshot; JavaScript syntax check passed; browser/WebGL verification and production deployment not performed. The later v2.1.0 digital-twin snapshot remains the repository's newer baseline.

## v2.0.13 — Integrated site workspace snapshot

- [Open v2.0.13 HTML snapshot](v2.0.13/eva-sphere-a01-v2.0.13.html)
- [Release notes](v2.0.13/RELEASE-NOTES.md)
- Status: archived snapshot of the integrated `/evasphere/` workspace; four executable JavaScript blocks passed static syntax checks and no duplicate HTML IDs were found. Browser/WebGL verification and production deployment were not performed. This is a separate snapshot track and does not supersede the v2.1.0 main digital-twin baseline.

## v3.3.0 — Serviceable shell, pressure and anti-icing (browser-tested concept)

- [Open v3.3.0 HTML prototype](v3.3.0/eva-sphere-a01-v3.3.0-shell-pressure-antiicing.html)
- [Release notes — English](v3.3.0/RELEASE-NOTES.md) · [Заметки к выпуску — русский](v3.3.0/RELEASE-NOTES_RU.md)
- Status: standalone interactive engineering-concept module; Chromium checks passed at desktop, tablet and mobile viewport sizes. Manual and automated service cycles completed, pressure interlocks and fail-closed cases tested. No physical engineering validation or public uCoz deployment has been performed.

## v3.5.0 — Atrium, amphitheatre sightlines and zoned acoustics

- [Open integrated v3.5.0 digital twin](../digital-twin/eva-sphere-a01-v350-acoustics-atrium.html)
- [Russian design documentation](../digital-twin/README_RU_v350.md) · [Changelog](../digital-twin/CHANGELOG_v350.md) · [Release notes](v3.5.0/RELEASE-NOTES.md)
- Status: finalized concept build with 24 viewing bays, accessible viewing positions, 40 distributed speaker nodes, four main arrays, five logical zones, four sound modes and a 2D fallback for browsers without WebGL. JavaScript syntax and duplicate-ID checks passed. Full WebGL/device, room-acoustic, physical-engineering and code validation remain outstanding. The uCoz site is not automatically deployed.

## v3.4.0 — Integrated digital twin and shell engineering node

- [Open integrated v3.4.0 digital twin](../digital-twin/eva-sphere-a01-v340-integrated-shell-engineering.html)
- [Russian integration notes](../digital-twin/README_RU_v340.md) · [Change log](../digital-twin/CHANGELOG_v340.md)
- Status: combines main v3.1.2 scene with v3.3.0 pressure / anti-icing workbench. Cassette selection is synchronized one-to-one with the main 144-cassette registry; the existing 3D shell-cassette animation is exposed for the selected item. Full end-to-end WebGL verification and physical engineering validation remain outstanding.

## v3.2.6 — Runtime audit and startup guards (experimental)

- [Open v3.2.6 HTML prototype](v3.2.6/eva-sphere-a01-v3.2.6-runtime-audit.html)
- [Release notes](v3.2.6/RELEASE-NOTES.md)
- Status: archived experimental branch based on the v3.x interiors study; JavaScript syntax and static HTML checks passed. Live browser/WebGL verification and production deployment have not been performed. This does not replace or supersede the v2.1.0 main digital-twin baseline.


## v2.0.27 — Modular shell, waste logistics and underground data-centre concept

- [Open v2.0.27 HTML snapshot](v2.0.27/eva-sphere-a01-v2.0.27-modular-shell-waste-datacenter.html)
- [Release notes](v2.0.27/RELEASE-NOTES.md)
- [Engineering research brief](../../architecture/modular-systems-research-v0.1.md)
- Status: experimental design-study snapshot, separate from the main v2.1.0 baseline. Seven inline JavaScript blocks passed syntax checks; 234 HTML IDs were checked with no duplicates; embedded JSON is valid. Browser/WebGL and physical-engineering validation remain outstanding.


## A-01 X Sensory Bridge v0.2 — Living Perception Loop

- [Release overview — RU](a01-x-sensory-bridge-v0.2/README_RU.md) · [EN](a01-x-sensory-bridge-v0.2/README.md) · [简体中文](a01-x-sensory-bridge-v0.2/README_ZH.md)
- [Architecture](../architecture/A01-X-LIVING-PERCEPTION-LOOP-v0.2.md) · [Observation schema](../schemas/a01-x-sensory-observation-v0.2.schema.json) · [Perception event schema](../schemas/a01-x-perception-event-v0.2.schema.json)
- Status: documentation and integration-contract release. No physical Android-01, sensor hardware or live endpoint is connected. Synthetic examples are labelled as simulation.

## A-01 X v0.3.9 — Agent Runtime E2E

- [Release overview (RU)](a01-x-v0.3.9/README_RU.md) · [EN](a01-x-v0.3.9/README.md) · [简体中文](a01-x-v0.3.9/README_ZH.md)
- [E2E validation report (RU)](a01-x-v0.3.9/E2E-VALIDATION_RU.md)

This is a documentation and validation-report publication. The complete runnable ZIP is supplied separately; it is not mirrored as source files or a GitHub Release Asset in this branch.
