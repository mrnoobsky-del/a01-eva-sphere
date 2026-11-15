# A-01 v3.5.0 — Atrium acoustics and viewing galleries

**Date:** 2026-11-15  
**Base:** integrated digital twin v3.4.0  
**Type:** experimental architectural iteration  
**Status:** published concept prototype; no physical engineering verification or certification.

## Open
- [Integrated A-01 v3.5.0 digital twin](../../digital-twin/eva-sphere-a01-v350-acoustics-atrium.html)
- [Russian v3.5.0 documentation](../../digital-twin/README_RU_v350.md)
- [Changelog](../../digital-twin/CHANGELOG_v350.md)

## Added
- 24 inward-facing viewing bays: six each on L01–L04, with alternating angular offsets.
- Two shallow seat ledges and transparent inner-edge balustrades.
- Toggleable visual reference rays toward the central plaza.
- 40 distributed speaker nodes and four main atrium arrays.
- Five logical sound zones (L00–L04) and four control modes: quiet, speech, event and alert.
- UI controls for speaker, gallery and sightline visibility.

## Concept model parameters
Atrium opening radius: 3.72 scene units; existing circular circulation radius: 4.42 units. Balcony projection: 0.75 units; bay arc: 42 degrees; conceptual balustrade height: 1.10 units. The model scale is not calibrated to metres.

Stadium C-value guidance is used only as a reference for later sightline calculations. The acoustic guidance and source links are documented in the Russian design note.

## Verification and limitations
- Inline JavaScript passed Node.js syntax checks.
- HTML IDs were checked for duplicates.
- Speaker models and modes are interface/scene logic only; no audio playback, room-acoustic simulation, STI or sound-pressure calculations are performed.
- Sightline rays are visual aids, not C-value calculations.
- Full WebGL/device verification and physical engineering checks remain separate tasks.
- GitHub publication does not automatically deploy the public uCoz workspace.
