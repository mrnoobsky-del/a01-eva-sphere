# A-01 v3.5.0 — Atrium, amphitheatre sightlines and zoned acoustics

**Date:** 2026-11-15  
**Base:** integrated digital twin v3.4.0  
**Type:** experimental architectural and interface iteration  
**Status:** published concept prototype. It is not construction documentation, an operating audio system or a certified design.

## Open
- [Integrated A-01 v3.5.0 digital twin](../../digital-twin/eva-sphere-a01-v350-acoustics-atrium.html)
- [Russian design documentation](../../digital-twin/README_RU_v350.md)
- [Changelog](../../digital-twin/CHANGELOG_v350.md)

## Added
- 24 inward-facing viewing bays: six each on L01–L04, with alternating angular offsets.
- Two shallow seating ledges, transparent inner-edge balustrades and 24 visual rays to the central plaza.
- Concept layout for up to 80 regular seats, eight wheelchair positions and eight companion positions.
- A simplified 2D atrium fallback for environments without WebGL.
- 40 distributed speaker nodes, four main arrays and eight suspended acoustic islands.
- Five logical sound zones L00–L04 and four interface modes: quiet, speech, event and alert.
- A desktop side-column layout that keeps the scene visible beside the information panel; mobile keeps its bottom sheet.
- The v3.4.0 shell-service workbench and 144-cassette synchronization remain integrated.

## Current scene geometry (uncalibrated units)
- Atrium opening radius: 3.72 units; main circulation radius: 4.42 units.
- Viewing-deck radial range: 2.97–3.695 units; inward projection: 0.75 units.
- Six 42-degree bays on each of four levels.
- Conceptual balustrade height: 1.10 units; second seat ledge rise: 0.34 units.

## Preliminary metric targets for the next calibrated model
Central public-space diameter 14–16 m; viewing-gallery depth 1.8–2.4 m; clear circulation behind seating at least 1.5 m; row pitch 0.85–0.95 m; seat width 0.50–0.55 m. These are design targets, not dimensions measured from or scaled out of the current scene.

C-value is treated as a future sightline-check method, not a measured result. FIFA stadium guidance describes 90 mm as a preferred minimum and 120 mm as optimal for stadium spectator positions; this is a reference for subsequent calculations, not automatic proof that this atrium meets the criterion. See [FIFA Stadium Guidelines — Stadium Bowl](https://publications.fifa.com/es/football-stadiums-guidelines/general-process-guidelines/design/stadium-bowl/).

## Acoustic intent
The interface provides quiet, speech, event and alert modes across five logical sound zones. It does not play audio or simulate room acoustics, RT60, STI/STIPA, SPL, delay alignment or sound isolation. Emergency voice alarm requires a separate engineered, supervised and redundant system.

Suggested RT60 bands (0.8–1.2 s for speech-led spaces and 1.6–2.2 s for music/event exploration) are project targets for acoustic modelling, not simulated results or universal code limits. Design references: [iHEEM Part G — Room Acoustics](https://iheem.healthfacilityguidelines.com/ViewPDF/ViewIndexPDF/iHFG_part_G_room_acoustics), [NHS Wales HTM 08-01](https://nwssp.nhs.wales/ourservices/specialist-estates-services/specialist-estates-services-documents/whtms-library/htm-08-01-acoustics-technical-design-manual-pdf/) and [IEC 60268-16](https://webstore.iec.ch/en/publication/26771).

## Verification and limitations
- Inline JavaScript passed Node.js syntax checks and HTML IDs were checked for duplicates.
- Responsive layouts and a 2D fallback are present. Full WebGL/device verification remains separate.
- Sightline rays are visual aids, not C-value calculations.
- No physical architectural, structural, accessibility, egress, acoustic, fire-safety or local-code validation has been performed.
- Scene units remain uncalibrated; physical dimensions and material performance are not verified.

GitHub publication updates the repository, not the public uCoz workspace automatically.
