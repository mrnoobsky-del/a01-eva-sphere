# A-01 X v0.3.6 — Release notes

**Base:** v0.3.5 (preserved)  
**New capability:** AgentEyeCamera attached to the original Android-01 head Bone.

- Exported the existing `head` THREE.Bone from the 17-bone rig without changing its hierarchy or named poses.
- Added a dedicated eye PerspectiveCamera, canvas and WebGLRenderer.
- Preserved the spectator camera, existing first-person navigation and primary renderer.
- Added local 640×360 eye preview at 6 FPS by default (configurable up to 15 FPS).
- Added explicit operator start action and a 10-minute `local_eye_stream` authorization.
- Added local JPEG frame capture with timestamps, sequence, frame/source IDs and `simulated` provenance.
- No remote camera-start command, microphone, network upload, vision API, physical camera, ROS 2 or actuator control is included.

## Validation

- `npm run check` passed.
- Agent World: 17-bone rig and 5-floor route checks passed.
- AgentEyeCamera: 8 integration checks passed.
- Local HTTP API and MCP stdio checks passed.
- Geometry/UI audit: 190 checks passed.

Rendered browser/WebGL/GPU acceptance is still pending. The Android-01 remains a digital simulation rig; all eye frames are marked simulated.
