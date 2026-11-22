# A-01 X v0.2.0 — Reality View preview

**Release class:** experimental visual prototype within A-01 X  
**Status:** static JavaScript validation passed; browser/WebGL/device validation pending

## What changed

- Replaced the schematic-style 3D presentation with a more realistic PBR material and lighting setup.
- Added Poly Haven Cloud Layers 2K HDRI (CC0) for natural image-based lighting and reflections, with a RoomEnvironment fallback.
- Added ACES tone mapping, shadow mapping, quality presets and automatic FPS-based quality adjustment.
- Increased dome glazing and structural rib detail.
- Added detailed floor rings, bridges, glass railings, escalators, glass elevator cabin, wood/stone/concrete surface textures, furniture and greenery.
- Added illustrative people, a service robot, a moving route indicator and three lighting presets.
- Added independently switchable structure, glass, entity and route layers.
- Kept the RU / EN / Simplified Chinese interface.

## Validation

- Extracted module JavaScript passes Node.js syntax validation.
- HTML source parses successfully.
- The container used to prepare this file could not reach external CDNs, so an end-to-end browser/WebGL render was not verified here.
- Device FPS and mobile GPU performance have not been measured.

## Limitations

This remains a conceptual procedural blockout, not a photogrammetry capture or surveyed BIM model. Tesla-like spatial visualization is a design reference; this release does not reproduce Tesla software or use its code. People, robot, elevator motion and route are illustrative simulation. No building telemetry, sensors, HVAC, energy, water, lift controller or safety system is connected. Dimensions are uncalibrated model units and are not construction data.

## Credits

- Poly Haven, Cloud Layers HDRI, CC0: https://polyhaven.com/a/cloud_layers
- Three.js, MIT: https://threejs.org/
