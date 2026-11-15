# Eva Sphere A-01 — Digital Twin v3.1.4

**Integrated release candidate. Base: the full v3.1.3 scene, built on v3.1.2.**

## Included

- Five levels, walk/navigation, camera, zone selection, workspace panels, original Eva and service robot.
- Modular exterior shell and 144 addressable interior LED cassettes: 12 sectors × 2 columns × 6 bands; cassette passport and front-service demonstration.
- Waste-service points on five levels, separate handling logistics and collection dock.
- Underground B1 data-centre concept.
- Corrected welcome flow: the interior camera transition begins only after the personal-number card closes.
- Experimental LED portal and deployable residential-pod animation. Ordinary maintenance of the exterior cassette with the occupied pod stationary remains a separate scenario.
- Optional Living World v0.1.1 module: a procedural fly companion (Мушкинссс) and an Eva light-orb placeholder in the L01 atrium.

## Living World module

The HTML loads three local files in this order: `companion-motion.js` → `companion-ai.js` → `companions.js`. The module uses `window.EVA_SPHERE` and `eva-a01:scene-ready`; it adds two independent groups to the existing Three.js scene and does not replace the camera, renderer, player controls or original scene objects.

Public API: `window.A01_LIVING_WORLD.list()`, `select(id)`, `action(name)`, `setAmbient(boolean)`, `pause(boolean)`, `destroy()`. Actions: `greet`, `flap`, `rest`, `return`, `look`.

The module makes no external AI calls or network requests and requests no microphone or camera access. It has no speech or persistent conversation memory. Only the ambient-movement preference is stored locally. Companion movement is bounded to a 2.65 model-unit radius around L01; collision handling, room pathfinding and cross-level travel are not implemented. Eva is a light-orb placeholder, not the final human avatar.

v0.1.1 fixes the missing companion base height and premature return timeout, adds an action allowlist and removes the scene-ready listener when the module is destroyed.

## Verification status

- All three companion scripts passed static syntax parsing.
- All six executable classic inline scripts in the integrated HTML passed static syntax parsing.
- The HTML contains 243 unique IDs; no duplicates were found.
- The JSON manifest is valid; relative script paths, their order and the core scene API were checked.

**Not yet verified:** a full live browser/WebGL session and interactions, physical Android/iOS device testing, complete observation of the 11.6-second pod movement sequence, uCoz macro expansion and deployment to the public website.

## Engineering limitations

v3.1.4 is a software digital twin and visual release candidate, not a built facility, calibrated BIM model, construction document or safety certificate. Scene dimensions are uncalibrated model units.

Whole-pod movement, portal, rails, actuators, telescopic sleeve, locks and shell-opening sequence are conceptual digital animation. Pod mass and loads, stability, wind/snow/seismic effects, rail fatigue, brakes, mechanical stops, fire compartments, air/water sealing, flexible utilities and occupant evacuation have not been calculated. Real-world implementation requires qualified design, failure analysis, mock-ups, testing and independent review.

## Deployment

Keep the HTML file and the `modules/living-world/` folder together so the relative script paths resolve. The base scene loads Three.js 0.185.0 from jsDelivr. This candidate is not claimed to be deployed at `vibeshorts.ru/evasphere/`.

## Files

- [HTML v3.1.4](eva-sphere-a01-v314-integrated-living-world-dolek.html)
- [Russian documentation](README_RU_v314.md)
- [Changelog](CHANGELOG_v314.md)
- [Manual test plan](modules/living-world/TEST-PLAN-RU.md)
- [Living World module](modules/living-world/README_RU.md)
