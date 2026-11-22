# Changelog — A-01 v3.1.9 Immersive Object Study

- Enables the previously suppressed object detail overlay.
- Adds full-screen study mode for objects selected in the Three.js scene and via “Изучить объект”.
- Focuses the camera on the chosen object and offsets the desktop framing away from the right-hand information card.
- Hides navigation, context panel, stage labels and ordinary controls while studying.
- Populates the study card from the existing object profile: description, level, ID, equipment, connected systems and zones.
- Restores the previous UI and drawer state after the close button or Escape.
- Blocks underlying canvas selection and free-flight movement while the card is open.
- Adds responsive mobile bottom-sheet layout.
- Preserves v3.1.8 spatial fixes and v3.1.7 Agent Runtime.

## Verification
- Agent Runtime route and approval tests: PASS.
- Spatial clearance audit: PASS.
- Object-study mode checks: PASS.
- JavaScript syntax checks: PASS.
- Parsed HTML: 322 unique IDs, no duplicates.
- ZIP integrity: PASS.
- Headless Chromium visual walkthrough: not completed in this environment.
