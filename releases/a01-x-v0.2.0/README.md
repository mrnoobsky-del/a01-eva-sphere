# A-01 X v0.2.0 — Reality View

This release advances the A-01 X browser-based visual prototype for the Sphere of Eva. It continues A-01 X and does not replace previous releases.

## Visual system

- PBR materials for stone, wood, metal and glass.
- Poly Haven Cloud Layers HDR environment for natural illumination and reflections (CC0).
- ACES tone mapping, dynamic shadows, quality profiles and automatic FPS adaptation.
- Glass dome envelope, metal ribs, five levels, bridges, escalators and a glass elevator.
- Procedural greenery, furniture, illustrative people and a service robot.
- Animated route and switchable Reality View layers.
- Daylight, warm interior and night lighting presets.
- RU / EN / 中文 interface, orbit camera and desktop first-person walkthrough.

## Run

Open `eva-sphere-a01-x-v020-reality-view.html` in a current Chrome, Edge or Firefox browser with WebGL enabled and access to the CDNs.

Three.js loads from jsDelivr. The HDRI loads from Poly Haven; if it cannot be reached, the scene keeps the procedural RoomEnvironment fallback.

## Verification and limits

Static JavaScript syntax validation was completed. Full browser/WebGL visual verification, mobile testing and real-device performance measurement have not yet been confirmed.

The atrium is still a procedural conceptual blockout with upgraded materials and lighting. It is not photogrammetry or a surveyed BIM model. People, robot, lift and route are illustrative; no live telemetry or physical equipment control is connected. Model dimensions are conceptual, not construction dimensions.

## External resources

- [Poly Haven — Cloud Layers HDRI](https://polyhaven.com/a/cloud_layers), CC0.
- [Three.js](https://threejs.org/), MIT License.
