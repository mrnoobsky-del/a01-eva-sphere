# A-01 v3.1.9 — Immersive Object Study

**Baseline:** primary website line v3.1.6 plus the prepared v3.1.7 and v3.1.8 mainline integrations.

## Behaviour
- Clicking a 3D object or selecting “Изучить объект” opens a dedicated full-screen study mode.
- The camera focuses on the selected object. On desktop, the subject is framed to the left of the information card; on phones the card becomes a bottom sheet.
- Main navigation, context drawer, stage labels and ordinary controls are temporarily hidden.
- The card remains over the model and shows the object's description, level, ID, conceptual equipment and connected systems/zones.
- Close or Escape restores the interface. A context drawer that was open before studying retains its state.
- Background object selection and free-flight movement are suspended while the card is open, then restored on close.

## Documentation
- [Object-study verification report (RU)](../releases/mainline-v3.1.9/OBJECT-STUDY-MODE-REPORT_RU.md)
- [Release notes (RU)](../releases/mainline-v3.1.9/README_RU.md)
- [Changelog](CHANGELOG_v319.md)

## Automated verification
Agent module and embedded-module syntax checks pass. Agent Runtime route/approval tests, spatial clearance audit and object-study mode checks pass. HTML parses with 322 unique IDs and no duplicates. ZIP integrity passes.

**Browser visual acceptance:** not completed. Headless Chromium did not finish the load/render cycle in this environment, so a real desktop/mobile WebGL walkthrough is still required.

**Status:** Prototype / local automated checks passed. No uCoz deployment was performed.
